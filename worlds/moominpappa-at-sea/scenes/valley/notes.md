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
  luggage on the jetty, My on the post by the bow). In every set-up the Groke stands far off on the beach
  (`lib.GROKE`), looking at the lit window (at the jetty — at the bow lantern). The game says who is here
  (`<id>_here`) and their moods.
- **The little fire** — `moss` (`green` · `smoulder` · `burnt`) and `smoke` (М1: grey smoke to white steam); the
  emitters and the ember read `smoke_grey`, `smoke_white`, which the script works out (not set from outside).
- **The Groke's frost** — `frost`: 0…0.4 the rime round where she stands on the beach (`lib.GROKE`) widens — the sand
  (`frost`, a plane with its shader) and the dune grass standing white before her (`rime`, a card, so it reads from
  the garden); 0.4…1 her track of rime down to the water appears patch by patch.
- **Inserts** — `chart` (Papa's chart on the table at night, the module `chart`; point `chart#island`) and `basket`
  (the basket from above: hat, notebook, sweater, the jam jar under its edge; `candles` "basket" — the candles across
  it, "shelf" — on the shelf by the door; `paints` — the box of paints on top).
- **Stage 4**: people stand, sit and breathe (`hands_behind`, `seated`, `sit_look`); no motions, no beats yet.
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

## Pieces (stage 5 — the contract; no code yet)

The scene's film in beats (`modules/beats`: the key `beat`, `beat_next`; `beat:<name>` told as a beat ends). Each
piece begins from its own values (`from`: the light, who is where, the camera) unless it comes `after` the one named.
The game says its lines at the moments the scene tells (`<piece>:<moment>`); a silent stretch before the game's next
moment is never longer than ~8 s. Seconds are estimates (people at their gait's pace). People's motions are the cast's
(package Л): what a piece needs of them is listed under it. `where` (stage 4's set-ups) stays as each piece's
starting arrangement.

**П.1–П.3 (the garden; dusk 1, `lamps` 0.4 — the window lit early)**
- `garden` (≈ 14 s): wide, the garden as stage 4's `garden`. Mama stirs the jam on the stove, the children sit by the
  stream (the bark boats drift), Papa walks slowly along the path from the veranda's corner to the apple tree, hands
  behind his back (`garden:walk` as he sets off — the narrator's line); the camera goes with him to a medium two-shot of
  him and the moss — `garden:tree` as he stops. Ends: Papa by the tree, the moss beside him, green. *Л: `walk` with
  `hands_behind`, `stir`.*
- `smoke` (≈ 6 s, after `garden`): `moss` → `smoulder`: a thread of grey smoke out of the moss; a cut to Papa's face
  close, it lights up (`surprised` → `smile`) — `smoke:seen`; back to the medium: the pose for М1 — Papa beside the
  moss, `apple#moss` in the middle of 4:3, the camera still. Ends there. *Л: the ladle in his hand (a part).*
- (М1 «Ковш» — the game's: `smoke` 0 → 1, grey smoke to white steam.)
- `spot` (≈ 18 s, after `smoke`): `moss` → `burnt`, the steam thins. Papa straightens with the ladle — `spot:shout`
  (his «Fire!»); Mama comes down the veranda steps and across the lawn to the spot (≈ 9 m) and looks at it —
  `spot:mama` («How good that you noticed»); she turns and goes back to her jam — `spot:back` («And she goes back»); My
  comes up from the stream, looks — `spot:my` («Ti-iny»), runs back; Papa alone by the spot, the ladle hanging —
  `spot:alone` (his quieter «I put out a fire»). Ends: Papa alone, medium. *Л: `walk`, `look_down`, `lower_arm`.*
- `groke_far` (≈ 8 s, after `spot`): the camera turns from Papa down the meadow to the beach far off: the Groke looking
  at the lit window; the grass round her whitens (`frost` 0 → 0.4 over 5 s) — `groke_far:white`. Ends on her, wide
  enough to see the house's window and her both.

**П.4 (night 1, `lamps` 1)**
- `map` (≈ 10 s, by a cut): night on the veranda, Papa alone at the table with the chart under the lamp; a clock's
  ticking and crickets are the game's sound. The camera comes in to him medium, the lamp beside his face — `map:face`;
  the insert `chart` opens — `map:chart` (his «A lighthouse. And not lit»; his second line after the game's pause).
  Ends: the insert open, `chart#island` in the middle of 4:3 — the pose for the choice `tell`.

**П.5**
- `supper` (≈ 14 s, by a cut; «Всем»): dusk 0.6 + night 0.5, the four at the table as stage 4's `supper`. Papa half
  rises — `supper:said` (his «We're moving to the lighthouse!», My's «Hooray!»); a cut to the son close: he puts down
  his spoon and looks at his father for the first time this evening — `supper:spoon` («To the lighthouse? For
  good?»); Papa beaming, medium — `supper:beam`; Mama close, silent — `supper:mama` (her «I'll pack our things» after
  a pause). Ends on Mama. *Л: `rise_half`, `put_down` (the spoon — a part), `seated`.*
- `late` (≈ 10 s, by a cut; «Маме»): night, Papa and Mama at the table, the chart between them; the insert `chart` for
  a moment, then Mama's face close looking at it a long time — `late:look` («Is there any earth there?» …); both,
  medium — `late:yes` («All right. I'll take my paints»). Ends: both at the table.
- `morning` (≈ 12 s, by a cut; after «Маме»): dawn 0.7, the jetty (stage 4's `jetty`): My on the post — `morning:my`
  («Boring»); Papa carries a bundle down the jetty into the boat alone, there and back — `morning:pack`. Ends: Papa
  alone in the boat, packing. *Л: `carry`, `put_down`.*

**П.6**
- `basket` (≈ 12 s, by a cut; one piece for both branches — the game sets the play's `paints` before it): day, the
  veranda; Mama packs the basket: the insert `basket` opens and the things go in one by one (`packed` 0 → 3: hat,
  notebook, sweater), the candles on top (`candles` "basket") — `basket:candles` (Papa's «Leave the candles. There's a
  lighthouse!», her «All right»); the candles out, back on the shelf, the jar under the sweater (`packed` 4) —
  `basket:jam`; then `basket:paints`, told in both branches: with `paints` the box of paints goes in last, on top
  («Маме»); without it nothing more goes in, and the game says My's «And your paints?» and Mama's answer there
  («всем»). Ends: the insert open, packed. `packed` (0…4: how many of hat, notebook, sweater, jam are in) is the
  piece's own key (in `states`, not the play's).
- `push_off` (≈ 18 s, by a cut): dusk 1 (the evening light made lighter after the stand: people and the boat read
  clearly), the jetty; the family in the boat (Papa at the tiller, Mama with the basket,
  the son, My on the bow), the lantern lit on her bow — `push_off:lantern`; the boat pushes off and goes out along the
  shore (her place moved — new keys `boat_a`, `boat_d`; the camera stays on the jetty) — `push_off:away`; the camera
  turns to the beach: the Groke walks down to the water toward the light, the rime in her steps (`frost` 0.4 → 1) —
  `push_off:groke`. Ends: the boat small with her lantern, the Groke at the water's edge. *Л: sitting in the boat,
  the Groke's `glide`.*

## Contract for the check

```json
{"beats": {
  "garden": {"after": [], "tells": ["garden:walk", "garden:tree"], "seconds": 14, "show": false},
  "smoke": {"after": ["garden"], "tells": ["smoke:seen"], "seconds": 6, "show": false},
  "spot": {"after": ["smoke"], "tells": ["spot:shout", "spot:mama", "spot:back", "spot:my", "spot:alone"], "seconds": 18, "show": false},
  "groke_far": {"after": ["spot"], "tells": ["groke_far:white"], "seconds": 8, "show": false},
  "map": {"after": [], "tells": ["map:face", "map:chart"], "seconds": 10, "show": false},
  "supper": {"after": [], "tells": ["supper:said", "supper:spoon", "supper:beam", "supper:mama"], "seconds": 14, "show": false},
  "late": {"after": [], "tells": ["late:look", "late:yes"], "seconds": 10, "show": false},
  "morning": {"after": [], "tells": ["morning:my", "morning:pack"], "seconds": 12, "show": false},
  "basket": {"after": [], "tells": ["basket:candles", "basket:jam", "basket:paints"], "seconds": 12, "show": false},
  "push_off": {"after": [], "tells": ["push_off:lantern", "push_off:away", "push_off:groke"], "seconds": 18, "show": false}
 },
 "points": ["papa", "mama", "troll", "my", "groke", "apple#moss", "moss#fire", "chart#island", "boat#lantern", "stove#pan", "table",
  "luggage", "boat", "window_lit"],
 "offers": ["apple#moss", "chart#island"],
 "party": {"moon": 0.2, "paints": false},
 "acts": {"smoke": {"values": [], "tells": []}}}
```
