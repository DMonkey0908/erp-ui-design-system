# Page architecture — the fold, rhythm, sections

## The fold is not a line, it is a promise

Nobody decides in the first screenful whether to buy. They decide whether to
scroll. So the question is never "what fits above the fold" — it is "does this
screenful make the next one worth reaching".

What the first screenful owes a stranger, in this order:

1. **What this is.** In their words, not the company's. "Invoicing for
   freelancers" beats "Streamline your financial workflow".
2. **Who it is for**, if that is not obvious from the first.
3. **One action.**
4. **A reason to believe it** — a real screenshot, a named customer, a number.

Everything else belongs below. A first screenful carrying six propositions
carries none.

```html
<section class="hero">
  <h1>One sentence. What it is.</h1>
  <p class="lead">One or two lines. Who it is for and why it is different.</p>
  <a class="btn btn-primary" href="/start">The one action</a>
  <p class="reassure">No card required · Cancel any time</p>
  <img src="product.avif" width="1200" height="750" alt="…" fetchpriority="high">
</section>
```

The line under the button carries the objection the button raises. A button
that says "Start free trial" prompts "will you charge me?", and answering it
inline converts better than a FAQ twelve sections away.

## Rhythm is the layout

A long page is a sequence of sections at one consistent vertical rhythm. That
consistency is what makes it feel designed rather than assembled.

```css
.section { padding-block: var(--gap-section); }
.section > .inner { max-width: 1200px; margin-inline: auto; padding-inline: var(--pad-section); }
.section p, .section li { max-width: 65ch; }
```

- **One rhythm value, everywhere.** Not one per section, and not tuned by eye
  per breakpoint.
- **Vary width, not spacing, to create emphasis.** A full-bleed image or an
  inverted section stands out because its width changed, not because it got
  extra padding.
- **Alternate at most two backgrounds.** Canvas and one other. A third is where
  a page starts to look like a template gallery.

## Section shapes that carry weight

Most marketing pages need four or five of these, not all of them:

| Shape | Job | Fails when |
|---|---|---|
| Hero | What this is, one action | It lists features |
| Proof | Logos, a number, a named quote | The quote is anonymous, or the logo has no permission |
| The problem | Name the reader's situation before the solution | It is longer than the solution |
| How it works | Three steps, each one verb | Steps are nouns, or there are seven |
| Feature detail | One feature, one image, alternating sides | Every feature gets equal weight |
| Pricing | See `03-components.md` | It hides the price |
| FAQ | The objections sales actually hears | It is invented, and reads like it |
| Closing action | Repeat the hero action | It introduces a new, different action |

**The closing action repeats the hero action.** A reader who scrolled the whole
page and then meets a different call to action has been asked to re-decide.

## Where the eye goes

A stranger scans an F or a Z shape, not a grid. Practical consequences:

- **The first three words of a heading do most of the work.** "Built for teams
  who ship" is scanned as "Built for teams". Front-load the meaning.
- **Left-align running text.** Centred paragraphs have a ragged left edge, so
  the eye loses the line start on every return. Centre a heading and a short
  lead; never a paragraph over three lines.
- **One focal point per screenful.** As the reader scrolls, each screenful
  should have exactly one thing that wins. Two things competing is two things
  ignored.

## Navigation

The header floats over the canvas and stays out of the way. It is not the
permanent frame an operational tool needs.

```css
.header {
  position: sticky; top: 0;
  background: transparent;
  transition: background .15s ease, box-shadow .15s ease;
}
.header.is-scrolled {
  background: color-mix(in srgb, var(--canvas) 85%, transparent);
  backdrop-filter: blur(8px);
  box-shadow: var(--shadow-sm);
}
```

- **Five or six top-level items, maximum.** Beyond that nobody reads them; they
  use search or leave.
- **The header's action is secondary to the hero's.** Same destination, quieter
  treatment. Two primary buttons on one screenful halve each other.
- **Provide a fallback for `backdrop-filter`.** Where it is unsupported the
  header must still be opaque enough to read against whatever scrolls under it.
- **The mobile menu is a real menu**: a `<button>` with `aria-expanded`, focus
  moved in on open, Escape to close, focus returned to the trigger. A checkbox
  hack is not keyboard-operable and is not announced.

## Footer

The footer is where people go when they are looking for something specific:
pricing, contact, status, terms, a job. Make it findable and complete. This is
the one place on the page where density is correct — a compact, well-grouped
footer is a service, not a wall.

## Responsive

The page is designed at 360px and at 1440px. The middle takes care of itself if
the type scale uses `clamp()` and the layout uses `grid` with `auto-fit`.

| Width | What changes |
|---|---|
| < 640px | Single column. Section rhythm drops to its `clamp()` floor. Hero image after the text, not before. |
| 640–1024px | Two-column grids where the content supports it |
| > 1024px | Full layout; content capped at 1200px |

- **Never hide content on mobile.** A stranger on a phone is the majority of
  this traffic. If something is not worth their time, it is not worth anyone's.
- **Tap targets at least 44px**, with 8px between them.
- **The hero image goes below the headline on a phone.** A full-width image
  above the text pushes the one sentence that matters off the screen.

## What must survive JavaScript failing

Not a hypothetical: it covers a failed CDN, a slow connection that times out,
an aggressive extension, and the crawler that decides how the page is indexed.

- The headline, the lead, and what the product is.
- The primary action, as a real `<a>` or a form that submits.
- Navigation links.
- Prices.

Scroll reveals, carousels, accordions and tabs may enhance. None of them may be
the only way to reach content.

```css
/* base: visible. JS adds .js to <html>, and only then may things start hidden */
.js .reveal { opacity: 0; transform: translateY(12px); }
.js .reveal.is-in { opacity: 1; transform: none; transition: opacity .4s, transform .4s; }
```

Writing `opacity: 0` in the base stylesheet is how a page ships blank to
everyone whose JavaScript did not run.
