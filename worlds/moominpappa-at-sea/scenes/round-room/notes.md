# The Round Room (С4 of the game «Папа и море»)

The room at the lighthouse's foot, from the first afternoon (1.5) to the last morning: the table with the storm
lantern, the stool, the stove, the stair up to the hatch, the window on the sea, the door out to the steps, the
keeper's wall with his pencil lines and Moominpappa's log, Moominmamma's garden growing on the wall and the sill.
Stage 4 (all the states, people stand and breathe): every state is a key of the play; no motions, beats or showcase yet.

## How it is made

- The room is a circle (`lib.js`: `C`, `R`, `H`; `at(angle, r)` — an angle is a bearing from `C`). Its wall is bent
  sheets of that circle (forms, `kit.bend`): `wall_a` from −150° round to the window, `wall_b` the pier between the
  window and the door, `wall_c` from the door to 150°, `win_low`/`win_top` the window's column. The near part of the
  circle is not built: the room is seen from its open side (`camera` picture).
- The window (`WIN`, at 24°): its cheeks (`reveal`), the deep sill (a plane), the casement; outside it the shutters
  (`shutters`, a card that paints only when shut; shadows the moon).
- The door (`DOOR`, at 44°) is the lighthouse's own (`modules/island` `DOOR`: its arch as wide, as high over its sill):
  its casing (`door`: points `door#door`, `door#threshold`), the leaf (`door_leaf`, hinged at its left as seen from
  the room, turned by `door_f`), the reveal through the wall (`door_reveal`, one `kit.extrude` form: up a jamb, round
  the arch, down the other), the wall about the arch (`door_top`, a flat sheet with the arch cut out), the threshold,
  and outside the top step (`porch`) and the knoll's granite.
- Outside (the window, the door): the island's sky and sea (`modules/island`, `tools/island.py`), the knoll's granite
  (`granite`) and the Fisherman's cape far off in the window (`cape`) — draped over the relief (`relief.js`, `lib.land`:
  0 inside the tower, the knoll falling to the sea at −5, the cape's ridge). The floor is 1 cm over the land (the
  granite plane runs under it).
- `wall_a`, left to right: the keeper's lines under the stair's top (points `wall_a#keeper`, `wall_a#nobody`),
  Moominpappa's log across "Nobody again" (`wall_a#log`), low on the dado the oldest lines under dust with the 27th of
  August's (`wall_a#line27`) and the next under it; then the garden (`wall_a#garden`, `wall_a#apple`, `wall_a#gate`)
  under the shelf. Moominmamma herself in the garden is a small sheet of its own (`wall_mama`: her figure a layer as
  present as `wall_mama`; the pressed grass).
- The storm lantern (`lantern`): its place by `lantern_at` (the script sets `lantern_a/d/e`: the table, the stair's
  middle tread, the floor by the boy's bunk), its flame by `flame` — its light and glow dimmed by animate (`e.glow`),
  the globe lit from within by its shader (`u_lit`). The stove's fire: its own `e.light` "fire", dimmed the same way.
- Light: the island's (`island.light`, the looks dawn, dusk, night, storm, flash), `inside` 0.75 (the storm's 0.55);
  the island's far lights (the sun at each hour, the moon from `sky#moon`, the lightning from its bolt) come in only
  through the window and the door (`through`); the window's and the door's daylight (`window_light` on `window_open`,
  `door_light` on `door`); the lantern; the stove's fire.
- The script: the island's lightning (storm over a half), the door's turn, the lantern's place, `window_open`.
- `tools/round_room.py` writes `scene.json` from the same numbers as `lib.js` (keep them the same) and copies the
  island's shaders.

## The keys of the play

Common (the island's): `dawn`, `dusk`, `night`, `moon`, `storm`, `flash`, `lighthouse_lit` (not read here). The room's:
`garden` −1…4 (the wall: −1 bare; little Papa at the gate while it is at 1 or less — not a key of its own),
`paints` (green · red_blue), `wall_mama` 0…1, `wall_grass`, `apple_leaves`, `clouds`, `line27` (dust · clean ·
stripe · next — `next`: the line and the next one under it wiped), `log` 0–2 (Arrived; and «27 August. Calm.»),
`log_depth` (the depth line — apart, since it is only on «Омут»), `sill` −1…4 (−1 bare, 0 the first stem, 1–4
flowers), `brushes` (sill · jar), `lantern_at` (table · stair · bunk · none), `flame` (full · low · out · frost),
`paraffin` 3…0, `stove` (cold · fire · flooded), `firewood`, `steam` 0…1, `cups` 0–2, `tea` 0…1 (the steam over the
cups — the plan's `cup_cold`, as a number the steam can be), `door` 0…1, `basket`, `stone`, `shutters`, `wet`,
`drip` 0…1. The script's own: `door_f`, `lantern_a/d/e`, `window_open`.

## Open

- The sill's flowers are painted on the sill and are not readable from the wide view (the sill is seen almost edge
  on): the beat at the sill (2.6) needs a shot close on it.
- People: the stage-2 places (papa by the stair, mama on the stool, My on the table's corner, the boy at the
  window); where each step has them is stage 5's beats.

## Contract for the check

```json
{"beats": {},
 "points": ["wall_a#keeper", "wall_a#nobody", "wall_a#log", "wall_a#line27", "wall_a#garden", "wall_a#apple", "wall_a#gate", "wall_mama#mama", "sill#garden", "jar#jar", "shelf#paraffin", "stair#stair", "stair#hatch", "casement#window", "stove#stove", "stove#hob", "lantern#flame", "door#door", "door#threshold", "cup#cup", "basket#basket", "stone#stone", "papa", "mama", "my", "troll"],
 "offers": ["lantern#flame", "shelf#paraffin", "wall_a#keeper", "wall_a#gate", "wall_a#line27", "door#door", "door#threshold", "cup#cup", "stair#stair", "papa#chest", "mama#chest", "my#chest", "troll#chest"],
 "party": {"dawn": 0, "dusk": 0, "night": 0, "moon": 0.6, "storm": 0, "flash": 0, "lighthouse_lit": 0,
   "garden": -1, "paints": "green", "wall_mama": 0, "wall_grass": false, "apple_leaves": true, "clouds": false,
   "line27": "dust", "log": 0, "log_depth": false, "sill": -1, "brushes": "sill", "lantern_at": "table", "flame": "full",
   "paraffin": 3, "stove": "cold", "firewood": true, "steam": 0, "cups": 0, "tea": 0, "door": 0, "basket": false,
   "stone": false, "shutters": false, "wet": false, "drip": 0},
 "acts": {}}
```
