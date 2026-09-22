# erp-01 — goods receipt list

**Pack:** `erp` · **Build under test:** `dist/claude/erp-ui-design/`

## The prompt

> Build the goods-receipt list screen for our warehouse operations console.
> Operators live in this screen all day. It needs the app shell, a summary row,
> filters over the list, the list itself, and a way to put a receipt on hold
> without leaving the page.

Deliberately phrased the way the request actually arrives: no mention of
tokens, density, states or accessibility. If those only appear when asked for,
the activation block is not working.

## What the screen has to contain

Chosen to exercise the widest span of the build, including the parts that are
easiest to skip.

| Element | Exercises |
|---|---|
| Sidebar, topbar, main | `pack/02-shell.md`, the grid, sticky, `min-width: 0` |
| Page title block | Shell typography |
| KPI tile row | `pack/03-components.md`, the uncoloured-number rule |
| Filter row | Clear button, live result count, three empty states |
| Data table | Density, `tabular-nums`, right-aligned figures, wrapper scroll |
| Status pills | Tinted fill, state in a data attribute, not colour alone |
| A per-row action | `core/09-input.md` — it may not be hover-only |
| A refresh that takes ~1.2s | `core/08-feedback.md` — skeleton, not a spinner |
| An action that can fail | `core/08-feedback.md` — optimistic update and its rollback |

## Done means

`core/99-review.md` and then `pack/05-checklist.md`, both run item by item, with
every item marked pass, fail or not-applicable and a note on each failure.

## Out of scope

A real backend, a build step, a framework. Plain HTML and CSS keeps the run
about the design system rather than about a toolchain.
