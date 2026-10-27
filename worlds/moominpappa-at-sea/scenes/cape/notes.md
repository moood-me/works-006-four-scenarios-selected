# The Fisherman's Cape (С6 of the game «Папа и море»)

The cape (1.6–1.7, 2.4, the storm, the Pie): the Fisherman on his low stone in the lee of his rock, his net in his
hands and heaped at his feet, the rest of it drying on two driftwood poles; Moominpappa sitting on the granite beside
him; across the cove the island's long back rising to the lighthouse some sixty metres off, Moominmamma small on its
steps (stage 4: people stand or sit and breathe; no motions, no camera, no showcase yet).

- `tools/cape.py` writes `scene.json`; it reads the lib's `PLACES` for the starting state. The land is one function
  (`lib.js` `land`): the viewer's rock and the cape running out to the left, the Fisherman's knob of rock on it, a
  cove of water ahead, the island's back on the right up to the lighthouse's knoll. The sky, the sea, the granite, the
  lighthouse, its steps and the pines are the world's module `island` (`modules/island.md`), and so are the hour and
  the storm (the light from `tools/island.py`: the cape's late afternoon is the island's day).
- `lib.net` draws a net's diamond mesh. `net` (dry · knot · papa · mended · folded): the rack's hanging net (a layer
  the wind sways; bare when folded; a pale mended patch), the net at his feet (element `net`: the heap; a snarl of a
  knot; drawn up into Papa's paws, the knot before him; a roll beside him) — its point `net#knot` wherever the knot
  is; folded — his hands empty (`fisher_with` [] by the script; else the cast's `netload`).
- `bread` — the loaf on the flat stone by the path (`bread#stone`); `pie` — the pie on the rock beside him;
  `matchbox` (none · stone · palm) — on his stone, or in his right hand (its animate carries it to `fisher#hand_r`).
- `rocks` — three low boulders on the way over the rocks, `rocks#hold1…3` (the storm's minigame).
- The storm: the island's look, sky and sea; rain, spray on the cove's rocks, and `surge` — the wave coming in over
  the rocks and under the Fisherman (a layer its animate brings in and draws back, only in a storm); lightning by the
  island's script. No lighthouse beam (the engine has none yet).
- People (the world's cast): `<id>_at` — fisher (seat · away), papa (beside · behind · net · under · stand), mama
  (steps · beside · apart), my (rock), troll (near); put by the island's `places` from `lib.PLACES`. Little My and
  Moomintroll are not here at the start.
- The Fisherman's net on his shoulder (the finals) needs a part of the cast's (`modules/cast`); not here yet.

## Contract for the check

```json
{"beats": {}, "points": ["lighthouse#door", "lighthouse#lantern", "rack#net", "net#knot", "bread#stone", "pie#pie", "rocks#hold1", "rocks#hold2", "rocks#hold3", "seat", "sky#moon", "fisher", "papa", "mama", "my", "troll"], "offers": ["fisher", "papa", "mama", "my", "troll", "net#knot", "bread#stone", "rocks#hold1", "rocks#hold2", "rocks#hold3", "seat"], "party": {"dawn": 0, "dusk": 0, "night": 0, "moon": 0.6, "storm": 0, "lighthouse_lit": 0, "net": "dry", "bread": false, "pie": false, "matchbox": "none", "fisher_at": "seat", "papa_at": "beside", "mama_at": "steps", "my_at": "rock", "troll_at": "near"}, "acts": {"flash": {"values": [], "tells": []}}}
```
