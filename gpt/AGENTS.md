# ERP UI design system

Agent instruction file for GPT-based coding agents (OpenAI Codex, Cursor, any
tool that reads `AGENTS.md`). Drop it at the repo root, or merge these sections
into an existing `AGENTS.md` under a "UI" heading.

Byte-identical in substance to `gemini/GEMINI.md` — one design system, two
filenames. The canonical, longer source is
`claude/erp-ui-design/references/`.

Apply this whenever the work is an internal business tool, admin panel,
operations console, back-office screen or dashboard — and whenever asked to make
a UI "look like a real ERP" rather than a consumer app.

---

## 1. The one idea

**Chrome is dark. Content is white. The accent only marks state and action.**

The sidebar and topbar are near-black and recede. Every surface holding
something a person reads, compares or edits — cards, tables, dropdowns, form
fields — stays white. One brand accent marks the selected nav item, the primary
button and the chart series, and nothing else.

A consumer dashboard uses colour for delight. An ERP uses colour as a *signal*,
so when something is red it means something. Spend the accent on decoration and
you have spent the only tool you had for saying "look here".

These screens are used for eight hours a day by people who were trained on them.
Optimise for the two-hundredth use, not the first impression.

---

## 2. Two surfaces

| | Ink (chrome) | Paper (content) |
|---|---|---|
| Where | Sidebar, topbar, hero KPI tiles | Cards, tables, forms, dropdowns, tooltips, modals |
| Background | `#0a0a0c` – `#1c1c21` | `#ffffff`; page bg `#f6f7f9` |
| Text | `#f1f1f4` / `#b9b9c2` / `#7f7f8a` | `#0f172a` / `#475569` / `#94a3b8` |
| Border | `#2a2a32` | `#e2e8f0`; inputs `#cbd5e1` |
| Hover | `rgba(255,255,255,.06)` | `#f7f8fa` |
| Radius | 2–4px (sharp) | 6–12px (soft) |
| Shadow | none, ever | only if it floats |

**Chrome is sharper than content.** Square corners on the shell read as
structural — a window frame. Soft corners on content read as touchable.
Reversing this is what makes an ERP look like a consumer app in a dark theme.

A dropdown hanging off the dark topbar is still **paper**: white, 12px radius,
slate shadow. It holds content, so it follows content rules.

---

## 3. Tokens

Never write a raw hex outside this block. If a colour is needed that no token
covers, add a token. Page stylesheets may define their own tokens in terms of
these (`--chart-series: var(--brand)`) but never as literals.

```css
:root {
  /* Brand — swap these to rebrand; re-derive the alphas from the new RGB */
  --brand:         #b3121b;
  --brand-hover:   #8d0d15;
  --brand-dark:    #6e0a10;
  --brand-light:   #e11d2e;
  --brand-on-dark: #f2555e;   /* THE SAME BRAND, legible on ink */

  --brand-tint: #fdf2f3;  --brand-tint-2: #fbdfe1;
  --brand-tint-3: #f6c9cd; --brand-border: #efc4c7;

  --brand-a08: rgba(179,18,27,.08);  --brand-a12: rgba(179,18,27,.12);
  --brand-a18: rgba(179,18,27,.18);  --brand-a25: rgba(179,18,27,.25);
  --brand-a35: rgba(179,18,27,.35);

  /* Ink */
  --ink-950:#0a0a0c; --ink-900:#101013; --ink-850:#16161a;
  --ink-800:#1c1c21; --ink-700:#26262d;
  --ink-border:#2a2a32; --ink-border-soft:#1f1f26;
  --ink-text:#f1f1f4; --ink-text-dim:#b9b9c2; --ink-text-muted:#7f7f8a;
  --ink-hover:rgba(255,255,255,.06); --ink-active:rgba(255,255,255,.10);
  --ink-tile:linear-gradient(160deg,#16161a 0%,#0c0c0f 100%);

  /* Paper */
  --paper:#ffffff; --paper-2:#f7f8fa; --paper-3:#f1f3f5; --paper-bg:#f6f7f9;
  --paper-text:#0f172a; --paper-text-2:#475569; --paper-text-3:#94a3b8;
  --paper-border:#e2e8f0; --paper-border-strong:#cbd5e1;

  /* Semantic */
  --state-success:#16a34a; --state-warning:#ca8a04;
  --state-danger:#ef3b3b;  --state-danger-dark:#c81e1e;
  --state-info:#3f3f46;    /* neutral ink, not blue */
}
```

**Every accent needs two values.** A brand colour chosen to read on white
disappears on near-black. `--brand` on paper, `--brand-on-dark` on ink. The most
common bug in a dark-chrome ERP is an active sidebar item painted in the paper
accent — technically on brand, completely invisible.

**Danger is not the brand.** When the brand is red, an error in brand red is
indistinguishable from a primary button. Danger is brighter and more orange so
"this failed" never reads as "click me".

**Info is neutral ink, not blue.** In a red-accent palette a blue info state is
a second colour competing for attention with nothing to say. If the brand *is*
blue, invert this.

---

## 4. Type, space, radius, motion

**Inter**, 400/500/600/700/800. Monospace for keys, paths, IDs, anything
copyable. Base `font-size: 13px` — the high-density standard, and the single
line that gains an operator a third more rows per screen.

| rem | Used for |
|---|---|
| 0.72 | Tile labels, table headers, metadata terms |
| 0.75 | Field labels, small buttons, link buttons, tooltips |
| 0.8125 | Table body, buttons, notes, status text |
| 0.875 | Inputs, definition values |
| 1.0 | Card titles |
| 1.25 | Tile values |
| 1.5 | Page h1 |

Prose capped at `72ch`. Content capped at 1600px (tables) or 1200px (forms).

Spacing: card `20px 22px`; card gap `16px`; form fields `12px`; table cell and
nav item `8px 12px`; label to input `5px`; main `24px 28px 36px` → `16px` under
820px.

Radii: `2/4px` shell · `6px` controls · `8px` cards, tiles, tooltips, table
wrappers · `12px` floating panels · `999px` pills · `50%` avatars and dots.

Shadow is slate, never black, and only for things that float:
```css
--shadow-float:   0 18px 40px -12px rgba(15,23,42,.25), 0 6px 12px -6px rgba(15,23,42,.12);
--shadow-tooltip: 0 8px 24px rgba(15,23,42,.14);
```

Motion: 0.12s dropdown hover · 0.15s colour/background · 0.16s dropdown open ·
0.18–0.22s transform and layout · 0.32s a one-off flourish. `ease` for state,
`cubic-bezier(.22,.61,.36,1)` for travel. Always ship the
`prefers-reduced-motion` reset — and state end values explicitly inside it,
because `opacity: revert` reverts to the browser default of `1`, not to your
stylesheet.

Focus: always `:focus-visible`, never `:focus`. On ink
`outline: 2px solid var(--brand); outline-offset: -2px` (inset, so a flush cell
does not clip it). On paper `outline: 2px solid var(--brand-a35);
outline-offset: 1px; border-color: var(--brand)`.

---

## 5. Shell

```css
.shell {
  display: grid;
  grid-template-columns: 240px 1fr;      /* 72px collapsed */
  grid-template-rows: 64px 1fr;
  grid-template-areas: "sidebar topbar" "sidebar main";
  min-height: 100vh;
  transition: grid-template-columns .22s ease;
}
.main { grid-area: main; background: var(--paper-bg); padding: 24px 28px 36px;
        min-width: 0; overflow-x: hidden; }
```

Sidebar and topbar are `position: sticky; top: 0` — sticky, not fixed; fixed
takes them out of flow and the grid stops working for you.

`min-width: 0` on `.main` is mandatory. A grid child defaults to
`min-width: auto`, so one wide table stretches the column and pushes the sidebar
off screen. Same reason: grid columns use `minmax(0, 1fr)`, never plain `1fr`.

### Anti-flash — do not skip this

Any state restored from storage that affects layout or visibility must be
applied to `<html>` **inline in `<head>`, before the stylesheets**. Otherwise
the user watches the menu open and snap shut on every navigation.

```html
<script>
  try { if (localStorage.getItem('app.sidebar.collapsed') === '1')
          document.documentElement.classList.add('sb-collapsed'); } catch (_e) {}
  try { var u = JSON.parse(localStorage.getItem('app.user') || 'null');
        if (u && u.role !== 'Administrator')
          document.documentElement.classList.add('role-user'); } catch (_e) {}
  try { var p = JSON.parse(localStorage.getItem('app.preferences') || '{}');
        document.documentElement.lang = p.language || 'en';
        if ((p.language || 'en') !== 'en')
          document.documentElement.classList.add('i18n-pending'); } catch (_e) {}
</script>
<style>html.i18n-pending [data-i18n]{visibility:hidden}</style>
```

Every `try/catch` is load-bearing — `localStorage` throws outright in some
privacy modes, and one uncaught error blanks the page before any stylesheet has
loaded. Because the class lands on `<html>`, every collapsed rule needs both
selectors: `.shell.is-collapsed X` and `html.sb-collapsed .shell X`.

Stylesheet order, non-negotiable: `theme.css` → `shell.css` → page `styles.css`.

### Nav item

```css
.nav-item {
  display:flex; align-items:center; gap:10px;
  padding:8px 12px; margin:2px 0; border-radius:4px;
  border-left:3px solid transparent;   /* reserved on EVERY row */
  color:var(--ink-text-dim); font-size:.92em; font-weight:500;
  position:relative; isolation:isolate;
  transition:background .15s ease, color .15s ease;
}
.nav-item:hover { background:var(--ink-hover); color:var(--brand-on-dark); }
.nav-item.is-active {
  background:var(--brand-a18); color:var(--brand-on-dark);
  border-left-color:var(--brand);
  border-top-left-radius:0; border-bottom-left-radius:0;
}
```

**Reserve the 3px transparent border on every row**, active or not, or every
label shifts 3px as the selection moves.

Optional "lit" variant: a rounded `::before` rail at `left:-3px` (absolute
offsets resolve against the padding box, so it lands exactly in the reserved
border) with a three-layer `box-shadow` at ~.55/.20/.05 alpha, plus a
`z-index:-1` radial `::after` bloom. `isolation:isolate` on the row is what
keeps that bloom above the row background and below its text.

Ship `aria-current="page"` alongside `.is-active` — the class is styling, the
attribute is the announcement. Suppress reload when the active tab is clicked;
a navigation to the current URL re-runs every page script and drops unsaved
state.

### Topbar

Sharp corners, no shadow, one hairline underneath. Title `1.15em/700`,
ellipsis, never wraps. Icon buttons fixed 56px (48px under 640px),
`border-radius: 0`, `align-self: stretch` so hover fills the cell. **Exactly one
vertical divider**, before the user menu — a second one turns the bar into a
toolbar. Dropdowns are `position: fixed` (absolute gets clipped by the flex
topbar), animate opacity and transform, never `display`.

### Responsive

1024px drop user name/role · 820px sidebar defaults to icon-only, main pad 16px
· 640px icon buttons 48px, dropdowns span viewport · 520px form grids to one
column, charts 240px tall. Under 820px the sidebar collapses by default but the
footer toggle still expands it — navigation stays reachable without a hamburger.

---

## 6. Components

**Card** — the only container. `var(--paper)`, 1px `--paper-border`, radius 8px,
padding `20px 22px`. Head is `flex`, `justify-content: space-between`,
`flex-wrap: wrap` (that wrap is what stops a title colliding with its actions).
Title `1rem/700`. Note `0.8125rem`, `--paper-text-2`, `max-width: 72ch`.
Border, not shadow — cards sit on a grey page, a hairline is enough.

**Buttons** — three variants, that is the whole set.
```css
.btn { padding:8px 16px; border:1px solid var(--paper-border-strong);
       border-radius:6px; background:var(--paper); color:var(--paper-text);
       font:inherit; font-size:.8125rem; font-weight:600; cursor:pointer; }
.btn:hover:not(:disabled){ background:var(--paper-2); }
.btn:disabled { opacity:.55; cursor:default; }
.btn-primary { background:var(--brand); border-color:var(--brand); color:#fff; }
.btn-sm { padding:5px 12px; font-size:.75rem; }
.link-btn { padding:0; border:0; background:none; color:var(--brand);
            font-size:.75rem; font-weight:600; cursor:pointer; }
```
**One primary button per card.** `:hover:not(:disabled)` matters — a disabled
button that lights up reads as broken.

**Forms** — the `<label>` *is* the field wrapper: `flex-direction: column;
gap: 5px; min-width: 0`, label text `0.75rem/600` grey, input `8px 10px`,
`--paper-border-strong`, radius 6px, `0.875rem/400`. The label is smaller and
lighter than the value it labels — in a thirty-field form the values get
scanned, labels are reference. Grid `repeat(4, minmax(0,1fr))` → 2 → 1.

**Segmented control** for 2–4 exclusive options: real radios, visually hidden,
inside a recessed `--paper-3` track; the checked option is raised with
`background: var(--paper)` and `box-shadow: 0 1px 2px rgba(15,23,42,.12)`. No
accent needed.

**Tables** — the centre of gravity.
```css
.table-wrap { overflow-x:auto; border:1px solid var(--paper-border); border-radius:8px; }
.table { width:100%; border-collapse:collapse; font-size:.8125rem; }
.table th { padding:8px 12px; text-align:left; font-size:.72rem; font-weight:600;
            color:var(--paper-text-2); background:var(--paper-2);
            border-bottom:1px solid var(--paper-border); white-space:nowrap; }
.table td { padding:8px 12px; border-bottom:1px solid var(--paper-border); }
.table tr:last-child td { border-bottom:0; }
.table .num { text-align:right; font-variant-numeric:tabular-nums; white-space:nowrap; }
```
Header smaller than body. Hairlines, no zebra striping. The wrapper scrolls; the
table never shrinks to fit.

**`font-variant-numeric: tabular-nums` on every figure** — tables, tiles, axis
labels, tooltips. Proportional digits make a column of numbers ripple as it
refreshes. Highest-value one-liner in the system.

**KPI tiles** — `repeat(auto-fit, minmax(150px,1fr))`, label `0.72rem/600`,
value `1.25rem/700` tabular. **The number is not coloured** — tinting it green
or red passes judgement on a figure that may be neither. Put the judgement in
the sub-line where it can be worded.

**Status** — three weights: a dot before a label (quietest), a tinted pill
(`padding:2px 8px; border-radius:999px; font-size:.7rem/600`, tinted background
with dark text, never saturated fill with white text), or coloured text. Put the
state in `data-state="ok"` and let CSS read it, so the DOM says what is true and
a test can assert on it.

**Tooltip** — light, not dark: white, 8px radius, `--shadow-tooltip`,
`pointer-events: none` (or it fights the cursor that summoned it),
`overflow-wrap: anywhere` on the title for file names and IDs.

**Filter row** — `flex-wrap`, `align-items: flex-end`, controls `height: 36px`.
Three behaviours that make it feel finished: a Clear button hidden when nothing
is filtered; a live count in `aria-live="polite"` ("12 of 120 match"); and
non-matching rows that **dim rather than vanish** on an adjacent chart
(`opacity: .18`) — seeing what was excluded is most of the value of filtering.

**Empty states** — three distinct cases, three distinct sentences: nothing
exists yet (say what creates the first one), a filter excluded everything (say
so), the request failed (show the actual error). Collapsing all three into "No
data" wastes the one moment the screen had the user's attention.

---

## 7. Charts

Hand-written SVG by default; a library is 200KB and its own token system to draw
a line and four grid lines. Reach for one at brushing, zooming, or ~2000+ points.

Margins `{top:14, right:18, bottom:34, left:56}`, plot 300px (240px under
520px). Always handle `n === 1` — centre the point, nudge a duplicate into the
path or it renders as nothing.

Round the scale and leave ~8% headroom (`niceMax` with 1/2/2.5/5/10 steps), four
intervals, five compacted labels (`120k`). **Start at zero for anything compared
by size.** Horizontal grid lines only; vertical ones add ink without helping.
`shape-rendering: crispEdges` plus a `+0.5` y offset puts a 1px line on a device
pixel instead of blurring it across two.

Line: brand accent, 2px, round joins and caps. The area beneath is a **vertical
ramp anchored to the value scale**:

```js
const grad = svgEl('linearGradient', {
  id: 'areaFill',
  gradientUnits: 'userSpaceOnUse',  // NOT the default objectBoundingBox
  x1: 0, y1: m.top,                 // where yMax sits
  x2: 0, y2: y(0),                  // the zero line
});
[0, 0.45, 1].forEach(offset => grad.appendChild(svgEl('stop', { offset })));
```
```css
.area { fill: url(#areaFill); }
.area-grad stop { stop-color: var(--brand); }
.area-grad stop:nth-child(1) { stop-opacity: .34; }
.area-grad stop:nth-child(2) { stop-opacity: .13; }
.area-grad stop:nth-child(3) { stop-opacity: .015; }
```

Three deliberate choices: `userSpaceOnUse` pins the ramp to the scale, so a run
peaking at 40k and one at 400k do not both get an identically dense top; the
alpha lives on the **stops**, because a flat `opacity` on the path washes the
whole shape down by the same amount and destroys exactly the information the
gradient carried; and offsets stay in JS while colours stay in CSS.

Markers only up to ~60 points. Hit testing is **one transparent rect** over the
plot with a nearest-x lookup, not a handler per point — rescale client pixels to
viewBox units (`((clientX - rect.left) / rect.width) * W`), since the SVG is
`width:100%` with a fixed viewBox.

Accessibility is not optional here: `tabindex="0"` on the hit rect, arrow keys
to step, Home/End, Escape to dismiss; `role="img"` with a descriptive
`aria-label`; and **the numbers as a real table** in a `<details>` underneath.
That `<details>` is the only way a screen-reader user or anyone needing an exact
figure gets the data — and it doubles as the export surface.

Series colour: one series → the brand. Two to five → a ramp that survives
greyscale and red-green colour vision deficiency. More than five → the chart is
the wrong form; use a sorted table or small multiples. Never encode a category
in colour alone.

---

## 8. Checklist before calling it done

- No raw hex outside the theme file (grep page stylesheets for `#`).
- Both accent values exist and each is used on the right surface.
- `tabular-nums` on every figure; numeric columns right-aligned.
- Every interactive element has hover, focus-visible, disabled, active.
- `min-width: 0` on grid items; `minmax(0,1fr)` on columns.
- Three distinct empty states; errors show the real message.
- Landmarks labelled; `aria-current="page"` on the active nav item.
- Charts keyboard-steppable with a table fallback.
- `prefers-reduced-motion` honoured with explicit end states.
- Navigation reachable at 375px without a hamburger.
- No layout shift on load — space reserved.

## 9. Failure modes seen in practice

- Accent used on the wrong surface (invisible active nav item).
- Border added only to the active row → every label shifts 3px.
- Missing `min-width: 0` → one wide table pushes the sidebar off screen.
- State restored after first paint → visible flash on every navigation.
- `opacity: revert` under reduced motion → silently becomes `1`.
- Area gradient left on `objectBoundingBox` → two charts look identical.
- Proportional digits → a column that ripples on refresh.
- Per-point chart hit targets → users hunting a 4px circle.
- Colour as the only signal → a red row and a green row with identical text.
- A second primary button → the accent stops meaning "the action".
- **Palette drift in older pages** — the most common way this system dies. A
  page written before the token file ships `#e0e7ff` chips and `#3730a3` text,
  an indigo that exists nowhere in a palette that explicitly has no blue. It
  looks fine alone and wrong beside everything else. Audit for literals; the fix
  is mechanical.

## 10. When asked for something this system refuses

Name the cost, offer the nearest thing that works, then build what they decide.

| Request | Cost | Offer |
|---|---|---|
| Glassmorphism on cards | Contrast on the data — the whole budget | A border and a flat `--paper-2` fill |
| Airier spacing | A third fewer rows per screen | A density toggle, default compact |
| A colour per module | The accent stops signalling state | One accent; distinguish by icon and label |
| 16px rounded cards | Reads consumer, not operational | 8px — soft without being playful |
| Animated page transitions | Felt as lag at the 200th repetition | Instant nav with a 150ms content fade |

If they hear the cost and still want it, build it. It is their product. Record
the decision so nobody re-litigates it next quarter.
