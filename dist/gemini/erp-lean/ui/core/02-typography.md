# Typography

## One family, plus a monospace

A second display family has to earn itself against the cost: another network
request, another fallback to tune, another set of metrics that shifts layout as
it swaps. Most interfaces are better served by one well-chosen family across
five weights.

A monospace is not optional wherever users read or copy identifiers — keys,
paths, hashes, IDs, SKUs, error codes. Proportional digits and a proportional
`l/1/I` make those unreliable to read aloud or transcribe.

Always ship a system fallback stack, and match its metrics roughly, or the page
reflows when the webfont lands.

## Base size is a domain decision; the unit is not

Pick the base `font-size` on `body` from what the domain needs — a dense
operational tool and a reading-first marketing page have genuinely different
answers, and that value belongs in the pack.

What core fixes is **which unit sizes what**:

- **Shell and chrome in `em`**, so the frame scales with the base and a density
  change is one edit.
- **Content in `rem`**, so a card nested in a panel nested in a sidebar never
  inherits a surprise. A component sized in `em` three levels deep is a bug
  waiting for a refactor.
- **Never `px` for type.** It ignores the user's browser setting, which for
  anyone who has enlarged their default is not a style choice but an
  accessibility one.

## Build the scale from the roles you actually have

Do not adopt a modular scale and then hunt for uses. List the roles the
interface needs, then assign a size to each. A typical set:

```
metadata / table headers / tile labels     smallest
field labels / secondary buttons / tooltips
body / table cells / buttons               ← the workhorse
inputs / definition values
section and card titles
the one big number                          (tiles, KPIs)
page heading
```

Seven steps covers almost everything. If a design needs a ninth, two of the
existing ones are probably doing the same job.

Weights, and what they mean, stay consistent across the set: regular for
user-entered text, medium for navigation, semibold for labels and buttons, bold
for titles and values. Reserve the heaviest weight for one thing — usually badge
counts — so it keeps its emphasis.

## The label is quieter than the value

In any form or data view, the label is reference material and the value is the
content. Size and weight should say so: a smaller, lighter, greyer label above a
larger, darker value. Reversing this is common and it makes a thirty-field form
exhausting to scan, because the eye keeps landing on words it already knows.

## Measure

Cap running prose at roughly **65–75 characters** per line (`max-width: 72ch` is
a good default). Beyond that the eye loses the line return.

This matters most for the text people skip: help notes, empty-state
explanations, field hints. Those are exactly the strings that get written as one
long grey line across a 1600px container and are then never read.

## Numerals

```css
font-variant-numeric: tabular-nums;
```

On **every** figure: table cells, KPI values, axis labels, tooltip rows,
counters, timers, prices. Proportional digits have different widths, so a column
of numbers shifts sideways every time a value updates, and a live-updating
counter visibly jitters.

This is the highest value-per-character line in the whole system.

Where a number is compared by magnitude, right-align it. Left-aligned figures
put the significant digits at inconsistent positions and defeat scanning.

## Truncation

Decide per element, and decide before the string arrives:

- **Never wrap** navigation labels, table headers, or anything in a fixed-height
  row. Wrapping changes the row height and the whole layout reflows.
- **Ellipsis** for names in constrained cells, with the full value reachable —
  a `title` attribute at minimum, a tooltip if it matters.
- **`overflow-wrap: anywhere`** for identifiers, file names and URLs. They
  contain no spaces, so the default breaking rules will push them straight out
  of their container.
