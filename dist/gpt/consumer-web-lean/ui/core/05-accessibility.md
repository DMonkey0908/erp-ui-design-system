# Accessibility

Not a compliance pass at the end. Every item here is cheaper to build in than to
retrofit, and several of them are the same work as building it correctly.

## Focus

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

## Keyboard

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

## Semantics before ARIA

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

## Colour is never the only signal

Roughly 8% of men have a red-green colour vision deficiency, and a screenshot
pasted into a black-and-white report has none at all. Every state that colour
indicates also needs a shape, an icon, a position or a word.

The test: **print the screen in greyscale.** Anything that becomes ambiguous was
relying on hue alone.

This applies hardest to the two places it is most tempting: a red row versus a
green row with otherwise identical text, and a multi-series chart legend.

## Contrast

4.5:1 for body text, 3:1 for large text and for the boundaries of interactive
elements. Check the accent against **every** surface it lands on.

Placeholder text, disabled labels and "subtle" grey-on-grey metadata are where
this fails most often — and disabled controls still need to be readable, because
a user has to understand what is unavailable.

## Motion and vestibular safety

See `04-motion.md`. The rule that gets broken: honouring
`prefers-reduced-motion` by killing the animation without supplying the end
state, so an element that faded in is now permanently invisible.

## Zoom and reflow

The content must work at 200% zoom and at a 320px-wide viewport without
horizontal scrolling of the page as a whole. This is why type is sized in `rem`
and not `px`, and why individual containers — not the page — are the things that
scroll horizontally.

## Forms

- A real `<label>` associated with every control. Placeholder text is not a
  label: it vanishes on input, exactly when a user needs to check what they are
  filling in.
- Errors announced, not only coloured. Tie the message to the field with
  `aria-describedby`, and mark the field `aria-invalid`.
- Never disable submit without saying what is missing.
- Group related controls in a `<fieldset>` with a `<legend>` — this is what
  makes a set of radios announce as one question.
