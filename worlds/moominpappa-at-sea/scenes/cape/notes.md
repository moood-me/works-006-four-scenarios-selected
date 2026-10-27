# The Fisherman's Cape (С6 of the game «Папа и море»)

The cape (1.6–1.7, 2.4, the storm, the Pie): the Fisherman on his low stone in the lee of his rock, his net in his
hands and heaped at his feet, the rest of it drying on two driftwood poles; Moominpappa sitting on the granite beside
him; across the cove the island's long back rising to the lighthouse some sixty metres off, Moominmamma small on its
steps; and its pieces (stage 5: below).

- `tools/cape.py` writes `scene.json`; it reads the lib's `PLACES` for the starting state. The land is one function
  (`lib.js` `land`): the viewer's rock and the cape running out to the left, the Fisherman's knob of rock on it, a
  cove of water ahead, the island's back on the right up to the lighthouse's knoll. The sky, the sea, the granite, the
  lighthouse, its steps and the pines are the world's module `island` (`modules/island.md`), and so are the hour and
  the storm (the light from `tools/island.py`: the cape's late afternoon is the island's day).
- `lib.net` draws a net's diamond mesh. `net` (dry · knot · papa · mended · folded): the rack's hanging net (a layer
  the wind sways; bare when folded; a pale mended patch), the net at his feet (element `net`: the heap; a snarl of a
  knot; drawn up into Papa's paws, the knot before him; a roll beside him) — its point `net#knot` wherever the knot
  is; folded — his hands empty (`fisher_wear` {"parts": []} by the script: «with» only adds; else the cast's `netload`).
- `bread` — the loaf on the flat stone by the path (`bread#stone`); `pie` — the pie on the rock beside him;
  `matchbox` (none · stone · palm) — the element `box` (point `box#box`): on his stone, or in his right hand (its
  animate carries it to `fisher#hand_r`); the matches minigame's close is the closeups shot `matchbox` (`matchbox_open`,
  `matchbox_give`, `matchbox_close`).
- The rocks Papa holds on to in the storm are knobs of the land itself (`lib.HOLDS`, painted by the granite): their tops `granite#hold1…3` (the storm's minigame).
- The storm: the island's look, sky and sea; rain, spray on the cove's rocks, and `surge` — the wave coming in over
  the rocks and under the Fisherman (a layer its animate brings in and draws back, only in a storm); lightning by the
  island's script. The lighthouse's beam across the cove and the cape — `beam` (on), turned by the island's script.
- People (the world's cast): `<id>_at` — fisher (seat · away), papa (beside · behind · net · under · stand), mama
  (steps · beside · apart), my (rock), troll (near); put by the island's `places` from `lib.PLACES`. Little My and
  Moomintroll are not here at the start.
- The Fisherman's net on his shoulder (the finals) needs a part of the cast's (`modules/cast`); not here yet.

## Pieces (stage 5)

The pieces of the game's steps (plan.md «Куски сцен по шагам», scenario.md, contracts-review.md), played by the
module `beats`: the key `beat`, `beat:<name>` told at its end, `beat_next`. Each: what it shows, the keys it begins
with or sets, where it ends — in the pose of what comes next (a choice, a minigame, the next piece); its moments
are told as `<piece>:<moment>` — the game speaks its lines there. Where the people stand is each piece's own (its
`from`); the game sets only the play's keys. All are the game's (`show` false); the showcase plays a selection.

- `approach` (1.6, ≈ 9 s). Afternoon: Papa comes round the rocks onto the cape behind the Fisherman — the net on his knees, his side to the lighthouse; he does not turn. Keys: net dry. Ends: Papa standing behind him (the choice, at fisher#chest). Moments: `approach:behind` — Papa behind his back.
- `keeper` (1.7 «keeper», ≈ 10 s). After `approach`. At the word «keepers» the Fisherman turns his head and turns away; Papa goes off pleased; the Fisherman looks at his back, then at the lighthouse. Keys: —. Ends: the Fisherman looking at the lighthouse. Moments: `keeper:turn` — his head turns; `keeper:gone` — Papa gone; he looks at the lighthouse.
- `invite` (1.7 «invite», ≈ 12 s). After `approach`. The Fisherman gets up with his net and goes further off over the rocks; Papa stands alone. Keys: —. Ends: Papa alone. Moments: `invite:no` — the Fisherman: «No need»; Papa on about pancakes; `invite:up` — he gets up; `invite:gone` — Papa alone.
- `sit` (1.7 «sit», ≈ 14 s). After `approach`. Papa sits down beside him; a long pause, the wind; the Fisherman, not looking, speaks of the sea (then the cut to the landing's `bundles`). Keys: —. Ends: the two sitting. Moments: `sit:sat` — Papa sits; `sit:sea` — «The sea is good today» — «Good».
- `bread` (2.3 «invited», ≈ 7 s). Mama on her way to the water puts a loaf on the flat stone by the path and goes on. Keys: bread false → true. Ends: the bread on the stone. Moments: `bread:left` — the bread on the stone.
- `net_sit` (2.4 «sat beside», ≈ 9 s). Papa sits as the first time; the Fisherman's net is tangled — the knot in it before Papa (the knot minigame, the insert `knot`). Keys: net knot. Ends: Papa's paws at the knot. Moments: `net_sit:ready` — the knot.
- `net_ask` (2.4 «sat beside», ≈ 14 s). After `net_sit`. The knot undone (act knot); the Fisherman looks at Papa's paws on his net and does not take it away; Papa asks; a long look at the sea; then the knot close — the same as under the wall's lines (insert). Keys: net mended. Ends: the knot close. Moments: `net_ask:asked` — Papa: «Why isn't he lit?»; `net_ask:answer` — «He shines outward»; `net_ask:knot` — the knot close — the same.
- `net_left` (2.4 «keeper»/«invited», ≈ 10 s). The Fisherman sees him coming, gets up and goes off; the net drying is caught on a stone and stays; Papa sits down at it (the knot minigame). Keys: net papa. Ends: Papa's paws at the knot. Moments: `net_left:gone` — he is gone; `net_left:ready` — the knot.
- `net_taken` (2.4 «keeper»/«invited», ≈ 9 s). After `net_left`. The Fisherman comes back fast, takes the net out of his paws without a word and goes; Papa with empty paws on another's stone; the knot close at the end (insert). Keys: net dry. Ends: Papa alone. Moments: `net_taken:taken` — the net taken; `net_taken:knot` — the knot close.
- `under_wave` (4.3 (cut from the room's window), ≈ 7 s). The storm at night: the Fisherman sits, the wave comes in under him, he does not get up. Keys: night 1, storm 1. Ends: him under the wave. Moments: `under_wave:wave` — the wave under him.
- `crossing` (4.4 «cape», ≈ 8 s). Papa with the lantern comes over the rocks toward the cape (the rocks minigame: holds granite#hold1…3). Keys: night 1, storm 1. Ends: Papa at granite#hold1. Moments: `crossing:ready` — at the first hold.
- `blown` (4.4 «cape», ≈ 8 s). After `crossing`. Halfway the lantern blows out; Papa shouts at the sea; the moon in a rent of the clouds, foam. Keys: act cross 3. Ends: Papa on the rocks, the lantern dark. Moments: `blown:out` — Papa: «You won't get me!».
- `sleeve` (4.4 «cape», ≈ 14 s). After `blown`. Papa takes the Fisherman by the sleeve and pulls toward the rock; he does not move, does not look; Papa lets go and sits down beside him under the same wave; it covers both and goes. Keys: —. Ends: the two under the wave. Moments: `sleeve:let_go` — the sleeve let go; `sleeve:wave` — the wave over both.
- `lightning` (4.4 «cape», ≈ 8 s). After `sleeve`. Lightning: both faces close, the net on the Fisherman's knees — the knot close. Keys: flash, net knot. Ends: the knot close. Moments: `lightning:faces` — both faces; `lightning:knot` — the knot.
- `till_dawn` (4.4 «cape», otherwise, ≈ 10 s). After `lightning`. The Fisherman says nothing; both under the waves, the storm thinning toward dawn; Papa understands only that he will not go. Keys: storm 1 → 0.6, night 1 → 0.6. Ends: the two sitting, greyer. Moments: `till_dawn:stay` — he will not go.
- `spoke` (4.4 «cape», «sat beside», ≈ 12 s). After `lightning`. The Fisherman looks at the dark lighthouse; his palm lies on his knee and presses, as a burner is held — and lets go; Papa looks at his hand. Keys: —. Ends: Papa looking at the hand. Moments: `spoke:line` — «On a night like this he should be burning»; `spoke:palm` — the palm on the knee.
- `beam_cape` (4.4 «lighthouse», two sheets, ≈ 8 s). The beam goes over the storm and over the cape; the Fisherman under the wave lifts his face to the light. Keys: night 1, storm 1, lighthouse_lit 1, beam 1. Ends: his face in the light. Moments: `beam_cape:face` — his face lifted.
- `pie_way` («Pie», ≈ 6 s). Papa sets out over the stones with Mama's pie in the moonlight; he stands at the first stone (the carry minigame). Keys: night 0.7, dusk 0.3, the pie in his paws. Ends: Papa at the first stone with the pie. Moments: `pie_way:ready` — at the first stone.
- `pie` («Pie», ≈ 20 s). After `pie_way`. Papa comes over the stones (act carry) and sets the pie beside him; the Fisherman does not look at it; a long pause, the wind; then he breaks off a piece and eats in silence; the lighthouse dark, the moon. Keys: pie true. Ends: the two sitting, the pie between (the matches minigame). Moments: `pie:set` — the pie set down; `pie:eat` — he eats; `pie:sea` — «The sea is good today».
- `matches_palm` («Pie», «spoke», ≈ 8 s). After `pie`. Papa lays his matchbox in the Fisherman's palm; his fist closes on it. Keys: matchbox palm. Ends: the fist closed. Moments: `matches_palm:no` — «No need».
- `matches_stone` («Pie» otherwise, late «Pie», ≈ 7 s). After `pie`, `bread_take`. The matchbox laid on the stone beside him; he does not take it while they are there. Keys: matchbox stone. Ends: the box on the stone. Moments: `matches_stone:left` — the box on the stone.
- `pie_leave` («Pie», ≈ 14 s). After `matches_palm`, `matches_stone`. Everyone in their corner; Mama beside Papa (or apart, facing the shore) gets up first, lightly; Papa answers not turning; she goes off the cape alone; all stand, the Fisherman too (with «spoke», for the first time). Keys: mama_at beside / apart (the play's). Ends: the cape emptying. Moments: `pie_leave:up` — Mama: «I'll go wash the tin»; `pie_leave:go` — Papa: «Go, go»; `pie_leave:gone` — Mama gone.
- `stone_empty` («Pie», full, ≈ 7 s). After `pie_leave`. From the path going away Papa looks back — the stone beside the Fisherman's place empty. Keys: matchbox none. Ends: the empty stone. Moments: `stone_empty:empty` — the stone empty.
- `box_shot` (late «Pie», the last frame, ≈ 6 s). The matchbox on the stone, held (the last frame; before it the game shows the room's wall). Keys: matchbox stone. Ends: the box on the stone. Moments: `box_shot:box` — the box.
- `bread_way` (late «Pie», ≈ 6 s). Papa alone sets out over the stones with the bread — in the moonlight or under the beam; he stands at the first stone (the carry minigame). Keys: night 0.7, the bread in his paws. Ends: Papa at the first stone with the bread. Moments: `bread_way:ready` — at the first stone.
- `bread_take` (late «Pie», ≈ 11 s). After `bread_way`. Papa comes over the stones (act carry) to the Fisherman; he takes the bread without turning, does not lift his head to the beam. Keys: bread true → false. Ends: the bread in his hands. Moments: `bread_take:line` — «There was no need»; `bread_take:more` — with «spoke»: «It'll be calm tomorrow too».
- `beam_pass` («Beam», ≈ 7 s). The beam passes over the cape: the Fisherman on his stone, lit and left. Keys: night 1, lighthouse_lit 1, beam 1. Ends: the beam gone on. Moments: `beam_pass:fisher` — the Fisherman in the beam.
- `look_fisher` (common shots, ≈ 7 s). The Fisherman by his mark (fisher_mark: keeper — turned away; invited — his hand lifted; sat — looking toward Papa's place) and his net by «Net» (mended, or folded). Keys: the play's keys. Ends: the Fisherman with the net. Moments: `look_fisher:net` — the net.

## Open for the game (stage 5)

- The knot close is the closeups shot `knot` (the insert `knot`, `knot_open`; the minigame's point `knot#thread`). Its
  pull (`knot_pull`) is the minigame's `knot` while Papa works the knot; in the close-ups after (`net_ask:knot`,
  `net_taken:knot`, `lightning:knot`) it is 0 — the knot itself, the Fisherman's sign, the same as under the wall's
  lines; `knot_paws` 0 in the lightning: the net alone on his knees.
- The matches minigame's close is the closeups shot `matchbox` (`matchbox_open`, `matchbox_give`, `matchbox_close`);
  the cape's own box (on the stone, in his palm by `matchbox`) is the element `box`, point `box#box`.
- The carry minigame's `carry_tilt` (−1…1) tips the pie or the bread: Papa's paws uneven before his chest
  (`papa_reach`, the script), level at 0; `carry` takes him along the way.
- The faces: the camera before the two on the cape's left, low (lib `FACES`, `FACES_CLOSE`); the way over the rocks
  from the right (`WAY_CAM`).
- The lantern Papa carries in `crossing`/`blown` is the cast's part `lantern` in his paw, `lantern_out` from `blown`.
- `matches_stone` serves both the full «Pie» (after `pie`) and the late one (after `bread_take`).
- Folded, the Fisherman's own net (`netload`) is taken off by `fisher_wear` {"parts": []} (the script); the roll beside
  him is the element `net`.

## Contract for the check

```json
{"beats": {"approach": {"after": [], "tells": ["approach:behind"], "seconds": 9, "show": false}, "keeper": {"after": ["approach"], "tells": ["keeper:turn", "keeper:gone"], "seconds": 10, "show": false}, "invite": {"after": ["approach"], "tells": ["invite:no", "invite:up", "invite:gone"], "seconds": 12, "show": false}, "sit": {"after": ["approach"], "tells": ["sit:sat", "sit:sea"], "seconds": 14, "show": false}, "bread": {"after": [], "tells": ["bread:left"], "seconds": 7, "show": false}, "net_sit": {"after": [], "tells": ["net_sit:ready"], "seconds": 9, "show": false}, "net_ask": {"after": ["net_sit"], "tells": ["net_ask:asked", "net_ask:answer", "net_ask:knot"], "seconds": 14, "show": false}, "net_left": {"after": [], "tells": ["net_left:gone", "net_left:ready"], "seconds": 10, "show": false}, "net_taken": {"after": ["net_left"], "tells": ["net_taken:taken", "net_taken:knot"], "seconds": 9, "show": false}, "under_wave": {"after": [], "tells": ["under_wave:wave"], "seconds": 7, "show": false}, "crossing": {"after": [], "tells": ["crossing:ready"], "seconds": 8, "show": false}, "blown": {"after": ["crossing"], "tells": ["blown:out"], "seconds": 8, "show": false}, "sleeve": {"after": ["blown"], "tells": ["sleeve:let_go", "sleeve:wave"], "seconds": 14, "show": false}, "lightning": {"after": ["sleeve"], "tells": ["lightning:faces", "lightning:knot"], "seconds": 8, "show": false}, "till_dawn": {"after": ["lightning"], "tells": ["till_dawn:stay"], "seconds": 10, "show": false}, "spoke": {"after": ["lightning"], "tells": ["spoke:line", "spoke:palm"], "seconds": 12, "show": false}, "beam_cape": {"after": [], "tells": ["beam_cape:face"], "seconds": 8, "show": false}, "pie_way": {"after": [], "tells": ["pie_way:ready"], "seconds": 6, "show": false}, "pie": {"after": ["pie_way"], "tells": ["pie:set", "pie:eat", "pie:sea"], "seconds": 20, "show": false}, "matches_palm": {"after": ["pie"], "tells": ["matches_palm:no"], "seconds": 8, "show": false}, "matches_stone": {"after": ["pie", "bread_take"], "tells": ["matches_stone:left"], "seconds": 7, "show": false}, "pie_leave": {"after": ["matches_palm", "matches_stone"], "tells": ["pie_leave:up", "pie_leave:go", "pie_leave:gone"], "seconds": 14, "show": false}, "stone_empty": {"after": ["pie_leave"], "tells": ["stone_empty:empty"], "seconds": 7, "show": false}, "box_shot": {"after": [], "tells": ["box_shot:box"], "seconds": 6, "show": false}, "bread_way": {"after": [], "tells": ["bread_way:ready"], "seconds": 6, "show": false}, "bread_take": {"after": ["bread_way"], "tells": ["bread_take:line", "bread_take:more"], "seconds": 11, "show": false}, "beam_pass": {"after": [], "tells": ["beam_pass:fisher"], "seconds": 7, "show": false}, "look_fisher": {"after": [], "tells": ["look_fisher:net"], "seconds": 7, "show": false}},
 "points": ["lighthouse#door", "lighthouse#lantern", "rack#net", "net#knot", "bread#stone", "pie#pie", "granite#hold1", "granite#hold2", "granite#hold3", "seat", "box#box", "matchbox#box", "matchbox#palm", "sky#moon", "knot#thread", "fisher", "papa", "mama", "my", "troll", "fisher#chest", "papa#chest", "mama#chest", "my#chest", "troll#chest"],
 "offers": ["fisher#chest", "papa#chest", "mama#chest", "my#chest", "troll#chest", "net#knot", "bread#stone", "granite#hold1", "granite#hold2", "granite#hold3", "knot#thread", "matchbox#box", "pie#pie", "seat"],
 "party": {"dawn": 0, "dusk": 0, "night": 0, "moon": 0.6, "storm": 0, "lighthouse_lit": 0, "beam": 0, "net": "dry", "bread": false, "pie": false, "matchbox": "none", "mama_at": "steps", "fisher_mark": "keeper"},
 "acts": {"knot": {"values": [], "tells": []}, "knot_open": {"values": [], "tells": []}, "matchbox_open": {"values": [], "tells": []}, "matchbox_give": {"values": [], "tells": []}, "carry_tilt": {"values": [], "tells": []}, "cross": {"values": [0, 1, 2, 3], "tells": []}, "carry": {"values": [], "tells": []}, "matchbox": {"values": ["none", "stone", "palm"], "tells": []}, "flash": {"values": [], "tells": ["flash:strike"]}}}
```
