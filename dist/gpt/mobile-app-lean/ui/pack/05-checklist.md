# Domain review checklist

Run **`core/99-review.md` first** — tokens, type, layout, state, feedback,
input, accessibility, motion, charts, i18n. Nothing there is waived by this
domain.

This file is what a phone needs on top.

## Checklist

### Reach
- [ ] The primary action is in the bottom third, full width or near it.
- [ ] Nothing used more than once per screen sits in a top corner.
- [ ] No destructive action is adjacent to a frequent one.
- [ ] Nothing important sits in either bottom corner, since the grip is unknown.

### Targets and text
- [ ] Every target is at least 44pt / 48dp, counting padding rather than the
      drawn icon.
- [ ] At least 8pt between adjacent targets.
- [ ] Nothing below 12pt, and nothing important at 12pt.
- [ ] The screen survives the largest Dynamic Type step: rows grow, labels
      wrap, nothing clips.
- [ ] No row has a fixed height.

### Safe areas
- [ ] Insets are read at runtime, never hardcoded.
- [ ] The bottom bar adds the bottom inset as padding, so nothing sits under
      the home indicator.
- [ ] Scroll content passes under the bars, with the inset added as content
      padding.
- [ ] Checked on a device with a notch and on one without.

### Navigation
- [ ] Three to five tabs, each a destination rather than an action, each
      labelled.
- [ ] Each tab's stack is preserved when the user leaves and returns.
- [ ] The tab bar is never hidden to make room.
- [ ] Back is where the platform puts it, and the edge-swipe still works.
- [ ] No hierarchy deeper than three pushes before a sheet takes over.
- [ ] A deep link or notification lands with a back-stack that makes sense.

### Gestures
- [ ] Every gesture has a visible equivalent.
- [ ] No system gesture region is overridden.
- [ ] Destructive gestures offer undo rather than a confirmation dialog.

### The keyboard
- [ ] The focused field and its submit button are both visible above the
      keyboard, tested with the software keyboard on a small device.
- [ ] Keyboard type is set per field; the return key advances and then submits.
- [ ] Autofill attributes are set on every credential and address field.
- [ ] Dismissing a dirty sheet by dragging does not silently discard input.

### Sheets and dialogs
- [ ] Modals are sheets; a centre-screen dialog appears only for a blocking
      decision with no input.
- [ ] The confirming action is at the bottom of the sheet, not in its top bar.
- [ ] Action sheets put the destructive option last and Cancel full width.

### Lifecycle
- [ ] Typed input is persisted on change, not on a timer.
- [ ] The app relaunches into the screen and stack the user left, not the root.
- [ ] Resuming after a long absence refreshes underneath without scrolling the
      user or showing a stale figure as though it were live.
- [ ] Offline shows cached content with its age, queues writes, and announces a
      failed queue rather than dropping it.
- [ ] No permission is requested on launch; each is asked at the moment of use,
      and a denial degrades the feature instead of nagging.
- [ ] Nothing continuous keeps running once the screen is not visible.

### Platform
- [ ] Both themes ship, and the accent has a value for each.
- [ ] Orientation is not locked without a content reason.
- [ ] Platform conventions beat house style where they disagree.

## Failure modes specific to this domain

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

## Refusals

The table in `PACK.md` lists what this pack pushes back on and what to offer
instead. Name the cost, offer the alternative, then build whatever is decided —
and record the decision so nobody re-litigates it next quarter.
