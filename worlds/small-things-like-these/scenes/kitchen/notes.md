# The Furlongs' Kitchen (`kitchen`) — the world's second scene, its look

Stage 2 of the game “Такие мелочи” (docs/new-games/takie-melochi/scenario.md): the house, against the convent's cold
yard of the first scene (`coal-gate`) — the same style, the warm side of the world. The moment is chapter I.4,
Thursday evening, ten days before Christmas: the cake is being mixed, Eileen counts the money in the tin, Bill's black
hands hold a handful of raisins over the bowl, Grace's hand is in the bowl while she looks at us, Sheila practises
“Silent Night” by the window. People stand and breathe; the rest of the life is the engine's: the lamp's halo in the
kitchen air, the range's fire flickering in its slot, steam from the kettle, the coloured bulbs across the street. No
script, no showcase yet: a picture for the owner's eye.

## The look

Warm and readable: one pendant lamp over the table is the room's light; the range's fire and the small red Sacred
Heart lamp are the other warm spots; the night is blue at the window and in the shadows (the ambient, `inside` 0.6 of
it). Black only in Bill's hands, the range's iron and the coal-dark of the firebox. The mustard of Bill's coat is here
too — hung on its peg by the corner, with his cap: he is at home. The palette: cream walls, sage-green panelling, red
quarry tiles, a faded red-check oilcloth, Eileen's washed-blue pinafore. Everything is painted in the day's colours;
the evening is the scene's light.

## The frame

`picture` camera, horizon 0.4; the eye at the room's open side looking at the back wall (6 m). Coordinates: across
(m right of the start's line), distance (m ahead); the room is x −3.2…3.2, the ceiling 2.9 m.

| Element | Where | What |
| --- | --- | --- |
| `sky` | the sky | night blue, lighter low down — seen only past the window |
| `street`, `street_lit` | (3.6, 12) | the houses across the street: a pink front with a lit window and a fanlit door, a cream one; the street lamp's post, its head `street_lit#lamp` (light `streetlamp`) |
| `street_lights` | (3.4, 9) | Christmas lights strung across the street: a sagging wire, bulbs in four colours, each its own glow (`b0`…) |
| `back_wall` | d 6, x −3.25…3.25 | panelling to the dado, distemper above; the chimney breast with the range's recess and the mantel (clock, caddy, candlestick); the calendar; the coats' peg board; the window's opening x 1.3…2.5, 1.0…2.3 m up, unpainted |
| `wall_left`, `wall_right` | x −3.2, x 3.2 | the side walls along their length; the hall door on the right one (d 4.0…4.85) |
| `floor`, `ceiling` | planes | red quarry tiles with a rag rug before the range; cream boards |
| `window`, `window_glass`, `opening`, `sill` | (1.9, 6) | the sash window's casing and bars, frost in the panes' lower corners, a net half-curtain; the panes as `glass` (the room mirrored faintly in them); the unseen opening the night's light comes in at (`window_light`); the sill |
| `range`, `range_top`, `range_fire`, `kettle`, `steam` | (−2.48, 5.52) | the cream range in the recess; its top with the hotplates; the fire's slot (`glows`, glow `fire` → light `fire`, flickering); the kettle (point `kettle#spout`) and its steam (particles `smoke`) |
| `sacred_heart`, `sacred_lamp` | (−1.45, 6), 1.4–2.1 m up | the picture and its small red lamp (glow `lamp` → light `sacred`) |
| `dresser` | (−3.15, 3.9), facing 90 | the dresser against the left wall: plates, cups, the wireless on its worktop |
| `coats` | (2.93, 5.9) | Bill's mustard overcoat and cap on the pegs, Eileen's coat behind with a school scarf |
| `table_top`, `table_front`, `chair` | (−0.35, 4.6) | the table (top a plane 0.76 m up, 1.6 × 0.85, casting its shadow; its front with the legs, the back legs a part); a chair pushed in at its far side |
| `bowl`, `raisins`, `tin`, `flour` | on the table | the mixing bowl (point `bowl#mix`), the raisins' basin, the open money tin (point `tin#tin`), the flour bag; coins, cherries, the spoon, spilt flour and raisins are painted flat on the top |
| `lamp` | (−0.35, 4.6), shade at 1.95 m | the pendant lamp: flex, green enamel shade, bulb (glow `bulb` → light `lamp`) |
| `eileen` | (−0.75, 5.33), turn 180 | behind the table, her right hand in the tin, her left on the table edge, looking at Bill, `thinking` |
| `bill` | (0.72, 4.5), turn 255 | at the table's right end in his shirt and waistcoat (the cast's `bill_home`), his right hand over the bowl, looking at Grace, `smile` |
| `grace` | (−0.15, 3.93), turn 140 | at the table's near side, her right hand reaching back into the bowl, looking at the viewer, `smile` |
| `sheila` | (1.65, 5.6), turn 195 | before the window, hands clasped at her chest, singing to the room, `smile` |

The people are the world's cast (`modules/cast.js`, style `keegan`; this scene added `bill_home`, `eileen`, `sheila`,
`grace` and the garments `waistcoat`, `pinafore`, `frock`, the part `floury_hands` — cast.md). A figure of shapes'
face does not open its mouth to sing: Sheila sings by her pose and her raised look.

## Light

`ambient` 0.62 of a night blue, `inside` 0.6 of it in the room; `bounce` 0.7. The warm point lights: `lamp` (1.8, reach
6.5 — the whole room), `fire` (orange, flickering, reach 3), `sacred` (red, reach 1.2); outside, `streetlamp` (sodium
amber) on the houses across the street; `window_light` — the night coming in at the window. A thin haze (0.05) with
`hazeGlow` 0.6 gives the lamp its halo in the kitchen's air.
