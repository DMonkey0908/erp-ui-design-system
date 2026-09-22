# mobile-01 — deliveries list and reschedule

**Pack:** `mobile-app` · **Build under test:** `dist/claude/mobile-app-design/`

## The prompt

> Build the deliveries screen for our courier app. Drivers check it between
> stops, usually one-handed, often with no signal. They need to see what is
> left today and to reschedule a drop without leaving the screen.

Phrased the way it arrives: no mention of targets, safe areas, sheets or
interruption. If those only appear when asked for, the activation block is not
doing its job.

## What the screen has to contain

Chosen to hit the parts of this pack that a desktop habit gets wrong.

| Element | Exercises |
|---|---|
| Tab bar and navigation bar | `pack/02-navigation.md`, reach, safe-area insets |
| A list of uniform items | The row-not-card position, inset dividers, growing rows |
| Status per row | Colour never alone, `core/05-accessibility.md` |
| A per-row action | `core/09-input.md` — no hover, and a visible equivalent for any gesture |
| Reschedule, as a sheet | `pack/03-components.md` — bottom sheet, confirm at the bottom |
| A form inside that sheet, over a keyboard | The single most common bug in this domain |
| A pinned primary action | Reach, plus the safe-area inset under it |
| An offline banner with a queued write | `pack/04-lifecycle.md`, and core's optimistic-update conditions |
| An empty state | Three distinct cases, and the action lives inside it |

## Done means

`core/99-review.md` then `pack/05-checklist.md`, item by item, each marked pass,
fail or n/a, with a note on every failure.

Plus two checks this domain needs and a desktop screen does not:

- **Largest text scale.** Set the browser's minimum font size up, or scale the
  root. Rows must grow rather than clip.
- **Safe-area simulation.** Give `env(safe-area-inset-bottom)` a non-zero
  fallback and confirm nothing lands under it.

## Out of scope

A real backend, a native toolchain. Plain HTML and CSS against
`assets/tokens.css` keeps the run about the design system — the pack covers
mobile web and React Native Web explicitly, so this is a supported target
rather than a simplification.
