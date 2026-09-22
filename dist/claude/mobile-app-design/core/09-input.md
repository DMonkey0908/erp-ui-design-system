# Input

An interface is not shaped by its screen size. It is shaped by what the user is
pointing with, and how far away they are sitting.

A phone and a desktop browser at the same CSS width are not the same problem:
one has a pointer accurate to a pixel and a hover state, the other has a finger
roughly ten millimetres wide and no hover at all. Treating width as the variable
is how a "responsive" layout ends up with 28px icon buttons on a touchscreen.

This file holds the method. The numbers a domain settles on belong to its pack —
except the floor, which is an accessibility minimum and belongs to nobody.

## Target size follows the pointer, not the screen

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

## Hover does not exist everywhere

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

## On a desktop, the edges are infinite

A cursor cannot overshoot past the edge of the screen, so the four edges and
especially the four corners behave as targets of unbounded size — the user can
throw the pointer at them without aiming.

That is why system menus, close buttons and docks live there, and it is worth
spending: an action used constantly earns an edge. Nothing about this transfers
to touch, where the edges are the hardest places to reach and are already
claimed by system gestures.

## Reach is not uniform

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

## When focus is the only cursor

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

## Physical feedback is feedback

Where the hardware offers haptics, a short pulse confirms an action without
requiring the user to look. It is the cheapest confirmation available on a
device held in the hand, and the only one that survives glare.

Two rules: haptics **confirm**, they never **inform** — anything conveyed by a
buzz alone is lost to anyone who has them disabled — and they follow the same
restraint as motion. A device that vibrates on every scroll tick gets its
haptics turned off, taking the useful confirmations with them.
