# Battle of the Bands Vote Helper

Accessible launcher for WDIV's 2026 Battle of the Bands poll (America's Thanksgiving Parade).
Goal: let a voter with a disability vote for **Wayne Memorial High School Zebra Marching Band** as easily as anyone else.

- Voting window: Thu Nov 26 2026 6 a.m. → Sun Nov 29 2026 12 p.m. ET
- Official poll: https://xp.audience.io/poll/1936340

## Run

```sh
npx serve .        # or open index.html directly in a browser
```

## Use

One giant **Vote again** button above the ballot: tap it to reload the ballot, pick the Zebras, repeat.
High contrast, visible focus ring, works with keyboard (Tab + Enter), switch access, and screen readers.
After voting closes the button says "Voting is over".

## Scope

The user casts every vote by hand. This app does **not** auto-submit, clear cookies, spoof devices, or get around any limits the poll sets.
If the poll won't load inside the frame, use "Open in new tab".
