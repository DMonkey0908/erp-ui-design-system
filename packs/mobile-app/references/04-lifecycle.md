# Interruption, state, offline and permissions

The half of this pack that is not about pixels. A phone app runs in a hostile
environment — it loses the foreground, loses the network, and gets killed
without being asked — and a screen that ignores that is correct in a simulator
and broken in a pocket.

## Assume the process dies between any two frames

The operating system reclaims memory from backgrounded apps, and it does not
negotiate. The user does not experience this as a crash: they experience it as
*"I came back and it had forgotten what I was doing."*

What has to survive:

| State | Where it belongs |
|---|---|
| What they typed | Persisted on change, debounced. Not held in memory |
| Which screen they were on, and the stack under it | Restored on launch, not reset to the root |
| Scroll position in a long list | Restored to the item, not to a pixel offset |
| Which step of a multi-step flow | Persisted per step, so a resumed flow starts at the right one |
| A partly-filled form in a sheet | Restored *with the sheet*, or explicitly discarded with the user's agreement |

What must **not** survive: anything sensitive that a person picking up the
phone should not see, and anything that stops being true — a fetched balance, a
countdown, an auth token past its life.

The practical rule: **save on change, restore on launch, and never on a timer.**
A thirty-second autosave loses twenty-nine seconds of typing at the worst
possible moment.

### The resume moment

Coming back to an app that has been away for a while is its own design problem,
not just a restoration problem.

- **Under a few minutes:** return exactly where they were and change nothing.
  Re-fetching and re-rendering is the app appearing to lose their place.
- **Longer than that:** return to the same place, then refresh the data
  underneath without moving what they were looking at. Never scroll them.
- **Long enough that the screen could mislead:** show the state is stale rather
  than showing a number that is wrong. A stale figure with a timestamp is
  honest; a stale figure that looks live is not.

## Offline is a normal condition, not an error

Lifts, trains, basements, rural roads, a prepaid plan that ran out. An app that
treats no network as an exceptional failure will spend a lot of its life in an
exceptional failure.

- **Show what you have.** Cached content, marked with when it was fetched.
  Blank is worse than old, as long as old admits to being old.
- **Queue the write and say so.** The action appears to succeed, is marked as
  pending, and is sent when there is a network. This is core's optimistic
  update, and the three conditions in `08-feedback.md` apply unchanged —
  including that a failure announces itself rather than quietly undoing.
- **Three outcomes, not two.** Sent, queued, and *rejected after being
  queued* — the third has no desktop equivalent and it is the one that gets
  forgotten. Each lands on a different surface:

  | Outcome | Where the user learns it |
  |---|---|
  | Sent | The row's own state changes. Nothing else is owed |
  | Queued | The row shows pending, and the one offline indicator counts it |
  | Rejected after queueing | The row returns to what it was, and a message says which item and why — not a generic failure, because by now the user has done several other things and cannot infer which one |

  A rejection arrives minutes after the action, so it cannot be shown as an
  inline error on a screen the user has left. It needs to survive being
  noticed later: a message they can act on, and a row that is visibly back to
  its old state rather than silently reverted.

- **One indicator, not one per row.** A single banner saying the app is offline
  and what is queued. Twenty pending badges is noise.
- **Never a blocking full-screen error** for a request that could be retried in
  the background. The user cannot fix the tunnel.
- **Distinguish no network from server failure.** They call for different
  actions, and "Something went wrong" covers both while helping with neither.

## Permissions are a flow, not a dialog

The system permission prompt can be shown once. Users deny by reflex when a
prompt arrives without context, and a denial is expensive to reverse: it means
sending them into Settings.

The sequence that works:

1. **Never ask on launch.** A prompt before the app has done anything is a
   prompt with nothing to weigh against.
2. **Ask at the moment of use**, when the user has just tried to do the thing
   the permission is for. "Add a photo" → then the prompt.
3. **Pre-ask in your own UI first**, in a sentence, with a real Not now. This
   costs one screen and preserves the system prompt for people likely to say
   yes.
4. **Handle no gracefully and permanently.** The feature degrades, it does not
   nag. If it genuinely cannot work, say what is missing and offer a link to
   Settings — do not repeat the request.
5. **Never block the app on an optional permission.** Notifications, contacts
   and location are almost always optional, and an app that will not proceed
   without them gets deleted rather than granted.

## Launch

- **A static launch image that matches the first frame of the real screen.**
  Not a logo, not an animation. The point of it is to make the app feel like it
  was already open, and anything that draws attention to itself does the
  opposite.
- **The first screen is the app, not an interstitial.** Onboarding, rating
  prompts and what's-new screens all belong later, after the app has done
  something useful.
- **Restore before the first frame**, the way core `03-layout.md` requires —
  theme, language, and which tab they were on. Applied afterwards, the user
  watches the app correct itself every single launch.

## Notifications

- **One category per kind of thing**, so a user can keep the ones they want and
  silence the rest. An app with a single on/off switch gets switched off.
- **A notification links to the exact screen**, with a synthesised back-stack
  behind it — see `02-navigation.md`. Landing on a home screen after tapping a
  notification is the notification failing.
- **Nothing marketing-shaped through a channel the user enabled for
  transactional messages.** That is the decision that gets the whole category
  disabled, and the useful ones go with it.

## Battery, data and heat

These are design constraints on a phone in a way they are not on a desk.

- **No polling loop that outlives the screen.** A timer left running in a
  backgrounded screen is a battery complaint with a one-star review attached.
- **Images sized to the display, not to the source.** Downloading a 4000px
  photograph to draw it at 120pt spends the user's data allowance on pixels
  nobody sees.
- **Anything continuous — camera, location, a live map — is stopped when the
  screen is not visible.** Device heat is something the user feels in their
  hand, and they attribute it correctly.
- **Respect the low-power condition.** When the system says the battery is low,
  drop non-essential animation and background refresh rather than continuing as
  though nothing changed.
