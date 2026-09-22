# Components — rows, sheets, forms, the keyboard

Sizes in pt; see `01-surfaces.md` for the scale and the tokens.

## The list row

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

### Grouped sections

```
section header   13pt, secondary colour, 16pt lead-in, 8pt below
group            surface colour, 14pt corners, 16pt outer margin
rows inside      dividers between, none after the last
footer           13pt tertiary, the place for an explanation of the section
```

The section footer is underused and it is the right place for the sentence
explaining what a setting does. Better there than as helper text under every
row, and better than a tooltip, which does not exist here.

## Status markers and badges

A row usually carries three lines already, so the `erp` pack's filled pill is
too heavy here. The mobile weight is a dot and a word.

```
marker    an 8pt dot before a 13pt label, both in the state's colour
live      a filled dot
pending   a HOLLOW dot - a 2pt ring, nothing inside
label     always present; the dot is the second signal, never the first
```

The hollow ring is doing real work: it is the one status difference that
survives greyscale, a colour-vision deficiency and a screenshot, which core
`05-accessibility.md` requires and which a set of differently-tinted dots does
not deliver on its own.

A **badge** — the count on a tab, or on a row — follows one rule that is easy
to get wrong:

- **`min-height`, never `height`.** A badge is a box with a digit in it, so a
  fixed box clips its own content at the second text-scale step. This is the
  Dynamic Type failure in `01-surfaces.md`, in the smallest component in the
  app, which is why it survives review.
- **A badge is decoration to a screen reader.** Mark it `aria-hidden` and put
  the count in the accessible name of the thing it sits on: "Today, 4 stops
  remaining", not "Today 4".

## Buttons

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

## Sheets

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

### Action sheets

A short list of choices, from the bottom edge, one per row and labelled with
verbs. The destructive option is last, visually distinct, and separated. Cancel
is its own row at the bottom, full width, because it is the one people reach
for in a hurry.

### Dialogs

The exception, not the rule. A centre-screen alert is correct for exactly one
thing: a decision that must be made before anything else can happen, with two
or three words of explanation and no input. Everything else is a sheet.

## Forms and the keyboard

Forms are where mobile apps fail most often, and almost all of it is the
keyboard.

- **The focused field is always visible, and so is the button that submits
  it.** Inset the scroll view by the keyboard height when it appears. This is
  the single most common bug in this domain and it does not reproduce on a
  simulator with a hardware keyboard attached — test it with the software
  keyboard, on a small device.

  The mechanism differs on every platform and is obvious on none of them:

  | Target | What actually does it |
  |---|---|
  | iOS / SwiftUI | `.ignoresSafeArea(.keyboard)` on what should stay put, and nothing on what should move; `.safeAreaInset(edge: .bottom)` for a pinned bar |
  | Android / Compose | `WindowInsets.ime` — `imePadding()` on the container, with `adjustResize` on the window |
  | React Native | `KeyboardAvoidingView` with `behavior="padding"` on iOS and `"height"` on Android; they genuinely differ |
  | Web / RN Web | `visualViewport`'s `resize` event. The layout viewport does **not** change when the keyboard opens, so a CSS-only solution does not exist |

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

## Waiting, empty and error

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

## Lists at length

- **Recycle, and reserve.** A row whose height is known before its content
  arrives is a list that does not jump while being scrolled.
- **Load the next page before the user reaches the end.** A spinner at the
  bottom of an infinite list is a stall the user watches.
- **Section headers that stick** are worth their cost in a long list: they are
  the only way to know where you are without scrolling back.
- **Search is a field at the top of the list**, revealed by pulling down or
  always present. Not an icon in the nav bar that swaps the whole bar for a
  field, which loses the user's place and their context.
