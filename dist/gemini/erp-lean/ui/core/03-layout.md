# Layout

## The two traps that eat an afternoon

Both come from the same default and both look like a mystery until you know
them.

### `min-width: auto` on grid and flex children

A grid or flex item will not shrink below its content's intrinsic width. So one
wide table, one long unbroken identifier, one `<pre>` block — and the item
widens its track, the container overflows, and something else gets pushed off
screen. In an app shell, the thing pushed off screen is the navigation.

```css
.main { min-width: 0; }                              /* the fix */
.grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }  /* not 1fr */
```

`1fr` is shorthand for `minmax(auto, 1fr)`, which carries the same default.
Write `minmax(0, 1fr)` habitually; there is no case where the `auto` form is
what you wanted.

### A scroll container that is also a clip container

`overflow: hidden` on one axis and `auto` on the other still clips. Anything
that deliberately bleeds outside its box — a glow, a focus ring, a shadow, a
tooltip — will be cut at that edge. Either give the bleeding element room inside
the padding box, or move it out of the scroll container entirely.

## Sticky, not fixed, for app frames

A `position: fixed` bar leaves the flow, so the layout no longer knows it exists
and you start hand-maintaining offsets. `position: sticky` keeps it in flow and
lets the grid keep doing the work.

Fixed is right for things that genuinely float free of the document: a modal, a
toast, a menu anchored to the viewport rather than to its parent. A menu inside
a flex toolbar in particular must be fixed or absolute-outside, because the flex
container will clip it.

## Stylesheet order is part of the architecture

```
tokens → shell/layout → component → page
```

Each layer may consume the previous layer's tokens and may not reach forward.
When a page stylesheet needs to override a component, that is a signal the
component is missing a variant — not a licence for `!important`.

## Restore state before the first paint

Any state read from storage that affects **layout or visibility** must be
applied to the root element inline in `<head>`, before the stylesheets. A
collapsed sidebar, a hidden role-gated section, a chosen language, a theme.

Applied after paint, the user watches the interface correct itself on every
single navigation. It reads as a broken page rather than a restored preference.

```html
<script>
  try {
    if (localStorage.getItem('app.nav.collapsed') === '1')
      document.documentElement.classList.add('nav-collapsed');
  } catch (_e) { /* storage can throw outright, not just return null */ }
</script>
```

Every read gets its own `try/catch`. `localStorage` **throws** in some privacy
configurations rather than returning null, and an uncaught error here runs
before any stylesheet, so it blanks the page.

Consequence worth planning for: the class lands on the root element, while
runtime toggles usually set a class on a container. Every affected rule then
needs both selectors. Decide which element owns the state up front and keep it
consistent, or the duplicate-selector list grows without bound.

## Responsive: decide what each breakpoint is for

A breakpoint list is only maintainable if each entry has a stated job. Give each
one a reason, in the stylesheet:

```
1024px   secondary identity drops away, primary actions stay
820px    navigation switches to its compact form
640px    edge-anchored panels span the viewport
520px    multi-column forms become single-column
```

Two principles that survive every domain:

- **Never remove functionality at a smaller size — change its form.** If
  navigation collapses to icons, it is still navigation. If it disappears behind
  a control the user has not been taught, it is gone.
- **Let containers scroll rather than squeezing their contents.** A table
  crushed to fit is unreadable; a table in a scrolling wrapper is merely wide.

Container queries are the better tool wherever a component's layout depends on
its own width rather than the viewport's — a card in a sidebar and the same card
in a full-width panel. Reach for them before adding a fifth viewport breakpoint.

## Reserve space before content arrives

Anything async — an image, a chart, a list, a count — gets its dimensions
reserved before it loads. Otherwise the page reflows under the cursor and a user
mid-click hits the wrong thing.

Reserve with an aspect ratio, a min-height, or a skeleton at the real
dimensions. A spinner in a zero-height box guarantees a jump.
