# The Furlongs' Kitchen (`kitchen`) — the world's second scene, its look

Stage 2 of the game “Такие мелочи” (docs/new-games/takie-melochi/scenario.md): the house, against the convent's cold
yard of the first scene (`coal-gate`) — the same style, the warm side of the world. The moment is chapter I.4,
Thursday evening, ten days before Christmas: the cake is being mixed — Bill at the table's end holds a handful of raisins
over the bowl and looks at his black hands; behind the table Grace's hand is in the raisins while she looks at us, and
Eileen counts the money in the tin, looking at Bill; Sheila practises “Silent Night” by the window. People stand and breathe; the rest of the life is the engine's: the lamp's halo in the
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

`picture` camera, horizon 0.4; the eye at the room's open side looking at the back wall (5.2 m). Coordinates: across
(m right of the start's line), distance (m ahead); the room is x −3.2…3.2, d 1.5…5.2, the ceiling 2.9 m. The people
stand round the lamp so it lights their faces: who faces us is behind the table or beside the lamp, not before it.

| Element | Where | What |
| --- | --- | --- |
| `sky` | the sky | night blue, lighter low down — seen only past the window |
| `street`, `street_lit` | (3.6, 12) | the houses across the street: a pink front with a lit window and a fanlit door, a cream one; the street lamp's post, its head `street_lit#lamp` (light `streetlamp`) |
| `street_lights` | (3.4, 9) | Christmas lights strung across the street: a sagging wire, bulbs in four colours, each its own glow (`b0`…) |
| `back_wall` | d 5.2, x −3.25…3.25 | panelling to the dado, distemper above; the chimney breast with the range's recess and the mantel (clock, caddy, candlestick); the calendar; the coats' peg board; the window's opening x 1.3…2.5, 1.0…2.3 m up, unpainted |
| `wall_left`, `wall_right` | x −3.2, x 3.2 | the side walls along their length; the hall door on the right one (d 3.2…4.05) |
| `floor`, `ceiling` | planes | red quarry tiles with a rag rug before the range; cream boards |
| `window`, `window_glass`, `opening`, `sill` | (1.9, 5.2) | the sash window's casing and bars, frost in the panes' lower corners, a net half-curtain; the panes as `glass` (the room mirrored faintly in them); the unseen opening the night's light comes in at (`window_light`); the sill |
| `range`, `range_top`, `range_fire`, `kettle`, `steam` | (−2.48, 4.72) | the cream range in the recess; its top with the hotplates; the fire's slot (`glows`, glow `fire` → light `fire`, flickering); the kettle (point `kettle#spout`) and its steam (particles `smoke`) |
| `sacred_heart`, `sacred_lamp` | (−1.45, 5.2), 1.4–2.1 m up | the picture and its small red lamp (glow `lamp` → light `sacred`) |
| `dresser` | (−3.15, 4.1), facing 90 | the dresser against the left wall: plates, cups, the wireless on its worktop |
| `coats` | (2.93, 5.1) | Bill's mustard overcoat and cap on the pegs, Eileen's coat behind with a school scarf |
| `table_top`, `table_front` | (−0.35, 3.8) | the table (top a plane 0.76 m up, 1.6 × 0.85, casting its shadow; its front with the legs, the back legs a part) |
| `bowl`, `raisins`, `tin`, `flour` | on the table | the mixing bowl at Bill's end (−0.95, 3.62; point `bowl#mix`), the raisins' basin before Grace (−0.35, 4.05), the open money tin before Eileen (0.1, 4.1; point `tin#tin`), the flour bag; coins, cherries, the spoon, spilt flour and raisins are painted flat on the top |
| `lamp` | (−0.35, 3.8), shade at 1.95 m | the pendant lamp: flex, green enamel shade, bulb (glow `bulb` → light `lamp`) |
| `bill` | (−1.45, 3.7), turn 115 | at the table's left end in his shirt and waistcoat (the cast's `bill_home`), a handful of raisins over the bowl, looking at it, `smile` |
| `grace` | (−0.2, 4.42), turn 180 | behind the table, head and shoulders over it, her right hand in the raisins, looking at the viewer, `smile` |
| `eileen` | (0.25, 4.4), turn 195 | behind the table, her right hand in the tin, her left on the table's edge, looking at Bill, `thinking` |
| `sheila` | (1.65, 4.8), turn 200 | before the window, hands clasped at her chest, singing to the room, `smile` |

The people are the world's cast (`modules/cast.js`, style `keegan`; this scene added `bill_home`, `eileen`, `sheila`,
`grace` and the garments `waistcoat`, `pinafore`, `frock`, the part `floury_hands` — cast.md). A figure of shapes'
face does not open its mouth to sing: Sheila sings by her pose and her raised look.

## Light

`ambient` 0.62 of a night blue, `inside` 0.6 of it in the room; `bounce` 0.7. The warm point lights: `lamp` (1.7, reach
5 — the table and the people; the corners fall to the night's blue), `fire` (orange, flickering, reach 3), `sacred` (red, reach 1.2); outside, `streetlamp` (sodium
amber) on the houses across the street; `window_light` — the night coming in at the window. A thin haze (0.05) with
`hazeGlow` 0.45 gives the lamp its halo in the kitchen's air.
