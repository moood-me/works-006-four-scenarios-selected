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
  `cigarette` (the ember at `grandma#hand_r`). The day (or the night) at the windows: `sea_in`, `ver_in`, `left_in`,
  `right_in` (`daylight`: the outside's light all round, coming in).
- **People** (the world's `cast`; not marked `inside` — the engine has them inside while they stand on the house's
  floor, which is): `<id>_at` (`lib.PLACES`; the island's `places`; sitting by the script):
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

- The lantern in Grandmother's hand and the cigarette are only their lights (and the smoke) at her hands until the
  cast has them as parts (stage 5): then the lights go to the parts' points.
- Grandmother sitting (`sit_stone`) holds her elbows out wide, her hands at her knees — the cast's motion (stage 5).
- The dead trees are this scene's own painting (`deadtree`, as the forest's are its own): one tree for the island in
  `isle` would be better — its owner's.

## Pieces (stage 5)

The pieces of the game's steps (plan.md «Куски сцен по шагам», scenario.md 3.3 «moss» and §10's common shots), played by
the module `beats`: the key `beat`, `beat:<name>` told at its end, `beat_next`. Each: what it shows, the keys it begins
with or sets, where it ends — in the pose of what comes next; its moments are told as `<piece>:<moment>` — the game
speaks its lines and shows its plates there. Where the people stand and the camera are each piece's own (its `from`);
the game sets only the play's keys (the hour, `seal` in the epilogue). All are the game's (`show` false); the showcase
plays them. No choice and no minigame is played here: the stones' minigame (М7в) is the forest's, the porch after it
the shore's.

- `window` (3.3 «moss», ≈ 10 s). Night, the moon over the sea: Grandmother and Sophia come out of the dead trees onto the rock before the house with the lantern (in her left hand); the house white, its windows black; Grandmother goes to the veranda's window and pulls at its lever — it is not locked, it swings open. Keys: night 1, lantern hand; sash 0 → 1. From: both on the rock (path). Ends: both at the open window (sash). Moments: `window:come` — the house before them, its black windows; `window:open` — the window swings open (the game: «not locked…»).
- `inside` (3.3 «moss», ≈ 12 s). After `window`. Cut inside (the climbing in is not shown): the two in the room by the doorway, the lantern lifted — new, clean, the moon in the four big windows; Grandmother goes to the wide bed, sets the lantern on the floor and sits on its foot; Sophia looks round. Keys: view room; lantern hand → floor. Ends: Grandmother sitting on the bed's foot, the lantern at her feet. Moments: `inside:in` — in the room, everything new (the game: «Inside everything is new, clean, smelling of paint»); `inside:sat` — she sits on the owners' bed.
- `smoke` (3.3 «moss», ≈ 8 s). After `inside`. Grandmother takes the packet out of her pocket, a cigarette out of it, strikes a match and lights it; the ember, the thin smoke in the moonlight; she sits smoking. Keys: cigarette 0 → 1. Ends: Grandmother smoking on the bed. Moments: `smoke:packet` — the packet in her hand (with «quit» the game says «For an occasion like this» here); `smoke:lit` — the cigarette alight.
- `drawers` (3.3 «moss», ≈ 12 s). After `smoke`. Sophia goes to the chest of drawers and pulls the drawers out one after another, looks into each — empty, clean — takes nothing; then turns to Grandmother. Keys: drawers 0 → 1. Ends: Sophia by the open drawers, turned to Grandmother. Moments: `drawers:open` — the last drawer out, empty (the game: «Sophia opens all the drawers and takes nothing»); `drawers:turn` — she turns to her (the game: «Nobody has died here»).
- `look` (3.3 «moss», ≈ 8 s). After `drawers`. Grandmother's face close, looking at Sophia, the cigarette in her hand; a pause; she puts it out, gets up and takes the lantern. Keys: cigarette 1 → 0; lantern floor → hand. Ends: Grandmother standing by the bed with the lantern. Moments: `look:face` — her face close (the game: «Grandmother looks at her. A pause»); `look:up` — she is up (the game: «Come on»).
- `seal` (3.3 «moss», ≈ 9 s). After `look`. Going, Sophia lays the wooden seal on the table under the window, the moon over it; the two go out at the doorway; the room empty, the seal on the table in the moonlight (then the game's cut, through black, home to the porch). Keys: seal false → true. Ends: the empty room, the seal on the table. Moments: `seal:left` — the seal on the table (the game: «Going, Sophia leaves the wooden seal on the table»); `seal:gone` — the room empty.
- `from_sea` (epilogue, the common shots from the water, ≈ 7 s). The last morning in the thin fog, from the water: the new house on the far side over the water, its big black windows; the camera comes nearer under the windows — with `seal`, the wooden seal on the table in the window; without, only the black windows. Keys: late 1, dawn 1, fog 0.6, nobody here; seal (the play's). Ends: the windows close (with `seal`: the seal in the window). Moments: `from_sea:windows` — the black windows; `from_sea:seal` — nearer: the seal in the window (told without `seal` too: the empty window).

## Open for the game (stage 5)

- The packet and the cigarette, the match, the lantern in her hand are the cast's parts (package Л); the lights
  (`lantern_hand`, `cigarette`) go to the parts' points when they come.
- In «quit» the packet is taken out of the crevice in the forest, on the way (the forest's `pack: taken`); here she only
  takes it out of her pocket — the same in every branch.
- `view` stays for the stage-4 stills; the pieces set the camera themselves.

## Contract for the check

```json
{"beats": {"window": {"after": [], "tells": ["window:come", "window:open"], "seconds": 10, "show": false}, "inside": {"after": ["window"], "tells": ["inside:in", "inside:sat"], "seconds": 12, "show": false}, "smoke": {"after": ["inside"], "tells": ["smoke:packet", "smoke:lit"], "seconds": 8, "show": false}, "drawers": {"after": ["smoke"], "tells": ["drawers:open", "drawers:turn"], "seconds": 12, "show": false}, "look": {"after": ["drawers"], "tells": ["look:face", "look:up"], "seconds": 8, "show": false}, "seal": {"after": ["look"], "tells": ["seal:left", "seal:gone"], "seconds": 9, "show": false}, "from_sea": {"after": [], "tells": ["from_sea:windows", "from_sea:seal"], "seconds": 7, "show": false}}, "points": ["sash#sash", "bed#seat", "table#seal", "table#table", "chest#drawers", "lantern#lantern", "seal#seal", "back#windows", "sky#sun", "sky#sun_late", "sky#sun_dawn", "sky#moon", "grandma#chest", "sophia#chest"], "offers": ["sash#sash", "bed#seat", "table#seal", "chest#drawers", "grandma#chest", "sophia#chest"], "party": {"dawn": 0, "dusk": 0, "night": 0, "late": 0, "calm": 0, "storm": 0, "flash": 0, "fog": 0, "moon": 1, "seal": false, "grandma_here": false, "sophia_here": false}, "acts": {"flash": {"values": [], "tells": ["flash:strike"]}}}
```
