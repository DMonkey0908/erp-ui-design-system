# Charts

Charts in an ERP are read, not admired. Someone is looking for one number, one
outlier, or one trend, and then leaving. Everything below serves that.

Hand-written SVG is the default. A chart library brings a 200KB dependency, its
own token system and its own accessibility gaps, to draw a line and four grid
lines. Reach for one when you need brushing, zooming, or more than ~2000 points.

## Layout

```js
const m  = { top: 14, right: 18, bottom: 34, left: 56 };
const iw = W - m.left - m.right;
const ih = H - m.top - m.bottom;

const x = (i) => m.left + (n === 1 ? iw / 2 : (i / (n - 1)) * iw);
const y = (v) => m.top + ih - (v / yMax) * ih;
```

`left: 56` holds a compact axis label (`120k`). `bottom: 34` holds one row of
tick labels plus an axis title. Plot height 300px, 240px under 520px.

Always handle `n === 1`: a single point centres instead of dividing by zero, and
the line path needs a nudged duplicate point or it renders as nothing.

## The y scale

Round the top of the scale to a value a human would pick, with ~8% headroom so
the peak is not welded to the top edge:

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

Four intervals, five labels. Compact them (`1.2k`, `340k`) — a full-precision
axis label is noise, and the exact value belongs in the tooltip.

**Start the y axis at zero for anything a reader compares by size** (bars, area
fills). A truncated axis exaggerates differences, and in a report someone
forwards to a client that is a real problem, not a stylistic one.

## Grid and axes

```css
.grid-line  { stroke: var(--paper-border); stroke-width: 1; shape-rendering: crispEdges; }
.axis-label { fill: var(--paper-text-3); font-size: 11px; font-variant-numeric: tabular-nums; }
.axis-title { fill: var(--paper-text-2); font-size: 11px; font-weight: 600; }
```

Horizontal grid lines only. Vertical ones add ink without helping anyone read a
value off a y axis.

`shape-rendering: crispEdges` plus a `+ 0.5` offset on the y coordinate puts the
1px line on a device pixel instead of blurring it across two.

Thin x labels to what fits, and always keep the first and the last:

```js
const every = Math.max(1, Math.ceil(n / Math.max(2, Math.floor(iw / 48))));
```

## Line and the gradient fill

The line is the brand accent at 2px, round joins and caps.

```css
.line { fill: none; stroke: var(--brand); stroke-width: 2;
        stroke-linejoin: round; stroke-linecap: round; }
```

The area beneath it is a **vertical ramp anchored to the value scale**, so the
density of the fill is itself a reading of the value:

```js
const defs = svgEl('defs');
const grad = svgEl('linearGradient', {
  id: 'areaFill',
  gradientUnits: 'userSpaceOnUse',   // <- the whole point
  x1: 0, y1: m.top,                  // where yMax sits
  x2: 0, y2: y(0),                   // the zero line
});
[0, 0.45, 1].forEach((offset) => grad.appendChild(svgEl('stop', { offset })));
defs.appendChild(grad);
```

```css
.area { fill: url(#areaFill); }

.area-grad stop { stop-color: var(--brand); }
.area-grad stop:nth-child(1) { stop-opacity: 0.34; }
.area-grad stop:nth-child(2) { stop-opacity: 0.13; }
.area-grad stop:nth-child(3) { stop-opacity: 0.015; }
```

Three things here are deliberate:

**`userSpaceOnUse`, not the default `objectBoundingBox`.** The default stretches
the ramp to fit whatever the tallest point happens to be, so a run peaking at
40k and one peaking at 400k both get an identically dense top and the colour
stops meaning anything. Pinning the ramp to the value scale keeps two charts
comparable.

**The alpha lives on the stops, not on the path.** A flat `opacity` on the path
washes the entire shape down by the same amount, which is exactly the
information the gradient was there to carry.

**The stops are colours in CSS, offsets in JS.** Recolouring stays a stylesheet
edit; geometry stays with the geometry.

## Points and interaction

```css
.dot { fill: var(--brand); stroke: var(--paper); stroke-width: 2; }
.dot.is-dim { opacity: 0.18; }
.crosshair { stroke: var(--paper-text-3); stroke-width: 1; shape-rendering: crispEdges; }
.hit { fill: transparent; cursor: crosshair; }
```

Draw markers only while they stay readable — about 60 points. Past that they
merge into a caterpillar; the hover dot carries it instead.

Hit testing is **one transparent rectangle over the plot**, not a handler per
point. Find the nearest x on `pointermove`. Per-point handlers mean a user has
to hit a 4px circle to see a value.

```js
const nearest = (clientX) => {
  const r  = svg.getBoundingClientRect();
  const px = ((clientX - r.left) / r.width) * W;   // client px -> viewBox units
  let best = 0;
  pts.forEach((p, i) => { if (Math.abs(p[0] - px) < Math.abs(pts[best][0] - px)) best = i; });
  return best;
};
```

That rescale is required: the SVG is `width: 100%` with a fixed `viewBox`, so
client pixels and user units are not the same thing.

## Keyboard and screen readers

A chart is not decoration; it carries data that must be reachable without a
mouse. Give the hit rectangle `tabindex="0"` and:

| Key | Action |
|---|---|
| Left / Right | Step between points |
| Home / End | First / last point |
| Escape | Dismiss the tooltip |

```html
<svg role="img" aria-label="Line chart of total tokens per output, 60 outputs">
<rect class="hit" tabindex="0" aria-label="Use the arrow keys to step through outputs">
```

And ship the numbers as a real table underneath, inside a `<details>`:

```html
<details class="table-view">
  <summary>Show as table</summary>
  ...
</details>
```

This is the part most charts skip. It costs a `<details>` element and it is the
only way a screen-reader user, or anyone who needs an exact figure, gets the
data at all. It also doubles as the export surface.

## Draw-in animation

Optional, once per data load, never on hover or resize.

```js
const len = line.getTotalLength();
line.style.strokeDasharray  = len + ' ' + len;
line.style.strokeDashoffset = String(len);
figure.style.setProperty('--draw-ms', drawMs + 'ms');
void figure.offsetWidth;            // force reflow so a re-render restarts it
figure.classList.add('is-animating');
line.addEventListener('animationend', () => {
  line.style.strokeDasharray = '';  // clear, or the line stays dashed at some zoom levels
  line.style.strokeDashoffset = '';
}, { once: true });
```

```css
.is-animating .line { animation: draw var(--draw-ms, 1400ms) cubic-bezier(0.22, 0.61, 0.36, 1) forwards; }
.is-animating .area { opacity: 0; animation: wash 600ms ease-out forwards;
                      animation-delay: calc(var(--draw-ms, 1400ms) * 0.6); }
@keyframes draw { to { stroke-dashoffset: 0; } }
@keyframes wash { from { opacity: 0; } to { opacity: 1; } }
```

Cap the duration (`Math.min(2200, 700 + n * 40)`). An animation that scales with
the data makes a big dataset feel slow, which is the opposite of the intent.

Under `prefers-reduced-motion`, set `animation: none` and the finished state
explicitly — do not rely on `revert`.

## Colour for series

- **One series:** the brand accent. Done.
- **Two to five:** a categorical ramp that stays distinguishable in greyscale
  and for the ~8% of men with red-green colour vision deficiency. Never
  red-and-green as the only difference between two series.
- **More than five:** the chart is the wrong form. Use a sorted table, small
  multiples, or let the user pick which series to show.
- **Sequential data** (a heatmap, a density): single hue, light to dark, and
  say what the scale means in a legend.

Never encode a category in colour alone. Pair it with position, a label, or a
shape.
