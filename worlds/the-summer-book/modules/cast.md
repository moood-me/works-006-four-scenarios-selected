# cast — the people of «The Summer Book»

A module for scenes with people (elements with `person`: `{"cast": "cast", "who": …}`). In the scene's `modules`.
Style `summer` (from the engine's `flat`: straight-edged flat shapes lit by the scene, faces `simple` — they take
`<id>_mood`). A part's lengths are a man's metres times `F.fit.h`; what is carried is in real metres (the same
lantern in any hand).

## Who

- `grandma` — Grandmother: old, small and thin, white hair in a bun, a long dark-blue dress (`shawl_dress`), a grey
  shawl to the elbows, dark stockings.
- `sophia` — Sophia, six (0.64 of a man): short fair hair, a faded coral frock to the knee, barefoot.
- `papa` — Papa: tall and lean, dark hair, a green-grey knitted sweater, grey trousers.
- `eriksson` — Eriksson: an old fisherman from the far skerries, square and weathered, a dark cap over grey hair, a
  cream fisherman's sweater, dark trousers. He never comes ashore: he sits on his boat's thwart (`sit_bench`,
  `eriksson_on` a point of the boat's seat).

For a while (`<id>_wear` — fields over the look): Grandmother without her shawl (it is round Sophia, or lost) —
`grandma_wear: {"garment": "long_dress"}` (the same dress, no shawl); with it again — `grandma_wear: null`.
Grandmother with her eyes closed — the engine's expression: `grandma_mood: "eyes_closed"`. Sophia in the straw hat —
`sophia_wear: {"hat": "straw"}` (the cast's hat, too big for her).

Points on everyone (the engine's): `head`, `hand_r`, `hand_l`, `hands`, `chest`, `hips`, `shoulder_r`, `shoulder_l`,
`elbow_r`, `elbow_l` (Papa catching her by the elbow: `papa_reach {"r": "grandma#elbow_l"}`), `back`, `nape`, `foot_r`,
`foot_l`, `feet`; and the parts' own (below).

## Motions (`<id>_do`, `go`, a gait `<id>_gait`)

Made by Kimodo (`make_motion`), looked at on these people (`look_at_motion`), put with `put_motion`.
*once* — done once, ends where it says; *loop* — on the spot; *gait* — `<id>_gait` (or looped on the spot).
A seated loop sits on what `<id>_on` names ([across, distance, the seat's top]): a stone, the stump, a bed's edge, a
step (the feet go down to what is under them), a thwart, a bench. Who does it is said where it was made for someone;
any of them may play any motion (Sophia moves as a small adult).

**Status** — *made*: in `cast.data.json`; *to make*: named, coming (until then the engine warns and they stand).

| id | kind | what | for | status |
| --- | --- | --- | --- | --- |
| `old_walk` | gait | Grandmother's slow old walk, small steps, a little bent | Grandmother (always hers: `person.gait`) | to make |
| `lantern_walk` | gait | the old walk, the lantern held out before her in the left hand | Grandmother in the fog, the night path | to make |
| `walk_fast` | gait | a quick walk | Papa | to make |
| `lead_walk` | gait | a slow walk at an old woman's pace, the right arm a little out (she on it: both `_reach` hand to hand / to `#hand_l`) | Papa leading his mother | to make |
| `carry_walk` | gait | walks with something big in both arms before the chest (the camp bed, the bundle, the parcel) | Papa, anyone | to make |
| `run` | gait | a child's run | Sophia | to make |
| `proud_walk` | gait | walks importantly, chest out, hands behind the back | Sophia («ours») | to make |
| `back_away` | gait | steps backwards slowly, facing as before | Sophia | to make |
| `sleepy_walk` | gait | a slow drowsy walk, the head down, led by the hand | Sophia at night | to make |
| `hands_behind` | loop | stands, hands behind the back | anyone | made |
| `seated` | loop | sits at rest on a low seat, the hands on the knees | anyone (a thwart, a bench, Papa's cot, a step) | made |
| `sit_stone` | loop | sits upright on a low seat, the hands together in the lap, the elbows in at her sides (remade: the old one read as elbows splayed, hands on the hips) | Grandmother (stone, stump, bed's edge, step) | made → remake |
| `sit_bench` | loop | an old man sits on a low bench, leaning forward, the forearms on the knees | Eriksson on his thwart | made |
| `sit_look` | loop | sits on the ground, looks into the distance | Sophia | made |
| `hug_knees` | loop | sits on the ground hugging the knees | Sophia | made |
| `sit_ground` | loop | sits on the ground, the knees up, the arms on them | not Grandmother (the long skirt's engine limit, below) | made |
| `sit_down` | once | sits down onto a low seat behind and ends seated (`go('sit_down', {to: SEAT, turn})`, then a seated loop) | anyone (Grandmother: the stone, the stump, the bed's edge, the step, the bench) | to make |
| `sit_heavy` | once | sits down heavily, all at once, onto a low seat (dizzy) | Grandmother | to make |
| `rise` | once | gets up from a low seat and ends standing | anyone | to make |
| `rise_slow` | once | an old woman gets up slowly from a low seat, a hand pushing on what is beside her (`<id>_reach` to the rail, the trunk, the rock, the bed's edge) | Grandmother | to make |
| `try_rise` | once | tries to get up from a low seat, cannot, sinks back seated | Grandmother | to make |
| `sit_floor` | once | sits down on the floor / the ground, ends sitting with the knees up (then `hug_knees`, `sit_look`, `sit_threshold`) | Sophia; Grandmother only where the skirt is hidden | to make |
| `get_up` | once | gets up from sitting on the ground and ends standing | Sophia | to make |
| `crouch` | loop | crouched low, the hands working at the ground before her (the hole, the moss, the animals, the bottom drawer, laying stones) | Sophia, Papa | to make |
| `kneel` | loop | kneels upright on the ground | Sophia | to make |
| `kneel_rise` | once | gets up from kneeling, ends standing | Sophia | to make |
| `kneel_pray` | loop | kneels, the hands together before the chest, the head bowed | Sophia («Господи, пусть что-нибудь случится») | to make |
| `tie` | loop | kneeling, ties a knot low before her with both hands (the tent's peg) | Sophia | to make |
| `pet` | loop | bent over low before her, stroking with the right hand (the sitting cat, a bed) | Sophia | to make |
| `put_down` | once | bends down and sets something on the ground before her, straightens (`set_down`, `stoop`) | anyone | to make |
| `pick_up` | once | bends down and picks something up from the ground, straightens | anyone | to make |
| `put_table` | once | sets something down on a table before her | anyone | to make |
| `dizzy` | loop | seated, bent forward, the head down to the knees, the hands on them | Grandmother | to make |
| `sway` | loop | stands swaying, about to fall, a hand out (the ground swims); played once (`loop: false`) — one sway | Grandmother | to make |
| `catch_breath` | once | standing, stops and catches her breath, a hand at the chest | Grandmother | to make |
| `carve` | loop | seated, whittles a small piece of wood held in the left hand with a knife in the right, before the chest | Grandmother | to make |
| `smoke` | loop | seated, smoking: the right hand to the mouth and down to the knee now and then | Grandmother | to make |
| `strike` | once | seated, strikes a match and holds it up to a cigarette at the mouth | Grandmother | to make |
| `put_out` | once | seated, leans to the side and stubs a cigarette out on the stone beside her | Grandmother | to make |
| `pat_pocket` | once | standing, pats the pocket of the dress at the hip | Grandmother | to make |
| `pull_away` | once | standing, pulls her arm away from someone at her side (her right) | Grandmother («Don't lead me like a cow») | to make |
| `untangle` | loop | seated, working a tangle in a net on the knees with both hands | Grandmother | to make |
| `throw` | once | seated, throws a small pebble forward underhand with the right hand | Grandmother, Sophia | to make |
| `hold_rail` | loop | stands holding a rail before her with both hands in a wind, leaning into it | Grandmother | to make |
| `hold_lantern` | loop | stands holding the lantern out before her, chest high, in the left hand | Grandmother, Papa | to make |
| `raise_lamp` | once | lifts something held in both hands up before her to the head's height and holds it there (the lamp at the window) | Grandmother | to make |
| `hold_pole` | loop | stands holding an upright pole before her with both hands | Grandmother | to make |
| `step_down` | once | steps down carefully off a ledge, lower by about a knee's height, and stands (the water hides the legs) | Grandmother | to make |
| `knock` | once | standing, knocks three times on something before her at the chest's height | Grandmother | to make |
| `drape` | once | lays something (a shawl, a blanket, a jacket) round the shoulders of someone before her, with both hands | anyone | to make |
| `shawl` | once | draws a shawl round her own shoulders with both hands | Grandmother | to make |
| `cardigan` | once | puts on a cardigan | Grandmother | to make |
| `cough` | once | coughs, a hand to the mouth | Grandmother | to make |
| `armchair` | loop | sits back in an armchair, the arms on its arms | Grandmother | to make |
| `doze` | loop | sits asleep in an armchair, the head sunk to the side | Grandmother | to make |
| `lie_bed` | loop | lies on the back, breathing (bed, cot) — `<id>_on` a point of the bed, `turn` the way the feet point | anyone | to make |
| `lie_side` | loop | lies on the side, the knees drawn up, the hands under the cheek (turned to the wall: Papa's `lie_wall`) | anyone | to make |
| `sit_bed` | loop | sits up in bed, the legs out straight before her under the blanket | Grandmother, Sophia | to make |
| `half_up` | loop | half up on an elbow in bed, the other hand held up | Sophia | to make |
| `kneel_bed` | loop | kneels on a bed | Sophia | to make |
| `sit_up` | once | from lying on the back sits up in bed | anyone | to make |
| `lie_down` | once | from sitting in bed lies down on the back | anyone | to make |
| `get_up_bed` | once | from sitting in bed swings the legs off and stands up beside it (Papa off his cot too) | anyone | to make |
| `kneel_up` | once | from sitting in bed gets onto the knees on it | Sophia | to make |
| `sigh` | once | lying, a long breath out | anyone | to make |
| `sit_threshold` | loop | sits on the floor, the back against the jamb, the knees up | Sophia | to make |
| `write` | loop | seated at a table, writing with the right hand | Papa | to make |
| `eat` | loop | seated at a table, eating with a spoon (`chew`) | anyone | to make |
| `row` | loop | seated, rowing with two oars | Eriksson, Sophia | to make |
| `splash` | loop | stands in water to the chest, laughing, slapping the water with both hands | Sophia (the sea hides her below it) | to make |
| `stamp` | once | a child stamps a foot in anger | Sophia | to make |
| `kick` | once | kicks lightly at the ground (the moss, the threshold) | Sophia | to make |
| `hit_knee` | once | seated on the ground, hits her own knee with her fist | Sophia | to make |
| `fists` | loop | stands, the fists clenched at her sides | Sophia | to make |
| `count` | loop | seated on the ground, counting on her fingers aloud | Sophia | to make |
| `nose_moss` | loop | lies on the belly, the face down close to the ground, looking | Sophia | to make |
| `cry` | loop | seated, crying, the hands to the face | Sophia | to make |
| `whisper` | loop | seated, leaning to the side, whispering | Sophia | to make |
| `talk_sitting` | loop | seated, talking, the hands moving | Sophia | to make |
| `wave` | once | waves up with the right hand | Sophia | to make |
| `shove` | once | standing, shoves something before her away with both hands (the chair) | Grandmother | to make |
| `lean_over` | loop | stands at an edge bent forward, looking down over it (the water) | Sophia | to make |
| `shake` | once | seated, shakes someone's hands off hers with a jerk of both arms | Sophia (off the oars) | to make |
| `fold_hands` | once | seated, folds her hands together before the chest — and lowers them to the lap | Sophia | to make |
| `drink` | loop | seated, drinking from a mug in the right hand now and then | Papa | to make |
| `untangle_fast` | loop | seated, working a tangle in a net on the knees with both hands, quickly | Papa | to make |
| `kneeling` | loop | = `kneel` (the same motion under the shore's name) | Sophia | to make |
| `rise_floor` | once | = `get_up` (the same motion under the sea's name) | Sophia | to make |
| `make_bed` | once | smooths a blanket before her with both hands | Sophia | to make |
| `sniff` | once | bends to smell something small held up in the hand | Sophia | to make |
| `blow` | once | blows out a candle held before her | Sophia | to make |

Asked by other names (use these): `sit_bed` *as sitting down onto the bed's edge* (new house) — `sit_down` (then
`sit_stone` on the bed's edge; `sit_bed` is sitting up *in* bed); `sit_cot` — `seated` on the cot; `lie_cot` —
`lie_bed`; `lie_wall` — `lie_side`; `get_up_cot` — `get_up_bed`; `chew` — `eat`; `set_down`, `stoop` — `put_down`;
`lay_stones` — `crouch`; `lead_arm` — not a motion: `lead_walk` (Papa) and `old_walk` (her), both `_reach` hand to
hand; `carry` — `carry_walk`; `step` on the porch — `sit_down` / `sit_stone` on the step.

Not motions (the engine's reach, look, carrying): a palm on a trunk, a gunwale, the canvas, the rail; hand in hand;
Sophia holding Grandmother's skirt (`sophia_reach {"r": "grandma#hips"}`); Papa's hand under her arm
(`papa_reach {"l": "grandma#elbow_r"}`); Sophia pressed against
someone (`lean`) — a seated loop and a look; moving along a bed seated (`shift`) — a seated loop and
`walk(points, {steps: false})`; giving and taking a thing — both `_reach`, the part moved from one `_with` to the
other's.

Not possible: **Grandmother sitting on the ground with the knees up** — the engine's cloth (Checked, below). In the
tent she sits on a stone or the bed of the tent is a low seat (`sit_stone`); in the forest on the stump.

## Parts (`<id>_with`: added to the look's own — `["lantern"]`; `null` — none again)

In the right hand unless said. A part's point is `"<id>#<point>"` (for `look`, `reach`, a light's `at`, the camera).

| part | what | points | status |
| --- | --- | --- | --- |
| `mug` | an enamel mug held in both hands before the chest | `mug` | made |
| `lantern` | the small storm lantern with its candle, hanging by its bail in the **left** hand, burning (its globe glows) — Grandmother's, Papa's in «law» | `flame`, `globe` | to make |
| `big_lantern` | Papa's big paraffin storm lantern, hanging by its bail in the right hand, burning | `flame`, `globe` | to make |
| `candle` | a lit candle in a holder, in the right hand before the chest | `flame` | to make |
| `knife` | Grandmother's clasp knife, open, in the right hand | `blade` | to make |
| `driftwood` | a piece of grey driftwood in the left hand (what she carves) | `wood` | to make |
| `chip` | = `driftwood` (the shore's name: a chip she carves a bird from) | `wood` | to make |
| `seal` | the little wooden seal she carved, in the right hand | `seal` | to make |
| `bird` | a dead bird held by two fingers of the right hand | `bird` | to make |
| `pillowcase` | the bird wrapped in a pillowcase, in both hands | `bundle` | to make |
| `pouch` | Grandmother's tobacco pouch, in the left hand | `pouch` | to make |
| `packet` | a packet of cigarettes, in the left hand (`pack` in the new house's notes) | `packet` | to make |
| `cigarette` | a lit cigarette between the right hand's fingers (thin smoke from its ember) | `ember` | to make |
| `match` | a lit match in the right hand (its flame glows) | `flame` | to make |
| `pebble` | a small grey pebble in the right hand | `pebble` | to make |
| `parcel` | a parcel in brown paper tied with string, in both hands before the chest | `parcel`, `string` | to make |
| `bundle` | Papa's bundle of belongings, on the right shoulder | `bundle` | to make |
| `drops` | a little brown bottle in the right hand | `bottle` | to make |
| `list` | a sheet of paper in the left hand, a pencil in the right (Papa's list) | `page` | to make |
| `net` | a heap of tangled net on the knees between the hands (seated) | `net` | to make |
| `blanket_fold` | a folded blanket carried in both arms | `blanket` | to make |
| `blanket` | a blanket wrapped round the shoulders and the trunk (sitting or standing) | — | to make |
| `blanket_round` | one blanket round two sitting side by side: the half of it on this one, open toward the other (each of the two `_with` it) | — | to make |
| `shawl` | Grandmother's grey shawl round the shoulders of someone else (Sophia: to her knees) | — | to make |
| `jacket` | Papa's dark jacket over the shoulders (on Grandmother, the sleeves hanging empty) | — | to make |
| `cardigan` | a knitted grey-brown cardigan, worn | — | to make |
| `hat` | the straw hat held by its brim in the right hand (worn — `sophia_wear: {"hat": "straw"}`, above) | `hat` | to make |
| `shell` | a white shell in the right hand | `shell` | to make |
| `basket` | the lidded wicker basket hanging from the right hand by its handle (the cat in it) | `basket` | to make |

**A lantern, a candle, a match, a cigarette in the hand** are lit by the scene's light at the part's point:
`{"id": "…", "at": "grandma#flame", "on": "<key>"}` — the point of the part the person has with them now (the
scene's own standing lantern `here: false` meanwhile); the cigarette's smoke is the scene's, at `"grandma#ember"`.
Out is no part: the light's `on` goes off and the part goes (`_with` without it).

**A thing from shoulders to shoulders** (the shawl, the jacket, the blanket, the hat; the shore's `plaid` is `blanket`): the giver's `drape` (or a
hand's `_reach` for the hat), and at its end the thing changes figures — the giver's `_with`/`_wear` without it, the
other's with it.

## Close-ups

The module `closeups` (`closeups.md`): hands and small things close — `teeth`, `stems`, `knife`, `match`,
`gunwale`, `knot`, `tremble`, `gap`, `breast`, `sleeve`, `string`, `palm`, `oars`, `rail`.

## Checked (2026-10-28, GPU, `sheets/sb-cape/trial*.json` beside the world's clones)

- Seated on a stone (`sit_stone`) the long dress reads: it falls from the lap over the knees to the ground.
- **Seated on the ground with the knees up (`sit_ground`) it does not**: seen from the front the skirt is a flat stiff
  sheet stretched from knee to knee, its hem in the air above the shins (any flare, pleats, with or without the shawl)
  — the engine's cloth (`people/cloth.js`), reported. Until it is mended Grandmother sits on a stone, not on the ground.
