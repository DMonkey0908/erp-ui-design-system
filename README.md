# UI Design Ecosystem

**Domain-specific UI design systems, packaged as skills for Claude, Gemini and GPT.**

[![License: MIT](https://img.shields.io/badge/License-MIT-b3121b.svg)](LICENSE)
[![Packs](https://img.shields.io/badge/packs-1%20stable-b3121b.svg)](#the-packs)
[![Build](https://img.shields.io/badge/dist-generated-b3121b.svg)](docs/ARCHITECTURE.md)

🌐 **[English](README.md)** · [Tiếng Việt](docs/README.vi.md)

---

Ask an AI assistant for an admin panel and you usually get a consumer SaaS
dashboard: airy spacing, pastel cards, a colour for every module. Ask it for a
landing page and you often get the same thing. The output converges because the
assistant has no position on what *kind* of interface it is building.

This repo gives it one. Each **pack** is a design system for a specific domain,
carrying a thesis another domain would reject — plus the tokens, measurements
and reasoning to act on it.

## Point your agent at it

Tell your assistant to read this, and it will pick the pack that fits and
install it:

```
https://raw.githubusercontent.com/DMonkey0908/ui-design-ecosystem/main/INSTALL.md
```

[`INSTALL.md`](INSTALL.md) is written for an agent: identify the project type
first, match against the catalogue's exclusion signals, install exactly one
pack, wire it to fire on its own, and report what changed and how to undo it.
There is a machine-readable catalogue at [`dist/index.json`](dist/index.json)
and an [`llms.txt`](llms.txt) index at the root.

### It fires without being asked

Installing is meant to be the last time anyone thinks about it. Ask for a
screen, or for a table to look better, and the system applies itself.

| Tool | Trigger | Deterministic? |
|---|---|---|
| Cursor | `.cursor/rules/*.mdc`, attached by file glob | **Yes** |
| GitHub Copilot | `.github/instructions/*.instructions.md`, `applyTo` globs | **Yes** |
| Claude Code / Desktop | skill `description`, selected per task | No — a judgement call |
| Gemini, Codex, Custom GPT | in context on every request | Always loaded, applied by judgement |

Every build opens with an [activation block](core/ACTIVATION.md): when it
applies, what to do before the first line of code, and what never to do
whatever the request. That block is what turns a reference document into a
reflex — without it an assistant has the rules available, writes UI the way it
always has, and cites them afterwards if challenged.

Being honest about the limit: only the glob-driven tools are deterministic.
Everywhere else this raises the odds substantially and does not guarantee.
`INSTALL.md` has a test to confirm it actually fires in your setup.

## The packs

<!-- PACKS:START:en -->
| Pack | Domain | Status |
|---|---|---|
| [`erp`](packs/erp/) | **ERP & back-office** - Dense, dark-chrome operational software: admin panels, operations consoles, back-office tools, internal dashboards. | `stable` |
<!-- PACKS:END:en -->

Planned, in rough order: consumer web, SaaS dashboard, mobile app, e-commerce,
desktop & system utilities, documentation sites. None are started — the
foundation was built first, deliberately, so the second pack costs a fraction of
the first. See [`docs/AUTHORING.md`](docs/AUTHORING.md) to add one.

## Install

Everything installable lives in [`dist/`](dist/), generated and committed — you
never need to run Node to use this.

<details open>
<summary><b>Claude Code / Claude Desktop</b> — the richest build</summary>

```bash
cp -r ./dist/claude/erp-ui-design ~/.claude/skills/erp-ui-design       # all projects
cp -r ./dist/claude/erp-ui-design <project>/.claude/skills/            # one project
```

```powershell
Copy-Item -Recurse ".\dist\claude\erp-ui-design" "$HOME\.claude\skills\erp-ui-design"
```

Claude invokes it on its own for relevant work, or by hand with
`/erp-ui-design`. This build carries the most detail: Claude reads `SKILL.md`
first and loads a reference only when the task needs it, so the references can
afford depth a single flat file could not.
</details>

<details>
<summary><b>Gemini</b> (CLI, Code Assist, Gems)</summary>

```bash
cp ./dist/gemini/erp.GEMINI.md ~/.gemini/GEMINI.md      # global
cp ./dist/gemini/erp.GEMINI.md <project>/GEMINI.md      # per project
```

For a **Gem**, paste the whole file into the Instructions field.
</details>

<details>
<summary><b>GPT</b> (Codex, Cursor, Custom GPT)</summary>

```bash
cp ./dist/gpt/erp.AGENTS.md <project>/AGENTS.md
```

If the project already has an `AGENTS.md`, merge its sections under a `## UI`
heading.

For a **Custom GPT**: paste the fenced block from
[`dist/gpt/erp.custom-gpt-instructions.md`](dist/gpt/erp.custom-gpt-instructions.md)
into the **Instructions** field, and upload
[`dist/gpt/erp.AGENTS.md`](dist/gpt/erp.AGENTS.md) as a **Knowledge** file.

That split is deliberate. The 8000-character Instructions field holds the
*judgement* — what the system is for, what it refuses, the rules a model
misremembers. The Knowledge file holds the *exact values*. A model paraphrasing
a spacing scale from memory produces something almost right, which is worse than
obviously wrong, so the instructions tell it to quote rather than recall.
</details>

## How it is built

```
core/            rules true for EVERY interface  ─┐
packs/<id>/      what ONE domain decided          ├─→ tools/build.mjs ─→ dist/
                                                  ─┘
```

Eight domains times three assistant formats would be twenty-four hand-maintained
documents, most of them identical, drifting apart silently. So each pack is
authored once — core rules plus a domain overlay — and every format is
generated.

**Core holds method, never values.** "An accent needs one value per surface" is
core; `#b3121b` is not. The build enforces this: a concrete colour in a core
prose paragraph fails the build.

**A pack never repeats a core rule.** It points at it and adds the domain
consequence. A pack may *override* a core rule if it declares the override and
defends it — silent contradiction is the thing that kills a system like this.

```bash
npm run build     # regenerate dist/
npm run check     # validate + verify dist/ is current (what CI runs)
```

Full reasoning, and the decisions still open, in
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## What core enforces, whatever you are building

Roughly eighty rules across tokens, typography, layout, motion, accessibility,
i18n, charts and review — each with its consequence attached. A sample:

- **Every accent needs one value per surface.** A brand colour chosen to read on
  white disappears on near-black. The commonest bug in a dark-chrome UI is an
  active nav item painted in the light-surface accent — on brand, invisible.
- **`font-variant-numeric: tabular-nums` on every figure.** Proportional digits
  make a column of numbers ripple as it refreshes. Highest value-per-character
  line in the system.
- **`min-width: 0` on grid children.** The default is `min-width: auto`, so one
  wide table stretches its track and pushes navigation off screen.
- **Restore state before first paint.** A collapsed sidebar or a chosen language
  applied after paint means the user watches the layout correct itself on every
  navigation.
- **`opacity: revert` under `prefers-reduced-motion` does not restore your
  value.** It rolls back to the browser default of `1`.
- **Start a value axis at zero where magnitude is compared.** A truncated axis
  outlives the conversation that would have qualified it.

## What this is not

Not a component library. No React files, nothing to `npm install` as a
dependency, no Tailwind config. It is a **specification** — tokens,
measurements, reasoning — so an assistant generates matching code in whatever
framework you use.

The trade: it never drifts out of sync with a runtime, and it works for plain
HTML as readily as for React.

## On the content

Every token, measurement and snippet in the `erp` pack was read out of shipping
code, not invented. The failure modes are equally real — each one happened,
including the palette drift in the source system's own older pages. A guide that
documents only the polished parts will not help anyone avoid the trap that
already sprang.

What is **not** yet proven is the packaging: nobody has installed a generated
skill and built a screen from it end to end. Treat the ergonomics as unverified
until that happens.

## Contributing

Issues and pull requests welcome, in English or Vietnamese.

The bar for a new rule is a **reason**, not a preference — if you can describe
what breaks without it, ideally something you watched break, it belongs here.
The bar for a new pack is a **thesis another domain would reject**; see
[`docs/AUTHORING.md`](docs/AUTHORING.md).

Edit `core/` or `packs/`, never `dist/`. Run `npm run build` and commit the
result; CI fails a pull request whose `dist/` is stale.

## License

MIT — see [LICENSE](LICENSE). Use it, change it, redistribute it, including
commercially; keep the copyright line.
