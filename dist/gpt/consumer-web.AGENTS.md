# Consumer web - UI design system

Agent instruction file for GPT-based coding agents (OpenAI Codex, Cursor, any
tool that reads `AGENTS.md`). Place at a repo root, or merge its sections into
an existing `AGENTS.md` under a "UI" heading.

**Apply this when the work is:**

- a marketing site, landing page or product page
- a pricing page, a documentation site or an editorial article
- anything a stranger arrives at from a search result, an ad or a link
- a request to look more premium, modern or trustworthy, or less generic
- work judged on whether the reader keeps scrolling

**Do not apply it to:**

- internal tools, admin panels and operations consoles - use the erp pack, which is built for the opposite reader
- dense data entry or any screen an operator works in all day
- data tables that must show twenty or more rows at once
- native mobile app interfaces, which have their own navigation conventions and touch targets

---

# Part 0 - Activation

### Applies whenever you are about to

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

### Do this before writing the first line

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

### Never do these, whatever the request

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

### When the request conflicts with a rule

Name the cost in one sentence, offer the nearest thing that works, then build
whatever is decided — it is their product. Do not silently comply, and do not
refuse.

Two exceptions are not negotiable, because their cost lands on someone who is
not in the room: the accessibility minimums, and the chart honesty rules. For
those, build the compliant version and say why.

### Say what you applied

When UI work is done, state in one line which pack and which rules shaped it.
A user who cannot see that this system is active cannot tell it from your
default behaviour, and cannot correct it.

---

# Part 1 - Domain

A design system for pages read by strangers. Someone arrived from a search
result, an ad or a link someone sent them. They owe you nothing, they will not
be trained, and they will leave the moment the page stops being worth the
scroll.

### The domain thesis

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

### What this pack adds on top of core

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

### Overrides

**Core says one type family plus a monospace. This pack uses two.**

Brand voice is a deliverable here rather than a nice-to-have, and a display
face is the cheapest way to stop a page reading as a template. Core's objection
is real, so the cost is paid explicitly rather than ignored: both families are
self-hosted and subset, the display face is preloaded, both declare
`font-display: swap` with metric-matched fallbacks, and the pairing stops at
two. A third family is not a style decision, it is a bug.

Nothing else in core is overridden. The accessibility minimums and the chart
honesty rules are not overridable at all.

### Non-negotiables

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

### What this pack deliberately refuses

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

### Getting started on a new project

1. Copy `assets/theme.css` in as the first stylesheet, then swap the accent and
   recompute the on-dark value.
2. Set the type scale before writing any component. On this kind of page the
   scale *is* the design, and retrofitting one means touching every section.
3. Decide the section rhythm once — one spacing value, used everywhere — and do
   not vary it per section.
4. Budget the page before building it: see `04-performance.md`. A budget agreed
   after the hero image is chosen is not a budget.

---

# Part 2 - Core (applies to any interface)

## Tokens

A token system is a promise that a colour appears in exactly one place. Every
rule below protects that promise; break one and you are back to grepping hexes.

### One file, loaded first

Tokens live in a single stylesheet loaded before everything else. Downstream
files may define their own tokens **in terms of** it — `--chart-series:
var(--accent)` — and may never define a literal.

```
theme.css      ← the palette, and nothing else
shell.css      ← layout, written entirely in theme tokens
page.css       ← one screen, written in both
```

If a colour is needed that no token covers, **add a token**. Ninety one-off hex
values is not a palette; it is a search problem with a stylesheet around it.

### Every accent needs one value per surface

This is the rule most often missed, and it produces a bug that survives review
because the colour is technically correct.

A brand colour picked to read as text on white will disappear on near-black,
and the reverse. So an accent is never one value:

```css
--accent:         #b3121b;  /* on light content */
--accent-on-dark: #f2555e;  /* the same brand, lifted to read on dark chrome */
```

The classic failure: a dark sidebar whose active item is painted in the
light-surface accent. It passes a brand check and is invisible in use. If a pack
has both a light and a dark surface — and most do somewhere, even if only in a
menu — it needs both values.

Same logic applies to semantic colours the moment they appear on two surfaces.

### In a dark theme, depth is luminance

A shadow is a darker area. On a light surface that reads as height; on a dark
surface there is nothing left to darken, so the shadow is invisible and every
layer collapses into the same plane — a menu that looks painted onto the panel
behind it, a dialog with no edge.

The mechanism that replaces it: **the higher a surface sits, the lighter it
gets.** Define the steps as tokens, in one place, so elevation is a scale rather
than a per-component guess.

```css
--surface-0: …;   /* the base — the page or workspace  */
--surface-1: …;   /* raised: cards, panels             */
--surface-2: …;   /* floating: menus, popovers, sheets */
--surface-3: …;   /* transient: dialogs, toasts        */
```

Derive each step by mixing a small, increasing amount of white into the base
rather than picking four unrelated greys. Picked by hand, the steps drift out
of order the first time someone adds a fifth, and a floating layer ends up
darker than the panel under it.

Two rules that come with it:

- **Not pure black for a large surface.** Maximum contrast against white text
  makes the text bloom and smear at the edges, which is why long sessions on it
  are tiring. Start from a very dark grey and let the scale climb from there.
- **Keep the shadows anyway, and make them do the second job.** A shadow on a
  dark surface still separates a floating layer from what it covers, even where
  it cannot signal height. Elevation is carried by luminance; containment is
  still carried by the shadow.

A pack states the actual values. What is not domain-negotiable is the direction:
in a dark theme, up is lighter.

### Alpha steps are tokens too

Focus rings, glows, hover washes, chart fills and hatch patterns all want the
accent at partial opacity. Define the steps once:

```css
--accent-a08: rgba(179, 18, 27, 0.08);
--accent-a12: rgba(179, 18, 27, 0.12);
--accent-a18: rgba(179, 18, 27, 0.18);
--accent-a25: rgba(179, 18, 27, 0.25);
--accent-a35: rgba(179, 18, 27, 0.35);
```

Hand-tuning opacity per component is how two focus rings end up subtly
different. Pick the steps, then only ever reach for a step.

Note the maintenance cost: these carry the accent's RGB literally, so
rebranding means recomputing them. That is the price of supporting browsers
without a relative-colour path; if your targets all support `color-mix()` or
relative `rgb(from …)`, derive them instead and the cost disappears.

### Semantic colours must not collide with the accent

If the accent is red, an error painted in accent red is indistinguishable from a
primary button — the user cannot tell "this failed" from "click me". Push danger
somewhere the accent is not:

```css
--accent:        #b3121b;   /* deep crimson */
--state-danger:  #ef3b3b;   /* brighter, more orange */
```

The general form: **the accent means "act here", semantics mean "this is the
situation".** When one hue tries to carry both, it carries neither.

The same applies in reverse. If the accent is green, success needs to move. If
the accent is blue, the conventional blue "info" state needs to become a
neutral — a second blue competing for attention with nothing to say is just
noise.

### Naming

Name by **role**, not by appearance or by where it first appeared.

| Good | Bad | Why |
|---|---|---|
| `--content-bg` | `--white` | The white surface goes grey in a dark theme and the name lies. |
| `--text-muted` | `--grey-400` | The ramp position is an implementation detail. |
| `--accent-on-dark` | `--light-red` | Says what it is for, not what it looks like. |
| `--border-strong` | `--border-2` | A number is not a meaning. |

Three steps is usually enough for a text ramp — primary, secondary, muted. A
fourth gets used inconsistently because nobody can tell it from the third.

### Rebranding must be a bounded operation

A pack should be able to state its rebranding procedure in under six steps. If
it cannot, colour has leaked out of the token file. The shape:

1. Change the accent block.
2. Recompute the per-surface accent values — never skip this one.
3. Recompute the alpha steps from the new RGB.
4. Re-check semantic separation: does danger still read as distinct?
5. Re-check contrast on the accent's text pairings.

### Contrast is a constraint, not a preference

Body text needs 4.5:1 against its surface; large text and UI boundaries need
3:1. Check the accent against **every** surface it lands on, not just the one it
was designed against — that check is what surfaces the missing second accent
value before a user does.

A brand colour that fails contrast as body text can still be correct as a
fill behind white text, or as a 3px rail. Demote it rather than lighten the
whole brand.

## Typography

### One family, plus a monospace

A second display family has to earn itself against the cost: another network
request, another fallback to tune, another set of metrics that shifts layout as
it swaps. Most interfaces are better served by one well-chosen family across
five weights.

A monospace is not optional wherever users read or copy identifiers — keys,
paths, hashes, IDs, SKUs, error codes. Proportional digits and a proportional
`l/1/I` make those unreliable to read aloud or transcribe.

Always ship a system fallback stack, and match its metrics roughly, or the page
reflows when the webfont lands.

### Base size is a domain decision; the unit is not

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

### Build the scale from the roles you actually have

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

### The label is quieter than the value

In any form or data view, the label is reference material and the value is the
content. Size and weight should say so: a smaller, lighter, greyer label above a
larger, darker value. Reversing this is common and it makes a thirty-field form
exhausting to scan, because the eye keeps landing on words it already knows.

### Measure

Cap running prose at roughly **65–75 characters** per line (`max-width: 72ch` is
a good default). Beyond that the eye loses the line return.

This matters most for the text people skip: help notes, empty-state
explanations, field hints. Those are exactly the strings that get written as one
long grey line across a 1600px container and are then never read.

### Numerals

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

### Truncation

Decide per element, and decide before the string arrives:

- **Never wrap** navigation labels, table headers, or anything in a fixed-height
  row. Wrapping changes the row height and the whole layout reflows.
- **Ellipsis** for names in constrained cells, with the full value reachable —
  a `title` attribute at minimum, a tooltip if it matters.
- **`overflow-wrap: anywhere`** for identifiers, file names and URLs. They
  contain no spaces, so the default breaking rules will push them straight out
  of their container.

## Layout

### The two traps that eat an afternoon

Both come from the same default and both look like a mystery until you know
them.

#### `min-width: auto` on grid and flex children

A grid or flex item will not shrink below its content's intrinsic width. So one
wide table, one long unbroken identifier, one `<pre>` block — and the item
widens its track, the container overflows, and something else gets pushed off
screen. In an app shell, the thing pushed off screen is the navigation.

```css
.main { min-width: 0; }                              /* the fix */
.grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }  /* not 1fr */
```

`1fr` is shorthand for `minmax(auto, 1fr)`, which carries the same default.
Write `minmax(0, 1fr)` habitually; there is no case where the `auto` form is
what you wanted.

#### A scroll container that is also a clip container

`overflow: hidden` on one axis and `auto` on the other still clips. Anything
that deliberately bleeds outside its box — a glow, a focus ring, a shadow, a
tooltip — will be cut at that edge. Either give the bleeding element room inside
the padding box, or move it out of the scroll container entirely.

### Sticky, not fixed, for app frames

A `position: fixed` bar leaves the flow, so the layout no longer knows it exists
and you start hand-maintaining offsets. `position: sticky` keeps it in flow and
lets the grid keep doing the work.

Fixed is right for things that genuinely float free of the document: a modal, a
toast, a menu anchored to the viewport rather than to its parent. A menu inside
a flex toolbar in particular must be fixed or absolute-outside, because the flex
container will clip it.

### Stylesheet order is part of the architecture

```
tokens → shell/layout → component → page
```

Each layer may consume the previous layer's tokens and may not reach forward.
When a page stylesheet needs to override a component, that is a signal the
component is missing a variant — not a licence for `!important`.

### Restore state before the first paint

Any state read from storage that affects **layout or visibility** must be
applied to the root element inline in `<head>`, before the stylesheets. A
collapsed sidebar, a hidden role-gated section, a chosen language, a theme.

Applied after paint, the user watches the interface correct itself on every
single navigation. It reads as a broken page rather than a restored preference.

```html
<script>
  try {
    if (localStorage.getItem('app.nav.collapsed') === '1')
      document.documentElement.classList.add('nav-collapsed');
  } catch (_e) { /* storage can throw outright, not just return null */ }
</script>
```

Every read gets its own `try/catch`. `localStorage` **throws** in some privacy
configurations rather than returning null, and an uncaught error here runs
before any stylesheet, so it blanks the page.

Consequence worth planning for: the class lands on the root element, while
runtime toggles usually set a class on a container. Every affected rule then
needs both selectors. Decide which element owns the state up front and keep it
consistent, or the duplicate-selector list grows without bound.

### Responsive: decide what each breakpoint is for

A breakpoint list is only maintainable if each entry has a stated job. Give each
one a reason, in the stylesheet:

```
1024px   secondary identity drops away, primary actions stay
820px    navigation switches to its compact form
640px    edge-anchored panels span the viewport
520px    multi-column forms become single-column
```

Two principles that survive every domain:

- **Never remove functionality at a smaller size — change its form.** If
  navigation collapses to icons, it is still navigation. If it disappears behind
  a control the user has not been taught, it is gone.
- **Let containers scroll rather than squeezing their contents.** A table
  crushed to fit is unreadable; a table in a scrolling wrapper is merely wide.

Container queries are the better tool wherever a component's layout depends on
its own width rather than the viewport's — a card in a sidebar and the same card
in a full-width panel. Reach for them before adding a fifth viewport breakpoint.

### Reserve space before content arrives

Anything async — an image, a chart, a list, a count — gets its dimensions
reserved before it loads. Otherwise the page reflows under the cursor and a user
mid-click hits the wrong thing.

Reserve with an aspect ratio, a min-height, or a skeleton at the real
dimensions. A spinner in a zero-height box guarantees a jump.

## Motion

This file is about movement the interface chooses: what moves, how fast, and
how it eases. What the interface owes a user *while they wait* — busy states,
spinners, skeletons, progress — is a different problem with a different clock,
and it lives in `08-feedback.md`.

### Duration comes from repetition count, not from taste

The right question is never "does this feel nice once". It is "how many times a
day does a user sit through this". A 400ms transition on a control someone
touches twice a session is a pleasure; the same 400ms on a row hover in a table
they scan all day is friction they cannot name but do feel.

| Band | For |
|---|---|
| **~120ms** | Hover and active on repeated elements: rows, list items, menu entries. |
| **~150ms** | The standard state change — colour, background, border. |
| **~160–200ms** | Something appearing or dismissing: menu, popover, toast. |
| **~200–250ms** | Something travelling a distance, or a layout dimension changing. |
| **~300ms+** | A one-off entrance. One per screen, at most. |

A pack may shift the whole set — a consumer app can afford more expression than
an operations console — but the **ordering** holds everywhere: repeated
interactions are always the fastest thing on the screen.

### Easing

- `ease` (or `ease-out`) for a state change. It is not worth a custom curve.
- A custom ease-out for anything that travels:
  `cubic-bezier(0.22, 0.61, 0.36, 1)`. Fast departure, soft arrival.
- **Never `linear`** for movement. It reads mechanical, because nothing physical
  moves at a constant speed.
- **Never `ease-in`** alone for something arriving. It starts slow, which reads
  as lag before it reads as motion.

### Pick the movement that explains the change

Left to default, everything fades. A fade is the one transition that carries no
information: it says something replaced something else and nothing about how the
two are related. The result is an interface where the user re-reads the screen
after every state change, because nothing told them what survived it.

Choose from a small vocabulary instead. Each entry answers a different question
the user is about to ask.

| Movement | What it tells the user | Use it when |
|---|---|---|
| **Transformation** | This is still the same object, doing a different job. | A submit button becoming a progress state, then a result. |
| **Parenting** | These two things are bound — one drives the other. | A header shrinking as its content scrolls; a panel tracking a drag. |
| **Masking** | The thing you selected is the thing that opened. | A summary expanding into its detail view. |
| **Offset and delay** | These arrived as a sequence, and this is its order. | A list or grid populating — a small stagger, not a per-item show. |
| **Obscuration** | This layer is now on top; what is behind it is out of play. | Dialogs, sheets, a global search overlay. |
| **Value change** | The number moved, and by roughly this much. | A total updating after an action the user just took. |

Two notes that are easy to get wrong:

- **Value change requires `tabular-nums`.** An animated figure without it
  reflows on every frame, which is the digit-jitter failure in `02-typography.md`
  at sixty frames a second. And animate it only where the *change* is the
  message — a dashboard whose every tile counts up on load has turned reading
  into waiting.
- **Masking is a promise about identity.** If the panel that opens is not the
  thing that was clicked, the transition has lied, and the user hunts for what
  they actually selected.

The rest — parallax, depth-of-field, cards flipping to reveal a back face — are
legitimate and are decoration. They earn a place when the movement *is* the
content, and they are the first thing to cut under `prefers-reduced-motion`.

### Animate the cheap properties

`transform` and `opacity` are composited — they do not trigger layout or paint.
Everything else can, and on a long table or a large list the cost is visible.

```css
/* good */   transition: opacity .16s ease, transform .16s ease;
/* costly */ transition: height .16s ease, top .16s ease, width .16s ease;
```

For a menu, animate `opacity` and `transform` and toggle `pointer-events` —
never animate `display`, which cannot transition and will simply snap.

To collapse something of unknown height, animate `grid-template-rows` from
`0fr` to `1fr`, or `max-height` to a known bound. Both beat measuring in
JavaScript.

### Reduced motion, done correctly

Ship the global guard:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

Near-zero rather than `none`, so `animationend` and `transitionend` handlers
still fire. Code that waits for one of those events to clean up will hang
forever against `animation: none`.

**Then check every animation that starts from a hidden state.** The guard kills
the animation; it does not supply the end state. An element with `opacity: 0`
plus a fade-in is now permanently invisible.

```css
/* WRONG — `revert` rolls back to the browser default of 1, not your value */
@media (prefers-reduced-motion: reduce) { .thing { opacity: revert; } }

/* RIGHT — state the value you actually want */
@media (prefers-reduced-motion: reduce) { .thing { animation: none; opacity: 1; } }
```

This one is worth grepping for. `revert` looks like it means "put my stylesheet
value back" and it does not — it rolls back to the previous cascade origin,
which for most properties is the user-agent default.

### What reduced motion means, and does not

It means: no large travel, no parallax, no spin, no bounce, no autoplay. Users
who set it may get motion sickness or migraines from movement.

It does not mean: no feedback. A colour change, an opacity change, and an
instant state swap are all fine and still tell the user their click registered.
Stripping all feedback leaves an interface that feels dead and unresponsive,
which is a different accessibility failure.

### Never animate on resize

Layout transitions plus a window drag equals a visibly lagging interface. If a
container has `transition: width`, a resize animates every intermediate frame.
Suspend layout transitions while resizing, or scope them to the property the
user's own action changes.

## Accessibility

Not a compliance pass at the end. Every item here is cheaper to build in than to
retrofit, and several of them are the same work as building it correctly.

### Focus

```css
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
```

- **`:focus-visible`, never `:focus`.** A mouse click on a button should not
  leave a ring behind; a Tab onto it must.
- **Never `outline: none` without a replacement.** If the default ring clashes,
  draw a better one. Removing it strands keyboard users with no idea where they
  are.
- **Inset the offset** (`outline-offset: -2px`) where an element sits flush in a
  cell or against a container edge, or the ring gets clipped and reads as a
  partial line.
- The ring must clear 3:1 against **both** the element and what surrounds it.
  On a dark chrome surface this is usually the per-surface accent value, not the
  base one.

### Keyboard

Every interactive thing is reachable and operable without a mouse. The common
misses:

- **Custom controls built from `<div>`.** If it clicks, it needs `tabindex="0"`,
  a role, and Enter/Space handling. Using the real element instead —
  `<button>`, `<a>`, `<input>` — gets all of that for free and is almost always
  the better answer.
- **Tab order following the DOM, not the visual layout.** CSS reordering
  (`order`, `grid-area`, `row-reverse`) does not move focus order. If they
  disagree, fix the DOM.
- **Focus traps in dialogs** — focus moves in on open, cycles inside, returns to
  the trigger on close, and Escape closes.
- **No keyboard path to data that is only hoverable.** A tooltip carrying
  information the user needs is not an accessible tooltip.

For a composite widget — a chart, a grid, a tree — the expected set is arrow
keys to move, Home/End for the extremes, Escape to dismiss.

### Semantics before ARIA

The first rule of ARIA is not to use ARIA. A native element already announces
its role, state and keyboard behaviour; an ARIA reimplementation announces
whatever you remembered.

Where ARIA is genuinely needed:

- **Label your landmarks.** Multiple `<nav>` elements are indistinguishable
  without `aria-label`. Same for `<aside>` and multiple `<section>`s.
- **`aria-current="page"`** on the active navigation item. A CSS class is
  styling; this is the announcement. Ship both.
- **`aria-live="polite"`** on regions that change without a page load: filter
  result counts, save confirmations, validation summaries. Without it, a screen
  reader user acts and hears nothing.
- **`aria-expanded`, `aria-haspopup`, `aria-controls`** on disclosure triggers.
- **An accessible name on every icon-only control.** In a tool people are
  trained on, an unlabelled icon is a support ticket; to a screen reader it is
  "button".

Keep a visually-hidden utility for names that must exist without showing:

```css
.sr-only {
  position: absolute; width: 1px; height: 1px;
  overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap;
}
```

Note that `display: none` and `visibility: hidden` remove an element from the
accessibility tree entirely — which is right for decoration, wrong for a label.

### Colour is never the only signal

Roughly 8% of men have a red-green colour vision deficiency, and a screenshot
pasted into a black-and-white report has none at all. Every state that colour
indicates also needs a shape, an icon, a position or a word.

The test: **print the screen in greyscale.** Anything that becomes ambiguous was
relying on hue alone.

This applies hardest to the two places it is most tempting: a red row versus a
green row with otherwise identical text, and a multi-series chart legend.

### Contrast

4.5:1 for body text, 3:1 for large text and for the boundaries of interactive
elements. Check the accent against **every** surface it lands on.

Placeholder text, disabled labels and "subtle" grey-on-grey metadata are where
this fails most often — and disabled controls still need to be readable, because
a user has to understand what is unavailable.

#### When the background is not a colour

A contrast ratio is measured against what is actually behind the glyphs. Put
text over a photograph, a video, a gradient or a blurred backdrop and the ratio
is no longer one number — it changes as the image changes, and a check that
passed against the sample asset fails against the one a user uploads.

Nothing about the text can fix this reliably; a heavier weight raises legibility
but not the measured ratio. What works is putting something between them: a
scrim over the whole image, or a solid plate behind the text block. Then check
the worst case the background can reach, not the one in the mock.

### Target size

See `09-input.md`. The floor is 24×24 CSS pixels with the standard's spacing
exception, it is one of the minimums a pack may raise and may not lower, and the
usual fix is padding the control rather than enlarging what is drawn inside it.

### Preferences beyond reduced motion

Three system preferences are exposed, and most interfaces honour one of them.

```css
@media (prefers-reduced-transparency: reduce) { … }   /* blur and see-through */
@media (prefers-contrast: more)              { … }    /* borders and ratios   */
@media (forced-colors: active)               { … }    /* the system's palette */
```

- **Reduced transparency** is set by people for whom a translucent surface with
  moving content behind it is unreadable. Honouring it means an opaque
  fallback — the same fallback you already need for browsers without
  `backdrop-filter`, so it costs one extra media query, not a second design.
- **Increased contrast** wants stated boundaries. Surfaces separated only by a
  one-step luminance difference need a real border here.
- **Forced colours** replaces your palette outright. Anything encoded purely as
  a background colour disappears; test that state is still legible when every
  colour you chose is gone. `forced-color-adjust` should be reserved for the few
  places where a colour carries meaning that cannot be re-expressed.

### Motion and vestibular safety

See `04-motion.md`. The rule that gets broken: honouring
`prefers-reduced-motion` by killing the animation without supplying the end
state, so an element that faded in is now permanently invisible.

### Zoom and reflow

The content must work at 200% zoom and at a 320px-wide viewport without
horizontal scrolling of the page as a whole. This is why type is sized in `rem`
and not `px`, and why individual containers — not the page — are the things that
scroll horizontally.

### Forms

- A real `<label>` associated with every control. Placeholder text is not a
  label: it vanishes on input, exactly when a user needs to check what they are
  filling in.
- Errors announced, not only coloured. Tie the message to the field with
  `aria-describedby`, and mark the field `aria-invalid`.
- Never disable submit without saying what is missing.
- Group related controls in a `<fieldset>` with a `<legend>` — this is what
  makes a set of radios announce as one question.

## Internationalisation

Retrofitting this is one of the most expensive things you can do to a front end,
because it touches every string and every fixed width. Building it in costs
almost nothing.

### Mark nodes, do not template strings

```html
<span data-i18n="nav.settings">Settings</span>
<input data-i18n-attr="placeholder:filter.file_ph" placeholder="Search file name">
<p data-i18n-html="help.body">Text with <b>markup</b></p>
```

The source language **stays in the HTML**. That is the point: the page is
readable, reviewable and testable without the translation layer running, and a
missing key degrades to real text rather than to `nav.settings`.

The same discipline applies with a framework. `t('nav.settings')` with no
fallback means every missing key is a visible defect in production; give the
call a default and the worst case is an untranslated word.

### Guard against the language flash

A dictionary applied after first paint means a Vietnamese user sees English,
then watches it change. It reads as a bug on every navigation.

```html
<script>
  try {
    var p = JSON.parse(localStorage.getItem('app.preferences') || '{}');
    var lang = p.language || 'en';
    document.documentElement.lang = lang;
    if (lang !== 'en') document.documentElement.classList.add('i18n-pending');
  } catch (_e) {}
</script>
<style>
  html.i18n-pending [data-i18n],
  html.i18n-pending [data-i18n-html] { visibility: hidden; }
</style>
```

Inline, in `<head>`, before the stylesheets — see `03-layout.md`. Hide only the
marked nodes, so layout still settles and only the text waits. And make sure the
class is always removed, including on a failed dictionary load, or the interface
stays blank.

`document.documentElement.lang` is not cosmetic: it drives hyphenation, quote
marks, font selection for CJK, and how a screen reader pronounces the page.

### Budget width

English is one of the more compact languages in a UI. German compounds and
Vietnamese diacritics both run long; Russian and Finnish longer still.

- **Roughly 35% headroom** on labels, buttons and nav items. Short strings
  expand proportionally more than long ones — a 5-character word can double.
- **Never let a fixed-height row wrap.** Truncate with an ellipsis and keep the
  full value reachable.
- **Test at the real extremes**, not with the English string. A pseudo-locale
  that pads every string 40% and adds diacritics surfaces every overflow in one
  pass.
- **Icon-plus-label beats label-only** in tight chrome, because the icon carries
  meaning while the label is compressing.

### Never concatenate a sentence

```js
// breaks in every language with different word order or gendered agreement
msg = count + ' of ' + total + ' ' + noun + ' match';

// translatable as one unit
t('filter.match', '{{n}} of {{all}} outputs match', { n: count, all: total });
```

Plurals are not a suffix. Arabic has six plural categories, Polish three,
Japanese one. Use the platform's plural rules (`Intl.PluralRules`, ICU
MessageFormat) rather than `n === 1 ? x : x + 's'`.

### Format with the locale, never by hand

```js
new Intl.NumberFormat(locale).format(1234.5);
new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(d);
new Intl.RelativeTimeFormat(locale).format(-3, 'day');
```

Decimal separators, thousands grouping, date order and first day of week all
vary. Hand-formatting `DD/MM/YYYY` produces a date that half the world reads as
a different day — and in an operational tool that is a real error, not a
cosmetic one.

Keep timestamps in UTC in the data layer and format at the edge, in the user's
zone.

### Right-to-left

If Arabic, Hebrew, Farsi or Urdu are plausible, the cost of being RTL-ready now
is roughly zero, and retrofitting is a full layout pass.

- Use **logical properties** throughout: `margin-inline-start`,
  `padding-inline`, `inset-inline-end`, `border-start-start-radius`. They flip
  automatically; `left`/`right` do not.
- `text-align: start` and `end`, not `left` and `right`.
- Directional icons — arrows, chevrons, back buttons — need to mirror. Icons
  depicting objects do not.
- Numbers and embedded Latin text stay left-to-right inside RTL text; let the
  browser's bidi algorithm handle it rather than forcing direction.

### What is not translated

Be explicit, because translators will otherwise ask or guess: product names,
identifiers, SKUs, file names, code samples, log output, and enum values that
appear in an API. Mark them so they are skipped.

## Charts

A chart is a claim about data. These rules keep the claim honest and keep the
numbers reachable; a pack layers its own density, palette and interaction style
on top.

### Honesty

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

### Round the scale, leave headroom

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

### Handle the degenerate cases explicitly

Every one of these has shipped as a blank chart or a crash:

- **One point** — centre it; a line path needs a nudged duplicate or it renders
  nothing.
- **Zero points** — an empty state, not an empty axis.
- **All values identical** — a flat line at a sensible scale, not a divide-by-zero.
- **All zeroes** — a real axis, not `yMax = 0`.
- **One outlier 100× the rest** — say something, or offer a log scale. Do not
  silently flatten the other 99 points.
- **More points than pixels** — downsample deliberately, so the shape survives.

### Interaction

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

### Accessibility is not optional here

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

### Series colour

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

### Gradient fills that mean something

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

### Library or hand-written

Hand-written SVG is the better default for a line, a bar set, an area or a
sparkline: no dependency, no competing token system, no accessibility gaps you
did not choose.

Reach for a library when you need brushing and linking, zooming and panning,
geographic projection, force layouts, or more than a few thousand marks. Then
budget real time for restyling it to your tokens and fixing its keyboard
support — both are usually more work than the chart was.

## Feedback

`04-motion.md` governs how a thing moves once it is moving. This file governs
something else: what the interface owes the user **between the click and the
answer**, and how that debt grows with the wait.

The two get confused because both are measured in milliseconds. An animation
duration is a design choice. A response time is a fact you are handed, and the
only decision left is what to show while it elapses.

### The clock picks the affordance

Measure the work, then pick the row. Do not pick by how important the action
feels.

| Elapsed | Show |
|---|---|
| **< 100ms** | Nothing. The result is already there; it reads as direct manipulation. |
| **100 – 300ms** | The control's own busy state. No overlay, no spinner — the thing the user touched acknowledges the touch. |
| **300ms – 1s** | A spinner **inside the region that is about to change**, at the size of the thing it replaces. |
| **1s – 5s** | A skeleton at the real dimensions of the content. |
| **> 5s** | Determinate progress — a percentage or a count — and a way to cancel. |

Three of these go wrong constantly:

- **A spinner under 300ms makes the interface slower.** It appears, the user
  registers it, it vanishes. A flash of "waiting" where there was no wait reads
  as a stutter. If the work is usually fast and occasionally slow, delay the
  spinner by ~300ms rather than rendering it immediately.
- **A spinner past a second is an apology with no information.** It says
  something is happening and nothing about what or how long. A skeleton says
  both, because it has the shape of the answer.
- **Indeterminate progress past five seconds is abandonment.** A user who cannot
  tell 10% from 90% cannot decide whether to wait, and a bar that has been
  ambiguous for thirty seconds is indistinguishable from a hang.

A skeleton is only honest at the real dimensions. A generic grey box that
collapses into a different layout is a spinner with extra steps — see the
space-reservation rule in `03-layout.md`, which this is the same argument for.

### Why the bands break where they do

Under **100ms** a response is attributed to the user's own action. Past it, the
user perceives the system as a separate actor that is responding.

The **Doherty threshold** — roughly 400ms — is where the interaction stops being
a conversation and starts being a queue. Below it, attention stays on the task;
above it, attention leaves, and the cost is not the 400ms, it is the time the
user spends coming back.

This is why the bands tighten around the actions people repeat. A 900ms save on
something done once a day is nothing. The same 900ms on a filter someone
adjusts forty times an hour is the reason they stop adjusting it, and the
feature is dead without anyone filing a bug.

### An optimistic update needs all three

Rendering success before the server confirms it is correct for a like button
and wrong for a transfer. The test is not "is it fast" — it is whether all
three hold:

1. **It nearly always succeeds.** Not "should" — measured.
2. **Failure is cheap.** Nothing downstream has acted on the assumption.
3. **It can be reversed in the interface**, without a reload and without the
   user re-entering anything.

Delete all three and the cost is a user who believes something happened that
did not.

When it does fail, **the rollback is announced, not silent.** Reverting the
state and saying nothing produces the worst outcome available: the user saw it
work, looks again, and now distrusts every other state on the screen. Restore
the value, say what failed, and leave their input where they can retry it.

```
optimistic    → render the new state, keep the previous one
on failure    → restore it, surface the reason, preserve the user's input
never         → restore it and stay quiet
```

### Every interaction has four parts, and two are usually missing

A complete interaction — a toggle, a save, a drag, a pull-to-refresh — has the
same four parts. Work through them in order; the failures cluster in the two
nobody writes down.

| Part | Question it answers |
|---|---|
| **Trigger** | What starts this, and can the user tell it exists, what it does and what state it is in? |
| **Rules** | What is allowed, in what order, and what happens at the edges — empty, one item, too many, offline, already running, triggered twice? |
| **Feedback** | How does the user learn which rule just applied? Visual, audible or haptic. |
| **Loops and modes** | How long does it persist, does it repeat, and what does it look like the hundredth time? |

**Rules** is where the bugs live, because rules are invisible until one is
wrong. Double submission, an action fired on an item that vanished under it,
a confirm dialog that runs the action twice — none of these are feedback
problems.

**Loops and modes** is where the charm becomes the cost. A mode that changes
what the surrounding controls do must be visible and must be escapable, or the
user issues the right command into the wrong mode — and blames themselves.

### Design for the hundredth time, not the first

Any flourish attached to a repeated action is seen hundreds of times by the
people who use the product most. A confetti burst on the first invoice is a
gift; on the four-hundredth it is a delay standing between someone and their
job.

Two ways out, both better than removing it: decay it — full the first few
times, reduced after — or attach it to the milestone rather than to the
repetition. The rule in `04-motion.md` about repeated interactions being the
fastest thing on screen is the same principle applied to duration.

### Spend the attention at the peak and at the end

People do not remember an average. They remember the most intense moment of an
experience and how it ended, and they rate the whole against those two.

Practically, that redirects the polish budget:

- **The error at the final step outweighs everything before it.** A failure on
  confirm erases a flow that was pleasant up to that point, so the recovery path
  from the last step deserves more care than the entrance to the first.
- **Finish deliberately.** An action that completes by having the spinner stop
  has no ending. State what happened, what changed and what is next.
- **The worst moment is a design surface.** Waiting, empty, rejected, expired —
  these are the moments that get remembered, and they are usually the ones
  written last and fastest.

## Input

An interface is not shaped by its screen size. It is shaped by what the user is
pointing with, and how far away they are sitting.

A phone and a desktop browser at the same CSS width are not the same problem:
one has a pointer accurate to a pixel and a hover state, the other has a finger
roughly ten millimetres wide and no hover at all. Treating width as the variable
is how a "responsive" layout ends up with 28px icon buttons on a touchscreen.

This file holds the method. The numbers a domain settles on belong to its pack —
except the floor, which is an accessibility minimum and belongs to nobody.

### Target size follows the pointer, not the screen

Time to hit a target falls as the target grows and rises as it gets further
away. Two consequences, and they compound:

- **The less precise the input, the larger the target must be.** A mouse
  cursor is a point; a fingertip is a contact patch; a gaze cursor drifts
  continuously because the eye never holds still.
- **The further away the screen, the larger the target must be** — at
  arm's length a 40px control and a 60px control are different sizes, at three
  metres they are the same blur.

The ordering that holds everywhere:

```
fine pointer, close    smallest targets the domain can justify
coarse pointer, close  targets sized to a fingertip, with spacing between them
remote or gaze, far    targets sized to be identified before they are selected
```

**The floor is 24×24 CSS pixels**, from WCAG 2.2 Target Size (Minimum), and it
is not domain-negotiable — it is one of the accessibility minimums that cannot
be overridden, because the cost lands on someone who is not in the room. A
smaller control is allowed only where the standard's own exceptions apply: it
has 24px of clear spacing around it, or it is an inline target inside a
sentence.

Packs raise this floor. None may lower it.

**Spacing counts as much as size.** Two targets that each meet the minimum but
sit flush against each other produce mis-taps that read to the user as the
interface ignoring them — they hit the thing, something else happened. Gaps
between adjacent actions are part of the target, not decoration.

**The hit area is not the visual size.** A 16px icon can carry a 44px target by
padding the control or projecting the area with a pseudo-element. Growing the
hit area is almost always the right fix; growing the icon is almost never.

### Hover does not exist everywhere

Roughly half the world's sessions have no hover state at all, and the failure is
total rather than degraded: the content is not merely hard to reach, it is
unreachable.

**Never put information or an action behind hover alone.** A row's delete button
that appears on hover, a truncated cell whose full value is in a tooltip, a menu
that opens on hover — on touch these either do not exist or fire on the tap that
was meant to select something else.

Hover is a *refinement*, and the capability is detectable:

```css
/* the control exists and is reachable for everyone … */
.row-action { opacity: 1; }

/* … and only quietens itself where a hover state is actually available */
@media (hover: hover) and (pointer: fine) {
  .row-action { opacity: 0; }
  .row:hover .row-action,
  .row-action:focus-visible { opacity: 1; }
}
```

Query the **capability**, never the device. `pointer` and `hover` describe the
primary input; `any-pointer` and `any-hover` describe everything available. A
laptop with a touchscreen answers yes to both, a tablet with a keyboard changes
its answer when the user picks it up, and neither is an edge case.

The parallel keyboard rule is in `05-accessibility.md` — if a hover reveals
something, focus must reveal the same thing, and the same markup usually solves
both.

### On a desktop, the edges are infinite

A cursor cannot overshoot past the edge of the screen, so the four edges and
especially the four corners behave as targets of unbounded size — the user can
throw the pointer at them without aiming.

That is why system menus, close buttons and docks live there, and it is worth
spending: an action used constantly earns an edge. Nothing about this transfers
to touch, where the edges are the hardest places to reach and are already
claimed by system gestures.

### Reach is not uniform

Where a hand rests determines which part of the screen is cheap. On a held
device the anchor is the thumb, which sweeps an arc — near the bottom centre is
cheap, the far top corner requires regripping, and regripping while walking is
how phones get dropped.

The method, independent of any device:

- **Put the primary action where the hand already is.** Not where the visual
  hierarchy would like it.
- **Put destructive actions where the hand is not.** Distance is the cheapest
  confirmation there is, and it costs nothing to the people who are not about to
  make a mistake.
- **Never put a frequent action in the most expensive corner** just because that
  is where the convention on another form factor placed it.

### When focus is the only cursor

With a remote, a D-pad, a keyboard or a gaze, the user cannot point at a target.
They can only move from the current one — so focus is not a highlight, it is the
cursor, and it must be unmissable.

- **Give it weight.** At a distance a 2px outline is invisible; the focused item
  needs to change size, elevation or fill enough to be located from across a
  room. The 3:1 contrast requirement in `05-accessibility.md` is the floor, not
  the target.
- **Movement follows geometry, not source order.** If pressing right lands
  somewhere the user would not call right, the model is broken, and no amount of
  visual polish repairs it.
- **No dead ends and no traps.** Every focusable element is reachable from every
  other, and every container can be left in the direction the user entered it.
- **One unambiguous focus at all times.** Never zero — a screen that loads with
  nothing focused cannot be operated at all — and never two.

### Physical feedback is feedback

Where the hardware offers haptics, a short pulse confirms an action without
requiring the user to look. It is the cheapest confirmation available on a
device held in the hand, and the only one that survives glare.

Two rules: haptics **confirm**, they never **inform** — anything conveyed by a
buzz alone is lost to anyone who has them disabled — and they follow the same
restraint as motion. A device that vibrates on every scroll tick gets its
haptics turned off, taking the useful confirmations with them.

## Review

The universal pass. A pack adds its own domain checks on top; nothing here is
waived by any domain.

### Checklist

#### Tokens
- [ ] No raw colour outside the token file. `grep -n '#[0-9a-fA-F]\{3,8\}'` over
      the other stylesheets should come back empty.
- [ ] Every accent has a value per surface, and each is used on the right one.
- [ ] Semantic colours are distinguishable from the accent.
- [ ] Downstream tokens are defined in terms of the palette, not as literals.

#### Type
- [ ] Type sized in `rem`/`em`, never `px`.
- [ ] `tabular-nums` on every figure, in every location.
- [ ] Figures compared by magnitude are right-aligned.
- [ ] Prose capped near 72ch.
- [ ] Labels quieter than the values they label.

#### Layout
- [ ] `min-width: 0` on every grid or flex item that can hold wide content.
- [ ] Grid tracks use `minmax(0, 1fr)`.
- [ ] Containers scroll; content is not squeezed to fit.
- [ ] Nothing that bleeds outside its box is inside a clipping scroll container.
- [ ] Works at 320px wide and at 200% zoom without page-level horizontal scroll.
- [ ] Async content has its space reserved — no layout shift on load.

#### State
- [ ] Every interactive element has hover, focus-visible, active and disabled.
- [ ] Disabled elements do not respond to hover.
- [ ] State that drives styling is also in the DOM (`data-state`,
      `aria-current`, `aria-expanded`) so it is announced and assertable.
- [ ] State restored from storage is applied before the first paint.

#### Loading, empty, error
- [ ] The three empty cases are worded differently: nothing exists yet, a filter
      excluded everything, the request failed.
- [ ] "Nothing yet" says what creates the first item.
- [ ] Errors show what actually happened, not a generic apology.
- [ ] Async work shows determinate progress where the duration is knowable.

#### Feedback
- [ ] The waiting affordance matches the wait: nothing under 300ms, a skeleton
      at real dimensions past a second, cancellable progress past five.
- [ ] No spinner appears and vanishes inside 300ms.
- [ ] Every optimistic update is reversible in the interface, and a failed one
      announces the rollback instead of quietly undoing it.
- [ ] Double-triggering, an empty result and an item that disappeared mid-action
      all behave.
- [ ] A completion says what changed, rather than ending when a spinner stops.
- [ ] Nothing celebratory is attached to an action someone performs all day.

#### Input
- [ ] Targets clear 24×24px, or carry the spacing the exception requires.
- [ ] Adjacent actions are separated; nothing destructive sits against something
      routine.
- [ ] No information or action is behind hover alone; hover is inside
      `@media (hover: hover)` and focus reveals the same thing.
- [ ] Capability is queried (`pointer`, `hover`), never the device.
- [ ] Focus is locatable at the viewing distance the screen is used at, never
      absent and never duplicated.

#### Accessibility
- [ ] Nothing is mouse-only.
- [ ] Tab order matches the visual order.
- [ ] Landmarks are labelled; multiple `<nav>`s are distinguishable.
- [ ] Icon-only controls have accessible names.
- [ ] Changes without a page load are announced via a live region.
- [ ] Greyscale test passes — no state indicated by hue alone.
- [ ] Contrast: 4.5:1 body, 3:1 large text and interactive boundaries, including
      placeholders and disabled labels.
- [ ] Text over an image, video or blur has a scrim or plate, checked against
      the worst background it can be given.
- [ ] `prefers-reduced-transparency` and `prefers-contrast` are answered, not
      only `prefers-reduced-motion`.
- [ ] Dialogs trap focus, restore it on close, and close on Escape.

#### Motion
- [ ] Repeated interactions are the fastest thing on screen.
- [ ] Transitions that replace content say what survived — not everything is a
      fade.
- [ ] Animated figures carry `tabular-nums`.
- [ ] Only `transform` and `opacity` animate on long lists.
- [ ] `prefers-reduced-motion` honoured, with end states stated explicitly —
      no `opacity: revert`.
- [ ] Nothing animates on resize.

#### Charts
- [ ] Value axis starts at zero where magnitude is compared, or the truncation
      is labelled.
- [ ] No dual y axes; small multiples share a scale.
- [ ] Degenerate cases handled: 0, 1, all-equal, all-zero, single outlier.
- [ ] Keyboard-steppable, with a table fallback.
- [ ] Series distinguishable in greyscale; categories never colour-only.

#### Internationalisation
- [ ] Strings marked, with the source language left in place as a fallback.
- [ ] No concatenated sentences; plurals via platform rules.
- [ ] Dates, numbers and relative times formatted via `Intl`.
- [ ] ~35% width headroom; nothing in a fixed-height row wraps.
- [ ] Translated pages do not flash the source language.
- [ ] Logical properties used if RTL is plausible.

### Failure modes

The ones that recur across every domain.

**The accent used on the wrong surface.** A brand colour chosen for one surface
applied to the other. Passes a brand review, invisible in use.

**`min-width: auto` blowing out a layout.** One wide table stretches its grid
track and pushes navigation off screen. The symptom looks like a broken
container; the cause is a default.

**State restored after first paint.** The interface visibly corrects itself on
every navigation. Reads as a bug, not as a preference.

**`opacity: revert` under reduced motion.** `revert` rolls back to the
user-agent default, not to your stylesheet value. Elements that faded in stay
invisible — or, worse, elements meant to be subtle become fully opaque.

**Proportional digits.** A column of numbers that ripples on every refresh. One
line of CSS, and nobody notices it is missing until it is fixed.

**Per-mark chart hit targets.** Users hunting a 4px circle to read a value.

**A truncated axis on a size comparison.** The chart overstates the difference,
and the screenshot outlives the conversation that would have qualified it.

**Colour as the only signal.** A red row and a green row with identical text.
Fails for ~8% of men and for every greyscale printout.

**`display: none` on something that needed a name.** Removed from the
accessibility tree, so the label it was carrying no longer exists.

**Placeholder text used as a label.** It disappears at the moment the user wants
to check what they are filling in.

**A spinner where the wait did not need one.** It appears and vanishes inside a
third of a second, and the user reads the flash as a stutter in an interface
that was actually fast.

**An indeterminate spinner on a long wait.** It reports that something is
happening and nothing about what or how long, so at thirty seconds it is
indistinguishable from a hang.

**A silent optimistic rollback.** The user saw it succeed, looks again, and it
is gone. They now distrust every other state on the screen, which is a worse
outcome than never having shown success.

**An action that only exists on hover.** The row's delete button, the tooltip
carrying the full value. On touch it is not degraded, it is absent.

**Shadows carrying elevation on a dark surface.** There is nothing left to
darken, so every layer lands on the same plane and a menu looks painted onto the
panel behind it.

**Palette drift.** The most common way a system dies — not with a decision, but
with a page written in a hurry, shipping literals that exist nowhere in the
palette. It looks fine in isolation and wrong beside everything else. Audit for
literals on a schedule; the fix is always mechanical, and it never gets easier.

### When a request conflicts with a rule here

Name the cost, offer the nearest thing that works, then build what they decide.
Record the decision where the next person will find it, so it is not
re-litigated from scratch next quarter.

Two of these are not negotiable regardless, because the cost lands on someone
who is not in the room: **the honesty rules for charts**, and **the
accessibility minimums**. For those, offer the compliant alternative rather than
the requested version.

---

# Part 3 - Consumer web specifics

## Surfaces, palette and scales

The concrete values. Core (`01-tokens`, `02-typography`, `04-motion`) holds the
method and the reasoning; this file holds what this domain picked.

### Surface assignment

| Role | Treatment | Why |
|---|---|---|
| **canvas** | Warm off-white `#fbfaf8`, or a dark section used deliberately | The page itself. Warm rather than grey — a cool grey reads as an application background, and this is not an application. |
| **content** | The canvas. No container by default. | A card is for grouping things that belong together, not for holding every paragraph. |
| **chrome** | A header that floats over the canvas, transparent until scrolled | Permanent chrome frames a workspace. There is no workspace here — there is a page. |
| **floating** | Menus, dialogs: white, 16px radius, warm soft shadow | Rare. If a page needs many, the page is doing too much. |
| **accent** | One saturated teal | Reserved for the primary action and nothing else. |
| **semantic** | Success, warning, danger | Forms and system messages only. Not decoration. |

**The contrast move of this pack is a dark section, not a card.** Where the
`erp` pack separates with a border, this separates with space — and when a
section needs to stand apart, it inverts to the dark surface for its full
width. That is why the ink ramp below exists at all.

### The token file

Ships as `assets/theme.css`. The accent needs both values for exactly the reason
core gives: `#0d7a6f` on `#14100e` is muddy and hard to read.

```css
:root {
  /* ----- Accent (swap to rebrand) ----- */
  --accent:         #0d7a6f;   /* on light: buttons, links, focus */
  --accent-hover:   #0a5f57;
  --accent-active:  #084a44;
  --accent-on-dark: #5eead4;   /* the same accent, legible on the ink surface */

  --accent-tint:   #f0faf8;    /* section washes, hover on light */
  --accent-tint-2: #d5f2ec;

  --accent-a10: rgba(13, 122, 111, 0.10);
  --accent-a20: rgba(13, 122, 111, 0.20);
  --accent-a35: rgba(13, 122, 111, 0.35);   /* focus ring */

  /* ----- Canvas: warm, not grey ----- */
  --canvas:    #fbfaf8;
  --canvas-2:  #f4f2ee;   /* alternating section, subtle */
  --surface:   #ffffff;   /* card, when one is warranted */

  --text:      #14100e;   /* warm near-black, never #000 */
  --text-2:    #57514c;
  --text-3:    #8b8279;   /* captions, meta - not body copy */

  --line:      #e8e3dc;   /* hairline, used sparingly */
  --line-2:    #d5cec4;   /* input borders */

  /* ----- Ink: the inverted section ----- */
  --ink:       #14100e;
  --ink-2:     #1f1a17;
  --ink-text:  #faf8f5;
  --ink-text-2:#b8b0a7;
  --ink-line:  rgba(255, 255, 255, 0.12);

  /* ----- Semantic: forms and system messages only ----- */
  --success: #15803d;
  --warning: #b45309;
  --danger:  #be123c;
}
```

**Never `#000` for text.** Pure black on an off-white canvas vibrates and reads
as harsh at large sizes — and this pack uses large sizes. `#14100e` carries the
warmth of the canvas.

**`--text-3` is not body copy.** It is for captions, timestamps and meta. Used
for a paragraph it fails contrast at the sizes anyone will actually read.

### Type

Two families, which is an override of core — see `PACK.md`.

```css
--font-display: 'Fraunces', 'Iowan Old Style', Georgia, serif;
--font-body:    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

The display face is for headings and the one pull quote. Everything else is the
body face. A display face in a button or a form label is where this pairing
starts to look like an accident.

Base `font-size` is **16px** — the browser default, not a shrunk one. A visitor
who has enlarged their default did so for a reason.

| Step | Size | Line height | Family | Used for |
|---|---|---|---|---|
| `--t-hero` | `clamp(2.5rem, 6vw, 4.5rem)` | 1.05 | display | The one headline above the fold |
| `--t-h2` | `clamp(2rem, 4vw, 3rem)` | 1.15 | display | Section headings |
| `--t-h3` | `1.5rem` | 1.25 | display | Sub-headings |
| `--t-lead` | `1.25rem` | 1.6 | body | The paragraph under a headline |
| `--t-body` | `1.0625rem` | 1.7 | body | Running text |
| `--t-small` | `0.9375rem` | 1.6 | body | Secondary text, labels |
| `--t-caption` | `0.8125rem` | 1.5 | body | Captions, meta, legal |

`clamp()` on the two large steps, so the headline does not need a media query
and does not overflow on a 360px phone. Fixed sizes below that — body text that
scales with the viewport is body text that is wrong at one end.

**Line height rises as size falls.** 1.05 on a hero, 1.7 on body. A hero set at
1.6 reads as a list of separate lines; body at 1.2 is a wall.

**Measure: `max-width: 65ch` on running text, 75ch at the absolute limit.** This
is the rule that most often gets dropped in a wide layout, and it is the one
that decides whether the copy is read.

### Space

The section rhythm is the design. Pick one value, use it everywhere.

| Token | Value | Where |
|---|---|---|
| `--gap-section` | `clamp(4rem, 10vw, 8rem)` | Between sections. **The single most important spacing value on the page.** |
| `--gap-block` | `2rem` | Between blocks inside a section |
| `--gap-item` | `1rem` | Between items in a group |
| `--gap-tight` | `0.5rem` | Label to control, icon to text |
| `--pad-section` | `clamp(1.25rem, 5vw, 2rem)` | Horizontal page padding |

Content max-width **1200px**, with running text capped tighter by its measure.
A hero or a full-bleed image may break out; a paragraph never does.

**Vary rhythm, not colour, to separate sections.** A page where every section
has a different background is a page where nothing stands out.

### Radii

```
8px     inputs, small buttons
12px    buttons, cards
16px    dialogs, large cards, images
999px   pills, avatars
```

Softer than an operational tool, deliberately. These read as touchable rather
than structural, which is the opposite of what the `erp` pack wants.

### Elevation

Warm, never neutral-black. A grey shadow on a warm canvas reads as dirt.

```css
--shadow-sm:  0 1px 2px rgba(20, 16, 14, 0.06);
--shadow-md:  0 4px 16px -4px rgba(20, 16, 14, 0.10);
--shadow-lg:  0 24px 48px -12px rgba(20, 16, 14, 0.18);
--shadow-cta: 0 8px 24px -8px var(--accent-a35);   /* the primary action only */
```

`--shadow-cta` is the one place the accent appears as a shadow. It lifts the
primary action off the canvas, and using it anywhere else spends that
distinction.

### Motion

Within core's bands. Most of this happens once per visit, so it can be more
expressive than an operational tool — but core's ordering still holds, and
anything repeated stays fast.

| Duration | For |
|---|---|
| 150ms | Hover, focus, colour |
| 250ms | Button press, small reveal |
| 400ms | Section reveal on scroll, dialog entry |
| 600ms | The hero, once, on first paint |

Easing `cubic-bezier(0.22, 0.61, 0.36, 1)` for anything that travels.

**Scroll reveals are allowed and come with two conditions.** Content must be
visible without JavaScript — animate from `opacity: 0` only when a class marks
JS as ready, never in the base stylesheet. And they fire once; re-animating on
scroll back up is motion for its own sake.

### Focus

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 4px;
}

.on-ink :focus-visible { outline-color: var(--accent-on-dark); }
```

`outline-offset: 3px` rather than the tighter inset an operational tool uses —
there is space here, and the ring reads better clear of the element.

The `.on-ink` override is the per-surface accent rule in practice. A dark
section with a teal-on-light focus ring is a keyboard user who cannot see where
they are.

## Page architecture - the fold, rhythm, sections

### The fold is not a line, it is a promise

Nobody decides in the first screenful whether to buy. They decide whether to
scroll. So the question is never "what fits above the fold" — it is "does this
screenful make the next one worth reaching".

What the first screenful owes a stranger, in this order:

1. **What this is.** In their words, not the company's. "Invoicing for
   freelancers" beats "Streamline your financial workflow".
2. **Who it is for**, if that is not obvious from the first.
3. **One action.**
4. **A reason to believe it** — a real screenshot, a named customer, a number.

Everything else belongs below. A first screenful carrying six propositions
carries none.

```html
<section class="hero">
  <h1>One sentence. What it is.</h1>
  <p class="lead">One or two lines. Who it is for and why it is different.</p>
  <a class="btn btn-primary" href="/start">The one action</a>
  <p class="reassure">No card required · Cancel any time</p>
  <img src="product.avif" width="1200" height="750" alt="…" fetchpriority="high">
</section>
```

The line under the button carries the objection the button raises. A button
that says "Start free trial" prompts "will you charge me?", and answering it
inline converts better than a FAQ twelve sections away.

### Rhythm is the layout

A long page is a sequence of sections at one consistent vertical rhythm. That
consistency is what makes it feel designed rather than assembled.

```css
.section { padding-block: var(--gap-section); }
.section > .inner { max-width: 1200px; margin-inline: auto; padding-inline: var(--pad-section); }
.section p, .section li { max-width: 65ch; }
```

- **One rhythm value, everywhere.** Not one per section, and not tuned by eye
  per breakpoint.
- **Vary width, not spacing, to create emphasis.** A full-bleed image or an
  inverted section stands out because its width changed, not because it got
  extra padding.
- **Alternate at most two backgrounds.** Canvas and one other. A third is where
  a page starts to look like a template gallery.

### Section shapes that carry weight

Most marketing pages need four or five of these, not all of them:

| Shape | Job | Fails when |
|---|---|---|
| Hero | What this is, one action | It lists features |
| Proof | Logos, a number, a named quote | The quote is anonymous, or the logo has no permission |
| The problem | Name the reader's situation before the solution | It is longer than the solution |
| How it works | Three steps, each one verb | Steps are nouns, or there are seven |
| Feature detail | One feature, one image, alternating sides | Every feature gets equal weight |
| Pricing | See `03-components.md` | It hides the price |
| FAQ | The objections sales actually hears | It is invented, and reads like it |
| Closing action | Repeat the hero action | It introduces a new, different action |

**The closing action repeats the hero action.** A reader who scrolled the whole
page and then meets a different call to action has been asked to re-decide.

### Where the eye goes

A stranger scans an F or a Z shape, not a grid. Practical consequences:

- **The first three words of a heading do most of the work.** "Built for teams
  who ship" is scanned as "Built for teams". Front-load the meaning.
- **Left-align running text.** Centred paragraphs have a ragged left edge, so
  the eye loses the line start on every return. Centre a heading and a short
  lead; never a paragraph over three lines.
- **One focal point per screenful.** As the reader scrolls, each screenful
  should have exactly one thing that wins. Two things competing is two things
  ignored.

### Navigation

The header floats over the canvas and stays out of the way. It is not the
permanent frame an operational tool needs.

```css
.header {
  position: sticky; top: 0;
  background: transparent;
  transition: background .15s ease, box-shadow .15s ease;
}
.header.is-scrolled {
  background: color-mix(in srgb, var(--canvas) 85%, transparent);
  backdrop-filter: blur(8px);
  box-shadow: var(--shadow-sm);
}
```

- **Five or six top-level items, maximum.** Beyond that nobody reads them; they
  use search or leave.
- **The header's action is secondary to the hero's.** Same destination, quieter
  treatment. Two primary buttons on one screenful halve each other.
- **Provide a fallback for `backdrop-filter`.** Where it is unsupported the
  header must still be opaque enough to read against whatever scrolls under it.
- **The mobile menu is a real menu**: a `<button>` with `aria-expanded`, focus
  moved in on open, Escape to close, focus returned to the trigger. A checkbox
  hack is not keyboard-operable and is not announced.

### Footer

The footer is where people go when they are looking for something specific:
pricing, contact, status, terms, a job. Make it findable and complete. This is
the one place on the page where density is correct — a compact, well-grouped
footer is a service, not a wall.

### Responsive

The page is designed at 360px and at 1440px. The middle takes care of itself if
the type scale uses `clamp()` and the layout uses `grid` with `auto-fit`.

| Width | What changes |
|---|---|
| < 640px | Single column. Section rhythm drops to its `clamp()` floor. Hero image after the text, not before. |
| 640–1024px | Two-column grids where the content supports it |
| > 1024px | Full layout; content capped at 1200px |

- **Never hide content on mobile.** A stranger on a phone is the majority of
  this traffic. If something is not worth their time, it is not worth anyone's.
- **Tap targets at least 44px**, with 8px between them.
- **The hero image goes below the headline on a phone.** A full-width image
  above the text pushes the one sentence that matters off the screen.

### What must survive JavaScript failing

Not a hypothetical: it covers a failed CDN, a slow connection that times out,
an aggressive extension, and the crawler that decides how the page is indexed.

- The headline, the lead, and what the product is.
- The primary action, as a real `<a>` or a form that submits.
- Navigation links.
- Prices.

Scroll reveals, carousels, accordions and tabs may enhance. None of them may be
the only way to reach content.

```css
/* base: visible. JS adds .js to <html>, and only then may things start hidden */
.js .reveal { opacity: 0; transform: translateY(12px); }
.js .reveal.is-in { opacity: 1; transform: none; transition: opacity .4s, transform .4s; }
```

Writing `opacity: 0` in the base stylesheet is how a page ships blank to
everyone whose JavaScript did not run.

## Components

Fewer components than an operational tool needs, each carrying more weight.

### Buttons

```css
.btn {
  display: inline-flex; align-items: center; gap: .5rem;
  padding: .875rem 1.75rem;
  border-radius: 12px;
  font: 600 1.0625rem/1 var(--font-body);
  text-decoration: none;
  cursor: pointer;
  transition: background .15s ease, transform .15s ease, box-shadow .15s ease;
}

.btn-primary {
  background: var(--accent); color: #fff; border: 0;
  box-shadow: var(--shadow-cta);
}
.btn-primary:hover { background: var(--accent-hover); transform: translateY(-1px); }
.btn-primary:active { background: var(--accent-active); transform: none; }

.btn-secondary {
  background: transparent; color: var(--text);
  border: 1px solid var(--line-2);
}
.btn-secondary:hover { background: var(--canvas-2); }

.btn-lg { padding: 1.125rem 2.25rem; font-size: 1.125rem; }
```

Bigger than an operational button on purpose: this one is being sold, not
operated.

- **One primary per screenful.** The header's action is secondary even when it
  goes to the same place.
- **The label is a verb the reader would use.** "Start free trial", not
  "Submit" and not "Learn more" — the second tells them nothing about where
  they are going.
- **Never disable the primary action without saying what is missing**, next to
  the thing that is missing.
- `transform: translateY(-1px)` is the whole hover. Anything larger moves the
  layout under the cursor.

### Cards, used sparingly

A card groups things that belong together. It is not the default container, and
a page built entirely of cards is an admin panel with marketing copy in it.

```css
.card {
  background: var(--surface);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  transition: box-shadow .15s ease, transform .15s ease;
}
a.card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
```

If a card is a link, **the whole card is the link** — do not nest a "Read more"
anchor inside a clickable div. Either wrap the card in an `<a>`, or use one
anchor on the heading and a `::after` overlay to extend its hit area. A div with
a click handler is not keyboard-reachable and is not announced.

### Feature rows

Alternating image and text beats a grid of equal tiles, because a grid says
everything is equally important and nothing is.

```css
.feature { display: grid; gap: clamp(2rem, 5vw, 4rem); align-items: center; }
@media (min-width: 900px) {
  .feature { grid-template-columns: 1fr 1fr; }
  .feature:nth-child(even) > .media { order: -1; }
}
```

One heading, two or three sentences, one image. If a feature needs a bullet
list, it is two features.

### Pricing

```css
.plans { display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
.plan { border: 1px solid var(--line); border-radius: 16px; padding: 2rem; background: var(--surface); }
.plan.is-featured { border-color: var(--accent); box-shadow: var(--shadow-md); }
.plan-price { font: 700 var(--t-h2)/1 var(--font-display); font-variant-numeric: tabular-nums; }
```

- **Show the price.** "Contact us" on every tier is read as "expensive, and you
  will be negotiated with".
- **Three tiers, at most four.** More becomes a comparison task nobody agreed
  to do.
- **Mark one recommended**, and let it be the one most people should pick, not
  the most expensive.
- **`tabular-nums` on prices** — core's rule, and it shows up most when a
  monthly/annual toggle changes the digits in place.
- **State the billing period next to the number**, not in a footnote. A price
  that turns out to be annual at checkout is the last interaction you get.
- **Differences, not repetition.** A feature every tier has does not need a row
  in every column.

### Forms — lead capture

Every field costs conversions. Ask for what you will use this week.

```css
.field { display: flex; flex-direction: column; gap: .5rem; }
.field label { font: 600 var(--t-small)/1.4 var(--font-body); color: var(--text-2); }
.field input, .field textarea {
  padding: .875rem 1rem;
  border: 1px solid var(--line-2);
  border-radius: 8px;
  background: var(--surface);
  font: 400 1.0625rem/1.5 var(--font-body);   /* >=16px: iOS zooms below that */
}
.field input:focus-visible { outline: 2px solid var(--accent-a35); outline-offset: 2px; border-color: var(--accent); }
.field .error { color: var(--danger); font-size: var(--t-caption); }
```

- **A real `<label>` on every field** (core `05-accessibility.md`). On a
  lead-capture form the cost of getting this wrong is not usability, it is the
  submit that never happens.
- **Never below 16px on an input.** iOS Safari zooms the page in, and the
  layout the reader was looking at is gone.
- **Correct `type` and `autocomplete`** — `type="email"`, `autocomplete="email"`.
  It changes the phone keyboard and lets the browser fill the field.
- **Validate on blur, not on keystroke.** Telling someone their email is
  invalid while they are typing it is scolding them for being unfinished.
- **The error says what to do**, next to the field, and is tied with
  `aria-describedby`.
- **Success is a state, not a redirect to a blank page.** Say what happens next
  and when.

### Testimonials and proof

- **A name, a role and a company, or it is not a testimonial.** An anonymous
  quote reads as written in-house, because usually it was.
- **A photo of the person beats a logo**, and a logo beats a star rating.
- **Specific beats glowing.** "Cut our close from nine days to two" outperforms
  "Amazing product, great team".
- **Numbers need a source and a date.** An unattributed "10x faster" is read as
  marketing, which costs more trust than leaving it out.
- **Use logos only with permission.** This is a legal question, not a design
  one, and the answer is the client's to give.

### FAQ — a disclosure list, not an accordion widget

```html
<details class="faq">
  <summary>Can I cancel any time?</summary>
  <p>Yes. …</p>
</details>
```

Native `<details>` is keyboard-operable, announced correctly, searchable in the
page and works without JavaScript. A custom accordion has to re-earn all four,
and usually re-earns two.

Write the objections sales actually hears. An invented FAQ reads exactly like
an invented FAQ.

### The inverted section

The one high-contrast move this pack has. One or two per page.

```css
.on-ink { background: var(--ink); color: var(--ink-text); }
.on-ink .lead { color: var(--ink-text-2); }
.on-ink .btn-primary { background: var(--accent-on-dark); color: var(--ink); box-shadow: none; }
.on-ink :focus-visible { outline-color: var(--accent-on-dark); }
```

Everything that lands on it needs its on-dark value: text, accent, focus ring,
logos. This is core's per-surface accent rule, and a dark section is where a
pack that only defined one value discovers the mistake.

### Images

```html
<img src="hero.avif" width="1200" height="750" alt="" loading="lazy" decoding="async">
```

- **`width` and `height` always**, even with CSS sizing. They reserve the aspect
  ratio and stop the page shifting as images arrive.
- **`loading="lazy"` on everything except the hero.** The hero gets
  `fetchpriority="high"` and no lazy attribute — lazy-loading the largest
  element on screen delays the metric it defines.
- **`alt` describes the content, not the file.** Decorative images take
  `alt=""` so a screen reader skips them rather than reading a filename.
- **Never bake text into an image.** It cannot be searched, translated, read
  aloud, or resized.

## Performance as a design constraint

This file exists in this pack and not in `erp` for a reason. An operator waits
for an internal tool, because it is their job and there is no alternative. A
stranger does not wait. A hero that takes four seconds has already spent the
five seconds this whole pack is built around.

So page weight is not an engineering concern handed over after the design is
agreed. It is a design decision, made at the same time as the type scale.

### Budget the page before building it

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

### Layout shift is a design bug

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

### Fonts

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

### Images

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

### JavaScript

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

### Measure on a phone, not on the machine that built it

A development laptop on office wifi tells you nothing about the visitor. Test
on a mid-range Android on a throttled connection, and look at the 75th
percentile of field data rather than a single lab run.

A page that is fast in the office and slow in the field is slow.

## Domain review checklist

Run **`core/99-review.md` first** — tokens, type, layout, state, accessibility,
motion, charts, i18n. Nothing there is waived by this domain.

This file is what a public page needs on top.

### Checklist

#### The first screenful
- [ ] A stranger can say what this is, in their own words, from the headline.
- [ ] Exactly one primary action.
- [ ] The objection that action raises is answered next to it.
- [ ] One reason to believe: a real screenshot, a named customer, a number.
- [ ] Headline and action are in the HTML, not revealed by JavaScript.
- [ ] On a 360px phone the headline is visible without scrolling, and the hero
      image sits below it.

#### Type
- [ ] Base is 16px. Not shrunk.
- [ ] Running text capped at 65ch, 75ch absolute maximum.
- [ ] Line height rises as size falls — roughly 1.05 hero, 1.7 body.
- [ ] Two families at most, and the display face is not used in buttons,
      labels or form fields.
- [ ] Hierarchy is carried by size, weight and space — not by colour.
- [ ] No paragraph over three lines is centred.

#### Rhythm
- [ ] One section rhythm value, used everywhere.
- [ ] At most two alternating backgrounds.
- [ ] Emphasis comes from width changes, not from extra padding.
- [ ] Each screenful has exactly one thing that wins.
- [ ] The closing action repeats the hero action rather than introducing a new one.

#### Surfaces
- [ ] The canvas is warm, not a cool application grey.
- [ ] Cards are used for grouping, not as the default container.
- [ ] Text is `--text`, never `#000`.
- [ ] `--text-3` is not used for body copy.
- [ ] Every inverted section uses the on-dark accent for text, buttons and the
      focus ring.
- [ ] Shadows are warm; the accent shadow is on the primary action only.

#### Components
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

#### Performance
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

#### Without JavaScript
- [ ] Headline, lead, prices, navigation and the primary action all work.
- [ ] Nothing starts at `opacity: 0` in the base stylesheet.
- [ ] Accordions, tabs and carousels enhance; none is the only route to content.

### Failure modes specific to this domain

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

### Refusals

`PACK.md` lists what this pack pushes back on — carousels, entry pop-ups,
autoplaying sound, a colour per section, a third font, text in images, infinite
scroll — and what to offer instead. Name the cost, offer the alternative, then
build whatever is decided, and record the decision so nobody re-litigates it.

---

<!-- Generated by tools/build.mjs from core/ and packs/consumer-web/. Do not edit. -->
