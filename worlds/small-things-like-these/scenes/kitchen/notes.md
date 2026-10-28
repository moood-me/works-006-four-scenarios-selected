# The Furlongs' Kitchen (`kitchen`) — the world's second scene, its look

Stage 2 of the game “Такие мелочи” (docs/new-games/takie-melochi/scenario.md): the house, against the convent's cold
yard of the first scene (`coal-gate`) — the same style, the warm side of the world. The moment is chapter I.4,
Thursday evening, ten days before Christmas: the cake is being mixed — Bill stands at the table's end, his black hand
resting on its edge, turned to the room; behind the table Grace's hand is in the raisins while she looks at us, and
Eileen counts the money in the tin, looking toward Bill; Sheila practises “Silent Night” by the window. People stand
and breathe; the rest of the life is the engine's: the lamp's halo in the kitchen air, the range's fire flickering in
its slot, steam from the kettle, the coloured bulbs across the street, the wireless's dial. No script, no showcase yet:
a picture for the owner's eye.

## The look

The warmth is a spot, not the room: one pendant lamp over the table (reach 3 m) lights the table, the people's faces
and hands round it; the range's fire and the small red Sacred Heart lamp are the other warm spots; the rest of the room
is in the evening's cool, clear ambient (0.7 of a grey-blue) — readable to its corners, not darkened at the edges (a
light vignette). The floor is a quiet grey-buff quarry tile, a ground for the people; the rag rug's colours faded.
Black only in Bill's hands, the range's iron and the coal-dark of the firebox. Bill reads as the hero: a white shirt and
a bottle-green waistcoat (the cast's `bill_home`) against the cream wall and the brown range; his mustard coat and cap
hang on their peg by the corner — he is at home. The money tin (a red tartan tin, open, coins and a pound note in it)
stands before Eileen at the table's front; the wireless is on its own shelf on the back wall between the calendar and
the window. Everything is painted in the day's colours; the evening is the scene's light.

## The frame

`picture` camera, horizon 0.35; the eye at the room's open side looking at the back wall (4.2 m). Coordinates: across
(m right of the start's line), distance (m ahead); the room is x −3.2…3.2, d 0.5…4.2, the ceiling 2.9 m. The people and
the table lie within the 4:3 middle (x 0.125…0.875 of the stage) with room round them; faces are turned three-quarter
or full to the eye and lit by the lamp: who faces us is behind the table or beside the lamp, not before it.

| Element | Where | What |
| --- | --- | --- |
| `sky` | the sky | night blue, lighter low down — seen only past the window |
| `street`, `street_lit` | (3.6, 11) | the houses across the street: a pink front with a lit window and a fanlit door, a cream one; the street lamp's post, its head `street_lit#lamp` (light `streetlamp`) |
| `street_lights` | (3.4, 8) | Christmas lights strung across the street: a sagging wire, bulbs in four colours, each its own glow (`b0`…) |
| `back_wall` | d 4.2, x −3.25…3.25 | panelling to the dado, distemper above; the chimney breast with the range's recess and the mantel (clock, caddy, candlestick); the calendar; the coats' peg board; the window's opening x 1.3…2.5, 1.0…2.3 m up, unpainted |
| `wall_left`, `wall_right` | x −3.2, x 3.2 | the side walls along their length; the hall door on the right one |
| `floor`, `ceiling` | planes | grey-buff quarry tiles with a rag rug before the range; cream boards |
| `window`, `window_glass`, `opening`, `sill` | (1.9, 4.2) | the sash window's casing and bars, frost in the panes' lower corners, a net half-curtain; the panes as `glass`; the unseen opening the night's light comes in at (`window_light`); the sill |
| `range`, `range_top`, `range_fire`, `kettle`, `steam` | (−2.48, 3.72) | the cream range in the recess; its top with the hotplates; the fire's slot (`glows`, glow `fire` → light `fire`, flickering); the kettle (point `kettle#spout`) and its steam (particles `smoke`) |
| `sacred_heart`, `sacred_lamp` | (−1.45, 4.2), 1.4–2.1 m up | the picture and its small red lamp (glow `lamp` → light `sacred`) |
| `wireless` | (0.82, 4.17), 1.28 m up | the wireless on its shelf: a walnut cabinet, cloth grille behind a sunrise fret, the dial lit (its glow `dial`) |
| `dresser` | (−3.15, 3.1), facing 90 | the dresser against the left wall: plates, cups, a jug and the bread crock |
| `coats` | (2.93, 4.1) | Bill's mustard overcoat and cap on the pegs, Eileen's coat behind with a school scarf |
| `table_top`, `table_front` | (−0.2, 2.8) | the table (top a plane 0.76 m up, 1.6 × 0.85, casting its shadow; its front with the legs) |
| `bowl`, `raisins`, `tin`, `flour` | on the table | the mixing bowl at Bill's end (−0.75, 2.62; point `bowl#mix`), the raisins' basin before Grace (−0.45, 3.0), the open money tin before Eileen (0.3, 2.97; point `tin#tin`), the flour bag behind; coins, cherries, the spoon, spilt flour and raisins are painted flat on the top |
| `lamp` | (−0.2, 2.8), shade at 1.95 m | the pendant lamp: flex, green enamel shade, bulb (glow `bulb` → light `lamp`) |
| `bill` | (−1.36, 2.74), turn 155 | at the table's left end in his shirt and waistcoat, upright, shoulders down, his left hand resting on the table's edge (`bill_reach.l`), the right at his side; looking out into the room past the lamp, so his face is three-quarter to the eye and lit, `smile` |
| `grace` | (−0.42, 3.44), turn 180 | behind the table, head and shoulders over it, her right hand in the raisins, looking at the viewer, `smile` |
| `eileen` | (0.4, 3.45), turn 188 | behind the table, her right hand in the tin, her left on the table's edge, looking toward Bill (cheated toward the eye, so her face is three-quarter, not in profile), `thinking` |
| `sheila` | (1.62, 3.78), turn 200 | before the window, hands clasped at her chest, singing to the room, `smile` |

The people are the world's cast (`modules/cast.js`, style `keegan`; this scene added `bill_home`, `eileen`, `sheila`,
`grace` and the garments `waistcoat`, `pinafore`, `frock`, the part `floury_hands` — cast.md). A figure of shapes'
face does not open its mouth to sing: Sheila sings by her pose and her raised look.

## Light

`ambient` 0.7 of a cool grey-blue, `inside` 0.6 of the outside's light in the room; `bounce` 0.5. The warm point
lights: `lamp` (1.9, reach 3 — the table and the people round it; beyond it the room is in the cool ambient), `fire`
(orange, flickering, reach 2.2), `sacred` (red, reach 1.2), the wireless's dial (its own small glow); outside,
`streetlamp` (sodium amber) on the houses across the street; `window_light` — the night coming in at the window. A thin
neutral haze (0.05) with `hazeGlow` 0.5 gives the lamp its halo in the kitchen's air. A light cool tint, a light
vignette (0.18).

## Changed

- Owner's review of the look: the room 1 m nearer and the horizon 0.35 (faces larger; all on the 4:3 frame); Bill
  upright, his hand on the table's edge, face to the room, in a white shirt and a bottle-green waistcoat; Eileen
  three-quarter; the floor neutral; the warmth only the lamp's pool; the wireless on its own shelf, the money tin a
  clear open tartan tin.
