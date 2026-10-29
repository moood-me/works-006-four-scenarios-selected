# 2026-10-29 — «Рыбак и его душа»: stage 5's motions

The 52 new motions of the contract (`docs/new-games/rybak-i-dusha/game.md`, branch `r3/rybak-s5`, «Stage 5 — pieces»,
«New motions») made by Kimodo on the local studio, each looked at (`look_at_motion`, front and side, eight moments) and
put into `worlds/the-fisherman-and-his-soul/modules/cast.data.json` with `put_motion` (branch `r3/rybak-motions`, one
commit a motion). Names exactly as the contract's. What each one is, as seen: `modules/cast.md`, «Stage 5's motions».

How: one `make_motion` at a time (the Space shared); loops asked as a chain of the same prompt (so the action goes on
the whole clip); a prompt that gave the wrong thing was reworded in the data's words (BONES-SEED descriptions — the
studio's `search_descriptions` is empty on this stack, so `timelines.jsonl` was searched locally) and made again —
up to five takes. Looked at on the default body, the new people's on their own looks (girl, widow, beggar,
musician_a: shapes, the engine's `flat` for the world's `bay`).

## Kept (take, prompt, seconds, key)

| name | take | prompt(s) | s | key |
| --- | --- | --- | --- | --- |
| `haul_net` | 1 | A person standing in a boat pulls a heavy rope toward them hand over hand, leaning back | 2+2 | `16f0a2142bf4` |
| `struggle` | 3 | A person flails both arms wildly and twists the upper body left and right, trying to break free | 1.5+1.5 | `81a28e8fd47c` |
| `laugh` | 1 | A person is laughing hard, throwing the head back, shoulders shaking | 2+2 | `37e32a536653` |
| `sign` | 2 | A person raises their right hand and touches their forehead with the right palm / A person lays their right palm flat on the chest over the heart and holds it there | 1.5+1.5 | `c9f26c819219` |
| `rise_sharp` | 1 | A seated person stands up abruptly from a bench, pushing it back | 2 | `52df94ff2925` |
| `point_away` | 2 | An angry person raises the right arm and points forward with the right hand, holding the arm out straight | 3 | `5149c905abf8` |
| `dance_light` | 3 | A woman dances lightly in place, stepping from foot to foot with the arms out to the sides | 2+2 | `fc59df92b14d` |
| `clap` | 1 | A standing person is clapping their hands in rhythm repeatedly | 3 | `f5e2e6ce59ea` |
| `whisper` | 2 | A person standing upright leans to their left and holds the right hand beside the mouth, telling a secret | 2+2 | `689cdb64b64f` |
| `clumsy_dance` | 2 | A drunk person dances clumsily, taking two steps and stumbling, arms out for balance / A person laughs, shoulders shaking | 2+1.5 | `9d1ff334bb30` |
| `look_back` | 1 | A walking person stops, turns the head and shoulders to look back over the right shoulder, then turns forward again | 3 | `72e9885b301e` |
| `swing_feet` | 4 | A seated child happily kicks both feet back and forth repeatedly | 2+2 | `364e364d4352` |
| `dance_tambourine` | 2 | A woman dances in place, turning slowly, the left hand held up high and the right hand tapping it | 2+2 | `5fcea34667de` |
| `dance_round` | 1 | A man dances in place, stepping side to side with the arms raised | 2+2 | `773096bb3e49` |
| `pull_hands` | 2 | A person holding something in front of them at waist height with both hands walks backward, pulling it toward them | 3 | `beee9f38b4b7` |
| `pant` | 1 | A tired person stands bent forward with the hands on the knees, breathing hard | 2+2 | `07473ef998c1` |
| `throw_down` | 2 | An angry person throws a small object down onto the floor in front of them with the right hand | 2 | `bda887647649` |
| `hold_out` | 2 | A person standing upright holds out a small object with both hands at chest height in front of them, offering it | 1.5+1.5 | `7b0cabf767c5` |
| `kneel` | 1 | A person kneeling on the floor stays upright, the hands resting on the thighs | 2.5+2.5 | `fa01733154b5` |
| `bend_over` | 2 | A person kneeling on the floor slowly bends forward low over something lying on the floor in front of them | 4 | `494af696697b` |
| `cut_shadow` | 3 | A crouching person slowly draws a line on the floor in front of their feet with the right hand | 2+2 | `c9eb0344dac1` |
| `stab_post` | 4 | A person thrusts the right hand forward at chest height and holds it there | 2 | `9eb28c8ba487` |
| `pull_knife` | 2 | A person standing upright grabs something at chest height in front of them with the right hand and pulls it back toward their body | 2 | `7012fa54bda5` |
| `rise_ground` | 1 | A person lying flat on their back on the ground slowly gets up to standing | 5 | `1a279fa2b9ae` |
| `plead` | 2 | A person begs, holding both open hands out in front of them at waist height, palms up | 2+2 | `d91015c68bf5` |
| `sit_edge` | 2 | A seated person sits still, leaning forward a little, the hands resting on the seat beside the hips | 3+3 | `1f5399800824` |
| `call_out` | 1 | A person stands cupping both hands around the mouth and calls out | 2+2 | `0a9c47ab1b65` |
| `hang_lantern` | 1 | A person reaches up and hangs a small object on a hook at head height with the right hand | 3 | `18a18f474136` |
| `weave` | 1 | A person kneeling on the floor weaves thin rods together with both hands | 2.5+2.5 | `f897cae3103f` |
| `sit_ground` | 1 | A person sits on the ground, knees drawn up, the arms around them | 3+3 | `86070370e194` |
| `drag_back` | 2 | A bent person walks backward slowly, pulling a big, heavy object along the floor with both hands low in front of them | 2+2 | `9c5bf55ff1d6` |
| `lie_still` | 1 | A person lies still on their back on the ground | 3+3 | `bd792856603e` |
| `fall_beside` | 2 | An exhausted person drops to their knees / A kneeling person lies down on their side on the floor | 1.5+2.5 | `969848b5d56c` |
| `bless` | 1 | A priest raises the right hand and makes a wide slow sign of blessing in the air | 4 | `c2ae534ffea9` |
| `throw_far` | 1 | A person throws a small object far with the right arm, overhand | 2 | `3c004c563c16` |
| `preach` | 1 | A priest stands speaking to a crowd, gesturing slowly with open hands | 2.5+2.5 | `94b71f06072a` |
| `sing` | 1 | A seated person sways gently from side to side, the hands in the lap | 2.5+2.5 | `2e0498ffd2c7` |
| `hide_face` | 1 | A seated person bows the head and covers the face with both hands | 2+2 | `049c5d00127c` |
| `lie_bench` | 1 | A person lies asleep on their side | 3+3 | `bc1cb3c368e3` |
| `sleep_floor` | 2 | A childlike person lies curled up on their side on the floor, asleep, not moving | 4 | `9d79cdd979de` |
| `search` | 2 | A person searches a shelf at chest height in front of them, moving objects aside with both hands | 2+2 | `8f3552e2132e` |
| `wrist_behind` | 2 | A person puts both hands behind their back, the left hand holding the right wrist | 3 | `41d87c56a1f8` |
| `shrug` | 2 | A person shrugs their shoulders and subtly sways their hands while standing straight | 2 | `70a1ff21a17a` |
| `hands_under` | 1 | A seated person sits with both hands tucked under the thighs | 2.5+2.5 | `66f4ae9d282b` |
| `sleep_wall` | 3 | An old person sits on the floor with the back against a wall and the knees bent, the head hanging down, sleeping | 3+3 | `53da79bf6f70` |
| `lay_down` | 1 | A person bends down and places a small object on the ground in front of them | 3 | `4bca2d77f541` |
| `knot_net` | 1 | A seated childlike person knots a net in their lap with both hands | 2.5+2.5 | `5a5d59099d5c` |
| `run` | 1 | A person runs forward at a steady pace | 2+2 | `660ead3e2a61` |
| `shield` | 2 | A scared woman stretches both arms out behind her to the sides, protecting someone standing behind her | 3 | `baa968a94044` |
| `play_fiddle` | 2 | A person plays a violin slowly with their right hand, holding it with the left hand | 2+2 | `430b814c2d8a` |
| `play_pipe` | 1 | A person plays a small pipe held in both hands in front of the mouth | 2+2 | `61702f0b728a` |
| `wade` | 1 | A person walks forward slowly through waist-deep water, pushing with the arms | 2+2 | `e94f39aaf92a` |

`bend_over` goes on from `kneel` (`after`: its last 5 frames). `stab_post` holds a right-hand constraint: `pull_knife`'s
hand at its frame 27, at frames 30 and 45.

## Judged (every take)

- haul_net OK: hand over hand pull, knees bent, leaning back
- struggle WEAK: hunched, small twisting, not thrashing -> remake
- laugh OK: head back, then doubled over, back up
- sign WRONG: reaches out, then hand at chin/throat; never forehead, never heart -> remake as chain
- rise_sharp OK: seated, leans, stands up quickly
- point_away WRONG: right arm sweeps down, no pointing -> remake
- dance_light WEAK: one arm out, then just stands -> remake
- clap OK: claps at chest steadily
- whisper WRONG: bent forward, hand at the mouth like coughing -> remake
- clumsy_dance WRONG: stands laughing, holding the belly; no steps -> remake as chain
- look_back OK: walks, stops, turns the shoulders back, faces forward again
- swing_feet WRONG: sits on the ground hugging the knees (kept as a candidate for sit_ground) -> remake
- dance_tambourine WEAK: a lively dance with turning and arms, no beat of the left hand -> remake (this one fallback)
- dance_round OK: arms raised overhead, knees bending side to side
- pull_hands WRONG: walks backward with the arms up in the air -> remake
- pant OK: bent, hands on the knees, head heaving
- throw_down WRONG: hands to the head, then crouches and sets something down -> remake
- hold_out WEAK: arms straight out at shoulder height in a wide lunge stance -> remake
- kneel OK: kneels upright-ish, hands on the thighs (a little hunched)
- bend_over WRONG: already prostrate from the first frame, no bending -> remake going on from kneel
- cut_shadow WRONG: a fighting stance -> remake as a chain
- stab_post WEAK: a boxer's guard and jabs -> remake
- pull_knife WRONG: the same boxer's guard -> remake
- rise_ground OK: lies flat, sits up, crouches, stands — clean
- plead WEAK: both arms up overhead, bowing (worship, not plea) -> remake
- sit_edge WRONG: squats with the arms out -> remake as a seated loop (on a seat with _on, the legs hang)
- call_out OK: cups both hands at the mouth, leans forward calling (lowers them near the end: the loop takes the middle)
- hang_lantern OK: right hand up at head height in front, holds, lowers
- weave OK (near): kneeling, bent low, the hands working on the ground before the knees
- sit_ground OK: sits on the ground, knees up, the arms round them
- drag_back WEAK: walks backward upright, the hands at the waist; no weight -> remake
- lie_still OK: on the back, still
- fall_beside WRONG: starts on all fours and falls face down -> remake as a chain
- bless OK: the right hand raised, slow wide strokes in the air, lowered
- throw_far OK: wind-up, the right arm overhand high, follow-through
- preach OK: open hands at chest height, slow gestures, a little stooped
- sing OK (quiet): seated, hands on the thighs, the head and shoulders barely sway (no singing: Kimodo has none)
- hide_face OK (near): kneeling (not seated), bows and covers the face with both hands; lifts it at the very end (the loop takes the middle)
- lie_bench OK: lies curled on the side, still
- sleep_floor WEAK: curled on the side, then rolls over halfway -> remake
- search WEAK: bends to a low place, hands moving, sways a lot -> remake (a shelf at chest height)
- wrist_behind WRONG: holds the right wrist in front of the belly, never behind -> remake
- shrug WEAK: hardly seen, a head tilt -> remake
- hands_under OK (near): seated, the hands together low in the lap between the thighs
- sleep_wall WRONG: sits with the arms over the head (hiding, not asleep) -> remake
- lay_down OK: bends, crouches, sets something down, stands
- knot_net OK: seated, the hands working together in the lap
- run OK: a steady run
- shield WEAK: one arm out to the side and forward, not back -> remake
- play_fiddle WRONG SIDE: the right hand at the chin, the left out — mirrored to the cast's fiddle (chin on the left, neck to the left hand) -> remake
- play_pipe OK: both hands together at the mouth, still
- wade OK (near): bent forward, the arms pushing ahead, wide heavy strides (Kimodo has no water; legs hidden by it)

**second takes**

- struggle#2 WEAK: hunched, the hands about the face, small moves -> a third take
- sign#2 OK (near): the right palm to the forehead, then down to the throat/upper chest (not quite the heart)
- point_away#2 OK: the right arm flung forward and up, pointing, held (the head a little bowed)
- dance_light#2 (girl's look) WEAK: steps and turns, then sinks into a crouch -> a third take
- whisper#2 OK (near): leans forward a little, the right hand beside the mouth
- clumsy_dance#2 OK: stumbling steps, arms out, bends, rights himself (the laugh is the face's: _mood)
- swing_feet#2 WRONG: seated, still — no swinging -> a third take
- dance_tambourine#2 OK (near): the left hand held up high all through, the right low, knees bent, swaying (no beat on it)
- pull_hands#2 OK (near): walks backward, the arms out to the sides, palms up (the hands to be reached by the scene)
- throw_down#2 OK (near): bends, the right hand flicks down by the knee, straightens
- hold_out#2 OK (near): both arms held straight out at shoulder height, then drawn back to the chest
- cut_shadow#2 WEAK: crouches, the hands at the face, reaches forward only at the end -> a third take
- stab_post#2 WRONG: a boxer's guard and a jab again (Kimodo reads "stab"/"knife" as fighting) -> a third take
- pull_knife#2 OK: the right arm reaches forward at chest-to-head height, grips, pulls back to the chest
- plead#2 OK: bent forward, both open hands held out palms up
- sit_edge#2 OK (near): seated, the hands resting at the hips on the thighs, leaning a little (on a high seat through _on the legs hang)
- drag_back#2 OK (near): walks backward with the knees bent, leaning back, the hands low in front
- fall_beside#2 WEAK: drops to the knees and folds forward to the ground, not onto the side -> a third take
- sleep_floor#2 OK: curled on the side, still
- search#2 OK (near): bends forward, both hands reaching and moving things low-to-middle in front (not a high shelf)
- wrist_behind#2 OK: both hands go behind the back and stay there
- shrug#2 WEAK but kept: a small lift of the shoulders with a head tilt — hardly seen at a distance
- sleep_wall#2 (beggar's look) WRONG: half lying back on the elbows -> a third take
- shield#2 (widow's look) OK (near): stoops, the arms go out and back behind her
- play_fiddle#2 (musician_a's look) OK (near): the left hand up by the left of the head (the fiddle's neck), the right arm out bowing
- bend_over#2 OK: goes on from kneel (after its last 5 frames); kneeling, bows forward over the ground before the knees, the hands on the thighs

**third takes**

- struggle#3 OK: flails both arms, twists the shoulders, knees bent; settles at the very end
- dance_light#3 (girl's look) OK: arms out, light steps turning, arms lower toward the end
- swing_feet#3 WEAK: one kick of a leg, then sits still -> a fourth take
- cut_shadow#3 OK (near): crouched low, the right hand along the ground before the feet, moving a little (no heel-to-toe line — the scene's cut 0..1 draws it)
- stab_post#3 WRONG: both arms up over the head -> a fourth take with a hand constraint
- fall_beside#3 WRONG: folds forward onto the knees again -> a fourth take
- sleep_wall#3 (beggar's look) OK (near): sits on the ground, the legs out, the head dropped onto the arms over the knees

**fourth takes**

- stab_post#4 OK (near): the right hand thrust forward at chest-to-shoulder height and held there (a right-hand constraint from pull_knife's reach, frames 30 and 45); no knife-fight guard
- fall_beside#4 WRONG: lying on the side from the first frame (no drop) -> a fifth take, going on from kneel
- swing_feet#4 WEAK: kicks a leg up twice in the first half, then sits still -> a fifth take

**fifth takes (stopped here)**

- swing_feet#5 WRONG: seated still, the arms out; one small kick at the start
- fall_beside#5 (after kneel) WRONG: from kneeling folds forward face down, not onto the side
- => put: fall_beside = take 2 (drops to the knees, folds forward to the ground: a collapse, not on the side); swing_feet = take 4 (seated, kicks a leg up twice, then still) — both the nearest, both gaps

## Gaps (the nearest kept; the scene finishes it or takes another)

- `swing_feet` — Kimodo would not swing a seated person's legs (five takes: still, or one or two kicks). Kept: take 4.
- `fall_beside` — would not lie down onto the side from kneeling (folds forward face down, or lies already). Kept: take 2
  (drops to the knees, folds to the ground).
- Near, not exact: `sign` ends at the throat/upper chest, not over the heart; `hide_face` is kneeling, not seated;
  `search` is at waist height, not a shelf; `dance_tambourine` holds the hand up without beating it; `shrug` is small;
  `sing` is a barely swaying seated loop (no singing in the data); `wade` is a heavy bent stride (no water in the data);
  `cut_shadow` has no heel-to-toe stroke (the scene's `cut` draws the line); `stab_post` is a thrust-and-hold, no blow.
