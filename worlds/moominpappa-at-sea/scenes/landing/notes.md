# The Landing Rocks (С3 of the game «Папа и море»)

The island at dawn, the morning they landed (1.4): the family on the granite slab by the cove, the boat pulled up,
the dark lighthouse on its knoll on the right, the steps to its locked door, the stone with the arrow, a few
crooked pines, the open sea with white crests and the Fisherman's cape far off on the left.

- The land is one function (`lib.js` `land`): smooth granite backs over the sea, used by the relief, by the granite's
  painting (its wet rim) and by the sea's (the shallows, the foam round the rocks). `SEA` is the sea's height.
- `granite` is one draped plane; the sea one reflecting plane whose shader shows its two layers by turns: the crests
  (patches come and go with the wind) and the foam at the waterline (washing in and out).
- The lighthouse is a form (a revolve of `lib.TOWER.profile`); its painting is the tower unrolled, rows found by
  `TOWER.at(height)`. It is sunk 0.45 m so its plinth meets the knoll's front. Points: `lighthouse#door`,
  `lighthouse#lantern`.
- The bundle and the boulder are forms (lumps): Moominmamma and Moomintroll sit on them (`<id>_on`, the seat's top
  over the land there).
- The people are the world's cast (`modules/cast`): papa stands, hands behind his back; mama and troll sit.
- Stage 2 (the look) only: people stand or sit, breathe; no motions, no camera, no showcase yet.
