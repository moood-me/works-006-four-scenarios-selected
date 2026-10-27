# The Landing Rocks (С3 of the game «Папа и море»)

The island at dawn, the morning they landed (1.4): the family on the granite slab by the cove, the boat pulled up,
the dark lighthouse on its knoll on the right, the steps to its locked door, the stone with the arrow, a few
crooked pines, the open sea with white crests and the Fisherman's cape far off on the left.

- `tools/landing.py` writes `scene.json`. The island — sky, sea, granite, lighthouse, steps, pines, the hour and the
  storm — is the world's module `island` (`modules/island.md`; its light, lights and keys from `tools/island.py`).
- The land is one function (`lib.js` `land`, of the island's `ridge` and `bump`): smooth granite backs over the sea,
  used by the relief and by the island's painters (the granite's wet rim, the sea's shallows and foam). `SEA` is the
  sea's height.
- The lighthouse is the island's form, sunk 0.45 m so its plinth meets the knoll's front. Points: `lighthouse#door`,
  `lighthouse#lantern`.
- Its first morning is the look `dawn` (the scene opens with `dawn` 1); the day, dusk, night, storm are the island's.
- The bundle and the boulder are forms (lumps): Moominmamma and Moomintroll sit on them (`<id>_on`, the seat's top
  over the land there).
- The people are the world's cast (`modules/cast`): papa stands, hands behind his back; mama and troll sit.
- Stage 2 (the look) only: people stand or sit, breathe; no motions, no camera, no showcase yet.
