# Charts — the ERP layer

Core (`core/07-charts.md`) holds the universal rules: honesty, scale rounding,
degenerate cases, single-rect hit testing, keyboard access, the table fallback,
series colour, and the `userSpaceOnUse` gradient. None of it is restated here.

This file is what an *operational* chart adds: the density, the exact geometry,
and the interaction detail that fits a screen someone reads all day.

## Geometry

```js
const m  = { top: 14, right: 18, bottom: 34, left: 56 };
const iw = W - m.left - m.right;
const ih = H - m.top - m.bottom;

const x = (i) => m.left + (n === 1 ? iw / 2 : (i / (n - 1)) * iw);
const y = (v) => m.top + ih - (v / yMax) * ih;
```

`left: 56` holds a compacted axis label (`120k`). `bottom: 34` holds one row of
tick labels plus an axis title. Plot height **300px**, dropping to 240px under
520px.

Thin the category labels to what fits, and always keep the first and the last:

```js
const every = Math.max(1, Math.ceil(n / Math.max(2, Math.floor(iw / 48))));
```

48px per label is the density that stays readable at this base font size.

## Styling

```css
.hw-grid-line  { stroke: var(--paper-border); stroke-width: 1; shape-rendering: crispEdges; }
.hw-axis-label { fill: var(--paper-text-3); font-size: 11px; font-variant-numeric: tabular-nums; }
.hw-axis-title { fill: var(--paper-text-2); font-size: 11px; font-weight: 600; }

.hw-line { fill: none; stroke: var(--brand-red); stroke-width: 2;
           stroke-linejoin: round; stroke-linecap: round; }

.hw-dot  { fill: var(--brand-red); stroke: var(--paper); stroke-width: 2; }
.hw-dot.is-dim { opacity: 0.18; }

.hw-crosshair { stroke: var(--paper-text-3); stroke-width: 1; shape-rendering: crispEdges; }
.hw-hit       { fill: transparent; cursor: crosshair; }
```

11px axis labels — one step below the smallest body size. They are reference
marks, not content, and at this density a 13px axis crowds the plot.

Charts live on **paper**: the plot sits inside a white card, so the series is
the on-paper accent (`--brand-red`), never the on-dark one.

## The gradient fill, as configured here

Core explains why it is anchored to the value scale. The stops this domain uses:

```css
.hw-area { fill: url(#hwAreaGradient); }

.hw-area-grad stop { stop-color: var(--brand-red); }
.hw-area-grad stop:nth-child(1) { stop-opacity: 0.34; }
.hw-area-grad stop:nth-child(2) { stop-opacity: 0.13; }
.hw-area-grad stop:nth-child(3) { stop-opacity: 0.015; }
```

Offsets `[0, 0.45, 1]` in JS, colours in CSS — recolouring stays a stylesheet
edit, geometry stays with the geometry.

0.34 at the top is as dense as this palette goes before the fill starts
competing with the table beside it.

## Filtering and the chart together

The pattern that makes a filter row worth building: when a filter is active,
**non-matching points dim rather than disappear** (`opacity: 0.18`).

```js
chartState.dots.forEach((dot, i) =>
  dot.classList.toggle('is-dim', filter.active && !filter.matches(rows[i])));
```

Seeing what was excluded is most of the value of filtering — a chart that
silently drops points tells the user nothing about the shape of what they
removed. Pair it with a live count in an `aria-live` region.

Dimmed points must also be exempt from any entrance animation, or they pop in at
full opacity and then fade.

## Draw-in animation

One flourish per data load, never on hover or resize.

```js
const len = line.getTotalLength();
line.style.strokeDasharray  = len + ' ' + len;
line.style.strokeDashoffset = String(len);
figure.style.setProperty('--hw-draw-ms', drawMs + 'ms');
void figure.offsetWidth;            // force reflow so a re-render restarts it
figure.classList.add('is-animating');
line.addEventListener('animationend', () => {
  line.style.strokeDasharray = '';  // clear, or the line stays dashed at some zoom levels
  line.style.strokeDashoffset = '';
}, { once: true });
```

```css
.is-animating .hw-line { animation: draw var(--hw-draw-ms, 1400ms)
                         cubic-bezier(0.22, 0.61, 0.36, 1) forwards; }
.is-animating .hw-area { opacity: 0; animation: wash 600ms ease-out forwards;
                         animation-delay: calc(var(--hw-draw-ms, 1400ms) * 0.6); }
@keyframes draw { to { stroke-dashoffset: 0; } }
@keyframes wash { from { opacity: 0; } to { opacity: 1; } }
```

Cap the duration: `Math.min(2200, 700 + n * 40)`. An animation that scales with
the data makes a large dataset feel slow, which is the opposite of the intent.

Under `prefers-reduced-motion`, set `animation: none` **and** the finished state
explicitly. `opacity: revert` here yields `1`, not your stylesheet value — core
`04-motion.md` has the full trap.

## Tooltip

```css
.hw-tooltip {
  position: absolute; z-index: 5;
  min-width: 200px; max-width: 300px;
  padding: 10px 12px;
  border: 1px solid var(--paper-border); border-radius: 8px;
  background: var(--paper); box-shadow: var(--shadow-tooltip);
  font-size: 0.75rem; color: var(--paper-text-2);
  pointer-events: none;
}
.hw-tip-key  { width: 14px; height: 2px; border-radius: 1px; background: var(--brand-red); }
.hw-tip-rows { display: grid; grid-template-columns: auto auto; gap: 2px 14px; margin: 0; }
.hw-tip-rows dt { color: var(--paper-text-3); }
.hw-tip-rows dd { margin: 0; text-align: right; color: var(--paper-text);
                  font-variant-numeric: tabular-nums; }
```

Light, not the usual dark tooltip — it is content, so it follows the paper
rules. The 14px swatch repeats the series colour so a multi-series tooltip stays
readable. `overflow-wrap: anywhere` on the title: identifiers have no spaces to
break at.

## The table underneath is not optional

Core requires it. In this domain it earns its place twice over, because the
exact figure is usually what the user came for — the chart only tells them which
row to look at.

```html
<details class="hw-table-view">
  <summary>Show as table</summary>
  <div class="hw-table-wrap"><table class="hw-table">…</table></div>
</details>
```

Open it automatically when a filter matches rows. The matching rows are the
answer; do not leave them behind a disclosure the user has to discover.
