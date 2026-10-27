# The Cape

The island's far end (C4 of the game's scenario): bare granite going down into the open sea, Sophia's tent on the
rocks, the fog coming in from the sea; far up the island, over the rock, the house with Grandmother's window. Stage 2
(the look): the place, its light and its two people standing — no motion of people but a look, no camera moves.

- **The land** is `lib.ground` (relief.js): `coast(z)` is the line of the rock at a distance (near on the right,
  bending away to the left), `shore(z)` where the sea meets it; inland the island rises to the house (60 m ahead, 27 m
  left) and ends beyond 95 m. `rock` is the draped plane that paints it (granite, the wet band, cracks, lichen; moss and
  heather inland; grass round the house).
- **The tent** is cards and planes on the unseen anchor `tent` (facing 215): `tent_front` (the door's opening cut out,
  the flaps tied back), `tent_back`, the two roof slopes (`tent_slope_r`, `tent_slope_l`, tilt ± 55.2°, painted by `lib.tentSlope`), `tent_floor` (Sophia's
  blanket) and the candle `lantern` inside the door. The canvas is `translucent`: the candle makes it glow.
- **Far off**: `far_house` (painted flat, as far things are) and `far_window` before it (glows: its pane lit by
  `window`), the pines round it; the fog's wall on the horizon (`fog_bank`) and its banks over the water (`mist`, two
  copies, two drifting layers each — `fog` thickens them).
- **The light**: `night` turns the August dusk (the afterglow low on the left) to the moonlit night — the moon stands
  behind the viewer, over the island (the far light `moon`, on `night`), so the faces turned to us are lit by it and the
  fog ahead is white under it; the sky paints both hours (its layers cross-faded). `candle` — the lantern's light,
  `window` — Grandmother's lamp.
- **People** (the world's `cast`): Sophia before her tent, looking at Grandmother; Grandmother nearer, her hands behind
  her back, looking out over the water to the right, where the fog comes from (she is nearer the viewer than Sophia:
  a look back at her would turn her body away). `boulders` are forms (`lump`), lit as volumes.
- Points: `tent_front#door`, `lantern`, `far_window#window`.
