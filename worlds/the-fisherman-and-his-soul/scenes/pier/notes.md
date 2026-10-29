# The Pier (С1 «Мостки»)

The first scene of «The Fisherman and His Soul»: the look of the world (stage 2), and since stage 5 also the shore by
the pier (the game's place `shore`: `view` shore). A moonlit night in the bay by default: the pier runs from the bottom
left out into the water; at its end the lantern post, the Fisherman by it; his Soul — his shadow, risen — beside him on
the boards; the Mermaid in the water by the pier's end, to the chest, her tail out of the water behind her, the stone
glowing in the water beyond.

## Where things are (metres; the viewer at 0, the water's surface at -0.48)

- `relief.js`: the floor drops from 0 at 0.8 m to -2.4 at 4 m out, and stays there; behind the viewer the sand runs
  back level, the bank rises 2 m from 6 to 11 m behind, the field on its top. The water's edge is at 1.44 m ahead.
- `pier_deck`: a plane from (-6.8, -2.0) (its root on the sand) to (0.2, 5.0), turned -44.7°, its top at 0.15 (a plane's
  elevation is absolute) — people stand on it (`walk`); in the snow (`snow`) white. `pier_beam` its near side;
  `pier_posts` copies.
- `lantern_post` at the deck's right corner by its end (0.75, 4.49): its lantern a layer swinging on the hook while
  `lantern_at` is post (its flame the light `lantern`); the knife driven into it at chest height (`knife` post, `rust`;
  point `lantern_post#knife`); point `lantern_post#grip` — where a hand holds it from the water (М9).
- `lantern_boards` (0.42, 4.3) — the lantern set down on the boards (`lantern_at` boards; light `lantern_low`);
  `knife_boards` — the knife lying on the boards (`knife` boards; point `knife_boards#knife`); `cutline` — the edge of
  his shadow at his soles where he stands at the end (М3, М6: points `cutline#heel`, `cutline#toe`; `cut` draws a thin
  line of light from the heel, `cut_rough` makes it ragged).
- `rock` — the stone (2.9, 6.2), `water` glowing teal round it; `under` — a pale light lying under the water by it
  (`under_light`); `fin` — her tail's fluke rising behind her and `rings` round her — both go with her (`fin_a`,
  `fin_d` from her place; none while she is on the sand or gone).
- Far: `far_shore`, `far_ridge`, `town` (glows), `mist` (far banks), `mist_near` (banks near, by `mist`), `far_lamp` —
  his lantern going along the shore road to the town and over the hill (`far_lantern`, as the stone's `far_light`).
- The sky (`sky.js`, its shader `sky.wgsl`) is painted all the way round (the shore's view looks back over the land):
  the night with the moon high on the left (`sky#disc`, the light `moon`) and, as layers shown by the shader, the dusk
  (rose and amber low, the moon rising big and low behind the pier's end — `sky#low`, the light `moon_low`), the dawn
  and the day (hours.md: `light`).
- The shore (behind the viewer; seen with `view` shore): `ground` — one plane draped over the land (wet sand at the
  edge, pale sand, the bank's grass, the field; the path from the pier's root up the bank; white in the snow); `hut`
  (0.5, -2.0) — his hut of willow rods (`hut`: none / half / built / gone; `shawl` — the Witch's shawl and a loaf by its
  door); `boat_ashore` (-1.6, -4.4) — the widow's boat drawn up (`widow_boat`); `rail` (-6.0, -1.2) — the rail at the
  pier's root with his net hung on it (`net_rail`, torn by `net_hole`); `mound` (-2.6, -11.6) at the field's edge
  (`mound`; with `knife` mound the knife at its head, point `mound#head`); `linen` on the field; `shells` at the field's
  corner; `surge` — the wave's sheet of sea coming over the sand (`wave`; the script moves it: `surge_d`, `surge_e`);
  `bundle` — her body wrapped in his net (`bundle`; drawn up the sand by `drag`: `bundle_a`, `bundle_d`; point
  `bundle#rope` at its landward end); `far_back` — the hills inland.
- `snowfall_air` (snow falling while `snow`), `soul_smoke` (smoke off the Soul's left hand by `soul_smoke` — the knife's
  miss: people are drawn opaque, a hand cannot blur; particles are the medium's way).

## The views

`view`: `sea` (the default — the scene's own camera, out over the bay) / `shore` — the script sets the camera's keys at
once (lib.VIEW: `camera_x` 7.5, `camera_z` 0.8, `camera_yaw` 250 — standing on the sand to the right of the pier, looking
back along the beach: the water's edge running away on the right, the hut in the middle, the widow's boat behind it, the
pier crossing to the sea, the bank and the field rising on the left). A piece's `from` that shows the shore gives
`view` shore and the same camera keys.

## The hours and the weather

`light` (hours.md; lib.LIGHT): night / dawn / noon / evening / morning → the numbers `dusk`, `dawn`, `day` (the looks
of the light, the sky's layers, the low suns `sun_dawn`, `sun`, the moons `moon`, `moon_low`). `mist` 0…1 (a look and
the near banks), `snow` (the look stays; the boards, the sand, the hut, the boat white; snow falling: `snowfall`),
`wave` 0…1 (a look — darker, the wind up — from 0.3; over 0.3 the sheet comes in over the sand, at 1 to the hut, covering
what lies there).

## People and their places

`lib.PLACES` (places.md: `<id>_at` puts them at once; `<id>_e` — how high over the bay's floor, in the water):

| who | places |
| --- | --- |
| `fisherman` | `end` (the boards by the post, default), `edge` (sat on the pier's edge, legs over the water), `level` (on the boards level with the girl, 1.3), `shallows` (in the water by the pier's end to the waist), `post` (in the water by the lantern post, holding it — М9), `under` (gone under), `hut`, `sand` (by her on the sand), `field` (the field's edge) |
| `soul` | `end` (default), `edge` (beside him), `walk` (gone up the pier to its root), `hut` |
| `mermaid` | `pier` (by the pier's end, default), `stone` (to the shoulders by the stone), `sand` (on the sand — lying is a motion of the pieces) |
| `girl` | `feast` |
| `woman_a`, `woman_b` | `feast`, `shore` |
| `widow` | `boat`, `sand`, `away` (gone along the shore toward the bridge, past the shore's view) |
| `widow_girl`, `widow_boy` | `boat`, `field`; the boy also `end` (sat on the boards by the old Fisherman) |
| `witch` | `shore`, `end` |
| `priest` | `shore`, `end`, `post`, `mound` |

All but the three of stage 2 are `_here` false by default. The lights at a carried lantern: `lantern_f`, `lantern_s`
(at `fisherman#flame`, `soul#flame`); every lantern light goes out with `lantern_lit` 0 (the cast's `lantern_out` is the
lantern's dark glass).

## Renders (2026-10-29, the GPU service)

- The sea at evening with the knife in the post, the lantern on the boards, the pale light under the water, her by the
  stone, the girl: as meant (the moon low and warm behind the pier's end). Fixed after it: her fluke and rings now go
  with her.
- The shore at morning with the hut, the widow and her children, the mound, the wave at 0.6: the ground was painted
  upside down (the field by the water) — mended; the far hills put farther; the boat moved behind the hut (it filled the
  foreground). Not rendered again after these (few renders tonight): the next look at the shore is the pieces'.

## Wanted from the engine / not here

- The Soul see-through (the water through him): people are drawn opaque — he is the Fisherman's figure in a shadow's
  colours.
- Lying on the sand, sitting on the pier's edge, kneeling: motions of the pieces (the places put them; what they do
  there is a motion).

## Contract for the check

```json
{"points": ["cutline#heel", "cutline#toe", "lantern_post#grip", "lantern_post#knife", "knife_boards#knife", "bundle#rope", "mound#head", "sky#disc", "sky#low"],
 "keys": ["light", "mist", "snow", "view", "lantern_at", "lantern_lit", "knife", "rust", "net_rail", "net_hole", "hut", "shawl", "widow_boat", "wave", "mound", "linen", "shells", "under_light", "far_lantern", "cut", "cut_rough", "bundle", "drag", "soul_smoke", "fisherman_at", "soul_at", "mermaid_at", "girl_at", "woman_a_at", "woman_b_at", "widow_at", "widow_girl_at", "widow_boy_at", "witch_at", "priest_at"]}
```

The pieces are not written yet: no `beats` (the game's check says them waited for). The points and the keys the
mini-games and the pieces' contract ask of this scene — the block above.
