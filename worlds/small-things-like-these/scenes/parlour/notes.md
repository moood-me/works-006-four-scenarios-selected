# The Mother Superior's Parlour (`parlour`) — the world's third scene, its look

Stage 2 of the game “Такие мелочи” (docs/new-games/takie-melochi/scenario.md): the convent from inside, against its
cold yard (`coal-gate`) and the Furlongs' warm kitchen (`kitchen`) — the same style; the three people of the first scene
in another light. The moment is chapter II.2, Sunday before light: Bill has put his cup down and stood up out of the low
chair — “The bolt was drawn from the outside, Mother” —, the Mother Superior stands by the window, Sara by the door,
barefoot in his mustard coat. The envelope (II.3) already lies on the tea table, for the look (`envelope`). People stand
and breathe; the rest of the life is the engine's: the fire's flames and its flicker on the room, the wall clock's
pendulum, a thread of steam from the teapot, and through the window the laundry's lit windows steaming and the mist
drifting over the yard. No script, no showcase yet: a picture for the owner's eye.

## The look

The warmth here is the convent's — the fire and the lamp that buy the quiet (the laundry's noise is not heard in this
room): the fire in the white marble mantelpiece, the lamp's parchment shade on the tea table between Bill and the Mother,
a small wall light by the door on Sara. The window is the cold: the dark blue before dawn, the laundry across the yard
with its steamed, lit windows, white steam and low mist. The room is readable to its corners in a cool ambient; the warm
pools are on the faces. Black only in the Mother's habit and Bill's hands; the mustard coat is now on Sara (the frame's
warm cloth), her red hands its one red. Faces: Bill `tired`, Sara `afraid`, the Mother `thinking`, each looking cheated
toward the eye so the faces are three-quarter. Everything is painted in the day's colours; the morning is the light.

## The frame

`picture` camera, horizon 0.34; the eye at the room's open side, the back wall 4.4 m ahead. Coordinates: across (m right
of the start's line), distance (m ahead); the room is x −2.6…2.6, d 0.55…4.4, the ceiling 3.6 m. The people lie within the
4:3 middle; the fire is seen between Sara and Bill, the window to the Mother's right (the laundry's steam behind her, as
in II.3), the clock between the chimney breast and the Mother.

| Element | Where | What |
| --- | --- | --- |
| `sky` | the sky | before dawn, deep blue, lighter low — seen only over the laundry's roof through the window |
| `yard`, `laundry`, `laundry_lit` | (6.5, 12), (7, 16) | the yard's frosted cobbles; the laundry's long front (eaves 3 m, slate roof); its four steamed windows lit (glows `w0`…`w3`) and a small lamp on a bracket (`lamp`) |
| `steam_a`, `steam_b`, `mist_out` | the laundry's windows; (7, 13.5) | steam out of two windows (particles `smoke`, `sheer`); low mist drifting along the yard (layer `mist`, drift, lib `blob` — no edge) |
| `back_wall` | d 4.4 | panelling, distemper, rail, cornice; the door (x −2.45…−1.75); the chimney breast with the white marble mantelpiece, green tile slips, the iron insert's arched opening; on the shelf Our Lady between brass candlesticks; the crucifix over it; the foundress's small portrait (x 1.0); the radiator; the window's opening (x 1.5…2.4, 0.8…2.7 m) unpainted |
| `wall_left`, `wall_right` | x −2.6, x 2.6 | the side walls; an icon of Our Lady of Perpetual Help; a glass-fronted bookcase |
| `floor`, `rug`, `ceiling` | planes | honey oak boards, polished (`reflect` 0.18, rough — the fire and the lamp in it); a faded Turkey rug under the table and the chair; the plaster ceiling |
| `window`, `window_glass`, `opening`, `sill` | (1.95, 4.4) | the sash window, its old-gold brocade curtains drawn back; the panes (`glass`); the unseen opening the morning comes in at (`window_light`); the sill |
| `clock` | (0.35, 4.37), 1.42–2.62 m | a mahogany wall regulator at twenty past six; its pendulum a layer swung by `clock.animate.js` (a beat a second) |
| `fire`, `flames`, `hearth`, `fender` | (−1.0, 4.36) | the coals in the grate (`glows`, glow and point `coals` → light `fire`, flickering); flames (particles `fire`); the slate hearth; the brass fender |
| `sconce` | left wall (−2.57, 3.2), 1.6 m | a brass wall light with a tulip shade (glow `bulb` → light `sconce`): Sara's face |
| `side_chair` | (−2.38, 3.4) | the hard chair by the door (where Bill's coat will lie, II.2's end) |
| `armchair` | (−0.05, 3.45), facing 165 | the low plum velvet armchair Bill has just got up from, its cushion pressed, a lace antimacassar |
| `table`, `table_top` | (0.55, 3.2) | the round tea table: a form (`kit.revolve`) — the white cloth to its lace hem, the mahogany pedestal; its top a plane 0.77 m up with the plate of biscuits and, when `envelope`, the Mother's envelope with the Christmas card |
| `lamp`, `lamp_shade` | (0.35, 3.05) on the table | the brass lamp; its pleated parchment shade (`glows`, glow `bulb` → light `lamp`) |
| `tea`, `steam_tea` | (0.62, 3.06) on the table | Bill's cup set down at the edge, the white-and-gold teapot (point `tea#spout`), the sugar bowl; steam from the spout |
| `sara` | (−2.0, 4.0), turn 165 | before the door, barefoot in Bill's mustard coat over her nightgown (the cast's `sara_coat`), both hands clutching the coat at her breast (`sara_reach`), looking at Bill, `afraid` |
| `bill` | (−0.2, 2.9), turn 120 | just risen from the low chair, in his tweed work jacket and green scarf (the cast's `bill_work`), the cap held in his right hand, his left hand by the cup on the table's edge (`bill_reach.l`), looking toward the Mother (cheated toward the eye), `tired` |
| `mother` | (1.05, 3.85), turn 220 | by the window, hands folded at the waist (`mother_reach`), looking at Bill (a point before him), `thinking` — cool; the lamp before her face |

The people are the world's cast (`modules/cast.js`, style `keegan`); this scene added `bill_work`, `sara_coat`, the
garment `bills_coat` and the part `cap_in_hand` (cast.md).

## State

`envelope` (boolean) — the envelope on the tea table (true for the look; a game keeps it false until II.3). The people's
keys are the engine's (`<id>_look`, `_reach`, `_mood`, …).

## Light

`ambient` 0.62 of a cool grey-blue, `inside` 0.55, `bounce` 0.6. The warm point lights: `fire` (orange, flickering,
reach 4.5), `lamp` (1.6, reach 4 — the faces of Bill and the Mother), `sconce` (0.9, reach 3 — Sara's face);
`window_light` — the morning's dark coming in at the window; outside, the laundry's windows' and its lamp's own glows.
A thin warm haze (0.05) with `hazeGlow` 0.5 gives the fire and the lamp their halos; a light vignette (0.25).
