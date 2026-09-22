# Charts

A chart is a claim about data. These rules keep the claim honest and keep the
numbers reachable; a pack layers its own density, palette and interaction style
on top.

## Honesty

**Start a value axis at zero whenever magnitude is being compared** — bars,
area fills, anything read by size. A truncated axis makes a 3% difference look
like a doubling. In a screen someone forwards to a customer, that is a
misstatement, not a style choice.

Line charts tracking a narrow range around a large value are the legitimate
exception: zero-basing a temperature series destroys the signal. When you
truncate, say so on the axis.

Other ways a chart lies, all easy to ship by accident:

- **Dual y axes.** Two scales chosen independently can make any two series
  appear correlated. Use two stacked charts sharing an x axis.
- **Inconsistent scales across small multiples.** If panels are compared,
  they share one scale.
- **Area or radius encoding a value linearly.** Doubling a circle's radius
  quadruples its area, and the eye reads area.
- **Uneven time buckets** drawn at even spacing.

## Round the scale, leave headroom

```js
function niceMax(v) {
  if (v <= 0) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const f = v / p;
  const step = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10;
  return step * p;
}
const yMax = niceMax(Math.max(...values) * 1.08);
```

Four intervals and five labels covers most plots. Compact the labels (`1.2k`,
`340k`) — full precision on an axis is noise, and the exact figure belongs in
the tooltip and the table.

Grid lines on the value axis only; lines on the category axis add ink without
helping anyone read a value. For a 1px line, `shape-rendering: crispEdges` plus
a `+0.5` offset puts it on a device pixel instead of blurring across two.

## Handle the degenerate cases explicitly

Every one of these has shipped as a blank chart or a crash:

- **One point** — centre it; a line path needs a nudged duplicate or it renders
  nothing.
- **Zero points** — an empty state, not an empty axis.
- **All values identical** — a flat line at a sensible scale, not a divide-by-zero.
- **All zeroes** — a real axis, not `yMax = 0`.
- **One outlier 100× the rest** — say something, or offer a log scale. Do not
  silently flatten the other 99 points.
- **More points than pixels** — downsample deliberately, so the shape survives.

## Interaction

Hit test with **one transparent rectangle over the plot** and a nearest-point
lookup, not a handler per mark. Per-mark handlers mean the user must hit a 4px
circle to read a value.

```js
const nearest = (clientX) => {
  const r  = svg.getBoundingClientRect();
  const px = ((clientX - r.left) / r.width) * viewBoxWidth;   // rescale!
  let best = 0;
  pts.forEach((p, i) => { if (Math.abs(p[0] - px) < Math.abs(pts[best][0] - px)) best = i; });
  return best;
};
```

That rescale is mandatory whenever the SVG is `width: 100%` with a fixed
`viewBox` — client pixels and user units are different spaces, and skipping it
produces a tooltip that drifts further from the cursor the wider the window gets.

Draw individual markers only while they stay distinguishable — roughly 60
points. Past that they merge into a caterpillar and the hover indicator carries
it.

## Accessibility is not optional here

A chart usually carries data that exists nowhere else on the page.

- `role="img"` on the SVG with an `aria-label` that states what it shows and how
  many points — not "chart".
- The plot is keyboard-operable: `tabindex="0"` on the hit area, arrow keys to
  step, Home/End for the extremes, Escape to dismiss the readout.
- **Ship the numbers as a real table.** In a `<details>` underneath if space is
  tight.

```html
<details>
  <summary>Show as table</summary>
  <table>…</table>
</details>
```

That table is the only way a screen reader user — or anyone who needs an exact
figure, or wants to copy the data — gets it at all. It costs one element, and it
doubles as the export surface. It is also the most commonly skipped item in this
whole system.

## Series colour

| Series | Approach |
|---|---|
| 1 | The accent. Done. |
| 2–5 | A categorical ramp that stays distinguishable in greyscale and under red-green colour vision deficiency. |
| 6+ | The chart is the wrong form. Use a sorted table, small multiples, or let the user choose which series to show. |

Never encode a category in colour alone — pair it with a direct label, a
position, or a mark shape. Direct labels at the end of each line beat a legend
whenever they fit: a legend forces the eye to travel and hold a mapping in
memory.

For sequential data use a single hue, light to dark. For diverging data anchor
the midpoint at something meaningful and say what it is.

## Gradient fills that mean something

If an area fill is more than decoration, anchor its gradient to the **value
scale**, not to the shape:

```js
{ gradientUnits: 'userSpaceOnUse', x1: 0, y1: y(yMax), x2: 0, y2: y(0) }
```

The default `objectBoundingBox` stretches the ramp to fit the path's own
bounding box, so a series peaking at 40k and one peaking at 400k both get an
identically dense top and the colour stops carrying information.

Put the opacity on the gradient **stops**, not on the path. A flat `opacity`
scales the whole shape down uniformly, which erases exactly the difference the
gradient was drawing.

## Library or hand-written

Hand-written SVG is the better default for a line, a bar set, an area or a
sparkline: no dependency, no competing token system, no accessibility gaps you
did not choose.

Reach for a library when you need brushing and linking, zooming and panning,
geographic projection, force layouts, or more than a few thousand marks. Then
budget real time for restyling it to your tokens and fixing its keyboard
support — both are usually more work than the chart was.
