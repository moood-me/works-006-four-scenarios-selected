# Moominvalley (`valley`, С1 of the game «Папа и море»)

The valley at the end of August (П.1–П.6): the blue round house on its knoll with the veranda before its door (the
table and its lamp, jars of jam, the little stove with the jam pan, the shelf with the candles), the garden — the old
apple tree with the moss at its foot, young apple trees, lilacs, birches —, the stream running down past the garden
with its footbridge and the children's bark boats, the sandy path to the jetty, the boat «Adventure» moored there; on
the left the beach and the open sea, where the Groke stands far off; behind, the hills, woods and the blue Lonely
Mountains. The warm side of the island's hand: soft late-summer green and ochre, the evening light.

- **The land** — one function (`lib.js` `land`, the same in `tools/valley.py`): the garden level before the eye, the
  house's knoll, the hills behind (higher to the right), the stream's bed at across `STREAM_A`, the meadow down to the
  beach and the sea along `coast` (`SHORE`: meadow's edge, beach, water's edge, sea floor). `meadow` is one draped
  plane over all of it; `sea` and `stream` are planes at `WATER` the land hides where it is higher.
- **The house** — a form (a revolve of `lib.HOUSE.profile`), its painting the house unrolled (rows by `HOUSE.at(h)`).
  `window_lit` — its middle floor's front window, lit with the lamps. The veranda's floor is a plane people walk on;
  its furniture stands at the floor's height; the seats are in its frame (`lib.SEATS`).
- **Light** — looks `dawn` (the morning sun from the right), `dusk` (the low golden sun from the left), `night` (the
  moon over the sea, `moon#disc`; light enough to read faces); day is all three at 0. The sky is one painting and its
  three lights as layers mixed by its shader (`sky.wgsl`), the clouds drifting, tinted to the light. Lamps: the
  veranda lamp and the window (`lamps`), the stove's fire (`jam`), the ember in the moss, the bow lantern.
- **Set-ups** — `where` names one (`lib.js` `SETUPS`); `script.js` puts it as one cut (people's places, seats, turns,
  looks, motions; the camera; `jam` and `luggage`): `garden` (П.1–П.3: Mama at the stove on the veranda, the children
  sitting by the stream, Papa by the apple tree), `map` (П.4: Papa at the table under the lamp), `supper` (П.5: the
  four at the table; «to Mama» — the game has only Papa and Mama here), `jetty` (П.5 morning, П.6: by the boat, the
  luggage on the jetty, My on the post by the bow). The game says who is here (`<id>_here`) and their moods.
- **The little fire** — `moss` (`green` · `smoulder` · `burnt`) and `smoke` (М1: grey smoke to white steam); the
  emitters and the ember read `smoke_grey`, `smoke_white`, which the script works out (not set from outside).
- **The Groke's frost** — `frost`: 0…0.4 the rime round where she stands on the beach (`lib.GROKE`) widens — the sand
  (`frost`, a plane with its shader) and the dune grass standing white before her (`rime`, a card, so it reads from
  the garden); 0.4…1 her track of rime down to the water appears patch by patch.
- **Inserts** — `chart` (Papa's chart on the table at night, the module `chart`; point `chart#island`) and `basket`
  (the basket from above: hat, notebook, sweater, the jam jar under its edge; `candles` "basket" — the candles across
  it, "shelf" — on the shelf by the door; `paints` — the box of paints on top).
- **Stage 4**: people stand, sit and breathe (`hands_behind`, `seated`, `sit_look`); no motions, no beats yet. The
  Groke is not in the scene yet: she comes into the cast from the package «Берег» (В3), then she is placed at
  `lib.GROKE` in every set-up.
- `tools/valley.py` writes `scene.json` (the trees on the hills seeded; the heights from the land). Change the land
  or the house's profile in both and run it.
- The showcase: the evening coming, the fire and the ladle's steam, the Groke's rime, night at the chart, the supper,
  the basket, the jetty with the bow lantern and the frost's track (about 55 s).

## Keys (the play's)

| Key | Values | Default |
| --- | --- | --- |
| `where` | `garden` · `map` · `supper` · `jetty` | `garden` |
| `dawn`, `dusk`, `night` | 0…1 looks (П.1–П.3, П.6: dusk 1; П.4: night 1; П.5 supper: dusk 0.6 + night 0.5; morning: dawn 0.7) | 0 |
| `moon` | 0…1 phase | 0.2 |
| `lamps` | 0…1 | 0 |
| `moss` | `green` · `smoulder` · `burnt` | `green` |
| `smoke` | 0…1 (М1 answers with it) | 0 |
| `frost` | 0…1 | 0 |
| `candles` | `shelf` · `basket` | `shelf` |
| `paints` | boolean | false |
| `chart`, `basket` | 0…1 inserts | 0 |
| `lantern_bow` | 0…1 | 0 |

## Contract for the check

```json
{"beats": {},
 "points": ["papa", "mama", "troll", "my", "apple#moss", "moss#fire", "chart#island", "boat#lantern", "stove#pan", "table",
  "luggage", "boat", "window_lit"],
 "offers": ["apple#moss", "chart#island", "boat#lantern"],
 "party": {"where": "garden", "dawn": 0, "dusk": 0, "night": 0, "moon": 0.2, "lamps": 0, "moss": "green", "smoke": 0, "frost": 0,
  "candles": "shelf", "paints": false, "chart": 0, "basket": 0, "lantern_bow": 0},
 "acts": {}}
```
