# Surfaces, palette and scales

The concrete values. Core (`01-tokens`, `02-typography`, `04-motion`) holds the
method and the reasoning; this file holds what this domain picked.

## The two-surface model

Every surface is either **ink** (chrome) or **paper** (content). This is not a
light/dark theme toggle — both exist on the same screen at the same time,
permanently.

| | Ink | Paper |
|---|---|---|
| What lives here | Sidebar, topbar, hero KPI tiles | Cards, tables, forms, dropdowns, tooltips, modals |
| Job | Recede. Frame the work. | Hold the work. |
| Background | `#0a0a0c` – `#1c1c21` | `#ffffff`, page `#f6f7f9` |
| Text ramp | `#f1f1f4` / `#b9b9c2` / `#7f7f8a` | `#0f172a` / `#475569` / `#94a3b8` |
| Border | `#2a2a32` | `#e2e8f0`, inputs `#cbd5e1` |
| Hover | `rgba(255,255,255,0.06)` | `#f7f8fa` |
| Corner radius | 2–4px (sharp) | 6–12px (soft) |
| Shadow | none, ever | only when it floats |

**The chrome is sharper than the content.** Square corners on the shell read as
structural — a window frame, not a card. Soft corners on content read as
touchable.

A dropdown or tooltip hanging off the dark topbar is still **paper**: white,
12px radius, slate shadow. It holds content, so it follows the content rules.

## The token file

Ships as `assets/theme.css`. The accent's two values are the part to get right —
`#b3121b` on `#0a0a0c` is unreadable, which is why `--brand-red-on-dark` exists.

```css
:root {
  /* ----- Brand (swap to rebrand) ----- */
  --brand-red:         #b3121b;   /* on paper */
  --brand-red-hover:   #8d0d15;
  --brand-red-dark:    #6e0a10;
  --brand-red-light:   #e11d2e;
  --brand-red-on-dark: #f2555e;   /* the same brand, legible on ink */

  --brand-red-tint:   #fdf2f3;
  --brand-red-tint-2: #fbdfe1;
  --brand-red-tint-3: #f6c9cd;
  --brand-red-border: #efc4c7;

  --brand-red-a08: rgba(179, 18, 27, 0.08);
  --brand-red-a12: rgba(179, 18, 27, 0.12);
  --brand-red-a18: rgba(179, 18, 27, 0.18);
  --brand-red-a25: rgba(179, 18, 27, 0.25);
  --brand-red-a35: rgba(179, 18, 27, 0.35);

  --brand-red-gradient:      linear-gradient(135deg, #7d0d13 0%, #b3121b 45%, #d81f2a 130%);
  --brand-red-gradient-soft: linear-gradient(135deg, #b3121b 0%, #e11d2e 100%);

  /* ----- Ink (chrome) ----- */
  --ink-950: #0a0a0c;  --ink-900: #101013;  --ink-850: #16161a;
  --ink-800: #1c1c21;  --ink-700: #26262d;
  --ink-border: #2a2a32;  --ink-border-soft: #1f1f26;
  --ink-text: #f1f1f4;  --ink-text-dim: #b9b9c2;  --ink-text-muted: #7f7f8a;
  --ink-hover: rgba(255, 255, 255, 0.06);
  --ink-active: rgba(255, 255, 255, 0.10);
  --ink-tile: linear-gradient(160deg, #16161a 0%, #0c0c0f 100%);

  /* ----- Paper (content) ----- */
  --paper: #ffffff;  --paper-2: #f7f8fa;  --paper-3: #f1f3f5;  --paper-bg: #f6f7f9;
  --paper-text: #0f172a;  --paper-text-2: #475569;  --paper-text-3: #94a3b8;
  --paper-border: #e2e8f0;  --paper-border-strong: #cbd5e1;

  /* ----- Semantic ----- */
  --state-success: #16a34a;
  --state-warning: #ca8a04;
  --state-danger:  #ef3b3b;   /* brighter and more orange than the brand */
  --state-danger-dark: #c81e1e;
  --state-info:    #3f3f46;   /* neutral ink, not blue */
}
```

Two choices worth keeping when rebranding:

**`--state-danger` is not the brand.** In a red-accent palette an error painted
in brand red is indistinguishable from a primary button, so danger is pushed
brighter and more orange — "this failed" must never read as "click me".

**Info is neutral ink, not blue.** A blue info state here would be a second
colour competing for attention with nothing to say. If the brand is blue, invert
this and make info a neutral grey.

## Type

**Inter**, weights 400/500/600/700/800, with a system fallback stack. Monospace
(`ui-monospace, SFMono-Regular, Menlo, Consolas`) for keys, paths, IDs and
anything copyable.

Base `font-size` on `body` is **13px** — the high-density standard. Shell in
`em` so the frame scales with it; content in `rem`.

| rem | px @13 | Used for |
|---|---|---|
| 0.72 | 9.4 | Tile labels, table headers, metadata terms |
| 0.75 | 9.8 | Field labels, small buttons, link buttons, tooltips |
| 0.8125 | 10.6 | Table body, buttons, notes, status text |
| 0.875 | 11.4 | Inputs, definition values |
| 1.0 | 13 | Card titles |
| 1.25 | 16.3 | Tile values (the number itself) |
| 1.5 | 19.5 | Page `h1` |

Weights: 400 input text, 500 nav, 600 labels and buttons, 700 titles and values,
800 badge counts only. Prose capped at `max-width: 72ch`.

## Space

A 2px grid. The values that recur:

| Value | Where |
|---|---|
| `20px 22px` | Inside a card |
| `16px` | Gap between stacked cards |
| `12px` | Between form fields |
| `8px 12px` | Table cell, nav item |
| `5px` | Label to input |
| `24px 28px 36px` | Main content padding, `16px` under 820px |

Content max-width: **1600px** for table-heavy pages, **1200px** for form-heavy
ones. Beyond that, following a single table row becomes a journey for the eye.

## Radii

```
2px    shell sub-elements
4px    shell nav items, toggles
6px    inputs, buttons
8px    cards, tiles, tooltips, table wrappers, segmented controls
12px   floating dropdowns and popovers
999px  pills, badges, status chips
50%    avatars, status dots
```

## Elevation

Flat by default. Shadow is slate, never black, and only for things that float:

```css
--shadow-float:   0 18px 40px -12px rgba(15, 23, 42, 0.25),
                  0 6px 12px -6px  rgba(15, 23, 42, 0.12);
--shadow-tooltip: 0 8px 24px rgba(15, 23, 42, 0.14);
--shadow-raised:  0 1px 2px rgba(15, 23, 42, 0.12);
```

The sidebar and topbar have **no shadow** — a 1px hairline separates them. A
shadow there makes the shell look like it is hovering over the page instead of
containing it.

## Motion

Within core's bands, this domain runs at the fast end:

| Duration | For |
|---|---|
| 0.12s | Dropdown item hover |
| 0.15s | Standard background and colour change |
| 0.16s | Dropdown open/close |
| 0.18–0.22s | Transform, rotate, layout width |
| 0.32s | A one-off entrance flourish |

`ease` for a state change, `cubic-bezier(0.22, 0.61, 0.36, 1)` for travel.

## Focus

```css
/* On ink — inset, so the ring is not clipped by a flush cell */
:focus-visible { outline: 2px solid var(--brand-red); outline-offset: -2px; }

/* On paper — outset, softer, paired with a border shift on inputs */
input:focus-visible {
  outline: 2px solid var(--brand-red-a35);
  outline-offset: 1px;
  border-color: var(--brand-red);
}
```
