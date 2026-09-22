# Surfaces, palette, scales and safe areas

The concrete values. Everything else in this pack spends what is defined here.

## The token file is not a stylesheet

This pack ships `assets/tokens.json` rather than a CSS file, because the same
screen gets built in SwiftUI, Compose, React Native and sometimes plain CSS,
and a palette that lives in one of those four is a palette the other three
retype. `assets/tokens.css` is a generated view of the same source, not a
second source.

The rule core states about one file owning every colour holds unchanged; what
changes is that the file is not written in the language the app is.

## Units, and why they differ per platform

| Platform | Unit | Note |
|---|---|---|
| iOS | `pt` | 1pt = 1px at 1x, 2px at 2x, 3px at 3x. Sizes are written in pt and never in px. |
| Android | `dp` for space, `sp` for text | `sp` scales with the user's font setting and `dp` does not. Text in `dp` is a bug that only shows up for users who changed their font size. |
| React Native | unitless | Already density-independent; the numbers below transfer directly. |
| Flutter | logical pixels | Same. |
| Mobile web | `rem` | Per core `02-typography.md`, with the root left at the browser default. |

The values in this file are given in pt. Treat `1pt = 1dp = 1 logical pixel`.

## Palette

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

## Type

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

### Dynamic Type is a layout requirement, not a setting

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

## Spacing

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

## Corners and elevation

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

## Safe areas

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

## Touch targets

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
