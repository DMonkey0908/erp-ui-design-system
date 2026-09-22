# Review

The universal pass. A pack adds its own domain checks on top; nothing here is
waived by any domain.

## Checklist

### Tokens
- [ ] No raw colour outside the token file. `grep -n '#[0-9a-fA-F]\{3,8\}'` over
      the other stylesheets should come back empty.
- [ ] Every accent has a value per surface, and each is used on the right one.
- [ ] Semantic colours are distinguishable from the accent.
- [ ] Downstream tokens are defined in terms of the palette, not as literals.

### Type
- [ ] Type sized in `rem`/`em`, never `px`.
- [ ] `tabular-nums` on every figure, in every location.
- [ ] Figures compared by magnitude are right-aligned.
- [ ] Prose capped near 72ch.
- [ ] Labels quieter than the values they label.

### Layout
- [ ] `min-width: 0` on every grid or flex item that can hold wide content.
- [ ] Grid tracks use `minmax(0, 1fr)`.
- [ ] Containers scroll; content is not squeezed to fit.
- [ ] Nothing that bleeds outside its box is inside a clipping scroll container.
- [ ] Works at 320px wide and at 200% zoom without page-level horizontal scroll.
- [ ] Async content has its space reserved — no layout shift on load.

### State
- [ ] Every interactive element has hover, focus-visible, active and disabled.
- [ ] Disabled elements do not respond to hover.
- [ ] State that drives styling is also in the DOM (`data-state`,
      `aria-current`, `aria-expanded`) so it is announced and assertable.
- [ ] State restored from storage is applied before the first paint.

### Loading, empty, error
- [ ] The three empty cases are worded differently: nothing exists yet, a filter
      excluded everything, the request failed.
- [ ] "Nothing yet" says what creates the first item.
- [ ] Errors show what actually happened, not a generic apology.
- [ ] Async work shows determinate progress where the duration is knowable.

### Feedback
- [ ] The waiting affordance matches the wait: nothing under 300ms, a skeleton
      at real dimensions past a second, cancellable progress past five.
- [ ] No spinner appears and vanishes inside 300ms.
- [ ] Every optimistic update is reversible in the interface, and a failed one
      announces the rollback instead of quietly undoing it.
- [ ] Double-triggering, an empty result and an item that disappeared mid-action
      all behave.
- [ ] A completion says what changed, rather than ending when a spinner stops.
- [ ] Nothing celebratory is attached to an action someone performs all day.

### Input
- [ ] Targets clear 24×24px, or carry the spacing the exception requires.
- [ ] Adjacent actions are separated; nothing destructive sits against something
      routine.
- [ ] No information or action is behind hover alone; hover is inside
      `@media (hover: hover)` and focus reveals the same thing.
- [ ] Capability is queried (`pointer`, `hover`), never the device.
- [ ] Focus is locatable at the viewing distance the screen is used at, never
      absent and never duplicated.

### Visual language
- [ ] Any named style in use has an answer for what happens when it is
      unsupported, switched off by a system preference, or handed twice the
      content.
- [ ] A translucent surface has an opaque fallback, and its text sits on a
      plate rather than on the blur.
- [ ] An asymmetric grid reads in DOM order, and has a stated single-column
      order.
- [ ] A 3D scene has a frame budget, a poster frame and a non-visual path to
      the same information.

### Accessibility
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

### Motion
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

### Charts
- [ ] Value axis starts at zero where magnitude is compared, or the truncation
      is labelled.
- [ ] No dual y axes; small multiples share a scale.
- [ ] Degenerate cases handled: 0, 1, all-equal, all-zero, single outlier.
- [ ] Keyboard-steppable, with a table fallback.
- [ ] Series distinguishable in greyscale; categories never colour-only.

### Internationalisation
- [ ] Strings marked, with the source language left in place as a fallback.
- [ ] No concatenated sentences; plurals via platform rules.
- [ ] Dates, numbers and relative times formatted via `Intl`.
- [ ] ~35% width headroom; nothing in a fixed-height row wraps.
- [ ] Translated pages do not flash the source language.
- [ ] Logical properties used if RTL is plausible.

## Failure modes

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

## When a request conflicts with a rule here

Name the cost, offer the nearest thing that works, then build what they decide.
Record the decision where the next person will find it, so it is not
re-litigated from scratch next quarter.

Two of these are not negotiable regardless, because the cost lands on someone
who is not in the room: **the honesty rules for charts**, and **the
accessibility minimums**. For those, offer the compliant alternative rather than
the requested version.
