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

## Contract for the check

```json
{"points": ["pool#water", "ring#stones", "ground#path", "troll#chest", "papa#chest", "mama#chest", "my#chest", "lighthouse#lantern", "lighthouse#door"],
"offers": ["pool#water", "ring#stones", "ground#path", "troll#chest", "papa#chest"],
"party": {"beam": 0, "calm": 0, "dawn": 0, "dusk": 0, "night": 0, "moon": 0.6, "storm": 0, "flash": 0, "lighthouse_lit": 0,
  "pines": 0, "ring": "none", "rope": 0, "coil": false, "troll_here": true, "papa_here": false, "mama_here": false, "my_here": false},
"acts": {}}
```
