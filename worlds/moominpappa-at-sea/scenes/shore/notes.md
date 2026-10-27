# The Beach (С8 of the game «Папа и море»)

The island's sandy lee shore, the viewer close to where the Groke comes, looking along it: the sea on the left to the
horizon, a level strand of wet and dry sand along the water, the flat stone at the water's edge a few metres ahead,
the sand rising on the right to a low dune with lyme grass, and off to the right beyond the dune (out of the
picture) the granite knoll with the lighthouse; its pines show at the right edge. By day the son by the water and the sea-horses
in the shallows; at night the Groke by the water facing the lights, her frost round her, the lantern on the stone,
Papa on the dune.

- The land is one function (`lib.js` `land`), made with the island's shapes: the strand level from the waterline
  (`WATER`) to `STRAND` metres inland — the Groke's frost lies flat on it —, the sea shelving down under it (waist-deep
  where she wades), the dune, the knoll (`knoll`). `SEA`, `FLAT` (the strand's height) and `shore` for the island's
  painters. The sky, the sea, the granite, the lighthouse, the pines are the world's module `island`
  (`modules/island.md`), and so are the hour, the moon and the storm (light, looks, lights from `tools/island.py`).
- `tools/shore.py` writes `scene.json` (run from the world's root: `python tools/shore.py .`).
- `sand` — the beach, a draped plane in front of the granite: the wet strand, ripple marks, the high-water mark,
  shells; it thins away where the knoll's granite comes up and far ahead.
- `rime` — the Groke's frost: a level plane on the strand, painted once for where she is (`groke_at`, its only key)
  — rime, the warmed dark sand, the trail to the water — and shown by its shader (`rime.wgsl`) as `frost`, `warm`,
  `track` say: the frost grows and melts, the dark circle comes, the trail runs out, with no painting again. It
  ends softly at the water's edge.
- `seahorses` — three glowing sea-horses in the shallows, each a layer bobbing out of step; when `seahorses` becomes
  `gone` the script moves `seahorses_away` 0 → 1 over 6 s and they swim off to the left, their glows going out.
- `stone` (a form) and `stone_lantern` on it: the lantern shown by `lantern_stone` — lit (its globe a layer of added
  light, its flame `e.light` taken by the light `stone_lamp`, reach 7 m, flickering), out (cold glass), none.
- `blanket` (a plane) is laid by the script behind the son, wherever he is (`blanket_a`, `blanket_d`); `dune` — the
  dune's top (point `dune#top`) and the hollow where Papa sat (`dune_dent`).
- The script (`script.js`): the island's lightning; `groke_at` → the Groke's place (`groke_a`, `groke_d`) and turn —
  to the lantern on the stone while it is there, else to the lighthouse's lantern; `troll_at` → the son's place and
  turn (beside her: at her left, facing as she does) — set at once when the scene opens, walked at his own pace when
  it changes while the scene plays.
- People (the world's cast): the Groke (`groke`, new in the cast with this scene), the son, Papa on the dune's top,
  Mama by the water further along. The son beside the Groke stands on the viewer's side of her. Stage 4: they stand and breathe, no motions yet (sitting, the Groke sitting down
  and swaying over the light, walking into the sea — stage 5).
- The lighthouse's lantern seen lit from here (Papa up there with the storm lantern, night 1 «Наверх») is the
  island's `lighthouse_lit`; at 0.25 its glow is faint at this distance. No beam: the engine has no turning
  spotlight yet.
- Composition: the action is 4–7 m from the viewer (the Groke a third of the frame's height, the son a quarter).
  The lighthouse stands off to the right, level with her, so facing it she is seen side-on (her face in profile, lit
  by the moon ahead on the right); facing the lantern on the stone she turns three-quarters to the viewer. The cost:
  the lighthouse itself is not in the picture (its light is — `lighthouse_lit`).

## Pieces (stage 5: `lib.js` FILM, played by `beat` through the world's `beats`; the game says the lines at the moments)

How they are made: `lib.js` `film(scene)` — each piece's `from` (people's places by `AT`, the camera, the scene's own
keys; never the hour, the weather, who is here) and `run` (a sequence: walks at the cast's gaits, motions, keys moved,
the camera moved, `scene.tell` at the moments). The camera is the scene's own moved nearer (`NEAR`: along the line the
viewer sees one by, turned to them; `dolly` over seconds, `cutTo` a shot made ready — the son's blush), not the
operator: framing the seated Groke close the operator stands inside her (reported). `script.js` plays them
(`beats.play`) and moves the people by the minigames' acts; `showcase.js` plays a selection, each piece in its play's
keys. Seconds below are measured roughly on renders.

Seconds are estimates (the people at their own pace). Each piece's `from` sets what it does not move itself; a piece
`after` another goes on from where that one ended. The people's motions and parts are the cast's (package Л):
`basket`, `lantern` in the hand, `blanket`, `armful`; `crouch`, `sit_down`/`sit_floor`, `back_away`, `put_down`,
`sway` (the Groke over the light), `reach` (the Groke to the beam).

- `weed` (2.3, day, ≈ 10 s): Mama comes along the strand with her basket, crouches at the water and gathers weed into
  it — `weed:water`; she goes on along the beach, smaller. The sea-horses in the shallows behind.
- `seahorses` (2.3, day, ≈ 8 s): the son comes down to the water by the sea-horses and crouches — `seahorses:crouch`
  (his line). Ends crouched, his face to them in profile.
- `laugh` (after `seahorses`, ≈ 8 s): the sea-horses toss their heads (laughing) and swim off (`seahorses` → gone) —
  `laugh:gone`; close on the son's face, looking down (`sad`) — `laugh:face`.
- `armful_load` (2.4 «Водоросли», day, ≈ 8 s): Papa at the water heaps weed from Mama's basket into his arms, higher
  than his head; Mama beside him — `armful_load:up`. Ends turned toward the dune (the way to the middle).
- `dusk_sit` (2.6, dusk, ≈ 12 s): frost whitens on the strand (`frost` 0 → 0.4); with `track` already 1 the strip from
  the sea is there first; the Groke comes up out of the shallows and sits down on the sand facing the lighthouse (side
  on) — `dusk_sit:sat`.
- `howl` (Ш1 «Наверх», night, ≈ 10 s): the Groke sitting, her face turned up to the far little light in the lantern
  room (off the right; `lighthouse_lit` low); she howls — `howl:howl` (the game's sound); close on her face in profile.
- `gift` (Ш1 «Сыну»; 3.6 «Не открывать глаз», night, ≈ 20 s): the son comes along the strand with the lantern, sets
  it on the stone (`lantern_stone` → lit) — `gift:set` (his line, on «Сыну»); backs away three steps (`troll_at` →
  near); the Groke gets up, turns to the light, comes nearer and sways over it, clumsy and quiet — `gift:sway`. Ends
  in her swaying (the frost under her as the game sets it).
- `wade` (Ш1 «По очереди», night toward dawn, ≈ 18 s): the Groke waist-deep in the sea (`groke_at` water); the son runs
  down with the dim lantern and sets it on the stone (`lantern_stone` → low); she turns to it — `wade:turn`; comes out
  and sits down at the water's edge far off (`groke_at` → edge) — `wade:sat`; the son turns the wick up for her
  (`lantern_stone` → lit) — `wade:wick`.
- `night2` (3.5, night, ≈ 8 s): the Groke sitting by the stones (`groke_at` as the game says: closest if she was given
  light), her frost about her — `night2:sat`.
- `follow_start` (3.6 «Пойти следом», night, ≈ 6 s): the son on the dune's path with the lantern going down toward the
  stone, Papa coming over the dune behind him — `follow_start:ready` (the pose for «Следом»: the son's back, Papa's
  way down the dune in the middle 4:3). The minigame moves `follow` and `follow_at` (below).
- `follow_end` (after `follow_start`, ≈ 14 s): the son sets the lantern on the stone (`lantern_stone` → lit); the
  Groke rises toward the light — `follow_end:rise`; Papa stops on the dune's top (`dune#top`) — `follow_end:stop`;
  the son does not turn; with `follow_close` he sits down by the Groke with his back to his father.
- `wide` (4.6, night, ≈ 8 s): the Groke on the shore, the frost round her wide (`frost` 1; `groke_at` closest if she
  was given light); she howls — `wide:howl`.
- `beside` (4.7 «Пусть идёт», night, ≈ 14 s): the son comes along the strand without a lantern and sits down beside
  her — `beside:sat`; the frost creeps to him; white to the elbows — `beside:white` (the cast's rime on him).
- `blanket` (after `beside`, ≈ 20 s): Mama comes from the lighthouse's side with the blanket, lays it on the sand by
  the son, on the viewer's side of him (`blanket` → true) — `blanket:laid`; she goes back; time passes: the frost stops, the sand under the
  Groke darkens (`warm` 0 → 1), she hums — `blanket:warm`.
- `dune_start` (4.7 «Я до дюны», night, ≈ 5 s): Papa and the son come side by side from the right onto the dune's
  path — `dune_start:ready` (the pose for «Рядом»). The minigame moves `walk` and `walk_at`.
- `dune_stop` (after `dune_start`, ≈ 12 s): on the dune's top the son stops — `dune_stop:say` (his line); he goes on
  down to the water alone; Papa sits down on the dune — `dune_stop:sat`.
- `dawn_beside` (after `dune_stop`, ≈ 14 s): the Groke keeps off (`groke_at` edge), the frost reaches the son —
  `dawn_beside:frost`; toward dawn (`dawn` → 0.6) she comes and sits down beside him, the sand darkens (`warm` → 1) —
  `dawn_beside:sat`.
- `past` (after `dawn_beside`, dawn, ≈ 10 s): the son gets up and walks up the dune past Papa and does not stop —
  `past:passed` (`dune_dent` stays where Papa sat).
- `leave` (4.7 «Мама права», night → dawn, ≈ 16 s): the Groke howls — `leave:howl`; toward morning she walks into the
  sea and is gone, her white trail running out to the water (`track` 0 → 1) — `leave:gone`.
- `beam` («Луч», night, ≈ 8 s): the beam (`beam` 1) comes round over the shore: by the keys — the son on dark sand by
  the Groke, the Groke reaching toward the beam as it goes on; or the empty sand, the white trail, the son alone by
  the water — `beam:pass`.
- `morning` («Лодка», common shots; morning, ≈ 5 s): the sand after night 3, nobody or the son as the keys say: the
  dark circle (`warm`), the white trail (`track`), the hollow on the dune (`dune_dent`) — `morning:held`.

New keys for these (stage 5): `lantern_stone` gets `low` (a dim flame); `follow_close` (Papa came too close — the son
sits with his back to him); the acts `follow`, `follow_at`, `walk`, `walk_at`.

## Pieces (stage 5: `lib.js` FILM, played by `beat` through the world's `beats`; the game says the lines at the moments)

How they are made: `lib.js` `film(scene)` — each piece's `from` (people's places by `AT`, the camera, the scene's own
keys; never the hour, the weather, who is here) and `run` (a sequence: walks at the cast's gaits, motions, keys moved,
the camera moved, `scene.tell` at the moments). The camera is the scene's own moved nearer (`NEAR`: along the line the
viewer sees one by, turned to them; `dolly` over seconds, `cutTo` a shot made ready — the son's blush), not the
operator: framing the seated Groke close the operator stands inside her (reported). `script.js` plays them
(`beats.play`) and moves the people by the minigames' acts; `showcase.js` plays a selection, each piece in its play's
keys. Seconds below are measured roughly on renders.

Seconds are estimates (the people at their own pace). Each piece's `from` sets what it does not move itself; a piece
`after` another goes on from where that one ended. The people's motions and parts are the cast's (package Л):
`basket`, `lantern` in the hand, `blanket`, `armful`; `crouch`, `sit_down`/`sit_floor`, `back_away`, `put_down`,
`sway` (the Groke over the light), `reach` (the Groke to the beam).

- `weed` (2.3, day, ≈ 10 s): Mama comes along the strand with her basket, crouches at the water and gathers weed into
  it — `weed:water`; she goes on along the beach, smaller. The sea-horses in the shallows behind.
- `seahorses` (2.3, day, ≈ 8 s): the son comes down to the water by the sea-horses and crouches — `seahorses:crouch`
  (his line). Ends crouched, his face to them in profile.
- `laugh` (after `seahorses`, ≈ 8 s): the sea-horses toss their heads (laughing) and swim off (`seahorses` → gone) —
  `laugh:gone`; close on the son's face, looking down (`sad`) — `laugh:face`.
- `armful_load` (2.4 «Водоросли», day, ≈ 8 s): Papa at the water heaps weed from Mama's basket into his arms, higher
  than his head; Mama beside him — `armful_load:up`. Ends turned toward the dune (the way to the middle).
- `dusk_sit` (2.6, dusk, ≈ 12 s): frost whitens on the strand (`frost` 0 → 0.4); with `track` already 1 the strip from
  the sea is there first; the Groke comes up out of the shallows and sits down on the sand facing the lighthouse (side
  on) — `dusk_sit:sat`.
- `howl` (Ш1 «Наверх», night, ≈ 10 s): the Groke sitting, her face turned up to the far little light in the lantern
  room (off the right; `lighthouse_lit` low); she howls — `howl:howl` (the game's sound); close on her face in profile.
- `gift` (Ш1 «Сыну»; 3.6 «Не открывать глаз», night, ≈ 20 s): the son comes along the strand with the lantern, sets
  it on the stone (`lantern_stone` → lit) — `gift:set` (his line, on «Сыну»); backs away three steps (`troll_at` →
  near); the Groke gets up, turns to the light, comes nearer and sways over it, clumsy and quiet — `gift:sway`. Ends
  in her swaying (the frost under her as the game sets it).
- `wade` (Ш1 «По очереди», night toward dawn, ≈ 18 s): the Groke waist-deep in the sea (`groke_at` water); the son runs
  down with the dim lantern and sets it on the stone (`lantern_stone` → low); she turns to it — `wade:turn`; comes out
  and sits down at the water's edge far off (`groke_at` → edge) — `wade:sat`; the son turns the wick up for her
  (`lantern_stone` → lit) — `wade:wick`.
- `night2` (3.5, night, ≈ 8 s): the Groke sitting by the stones (`groke_at` as the game says: closest if she was given
  light), her frost about her — `night2:sat`.
- `follow_start` (3.6 «Пойти следом», night, ≈ 6 s): the son on the dune's path with the lantern going down toward the
  stone, Papa coming over the dune behind him — `follow_start:ready` (the pose for «Следом»: the son's back, Papa's
  way down the dune in the middle 4:3). The minigame moves `follow` and `follow_at` (below).
- `follow_end` (after `follow_start`, ≈ 14 s): the son sets the lantern on the stone (`lantern_stone` → lit); the
  Groke rises toward the light — `follow_end:rise`; Papa stops on the dune's top (`dune#top`) — `follow_end:stop`;
  the son does not turn; with `follow_close` he sits down by the Groke with his back to his father.
- `wide` (4.6, night, ≈ 8 s): the Groke on the shore, the frost round her wide (`frost` 1; `groke_at` closest if she
  was given light); she howls — `wide:howl`.
- `beside` (4.7 «Пусть идёт», night, ≈ 14 s): the son comes along the strand without a lantern and sits down beside
  her — `beside:sat`; the frost creeps to him; white to the elbows — `beside:white` (the cast's rime on him).
- `blanket` (after `beside`, ≈ 20 s): Mama comes from the lighthouse's side with the blanket, lays it on the sand by
  the son, on the viewer's side of him (`blanket` → true) — `blanket:laid`; she goes back; time passes: the frost stops, the sand under the
  Groke darkens (`warm` 0 → 1), she hums — `blanket:warm`.
- `dune_start` (4.7 «Я до дюны», night, ≈ 5 s): Papa and the son come side by side from the right onto the dune's
  path — `dune_start:ready` (the pose for «Рядом»). The minigame moves `walk` and `walk_at`.
- `dune_stop` (after `dune_start`, ≈ 12 s): on the dune's top the son stops — `dune_stop:say` (his line); he goes on
  down to the water alone; Papa sits down on the dune — `dune_stop:sat`.
- `dawn_beside` (after `dune_stop`, ≈ 14 s): the Groke keeps off (`groke_at` edge), the frost reaches the son —
  `dawn_beside:frost`; toward dawn (`dawn` → 0.6) she comes and sits down beside him, the sand darkens (`warm` → 1) —
  `dawn_beside:sat`.
- `past` (after `dawn_beside`, dawn, ≈ 10 s): the son gets up and walks up the dune past Papa and does not stop —
  `past:passed` (`dune_dent` stays where Papa sat).
- `leave` (4.7 «Мама права», night → dawn, ≈ 16 s): the Groke howls — `leave:howl`; toward morning she walks into the
  sea and is gone, her white trail running out to the water (`track` 0 → 1) — `leave:gone`.
- `beam` («Луч», night, ≈ 8 s): the beam (`beam` 1) comes round over the shore: by the keys — the son on dark sand by
  the Groke, the Groke reaching toward the beam as it goes on; or the empty sand, the white trail, the son alone by
  the water — `beam:pass`.
- `morning` («Лодка», common shots; morning, ≈ 5 s): the sand after night 3, nobody or the son as the keys say: the
  dark circle (`warm`), the white trail (`track`), the hollow on the dune (`dune_dent`) — `morning:held`.
- `corner` («Пирог», the moonlit evening of the 27th, ≈ 8 s): each in his own corner — the son on the dark sand by the
  Groke (`groke_here`, `warm`), or alone at the water's edge looking out to sea (no Groke, the white trail) —
  `corner:held`.
- `look_son` (common shots, the finales; ≈ 6 s): the son by the water, and how he looks by the play's `glance`: never
  at Papa (he looks down at the sand, his back to the dune); once — he turns to look up at the dune, where Papa is,
  and back (`look_son:turn`); at the sea — `look_son:held`.

New keys for these (stage 5): `lantern_stone` gets `low` (a dim flame); `follow_close` (Papa came too close — the son
sits with his back to him); `glance` (`never` · `once` · `sea`: the son's look in the finales); the acts `follow`, `follow_at`, `walk`, `walk_at`.

## Contract for the check

```json
{"beats": {
 "weed": {"after": [], "tells": ["weed:water"], "seconds": 10, "show": false},
 "seahorses": {"after": [], "tells": ["seahorses:crouch"], "seconds": 8, "show": false},
 "laugh": {"after": ["seahorses"], "tells": ["laugh:gone", "laugh:face"], "seconds": 8, "show": false},
 "armful_load": {"after": [], "tells": ["armful_load:up"], "seconds": 8, "show": false},
 "dusk_sit": {"after": [], "tells": ["dusk_sit:sat"], "seconds": 12, "show": false},
 "howl": {"after": [], "tells": ["howl:howl"], "seconds": 10, "show": false},
 "gift": {"after": [], "tells": ["gift:set", "gift:sway"], "seconds": 20, "show": false},
 "wade": {"after": [], "tells": ["wade:turn", "wade:sat", "wade:wick"], "seconds": 18, "show": false},
 "night2": {"after": [], "tells": ["night2:sat"], "seconds": 8, "show": false},
 "follow_start": {"after": [], "tells": ["follow_start:ready"], "seconds": 6, "show": false},
 "follow_end": {"after": ["follow_start"], "tells": ["follow_end:rise", "follow_end:stop"], "seconds": 14, "show": false},
 "wide": {"after": [], "tells": ["wide:howl"], "seconds": 8, "show": false},
 "beside": {"after": [], "tells": ["beside:sat", "beside:white"], "seconds": 14, "show": false},
 "blanket": {"after": ["beside"], "tells": ["blanket:laid", "blanket:warm"], "seconds": 16, "show": false},
 "dune_start": {"after": [], "tells": ["dune_start:ready"], "seconds": 5, "show": false},
 "dune_stop": {"after": ["dune_start"], "tells": ["dune_stop:say", "dune_stop:sat"], "seconds": 12, "show": false},
 "dawn_beside": {"after": ["dune_stop"], "tells": ["dawn_beside:frost", "dawn_beside:sat"], "seconds": 14, "show": false},
 "past": {"after": ["dawn_beside"], "tells": ["past:passed"], "seconds": 10, "show": false},
 "leave": {"after": [], "tells": ["leave:howl", "leave:gone"], "seconds": 16, "show": false},
 "beam": {"after": [], "tells": ["beam:pass"], "seconds": 8, "show": false},
 "morning": {"after": [], "tells": ["morning:held"], "seconds": 5, "show": false},
 "corner": {"after": [], "tells": ["corner:held"], "seconds": 8, "show": false},
 "look_son": {"after": [], "tells": ["look_son:turn", "look_son:held"], "seconds": 6, "show": false}},
 "points": ["stone#lantern", "dune#top", "seahorses", "groke#chest", "troll#chest", "papa#chest", "mama#chest", "lighthouse#lantern", "lighthouse#door"],
 "offers": ["stone#lantern", "dune#top", "groke#chest", "troll#chest", "papa#chest"],
 "party": {"beam": 0, "calm": 0, "dawn": 0, "dusk": 0, "night": 0, "moon": 0.6, "storm": 0, "flash": 0, "lighthouse_lit": 0, "seahorses": "here", "groke_at": "edge", "frost": 0, "warm": 0, "track": 0, "lantern_stone": "none", "blanket": false, "troll_at": "near", "dune_dent": false, "follow_close": false, "glance": "sea", "groke_here": false, "troll_here": true, "papa_here": false, "mama_here": false},
 "acts": {"follow": {"values": [], "tells": []}, "follow_at": {"values": [], "tells": []}, "walk": {"values": [], "tells": []}, "walk_at": {"values": [], "tells": []}}}
```
