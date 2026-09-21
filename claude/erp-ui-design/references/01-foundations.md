# Foundations — tokens, type, space, motion

## The two-surface model

Every surface in the product is either **ink** (chrome) or **paper** (content).
This is not a light/dark theme toggle. Both exist on the same screen at the
same time, permanently.

| | Ink | Paper |
|---|---|---|
| What lives here | Sidebar, topbar, KPI tiles | Cards, tables, forms, dropdowns, modals |
| Job | Recede. Frame the work. | Hold the work. |
| Background | `#0a0a0c` – `#1c1c21` | `#ffffff`, page bg `#f6f7f9` |
| Text ramp | `#f1f1f4` / `#b9b9c2` / `#7f7f8a` | `#0f172a` / `#475569` / `#94a3b8` |
| Border | `#2a2a32` | `#e2e8f0` |
| Hover | `rgba(255,255,255,0.06)` | `#f7f8fa` |
| Corner radius | 2–4px (sharp) | 6–12px (soft) |

**The chrome is sharper than the content.** Square corners on the shell read as
structural — a window frame, not a card. Soft corners on content read as
touchable. Getting this backwards is what makes an ERP look like a consumer app
wearing a dark theme.

## Every accent needs two values

A brand colour picked to be legible on white will disappear on near-black, and
the reverse. Define both up front:

```css
--brand:         #b3121b;  /* on paper: text, buttons, chart series */
--brand-on-dark: #f2555e;  /* on ink: active nav, dark-surface text  */
```

The most common bug in a dark-chrome ERP is the active sidebar item painted in
the paper accent — technically on brand, and completely unreadable.

## The token set

Swap the brand values for the client colour; leave the rest. The alpha steps
matter as much as the solids: they are what make focus rings, glows and washes
consistent instead of hand-tuned per component.

```css
:root {
  /* ----- Brand (swap these) ----- */
  --brand:         #b3121b;   /* primary */
  --brand-hover:   #8d0d15;
  --brand-dark:    #6e0a10;
  --brand-on-dark: #f2555e;   /* the same brand, legible on ink */
  --brand-light:   #e11d2e;

  /* Tints for washes on white surfaces */
  --brand-tint:   #fdf2f3;
  --brand-tint-2: #fbdfe1;
  --brand-tint-3: #f6c9cd;
  --brand-border: #efc4c7;

  /* Translucent steps — focus rings, glows, hatches, chart fills */
  --brand-a08: rgba(179, 18, 27, 0.08);
  --brand-a12: rgba(179, 18, 27, 0.12);
  --brand-a18: rgba(179, 18, 27, 0.18);
  --brand-a25: rgba(179, 18, 27, 0.25);
  --brand-a35: rgba(179, 18, 27, 0.35);

  --brand-gradient:      linear-gradient(135deg, #7d0d13 0%, #b3121b 45%, #d81f2a 130%);
  --brand-gradient-soft: linear-gradient(135deg, #b3121b 0%, #e11d2e 100%);

  /* ----- Ink (chrome) ----- */
  --ink-950: #0a0a0c;
  --ink-900: #101013;
  --ink-850: #16161a;
  --ink-800: #1c1c21;
  --ink-700: #26262d;
  --ink-border:      #2a2a32;
  --ink-border-soft: #1f1f26;

  --ink-text:       #f1f1f4;
  --ink-text-dim:   #b9b9c2;
  --ink-text-muted: #7f7f8a;

  --ink-hover:  rgba(255, 255, 255, 0.06);
  --ink-active: rgba(255, 255, 255, 0.10);

  --ink-tile: linear-gradient(160deg, #16161a 0%, #0c0c0f 100%);

  /* ----- Paper (content) ----- */
  --paper:    #ffffff;
  --paper-2:  #f7f8fa;   /* table headers, tile fills, hover */
  --paper-3:  #f1f3f5;   /* segmented-control track */
  --paper-bg: #f6f7f9;   /* the page behind the cards */

  --paper-text:   #0f172a;
  --paper-text-2: #475569;
  --paper-text-3: #94a3b8;

  --paper-border:        #e2e8f0;  /* hairlines between rows */
  --paper-border-strong: #cbd5e1;  /* input borders */

  /* ----- Semantic ----- */
  --state-success:     #16a34a;
  --state-warning:     #ca8a04;
  --state-danger:      #ef3b3b;   /* brighter and more orange than the brand */
  --state-danger-dark: #c81e1e;
  --state-info:        #3f3f46;   /* neutral ink, not blue */
}
```

### Two decisions in there worth keeping

**`--state-danger` is not `--brand`.** When the brand is red, an error painted
in brand red is indistinguishable from a primary button. Danger is pushed
brighter and more orange so "this failed" never reads as "click me".

**Info is neutral ink, not blue.** In a red-accent palette, a blue info state
is a second colour competing for attention with nothing to say. If the brand is
blue, invert this and make info neutral grey instead.

## Type

One family: **Inter**, weights 400/500/600/700/800, with a system fallback
stack. Monospace (`ui-monospace, SFMono-Regular, Menlo, Consolas`) for keys,
paths, IDs and anything a user might copy.

Base `font-size` on `body` is **13px** — the high-density standard. The shell
sizes in `em` so it scales with that base; content sizes in `rem` so a card
never inherits a surprise from its container.

| rem | px @13 | Used for |
|---|---|---|
| 0.72 | 9.4 | Tile labels, table headers, metadata terms |
| 0.75 | 9.8 | Field labels, small buttons, link buttons, tooltips |
| 0.8125 | 10.6 | Table body, buttons, notes, status text |
| 0.875 | 11.4 | Inputs, definition values |
| 1.0 | 13 | Card titles |
| 1.25 | 16.3 | Tile values (the number itself) |
| 1.5 | 19.5 | Page `h1` |

Weights: 400 input text, 500 nav, 600 labels and buttons, 700 titles and
values, 800 badge counts only.

**Measure:** cap explanatory prose at `max-width: 72ch`. Long lines of small
grey text are the most-skipped element in any admin tool.

## Space

A 2px grid. In practice the values that recur:

| Value | Where |
|---|---|
| `20px 22px` | Inside a card |
| `16px` | Gap between stacked cards |
| `12px` | Between form fields |
| `8px 12px` | Table cell, nav item |
| `5px` | Label to input |
| `24px 28px 36px` | Main content padding, dropping to `16px` under 820px |

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

Flat by default. Shadow is reserved for things that genuinely float, and it is
always a two-layer shadow in slate, never black:

```css
/* dropdown / popover */
box-shadow: 0 18px 40px -12px rgba(15, 23, 42, 0.25),
            0 6px 12px -6px  rgba(15, 23, 42, 0.12);

/* tooltip */
box-shadow: 0 8px 24px rgba(15, 23, 42, 0.14);
```

The sidebar and topbar have **no shadow**. They are separated from the content
by a 1px hairline. A shadow there makes the shell look like it is hovering over
the page instead of containing it.

## Motion

| Duration | For |
|---|---|
| 0.12s | Dropdown item hover |
| 0.15s | Standard background and colour change |
| 0.16s | Dropdown open/close |
| 0.18s–0.22s | Transform, rotate, layout width |
| 0.32s | A one-off entrance flourish |

Easing is `ease` for a state change, `cubic-bezier(0.22, 0.61, 0.36, 1)` for
anything that travels a distance.

Ship this global guard on every project:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

One trap worth knowing: `opacity: revert` inside a reduced-motion override does
**not** restore your stylesheet value — `revert` rolls back to the previous
cascade origin, which for `opacity` is the browser default of `1`. State the
value you actually want.

## Focus

```css
/* On ink — inset, so the ring is not clipped by a flush cell */
:focus-visible { outline: 2px solid var(--brand); outline-offset: -2px; }

/* On paper — outset, softer, paired with a border shift on inputs */
input:focus-visible {
  outline: 2px solid var(--brand-a35);
  outline-offset: 1px;
  border-color: var(--brand);
}
```

Always `:focus-visible`, never `:focus` — a mouse click on a button should not
leave a ring behind.
