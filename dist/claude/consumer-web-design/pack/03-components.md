# Components

Fewer components than an operational tool needs, each carrying more weight.

## Buttons

```css
.btn {
  display: inline-flex; align-items: center; gap: .5rem;
  padding: .875rem 1.75rem;
  border-radius: 12px;
  font: 600 1.0625rem/1 var(--font-body);
  text-decoration: none;
  cursor: pointer;
  transition: background .15s ease, transform .15s ease, box-shadow .15s ease;
}

.btn-primary {
  background: var(--accent); color: #fff; border: 0;
  box-shadow: var(--shadow-cta);
}
.btn-primary:hover { background: var(--accent-hover); transform: translateY(-1px); }
.btn-primary:active { background: var(--accent-active); transform: none; }

.btn-secondary {
  background: transparent; color: var(--text);
  border: 1px solid var(--line-2);
}
.btn-secondary:hover { background: var(--canvas-2); }

.btn-lg { padding: 1.125rem 2.25rem; font-size: 1.125rem; }
```

Bigger than an operational button on purpose: this one is being sold, not
operated.

- **One primary per screenful.** The header's action is secondary even when it
  goes to the same place.
- **The label is a verb the reader would use.** "Start free trial", not
  "Submit" and not "Learn more" — the second tells them nothing about where
  they are going.
- **Never disable the primary action without saying what is missing**, next to
  the thing that is missing.
- `transform: translateY(-1px)` is the whole hover. Anything larger moves the
  layout under the cursor.

## Cards, used sparingly

A card groups things that belong together. It is not the default container, and
a page built entirely of cards is an admin panel with marketing copy in it.

```css
.card {
  background: var(--surface);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  transition: box-shadow .15s ease, transform .15s ease;
}
a.card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
```

If a card is a link, **the whole card is the link** — do not nest a "Read more"
anchor inside a clickable div. Either wrap the card in an `<a>`, or use one
anchor on the heading and a `::after` overlay to extend its hit area. A div with
a click handler is not keyboard-reachable and is not announced.

## Feature rows

Alternating image and text beats a grid of equal tiles, because a grid says
everything is equally important and nothing is.

```css
.feature { display: grid; gap: clamp(2rem, 5vw, 4rem); align-items: center; }
@media (min-width: 900px) {
  .feature { grid-template-columns: 1fr 1fr; }
  .feature:nth-child(even) > .media { order: -1; }
}
```

One heading, two or three sentences, one image. If a feature needs a bullet
list, it is two features.

## Pricing

```css
.plans { display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
.plan { border: 1px solid var(--line); border-radius: 16px; padding: 2rem; background: var(--surface); }
.plan.is-featured { border-color: var(--accent); box-shadow: var(--shadow-md); }
.plan-price { font: 700 var(--t-h2)/1 var(--font-display); font-variant-numeric: tabular-nums; }
```

- **Show the price.** "Contact us" on every tier is read as "expensive, and you
  will be negotiated with".
- **Three tiers, at most four.** More becomes a comparison task nobody agreed
  to do.
- **Mark one recommended**, and let it be the one most people should pick, not
  the most expensive.
- **`tabular-nums` on prices** — core's rule, and it shows up most when a
  monthly/annual toggle changes the digits in place.
- **State the billing period next to the number**, not in a footnote. A price
  that turns out to be annual at checkout is the last interaction you get.
- **Differences, not repetition.** A feature every tier has does not need a row
  in every column.

## Forms — lead capture

Every field costs conversions. Ask for what you will use this week.

```css
.field { display: flex; flex-direction: column; gap: .5rem; }
.field label { font: 600 var(--t-small)/1.4 var(--font-body); color: var(--text-2); }
.field input, .field textarea {
  padding: .875rem 1rem;
  border: 1px solid var(--line-2);
  border-radius: 8px;
  background: var(--surface);
  font: 400 1.0625rem/1.5 var(--font-body);   /* >=16px: iOS zooms below that */
}
.field input:focus-visible { outline: 2px solid var(--accent-a35); outline-offset: 2px; border-color: var(--accent); }
.field .error { color: var(--danger); font-size: var(--t-caption); }
```

- **A real `<label>` on every field** (core `05-accessibility.md`). On a
  lead-capture form the cost of getting this wrong is not usability, it is the
  submit that never happens.
- **Never below 16px on an input.** iOS Safari zooms the page in, and the
  layout the reader was looking at is gone.
- **Correct `type` and `autocomplete`** — `type="email"`, `autocomplete="email"`.
  It changes the phone keyboard and lets the browser fill the field.
- **Validate on blur, not on keystroke.** Telling someone their email is
  invalid while they are typing it is scolding them for being unfinished.
- **The error says what to do**, next to the field, and is tied with
  `aria-describedby`.
- **Success is a state, not a redirect to a blank page.** Say what happens next
  and when.

## Testimonials and proof

- **A name, a role and a company, or it is not a testimonial.** An anonymous
  quote reads as written in-house, because usually it was.
- **A photo of the person beats a logo**, and a logo beats a star rating.
- **Specific beats glowing.** "Cut our close from nine days to two" outperforms
  "Amazing product, great team".
- **Numbers need a source and a date.** An unattributed "10x faster" is read as
  marketing, which costs more trust than leaving it out.
- **Use logos only with permission.** This is a legal question, not a design
  one, and the answer is the client's to give.

## FAQ — a disclosure list, not an accordion widget

```html
<details class="faq">
  <summary>Can I cancel any time?</summary>
  <p>Yes. …</p>
</details>
```

Native `<details>` is keyboard-operable, announced correctly, searchable in the
page and works without JavaScript. A custom accordion has to re-earn all four,
and usually re-earns two.

Write the objections sales actually hears. An invented FAQ reads exactly like
an invented FAQ.

## The inverted section

The one high-contrast move this pack has. One or two per page.

```css
.on-ink { background: var(--ink); color: var(--ink-text); }
.on-ink .lead { color: var(--ink-text-2); }
.on-ink .btn-primary { background: var(--accent-on-dark); color: var(--ink); box-shadow: none; }
.on-ink :focus-visible { outline-color: var(--accent-on-dark); }
```

Everything that lands on it needs its on-dark value: text, accent, focus ring,
logos. This is core's per-surface accent rule, and a dark section is where a
pack that only defined one value discovers the mistake.

## Images

```html
<img src="hero.avif" width="1200" height="750" alt="" loading="lazy" decoding="async">
```

- **`width` and `height` always**, even with CSS sizing. They reserve the aspect
  ratio and stop the page shifting as images arrive.
- **`loading="lazy"` on everything except the hero.** The hero gets
  `fetchpriority="high"` and no lazy attribute — lazy-loading the largest
  element on screen delays the metric it defines.
- **`alt` describes the content, not the file.** Decorative images take
  `alt=""` so a screen reader skips them rather than reading a filename.
- **Never bake text into an image.** It cannot be searched, translated, read
  aloud, or resized.
