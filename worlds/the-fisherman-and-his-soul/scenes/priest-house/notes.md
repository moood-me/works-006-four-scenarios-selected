# The Priest's House (С3 «Дом Священника»)

Stage 4 of the game (all the places, people standing): the white room on the hill — the altar-table with its candles,
the door open on the night, the lamp over the threshold. Same world, same look as `pier`, `well`, `bridge`: the flat
`bay` people, moonlight against warm small flames. The feeling: a severe white room, and the open door out of it.
People stand and sit; what moves: the candles' flames and their light, the lamp swaying in the draught, a little dust in
the light from the door, the grass outside, the sea's ripples and the moon's path, the stars.

## Where things are (metres; the viewer at 0, looking in through the room's missing front side)

- The room: x −3.2…3.2, from 0.4 to 6.0 m ahead, the ceiling at 3.3 (three dark beams). `floor` (flagstones, `walk`),
  `ceiling`, `wall_back` (facing us; the doorway x −0.1…1.0, 2.25 high, left unpainted), `wall_left`, `wall_right`
  (pegs with the Priest's cloak and stole near the back), the doorway's thickness `jamb_l`, `jamb_r`, `soffit` (the wall
  0.45 thick: the threshold stone is 6.0–6.45 m ahead). The walls' limewash and blue-grey foot band — `lib.wall`.
- `door_leaf` — the door, opened inward, standing against the back wall right of the doorway.
  `door_opening` — unseen, the doorway's rectangle on the outer face: the moon and the sun come in only through it
  (`through`), and the outside air (`door_air`, `daylight`).
- `lamp` (0.45, 5.72) — an iron hook over the doorway, a lantern on a short chain swaying (`lamp.animate.js`); its
  flame is the light `lamp`.
- The altar along the left wall, 2.8–4.6 m ahead, 0.95 high: `altar` (its long side, facing the room), `altar_end`,
  `altar_top`; `candles` — three copies (3.15, 3.7, 4.25 m ahead), each flame a light (`candles`, every copy's);
  `cross` on the wall above.
- The bench (1.2: the Fisherman sits on it): an unseen anchor `bench` at its back-bottom edge (1.54, 4.358), facing 250
  (the way the sitter faces), and on it `bench_seat` (point `bench_seat#seat`, 0.45 up), `bench_front`, `bench_end_l`,
  `bench_end_r`. `bench_tilt` turns the anchor back about that edge: 90 — knocked over backwards, lying on its back.
- Outside, seen through the doorway: `sky` (night with the moon low over the sea, x 1.0 y 0.405 — in the doorway; the
  layer `dawn` shown over it by `morning` in its shader), `sea` (a mirror at −30: the moon's path), `far_land` (the
  bay's far side, the town's few lights), `hill` (draped; `relief.js`: level to 9 m, then falling to the shore), `grass`.
- People (`modules/cast`): `priest` (−1.5, 4.4) turned 110 by the altar; `fisherman` sat on the bench
  (`fisherman_on` [1.57, 4.37, 0.45] — 0.2 m behind the seat's middle: the `seated` loop puts the hips that far before the point, `seated`) turned 250; they look at each other, both a little toward us. Not here
  unless a moment wants them: `woman_a`, `woman_b` (the village women), `witch`.

## State

`morning` 0 night … 1 early morning (a light look: the dawn sky, the moon's light out, the sun's in at the door; the
candles and the lamp burn in both). `flowers`: none / altar / threshold. `bench_tilt` 0…90. People's places:
`<id>_a`, `<id>_d` (their `place`), and the engine's keys (`_here`, `_turn`, `_look`, `_on`, `_mood`…).

## The moments set here (scenario §5, §10)

| Moment | Light | Who, where |
| --- | --- | --- |
| 1.2 «Священник» | `morning` 1, candles lit | the Priest at the altar (−1.5, 4.4) turned 110; the Fisherman on the bench (as the default). He rises sharply — `bench_tilt` → 90 —, goes to the door; on the threshold (0.45, 5.75), turned to the room or out, he makes the sign (stage 5: a motion) |
| «Белые цветы», three years on, the feast | `morning` 1, `flowers` altar | the Priest at the altar turned toward the room (~150), speaking; the two women before him (e.g. (−0.9, 2.6) and (0.2, 2.9), turned toward him); no Fisherman |
| «Фонарь на мостках», the third spring | `morning` 1 | the Fisherman lays the flowers on the threshold (`flowers` threshold, he at (0.45, 5.75) turned 0, then gone: `fisherman_here` false, `fisherman_on` null); the Priest finds them and sets them on the altar (`flowers` altar) |
| «Два огня», years on | `morning` 1 (or 0: unsaid) | the Priest on the threshold (0.45, 5.6) turned 180, speaking to the room; `woman_a`, `woman_b` before him, the `witch` among them (`witch_mood` laugh) — the defaults of their places; no Fisherman |

The Soul is not here in any moment (in 1.2 it is still in him: one shadow).

## Wanted from the engine / not yet

- Nothing found missing yet (see the history note for the renders).
