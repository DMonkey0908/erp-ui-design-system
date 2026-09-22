#!/usr/bin/env node
/**
 * Find places where a pack restates a core rule instead of pointing at it.
 *
 *   node tools/dupcheck.mjs            every pack
 *   node tools/dupcheck.mjs erp        one pack
 *   node tools/dupcheck.mjs --n 6      shorter shingles, more hits, more noise
 *
 * WHY THIS EXISTS
 *
 * "A pack never repeats a core rule" is the discipline the whole two-level
 * structure rests on. It is also the one under constant pressure, because
 * repeating a rule always feels helpful in the moment - and it is easy to
 * violate while writing naturally, including for whoever wrote the rule. Two
 * genuine violations shipped into the first draft of the second pack.
 *
 * Both were caught by grepping distinctive phrases from core against the pack
 * files by hand, which `docs/AUTHORING.md` then recommended as a pre-PR habit.
 * A habit that has to be remembered is a habit that gets skipped, so this is
 * that grep, automated.
 *
 * WHY IT DOES NOT FAIL THE BUILD
 *
 * The check is lexical and the rule is semantic. A pack legitimately names the
 * same concepts core does - it has to, in order to point at them - so some
 * overlap is a pointer working correctly rather than a duplicate. Telling
 * those apart needs a reader.
 *
 * So this prints and exits 0. It is run by `npm run check` for visibility and
 * by a human before a pull request. If it ever gets accurate enough to gate on,
 * that is a good problem and the exit code is one line away.
 *
 * HOW IT WORKS
 *
 * Shingles: every window of N consecutive words, lowercased, with code blocks
 * and markdown punctuation removed. A shared 7-word window of running prose is
 * strong evidence of a sentence being restated, and weak evidence of anything
 * else. Windows that are mostly stopwords are dropped, because "this is the one
 * that is most often missed" is a phrase, not a rule.
 */

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CORE = join(ROOT, 'core', 'references');
const PACKS = join(ROOT, 'packs');

const args = process.argv.slice(2);
const nArg = args.indexOf('--n');
const N = nArg === -1 ? 7 : Number(args[nArg + 1]) || 7;
const only = args.filter((a) => !a.startsWith('--') && a !== String(N));

const STOP = new Set(`
a an the and or but if then than that this these those it its is are was were be been being
to of in on at by for with from as not no never always every each any all both
you your we our they their he she them his her
do does did done make makes made get gets got
one two three same other another more most less least very just only also so such
what which who whom where when how why
can cannot could should would may might must will shall
here there thing things something anything nothing
`.trim().split(/\s+/));

/**
 * Drop the section a pack is REQUIRED to quote core in.
 *
 * An override has to name the rule it contradicts, verbatim, or a reader
 * cannot tell which rule is being overridden - the build already fails a pack
 * that declares one without defending it. So the overlap in that section is
 * the mechanism working, not a duplicate.
 */
function dropOverrides(md) {
  return md.replace(/^##\s+Overrides\s*$[\s\S]*?(?=^##\s)/m, ' ');
}

/** Prose only: code examples share vocabulary by necessity and prove nothing. */
function prose(md) {
  return dropOverrides(md)
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^#.*$/gm, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_>|#-]+/g, ' ');
}

function words(text) {
  return text.toLowerCase().match(/[a-z][a-z-]*/g) || [];
}

function shingles(md) {
  const out = new Map();
  for (const line of prose(md).split(/(?<=[.!?])\s+|\n/)) {
    const w = words(line);
    for (let i = 0; i + N <= w.length; i++) {
      const win = w.slice(i, i + N);
      const meaty = win.filter((x) => !STOP.has(x) && x.length > 2);
      if (meaty.length < 4) continue;            // a phrase, not a rule
      const key = win.join(' ');
      if (!out.has(key)) out.set(key, win.join(' '));
    }
  }
  return out;
}

function lineOf(md, phrase) {
  const target = words(phrase).slice(0, 4).join(' ');
  const lines = md.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (words(lines[i]).join(' ').includes(target)) return i + 1;
  }
  return 0;
}

const coreDocs = readdirSync(CORE).filter((f) => f.endsWith('.md')).map((file) => {
  const body = readFileSync(join(CORE, file), 'utf8');
  return { file, body, shingles: shingles(body) };
});

const ids = (only.length ? only : readdirSync(PACKS))
  .filter((d) => !d.startsWith('_') && !d.startsWith('.'))
  .filter((d) => statSync(join(PACKS, d)).isDirectory());

let hits = 0;

for (const id of ids) {
  const refDir = join(PACKS, id, 'references');
  const files = [
    ...(existsSync(join(PACKS, id, 'PACK.md')) ? [['PACK.md', join(PACKS, id, 'PACK.md')]] : []),
    ...(existsSync(refDir) ? readdirSync(refDir).filter((f) => f.endsWith('.md'))
      .map((f) => [`references/${f}`, join(refDir, f)]) : []),
  ];

  for (const [label, path] of files) {
    const body = readFileSync(path, 'utf8');
    const packShingles = shingles(body);

    for (const doc of coreDocs) {
      const shared = [...packShingles.keys()].filter((k) => doc.shingles.has(k));
      if (!shared.length) continue;

      // Collapse overlapping windows from the same sentence into one report.
      const seen = [];
      for (const s of shared) {
        if (seen.some((prev) => s.startsWith(prev.split(' ').slice(1).join(' ')) || prev.includes(s.split(' ')[0] + ' ' + s.split(' ')[1]))) continue;
        seen.push(s);
      }

      for (const s of seen) {
        hits++;
        console.log(`\npacks/${id}/${label}:${lineOf(body, s)}`);
        console.log(`  restates core/references/${doc.file}:${lineOf(doc.body, s)}`);
        console.log(`  "${s}"`);
      }
    }
  }
}

console.log(
  hits
    ? `\n${hits} overlap(s) at ${N} words. Each is a pack saying what core already said.\n`
      + 'Judge each one: a pointer that happens to share vocabulary is fine, a\n'
      + 'restated rule is not - replace it with "see core/<file>.md" plus the\n'
      + 'domain consequence, which is the only part the pack owns.'
    : `No overlap at ${N} words across ${ids.length} pack(s). Run with --n 6 to look harder.`
);
