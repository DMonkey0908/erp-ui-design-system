# Domain review checklist

Run **`core/08-review.md` first** — tokens, type, layout, state, accessibility,
motion, charts, i18n. Nothing there is waived by this domain.

This file is what a public page needs on top.

## Checklist

### The first screenful
- [ ] A stranger can say what this is, in their own words, from the headline.
- [ ] Exactly one primary action.
- [ ] The objection that action raises is answered next to it.
- [ ] One reason to believe: a real screenshot, a named customer, a number.
- [ ] Headline and action are in the HTML, not revealed by JavaScript.
- [ ] On a 360px phone the headline is visible without scrolling, and the hero
      image sits below it.

### Type
- [ ] Base is 16px. Not shrunk.
- [ ] Running text capped at 65ch, 75ch absolute maximum.
- [ ] Line height rises as size falls — roughly 1.05 hero, 1.7 body.
- [ ] Two families at most, and the display face is not used in buttons,
      labels or form fields.
- [ ] Hierarchy is carried by size, weight and space — not by colour.
- [ ] No paragraph over three lines is centred.

### Rhythm
- [ ] One section rhythm value, used everywhere.
- [ ] At most two alternating backgrounds.
- [ ] Emphasis comes from width changes, not from extra padding.
- [ ] Each screenful has exactly one thing that wins.
- [ ] The closing action repeats the hero action rather than introducing a new one.

### Surfaces
- [ ] The canvas is warm, not a cool application grey.
- [ ] Cards are used for grouping, not as the default container.
- [ ] Text is `--text`, never `#000`.
- [ ] `--text-3` is not used for body copy.
- [ ] Every inverted section uses the on-dark accent for text, buttons and the
      focus ring.
- [ ] Shadows are warm; the accent shadow is on the primary action only.

### Components
- [ ] Button labels are verbs the reader would use.
- [ ] A clickable card is a real link, keyboard-reachable.
- [ ] Prices are shown, with the billing period beside the number and
      `tabular-nums` on the digits.
- [ ] Every form field has a real `<label>`; inputs are at least 16px.
- [ ] `type` and `autocomplete` set correctly.
- [ ] Validation on blur, error beside the field, tied with `aria-describedby`.
- [ ] Testimonials carry a name, role and company.
- [ ] FAQ uses `<details>`, or matches its keyboard and screen-reader behaviour.
- [ ] Mobile menu is a `<button>` with `aria-expanded`, focus trapped, Escape
      closes, focus returns.

### Performance
- [ ] A budget was agreed before the hero image was chosen.
- [ ] LCP under 2.0s on a mid-range phone on 4G.
- [ ] CLS effectively zero: every image, embed and injected banner has its space
      reserved.
- [ ] Fonts self-hosted, subset, variable where possible, `font-display: swap`
      with metric-matched fallbacks.
- [ ] Only above-the-fold fonts preloaded.
- [ ] Hero has `fetchpriority="high"` and is **not** lazy-loaded; everything
      below the fold is.
- [ ] AVIF or WebP, with `srcset` and `sizes` that match the layout.
- [ ] Every script deferred. Third parties counted, and loaded after interaction
      or after `load`.
- [ ] Measured on a throttled mid-range phone, not the build machine.

### Without JavaScript
- [ ] Headline, lead, prices, navigation and the primary action all work.
- [ ] Nothing starts at `opacity: 0` in the base stylesheet.
- [ ] Accordions, tabs and carousels enhance; none is the only route to content.

## Failure modes specific to this domain

**The hero that lists features.** Six propositions above the fold means a
stranger reads none of them. One sentence, one action.

**The paragraph at container width.** Copy set across 1200px does not get read,
no matter how good it is. This is the single most common miss on a wide layout,
because it looks fine to whoever wrote it on a large screen.

**The page made entirely of cards.** Every block in a white box on a grey
background. It is an admin panel with a marketing headline, and it happens
because cards are the safest-feeling default.

**`opacity: 0` in the base stylesheet.** Scroll reveals authored without a `.js`
guard ship a blank page to everyone whose JavaScript failed — including, at
times, the crawler that decides how the page is indexed.

**The lazy-loaded hero.** `loading="lazy"` applied to every image, including
the largest one above the fold, which delays the exact element LCP measures.
Self-inflicted and easy to miss.

**The third party nobody counted.** Analytics, chat, consent, pixels, A/B. Each
arrives separately, each looks small, and together they are heavier than the
page. A chat widget alone routinely outweighs everything else.

**The anonymous testimonial.** "This changed our business — Director, Fortune
500 company." It is read as written in-house, and it costs more trust than
having no testimonial.

**The centred paragraph.** A ragged left edge means the eye hunts for the line
start on every return. Fine for a heading, fine for a two-line lead, wrong for
anything longer.

**The second primary button.** The header CTA styled the same as the hero CTA.
Two primary actions on one screenful halve each other.

**Type scale retrofitted.** The scale is the design on this kind of page.
Deciding it after three sections are built means rebuilding all three.

## Refusals

`PACK.md` lists what this pack pushes back on — carousels, entry pop-ups,
autoplaying sound, a colour per section, a third font, text in images, infinite
scroll — and what to offer instead. Name the cost, offer the alternative, then
build whatever is decided, and record the decision so nobody re-litigates it.
