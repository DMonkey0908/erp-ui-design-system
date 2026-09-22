# Motion

This file is about movement the interface chooses: what moves, how fast, and
how it eases. What the interface owes a user *while they wait* — busy states,
spinners, skeletons, progress — is a different problem with a different clock,
and it lives in `08-feedback.md`.

## Duration comes from repetition count, not from taste

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

## Easing

- `ease` (or `ease-out`) for a state change. It is not worth a custom curve.
- A custom ease-out for anything that travels:
  `cubic-bezier(0.22, 0.61, 0.36, 1)`. Fast departure, soft arrival.
- **Never `linear`** for movement. It reads mechanical, because nothing physical
  moves at a constant speed.
- **Never `ease-in`** alone for something arriving. It starts slow, which reads
  as lag before it reads as motion.

## Pick the movement that explains the change

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

## Animate the cheap properties

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

## Reduced motion, done correctly

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

## What reduced motion means, and does not

It means: no large travel, no parallax, no spin, no bounce, no autoplay. Users
who set it may get motion sickness or migraines from movement.

It does not mean: no feedback. A colour change, an opacity change, and an
instant state swap are all fine and still tell the user their click registered.
Stripping all feedback leaves an interface that feels dead and unresponsive,
which is a different accessibility failure.

## Never animate on resize

Layout transitions plus a window drag equals a visibly lagging interface. If a
container has `transition: width`, a resize animates every intermediate frame.
Suspend layout transitions while resizing, or scope them to the property the
user's own action changes.
