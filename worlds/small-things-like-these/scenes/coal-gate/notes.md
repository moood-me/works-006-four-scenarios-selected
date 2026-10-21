# The Coal Gate (`coal-gate`) — the world's first scene, its look

Stage 2 of the game “Такие мелочи” (docs/new-games/takie-melochi/scenario.md): the place that sets the world's mood
and style, and its three main people standing as they stand in the story. Nothing moves but the engine's small life:
the people breathe, the lantern in Bill's hand swings a little and its flame flickers, steam curls out of the
laundry's windows, the fog drifts beyond the wall, the bare trees over the road give to the wind. No script, no
showcase yet: it is a picture for the owner's eye (the game's scenes come at the next stages).

The moment is chapter II.1, Sunday before light: Bill has opened the coal shed's door, its bolt drawn from the
outside, and found Sara there, who spent the night on the coal. The Mother Superior is put at the kitchen's back
door already (in the story she comes down a minute later): the three in one frame, for the look.

## The look

Light and readable, not dark: a deep blue December morning before the day, white fog (the haze), frost white on
the cobbles and the wall's coping; black only in the coal, the sacks and Bill's hands. The warm spots are few: the
lamp over the gate, Bill's lantern (its light on Sara's face and into the shed), the laundry's steamed-up windows and
the open kitchen door behind the Mother — the convent's warmth — and Bill's mustard coat. Everything is painted in
the day's colours; the morning is the scene's light (`light`, `lights`).

## The frame

`picture` camera, horizon 0.5, the eye in the yard looking at the convent's back wall (11 m). Coordinates: across
(m right of the start's line), distance (m ahead).

| Element | Where | What |
| --- | --- | --- |
| `sky` | the sky | a gradient before light; soft cloud streaks drifting (layer `clouds`) |
| `tree` | 17 m and 21 m (copies) | bare ash trees over the road beyond the wall, a wind layer about the foot |
| `road`, `fog_bank` | 11–21 m, 18 m | the frosted road beyond the wall; fog banks drifting (layer `fog`, wraps) |
| `lorry` | (1.3, 13.6) | Bill's lorry with coal sacks — seen only through the gate |
| `wall` | (−5, 11), x −9.6…8 | the convent wall: rubble, frosted coping; the gate's opening x 5.5…6.7 (across 0.5…1.7), the chute's hatch at across 2.2…2.7 |
| `gate`, `gate_lamp` | the opening | the grille leaf standing open into the yard (hinge at across 0.5, facing 240); the lamp over it (`gate_lamp#flame` → light `gate_light`) |
| `laundry`, `laundry_lit` | (3.4, 8.5), facing 260 | the laundry's long side on the right; on it, `glows`, the steamed panes (glows `w0`…`w4`) and the kitchen door (`door` → light `kitchen`) |
| `steam_near`, `steam_far` | at two windows' tops | steam (particles `smoke`) |
| `yard` | plane, 0.5…11.3 m | cobbles under rime; the frost worn black along the coal's ways (gate → shed door, gate → chute) and before the kitchen door |
| `shed` + `shed_front`, `shed_side`, `shed_back`, `shed_floor`, `coal_heap`, `shed_door` | anchor (−2.6, 6.2), facing 160 | the coal shed built on an unseen anchor: its front with the doorway (x 0…0.95), the right side, inside (`inside`) the black back wall, the floor and the heap; the door swung out (facing 275 within the shed), the bolt on it |
| `cart` | (1.0, 5.1) | Bill's hand cart with two sacks, near right |
| `bill` | (−0.35, 6.7), turn 250 | Bill Furlong, the lantern in his left hand raised toward her (`bill_reach.l`), looking at her, `sad` |
| `sara` | (−2.06, 6.08), turn 145 | Sara in the shed's doorway, barefoot in her nightgown, arms crossed against the cold (`sara_reach`), looking at Bill, `afraid` |
| `mother` | (3.16, 7.84), turn 225 | the Mother Superior before the kitchen door, hands folded at the waist (`mother_reach`), looking at Bill, a polite `smile` |

The people are the world's cast (`modules/cast.js`, style `keegan`: cast.md). The lantern is the cast's part
`lantern` (`bill_with`), its light `lantern` at `bill#flame`.

## Light

`ambient` 0.62 of a cool blue-white — the morning's own, so faces read; `haze` 0.45 of a white fog with `hazeGlow`
round the lamps; a weak cold far light `dawn` from behind the wall (rims); the warm point lights: `gate_light`,
`lantern`, `kitchen`; the windows' glows. The shed's inside takes 0.4 of it (`inside`) and Bill's lantern.
