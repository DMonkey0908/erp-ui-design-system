# Installing a pack — a guide for AI agents

**If you are an AI coding agent, this file is addressed to you.** A human has
pointed you here to fit a UI design system to their project. Work through it in
order and do not skip step 1.

If you are a human: everything here works by hand too, and the short version is
in the [README](README.md).

Canonical URL of this file:

```
https://raw.githubusercontent.com/DMonkey0908/ui-design-ecosystem/main/INSTALL.md
```

Machine-readable catalogue, if you would rather parse than read:

```
https://raw.githubusercontent.com/DMonkey0908/ui-design-ecosystem/main/dist/index.json
```

---

## Step 1 — Work out what is being built

**Do not skip to the catalogue.** Picking the wrong pack is worse than picking
none: a pack is opinionated by design, and applying operational density to a
marketing page produces something confidently wrong that the user then has to
argue you out of.

Answer these from the repository you are in and from what the user said. Where
the codebase can answer, believe the codebase over an assumption.

1. **Who uses it, and how often?** A trained operator returning daily, or a
   stranger arriving once from a search result? This single question separates
   most packs.
2. **What is the screen's job?** Entering and comparing data, reading, browsing
   and choosing, monitoring, or persuading?
3. **What is the primary input and screen size?** Mouse on a large display,
   thumb on a phone, keyboard-first?
4. **Is there an existing design system?** Check for a token file, a Tailwind
   config, a component library. If one exists, say so before installing
   anything — these packs are opinionated and will fight it.
5. **What does the user actually want changed?** "Make it look professional" and
   "build the settings screen" call for different amounts of this.

If you cannot answer 1 and 2 with confidence, **ask the user one question**
rather than guessing. One question costs a turn; the wrong pack costs the whole
task.

## Step 2 — Match against the catalogue

<!-- PACKS:START:select -->
### `erp` - ERP & back-office *(stable)*

Dense, dark-chrome operational software: admin panels, operations consoles, back-office tools, internal dashboards.

**Optimises for:** The two-hundredth use by a trained operator, not the first impression.
**Density:** high - 13px base, 8px/12px table cells

**Choose it when the project is:**

- an internal business tool, admin panel or operations console
- a back-office screen or an operational dashboard
- a request to look like a real ERP rather than a consumer SaaS
- a screen that must stay readable through a full working day

**Do NOT choose it for:**

- marketing sites, landing pages or anything optimised for a first impression
- consumer mobile apps - the density assumes a mouse and a large screen
- content-first reading experiences - blogs, documentation, editorial
- storefronts and product pages, where the product image is the subject

Skill name: `erp-ui-design`

Keywords: `erp`, `admin panel`, `back-office`, `operations console`, `internal tool`, `dashboard`, `data table`, `dense`, `dark chrome`, `enterprise`
<!-- PACKS:END:select -->

### Matching rules

- **Read the "Do NOT choose it for" list first.** Exclusion is more reliable
  than attraction — a pack's positive description will sound plausible for
  almost anything.
- **Install exactly one pack.** Packs are complete systems with opinions that
  contradict each other. Two installed at once gives an assistant two answers
  for every question, and it will pick inconsistently.
- **If two packs both fit**, the project probably has two kinds of screen (a
  storefront and its admin). Install the pack for the part being worked on now,
  and tell the user the other half may want a different one later.
- **If nothing fits, install nothing and say so.** Core alone is a legitimate
  outcome — see step 7. Inventing a pack that does not exist, or forcing the
  nearest one, is the failure mode this step exists to prevent.
- **Status matters.** `stable` is ready to use. `beta` is usable with gaps.
  `draft` is not ready; tell the user before installing one.

## Step 3 — Pick the format for the assistant that will use it

Match the **consuming** assistant, which is not always the one running now. If a
human will use this with a different tool than you, install that tool's format.

| Assistant | Install | Always in context |
|---|---|---|
| Claude Code, Claude Desktop | `dist/claude/<skill-name>/` -> `.claude/skills/<skill-name>/` | ~200 tokens (the description only) |
| Gemini CLI / Code Assist | `dist/gemini/<id>-lean/` -> repo root | **~1,550 tokens** |
| Codex, Cursor, any `AGENTS.md` tool | `dist/gpt/<id>-lean/` -> repo root | **~1,550 tokens** |
| Gemini Gem | `dist/gemini/<id>.GEMINI.md` | whole file - paste-in only |
| Custom GPT | `dist/gpt/<id>.custom-gpt-instructions.md` | Fenced block -> Instructions; `<id>.AGENTS.md` -> Knowledge |

### Use the lean layout in a repository

`<id>-lean/` is a small entry file - `GEMINI.md` or `AGENTS.md` - with the
references beside it under `ui/`. The entry carries what must always be true:
the activation block, the thesis, the hard rules, and an index. The assistant
opens the one reference its task needs, the way the Claude skill already does.

That is **~1,550 tokens instead of ~21,000**, on every request, including every
request with nothing to do with UI.

The single merged `<id>.GEMINI.md` and `<id>.AGENTS.md` still exist, because a
Gem's Instructions field and a Custom GPT take text and not a directory. Use
them only where you cannot put files on disk.

**If a repo already has a `GEMINI.md` or `AGENTS.md`, merge - never overwrite.**
Copy the `ui/` directory, then append the entry file's content under a `## UI`
heading. Overwriting silently deletes project instructions that had nothing to
do with UI.

## Step 4 — Fetch and install

Scope: install **per project** by default. Install globally only if the user
says so — a global install applies these opinions to every project they open.

### Option A — sparse checkout (no full clone)

```bash
git clone --depth 1 --filter=blob:none --sparse \
  https://github.com/DMonkey0908/ui-design-ecosystem.git /tmp/uids
cd /tmp/uids
git sparse-checkout set dist/claude/erp-ui-design dist/gpt/erp-lean

# Claude
mkdir -p "$PROJECT/.claude/skills"
cp -r dist/claude/erp-ui-design "$PROJECT/.claude/skills/"

# Codex / Cursor / any AGENTS.md tool - lean layout
cp -r dist/gpt/erp-lean/ui "$PROJECT/"
cp dist/gpt/erp-lean/AGENTS.md "$PROJECT/AGENTS.md"   # or append, if one exists
```

### Option B — fetch single files (no git)

```bash
BASE=https://raw.githubusercontent.com/DMonkey0908/ui-design-ecosystem/main

# Lean entry file (preferred). Fetch ui/ alongside it - see below.
curl -fsSL "$BASE/dist/gemini/erp-lean/GEMINI.md" -o GEMINI.md
curl -fsSL "$BASE/dist/gpt/erp-lean/AGENTS.md"   -o AGENTS.md

# Single merged file - only where you cannot put files on disk
curl -fsSL "$BASE/dist/gemini/erp.GEMINI.md" -o GEMINI.md
```

For a Claude skill or a lean layout, read `dist/index.json` for the file list,
then fetch the entry file plus every file under `core` and `pack` and the
assets. Use `-f` (or your client's equivalent) so a 404 fails loudly - an
install missing half its references fails quietly and confusingly later, at the
moment the assistant tries to open a file that is not there.

### Option C — degit

```bash
npx degit DMonkey0908/ui-design-ecosystem/dist/claude/erp-ui-design \
  .claude/skills/erp-ui-design
```

### Always

- **Add the install to version control** unless the user keeps assistant config
  out of the repo. A teammate without the skill gets different output.
- **Never edit files under `dist/`.** They are generated and will be overwritten
  on the next update. Project-specific deviations go in the project's own
  instruction file, alongside the reason.

## Step 5 — Make it fire on its own

**Do not skip this. It is the difference between a system that is installed and
one that is used.**

An installed pack that nobody remembers to invoke changes nothing. The goal is
that the next person who asks for a screen, or for a table to look better, gets
this system applied without saying its name.

How automatic that can be depends on the tool, and the difference is worth
knowing before you promise the user anything:

| Tool | Trigger | Deterministic? |
|---|---|---|
| Cursor | `.cursor/rules/*.mdc` with globs — attaches when a matching file is in play | **Yes** |
| GitHub Copilot | `.github/instructions/*.instructions.md` with `applyTo` globs | **Yes** |
| Claude Code / Desktop | Skill `description` — Claude selects it per task | No: a judgement call |
| Gemini, Codex, Custom GPT | The file is in context on every request | Always loaded, still applied by judgement |

For the judgement-call tools, the generated builds already open with an
activation block — when it applies, what to do before writing the first line,
and what never to do. That is what converts a reference document into a reflex.
Adding a project rules snippet on top makes it considerably more reliable.

### Cursor

```bash
BASE=https://raw.githubusercontent.com/DMonkey0908/ui-design-ecosystem/main
mkdir -p .cursor/rules
curl -fsSL "$BASE/dist/cursor/erp.mdc" -o .cursor/rules/erp-ui.mdc
```

### GitHub Copilot

```bash
mkdir -p .github/instructions
curl -fsSL "$BASE/dist/copilot/erp.instructions.md" \
  -o .github/instructions/erp-ui.instructions.md
```

### Claude Code, Codex, Windsurf, or any always-loaded rules file

Append the snippet to the project's own instruction file — `CLAUDE.md`,
`AGENTS.md`, `.windsurfrules`:

```bash
curl -fsSL "$BASE/dist/snippets/erp.project-rules.md" >> CLAUDE.md
```

**Append, never overwrite.** That file holds project instructions that have
nothing to do with UI, and replacing it is a silent, hard-to-notice loss.

The snippet is deliberately small: it carries the trigger and the hard rules,
and points at the installed skill for everything else. A rules file that
duplicates the whole system is a second copy that goes stale — and it is the
copy that is always in context, so it is the one that gets believed.

### Record what you did

**Write a manifest.** Removal later depends on it, and an agent that has to
guess which files it added is an agent that deletes somebody's `CLAUDE.md`.

`.ui-design-ecosystem.json`, at the project root:

```json
{
  "pack": "erp",
  "installed": "2026-09-22",
  "source": "https://github.com/DMonkey0908/ui-design-ecosystem",
  "scope": "project",
  "lifecycle": "keep",
  "created": [
    ".claude/skills/erp-ui-design/",
    ".cursor/rules/erp-ui.mdc"
  ],
  "appended": [
    { "path": "CLAUDE.md", "marker": "ui-design-ecosystem:erp" }
  ],
  "reinstall": "curl -fsSL https://raw.githubusercontent.com/DMonkey0908/ui-design-ecosystem/main/INSTALL.md"
}
```

`created` is only for paths **you** created. A file that already existed goes in
`appended` with its marker, never in `created`.

`lifecycle` is `keep` unless the user asked otherwise — see step 6.

### Verify it actually fires

Do not report this as working without checking. Start a fresh session and ask
for something that should trigger it but does not name it:

> "Add a settings page with a table of API keys."

The response should show the system applied — tokens rather than raw hex,
`tabular-nums` on figures, a review pass — and should say which rules shaped it.
If it does not, the trigger is too narrow. Say so to the user rather than
leaving them to discover it.

## Step 6 — Lifecycle: keep it, or tear it down when the work is over

Some users want the install to be temporary — in for the work, out when the work
is done. This is supported, and it is **opt-in**, because whether it is worth
doing depends entirely on the format and the answer is not obvious.

### What it actually saves

Idle cost, per request, when nobody is doing UI work:

| Format | Cost when idle | Worth removing? |
|---|---|---|
| Claude skill | ~200 tokens — only the `description` is loaded, for routing | **No.** You would trade automatic activation for a rounding error. |
| Cursor `.mdc` | 0 until a matching file is opened | **No.** It is already conditional. |
| Copilot instructions | 0 until a matching file is opened | **No.** Same. |
| Project rules snippet | ~340 tokens, every request | Marginal. |
| `GEMINI.md` / `AGENTS.md` | **~21,000 tokens, every request** | **Yes.** This is the one that matters. |

So: on a merged build this is a real optimisation and worth offering
unprompted. On a Claude skill it is close to pointless, and it costs the
automatic activation that made installing worthwhile — the next UI request
arrives with nothing loaded, and needs a network round trip to work.

**If the user asks for automatic removal across the board, say this once,
recommend `keep` for the skill and glob-driven formats, then do what they
decide.** It is their machine.

### Turning it on

Set `"lifecycle": "remove-after-task"` in the manifest, and append the policy
block so the assistant that does the work knows the install is temporary:

```bash
BASE=https://raw.githubusercontent.com/DMonkey0908/ui-design-ecosystem/main
curl -fsSL "$BASE/dist/snippets/erp.lifecycle.md" >> CLAUDE.md
```

### Removing, when the time comes

**Trigger:** the user says the UI work is finished. Their words. Not a passing
build, not a merged pull request, not your judgement that the screen looks done.

Then:

1. **Read `.ui-design-ecosystem.json`.** No manifest, no automatic removal —
   tell the user what you believe is installed and let them confirm. Guessing
   paths here is how a shared instructions file gets destroyed.
2. **Delete only what `created` lists**, and only when `scope` is `project`.
3. **For `appended`, delete between the `:begin` and `:end` markers** and
   nothing else. Everything outside them belongs to the project.
4. **If a path is tracked in version control, ask first.** Deleting it is a
   repository change, and a teammate loses it too.
5. **Delete the manifest last**, and print its `reinstall` line so the user can
   bring it back with one command.

**Never remove** while UI work is unmerged, uncommitted or in review; when the
user has said only one screen is done; or when the install is global — a global
install belongs to the user, not to the task.

**Never remove a pack you did not install.** If the manifest is missing or names
a different session, say so and stop.

## Step 7 — When no pack fits

Common, and not a failure. Install **core only**: roughly eighty domain-neutral
rules — tokens, typography, layout, motion, accessibility, i18n, charts, review
— each with its consequence attached.

```bash
BASE=https://raw.githubusercontent.com/DMonkey0908/ui-design-ecosystem/main
mkdir -p .claude/skills/ui-core/core
for f in 01-tokens 02-typography 03-layout 04-motion \
         05-accessibility 06-i18n 07-charts 08-review; do
  curl -fsSL "$BASE/core/references/$f.md" -o ".claude/skills/ui-core/core/$f.md"
done
curl -fsSL "$BASE/core/CORE.md" -o .claude/skills/ui-core/core/CORE.md
```

Core has no `SKILL.md` of its own — write a short one naming the project's
domain, or paste the files into the project's existing instruction file.

Then tell the user their domain has no pack yet, and that
[`docs/AUTHORING.md`](docs/AUTHORING.md) covers adding one. A pack needs a
thesis another domain would reject; if their project has one, it is worth
writing down whether or not it is ever contributed back.

## Step 8 — Verify, then report

```bash
ls .claude/skills/erp-ui-design/           # SKILL.md, core/, pack/, assets/
head -4 .claude/skills/erp-ui-design/SKILL.md   # frontmatter: name + description
```

A Claude skill is broken unless `SKILL.md` starts with `---`, a `name:` and a
`description:`. A partial fetch is the likeliest cause.

Then tell the user, in three lines:

1. **Which pack, and the one reason it fits** — quoting a `when` line from the
   catalogue.
2. **The main thing it will change** about output. For `erp`: density goes up
   and the accent stops being decorative.
3. **What now triggers it**, and **how to undo it** — the paths to delete.
   If activation is a judgement call rather than a glob, say so plainly: it
   raises the odds, it does not guarantee them.

Do not present the install as a code change. It changes how future output is
generated, which the user should be able to reverse in one command.

## Updating

Packs change. Re-run the same fetch to update; the files are generated, so
nothing you would have edited is lost.

If the user has deviated from a pack deliberately, that deviation belongs in the
project's own instruction file with its reason — not as an edit inside the
installed skill, which the next update silently discards.

## Rules for you, the installing agent

- **Do not install more than one pack.** Contradictory systems produce
  inconsistent output.
- **Do not install a `draft` pack without saying so.**
- **Do not overwrite an existing `AGENTS.md`, `GEMINI.md` or `CLAUDE.md`.**
  Merge, and tell the user what you merged.
- **Do not install globally unless asked.**
- **Do not invent a pack.** If `dist/index.json` does not list it, it does not
  exist. Say so rather than approximating.
- **Do not edit `dist/`.** Contributions go to `core/` or `packs/`, rebuilt with
  `npm run build`.
- **Do not remove an install you did not make**, or one with no manifest, or a
  global one. Ask instead.
- **Do not treat a passing build as the user saying they are done.**
- **Say what you did and how to undo it.** Anything that changes how an
  assistant behaves should be visible and reversible.
