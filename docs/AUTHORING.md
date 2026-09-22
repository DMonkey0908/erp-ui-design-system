# Authoring a pack

## Before you start: does this need to be a pack?

A pack earns its existence with a **thesis another domain would reject**.

- "Chrome is dark, content is white, the accent only marks state and action" —
  a marketing site would refuse this. It is a thesis.
- "Use consistent spacing and good contrast" — nobody would refuse it. It is
  core, or it is nothing.

If your thesis is not falsifiable, one of three things is true: it belongs in
`core/`, it is a variant of an existing pack, or the domain is not actually
different from one already covered.

## The contract

A pack is a directory under `packs/` containing:

```
packs/<id>/
├── pack.json                     metadata the build reads
├── PACK.md                       the domain thesis (no frontmatter — generated)
├── references/                   the domain's own rules
│   ├── 01-surfaces.md            concrete values
│   └── …
├── assets/                       optional: token file, skeletons, snippets
└── custom-gpt-instructions.md    optional: hand-written, 8000-char cap
```

### `pack.json`

| Field | Required | Notes |
|---|---|---|
| `id` | yes | Directory name. Lowercase, hyphenated. |
| `name` | yes | Human-readable, used as the H1 of every generated file. |
| `status` | yes | `draft`, `beta` or `stable`. Shown in the README index. |
| `summary` | yes | One sentence for the index. |
| `optimisesFor` | — | The reader or moment this domain optimises for. |
| `skill.name` | yes | Directory name of the generated Claude skill. |
| `skill.description` | yes | **The most load-bearing string in the pack.** See below. |
| `summaryVi` | — | Vietnamese summary, for the translated README's pack table. |
| `when` | — | Bullets listing when the pack applies. Feeds the merged builds and the agent selection guide. |
| `notFor` | **yes** | Bullets listing what the pack is wrong for. The build fails without it — an agent selects largely by exclusion, and a pack nobody can rule out gets chosen for work it ruins. |
| `keywords` | — | Search terms for the catalogue. |
| `surfaces` | — | The role table, so packs can be compared. |
| `density` | — | One line. |
| `core.include` | — | `"all"` today. Reserved for selective inclusion. |
| `core.leadWith` | — | Core file ids to read first, e.g. `["01-tokens"]`. |
| `core.overrides` | — | `[{ "rule": "...", "why": "..." }]`. Declare every contradiction. |
| `references` | yes | Ordered `[{ file, title }]`. Every `.md` in `references/` must be listed — the build fails otherwise, so a file cannot silently go unbuilt. |
| `assets` | — | `[{ file, note }]`. |
| `customGpt` | — | Filename, or `null`. |

### Writing `skill.description`

An assistant chooses a skill from this string and nothing else. It needs:

1. **What it builds** — name the artefacts: "app shells with a sidebar and
   topbar, data tables, filter rows, KPI tiles".
2. **When to use it** — the trigger phrases a user would actually type, not a
   category name. "when asked to make a UI look like a real ERP rather than a
   consumer SaaS" beats "for enterprise applications".
3. **What distinguishes it** from neighbouring packs, once there are any.

Too abstract and it never triggers. Too narrow and it triggers only on the
exact example. Write it last, when you know what the pack actually contains.

## Steps

```bash
cp -r packs/_template packs/<your-id>
```

1. **Fill in `pack.json`.** Leave `references` listing only what you will write.
2. **Write `PACK.md`.** Thesis first, under a heading spelled exactly
   `## The domain thesis` - the lean build extracts that section for the
   always-in-context entry file, and the build fails if it cannot find it. The
   template's comments are prompts; delete a section rather than leaving it
   generic.
3. **Write `references/01-surfaces.md`.** Concrete values. This is the file that
   makes the pack usable rather than aspirational.
4. **Add the domain's own references.** Split by what a reader needs at one
   time, not by taxonomy. Four to six files is typical.
5. **Add a `NN-checklist.md` last.** It points at `core/08-review.md` first,
   then lists only domain checks.
6. **Build.**

```bash
node tools/build.mjs <your-id>   # one pack
node tools/build.mjs             # everything
node tools/build.mjs --check     # what CI runs
```

7. **Commit `dist/`.** It is checked in so the repo works as a download.

The pack tables in `README.md`, `docs/README.vi.md`, `INSTALL.md` and
`llms.txt` are **generated** from `pack.json` — the build rewrites the regions
between the `PACKS:START` / `PACKS:END` markers. Do not edit them by hand. A
hand-maintained catalogue is a second source of truth, and the copy that goes
stale is the one an agent reads when it picks a pack.

## Activation

You do not write this. `core/ACTIVATION.md` is injected at the top of every
build, and the glue files for Cursor, Copilot and project rules files are
generated from `pack.json`.

What a pack owes the activation layer is accurate metadata:

- **`skill.description`** is the trigger for Claude. Cover the verbs UI work
  actually arrives as - not only "build", but restyle, fix the spacing, make
  this look better, review. A description that only matches "build an ERP" will
  sit unused through every "clean up this table".
- **`notFor`** is what stops the glob-driven tools firing the pack on the wrong
  file, and what an agent rules it out by.
- **`optimisesFor`** appears verbatim in the Cursor rule, so it has to read as
  an instruction, not as marketing.

If a rule is important enough that an assistant should never break it even
without loading the references, it belongs in `core/ACTIVATION.md` - which
means it must be universal. A domain-specific hard rule belongs in `PACK.md`
under non-negotiables instead.

## What core will reject

The build fails if `core/references/` gains a concrete colour outside a code
block. Beyond that, these belong in a pack, not core:

- Any size, spacing or duration value.
- Anything a reasonable domain would reverse — density above all.
- Component specifications.
- Aesthetic positions. Core says a shadow should be tinted rather than pure
  black, because pure black reads as dirt on any non-white surface. Core does
  not say whether to use shadows.

If you find yourself writing the same rule in a second pack, that is the signal
to move it into core — with a pull request against core, not a third copy.

## Style

The reference files are written to be read by an assistant **and** by a person
reviewing what the assistant did. That shapes the prose:

- **Every rule carries its consequence.** "Use `min-width: 0`" is forgettable.
  "A grid child defaults to `min-width: auto`, so one wide table pushes the
  sidebar off screen" is not. A rule with no stated failure is a preference.
- **Prefer the real failure.** The strongest entries are the ones that actually
  happened. Include the ones from your own codebase, including the embarrassing
  ones — a guide that documents only the polished parts will not help anyone
  avoid the trap that already sprang.
- **Show the code.** A CSS block with a comment on the load-bearing line beats a
  paragraph describing it.
- **Say what you refuse, and what to offer instead.** The refusals table is the
  most-used part of a pack in practice, because it is what lets an assistant
  push back usefully rather than complying silently.
- **No filler.** No "it is important to note". If a sentence survives being
  deleted, delete it.

## Reviewing a pack

- Is the thesis falsifiable? Would the other packs reject it?
- Does any paragraph repeat a core rule instead of pointing at it? This is the
  easiest rule in the system to break while writing naturally - two violations
  shipped into the first draft of the second pack, written by the person who
  wrote the rule. There is no build guard, because the check is semantic. Grep
  distinctive phrases from `core/` against your reference files before opening
  a pull request:

```bash
grep -rn "tabular-nums\|placeholder\|min-width: 0\|focus-visible" packs/<id>/references/
```

  A code example applying a core rule to a specific component is fine - that is
  the pack doing its job. Restating the rule's *rationale* is not.
- Does every rule state a consequence?
- Are overrides declared in `pack.json`, not just prose?
- Does `01-surfaces.md` contain real values, or placeholders?
- Does the checklist defer to `core/08-review.md` first?
- Does `skill.description` name trigger phrases a user would type?
- Does `notFor` genuinely exclude, or does it just restate `when` in the negative?
- Would an agent reading only `when` and `notFor` pick this pack for the right
  project, and rule it out for the wrong one? That is the whole selection
  contract — see `INSTALL.md` for how an agent actually uses it.
- Does `node tools/build.mjs --check` pass?
