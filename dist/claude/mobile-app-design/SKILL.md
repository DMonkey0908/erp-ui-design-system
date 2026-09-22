---
name: mobile-app-design
description: Design, build, restyle or review mobile app interfaces for iOS and Android - tab bars, navigation bars, list screens, detail screens, bottom sheets, forms over a keyboard, onboarding and permission prompts. Use it whenever creating or changing how a phone or tablet app screen looks or behaves: reach, touch targets, gestures, safe areas, sheets, keyboard avoidance, spacing, typography, states or motion; when asked to make an app screen look better, cleaner or more native; when asked where a button or a navigation item should go on a phone; when a screen must survive being backgrounded, rotated or interrupted mid-task; or when porting a desktop or web screen to a phone. Covers SwiftUI, Jetpack Compose, React Native, Flutter and mobile web alike. Not for desktop admin panels, marketing sites or any interface used with a mouse at desk distance.
---

# Mobile app

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

A design system for something a person installed, carries, and opens for
twenty seconds at a time. They are holding it in one hand, often while doing
something else, and they will be interrupted before they finish — by a
notification, a stop announcement, a person talking to them.

## The domain thesis

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

## What this pack adds on top of core

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

## Overrides

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

## Non-negotiables

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

## What this pack deliberately refuses

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

## Getting started on a new project

1. Copy `assets/tokens.json` in, and generate the platform file from it — the
   CSS custom properties in `assets/tokens.css` show the shape. Swap the accent
   and recompute the on-dark value before writing a single screen.

   On a web target, `assets/patterns.css` goes in after it. **This pack ships
   tokens and mechanism, not components** — unlike `erp`, whose shell is one
   copyable stylesheet — because the same screen is as likely to be SwiftUI or
   Compose, where a stylesheet is no help. What is shipped as CSS is the part
   that is pure mechanism and gets reinvented wrongly: safe areas, the row that
   grows, the pressed state on a device with no hover.
2. Decide the navigation model before the first screen: how many tabs, and what
   is deliberately not one. Retrofitting a tab bar means re-rooting every
   screen in the app.
3. Establish the safe-area handling once, in the screen container, so no
   individual screen has to think about it. Every screen doing its own is how
   one of them ends up under the home indicator.
4. Build the interrupted case first for any flow longer than one screen. It is
   the case that actually happens, and building it last means rewriting the
   state model.

## What this domain assumes about the input

**Designed for a finger on a held device.** Interactive targets are at least 44pt. The method is in `09-input.md`; this is what this domain assumes.

## How to use this skill

Read **`core/`** for the rules that hold for any interface, and **`pack/`**
for what this domain decided. A pack file never repeats a core rule, so when
the two are both relevant you need both.

Start with `core/09-input.md`, `core/08-feedback.md`, `core/01-tokens.md`.

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
| `core/10-visual-language.md` | Visual language |
| `core/99-review.md` | Review |

### Pack - this domain

| File | Holds |
|---|---|
| `pack/01-surfaces.md` | Surfaces, palette, scales and safe areas |
| `pack/02-navigation.md` | Navigation - reach, tab bar, back, gestures |
| `pack/03-components.md` | Components - rows, sheets, forms, the keyboard |
| `pack/04-lifecycle.md` | Interruption, state, offline and permissions |
| `pack/05-checklist.md` | Domain review checklist |

### Assets

| File | What it is |
|---|---|
| `assets/tokens.json` | the token file, platform-neutral - the source SwiftUI, Compose, React Native and CSS all read from |
| `assets/tokens.css` | the same tokens as custom properties, and nothing else - for React Native Web, Ionic and mobile web |
| `assets/patterns.css` | the few rules that use them: safe areas, the growing row, the pressed state |

Before calling any work done, run `core/99-review.md` and then
`pack/05-checklist.md`.

<!-- Generated by tools/build.mjs from core/ and packs/mobile-app/. Do not edit. -->
