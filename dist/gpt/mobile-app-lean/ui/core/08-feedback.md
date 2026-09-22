# Feedback

`04-motion.md` governs how a thing moves once it is moving. This file governs
something else: what the interface owes the user **between the click and the
answer**, and how that debt grows with the wait.

The two get confused because both are measured in milliseconds. An animation
duration is a design choice. A response time is a fact you are handed, and the
only decision left is what to show while it elapses.

## The clock picks the affordance

Measure the work, then pick the row. Do not pick by how important the action
feels.

| Elapsed | Show |
|---|---|
| **< 100ms** | Nothing. The result is already there; it reads as direct manipulation. |
| **100 – 300ms** | The control's own busy state. No overlay, no spinner — the thing the user touched acknowledges the touch. |
| **300ms – 1s** | A spinner **inside the region that is about to change**, at the size of the thing it replaces. |
| **1s – 5s** | A skeleton at the real dimensions of the content. |
| **> 5s** | Determinate progress — a percentage or a count — and a way to cancel. |

Three of these go wrong constantly:

- **A spinner under 300ms makes the interface slower.** It appears, the user
  registers it, it vanishes. A flash of "waiting" where there was no wait reads
  as a stutter. If the work is usually fast and occasionally slow, delay the
  spinner by ~300ms rather than rendering it immediately.
- **A spinner past a second is an apology with no information.** It says
  something is happening and nothing about what or how long. A skeleton says
  both, because it has the shape of the answer.
- **Indeterminate progress past five seconds is abandonment.** A user who cannot
  tell 10% from 90% cannot decide whether to wait, and a bar that has been
  ambiguous for thirty seconds is indistinguishable from a hang.

A skeleton is only honest at the real dimensions. A generic grey box that
collapses into a different layout is a spinner with extra steps — see the
space-reservation rule in `03-layout.md`, which this is the same argument for.

## Why the bands break where they do

Under **100ms** a response is attributed to the user's own action. Past it, the
user perceives the system as a separate actor that is responding.

The **Doherty threshold** — roughly 400ms — is where the interaction stops being
a conversation and starts being a queue. Below it, attention stays on the task;
above it, attention leaves, and the cost is not the 400ms, it is the time the
user spends coming back.

This is why the bands tighten around the actions people repeat. A 900ms save on
something done once a day is nothing. The same 900ms on a filter someone
adjusts forty times an hour is the reason they stop adjusting it, and the
feature is dead without anyone filing a bug.

## An optimistic update needs all three

Rendering success before the server confirms it is correct for a like button
and wrong for a transfer. The test is not "is it fast" — it is whether all
three hold:

1. **It nearly always succeeds.** Not "should" — measured.
2. **Failure is cheap.** Nothing downstream has acted on the assumption.
3. **It can be reversed in the interface**, without a reload and without the
   user re-entering anything.

Delete all three and the cost is a user who believes something happened that
did not.

When it does fail, **the rollback is announced, not silent.** Reverting the
state and saying nothing produces the worst outcome available: the user saw it
work, looks again, and now distrusts every other state on the screen. Restore
the value, say what failed, and leave their input where they can retry it.

```
optimistic    → render the new state, keep the previous one
on failure    → restore it, surface the reason, preserve the user's input
never         → restore it and stay quiet
```

## Every interaction has four parts, and two are usually missing

A complete interaction — a toggle, a save, a drag, a pull-to-refresh — has the
same four parts. Work through them in order; the failures cluster in the two
nobody writes down.

| Part | Question it answers |
|---|---|
| **Trigger** | What starts this, and can the user tell it exists, what it does and what state it is in? |
| **Rules** | What is allowed, in what order, and what happens at the edges — empty, one item, too many, offline, already running, triggered twice? |
| **Feedback** | How does the user learn which rule just applied? Visual, audible or haptic. |
| **Loops and modes** | How long does it persist, does it repeat, and what does it look like the hundredth time? |

**Rules** is where the bugs live, because rules are invisible until one is
wrong. Double submission, an action fired on an item that vanished under it,
a confirm dialog that runs the action twice — none of these are feedback
problems.

**Loops and modes** is where the charm becomes the cost. A mode that changes
what the surrounding controls do must be visible and must be escapable, or the
user issues the right command into the wrong mode — and blames themselves.

## Design for the hundredth time, not the first

Any flourish attached to a repeated action is seen hundreds of times by the
people who use the product most. A confetti burst on the first invoice is a
gift; on the four-hundredth it is a delay standing between someone and their
job.

Two ways out, both better than removing it: decay it — full the first few
times, reduced after — or attach it to the milestone rather than to the
repetition. The rule in `04-motion.md` about repeated interactions being the
fastest thing on screen is the same principle applied to duration.

## Spend the attention at the peak and at the end

People do not remember an average. They remember the most intense moment of an
experience and how it ended, and they rate the whole against those two.

Practically, that redirects the polish budget:

- **The error at the final step outweighs everything before it.** A failure on
  confirm erases a flow that was pleasant up to that point, so the recovery path
  from the last step deserves more care than the entrance to the first.
- **Finish deliberately.** An action that completes by having the spinner stop
  has no ending. State what happened, what changed and what is next.
- **The worst moment is a design surface.** Waiting, empty, rejected, expired —
  these are the moments that get remembered, and they are usually the ones
  written last and fastest.
