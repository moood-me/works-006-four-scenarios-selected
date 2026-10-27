# The Middle of the Island (С7 of the game «Папа и море»)

A hollow in the middle of the island, the viewer on a granite shoulder above it, looking up toward the lighthouse on
its knoll beyond the black pines: close below, the son's mossy clearing on the left with his ring of stones and the
black pool in its granite basin with a rock at its lip; the path going up through the pines; beyond, all round, the
island falls away to the sea. The action is 4–7 m off (the son a quarter of the frame); the viewer stands half a
metre above the clearing, so the pool is seen from above enough to read as water.

- The land is one function (`lib.js` `land`), made with the island's shapes: the hollow, granite backs left and
  right, the knoll; the pool's basin a level floor under a steep rim (`raw`'s mask), its water `POOL.level` over it.
  `SEA`, `shore` for the island's painters. The sky, the sea, the granite, the lighthouse, its steps, the pines are
  the world's module `island` (`modules/island.md`), and so are the hour, the moon and the storm.
- `tools/middle.py` writes `scene.json` (run from the world's root: `python tools/middle.py .`); it reads the lib's
  numbers (the pool's level, the pines) from `lib.js` with node.
- `ground` — the island's granite (`island.granite`) with, over it, the low growth of the hollows (clumps of
  crowberry, heather, lichen), the clearing's moss, the trodden path (point `ground#path`, where it goes in among the
  pines), the pool's wet basin.
- `pool` — a reflecting plane at the water's level: the dark water filling the basin up to where the land comes out
  of it (its outline found from the land), mirroring the sky and the pines so it reads as water. Point `pool#water`.
- `rock` (a form) at the pool's lip; `coil` on it and `rope` from it into the water: `rope` 0…1 — how much is let
  down (the coil smaller; while it moves the line trembles and rings spread), `coil` — pulled up and coiled.
- `ring` — the son's stones, each a part at its own depth, painted for `ring` (none, set, broken, one_missing); point
  `ring#stones`.
- The pines that creep: seven elements `pine1…pine7` (the island's pine), each its own place (`pine<k>_a`,
  `pine<k>_d`) set by the script from `pines` (0 where they stood, 1 three and a half metres nearer the lighthouse,
  `lib.pineAt`) — at once when set, frame by frame while it moves; the other pines (`pines`, copies) stand still on
  the knoll and the far backs. Not copies: copies cannot move by the state, nor stand on the land when carried by a
  moved anchor.
- People (the world's cast): the son by his ring, Papa at the pool's lip by the rock, Mama on the path, My on the
  granite on the left. Stage 4: they stand and breathe, no motions yet.

## Pieces (stage 5: `lib.js` FILM, played by `beat` through the world's `beats`; the game says the lines at the moments)

How they are made: `lib.js` `film(scene)` — as the shore's (`from` by `AT`, `run` a sequence, the camera the scene's
own moved nearer, `NEAR`/`dolly`). The ring's stones are layers of `ring` at their own depths, each in its place and
kicked apart, shown by `ring` and `ring_n` — laid one by one with no painting again. `script.js` plays the pieces,
creeps the pines and turns Papa under the armful by `sway`; `showcase.js` plays them all, each in its play's keys.

Seconds are estimates. Motions and parts are the cast's (package Л): the `rope` with its weight in the hands, the
`armful`; `crouch`, `put_down` (a stone), `pull_rope`, `carry` (the armful high).

- `day` (2.4, the afternoon, ≈ 8 s): Papa comes up into the hollow and looks round — the pool, the pines, the paths
  down to the shore and to the cape; ends with him standing in the middle 4:3 (`papa#chest`): the pose for the choice
  «День Папы» — `day:look`.
- `ring` (2.3, day, ≈ 8 s): the son crouched at the far side of his clearing, laying the last stones of the ring one by
  one (`ring` set, `ring_n` 4 → 9) — `ring:set` (his line, ≈ 2.5 s in); he stands up; My on the granite on the left, busy
  with her own (as `my_here` says). Ends with him standing over the ring.
- `sound_ready` (2.4 «Омут», day, ≈ 10 s): Papa comes to the rock with the rope and its weight, ties it to the rock and
  stands at the pool's lip holding it — `sound_ready:ready` (the pose for «Лот»: `pool#water` in the middle 4:3). The
  minigame moves `rope`.
- `sound_after` (after `sound_ready`, ≈ 12 s): all the rope is out (`rope` 1) and there is no bottom: Papa looks into
  the pool (surprised, then smiling) — `sound_after:look`; behind his back the pines creep toward the lighthouse
  (`pines` + 0.4 over ≈ 6 s) — `sound_after:pines`.
- `armful_in` (2.4 «Водоросли», day, ≈ 6 s): Papa comes down the path with the armful above his head, not seeing his
  feet; the son at the clearing's edge — `armful_in:ready` (the pose for «Охапка»). The minigame moves `sway`; he walks
  on toward the ring as it plays.
  While it plays he walks on toward the ring as far as `armful_way` (0…1, the minigame's way) says, at the armful's
  gait; `sway` turns him under it; leaned over to the edge (|sway| ≥ 0.92) weed slides off the armful (`spill`, a
  burst of it falling to the moss).
- `armful_through` (after `armful_in`, ≈ 10 s): he walks straight through the ring and knocks it apart (`ring` →
  broken) — `armful_through:kick`; goes on and off to the right toward the landing; the son looks at his back —
  `armful_through:gone`.
- `regather` (after `armful_through`, ≈ 14 s): the son sets the stones back one by one (`ring` set, `ring_n` 0 → 9) —
  `regather:done`.
- `rope_shot` (common shots, «Омут», ≈ 4 s): the rock at the pool with the coiled rope (`coil`) — `rope_shot:held`.
- `ring_shot` (common shots, «Сын: потом», ≈ 4 s): the ring in the clearing one stone short (`ring` one_missing) —
  `ring_shot:held`.

New keys for these (stage 5): `ring_n` 0…9 — how many stones of a set ring are there while it is laid (each stone a
layer of `ring`, shown by it: no painting again); the acts `sway` and `armful_way` (0…1: how far along his way to
the ring he has carried it — the minigame moves it); `spill` (the scene's own).

## Contract for the check

```json
{"beats": {
 "day": {"after": [], "tells": ["day:look"], "seconds": 8, "show": false},
 "ring": {"after": [], "tells": ["ring:set"], "seconds": 16, "show": false},
 "sound_ready": {"after": [], "tells": ["sound_ready:ready"], "seconds": 10, "show": false},
 "sound_after": {"after": ["sound_ready"], "tells": ["sound_after:look", "sound_after:pines"], "seconds": 12, "show": false},
 "armful_in": {"after": [], "tells": ["armful_in:ready"], "seconds": 6, "show": false},
 "armful_through": {"after": ["armful_in"], "tells": ["armful_through:kick", "armful_through:gone"], "seconds": 10, "show": false},
 "regather": {"after": ["armful_through"], "tells": ["regather:done"], "seconds": 14, "show": false},
 "rope_shot": {"after": [], "tells": ["rope_shot:held"], "seconds": 4, "show": false},
 "ring_shot": {"after": [], "tells": ["ring_shot:held"], "seconds": 4, "show": false}},
 "points": ["pool#water", "ring#stones", "ground#path", "troll#chest", "papa#chest", "mama#chest", "my#chest", "lighthouse#lantern", "lighthouse#door"],
 "offers": ["pool#water", "ring#stones", "ground#path", "troll#chest", "papa#chest"],
 "party": {"beam": 0, "calm": 0, "dawn": 0, "dusk": 0, "night": 0, "moon": 0.6, "storm": 0, "flash": 0, "lighthouse_lit": 0, "pines": 0, "ring": "none", "ring_n": 9, "rope": 0, "coil": false, "troll_here": true, "papa_here": false, "mama_here": false, "my_here": false},
 "acts": {"rope": {"values": [], "tells": []}, "sway": {"values": [], "tells": []}, "armful_way": {"values": [], "tells": []}}}
```
