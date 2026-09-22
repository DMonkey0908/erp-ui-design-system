# Tokens

A token system is a promise that a colour appears in exactly one place. Every
rule below protects that promise; break one and you are back to grepping hexes.

## One file, loaded first

Tokens live in a single stylesheet loaded before everything else. Downstream
files may define their own tokens **in terms of** it — `--chart-series:
var(--accent)` — and may never define a literal.

```
theme.css      ← the palette, and nothing else
shell.css      ← layout, written entirely in theme tokens
page.css       ← one screen, written in both
```

If a colour is needed that no token covers, **add a token**. Ninety one-off hex
values is not a palette; it is a search problem with a stylesheet around it.

## Every accent needs one value per surface

This is the rule most often missed, and it produces a bug that survives review
because the colour is technically correct.

A brand colour picked to read as text on white will disappear on near-black,
and the reverse. So an accent is never one value:

```css
--accent:         #b3121b;  /* on light content */
--accent-on-dark: #f2555e;  /* the same brand, lifted to read on dark chrome */
```

The classic failure: a dark sidebar whose active item is painted in the
light-surface accent. It passes a brand check and is invisible in use. If a pack
has both a light and a dark surface — and most do somewhere, even if only in a
menu — it needs both values.

Same logic applies to semantic colours the moment they appear on two surfaces.

## In a dark theme, depth is luminance

A shadow is a darker area. On a light surface that reads as height; on a dark
surface there is nothing left to darken, so the shadow is invisible and every
layer collapses into the same plane — a menu that looks painted onto the panel
behind it, a dialog with no edge.

The mechanism that replaces it: **the higher a surface sits, the lighter it
gets.** Define the steps as tokens, in one place, so elevation is a scale rather
than a per-component guess.

```css
--surface-0: …;   /* the base — the page or workspace  */
--surface-1: …;   /* raised: cards, panels             */
--surface-2: …;   /* floating: menus, popovers, sheets */
--surface-3: …;   /* transient: dialogs, toasts        */
```

Derive each step by mixing a small, increasing amount of white into the base
rather than picking four unrelated greys. Picked by hand, the steps drift out
of order the first time someone adds a fifth, and a floating layer ends up
darker than the panel under it.

Two rules that come with it:

- **Not pure black for a large surface.** Maximum contrast against white text
  makes the text bloom and smear at the edges, which is why long sessions on it
  are tiring. Start from a very dark grey and let the scale climb from there.
- **Keep the shadows anyway, and make them do the second job.** A shadow on a
  dark surface still separates a floating layer from what it covers, even where
  it cannot signal height. Elevation is carried by luminance; containment is
  still carried by the shadow.

A pack states the actual values. What is not domain-negotiable is the direction:
in a dark theme, up is lighter.

## Alpha steps are tokens too

Focus rings, glows, hover washes, chart fills and hatch patterns all want the
accent at partial opacity. Define the steps once:

```css
--accent-a08: rgba(179, 18, 27, 0.08);
--accent-a12: rgba(179, 18, 27, 0.12);
--accent-a18: rgba(179, 18, 27, 0.18);
--accent-a25: rgba(179, 18, 27, 0.25);
--accent-a35: rgba(179, 18, 27, 0.35);
```

Hand-tuning opacity per component is how two focus rings end up subtly
different. Pick the steps, then only ever reach for a step.

Note the maintenance cost: these carry the accent's RGB literally, so
rebranding means recomputing them. That is the price of supporting browsers
without a relative-colour path; if your targets all support `color-mix()` or
relative `rgb(from …)`, derive them instead and the cost disappears.

## Semantic colours must not collide with the accent

If the accent is red, an error painted in accent red is indistinguishable from a
primary button — the user cannot tell "this failed" from "click me". Push danger
somewhere the accent is not:

```css
--accent:        #b3121b;   /* deep crimson */
--state-danger:  #ef3b3b;   /* brighter, more orange */
```

The general form: **the accent means "act here", semantics mean "this is the
situation".** When one hue tries to carry both, it carries neither.

The same applies in reverse. If the accent is green, success needs to move. If
the accent is blue, the conventional blue "info" state needs to become a
neutral — a second blue competing for attention with nothing to say is just
noise.

## Naming

Name by **role**, not by appearance or by where it first appeared.

| Good | Bad | Why |
|---|---|---|
| `--content-bg` | `--white` | The white surface goes grey in a dark theme and the name lies. |
| `--text-muted` | `--grey-400` | The ramp position is an implementation detail. |
| `--accent-on-dark` | `--light-red` | Says what it is for, not what it looks like. |
| `--border-strong` | `--border-2` | A number is not a meaning. |

Three steps is usually enough for a text ramp — primary, secondary, muted. A
fourth gets used inconsistently because nobody can tell it from the third.

## Rebranding must be a bounded operation

A pack should be able to state its rebranding procedure in under six steps. If
it cannot, colour has leaked out of the token file. The shape:

1. Change the accent block.
2. Recompute the per-surface accent values — never skip this one.
3. Recompute the alpha steps from the new RGB.
4. Re-check semantic separation: does danger still read as distinct?
5. Re-check contrast on the accent's text pairings.

## Contrast is a constraint, not a preference

Body text needs 4.5:1 against its surface; large text and UI boundaries need
3:1. Check the accent against **every** surface it lands on, not just the one it
was designed against — that check is what surfaces the missing second accent
value before a user does.

A brand colour that fails contrast as body text can still be correct as a
fill behind white text, or as a 3px rail. Demote it rather than lighten the
whole brand.
