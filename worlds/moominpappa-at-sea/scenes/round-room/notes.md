# The Round Room (С4 of the game «Папа и море»)

The room at the lighthouse's foot, from the first afternoon (1.5) to the last morning: the table with the storm
lantern, the stool, the stove, the stair up to the hatch, the window on the sea, the door out to the steps, the
keeper's wall with his pencil lines and Moominpappa's log, Moominmamma's garden growing on the wall and the sill.
Stage 4 (all the states, people stand and breathe): every state is a key of the play; no motions, beats or showcase yet.

## How it is made

- The room is a circle (`lib.js`: `C`, `R`, `H`; `at(angle, r)` — an angle is a bearing from `C`). Its wall is bent
  sheets of that circle (forms, `kit.bend`): `wall_a` from −150° round to the window, `wall_b` the pier between the
  window and the door, `wall_c` from the door to 150°, `win_low`/`win_top` the window's column. The near part of the
  circle is not built: the room is seen from its open side (`camera` picture).
- The window (`WIN`, at 24°): its cheeks (`reveal`), the deep sill (a plane), the casement; outside it the shutters
  (`shutters`, a card that paints only when shut; shadows the moon).
- The door (`DOOR`, at 44°) is the lighthouse's own (`modules/island` `DOOR`: its arch as wide, as high over its sill):
  its casing (`door`: points `door#door`, `door#threshold`), the leaf (`door_leaf`: `island.door`, one drawing on both sides, hinged at its left as seen from
  the room, turned by `door_f`), the reveal through the wall (`door_reveal`, one `kit.extrude` form: up a jamb, round
  the arch, down the other), the wall about the arch (`door_top`, a flat sheet with the arch cut out), the threshold,
  and outside the top step (`porch`) and the knoll's granite.
- Outside (the window, the door): the island's sky and sea (`modules/island`, `tools/island.py`), the knoll's granite
  (`granite`) and the Fisherman's cape far off in the window (`cape`) — draped over the relief (`relief.js`, `lib.land`:
  0 inside the tower, the knoll falling to the sea at −5, the cape's ridge). The floor is 1 cm over the land (the
  granite plane runs under it).
- `wall_a`, left to right: the keeper's lines under the stair's top (points `wall_a#keeper`, `wall_a#nobody`),
  Moominpappa's log across "Nobody again" (`wall_a#log`), low on the dado the oldest lines under dust with the 27th of
  August's (`wall_a#line27`) and the next under it; then the garden (`wall_a#garden`, `wall_a#apple`, `wall_a#gate`)
  under the shelf. Moominmamma herself in the garden is a small sheet of its own (`wall_mama`: her figure a layer as
  present as `wall_mama`; the pressed grass).
- The storm lantern (`lantern`): its place by `lantern_at` (the script sets `lantern_a/d/e`: the table, the stair's
  middle tread, the floor by the boy's bunk), its flame by `flame` — its light and glow dimmed by animate (`e.glow`),
  the globe lit from within by its shader (`u_lit`). The stove's fire: its own `e.light` "fire", dimmed the same way.
- Light: the island's (`island.light`, the looks dawn, dusk, night, storm, flash), `inside` 0.75 (the storm's 0.55);
  the island's far lights (the sun at each hour, the moon from `sky#moon`, the lightning from its bolt) come in only
  through the window and the door (`through`); the window's and the door's daylight (`window_light` on `window_open`,
  `door_light` on `door`); the lantern; the stove's fire.
- The script: the island's lightning (storm over a half), the door's turn, the lantern's place, `window_open`.
- `tools/round_room.py` writes `scene.json` from the same numbers as `lib.js` (keep them the same) and copies the
  island's shaders.

## The keys of the play

Common (the island's): `dawn`, `dusk`, `night`, `moon`, `storm`, `flash`, `lighthouse_lit` (not read here). The room's:
`garden` −1…4 (the wall: −1 bare; little Papa at the gate while it is at 1 or less — not a key of its own),
`paints` (green · red_blue), `wall_mama` 0…1, `wall_grass`, `apple_leaves`, `clouds`, `line27` (dust · clean ·
stripe · next — `next`: the line and the next one under it wiped), `log` 0–2 (Arrived; and «27 August. Calm.»),
`log_depth` (the depth line — apart, since it is only on «Омут»), `sill` −1…4 (−1 bare, 0 the first stem, 1–4
flowers), `brushes` (sill · jar), `lantern_at` (table · stair · bunk · none), `flame` (full · low · out · frost),
`paraffin` 3…0, `stove` (cold · fire · flooded), `firewood`, `steam` 0…1, `cups` 0–2, `tea` 0…1 (the steam over the
cups — the plan's `cup_cold`, as a number the steam can be), `door` 0…1, `basket`, `stone`, `shutters`, `wet`,
`drip` 0…1. The script's own: `door_f`, `lantern_a/d/e`, `window_open`.

## Open

- The sill's flowers are painted on the sill and are not readable from the wide view (the sill is seen almost edge
  on): the beat at the sill (2.6) needs a shot close on it.
- People: the stage-2 places (papa by the stair, mama on the stool, My on the table's corner, the boy at the
  window); where each step has them is stage 5's beats.

## Pieces (stage 5)

The scene's film in pieces (`modules/beats`: the game sets `beat`, the scene tells `beat:<name>` at its end and `<piece>:<moment>` at each moment the game speaks or acts on; the game's lines are the game's). The keys a piece moves are its own; the party's keys it starts from are the step's (the game's `g.scene`). The seconds are estimates.

| Piece | Step | What it shows | Keys it sets | Ends on | Moments (`<piece>:<moment>`) |
| --- | --- | --- | --- | --- | --- |
| `can_in` | 1.5 | Papa comes in at the door with the full can, the others behind him | door 1, lantern none | Papa on the threshold, the can in his paws: the pose for М2б «Банка» (door#threshold) | threshold |
| `can_shelf` (after can_in) | 1.5 | the can onto the shelf; Mama looks into it; Papa to the window, the white crests | paraffin 3 | Papa at the window, facing out | mama, window |
| `wall_read` | 1.5 | My at the keeper's wall reading; the camera rests on the knot under the line | — | close on wall_a#nobody | my, knot |
| `log_write` (after wall_read) | 1.5 | Papa writes «23 August. Arrived» over «Nobody again», standing, high; Mama crouched at the basket, back to him, finds a place on the sill and paints the first stem | log 0→1, sill −1→0 | the stem on the sill, close | written, stem |
| `supper` | 2.6 | evening: Mama paints the sill (the flowers by the scale, her paints), the cold stove, the lantern on the table; Papa looks at the hatch; Mama sews close to the lantern | sill, paints, stove cold, firewood false, dusk→night | Mama at the lantern sewing | sill, hatch, sew |
| `give` (after supper) | 2.6 | «Бери, бери»: Mama pushes the lantern over to Papa; he moves it back; she pushes it again; the boy at the window asks for it; the pose: the lantern in the middle, everyone looking at it | lantern_x (the lantern along the table) | the pose for Ш1 (lantern#flame) | give1, give2, ask, pose |
| `n1_lamp` (after give) | 2.7 Ш1 «Наверх» | Papa fills the lantern and carries it up the stair; the room in moonlight, Mama puts her sewing down, the boy at the window | lantern_at table→none | the room in moonlight | up |
| `n1_mama` (after give) | 2.7 Ш1 «Маме» | Papa's term; the pose for М5б «Нитка» at Mama's needle; she moves over on the bench, he sits; lying down she turns the wick low | flame full→low | the two at the table, the wick low | term, needle, sat, low |
| `n1_son` (after give) | 2.7 Ш1 «Сыну» | the pose for М5в «Фонарь»: the boy's hand on the handle by Papa's; he goes out with it, eyes down; Mama looks Papa in the face, puts down her sewing | lantern_at table→none, door | Papa and Mama at the dark table | hand, gone, face |
| `n1_turns` (after give) | 2.7 Ш1 «По очереди» | Papa turns the wick down; Mama sews by the low flame, pricks her finger; Papa stands at the stair — «Хорошо»; he goes up; she moves to the window and finishes the seam by the moon | flame low | Mama at the window in the moonlight | low, stair, window |
| `dawn_line` | 2.7 Ш1 «Сыну», dawn | the boy brings the lantern with its last flame and sets it by his bunk; Papa comes down and sees the line at the floor in the low slanting light; the flame goes out | lantern_at bunk, flame low→out, dawn | close on wall_a#line27 | bunk, line, out |
| `dawn_stair` | 2.7 Ш1 «По очереди», morning | the lantern on the middle step, white with rime; Papa shakes it — empty | lantern_at stair, flame frost | Papa with the empty lantern | shake |
| `morning` | 3.1 | the boy at the table, his paws white; Mama drops the cup, rubs his paws; Papa looks at the paws; the garden grown on the wall overnight, the brush on the sill in the moon's square; little Papa at the gate if it is there | garden, sill, brushes sill | the wall, wide (wall_a#garden) | paws, wall |
| `into_wall` | 3.2 | noon: Mama finishes the last branch, steps back, looks (≤1: rubs her eyes and sits as one sits to rest; else looks round the empty room) — and steps into the wall under the apple tree; My outside on the sill sees it through the glass | mama_here false, wall_mama 0→1 | her figure in the garden, close | branch, in |
| `empty_room` (after into_wall) | 3.3 | Papa comes down from the hatch; the cold tea on the table; My in the door; Papa sees the figure under the apple tree, puts his palm on the painted gate — his face close | papa at the gate | the pose for Ш2: wall_a#gate, his face | down, my, gate |
| `w_walk` | 3.4 Ш2 «Гуляет», dusk | the empty room at dusk; Mama comes out of the wall — only My sees it from the sill | dusk, wall_mama 1→0, wall_grass, mama_here | Mama in the room, My at the window | out |
| `w_call` (after empty_room) | 3.4 Ш2 «Звать» | Papa calls with his palm on the gate (the pose for М6б); Mama comes out at once, tired; she puts her brushes away in the jar | wall_mama 1→0, wall_grass, brushes jar | the two at the table | palm, out, jar |
| `w_wait` (after empty_room) | 3.4 Ш2 «Ждать» | the cup set down, Papa sits on the floor by the wall; the light from noon to dusk, the tea cold, new tea, flowers growing round Mama's figure; the pose for М6в at the line; the boy in the door with a stone — «Тсс. Потом» — he goes, the stone on the threshold; at dusk Mama comes out, touches the cup, sits down by him on the floor | cups 1, tea, dusk 0→1, garden +1, line27, stone, wall_mama 1→0, wall_grass | the two on the floor by the wall | sit, line, son, hush, stone, out, cup, beside |
| `n2_call` | 3.5 «Звать» | night 2: Mama asleep on the bench at the table mid-word; Papa turns the wick down himself; the boy comes to the table; a creak — Papa wakes and sees his hand on the lantern | night, flame low | the pose for 3.6: troll's hand on the lantern (lantern#flame) | hand |
| `n2_wait` | 3.5 «Ждать» | night 2: Papa dozing on the floor by the cup; Mama, going to bed, turns the wick low; the boy comes to the table; the creak, the hand on the lantern | night, flame low | the pose for 3.6 (lantern#flame) | low, hand |
| `n2_walk` | 3.5 «Гуляет» | night 2 below: Mama lying awake facing the wall, humming like her bees | night, lantern_at none | Mama facing the wall | hum |
| `n2_sleep` | 3.6 «Не открывать глаз» | the pose for М7а: the boy with the lantern, still, looking at his father; he goes out with it | lantern_at none, door | Papa lying, the door | still, gone |
| `n2_put` | 3.6 «Положи» | the boy sets the lantern down without looking and stands at the window till dawn; Papa lies awake looking at his back | lantern_at table | the boy's back at the window | down, window |
| `n2_follow` | 3.6 «Пойти следом» | the boy goes out with the lantern; Papa gets up and goes out after him | lantern_at none, door | the open door, the night | out |
| `breakfast` | 4.1 | grey morning, wind: breakfast; Papa boasts of the boat; My counts; the boy gets up and leaves | storm 0.3 | the table, the boy's empty place | boast, my, leave |
| `oil` | 4.2 | towards evening Papa stokes the stove with the whole bundle, warms the pot of oil, wraps it in his frock coat and carries it up; supper of cold bread | stove fire, firewood false | the three at the table with bread | fire, up, bread |
| `storm` | 4.3 | the storm: a wave down the pipe floods the stove — hiss, steam; the door will not hold; glass rings upstairs; My at the window, delighted; in the window the cape (the game cuts to the cape); the full moon in a break | storm 1, stove flooded, steam, door shaking, flash | Papa and Mama by the door | flood, door, window, moon |
| `storm_sleeve` (after storm) | 4.3, garden ≤ 1 | Mama ties the shutters, then stands by Papa holding his sleeve | shutters | the two side by side | sleeve |
| `storm_shutters` (after storm) | 4.3, garden 2 | Mama ties the shutters without a word | shutters | Mama at the shutters | tied |
| `storm_gate` (after storm) | 4.3, garden ≥ 3 | Mama ties the shutters and for a moment lays her palm on the painted gate | shutters | her palm on the gate | gate |
| `st_door` | 4.4 Ш3 «Дверь» | the last paraffin into the lantern; Papa's order, back to the hatch; the pose for М9б at the door; the four sitting with their backs to the door; a flash in the window: the lighthouse dark, someone under the wave on the cape | paraffin 0, flame full, door_shake | the four against the door | order, hold, sat, flash |
| `st_left` | 4.4 Ш3, Papa gone (Маяк, Мыс) | Mama alone with the children holding the door, without warm light | flame out / lantern none | the three against the door | held |
| `st_run` | 4.4 Ш3 «Горелка и бегом» | Papa comes down: the wave already in, the floor wet, Mama and the children at the door; he stands with them, the door already held | wet | the four at the door | in |
| `calm` | 4.5 | dawn after the storm: drips from the ceiling, the empty can, the flooded stove; Mama packs her basket and sets it by the door (the term) | dawn, wet, drip, basket | the basket by the door | drip, basket |
| `night3` | 4.6 | night 3: the boy at the door without a lantern (the stone in his paws if «потом»); Mama's lines; the pose for 4.7: Papa's paw on his shoulder (troll#chest) | night, lantern_at stair/table, flame out, stone false | the pose for 4.7 | door, mama, shoulder |
| `n3_go` (after night3) | 4.7 «Пусть идёт» | the boy goes; Mama takes the blanket out and comes back; she stands at the window till morning, Papa behind her; at dawn the boy in the door in the blanket — «Она не страшная…»; Mama rubs his paws, sits by him, sets tea for Papa | door, dawn, cups 1 | Mama by the boy, Papa's tea | out, blanket, window, dawn, tea |
| `n3_right` (after night3) | 4.7 «Мама права» | the boy at the window till dawn; Mama covers him with the blanket | dawn | the boy at the window under the blanket | window, blanket |
| `n3_dune` (after night3) | 4.7 «Пойдём» | Papa and the boy go out; Mama sets two cups on the table, one goes cold; at dawn the boy passes Papa in the door without stopping | door, cups 2, tea 1→0, dawn | the cold cup | out, cups, pass |
| `e_beam` | Эпилог «Луч» | Mama by the wall (by Ш2; «отвернулся» — the table empty, she under the apple tree); My on her belly at the wall reading the low lines — «Мне сегодня сорок…»; she looks out at the cape; the last frame: the light passing the window over the table | wall_mama, line27 stripe | the window and the table | wall, my, window |
| `e_basket` | Эпилог «Лодка» | Mama carries her basket out of the door (late: leaves her paints on the sill) | basket false, door | the empty room, the paints on the sill | out |
| `e_pie` | Эпилог «Пирог», morning | Papa at the table telling the night on the cape; My; Mama bakes the pie on the dry driftwood | stove fire, firewood | the pie, the table | story, pie |
| `e_home_was` | Эпилог «Пирог», Mama was (позвал, ждал) | Mama washes the tin, pours two cups and waits at the table; Papa comes back: she asleep on the bench, his cup cold beside her | cups 2, tea 1→0 | the cold cup (the last frame) | cups, back |
| `e_home_away` | Эпилог «Пирог», Mama was not (отвернулся) | Mama washes the tin, lays her palm on the painted veranda and goes into the garden; Papa comes back to the empty room, one cup on the table | wall_mama 0→1, cups 1 | the empty table (the last frame) | veranda, back |
| `e_late` | Эпилог поздний «Пирог» | Papa writes «27 August. Calm.»; My on her belly wipes the dust from the low lines, reads aloud, laughs; Papa looks from his line to that one — the same date — then at the knot; Mama wraps bread for him | log 2, line27 stripe | the line and the clean stripe under it | log, my, knot, bread |
| `e_stair` | Эпилог «Лестница» | the empty lantern; Mama painting clouds over the apple tree (or the brushes dry in the jar and she with her tea before the leafless tree); Papa telling My of the storm; Mama: «Ты был везде»; My runs a finger along the knot; Papa sits on the middle step | clouds / brushes jar, lantern_at stair/table, flame out | Papa on the middle step, the empty lantern (the last frame) | story, everywhere, knot, step |
| `shot_wall` | finales, the common frames | the wall: the garden's colours, Mama by her mark, the line of the 27th (clean or under dust) | — | the wall, held | seen |
| `shot_table` | finales, the common frames | the table: the cups, the lantern | — | the table, held | seen |

Keys of the mini-games (`acts`, numbers the mini-game moves; the scene answers by them): `can_sway` (М2б, the can's sway −1…1), `thread` (М5б, the thread to the eye 0…1), `give` (М5в, the handle let go 0…1), `wipe` (М6в, the dust wiped along the line 0…1), `eyes` (М7а, Papa's eyes open 0…1), `door_shake` (М9б, the door's blow 0…1).

## Contract for the check

```json
{
 "beats": {
  "can_in": {
   "after": [],
   "tells": [
    "can_in:threshold"
   ],
   "seconds": 8,
   "show": false
  },
  "can_shelf": {
   "after": [
    "can_in"
   ],
   "tells": [
    "can_shelf:mama",
    "can_shelf:window"
   ],
   "seconds": 12,
   "show": false
  },
  "wall_read": {
   "after": [],
   "tells": [
    "wall_read:my",
    "wall_read:knot"
   ],
   "seconds": 9,
   "show": false
  },
  "log_write": {
   "after": [
    "wall_read"
   ],
   "tells": [
    "log_write:written",
    "log_write:stem"
   ],
   "seconds": 14,
   "show": false
  },
  "supper": {
   "after": [],
   "tells": [
    "supper:sill",
    "supper:hatch",
    "supper:sew"
   ],
   "seconds": 16,
   "show": false
  },
  "give": {
   "after": [
    "supper"
   ],
   "tells": [
    "give:give1",
    "give:give2",
    "give:ask",
    "give:pose"
   ],
   "seconds": 22,
   "show": false
  },
  "n1_lamp": {
   "after": [
    "give"
   ],
   "tells": [
    "n1_lamp:up"
   ],
   "seconds": 10,
   "show": false
  },
  "n1_mama": {
   "after": [
    "give"
   ],
   "tells": [
    "n1_mama:term",
    "n1_mama:needle",
    "n1_mama:sat",
    "n1_mama:low"
   ],
   "seconds": 24,
   "show": false
  },
  "n1_son": {
   "after": [
    "give"
   ],
   "tells": [
    "n1_son:hand",
    "n1_son:gone",
    "n1_son:face"
   ],
   "seconds": 16,
   "show": false
  },
  "n1_turns": {
   "after": [
    "give"
   ],
   "tells": [
    "n1_turns:low",
    "n1_turns:stair",
    "n1_turns:window"
   ],
   "seconds": 20,
   "show": false
  },
  "dawn_line": {
   "after": [],
   "tells": [
    "dawn_line:bunk",
    "dawn_line:line",
    "dawn_line:out"
   ],
   "seconds": 18,
   "show": false
  },
  "dawn_stair": {
   "after": [],
   "tells": [
    "dawn_stair:shake"
   ],
   "seconds": 8,
   "show": false
  },
  "morning": {
   "after": [],
   "tells": [
    "morning:paws",
    "morning:wall"
   ],
   "seconds": 18,
   "show": false
  },
  "into_wall": {
   "after": [],
   "tells": [
    "into_wall:branch",
    "into_wall:in"
   ],
   "seconds": 18,
   "show": false
  },
  "empty_room": {
   "after": [
    "into_wall"
   ],
   "tells": [
    "empty_room:down",
    "empty_room:my",
    "empty_room:gate"
   ],
   "seconds": 18,
   "show": false
  },
  "w_walk": {
   "after": [],
   "tells": [
    "w_walk:out"
   ],
   "seconds": 10,
   "show": false
  },
  "w_call": {
   "after": [
    "empty_room"
   ],
   "tells": [
    "w_call:palm",
    "w_call:out",
    "w_call:jar"
   ],
   "seconds": 16,
   "show": false
  },
  "w_wait": {
   "after": [
    "empty_room"
   ],
   "tells": [
    "w_wait:sit",
    "w_wait:line",
    "w_wait:son",
    "w_wait:hush",
    "w_wait:stone",
    "w_wait:out",
    "w_wait:cup",
    "w_wait:beside"
   ],
   "seconds": 30,
   "show": false
  },
  "n2_call": {
   "after": [],
   "tells": [
    "n2_call:hand"
   ],
   "seconds": 14,
   "show": false
  },
  "n2_wait": {
   "after": [],
   "tells": [
    "n2_wait:low",
    "n2_wait:hand"
   ],
   "seconds": 14,
   "show": false
  },
  "n2_walk": {
   "after": [],
   "tells": [
    "n2_walk:hum"
   ],
   "seconds": 8,
   "show": false
  },
  "n2_sleep": {
   "after": [],
   "tells": [
    "n2_sleep:still",
    "n2_sleep:gone"
   ],
   "seconds": 12,
   "show": false
  },
  "n2_put": {
   "after": [],
   "tells": [
    "n2_put:down",
    "n2_put:window"
   ],
   "seconds": 12,
   "show": false
  },
  "n2_follow": {
   "after": [],
   "tells": [
    "n2_follow:out"
   ],
   "seconds": 10,
   "show": false
  },
  "breakfast": {
   "after": [],
   "tells": [
    "breakfast:boast",
    "breakfast:my",
    "breakfast:leave"
   ],
   "seconds": 22,
   "show": false
  },
  "oil": {
   "after": [],
   "tells": [
    "oil:fire",
    "oil:up",
    "oil:bread"
   ],
   "seconds": 18,
   "show": false
  },
  "storm": {
   "after": [],
   "tells": [
    "storm:flood",
    "storm:door",
    "storm:window",
    "storm:moon"
   ],
   "seconds": 24,
   "show": false
  },
  "storm_sleeve": {
   "after": [
    "storm"
   ],
   "tells": [
    "storm_sleeve:sleeve"
   ],
   "seconds": 8,
   "show": false
  },
  "storm_shutters": {
   "after": [
    "storm"
   ],
   "tells": [
    "storm_shutters:tied"
   ],
   "seconds": 6,
   "show": false
  },
  "storm_gate": {
   "after": [
    "storm"
   ],
   "tells": [
    "storm_gate:gate"
   ],
   "seconds": 8,
   "show": false
  },
  "st_door": {
   "after": [],
   "tells": [
    "st_door:order",
    "st_door:hold",
    "st_door:sat",
    "st_door:flash"
   ],
   "seconds": 26,
   "show": false
  },
  "st_left": {
   "after": [],
   "tells": [
    "st_left:held"
   ],
   "seconds": 10,
   "show": false
  },
  "st_run": {
   "after": [],
   "tells": [
    "st_run:in"
   ],
   "seconds": 10,
   "show": false
  },
  "calm": {
   "after": [],
   "tells": [
    "calm:drip",
    "calm:basket"
   ],
   "seconds": 14,
   "show": false
  },
  "night3": {
   "after": [],
   "tells": [
    "night3:door",
    "night3:mama",
    "night3:shoulder"
   ],
   "seconds": 16,
   "show": false
  },
  "n3_go": {
   "after": [
    "night3"
   ],
   "tells": [
    "n3_go:out",
    "n3_go:blanket",
    "n3_go:window",
    "n3_go:dawn",
    "n3_go:tea"
   ],
   "seconds": 28,
   "show": false
  },
  "n3_right": {
   "after": [
    "night3"
   ],
   "tells": [
    "n3_right:window",
    "n3_right:blanket"
   ],
   "seconds": 14,
   "show": false
  },
  "n3_dune": {
   "after": [
    "night3"
   ],
   "tells": [
    "n3_dune:out",
    "n3_dune:cups",
    "n3_dune:pass"
   ],
   "seconds": 20,
   "show": false
  },
  "e_beam": {
   "after": [],
   "tells": [
    "e_beam:wall",
    "e_beam:my",
    "e_beam:window"
   ],
   "seconds": 20,
   "show": false
  },
  "e_basket": {
   "after": [],
   "tells": [
    "e_basket:out"
   ],
   "seconds": 10,
   "show": false
  },
  "e_pie": {
   "after": [],
   "tells": [
    "e_pie:story",
    "e_pie:pie"
   ],
   "seconds": 18,
   "show": false
  },
  "e_home_was": {
   "after": [],
   "tells": [
    "e_home_was:cups",
    "e_home_was:back"
   ],
   "seconds": 16,
   "show": false
  },
  "e_home_away": {
   "after": [],
   "tells": [
    "e_home_away:veranda",
    "e_home_away:back"
   ],
   "seconds": 14,
   "show": false
  },
  "e_late": {
   "after": [],
   "tells": [
    "e_late:log",
    "e_late:my",
    "e_late:knot",
    "e_late:bread"
   ],
   "seconds": 24,
   "show": false
  },
  "e_stair": {
   "after": [],
   "tells": [
    "e_stair:story",
    "e_stair:everywhere",
    "e_stair:knot",
    "e_stair:step"
   ],
   "seconds": 24,
   "show": false
  },
  "shot_wall": {
   "after": [],
   "tells": [
    "shot_wall:seen"
   ],
   "seconds": 5,
   "show": false
  },
  "shot_table": {
   "after": [],
   "tells": [
    "shot_table:seen"
   ],
   "seconds": 4,
   "show": false
  }
 },
 "points": [
  "wall_a#keeper",
  "wall_a#nobody",
  "wall_a#log",
  "wall_a#line27",
  "wall_a#garden",
  "wall_a#apple",
  "wall_a#gate",
  "wall_mama#mama",
  "sill#garden",
  "jar#jar",
  "shelf#paraffin",
  "stair#stair",
  "stair#hatch",
  "casement#window",
  "stove#stove",
  "stove#hob",
  "lantern#flame",
  "door#door",
  "door#threshold",
  "cup#cup",
  "basket#basket",
  "stone#stone",
  "papa",
  "mama",
  "my",
  "troll"
 ],
 "offers": [
  "lantern#flame",
  "shelf#paraffin",
  "wall_a#keeper",
  "wall_a#gate",
  "wall_a#line27",
  "door#door",
  "door#threshold",
  "cup#cup",
  "stair#stair",
  "papa#chest",
  "mama#chest",
  "my#chest",
  "troll#chest"
 ],
 "party": {
  "calm": 0,
  "dawn": 0,
  "dusk": 0,
  "night": 0,
  "moon": 0.6,
  "storm": 0,
  "flash": 0,
  "lighthouse_lit": 0,
  "garden": -1,
  "paints": "green",
  "wall_mama": 0,
  "wall_grass": false,
  "apple_leaves": true,
  "clouds": false,
  "line27": "dust",
  "log": 0,
  "log_depth": false,
  "sill": -1,
  "brushes": "sill",
  "lantern_at": "table",
  "flame": "full",
  "paraffin": 3,
  "stove": "cold",
  "firewood": true,
  "steam": 0,
  "cups": 0,
  "tea": 0,
  "door": 0,
  "basket": false,
  "stone": false,
  "shutters": false,
  "wet": false,
  "drip": 0
 },
 "acts": {
  "can_sway": {
   "values": [],
   "tells": []
  },
  "thread": {
   "values": [],
   "tells": []
  },
  "give": {
   "values": [],
   "tells": []
  },
  "wipe": {
   "values": [],
   "tells": []
  },
  "eyes": {
   "values": [],
   "tells": []
  },
  "door_shake": {
   "values": [],
   "tells": []
  }
 }
}
```
