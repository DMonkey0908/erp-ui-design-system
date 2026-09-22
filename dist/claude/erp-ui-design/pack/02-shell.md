# The shell — page skeleton, sidebar, topbar, responsive

## The grid

The whole application is one CSS grid. The sidebar spans both rows, so it runs
the full height of the viewport and the topbar starts to its right.

```css
.erp-shell {
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr;   /* 240px */
  grid-template-rows:    var(--topbar-height) 1fr;   /*  64px */
  grid-template-areas:
    "sidebar topbar"
    "sidebar main";
  min-height: 100vh;
  transition: grid-template-columns 0.22s ease;
}

.erp-shell.is-collapsed { grid-template-columns: var(--sidebar-collapsed) 1fr; } /* 72px */
```

Both the sidebar and the topbar are `position: sticky; top: 0`, so a long table
scrolls under a bar that stays put. Sticky, not fixed — fixed takes the element
out of flow and the grid stops doing the work for you.

Dimensions: sidebar `240px` open / `72px` collapsed, topbar `64px`.

## State restored before paint, and stylesheet order

Both are core rules — see `core/03-layout.md`. What this pack pins down:

- The keys are `app.sidebar.collapsed`, `app.user` (for role-gated nav) and
  `app.preferences` (language). All three affect layout or visibility, so all
  three are applied to `<html>` inline in `<head>`, before the stylesheets.
  `assets/page-template.html` ships the script, and `assets/erp-shell.css`
  ships this whole section as a file.
- Order is `theme.css` -> `erp-shell.css` -> page `styles.css`. A page
  stylesheet may define tokens in terms of theme tokens, never as literals.
- Because the class lands on `<html>` while the runtime toggle sets it on the
  shell container, every collapsed rule needs both selectors:

```css
.erp-shell.is-collapsed .nav-label,
html.sb-collapsed .erp-shell .nav-label { display: none; }
```

## Sidebar

```
brand         fixed height, logo swaps to a 26px mark when collapsed
nav           flex: 1, scrolls, thin scrollbar
  section     0.68em / 700 / uppercase / 1.4px tracking / muted
  item        8px 12px, 10px gap, icon 22px box with an 18px svg
footer        collapse toggle, separated by a hairline
```

```css
.erp-sidebar {
  background: linear-gradient(180deg, var(--ink-950) 0%, var(--ink-900) 100%);
  border-right: 1px solid var(--ink-border);
  display: flex; flex-direction: column;
  position: sticky; top: 0; height: 100vh;
}
```

### The nav item

```css
.nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 12px; margin: 2px 0;
  border-radius: 4px;
  border-left: 3px solid transparent;   /* reserved for the active rail */
  color: var(--ink-text-dim);
  font-size: 0.92em; font-weight: 500;
  position: relative;
  isolation: isolate;
  transition: background 0.15s ease, color 0.15s ease;
}

.nav-item:hover { background: var(--ink-hover); color: var(--brand-on-dark); }
```

**Reserve the 3px transparent border on every row, active or not.** That is what
keeps the label from shifting sideways when the selection moves. Adding the
border only to the active item is the classic version of this bug.

### The active item

Two ways to mark it. Both keep the reserved border; pick one per project.

**Flat** — correct default for a dense, quiet tool:

```css
.nav-item.is-active {
  background: var(--brand-a18);
  color: var(--brand-on-dark);
  border-left-color: var(--brand);
  border-top-left-radius: 0; border-bottom-left-radius: 0;
}
```

**Lit** — a rounded rail that emits, a bloom that falls off across the row.
Costs nothing in layout and reads well on near-black:

```css
.nav-item.is-active {
  background: linear-gradient(90deg, var(--glow-soft) 0%, var(--glow-faint) 55%, transparent 100%);
  color: var(--brand-on-dark);
  border-left-color: transparent;
  text-shadow: 0 0 14px var(--glow-soft);
}

/* The emitter. Absolute offsets resolve against the padding box, so -3px
   lands it exactly over the transparent border every row already reserves. */
.nav-item.is-active::before {
  content: ''; position: absolute;
  left: -3px; top: 4px; bottom: 4px; width: 3px;
  border-radius: 0 3px 3px 0;
  background: var(--brand-on-dark);
  box-shadow: 0 0 6px  1px var(--glow-strong),
              0 0 18px 4px var(--glow-soft),
              0 0 34px 10px var(--glow-faint);
}

/* The bloom it casts into the row. */
.nav-item.is-active::after {
  content: ''; position: absolute;
  left: -8px; top: 50%; width: 140px; height: 150%;
  transform: translateY(-50%);
  background: radial-gradient(ellipse at left center, var(--glow-soft) 0%, transparent 72%);
  pointer-events: none;
  z-index: -1;
}

.nav-item.is-active .nav-icon { filter: drop-shadow(0 0 7px var(--glow-strong)); }
```

Two mechanics to carry over:

- `isolation: isolate` on the row gives it its own stacking context, so the
  `z-index: -1` bloom sits between the row background and its text instead of
  sinking behind the sidebar.
- Drive the whole effect from `--glow-strong` / `--glow-soft` / `--glow-faint`
  at ~0.55 / 0.20 / 0.05 alpha of the on-dark accent, so recolouring is one edit.

### Collapsed state

Hide `.nav-label`, `.nav-badge`, `.sidebar-section` and the toggle text; centre
the item; swap the wordmark for the square mark. Keep the icons and the active
rail. Collapse is icon-only navigation, not a different navigation.

## Topbar

Sharp corners, no shadow, a single hairline underneath, and cells that stretch
full height so hover fills the bar edge to edge.

```
[ page title ......................... ] [ 🔔 56px ] │ [ avatar · name · role ▾ ]
```

- Title `1.15em / 700`, truncates with an ellipsis, never wraps.
- Icon buttons are a fixed 56px wide (48px under 640px), `border-radius: 0`,
  `align-self: stretch`. Hover fills the whole cell.
- **Exactly one vertical divider**, before the user menu. It separates identity
  from actions. A second divider turns the bar into a toolbar and the effect is
  lost.
- Focus rings inset (`outline-offset: -2px`) so they are not clipped.

### Dropdowns

`position: fixed`, anchored `top: calc(var(--topbar-height) - 4px); right: 16px`.
Fixed, not absolute: the topbar is a flex container and an absolute child gets
clipped by it.

They are **paper** — white, 12px radius, two-layer slate shadow — even though
they hang off dark chrome. They hold content, so they follow the content rules.

```css
.dropdown {
  opacity: 0; transform: translateY(-6px) scale(0.98);
  pointer-events: none;
  transform-origin: top right;
  transition: opacity 0.16s ease, transform 0.16s ease;
}
.dropdown.is-open { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
```

Animate opacity and transform, never `display`. Under 640px, let them span the
viewport with `left: 8px; right: 8px; width: auto; max-width: 380px`.

## Main area

```css
.erp-main {
  grid-area: main;
  background: var(--paper-bg);
  padding: 24px 28px 36px;
  min-width: 0;        /* lets a wide table scroll instead of blowing the grid */
  overflow-x: hidden;
}
.erp-main > .container { max-width: 1600px; margin: 0 auto; }
```

`min-width: 0` is load-bearing here for the reason core gives in `03-layout.md`:
without it one wide table stretches the grid track and pushes the sidebar off
screen. In this shell that is the single most common layout bug.

Page title block, not a hero banner:

```css
.page-title h1 { font-size: 1.5em; font-weight: 700; margin: 0 0 4px; letter-spacing: -0.01em; }
.page-title p  { font-size: 0.92em; color: var(--paper-text-2); margin: 0; }
```

## Responsive

| Breakpoint | Change |
|---|---|
| 1024px | Drop the user name and role from the topbar; keep the avatar |
| 820px | Sidebar defaults to icon-only; main padding to 16px |
| 640px | Icon buttons to 48px; dropdowns span the viewport |
| 520px | Form grids to one column; charts to 240px tall |

Under 820px the sidebar collapses **by default** but the footer toggle still
expands it. Navigation must stay reachable without a hamburger.

## Accessibility, structurally

- `<aside aria-label="Primary navigation">` and `<nav aria-label="Modules">`.
- `aria-current="page"` on the active item — `.is-active` is styling, this is
  the announcement.
- Suppress reload when the already-active tab is clicked. A full navigation to
  the current URL re-runs every page script and throws away unsaved state.
- The `.sr-only` utility from core ships in `assets/theme.css`; the collapsed
  sidebar depends on it, since at 72px the visible label is gone.

## Internationalisation

Core (`core/06-i18n.md`) covers the mechanics. The shell-specific consequences:

- Nav labels never wrap. A two-line nav item changes the row height and the
  whole sidebar reflows, so they truncate with an ellipsis instead.
- Budget ~35% width headroom on nav labels and the topbar title. The collapsed
  72px sidebar is the safety valve: at that width the label is gone and only the
  icon carries meaning, which is why icons are mandatory and not decorative.
- The topbar title truncates rather than wrapping - the bar is a fixed 64px.
