# The New House

The new house on the island's far side (С5 of the game's scenario): white and new on the granite over the water, a
steep black roof, the glazed veranda toward the forest with its window that is not locked, and behind it one big room
— the wide owners' bed, the chest of drawers, the table under four big windows over the sea. Nobody comes here all
summer: its windows are black. Grandmother and Sophia come at night with the lantern (3.3 «moss»); on the last morning
it is seen from the water in the fog, the wooden seal on the table (the epilogue). Its sea, sky, fog and the hour and
the weather are the island's (`modules/isle.md`); `tools/new-house.py` writes `scene.json`, `elements/sky.*`,
`elements/sea.*` (`python -B tools/new-house.py <world>`). Engine 3, camera `picture`. Stage 4: every state a key of
the play; people stand and breathe (no motions of their own yet).

## How it is made

- **The land** (`lib.ground`, relief.js): the rock level round the house, rising a little inland (toward the start,
  the forest), falling to the sea close behind the sea gable (the waterline `lib.coast`, bending back far on either
  side; `WATER` −2.4). `land` paints it (granite, the wet band, cracks, moss and heather burnt by `late`, lichen, the
  worn way of stones from the forest to the veranda). `deadtree` (copies), the island's `pine`, `juniper`, `tuft`,
  `islet`, `skerry`, `mist`, `fog_wall`; `mist_near` — the morning's fog banks on the water behind the house (by
  `fog`); `island_back` — the island beyond, seen from the sea.
- **The house** (world metres, no anchor: `lib.HOUSE` — outer walls x −3…3, z 9…16.6, floor 0.45 m, walls 2.6 m, the
  dividing wall at z 11): `front` (the land gable, the veranda's glazing cut out, the shut door), `back` (the sea
  gable, its four big windows cut out; `back#windows`), `side_l`, `side_r`, `roof` (two copies of one plane, 45°).
  `glazing` (the veranda's fixed windows), `sash` (the leaf that is not locked, hinged on its left, turned out by
  `sash`; `sash#sash` its lever), `win_left`, `win_right`, `win_sea` (frames), `glass_sea` (the big windows' glass: the
  room and the lantern faintly in it at night). Inside (`inside`): `floor`, `ceiling`, `in_left`, `in_right`,
  `in_back`, `in_near` and `ver_wall` (the dividing wall's two faces, the open doorway).
- **The room**: `bed` (its top, a plane; `bed#seat` — the foot's edge, where Grandmother sits: `lib.SEAT`),
  `bed_side`, `bed_foot`, `bed_head`; `chest`, `chest_side`, `chest_top` (`chest#drawers`); three drawers — each an
  unseen anchor `drawer<k>` moved out by `drawer<k>_x` (the script's, from `drawers`, the top first) carrying
  `drawer<k>_front`, `_side`, `_in` (painted by `lib.drawerFront`, `drawerSide`, `drawerIn`); `table` (`table#seal`,
  `table#table`), `table_legs`, `chairs`; `seal` (the wooden seal, by `seal`; it turns to the eye); `lantern` (set
  down: on the table or on the floor before the bed, by `lantern`; `lantern#lantern`); `smoke` (the cigarette's, from
  Grandmother's right hand, by `cigarette`).
- **The light**: the island's (`isle.light`), the room's share of the outside light `inside` 0.3 (an empty shut house:
  its big windows read black from outside, by day too), at night 0.7 (faces read by the moon and the lantern). The
  moon is low over the sea a little left of ahead (bearing −14°, 4.5° up): from the room it is seen in the second big
  window, and it comes in only through the big windows (`through`: their four openings). `lantern` (its flame, while
  it is set down: `lantern_set`), `lantern_hand` (at `grandma#hand_l` while she holds it: `lantern_held`),
  `cigarette` (the ember at `grandma#hand_r`). No daylight lights at the windows: with them the windows glowed from
  outside (they were taken out; the inside share lights the room).
- **People** (the world's `cast`, `inside`): `<id>_at` (`lib.PLACES`; the island's `places`; sitting by the script):
  Grandmother — `path` (on the rock before the house), `sash` (at the veranda's window, her right hand on its lever),
  `veranda`, `door` (in the room by the doorway), `bed` (sitting on the bed's foot: `sit_stone`); Sophia — `path`,
  `sash`, `veranda`, `door`, `bed` (by Grandmother), `drawers`, `table` (by the seal). Nobody is here in the empty play
  (`<id>_here` false): the game brings them.
- **The views** (`view`, a cut — `lib.VIEW`): `out` (outside from the front's left: the veranda's glazing and its
  window, the long side's big windows, the moon low over the sea on the left), `room` (from inside the doorway: the
  bed, the table under the big windows with the moon in them, the drawers), `sea` (from the water behind the house,
  a boat's height: the sea gable, its black windows, the rock, the trees), `seal` (nearer, low over the water: the big
  windows, the seal on the table against the dark room).
- The showcase: the night, the window; the room — the lantern on the floor, the cigarette, the drawers; the seal left
  on the table; the last morning in the fog from the water; the seal from the water.

## The keys of the play

Common (the island's): `dawn`, `dusk`, `night`, `late`, `calm`, `storm`, `flash`, `fog`, `moon`. Its own: `view`
(out · room · sea · seal), `grandma_at` (path · sash · veranda · door · bed), `sophia_at` (path · sash · veranda ·
door · bed · drawers · table), `sash` 0…1, `drawers` 0…1, `seal`, `cigarette` 0…1, `lantern` (none · hand · table ·
floor); the people's `<id>_here`, `<id>_mood`. The night at the house is `night: 1`; the last morning `late: 1, dawn:
1, fog: 0.6` (as the sea's).

## Open

- **A person's `inside` is the element's, fixed** (engine): here they go from the rock outside into the room in one
  scene. They are `inside` — so outside at night they take 0.7 of the outside light (the lantern in her hand lights
  them), and by day outside they would be dim (the game has nobody here by day; the empty play has nobody).
- The lantern in Grandmother's hand and the cigarette are only their lights (and the smoke) at her hands until the
  cast has them as parts (stage 5): then the lights go to the parts' points.
- Grandmother sitting (`sit_stone`) holds her elbows out wide, her hands at her knees — the cast's motion (stage 5).
- The dead trees are this scene's own painting (`deadtree`, as the forest's are its own): one tree for the island in
  `isle` would be better — its owner's.

## Contract for the check

```json
{"beats": {},
 "points": ["sash#sash", "bed#seat", "table#seal", "table#table", "chest#drawers", "lantern#lantern", "seal#seal", "back#windows", "sky#sun", "sky#sun_late", "sky#sun_dawn", "sky#moon", "grandma#chest", "sophia#chest"],
 "offers": ["sash#sash", "bed#seat", "table#seal", "chest#drawers", "grandma#chest", "sophia#chest"],
 "party": {"dawn": 0, "dusk": 0, "night": 0, "late": 0, "calm": 0, "storm": 0, "flash": 0, "fog": 0, "moon": 1, "view": "out", "grandma_at": "path", "sophia_at": "path", "grandma_here": false, "sophia_here": false, "sash": 0, "drawers": 0, "seal": false, "cigarette": 0, "lantern": "none"},
 "acts": {"flash": {"values": [], "tells": ["flash:strike"]}}}
```
