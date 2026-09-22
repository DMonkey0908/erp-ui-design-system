# Navigation — reach, tab bar, back, gestures

## The reach map

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

### What goes where

| Zone | Put here | Never here |
|---|---|---|
| Bottom | Tab bar, primary action, sheet controls, keyboard accessory | — |
| Middle | Content, the row being read, single-use controls | The one action the screen exists for |
| Top | Screen title, back, one contextual action at most | Anything used more than once per screen |

A screen with a "Save" in the top-right is a screen whose most important
control is in its most expensive position. That placement exists because it is
where a desktop window put it, not because anyone measured a thumb.

## The tab bar

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

### When there are more than five

A "More" tab holding the rest, as a list. It is unglamorous and it works,
because the overflow is a place rather than a drawer that appears from an edge
nobody was told about.

What not to reach for is a side drawer. Usage of everything inside one drops
sharply, for the reason the reach map gives: it opens from the top-left corner
of a device held in the right hand, and it is invisible until it does.

## The navigation bar

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

## Hierarchy, and how deep it may go

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

## Gestures

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

## Landscape and tablets

- **Never lock orientation** unless the content genuinely has one — a camera,
  a game. Someone is using the app propped on a table, and someone else has
  rotation locked for reasons that have nothing to do with you.
- **In landscape the reach map changes shape**: the thumb arc is wider and much
  shorter vertically, so a bottom bar takes a larger share of a shorter screen.
  Compact its height rather than moving it.
- **A tablet is not a big phone.** Two panes side by side, and the tab bar
  usually becomes a sidebar — which is legal here precisely because the reach
  argument does not apply to a device held in two hands or set down.
