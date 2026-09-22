# Run 002 — mobile-01, deliveries list and reschedule

| | |
|---|---|
| **Date** | 2026-09-22 |
| **Task** | [`evals/tasks/mobile-01-deliveries.md`](../../tasks/mobile-01-deliveries.md) |
| **Build under test** | `dist/claude/mobile-app-design/` (Claude skill layout) |
| **Administered by** | Claude Opus 5, which had just written the pack |
| **Output** | `index.html`, `tokens.css`, `patterns.css`, `app.css`, `app.js` |

The honesty note in [`evals/README.md`](../../README.md) applies with more
force than it did to run 001: this run was administered by the author of the
pack, on the same day. It tests whether the pack is *complete enough to build
from*. It cannot test whether it reads correctly to somebody else.

## Status

Findings 1–5 were fixed in the commit after this one, and the artefact here was
relinked against the split assets so it still opens. Finding 6 is not a defect
— it records that the pack's override was never exercised, and it stays open
until a run ports a desktop screen.

**Finding 7 was added afterwards, during a review pass, and it corrects this
document's own score.** The accessibility contrast item below was marked passed
without the ratios being computed. Three of them did not pass.

The record below describes what the run found, not what the pack says now.

## Verdict

The pack is buildable, and the two things it exists to enforce both held: the
primary action landed in the reachable arc without anyone arguing for it, and
the interrupted case was designed before the happy path rather than after.

Six findings. Two are real defects in what shipped, three are gaps where the
pack states a behaviour and not its mechanism, and one is a deliberate
asymmetry with `erp` that should be decided rather than left implicit.

---

## Findings

### 1 — `tokens.css` contains component CSS that `tokens.json` does not

The asset says of itself: *"tokens.json is the source. This is a view of it. If
the two disagree, this one is wrong."*

It then ships `.screen`, `.tab-bar`, `.pinned-action`, `.row`, `.pressable` and
a `body` rule — none of which exist in `tokens.json`, and none of which could,
because they are component CSS rather than tokens. The file's own claim about
itself is false on arrival, and the claim is the thing that makes a
platform-neutral token source credible.

**Fix:** move the safe-area helpers and the row and pressable rules into a
second asset, and let `tokens.css` contain only custom properties.

### 2 — No spec for a status marker, and none for a tab badge

`04-lifecycle.md` requires a queued write to be *visible as queued*, and
`core/05-accessibility.md` requires that state not to be carried by colour
alone. Nothing in `03-components.md` says what a status marker looks like, so
this run invented one — a filled dot for the live states and a hollow ring for
queued, which is the part that survives greyscale.

The `erp` pack specifies exactly this, as pills. The mobile version needs its
own, because a pill is too heavy for a row that already carries three lines.

Same gap for the tab badge, and it bit: the first draft shipped a fixed-height
badge, which clips its own digit at the second text-scale step — the failure
this pack's checklist names, in a component the pack does not spec.

**Fix:** a "Status and badges" section in `03-components.md`, with the
no-fixed-height rule attached to it where somebody will read it.

### 3 — The keyboard rule names the bug and not the mechanism

The pack is emphatic that the focused field and its submit button must stay
visible, calls it the most common bug in the domain, and says it does not
reproduce on a simulator with a hardware keyboard. All true, and all of it
leaves the implementer to work out *how*.

The mechanism differs per platform and is not obvious on any of them:
`visualViewport` resize on the web, `KeyboardAvoidingView` in React Native,
`ime` window insets on Android, `.ignoresSafeArea(.keyboard)` and its inverse
on iOS. This run used `visualViewport` and had to reason it out.

For the rule the pack calls its most common bug, naming the four mechanisms is
about eight lines and removes the whole gap.

**Fix:** a mechanism table under the keyboard rule in `03-components.md`.

### 4 — Nothing says what a queued item looks like when it fails to send

`04-lifecycle.md` requires the write to be queued, marked pending and
announced on failure — correctly deferring the optimistic-update conditions to
`core/08-feedback.md`. What neither file settles is the third state: sent,
queued, and *rejected after being queued*, which is specific to offline-first
and has no equivalent on a desktop.

This run showed the rejection in a snackbar and rolled the row back. That is
defensible and it was a guess.

**Fix:** name the three outcomes in `04-lifecycle.md` and say which surface
each one lands on.

### 5 — This pack ships far less copyable CSS than `erp`, and that is a choice

`erp` ships `theme.css` plus a complete `erp-shell.css`, and its component
reference is close to paste-ready. `mobile-app` ships tokens and prose, because
the same screen might be SwiftUI, Compose or React Native, where CSS is not
useful.

The reasoning is sound, but the effect is that this pack is slower to apply on
the one target where CSS *is* the answer — mobile web and React Native Web,
which the pack's own skill description claims to cover.

Not a defect, but it should be decided out loud rather than drifting: either
ship a web-target patterns file, or say in the pack that the web target gets
tokens only and the components are prose everywhere.

**Fix:** decide, and write the decision into `PACK.md`.

### 7 — Three contrast pairs failed, and the run scored them as passing

Found during a review pass after this run was written, by computing every pair
in the palette instead of looking at it.

| Pair | Ratio | Needed |
|---|---|---|
| `text-tertiary` on the light surface | 3.24 | 4.5 |
| `text-tertiary` on the light grouped background | 2.90 | 4.5 |
| `text-tertiary` on the dark raised surface | 4.01 | 4.5 |

These are exactly the failure `core/05-accessibility.md` names — *"'subtle'
grey-on-grey metadata is where this fails most often"* — and the reason they
got scored as a pass is the reason the rule exists: a tertiary grey at 2.9:1
looks the way metadata is supposed to look.

A fourth, separate problem came out of the same pass. The run's row action and
its form fields drew their boundary in `separator`, at **1.42:1**. A separator
is structural and may be a hairline; a border that is the only thing
identifying a tappable control is an interactive boundary, which core holds to
3:1. The two look like the same grey and had the same token.

**Fixed:** `text-tertiary` recomputed to clear 4.5 against the lightest and
darkest surface it lands on, a `border-control` token added at 3:1, and
`01-surfaces.md` now says which line is which and why. The pack checklist gains
the rule that the pairs are computed rather than eyeballed, and so does the
reviewing checklist in `AUTHORING.md`.

**What this says about the method:** a self-administered run scored its own
output against a checklist and passed an item it had not tested. That is the
single strongest argument in either run for why a cold reviewer is worth more
than a careful author.

### 6 — The override never came up

`PACK.md` overrides core's "never remove functionality at a smaller size" with
"absent and linked beats present and unusable". It is the pack's most
consequential claim and this screen did not exercise it, because a deliveries
list is natively a phone screen rather than a port of a desktop one.

Recorded so it is not mistaken for tested. A run that ports a desktop
dashboard is the one that would exercise it, and it is a better second task
for this pack than another native screen.

---

## Checklist score

### `core/99-review.md` — 65 items

| Section | Pass | Fail | n/a |
|---|---|---|---|
| Tokens (4) | 4 | 0 | 0 |
| Type (5) | 4 | 0 | 1 |
| Layout (6) | 6 | 0 | 0 |
| State (5) | 5 | 0 | 0 |
| Loading, empty, error (4) | 3 | 0 | 1 |
| Feedback (6) | 6 | 0 | 0 |
| Input (5) | 5 | 0 | 0 |
| Visual language (4) | 0 | 0 | 4 |
| Accessibility (10) | 8 | 1 | 1 |
| Motion (6) | 5 | 0 | 1 |
| Charts (5) | 0 | 0 | 5 |
| Internationalisation (5) | 4 | 1 | 0 |
| **Total** | **50** | **2** | **13** |

**50 of 52 applicable**, corrected from 51 after finding 7.

Two failures. The first is the same one run 001 had: strings are not marked for
translation. Two runs, two packs, the same miss — which says something about
the rule rather than about the runs, and is worth watching when a third run
lands.

The second is the contrast item, which this document originally recorded as a
pass. It is left as a failure rather than quietly upgraded now that the palette
is fixed, because the run is evidence and a score edited to match a later fix
stops being evidence.

The type exclusion is the 72ch measure: this screen has no running prose.

### `packs/mobile-app/references/05-checklist.md` — 34 items

| Section | Pass | Fail | n/a |
|---|---|---|---|
| Reach (4) | 4 | 0 | 0 |
| Targets and text (5) | 5 | 0 | 0 |
| Safe areas (4) | 4 | 0 | 0 |
| Navigation (6) | 5 | 0 | 1 |
| Gestures (3) | 2 | 0 | 1 |
| The keyboard (4) | 4 | 0 | 0 |
| Sheets and dialogs (3) | 3 | 0 | 0 |
| Lifecycle (6) | 6 | 0 | 0 |
| Platform (3) | 3 | 0 | 0 |
| **Total** | **36** | **0** | **2** |

**36 of 36 applicable.** The two exclusions are deep-link back-stacks and
system gesture regions, neither of which a single-page web artefact can
exercise honestly.

One item passed only after self-review caught it failing: the tab badge's
fixed height, which is finding 2. One more — the control-boundary contrast —
failed and was not noticed until the review pass; it is part of finding 7 and
the checklist gained a line for it.

## What the build did not say, and this run invented

| Invented | Where it should live |
|---|---|
| The status dot convention, filled versus hollow | `pack/03-components.md` (finding 2) |
| The tab badge | `pack/03-components.md` (finding 2) |
| Keyboard inset mechanism | `pack/03-components.md` (finding 3) |
| What a rejected queued write looks like | `pack/04-lifecycle.md` (finding 4) |
| The snackbar's position above the tab bar | `pack/03-components.md` — it specs the snackbar's behaviour, not where it sits |
| A border colour for a control on a matching surface | `pack/01-surfaces.md` — there was one grey for two jobs (finding 7) |

## Reproducing

Open `index.html`. It is built at phone width and, on a large enough window,
draws a device frame and simulates a **non-zero bottom inset**, so the
safe-area handling is visible rather than theoretical.

Worth doing by hand:

- **Move on stop 13** — rigged to be rejected. The row flips to queued, flips
  back, and a snackbar says why.
- **Tap refresh** to toggle offline, then **Move** any stop: it stays visibly
  queued rather than claiming success. Toggle back and watch the queue drain.
- **Type in the note field, close the sheet, reopen it.** The draft is there;
  it is saved on change, not on a timer.
- **Raise the browser's minimum font size** and confirm rows grow instead of
  clipping.
- **Tab through with no mouse**, then switch the OS to dark mode.
- On a phone: open the sheet and focus the note field. The confirm button
  stays above the keyboard.
