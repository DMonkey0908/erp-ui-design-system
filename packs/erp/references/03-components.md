# Components

Every component here lives on **paper**. Copy the spec, keep the tokens.

## Card

The only container. There is no "panel", "box" or "section" variant — one
container with a consistent head makes a dense page scannable.

```css
.card {
  background: var(--paper);
  border: 1px solid var(--paper-border);
  border-radius: 8px;
  padding: 20px 22px;
}
.card-head {
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: 16px; flex-wrap: wrap; margin-bottom: 14px;
}
.card-title { margin: 0 0 4px; font-size: 1rem; font-weight: 700; color: var(--paper-text); }
.note       { margin: 0; max-width: 72ch; font-size: 0.8125rem; line-height: 1.5; color: var(--paper-text-2); }
```

Border, not shadow. Cards sit on `--paper-bg`, which is slightly grey, so a
hairline is enough to separate them and the page stays flat and quiet.

`flex-wrap` on the head is what keeps a title and its action row from colliding
at narrow widths.

## Buttons

Three variants, and that is the whole set.

```css
.btn {
  padding: 8px 16px;
  border: 1px solid var(--paper-border-strong);
  border-radius: 6px;
  background: var(--paper);
  color: var(--paper-text);
  font: inherit; font-size: 0.8125rem; font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.btn:hover:not(:disabled) { background: var(--paper-2); }
.btn:disabled             { opacity: 0.55; cursor: default; }

.btn-primary {
  border-color: var(--brand); background: var(--brand); color: var(--text-on-brand);
}
.btn-primary:hover:not(:disabled) { background: var(--brand-hover); border-color: var(--brand-hover); }

.btn-sm { padding: 5px 12px; font-size: 0.75rem; }

/* A bare text action — "Clear filters", "Reset". Not a link, not a button. */
.link-btn {
  padding: 0; border: 0; background: none;
  color: var(--brand);
  font: inherit; font-size: 0.75rem; font-weight: 600;
  cursor: pointer;
}

.btn:focus-visible, .link-btn:focus-visible {
  outline: 2px solid var(--brand-a35); outline-offset: 2px;
}
```

**One primary button per card.** The accent means "this is the action". Two of
them on one surface means neither does.

`:hover:not(:disabled)` matters — a disabled button that still lights up on
hover reads as broken.

## Forms

The `<label>` *is* the field wrapper. One element carries the label text, the
control and their spacing, so nothing can drift out of alignment.

```html
<label class="field">
  <span>Host</span>
  <input type="text" name="host">
</label>
```

```css
.field {
  display: flex; flex-direction: column; gap: 5px; min-width: 0;
  font-size: 0.75rem; font-weight: 600; color: var(--paper-text-2);
}
.field input, .field select, .field textarea {
  width: 100%; box-sizing: border-box;
  padding: 8px 10px;
  border: 1px solid var(--paper-border-strong);
  border-radius: 6px;
  background: var(--paper); color: var(--paper-text);
  font: inherit; font-size: 0.875rem; font-weight: 400;
}
.field textarea {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.75rem; resize: vertical;
}
.field :focus-visible {
  outline: 2px solid var(--brand-a35); outline-offset: 1px;
  border-color: var(--brand);
}
```

The label is **smaller and lighter** than the value it labels (0.75rem/600 grey
over 0.875rem/400 near-black). In a form of thirty fields the values are what
gets scanned; labels are reference material.

`min-width: 0` on the field stops a long value from blowing out its grid column.

### Form grid

```css
.form-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.field-wide { grid-column: span 2; }

@media (max-width: 860px) { .form-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 520px) { .form-grid { grid-template-columns: 1fr; } .field-wide { grid-column: auto; } }
```

`minmax(0, 1fr)`, never plain `1fr` — the default `min-width: auto` makes a
long unbroken value widen its column and break the grid.

### Segmented control

For 2–4 mutually exclusive options. Real radios underneath, so keyboard and
form submission work for free.

```css
.segment { display: inline-flex; padding: 3px; border-radius: 8px; background: var(--paper-3); }
.segment label { position: relative; cursor: pointer; }
.segment input { position: absolute; opacity: 0; pointer-events: none; }
.segment span  { display: block; padding: 6px 14px; border-radius: 6px;
                 font-size: 0.8125rem; font-weight: 600; color: var(--paper-text-2); }
.segment input:checked + span {
  background: var(--paper); color: var(--paper-text);
  box-shadow: var(--shadow-raised);
}
.segment input:focus-visible + span { outline: 2px solid var(--brand-a35); }
```

The selected option is raised out of a recessed track — no accent needed.

## Tables

The centre of gravity of an ERP. Get the density right and the rest follows.

```css
.table-wrap { overflow-x: auto; border: 1px solid var(--paper-border); border-radius: 8px; }
.table { width: 100%; border-collapse: collapse; font-size: 0.8125rem; }

.table th {
  padding: 8px 12px; text-align: left;
  font-size: 0.72rem; font-weight: 600; color: var(--paper-text-2);
  background: var(--paper-2);
  border-bottom: 1px solid var(--paper-border);
  white-space: nowrap;
}
.table td { padding: 8px 12px; color: var(--paper-text); border-bottom: 1px solid var(--paper-border); }
.table tr:last-child td { border-bottom: 0; }

.table .num {
  text-align: right;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.table td.truncate { max-width: 320px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
```

Rules that carry the weight:

- **`tabular-nums` on every numeric column** (core `02-typography.md`). It
  matters more here than anywhere: a table is the centre of gravity of this
  domain, and most of them refresh in place.
- **Numbers right-aligned, text left-aligned.** Right alignment is what lets
  someone compare magnitudes without reading.
- **Header is smaller than the body.** 0.72rem grey against 0.8125rem
  near-black. The header is a reference, the data is the content.
- **Hairlines between rows, no zebra striping.** Striping adds visual weight at
  the density this system runs at.
- **The wrapper scrolls, the table does not shrink.** Squeezing columns to fit
  is how an unreadable table happens.
- **`white-space: nowrap` on headers**, so a two-word header never doubles the
  header height.

### Row actions

Every operational table has one, and the default an assistant reaches for -
revealing it when the row is hovered - is the thing `core/09-input.md` rules
out. So it is specified here rather than left to be reinvented.

```css
.table .col-action { width: 1%; text-align: end; }   /* shrink to content */

.row-action {
  min-height: 26px;
  padding: 4px 10px;
  border: 1px solid var(--paper-border-strong);
  border-radius: var(--radius-control);
  background: var(--paper);
  color: var(--paper-text-2);
  font: inherit; font-size: 0.72rem; font-weight: 600;
  white-space: nowrap; cursor: pointer;
}
.row-action:hover:not(:disabled) { background: var(--paper-2); color: var(--paper-text); }
.row-action:active:not(:disabled) { background: var(--paper-3); }

/* Inset, because the action column sits flush against the right edge of a
   wrapper that clips on the x axis and a positive offset gets cut. */
.row-action:focus-visible { outline: 2px solid var(--brand); outline-offset: -2px; }

/* A toggle states its own state. The label changes with it. */
.row-action[aria-pressed='true'] {
  border-color: var(--brand-border);
  background: var(--brand-tint);
  color: var(--brand);
}
```

Four rules:

- **Present at all times, for every row.** Not on hover - on a touchscreen a
  hover-revealed control does not exist, and with a keyboard it appears only
  once focus has already arrived somewhere invisible.
- **Quiet by default.** A column of forty buttons at full button weight
  out-shouts the data they act on, which is why this is one step down from
  `.btn-sm` in size and uses the muted text colour until hovered.
- **One per row.** More than one and the column becomes a toolbar; put the
  rest behind a single overflow menu.
- **A toggle carries `aria-pressed` and changes its label.** "Hold" becomes
  "Release". A button whose text never changes cannot tell a screen reader
  what it just did.

Destructive row actions do not belong here at all. They go in the overflow
menu, last, after a divider - distance is the cheapest confirmation there is.

## Loading

`core/08-feedback.md` sets which affordance a wait has earned. This is what the
one that matters here looks like: a table reloading, which in this domain is
most waits.

```css
.skeleton-cell {
  display: block;
  height: 11px;                                   /* the cap height of a row */
  border-radius: 3px;
  background: linear-gradient(90deg,
              var(--paper-3) 0%, var(--paper-2) 50%, var(--paper-3) 100%);
  background-size: 200% 100%;
  animation: skeleton-sweep 1.1s ease-in-out infinite;
}
.skeleton-cell.is-short { width: 45%; }
.skeleton-cell.is-right { margin-inline-start: auto; width: 60%; }

@keyframes skeleton-sweep {
  from { background-position: 100% 0; }
  to   { background-position: -100% 0; }
}

/* The global guard kills the animation and does not supply an end state.
   Without this the cells inherit whatever frame they stopped on. */
@media (prefers-reduced-motion: reduce) {
  .skeleton-cell { animation: none; background: var(--paper-3); opacity: 1; }
}
```

The rules that make it honest:

- **Render it into the real `<tr>`/`<td>` structure**, one skeleton row per row
  you expect. A grey block of arbitrary height is a spinner that costs more.
- **Schedule it, do not render it immediately.** Below a second the answer
  usually beats it, and a skeleton that appears and vanishes reads as a
  stutter in an interface that was fast. Set it on a ~300ms timer and clear the
  timer when the data lands.
- **`aria-hidden` on the skeleton rows.** They carry no information, and a
  screen reader announcing eight rows of nothing is worse than silence. Put the
  word in the live region instead - the same one that carries the match count.
- **The table header stays.** Only the body is unknown, and keeping the header
  means the columns do not move when the data arrives.

## KPI tiles

```css
.tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; }
.tile  { padding: 12px 14px; border: 1px solid var(--paper-border); border-radius: 8px;
         background: var(--paper-2); min-width: 0; }
.tile-label { font-size: 0.72rem; font-weight: 600; color: var(--paper-text-2); }
.tile-value { margin-top: 4px; font-size: 1.25rem; font-weight: 700; color: var(--paper-text);
              font-variant-numeric: tabular-nums;
              white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tile-sub   { margin-top: 2px; font-size: 0.72rem; color: var(--paper-text-3); }
```

`auto-fit` with `minmax(150px, 1fr)` reflows without a single media query.

**The number is not coloured.** Tint the value green or red and you have said
"good" or "bad" about a figure that may be neither. Put the judgement in
`.tile-sub` ("+12% vs last run") where it can be worded.

A dark variant exists for a hero row (`background: var(--ink-tile)`, inverted
text ramp). Use it for one row at the top of a page, never for tiles inside a
card — a dark tile on a white card is a hole in the page.

## Status: dot, pill, text

Three weights of the same idea. Pick by how loud it needs to be.

```css
/* Quietest — a dot before a label */
.conn-state { display: inline-flex; align-items: center; gap: 7px;
              font-size: 0.8125rem; font-weight: 600; color: var(--paper-text-2); }
.conn-state::before { content: ''; width: 8px; height: 8px; border-radius: 50%;
                      background: var(--paper-text-3); }
.conn-state[data-state='ok']::before  { background: var(--state-success); }
.conn-state[data-state='bad']::before { background: var(--state-danger); }
.conn-state[data-state='busy']::before { animation: pulse 1s ease-in-out infinite; }

@keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }

/* Louder — a filled pill */
.pill { display: inline-flex; align-items: center; gap: 4px;
        padding: 2px 8px; border-radius: 999px;
        font-size: 0.7rem; font-weight: 600; white-space: nowrap; flex-shrink: 0; }
.pill-success { background: var(--pill-success-bg); color: var(--pill-success-text); }
.pill-warning { background: var(--pill-warning-bg); color: var(--pill-warning-text); }
.pill-danger  { background: var(--pill-danger-bg);  color: var(--pill-danger-text); }
.pill-neutral { background: var(--pill-neutral-bg); color: var(--pill-neutral-text); }

/* Quietest of all — coloured text */
.status.is-ok  { color: var(--state-success-text); }
.status.is-bad { color: var(--state-danger-text); }
```

**The state goes in a data attribute, the styling reads it.** `data-state="ok"`
instead of `class="is-ok"` means the DOM says what is true and CSS decides how
loud that is — and a test can assert on it.

Pills are tinted background plus dark text, never saturated fill with white
text. A row of saturated pills in a table drowns the data next to them.

## Dropdown / popover

See `02-shell.md` for positioning. Item spec:

```css
.dropdown-item {
  display: flex; align-items: center; gap: 12px; width: 100%;
  padding: 10px 12px; border-radius: 8px;
  background: transparent; border: none;
  color: var(--paper-text); text-decoration: none;
  font: inherit; font-size: 0.9em; font-weight: 500; text-align: left;
  cursor: pointer;
  transition: background 0.12s ease, color 0.12s ease;
}
.dropdown-item:hover { background: var(--paper-3); }
.dropdown-item .icon { width: 20px; height: 20px; color: var(--paper-text-3); flex-shrink: 0; }
.dropdown-item:hover .icon { color: var(--brand); }

.dropdown-item.is-danger { color: var(--state-danger-dark); }
.dropdown-item.is-danger:hover { background: var(--danger-tint); }

.dropdown-divider { height: 1px; background: var(--paper-border); margin: 4px 6px; }
```

Menu padding `6px`, item radius `8px` inside a `12px` container — the inset
keeps the hover fill from touching the container edge.

Destructive items go last, after a divider, and are the only red thing in the
menu.

## Tooltip

```css
.tooltip {
  position: absolute; z-index: 5;
  min-width: 200px; max-width: 300px;
  padding: 10px 12px;
  border: 1px solid var(--paper-border); border-radius: 8px;
  background: var(--paper);
  box-shadow: var(--shadow-tooltip);
  font-size: 0.75rem; color: var(--paper-text-2);
  pointer-events: none;
}
.tip-title { margin-bottom: 6px; font-weight: 600; color: var(--paper-text); overflow-wrap: anywhere; }
.tip-rows  { display: grid; grid-template-columns: auto auto; gap: 2px 14px; margin: 0; }
.tip-rows dt { color: var(--paper-text-3); }
.tip-rows dd { margin: 0; text-align: right; color: var(--paper-text); font-variant-numeric: tabular-nums; }
```

A light tooltip, not the usual dark one — it is content, so it follows the paper
rules. `pointer-events: none` is required or it will fight the cursor that
summoned it.

`overflow-wrap: anywhere` on the title: file names and IDs have no spaces to
break at.

## Filter row

The pattern above every data table. One `<div role="search">`, `flex-wrap`,
`align-items: flex-end` so labelled and unlabelled controls sit on one baseline.

```css
.filters { display: flex; flex-wrap: wrap; align-items: flex-end; gap: 10px 12px; margin-bottom: 14px; }
.filters input, .filters select { height: 36px; }
.filters .field { flex: 0 1 auto; }
.filters .field-grow { flex: 1 1 240px !important; min-width: 220px; }
```

Three behaviours that make a filter row feel finished:

1. **A "Clear filters" button that is hidden when nothing is filtered.**
2. **A live result count** in an `aria-live="polite"` region: "12 of 120 match".
3. **Matching rows stay visible; non-matching rows dim rather than vanish** when
   they are plotted on a chart beside the table (`opacity: 0.18`). Seeing what
   was excluded is most of the value of filtering.

Under 860px let the fields grow (`flex: 1 1 140px`) and take full width.

## Empty states

```css
.empty { padding: 18px 12px; text-align: center; font-size: 0.8125rem; color: var(--paper-text-3); }
```

Always distinguish three cases; they need different words:

| Case | Message |
|---|---|
| Nothing exists yet | "No token usage recorded yet. Process a file and each run appears here." |
| A filter excluded everything | "No data run matches these filters." |
| The request failed | The actual error, not a generic apology. |

The first tells the user what to do next. The second tells them to widen the
filter. Collapsing all three into "No data" wastes the only moment the screen
had the user's attention.
