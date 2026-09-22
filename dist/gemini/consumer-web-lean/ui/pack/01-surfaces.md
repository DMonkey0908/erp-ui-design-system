# Surfaces, palette and scales

The concrete values. Core (`01-tokens`, `02-typography`, `04-motion`) holds the
method and the reasoning; this file holds what this domain picked.

## Surface assignment

| Role | Treatment | Why |
|---|---|---|
| **canvas** | Warm off-white `#fbfaf8`, or a dark section used deliberately | The page itself. Warm rather than grey — a cool grey reads as an application background, and this is not an application. |
| **content** | The canvas. No container by default. | A card is for grouping things that belong together, not for holding every paragraph. |
| **chrome** | A header that floats over the canvas, transparent until scrolled | Permanent chrome frames a workspace. There is no workspace here — there is a page. |
| **floating** | Menus, dialogs: white, 16px radius, warm soft shadow | Rare. If a page needs many, the page is doing too much. |
| **accent** | One saturated teal | Reserved for the primary action and nothing else. |
| **semantic** | Success, warning, danger | Forms and system messages only. Not decoration. |

**The contrast move of this pack is a dark section, not a card.** Where the
`erp` pack separates with a border, this separates with space — and when a
section needs to stand apart, it inverts to the dark surface for its full
width. That is why the ink ramp below exists at all.

## The token file

Ships as `assets/theme.css`. The accent needs both values for exactly the reason
core gives: `#0d7a6f` on `#14100e` is muddy and hard to read.

```css
:root {
  /* ----- Accent (swap to rebrand) ----- */
  --accent:         #0d7a6f;   /* on light: buttons, links, focus */
  --accent-hover:   #0a5f57;
  --accent-active:  #084a44;
  --accent-on-dark: #5eead4;   /* the same accent, legible on the ink surface */

  --accent-tint:   #f0faf8;    /* section washes, hover on light */
  --accent-tint-2: #d5f2ec;

  --accent-a10: rgba(13, 122, 111, 0.10);
  --accent-a20: rgba(13, 122, 111, 0.20);
  --accent-a35: rgba(13, 122, 111, 0.35);   /* focus ring */

  /* ----- Canvas: warm, not grey ----- */
  --canvas:    #fbfaf8;
  --canvas-2:  #f4f2ee;   /* alternating section, subtle */
  --surface:   #ffffff;   /* card, when one is warranted */

  --text:      #14100e;   /* warm near-black, never #000 */
  --text-2:    #57514c;
  --text-3:    #8b8279;   /* captions, meta - not body copy */

  --line:      #e8e3dc;   /* hairline, used sparingly */
  --line-2:    #d5cec4;   /* input borders */

  /* ----- Ink: the inverted section ----- */
  --ink:       #14100e;
  --ink-2:     #1f1a17;
  --ink-text:  #faf8f5;
  --ink-text-2:#b8b0a7;
  --ink-line:  rgba(255, 255, 255, 0.12);

  /* ----- Semantic: forms and system messages only ----- */
  --success: #15803d;
  --warning: #b45309;
  --danger:  #be123c;
}
```

**Never `#000` for text.** Pure black on an off-white canvas vibrates and reads
as harsh at large sizes — and this pack uses large sizes. `#14100e` carries the
warmth of the canvas.

**`--text-3` is not body copy.** It is for captions, timestamps and meta. Used
for a paragraph it fails contrast at the sizes anyone will actually read.

## Type

Two families, which is an override of core — see `PACK.md`.

```css
--font-display: 'Fraunces', 'Iowan Old Style', Georgia, serif;
--font-body:    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

The display face is for headings and the one pull quote. Everything else is the
body face. A display face in a button or a form label is where this pairing
starts to look like an accident.

Base `font-size` is **16px** — the browser default, not a shrunk one. A visitor
who has enlarged their default did so for a reason.

| Step | Size | Line height | Family | Used for |
|---|---|---|---|---|
| `--t-hero` | `clamp(2.5rem, 6vw, 4.5rem)` | 1.05 | display | The one headline above the fold |
| `--t-h2` | `clamp(2rem, 4vw, 3rem)` | 1.15 | display | Section headings |
| `--t-h3` | `1.5rem` | 1.25 | display | Sub-headings |
| `--t-lead` | `1.25rem` | 1.6 | body | The paragraph under a headline |
| `--t-body` | `1.0625rem` | 1.7 | body | Running text |
| `--t-small` | `0.9375rem` | 1.6 | body | Secondary text, labels |
| `--t-caption` | `0.8125rem` | 1.5 | body | Captions, meta, legal |

`clamp()` on the two large steps, so the headline does not need a media query
and does not overflow on a 360px phone. Fixed sizes below that — body text that
scales with the viewport is body text that is wrong at one end.

**Line height rises as size falls.** 1.05 on a hero, 1.7 on body. A hero set at
1.6 reads as a list of separate lines; body at 1.2 is a wall.

**Measure: `max-width: 65ch` on running text, 75ch at the absolute limit.** This
is the rule that most often gets dropped in a wide layout, and it is the one
that decides whether the copy is read.

## Space

The section rhythm is the design. Pick one value, use it everywhere.

| Token | Value | Where |
|---|---|---|
| `--gap-section` | `clamp(4rem, 10vw, 8rem)` | Between sections. **The single most important spacing value on the page.** |
| `--gap-block` | `2rem` | Between blocks inside a section |
| `--gap-item` | `1rem` | Between items in a group |
| `--gap-tight` | `0.5rem` | Label to control, icon to text |
| `--pad-section` | `clamp(1.25rem, 5vw, 2rem)` | Horizontal page padding |

Content max-width **1200px**, with running text capped tighter by its measure.
A hero or a full-bleed image may break out; a paragraph never does.

**Vary rhythm, not colour, to separate sections.** A page where every section
has a different background is a page where nothing stands out.

## Radii

```
8px     inputs, small buttons
12px    buttons, cards
16px    dialogs, large cards, images
999px   pills, avatars
```

Softer than an operational tool, deliberately. These read as touchable rather
than structural, which is the opposite of what the `erp` pack wants.

## Elevation

Warm, never neutral-black. A grey shadow on a warm canvas reads as dirt.

```css
--shadow-sm:  0 1px 2px rgba(20, 16, 14, 0.06);
--shadow-md:  0 4px 16px -4px rgba(20, 16, 14, 0.10);
--shadow-lg:  0 24px 48px -12px rgba(20, 16, 14, 0.18);
--shadow-cta: 0 8px 24px -8px var(--accent-a35);   /* the primary action only */
```

`--shadow-cta` is the one place the accent appears as a shadow. It lifts the
primary action off the canvas, and using it anywhere else spends that
distinction.

## Motion

Within core's bands. Most of this happens once per visit, so it can be more
expressive than an operational tool — but core's ordering still holds, and
anything repeated stays fast.

| Duration | For |
|---|---|
| 150ms | Hover, focus, colour |
| 250ms | Button press, small reveal |
| 400ms | Section reveal on scroll, dialog entry |
| 600ms | The hero, once, on first paint |

Easing `cubic-bezier(0.22, 0.61, 0.36, 1)` for anything that travels.

**Scroll reveals are allowed and come with two conditions.** Content must be
visible without JavaScript — animate from `opacity: 0` only when a class marks
JS as ready, never in the base stylesheet. And they fire once; re-animating on
scroll back up is motion for its own sake.

## Focus

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 4px;
}

.on-ink :focus-visible { outline-color: var(--accent-on-dark); }
```

`outline-offset: 3px` rather than the tighter inset an operational tool uses —
there is space here, and the ring reads better clear of the element.

The `.on-ink` override is the per-surface accent rule in practice. A dark
section with a teal-on-light focus ring is a keyboard user who cannot see where
they are.
