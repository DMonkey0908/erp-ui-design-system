# Surfaces, palette and scales

<!--
  The first reference file of every pack. It is where concrete values live —
  core holds the method, this holds what your domain picked.

  Rule of thumb for splitting content: if another domain could reasonably choose
  differently, it belongs here. If it would be wrong everywhere, it belongs in
  core, and you should open a pull request against core instead of writing it
  twice.
-->

The concrete values. Core (`01-tokens`, `02-typography`, `04-motion`) holds the
method and the reasoning; this file holds what this domain picked.

## Surface assignment

Fill in the roles core defines. Delete rows that do not apply.

| Role | Treatment | Why |
|---|---|---|
| chrome | | |
| canvas | | |
| content | | |
| floating | | |

State the thing a reader would otherwise get backwards — for the ERP pack that
is "chrome is sharper than content". Every domain has one.

## The token file

Ships as `assets/theme.css`. Paste the palette here so a reader can see it
without opening the asset.

Remember the rule core is strictest about: **the accent needs one value per
surface it appears on.** If this pack has any dark surface at all — even just a
menu — it needs both.

```css
:root {
  /* ----- Brand (swap to rebrand) ----- */
  --accent:         ;
  --accent-on-dark: ;

  /* Alpha steps — focus rings, washes, chart fills */
  --accent-a08: ;
  --accent-a18: ;
  --accent-a35: ;

  /* ----- Surfaces ----- */

  /* ----- Semantic ----- */
  /* Check: is danger distinguishable from the accent? */
}
```

## Type

Family, base size, and the scale. Give each step a role, not just a number —
a table of sizes with no "used for" column gets ignored.

| rem | Used for |
|---|---|
| | |

## Space

The values that actually recur. Six to eight rows; a longer list means the
spacing is not systematic yet.

| Value | Where |
|---|---|
| | |

Content max-width, and why that number.

## Radii

```
```

## Elevation

Flat, or layered? State what earns a shadow, and what colour the shadow is —
pure black shadows look like dirt on every surface that is not pure white.

## Motion

Within core's bands, where does this domain sit? A dense operational tool runs
fast; an expressive consumer product can afford more.

| Duration | For |
|---|---|
| | |

## Focus

The focus treatment per surface. Core requires it to be visible and
`:focus-visible`; this is what it looks like here.

```css
```
