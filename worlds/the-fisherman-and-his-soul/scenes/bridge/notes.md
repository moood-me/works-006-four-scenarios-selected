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
  (bay) bank 21–24 m further left; the town's hill climbing to the right from 28 m out (24 m high at 160 m).
- `water` — the river's plane at −2.0, a mirror (`rough` 0.3, `ripple`): the moon, the bridge's arches and its lamps,
  the town's windows in it. `mist` — low banks on the water.
- The bridge crosses square to the river at 10–14 m out, from the far bank (out of view on the left) to our quay at
  −1.2: `bridge_face` (its downstream face: three arches, the openings cut through — the river upstream shows through
  them), `bridge_far` (the far parapet's inner face over the road), `deck` (its road, `walk`). `bridge_lamp` — three
  lamps on the parapets (on the end pillar at the head, over each pier); the scene's lights `lamp_head`, `lamp_near`,
  `lamp_far` are at their flames.
- `lane` — the cobbled quay lane from the viewer to the bridge's head, its river edge a kerb of coping slabs.
- The potter's house: `cottage` — its front (facing 270: x runs toward the viewer) at across 2.6, 3.3–8.7 m out,
  the door at 6.0; `cottage_glow` — the lit room through the door and windows (`glows`; its points `#door`, `#window`,
  `#far_window`, `#cup` — the silver cup on the shelf); `roof` — the tiled slope; `chimney` and its `smoke`; `wares` —
  the bench of pots by the door. The scene's light `hearth` stands in the doorway (the room's fire).
- The town: `house_a`, `house_b`, `house_c` — three kinds of house (`lib.house`), copies in rows up the hill, their lit
  windows glowing; `tower` on the top; `far_hills` beyond; `far_bank` — the bay's side across the river: reeds,
  willows, poplars.
- People: `fisherman` (−0.7, 9.0) just off the bridge, turned 125, the lantern (`fisherman_with`) in his right hand —
  the scene's light `lantern` is at `fisherman#flame`; `potter` (1.75, 6.3) before his door, turned 250; `daughter`
  (2.1, 5.6) at his side, turned 235, her right hand in his left (`_reach`). Looks: the Fisherman at the potter, the
  two of them at him.
