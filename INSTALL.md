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
  outcome — see step 6. Inventing a pack that does not exist, or forcing the
  nearest one, is the failure mode this step exists to prevent.
- **Status matters.** `stable` is ready to use. `beta` is usable with gaps.
  `draft` is not ready; tell the user before installing one.

## Step 3 — Pick the format for the assistant that will use it

Match the **consuming** assistant, which is not always the one running now. If a
human will use this with a different tool than you, install that tool's format.

| Assistant | Install | Notes |
|---|---|---|
| Claude Code, Claude Desktop | `dist/claude/<skill-name>/` → `.claude/skills/<skill-name>/` | Richest build. Loads a reference only when needed. |
| Gemini CLI / Code Assist | `dist/gemini/<id>.GEMINI.md` → `GEMINI.md` | One merged file, always in context. |
| Gemini Gem | same file | Paste into the Gem's Instructions field. |
| Codex, Cursor, any `AGENTS.md` tool | `dist/gpt/<id>.AGENTS.md` → `AGENTS.md` | Merge under a `## UI` heading if one exists. |
| Custom GPT | `dist/gpt/<id>.custom-gpt-instructions.md` | Fenced block → Instructions; `AGENTS.md` → Knowledge. |

**A caution for the merged builds.** `GEMINI.md` and `AGENTS.md` sit in context
on *every* request and currently run around 80KB. That is a real cost. If the
project's assistant supports on-demand loading, prefer that format. If you
install a merged file into a repo that already has one, **merge, do not
overwrite** — you will silently delete project instructions that had nothing to
do with UI.

## Step 4 — Fetch and install

Scope: install **per project** by default. Install globally only if the user
says so — a global install applies these opinions to every project they open.

### Option A — sparse checkout (no full clone)

```bash
git clone --depth 1 --filter=blob:none --sparse \
  https://github.com/DMonkey0908/ui-design-ecosystem.git /tmp/uids
cd /tmp/uids && git sparse-checkout set dist/claude/erp-ui-design
mkdir -p "$PROJECT/.claude/skills"
cp -r dist/claude/erp-ui-design "$PROJECT/.claude/skills/"
```

### Option B — fetch single files (no git)

```bash
BASE=https://raw.githubusercontent.com/DMonkey0908/ui-design-ecosystem/main

# Gemini
curl -fsSL "$BASE/dist/gemini/erp.GEMINI.md" -o GEMINI.md

# Codex / Cursor
curl -fsSL "$BASE/dist/gpt/erp.AGENTS.md" -o AGENTS.md
```

For a Claude skill, read `dist/index.json` for the skill name, then fetch
`SKILL.md`, every file listed under `core` and `pack`, and the assets. Use
`-f` (or your client's equivalent) so a 404 fails loudly — a skill missing half
its references fails quietly and confusingly later.

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

### Verify it actually fires

Do not report this as working without checking. Start a fresh session and ask
for something that should trigger it but does not name it:

> "Add a settings page with a table of API keys."

The response should show the system applied — tokens rather than raw hex,
`tabular-nums` on figures, a review pass — and should say which rules shaped it.
If it does not, the trigger is too narrow. Say so to the user rather than
leaving them to discover it.

## Step 6 — When no pack fits

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

## Step 7 — Verify, then report

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
- **Say what you did and how to undo it.** Anything that changes how an
  assistant behaves should be visible and reversible.
