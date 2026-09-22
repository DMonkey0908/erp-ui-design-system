A design system for pages read by strangers. Someone arrived from a search
result, an ad or a link someone sent them. They owe you nothing, they will not
be trained, and they will leave the moment the page stops being worth the
scroll.

## The domain thesis

**You are designing for the first five seconds, not the two-hundredth use.**

Every decision here follows from that. Space is not waste — it is what lets a
stranger find the one thing the screen is about. Type is not a setting — it is
most of what they judge you on before reading a word. A page that fits more
above the fold is not a better page; it is a page that asked a stranger to do
work before it earned any.

This is the exact inverse of an operational tool, and the two are not reconcilable.
The `erp` pack packs twenty rows onto a screen because an operator returns to it
daily and every row saved is a scroll saved. Do that here and the page reads as
a spreadsheet someone forgot to design. Do the reverse there and an operator
loses a third of their working set to whitespace.

**If you are building something a trained user returns to daily, you are in the
wrong pack.**

## What this pack adds on top of core

Core already requires per-surface accents, visible focus, honest axes and
tabular numerals. This pack decides the things core deliberately leaves open:

- **Density: low.** 16px base — the browser default, not a shrunk one.
  Section rhythm at 96–128px. Measure capped at 60–75 characters. The page is
  read, not worked in.
- **Surface assignment: the canvas is the content.** There is no permanent
  chrome. The header floats over the page and gets out of the way; a card is a
  deliberate choice for grouping, not the default container. A page made of
  cards on a grey background is an admin panel wearing a marketing headline.
- **Radii and elevation: softer and lifted.** 8–16px on interactive surfaces,
  a warm soft shadow to raise the primary action. Where the `erp` pack uses a
  border to separate, this uses space.
- **Motion can be expressive**, within core's bands, because most of it happens
  once per visit rather than two hundred times a day. Scroll-linked reveals are
  allowed; blocking content behind them is not.
- **Performance is a design constraint, not an afterthought.** A hero image
  that takes four seconds has already lost the five seconds this pack is built
  around. `04-performance.md` treats LCP, CLS and font loading as design
  decisions, because that is what they are.

## Overrides

**Core says one type family plus a monospace. This pack uses two.**

Brand voice is a deliverable here rather than a nice-to-have, and a display
face is the cheapest way to stop a page reading as a template. Core's objection
is real, so the cost is paid explicitly rather than ignored: both families are
self-hosted and subset, the display face is preloaded, both declare
`font-display: swap` with metric-matched fallbacks, and the pairing stops at
two. A third family is not a style decision, it is a bug.

Nothing else in core is overridden. The accessibility minimums and the chart
honesty rules are not overridable at all.

## Non-negotiables

Apply these without being asked.

- **One primary action per screenful.** Two competing calls to action halve
  each other. Everything else is a link or a secondary button.
- **The measure is capped.** 60–75 characters. A paragraph running the full
  width of a 1600px container will not be read, however good the copy is.
- **Type carries the hierarchy, not colour.** Size, weight and space first.
  Coloured headings are a symptom of a scale that is not doing its job.
- **Nothing important is revealed only on scroll.** The headline, the primary
  action and what the product actually is must survive JavaScript failing.
- **No layout shift.** Every image, embed and font has its space reserved
  before it loads. A page that moves under a reader's thumb is a page they
  stop trusting.
- **The page works before the JavaScript does.** Content in HTML, links that
  are links, forms that submit.

## What this pack deliberately refuses

Say so briefly, offer the alternative, and build whatever is decided.

| Request | Cost | Offer instead |
|---|---|---|
| A carousel for the hero | Nobody sees slide two, and it moves the headline under the reader | One decisive hero; put the rest in sections below |
| An entry pop-up | It interrupts before the page has earned anything | An inline offer after the first section, or on exit |
| Autoplaying video with sound | Bounce, and an accessibility failure | Muted, poster-first, play on intent |
| Every section a different colour | Nothing stands out, so the eye stops navigating | One accent; vary rhythm and scale instead |
| A third type family | Brand voice does not compound; page weight does | Use the second family's other weights |
| Text baked into images | Unreadable to search, screen readers, and translation | Real text over an image, or an `svg` with a title |
| Infinite scroll on a marketing page | The footer becomes unreachable, and so does the pricing link | Pagination, or a shorter page |

If they hear the cost and still want it, build it. It is their product.

## Getting started on a new project

1. Copy `assets/theme.css` in as the first stylesheet, then swap the accent and
   recompute the on-dark value.
2. Set the type scale before writing any component. On this kind of page the
   scale *is* the design, and retrofitting one means touching every section.
3. Decide the section rhythm once — one spacing value, used everywhere — and do
   not vary it per section.
4. Budget the page before building it: see `04-performance.md`. A budget agreed
   after the hero image is chosen is not a budget.
