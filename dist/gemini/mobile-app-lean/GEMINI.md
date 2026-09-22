# Mobile app - UI design system

This project uses the `mobile-app` UI design system. The rules are on disk
next to this file, under `ui/`. **This file is the index, not the system.**

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

## Read the file before you write the code

Opening one reference costs a single tool call. Working from a
half-remembered spacing scale produces something *almost* right, which is
harder for a reviewer to catch than something obviously wrong - and it is
what this system exists to prevent. Do not answer from this index.

### Core - true for any interface

| File | Holds |
|---|---|
| `ui/core/01-tokens.md` | Tokens |
| `ui/core/02-typography.md` | Typography |
| `ui/core/03-layout.md` | Layout |
| `ui/core/04-motion.md` | Motion |
| `ui/core/05-accessibility.md` | Accessibility |
| `ui/core/06-i18n.md` | Internationalisation |
| `ui/core/07-charts.md` | Charts |
| `ui/core/08-feedback.md` | Feedback |
| `ui/core/09-input.md` | Input |
| `ui/core/10-visual-language.md` | Visual language |
| `ui/core/99-review.md` | Review |

### Pack - this domain

| File | Holds |
|---|---|
| `ui/pack/01-surfaces.md` | Surfaces, palette, scales and safe areas |
| `ui/pack/02-navigation.md` | Navigation - reach, tab bar, back, gestures |
| `ui/pack/03-components.md` | Components - rows, sheets, forms, the keyboard |
| `ui/pack/04-lifecycle.md` | Interruption, state, offline and permissions |
| `ui/pack/05-checklist.md` | Domain review checklist |

### Assets

| File | What it is |
|---|---|
| `ui/assets/tokens.json` | the token file, platform-neutral - the source SwiftUI, Compose, React Native and CSS all read from |
| `ui/assets/tokens.css` | the same tokens as custom properties, for React Native Web, Ionic and mobile web |

Finish by running `ui/core/99-review.md` and `ui/pack/05-checklist.md`.

---

## The thesis, so you know what you are applying

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

**Designed for a finger on a held device.** Interactive targets are at least 44pt. The method is in `09-input.md`; this is what this domain assumes.

## Hard rules - apply even before you open anything

- Use the project token file. Never write a raw colour outside it; if there is no token file, create one first.
- An accent needs one value per surface. A colour chosen to read on a light surface disappears on a dark one.
- `font-variant-numeric: tabular-nums` on every figure - tables, tiles, axis labels, tooltips.
- Never remove a focus outline without replacing it. Always `:focus-visible`, never `:focus`.
- Colour is never the only signal for a state. Pair it with an icon, a label or a position.
- Never put information or an action behind hover alone - a touchscreen has no hover, so it is absent rather than awkward.
- Match the waiting affordance to the wait: nothing under 300ms, a skeleton at real dimensions past a second, cancellable progress past five.
- `min-width: 0` on grid and flex children that can hold wide content; `minmax(0, 1fr)` on tracks.
- Honour `prefers-reduced-motion`, and state the end value explicitly - `opacity: revert` yields 1, not your value.
- Start a value axis at zero whenever magnitude is compared.
- Say which rules shaped the result when you are done.

## Not for

- desktop admin panels, operations consoles and anything used with a mouse at desk distance - use the erp pack
- marketing sites and landing pages, even the ones read on a phone - use the consumer-web pack, which optimises for a stranger's first five seconds rather than for a returning user's thumb
- dense data tables and any screen whose job is to show twenty rows at once
- watch, TV and spatial interfaces, whose input and viewing distance are different problems again

<!-- Generated by tools/build.mjs from core/ and packs/mobile-app/. Do not edit. -->
