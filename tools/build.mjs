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
 *   dist/gemini/<id>-lean/GEMINI.md + ui/                    small entry, refs on disk
 *   dist/gpt/<id>-lean/AGENTS.md + ui/                       same, for AGENTS.md tools
 *   dist/gemini/<id>.GEMINI.md                               one merged file (paste-in)
 *   dist/gpt/<id>.AGENTS.md                                  one merged file (paste-in)
 *   dist/gpt/<id>.custom-gpt-instructions.md                 copied, if present
 *   dist/cursor/<id>.mdc, dist/copilot/...                   glob-driven rules
 *   dist/snippets/<id>.{project-rules,lifecycle}.md          append to a rules file
 *
 * Lean is the default for a repo; merged exists because a Gem's Instructions
 * field and a Custom GPT take text, not a directory. The difference is ~1.5k
 * tokens against ~21k, on every request.
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

// Used in the catalogue and the agent guide. If the repo is renamed, change
// them here and rebuild - lintUrls() then fails on any doc still carrying the
// old name.
const REPO = 'https://github.com/DMonkey0908/ui-design-ecosystem';
const RAW = 'https://raw.githubusercontent.com/DMonkey0908/ui-design-ecosystem/main/';

const args = process.argv.slice(2);
const CHECK = args.includes('--check');
const only = args.filter((a) => !a.startsWith('--'));

const problems = [];
const written = [];
const stale = [];

const NL = String.fromCharCode(10);

// Files whose contents are, or produce, an interface. Used by the glob-driven
// rule formats, which are the only ones that fire deterministically.
const GLOBS = [
  '**/*.css', '**/*.scss', '**/*.less',
  '**/*.jsx', '**/*.tsx', '**/*.vue', '**/*.svelte',
  '**/*.html', '**/*.astro',
  '**/tailwind.config.*', '**/theme.*', '**/tokens.*',
];

// The rules that go everywhere, including into files small enough that nothing
// else fits. Each one is cheap to obey and expensive to retrofit, and each has
// shipped from an assistant that had the full system available and did not open
// it.
const HARD_RULES = [
  'Use the project token file. Never write a raw colour outside it; if there is no token file, create one first.',
  'An accent needs one value per surface. A colour chosen to read on a light surface disappears on a dark one.',
  '`font-variant-numeric: tabular-nums` on every figure - tables, tiles, axis labels, tooltips.',
  'Never remove a focus outline without replacing it. Always `:focus-visible`, never `:focus`.',
  'Colour is never the only signal for a state. Pair it with an icon, a label or a position.',
  'Never put information or an action behind hover alone - a touchscreen has no hover, so it is absent rather than awkward.',
  'Match the waiting affordance to the wait: nothing under 300ms, a skeleton at real dimensions past a second, cancellable progress past five.',
  '`min-width: 0` on grid and flex children that can hold wide content; `minmax(0, 1fr)` on tracks.',
  'Honour `prefers-reduced-motion`, and state the end value explicitly - `opacity: revert` yields 1, not your value.',
  'Start a value axis at zero whenever magnitude is compared.',
  'Say which rules shaped the result when you are done.',
];

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

/**
 * Every github.com / raw.githubusercontent.com URL in the docs must point at
 * this repo.
 *
 * After a rename GitHub does redirect the old name, including on
 * raw.githubusercontent.com - verified against this repo's own rename. But the
 * redirect is a courtesy, not a guarantee: it lapses the moment anyone claims
 * the old name, and GitHub explicitly recommends updating links rather than
 * relying on it.
 *
 * So stale links do not fail at the moment you would catch them. They fail
 * later, for someone else, as a 404 mid-install and a half-fetched skill. This
 * guard makes them fail at build time instead.
 */
function lintUrls() {
  const docs = [
    'README.md', 'INSTALL.md', 'llms.txt',
    'docs/README.vi.md', 'docs/ARCHITECTURE.md', 'docs/AUTHORING.md',
    'core/CORE.md',
  ];
  const prefixes = [REPO, RAW.replace(/\/$/, '')];

  for (const file of docs) {
    const path = join(ROOT, file);
    if (!existsSync(path)) continue;
    const urls = read(path).match(/https:\/\/(?:raw\.githubusercontent\.com|github\.com)\/\S+/g) || [];
    for (const raw of urls) {
      const url = raw.replace(/[)>,.:;`'"\]]+$/, '');   // markdown punctuation, not part of the URL
      if (!prefixes.some((p) => url.startsWith(p))) {
        problems.push(`${file}: URL does not point at this repo - ${url}`);
      }
    }
  }
}

/**
 * Cross-pack checks. None of these can fail with one pack, which is why they
 * were written when the second arrived.
 *
 * - A keyword claimed by two packs makes them indistinguishable to an agent
 *   searching the catalogue, and it will pick by ordering rather than by fit.
 * - An override declared in pack.json but not defended in PACK.md is a silent
 *   contradiction of core, which is the failure this architecture exists to
 *   prevent.
 */
function lintPacks(packs) {
  const seen = new Map();
  for (const { meta } of packs) {
    for (const k of meta.keywords || []) {
      const key = k.toLowerCase().trim();
      if (seen.has(key)) {
        problems.push(`keyword "${k}" is claimed by both ${seen.get(key)} and ${meta.id} - an agent cannot tell them apart`);
      } else {
        seen.set(key, meta.id);
      }
    }
  }

  for (const { meta, dir } of packs) {
    const overrides = meta.core?.overrides ?? [];
    if (!overrides.length) continue;
    const body = read(join(dir, 'PACK.md'));
    if (!/^##\s+Overrides\s*$/m.test(body)) {
      problems.push(`${meta.id}: pack.json declares ${overrides.length} override(s) but PACK.md has no "## Overrides" section - an override must be defended where a reader will see it`);
    }
    for (const o of overrides) {
      if (!o.rule || !o.why) problems.push(`${meta.id}: every override needs both "rule" and "why"`);
    }
  }
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

/**
 * The activation block, stripped of its own preamble.
 *
 * It goes at the TOP of every build, ahead of the domain thesis. Without it a
 * build is a reference document: the assistant has the rules available, writes
 * UI the way it always has, and cites them afterwards if challenged. The block
 * is what turns having the rules into applying them, so it is kept short enough
 * to sit in context on targets that load everything on every request.
 */
function activationBlock() {
  const body = read(join(CORE, 'ACTIVATION.md'));
  const after = body.indexOf(NL + '---' + NL);
  const rules = after === -1 ? stripH1(body) : body.slice(after + 5);
  return rules.trim();
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
    activationBlock(),
    '',
    '---',
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
    'Before calling any work done, run `core/99-review.md` and then',
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
    '# Part 0 - Activation',
    '',
    demote(activationBlock()),
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
 * The lean layout: a small always-loaded entry file next to the references on
 * disk, for tools that read a single context file but can also open files.
 *
 * The merged build puts ~21k tokens in context on every request, including
 * every request that has nothing to do with UI. This gets that down to roughly
 * 800 by keeping only what must always be true - the activation block, the
 * domain thesis in brief, the hard rules - and having the agent open the one
 * reference its task needs, the way the Claude skill already does.
 *
 * The merged single file stays, because a Gem's Instructions field and a Custom
 * GPT take text, not a directory.
 *
 * The risk this trades for is real: an agent can answer from the index without
 * opening anything. The entry file is written to make that feel like the
 * shortcut it is, and the hard rules are there so even a lazy pass is not a
 * wrong one.
 */
function buildLean(pack, core, kind) {
  const { meta, dir } = pack;
  const entry = kind === 'gemini' ? 'GEMINI.md' : 'AGENTS.md';
  const root = join(DIST, kind, `${meta.id}-lean`);

  const coreRows = core.map((c) => `| \`ui/core/${c.file}\` | ${title(read(c.path), c.id)} |`).join(NL);
  const packRows = (meta.references || []).map((r) => `| \`ui/pack/${r.file}\` | ${r.title} |`).join(NL);
  const assetRows = (meta.assets || []).map((a) => `| \`ui/assets/${a.file}\` | ${a.note} |`).join(NL);
  const lastRef = (meta.references || []).slice(-1)[0]?.file ?? '05-checklist.md';

  // The thesis only - not the whole PACK.md, which is what this build exists to
  // stop loading on every request.
  //
  // Extraction is by heading, so a pack that names the section differently would
  // otherwise silently ship a lean build with no thesis in it - an index with no
  // statement of what it is indexing. Fail instead.
  const thesis = (read(join(dir, 'PACK.md')).match(/## The domain thesis\n+([\s\S]*?)\n## /) || [, ''])[1].trim();
  if (!thesis && kind === 'gemini') {
    problems.push(`${meta.id}: PACK.md needs a "## The domain thesis" section followed by another "## " heading - the lean build extracts it`);
  }

  const body = [
    `# ${meta.name} - UI design system`,
    '',
    `This project uses the \`${meta.id}\` UI design system. The rules are on disk`,
    `next to this file, under \`ui/\`. **This file is the index, not the system.**`,
    '',
    activationBlock(),
    '',
    '---',
    '',
    '## Read the file before you write the code',
    '',
    'Opening one reference costs a single tool call. Working from a',
    'half-remembered spacing scale produces something *almost* right, which is',
    'harder for a reviewer to catch than something obviously wrong - and it is',
    'what this system exists to prevent. Do not answer from this index.',
    '',
    '### Core - true for any interface',
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
    assetRows ? ['### Assets', '', '| File | What it is |', '|---|---|', assetRows, ''].join(NL) : '',
    `Finish by running \`ui/core/99-review.md\` and \`ui/pack/${lastRef}\`.`,
    '',
    '---',
    '',
    '## The thesis, so you know what you are applying',
    '',
    thesis,
    '',
    '## Hard rules - apply even before you open anything',
    '',
    HARD_RULES.map((r) => `- ${r}`).join(NL),
    '',
    '## Not for',
    '',
    (meta.notFor || []).map((n) => `- ${n}`).join(NL),
    '',
    `<!-- Generated by tools/build.mjs from core/ and packs/${meta.id}/. Do not edit. -->`,
    '',
  ].join(NL);

  emit(join(root, entry), body);
  for (const c of core) emit(join(root, 'ui', 'core', c.file), read(c.path));
  for (const r of meta.references || []) {
    emit(join(root, 'ui', 'pack', r.file), read(join(dir, 'references', r.file)));
  }
  for (const a of meta.assets || []) {
    emit(join(root, 'ui', 'assets', a.file), read(join(dir, 'assets', a.file)));
  }
}

/**
 * Glue files for tools that fire a rule automatically from a file glob.
 *
 * These are the only targets where activation is deterministic rather than a
 * judgement call: Cursor and Copilot attach a rule when a matching file is
 * opened or edited, whether or not the model thought to reach for it. Everywhere
 * else the assistant still decides, and the activation block is what it decides
 * from.
 *
 * Each file is small on purpose. It carries the trigger and the hard rules, and
 * points at the full build for anything more - a rule file that duplicates the
 * whole system is a second copy that goes stale.
 */
function buildGlue(pack) {
  const { meta } = pack;

  const globs = GLOBS;
  const rulesMd = HARD_RULES.map((r) => `- ${r}`).join(NL);
  const full = `${RAW}dist/gpt/${meta.id}.AGENTS.md`;

  // Cursor: .mdc front matter drives attachment. `globs` attaches the rule when
  // a matching file is in play; description lets the agent pull it otherwise.
  emit(join(DIST, 'cursor', `${meta.id}.mdc`), [
    '---',
    `description: ${meta.summary} Apply when creating or changing any user interface.`,
    `globs: ${globs.join(',')}`,
    'alwaysApply: false',
    '---',
    '',
    `# ${meta.name} - UI rules`,
    '',
    `This project uses the \`${meta.id}\` UI design system.`,
    `Optimises for: ${meta.optimisesFor ?? meta.summary}`,
    '',
    '## Apply when',
    '',
    'Creating, styling or laying out any interface; changing how one looks;',
    'adding or restyling a chart, table, form, dialog, menu or empty state;',
    'answering "make this look better"; reviewing a UI.',
    '',
    '## Hard rules - apply without being asked',
    '',
    rulesMd,
    '',
    '## Not for',
    '',
    (meta.notFor || []).map((n) => `- ${n}`).join(NL),
    '',
    `Full system: ${full}`,
    '',
    `<!-- Generated by tools/build.mjs. Do not edit. -->`,
    '',
  ].join(NL));

  // GitHub Copilot: applyTo takes a comma-separated glob list.
  emit(join(DIST, 'copilot', `${meta.id}.instructions.md`), [
    '---',
    `applyTo: "${globs.join(',')}"`,
    '---',
    '',
    `# ${meta.name} - UI instructions`,
    '',
    `This project uses the \`${meta.id}\` UI design system: ${meta.summary}`,
    '',
    'When creating or changing any interface, apply these before writing code.',
    '',
    rulesMd,
    '',
    `Full system: ${full}`,
    '',
    `<!-- Generated by tools/build.mjs. Do not edit. -->`,
    '',
  ].join(NL));

  // A paste-in block for a project's own CLAUDE.md / AGENTS.md / .windsurfrules.
  // Always-loaded files do not need the whole system - they need the trigger and
  // a pointer to the skill that holds it.
  //
  // The markers matter: this block is APPENDED to a file that holds unrelated
  // project instructions. Without a delimiter, removing it later means an agent
  // guessing which lines it added, and the failure mode is deleting somebody
  // else's rules.
  emit(join(DIST, 'snippets', `${meta.id}.project-rules.md`), [
    `<!-- ui-design-ecosystem:${meta.id}:begin -->`,
    `## UI work`,
    '',
    `This project uses the \`${meta.id}\` UI design system (${meta.name}).`,
    '',
    `**Before creating or changing any interface** - a page, a screen, a component,`,
    `a chart, or how any of them look - load the \`${meta.skill.name}\` skill and`,
    `follow it. If the skill is not installed, fetch ${full}.`,
    '',
    'Apply these whether or not the skill is loaded:',
    '',
    rulesMd,
    '',
    `<!-- Generated by tools/build.mjs. Do not edit. Source: ${REPO} -->`,
    `<!-- ui-design-ecosystem:${meta.id}:end -->`,
    '',
  ].join(NL));

  // Optional lifecycle policy, appended alongside the rules when the user wants
  // the install torn down after the work is finished.
  //
  // Worth the numbers before choosing it. Idle cost per request: a Claude skill
  // is only its description (~200 tokens), a Cursor rule loads on a glob match,
  // but a merged GEMINI.md or AGENTS.md is ~21k tokens on EVERY request. So
  // this policy is close to pointless on the first two and substantial on the
  // last - and on all of them it trades away the automatic activation that made
  // the install worth doing.
  emit(join(DIST, 'snippets', `${meta.id}.lifecycle.md`), [
    `<!-- ui-design-ecosystem:${meta.id}:lifecycle:begin -->`,
    '## UI design system - temporary install',
    '',
    `The \`${meta.id}\` UI design system in this project is installed **for the`,
    'current piece of work only**.',
    '',
    'When the user confirms that the UI work is finished - their words, not your',
    'inference from a passing build - remove it:',
    '',
    '1. Read `.ui-design-ecosystem.json` at the project root. It lists exactly',
    '   what was installed and what was appended.',
    '2. Delete only the paths it records as created, and only where `scope` is',
    '   `project`. Never touch a global install; it is not yours to remove.',
    '3. For an appended block, delete between its `:begin` and `:end` markers and',
    '   nothing else. The rest of that file is unrelated project instruction.',
    '4. If a path is tracked in version control, ask before deleting - removing',
    '   it is a repository change and a teammate loses it too.',
    '5. Delete the manifest last, and print the reinstall command it carries so',
    '   the user can bring it back in one line.',
    '',
    '**Do not remove it** while any UI change is unmerged, uncommitted or under',
    'review, or when the user has only said one screen is done. "Finished" means',
    'the work this was installed for is over, not that a step passed.',
    '',
    `Reinstall: ${RAW}INSTALL.md`,
    '',
    `<!-- Generated by tools/build.mjs. Do not edit. -->`,
    `<!-- ui-design-ecosystem:${meta.id}:lifecycle:end -->`,
    '',
  ].join(NL));
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
        gemini: `dist/gemini/${meta.id}-lean/`,
        geminiSingleFile: `dist/gemini/${meta.id}.GEMINI.md`,
        gpt: `dist/gpt/${meta.id}-lean/`,
        gptSingleFile: `dist/gpt/${meta.id}.AGENTS.md`,
        customGpt: meta.customGpt ? `dist/gpt/${meta.id}.${meta.customGpt}` : null,
        cursor: `dist/cursor/${meta.id}.mdc`,
        copilot: `dist/copilot/${meta.id}.instructions.md`,
        projectRules: `dist/snippets/${meta.id}.project-rules.md`,
        lifecycle: `dist/snippets/${meta.id}.lifecycle.md`,
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
lintUrls();
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
  buildLean(pack, core, 'gemini');
  buildLean(pack, core, 'gpt');
  buildCustomGpt(pack);
  buildGlue(pack);
  loaded.push(pack);
}

// Cross-pack checks need every pack loaded, so they only run on a full build.
if (!only.length) lintPacks(loaded);

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
