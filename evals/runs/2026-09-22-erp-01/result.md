# Run 001 — erp-01, goods receipt list

| | |
|---|---|
| **Date** | 2026-09-22 |
| **Task** | [`evals/tasks/erp-01-order-list.md`](../../tasks/erp-01-order-list.md) |
| **Build under test** | `dist/claude/erp-ui-design/` (Claude skill layout) |
| **Administered by** | Claude Opus 5, which had also just written `core/08-feedback.md` and `core/09-input.md` |
| **Output** | `index.html`, `theme.css`, `shell.css`, `styles.css`, `app.js` |

**Read the honesty note in [`evals/README.md`](../../README.md) before trusting
the score.** A run administered by whoever wrote the rules tests whether the
answers are in the build. It does not test whether a cold assistant would have
gone looking for them, which is the more important question and remains open.

## Status

Findings 1–8 were fixed in the commit after this one. The record below is left
describing the state the run actually found, because a findings list rewritten
to match the fix stops being evidence. Finding 9 needed no fix.

The artefact here was later relinked against the pack's real `theme.css` and
`erp-shell.css`, both of which now ship what this run had to invent — so it
demonstrates the fixed pack rather than the state it was built against. A
review pass after run 002 also corrected the palette itself: see finding 7 of
[run 002](../2026-09-22-mobile-01/result.md), which turned out to apply to all
three packs.

## Verdict

The build is **usable end to end**. A complete, dense, accessible screen came
out of it, and every value in that screen traces to a token or a spec rather
than to taste. The reference set answered nearly everything; where it did not,
the gaps are specific and fixable rather than structural.

Nine findings, in descending order of how much they cost the next person.

---

## Findings

### 1 — The shell asset and the shell reference use different class names

`assets/shell-skeleton.html` marks up `.shell`, `.sidebar`, `.main`.
`pack/02-shell.md` ships the CSS for `.erp-shell`, `.erp-sidebar`, `.erp-main`
— and then, inconsistently, styles `.topbar` with no prefix, which is the one
name the two agree on.

Following the documented "start from the skeleton, keep the stylesheet order"
path therefore produces a page with no styles at all until you notice and
rename one side. Whichever side you fix, you are editing a shipped asset on
your first five minutes with the pack.

This run followed the reference's names, because the reference carries ~350
lines of copy-paste CSS against the skeleton's handful of class attributes.

**Fix:** pick one and make the other match. `.erp-*` is the safer prefix in a
project that already has a `.sidebar`.

### 2 — `03-components.md` ships raw hexes, which the pack forbids

The pack's own non-negotiable: *"Never write a raw hex outside the token file.
If a colour is needed that no token covers, add a token."* Its component
reference then specifies eight of them:

```
.btn-primary       color: #fff
.pill-success      #d1fae5 / #065f46
.pill-warning      #fef3c7 / #92400e
.pill-danger       #fee2e2 / #991b1b
.dropdown-item:hover          #f1f5f9
.dropdown-item.is-danger      #dc2626, #b91c1c, #fef2f2
.dropdown-divider             #eef2f6
```

None of these exist in `assets/theme.css`, so an implementer either copies the
snippet and breaks the rule, or stops and invents token names — which is what
this run did, in a block at the end of `theme.css` marked as such.

Worth noting why nothing caught it: `lintCore()` in `tools/build.mjs` enforces
"no concrete colour" against `core/` only. Packs are exempt by design, because
a pack is where values live — but *a pack's palette file* is where they live,
not its component file.

**Fix:** add the missing tokens to `assets/theme.css`, rewrite the snippets in
terms of them, and extend the lint so a hex outside a pack's designated palette
file fails the build the way it does in core.

### 3 — The "Lit" nav variant depends on three tokens the theme does not ship

`pack/02-shell.md` offers two treatments for the active nav item and gives the
lit one three glow layers driven by `--glow-strong`, `--glow-soft` and
`--glow-faint`. `assets/theme.css` defines none of them — the word "glow"
appears once, in a comment about the alpha steps.

The prose does say to derive them at ~0.55 / 0.20 / 0.05 alpha of the on-dark
accent, so this is recoverable. But a copy-paste of a complete, tempting CSS
block yields three undefined custom properties, which fail silently: no error,
no rail, just an active item that looks like every other item.

**Fix:** ship the three tokens in `theme.css`, commented as belonging to the
optional variant.

### 4 — No `shell.css` asset exists, though the skeleton links one

`shell-skeleton.html` has `<link rel="stylesheet" href="/shell.css">`. The pack
ships `theme.css` and the skeleton, and nothing else. Every project that starts
here re-derives roughly 350 lines of shell CSS out of prose — identically,
because the prose is specific enough that there is only one right answer.

That is exactly the work the repo exists to stop repeating. `theme.css` is
shipped rather than described for the same reason.

**Fix:** ship `assets/shell.css`. The file this run produced is a reasonable
starting point; it is written entirely in theme tokens and contains no page
content.

### 5 — The pack has no spec for a per-row action

`03-components.md` covers card, buttons, forms, table, tiles, pills, dropdown,
tooltip, filter row and empty states. It does not cover a control inside a
table row — which is the most common thing in an operational table, and now the
place where `core/09-input.md` forbids the default that most implementations
reach for, revealing it on row hover.

The pack is where that collision should be resolved, with a spec for a row
action that is always present and sized so a column of them does not out-shout
the data. This run invented one.

**Fix:** add a "Row actions" section to `03-components.md`, and a checklist
line: *a row action is visible without hovering.*

### 6 — The pack has no loading state, and "skeleton" now means two things

`core/08-feedback.md` requires a skeleton at the real dimensions of the content
for any wait past a second. The ERP pack — whose screens are tables that reload
constantly — specifies no loading appearance at all, so the sweep animation,
the cell proportions and the reduced-motion end state were all invented here.

Separately, `assets/shell-skeleton.html` uses "skeleton" to mean a page
template. Now that a loading skeleton is a core concept, the two collide in
exactly the place an assistant is grepping.

**Fix:** a loading-state section in `03-components.md`, and rename the asset to
`page-template.html`.

### 7 — "Only `transform` and `opacity` animate on long lists" is too absolute

Stated that way in `core/99-review.md`, the rule fails every hover state in the
system, including the pack's own `.nav-item`, which transitions `background`
and `color`.

The real cost is many elements animating a paint property **at once** — a
staggered entrance across 500 rows. One row transitioning under the cursor is
a single element and is free. As written, the checklist item cannot be passed
honestly by any interface that has hover feedback, and a rule that everyone
fails is a rule everyone learns to skip.

This run complied with the letter of it — the table has a hover fill and no
transition — which is fine here and would be wrong on a card grid.

**Fix:** reword to name the real constraint: *no property other than
`transform` and `opacity` animates across many elements simultaneously.*

### 8 — The skeleton's user menu is a `<div role="button">`

`core/05-accessibility.md` says to use the real element, and that an ARIA
reimplementation announces whatever you remembered. `shell-skeleton.html` ships
the account menu as a `<div role="button" tabindex="0">` with no Enter/Space
handling anywhere in the pack — so the shipped starting point is a control that
a keyboard user can focus and cannot operate.

**Fix:** `<button type="button">` in the asset. It is a one-word change and it
removes the need for every one of the ARIA attributes around it except
`aria-haspopup`, `aria-expanded` and `aria-controls`.

### 9 — Four rules were satisfied only by looking at core, after writing to the pack

Not a defect — the intended behaviour — but worth recording because the pack
reads as self-sufficient and is not. The pack alone would have shipped: no
`:active` state, a focus ring clipped by the table wrapper's `overflow-x`, a
row action revealed on hover, and no double-trigger guard on the optimistic
hold. All four are core's, and none is mentioned in the pack.

The SKILL.md instruction *"a pack file never repeats a core rule, so when the
two are both relevant you need both"* is doing real work. It is one sentence,
two thirds of the way down the file.

**Fix:** none needed, but this is the sentence to protect in any future edit
that shortens `SKILL.md`.

---

## Checklist score

Items marked n/a were not exercised by this screen and are excluded from the
denominator rather than counted as passes.

### `core/99-review.md` — 61 items

| Section | Pass | Fail | n/a |
|---|---|---|---|
| Tokens (4) | 4 | 0 | 0 |
| Type (5) | 5 | 0 | 0 |
| Layout (6) | 6 | 0 | 0 |
| State (5) | 5 | 0 | 0 |
| Loading, empty, error (4) | 3 | 0 | 1 |
| Feedback (6) | 6 | 0 | 0 |
| Input (5) | 5 | 0 | 0 |
| Accessibility (10) | 9 | 0 | 1 |
| Motion (6) | 5 | 0 | 1 |
| Charts (5) | 0 | 0 | 5 |
| Internationalisation (5) | 4 | 1 | 0 |
| **Total** | **52** | **1** | **8** |

**52 of 53 applicable.**

The one failure: **strings are not marked for translation.** The shipped
skeleton carries `data-i18n` attributes throughout and this run dropped them,
keeping only the language read and the flash guard. `Intl` formatting, width
headroom and the no-concatenation rule all hold; the marking does not.

Four items passed only after the self-review caught them failing, and they are
listed under finding 9. They are recorded as passes because they are fixed in
the committed output, but the honest reading is that the first draft shipped
without them.

### `packs/erp/references/05-checklist.md` — 29 items

| Section | Pass | Fail | n/a |
|---|---|---|---|
| Surfaces (5) | 5 | 0 | 0 |
| Density (4) | 3 | 0 | 1 |
| Tables (5) | 5 | 0 | 0 |
| The shell (7) | 7 | 0 | 0 |
| Components (8) | 7 | 0 | 1 |
| **Total** | **27** | **0** | **2** |

**27 of 27 applicable.** The two exclusions are "20+ rows visible at 1080p"
(the fixture has eight) and "non-matching rows dim on the chart" (no chart).

---

## What the build did not say, and this run invented

Each of these is a value or behaviour that had to come from somewhere, and came
from judgement:

| Invented | Where it should live |
|---|---|
| Pill, hover-fill and destructive tokens | `assets/theme.css` (finding 2) |
| The whole of `shell.css` | `assets/shell.css` (finding 4) |
| Row action appearance and size | `pack/03-components.md` (finding 5) |
| Skeleton row proportions and sweep | `pack/03-components.md` (finding 6) |
| `:active` on buttons | `pack/03-components.md` — core requires the state, the pack specs the look |
| Toast appearance | Nothing specs a toast, though `core/08-feedback.md` requires an announced rollback |
| Skip link | Arguably core's, under keyboard |

The last two are the ones to argue about. A rollback has to be announced
somewhere, and no file in the system says what that looks like.

## Reproducing

Open `index.html` directly — no build step, no server. Exercises worth doing by
hand:

- **Refresh** — the wait is rigged at 1.2s, so skeleton rows appear at 300ms.
- **Hold on `GR-24819`** — rigged to fail. The row flips to *On hold*, flips
  back, a toast says why, and focus returns to the button.
- **Tab through** with no mouse, then again at 200% zoom and at 320px wide.
- **Collapse the sidebar, reload** — no flash, because the class is applied
  before the stylesheets.
- **Turn on reduced motion** — the skeleton stops sweeping and stays visible,
  rather than becoming an invisible element that was mid-fade.
