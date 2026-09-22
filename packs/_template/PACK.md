<!--
  Template pack. Copy this directory to packs/<your-id>/ and fill it in.
  `_`-prefixed directories are skipped by the build.

  PACK.md has NO frontmatter — the build generates it from pack.json.
  Start at the H2 level; the build supplies the H1.

  Everything below is a prompt, not boilerplate. Delete a section rather than
  leaving it generic: an empty heading costs the reader more than its absence.
-->

One paragraph on what this domain is and who it is for. Name the constraint that
makes it different — who the reader is, how often they see the screen, what they
are trying to finish. The ERP pack's version is "operators who sit in front of
the same five screens for eight hours"; yours should be equally concrete.

## The domain thesis

> One sentence, in bold, that a reader could apply without reading further.

Then two or three paragraphs defending it. The thesis must be **falsifiable** —
a statement another domain would reasonably reject. "Use good spacing" is not a
thesis. "Chrome is dark, content is white, the accent only marks state and
action" is, because a marketing site would refuse it.

If you cannot write a thesis another pack would argue with, this is probably not
a separate pack. Consider whether it is a variant of an existing one.

## What this pack adds on top of core

Core already fixes the universal rules — read `core/CORE.md` before writing
this. List only the decisions core deliberately leaves open:

- **Density.** What base size, what row height, and why this domain needs it.
- **Surface assignment.** Which of chrome / canvas / content / floating are
  light, dark, or something else.
- **Radii and elevation.** How much softness, how much shadow, and what that
  says to the user.
- **The component set.** Which containers exist, and — more usefully — which
  ones you refused to add.

## Overrides

If this pack contradicts a core rule, say so here, name the rule, and give the
reason. Then record it in `pack.json` under `core.overrides`.

An override is legitimate — a domain may genuinely need one. What is not
legitimate is contradicting core silently, because then two files disagree and
a reader cannot tell which is current.

Note that the core accessibility minimums and the chart honesty rules are not
overridable: their cost lands on someone who is not in the room.

## Non-negotiables

Three to six rules an assistant should apply without being asked. Each needs a
**consequence**, not a preference:

- **Rule.** What breaks without it, concretely enough to picture.

If you cannot name what breaks, it is a default, not a rule. Put it in the
reference file instead.

## What this pack deliberately refuses

| Request | Cost | Offer instead |
|---|---|---|
| The thing people ask for | What it costs, in this domain's terms | The nearest thing that works |

This table is the most-used part of a pack in practice. It is what lets an
assistant push back usefully instead of either complying silently or refusing
flatly.

Close with the standing rule: if they hear the cost and still want it, build it.

## Getting started on a new project

Three to five numbered steps. Where to copy the tokens from, what to swap, what
order the stylesheets load in, and the one thing people skip.
