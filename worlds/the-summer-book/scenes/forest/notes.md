# The Magic Forest

The island's crown (С3 of the game's scenario): a clearing of grey-green moss and granite among dead trees twisted by
the wind; the stump where Grandmother carves, her wooden animals in the moss, a boulder with a crack, a dead trunk with
a dry branch; past the trees the land goes down to the open sea far below. Its sea, sky, fog and the hour and the
weather are the island's (`modules/isle.md`); the generator is `tools/forest.py` (`python -B tools/forest.py <world>`
writes `scene.json`, `elements/sky.*`, `elements/sea.*`). Engine 3, camera `picture`.

- **The land** is `lib.ground` (relief.js): the clearing nearly level, going down ahead to the sea (`WATER` −4 m,
  `edge` its waterline). `moss` paints the ground (moss, granite backs with lichen, needles; drier at the end of July:
  `late`) and the red beetle by the stump (`moss#beetle`). `path` — the worn path to the other side going off between
  the trees ahead on the left, its stones `path#stone1` (nearest) … `#stone3`.
- **Trees**: `deadtree` and `snag` (copies) and the hero `trunk` (`trunk#palm` on it chest-high, `trunk#branch` the dry
  branch above); each a layer that sways a little in the wind and, by `spin` (0…1, smooth, animate), wheels about its
  foot — all as one, as a dizzy head sees them (М6). Living pines far off (the island's).
- **Things**: `stump` (a form; `stump#seat`, Grandmother sits on it: `sit_stone`), `animals` (the wooden horse, bird,
  dog, cow and — the fifth — the seal: `animals` 0–5; `animals#seal`), `crevice` (a boulder, a form, with its crack:
  `pack` none · in · taken; `crevice#pack`).
- **The end of July** (`band` 0…1, smooth): a heavy grey band along the horizon (`band`, a layer faded by animate). **By
  night**: the moon behind the viewer, faces lit; `boat_out` — the family's boat at the nets far out, Papa's lantern
  (`far_boat#lamp`, the light `far_lamp`).
- **People** (the world's `cast`): `<id>_at` (`lib.PLACES`; sitting ones by the script): Grandmother — clearing (first),
  stump (sitting on it), trunk (her palm on it, looking up at the branch), moss (sitting on the ground), path1…3;
  Sophia — clearing (first), moss (by the beetle), stump, crevice, path1. Grandmother sitting on the ground
  (`sit_ground`) shows the engine's stiff skirt (`modules/cast.md`, Checked) — until it is mended, the stump.
- The showcase: June on the stump (the seal laid with the others), the trunk, the packet, the end of July (the band,
  the forest spinning), the night and the path.

## Pieces (stage 5)

The pieces of the game's steps (plan.md «Куски сцен по шагам», scenario.md 1.2–1.3, 3.1–3.3, contracts-review.md of
«Папа и море»), played by the module `beats`: the key `beat`, `beat:<name>` told at its end, `beat_next`. Each: what
it shows, the keys it begins with or sets, where it ends — in the pose of what comes next (a choice, a minigame, the
next piece); its moments are told as `<piece>:<moment>` — the game speaks its lines and shows its plates there. All
are the game's (`show` false); the showcase plays a selection.

The rules every piece keeps (review-stage5.md of «Папа и море»):

- **People and the camera are the piece's** (its `from`); the game sets only the play's keys (`party` below). A piece
  with `after` begins exactly where the one before ended: its `from` is that end, so it plays the same opening a step
  (after a cut) or following that piece; it re-places nobody. Where it needs another frame it makes a ready cut in its
  `run` that sets the whole camera (target and shot, `camera_x/z/h/yaw/look` back to 0 or to a named view) — no offset
  of a manual shot is left for the next piece.
- **Nobody slides**: every move is a walk at the person's pace (Grandmother `old_walk`, slow; Sophia `walk`/`run`;
  Papa `walk`), by the path's stones; the minigames' `step` walks them too (the scene's walk, `step:stone<n>` told on
  arrival). Only a piece's `from` puts people, before its first frame.
- **Poses before a choice or a minigame**: the camera stands; the point and the faces in the middle 4:3 of the frame,
  the top ~12 % free (the minigame's hint), nothing that matters in the bottom 20 % (the subtitles). Faces lit — by
  day, by the moon at night, by the lantern on the path.
- Mute before a moment of the game: not longer than ~8–10 s.

**June (1.2–1.3)** — the day, the clearing.

- `carve` (1.2, ≈ 9 s). The grey dead trees creaking in the wind, the moss; Sophia crouched in the moss with her four animals; Grandmother comes from the clearing's edge to the stump (`old_walk`), sits down on it (`sit_stump`) and takes out her knife and a piece of driftwood (the cast's parts). Keys: animals 4. From: Grandmother `clearing`, Sophia `animals`. Ends: the knife minigame's pose — Grandmother on the stump, her hands with the knife before her chest, her face and hands in the middle 4:3 (the minigame opens the insert `knife`). Moments: `carve:trees` — the forest (the game: «Grey dead trees…»); `carve:sat` — she sits and begins.
- `seal_set` (1.2, ≈ 12 s). After `carve`. The seal is done; Sophia comes, takes it from her hand (both `_reach`), crouches and sets it in the moss with the others. Keys: animals 4 → 5. Ends: Sophia crouched among the five animals, Grandmother on the stump looking at her. Moments: `seal_set:seal` — the seal out of the wood (the game: «A seal. Sophia sets the animals in the moss»); `seal_set:forest` — Sophia among them («This is their forest…»).
- `trunk` (1.2, ≈ 15 s). After `seal_set`. Grandmother gets up slowly (`rise_slow`), goes to the trunk and reaches up to the dry branch — and stands still, her palm on the trunk (`trunk#palm`), her eyes closed, three seconds: her face close (Sophia off the frame with her animals: she does not see); then she goes back to the stump, sits and carves again. Ends: Grandmother carving on the stump, Sophia at the animals. Moments: `trunk:reach` — she reaches up; `trunk:still` — the palm on the trunk, the eyes closed (the game's plate); `trunk:back` — she sits again.
- `match` (1.3, ≈ 10 s). After `trunk` (its `from` is `trunk`'s end: the step may open with it). Sophia wanders off among the trees to her animals; Grandmother takes a cigarette out of the pouch and strikes a match (the insert `match`), lights it, the thin smoke; Sophia has come round behind her back (`behind`). Ends: the choice `smoke` — Grandmother on the stump in front, Sophia at her shoulder, `grandma#chest` in the middle 4:3. Moments: `match:strike` — the match (the game: «Grandmother thinks Sophia has gone…»); `match:behind` — Sophia there («Papa doesn't allow it!»).
- `ours` (1.3 «secret», ≈ 7 s). After `match`. Grandmother smokes on; Sophia walks off between the trees importantly, chest out, hands behind her back (`hands_behind`). Ends: Grandmother smoking alone (then the game's house at supper). Moments: `ours:proud` — Sophia puffed up (the game: «…all day puffed up with it»).
- `think` (1.3 «tell», ≈ 7 s). After `match`. Sophia sits down on the moss a little way off (`aside`), her chin on her knees, looking at Grandmother; Grandmother smokes. Ends: the two apart (then the house at supper). Moments: `think:think` — she thinks it over (the game: «…till evening»).
- `quit` (1.3 «quit», ≈ 14 s). After `match`. Grandmother puts the cigarette out on a stone, gets up, goes to the boulder (`crevice`) and pushes the packet deep into its crack (a ready cut to it, the packet in); Sophia pleased — then bored, kicking the moss; Grandmother pats her empty pocket. Keys: pack none → in. Ends: Grandmother by the boulder, her hand at her pocket; Sophia by the animals. Moments: `quit:out` — the cigarette out; `quit:in` — the packet in the crack (the game's plate); `quit:pocket` — she pats her pocket.

**The end of July (3.1–3.2)** — close, the grey band (`band` 1, the play's).

- `swim` (3.1, ≈ 9 s). Sophia crouched setting out her animals (`animals`); Grandmother on the stump gets up (`rise_slow`) — and the ground swims: she stands swaying, a hand out. Ends: the moss minigame's pose — Grandmother standing by the stump, her chest in the middle 4:3, the trees still (the minigame drives `spin`). Moments: `swim:animals` — Sophia with the animals (the game's plate); `swim:up` — she is up, the ground swims.
- `fall` (3.1, ≈ 12 s). After `swim`. `spin` eases to 0 from wherever the minigame left it; Grandmother sits down heavily on the stump (not on the moss: the engine's skirt, cast.md), her head on her knees (`dizzy`); Sophia runs up (`run`) — with `brave` she comes quickly, squats and looks into her face without a word; the camera close on Sophia's face over her, the lips white. Keys: spin → 0; brave (the play's). Ends: the choice `head` — Sophia's face and `sophia#chest` in the middle 4:3, Grandmother bowed beside. Moments: `fall:sat` — the head on the knees (the game's plate); `fall:near` — Sophia by her (without `brave` the game's «What's wrong?!»); `fall:face` — her face close.
- `run_papa` (3.2 «papa», ≈ 7 s). After `fall`. Sophia runs off toward the house (the clearing's edge on the left, `edge`) and out of sight; Grandmother alone on the stump, head on knees, the trees creaking. Ends: Grandmother alone. Moments: `run_papa:gone` — Sophia gone.
- `papa_comes` (3.2 «papa», ≈ 14 s). After `run_papa`. Papa comes quickly from the house's side (`edge` → `lift`), Sophia behind him, without a word, and lifts his mother up by the arm (`lead_arm`, both `_reach`); she pulls away, he does not let go; she stops. Keys: papa_here → true. Ends: the two standing by the stump, his hand under her arm; Sophia a step behind. Moments: `papa_comes:come` — Papa there (the game's plate); `papa_comes:lift` — he lifts her («Don't lead me like a cow»); `papa_comes:held` — she stops pulling (then his words by 1.5).
- `lead_home` (3.2 «papa», ≈ 12 s). After `papa_comes`. He leads her slowly toward the house (`edge`); by the trees he turns his head to Sophia; she stays, looking after them, and does not go to play. Ends: Sophia alone by the animals, the path empty. Moments: `lead_home:go` — they go; `lead_home:play` — his look back («Grandmother is tired. Go and play»); `lead_home:back` — Sophia looking after them (the game's plate).
- `count` (3.2 «sophia», ≈ 18 s). After `fall`. With `sophia_back` Sophia first steps back a step, fists clenched; then she comes close; she sits down on the moss beside the stump (`beside`) and counts aloud; at last Grandmother lifts her head and gets up slowly (`rise_slow`). Keys: sophia_back (the play's). Ends: Grandmother standing by the stump, Sophia getting up beside her. Moments: `count:back` — stepped back (told without `sophia_back` too: then she stays where she is; there the game's «You said not soon!»…); `count:ask` — close to her («And tell Papa?»); `count:sit` — she sits and counts («One, two, three…»); `count:up` — Grandmother up.
- `beetle` (3.2 «moss», ≈ 16 s). After `fall`. Sophia sits down on the moss by the stump, her nose in it; the camera low on the red beetle (`moss#beetle`); they laugh; the camera close on Grandmother's hand on the stump's edge, shaking — Sophia does not see; then the two faces. Ends: Sophia's face up to her, both laughing. Moments: `beetle:nose` — the nose in the moss; `beetle:beetle` — the beetle («There's a beetle! A red one!»); `beetle:hand` — the hand shaking (the game's plate); `beetle:house` — the faces («Tonight — that house» — «Really?!»).

**The night (3.3 «moss»)** — late evening into night, the moon behind the viewer.

- `night_path` (3.3 «moss», ≈ 11 s). Papa's boat at the nets far out, his lantern on the water (`boat_out`, `far_boat#lamp`); Grandmother and Sophia come into the clearing from the island's side, the lantern in Grandmother's hand (the cast's part, its light on both faces); Grandmother stops at the boulder — with `pack` in she reaches into the crack, takes out the packet (a ready cut, the crack empty) and puts it in her pocket; they go on to the path's first stone. Keys: night 1, boat_out true; pack in → taken (only if in). From: both at `edge`. Ends: the stones minigame's pose — Grandmother at `path#stone1` with the lantern (`path1`), Sophia beside her, the stones ahead in the middle 4:3. Moments: `night_path:boat` — Papa's lantern far on the water (the game's plate); `night_path:pack` — at the boulder (told always; with `pack` in, the packet taken); `night_path:stone` — at the first stone.
- `into_trees` (3.3 «moss», ≈ 6 s). After `night_path` (the act `step` has walked them to `path3`). They go on between the dead trees to the other side, the lantern's light moving among the trunks, and are gone. Ends: the clearing empty in the moonlight, Papa's lantern far on the water (then the game's cut to the new house's `window`). Moments: `into_trees:gone` — the light gone.

Places (`<id>_at`, lib.PLACES; the pieces' — the game no longer sets them): Grandmother `clearing`, `edge` (the
clearing's edge toward the house, out of the frame on the left), `stump` (sitting on it), `up` (standing by it),
`trunk`, `crevice` (by the boulder), `moss` (on the ground: the engine's skirt — not used), `path1…3`, `far` (gone on
to the other side among the trees); Sophia `clearing`, `edge`, `moss` (crouched at the beetle), `animals` (crouched
with them), `stump` (standing by her), `behind` (at her back on the stump), `near` (crouched close, her face over her),
`beside` (on the moss by the stump), `nose` (her nose in the moss by the beetle), `aside` (on the moss a little off,
`hug_knees`), `trees` (off between the trees), `crevice`, `path1…3` (at her side), `far`; Papa `edge`, `lift` (at her
arm by the stump). Eriksson and the cat are not in the forest.

**Who is here.** Papa is the pieces' (`papa_here`); Grandmother and Sophia the game's (`grandma_here`, `sophia_here`)
— after `run_papa` Sophia comes back with Papa in `papa_comes` (it sets her here again).

## The code

- `lib.js`: `FILM` — the pieces (the module `beats`, copied unchanged from «Папа и море»'s `modules/beats*`, pm/all);
  `SHOTS` — each piece's frames, by hand (`aim(eye, point, fx, fy)`: every camera key set, no offset left behind);
  `goTo` / `goOff` — someone walks to a place at their gait and is there as it says, or off out of sight; `SHOWFILM`
  — the pieces with the play's keys the showcase gives them (`SHOW`).
- `script.js`: the places, Grandmother's lantern light (`lamp_lit`: the light `hand_lamp` at her hand while she carries
  the lantern, wavering with `lantern_sway`), the stones minigame's `step` (during `night_path` the two walk to that
  stone, `step:stone<n>` on her arrival) and `grab` (Sophia's hand on her skirt), `beats.play`.
- The animals are layers painted once (`a0…a4`), shown by `animals` (the seal laid in a piece); the packet in the
  boulder's crack (`pack`, the boulder is a form: no layers) changes on ready cuts in `quit` and `night_path`.

## Open for the game (stage 5)

- The inserts (package Л, `closeups`): the knife and the shavings (`knife_open`, `carve` 0…1 — the knife minigame's;
  its flawed «one flipper» lives in the insert only), the match at the cigarette. The insert elements and their keys
  come with the closeups (not in the scene yet).
- The stones minigame (М7в): `step` 1…3 walks the two stone by stone (`step:stone1…3` on arrival); flawed —
  `lantern_sway` (0…1: the lantern swings, its light wavering) and `grab` (Sophia catches her skirt).
- The moss minigame (М6): `spin` 0…1 — the trees wheel; `fall` brings it back to 0.
- Grandmother sits on the stump in 3.1–3.2, not on the moss, until the engine's skirt is mended (cast.md).
- **Wanted from package Л** (the names the code uses; until they are made the people stand): Grandmother — the gait
  `old_walk`, `sit_down` (onto the stump, once), `sit_heavy` (down onto it heavily, once), `sit_stone` (have), `carve`,
  `smoke`, `dizzy` (head on the knees, seated) — loops; `strike` (the match), `put_out` (the cigarette on a stone),
  `pat_pocket`, `pull_away`, `rise_slow`, `sway` (standing, the ground swimming: loop); her eyes closed at the trunk (a
  face, not a mood the engine has); Sophia — `crouch`, `get_up`, `sit_down`, `put_down` (the seal in the moss),
  `hug_knees` (have), `kick` (the moss, bored), `fists`, `count` (sitting, counting aloud), `nose_moss` (loops), the
  gaits `run`, `proud_walk` (chest out, hands behind her back), `back_away`; Papa — the gaits `walk_fast`, `lead_walk`.
  Parts: `knife`, `driftwood`, `seal` (in a hand), `pouch`, `cigarette`, `match`, `packet`, `lantern`.
- Faces: the game's (`<id>_mood`); the laugh over the beetle is the piece's.
## Contract for the check

```json
{"beats": {"carve": {"after": [], "tells": ["carve:trees", "carve:sat"], "seconds": 9, "show": false}, "seal_set": {"after": ["carve"], "tells": ["seal_set:seal", "seal_set:forest"], "seconds": 12, "show": false}, "trunk": {"after": ["seal_set"], "tells": ["trunk:reach", "trunk:still", "trunk:back"], "seconds": 15, "show": false}, "match": {"after": ["trunk"], "tells": ["match:strike", "match:behind"], "seconds": 10, "show": false}, "ours": {"after": ["match"], "tells": ["ours:proud"], "seconds": 7, "show": false}, "think": {"after": ["match"], "tells": ["think:think"], "seconds": 7, "show": false}, "quit": {"after": ["match"], "tells": ["quit:out", "quit:in", "quit:pocket"], "seconds": 14, "show": false}, "swim": {"after": [], "tells": ["swim:animals", "swim:up"], "seconds": 9, "show": false}, "fall": {"after": ["swim"], "tells": ["fall:sat", "fall:near", "fall:face"], "seconds": 12, "show": false}, "run_papa": {"after": ["fall"], "tells": ["run_papa:gone"], "seconds": 7, "show": false}, "papa_comes": {"after": ["run_papa"], "tells": ["papa_comes:come", "papa_comes:lift", "papa_comes:held"], "seconds": 14, "show": false}, "lead_home": {"after": ["papa_comes"], "tells": ["lead_home:go", "lead_home:play", "lead_home:back"], "seconds": 12, "show": false}, "count": {"after": ["fall"], "tells": ["count:back", "count:ask", "count:sit", "count:up"], "seconds": 18, "show": false}, "beetle": {"after": ["fall"], "tells": ["beetle:nose", "beetle:beetle", "beetle:hand", "beetle:house"], "seconds": 16, "show": false}, "night_path": {"after": [], "tells": ["night_path:boat", "night_path:pack", "night_path:stone"], "seconds": 11, "show": false}, "into_trees": {"after": ["night_path"], "tells": ["into_trees:gone"], "seconds": 6, "show": false}},
 "points": ["stump#seat", "trunk#palm", "trunk#branch", "crevice#pack", "moss#beetle", "animals#seal", "animals#animals", "path#stone1", "path#stone2", "path#stone3", "far_boat#lamp", "sky#sun", "sky#sun_late", "sky#sun_dawn", "grandma#chest", "sophia#chest", "papa#chest"],
 "offers": ["stump#seat", "trunk#palm", "trunk#branch", "crevice#pack", "moss#beetle", "animals#seal", "path#stone1", "path#stone2", "path#stone3", "grandma#chest", "sophia#chest", "papa#chest"],
 "party": {"dawn": 0, "dusk": 0, "night": 0, "late": 0, "calm": 0, "storm": 0, "flash": 0, "fog": 0, "moon": 1, "animals": 4, "pack": "none", "band": 0, "boat_out": false, "brave": false, "sophia_back": false, "grandma_here": true, "sophia_here": true, "papa_here": false},
 "acts": {"flash": {"values": [], "tells": ["flash:strike"]}, "knife_open": {"values": [], "tells": []}, "carve": {"values": [], "tells": []}, "spin": {"values": [], "tells": []}, "step": {"values": [], "tells": ["step:stone1", "step:stone2", "step:stone3"]}, "lantern_sway": {"values": [], "tells": []}, "grab": {"values": [false, true], "tells": []}}}
```
