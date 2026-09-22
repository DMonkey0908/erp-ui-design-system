# Performance as a design constraint

This file exists in this pack and not in `erp` for a reason. An operator waits
for an internal tool, because it is their job and there is no alternative. A
stranger does not wait. A hero that takes four seconds has already spent the
five seconds this whole pack is built around.

So page weight is not an engineering concern handed over after the design is
agreed. It is a design decision, made at the same time as the type scale.

## Budget the page before building it

Agreed up front, in the brief, with a number:

| Resource | Budget for a marketing page |
|---|---|
| Hero image | < 200KB, AVIF or WebP |
| Total images above the fold | < 400KB |
| Fonts | < 120KB, two families, subset |
| JavaScript | < 100KB compressed. Most pages here need far less. |
| Total, first view | < 1MB |
| LCP | < 2.0s on a mid-range phone, 4G |
| CLS | < 0.1, and realistically 0 |
| INP | < 200ms |

A budget agreed after the hero image has been chosen is not a budget. If a
comp needs a 3MB background video, that is a design decision with a cost, and
it is made with the client, not discovered in an audit.

## Layout shift is a design bug

Core requires reserving space. Here it is the difference between a page that
feels solid and one nobody trusts, because the reader is scrolling with a thumb
over the content that moves.

The four causes, and their fixes:

1. **Images without dimensions.** Always `width` and `height`, even when CSS
   sizes them. They give the browser the aspect ratio before the bytes arrive.
2. **Fonts that swap to different metrics.** See below.
3. **Content injected above existing content** — a banner, a consent bar, an
   A/B variant. Reserve its space, or render it fixed over the page rather than
   in flow.
4. **Embeds and iframes with no reserved box.** Wrap them in an
   `aspect-ratio` container.

```css
.embed { aspect-ratio: 16 / 9; }
.embed > iframe { width: 100%; height: 100%; border: 0; }
```

## Fonts

This pack overrides core to use two families, and this is where that cost is
paid. Skip these and the override is not justified.

```css
@font-face {
  font-family: 'Fraunces';
  src: url('/fonts/fraunces-subset.woff2') format('woff2');
  font-weight: 400 700;                 /* variable: one file, all weights */
  font-display: swap;
  size-adjust: 104%;                    /* match the fallback's x-height */
  ascent-override: 92%;
}
```

```html
<link rel="preload" href="/fonts/fraunces-subset.woff2" as="font" type="font/woff2" crossorigin>
```

- **Self-host.** A third-party font host is a second DNS lookup, a second TLS
  handshake, and a third party in the request path.
- **Subset** to the characters the site uses. Latin plus punctuation is a
  fraction of a full face. Keep the accented ranges the languages need — a
  Vietnamese site that subsets them out gets boxes.
- **Prefer one variable font per family** over four static weights.
- **`font-display: swap`**, with a metric-matched fallback. Text appears
  immediately in the fallback and swaps without moving.
- **Preload only what is above the fold** — usually the display face. Preloading
  everything means preloading nothing.
- **Never `font-display: block`.** It hides text while the font loads, which is
  a blank page during the seconds that decide the visit.

## Images

- **AVIF with a WebP fallback**, via `<picture>`.
- **Serve the size that is used.** `srcset` with real widths, `sizes` describing
  the layout.
- **The hero is not lazy-loaded.** It gets `fetchpriority="high"`. Lazy-loading
  the largest element on screen delays the metric it defines — a common and
  self-inflicted regression.
- **Everything below the fold is `loading="lazy"`.**
- **No image where CSS will do.** A gradient, a border and a radius weigh
  nothing.

```html
<picture>
  <source type="image/avif" srcset="hero-800.avif 800w, hero-1600.avif 1600w" sizes="(min-width:900px) 50vw, 100vw">
  <img src="hero-800.webp" width="1600" height="1000" alt="…" fetchpriority="high" decoding="async">
</picture>
```

## JavaScript

Most pages in this pack need a header toggle, a scroll reveal and a form. That
is kilobytes, not a framework.

- **Start from no framework.** Reach for one when the page has genuine
  application state, not because it is the default.
- **`defer` every script.** A blocking script in `<head>` delays the first
  paint of a page whose whole job is the first paint.
- **Third parties are the budget, usually.** Analytics, chat widgets, consent
  managers, pixels, A/B tools. Each one is someone else's code in the critical
  path, and a chat widget is routinely heavier than the entire page. Load them
  after interaction or after `load`, and put a number on each before agreeing
  to it.
- **No layout read-write loops on scroll.** Use `IntersectionObserver` for
  reveals and CSS for anything that can be CSS.

## Measure on a phone, not on the machine that built it

A development laptop on office wifi tells you nothing about the visitor. Test
on a mid-range Android on a throttled connection, and look at the 75th
percentile of field data rather than a single lab run.

A page that is fast in the office and slow in the field is slow.
