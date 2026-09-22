# ERP & back-office - UI design system

Context file for Gemini (Gemini CLI, Code Assist, Gems). Place at a repo root
as `GEMINI.md`, or in `~/.gemini/GEMINI.md` to apply it everywhere. For a Gem,
paste the whole file into the Instructions field.

**Apply this when the work is:**

- an internal business tool, admin panel or operations console
- a back-office screen or an operational dashboard
- a request to look like a real ERP rather than a consumer SaaS
- a screen that must stay readable through a full working day

**Do not apply it to:**

- marketing sites, landing pages or anything optimised for a first impression
- consumer mobile apps - the density assumes a mouse and a large screen
- content-first reading experiences - blogs, documentation, editorial
- storefronts and product pages, where the product image is the subject

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

A complete design system for internal business software, extracted from a
production ERP front end. It is opinionated on purpose: the decisions below were
made for operators who sit in front of the same five screens for eight hours,
not for a landing page that has to win a first impression.

### The domain thesis

**Chrome is dark. Content is white. The accent only marks state and action.**

The sidebar and topbar are near-black and recede. Every surface that holds
something a person reads, compares or edits — cards, tables, dropdowns, form
fields — stays white. One brand accent marks the selected item, the primary
action and the data series, and nothing else.

This is what separates an ERP from a consumer dashboard. A consumer dashboard
uses colour to create delight. An ERP uses colour as a *signal*, so when
something is red it means something. Spend the accent anywhere else and you have
spent the only tool you had for saying "look here".

### What this pack adds on top of core

Core already requires per-surface accents, visible focus, tabular numerals and
honest axes. This pack decides the things core deliberately leaves open:

- **Density.** 13px base, `8px 12px` table cells, 20+ rows visible at 1080p.
  Comfortable consumer spacing means a third fewer rows per screen, which for an
  operator is a real cost rather than a matter of taste.
- **Surface assignment.** Chrome dark and content white, permanently and
  simultaneously — not a theme toggle.
- **Corner radii inverted from the usual.** Chrome is *sharper* than content
  (2–4px against 6–12px). Square corners on the shell read as structural, a
  window frame; soft corners on content read as touchable. Getting this backwards
  is what makes an ERP look like a consumer app wearing a dark theme.
- **A flat elevation model.** Borders separate things; shadow is reserved for
  what genuinely floats. The shell itself never has one.
- **One container.** A card, with a consistent head. No panel/box/section
  variants — a dense page stays scannable because every container is the same
  shape.

### Non-negotiables

Apply these without being asked.

- **`assets/theme.css` is the only file that names a colour.** Everything else
  spends it. A new colour is a new token there, and a token that only one page
  uses is still better than a literal.
- **Density is the point.** Do not quietly relax it because a screen looks
  tight. Offer a density toggle instead.
- **`tabular-nums` on every figure.** Tables, tiles, axis labels, tooltips.
- **Motion is 0.12s–0.22s.** Anything slower is felt as lag by someone
  performing the same action 200 times a day.
- **One primary button per card.** Two accent-filled buttons and the accent
  stops meaning "the action".
- **The number on a KPI tile is never coloured.** Tinting it green or red passes
  judgement on a figure that may be neither; put the judgement in the sub-line
  where it can be worded.

### What this pack deliberately refuses

Say so briefly if asked for one of these, then offer the alternative and build
whatever is decided.

| Request | Cost | Offer instead |
|---|---|---|
| Glassmorphism on cards | Contrast on the data, which is the whole budget | A border and a flat off-white fill |
| Bigger, airier spacing | A third fewer rows per screen | A density toggle, defaulting to compact |
| A colour per module | The accent stops signalling state | One accent; distinguish by icon and label |
| 16px rounded cards | Reads consumer, not operational | 8px — soft without being playful |
| Animated page transitions | Felt as lag at the 200th repetition | Instant navigation with a 150ms content fade |
| Icon-only buttons, no label | A support ticket, in a tool people are trained on | An icon with a label, or a real accessible name |

If they hear the cost and still want it, build it. It is their product.

### Getting started on a new project

1. Copy `assets/theme.css` in as the first stylesheet, then swap the accent
   block for the client's colour — and recompute the on-dark value.
2. Start the page from `assets/page-template.html`, with `assets/erp-shell.css`
   beside `theme.css`. The inline script in the template's
   `<head>` is not optional; see the shell reference.
3. Keep the stylesheet order: theme → shell → page.

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
Everything else can, and the cost scales with how many elements are doing it at
once. One row changing background under the cursor is free; five hundred rows
staggering in on a paint property is a visibly slow page.

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

## Visual language

A visual language is the named style a surface is built in — the bento grid,
the heavy-bordered industrial look, translucent glass, an interactive 3D scene.

It is the one axis in this system that is neither core nor a pack. Core cannot
own it, because nothing here says a domain must be built in any particular
style. A pack cannot own it either, because the same style is available to
every domain: a bento grid works on a marketing page and on an operations
dashboard, and refusing it in one of them is a taste, not a thesis.

What *is* true everywhere is the pricing. Every one of these costs something
specific, in a place that is not obvious when you choose it, and each has one
or two rules that decide whether it survives contact with real content. That
is what this file holds.

### Price it before you adopt it

Four questions. If a style cannot answer all four, it is decoration that has
not been costed.

1. **What does it buy, in one sentence?** "It looks modern" is not an answer.
   "It lets six unequal things share a screen without a hierarchy argument" is.
2. **What does it cost in contrast?** Most of these styles put text somewhere
   the contrast ratio is not a fixed number — see the variable-background
   section of `05-accessibility.md`.
3. **What does it cost to render?** Per frame, on the worst device in the
   audience, not on the machine it was designed on.
4. **How does it degrade?** When the effect is unsupported, switched off by a
   system preference, or handed content twice as long as the mock — what is
   left, and is what is left usable?

The answer to 4 is the one that separates a style from a liability. A style
that degrades to something plain is a choice. A style that degrades to
unreadable was never a style, it was a dependency.

### The current set, and what each one needs to survive

#### Modular grid of unequal cells

Blocks of different sizes sharing one grid, sized by importance rather than by
uniformity. Cheap — native grid, no GPU cost — and the most useful of the set,
because it solves a real problem: presenting six things of unequal weight
without pretending they are equal.

What it needs:

- **A cell count with a floor and a ceiling.** Too few and there is no rhythm
  to read, just a grid; too many and nothing is dominant, which is the whole
  mechanism gone. Five to nine is the usual working range outside a dedicated
  data dashboard.
- **DOM order is reading order.** An asymmetric grid is exactly where source
  order and visual order drift apart, and it is invisible until a screen reader
  or a keyboard arrives — the tab-order rule in `05-accessibility.md`, in the
  layout most likely to break it.
- **One cell is clearly the largest**, and it holds the thing the screen is
  about. If every cell is nearly the same size, the format is doing nothing.
- **A stated collapse order.** At one column, the grid becomes a list, and the
  list order is a decision somebody has to make rather than whatever the source
  happened to be.

#### Heavy borders, hard shadows, saturated fills

Thick outlines, offset shadows with no blur, loud fills, geometric or
monospaced type. Costs nothing to render and buys distinctiveness in domains
where looking like everyone else is itself a problem.

What it needs:

- **Contrast checked on the fill, not on the palette.** Saturated backgrounds
  are where text contrast fails most reliably, and the brighter and more
  cheerful the fill, the worse it usually is.
- **A budget.** Applied to a whole long-session interface it is exhausting in a
  way people describe as "I just don't like using it". Applied to the primary
  action and one or two feature blocks it is a signature.
- **An answer for the states.** A style built on a single heavy border has
  nowhere obvious to put hover, focus and disabled, and they tend to get
  invented per component. Decide them once, with the border.

#### Translucent surfaces

A layer that blurs and tints what is behind it. Native to two desktop operating
systems and to spatial interfaces, which is why it reads as system-level rather
than decorative.

It is also the most fragile thing in this file, because its legibility depends
on content it does not control.

What it needs:

- **A fallback that is not optional.** Two of them, and they are the same
  fallback: browsers without backdrop blur, and users who have asked for
  reduced transparency (`05-accessibility.md`). An opaque surface with the same
  tint is the answer to both, so this is one extra rule rather than a second
  design.
- **Text on a plate, not on the blur.** The ratio changes as the background
  scrolls past. A local opaque layer behind the text block fixes the ratio; a
  heavier font weight only makes the failure look intentional.
- **A ceiling on how many layers stack.** Each blurred surface is a separate
  offscreen buffer, and the cost is per layer, per frame. Two translucent
  surfaces over one another is usually one too many.
- **Never over a live feed.** Video, a map, a chart that updates — the
  background changes without the user acting, so the text's legibility changes
  without the user acting.

#### Real-time 3D

An interactive scene the user can rotate, configure or scrub. The only style
here with a hard budget, and the only one that can make a device hot.

What it needs:

- **A frame budget, chosen from the target device**, with geometry and texture
  compression sized to hit it. This is a number agreed before modelling, not a
  problem discovered at integration.
- **A non-visual path to the same information.** A scene conveys size,
  material and configuration; someone who cannot see it still needs those, and
  a canvas element announces nothing.
- **A poster frame and a stated loading state.** Assets are heavy, so the
  screen has to be useful before they arrive — see the waiting rules in
  `08-feedback.md`.
- **Motion the user drives, not motion that plays.** Autoplaying camera
  movement is the exact class of motion `04-motion.md` says to drop under
  reduced motion, and a scene whose only affordance is that movement has
  nothing left when it goes.

#### Dark interfaces

Not a style — a second set of surface values, and it belongs to the token
system. `01-tokens.md` holds the two rules that decide whether it works: depth
is carried by luminance rather than shadow, and the base surface is not pure
black.

### When the request arrives by name

Users ask for these by name: *make it glassmorphism*, *give it that bento
look*. Treat the name as a description of an outcome they want, and the rules
above as the price.

The move is the one in the activation block: name the cost in a sentence, offer
the version that survives, then build whatever is decided.

- *"Glass cards over the dashboard"* → the data loses contrast, which on a
  dashboard is the entire budget. Offer glass on the chrome, where there is no
  data to lose, and flat surfaces under the numbers.
- *"The whole site in the heavy industrial style"* → fine for a landing page,
  punishing for a signup flow. Offer it on the hero and the primary action.
- *"A 3D product viewer"* → ask what the frame budget is on the cheapest phone
  in the analytics, before anything is modelled.

What is not negotiable is the same pair as everywhere else: the accessibility
minimums and the chart honesty rules. A style is never a reason to drop below
them, because the person who pays is not in the room.

### A pack's part in this

A pack does not own a visual language, and it may **refuse** one — with a
reason, in its refusals table, naming what the style costs *in that domain*.
"Glass on a data table costs contrast on the data, which is the whole budget"
is a domain argument. "Glass is out of fashion" is not.

If a pack adopts one as its default, that belongs in its thesis, with the
values in its palette file, because at that point it has stopped being a style
and become part of what the domain decided.

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

#### Visual language
- [ ] Any named style in use has an answer for what happens when it is
      unsupported, switched off by a system preference, or handed twice the
      content.
- [ ] A translucent surface has an opaque fallback, and its text sits on a
      plate rather than on the blur.
- [ ] An asymmetric grid reads in DOM order, and has a stated single-column
      order.
- [ ] A 3D scene has a frame budget, a poster frame and a non-visual path to
      the same information.

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
- [ ] No property other than `transform` and `opacity` animates across many
      elements at once. One element under the cursor is free; five hundred
      rows entering is not.
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

**A style with no degraded state.** Translucency on a browser without backdrop
blur, a 3D scene that never loads, a heavy border under forced colours. The
screen does not look plainer — it stops working.

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

# Part 3 - ERP & back-office specifics

## Surfaces, palette and scales

The concrete values. Core (`01-tokens`, `02-typography`, `04-motion`) holds the
method and the reasoning; this file holds what this domain picked.

### The two-surface model

Every surface is either **ink** (chrome) or **paper** (content). This is not a
light/dark theme toggle — both exist on the same screen at the same time,
permanently.

| | Ink | Paper |
|---|---|---|
| What lives here | Sidebar, topbar, hero KPI tiles | Cards, tables, forms, dropdowns, tooltips, modals |
| Job | Recede. Frame the work. | Hold the work. |
| Background | `#0a0a0c` – `#1c1c21` | `#ffffff`, page `#f6f7f9` |
| Text ramp | `#f1f1f4` / `#b9b9c2` / `#7f7f8a` | `#0f172a` / `#475569` / `#94a3b8` |
| Border | `#2a2a32` | `#e2e8f0`, inputs `#cbd5e1` |
| Hover | `rgba(255,255,255,0.06)` | `#f7f8fa` |
| Corner radius | 2–4px (sharp) | 6–12px (soft) |
| Shadow | none, ever | only when it floats |

**The chrome is sharper than the content.** Square corners on the shell read as
structural — a window frame, not a card. Soft corners on content read as
touchable.

A dropdown or tooltip hanging off the dark topbar is still **paper**: white,
12px radius, slate shadow. It holds content, so it follows the content rules.

### The token file

Ships as `assets/theme.css`. The accent's two values are the part to get right —
`#b3121b` on `#0a0a0c` is unreadable, which is why `--brand-red-on-dark` exists.

```css
:root {
  /* ----- Brand (swap to rebrand) ----- */
  --brand-red:         #b3121b;   /* on paper */
  --brand-red-hover:   #8d0d15;
  --brand-red-dark:    #6e0a10;
  --brand-red-light:   #e11d2e;
  --brand-red-on-dark: #f2555e;   /* the same brand, legible on ink */

  --brand-red-tint:   #fdf2f3;
  --brand-red-tint-2: #fbdfe1;
  --brand-red-tint-3: #f6c9cd;
  --brand-red-border: #efc4c7;

  --brand-red-a08: rgba(179, 18, 27, 0.08);
  --brand-red-a12: rgba(179, 18, 27, 0.12);
  --brand-red-a18: rgba(179, 18, 27, 0.18);
  --brand-red-a25: rgba(179, 18, 27, 0.25);
  --brand-red-a35: rgba(179, 18, 27, 0.35);

  --brand-red-gradient:      linear-gradient(135deg, #7d0d13 0%, #b3121b 45%, #d81f2a 130%);
  --brand-red-gradient-soft: linear-gradient(135deg, #b3121b 0%, #e11d2e 100%);

  /* ----- Ink (chrome) ----- */
  --ink-950: #0a0a0c;  --ink-900: #101013;  --ink-850: #16161a;
  --ink-800: #1c1c21;  --ink-700: #26262d;
  --ink-border: #2a2a32;  --ink-border-soft: #1f1f26;
  --ink-text: #f1f1f4;  --ink-text-dim: #b9b9c2;  --ink-text-muted: #7f7f8a;
  --ink-hover: rgba(255, 255, 255, 0.06);
  --ink-active: rgba(255, 255, 255, 0.10);
  --ink-tile: linear-gradient(160deg, #16161a 0%, #0c0c0f 100%);

  /* ----- Paper (content) ----- */
  --paper: #ffffff;  --paper-2: #f7f8fa;  --paper-3: #f1f3f5;  --paper-bg: #f6f7f9;
  --paper-text: #0f172a;  --paper-text-2: #475569;  --paper-text-3: #94a3b8;
  --paper-border: #e2e8f0;  --paper-border-strong: #cbd5e1;

  /* ----- Semantic ----- */
  --state-success: #16a34a;
  --state-warning: #ca8a04;
  --state-danger:  #ef3b3b;   /* brighter and more orange than the brand */
  --state-danger-dark: #c81e1e;
  --state-info:    #3f3f46;   /* neutral ink, not blue */
}
```

Two choices worth keeping when rebranding:

**`--state-danger` is not the brand.** In a red-accent palette an error painted
in brand red is indistinguishable from a primary button, so danger is pushed
brighter and more orange — "this failed" must never read as "click me".

**Info is neutral ink, not blue.** A blue info state here would be a second
colour competing for attention with nothing to say. If the brand is blue, invert
this and make info a neutral grey.

### Type

**Inter**, weights 400/500/600/700/800, with a system fallback stack. Monospace
(`ui-monospace, SFMono-Regular, Menlo, Consolas`) for keys, paths, IDs and
anything copyable.

Base `font-size` on `body` is **13px** — the high-density standard. Shell in
`em` so the frame scales with it; content in `rem`.

| rem | px @13 | Used for |
|---|---|---|
| 0.72 | 9.4 | Tile labels, table headers, metadata terms |
| 0.75 | 9.8 | Field labels, small buttons, link buttons, tooltips |
| 0.8125 | 10.6 | Table body, buttons, notes, status text |
| 0.875 | 11.4 | Inputs, definition values |
| 1.0 | 13 | Card titles |
| 1.25 | 16.3 | Tile values (the number itself) |
| 1.5 | 19.5 | Page `h1` |

Weights: 400 input text, 500 nav, 600 labels and buttons, 700 titles and values,
800 badge counts only. Prose capped at `max-width: 72ch`.

### Space

A 2px grid. The values that recur:

| Value | Where |
|---|---|
| `20px 22px` | Inside a card |
| `16px` | Gap between stacked cards |
| `12px` | Between form fields |
| `8px 12px` | Table cell, nav item |
| `5px` | Label to input |
| `24px 28px 36px` | Main content padding, `16px` under 820px |

Content max-width: **1600px** for table-heavy pages, **1200px** for form-heavy
ones. Beyond that, following a single table row becomes a journey for the eye.

### Radii

```
2px    shell sub-elements
4px    shell nav items, toggles
6px    inputs, buttons
8px    cards, tiles, tooltips, table wrappers, segmented controls
12px   floating dropdowns and popovers
999px  pills, badges, status chips
50%    avatars, status dots
```

### Elevation

Flat by default. Shadow is slate, never black, and only for things that float:

```css
--shadow-float:   0 18px 40px -12px rgba(15, 23, 42, 0.25),
                  0 6px 12px -6px  rgba(15, 23, 42, 0.12);
--shadow-tooltip: 0 8px 24px rgba(15, 23, 42, 0.14);
--shadow-raised:  0 1px 2px rgba(15, 23, 42, 0.12);
```

The sidebar and topbar have **no shadow** — a 1px hairline separates them. A
shadow there makes the shell look like it is hovering over the page instead of
containing it.

### Motion

Within core's bands, this domain runs at the fast end:

| Duration | For |
|---|---|
| 0.12s | Dropdown item hover |
| 0.15s | Standard background and colour change |
| 0.16s | Dropdown open/close |
| 0.18–0.22s | Transform, rotate, layout width |
| 0.32s | A one-off entrance flourish |

`ease` for a state change, `cubic-bezier(0.22, 0.61, 0.36, 1)` for travel.

### Focus

```css
/* On ink — inset, so the ring is not clipped by a flush cell */
:focus-visible { outline: 2px solid var(--brand-red); outline-offset: -2px; }

/* On paper — outset, softer, paired with a border shift on inputs */
input:focus-visible {
  outline: 2px solid var(--brand-red-a35);
  outline-offset: 1px;
  border-color: var(--brand-red);
}
```

## The shell - sidebar, topbar, responsive

### The grid

The whole application is one CSS grid. The sidebar spans both rows, so it runs
the full height of the viewport and the topbar starts to its right.

```css
.erp-shell {
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr;   /* 240px */
  grid-template-rows:    var(--topbar-height) 1fr;   /*  64px */
  grid-template-areas:
    "sidebar topbar"
    "sidebar main";
  min-height: 100vh;
  transition: grid-template-columns 0.22s ease;
}

.erp-shell.is-collapsed { grid-template-columns: var(--sidebar-collapsed) 1fr; } /* 72px */
```

Both the sidebar and the topbar are `position: sticky; top: 0`, so a long table
scrolls under a bar that stays put. Sticky, not fixed — fixed takes the element
out of flow and the grid stops doing the work for you.

Dimensions: sidebar `240px` open / `72px` collapsed, topbar `64px`.

### State restored before paint, and stylesheet order

Both are core rules — see `core/03-layout.md`. What this pack pins down:

- The keys are `app.sidebar.collapsed`, `app.user` (for role-gated nav) and
  `app.preferences` (language). All three affect layout or visibility, so all
  three are applied to `<html>` inline in `<head>`, before the stylesheets.
  `assets/page-template.html` ships the script, and `assets/erp-shell.css`
  ships this whole section as a file.
- Order is `theme.css` -> `erp-shell.css` -> page `styles.css`. A page
  stylesheet may define tokens in terms of theme tokens, never as literals.
- Because the class lands on `<html>` while the runtime toggle sets it on the
  shell container, every collapsed rule needs both selectors:

```css
.erp-shell.is-collapsed .nav-label,
html.sb-collapsed .erp-shell .nav-label { display: none; }
```

### Sidebar

```
brand         fixed height, logo swaps to a 26px mark when collapsed
nav           flex: 1, scrolls, thin scrollbar
  section     0.68em / 700 / uppercase / 1.4px tracking / muted
  item        8px 12px, 10px gap, icon 22px box with an 18px svg
footer        collapse toggle, separated by a hairline
```

```css
.erp-sidebar {
  background: linear-gradient(180deg, var(--ink-950) 0%, var(--ink-900) 100%);
  border-right: 1px solid var(--ink-border);
  display: flex; flex-direction: column;
  position: sticky; top: 0; height: 100vh;
}
```

#### The nav item

```css
.nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 12px; margin: 2px 0;
  border-radius: 4px;
  border-left: 3px solid transparent;   /* reserved for the active rail */
  color: var(--ink-text-dim);
  font-size: 0.92em; font-weight: 500;
  position: relative;
  isolation: isolate;
  transition: background 0.15s ease, color 0.15s ease;
}

.nav-item:hover { background: var(--ink-hover); color: var(--brand-on-dark); }
```

**Reserve the 3px transparent border on every row, active or not.** That is what
keeps the label from shifting sideways when the selection moves. Adding the
border only to the active item is the classic version of this bug.

#### The active item

Two ways to mark it. Both keep the reserved border; pick one per project.

**Flat** — correct default for a dense, quiet tool:

```css
.nav-item.is-active {
  background: var(--brand-a18);
  color: var(--brand-on-dark);
  border-left-color: var(--brand);
  border-top-left-radius: 0; border-bottom-left-radius: 0;
}
```

**Lit** — a rounded rail that emits, a bloom that falls off across the row.
Costs nothing in layout and reads well on near-black:

```css
.nav-item.is-active {
  background: linear-gradient(90deg, var(--glow-soft) 0%, var(--glow-faint) 55%, transparent 100%);
  color: var(--brand-on-dark);
  border-left-color: transparent;
  text-shadow: 0 0 14px var(--glow-soft);
}

/* The emitter. Absolute offsets resolve against the padding box, so -3px
   lands it exactly over the transparent border every row already reserves. */
.nav-item.is-active::before {
  content: ''; position: absolute;
  left: -3px; top: 4px; bottom: 4px; width: 3px;
  border-radius: 0 3px 3px 0;
  background: var(--brand-on-dark);
  box-shadow: 0 0 6px  1px var(--glow-strong),
              0 0 18px 4px var(--glow-soft),
              0 0 34px 10px var(--glow-faint);
}

/* The bloom it casts into the row. */
.nav-item.is-active::after {
  content: ''; position: absolute;
  left: -8px; top: 50%; width: 140px; height: 150%;
  transform: translateY(-50%);
  background: radial-gradient(ellipse at left center, var(--glow-soft) 0%, transparent 72%);
  pointer-events: none;
  z-index: -1;
}

.nav-item.is-active .nav-icon { filter: drop-shadow(0 0 7px var(--glow-strong)); }
```

Two mechanics to carry over:

- `isolation: isolate` on the row gives it its own stacking context, so the
  `z-index: -1` bloom sits between the row background and its text instead of
  sinking behind the sidebar.
- Drive the whole effect from `--glow-strong` / `--glow-soft` / `--glow-faint`
  at ~0.55 / 0.20 / 0.05 alpha of the on-dark accent, so recolouring is one edit.

#### Collapsed state

Hide `.nav-label`, `.nav-badge`, `.sidebar-section` and the toggle text; centre
the item; swap the wordmark for the square mark. Keep the icons and the active
rail. Collapse is icon-only navigation, not a different navigation.

### Topbar

Sharp corners, no shadow, a single hairline underneath, and cells that stretch
full height so hover fills the bar edge to edge.

```
[ page title ......................... ] [ 🔔 56px ] │ [ avatar · name · role ▾ ]
```

- Title `1.15em / 700`, truncates with an ellipsis, never wraps.
- Icon buttons are a fixed 56px wide (48px under 640px), `border-radius: 0`,
  `align-self: stretch`. Hover fills the whole cell.
- **Exactly one vertical divider**, before the user menu. It separates identity
  from actions. A second divider turns the bar into a toolbar and the effect is
  lost.
- Focus rings inset (`outline-offset: -2px`) so they are not clipped.

#### Dropdowns

`position: fixed`, anchored `top: calc(var(--topbar-height) - 4px); right: 16px`.
Fixed, not absolute: the topbar is a flex container and an absolute child gets
clipped by it.

They are **paper** — white, 12px radius, two-layer slate shadow — even though
they hang off dark chrome. They hold content, so they follow the content rules.

```css
.dropdown {
  opacity: 0; transform: translateY(-6px) scale(0.98);
  pointer-events: none;
  transform-origin: top right;
  transition: opacity 0.16s ease, transform 0.16s ease;
}
.dropdown.is-open { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
```

Animate opacity and transform, never `display`. Under 640px, let them span the
viewport with `left: 8px; right: 8px; width: auto; max-width: 380px`.

### Main area

```css
.erp-main {
  grid-area: main;
  background: var(--paper-bg);
  padding: 24px 28px 36px;
  min-width: 0;        /* lets a wide table scroll instead of blowing the grid */
  overflow-x: hidden;
}
.erp-main > .container { max-width: 1600px; margin: 0 auto; }
```

`min-width: 0` is load-bearing here for the reason core gives in `03-layout.md`:
without it one wide table stretches the grid track and pushes the sidebar off
screen. In this shell that is the single most common layout bug.

Page title block, not a hero banner:

```css
.page-title h1 { font-size: 1.5em; font-weight: 700; margin: 0 0 4px; letter-spacing: -0.01em; }
.page-title p  { font-size: 0.92em; color: var(--paper-text-2); margin: 0; }
```

### Responsive

| Breakpoint | Change |
|---|---|
| 1024px | Drop the user name and role from the topbar; keep the avatar |
| 820px | Sidebar defaults to icon-only; main padding to 16px |
| 640px | Icon buttons to 48px; dropdowns span the viewport |
| 520px | Form grids to one column; charts to 240px tall |

Under 820px the sidebar collapses **by default** but the footer toggle still
expands it. Navigation must stay reachable without a hamburger.

### Accessibility, structurally

- `<aside aria-label="Primary navigation">` and `<nav aria-label="Modules">`.
- `aria-current="page"` on the active item — `.is-active` is styling, this is
  the announcement.
- Suppress reload when the already-active tab is clicked. A full navigation to
  the current URL re-runs every page script and throws away unsaved state.
- The `.sr-only` utility from core ships in `assets/theme.css`; the collapsed
  sidebar depends on it, since at 72px the visible label is gone.

### Internationalisation

Core (`core/06-i18n.md`) covers the mechanics. The shell-specific consequences:

- Nav labels never wrap. A two-line nav item changes the row height and the
  whole sidebar reflows, so they truncate with an ellipsis instead.
- Budget ~35% width headroom on nav labels and the topbar title. The collapsed
  72px sidebar is the safety valve: at that width the label is gone and only the
  icon carries meaning, which is why icons are mandatory and not decorative.
- The topbar title truncates rather than wrapping - the bar is a fixed 64px.

## Components

Every component here lives on **paper**. Copy the spec, keep the tokens.

### Card

The only container. There is no "panel", "box" or "section" variant — one
container with a consistent head makes a dense page scannable.

```css
.card {
  background: var(--paper);
  border: 1px solid var(--paper-border);
  border-radius: 8px;
  padding: 20px 22px;
}
.card-head {
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: 16px; flex-wrap: wrap; margin-bottom: 14px;
}
.card-title { margin: 0 0 4px; font-size: 1rem; font-weight: 700; color: var(--paper-text); }
.note       { margin: 0; max-width: 72ch; font-size: 0.8125rem; line-height: 1.5; color: var(--paper-text-2); }
```

Border, not shadow. Cards sit on `--paper-bg`, which is slightly grey, so a
hairline is enough to separate them and the page stays flat and quiet.

`flex-wrap` on the head is what keeps a title and its action row from colliding
at narrow widths.

### Buttons

Three variants, and that is the whole set.

```css
.btn {
  padding: 8px 16px;
  border: 1px solid var(--paper-border-strong);
  border-radius: 6px;
  background: var(--paper);
  color: var(--paper-text);
  font: inherit; font-size: 0.8125rem; font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.btn:hover:not(:disabled) { background: var(--paper-2); }
.btn:disabled             { opacity: 0.55; cursor: default; }

.btn-primary {
  border-color: var(--brand); background: var(--brand); color: var(--text-on-brand);
}
.btn-primary:hover:not(:disabled) { background: var(--brand-hover); border-color: var(--brand-hover); }

.btn-sm { padding: 5px 12px; font-size: 0.75rem; }

/* A bare text action — "Clear filters", "Reset". Not a link, not a button. */
.link-btn {
  padding: 0; border: 0; background: none;
  color: var(--brand);
  font: inherit; font-size: 0.75rem; font-weight: 600;
  cursor: pointer;
}

.btn:focus-visible, .link-btn:focus-visible {
  outline: 2px solid var(--brand-a35); outline-offset: 2px;
}
```

**One primary button per card.** The accent means "this is the action". Two of
them on one surface means neither does.

`:hover:not(:disabled)` matters — a disabled button that still lights up on
hover reads as broken.

### Forms

The `<label>` *is* the field wrapper. One element carries the label text, the
control and their spacing, so nothing can drift out of alignment.

```html
<label class="field">
  <span>Host</span>
  <input type="text" name="host">
</label>
```

```css
.field {
  display: flex; flex-direction: column; gap: 5px; min-width: 0;
  font-size: 0.75rem; font-weight: 600; color: var(--paper-text-2);
}
.field input, .field select, .field textarea {
  width: 100%; box-sizing: border-box;
  padding: 8px 10px;
  border: 1px solid var(--paper-border-strong);
  border-radius: 6px;
  background: var(--paper); color: var(--paper-text);
  font: inherit; font-size: 0.875rem; font-weight: 400;
}
.field textarea {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.75rem; resize: vertical;
}
.field :focus-visible {
  outline: 2px solid var(--brand-a35); outline-offset: 1px;
  border-color: var(--brand);
}
```

The label is **smaller and lighter** than the value it labels (0.75rem/600 grey
over 0.875rem/400 near-black). In a form of thirty fields the values are what
gets scanned; labels are reference material.

`min-width: 0` on the field stops a long value from blowing out its grid column.

#### Form grid

```css
.form-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.field-wide { grid-column: span 2; }

@media (max-width: 860px) { .form-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 520px) { .form-grid { grid-template-columns: 1fr; } .field-wide { grid-column: auto; } }
```

`minmax(0, 1fr)`, never plain `1fr` — the default `min-width: auto` makes a
long unbroken value widen its column and break the grid.

#### Segmented control

For 2–4 mutually exclusive options. Real radios underneath, so keyboard and
form submission work for free.

```css
.segment { display: inline-flex; padding: 3px; border-radius: 8px; background: var(--paper-3); }
.segment label { position: relative; cursor: pointer; }
.segment input { position: absolute; opacity: 0; pointer-events: none; }
.segment span  { display: block; padding: 6px 14px; border-radius: 6px;
                 font-size: 0.8125rem; font-weight: 600; color: var(--paper-text-2); }
.segment input:checked + span {
  background: var(--paper); color: var(--paper-text);
  box-shadow: var(--shadow-raised);
}
.segment input:focus-visible + span { outline: 2px solid var(--brand-a35); }
```

The selected option is raised out of a recessed track — no accent needed.

### Tables

The centre of gravity of an ERP. Get the density right and the rest follows.

```css
.table-wrap { overflow-x: auto; border: 1px solid var(--paper-border); border-radius: 8px; }
.table { width: 100%; border-collapse: collapse; font-size: 0.8125rem; }

.table th {
  padding: 8px 12px; text-align: left;
  font-size: 0.72rem; font-weight: 600; color: var(--paper-text-2);
  background: var(--paper-2);
  border-bottom: 1px solid var(--paper-border);
  white-space: nowrap;
}
.table td { padding: 8px 12px; color: var(--paper-text); border-bottom: 1px solid var(--paper-border); }
.table tr:last-child td { border-bottom: 0; }

.table .num {
  text-align: right;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.table td.truncate { max-width: 320px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
```

Rules that carry the weight:

- **`tabular-nums` on every numeric column** (core `02-typography.md`). It
  matters more here than anywhere: a table is the centre of gravity of this
  domain, and most of them refresh in place.
- **Numbers right-aligned, text left-aligned.** Right alignment is what lets
  someone compare magnitudes without reading.
- **Header is smaller than the body.** 0.72rem grey against 0.8125rem
  near-black. The header is a reference, the data is the content.
- **Hairlines between rows, no zebra striping.** Striping adds visual weight at
  the density this system runs at.
- **The wrapper scrolls, the table does not shrink.** Squeezing columns to fit
  is how an unreadable table happens.
- **`white-space: nowrap` on headers**, so a two-word header never doubles the
  header height.

#### Row actions

Every operational table has one, and the default an assistant reaches for -
revealing it when the row is hovered - is the thing `core/09-input.md` rules
out. So it is specified here rather than left to be reinvented.

```css
.table .col-action { width: 1%; text-align: end; }   /* shrink to content */

.row-action {
  min-height: 26px;
  padding: 4px 10px;
  border: 1px solid var(--paper-border-strong);
  border-radius: var(--radius-control);
  background: var(--paper);
  color: var(--paper-text-2);
  font: inherit; font-size: 0.72rem; font-weight: 600;
  white-space: nowrap; cursor: pointer;
}
.row-action:hover:not(:disabled) { background: var(--paper-2); color: var(--paper-text); }
.row-action:active:not(:disabled) { background: var(--paper-3); }

/* Inset, because the action column sits flush against the right edge of a
   wrapper that clips on the x axis and a positive offset gets cut. */
.row-action:focus-visible { outline: 2px solid var(--brand); outline-offset: -2px; }

/* A toggle states its own state. The label changes with it. */
.row-action[aria-pressed='true'] {
  border-color: var(--brand-border);
  background: var(--brand-tint);
  color: var(--brand);
}
```

Four rules:

- **Present at all times, for every row.** Not on hover - on a touchscreen a
  hover-revealed control does not exist, and with a keyboard it appears only
  once focus has already arrived somewhere invisible.
- **Quiet by default.** A column of forty buttons at full button weight
  out-shouts the data they act on, which is why this is one step down from
  `.btn-sm` in size and uses the muted text colour until hovered.
- **One per row.** More than one and the column becomes a toolbar; put the
  rest behind a single overflow menu.
- **A toggle carries `aria-pressed` and changes its label.** "Hold" becomes
  "Release". A button whose text never changes cannot tell a screen reader
  what it just did.

Destructive row actions do not belong here at all. They go in the overflow
menu, last, after a divider - distance is the cheapest confirmation there is.

### Loading

`core/08-feedback.md` sets which affordance a wait has earned. This is what the
one that matters here looks like: a table reloading, which in this domain is
most waits.

```css
.skeleton-cell {
  display: block;
  height: 11px;                                   /* the cap height of a row */
  border-radius: 3px;
  background: linear-gradient(90deg,
              var(--paper-3) 0%, var(--paper-2) 50%, var(--paper-3) 100%);
  background-size: 200% 100%;
  animation: skeleton-sweep 1.1s ease-in-out infinite;
}
.skeleton-cell.is-short { width: 45%; }
.skeleton-cell.is-right { margin-inline-start: auto; width: 60%; }

@keyframes skeleton-sweep {
  from { background-position: 100% 0; }
  to   { background-position: -100% 0; }
}

/* The global guard kills the animation and does not supply an end state.
   Without this the cells inherit whatever frame they stopped on. */
@media (prefers-reduced-motion: reduce) {
  .skeleton-cell { animation: none; background: var(--paper-3); opacity: 1; }
}
```

The rules that make it honest:

- **Render it into the real `<tr>`/`<td>` structure**, one skeleton row per row
  you expect. A grey block of arbitrary height is a spinner that costs more.
- **Schedule it, do not render it immediately.** Below a second the answer
  usually beats it, and a skeleton that appears and vanishes reads as a
  stutter in an interface that was fast. Set it on a ~300ms timer and clear the
  timer when the data lands.
- **`aria-hidden` on the skeleton rows.** They carry no information, and a
  screen reader announcing eight rows of nothing is worse than silence. Put the
  word in the live region instead - the same one that carries the match count.
- **The table header stays.** Only the body is unknown, and keeping the header
  means the columns do not move when the data arrives.

### KPI tiles

```css
.tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; }
.tile  { padding: 12px 14px; border: 1px solid var(--paper-border); border-radius: 8px;
         background: var(--paper-2); min-width: 0; }
.tile-label { font-size: 0.72rem; font-weight: 600; color: var(--paper-text-2); }
.tile-value { margin-top: 4px; font-size: 1.25rem; font-weight: 700; color: var(--paper-text);
              font-variant-numeric: tabular-nums;
              white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tile-sub   { margin-top: 2px; font-size: 0.72rem; color: var(--paper-text-3); }
```

`auto-fit` with `minmax(150px, 1fr)` reflows without a single media query.

**The number is not coloured.** Tint the value green or red and you have said
"good" or "bad" about a figure that may be neither. Put the judgement in
`.tile-sub` ("+12% vs last run") where it can be worded.

A dark variant exists for a hero row (`background: var(--ink-tile)`, inverted
text ramp). Use it for one row at the top of a page, never for tiles inside a
card — a dark tile on a white card is a hole in the page.

### Status: dot, pill, text

Three weights of the same idea. Pick by how loud it needs to be.

```css
/* Quietest — a dot before a label */
.conn-state { display: inline-flex; align-items: center; gap: 7px;
              font-size: 0.8125rem; font-weight: 600; color: var(--paper-text-2); }
.conn-state::before { content: ''; width: 8px; height: 8px; border-radius: 50%;
                      background: var(--paper-text-3); }
.conn-state[data-state='ok']::before  { background: var(--state-success); }
.conn-state[data-state='bad']::before { background: var(--state-danger); }
.conn-state[data-state='busy']::before { animation: pulse 1s ease-in-out infinite; }

@keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }

/* Louder — a filled pill */
.pill { display: inline-flex; align-items: center; gap: 4px;
        padding: 2px 8px; border-radius: 999px;
        font-size: 0.7rem; font-weight: 600; white-space: nowrap; flex-shrink: 0; }
.pill-success { background: var(--pill-success-bg); color: var(--pill-success-text); }
.pill-warning { background: var(--pill-warning-bg); color: var(--pill-warning-text); }
.pill-danger  { background: var(--pill-danger-bg);  color: var(--pill-danger-text); }
.pill-neutral { background: var(--pill-neutral-bg); color: var(--pill-neutral-text); }

/* Quietest of all — coloured text */
.status.is-ok  { color: var(--state-success); }
.status.is-bad { color: var(--state-danger); }
```

**The state goes in a data attribute, the styling reads it.** `data-state="ok"`
instead of `class="is-ok"` means the DOM says what is true and CSS decides how
loud that is — and a test can assert on it.

Pills are tinted background plus dark text, never saturated fill with white
text. A row of saturated pills in a table drowns the data next to them.

### Dropdown / popover

See `02-shell.md` for positioning. Item spec:

```css
.dropdown-item {
  display: flex; align-items: center; gap: 12px; width: 100%;
  padding: 10px 12px; border-radius: 8px;
  background: transparent; border: none;
  color: var(--paper-text); text-decoration: none;
  font: inherit; font-size: 0.9em; font-weight: 500; text-align: left;
  cursor: pointer;
  transition: background 0.12s ease, color 0.12s ease;
}
.dropdown-item:hover { background: var(--paper-3); }
.dropdown-item .icon { width: 20px; height: 20px; color: var(--paper-text-3); flex-shrink: 0; }
.dropdown-item:hover .icon { color: var(--brand); }

.dropdown-item.is-danger { color: var(--state-danger-dark); }
.dropdown-item.is-danger:hover { background: var(--danger-tint); }

.dropdown-divider { height: 1px; background: var(--paper-border); margin: 4px 6px; }
```

Menu padding `6px`, item radius `8px` inside a `12px` container — the inset
keeps the hover fill from touching the container edge.

Destructive items go last, after a divider, and are the only red thing in the
menu.

### Tooltip

```css
.tooltip {
  position: absolute; z-index: 5;
  min-width: 200px; max-width: 300px;
  padding: 10px 12px;
  border: 1px solid var(--paper-border); border-radius: 8px;
  background: var(--paper);
  box-shadow: var(--shadow-tooltip);
  font-size: 0.75rem; color: var(--paper-text-2);
  pointer-events: none;
}
.tip-title { margin-bottom: 6px; font-weight: 600; color: var(--paper-text); overflow-wrap: anywhere; }
.tip-rows  { display: grid; grid-template-columns: auto auto; gap: 2px 14px; margin: 0; }
.tip-rows dt { color: var(--paper-text-3); }
.tip-rows dd { margin: 0; text-align: right; color: var(--paper-text); font-variant-numeric: tabular-nums; }
```

A light tooltip, not the usual dark one — it is content, so it follows the paper
rules. `pointer-events: none` is required or it will fight the cursor that
summoned it.

`overflow-wrap: anywhere` on the title: file names and IDs have no spaces to
break at.

### Filter row

The pattern above every data table. One `<div role="search">`, `flex-wrap`,
`align-items: flex-end` so labelled and unlabelled controls sit on one baseline.

```css
.filters { display: flex; flex-wrap: wrap; align-items: flex-end; gap: 10px 12px; margin-bottom: 14px; }
.filters input, .filters select { height: 36px; }
.filters .field { flex: 0 1 auto; }
.filters .field-grow { flex: 1 1 240px !important; min-width: 220px; }
```

Three behaviours that make a filter row feel finished:

1. **A "Clear filters" button that is hidden when nothing is filtered.**
2. **A live result count** in an `aria-live="polite"` region: "12 of 120 match".
3. **Matching rows stay visible; non-matching rows dim rather than vanish** when
   they are plotted on a chart beside the table (`opacity: 0.18`). Seeing what
   was excluded is most of the value of filtering.

Under 860px let the fields grow (`flex: 1 1 140px`) and take full width.

### Empty states

```css
.empty { padding: 18px 12px; text-align: center; font-size: 0.8125rem; color: var(--paper-text-3); }
```

Always distinguish three cases; they need different words:

| Case | Message |
|---|---|
| Nothing exists yet | "No token usage recorded yet. Process a file and each run appears here." |
| A filter excluded everything | "No data run matches these filters." |
| The request failed | The actual error, not a generic apology. |

The first tells the user what to do next. The second tells them to widen the
filter. Collapsing all three into "No data" wastes the only moment the screen
had the user's attention.

## Charts - the ERP layer

Core (`core/07-charts.md`) holds the universal rules: honesty, scale rounding,
degenerate cases, single-rect hit testing, keyboard access, the table fallback,
series colour, and the `userSpaceOnUse` gradient. None of it is restated here.

This file is what an *operational* chart adds: the density, the exact geometry,
and the interaction detail that fits a screen someone reads all day.

### Geometry

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

### Styling

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

### The gradient fill, as configured here

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

### Filtering and the chart together

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

### Draw-in animation

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

### Tooltip

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

### The table underneath is not optional

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

## Domain review checklist

Run **`core/99-review.md` first** — tokens, type, layout, state, accessibility,
motion, charts, i18n. Nothing there is waived by this domain.

This file is what an operational tool needs on top.

### Checklist

#### Surfaces
- [ ] Chrome is dark, shadowless, separated by a 1px hairline.
- [ ] Every content container is `--paper` or `--paper-2`.
- [ ] Chrome corners are *sharper* than content corners (2–4px vs 6–12px).
- [ ] Dropdowns and tooltips hanging off dark chrome are still white.
- [ ] The on-dark accent is used on ink; the on-paper accent on paper. Check the
      active nav item specifically.

#### Density
- [ ] Base `font-size` is 13px.
- [ ] Table cells are `8px 12px`; 20+ rows visible at 1080p.
- [ ] Content capped at 1600px (tables) or 1200px (forms).
- [ ] No component has been quietly loosened because one screen looked tight.

#### Tables
- [ ] Header smaller than the body (0.72rem vs 0.8125rem).
- [ ] Hairlines between rows, no zebra striping.
- [ ] Last row has no bottom border.
- [ ] The wrapper scrolls; columns are not squeezed.
- [ ] Headers do not wrap.

#### The shell
- [ ] The 3px transparent left border is reserved on **every** nav row.
- [ ] `aria-current="page"` ships alongside `.is-active`.
- [ ] Clicking the already-active nav item does not navigate.
- [ ] Exactly one vertical divider in the topbar, before the user menu.
- [ ] Topbar dropdowns are `position: fixed`, not absolute.
- [ ] Collapsed sidebar keeps icons and the active rail; navigation is still
      navigation, not a hamburger.
- [ ] Both selector forms exist for every collapsed rule
      (`.is-collapsed` and `html.sb-collapsed`).

#### Components
- [ ] One primary button per card.
- [ ] `:hover:not(:disabled)` on every button.
- [ ] The `<label>` wraps its control; label quieter than the value.
- [ ] KPI tile numbers are **not** coloured; judgement lives in the sub-line.
- [ ] Status pills are tinted background with dark text, not saturated fill.
- [ ] State is in a `data-state` attribute, not only a class.
- [ ] Filter row has a self-hiding Clear button and a live match count.
- [ ] Row actions are visible without hovering, one per row, quieter than a
      button, and a toggle changes its own label.
- [ ] A reloading table shows skeleton rows in the real row structure, on a
      ~300ms timer, with the header left in place.
- [ ] Non-matching rows dim on the chart rather than vanishing.

### Failure modes specific to this domain

Core covers the universal ones. These are the ERP-shaped versions.

**The accent on the wrong surface.** The domain-specific instance: an active
sidebar item painted in `--brand-red` instead of `--brand-red-on-dark`. It
passes a brand review and is invisible against `#0a0a0c`. Check this first on
any dark-chrome build.

**The border that only exists when active.** A left border added to the selected
nav row shifts every label 3px as the selection moves. Reserve a transparent
border on all rows.

**Density relaxed one component at a time.** Nobody decides to abandon the
density; a card gets `padding: 28px` because it looked cramped, then a table row
gets `12px 16px`, and six months later the screen holds twelve rows. This is the
most likely way this pack stops being itself. Treat a spacing increase as a
change to the system, not to the component.

**A dark tile inside a white card.** The dark hero tile is for one row at the
top of a page. Placed inside a card it reads as a hole in the surface.

**A second colour introduced per module.** Each module gets a colour so users
"know where they are", and the accent stops meaning "act here". Distinguish
modules by icon and label.

**The gradient that stretches to fit.** An area fill left on the default
`objectBoundingBox` rescales to the tallest point, so a run peaking at 40k and
one peaking at 400k look identical. `userSpaceOnUse`, pinned to the scale.

**Palette drift in older pages.** Core names this one; the domain-shaped
version is an indigo. A page written before the token file ships `#e0e7ff`
chips and `#3730a3` text — in a system that explicitly has no blue at all, so
the drift is not a shade off, it is a hue that does not exist here. `--state-info`
borrows the neutral ink precisely so nobody has to invent one.

**Legacy classes kept as `display: none`.** Harmless once, a maze after a year.
If markup no longer ships, delete the rule and the markup together.

### Refusals

The table in `PACK.md` lists what this pack pushes back on and what to offer
instead. Name the cost, offer the alternative, then build whatever is decided —
and record the decision so nobody re-litigates it next quarter.

---

<!-- Generated by tools/build.mjs from core/ and packs/erp/. Do not edit. -->
