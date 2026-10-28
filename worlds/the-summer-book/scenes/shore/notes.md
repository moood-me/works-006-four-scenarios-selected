# The Shore by the House

The first scene of «The Summer Book» (С1 of the game's scenario): the island's smooth granite sloping into a pale
sea, the white-boarded house with its glazed veranda, peonies by the porch, the gate, the pier and the moored boat,
wind-bent pines on the crown. Its sea, sky, granite, pines, mist, fog and the hour and the weather are the island's
(`modules/isle.md`); the generator is `tools/shore.py` (`python -B tools/shore.py <world>` writes `scene.json`,
`elements/sky.*`, `elements/sea.*`). The approved look (stage 2) is `dawn: 1` with everyone at their first places.

- **The land** is `lib.ground` (relief.js): `coast(z)` the line of the rock, `shore(z)` where the sea meets it, `edge`
  the waterline (the storm's foam). Off the rock where the two stand lies **the shelf**: level granite 0.72 m under
  the water (`SHELF`) between distances 4.2 and 7.6, about two metres out; beyond three metres out the floor falls
  away. Sophia on it (`sophia_at: shelf`) is in the water to her chest: the sea plane hides her below its surface,
  pixel by pixel, and its mirror shows nothing under it. The sea's paint is thinned over the shelf (`clear` in
  `tools/shore.py`): the water is darker there, the bottom (`rock.js`: the shelf's pale granite, weed, a white stone)
  is for close shots, not for the wide view.
- `rock` paints the granite (the island's) and the shore's own: the grass and heather (burnt in August: `late`), the
  path, the shelf under the water. Its points: `rock#ledge` (the rock's edge over the shelf), `rock#shelf` (on the
  shelf, in the water), `rock#warm` (the warm rock they sit on in the calm).
- **The house** is cards and planes on the unseen anchor `house` (facing 200): the gable end with the glazed veranda
  (its panes clear: `veranda_in` behind them — the back wall, the door to the room, Papa's table and lamp — and Papa
  in it, `papa_at: veranda`, his face seen through the glass), the side, the roof, the chimney, the porch (its rail
  carries the shell ashtray: `shell`). The cat Mappe sits on the porch's landing (a painted card, `cat`: until the
  world's `cat` module comes, he does not move or leave).
- **The things of the summer**, each by a key between steps (their paintings read it — none moves while it plays):
  the gate and its stone (`gate`), the chair by it (`chair`), the graves (`graves` 0–5), wrack after the storm
  (`weed`), Papa's net on the pier (`net`), the family boat out at the nets by night with its lantern (`boat_out`:
  `far_boat`, the light `far_lamp`), the big boat and its gangway (`big_boat`), the things by the pier (`luggage`).
- **What moves** by keys over time: Eriksson's boat (`rowboat` 0 → 1 rows in along the shore to the pier's end, 1 →
  0 turns round and rows away: the script's, `lib.ROWBOAT`); the dinghy (`dinghy`: moored, `circles` — round and
  round before the rock, a lap in 26 s, — `out` along the shore by `dinghy_at`: `lib.DINGHY`).
- **The far house** (`far_roof`): the new house on the other side, white and black-windowed over its grey trees,
  far off past the house on the left of the sea.
- **People** (the world's `cast`): `<id>_at` names where each stands (`lib.PLACES`, put by the island's `places`):
  Grandmother — water, ledge, warm, path, gate, porch, peonies, pier, net, gangway; Sophia — water, edge, shelf, warm,
  graves, porch, pier, gangway; Papa — lawn, veranda, porch, pier, net, gangway. They stand and breathe (stage 4: no
  motions yet); seated places (the stone, the rock in the calm, the dinghy, Eriksson on his thwart) come with the
  motions of stage 5. **Eriksson is not in the scene yet**: his figure comes with the cast (package В); he will sit on
  `rowboat#seat`.
- The showcase (`showcase.js`) runs the summer: dawn, the shelf, Eriksson, the calm, the nets, the moon, the storm,
  the morning after, August, the last morning, the fog by night.

## Contract for the check

```json
{"beats": {},
 "points": ["rock#ledge", "rock#shelf", "rock#warm", "pier#end", "boat#boat", "rowboat#gunwale", "rowboat#seat", "net#knot", "gate#gate", "gate#stone", "chair#back", "porch#rail", "porch#landing", "graves#pit", "dinghy#oars", "dinghy#seat", "dinghy#bow", "gangway#rail", "big_boat#deck", "big_boat#bow", "luggage#basket", "house_front#veranda", "house_front#door", "house_front#gable", "cat#cat", "far_roof#roof", "far_boat#lamp", "sky#sun", "sky#sun_late", "sky#sun_dawn", "sky#moon", "grandma#chest", "sophia#chest", "papa#chest"],
 "offers": ["rock#ledge", "rock#shelf", "pier#end", "rowboat#gunwale", "net#knot", "gate#stone", "chair#back", "porch#rail", "graves#pit", "dinghy#oars", "gangway#rail", "grandma#chest", "sophia#chest", "papa#chest"],
 "party": {"dawn": 0, "dusk": 0, "night": 0, "late": 0, "calm": 0, "storm": 0, "flash": 0, "fog": 0, "moon": 1, "grandma_at": "water", "sophia_at": "water", "papa_at": "lawn", "rowboat": 0, "net": false, "chair": "none", "shell": false, "graves": 0, "weed": false, "boat_out": false, "dinghy": "moored", "dinghy_at": 0, "big_boat": false, "luggage": false, "grandma_here": true, "sophia_here": true, "papa_here": true},
 "acts": {"flash": {"values": [], "tells": ["flash:strike"]}}}
```

Against the plan's names: the shelf's points are the land's — `rock#ledge` (the plan's `ledge#edge`) and `rock#shelf`
(`ledge#water`): the shelf is the land itself, not a thing standing on it. `gate#stone` is the gate's.
