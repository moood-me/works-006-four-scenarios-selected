# closeups — hands and small things close (engine 3)

Shots for the inserts (`insert`) of the world's scenes — what is too small to read on the people (teeth, a match, a
knife, a knot, a palm). No faces. The hands: **Grandmother's** (thin, old, the knuckles big, the dark-blue sleeve,
the grey shawl's edge), **Sophia's** (small, a child's, sunburnt, the coral sleeve short or bare arm), **Papa's**
(long, the green-grey knitted cuff), **Eriksson's** (broad, weathered, the cream knitted cuff). Painted in the
world's flat way (straight-edged shapes, quiet colours); their light is painted (day pearl-grey, the moon's blue,
a candle's or a lantern's warm); the scene's light does not fall on an insert.

## How a scene shows a shot

In the scene's `modules` — `closeups`. The insert's element — its id the shot's name, opened by the key `<shot>_open`
(0 closed … 1 open; in the scene's `states`):

```json
{ "id": "knot", "name": "The knot close", "insert": "knot_open" }
```

`elements/knot.js` (its code — painted once): `e.kit.closeups.paint(g, e, "knot");`

`elements/knot.animate.js` (every frame): `e.kit.closeups.live(e, "knot", { pull: e.state.knot });`

- `paint(g, e, shot)` reads none of the scene's keys. `live(e, shot, now)` — `now` a plain object, its fields as in
  the table (a field missing — its default); it only moves layers and marks the points.
- The background is painted across the widest frame (21:9); the hands, the thing and every point within the middle
  4:3, not low (not under the game's lines).
- A minigame opens and shuts its own insert (`<shot>_open`) and moves its key; a piece opens one where it shows it.

**Status:** named here first (2026-10-28) — the code comes; the points' places are written below when painted.

## Shots

| shot (= element id) | scene | what is in it | `now` (default) | points |
| --- | --- | --- | --- | --- |
| `teeth` | shore (П.3) | Grandmother's false teeth found among the peony roots, Sophia's small fingers holding them up out of the earth | `show` 0…1 (0) — the fingers lift them out of the earth and up | `teeth#teeth` |
| `stems` | shore (М1 `peonies`) | the peonies' stems close, Grandmother's old hand in the earth among them, drawing a stem slowly | `pull` 0…1 (0) — the stem drawn out, the earth parting (М1's `stems`) | `stems#stem` — the stem's end in her hand (moves with `pull`) |
| `knife` | forest (М3 `knife`) | Grandmother's hands: the knife in the right, the driftwood in the left, the shavings curling off; the seal coming out of the wood | `carve` 0…1 (0) — the wood becoming a seal (М3's `carve`); `flaw` 0/1 (0) — one flipper only (the flawed end) | `knife#blade`, `knife#wood` |
| `match` | forest, new house | Grandmother's hands: a match struck from the box, held to the cigarette at the edge of the frame; the thin smoke | `strike` 0…1 (0) — the match struck (its flame from 0.3); `lit` 0…1 (0) — the cigarette's ember catching, the smoke; `night` 0…1 (0) — the painted light by night (the flame the light) | `match#flame` (moves with `strike`), `match#ember` |
| `gunwale` | shore (1.4, М3б `push`) | Eriksson's boat's gunwale, Grandmother's two hands on it as before, the water beyond | `push` 0…1 (0) — the hands push off and open; the boat's side slides away | `gunwale#hands` |
| `knot` | shore (1.5, М3в `net`) | the net's tarred mesh close, a hard knot, Grandmother's fingers at the thread | `pull` 0…1 (0) — the thread drawn out of the knot, at 1 loose (М3в's `knot`) | `knot#thread` (moves with `pull`), `knot#knot` |
| `tremble` | shore (П.5 «М2б») | Grandmother's two hands flat on the wet rock, shaking | `shake` 0…1 (1) — how much they shake (the layer's tremor; 0 — still) | `tremble#hands` |
| `gap` | house (М5а `palm`, М5б `hand`) | the narrow gap between the two beds by moonlight, the blankets' edges; Grandmother's old hand lying open on the blanket, Sophia's small hand coming | `palm` 0…1 (1) — Grandmother's palm there (0: only the blankets); `hand` 0…1 (0) — Sophia's hand come over the gap into hers | `gap#palm` |
| `breast` | house (М7б `still`) | Sophia's small palm flat on her breast, the candle's light on it from below, the nightdress | `flicker` 0…1 (0) — the candle's flame stirring (М7б: still keeps it 0) | `breast#palm` |
| `sleeve` | house (М8в `sleeve`) | Sophia's fingers holding Grandmother's dark-blue sleeve at the wrist | `let` 0…1 (0) — the fingers open and let go | `sleeve#fingers` |
| `string` | shore (М9а `parcel`) | the parcel's brown paper and its string, Grandmother's hands holding it out, Sophia's at the string's bow | `pull` 0…1 (0) — the bow pulled, the string loose, the paper opening (`parcel`) | `string#bow` |
| `palm` | cape (М10г `knock`) | the tent's canvas from behind by night, glowing faintly; Grandmother's old palm close to it, not touching | `near` 0…1 (0.6) — the palm's nearness to the canvas (1 touching); `knock` 0…3 (0) — knocks given (the knuckles to the cloth and back each whole step) | `palm#palm` |
| `oars` | shore (М11 `oars`) | the dinghy's oars' handles, Sophia's small hands on them, Grandmother's old hands over hers | `let` 0…1 (0) — Grandmother's hands lift off and away (М11) | `oars#hands` |
| `rail` | shore (М11 `gangway`) | the gangway's wooden rail in the fog, Grandmother's hand on it | `let` 0…1 (0) — the hand opens and leaves the rail | `rail#hand` |

The shot's name with no point (`knot`, `palm`, …) — the main thing in it.

## Where the points stand

In the shot's units: the frame's height, the origin in the frame's middle, y down (16:9 — x ±0.89; the middle 4:3 —
±0.667). On 4:3 and 21:9 all is the same about the middle. Written when painted.
