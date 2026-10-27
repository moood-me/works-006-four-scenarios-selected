# The Landing Rocks (С3 of the game «Папа и море»)

The island's landing: the granite slab by the cove, the boat in the cove, the lighthouse on its knoll on the right, the
steps to its door, the stone with the arrow, the crooked pines, the open sea and the Fisherman's cape far off on the
left — at every hour and in the storm, with all the states the game's steps see (stage 4: people stand or sit and
breathe; no motions, no camera, no showcase yet).

- `tools/landing.py` writes `scene.json`; it reads the lib's tables (`PLACES`, `PINES`, `BOAT`) for the starting
  state. The island — sky, sea, granite, lighthouse, steps, pines, the hour, the storm — is the world's module
  `island` (`modules/island.md`; the light, the looks, the lights and the common keys from `tools/island.py`).
- The land is one function (`lib.js` `land`, of the island's `ridge` and `bump`), used by the relief and the island's
  painters. `SEA` is the sea's height.
- It opens at its first morning (`dawn` 1, the approved look); the empty play's other keys are as landed.
- What the keys move is the script's (`script.js`), from the lib's tables, at once and from the state:
  - `pines` 0…1 — the three pines `pine1…3` creep from the island's back to the threshold (their place keys
    `pine<n>_a/_d`); the six `pines` copies stay.
  - `door` 0…1 — the door is a card of its own on the tower (`island.door`; the tower paints the dark doorway),
    hung on its left jamb, opening outward toward the landing (`door_turn` = 180 + 70 · door) — against the pines.
  - `boat` (moored · up · cracked · tarred · away) and `boat_up` 0…1 — moored, her bow on the rocks and her stern
    afloat, rocking (her animate); pulled up the rocks as `boat_up` grows (`boat_a/_d/_turn`); cracked — a split along
    her strakes, tarred — a black stripe of tar over it; away — not painted.
  - `<id>_at` — each person at a named place (`lib.PLACES`, put by the island's `places`: their place keys, seat,
    turn, motion, look, reach); `<id>_placed` keeps which, so a scene opened again goes on as it was.
- Painted by the keys, once per state: on the granite itself (`lib.marks`; the granite repaints when they change, between
  steps) — `frost_step` (two broken bands of rime from the water's edge up to the threshold and back), `frost_patch`
  (rime by the landing), `cleft` (empty ·
  weed · sprout: the slit in the slab before the family, point `granite#cleft`; the shoot is the card `sprout`), `driftwood` (parts along the cove),
  `bundles` (slab — the bundle Mama sits on, her bag, the can; steps — three bundles on the lighthouse steps, one wet;
  none).
- The storm: the island's look, sky and sea; rain (`rain`) and spray on the cove's rocks (`spray`) by `storm`;
  lightning by the island's script. No lighthouse beam: the engine has no turning spotlight yet — the lantern's own
  light and glow are `lighthouse_lit`.
- The boulder is a form (Moomintroll sits on it); the bundle is a card now (it goes away with the luggage).
- People: the world's cast — papa, mama, troll, my, fisher (the Fisherman is not here at the start). Their places are
  near the camera where the story allows (the cleft is in the slab before the family, Little My's rock is on the slab);
  the door, the steps and the arrow stone stay at the lighthouse, 28–31 m off: those are framed by the pieces' shots.

## Contract for the check

```json
{"beats": {}, "points": ["lighthouse#door", "lighthouse#lantern", "door#door", "arrow_stone#stone", "granite#cleft", "boat#boat", "boat#mooring", "boat#lantern", "rock#edge", "sky#moon", "cape#point", "pines#crown", "papa", "mama", "troll", "my", "fisher"], "offers": ["papa", "mama", "troll", "my", "fisher", "lighthouse#door", "door#door", "arrow_stone#stone", "granite#cleft", "boat", "boat#mooring", "rock#edge"], "party": {"dawn": 1, "dusk": 0, "night": 0, "moon": 0.6, "storm": 0, "lighthouse_lit": 0, "pines": 0, "frost_step": false, "frost_patch": false, "boat": "moored", "cleft": "empty", "driftwood": false, "bundles": "slab", "papa_at": "slab", "mama_at": "slab", "troll_at": "boulder", "my_at": "stone", "fisher_at": "away"}, "acts": {"door": {"values": [], "tells": []}, "boat_up": {"values": [], "tells": []}, "flash": {"values": [], "tells": []}}}
```
