---
name: erp-ui-design
description: Design and build dense, dark-chrome ERP / admin / back-office interfaces — app shells with a sidebar and topbar, data tables, filter rows, forms, KPI tiles, status pills and analytics charts. Use when building or reviewing an internal business tool, admin panel, operations console or dashboard, when asked to make a UI "look like a real ERP" (SAP / Oracle / Dynamics) rather than a consumer SaaS, or when a screen must stay readable through a full working day.
---

# ERP & back-office

A complete design system for internal business software, extracted from a
production ERP front end. It is opinionated on purpose: the decisions below were
made for operators who sit in front of the same five screens for eight hours,
not for a landing page that has to win a first impression.

## The domain thesis

**Chrome is dark. Content is white. The accent only marks state and action.**

The sidebar and topbar are near-black and recede. Every surface that holds
something a person reads, compares or edits — cards, tables, dropdowns, form
fields — stays white. One brand accent marks the selected item, the primary
action and the data series, and nothing else.

This is what separates an ERP from a consumer dashboard. A consumer dashboard
uses colour to create delight. An ERP uses colour as a *signal*, so when
something is red it means something. Spend the accent anywhere else and you have
spent the only tool you had for saying "look here".

## What this pack adds on top of core

Core already requires per-surface accents, visible focus, tabular numerals and
honest axes. This pack decides the things core deliberately leaves open:

- **Density.** 13px base, `8px 12px` table cells, 20+ rows visible at 1080p.
  Comfortable consumer spacing means a third fewer rows per screen, which for an
  operator is a real cost rather than a matter of taste.
- **Surface assignment.** Chrome dark and content white, permanently and
  simultaneously — not a theme toggle.
- **Corner radii inverted from the usual.** Chrome is *sharper* than content
  (2–4px against 6–12px). Square corners on the shell read as structural, a
  window frame; soft corners on content read as touchable. Getting this backwards
  is what makes an ERP look like a consumer app wearing a dark theme.
- **A flat elevation model.** Borders separate things; shadow is reserved for
  what genuinely floats. The shell itself never has one.
- **One container.** A card, with a consistent head. No panel/box/section
  variants — a dense page stays scannable because every container is the same
  shape.

## Non-negotiables

Apply these without being asked.

- **Never write a raw hex outside the token file.** If a colour is needed that
  no token covers, add a token.
- **Density is the point.** Do not quietly relax it because a screen looks
  tight. Offer a density toggle instead.
- **`tabular-nums` on every figure.** Tables, tiles, axis labels, tooltips.
- **Motion is 0.12s–0.22s.** Anything slower is felt as lag by someone
  performing the same action 200 times a day.
- **One primary button per card.** Two accent-filled buttons and the accent
  stops meaning "the action".
- **The number on a KPI tile is never coloured.** Tinting it green or red passes
  judgement on a figure that may be neither; put the judgement in the sub-line
  where it can be worded.

## What this pack deliberately refuses

Say so briefly if asked for one of these, then offer the alternative and build
whatever is decided.

| Request | Cost | Offer instead |
|---|---|---|
| Glassmorphism on cards | Contrast on the data, which is the whole budget | A border and a flat off-white fill |
| Bigger, airier spacing | A third fewer rows per screen | A density toggle, defaulting to compact |
| A colour per module | The accent stops signalling state | One accent; distinguish by icon and label |
| 16px rounded cards | Reads consumer, not operational | 8px — soft without being playful |
| Animated page transitions | Felt as lag at the 200th repetition | Instant navigation with a 150ms content fade |
| Icon-only buttons, no label | A support ticket, in a tool people are trained on | An icon with a label, or a real accessible name |

If they hear the cost and still want it, build it. It is their product.

## Getting started on a new project

1. Copy `assets/theme.css` in as the first stylesheet, then swap the accent
   block for the client's colour — and recompute the on-dark value.
2. Start the page from `assets/shell-skeleton.html`. The inline script in its
   `<head>` is not optional; see the shell reference.
3. Keep the stylesheet order: theme → shell → page.

## How to use this skill

Read **`core/`** for the rules that hold for any interface, and **`pack/`**
for what this domain decided. A pack file never repeats a core rule, so when the
two are both relevant you need both.

Start with `core/01-tokens.md`, `core/03-layout.md`, `core/08-review.md`.

### Core — applies to every interface

| File | Holds |
|---|---|
| `core/01-tokens.md` | Tokens |
| `core/02-typography.md` | Typography |
| `core/03-layout.md` | Layout |
| `core/04-motion.md` | Motion |
| `core/05-accessibility.md` | Accessibility |
| `core/06-i18n.md` | Internationalisation |
| `core/07-charts.md` | Charts |
| `core/08-review.md` | Review |

### Pack — this domain

| File | Holds |
|---|---|
| `pack/01-surfaces.md` | Surfaces, palette and scales |
| `pack/02-shell.md` | The shell - sidebar, topbar, responsive |
| `pack/03-components.md` | Components |
| `pack/04-charts.md` | Charts - the ERP layer |
| `pack/05-checklist.md` | Domain review checklist |

### Assets

| File | What it is |
|---|---|
| `assets/theme.css` | the token file - drop into a new project |
| `assets/shell-skeleton.html` | page skeleton, including the anti-flash script |

Before calling any work done, run `core/08-review.md` and then
`pack/05-checklist.md`.

<!-- Generated by tools/build.mjs from core/ and packs/erp/. Do not edit. -->
