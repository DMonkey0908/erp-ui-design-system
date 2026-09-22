# Visual language

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

## Price it before you adopt it

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

## The current set, and what each one needs to survive

### Modular grid of unequal cells

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

### Heavy borders, hard shadows, saturated fills

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

### Translucent surfaces

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

### Real-time 3D

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

### Dark interfaces

Not a style — a second set of surface values, and it belongs to the token
system. `01-tokens.md` holds the two rules that decide whether it works: depth
is carried by luminance rather than shadow, and the base surface is not pure
black.

## When the request arrives by name

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

## A pack's part in this

A pack does not own a visual language, and it may **refuse** one — with a
reason, in its refusals table, naming what the style costs *in that domain*.
"Glass on a data table costs contrast on the data, which is the whole budget"
is a domain argument. "Glass is out of fashion" is not.

If a pack adopts one as its default, that belongs in its thesis, with the
values in its palette file, because at that point it has stopped being a style
and become part of what the domain decided.
