# ERP UI Design System

**A design system for dense, dark-chrome business software — packaged as a skill for Claude, Gemini and GPT.**

[![License: MIT](https://img.shields.io/badge/License-MIT-b3121b.svg)](LICENSE)
[![Claude Skill](https://img.shields.io/badge/Claude-Skill-b3121b.svg)](claude/erp-ui-design/SKILL.md)
[![GEMINI.md](https://img.shields.io/badge/Gemini-GEMINI.md-b3121b.svg)](gemini/GEMINI.md)
[![AGENTS.md](https://img.shields.io/badge/GPT-AGENTS.md-b3121b.svg)](gpt/AGENTS.md)

🌐 **[English](README.md)** · [Tiếng Việt](docs/README.vi.md)

---

Ask an AI assistant for an admin panel and you usually get a consumer SaaS
dashboard: airy spacing, pastel cards, a colour for every module. It looks
pleasant in a screenshot and it is wrong for the job. Internal tools are used
for eight hours a day by people who were trained on them.

This repo gives an assistant the other thing — the tokens, measurements and
reasoning of a real ERP front end — so it produces operational software instead.
Extracted from a production system, not invented for a demo.

## The one idea

> **Chrome is dark. Content is white. The accent only marks state and action.**

The sidebar and topbar are near-black and recede. Every surface holding
something a person reads, compares or edits — cards, tables, dropdowns, form
fields — stays white. One accent marks the selected nav item, the primary
button and the chart series. Nothing else.

A consumer dashboard uses colour for delight. An ERP uses colour as a *signal*,
so when something is red it means something. Spend the accent on decoration and
you have spent the only tool you had for saying "look here".

Everything here optimises for the **two-hundredth use**, not the first
impression.

## Quick start

Clone, then run the line for your assistant from the repo root.

<details open>
<summary><b>Claude Code / Claude Desktop</b> — the most complete build</summary>

```bash
# All projects
cp -r ./claude/erp-ui-design ~/.claude/skills/erp-ui-design

# Or one project
cp -r ./claude/erp-ui-design <your-project>/.claude/skills/erp-ui-design
```

```powershell
# Windows
Copy-Item -Recurse ".\claude\erp-ui-design" "$HOME\.claude\skills\erp-ui-design"
```

Claude invokes it on its own for relevant work — building an admin panel,
reviewing an internal UI, designing an operations dashboard. Invoke it by hand
with `/erp-ui-design`.

This build carries the most detail. Claude reads `SKILL.md` first and loads only
the reference file the current task needs, so the references can afford depth a
single flat file could not.
</details>

<details>
<summary><b>Gemini</b> (CLI, Code Assist, Gems)</summary>

```bash
cp ./gemini/GEMINI.md ~/.gemini/GEMINI.md          # global
cp ./gemini/GEMINI.md <your-project>/GEMINI.md     # per project
```

For a **Gem**, paste the whole file into the Instructions field.
</details>

<details>
<summary><b>GPT</b> (Codex, Cursor, Custom GPT)</summary>

```bash
cp ./gpt/AGENTS.md <your-project>/AGENTS.md
```

If the project already has an `AGENTS.md`, merge these sections under a `## UI`
heading.

For a **Custom GPT**: paste the fenced block from
[`gpt/custom-gpt-instructions.md`](gpt/custom-gpt-instructions.md) into the
**Instructions** field, and upload [`gpt/AGENTS.md`](gpt/AGENTS.md) as a
**Knowledge** file.

That split is deliberate. The 8000-character Instructions field holds the
*judgement* — what the system is for, what it refuses, and the rules a model
misremembers. The Knowledge file holds the *exact values*. A model paraphrasing
a spacing scale from memory produces something almost right, which is worse than
obviously wrong, so the instructions tell it to quote rather than recall.
</details>

## What is inside

```
erp-ui-design-system/
├── claude/erp-ui-design/            ← canonical, most detailed
│   ├── SKILL.md                     principles + which reference to open
│   ├── references/
│   │   ├── 01-foundations.md        tokens, type scale, spacing, radii, motion
│   │   ├── 02-shell.md              grid layout, sidebar, topbar, responsive, i18n
│   │   ├── 03-components.md         card, button, form, table, tile, pill, tooltip
│   │   ├── 04-charts.md             SVG charts, value-mapped gradients, a11y
│   │   └── 05-checklist.md          review checklist + real failure modes
│   └── assets/
│       ├── theme.css                the token file — drop into a new project
│       └── shell-skeleton.html      page skeleton, including the anti-flash script
├── gemini/GEMINI.md                 single-file build
└── gpt/
    ├── AGENTS.md                    single-file build
    └── custom-gpt-instructions.md   7997-character build for a Custom GPT
```

`claude/erp-ui-design/references/` is the **source of truth**. `GEMINI.md` and
`AGENTS.md` are identical in substance — one design system, two filenames,
because the two tools look for different names. Edit the references first, then
sync the merged files; the Custom GPT build is condensed and maintained by hand.

## A sample of what it enforces

Roughly thirty rules, each with the reason attached. A few that change output
immediately:

- **Every accent needs two values, one per surface.** A brand colour chosen to
  read on white disappears on near-black. The commonest bug in a dark-chrome ERP
  is an active sidebar item painted in the paper accent — technically on brand,
  completely invisible.
- **`font-variant-numeric: tabular-nums` on every figure.** Proportional digits
  make a column of numbers ripple as it refreshes. The highest-value one-liner
  in the system.
- **Reserve the active-state border on every row.** A left border added only to
  the selected nav item shifts every label sideways as the selection moves.
- **`min-width: 0` on grid items.** A grid child defaults to `min-width: auto`,
  so one wide table stretches its column and pushes the sidebar off screen.
- **Restore state before first paint.** A collapsed sidebar or a translated
  label applied after paint means the user watches the layout correct itself on
  every navigation.
- **Danger is not the brand.** When the brand is red, an error in brand red is
  indistinguishable from a primary button.

## Built for multilingual products

The shell reference treats internationalisation as structure, not an
afterthought: marked nodes rather than templated strings, the source language
left in the HTML so a page stays reviewable without the translation layer
running, a pre-paint guard so a translated page never flashes English first, and
roughly 35% width headroom for languages that run longer than English.

## Rebranding

The pack ships a crimson (`#b3121b`) as its reference accent.

1. Change the `--brand*` block at the top of `assets/theme.css`.
2. **Recompute `--brand-on-dark`** — the step most often skipped. It is the
   *same* brand colour lifted until it reads on near-black. `#b3121b` on
   `#0a0a0c` is unreadable. Every accent needs both values.
3. Recompute the `--brand-a08` … `--brand-a35` alpha steps from the new RGB.
4. If the new brand is **blue**, invert the "info is not blue" rule and make the
   info state a neutral grey instead.

Nothing else needs to move.

## What this is not

It is not a component library. No React files, nothing to `npm install`, no
Tailwind config. It is a **specification** — tokens, measurements and reasoning
— so an assistant can generate matching code in whatever framework you use.

The trade: it never drifts out of sync with a runtime, and it works for plain
HTML as readily as for React.

## On the content

Every token, measurement and snippet was read out of shipping code, not
invented. The failure modes in `05-checklist.md` are equally real — each one
happened, including:

- the accent used on the wrong surface (an invisible active tab on a dark sidebar)
- a border added only when active, shifting every label by 3px
- `opacity: revert` under `prefers-reduced-motion` silently becoming `1`
- an area gradient left on the default `objectBoundingBox`, making two charts of
  wildly different magnitude look identical
- **palette drift** — pages written before the token file still shipping raw hex
  (`#e0e7ff`, `#3730a3`): an indigo that exists nowhere in a palette which
  explicitly has no blue

That last one is in the pack **because** it is a flaw in the source system. A
guide that documents only the polished parts will not help anyone avoid the trap
that already sprang.

## Contributing

Issues and pull requests are welcome, in English or Vietnamese.

The bar for a new rule is a **reason**, not a preference. If you can describe
what breaks without it — ideally something you watched break — it belongs here.
Changes go into `claude/erp-ui-design/references/` first, then get synced to the
merged builds.

## License

MIT — see [LICENSE](LICENSE). Use it, change it, redistribute it, including
commercially; keep the copyright line.

---

*Extracted from a production ERP front end, September 2026.*
