# Core

Rules that hold for **every** interface, regardless of what it is for. A
consumer app and a plant-floor console disagree about density, colour and
delight; they do not disagree about whether focus should be visible or whether
a column of numbers should stop jittering.

Core is what every pack inherits. A pack never repeats a core rule — it either
adds domain rules on top, or explicitly overrides a core one and says why.

## What belongs in core

| File | Holds |
|---|---|
| `references/01-tokens.md` | How to build a token system. Naming, surfaces, the two-value accent rule, semantic separation, rebranding. |
| `references/02-typography.md` | Family choice, `rem` vs `em`, how to construct a scale, measure, numerals. |
| `references/03-layout.md` | Grid and flex traps, the responsive method, stylesheet order, pre-paint state. |
| `references/04-motion.md` | Duration bands, easing, and honouring reduced motion correctly. |
| `references/05-accessibility.md` | Focus, keyboard, landmarks, contrast, colour-not-alone, live regions. |
| `references/06-i18n.md` | Marking strings, width headroom, locale formatting, the language-flash guard. |
| `references/07-charts.md` | Scales, axes, hit testing, keyboard access, the table fallback, series colour. |
| `references/08-review.md` | The checklist and the failure modes that recur in every domain. |

## What does not belong in core

- **Any concrete colour, size or spacing value.** Core says "an accent needs a
  value per surface"; a pack says which hexes those are. The moment core
  contains `#b3121b` it has picked a side.
- **Anything a reasonable domain would reverse.** Density is the clearest case:
  an ERP wants 13px and tight rows, a marketing page wants generous air.
  Neither is wrong, so neither goes in core.
- **Component specs.** A card in a back-office tool and a card in a shopping app
  share a name and nothing else.

## The surface-role vocabulary

Every pack describes its palette in these roles, so two packs can be compared
and a reader can move between them.

| Role | What it is |
|---|---|
| **chrome** | Frame that holds the app: nav, toolbars, status bars. Recedes. |
| **canvas** | The page or workspace behind the content. |
| **content** | Any surface holding something read, compared or edited. |
| **floating** | Layers above content: menus, popovers, sheets, toasts. |
| **accent** | The brand signal. One per pack, with a value per surface. |
| **semantic** | Success, warning, danger, info. Distinct from the accent. |

A pack assigns each role a treatment. The ERP pack makes chrome dark and
content white; a consumer-web pack may make both light. The roles stay the same,
which is what lets core talk about them at all.

## Reading order

A pack's `PACK.md` states which core files matter most for its domain. Absent
that guidance: `01-tokens` first, then the file matching the task, then
`08-review` before calling the work done.
