# The House

The house on the island (C2 of the game's scenario): the glazed veranda — Papa's table by its windows, his camp bed,
the glass door to the room with the straw hat on its nail — and the room: Grandmother's and Sophia's beds side by side,
the night table with her lamp, the window onto the cape with the armchair beside it, the second door, the creaking one,
to the entry and the porch. Outside, the island's rock and sea; from the room's window the long back of granite down to
the cape, where Sophia's tent stands. Stage 4: every state a key of the play; people stand and breathe (no motions yet). Stage 5: the pieces below — their
contract first, the code after.
`tools/house.py` writes `scene.json` (run `python -B tools/house.py <world>`); the island's sky, sea, light and weather
are `modules/isle` (`tools/isle.py`).

## How it is made

- **The frame.** Everything of the house is laid on the unseen anchor `veranda` at the veranda's far corner (across
  −0.6, distance 7, facing 225, 0.3 m over the land): x runs right along the back wall, z away behind it, y up from the
  floor. `lib.js` turns it to the world's metres and back (`lx`, `lz`, `wa`, `wd`, `bearing`); `tools/house.py` has
  the same numbers — keep them the same. A card's facing in the frame: 180 faces the veranda (−z), 0 the cape's side,
  90 the right (+x), 270 the left.
- **The veranda** (stage 2's, as approved): x 0…6.4, z −6.4…0 — `floor`, `ceiling`, `side_wall` and `glazing` (x 0),
  `back_wall` with the doorway (x 1.3…2.15), the open glass `door`, `hat` on its nail, Papa's `table` (plane;
  `supper`), `table_legs`, `table_things`, `chair`, `cot`. Beyond the glazing the house's front (`house_out`).
- **The room** x −2.7…2.3, z 0.1…3.8: `room` (the far wall, the window's opening cut out; the point `room#window`),
  `room_near` (the doorway from inside), `jamb`, `lintel`, `room_left`, `room_right` (the second door's opening),
  `room_ceiling` (a card laid face down), `room_floor`. The beds' heads at the far wall: `beds` (their tops, a plane;
  `beds#gap` — the edge of Grandmother's blanket by Sophia's bed), `pillow` (Sophia's, with the dead bird), `bed_foot`,
  `bed_side` (each with a part for the other bed), `bed_head`. `stand` and `stand_top` (the night table), `lamp`,
  `teabox`, `armchair` (`armchair#seat`). The window: `room_window` (its frame and the shut left leaf; its rectangle is
  the daylight `win_in`), `room_glass` (the left leaf's pane: `glass`, strength 0.55 — the room mirrored in it at
  night), `casement` (the right leaf, hinged at its right, swinging out by `casement`), `sill` (a plane), `drops`.
  `door2` (hinged at its far side, opening out into the entry by `creak`), and the entry beyond it (`entry_floor`,
  `entry_wall` with the outer door and Papa's storm lantern on its hook, `entry_side`).
- **Outside.** `relief.js` → `lib.ground`: level under the house (the veranda and the room: `lib.out`), falling to the
  sea (−4.4) all round, and the cape's back (`lib.ridge`) running from the room's window (W) down 65 m to the cape (T,
  bearing 18° from the window) and ending in the sea. `outside` — one draped plane painting it all (granite, the wet
  band, cracks, lichen, grass and heather by the house and along the crest, burnt by `late`, the worn way of stones down
  to the cape). The island's `sky` and `sea` (`modules/isle`), `islet`, `skerry`, `mist` and `fog_wall` (thickening
  with `fog`), `juniper` along the back, the `tent` (translucent canvas; its candle a glow `candle` by `tent_light`;
  the point `tent#tent`), `far_lantern` (Papa's lantern, `far_light`, carried along the way by `far_light_at`).
- **The light.** The island's (`isle.light`: the day as approved, the looks late, dawn, dusk, night, fog_air, storm,
  flash), `inside` 0.6 (at night 0.85, so that faces read). The far lights: the suns of the day, August and the dusk
  come in only through the glazing; the dawn's and the moon's — low over the sea beyond the cape, bearing 22° — only
  through the room's window (`through`, the opening as a polygon). The day (or the moon) at the glazing (`sky_in`) and
  at the room's window (`win_in`). `lamp` (the lamp's flame, lit by `lamp_lit` while it is on its table or in the
  window), `candle` (at Sophia's right hand — the candle itself is the people's part, stage 5), `far_lantern`. Rain in
  three areas round the house (none inside it), drops running down the glazing and the window in a storm.
- **The script** (`script.js`): the island's weather; `view` → a cut with all the camera's keys (`lib.VIEW`); `<id>_at`
  → the person put at that spot at once, turned, looking where the spot says (`lib.SPOT`: Grandmother at the window
  looks at the tent, Sophia at the moon), Sophia's hand in Grandmother's when both are before the glass door, Papa's mug
  at his table; `hat`, `lamp`, `cot` → their places; `casement`, `creak`, `far_light_at` → the turns and the place
  (the script's own keys, in `states`).
- **The views** (`view`): `veranda` (stage 2's), `room` (from inside the doorway: the beds, the window, the armchair),
  `window` (behind the one at the window on her right: the cape, the moon, her face in the glass), `face` (close on the
  face of the one at the window, from beside the night table — the camera at Sophia's eyes when she is there, else
  Grandmother's), `door` (from the beds' side: the second door and the doorway to the veranda). A view is set between
  steps: it cuts.
- **The cat** (the world's `cat`, stage 5): `cat_at` — `pillow` (on Sophia's bed by her pillow), `sill` (on the room
  window's sill, inside, by the half-open leaf), `door2` (by the second door, going out), `out` (on the rock under the
  window, going off into the fog); `cat_pose` (sit · lie · walk · none — not here). Walking, a new `cat_at` sends him at
  his pace (`cat:arrived` told). Only Sophia touches him, sitting (`sophia_reach` on `cat#back`). Eriksson never comes
  to the house (he does not come ashore): he is not in this scene.

## The keys of the play

Common (the island's): `dawn`, `dusk`, `night`, `late`, `calm`, `storm`, `flash`, `fog`, `moon`. The house's:
`view`, `grandma_at` (door · table · bed · window · chair · door2), `sophia_at` (door · bed · window · door2),
`papa_at` (table · cot · doorway · room · door2), `hat` (nail · bed · none), `bird`, `teabox`, `lamp` (none · table ·
window · burnt), `lamp_lit` 0…1, `drops` (none · full · empty), `cot` (veranda · room), `supper`, `candle` 0…1,
`casement` 0…1, `creak` 0…1, `tent_light` 0…1, `far_light` 0…1, `far_light_at` 0…1; the people's `<id>_here`,
`<id>_mood`. Stage 5: `cat_at`, `cat_pose`, `tilt`, `cover`, `lamp_up`, `beat`, `beat_next`; the play's variants
`papa_look`, `secret`, `cat`, `take_lantern`, `sophia_hand`, `kick`, `hold_hand`, `knew` (see the pieces).

## What changed for the game (stage 3 → 4)

- The scene is the whole house now; its stage-3 points stay (`back_wall#doorway`, `room#window`, `hat#hat`,
  `glazing#window`, people's `#chest`). The door mini-game (М5в) belongs on `door2#handle` (the second door) with
  `view: door`, not on `back_wall#doorway` (the glass door to the veranda).
- The «new house» stand-in is gone from this scene's use: the game's 3.3 «moss» goes to `new-house`.

## Open

- The thick fog (`fog` over a half: the look `fog_air`) is the air of the whole scene, the room too: a lamp lit in the
  room glows in the room's air as in the fog outside. Held down here (the house's `fog_air` `hazeGlow` 0.8, the lamp's
  reach 3.5); the engine has no air of its own for what is inside (reported).
- By day the window's pane shows a faint image of the room (the pane's `show` counts the day's light so).

## Pieces (stage 5)

The pieces of the game's steps (plan.md «Куски сцен по шагам», scenario.md §5, the game's chapters), played by the
module `beats`: the key `beat`, `beat:<name>` told at its end, `beat_next`. Each: what it shows, the keys it begins
with or sets, where it ends — in the pose of what comes next (a choice, a minigame, the next piece); its moments are
told as `<piece>:<moment>` — the game speaks its lines and says its narration there. All are the game's (`show` false);
the showcase plays a selection.

How every piece is made (the mistakes «Папа и море» made, not to make again):
- **People's places and the camera are each piece's own** (its `from`); the game sets only who is here, the moods and
  the play's keys (below). A piece with `after` keeps everyone where the piece before left them — its `from` does not
  apply — so it moves nobody at its start; whatever changes, changes on screen (a walk, or a cut made ready in its run).
- **Every camera a piece sets is whole**: `camera_x/z/h/yaw/look/pitch/roll` (or a cut from the view's numbers), never
  a target alone over offsets a hand-set shot left.
- **People walk** (`<id>_do` walk with their own pace — Grandmother's `old_walk`), they do not slide: a new place is
  reached on foot, or by a cut.
- **The pose of a choice or a minigame**: the camera still; its point in the middle 4:3; the top ~12 % of the frame
  free (the game's title there), nothing that matters in the bottom 20 % (the subtitles); faces read.
- Night is moonlit and light, the storm white, the fog white under the moon; warm only the lamp and the candle.

**Prologue**
- `hat_dawn` (П.3, ≈ 7 s). June, dawn, everyone asleep: the veranda grey and still; the camera goes slowly past the
  straw hat on its nail by the glass door; beyond it Papa asleep on his camp bed. Keys: dawn 1; hat (the play's: nail).
  From: Papa lying on the cot. Ends: Papa asleep, the hat near in the frame (the game cuts to the shore's ledge).
  Moments: `hat_dawn:hat` — the hat close (the game: «In the doorway behind them a straw hat…»); `hat_dawn:papa` —
  Papa asleep.

**I. 1.1, 1.3**
- `morning` (1.1, ≈ 14 s). A June morning on the veranda: Papa at his table by the window, papers, his mug; Sophia
  comes along the veranda and goes through the glass door under the hat without raising her eyes; Grandmother takes
  her knife and her tobacco pouch off the table. From: Papa at the table, Grandmother by it, Sophia at the glazing's
  end. Ends: Grandmother by the table with the knife and the pouch, Papa over his papers. Moments: `morning:hat` —
  Sophia under the hat, eyes down; `morning:knife` — the knife and the pouch in her hands (the game: «Mamma, don't go
  far» — «I won't»).
- `morning_go` (1.1, ≈ 6 s). After `morning`. Grandmother goes to the glass door and through it; with `papa_look`
  (the play's: «water: together») Papa raises his head and watches her all the way to the door, else he writes on.
  Ends: the doorway empty, Papa at his table. Moments: `morning_go:door` — she is at the door.
- `supper_table` (1.3 «secret», «tell», ≈ 12 s). An evening in June: supper on the veranda's table (`supper`), the three at
  it. With `secret` (the play's) Sophia, after her line, turns and looks at Grandmother; without it she looks at her
  plate, and Papa chews and says nothing. Keys: dusk 0.5; supper true. From: Papa at his end of the table,
  Grandmother and Sophia across. Ends: the three at the table (the game cuts to the shore — the shell on the rail).
  Moments: `supper_table:sat` — the three at the table (the game: «Mamma, you're coughing» — «It's the wind!», or «Grandmother
  smokes»); `supper_table:look` — Sophia looks at Grandmother, or Papa chews in silence.

**II. 2.2 — the bird**
- `bird_pillow` (≈ 10 s). A July morning, the room: on Sophia's pillow a dead bird, the cat sitting beside it, waiting;
  Sophia sits up, sees it and scrambles out of bed; Grandmother sits up in hers. Keys: bird true; cat pillow, sit.
  From: both in their beds. Ends: the pose of the choice — Sophia standing by her bed, the pillow, the bird and the cat
  in the middle 4:3 (`pillow#pillow`). Moments: `bird_pillow:seen` — the bird and the cat (the game: «Morning. On Sophia's
  pillow…»); `bird_pillow:shout` — Sophia at the cat («Murderer! I hate you!»).
- `gift` (2.2 «gift», ≈ 14 s). After `bird_pillow`. Sophia looks at the cat a long time; then for the first time strokes him,
  carefully (her hand on `cat#back`) — he stays; she lays the bird in the old tea box. Keys: bird true → false, teabox
  true. Ends: Sophia with the box by her bed, the cat sitting. Moments: `gift:look`; `gift:stroke`; `gift:box`.
- `gift_again` (2.2 «gift», ≈ 9 s). Next morning: a new bird on the pillow, the cat beside it waiting; Sophia, wrinkling
  her nose, puts it with two fingers into the same box. Keys: bird true → false; teabox true; cat pillow, sit. From:
  Sophia by her bed, Grandmother in hers. Ends: Sophia with the box. Moments: `gift_again:bird`; `gift_again:box`.
- `bird_out` (2.2 «out», ≈ 9 s). After `bird_pillow`. Grandmother quickly wraps the bird in a pillowcase and carries it out by
  the second door; the cat walks out before her. Keys: bird true → false; cat pillow → door2 (walk) → none; creak.
  Ends: the second door ajar, Sophia alone by her bed. Moments: `bird_out:wrapped`; `bird_out:gone`.
  («bury» has no piece here: from the choice's pose the game cuts to the shore.)

**II. 2.3 Ш1 — the moon**
- `moon_window` (≈ 16 s). The night of the full moon, the room: Sophia at the window in her nightdress, the moon on her;
  Grandmother in her bed sits up; a cut through the doorway — Papa on his camp bed on the veranda, still, his eyes open;
  then Sophia's face close in the moonlight. Keys: night 1, moon 1. From: Sophia at the window, Grandmother lying,
  Papa on the cot. Ends: the pose of the choice — Sophia's face and shoulders at the window, `sophia#chest` in the
  middle 4:3. Moments: `moon_window:water` — Sophia at the window («Grandmother. The moon's in the water»); `moon_window:sit` —
  Grandmother sits up («And where is Mama now?»); `moon_window:cot` — Papa on his cot, still (the creaking stops: the game's
  sound); `moon_window:face` — Sophia's face close.
- `gone` (Ш1 «gone», ≈ 16 s). After `moon_window`. Sophia cries — loudly — and goes from the window to her own bed and sits
  on its edge, her back to Grandmother; beyond the doorway Papa gets up from his cot and goes out along the veranda
  (the door shut quietly: the game's sound); Grandmother moves to the edge of her own bed, very near, and lays her palm
  on the blanket between the beds. Ends: the pose of М5а — her palm by `beds#gap`, the two backs half turned, the
  camera still. Moments: `gone:lie` — at the window (the game: «You're lying» — «No»); `gone:cry` — Sophia at her
  bed; `gone:papa` — Papa gone; `gone:near` — Grandmother on her bed's edge (the game: «Grandmother cannot hug…»).
- `gone_near` (≈ 6 s). After `gone` (and the minigame). Sophia comes over to her by herself, sits close against her and
  goes quiet. Ends: the two on Grandmother's bed's edge. Moments: `gone_near:quiet`.
- `hat_bed` (Ш1 «gone», the morning, ≈ 14 s). Morning: the hat not on its nail — on Sophia's bed; Papa in the doorway
  sees it, stands a long time, does not touch it, and goes to sit at his table with his back to the room; Grandmother
  and Sophia apart in the room. Keys: hat (the play's: bed). From: Papa coming to the doorway from the veranda,
  Grandmother by her bed, Sophia at the window. Ends: Papa at his table, his back to the room. Moments: `hat_bed:hat`;
  `hat_bed:papa` — he stands in the doorway; `hat_bed:back` — at his table (the game: «All day Sophia does not talk
  to Grandmother»).
- `sky` (Ш1 «sky», ≈ 14 s). After `moon_window`. At the window, their lines; Sophia waves to the moon; a cut through the
  doorway — Papa on his cot breathes out, long; Sophia goes to her bed and lies down, Grandmother sits on her own bed's
  edge and takes her hand between the beds. Ends: the pose of М5б — the two hands at `beds#gap`, Sophia's face on
  her pillow. Moments: `sky:moon` («Does she see the moon too?» — «The moon too»); `sky:soon` («And you won't go
  away?…» — «Soon is how old people say it…»); `sky:wave` — Sophia waves; `sky:breath` — Papa breathes out.
- `sky_morning` (≈ 12 s). Morning: Sophia makes her bed herself and whispers to Grandmother; then on the veranda,
  singing, she walks round the hat on its nail. From: Sophia by her bed, Grandmother sitting on hers. Ends: Sophia
  past the hat. Moments: `sky_morning:whisper` («Mama sees»); `sky_morning:hat` — she walks round the hat.
- `to_door` (Ш1 «moon», ≈ 8 s). After `moon_window`. Grandmother gets up slowly, takes Sophia by the hand and leads her to
  the second door; her hand on its handle, Sophia's hand in her other. Ends: the pose of М5в — `door2#handle` in the
  middle 4:3, the door shut. Moments: `to_door:hand` — her hand takes Sophia's.
- `door_out` (≈ 5 s). After `to_door` (and the minigame, which turns `creak`). The two go through into the entry and
  are gone; the door left ajar. Ends: the door ajar, the entry dark (the game cuts to the shore). Moments:
  `door_out:gone`.
- `cough` (Ш1 «moon», the morning, ≈ 8 s). Morning on the veranda: Papa at his table looks up at Grandmother coming
  through the glass door, her shawl round her own shoulders again; she coughs. From: Papa at the table, Grandmother at
  the doorway. Ends: the two, Papa looking at her. Moments: `cough:said` («Mamma, it's cold at night»); `cough:cough`.

**III. 3.3 — the evening**
- `doctor` (3.3 «papa», ≈ 10 s). Dusk on the veranda (dusk 1): Papa at his table, Grandmother across it with her cup;
  he speaks without looking up. From: Papa at the table, Grandmother on the chair across, the cup in her hands. Ends:
  the pose of М7а — her cup over the table at `table#cup` in the middle 4:3. Moments: `doctor:said` («I've written to
  the doctor…»). The minigame turns `tilt` (the cup tips in her hands; spilled — Papa looks at her hand).
- `doctor_after` (≈ 12 s). After `doctor`. A long silence; Papa begins, does not finish, gets up and goes out along
  the veranda (to the nets); Grandmother alone at the table with the cup in the dusk. Ends: Grandmother alone.
  Moments: `doctor_after:chair` («All right. Only don't put a chair for me by the gate»); `doctor_after:cant` — Papa
  («I can't lose you too…»); `doctor_after:gone` — he is gone.
- `palm_night` (3.3 «sophia», ≈ 12 s). Night (moonlit), the room: Grandmother lying with her eyes shut; Sophia gets up with
  the candle (`candle` 0 → 1, its light at her hand), comes to Grandmother's bed and lays her palm on her breast.
  From: both in their beds. Ends: the pose of М7б — Sophia standing by Grandmother's bed, her palm on her breast,
  both faces in the candle's light, `grandma#chest` in the middle 4:3. Moments: `palm_night:up` — Sophia up with the
  candle (the game: «Night. Sophia gets up…»); `palm_night:palm` — the palm on her breast.
- `not_today` (≈ 7 s). After `palm_night`. Sophia whispers, goes back to her own bed and blows the candle out. Keys:
  candle 1 → 0. Ends: both in their beds in the moonlight. Moments: `not_today:whisper` («Not today»);
  `not_today:out`.

**III. 3.4 — the storm**
- `thunder` (≈ 12 s). The next night: the storm (storm 1, lightning — `flash:strike` told), the house shakes; Sophia
  sits up in her bed; Grandmother sits up in hers. Keys: night 1, storm 1. From: both lying; Papa on his cot on the
  veranda (unseen). Ends: the pose of the choice — Sophia sitting up, `sophia#chest` in the middle 4:3. Moments:
  `thunder:up` — she sits up (the game: «The next night. Lightning…»); `thunder:asked` («It was me who asked…»).
- `porch_go` (3.4 «porch», ≈ 7 s). After `thunder`. Grandmother gets up, takes Sophia by the hand, they go out by the
  second door (`creak` 0 → 1). Ends: the door open, the two gone (the game cuts to the shore's porch). Moments:
  `porch_go:out`.
- `storm_cot` (3.4 «porch», Papa not knowing, ≈ 8 s). The veranda in the storm, the white sky in the glazing: Papa
  raises himself on his camp bed at the creak of the door, looks out, and lies down again, his face to the wall. From:
  Papa lying on the cot. Ends: Papa face to the wall. Moments: `storm_cot:up`; `storm_cot:wall`.
- `under` (3.4 «blanket», ≈ 8 s). After `thunder`. Sophia climbs into Grandmother's bed; Grandmother lights the lamp,
  takes it under the blanket and pulls the blanket over both, holding its edge up. Keys: lamp_lit 0 → 1. Ends: the
  pose of М8б — the blanket's edge over the two at `beds#cover` in the middle 4:3, the lamp's glow under it. Moments:
  `under:under`. The minigame turns `cover` (the edge held up; slipped — it sags, the thunder louder).
- `song` (≈ 16 s). After `under`. The glow under the blanket; Grandmother singing; the sobbing goes quiet,
  Sophia asleep; Papa comes from his cot to the glass door, sees them and sits down on the floor at the veranda's
  threshold, his back to the jamb (`sit_threshold`). Ends: Papa at the threshold, the two under the blanket. Moments:
  `song:sing` — the song (the game's voice); `song:asleep` — Sophia asleep; `song:papa` — Papa
  at the door; `song:sat` — he sits, till dawn.
- `notyou` (3.4 «notyou», ≈ 6 s). After `thunder`. Grandmother sits on the edge of Sophia's bed; Sophia clutches her
  sleeve. Ends: the pose of М8в — Sophia's fingers on Grandmother's sleeve, the two faces, `grandma#chest` in the middle
  4:3. Moments: `notyou:clutch`.
- `notyou_after` (≈ 10 s). After `notyou` (the minigame lets the fingers go). A long silence; Sophia asks; then she
  turns to the wall and falls asleep under the loudest thunder (a flash). Ends: Sophia asleep face to the wall,
  Grandmother on her bed's edge. Moments: `notyou_after:ask` («Nothing at all to do with me?» — «Nothing at all»);
  `notyou_after:wall`.

**IV. 4.1–4.2**
- `sniff` (4.1, Papa knowing, ≈ 9 s). An August day (late 1), the room: on the windowsill a bottle of drops; Sophia
  runs in by the second door with the parcel, sniffs the bottle and wrinkles her nose; Grandmother in the room by the
  door. Keys: drops (the play's: full). From: Sophia at the second door, Grandmother by her bed. Ends: Sophia by the
  sill with the parcel, facing Grandmother. Moments: `sniff:sniff` («Is that what tired smells like?» — «It is»).
- `doctor_list` (4.2, «stayed», ≈ 7 s). An August dusk on the veranda (dusk 1, late 1): Papa at his table writes in
  the list for the post. From: Papa at the table. Ends: Papa writing. Moments: `doctor_list:write` (the game: «Doctor —
  September»).

**IV. 4.4 — the night**
- `night_window` (≈ 20 s). The night (night 1, late 1), the room: Grandmother at the half-open window (casement 0.3)
  looking at the cape; the tent glowing far down there; with `cat` (the play's: «cat: gift») the cat sitting on the
  sill beside her; fog comes in from the sea, white and light under the moon (fog 0.3 → 0.8 — the piece moves it), the
  tent's light blurs into a patch and goes out (tent_light 1 → 0). Papa asleep on his cot on the veranda (unseen).
  From: Grandmother at the window; the cat on the sill (with `cat`). Ends: the light gone, the white over the cape.
  Moments: `night_window:tent` — the tent glows (the game's narration); `night_window:fog` — the fog comes; `night_window:out`
  — the light gone (the game: «The little light blurs…»; then «Grandmother!» from far, by the scale).
- `night_face` (≈ 10 s: the silence). After `night_window`. With `cat` the cat gets off the sill and goes out over it
  into the fog (`cat_at` out, then none); the camera comes to Grandmother's face, close, her reflection in the glass
  and the white nothing. Ends: the pose of the choice — her face, `grandma#chest` in the middle 4:3, the camera still.
  Moments: `night_face:cat` — the cat gone into the fog (told without `cat` too: nothing moves); `night_face:face` —
  her face close.

**IV. 4.5 Ш3 — the fog's night**
- `go_out` («go», «behind», ≈ 9 s). After `night_face`. Grandmother goes from the window to the second door; with
  `take_lantern` (the play's: «go») she takes Papa's storm lantern off its hook in the entry and it is lit; without it
  («behind») she draws her shawl round her; she holds the creaking door so it does not creak (creak 0 → 0.4, slowly)
  and goes out. Papa does not wake. Ends: the door ajar, the entry empty (the game cuts to the cape). Moments:
  `go_out:door` (the game: «Grandmother takes the lantern…» / «…without the lantern»); `go_out:gone`.
- `wake` («papa», ≈ 12 s). After `night_face`. Grandmother goes from the window through the glass door to Papa on his
  cot and wakes him; he gets up at once, takes the big lantern; she takes her cardigan — to go too; at the doorway,
  not looking at her, he speaks and goes out. Ends: Papa gone, Grandmother in the doorway with her cardigan. Moments:
  `wake:woke` (the game: «Grandmother wakes her son…»); `wake:sit` («Sit. Shine»); `wake:gone`.
- `shine` (≈ 8 s). After `wake`. Back at the window she lights the lamp and lifts it to the glass; below, Papa's
  lantern goes down the cape's back into the white (far_light 1, far_light_at 0 → 0.6). Keys: lamp window, lamp_lit 1.
  Ends: the pose of М10б — the lamp at the glass, `lamp#lamp` in the middle 4:3, her face by it. Moments:
  `shine:raise`. The minigame turns `lamp_up` (lowered — Papa's light in the fog lost a moment and found again).
- `light_back` (≈ 14 s). After `shine`. A long time nothing; then out of the white one light comes up the cape's back
  (far_light_at → 0); near the house, by `sophia_hand` (the play's: Sophia ≤ 1), Sophia walking holding Papa's hand,
  asleep on her feet — else beside him by herself, cross. Ends: the two coming in by the second door. Moments:
  `light_back:light` (the game: «A long time, nothing…»); `light_back:near` — the two seen (the game: «Sophia is
  walking holding Papa's hand…» / «I wasn't frightened! I was asleep!»).
- `back_in` (≈ 8 s). After `light_back`. In the room Papa takes Sophia to her bed; with `kick` (the play's: «I'll
  knock» promised) she stops on the threshold first, kicks it, and lies down face to the wall without undressing.
  Ends: Sophia in her bed, Papa by the door, Grandmother at the window. Moments: `back_in:threshold` («And you?» —
  «You always lie!»); `back_in:wall` — she lies face to the wall.
- `elbow` (≈ 12 s). After `back_in`. Dawn (night → dawn, the piece moves them; lamp_lit → 0): moving away from the
  window Grandmother sways and Papa catches her by the elbow (`_reach`); she sits down in the armchair; with
  `hold_hand` (the play's: «nets: net», Papa not knowing) he takes her hand, as the end of the net, and holds it.
  Ends: Grandmother in the armchair, Papa by her. Moments: `elbow:sway`; `elbow:caught` («Sit down», or «How long?» —
  «A long time»); `elbow:sat` — she sits (the game: when Papa learns); `elbow:sophia` (told always) — with
  `sophia_knows` (the play's: «Sophia knows») Sophia raises herself on her bed (the game: «I didn't tell. She told me
  not to»), and Papa looks at his mother (he does without it too).
- `papa_came` («papa», «I'll hear» and Sophia called, ≈ 8 s). Morning: Sophia comes to Grandmother in the armchair,
  says it and goes off after Papa through the glass door. From: Grandmother in the armchair, Sophia by her bed, Papa at
  his table beyond the doorway. Ends: Sophia by Papa's table. Moments: `papa_came:said` («I called you. And Papa
  came»); `papa_came:follows`.
- `lamp_window` («lamp», ≈ 7 s). After `night_face`. Grandmother lights the lamp and sets it in the window, standing by
  it. Keys: lamp table → window, lamp_lit 0 → 1. Ends: the pose of М10в — the lamp in the window, her face by it,
  `lamp#lamp` in the middle 4:3. Moments: `lamp_window:set`.
- `lamp_higher` («lamp», Sophia called, ≈ 6 s). After `lamp_window`. She opens her mouth to call back — and does not;
  she raises the lamp higher. Ends: the lamp held high at the glass. Moments: `lamp_higher:raise`.
- `chair_dawn` («lamp», the morning, ≈ 16 s). Morning (dawn 1, late 1, fog 0.8): Grandmother dozing in the armchair by
  the window, the lamp burnt out (lamp burnt); Papa comes in from the veranda, covers her with a blanket (`drape`) and
  looks out of the window at the cape — still white; with `knew` (the play's) he looks at the burnt-out lamp, and
  takes the bottle of drops off the sill and sets it by her. From: Grandmother in the armchair, Papa at the doorway.
  Ends: Papa at the window, looking at the cape (the game cuts to the cape's `out_of_white`). Moments: `chair_dawn:cover` (the game: «Morning. Grandmother has dozed off…»);
  `chair_dawn:lamp` («You didn't sleep» — «I slept»; told without `knew` too: he only looks); `chair_dawn:drops`.
- `breakfast` («lamp», Sophia did not call, ≈ 10 s). The morning on the veranda: Sophia sits down at the table to eat
  without a word, Grandmother across, Papa at his end. From: the three at the table. Ends: the three at the table.
  Moments: `breakfast:lamp` («I saw your lamp»); `breakfast:knock` («You didn't knock» — «I didn't»; told always).
- `cot_moved` («lamp», Sophia called — «heard», ≈ 12 s). The evening (dusk 1, late 1): Papa carries his camp bed from
  the veranda through the glass door into the room and sets it under the window onto the cape; Grandmother on her bed
  watches and says nothing. Keys: cot veranda → room. From: Papa at the cot on the veranda, Grandmother on her bed.
  Ends: the cot under the window, Papa by it. Moments: `cot_moved:carry`; `cot_moved:set` (the game: «…and sleeps
  there for the rest of the summer. Grandmother watches…»).

- `evening_wall` («behind» + «Sophia knows», ≈ 8 s). The evening (dusk 1, late 1), the room: Sophia lies down on her
  bed face to the wall without undressing; Grandmother on her own bed says nothing. With `wall` (the play's: true —
  Sophia called) she lies down; without it (did not call, «I'll knock») she only says it, standing by her bed, and
  sits down on its edge. From: Grandmother sitting on her bed, Sophia coming in by the second door. Ends: Sophia face
  to the wall (or on her bed's edge), Grandmother on hers. Moments: `evening_wall:said` («I called and you didn't
  come!» / «You didn't knock»); `evening_wall:wall`.

**Epilogue**
- `hat_leave` («Mama: moon», the last morning — dawn 1, late 1, fog 0.6, ≈ 6 s). The veranda empty, the things carried
  out (`packed`: the table bare); Sophia, going, stops by the glass door and touches the straw hat on its nail, and
  goes out along the veranda. Keys: hat (the play's: nail). From: Sophia in the doorway. Ends: the hat on its nail,
  the veranda empty (the game goes on to the shore). Moments: `hat_leave:touch` (the game: «Till summer»).

**No piece here:** the rest of the epilogue (shore, sea, cape, new house: the hat on its nail seen from the water is
the shore's `from_water:door`); 2.2 «bury» and 3.4 «porch» go on on the shore; the cat on the porch rail is the shore's
`cat_rail`; Sophia meeting Papa out of the white is the cape's `out_of_white`; «Когда Папа узнаёт» in the house is
`elbow`.

## Open for the game (stage 5)

- **The play's keys** the game sets (`g.scene`): the island's hour and weather; `hat`, `teabox`, `drops`, `cot` (the
  summer's things, by the marks, as `carry` does now); `papa_look`, `secret`, `cat`, `take_lantern`, `sophia_hand`,
  `kick`, `hold_hand`, `knew`, `sophia_knows`, `wall` (the variants above); who is here and the moods. No `view`, no `<id>_at`, no `bird`,
  `lamp`, `lamp_lit`, `candle`, `casement`, `creak`, `tent_light`, `far_light*`, `supper` from the game any more — they
  are the pieces' (`view` stays for the stage-4 stills).
- **Who is here** — the game's, and it must name everyone a piece shows, though asleep or unseen: Papa (on his cot) in
  `hat_dawn`, `moon_window` and its branches, `thunder` and its branches (and `storm_cot`), `night_window` and all of
  Ш3 in the house (he is woken in `wake`, sleeps through `go_out`); Sophia in `night_window` is not (she is on the
  cape) but is in `light_back`, `back_in`, `elbow`, `papa_came`, `evening_wall`, `hat_leave` (contracts-review.md,
  house 1). The seams with the other scenes are the game's (contracts-review.md «Общее» 4): after `supper_table` with
  «tell» the shore's `shell`; with «called» the cape's `out_of_white` → the shore's `called_porch` → `cot_moved` in
  the evening; without it `out_of_white` → `breakfast`; `doctor_list` between the cape's `doctor` and `goodnight`
  (through black both ways).
- The minigames' keys here: `creak` (М5в «door» — the second door's leaf, 0…1), `tilt` (М7а «cup» — the cup in her
  hands, −1…1), `cover` (М8б «blanket» — the blanket's edge, 0…1), `lamp_up` (М10б «lamp» — the lamp at the glass,
  0…1; not `lamp`, which here is where the lamp is). Their points: `door2#handle`, `table#cup`, `beds#cover`,
  `lamp#lamp`; М5а/М5б `beds#gap`, М7б and М8в `grandma#chest`, М10в `lamp#lamp`.
- Parts and closeups (package Л): the knife and the pouch, the mug (Papa's; Grandmother's cup), the supper's plates,
  the pillowcase, the candle, the lamp in her hands, the big lantern, the storm lantern, the parcel, the blanket, the
  bottle of drops; closeups «palm on the blanket between the beds» (М5а), «Sophia's palm on her breast with the
  candle» (М7б), «fingers on the sleeve» (М8в).
- Motions: `lie_bed`, `sit_bed`, `rise_slow`, `armchair`, `lie_cot`, `sit_cot`, `sit_threshold`, `drape`,
  `raise_lamp`, `carry`, `write`, `pet`, `old_walk`, `run`.
- To make in the scene: the cat element (`cat` module) and its places; the point `beds#cover`; Papa's way out of the
  veranda (beyond the room's sight, along the veranda); people outside on the cape's back near the house at night
  (`light_back`) — not marked `inside` any more: the engine has them inside while they stand on the house's floors;
  `packed` (the veranda emptied for `hat_leave`).

## Contract for the check

```json
{"beats": {"hat_dawn": {"after": [], "tells": ["hat_dawn:hat", "hat_dawn:papa"], "seconds": 7, "show": false}, "morning": {"after": [], "tells": ["morning:hat", "morning:knife"], "seconds": 14, "show": false}, "morning_go": {"after": ["morning"], "tells": ["morning_go:door"], "seconds": 6, "show": false}, "supper_table": {"after": [], "tells": ["supper_table:sat", "supper_table:look"], "seconds": 12, "show": false}, "bird_pillow": {"after": [], "tells": ["bird_pillow:seen", "bird_pillow:shout"], "seconds": 10, "show": false}, "gift": {"after": ["bird_pillow"], "tells": ["gift:look", "gift:stroke", "gift:box"], "seconds": 14, "show": false}, "gift_again": {"after": [], "tells": ["gift_again:bird", "gift_again:box"], "seconds": 9, "show": false}, "bird_out": {"after": ["bird_pillow"], "tells": ["bird_out:wrapped", "bird_out:gone"], "seconds": 9, "show": false}, "moon_window": {"after": [], "tells": ["moon_window:water", "moon_window:sit", "moon_window:cot", "moon_window:face"], "seconds": 16, "show": false}, "gone": {"after": ["moon_window"], "tells": ["gone:lie", "gone:cry", "gone:papa", "gone:near"], "seconds": 16, "show": false}, "gone_near": {"after": ["gone"], "tells": ["gone_near:quiet"], "seconds": 6, "show": false}, "hat_bed": {"after": [], "tells": ["hat_bed:hat", "hat_bed:papa", "hat_bed:back"], "seconds": 14, "show": false}, "sky": {"after": ["moon_window"], "tells": ["sky:moon", "sky:soon", "sky:wave", "sky:breath"], "seconds": 14, "show": false}, "sky_morning": {"after": [], "tells": ["sky_morning:whisper", "sky_morning:hat"], "seconds": 12, "show": false}, "to_door": {"after": ["moon_window"], "tells": ["to_door:hand"], "seconds": 8, "show": false}, "door_out": {"after": ["to_door"], "tells": ["door_out:gone"], "seconds": 5, "show": false}, "cough": {"after": [], "tells": ["cough:said", "cough:cough"], "seconds": 8, "show": false}, "doctor": {"after": [], "tells": ["doctor:said"], "seconds": 10, "show": false}, "doctor_after": {"after": ["doctor"], "tells": ["doctor_after:chair", "doctor_after:cant", "doctor_after:gone"], "seconds": 12, "show": false}, "palm_night": {"after": [], "tells": ["palm_night:up", "palm_night:palm"], "seconds": 12, "show": false}, "not_today": {"after": ["palm_night"], "tells": ["not_today:whisper", "not_today:out"], "seconds": 7, "show": false}, "thunder": {"after": [], "tells": ["thunder:up", "thunder:asked"], "seconds": 12, "show": false}, "porch_go": {"after": ["thunder"], "tells": ["porch_go:out"], "seconds": 7, "show": false}, "storm_cot": {"after": [], "tells": ["storm_cot:up", "storm_cot:wall"], "seconds": 8, "show": false}, "under": {"after": ["thunder"], "tells": ["under:under"], "seconds": 8, "show": false}, "song": {"after": ["under"], "tells": ["song:sing", "song:asleep", "song:papa", "song:sat"], "seconds": 16, "show": false}, "notyou": {"after": ["thunder"], "tells": ["notyou:clutch"], "seconds": 6, "show": false}, "notyou_after": {"after": ["notyou"], "tells": ["notyou_after:ask", "notyou_after:wall"], "seconds": 10, "show": false}, "sniff": {"after": [], "tells": ["sniff:sniff"], "seconds": 9, "show": false}, "doctor_list": {"after": [], "tells": ["doctor_list:write"], "seconds": 7, "show": false}, "night_window": {"after": [], "tells": ["night_window:tent", "night_window:fog", "night_window:out"], "seconds": 20, "show": false}, "night_face": {"after": ["night_window"], "tells": ["night_face:cat", "night_face:face"], "seconds": 10, "show": false}, "go_out": {"after": ["night_face"], "tells": ["go_out:door", "go_out:gone"], "seconds": 9, "show": false}, "wake": {"after": ["night_face"], "tells": ["wake:woke", "wake:sit", "wake:gone"], "seconds": 12, "show": false}, "shine": {"after": ["wake"], "tells": ["shine:raise"], "seconds": 8, "show": false}, "light_back": {"after": ["shine"], "tells": ["light_back:light", "light_back:near"], "seconds": 14, "show": false}, "back_in": {"after": ["light_back"], "tells": ["back_in:threshold", "back_in:wall"], "seconds": 8, "show": false}, "elbow": {"after": ["back_in"], "tells": ["elbow:sway", "elbow:caught", "elbow:sat", "elbow:sophia"], "seconds": 12, "show": false}, "papa_came": {"after": [], "tells": ["papa_came:said", "papa_came:follows"], "seconds": 8, "show": false}, "lamp_window": {"after": ["night_face"], "tells": ["lamp_window:set"], "seconds": 7, "show": false}, "lamp_higher": {"after": ["lamp_window"], "tells": ["lamp_higher:raise"], "seconds": 6, "show": false}, "chair_dawn": {"after": [], "tells": ["chair_dawn:cover", "chair_dawn:lamp", "chair_dawn:drops"], "seconds": 16, "show": false}, "breakfast": {"after": [], "tells": ["breakfast:lamp", "breakfast:knock"], "seconds": 10, "show": false}, "cot_moved": {"after": [], "tells": ["cot_moved:carry", "cot_moved:set"], "seconds": 12, "show": false}, "evening_wall": {"after": [], "tells": ["evening_wall:said", "evening_wall:wall"], "seconds": 8, "show": false}, "hat_leave": {"after": [], "tells": ["hat_leave:touch"], "seconds": 6, "show": false}},
 "points": ["back_wall#doorway", "glazing#window", "hat#hat", "room#window", "beds#gap", "beds#cover", "pillow#pillow", "door2#handle", "lamp#lamp", "table#cup", "armchair#seat", "tent#tent", "far_lantern#lantern", "sky#moon", "cat#cat", "cat#back", "grandma", "sophia", "papa", "grandma#chest", "sophia#chest", "papa#chest"],
 "offers": ["grandma#chest", "sophia#chest", "papa#chest", "pillow#pillow", "beds#gap", "beds#cover", "door2#handle", "table#cup", "lamp#lamp", "room#window", "hat#hat", "back_wall#doorway"],
 "party": {"dawn": 0, "dusk": 0, "night": 0, "late": 0, "calm": 0, "storm": 0, "flash": 0, "fog": 0, "moon": 1, "hat": "nail", "teabox": false, "drops": "none", "cot": "veranda", "papa_look": false, "secret": false, "cat": false, "take_lantern": true, "sophia_hand": false, "kick": false, "hold_hand": false, "knew": false, "sophia_knows": false, "wall": false},
 "acts": {"flash": {"values": [], "tells": ["flash:strike"]}, "creak": {"values": [], "tells": []}, "tilt": {"values": [], "tells": []}, "cover": {"values": [], "tells": []}, "lamp_up": {"values": [], "tells": []}}}
```
