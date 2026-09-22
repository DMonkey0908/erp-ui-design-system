# Domain review checklist

Run **`core/99-review.md` first** — tokens, type, layout, state, accessibility,
motion, charts, i18n. Nothing there is waived by this domain.

This file is what an operational tool needs on top.

## Checklist

### Surfaces
- [ ] Chrome is dark, shadowless, separated by a 1px hairline.
- [ ] Every content container is `--paper` or `--paper-2`.
- [ ] Chrome corners are *sharper* than content corners (2–4px vs 6–12px).
- [ ] Dropdowns and tooltips hanging off dark chrome are still white.
- [ ] The on-dark accent is used on ink; the on-paper accent on paper. Check the
      active nav item specifically.

### Density
- [ ] Base `font-size` is 13px.
- [ ] Table cells are `8px 12px`; 20+ rows visible at 1080p.
- [ ] Content capped at 1600px (tables) or 1200px (forms).
- [ ] No component has been quietly loosened because one screen looked tight.

### Tables
- [ ] Header smaller than the body (0.72rem vs 0.8125rem).
- [ ] Hairlines between rows, no zebra striping.
- [ ] Last row has no bottom border.
- [ ] The wrapper scrolls; columns are not squeezed.
- [ ] Headers do not wrap.

### The shell
- [ ] The 3px transparent left border is reserved on **every** nav row.
- [ ] `aria-current="page"` ships alongside `.is-active`.
- [ ] Clicking the already-active nav item does not navigate.
- [ ] Exactly one vertical divider in the topbar, before the user menu.
- [ ] Topbar dropdowns are `position: fixed`, not absolute.
- [ ] Collapsed sidebar keeps icons and the active rail; navigation is still
      navigation, not a hamburger.
- [ ] Both selector forms exist for every collapsed rule
      (`.is-collapsed` and `html.sb-collapsed`).

### Components
- [ ] One primary button per card.
- [ ] `:hover:not(:disabled)` on every button.
- [ ] The `<label>` wraps its control; label quieter than the value.
- [ ] KPI tile numbers are **not** coloured; judgement lives in the sub-line.
- [ ] Status pills are tinted background with dark text, not saturated fill.
- [ ] State is in a `data-state` attribute, not only a class.
- [ ] Filter row has a self-hiding Clear button and a live match count.
- [ ] Row actions are visible without hovering, one per row, quieter than a
      button, and a toggle changes its own label.
- [ ] A reloading table shows skeleton rows in the real row structure, on a
      ~300ms timer, with the header left in place.
- [ ] Non-matching rows dim on the chart rather than vanishing.

## Failure modes specific to this domain

Core covers the universal ones. These are the ERP-shaped versions.

**The accent on the wrong surface.** The domain-specific instance: an active
sidebar item painted in `--brand` instead of `--brand-on-dark`. It
passes a brand review and is invisible against `#0a0a0c`. Check this first on
any dark-chrome build.

**The border that only exists when active.** A left border added to the selected
nav row shifts every label 3px as the selection moves. Reserve a transparent
border on all rows.

**Density relaxed one component at a time.** Nobody decides to abandon the
density; a card gets `padding: 28px` because it looked cramped, then a table row
gets `12px 16px`, and six months later the screen holds twelve rows. This is the
most likely way this pack stops being itself. Treat a spacing increase as a
change to the system, not to the component.

**A dark tile inside a white card.** The dark hero tile is for one row at the
top of a page. Placed inside a card it reads as a hole in the surface.

**A second colour introduced per module.** Each module gets a colour so users
"know where they are", and the accent stops meaning "act here". Distinguish
modules by icon and label.

**The gradient that stretches to fit.** An area fill left on the default
`objectBoundingBox` rescales to the tallest point, so a run peaking at 40k and
one peaking at 400k look identical. `userSpaceOnUse`, pinned to the scale.

**Palette drift in older pages.** Core names this one; the domain-shaped
version is an indigo. A page written before the token file ships `#e0e7ff`
chips and `#3730a3` text — in a system that explicitly has no blue at all, so
the drift is not a shade off, it is a hue that does not exist here. `--state-info`
borrows the neutral ink precisely so nobody has to invent one.

**Legacy classes kept as `display: none`.** Harmless once, a maze after a year.
If markup no longer ships, delete the rule and the markup together.

## Refusals

The table in `PACK.md` lists what this pack pushes back on and what to offer
instead. Name the cost, offer the alternative, then build whatever is decided —
and record the decision so nobody re-litigates it next quarter.
