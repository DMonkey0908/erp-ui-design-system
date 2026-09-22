#!/usr/bin/env node
/**
 * Build dist/ and the catalogue from core/ + packs/.
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
 *
 * And once, for the catalogue:
 *   dist/index.json                                          machine-readable pack list
 *   the PACKS regions of README.md, docs/README.vi.md, INSTALL.md, llms.txt
 *
 * The catalogue is generated for the same reason dist/ is: a hand-written pack
 * table is a second source of truth, and the copy that goes stale is the one an
 * agent reads when it picks a pack.
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CORE = join(ROOT, 'core');
const PACKS = join(ROOT, 'packs');
const DIST = join(ROOT, 'dist');

// Used in the catalogue and the agent guide. If the repo is ever renamed these
// change here and nowhere else - raw.githubusercontent.com does not reliably
// follow a rename, so a stale URL here is a silently broken install.
const REPO = 'https://github.com/DMonkey0908/erp-ui-design-system';
const RAW = 'https://raw.githubusercontent.com/DMonkey0908/erp-ui-design-system/main/';

const args = process.argv.slice(2);
const CHECK = args.includes('--check');
const only = args.filter((a) => !a.startsWith('--'));

const problems = [];
const written = [];
const stale = [];

const NL = String.fromCharCode(10);

const read = (p) => readFileSync(p, 'utf8');
const rel = (p) => relative(ROOT, p).split('\\').join('/');

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
 * Fenced code blocks are skipped: a shell comment inside a bash block is not a
 * heading, and demoting it silently corrupts the snippet.
 */
function demote(md, by = 1) {
  const out = [];
  let fence = null;
  for (const line of md.split(NL)) {
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
  return out.join(NL);
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
  if (!['draft', 'beta', 'stable'].includes(meta.status)) {
    problems.push(`${id}: status must be draft, beta or stable`);
  }
  if (!existsSync(join(dir, 'PACK.md'))) problems.push(`${id}: no PACK.md`);

  // An agent picks a pack from `when` and `notFor`. A pack with no exclusion
  // signals will be chosen for work it is wrong for, which is the one selection
  // failure that matters.
  if (!(meta.notFor || []).length) {
    problems.push(`${id}: pack.json needs "notFor" - an agent cannot rule this pack out without it`);
  }

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
    if (hex) {
      problems.push(`core/references/${file}: concrete colour outside a code block (${[...new Set(hex)].join(', ')}) - core holds method, packs hold values`);
    }
  }
}

function buildClaude(pack, core) {
  const { meta, dir } = pack;
  const skillDir = join(DIST, 'claude', meta.skill.name);
  const packBody = read(join(dir, 'PACK.md')).trim();

  const coreRows = core.map((c) => `| \`core/${c.file}\` | ${title(read(c.path), c.id)} |`).join(NL);
  const packRows = (meta.references || []).map((r) => `| \`pack/${r.file}\` | ${r.title} |`).join(NL);
  const assetRows = (meta.assets || []).map((a) => `| \`assets/${a.file}\` | ${a.note} |`).join(NL);

  const lead = (meta.core?.leadWith || []).map((x) => `\`core/${x}.md\``).join(', ');
  const lastRef = (meta.references || []).slice(-1)[0]?.file ?? '05-checklist.md';

  const assetSection = assetRows
    ? ['### Assets', '', '| File | What it is |', '|---|---|', assetRows, ''].join(NL)
    : '';

  const skill = [
    '---',
    `name: ${meta.skill.name}`,
    `description: ${meta.skill.description}`,
    '---',
    '',
    `# ${meta.name}`,
    '',
    packBody,
    '',
    '## How to use this skill',
    '',
    'Read **`core/`** for the rules that hold for any interface, and **`pack/`**',
    'for what this domain decided. A pack file never repeats a core rule, so when',
    'the two are both relevant you need both.',
    '',
    lead ? `Start with ${lead}.` : '',
    lead ? '' : '',
    '### Core - applies to every interface',
    '',
    '| File | Holds |',
    '|---|---|',
    coreRows,
    '',
    '### Pack - this domain',
    '',
    '| File | Holds |',
    '|---|---|',
    packRows,
    '',
    assetSection,
    'Before calling any work done, run `core/08-review.md` and then',
    `\`pack/${lastRef}\`.`,
    '',
    `<!-- Generated by tools/build.mjs from core/ and packs/${meta.id}/. Do not edit. -->`,
    '',
  ].join(NL);

  emit(join(skillDir, 'SKILL.md'), skill);
  for (const c of core) emit(join(skillDir, 'core', c.file), read(c.path));
  for (const r of meta.references || []) {
    emit(join(skillDir, 'pack', r.file), read(join(dir, 'references', r.file)));
  }
  for (const a of meta.assets || []) {
    emit(join(skillDir, 'assets', a.file), read(join(dir, 'assets', a.file)));
  }
}

function buildMerged(pack, core, kind) {
  const { meta, dir } = pack;
  const isGemini = kind === 'gemini';

  const header = isGemini
    ? ['Context file for Gemini (Gemini CLI, Code Assist, Gems). Place at a repo root',
       'as `GEMINI.md`, or in `~/.gemini/GEMINI.md` to apply it everywhere. For a Gem,',
       'paste the whole file into the Instructions field.'].join(NL)
    : ['Agent instruction file for GPT-based coding agents (OpenAI Codex, Cursor, any',
       'tool that reads `AGENTS.md`). Place at a repo root, or merge its sections into',
       'an existing `AGENTS.md` under a "UI" heading.'].join(NL);

  const parts = [
    `# ${meta.name} - UI design system`,
    '',
    header,
    '',
    '**Apply this when the work is:**',
    '',
    (meta.when || []).map((w) => `- ${w}`).join(NL),
    '',
    '**Do not apply it to:**',
    '',
    (meta.notFor || []).map((w) => `- ${w}`).join(NL),
    '',
    '---',
    '',
    '# Part 1 - Domain',
    '',
    demote(read(join(dir, 'PACK.md')).trim()),
    '',
    '---',
    '',
    '# Part 2 - Core (applies to any interface)',
    '',
  ];

  for (const c of core) {
    const body = read(c.path);
    parts.push(`## ${title(body, c.id)}`, '', demote(stripH1(body).trim()), '');
  }

  parts.push('---', '', `# Part 3 - ${meta.name} specifics`, '');
  for (const r of meta.references || []) {
    const body = read(join(dir, 'references', r.file));
    parts.push(`## ${r.title}`, '', demote(stripH1(body).trim()), '');
  }

  parts.push('---', '', `<!-- Generated by tools/build.mjs from core/ and packs/${meta.id}/. Do not edit. -->`, '');

  const name = isGemini ? `${meta.id}.GEMINI.md` : `${meta.id}.AGENTS.md`;
  emit(join(DIST, kind, name), parts.join(NL));
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

/**
 * The machine-readable catalogue. An agent selecting a pack reads this rather
 * than parsing prose, so it carries the exclusion signals (notFor) as well as
 * the matching ones - reaching for ERP density on a marketing page is the
 * failure that field exists to prevent.
 */
function buildIndex(packs) {
  const index = {
    $comment: 'Generated by tools/build.mjs. Do not edit.',
    repo: REPO,
    raw: RAW,
    core: coreFiles().map((c) => ({
      file: `core/references/${c.file}`,
      title: title(read(c.path), c.id),
    })),
    packs: packs.map(({ meta }) => ({
      id: meta.id,
      name: meta.name,
      status: meta.status,
      summary: meta.summary,
      summaryVi: meta.summaryVi ?? null,
      optimisesFor: meta.optimisesFor ?? null,
      when: meta.when ?? [],
      notFor: meta.notFor ?? [],
      keywords: meta.keywords ?? [],
      density: meta.density ?? null,
      surfaces: meta.surfaces ?? {},
      overrides: meta.core?.overrides ?? [],
      skillName: meta.skill.name,
      install: {
        claude: `dist/claude/${meta.skill.name}/`,
        gemini: `dist/gemini/${meta.id}.GEMINI.md`,
        gpt: `dist/gpt/${meta.id}.AGENTS.md`,
        customGpt: meta.customGpt ? `dist/gpt/${meta.id}.${meta.customGpt}` : null,
      },
    })),
  };
  emit(join(DIST, 'index.json'), JSON.stringify(index, null, 2) + NL);
}

/**
 * Replace the region between `<!-- PACKS:START:<kind> -->` and its END marker.
 * Files without markers are left alone, so adding a doc does not mean touching
 * the build.
 */
function injectPackTables(packs) {
  const renderers = {
    en: () => [
      '| Pack | Domain | Status |',
      '|---|---|---|',
      ...packs.map(({ meta }) => `| [\`${meta.id}\`](packs/${meta.id}/) | **${meta.name}** - ${meta.summary} | \`${meta.status}\` |`),
    ].join(NL),

    vi: () => [
      '| Pack | Lĩnh vực | Trạng thái |',
      '|---|---|---|',
      ...packs.map(({ meta }) => `| [\`${meta.id}\`](../packs/${meta.id}/) | **${meta.name}** - ${meta.summaryVi ?? meta.summary} | \`${meta.status}\` |`),
    ].join(NL),

    select: () => packs.map(({ meta }) => [
      `### \`${meta.id}\` - ${meta.name} *(${meta.status})*`,
      '',
      meta.summary,
      '',
      meta.optimisesFor ? `**Optimises for:** ${meta.optimisesFor}` : null,
      meta.density ? `**Density:** ${meta.density}` : null,
      '',
      '**Choose it when the project is:**',
      '',
      ...(meta.when || []).map((w) => `- ${w}`),
      '',
      '**Do NOT choose it for:**',
      '',
      ...(meta.notFor || []).map((w) => `- ${w}`),
      '',
      `Skill name: \`${meta.skill.name}\``,
      '',
      `Keywords: ${(meta.keywords || []).map((k) => `\`${k}\``).join(', ')}`,
    ].filter((l) => l !== null).join(NL)).join(NL + NL),

    llms: () => packs.map(({ meta }) =>
      `- [${meta.id}](${RAW}dist/gemini/${meta.id}.GEMINI.md): ${meta.name} (${meta.status}). ${meta.summary} NOT for ${(meta.notFor || [])[0] ?? 'n/a'}.`
    ).join(NL),
  };

  for (const file of ['README.md', 'docs/README.vi.md', 'INSTALL.md', 'llms.txt']) {
    const path = join(ROOT, file);
    if (!existsSync(path)) continue;
    let body = read(path);
    let touched = false;
    for (const [kind, render] of Object.entries(renderers)) {
      const re = new RegExp(`(<!-- PACKS:START:${kind} -->)[\\s\\S]*?(<!-- PACKS:END:${kind} -->)`, 'g');
      if (!re.test(body)) continue;
      body = body.replace(re, `$1${NL}${render()}${NL}$2`);
      touched = true;
    }
    if (touched) emit(path, body);
  }
}

// --- run --------------------------------------------------------------------

lintCore();
const core = coreFiles();

const ids = (only.length ? only : readdirSync(PACKS))
  .filter((d) => !d.startsWith('_') && !d.startsWith('.'))
  .filter((d) => statSync(join(PACKS, d)).isDirectory());

if (!ids.length) { console.error('No packs found.'); process.exit(1); }

if (!CHECK && !only.length && existsSync(DIST)) rmSync(DIST, { recursive: true });

const loaded = [];
for (const id of ids) {
  const pack = loadPack(id);
  if (!pack) continue;
  buildClaude(pack, core);
  buildMerged(pack, core, 'gemini');
  buildMerged(pack, core, 'gpt');
  buildCustomGpt(pack);
  loaded.push(pack);
}

// The catalogue describes every pack, so it is only correct on a full build.
// Building one pack would otherwise silently drop the others from the index.
if (!only.length) {
  buildIndex(loaded);
  injectPackTables(loaded);
}

if (problems.length) {
  console.error(NL + 'Problems:' + NL + problems.map((p) => '  - ' + p).join(NL) + NL);
  process.exit(1);
}

const summary = loaded.map((p) => `${p.meta.id} (${p.meta.status})`).join(', ');

if (CHECK) {
  if (stale.length) {
    console.error(NL + 'Out of date. Run `node tools/build.mjs`:' + NL +
      stale.map((p) => '  - ' + p).join(NL) + NL);
    process.exit(1);
  }
  console.log(`Current. ${core.length} core files, ${loaded.length} pack(s): ${summary}`);
} else {
  console.log(`Built ${written.length} files from ${core.length} core files and ${loaded.length} pack(s): ${summary}`);
}
