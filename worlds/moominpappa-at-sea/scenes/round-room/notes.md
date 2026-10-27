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
- **The pieces** (`lib.js` `film`, `script.js`, `showcase.js`; `modules/beats`): each piece's `from` sets the people's places (`<id>_a/_d`, the seats `SEAT`, the places `SPOT`), what they do and hold, and the camera; the game's party keys are the step's. The camera is set straight at a point (`POINTS`) or a head from the start's side (`ON`: close on someone turns them to it), or from an eye beside (`FROM`, `EYE`: Papa at the gate, at the line, the sill). A lantern carried lit lights from the hand (`lamp_papa`, `lamp_troll` at `<id>#flame`, on `<id>_lamp`). The close-ups (`modules/closeups`): `needle` (М5б: the pose of `n1_mama` opens it), `handle` (М5в: the mini-game opens it), `paws` (the rubbing in `morning`, `n3_dawn`).

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

## The beam

Not in this room: from the window the beam is seen only far out, faint (it shines from twelve metres over the room).
Its passing in «Луч» is a cut to a scene with the lighthouse outside (the game's order of cuts).

## Open

- The sill's flowers are painted on the sill and are not readable from the wide view (the sill is seen almost edge
  on): the beat at the sill (2.6) needs a shot close on it.
- People: the stage-2 places (papa by the stair, mama on the stool, My on the table's corner, the boy at the
  window); where each step has them is stage 5's beats.

## Pieces (stage 5)

The scene's film in pieces (`modules/beats`: the game sets `beat`, the scene tells `beat:<name>` at its end and `<piece>:<moment>` at each moment the game speaks or acts on). A piece that leads to a mini-game or a choice ends in its pose; what follows it is another piece (`after`). The places of people are the pieces' (`from`); the party's keys are the step's. The seconds are estimates.

| Piece | Step | What it shows | Keys it sets | Ends on | Moments (`<piece>:<moment>`) |
| --- | --- | --- | --- | --- | --- |
| `can_in` | 1.5 | Papa comes in at the door with the full can, the others behind him | door | Papa on the threshold, the can in his paws: the pose for М2б «Банка» (door#threshold) | threshold |
| `can_shelf` (after can_in) | 1.5 | the can onto the shelf; Mama looks into it; Papa to the window, the white crests | — | Papa at the window, facing out | mama, window |
| `wall_read` | 1.5 | My at the keeper's wall reading; the camera rests on the knot under the line | — | close on wall_a#nobody | my, knot |
| `log_write` (after wall_read) | 1.5 | Papa writes «23 August. Arrived» over «Nobody again», standing, high; Mama crouched at the basket, back to him, finds a place on the sill and paints the first stem | log 0→1, sill −1→0 | the stem on the sill, close | written, stem |
| `supper` | 2.6 | evening: Mama paints the sill (the flowers by the scale, her paints), the cold stove, the lantern on the table; Papa looks at the hatch; Mama sews close to the lantern | — | Mama at the lantern sewing | sill, hatch, sew |
| `give` (after supper) | 2.6 | «Бери, бери»: Mama pushes the lantern over to Papa; he moves it back; she pushes it again; the boy at the window asks for it; everyone looking at the lantern | lantern_x (internal: the lantern along the table) | the lantern in the middle, everyone round it | give1, give2, ask |
| `fill` (after give) | 2.7 | night: Papa fills the lantern from the can — one measure, till morning | paraffin −1, night | the pose for Ш1: the lantern in the middle (lantern#flame), Papa's face close | poured |
| `n1_lamp` (after fill) | 2.7 Ш1 «Наверх» | Papa carries the lantern up the stair; the room in moonlight, Mama puts her sewing down, the boy at the window | lantern_at table→none | the room in moonlight | up |
| `n1_mama` (after fill) | 2.7 Ш1 «Маме» | Papa's term; Mama's, Papa's and My's lines; Papa by Mama's needle | — | the pose for М5б «Нитка» (Mama's needle; the insert `needle`) | term |
| `n1_mama_sat` (after n1_mama) | 2.7 Ш1 «Маме» | she moves over on the bench, he sits; lying down she turns the wick low | flame full→low | the two at the table, the wick low | sat, low |
| `n1_son` (after fill) | 2.7 Ш1 «Сыну», after М5в | the boy goes out with the lantern, eyes down; Mama looks Papa in the face, puts down her sewing | lantern_at table→none, door | Papa and Mama at the dark table | hand, gone, face |
| `n1_turns` (after fill) | 2.7 Ш1 «По очереди» | Papa turns the wick down; Mama sews by the low flame, pricks her finger; Papa stands at the stair — «Хорошо»; he goes up; she moves to the window and finishes the seam by the moon | flame low, lantern_at none | Mama at the window in the moonlight | low, stair, window |
| `n1_step` | 2.7 Ш1 «По очереди», towards morning | Papa comes down and sets the lantern on the middle step; the boy, awake all night, takes it and runs out to the shore | lantern_at stair→none, door | the open door, the step empty | set, ran |
| `dawn_line` | 2.7 Ш1 «Сыну», dawn | the boy brings the lantern with its last flame and sets it by his bunk; Papa comes down and sees the line at the floor in the low slanting light; the flame goes out | lantern_at bunk, flame low→out, dawn | close on wall_a#line27 | bunk, line, out |
| `dawn_stair` | 2.7 Ш1 «По очереди», morning | the lantern on the middle step, white with rime; Papa shakes it — empty | lantern_at stair, flame frost | Papa with the empty lantern | shake |
| `morning` | 3.1 | the boy at the table, his paws white; Mama drops the cup, rubs his paws; Papa looks at the paws; the garden grown on the wall overnight, the brush on the sill in the moon's square; little Papa at the gate if it is there | — | the wall, wide (wall_a#garden) | paws, wall |
| `into_wall` | 3.2 | noon: Mama finishes the last branch, steps back, looks (≤1: rubs her eyes and sits as one sits to rest; else looks round the empty room) — and steps into the wall under the apple tree; My outside on the sill sees it through the glass | mama_here false, wall_mama 0→1 | her figure in the garden, close | branch, in |
| `empty_room` (after into_wall) | 3.3 | Papa comes down from the hatch; the cold tea on the table; My in the door; Papa sees the figure under the apple tree, puts his palm on the painted gate — his face close | — | the pose for Ш2 and М6б: his palm on wall_a#gate, his face | down, my, gate |
| `w_walk` | 3.4 Ш2 «Гуляет», dusk | the empty room at dusk; Mama comes out of the wall — only My sees it from the sill outside | dusk, wall_mama 1→0, wall_grass, mama_here | Mama in the room, My at the window | out |
| `w_call` (after empty_room) | 3.4 Ш2 «Звать», after М6б | Mama comes out at once, tired; she puts her brushes away in the jar | wall_mama 1→0, wall_grass, mama_here, brushes jar | the two at the table | out, jar |
| `w_wait` (after empty_room) | 3.4 Ш2 «Ждать» | the cup set down, Papa sits on the floor by the wall; the light from noon toward dusk, the tea cold, new tea, flowers growing round Mama's figure | cups 1, tea, dusk, garden +1 | the pose for М6в «Пыль» at wall_a#line27 | sit |
| `w_wait_son` (after w_wait) | 3.4 Ш2 «Ждать» | the line read; the boy in the door with a stone — «Тсс. Потом» — he goes, the stone on the threshold; at dusk Mama comes out, touches the cup, sits down by him on the floor | stone, wall_mama 1→0, wall_grass, mama_here, dusk 1 | the two on the floor by the wall | line, son, hush, stone, out, cup, beside |
| `n2_call` | 3.5 «Звать» | night 2: Mama asleep on the bench at the table mid-word; Papa turns the wick down himself; the boy comes to the table; a creak — Papa wakes and sees his hand on the lantern | flame low | the pose for 3.6: troll's hand on the lantern (lantern#flame) | hand |
| `n2_wait` | 3.5 «Ждать» | night 2: Papa dozing on the floor by the cup; Mama, going to bed, turns the wick low; the boy comes to the table; the creak, the hand on the lantern | flame low | the pose for 3.6 (lantern#flame) | low, hand |
| `n2_walk` | 3.5 «Гуляет» | night 2 below: Mama lying awake facing the wall, humming like her bees | lantern_at none | Mama facing the wall | hum |
| `n2_sleep` | 3.6 «Не открывать глаз» | the boy with the lantern, still, looking at his father | — | the pose for М7а «Спит» (Papa's face, the boy) | still |
| `n2_sleep_gone` (after n2_sleep) | 3.6 «Не открывать глаз» | the boy goes out with the lantern | lantern_at none, door | Papa lying, the door | gone |
| `n2_put` | 3.6 «Положи» | the boy sets the lantern down without looking and stands at the window till dawn; Papa lies awake looking at his back | lantern_at table | the boy's back at the window | down, window |
| `n2_follow` | 3.6 «Пойти следом» | the boy goes out with the lantern; Papa gets up and goes out after him | lantern_at none, door | the open door, the night | out |
| `n2_morning` | 3.6, morning after «следом» | morning: My and Papa at the table — «Ты же обещал…» / «Шпион» | — | the two at the table | my |
| `breakfast` | 4.1 | grey morning, wind: breakfast; Papa boasts of the boat; My's words by the branch | — | the table | boast, my |
| `breakfast_leave` (after breakfast) | 4.1 | the boy gets up and leaves the table; Mama heard | door | the boy's empty place | leave |
| `oil` | 4.2 | towards evening Papa stokes the stove with the whole bundle, warms the pot of oil, wraps it in his frock coat and carries it up; supper of cold bread | stove fire, firewood false | the three at the table with bread | fire, up, bread |
| `storm` | 4.3 | the storm: a wave down the pipe floods the stove — hiss, steam; the door will not hold; glass rings upstairs; then the window (the game cuts to the cape) | stove flooded, steam, door | the window, the cape out there | flood, door, window |
| `storm_sleeve` (after storm) | 4.3, garden ≤ 1 | Mama ties the shutters, then stands by Papa holding his sleeve (with her own paints: the box of paints under her apron) | shutters | the two side by side | held, paints |
| `storm_shutters` (after storm) | 4.3, garden 2 | Mama ties the shutters without a word (her paints under her apron) | shutters | Mama at the shutters | tied, paints |
| `storm_gate` (after storm) | 4.3, garden ≥ 3 | Mama ties the shutters and for a moment lays her palm on the painted gate (her paints under her apron) | shutters | her palm on the gate | gate, paints |
| `storm_moon` (after storm_sleeve, storm_shutters, storm_gate) | 4.3 | the full moon in a break of the clouds; My at the window, delighted by the storm; Mama looks at the moon | flash | the pose for Ш3: papa#chest in the middle, his face | moon, my |
| `st_door` | 4.4 Ш3 «Дверь» | the last paraffin into the lantern; Papa's order, his back to the hatch | paraffin 0, flame full | the pose for М9б «Дверь» (door#door) | fill, order |
| `st_door_sat` (after st_door) | 4.4 Ш3 «Дверь» | the four sitting with their backs to the door; Papa's story of the storm, My, the laugh; Mama: «Мне хочется домой» (to Papa, or to the apple tree under the wave's blow); a flash in the window: the lighthouse dark, someone under the wave on the cape | flash | the four against the door | sat, story, told, laugh, home, flash |
| `st_go` | 4.4 Ш3 «Маяк», «Мыс», «Горелка» | Papa goes: the lines (the cape: «Человек за бортом…», My, Mama); the last paraffin into the lantern (the cape) or carried up (the lamp, the burner); he goes out at the door or up through the hatch; Mama after him | paraffin 0, lantern_at none, door | Mama and the children by the door | say, fill, gone, after |
| `st_left` | 4.4 Ш3, Papa gone | Mama alone with the children holding the door, without warm light | — | the three against the door | held |
| `st_run` | 4.4 Ш3 «Горелка и бегом» | Papa comes down: the wave already in, the floor wet, Mama and the children at the door; he stands with them, the door already held | wet | the four at the door | in |
| `calm` | 4.5 | dawn after the storm: drips from the ceiling, the empty can, the flooded stove; Mama packs her basket and sets it by the door (the term) | basket | the basket by the door | drip, basket |
| `night3` | 4.6 | night 3: the boy at the door without a lantern (the stone in his paws if «потом»); Mama's lines; Papa's paw on his shoulder | — | the pose for 4.7 (troll#chest, Papa's paw on his shoulder) | door, mama, shoulder |
| `n3_go` (after night3) | 4.7 «Пусть идёт» | the boy goes; Mama takes the blanket and goes out after him | door | the open door | out, blanket |
| `n3_dawn` | 4.7 «Пусть идёт» | Mama at the window till morning, Papa behind her; at dawn the boy in the door in the blanket — «Она не страшная…»; Mama rubs his paws, sits by him, sets tea for Papa | dawn, cups 1 | Mama by the boy, Papa's tea | window, dawn, rub, tea |
| `n3_right` (after night3) | 4.7 «Мама права» | the boy at the window (closed: trembling, he obeys, does not look at Papa) | — | the boy at the window | window |
| `n3_cover` | 4.7 «Мама права», dawn | Mama covers the boy at the window with the blanket | dawn | the boy under the blanket | blanket |
| `n3_dune` (after night3) | 4.7 «Пойдём» | Papa and the boy go out | door | the open door | out |
| `n3_cups` | 4.7 «Пойдём» | Mama at the window with the blanket; two cups on the table, one goes cold | cups 2, tea 1→0 | the cold cup | cups, cold |
| `unpack` | Эпилог «Луч», «Пирог» at the term | Mama silently unpacks her basket | basket false | Mama at the shelf | unpack |
| `e_beam` | Эпилог «Луч» | Mama by her mark: at the table by two cups, by the bare apple tree — or the table empty and she under the apple tree | wall_mama | Mama (or the empty table) | mama |
| `e_beam_my` (after e_beam) | Эпилог «Луч» | My on her belly at the wall reading the low lines — «…Ha. I know»; she looks out at the cape; the window over the table (the beam's passing — the game's cut outside) | line27 stripe | the window and the table | my, look, window |
| `e_basket` | Эпилог «Лодка» | Mama carries her basket out of the door (late: leaves her paints on the sill) | basket false, door | the empty room, the paints on the sill | out |
| `e_story` | Эпилог «Пирог», morning | Papa at the table telling the night on the cape; My; in the full one «Сегодня у него день рождения» — «Наконец-то» | — | the table | story, birthday |
| `e_pie` (after e_story) | Эпилог «Пирог» | Mama bakes the pie on the dry driftwood; the pie goes out to the cape | stove fire | the pie carried out at the door | pie, out |
| `e_home_was` | Эпилог «Пирог», Mama was (позвал, ждал) | Mama washes the tin, pours two cups and waits at the table; Papa comes back: she asleep on the bench, his cup cold beside her | cups 2, tea 1→0 | the cold cup (the last frame) | cups, back |
| `e_home_away` | Эпилог «Пирог», Mama was not (отвернулся) | Mama washes the tin, lays her palm on the painted veranda and goes into the garden; Papa comes back to the empty room, one cup on the table | wall_mama 0→1, cups 1 | the empty table (the last frame) | veranda, back |
| `e_late` | Эпилог поздний «Пирог» | Papa writes «27 August. Calm.»; My on her belly wipes the dust from the low lines, reads aloud, laughs; Papa looks from his line to that one — the same date — then at the knot; Mama wraps bread for him | log 2, line27 stripe | the line and the clean stripe under it | log, my, knot, bread |
| `e_stair` | Эпилог «Лестница» | the empty lantern; Mama painting clouds over the apple tree (or the brushes dry in the jar and she with her tea before the leafless tree); Papa telling My of the storm; Mama: «Ты был везде»; My runs a finger along the knot | clouds | the pose for «Лестница» (stair#stair) | story, everywhere, knot |
| `e_step` (after e_stair) | Эпилог «Лестница» | Papa sitting on the middle step, the empty lantern (the last frame) | — | Papa on the middle step | step |
| `shot_wall` | finales, the common frames | the wall: the garden's colours, Mama by her mark, the line of the 27th (clean or under dust) | — | the wall, held | seen |
| `shot_table` | finales, the common frames; «Лодка» at «отвернулся» | the table: the cups, the lantern, the basket by the door if it is there (with wall_mama 1 and the table empty — Mama under the apple tree) | — | the table, held | seen |

Keys of the mini-games (`acts`, numbers the mini-game moves; the scene answers by them). A party key of the storm: `mama_to` (papa · apple — whom Mama tells «Мне хочется домой» at the door: the apple tree at Ш2 «Гуляет»). Keys: `can_sway` (М2б, the can's sway −1…1), `thread` (М5б, the thread to the eye 0…1), `give` (М5в, the handle let go 0…1), `wipe` (М6в, the dust wiped along the line 0…1), `eyes` (М7а, Papa's eyes open 0…1), `door_shake` (М9б, the door's blow 0…1). The piece's own key `lantern_x` (the lantern along the table in `give`) is in `states`, not the party's.

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
    "give:ask"
   ],
   "seconds": 22,
   "show": false
  },
  "fill": {
   "after": [
    "give"
   ],
   "tells": [
    "fill:poured"
   ],
   "seconds": 10,
   "show": false
  },
  "n1_lamp": {
   "after": [
    "fill"
   ],
   "tells": [
    "n1_lamp:up"
   ],
   "seconds": 10,
   "show": false
  },
  "n1_mama": {
   "after": [
    "fill"
   ],
   "tells": [
    "n1_mama:term"
   ],
   "seconds": 12,
   "show": false
  },
  "n1_mama_sat": {
   "after": [
    "n1_mama"
   ],
   "tells": [
    "n1_mama_sat:sat",
    "n1_mama_sat:low"
   ],
   "seconds": 14,
   "show": false
  },
  "n1_son": {
   "after": [
    "fill"
   ],
   "tells": [
    "n1_son:hand",
    "n1_son:gone",
    "n1_son:face"
   ],
   "seconds": 14,
   "show": false
  },
  "n1_turns": {
   "after": [
    "fill"
   ],
   "tells": [
    "n1_turns:low",
    "n1_turns:stair",
    "n1_turns:window"
   ],
   "seconds": 20,
   "show": false
  },
  "n1_step": {
   "after": [],
   "tells": [
    "n1_step:set",
    "n1_step:ran"
   ],
   "seconds": 12,
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
    "w_call:out",
    "w_call:jar"
   ],
   "seconds": 14,
   "show": false
  },
  "w_wait": {
   "after": [
    "empty_room"
   ],
   "tells": [
    "w_wait:sit"
   ],
   "seconds": 16,
   "show": false
  },
  "w_wait_son": {
   "after": [
    "w_wait"
   ],
   "tells": [
    "w_wait_son:line",
    "w_wait_son:son",
    "w_wait_son:hush",
    "w_wait_son:stone",
    "w_wait_son:out",
    "w_wait_son:cup",
    "w_wait_son:beside"
   ],
   "seconds": 26,
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
    "n2_sleep:still"
   ],
   "seconds": 6,
   "show": false
  },
  "n2_sleep_gone": {
   "after": [
    "n2_sleep"
   ],
   "tells": [
    "n2_sleep_gone:gone"
   ],
   "seconds": 8,
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
  "n2_morning": {
   "after": [],
   "tells": [
    "n2_morning:my"
   ],
   "seconds": 8,
   "show": false
  },
  "breakfast": {
   "after": [],
   "tells": [
    "breakfast:boast",
    "breakfast:my"
   ],
   "seconds": 18,
   "show": false
  },
  "breakfast_leave": {
   "after": [
    "breakfast"
   ],
   "tells": [
    "breakfast_leave:leave"
   ],
   "seconds": 8,
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
    "storm:window"
   ],
   "seconds": 18,
   "show": false
  },
  "storm_sleeve": {
   "after": [
    "storm"
   ],
   "tells": [
    "storm_sleeve:held",
    "storm_sleeve:paints"
   ],
   "seconds": 8,
   "show": false
  },
  "storm_shutters": {
   "after": [
    "storm"
   ],
   "tells": [
    "storm_shutters:tied",
    "storm_shutters:paints"
   ],
   "seconds": 6,
   "show": false
  },
  "storm_gate": {
   "after": [
    "storm"
   ],
   "tells": [
    "storm_gate:gate",
    "storm_gate:paints"
   ],
   "seconds": 8,
   "show": false
  },
  "storm_moon": {
   "after": [
    "storm_sleeve",
    "storm_shutters",
    "storm_gate"
   ],
   "tells": [
    "storm_moon:moon",
    "storm_moon:my"
   ],
   "seconds": 10,
   "show": false
  },
  "st_door": {
   "after": [],
   "tells": [
    "st_door:fill",
    "st_door:order"
   ],
   "seconds": 12,
   "show": false
  },
  "st_door_sat": {
   "after": [
    "st_door"
   ],
   "tells": [
    "st_door_sat:sat",
    "st_door_sat:story",
    "st_door_sat:told",
    "st_door_sat:laugh",
    "st_door_sat:home",
    "st_door_sat:flash"
   ],
   "seconds": 26,
   "show": false
  },
  "st_go": {
   "after": [],
   "tells": [
    "st_go:say",
    "st_go:fill",
    "st_go:gone",
    "st_go:after"
   ],
   "seconds": 16,
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
    "n3_go:blanket"
   ],
   "seconds": 10,
   "show": false
  },
  "n3_dawn": {
   "after": [],
   "tells": [
    "n3_dawn:window",
    "n3_dawn:dawn",
    "n3_dawn:rub",
    "n3_dawn:tea"
   ],
   "seconds": 22,
   "show": false
  },
  "n3_right": {
   "after": [
    "night3"
   ],
   "tells": [
    "n3_right:window"
   ],
   "seconds": 10,
   "show": false
  },
  "n3_cover": {
   "after": [],
   "tells": [
    "n3_cover:blanket"
   ],
   "seconds": 8,
   "show": false
  },
  "n3_dune": {
   "after": [
    "night3"
   ],
   "tells": [
    "n3_dune:out"
   ],
   "seconds": 8,
   "show": false
  },
  "n3_cups": {
   "after": [],
   "tells": [
    "n3_cups:cups",
    "n3_cups:cold"
   ],
   "seconds": 12,
   "show": false
  },
  "unpack": {
   "after": [],
   "tells": [
    "unpack:unpack"
   ],
   "seconds": 8,
   "show": false
  },
  "e_beam": {
   "after": [],
   "tells": [
    "e_beam:mama"
   ],
   "seconds": 8,
   "show": false
  },
  "e_beam_my": {
   "after": [
    "e_beam"
   ],
   "tells": [
    "e_beam_my:my",
    "e_beam_my:look",
    "e_beam_my:window"
   ],
   "seconds": 16,
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
  "e_story": {
   "after": [],
   "tells": [
    "e_story:story",
    "e_story:birthday"
   ],
   "seconds": 14,
   "show": false
  },
  "e_pie": {
   "after": [
    "e_story"
   ],
   "tells": [
    "e_pie:pie",
    "e_pie:out"
   ],
   "seconds": 14,
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
    "e_stair:knot"
   ],
   "seconds": 20,
   "show": false
  },
  "e_step": {
   "after": [
    "e_stair"
   ],
   "tells": [
    "e_step:step"
   ],
   "seconds": 8,
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
  "mama_to": "papa",
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
