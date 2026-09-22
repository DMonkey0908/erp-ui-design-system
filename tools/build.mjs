#!/usr/bin/env node
/**
 * Build dist/ from core/ + packs/.
 *
 * The ecosystem's whole maintenance argument rests on this file. Each pack is
 * authored once, as core rules plus a domain overlay; every assistant format is
 * generated. Hand-maintaining N packs x 3 formats is how a system like this
 * drifts, and the drift is silent - two builds disagree and nobody notices
 * until an assistant quotes the stale one.
 *
 *   node tools/build.mjs           build everything
 *   node tools/build.mjs --check   validate and diff, write nothing (CI)
 *   node tools/build.mjs erp       build one pack
 *
 * Outputs, per pack:
 *   dist/claude/<skill>/SKILL.md + core/ + pack/ + assets/   progressive disclosure
 *   dist/gemini/<id>.GEMINI.md                               one merged file
 *   dist/gpt/<id>.AGENTS.md                                  one merged file
 *   dist/gpt/<id>.custom-gpt-instructions.md                 copied, if present
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CORE = join(ROOT, 'core');
const PACKS = join(ROOT, 'packs');
const DIST = join(ROOT, 'dist');

const args = process.argv.slice(2);
const CHECK = args.includes('--check');
const only = args.filter((a) => !a.startsWith('--'));

const problems = [];
const written = [];
const stale = [];

const read = (p) => readFileSync(p, 'utf8');
const rel = (p) => relative(ROOT, p).replace(/\\/g, '/');

/**
 * Write, or in --check mode record a mismatch instead. CI runs --check so a
 * pull request that edits a source file without rebuilding fails loudly rather
 * than shipping a dist/ that disagrees with its own sources.
 */
function emit(path, content) {
  if (CHECK) {
    const current = existsSync(path) ? read(path) : null;
    if (current !== content) stale.push(rel(path));
    return;
  }
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, 'utf8');
  written.push(rel(path));
}

/**
 * Shift every heading down one level so several documents can be concatenated
 * under a single H1 without a page full of competing H1s.
 *
 * Fenced code blocks are skipped: a shell comment (`# install`) inside a bash
 * block is not a heading, and demoting it silently corrupts the snippet.
 */
function demote(md, by = 1) {
  const out = [];
  let fence = null;
  for (const line of md.split('\n')) {
    const f = line.match(/^\s*(```+|~~~+)/);
    if (f) {
      if (!fence) fence = f[1][0];
      else if (line.trim().startsWith(fence)) fence = null;
      out.push(line);
      continue;
    }
    if (!fence && /^#{1,5} /.test(line)) out.push('#'.repeat(by) + line);
    else out.push(line);
  }
  return out.join('\n');
}

const stripH1 = (md) => md.replace(/^#\s+.*\n+/, '');
const title = (md, fallback) => (md.match(/^#\s+(.+)$/m) || [, fallback])[1];

function coreFiles() {
  const dir = join(CORE, 'references');
  return readdirSync(dir).filter((f) => f.endsWith('.md')).sort()
    .map((f) => ({ id: f.replace(/\.md$/, ''), file: f, path: join(dir, f) }));
}

function loadPack(id) {
  const dir = join(PACKS, id);
  const metaPath = join(dir, 'pack.json');
  if (!existsSync(metaPath)) { problems.push(`${id}: no pack.json`); return null; }

  let meta;
  try { meta = JSON.parse(read(metaPath)); }
  catch (e) { problems.push(`${id}: pack.json is not valid JSON - ${e.message}`); return null; }

  for (const field of ['id', 'name', 'status', 'summary', 'skill', 'references']) {
    if (!meta[field]) problems.push(`${id}: pack.json is missing "${field}"`);
  }
  if (meta.id && meta.id !== id) problems.push(`${id}: pack.json id is "${meta.id}"`);
  if (meta.skill && (!meta.skill.name || !meta.skill.description)) {
    problems.push(`${id}: pack.json skill needs both name and description`);
  }
  if (!existsSync(join(dir, 'PACK.md'))) problems.push(`${id}: no PACK.md`);

  for (const r of meta.references || []) {
    if (!existsSync(join(dir, 'references', r.file))) {
      problems.push(`${id}: references/${r.file} is listed in pack.json but missing`);
    }
  }
  for (const a of meta.assets || []) {
    if (!existsSync(join(dir, 'assets', a.file))) {
      problems.push(`${id}: assets/${a.file} is listed in pack.json but missing`);
    }
  }

  // A pack that ships a reference nobody listed will silently never be built.
  const refDir = join(dir, 'references');
  if (existsSync(refDir)) {
    const listed = new Set((meta.references || []).map((r) => r.file));
    for (const f of readdirSync(refDir).filter((f) => f.endsWith('.md'))) {
      if (!listed.has(f)) problems.push(`${id}: references/${f} exists but is not listed in pack.json`);
    }
  }

  return { id, dir, meta };
}

/** Core says "no concrete values"; this is the one rule core can enforce on itself. */
function lintCore() {
  for (const { file, path } of coreFiles()) {
    const body = read(path).replace(/```[\s\S]*?```/g, '');   // examples may show hexes
    const hex = body.match(/#[0-9a-fA-F]{6}\b/g);
    if (hex) problems.push(`core/references/${file}: concrete colour outside a code block (${[...new Set(hex)].join(', ')}) - core holds method, packs hold values`);
  }
}

function buildClaude(pack, core) {
  const { meta, dir } = pack;
  const skillDir = join(DIST, 'claude', meta.skill.name);
  const packBody = read(join(dir, 'PACK.md')).trim();

  const coreRows = core.map((c) => `| \`core/${c.file}\` | ${title(read(c.path), c.id)} |`).join('\n');
  const packRows = (meta.references || [])
    .map((r) => `| \`pack/${r.file}\` | ${r.title} |`).join('\n');
  const assetRows = (meta.assets || [])
    .map((a) => `| \`assets/${a.file}\` | ${a.note} |`).join('\n');

  const lead = (meta.core?.leadWith || []).map((x) => `\`core/${x}.md\``).join(', ');

  const skill = `---
name: ${meta.skill.name}
description: ${meta.skill.description}
---

# ${meta.name}

${packBody}

## How to use this skill

Read **\`core/\`** for the rules that hold for any interface, and **\`pack/\`**
for what this domain decided. A pack file never repeats a core rule, so when the
two are both relevant you need both.

${lead ? `Start with ${lead}.\n` : ''}
### Core — applies to every interface

| File | Holds |
|---|---|
${coreRows}

### Pack — this domain

| File | Holds |
|---|---|
${packRows}

${assetRows ? `### Assets\n\n| File | What it is |\n|---|---|\n${assetRows}\n` : ''}
Before calling any work done, run \`core/08-review.md\` and then
\`pack/${(meta.references || []).slice(-1)[0]?.file ?? '05-checklist.md'}\`.

<!-- Generated by tools/build.mjs from core/ and packs/${meta.id}/. Do not edit. -->
`;

  emit(join(skillDir, 'SKILL.md'), skill);
  for (const c of core) emit(join(skillDir, 'core', c.file), read(c.path));
  for (const r of meta.references || []) emit(join(skillDir, 'pack', r.file), read(join(dir, 'references', r.file)));
  for (const a of meta.assets || []) emit(join(skillDir, 'assets', a.file), read(join(dir, 'assets', a.file)));
}

function buildMerged(pack, core, kind) {
  const { meta, dir } = pack;
  const isGemini = kind === 'gemini';

  const header = isGemini
    ? `Context file for Gemini (Gemini CLI, Code Assist, Gems). Place at a repo root
as \`GEMINI.md\`, or in \`~/.gemini/GEMINI.md\` to apply it everywhere. For a Gem,
paste the whole file into the Instructions field.`
    : `Agent instruction file for GPT-based coding agents (OpenAI Codex, Cursor, any
tool that reads \`AGENTS.md\`). Place at a repo root, or merge its sections into
an existing \`AGENTS.md\` under a "UI" heading.`;

  const when = (meta.when || []).map((w) => `- ${w}`).join('\n');

  const parts = [
    `# ${meta.name} — UI design system`,
    '',
    header,
    '',
    `**Apply this when the work is:**`,
    '',
    when,
    '',
    '---',
    '',
    '# Part 1 — Domain',
    '',
    demote(read(join(dir, 'PACK.md')).trim()),
    '',
    '---',
    '',
    '# Part 2 — Core (applies to any interface)',
    '',
  ];

  for (const c of core) parts.push(demote(stripH1(read(c.path)).trim()).replace(/^/, `## ${title(read(c.path), c.id)}\n\n`), '');

  parts.push('---', '', `# Part 3 — ${meta.name} specifics`, '');
  for (const r of meta.references || []) {
    const body = read(join(dir, 'references', r.file));
    parts.push(demote(stripH1(body).trim()).replace(/^/, `## ${r.title}\n\n`), '');
  }

  parts.push(
    '---',
    '',
    `<!-- Generated by tools/build.mjs from core/ and packs/${meta.id}/. Do not edit. -->`,
    ''
  );

  const name = isGemini ? `${meta.id}.GEMINI.md` : `${meta.id}.AGENTS.md`;
  emit(join(DIST, kind, name), parts.join('\n'));
}

function buildCustomGpt(pack) {
  const { meta, dir } = pack;
  if (!meta.customGpt) return;
  const src = join(dir, meta.customGpt);
  if (!existsSync(src)) { problems.push(`${meta.id}: customGpt file ${meta.customGpt} is missing`); return; }

  const body = read(src);
  // The Instructions field is capped at 8000 characters. Overrunning it is not
  // a warning in the product - it simply will not save.
  const m = body.match(/```\n([\s\S]*?)\n```/);
  if (!m) problems.push(`${meta.id}: ${meta.customGpt} has no fenced instructions block`);
  else if (m[1].length > 8000) {
    problems.push(`${meta.id}: Custom GPT instructions block is ${m[1].length} chars, over the 8000 limit`);
  }
  emit(join(DIST, 'gpt', `${meta.id}.${meta.customGpt}`), body);
}

// ─── run ────────────────────────────────────────────────────────────────────

lintCore();
const core = coreFiles();

const ids = (only.length ? only : readdirSync(PACKS))
  .filter((d) => !d.startsWith('_') && !d.startsWith('.'))
  .filter((d) => statSync(join(PACKS, d)).isDirectory());

if (!ids.length) { console.error('No packs found.'); process.exit(1); }

if (!CHECK && !only.length && existsSync(DIST)) rmSync(DIST, { recursive: true });

const built = [];
for (const id of ids) {
  const pack = loadPack(id);
  if (!pack) continue;
  buildClaude(pack, core);
  buildMerged(pack, core, 'gemini');
  buildMerged(pack, core, 'gpt');
  buildCustomGpt(pack);
  built.push(`${pack.meta.id} (${pack.meta.status})`);
}

if (problems.length) {
  console.error('\nProblems:\n' + problems.map((p) => '  - ' + p).join('\n') + '\n');
  process.exit(1);
}

if (CHECK) {
  if (stale.length) {
    console.error('\ndist/ is out of date. Run `node tools/build.mjs`:\n' +
      stale.map((p) => '  - ' + p).join('\n') + '\n');
    process.exit(1);
  }
  console.log(`dist/ is current. ${core.length} core files, ${built.length} pack(s): ${built.join(', ')}`);
} else {
  console.log(`Built ${written.length} files from ${core.length} core files and ${built.length} pack(s): ${built.join(', ')}`);
}
