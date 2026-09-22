# Research

Where the evidence for a rule comes from, and where to look before writing a
pack.

The bar in this repo is a **reason, not a preference** — ideally something
somebody watched break. That bar is easy to state and hard to meet at 11pm with
a half-written reference file, which is when a rule quietly becomes a taste.
This file is the shortlist that makes meeting it cheaper.

## What to look at, and what each one is good for

Ranked by how much a pack author can actually use them.

### Shipping products, as flows

**[Mobbin](https://mobbin.com)** — screenshots of real iOS, Android and web
apps, organised by *flow* rather than by screen: onboarding, checkout, search,
settings, empty states, permission prompts.

This is the one that matters, because it shows what shipped after the
constraints landed. A pack thesis is a claim about what a domain has to do; the
strongest way to test it is fifteen products in that domain, and whether they
agree with you.

Look at the unglamorous flows. Every product looks considered on its marketing
page and reveals itself at "you have no invoices yet", "your card expired", and
"this took eight seconds".

### Craft at the high end

**[Godly](https://godly.website)** and **[Land-book](https://land-book.com)** —
curated web design, heavy on typography, grid and WebGL.

Use these for *how far a treatment can be pushed*, not for what to build. They
are selected for distinctiveness, which is the right criterion for a portfolio
and the wrong one for a back-office tool that somebody sits in for eight hours.

**[Awwwards](https://www.awwwards.com)** and **[FWA](https://thefwa.com)** —
the same caveat, one notch further. Useful for seeing where interaction
technique is going. Do not source density, information hierarchy or form design
here.

### The industry systems

Read these for **structure and vocabulary**, not for values — their values
belong to their brand, and copying them is how a product ends up looking like a
Material template with a different accent.

| System | Best at |
|---|---|
| [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/) | Input ergonomics per device class, stated as constraints rather than suggestions. The reference for anything touch, watch, TV or spatial. |
| [Material Design 3](https://m3.material.io) | Token architecture, elevation, motion specs. The most complete public worked example of a token system. |
| [Shopify Polaris](https://polaris.shopify.com) | Writing in interfaces. Error messages, empty states, button labels — the part most systems skip. |
| [Atlassian Design System](https://atlassian.design) | Dense, long-session product UI. Closest public relative of what `erp` is about. |
| [Untitled UI](https://www.untitledui.com) | Component coverage and naming, as a checklist against gaps. |

### What not to use

**Dribbble and Pinterest.** Not because the work is bad, but because the
selection pressure is wrong: a shot is optimised to be legible as a thumbnail
in a feed, with invented data, no empty state, no error state, no long strings,
no eleventh row. Sourcing an interface from them produces a design that has
never met a user or a database.

## Case studies worth reading properly

Four products where a specific decision is visible in the outcome. Each is
listed with the pack thesis it supports, because that is what a pack author
needs from it.

### Stripe — the customer is the integrator

The decision: in online payments, the person whose opinion decides the sale is
not the one typing a card number, it is the engineer integrating the API. So
developer experience *is* the product's user experience — documentation you can
execute in the browser, error codes that name the cause and link the fix rather
than apologising.

**Supports:** a developer-tools pack, and the general principle that a domain's
real user is sometimes not its end user. Also the best public example of error
messages written as though somebody has to act on them.

### Monzo and Revolut — friction, applied asymmetrically

The decision: strip friction out of the ninety-nine everyday actions with
silent biometric auth, and then deliberately **put it back** in front of the
irreversible ones. A transaction map with the merchant's own logo; balance
changes announced the moment they happen; Pots, which are a savings product
made comprehensible by being drawn as containers.

**Supports:** a fintech thesis that `consumer-web` would reject outright, since
that pack exists to remove friction. "Friction is a feature, applied
asymmetrically" is falsifiable, and another domain argues with it, which is
what a thesis has to be.

### Craft — block architecture with no perceptible latency

The decision: every unit of the document is a block that can be dragged,
nested and restructured without a visible delay, and the formatting controls
appear at the cursor rather than in a chrome bar. The editor never takes the
user's attention away from the text to ask for it back.

**Supports:** a writing-tool or document pack, and — for any pack — the
argument that contextual controls beat a permanent toolbar once the surface is
about content.

### Procreate Dreams — invent the interaction from the hardware

The decision: rather than shrink a desktop animation timeline onto a tablet,
work out what the hardware is actually good at. "Performing" records the
trajectory of a finger dragging an object in real time and turns it into
keyframes — an interaction that has no desktop equivalent because it needs
direct touch to exist.

**Supports:** every device-class pack, and the strongest available argument
against porting an interaction model across form factors. The lesson is not
"use gestures", it is: *ask what this hardware does that no other hardware
does, before deciding what the screen looks like.*

## Using this when writing a pack

1. **Find five products in the domain**, in Mobbin or in use. Not the famous
   one — five, including at least one that is unfashionable and well-used.
2. **Write down where they agree.** Agreement across five competitors is
   usually a constraint rather than a convention, and constraints are what a
   thesis is made of.
3. **Write down where they disagree, and pick a side.** This is the pack. A
   thesis nobody could argue with is core, or it is nothing —
   [`AUTHORING.md`](AUTHORING.md) has the test.
4. **Find the failure.** For each rule, name what breaks without it. If you
   cannot, it is a preference; either find the failure or drop the rule.
