# Review checklist and known failure modes

Run this before calling any ERP screen done, and use it when asked to review
someone else's.

## Checklist

### Tokens
- [ ] No raw hex outside the theme file. Grep for `#` in page stylesheets — the
      result should be empty.
- [ ] Every accent has both an on-paper and an on-ink value, and each is used
      on the right surface.
- [ ] Danger is visibly distinct from the brand, if the brand is red.
- [ ] Page stylesheets define their own tokens in terms of theme tokens, never
      as literals.

### Surfaces
- [ ] Chrome is dark and shadowless, separated by a hairline.
- [ ] Every content container is white or `--paper-2`.
- [ ] Chrome corners are sharper than content corners.
- [ ] Dropdowns and tooltips hanging off dark chrome are still white.

### Density
- [ ] Base `font-size` is 13px.
- [ ] Table cells are `8px 12px`; a screen shows 20+ rows at 1080p.
- [ ] Prose is capped near `72ch`.
- [ ] Content is capped at 1600px (tables) or 1200px (forms).

### Numbers
- [ ] `font-variant-numeric: tabular-nums` on every figure, in tables, tiles,
      axis labels and tooltips.
- [ ] Numeric columns right-aligned.
- [ ] Large numbers compacted in axes and tiles; exact values in the tooltip or
      the table.

### State
- [ ] Every interactive element has hover, focus-visible, disabled and active.
- [ ] Focus is never removed without a replacement, and always `:focus-visible`.
- [ ] Disabled elements do not respond to hover.
- [ ] The state that drives styling is in the DOM (`data-state`, `aria-current`),
      not only in a class name.

### Loading, empty, error
- [ ] Each of the three empty cases has its own wording.
- [ ] Errors show the actual message, not a generic apology.
- [ ] Something async shows a determinate state, not an unexplained spinner.
- [ ] Nothing shifts layout when it loads — reserve the space.

### Keyboard and screen reader
- [ ] Tab order follows reading order.
- [ ] Landmarks are labelled (`aria-label` on `aside`, `nav`, `main`).
- [ ] The active nav item carries `aria-current="page"`.
- [ ] Charts are keyboard-steppable and have a table fallback.
- [ ] Live regions (`aria-live="polite"`) announce filter results and save state.
- [ ] Icon-only controls have an accessible name.

### Motion
- [ ] Transitions are 0.12s–0.22s.
- [ ] `prefers-reduced-motion` is honoured, with explicit end states.
- [ ] No animation on hover of a repeated element, and none on resize.

### Responsive
- [ ] Every grid item that can hold wide content has `min-width: 0`.
- [ ] Grid columns use `minmax(0, 1fr)`.
- [ ] Tables scroll in a wrapper rather than squeezing.
- [ ] Navigation is reachable at 375px without a hamburger.

### Internationalisation
- [ ] Strings are marked, not templated.
- [ ] No layout assumes an English string length; ~35% headroom.
- [ ] Translated pages do not flash the source language.
- [ ] Dates and numbers are locale-formatted.

## Failure modes

These are the ones that actually happen. Each is cheap to fix and expensive to
leave.

**The accent used on the wrong surface.** A brand colour chosen for white text
on white cards, applied to the active nav item on a near-black sidebar. It
passes a brand review and is invisible in use. Always two values.

**The border that only exists when active.** A left border added to the selected
nav row shifts every label 3px as the selection moves. Reserve a transparent
border on all rows.

**The grid item that blows out the layout.** A grid child defaults to
`min-width: auto`, so one wide table stretches the column and pushes the sidebar
off screen. `min-width: 0` on the main area, `minmax(0, 1fr)` on every column.

**The restored-state flash.** A collapsed sidebar, a hidden admin link or a
translated label applied after first paint means the user watches the layout
correct itself on every navigation. Apply it inline in `<head>` before the
stylesheets.

**`opacity: revert` in a reduced-motion override.** `revert` rolls back to the
previous cascade origin, which for `opacity` is the browser default of `1`, not
whatever your stylesheet said. Always state the end value.

**The gradient that stretches to fit.** An area fill left on the default
`objectBoundingBox` rescales to the tallest point, so two charts with wildly
different magnitudes look identical. `userSpaceOnUse`, pinned to the scale.

**Proportional digits in a table.** A column of figures that ripples every time
it refreshes. One line of CSS.

**Per-point hit targets on a chart.** Users hunting for a 4px circle. One
transparent rectangle and a nearest-x lookup.

**Colour as the only signal.** A red row and a green row with identical text.
Add an icon, a label, or a position.

**The second primary button.** Two accent-filled buttons on one card. The accent
stops meaning "the action" and becomes decoration.

**Palette drift in older pages.** The most common way this system dies. A page
written before the token file, or by someone in a hurry, ships `#e0e7ff` chips
and `#3730a3` text — an indigo that exists nowhere in the palette, in a system
that explicitly has no blue. It looks fine in isolation and wrong next to
everything else. Audit page stylesheets for literals periodically; the fix is
always mechanical.

**Legacy classes kept as `display: none`.** Harmless once, a maze after a year.
If markup no longer ships, delete the rule and the markup together.

## When the client asks for something this system refuses

Do not simply refuse. Name the cost, offer the nearest thing that works, and
build what they decide.

| Request | Cost | Offer instead |
|---|---|---|
| Glassmorphism on cards | Contrast on the data, which is the whole budget | A subtle border and a flat `--paper-2` fill |
| Bigger, airier spacing | A third as many rows per screen | A density toggle, defaulting to compact |
| A colour per module | The accent stops signalling state | One accent; distinguish modules by icon and label |
| Rounded 16px cards | Reads consumer, not operational | 8px, which is soft without being playful |
| Animated page transitions | Felt as lag by someone doing it 200 times a day | Instant navigation with a 150ms content fade |

If they hear the cost and still want it, build it. It is their product. Record
the decision so the next person does not re-litigate it.
