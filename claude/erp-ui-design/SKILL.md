---
name: erp-ui-design
description: Design and build dense, dark-chrome ERP / admin / back-office interfaces — app shells with a sidebar and topbar, data tables, filter rows, forms, KPI tiles, status pills and analytics charts. Use when building or reviewing an internal business tool, admin panel, operations console or dashboard, when asked to make a UI "look like a real ERP" (SAP / Oracle / Dynamics) rather than a consumer SaaS, or when a screen must stay readable through a full working day. Covers a two-surface token system (dark chrome, white content), layout, component specs, chart rules and an accessibility checklist.
---

# ERP UI design

A complete design system for internal business software, extracted from a
production ERP front end. It is opinionated on purpose: the decisions below
were made for operators who sit in front of the same five screens for eight
hours, not for a landing page that has to win a first impression.

## The one idea everything follows

**Chrome is dark. Content is white. The accent only marks state and action.**

The sidebar and topbar are near-black and recede. Every surface that holds
something a person reads, compares or edits — cards, tables, dropdowns, form
fields — stays white. One brand accent marks the selected item, the primary
action and the data series, and nothing else.

This is what separates an ERP from a consumer dashboard. A consumer dashboard
uses colour to create delight. An ERP uses colour as a *signal*, so when
something is red it means something. Spend the accent anywhere else and you
have spent the only tool you had for saying "look here".

## How to use this skill

1. **Read `references/01-foundations.md` first, always.** It has the token
   system. Every value in the rest of the system is expressed in those tokens,
   and writing a raw hex is the single most common way this design system rots.
2. Pull the file you need for the task:

   | Task | File |
   |---|---|
   | Palette, type scale, spacing, radii, motion | `references/01-foundations.md` |
   | Page skeleton, sidebar, topbar, responsive | `references/02-shell.md` |
   | Cards, buttons, forms, tables, tiles, pills, dropdowns | `references/03-components.md` |
   | Any chart, sparkline or data visual | `references/04-charts.md` |
   | Reviewing UI, or before calling work done | `references/05-checklist.md` |

3. Copy `assets/theme.css` in as the project's first stylesheet, then swap the
   six brand values at the top for the client's colour. Everything downstream
   re-tints automatically.
4. Start a page from `assets/shell-skeleton.html`. The inline script in its
   `<head>` is not optional — see "Anti-flash" in `references/02-shell.md`.

## Non-negotiables

These are the rules that, when broken, make the result stop looking like an
ERP. Apply them without being asked.

- **Never write a raw hex outside the token file.** If a colour is needed that
  no token covers, add a token. A palette with 90 one-off hex values is not a
  palette.
- **An accent needs two values, one per surface.** A brand colour chosen to
  read on white will be invisible on near-black. The reference red is `#b3121b`
  on paper and `#f2555e` on ink. Always define both.
- **Numbers get `font-variant-numeric: tabular-nums`.** Every figure in a
  table cell, KPI tile, axis label or tooltip. Without it, columns of numbers
  jitter as they update and become unreadable at a glance.
- **Density is the point.** Base font-size is 13px, table rows are 8px/12px.
  Comfortable consumer spacing means a third as many rows per screen, which
  for an operator is a real cost, not a matter of taste.
- **Focus is always visible, always `:focus-visible`.** Keyboard is the primary
  input for data entry work. Never `outline: none` without a replacement.
- **Motion is 0.12s–0.22s, and honours `prefers-reduced-motion`.** Anything
  slower is felt as lag by someone doing the same action 200 times a day.

## What this system deliberately refuses

Say so, briefly, if asked for one of these — then offer the alternative.

- **Glassmorphism, heavy shadows, large border radii on content.** They cost
  contrast and legibility, which is the whole budget here.
- **Colour as decoration.** A chip is only coloured if the colour means
  something a user must act on.
- **A blue "info" state**, when the brand accent is red. Two similar-weight
  hues competing for "this is important" reads as noise. The reference system
  uses neutral ink for info instead. If the brand *is* blue, invert this.
- **Icon-only buttons without a label or `aria-label`.** In a tool people are
  trained on, an unlabelled icon is a support ticket.
