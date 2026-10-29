# The Potter's Room (С5 inside, «Дом гончара»)

Stage 5 (2026-10-29): the inside of the potter's house by the bridge — the lead's decision: a scene of its own (the
bridge shows the house only from outside); the game's place `room`. Same world, same look as `priest-house`: the flat
`bay` people, a warm small fire and a lamp against the blue night at the window. The feeling: a poor, warm, low room —
where a guest is given bread, and a cup is taken. Scenario §5: 3.3 (evening, the bench), 3.4 (night, the sleepwalking),
3.5–3.6 (morning, the cup gone), 3С.2 (the Soul's theft at night).

## Where things are (metres; the viewer at 0, looking in through the room's missing front side)

- The room: x −2.7…2.7, from 0.5 to 5.1 m ahead, the ceiling at 2.5 (three dark beams). `floor` (boards, `walk`),
  `ceiling`, `wall_back` (the window x 1.4…2.2, 0.95…1.75 up, left unpainted; `window_bars` its frame and sill),
  `wall_left`, `wall_right` (the doorway to the lane 1.2…2.1 m ahead, 1.95 high, left unpainted). The plaster —
  `lib.wall`.
- Outside: `sky` (night; the layer `dawn` shown by `morning` in its shader), `outside` — across the river the bridge's
  arches and two lamps (60 m), `lane` — the night lane beyond the doorway (a lit window across it).
- `window_opening`, `door_opening` — unseen: the moon and the sun come in only through the window (`through`), the air
  of the outside too (`window_air`, `daylight`).
- `hearth` (−1.75, 5.06) in the back wall: a stone surround, the fire a flickering layer (`fire` 0…1; light `fire`,
  `on` fire), a pot hanging; `embers` rising.
- `bench` (−0.5, 4.0; its seat `bench_top`, 0.45 high, `walk`) by the hearth, under the shelf: point `bench#seat`.
- `shelf` (0.55, 5.05, 1.25 up): the potter's best pots, a clay oil lamp burning (light `lamp`), the round loaf, and
  behind it the silver cup while `cup_at` is shelf. Points `shelf#cup`, `shelf#bread`.
- `pallet` (−2.1, 3.6) — the daughter's, on the floor by the fire; `bed_top`, `bed_side` (2.15, 3.6) — the potter's bed
  along the right wall.
- `door_leaf` — the door to the lane, hinged on the doorway's far side, opening into the room (`door` 0…1 →
  `door_turn` 270…355).

## State

`fire` 0…1, `morning` 0…1 (a look: the window pale, the sun in at it, the moon's light out), `door` 0…1, `cup_at`
shelf / hand / bag / gone (who holds it: the cast's `cup` by `<id>_with`; in the bag: the cast's `bag`), М5's `carry`
0…1 (the script walks the Fisherman from before the bench to the shelf) and `cup_tilt` −1…1 (the script sways his right
hand — `fisherman_reach` — to one side and the other before him; let go once the cup is on the shelf: a cast part
cannot read the scene's keys, so the cup itself stays upright in the hand — the hand sways), `soul_smoke`.

People at named places (places.md, lib.PLACES): `fisherman_at` — `bench` (sat, the default), `stand` (before the bench),
`shelf`, `door`; `potter_at` — `shelf` (default), `hearth`, `bed`, `door`, `by_daughter`; `daughter_at` — `pallet`
(default), `behind` (behind her father at the shelf), `door`; `soul_at` — `door`, `shelf`, `over_girl` (`soul_here`
false by default; its lantern the light `lantern_s`). Lying on the bench, asleep on the floor, kneeling, searching the
shelf — the pieces' motions (`lie_bench`, `sleep_floor`, `kneel`, `search`).

For М5 the game (or the piece before it) gives the Fisherman the cup (`fisherman_with: ["cup", …]`, `cup_at` hand):
the mini-game's mark is `fisherman#cup`, the cast part's point.

## Renders and the measuring

- Renders (2026-10-29, GPU service): the night room with the door ajar — the hearth was on the left wall seen edge-on
  (its fire hidden), the walls' patches painted past their boxes, the potter's back to us. Mended: the hearth in the
  back wall, the bench by it under the shelf, the plaster clipped and quieter, the ceiling lighter, a lamp on the shelf
  (faces by the shelf lit), the potter turned to the room. Second render: as meant — warm, the faces read.
- `measure_scene`: see below (once, as a new scene).

## Contract for the check

```json
{"points": ["bench#seat", "shelf#cup", "shelf#bread", "hearth#fire", "fisherman#cup"],
 "keys": ["fire", "morning", "door", "cup_at", "cup_tilt", "carry", "soul_smoke", "fisherman_at", "potter_at", "daughter_at", "soul_at"]}
```

The pieces are not written yet: no `beats`. Points and keys asked of this scene — the block above.
