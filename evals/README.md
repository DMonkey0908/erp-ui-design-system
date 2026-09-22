# Evals

`docs/ARCHITECTURE.md`, open decision 5: *"nobody has yet installed the
generated skill and built a screen from it end to end."*

This directory is how that stops being true. Every rule in `core/` and `packs/`
was extracted from shipping code, so the *content* has evidence behind it. The
**packaging** has none: whether a generated build actually lets an assistant
produce a passing screen is an open question, and it stays open until somebody
builds one and counts what went wrong.

## What an eval measures

Not "is the output pretty". Three things, in order of how much they matter:

1. **Does the build answer the questions that come up?** Every time the
   assistant had to invent something the references did not cover, that is a
   gap — and the gap is the finding, not the invention.
2. **How many rules get broken anyway?** Score the result against
   `core/99-review.md` and the pack's own checklist. A rule that is present,
   loaded and still violated is a rule that is written wrong, buried, or asking
   for something the rest of the system makes hard.
3. **Do the sources contradict each other?** Two files disagreeing is the exact
   failure this repo's architecture exists to prevent, and it is invisible
   until someone tries to follow both.

## Running one

1. Pick a task from `tasks/`. Each one names a pack and a screen.
2. Work **only from the generated build** in `dist/`, as an installed skill —
   not from `core/` and `packs/`. Reading the sources defeats the point: the
   thing under test is the build.
3. Follow the build's own instructions in the order it gives them, and keep a
   note every time you have to look something up, guess, or reconcile two
   files.
4. Put the output in `runs/<date>-<task-id>/`, with a `result.md`.

## What a `result.md` records

- **Findings**, each one actionable against a specific file. A finding is not
  "the docs could be clearer" — it is, to quote the first run, "the page
  template marks up `.sidebar` and `pack/02-shell.md` ships CSS for
  `.erp-sidebar`, so the documented path produces an unstyled page".
- **The checklist score**, as items passed over items applicable. Items the
  screen could not exercise are excluded and said so, rather than counted as
  passes.
- **Every place the build was silent** and the assistant invented a value.

## The honesty note

A run administered by whoever wrote the rules is worth less than one that is
not, because they cannot un-know the system and are therefore not testing the
part that matters most: whether a cold reader gets there. Runs record who
administered them. Treat a self-administered run as a test of the *references*
and not of the *activation* — it says whether the answers are in there, not
whether an assistant would have gone looking.
