# The Cape

The island's far end (С4 of the game's scenario): bare granite going down into the open sea, Sophia's tent on the
rocks at the water's edge, the fog coming in from the sea; far up the island, over the rock, the house with
Grandmother's window. Its sea, sky, granite, pines, mist, fog and the hour and the weather are the island's
(`modules/isle.md`); the generator is `tools/cape.py` (`python -B tools/cape.py <world>` writes `scene.json`,
`elements/sky.*`, `elements/sea.*`). The approved look (stage 2) is `dusk: 1` (the August evening) and `night: 1` (the
moonlit night) with `fog: 0.5`, Grandmother and Sophia at their first places — on the island it looks as it did.

- **The land** is `lib.ground` (relief.js): `coast(z)` the line of the rock, `shore(z)` where the sea meets it, `edge`
  the waterline. `rock` paints the granite (the island's) and the cape's own moss and grass inland (burnt in August:
  `late`). `path` — the wet stones coming down from the island (`path#stone1` the highest, `#stone2`, `#stone3`);
  `seat` — low stones to sit on: `seat:0` halfway down the path (by `stone2`), `seat:1` behind the tent by its far
  corner (the tent's back stands at the water's edge), `seat:2` by the last stone, `seat:3` by the first (behind it,
  for the dark minigame's `rest`).
- **The tent** is cards and planes on the unseen anchor `tent` (facing 215; `lib.onTent(across, distance)` — a point of
  its frame in the world's): `tent_front`, `tent_back`, the two roof slopes, `tent_floor` (Sophia's blanket), the
  candle `lantern` at its back, `peg` (the front guy rope and its peg), `stones_side`/`stones_front` (the stones round
  its edges, `stones`). Its states (`tent`, between steps or once in a piece — each painting reads it): `parcel` (the
  roll on the rock, as Eriksson brought it: `parcel`), `pole` (the pole stood up, the canvas slack: `pole`, swaying),
  `up`. `lean` 0…1 leans the whole tent back up to 9° (the anchor's tilt, `tent_tilt`: the engine moves it). The door
  (`flap`) is `open` (thrown back, the flaps tied, stirring in the wind) or `shut` (laced): the canvas is translucent,
  the candle (`candle`) makes it glow, and Sophia sitting inside (`sophia_at: inside`) between the candle and the shut
  door is a sharp shadow on it (her element's `shadow` names the light `candle` and the canvas: check 2 of the plan).
- **The crevice** `ledge`: a low granite face at the water behind the tent, a dark cleft and a ledge in it, facing the
  sea — seen from the sea only (from the land the tent stands before it); the shawl on the ledge by `shawl: ledge`.
- **Far off**: `far_house` (painted flat) and `far_window` (glows: its pane lit by `window`), the pines round it; the
  fog's wall on the horizon (`fog_wall`), its banks over the water (`fog_far`: as approved), and over a half the cape in
  the fog (`fog_near`, the island's thick-fog look). In the thick fog the candle's light is held to 0.4 (the scene's own
  look over the island's `fog_air`): its glow in the white air would wash out whoever sits by the tent.
- **The light**: the island's by the hour — `dusk` the August evening (the afterglow low on the left), `night` the
  moonlit night (the moon behind the viewer over the island, so the faces turned to us are lit), `dawn` the last
  morning, the day (June, or August with `late`). `candle` — the lantern's light, `window` — Grandmother's lamp.
- **People** (the world's `cast`): `<id>_at` names where each is (`lib.PLACES`, put by the island's `places`; sitting
  ones — `do`, `on` — by the script): Grandmother — stand (first), pole (holding the pole as it goes up), stone1…3 (on
  the path's stones), half (sitting on the stone halfway), door (at the tent's door), behind (sitting behind the tent,
  her palm on its back: `tent_back#palm`); Sophia — tent (first), tie (by the peg), door (at the thrown-back flap),
  inside (sitting in the tent, the knees hugged), path (coming up to meet her); Papa — by (beside the tent), peg (at
  the peg, the last morning), path (on the highest stone). Papa is not here in the empty play.
- **The cat** (the world's `cat`): `cat_at` (tent · door · rock: `lib.CAT`), `cat_pose` (sit · lie · walk · none — not
  here, the empty play). Walking, a new `cat_at` sends him there at his pace (`cat:arrived` told).
- **The knock minigame's close-up** (the world's `closeups`, `modules/closeups.md`): the insert `palm` (`palm_open`;
  `palm_near` 0…1 — the palm's nearness to the canvas, 0.6 at rest, 1 touching; the point `palm#palm`), painted once
  by the module (`elements/palm.js`), its animate the module's `live`.
- **The dark minigame's `rest`** (during `fog_way`, the script): true — Grandmother sits down where she stands, on the
  low stone by it (`stone1` → `seat:3`, `stone2` → `seat:0`, `stone3` → `seat:2`: a few steps, `sit_down`, `sit_stone`);
  false — she gets up (`rise_slow`) and is back on the stone, facing on down the path. A newer `rest` or `step` takes
  over whatever of it is still going.
- **The camera** (`from`, a cut): `land` — the scene's own; `sea` — out on the water to the right looking back at the
  cape (the tent's back, the crevice, the ledge); `side` — up the path on the left, across the tent to the sea (whoever
  sits behind it).
- The showcase (`showcase.js`): the tent going up, the evening turning to night, the glow, the shadow on the shut door,
  Sophia at the door with the cat, Grandmother on the stones in the fog, Grandmother behind the tent, the last morning,
  the cape from the sea.

## What changed for the game (stage 3 used `night`, `fog`, `candle`, `window`)

- `night: 0` is now the day, not the August evening: the evening is `dusk: 1` (and `late: 1` for August). The game's
  `DUSK` keys (`chapters/4.js`) want `dusk: 1, late: 1`; the epilogue's last morning `dawn: 1, late: 1`.
- `fog` is the island's: up to a half its banks over the water (0.5 — as approved), over a half the cape in white air.
- The empty play is a June day (the island's), the tent up, the candle and the window out; Papa and the cat not here.
- New: `tent`, `lean`, `flap`, `shawl`, `stones`, `from`, the places, the cat. The points `tent_front#door`,
  `far_window#window` stay; `lantern` is now `lantern` at the tent's back.

## Pieces (stage 5)

The pieces of the game's steps (plan.md «Куски сцен по шагам», scenario.md 4.2–4.5 and §10, contracts-review.md of
«Папа и море»), played by the module `beats`: the key `beat`, `beat:<name>` told at its end, `beat_next`. Each: what
it shows, the keys it begins with or sets, where it ends — in the pose of what comes next (a choice, a minigame, the
next piece); its moments are told as `<piece>:<moment>` — the game speaks its lines and shows its plates there. All
are the game's (`show` false); the showcase plays a selection.

The rules every piece keeps (review-stage5.md of «Папа и море»):

- **People and the camera are the piece's** (its `from`: places, `tent`, `flap`, `candle`, `window`, the cat, the
  view); the game sets only the play's keys (`party` below). A piece with `after` begins exactly where the one before
  ended: its `from` is that end, so it plays the same opening a step (after a cut) or following that piece; it
  re-places nobody. Where it needs another frame it makes a ready cut in its `run` that sets the whole camera (a view
  of lib.VIEWS — all five keys — or a target and shot with `camera_x/z/h/yaw/look` back to 0): no offset of a manual
  shot is left for the next piece. `from` (the key) stays for the stills; the pieces set the views themselves.
- **Nobody slides**: every move is a walk at the person's pace (Grandmother `old_walk`, slow; Sophia `walk`/`run`;
  Papa `walk`) down and up the path's stones; the minigames' `step` walks too (the scene's walk, `step:stone<n>` told
  on arrival); the cat walks by `cat_at` (`cat:arrived`). Only a piece's `from` puts people, before its first frame.
- **Poses before a choice or a minigame**: the camera stands; the point and the faces in the middle 4:3 of the frame,
  the top ~12 % free (the minigame's hint), nothing that matters in the bottom 20 % (the subtitles). Night is bright:
  the moon behind the viewer on the faces, the fog white and lit, the lantern a warm circle.
- Mute before a moment of the game: not longer than ~8–10 s.

**The August evening (4.2–4.3)** — `dusk` 1, `late` 1 (the play's).

- `pitch` (4.2, ≈ 10 s). The cape at the evening; the parcel on the rock; Sophia kneels, unrolls it and stands the pole up (`tent` parcel → pole); Grandmother comes from `stand` and takes the pole in both hands (`pole`, `pole#grip`); Sophia goes to the peg and kneels to tie the ropes (`tie`). Keys: tent parcel → pole. From: Grandmother `stand`, Sophia by the parcel, Papa and the cat not here. Ends: the pole minigame's pose — `pole#grip` and both faces in the middle 4:3. Moments: `pitch:cape` — the tent going up (the game: «The cape. Sophia puts up her tent…»); `pitch:pole` — Grandmother holds the pole.
- `law` (4.2, ≈ 16 s). After `pitch` (the act `tent` → up, `lean` as the pole left it). Grandmother lets go and steps back to `stand`; Sophia to the tent (`tent`); Papa comes down the stones (a ready cut: the tent up, he already on the highest stone, `path`) with the lantern with its candle (the cast's part), stoops and sets it in the tent at its back (`candle` 0 → 1: the canvas glows) — the law said as it is lit —, stands by the tent (`by`); the camera lifts to the house's window over the rock (`far_window#window`); Papa goes over to his mother (`mother`). Keys: papa_here → true, candle 0 → 1. Ends: Papa beside Grandmother, both by the tent, Sophia at it. Moments: `law:lantern` — he brings the lantern (the game's plate); `law:law` — by the tent («Candle for two hours… That's the law» — «I know»); `law:window` — the window (the game's plate); `law:yours` — by his mother («The window is yours» — «Mine»).
- `up_path` (4.2, ≈ 6 s). After `law`, `cat_comes`. Papa goes up the stones and out of sight. Keys: papa_here → false at the end. Ends: Grandmother and Sophia by the glowing tent. Moments: `up_path:gone` — Papa gone.
- `doctor` (4.2 «stayed», ≈ 12 s). After `law`, `cat_comes`. Papa, by her, not looking at her — the path before him (his words on the way back: he has turned to go); then he goes up the stones and out of sight (at home he writes it in the list: the house's `doctor_list`, after a cut through black). Ends: as `up_path`. Moments: `doctor:say` — not looking at her («Mamma, I'll write to the doctor» — «In autumn. In town»); `doctor:gone` — he goes in silence.
- `cat_comes` (4.2 «gift», ≈ 12 s). After `law`: Papa is still here (by his mother). The cat comes over the rocks (`off` → `tent`, walking) and sits by the tent; Sophia crouches and strokes him (`pet`, `sophia_reach` `cat#back`); he gets up and goes off over the rocks (→ `off`, then `none`). Ends: Sophia crouched by the tent, the cat gone, Papa and Grandmother by the tent. Moments: `cat_comes:sit` — he sits, she strokes (the game's plate); `cat_comes:gone` — off to catch birds.
- `goodnight` (4.3, ≈ 6 s). After `up_path`; after `doctor` it opens again after the house's `doctor_list` (a cut through black), with its own `from`. The dusk deeper, the tent glowing; Sophia sits at its open door hugging her knees (`door`), Grandmother stands before her (`door`); the camera low on both faces. Ends: the choice `night` — `sophia#chest` and both faces in the middle 4:3. Moments: `goodnight:door` — at the door.
- `sleeve` (4.3 «call», ≈ 9 s). After `goodnight`. Grandmother turns to go; Sophia catches her by the sleeve (`sophia_reach`); then lets go. Ends: Grandmother turned to the path, Sophia at the door. Moments: `sleeve:turn` — she turns; `sleeve:catch` — the sleeve («And you'll really hear?» — «Really»).
- `leave` (4.3 «call», «knock», ≈ 8 s). After `goodnight`, `sleeve`. Grandmother goes up the stones and out of sight in the dusk; Sophia at the door watches her go. Ends: Sophia alone at the glowing tent. Moments: `leave:gone` — Grandmother gone.
- `no_wave` (4.3 «scared», ≈ 10 s). After `goodnight`. Grandmother goes up the stones; Sophia does not watch her go; at `stone2` Grandmother looks back — a ready cut over her shoulder down to the tent: Sophia at the door hugging her knees, not waving. Ends: that frame (the camera's own cut, all keys set). Moments: `no_wave:back` — she looks back (the game's plate).

**The fog's night (4.4–4.5)** — `night` 1, `late` 1; the fog the island's (0.8 — the cape white and lit).

- `candle_out` (the showcase's only — `show`: in the game the house's window shows the candle going out, `night_window`, `tent_light`; ≈ 12 s). The moonlit night; the tent glowing on the cape, its door laced (`flap` shut), Sophia's shadow on the canvas (`inside`); the fog comes in from the sea over the cape (`fog` 0.3 → 0.8); the candle's light blurs, gutters and goes out (`candle` 1 → 0); the canvas grey under the moon. Keys: candle 1 → 0, fog → 0.8. From: Sophia `inside`, nobody else. Ends: the dark tent in the white. Moments: `candle_out:glow` — the tent and her shadow (the game: «On the cape the tent glows»); `candle_out:fog` — the fog over the cape; `candle_out:out` — the light out (the game: «…and goes out»).
- `fog_way` (4.5 «go», «behind», ≈ 7 s). The white, lit fog; the tent below a grey shape (`flap` shut, `candle` 0, Sophia `inside`); Grandmother comes down from the island out of the white to the first stone — with `lamp_hand` the lantern before her (the cast's part; its light a warm circle on her and the stones), without it in her shawl, slower. Keys: lamp_hand (the play's). Ends: the stones minigame's pose — Grandmother at `path#stone1` (`stone1`), the stones ahead (`path#stone2`, `#stone3`) and her face in the middle 4:3. Moments: `fog_way:stone` — at the first stone.
- `knock_in` (4.5 «go», strength ≥ 2, ≈ 10 s). After `fog_way` (the act `step` has walked her to `stone3`). She goes on to the tent's door (`door`) — with `knocks` she knocks three times on the canvas by it (her knuckles at `tent_front#door`), without it she stoops to the door; Sophia throws back the flap (`flap` → open) and is at the door, her face up. Keys: knocks (the play's); flap shut → open. Ends: the two at the open door. Moments: `knock_in:knock` — the knock, or the stoop (the game: three knocks, or «It's me»); `knock_in:open` — Sophia («I knew!»).
- `in_tent` (4.5 «go», ≈ 16 s). After `knock_in`. Grandmother stoops in and sits inside beside her (`inside`, her knees under Sophia's blanket); Sophia lies down clutching her hand; she does not take it away and does not sleep; the night goes toward dawn (`night` 1 → 0.4, `dawn` 0 → 0.6, `fog` 0.8 → 0.5). The camera through the open door, both faces. Ends: the first light, Grandmother sitting, Sophia asleep holding her hand. Moments: `in_tent:hand` — the hand («Don't hang on me»); `in_tent:dawn` — the night going (the game's plate).
- `fetch` (4.5 «go», ≈ 20 s). After `in_tent`. Grandmother tries to get up and cannot; Sophia wakes and runs up the stones for Papa (`run`), out of sight; the fog thinning; Papa comes down with Sophia, helps his mother out of the tent and leads her up the stones by the arm (`lead_arm`); she does not argue. Keys: papa_here → true. Ends: the two going up the stones, Sophia behind, the tent empty, its door open. Moments: `fetch:cant` — she cannot get up; `fetch:run` — Sophia gone; `fetch:papa` — Papa by her (with «Papa knows» the game's «Mamma»); `fetch:home` — he leads her.
- `sit_half` (4.5 «go», strength ≤ 1, ≈ 8 s). After `fog_way` (the act `step` has walked her to `stone2`). Hurrying on the wet stones, everything spins: she sways and sits down on the halfway stone beside it (`half`, `sit_stone`), the lantern in her lap. Ends: Grandmother sitting on the stone, the tent below in the white. Moments: `sit_half:spin` — the spin; `sit_half:shout` — sitting («Stay there! I'm here!»).
- `found` (4.5 «go», strength ≤ 1, ≈ 12 s). After `sit_half`. Sophia throws back the flap and comes out into the white wrapped in her blanket — the first time she breaks the law — up the stones to the voice, and finds her (`half`). Keys: flap shut → open. Ends: Sophia standing by her, both faces close. Moments: `found:out` — she comes out (the game's plate); `found:found` — by her (with «knock» the game's «You didn't knock, you shouted!»).
- `turn_home` (4.5 «go», strength ≤ 1, «Sophia knows», ≈ 10 s). After `found`. Sophia turns at once to the house, a step up into the white; Grandmother catches her by the hand (both `_reach`); Sophia stands, then sits down beside her on the rock. Ends: the two sitting, hand in hand. Moments: `turn_home:turn` — she turns («You said — run for Papa!»); `turn_home:caught` — the hand («Not today. Sit with me»); `turn_home:sat` — she sits.
- `till_dawn` (4.5 «go», strength ≤ 1, ≈ 14 s). After `found`, `turn_home`. Sophia sits beside her and puts her blanket round them both (the blanket on both: `drape`, the cast's part on each); she holds her hand and talks, talks; the night goes toward dawn (`night` 1 → 0.4, `dawn` 0 → 0.6, `fog` 0.8 → 0.5). Ends: the first light, the two under the blanket, hand in hand. Moments: `till_dawn:talk` — she talks (the game's plate); `till_dawn:dawn` — the first light.
- `papa_finds` (4.5 «go», strength ≤ 1, ≈ 16 s). After `till_dawn`. Papa comes fast down the stones out of the thinning white, finds them, lifts his mother up by the arm and leads her up, stopping twice in the frame (every ten steps); Sophia after them with the blanket. Keys: papa_here → true. Ends: the three going up into the white. Moments: `papa_finds:come` — Papa out of the white; `papa_finds:found` — by them (with «Papa knows» the game's «Mamma»); `papa_finds:home` — he leads her.
- `flap_moon` (4.5 «lamp», a cut from the house's window, ≈ 14 s). Under the moon in the light fog (`fog` 0.5) Sophia sits at the thrown-back flap (`door`, `flap` open, `candle` 0), hugging her knees, and looks up at the blurred patch of the window far up (`window` 1, `far_window#window`) — seen over her shoulder (her face and the far window cannot be in one frame: she faces it); then a ready cut to her face close. Then by `sophia_night`: `cry` — she cries, then goes quiet; `whisper` — she whispers, and lies down inside the door (`lie`); `huddle` — nothing, she sits on, huddled. Keys: sophia_night (the play's). Ends: Sophia lying at the door, or sitting huddled. Moments: `flap_moon:window` — she looks at the window (the game's plate); `flap_moon:night` — the cry or the whisper (the game: «Mama, can you see?», …); `flap_moon:down` — lying down, gone quiet, or still huddled.
- `cat_fog` (4.5 «lamp», «behind», «gift», ≈ 8 s). After `flap_moon`, `behind_sit`. Out of the fog the wet cat comes from behind the tent's back (`fog` → round its side → `door`, walking) and lies down at the tent's door (`lie`) — at Sophia's feet, or past Grandmother behind the tent. The camera as it is. Ends: the cat lying at the door. Moments: `cat_fog:lie` — he lies down (the game's plate).
- `out_of_white` (4.5 «lamp», the morning, ≈ 10 s). The cape at dawn in the thinning white (`dawn` 1, `fog` 0.6 → 0.4); Papa comes down the stones; out of the white Sophia comes up to meet him, wet, by herself (from `door` up to `up`), and goes on past him up the path; he looks at the empty tent. Keys: fog 0.6 → 0.4; papa_here true. Ends: Sophia going up past Papa, the tent behind. Moments: `out_of_white:thin` — the fog thinning, Papa coming down (the game's plate «The fog thins, and Papa goes to the cape at once»); `out_of_white:meet` — the two meet (the game: «…out of the white Sophia comes to meet him, wet, by herself»).
- `behind_sit` (4.5 «behind», ≈ 12 s). After `fog_way` (the act `step` has walked her to `stone3`). At the last stone she stops to get her breath — with `weak` she sits down on the low stone by it a few seconds (`rest`, `seat:2`) — then goes round the tent slowly to its back and sits on the wet stone there (`behind`, `seat:1`), in her shawl; a ready cut from beyond the tent's back over the water (her face this way: she sits facing along the canvas). Keys: weak (the play's). Ends: Grandmother on the stone behind the tent, her face in the moonlight, the canvas by her. Sophia inside sits hugging her knees (`inside`; the candle is out — no shadow on the canvas). Moments: `behind_sit:rest` — at the last stone (the game's «…twice she sits down to get her breath»; the first rest is the minigame's, at `stone2`); `behind_sit:sat` — sitting behind it (the game's plate); `behind_sit:quiet` — told always: Sophia inside, quiet (with «called» the game's «By the time she came Sophia had gone quiet…»).
- `alone_talk` (4.5 «behind», ≈ 12 s). After `behind_sit`, `cat_fog`. Sophia inside (`inside`, the candle out: her voice through the canvas) talks aloud to herself; the camera close on Grandmother listening, the canvas by her face; at the end her palm comes up near the canvas. Ends: the knock minigame's pose — her palm at `tent_back#palm`, her face, in the middle 4:3 (the minigame opens the insert of the palm at the canvas). Moments: `alone_talk:talk` — Sophia talking (the game's plate); `alone_talk:mama` — told always (the game's «Mama, I'm alone. Hardly frightened at all» unless «moon»); `alone_talk:three` — midnight, told always (with «knock» the game's «Well… three times…»).
- `before_dawn` (4.5 «behind», ≈ 14 s). After `alone_talk`. Toward dawn she gets up slowly holding the rock (`rise_slow`); the shawl slips off her shoulders behind the tent into the crevice and stays on the ledge above the water (`shawl` none → ledge; the cast's shawl off her) — she does not bend for it; she goes up the stones holding them, slowly, into the white (`night` 1 → 0.6, `dawn` 0 → 0.4). Keys: shawl none → ledge. Ends: the stone behind the tent empty in the greying fog (then the game's shore, the porch). Moments: `before_dawn:up` — she gets up; `before_dawn:shawl` — the shawl gone down; `before_dawn:gone` — she is gone.

**The last morning (the epilogue)** — `dawn` 1, `late` 1, `fog` 0.6 (the play's).

- `peg` («The Tent», ≈ 12 s). The tent grey on the cape (crooked by `lean`), its door open; Papa at the peg (`peg`, `peg#peg`), Sophia by the tent (`tent`), Grandmother at the door (`door`). Papa takes hold of the peg; Sophia; Grandmother lays her palm on the canvas (`tent_front#door`). Ends: Papa's hand on the peg, Grandmother's palm on the canvas. Moments: `peg:peg` — the peg («The winter will carry it off»); `peg:mine` — Sophia («It won't. It's mine»); `peg:palm` — the palm on the canvas (the game's plate).
- `weigh` («The Tent», ≈ 14 s). After `peg`. He stands a long time, lets go of the peg, crouches and lays stones along the tent's edges (`stones` false → true when they are laid); he straightens up by the tent. Keys: stones false → true. Ends: the three by the weighted tent (then the game's cut to the shore). Moments: `weigh:let` — he lets go; `weigh:stones` — the stones laid; `weigh:winter` — standing («You'll winter with us…»).
- `tent_shot` («The Tent», the last frame, ≈ 9 s). From the sea (lib.VIEWS `sea`): the tent on the cape, grey, its door's flaps beating in the wind; the fog closes over it (`fog` → 0.85). Keys: stones true, lean (the play's), nobody here. Ends: the tent nearly gone in the white. Moments: `tent_shot:flap` — the flapping tent; `tent_shot:white` — the fog closes.
- `shawl_shot` («The Shawl on the Stone», the last frame, ≈ 9 s). From the sea, nearer than `sea`: the crevice by the cape, a grey patch on the ledge above the water; the fog closes (`fog` → 0.85). Keys: shawl ledge (the play's), nobody here. Ends: the grey patch in the white. Moments: `shawl_shot:patch` — the patch; `shawl_shot:white` — the fog closes.

Places (`<id>_at`, lib.PLACES; the pieces'): Grandmother `stand`, `top` (up the path behind the big boulder, out of
sight — where everyone comes from and goes to), `pole`, `stone1…3`, `rest` (sitting on the low stone by `stone3`,
`seat:2`), `half` (sitting on the halfway stone, `seat:0`, beside `stone2`), `door`, `inside` (in the tent beside
Sophia, her knees under the blanket — sitting on the floor's edge as on a low seat, 0.22 m: not on the ground, the
long skirt, cast.md), `behind` (sitting on `seat:1`); Sophia `parcel` (kneeling by it), `tent`, `tie`,
`pet` (crouched by the cat), `door` (sitting at the door, `hug_knees`), `lie` (lying inside the door), `inside`, `path`,
`by_half` (standing by Grandmother on the halfway stone), `half` (sitting on the rock beside her), `top`; Papa `top`,
`path`, `by`, `lamp` (stooping at the door to set the lantern in), `mother` (beside Grandmother's `stand`), `peg`
(crouched, his hand on it), `half` (at her arm on the halfway stone), `door` (at her arm at the tent's door). The cat
(`cat_at`): `tent`, `door`, `rock`, `off` (over the rocks behind the juniper, out of sight), `fog` (behind the tent's
back in the white). Eriksson is not on the cape: the scenario has him only on the shore.

**Who is here.** Papa is the pieces' (`papa_here`: they bring him and send him away); Grandmother and Sophia are the
game's (`grandma_here`, `sophia_here`): `candle_out`, `flap_moon`, `cat_fog` (in «lamp»), `out_of_white` show no
Grandmother, `tent_shot` and `shawl_shot` nobody. A piece puts whom it does not show at `top` (out of sight).

## The code

- `lib.js`: `FILM` — the pieces (the module `beats`, copied unchanged from «Папа и море»'s `modules/beats*`, pm/all);
  `SHOTS` — each piece's frames, set by hand with `aim(eye, point, fx, fy)`: the eye where it stands, the point put at
  [fx, fy] of the 16:9 frame (turned, the lens shifted — `camera_look` —, every camera key set: a ready cut or a glide
  leaves no offset behind); `goTo` — someone walks to a place at their gait and is there as it says (sitting down on
  its seat, the place's keys set as they arrive); `goUp` — up the path behind the boulder, gone; `catTo` — the cat
  walks; `SHOWFILM` — the pieces with the play's keys the showcase gives them (`SHOW`).
- `script.js`: the places, the cat, `lean` → the tent's tilt, Grandmother's lantern light (`lamp_lit` from
  `grandma_with` and `lantern_dip`: the light `hand_lamp` at the lantern's flame, `grandma#flame`), the minigames'
  `step` (during `fog_way` she walks to that stone at her pace, `step:stone<n>` told on arrival) and `rest` (above),
  `from` for stills, `beats.play`.
- What changes inside a piece is painted once: the parcel, the pole, the shawl on the ledge and the stones round the
  tent are layers their animates show (`tent`, `shawl`, `stones` / `stones_laid` — laid one by one); the standing
  tent (`tent` up) and its door (`flap`) change on ready cuts (`law` opens on the tent standing; `knock_in` and `found`
  cut to the open flap) — the shut door must stay a painting facing its way for Sophia's sharp shadow on it.

## Open for the game (stage 5)

- The pole minigame (М9): `tent` pole → up (the act), `lean` 0…1 (flawed: the tent crooked, «So it should be»); its
  point `pole#grip`. `law` opens on a ready cut to the tent standing whether or not the act raised it. `lean` is the
  play's from then on (4.3, the night, the last morning).
- The fog and dark minigames (М10а, one factory with the forest's stones): `step` 1…3 walks Grandmother to that stone
  (`step:stone1…3` on arrival; the walk is the scene's, only during `fog_way`); flawed — `lantern_dip` (0…1: the
  lantern's light guttering). For «go» at strength ≤ 1 the walk ends at `stone2` (`sit_half` follows); otherwise at
  `stone3`.
- The fog and dark minigames: `balance` −1…1 (smooth) — her tipping on the wet stones as the minigame's arrow (−1 to
  her left … 1 to her right): past 0.15 she puts a hand out that way for balance, further the more she tips (her
  `_reach`, the script's, during `fog_way`, not while she sits). The engine has no lean of a person's body: the hand
  out is how it shows.
- The dark minigame (М10а without the lantern): `rest` (true · false, above) — sat down after a slip, and at `stone2`
  to get her breath when weak.
- The knock minigame (М10г): the insert `palm` (`palm_open`, `palm_near`; the point `palm#palm`, above); `alone_talk`
  ends in its pose at `tent_back#palm` and opens nothing.
- **From package Л** (`modules/cast.md`, in: the names below are the cast's now — `stoop` and `set_down` are its
  `put_down`, `lay_stones` its `crouch` (a loop), Grandmother in the tent `sit_stone` on a low seat, not `sit_ground`;
  the motions still «to make» stand in — the people stand, the render warns). Asked for:
  Grandmother — the gait `old_walk` (always hers), `hold_pole` (loop, both hands on the pole), `sit_down` (onto a low
  stone, once), `sit_stone` (have), `sit_ground` (in the tent), `rise_slow`, `try_rise` (tries to get up, sinks back),
  `catch_breath` (standing, once), `sway` (dizzy, once), `knock` (three knocks on the canvas, once), `stoop` (once),
  `hands_behind` (have); the garment `long_dress` (her dress without the shawl: `grandma_wear: {garment: 'long_dress'}` as it
  slips off); Sophia — `kneel` (loop), `get_up` (from sitting, kneeling, crouching, lying), `tie` (kneeling at the peg,
  loop), `crouch`, `pet` (stroking the sitting cat, loop), `sit_down` (onto the ground, once), `hug_knees` (have),
  `lie_down` (once), `lie_side` (loop), `cry`, `whisper`, `talk_sitting` (loops), `drape` (the blanket round them both,
  once), the gait `run`; Papa — `set_down` (stooping, once), `crouch`, `lay_stones` (loop), the gaits `walk_fast` and
  `lead_walk` (slowed to his mother's pace, she on his arm: both `_reach` hand to hand). Parts: `lantern` (the candle
  lantern — Papa's in `law`, Grandmother's in the fog), `blanket` (Sophia wrapped in it), `blanket_round` (on each of
  the two sitting under it).
- Faces: the game's (`<id>_mood`).
## Contract for the check

```json
{"beats": {"pitch": {"after": [], "tells": ["pitch:cape", "pitch:pole"], "seconds": 10, "show": false}, "law": {"after": ["pitch"], "tells": ["law:lantern", "law:law", "law:window", "law:yours"], "seconds": 16, "show": false}, "up_path": {"after": ["law", "cat_comes"], "tells": ["up_path:gone"], "seconds": 6, "show": false}, "doctor": {"after": ["law", "cat_comes"], "tells": ["doctor:say", "doctor:gone"], "seconds": 12, "show": false}, "cat_comes": {"after": ["law"], "tells": ["cat_comes:sit", "cat_comes:gone"], "seconds": 12, "show": false}, "goodnight": {"after": ["up_path"], "tells": ["goodnight:door"], "seconds": 6, "show": false}, "sleeve": {"after": ["goodnight"], "tells": ["sleeve:turn", "sleeve:catch"], "seconds": 9, "show": false}, "leave": {"after": ["goodnight", "sleeve"], "tells": ["leave:gone"], "seconds": 8, "show": false}, "no_wave": {"after": ["goodnight"], "tells": ["no_wave:back"], "seconds": 10, "show": false}, "candle_out": {"after": [], "tells": ["candle_out:glow", "candle_out:fog", "candle_out:out"], "seconds": 12, "show": true}, "fog_way": {"after": [], "tells": ["fog_way:stone"], "seconds": 7, "show": false}, "knock_in": {"after": ["fog_way"], "tells": ["knock_in:knock", "knock_in:open"], "seconds": 10, "show": false}, "in_tent": {"after": ["knock_in"], "tells": ["in_tent:hand", "in_tent:dawn"], "seconds": 16, "show": false}, "fetch": {"after": ["in_tent"], "tells": ["fetch:cant", "fetch:run", "fetch:papa", "fetch:home"], "seconds": 20, "show": false}, "sit_half": {"after": ["fog_way"], "tells": ["sit_half:spin", "sit_half:shout"], "seconds": 8, "show": false}, "found": {"after": ["sit_half"], "tells": ["found:out", "found:found"], "seconds": 12, "show": false}, "turn_home": {"after": ["found"], "tells": ["turn_home:turn", "turn_home:caught", "turn_home:sat"], "seconds": 10, "show": false}, "till_dawn": {"after": ["found", "turn_home"], "tells": ["till_dawn:talk", "till_dawn:dawn"], "seconds": 14, "show": false}, "papa_finds": {"after": ["till_dawn"], "tells": ["papa_finds:come", "papa_finds:found", "papa_finds:home"], "seconds": 16, "show": false}, "flap_moon": {"after": [], "tells": ["flap_moon:window", "flap_moon:night", "flap_moon:down"], "seconds": 14, "show": false}, "cat_fog": {"after": ["flap_moon", "behind_sit"], "tells": ["cat_fog:lie"], "seconds": 8, "show": false}, "out_of_white": {"after": [], "tells": ["out_of_white:thin", "out_of_white:meet"], "seconds": 10, "show": false}, "behind_sit": {"after": ["fog_way"], "tells": ["behind_sit:rest", "behind_sit:sat", "behind_sit:quiet"], "seconds": 12, "show": false}, "alone_talk": {"after": ["behind_sit", "cat_fog"], "tells": ["alone_talk:talk", "alone_talk:mama", "alone_talk:three"], "seconds": 12, "show": false}, "before_dawn": {"after": ["alone_talk"], "tells": ["before_dawn:up", "before_dawn:shawl", "before_dawn:gone"], "seconds": 14, "show": false}, "peg": {"after": [], "tells": ["peg:peg", "peg:mine", "peg:palm"], "seconds": 12, "show": false}, "weigh": {"after": ["peg"], "tells": ["weigh:let", "weigh:stones", "weigh:winter"], "seconds": 14, "show": false}, "tent_shot": {"after": [], "tells": ["tent_shot:flap", "tent_shot:white"], "seconds": 9, "show": false}, "shawl_shot": {"after": [], "tells": ["shawl_shot:patch", "shawl_shot:white"], "seconds": 9, "show": false}},
 "points": ["tent_front#door", "tent_back#palm", "path#stone1", "path#stone2", "path#stone3", "peg#peg", "ledge#shawl", "pole#grip", "pole#top", "parcel#parcel", "seat:0#seat", "seat:1#seat", "lantern", "far_window#window", "cat#cat", "cat#back", "sky#sun", "sky#sun_late", "sky#sun_dawn", "grandma#chest", "sophia#chest", "papa#chest", "palm#palm"],
 "offers": ["tent_front#door", "tent_back#palm", "path#stone1", "path#stone2", "path#stone3", "peg#peg", "ledge#shawl", "pole#grip", "parcel#parcel", "cat#back", "far_window#window", "grandma#chest", "sophia#chest", "papa#chest", "palm#palm"],
 "party": {"dawn": 0, "dusk": 0, "night": 0, "late": 0, "calm": 0, "storm": 0, "flash": 0, "fog": 0, "moon": 1, "lean": 0, "shawl": "none", "stones": false, "knocks": false, "lamp_hand": true, "weak": false, "sophia_night": "whisper", "grandma_here": true, "sophia_here": true, "papa_here": false},
 "acts": {"flash": {"values": [], "tells": ["flash:strike"]}, "cat_at": {"values": [], "tells": ["cat:arrived"]}, "tent": {"values": ["pole", "up"], "tells": []}, "lean": {"values": [], "tells": []}, "step": {"values": [], "tells": ["step:stone1", "step:stone2", "step:stone3"]}, "lantern_dip": {"values": [], "tells": []}, "palm_open": {"values": [], "tells": []}, "palm_near": {"values": [], "tells": []}, "rest": {"values": [false, true], "tells": []}, "balance": {"values": [], "tells": []}}}
```

Against the plan's names: `ledge#shawl` is the crevice's (its element is `ledge`); `flap` is `open` · `shut` (a door
laced or not is a painting's state, read between steps — a smooth key would repaint it); the seats are `seat:0`
(halfway) and `seat:1` (behind the tent).
