# The Bridge (С5 «Мост и город») — the look of the world, its third place

The third scene of «The Fisherman and His Soul» (stage 2 of the game stages: the look). Night at the town's end of the
bridge (chapter 3, 3.1–3.3): the viewer stands on the quay lane by the river; on the left the stone bridge of three
arches comes in from the bay's side and lands on our quay ahead; on the right the potter's low house with its door open
on the lit room (the hearth, the shelf with the silver cup); the town climbs its hill beyond, its windows lit, a tower
at the top. The Fisherman has just come off the bridge with his lantern; the potter stands before his door, his little
daughter holding his hand. People stand (the engine's `stand`); nothing moves but the river's current and its mirror,
the mist on the water, the chimney's smoke, the lamps' and the hearth's flicker, the clouds, the stars.

## Where things are (metres; the viewer at 0)

- `relief.js`: our quay level; the quay's edge 1.6 m left of the viewer, the river's bed 3.5 m down beyond it, the far
  (bay) bank 21–24 m further left; the town's hill climbing to the right from 20 m out (24 m high at 150 m).
- `water` — the river's plane at −2.0, a mirror (`rough` 0.3, `ripple`): the moon, the bridge's arches and its lamps,
  the town's windows in it. `mist` — low banks on the water.
- The bridge crosses square to the river at 10–14 m out, from the far bank (out of view on the left) to our quay at
  −1.2: `bridge_face` (its downstream face: three arches, the openings cut through — the river upstream shows through
  them), `bridge_far` (the far parapet's inner face over the road), `deck` (its road, `walk`). `bridge_lamp` — three
  lamps on the parapets (on the end pillar at the head, over each pier); the scene's lights `lamp_head`, `lamp_near`,
  `lamp_far` are at their flames.
- `lane` — the cobbled quay lane from the viewer to the bridge's head, its river edge a kerb of coping slabs.
- The potter's house: `cottage` — its front (facing 270: x runs toward the viewer) at across 2.6, 2.5–10.1 m out,
  the door at 7.4 (x −1.1), the windows at 5.0 and 9.2; `cottage_glow` — the lit room through the door and windows (`glows`; its points `#door`, `#window`,
  `#far_window`, `#cup` — the silver cup on the shelf); `roof` — the tiled slope; `chimney` and its `smoke`; `wares` —
  the bench of pots under the near window. The scene's light `hearth` stands in the doorway (the room's fire).
- The town: `house_a`, `house_b`, `house_c` — three kinds of house (`lib.house`), copies in rows up the hill and a row along our bank up the river, their lit
  windows glowing; `tower` on the top; `far_hills` beyond; `far_bank` — the bay's side across the river: reeds,
  willows, poplars.
- People: `fisherman` (−0.5, 8.4) just off the bridge, turned 110, the lantern (`fisherman_with`) in his right hand —
  the scene's light `lantern` is at `fisherman#flame`; `potter` (1.8, 7.6) before his door, turned 235; `daughter`
  (2.15, 7.0) at his side, turned 230, her right hand in his left (`_reach`). Looks: the Fisherman at the potter, the
  two of them at him — the three seen in profile across the lane.

## Stage 5: the hours, the square, the door, the beggar (2026-10-29, r3/rybak-pieces)

- The hours (hours.md): `time` night / evening / morning → `dusk`, `dawn`, `day` (the morning a clear day — the market:
  the stall out). The town's windows keep glowing in the day (their glows are painted lights; a look does not dim them).
- People at named places (places.md, lib.PLACES): `fisherman_at` / `soul_at` — `lane` (default), `under` (on the landing
  under the bridge's end by the water, 3.1), `head` (the bridge's head), `mid` (the bridge's middle), `stall`, `door`;
  `potter_at` — `door` (default), `stall`, `doorway`; `beggar_at` — `parapet` (sat against the far parapet midway,
  facing the road; `beggar_mood` eyes_closed). New people: `soul` (its lantern — the light `soul_lantern`; `soul_smoke`),
  `beggar`, `musician_a`, `musician_b` (at the bridge's head), `woman_a`, `woman_b` (by the potter's wares) — all
  `_here` false by default.
- `square` — the square's night (3.2): `lanterns` across the lane (each its own small light), `circle` (the empty ring
  of trodden sand on the cobbles), `stall` — the potter's stall out on the lane with coppers on it (point
  `stall#coppers`; also out in the morning).
- `door` 0…1 — the potter's door: `door_leaf` hinged on the doorway's near side, turned into the room (`door_turn` 270
  shut … 350 open); shut, it covers the lit room; the hearth's light in the lane goes with it (`hearth` on `door`).
- The beggar's `bowl` at his feet (point `bowl#coins`); `copper` — a pulse (count it up): the bowl rocks, a copper falls
  from the far parapet into the river (`coin`, `coin_splash`).
- `landing` — a stone landing under the bridge's end at the water (walk; `landing_face`). It is below the quay: seen
  from the scene's own camera only at its edge — a piece frames it (camera_x left, over the river: the river is now
  `water`, the eye stays over it).
- Render (2026-10-29): the square at night with the Soul at the stall, the musicians, the beggar on the bridge, the door
  ajar — as meant (the lanterns, the stall and its coppers, the ring lit by them; the faces read).

## Pieces

The pieces (`lib.film`, the world's `beats` from `script.js`): `market` (the prologue's morning: the cast's
`fish`), `under_bridge`, `over_bridge`, `square`, `hand_itself`, `shrug_back`, `bridge_dawn`, `beggar`, `soul_town`,
`rumour`, `door_potter`, `door_shut`. Variant: `slow` (door_shut). The daughter now stands at her place's keys. Sheet
(2026-10-29): as meant. The beggar's piece is filmed from the camera's own places on the road (`ON_ROAD`, `AT_BOWL`):
in a `walk` scene the operator films from the viewer's side, and the Fisherman faces the far parapet — framed, he is
his back and the bowl is hidden behind him (render 2715). Their heights are over the road: the `deck`
walk plane is the floor under the scene's own camera there. `camera_h` was 1.9 and 1.5 (written as if the eye stood over
the river, −2 m) — the eye was ≈2 m too high on every engine; now −0.1 and −0.5 (1.6 and 1.2 m over the road). A shot
framed on `bowl#coins` (0.15 m tall) puts the lens 0.6 m from it, inside the Fisherman: the bowl is the camera's own.

## Contract for the check

```json
{"beats": {
 "market": {"after":[],"tells":["market:give","market:end"],"seconds":12,"show":false},
 "under_bridge": {"after":[],"tells":["under_bridge:sat"],"seconds":6,"show":false},
 "over_bridge": {"after":[],"tells":["over_bridge:walk","over_bridge:head"],"seconds":12,"show":false},
 "square": {"after":[],"tells":["square:met"],"seconds":8,"show":false},
 "hand_itself": {"after":["square"],"tells":["hand_itself:reach","hand_itself:caught"],"seconds":8,"show":false},
 "shrug_back": {"after":["hand_itself"],"tells":["shrug_back:turn"],"seconds":8,"show":false},
 "bridge_dawn": {"after":[],"tells":["bridge_dawn:stop","bridge_dawn:on"],"seconds":12,"show":false},
 "beggar": {"after":[],"tells":["beggar:reach","beggar:caught","beggar:copper"],"seconds":16,"show":false},
 "soul_town": {"after":[],"tells":["soul_town:met"],"seconds":10,"show":false},
 "rumour": {"after":[],"tells":["rumour:say"],"seconds":8,"show":false},
 "door_potter": {"after":[],"tells":["door_potter:open","door_potter:cup"],"seconds":10,"show":false},
 "door_shut": {"after":["door_potter"],"tells":["door_shut:take","door_shut:shut"],"seconds":8,"show":false}
},
 "points": ["stall#coppers","bowl#coins","cottage_glow#cup","sky#disc"],
 "keys": ["time","square","door","copper","soul_smoke","fisherman_at","soul_at","potter_at","beggar_at"]}
```
