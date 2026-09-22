# Mobile app - UI design system

Agent instruction file for GPT-based coding agents (OpenAI Codex, Cursor, any
tool that reads `AGENTS.md`). Place at a repo root, or merge its sections into
an existing `AGENTS.md` under a "UI" heading.

**Apply this when the work is:**

- an installed app on a phone or tablet, native or cross-platform
- a screen operated with a thumb rather than a cursor
- a question about where a control belongs on a small screen
- a screen that must survive being backgrounded, rotated or interrupted
- porting a desktop or web screen down to a phone

**Do not apply it to:**

- desktop admin panels, operations consoles and anything used with a mouse at desk distance - use the erp pack
- marketing sites and landing pages, even the ones read on a phone - use the consumer-web pack, which optimises for a stranger's first five seconds rather than for a returning user's thumb
- dense data tables and any screen whose job is to show twenty rows at once
- watch, TV and spatial interfaces, whose input and viewing distance are different problems again

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

A design system for something a person installed, carries, and opens for
twenty seconds at a time. They are holding it in one hand, often while doing
something else, and they will be interrupted before they finish — by a
notification, a stop announcement, a person talking to them.

### The domain thesis

**Everything the hand does belongs in the bottom third. Everything above it is
a display, not a control.**

The thumb of a hand holding a phone sweeps an arc, and that arc does not reach
the top corners. Getting there means regripping, which needs the other hand, or
a small controlled drop of the device. People learn very quickly not to use
controls that cost them that, and what they learn is that the feature does not
work — not that it is badly placed.

So reach outranks visual hierarchy, and the two ask different questions. *What
is this screen about* is answered at the top, where the eye lands. *What will
they do on it* is answered at the bottom, where the thumb already is. A design
that puts the primary action at the top has answered the first question twice
and the second one not at all.

This is the rule the other packs reject. The `erp` pack puts its actions in a
topbar, correctly, because a cursor reaches the top of a 27-inch display faster
than anywhere else — the edges are infinite and the corners are free. Invert
this pack onto a desktop and you get a toolbar marooned at the bottom of a
screen nobody looks at; invert the desktop onto a phone and you get the
hamburger menu in the top-left corner, the single least reachable pixel on the
device.

**The second half of the thesis: the session ends without warning.** A desktop
app is closed. A phone app is *interrupted* — backgrounded mid-sentence,
killed by the OS an hour later, reopened cold at a train station. Every screen
here is designed to be survivable at any frame: what the user typed is still
there, where they were is still there, and nothing was lost because a phone
call arrived. A flow that only works when run start to finish in one sitting is
a flow that fails most of the time, quietly, and looks like the user changing
their mind.

**If your user is sitting at a desk with a mouse, you are in the wrong pack.**

### What this pack adds on top of core

Core already sets the method — target size follows pointer precision, hover is
a capability rather than a given, the waiting affordance follows the clock.
This pack decides what core leaves open:

- **Density: comfortable, and not negotiable downward.** 17pt / 16sp body,
  44pt minimum row height, 16pt screen margins. The `erp` pack's 13px base
  would be legible here and untappable, which is the distinction this pack
  exists to hold: on a phone, density is limited by the finger, not by the eye.
- **Surface assignment: the content is the canvas.** There is no page
  background behind a page. Chrome is translucent and sits *over* the content
  rather than framing it, so the content reads as continuing underneath — which
  it does, and which is why the safe-area insets exist.
- **The list row is the default container, not the card.** A card costs
  horizontal room on both sides to create a separation an inset divider already
  provides, on the axis a phone has least of. Cards earn their place when items
  differ in weight — a feed of mixed media — and not when twenty things are the
  same kind of thing.
- **Sheets, not dialogs.** A sheet rises from the edge the thumb is at, is
  dismissed by dragging in the direction the hand already moves, and can be
  partially expanded so the screen behind stays visible. A centre-screen dialog
  puts its buttons where the thumb is not and fights the system back gesture.
- **Motion is short and directional.** Within core's bands, at the fast end,
  and it always says where the screen came from: a push moves in from the edge
  it will return to. Motion on a phone is the only thing that explains a
  navigation model with no visible hierarchy.
- **Platform conventions win over house style.** Back is where the platform
  puts back. The share icon is the platform's share icon. Core's argument about
  not breaking conventions users brought with them is sharpest here, because
  the conventions were installed by the operating system before your app was.

### Overrides

**Core says: never remove functionality at a smaller size — change its form.
This pack removes it.**

Core's rule protects a responsive layout from quietly dropping features as the
viewport narrows, and it is right about that. It is not a mandate to fit a
desktop feature set onto a phone.

An annual report with twelve columns, a bulk editor, an admin console — the
compacted phone version of each of these is worse than an honest absence,
because it looks like the feature and does not work like it. The rule this pack
substitutes: **absent and linked beats present and unusable.** Say what is not
here, say where it is, and make the link work. What is never acceptable is the
third option, where the feature appears to be present and silently does less.

Nothing else in core is overridden. The accessibility minimums and the chart
honesty rules are not overridable at all.

### Non-negotiables

Apply these without being asked.

- **The primary action sits in the reachable arc**, at the bottom, full width
  or near it. If a screen has one thing to do, the thumb should not have to
  hunt for it.
- **Destructive actions are never adjacent to frequent ones.** Distance is the
  cheapest confirmation available, and it costs nothing to the people who are
  not about to make a mistake.
- **Safe-area insets are read, never hardcoded.** A bottom bar with a fixed
  padding value sits under the home indicator on one device and floats above
  nothing on another. The notch, the indicator and the keyboard are runtime
  values.
- **Every gesture has a visible equivalent.** Swipe-to-delete is a shortcut for
  people who know it exists. The row still needs a way to be deleted that can
  be discovered by looking at it.
- **The keyboard never covers the field being typed into**, nor the button that
  submits it. This is the single most common mobile form bug and it is
  invisible on a simulator with a hardware keyboard attached.
- **State survives backgrounding.** Assume the process is killed between any
  two frames. Draft text, scroll position and which step of a flow they were on
  are all restored, or the flow is short enough that losing it costs nothing.
- **Nothing depends on hover.** There is no hover. A long-press is not a
  substitute — it is undiscoverable unless something teaches it.

### What this pack deliberately refuses

Say the cost briefly, offer the alternative, then build whatever is decided.

| Request | Cost | Offer instead |
|---|---|---|
| A hamburger menu for primary navigation | Navigation hidden behind the least reachable pixel on the device, and usage of everything inside it collapses | A tab bar of three to five, with the rest under a "More" tab |
| A centre-screen modal dialog | Buttons land where the thumb is not, and it fights the system back gesture | A bottom sheet, dismissible by drag and by back |
| A data table | Horizontal scrolling that fights the vertical scroll, and text at a size nobody reads | A list row carrying the two fields that matter, with the rest on tap |
| Cards for a list of uniform items | Two margins per item, spent on a separation an inset divider already gives, on the axis you have least of | Rows with inset dividers; keep cards for mixed-weight content |
| An animated splash screen | Time spent in the exact moment a user is most likely to leave | A static launch image that matches the first frame of the real screen |
| An onboarding carousel before first use | Five screens of promises before the app has earned any attention | Let them in, and teach each thing at the moment it is first needed |
| A toast for an error that needs a decision | It leaves while they are still reading it | An inline error at the field, or a sheet carrying the action |
| A small close button in a top corner | The hardest target on the screen, for the action people need most when lost | Drag-to-dismiss, plus a full-width Done in the reachable arc |
| Tighter spacing "to fit more in" | Targets below the floor, and a screen that fails for anyone with imprecise hands | Cut content, or move the rest one tap deeper |

If they hear the cost and still want it, build it. It is their product.

### Getting started on a new project

1. Copy `assets/tokens.json` in, and generate the platform file from it — the
   CSS custom properties in `assets/tokens.css` show the shape. Swap the accent
   and recompute the on-dark value before writing a single screen.
2. Decide the navigation model before the first screen: how many tabs, and what
   is deliberately not one. Retrofitting a tab bar means re-rooting every
   screen in the app.
3. Establish the safe-area handling once, in the screen container, so no
   individual screen has to think about it. Every screen doing its own is how
   one of them ends up under the home indicator.
4. Build the interrupted case first for any flow longer than one screen. It is
   the case that actually happens, and building it last means rewriting the
   state model.

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

# Part 3 - Mobile app specifics

## Surfaces, palette, scales and safe areas

The concrete values. Everything else in this pack spends what is defined here.

### The token file is not a stylesheet

This pack ships `assets/tokens.json` rather than a CSS file, because the same
screen gets built in SwiftUI, Compose, React Native and sometimes plain CSS,
and a palette that lives in one of those four is a palette the other three
retype. `assets/tokens.css` is a generated view of the same source, not a
second source.

The rule core states about one file owning every colour holds unchanged; what
changes is that the file is not written in the language the app is.

### Units, and why they differ per platform

| Platform | Unit | Note |
|---|---|---|
| iOS | `pt` | 1pt = 1px at 1x, 2px at 2x, 3px at 3x. Sizes are written in pt and never in px. |
| Android | `dp` for space, `sp` for text | `sp` scales with the user's font setting and `dp` does not. Text in `dp` is a bug that only shows up for users who changed their font size. |
| React Native | unitless | Already density-independent; the numbers below transfer directly. |
| Flutter | logical pixels | Same. |
| Mobile web | `rem` | Per core `02-typography.md`, with the root left at the browser default. |

The values in this file are given in pt. Treat `1pt = 1dp = 1 logical pixel`.

### Palette

Neutral-first. On a phone the content is usually a photograph, a name or a
number that somebody else supplied, and a palette with opinions fights it.

```json
{
  "accent":         { "light": "#0a58d0", "dark": "#7aa7ff" },
  "accent-pressed": { "light": "#0846a6", "dark": "#a3c2ff" },

  "bg":             { "light": "#ffffff", "dark": "#000000" },
  "bg-grouped":     { "light": "#f2f2f7", "dark": "#0d0d0f" },
  "surface":        { "light": "#ffffff", "dark": "#1c1c1e" },
  "surface-raised": { "light": "#ffffff", "dark": "#2c2c2e" },

  "text":           { "light": "#0b0b0f", "dark": "#f2f2f7" },
  "text-secondary": { "light": "#5b5b66", "dark": "#a1a1aa" },
  "text-tertiary":  { "light": "#8e8e99", "dark": "#7a7a85" },

  "separator":      { "light": "#d8d8de", "dark": "#38383c" },
  "fill-quiet":     { "light": "#f2f2f7", "dark": "#2c2c2e" },

  "success":        { "light": "#1a7f45", "dark": "#48d17e" },
  "warning":        { "light": "#9a6600", "dark": "#f0b429" },
  "danger":         { "light": "#c7212f", "dark": "#ff6b6b" },
  "info":           { "light": "#5b5b66", "dark": "#a1a1aa" }
}
```

Three things that are specific to this domain:

- **Two values per colour, always, and dark mode is not optional.** A phone
  switches theme on a schedule the user set, on a device they are holding in
  bed. An app that only has a light theme is not a stylistic choice here, it is
  a light source.
- **Pure black is correct for the dark base on a phone**, unlike the general
  case in core `01-tokens.md`. OLED panels switch those pixels off, which is
  power the user notices, and the halation argument that makes pure black wrong
  on a desktop monitor is much weaker at arm's length on a small panel. The
  surfaces above it are not black: elevation is still luminance.
- **The accent lands on both, so it has both values.** The commonest version of
  core's per-surface-accent bug on mobile is a brand blue chosen against white
  that disappears against the dark theme's near-black.

### Type

Use the platform's own text styles — `.body`, `.headline`, `.footnote` on iOS;
the Material type scale on Android — rather than a private scale. They are what
the system scales when the user changes their font size, and matching their
names is most of the work of supporting that.

| Role | Size | Weight | Used for |
|---|---|---|---|
| Large title | 34pt | 700 | The first screen of a tab, before scroll |
| Title | 22pt | 600 | Sheet titles, section headers that carry weight |
| Headline | 17pt | 600 | The primary line of a list row |
| Body | 17pt | 400 | Running text, field values |
| Subhead | 15pt | 400 | The secondary line of a list row |
| Footnote | 13pt | 400 | Timestamps, helper text, metadata |
| Caption | 12pt | 400 | Tab bar labels, the smallest legible label |

**Nothing below 12pt, and nothing important at 12pt.** A phone is held at
arm's length by people of every age and in every lighting condition, including
sunlight, which costs perceived contrast before it costs anything else.

#### Dynamic Type is a layout requirement, not a setting

The user's font scale can reach roughly 3x. It is not a rare accessibility
mode: a large fraction of users over forty have moved it up at least one step,
and they will not move it back for your app.

What this actually requires:

- **No fixed-height rows.** A row is `min-height: 44pt` and grows. A row with
  `height: 44pt` clips its own text at the second scale step.
- **Labels wrap, and layouts stack.** A label-and-value pair that sits side by
  side at the default scale needs to stack above it. Decide where, rather than
  finding out when it truncates.
- **The tab bar is the exception**, and the platform handles it: at large
  scales the system drops the labels and keeps the icons. Which is why the
  icons must be meaningful on their own.
- **Test at the largest step**, not at the default. It takes ten seconds and it
  is the fastest way to find every fixed height in the app.

### Spacing

A 4pt base, used through a small set. The numbers people reach for that are not
in the set — 10, 18, 30 — are the beginning of the drift core warns about.

| Value | For |
|---|---|
| 4pt | Between a label and its value |
| 8pt | Between related controls; the minimum gap between two targets |
| 12pt | Inside a row, vertically |
| **16pt** | **The screen margin.** Every screen, every sheet, every row's leading inset |
| 24pt | Between groups within a screen |
| 32pt | Above a primary action, to separate it from what it acts on |

16pt is the one to be dogmatic about. It is the value a screen is measured
against, and a screen that uses 12 in one place and 20 in another reads as
unfinished without anyone being able to say why.

### Corners and elevation

```json
{
  "radius-control": 10,
  "radius-card":    14,
  "radius-sheet":   16,
  "radius-pill":    999
}
```

Elevation splits by platform and it is worth honouring:

- **iOS**: a soft, low shadow, and only on things that genuinely float — a
  sheet, a popover. A list row does not have a shadow. Neither does a grouped
  section; it has a lighter surface and an inset.
- **Android**: elevation is carried by surface tone as well as shadow, and the
  system supplies the ramp. Use it rather than inventing shadow values; a
  hand-rolled shadow under a Material surface reads as a component from another
  app.

### Safe areas

The screen is not the rectangle you were given. Four insets, all of them
runtime values, all of them different on every device:

| Inset | What is there |
|---|---|
| Top | Status bar, notch or camera cutout |
| Bottom | Home indicator, or the gesture bar |
| Leading / trailing | Rounded corners and, in landscape, the notch |
| Keyboard | Not a safe area, but behaves like one: it appears and resizes |

```
content            respects the leading and trailing insets
bottom bar         its own height PLUS the bottom inset, as padding not margin
scroll content     scrolls UNDER the bars, with the inset added as content padding
full-bleed media   ignores the insets, and puts nothing important in them
```

**Never hardcode an inset.** A bottom bar with `padding-bottom: 34pt` sits too
high on a device with no home indicator and correctly on exactly one model.
Read `safeAreaInsets` / `WindowInsets` / `env(safe-area-inset-bottom)` and let
it be zero when it is zero.

The failure this prevents is specific and common: a primary action that is
technically on screen and physically under the home indicator, so every tap on
it is intercepted by the system gesture. The user taps four times, the app does
nothing, and the app is what they blame.

### Touch targets

Core `09-input.md` sets the floor at 24pt and says a pack raises it. This pack
raises it to:

| | |
|---|---|
| Minimum target | **44pt** (iOS) / **48dp** (Android) |
| Minimum gap between two targets | **8pt** |
| Minimum row height | **44pt**, growing with the text |
| Primary action height | **50pt**, full width inside the screen margins |

The hit area is not the drawn size: a 24pt icon carries a 44pt target by
padding the control. Growing the padding is almost always right; growing the
icon almost never is.

## Navigation - reach, tab bar, back, gestures

### The reach map

Hold a phone in one hand. The thumb pivots at its base and sweeps an arc, and
the screen divides into three zones by how much that costs.

```
┌─────────────────────────┐
│  EXPENSIVE              │   Requires a regrip or a second hand.
│  top third              │   Titles, status, context. Never a frequent action.
├─────────────────────────┤
│  REACHABLE              │   A stretch, comfortable occasionally.
│  middle third           │   Content. Taps that happen once per screen.
├─────────────────────────┤
│  FREE                   │   Where the thumb already is.
│  bottom third           │   Navigation, and the primary action.
└─────────────────────────┘
      ^ cheapest        ^ the far corner is the single
      near the          most expensive pixel on the device
      thumb's side
```

Two asymmetries worth knowing, both of which the arc explains:

- **The bottom corner opposite the thumb is not free.** For a right-handed
  grip that is the bottom-left; for a left-handed grip it is the bottom-right.
  You do not know which, so do not put anything important in either — centre it
  or span it.
- **The top corner opposite the thumb is the worst place on the screen.** It is
  also, by desktop convention, where the menu goes. That convention is the
  single most expensive import from the desktop.

#### What goes where

| Zone | Put here | Never here |
|---|---|---|
| Bottom | Tab bar, primary action, sheet controls, keyboard accessory | — |
| Middle | Content, the row being read, single-use controls | The one action the screen exists for |
| Top | Screen title, back, one contextual action at most | Anything used more than once per screen |

A screen with a "Save" in the top-right is a screen whose most important
control is in its most expensive position. That placement exists because it is
where a desktop window put it, not because anyone measured a thumb.

### The tab bar

Three to five destinations. Not two — a segmented control is honest about two
— and not six, because the labels stop fitting and the targets fall below the
floor.

```
height       49pt, PLUS the bottom safe-area inset as padding
items        3-5, equal width, icon above a 12pt label
target       the full item, edge to edge and top to bottom, not just the icon
selected     accent icon, accent label, and one non-colour difference
```

Rules that carry weight:

- **A tab is a destination, not an action.** A tab that opens a sheet or starts
  a flow breaks the model: tabs are places you can be, and the user expects the
  back-stack of each one to be preserved when they come back to it.
- **Preserve each tab's stack.** Leaving a tab three screens deep and returning
  to find it reset is the interaction people describe as "it lost my place".
- **Label every tab.** An unlabelled icon row is a quiz. The label is also what
  survives when the icon means something different in another culture.
- **The selected state is not colour alone** — core `05-accessibility.md`, and
  it matters here because the icons are small and the difference is a tint. A
  filled versus outlined icon pair does the work.
- **Never hide the tab bar to make room.** If a screen needs the whole screen,
  it is a full-screen presentation pushed over the tabs, not a tab bar that
  disappears and leaves the user without navigation.

#### When there are more than five

A "More" tab holding the rest, as a list. It is unglamorous and it works,
because the overflow is a place rather than a drawer that appears from an edge
nobody was told about.

What not to reach for is a side drawer. Usage of everything inside one drops
sharply, for the reason the reach map gives: it opens from the top-left corner
of a device held in the right hand, and it is invisible until it does.

### The navigation bar

The top bar. A title, a back affordance, and at most one contextual action.

- **Back is where the platform puts back**, labelled and behaved the way the
  platform does. On iOS that includes the edge-swipe, which is the gesture most
  users actually use, and which custom navigation implementations break more
  often than any other.
- **The title says where you are**, not what the app is called. The app's name
  belongs on the icon.
- **One action at most, and it is not the primary one.** The primary action
  lives at the bottom. What belongs here is the occasional contextual verb —
  Edit, a share affordance — that is used once per screen or less.
- **The large title collapses on scroll**, which is a platform convention worth
  keeping: it gives the screen's identity on arrival and returns the space to
  content once reading starts.

### Hierarchy, and how deep it may go

```
Tab  →  List  →  Detail  →  Edit (as a sheet)
```

Three levels of push, then a sheet. Past that, users lose track of where back
goes, and a back-stack six deep is one where each individual step made sense.

- **A push is lateral or downward, never a way to change context.** Switching
  account, switching workspace, entering a modal task — those are presentations
  that cover, not pushes that stack.
- **A sheet is a detour**, and it is dismissed rather than backed out of. The
  screen underneath stays where it was, which is the whole reason to use one.
- **Deep links land in a valid stack.** A notification that opens a detail
  screen with no back-stack strands the user, and the back gesture then exits
  the app. Synthesise the parent chain.

### Gestures

Gestures are shortcuts for the people who already know them. They are never the
only route.

| Gesture | Expected to do | Must also exist as |
|---|---|---|
| Swipe from the leading edge | Back | The back control in the nav bar |
| Swipe down on a sheet | Dismiss | A visible Done or Cancel |
| Pull down at the top of a list | Refresh | A refresh action somewhere reachable |
| Swipe on a row | Reveal row actions | The same actions on tap-and-hold, or in the detail screen |
| Long press | Preview or context menu | A visible affordance for the same thing |

Three rules:

- **Never override a system gesture.** The edge swipe, the bottom swipe-up and
  the notification pull belong to the operating system. A custom gesture in the
  same region loses, intermittently, which is worse than losing consistently.
- **A gesture with no visible equivalent does not exist** for the people who
  need it most — see core `09-input.md`. Discoverability is not a nice-to-have
  here, it is the difference between a feature and a secret.
- **Destructive gestures confirm or undo.** Swipe-to-delete with no undo is a
  data-loss bug waiting for a pocket. Prefer an undo snackbar over a
  confirmation dialog: it costs nothing when the action was intended, which is
  almost always.

### Landscape and tablets

- **Never lock orientation** unless the content genuinely has one — a camera,
  a game. Someone is using the app propped on a table, and someone else has
  rotation locked for reasons that have nothing to do with you.
- **In landscape the reach map changes shape**: the thumb arc is wider and much
  shorter vertically, so a bottom bar takes a larger share of a shorter screen.
  Compact its height rather than moving it.
- **A tablet is not a big phone.** Two panes side by side, and the tab bar
  usually becomes a sidebar — which is legal here precisely because the reach
  argument does not apply to a device held in two hands or set down.

## Components - rows, sheets, forms, the keyboard

Sizes in pt; see `01-surfaces.md` for the scale and the tokens.

### The list row

The default container of this pack. Most screens are a list of something, and
most of the work is getting one row right.

```
┌──────────────────────────────────────────────┐
│ ◧  Headline, 17pt/600, one line, truncates   │  ← min-height 44pt, grows
│    Subhead, 15pt/400, secondary colour     › │
└──────────────────────────────────────────────┘
   ^16pt inset                          16pt^
        └── the divider starts here, not at the screen edge
```

```
padding        12pt vertical, 16pt horizontal
min-height     44pt, and it GROWS - never a fixed height
leading        an optional 28-40pt icon or avatar, vertically centred
trailing       a chevron if it pushes, a control if it toggles, never both
divider        1pt, inset to align with the text, not with the screen edge
```

- **Two lines of content, at most three.** A row is scanned, not read. The
  third line is where people put something that belongs on the detail screen.
- **The inset divider is the separator.** It aligns under the text, so the
  leading icon column reads as a column. A full-width divider turns a list into
  a table.
- **The whole row is the target**, not the text inside it. A 44pt row that only
  responds on its label is a row that feels broken.
- **A chevron means this pushes.** No chevron means it does not. This is a
  promise users rely on, and a row that opens a sheet should not wear one.
- **The pressed state is a fill, not a colour change**, and it appears
  immediately — under 100ms, per core `08-feedback.md`. A row that does not
  acknowledge a touch gets tapped again.

#### Grouped sections

```
section header   13pt, secondary colour, 16pt lead-in, 8pt below
group            surface colour, 14pt corners, 16pt outer margin
rows inside      dividers between, none after the last
footer           13pt tertiary, the place for an explanation of the section
```

The section footer is underused and it is the right place for the sentence
explaining what a setting does. Better there than as helper text under every
row, and better than a tooltip, which does not exist here.

### Buttons

Three, and that is the set.

| | Height | Use |
|---|---|---|
| **Primary** | 50pt, full width inside the margins | The one thing the screen is for. One per screen. |
| **Secondary** | 50pt, full width, quiet fill or outline | The alternative to the primary, directly beneath it |
| **Text** | 44pt target, no fill | Everything else. Inline, in a nav bar, in a row |

```
primary        accent fill, white or near-white label, 17pt/600, radius 10pt
pressed        the pressed accent value, applied within 100ms
disabled       reduced opacity AND a reason visible nearby
loading        the label is replaced in place; the button keeps its width
```

- **The primary action is pinned to the bottom** on a screen where it is the
  point — a checkout, a form, a confirmation. Pinned above the keyboard when
  the keyboard is up, and above the safe-area inset always.
- **It keeps its width while busy.** A button that shrinks to a spinner moves
  everything around it, and the user's thumb is already travelling.
- **Never disable a primary action without saying why**, as core requires. On a
  phone this bites harder: the reason is usually a field that has scrolled off
  the top of the screen.
- **No icon-only buttons in content.** An icon with no label is a guess, and
  this pack's users were not trained. In the nav bar, where the platform has
  taught a small set, an accessible name is still mandatory.

### Sheets

The modal form of this domain. A sheet rises from the bottom edge, which is
where the thumb is.

```
radius       16pt on the top corners only
grabber      a small pill at the top - the affordance for dragging
detents      medium and large, or a single height that fits the content
dismiss      drag down, a visible Cancel, and the system back gesture
backdrop     a scrim over what is behind; it stays visible on a medium detent
```

- **A sheet is a detour, not a destination.** What is underneath stays where it
  was. If the user will not come back to it, this should be a push.
- **The confirm is at the bottom, inside the sheet.** Not in the sheet's top
  bar, where the thumb is not.
- **A medium detent is worth having** when the content is short: the user can
  still see what they were looking at, which is most of the reason a sheet
  beats a dialog.
- **Dragging down must not lose typed input.** Either the drag is disabled once
  the form is dirty, or the dismissal asks. A sheet that eats a paragraph
  because a thumb moved is a sheet that gets sworn at.

#### Action sheets

A short list of choices, from the bottom edge, one per row and labelled with
verbs. The destructive option is last, visually distinct, and separated. Cancel
is its own row at the bottom, full width, because it is the one people reach
for in a hurry.

#### Dialogs

The exception, not the rule. A centre-screen alert is correct for exactly one
thing: a decision that must be made before anything else can happen, with two
or three words of explanation and no input. Everything else is a sheet.

### Forms and the keyboard

Forms are where mobile apps fail most often, and almost all of it is the
keyboard.

- **The focused field is always visible, and so is the button that submits
  it.** Inset the scroll view by the keyboard height when it appears. This is
  the single most common bug in this domain and it does not reproduce on a
  simulator with a hardware keyboard attached — test it with the software
  keyboard, on a small device.
- **Set the keyboard type per field.** Email, number, phone, URL. A numeric
  field that opens a QWERTY keyboard costs the user two taps and some of their
  goodwill, every time.
- **Set the return key to the next thing.** Next through the fields, Done on
  the last, and Done submits.
- **One question per row**, and the label above the field rather than beside
  it. A side-by-side label eats the width the value needs and breaks at the
  second Dynamic Type step.
- **Autofill is a design decision.** Name the fields the way the platform
  expects — the autocomplete and text-content attributes — and a signup drops
  from a minute to a tap. Left unnamed, the fields silently do not offer it.
- **Validate on blur, not on every keystroke**, and never show an error for a
  field the user has not finished. The exception is a live constraint they need
  while typing, like a character count.
- **A long form is steps, not a scroll.** Each step fits above the keyboard,
  with progress shown, and each completed step is saved — see
  `04-lifecycle.md`, because this is the flow interruption destroys.

### Waiting, empty and error

Core `08-feedback.md` sets which affordance the clock has earned. What is
specific here:

- **A list loading for the first time shows skeleton rows** at the real row
  height. A full-screen spinner over an empty screen tells the user nothing
  about what is coming.
- **A refresh that the user pulled shows the platform's refresh control** and
  nothing else. They already know it is happening; they did it.
- **Empty states carry the action.** On a phone there is no side panel to put
  it in, so the button that creates the first item goes in the empty state
  itself, in the reachable arc.
- **Offline is not an error state.** It is a normal condition of this domain
  and `04-lifecycle.md` covers it.
- **A snackbar or toast is for something already done**, and it carries an
  undo. Anything requiring a decision is a sheet, because a toast leaves while
  the user is still reading it.

### Lists at length

- **Recycle, and reserve.** A row whose height is known before its content
  arrives is a list that does not jump while being scrolled.
- **Load the next page before the user reaches the end.** A spinner at the
  bottom of an infinite list is a stall the user watches.
- **Section headers that stick** are worth their cost in a long list: they are
  the only way to know where you are without scrolling back.
- **Search is a field at the top of the list**, revealed by pulling down or
  always present. Not an icon in the nav bar that swaps the whole bar for a
  field, which loses the user's place and their context.

## Interruption, state, offline and permissions

The half of this pack that is not about pixels. A phone app runs in a hostile
environment — it loses the foreground, loses the network, and gets killed
without being asked — and a screen that ignores that is correct in a simulator
and broken in a pocket.

### Assume the process dies between any two frames

The operating system reclaims memory from backgrounded apps, and it does not
negotiate. The user does not experience this as a crash: they experience it as
*"I came back and it had forgotten what I was doing."*

What has to survive:

| State | Where it belongs |
|---|---|
| What they typed | Persisted on change, debounced. Not held in memory |
| Which screen they were on, and the stack under it | Restored on launch, not reset to the root |
| Scroll position in a long list | Restored to the item, not to a pixel offset |
| Which step of a multi-step flow | Persisted per step, so a resumed flow starts at the right one |
| A partly-filled form in a sheet | Restored *with the sheet*, or explicitly discarded with the user's agreement |

What must **not** survive: anything sensitive that a person picking up the
phone should not see, and anything that stops being true — a fetched balance, a
countdown, an auth token past its life.

The practical rule: **save on change, restore on launch, and never on a timer.**
A thirty-second autosave loses twenty-nine seconds of typing at the worst
possible moment.

#### The resume moment

Coming back to an app that has been away for a while is its own design problem,
not just a restoration problem.

- **Under a few minutes:** return exactly where they were and change nothing.
  Re-fetching and re-rendering is the app appearing to lose their place.
- **Longer than that:** return to the same place, then refresh the data
  underneath without moving what they were looking at. Never scroll them.
- **Long enough that the screen could mislead:** show the state is stale rather
  than showing a number that is wrong. A stale figure with a timestamp is
  honest; a stale figure that looks live is not.

### Offline is a normal condition, not an error

Lifts, trains, basements, rural roads, a prepaid plan that ran out. An app that
treats no network as an exceptional failure will spend a lot of its life in an
exceptional failure.

- **Show what you have.** Cached content, marked with when it was fetched.
  Blank is worse than old, as long as old admits to being old.
- **Queue the write and say so.** The action appears to succeed, is marked as
  pending, and is sent when there is a network. This is core's optimistic
  update, and the three conditions in `08-feedback.md` apply unchanged —
  including that a failure announces itself rather than quietly undoing.
- **One indicator, not one per row.** A single banner saying the app is offline
  and what is queued. Twenty pending badges is noise.
- **Never a blocking full-screen error** for a request that could be retried in
  the background. The user cannot fix the tunnel.
- **Distinguish no network from server failure.** They call for different
  actions, and "Something went wrong" covers both while helping with neither.

### Permissions are a flow, not a dialog

The system permission prompt can be shown once. Users deny by reflex when a
prompt arrives without context, and a denial is expensive to reverse: it means
sending them into Settings.

The sequence that works:

1. **Never ask on launch.** A prompt before the app has done anything is a
   prompt with nothing to weigh against.
2. **Ask at the moment of use**, when the user has just tried to do the thing
   the permission is for. "Add a photo" → then the prompt.
3. **Pre-ask in your own UI first**, in a sentence, with a real Not now. This
   costs one screen and preserves the system prompt for people likely to say
   yes.
4. **Handle no gracefully and permanently.** The feature degrades, it does not
   nag. If it genuinely cannot work, say what is missing and offer a link to
   Settings — do not repeat the request.
5. **Never block the app on an optional permission.** Notifications, contacts
   and location are almost always optional, and an app that will not proceed
   without them gets deleted rather than granted.

### Launch

- **A static launch image that matches the first frame of the real screen.**
  Not a logo, not an animation. The point of it is to make the app feel like it
  was already open, and anything that draws attention to itself does the
  opposite.
- **The first screen is the app, not an interstitial.** Onboarding, rating
  prompts and what's-new screens all belong later, after the app has done
  something useful.
- **Restore before the first frame**, the way core `03-layout.md` requires —
  theme, language, and which tab they were on. Applied afterwards, the user
  watches the app correct itself every single launch.

### Notifications

- **One category per kind of thing**, so a user can keep the ones they want and
  silence the rest. An app with a single on/off switch gets switched off.
- **A notification links to the exact screen**, with a synthesised back-stack
  behind it — see `02-navigation.md`. Landing on a home screen after tapping a
  notification is the notification failing.
- **Nothing marketing-shaped through a channel the user enabled for
  transactional messages.** That is the decision that gets the whole category
  disabled, and the useful ones go with it.

### Battery, data and heat

These are design constraints on a phone in a way they are not on a desk.

- **No polling loop that outlives the screen.** A timer left running in a
  backgrounded screen is a battery complaint with a one-star review attached.
- **Images sized to the display, not to the source.** Downloading a 4000px
  photograph to draw it at 120pt spends the user's data allowance on pixels
  nobody sees.
- **Anything continuous — camera, location, a live map — is stopped when the
  screen is not visible.** Device heat is something the user feels in their
  hand, and they attribute it correctly.
- **Respect the low-power condition.** When the system says the battery is low,
  drop non-essential animation and background refresh rather than continuing as
  though nothing changed.

## Domain review checklist

Run **`core/99-review.md` first** — tokens, type, layout, state, feedback,
input, accessibility, motion, charts, i18n. Nothing there is waived by this
domain.

This file is what a phone needs on top.

### Checklist

#### Reach
- [ ] The primary action is in the bottom third, full width or near it.
- [ ] Nothing used more than once per screen sits in a top corner.
- [ ] No destructive action is adjacent to a frequent one.
- [ ] Nothing important sits in either bottom corner, since the grip is unknown.

#### Targets and text
- [ ] Every target is at least 44pt / 48dp, counting padding rather than the
      drawn icon.
- [ ] At least 8pt between adjacent targets.
- [ ] Nothing below 12pt, and nothing important at 12pt.
- [ ] The screen survives the largest Dynamic Type step: rows grow, labels
      wrap, nothing clips.
- [ ] No row has a fixed height.

#### Safe areas
- [ ] Insets are read at runtime, never hardcoded.
- [ ] The bottom bar adds the bottom inset as padding, so nothing sits under
      the home indicator.
- [ ] Scroll content passes under the bars, with the inset added as content
      padding.
- [ ] Checked on a device with a notch and on one without.

#### Navigation
- [ ] Three to five tabs, each a destination rather than an action, each
      labelled.
- [ ] Each tab's stack is preserved when the user leaves and returns.
- [ ] The tab bar is never hidden to make room.
- [ ] Back is where the platform puts it, and the edge-swipe still works.
- [ ] No hierarchy deeper than three pushes before a sheet takes over.
- [ ] A deep link or notification lands with a back-stack that makes sense.

#### Gestures
- [ ] Every gesture has a visible equivalent.
- [ ] No system gesture region is overridden.
- [ ] Destructive gestures offer undo rather than a confirmation dialog.

#### The keyboard
- [ ] The focused field and its submit button are both visible above the
      keyboard, tested with the software keyboard on a small device.
- [ ] Keyboard type is set per field; the return key advances and then submits.
- [ ] Autofill attributes are set on every credential and address field.
- [ ] Dismissing a dirty sheet by dragging does not silently discard input.

#### Sheets and dialogs
- [ ] Modals are sheets; a centre-screen dialog appears only for a blocking
      decision with no input.
- [ ] The confirming action is at the bottom of the sheet, not in its top bar.
- [ ] Action sheets put the destructive option last and Cancel full width.

#### Lifecycle
- [ ] Typed input is persisted on change, not on a timer.
- [ ] The app relaunches into the screen and stack the user left, not the root.
- [ ] Resuming after a long absence refreshes underneath without scrolling the
      user or showing a stale figure as though it were live.
- [ ] Offline shows cached content with its age, queues writes, and announces a
      failed queue rather than dropping it.
- [ ] No permission is requested on launch; each is asked at the moment of use,
      and a denial degrades the feature instead of nagging.
- [ ] Nothing continuous keeps running once the screen is not visible.

#### Platform
- [ ] Both themes ship, and the accent has a value for each.
- [ ] Orientation is not locked without a content reason.
- [ ] Platform conventions beat house style where they disagree.

### Failure modes specific to this domain

Core covers the universal ones. These are the phone-shaped versions.

**The action under the home indicator.** The primary button is technically on
screen and physically inside the system gesture area, so every tap is
intercepted. The user taps four times, nothing happens, and they blame the app.
Caused by a hardcoded bottom padding instead of the safe-area inset.

**The submit button behind the keyboard.** Invisible in a simulator with a
hardware keyboard, fatal on a small device. The user fills the form, cannot
find the way to send it, and leaves.

**The fixed-height row.** Correct at the default font scale, clipped at the
second step, unreadable at the largest. It is the most common Dynamic Type
failure and the easiest to find: set the scale to maximum and look.

**The hamburger in the top-left.** Navigation placed in the most expensive
pixel on the device. Everything inside it is used a fraction as much as the
same items in a tab bar, and the analytics get read as "nobody wants those
features".

**State lost to a phone call.** The user was three fields into a form, the OS
reclaimed the process, and the app relaunched at the root. Reads as the app
being unreliable rather than as the platform behaving normally.

**The permission prompt on launch.** Asked before the app has earned anything,
denied by reflex, and now unrecoverable without a trip to Settings. The feature
is dead for that user and the app cannot ask again.

**Swipe-to-delete with no undo.** A pocket, a bag, a hand adjusting its grip.
The data is gone and the user did not knowingly do anything.

**The tab that is a button.** A tab that opens a sheet or starts a flow, so the
back-stack model users rely on stops being true exactly once, which is enough
to make them stop trusting it.

**The desktop screen, compacted.** A twelve-column table squeezed onto a phone,
or a dense dashboard at 60% scale. It looks like the feature and does not work
like it — which is worse than the honest absence this pack's override allows.

### Refusals

The table in `PACK.md` lists what this pack pushes back on and what to offer
instead. Name the cost, offer the alternative, then build whatever is decided —
and record the decision so nobody re-litigates it next quarter.

---

<!-- Generated by tools/build.mjs from core/ and packs/mobile-app/. Do not edit. -->
