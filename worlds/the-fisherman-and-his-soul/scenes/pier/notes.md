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
  `knife_boards` — the knife lying on the boards (`knife` boards; point `knife_boards#knife`); `cutline` (−0.15, 4.15) — where
  his shadow leaves him, on the boards just before his knees as he kneels at the end, across (open to the viewer) (М3, М6: points `cutline#heel`, `cutline#toe`; `cut` draws a thin
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
| `fisherman` | `end` (the boards by the post, default), `edge` (sat on the pier's edge, legs over the water), `level` (on the boards level with the girl, 1.3), `shallows` (in the water by the pier's end to the waist), `post` (in the water by the lantern post, holding it — М9), `under` (gone under), `hut`, `sand` (by her on the sand), `found` (lying on the sand in the morning, the Epilogue's), `field` (the field's edge) |
| `soul` | `end` (default), `edge` (beside him), `walk` (gone up the pier to its root), `hut` |
| `mermaid` | `pier` (by the pier's end, default), `stone` (to the shoulders by the stone), `sand` (on the sand — lying is a motion of the pieces), `found` (along him at his side, the Epilogue's morning) |
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
  foreground). Rendered again: the shore right — sand, the bank and the field, the hut, the rail with the net, the
  bundle, the far hills small. But the sea's far cards (`far_shore`, `far_ridge`) stood huge over the land: a card with
  no `facing` is turned to the eye — a kilometre-wide card turned to an eye looking back swings into its view. They and
  the other far cards (`town`, `mist`, `mist_near`, `far_lamp`) now say `"facing": 180` (what they were turned to from
  the start anyway): checked in a render — gone from the shore's view, the sea's view as before.

## Wanted from the engine / not here

- The Soul see-through (the water through him): people are drawn opaque — he is the Fisherman's figure in a shadow's
  colours.
- Lying on the sand, sitting on the pier's edge, kneeling: motions of the pieces (the places put them; what they do
  there is a motion).

## Pieces

The pieces (`lib.film`, the world's `beats` from `script.js`): on the sea's side `feast`, `danced`, `passed`,
`moonrise`, `shadow_rises`, `heart_cut`, `heart_come`, `knife_ready`, `cut`, `into_sea` (chapter I), `come_out`, `law`,
`sit_edge`, `to_song`, `ring`, `laugh_go`, `third_year`, `third_stone`, `go_day`, `stay_day` (II), `fourth_year`, `fourth_stone`, `late_go`,
`turn_away`, `sink` (III «Без него»), `call_her`, `knife_rust`, `knife_back`, `night_alone` (IV), and the finales'
`knife_sea`, `bless_sea`, `hook_empty`, `post_knife`, `old_lantern`, `soul_leaves`, `witch_knife`, `witch_dance`; on the
shore's (`view` shore) `winter`, `witch_shore`, `widow`, `widow_goes`, `dawn_shore`, `wave_lays`, `kneel_kiss`,
`sea_comes`, `covered`, `wrap`, `fall_by`, `morning_two`, `field_corner`, `mound_morning`, `priest_mound`.
Variants: `smell`, `hard`, `song`, `looked`, `thrown`, `boy`, `thief`, `children`, `apart`, `witch_way` (the contract's
«witch» — `witch` is a person here), `fish`, `shells` (field_corner: the children lay them). `years` — his white hair
(the cast's `fisherman_old` as his look; the game cannot pass a look object). `call_her` leaves its hour to the game
(`light`, `mist`). Her tail goes with her everywhere (on the sand it shows).
The cameras: the operator films from the shore's side (a face turned to the sea is its back), so the Soul's face as it
turns to him is filmed from the camera's own place behind the pier's end (`CAM_BACK`), the cut by the post from nearer
the boards (`CAM_NEAR`); on the shore the operator would film from the land through walls and the bank — the shore's
pieces use the shore's own cameras (`SHORE_HUT`, `SHORE_WIDOW`, `SHORE_SAND`, `SHORE_FIELD`) and its wide view.
Sheets (2026-10-29): the sea's — as meant after the fixes above (the feast's whisper before he walks; the knife and the
cut framed wider); the shore's — as meant with its own cameras. The thin vertical line in the shore's view was the
sky's seam (its painting ended there): the sky is now painted from 3.28 left of the stage to 3.0 right of it — its seam
behind the viewer's right shoulder, seen from neither view (checked in the shore's sheet).

## Contract for the check

```json
{"beats": {
 "feast": {"after":[],"tells":["feast:whisper","feast:level"],"seconds":12,"show":false},
 "danced": {"after":["feast"],"tells":["danced:pull","danced:laugh"],"seconds":10,"show":false},
 "passed": {"after":["feast"],"tells":["passed:look"],"seconds":6,"show":false},
 "moonrise": {"after":[],"tells":["moonrise:shadow","moonrise:her"],"seconds":10,"show":false},
 "shadow_rises": {"after":["moonrise"],"tells":["shadow_rises:up","shadow_rises:face"],"seconds":12,"show":false},
 "heart_cut": {"after":["shadow_rises"],"tells":["heart_cut:turn"],"seconds":6,"show":false},
 "heart_come": {"after":["shadow_rises"],"tells":["heart_come:under","heart_come:up"],"seconds":9,"show":false},
 "knife_ready": {"after":["shadow_rises","heart_cut","heart_come"],"tells":["knife_ready:end"],"seconds":4,"show":false},
 "cut": {"after":["knife_ready"],"tells":["cut:apart","cut:post"],"seconds":10,"show":false},
 "into_sea": {"after":["cut"],"tells":["into_sea:far","into_sea:under","into_sea:soul"],"seconds":18,"show":false},
 "come_out": {"after":[],"tells":["come_out:call","come_out:up"],"seconds":26,"show":false},
 "law": {"after":["come_out"],"tells":["law:up"],"seconds":4,"show":false},
 "sit_edge": {"after":["law"],"tells":["sit_edge:sat","sit_edge:laugh","sit_edge:back"],"seconds":16,"show":false},
 "to_song": {"after":["law"],"tells":["to_song:under","to_song:out"],"seconds":12,"show":false},
 "ring": {"after":[],"tells":["ring:shown"],"seconds":6,"show":false},
 "laugh_go": {"after":["ring"],"tells":["laugh_go:laugh","laugh_go:gone"],"seconds":10,"show":false},
 "third_year": {"after":[],"tells":["third_year:near"],"seconds":8,"show":false},
 "third_stone": {"after":["third_year"],"tells":["third_stone:stone"],"seconds":10,"show":false},
 "go_day": {"after":["third_stone"],"tells":["go_day:up","go_day:in","go_day:her","go_day:turn","go_day:gone"],"seconds":22,"show":false},
 "stay_day": {"after":["third_stone"],"tells":["stay_day:turn","stay_day:gone"],"seconds":16,"show":false},
 "fourth_year": {"after":[],"tells":["fourth_year:up"],"seconds":11,"show":false},
 "fourth_stone": {"after":["fourth_year"],"tells":["fourth_stone:stone"],"seconds":10,"show":false},
 "late_go": {"after":["fourth_stone"],"tells":["late_go:knife","late_go:in","late_go:her","late_go:water"],"seconds":18,"show":false},
 "turn_away": {"after":["fourth_stone"],"tells":["turn_away:hand"],"seconds":5,"show":false},
 "sink": {"after":["turn_away"],"tells":["sink:under"],"seconds":6,"show":false},
 "call_her": {"after":[],"tells":["call_her:hung","call_her:call","call_her:light"],"seconds":16,"show":false},
 "knife_rust": {"after":["call_her"],"tells":["knife_rust:out"],"seconds":5,"show":false},
 "knife_back": {"after":["knife_rust"],"tells":["knife_back:through","knife_back:post"],"seconds":8,"show":false},
 "night_alone": {"after":[],"tells":["night_alone:end"],"seconds":6,"show":false},
 "knife_sea": {"after":[],"tells":["knife_sea:out","knife_sea:thrown"],"seconds":8,"show":false},
 "bless_sea": {"after":[],"tells":["bless_sea:bless"],"seconds":8,"show":false},
 "hook_empty": {"after":[],"tells":["hook_empty:end"],"seconds":10,"show":false},
 "post_knife": {"after":[],"tells":["post_knife:out"],"seconds":5,"show":false},
 "old_lantern": {"after":[],"tells":["old_lantern:end"],"seconds":14,"show":false},
 "soul_leaves": {"after":[],"tells":["soul_leaves:turn","soul_leaves:gone"],"seconds":14,"show":false},
 "witch_knife": {"after":[],"tells":["witch_knife:out","witch_knife:gone"],"seconds":10,"show":false},
 "witch_dance": {"after":[],"tells":["witch_dance:end"],"seconds":10,"show":false},
 "winter": {"after":[],"tells":["winter:hut","winter:snow"],"seconds":16,"show":false},
 "witch_shore": {"after":[],"tells":["witch_shore:stop","witch_shore:gone"],"seconds":16,"show":false},
 "widow": {"after":[],"tells":["widow:say","widow:boat","widow:net"],"seconds":14,"show":false},
 "widow_goes": {"after":[],"tells":["widow_goes:look","widow_goes:gone"],"seconds":14,"show":false},
 "dawn_shore": {"after":[],"tells":["dawn_shore:fish","dawn_shore:apart"],"seconds":18,"show":false},
 "wave_lays": {"after":[],"tells":["wave_lays:laid"],"seconds":10,"show":false},
 "kneel_kiss": {"after":["dawn_shore","wave_lays"],"tells":["kneel_kiss:kiss"],"seconds":8,"show":false},
 "sea_comes": {"after":["kneel_kiss"],"tells":["sea_comes:dark","sea_comes:run"],"seconds":10,"show":false},
 "covered": {"after":["sea_comes"],"tells":["covered:end"],"seconds":6,"show":false},
 "wrap": {"after":["sea_comes"],"tells":["wrap:end"],"seconds":6,"show":false},
 "fall_by": {"after":["wrap"],"tells":["fall_by:hut","fall_by:fell"],"seconds":10,"show":false},
 "morning_two": {"after":[],"tells":["morning_two:stop"],"seconds":14,"show":false},
 "field_corner": {"after":[],"tells":["field_corner:end"],"seconds":10,"show":false},
 "mound_morning": {"after":[],"tells":["mound_morning:knife","mound_morning:sat"],"seconds":12,"show":false},
 "priest_mound": {"after":["mound_morning"],"tells":["priest_mound:who","priest_mound:begone","priest_mound:gone"],"seconds":14,"show":false}
},
 "points": ["cutline#heel","cutline#toe","lantern_post#grip","lantern_post#knife","knife_boards#knife","bundle#rope","mound#head","sky#disc","sky#low"],
 "keys": ["light", "years","mist","snow","view","lantern_at","lantern_lit","knife","rust","net_rail","net_hole","hut","shawl","widow_boat","wave","mound","linen","shells","under_light","far_lantern","cut","cut_rough","bundle","drag","soul_smoke","fisherman_at","soul_at","mermaid_at","girl_at","woman_a_at","woman_b_at","widow_at","widow_girl_at","widow_boy_at","witch_at","priest_at"]}
```

## Fixes after the browser test (2026-10-29, r3/rybak-fix)

- `shawl` is no longer cleared by every shore piece's `from` (SHORE): laid in `witch_shore`, it is the game's to keep
  on every shore opened after (chapter 4), and the wave takes it with the hut (`fall_by`).
- `sea_comes` ends cut near the two on the sand (`SHORE_NEAR`: his face, her hand, the wave on the right) — the
  choice «The Wave» and «Holding Her» are played there; `covered` goes back wide.

## Polish (2026-10-30, r3/polish-rybak)

After a reviewer's renders: what the player must see was not in the frame. Rendered on the service after each pass.

- Moonrise (1.7–1.10): he stands with his back to the moon (`BACK_TO_MOON` 205 — he faces us; was 20, his face to the
  moon right after the rule «back to the moon»). The Soul rises beside him on his left (`SOUL_RISE` −1.0, 4.6, turned to
  him); its plea on its face from the water's side (`CAM_BACK`, held 8 s), then the two of them (`TWO`) as he chooses.
  `knife_ready`: the Soul steps back pleading; he is framed whole (`KNEEL` — nearer, the Soul filled the frame), the knife
  in his hand seen.
- The feast (1.3): the girl a step from where he comes level (`girl` feast −2.95, 2.45); the women on the root's side
  (not between us and her); the shots: the girl dancing, the women whispering (wide), the two of them as he comes level
  (`LEVEL`; `danced`/`passed` open on it).
- The third year and the fourth (2.6, 3С.3): the Soul's words said on its face (`SPEAKS` = `CAM_BACK`; the lantern's
  post stood between our side and him in the water); then pieces of their own, `third_stone` / `fourth_stone` (the
  scene's own camera on the bay — the pier, the two, the stone and her light; then medium on him for the choice).
- `go_day`: three strides through the shallows (`wade`), up onto the boards at the end, to his place — no more at once
  on the boards. Anyone put on the boards from the water stands at 0 (`at()` sets `<id>_e` 0 for the three who stand in
  the water; the places module likewise): he hung over the boards at the water's height.
- Her song is the game's now (the music has no voice: its prompt's weight 0).
- (second round) `kneel_kiss` cuts near (`SHORE_NEAR`) as he bends to her: his words to her are said there. The
  evening's low moon is stronger (1.8), the dusk's air darker (0.45), the lantern at dusk 0.3 (it washed out the boards
  by him), his shadow 0.9 (the engine's author's advice): his long shadow on the boards at moonrise. A person's shadow
  lies only on what people stand on: off the pier's end it does not reach the water.
- (third round) The kiss: the widow and her children step aside up the sand (they hid her); as the sea comes the
  morning goes out of the sky (`dawn` → 0.35, `day` → 0) and the `wave` look is darker (ambient 0.32, haze 0.45, tint
  0.3). `soul_leaves`: the camera goes with the Soul up the pier, then back to the bay for its lantern far off; the far
  lantern's glow larger (24 m). The feast opens wide on the girl and the women.
- (fifth round) `late_go`: he wades up onto the boards, the Soul gives him the lantern and the cup on CAM_BACK and goes
  into him, her going under close. `dragged(u)` puts him a metre up the sand from the bundle, facing it (`drag_back`):
  he backs up drawing her; the drawing and the widow's talk on the shore wide. `knife_rust`/`knife_back` keep the
  call's hour (the game gives it). The wave darkens the morning to `dawn` 0.6, not to night.
- (fifth round) `IN_WATER` — him in the water by the pier's end, the camera's own keys from the right over the water
  (on our line the Soul on the boards stood at the lens and was drawn faint: two pale bands; an operator's eye on one in
  the water sits at the water's face). The kiss: she is turned to lie with her head toward us (`mermaid_turn` 270 at the
  cut) — her face seen.
