# The Coal Gate (`coal-gate`) — the world's first scene, its look

Stage 2 of the game “Такие мелочи” (docs/new-games/takie-melochi/scenario.md): the place that sets the world's mood
and style, and its three main people standing as they stand in the story. Nothing moves but the engine's small life:
the people breathe — and their breath shows on the frost —, the lantern in Bill's hand swings a little and its flame
flickers, steam curls out of the laundry's windows and its kitchen door, low mist drifts over the yard and at the gate,
the fog drifts beyond the wall, the bare trees over the road give to the wind. No script, no
showcase yet: it is a picture for the owner's eye (the game's scenes come at the next stages).

The moment is chapter II.1, Sunday before light: Bill has opened the coal shed's door, its bolt drawn from the
outside, and found Sara there, who spent the night on the coal. The Mother Superior is put at the kitchen's back
door already (in the story she comes down a minute later): the three in one frame, for the look.

## The look

Light and readable, not dark: a deep blue December morning before the day, white fog (the haze), frost white on
the cobbles and the wall's coping; black only in the coal, the sacks and Bill's hands. The warm spots are few: the
lamp over the gate, Bill's lantern raised toward her (its light on Sara's face and red hands and into the shed), the
laundry's steamed-up windows, the open kitchen door behind the Mother and the lamp beside it on her face — the convent's
warmth — and Bill's mustard coat. The one red is Sara's hands. Faces read: the cast's face `keegan` (cast.md) —
Bill `tired`, Sara `afraid`, the Mother `thinking` (cool, measuring). Everything is painted in
the day's colours; the morning is the scene's light (`light`, `lights`).

## The frame

`picture` camera, horizon 0.5, the eye in the yard looking at the convent's back wall (9 m). Coordinates: across
(m right of the start's line), distance (m ahead).

| Element | Where | What |
| --- | --- | --- |
| `sky` | the sky | a gradient before light; soft cloud streaks drifting (layer `clouds`) |
| `tree` | copies at (−10.5, 15), (−15.5, 19) | bare ash trees over the road beyond the wall, a wind layer about the foot; kept left, so the title and the caption lie on clear sky |
| `road`, `fog_bank` | 9–19 m, 16 m | the frosted road beyond the wall; fog banks drifting (layer `fog`, wraps) |
| `mist_gate`, `mist_yard` | (1, 10.2), (0, 6.9) | low white mist (lib `mist`, layer `mist` swaying slowly by its animate, lib `mistSway`; its ends fade): at the gate and over the road; over the yard behind the people from the shed's side to short of the laundry, its foot running on along the ground toward the eye so it meets the cobbles with no edge |
| `lorry` | (1.3, 11.6) | Bill's lorry with coal sacks — seen only through the gate |
| `wall` | (−5, 9), x −9.6…8 | the convent wall: rubble, frosted coping; the gate's opening x 5.5…6.7 (across 0.5…1.7), the chute's hatch at across 2.2…2.7 |
| `gate`, `gate_lamp` | the opening | the grille leaf standing open into the yard (hinge at across 0.5, facing 240); the lamp over it (`gate_lamp#flame` → light `gate_light`) |
| `laundry`, `laundry_lit` | (3.4, 6.5), facing 260 | the laundry's long side on the right; on it, `glows`, the steamed panes (glows `w0`…`w4`) and the kitchen door (`door` → light `kitchen`) |
| `door_lamp` | (3.34, 5.12), 2.2 m up | a lantern on an arm out of the laundry's wall beside the kitchen door (lib `lamp`; light `door_light`): it lights the Mother's face from the front and above |
| `steam_near`, `steam_far`, `steam_door` | two windows' tops, the kitchen door's top | steam (particles `smoke`, `sheer`: the windows' light through it) |
| `breath_bill`, `breath_sara`, `breath_mother` | at each one's head | a puff of breath every ~3 s toward whom they look (particles `smoke`, bursts by their `.animate.js`) |
| `yard` | plane, −1.5…9.3 m | cobbles under rime; the frost worn black along the coal's ways (gate → shed door, gate → chute) and before the kitchen door |
| `shed` + `shed_front`, `shed_side`, `shed_back`, `shed_floor`, `coal_heap`, `sacks`, `shed_door` | anchor (−2.05, 4.2), facing 160 | the coal shed built on an unseen anchor: its front with the doorway (x 0…0.95), the right side, inside (`inside`) the back wall (grey-brown, lighter than the coal), the floor, the heap and two full sacks and an empty one just inside the door; the door swung out (facing 275 within the shed), the bolt on it |
| `cart` | (1.9, 8.4) | Bill's hand cart with two sacks, by the chute's hatch |
| `bill` | (−0.1, 4.5), turn 222 | Bill Furlong, the lantern in his left hand raised toward her face (`bill_reach.l`, 1.42 m), looking toward her (cheated a little toward the eye — `bill_look` a point before her — so his face is seen three-quarter, not in profile), `tired` |
| `sara` | (−1.51, 4.08), turn 155 | Sara in the shed's doorway, barefoot in her nightgown, both hands clutching the nightgown at her breast (`sara_reach`), looking toward Bill (cheated toward the eye as his look is), `afraid` |
| `mother` | (3.16, 5.84), turn 215 | the Mother Superior before the kitchen door, hands folded at the waist (`mother_reach`), looking toward Bill (a point before him), `thinking` — cool |

The people are the world's cast (`modules/cast.js`, style `keegan`: cast.md). The lantern is the cast's part
`lantern` (`bill_with`), its light `lantern` at `bill#flame`.

## Light

`ambient` 0.6 of a cool blue-white — the morning's own, so faces read; `haze` 0.6 of a white fog with `hazeGlow` 0.8
round the lamps; a weak cold far light `dawn` from behind the wall (rims); the warm point lights: `gate_light`,
`lantern` (2.2, reach 5.5: her face, her hands, the coal), `kitchen`, `door_light`; the windows' glows. The shed's inside takes 0.55 of it (`inside`) and Bill's lantern.

## The frame in 4:3

What matters lies within x 0.125…0.875 of the stage: the shed's door leaf on the left (the shed and Sara moved 0.55 m
right for it), the Mother on the right. The stone is laid by lib `rubble`: rough blocks with a clear darker joint.
