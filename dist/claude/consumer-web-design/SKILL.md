---
name: consumer-web-design
description: Design, build, restyle or review public-facing web pages - marketing and landing pages, product sites, pricing pages, documentation and editorial. Use it whenever creating or changing how a page a stranger will read looks: hero sections, section rhythm, type scale, calls to action, cards, navigation, footers, lead-capture forms, pricing tables and FAQs; when asked to make a site look more premium, modern, trustworthy or less generic; when the work is judged on whether someone keeps scrolling rather than on how much fits on screen; or when page weight, font loading, LCP and layout shift are part of the brief. Not for internal tools, admin panels, operations consoles or any dense data-entry screen.
---

# Consumer web

## Applies whenever you are about to

- create, style or lay out **any** user interface — a page, a screen, a
  component, a view
- change how an existing interface **looks**: spacing, colour, type, density,
  states, motion, layout
- add or restyle a **chart**, table, form, dialog, menu, toast or empty state
- answer "make this look better / more professional / cleaner"
- review or critique a UI, someone else's or your own

It applies to any stack — HTML and CSS, React, Vue, Svelte, Tailwind, SwiftUI,
Flutter, a design token file. The rules are about the interface, not the
framework.

It does **not** apply to work that never reaches a screen: build config, data
layers, tests of non-visual logic.

## Do this before writing the first line

1. **Check the tokens.** If the project has a token or theme file, use it. If it
   does not, create one before you write a colour — a hex typed into a component
   is the first step of every palette that later has ninety of them.
2. **Name the surface** you are working on: chrome, canvas, content, floating.
   The treatment follows from the surface, not from the component's name.
3. **Read the reference for what you are building** if it is not already in
   context. A partial memory of a spacing scale produces something almost right,
   which is harder to spot than something obviously wrong.
4. **Write the code.**
5. **Run the review checklist** before reporting the work done.

## Never do these, whatever the request

They are cheap to get right and expensive to retrofit, and every one of them
has shipped from an assistant that had the rules available and did not apply
them.

- Ship an accent colour with a single value when the interface has both light
  and dark surfaces.
- Write a raw colour outside the token file.
- Leave a figure without `font-variant-numeric: tabular-nums`.
- Remove a focus outline without replacing it.
- Use colour as the only signal for a state.
- Put information or an action behind hover alone. On a touchscreen it is not
  awkward, it is absent.
- Show a spinner for work that finishes in under 300ms, or leave one spinning
  past a second where a skeleton at the real dimensions belongs.
- Animate without honouring `prefers-reduced-motion`, including the end state.
- Start a value axis anywhere but zero when magnitude is being compared.

## When the request conflicts with a rule

Name the cost in one sentence, offer the nearest thing that works, then build
whatever is decided — it is their product. Do not silently comply, and do not
refuse.

Two exceptions are not negotiable, because their cost lands on someone who is
not in the room: the accessibility minimums, and the chart honesty rules. For
those, build the compliant version and say why.

## Say what you applied

When UI work is done, state in one line which pack and which rules shaped it.
A user who cannot see that this system is active cannot tell it from your
default behaviour, and cannot correct it.

---

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

## What this domain assumes about the input

**Designed for a finger on a held device.** Also reached with a mouse or trackpad at desk distance. Interactive targets are at least 44px. The method is in `09-input.md`; this is what this domain assumes.

## How to use this skill

Read **`core/`** for the rules that hold for any interface, and **`pack/`**
for what this domain decided. A pack file never repeats a core rule, so when
the two are both relevant you need both.

Start with `core/02-typography.md`, `core/03-layout.md`, `core/05-accessibility.md`.

### Core - applies to every interface

| File | Holds |
|---|---|
| `core/01-tokens.md` | Tokens |
| `core/02-typography.md` | Typography |
| `core/03-layout.md` | Layout |
| `core/04-motion.md` | Motion |
| `core/05-accessibility.md` | Accessibility |
| `core/06-i18n.md` | Internationalisation |
| `core/07-charts.md` | Charts |
| `core/08-feedback.md` | Feedback |
| `core/09-input.md` | Input |
| `core/99-review.md` | Review |

### Pack - this domain

| File | Holds |
|---|---|
| `pack/01-surfaces.md` | Surfaces, palette and scales |
| `pack/02-page.md` | Page architecture - the fold, rhythm, sections |
| `pack/03-components.md` | Components |
| `pack/04-performance.md` | Performance as a design constraint |
| `pack/05-checklist.md` | Domain review checklist |

### Assets

| File | What it is |
|---|---|
| `assets/theme.css` | the token file - drop into a new project |

Before calling any work done, run `core/99-review.md` and then
`pack/05-checklist.md`.

<!-- Generated by tools/build.mjs from core/ and packs/consumer-web/. Do not edit. -->
