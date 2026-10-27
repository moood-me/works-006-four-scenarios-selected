# cast — the people of “Moominpappa at Sea”

A module for scenes with people (elements with `person`: `{"cast": "cast", "who": …}`). In the scene's `modules`.
6 looks, 3 motions. A part's lengths are a man's metres times `F.fit.h` (the height as a share of 1.76 m).

## Names for stage 5 (the scenes write by them; being made — a name here is its contract)

Motions (`<id>_do`, `go`, or a gait `<id>_gait`). *once* — done once, ends where it says; *loop* — on the spot.
Everyone's (Papa, Mama, the son, My, the Fisherman) unless said; the Groke's are hers.

| id | kind | what |
| --- | --- | --- |
| `stroll` | gait | walks slowly, hands behind the back (Papa in the garden) |
| `carry_walk` | gait | walks with something held in both arms before the chest (a bundle, the blanket, the pie, the bread, the can, the pot, a stone) |
| `carry_high` | gait | walks with an armful held up over the head (the weed), unsteady |
| `hand_walk` | gait | walks with something hanging in the right hand (the basket, the can, the lantern at the side) |
| `lantern_walk` | gait | walks holding the lantern out before him in the right hand, at the chest |
| `run` | gait | runs |
| `back_away` | gait | steps backwards slowly, facing as before (the son backing from the Groke) |
| `glide` | gait | the Groke: a slow heavy shuffle (her feet unseen under the cloak) — also into the sea |
| `hold` | loop | stands holding something in both arms before the chest (as `carry_walk`) |
| `hold_high` | loop | stands holding an armful over the head |
| `hold_lantern` | loop | stands holding the lantern out before him, right hand, chest high (М5в, 3.6) |
| `hold_lantern_side` | loop | stands holding the lantern up beside him at the wall, slanting its light along it (М5а, М5г) |
| `sit_down` / `rise` | once | sits down onto a seat (`<id>_on` [across, distance, top]) and ends seated / gets up from it and ends standing |
| `seated` | loop | sits at rest (exists) |
| `rise_half` | once | seated, half rises with the hands on the table, and sits back (П.5 supper) |
| `sit_floor` / `rise_floor` | once | sits down on the ground / gets up from it (the Groke too) |
| `sit_look` | loop | sits on the ground, looks into the distance (exists; the Groke facing the lighthouse) |
| `huddle` | loop | sits on the ground hugging the knees |
| `doze` | loop | sits asleep, the head sunk on the chest (Mama on the bundle, Mama in the boat) |
| `wake` | once | seated asleep, lifts the head and wakes, ends seated |
| `doze_table` | loop | sits asleep at the table, the head on the arms on it |
| `doze_floor` | loop | sits on the floor against the wall, asleep, the head down |
| `lie` | loop | lies on the back, breathing (the cot, the bench, the floor — `<id>_on` a point of it) |
| `lie_side` | loop | lies on the side (Mama facing the wall) |
| `crouch` / `crouch_rise` | once | crouches down and stays crouched / stands up from it |
| `crouched` | loop | crouched, working with both hands at the ground (weed, stones in the ring, the water, the caulking, the mooring) |
| `put_down` | once | bends and sets something down on the ground, straightens |
| `pick_up` | once | bends and picks something up from the ground, straightens |
| `put_table` | once | sets something down on a table or a shelf at waist height |
| `give` / `take` | once | holds something out before him / takes what is held out |
| `seated_push` | once | seated at the table, pushes something across it with the right hand |
| `steer` | loop | seated, the right hand on the tiller beside him |
| `seated_hold` | loop | seated, holding something out before him with both hands (the son with the lantern on the stern) |
| `seated_rub` | loop | seated, rubbing another's paws between both hands |
| `rub_paws` | loop | standing bent, rubbing another's paws between both hands |
| `tuck` | once | bends forward and tucks a blanket round someone before him |
| `lower_rope` | loop | stands at the edge paying a rope out downwards, hand under hand (М4а) |
| `pull_rope` | loop | leans back hauling on a rope, hand over hand (М8 the boat; the sleeve) |
| `lean_door` | loop | leans into a door with the shoulder and both hands, pushing (М6а) |
| `palm_wall` | loop | stands with the right palm flat on the wall at the shoulder (М6б, the gate) |
| `paint` | loop | paints on the wall with a brush in the right hand |
| `write_high` | loop | writes high on the wall with the right hand |
| `seated_write` | loop | seated, writing in a book on the knees |
| `wipe` | loop | wipes in circles with the right hand at the chest (the lenses) |
| `strike` | once | strikes a match on its box and holds it up |
| `stir` | loop | stirs a pan on the stove with the right hand |
| `sew` | loop | seated, sewing: the needle drawn up and out |
| `thread` | loop | seated, threading a needle held close before the eyes |
| `mend_net` | loop | seated, working a net on the knees with both hands |
| `eat` | loop | seated, eating from the right hand |
| `wring` | loop | seated, wringing out a wet cloth (her sleeve) |
| `shake_lantern` | once | lifts the lantern to the ear and shakes it |
| `rub_eyes` | once | rubs the eyes with the back of the paw |
| `startle` | once | a start, both paws to the chest (Mama drops the cup) |
| `shout` | once | shouts at the sea, the arms flung out |
| `lift_hand` | once | raises the right hand after someone and keeps it up |
| `sway` | loop | the Groke: stands over the light swaying from side to side |
| `reach_toward` | once | the Groke: lifts both arms toward something before her and keeps them out (the beam) |

Not motions: moving along the thwart seated — a seated loop and `walk(points, {steps: false})`; looking back, down, at
someone — `<id>_look`; a paw on the son's shoulder — `<id>_reach` `{"r": "troll#shoulder_l"}`; the Groke's howl —
sitting, her `_look` up and her `_mood`.

Parts (`<id>_with`: added to the look's own — `["lantern"]`; `null` — none again). In the right hand unless said.

| id | what | points |
| --- | --- | --- |
| `lantern` | the family's storm lantern, burning (its globe glows) | `flame`, `globe` |
| `lantern_low` | the same, turned low | `flame`, `globe` |
| `lantern_out` | the same, out, the globe sooty | `flame`, `globe` |
| `lantern_frost` | the same, out and white with rime | `flame`, `globe` |
| `ladle` | Papa's ladle (М1) | `ladle` |
| `spoon` | the son's spoon | — |
| `bundle` | a bundle of blankets in both arms | `bundle` |
| `basket` | Mama's basket hanging in the hand | `basket` |
| `basket_weed` | the same, full of seaweed | `basket` |
| `can` | the paraffin can | `can` |
| `pie` | Mama's pie in its tin, both hands before the chest | `pie` |
| `bread` | a loaf, both hands | `bread` |
| `blanket` | a folded blanket in both arms | `blanket` |
| `blanket_wrap` | a blanket round the shoulders (sitting or standing; Mama asleep in the boat, the son at dawn) | — |
| `armful` | an armful of seaweed held over the head | `armful` |
| `rope` | the coil in the left hand, the line from the right down to its lead weight | `coil`, `lead` |
| `stone` | a round stone in both paws | `stone` |
| `brush` | Mama's brush | `tip` |
| `sewing` | the needle in the right, the cloth in the left | `needle` |
| `pencil` | Papa's pencil | `tip` |
| `book` | Papa's book in the left hand, the pencil in the right | `page` |
| `match` | a lit match (it glows) | `flame` |
| `matchbox` | Papa's matchbox | `matchbox` |
| `cup` | a cup | `cup` |
| `key` | the lighthouse key (My) | `key` |
| `pot` | the oil pot wrapped in the frock coat, both arms | `pot` |
| `rag` | a rag (the lenses) | — |
| `net_shoulder` | the Fisherman's net folded over his left shoulder (the finals, `folded`) | `net` |
| `netload` | the Fisherman's net in his hands (his look's own) | — |
| `rime_paws` | the son: rime on the paws to the wrists | — |
| `rime_arms` | the son: rime up the arms to the elbows (`beside:white`) | — |

A lantern in a hand lights by the scene's light at its flame: `{"id": "…", "at": "troll#flame", "on": "<key>"}` (the
point of the part he has with him; the scene's standing lantern `here: false` meanwhile). Its state (lit, low, out,
rime) is which part — a part reads no keys.

Looks for a while (`<id>_wear` = the look's **object**, `scene.kit.cast.characters.troll_blush`, not its name):
`troll_blush` — the son blushing (pink on his cheeks; «краснеет»).

Close-ups — the module `closeups` (`closeups.md`): the shots `knot`, `needle`, `handle`, `match`, `matchbox`,
`mooring`, `paws`; the element's id is the shot's name (its points `knot#thread` …), opened by the key
`<shot>_open` 0…1.

## Style

`moomin` — made from the engine's `soft`: round shapes, a head as big as a Moomin's (2.45 of a man's), hardly a neck,
short chubby limbs, a pear-shaped body, a fine tinted ink line, colours and shade under the scene's light. The face
`moomin`: a long round snout out of the head's front, small dark eyes close together high on it, fine brows, the mouth
under the snout's end, small ears on the crown (none under a hat). It takes `<id>_mood` (neutral, smile, laugh, sad,
angry, surprised, afraid, disgusted, thinking, tired).

## Who

- `papa` — Moominpappa: the tallest (0.72 of a man), his black top hat (`tophat`), a tail.
- `mama` — Moominmamma: a little shorter and rounder, her apron (one quiet red; Jansson's is striped), a tail. Her
  handbag is the scene's own thing, beside her.
- `troll` — Moomintroll, the son: smaller (0.6), slighter, a tail.
- `my` — Little My: tiny (0.4), in her own style `my` (from `moomin`: a big round head, thin limbs), her own face `my`
  (round dark eyes set wide, sharp brows, a mouth that smirks to one side — it takes `<id>_mood` as the Moomins'),
  orange hair in a tall `topknot`, a red `bell` dress from the shoulders, bare arms and legs.

- `fisher` — the Fisherman: thin and long, taller than Papa (0.8 of a man), in his own style `fisher` (from `moomin`:
  a smaller long head on a thin neck, long thin limbs, a narrow body), his own face `fisher` (small dark eyes under
  heavy grey brows, a long drooping nose, a thin mouth, grey stubble under the jaw — it takes `<id>_mood`), a faded
  oilskin to below the knees, ragged at the hem (`oilcoat`), an ochre sou'wester (`souwester`), his net (`netload`).

- `groke` — the Groke (Морра): big and round (0.94 of a man tall, much the widest), in her own style `groke` (from
  `moomin`: a big wide head sunk into the shoulders, no neck, short legs, thick arms, a body widening down to a mound),
  her own face `groke` (big pale round eyes bulging, a small dark pupil in each, heavy sagging brows, a broad round
  nose, a wide mouth drawn down — it takes `<id>_mood`), grey-blue all over; her cloak `groke` falls from the shoulders
  to the ground (no feet seen) over a frost-white layer a little longer and wider: the cold white edge at the hem and
  between its tatters. The frost she leaves on the ground is the scene's, not hers.

## Parts

`tail` — out of the back of the seat, hanging, swinging a little late, a tuft at its end (every Moomin's look has it).
`netload` — the Fisherman's net: a bundle of it between his hands, the rest falling to the ground before his feet,
cork floats along it.

## Motions (Kimodo's, taken from the Scarlet Sails cast)

Standing: `hands_behind` (hands behind the back, a loop). Sitting on a seat (the hips over it — `<id>_on`
`[across, distance, top]`): `seated` (sits at rest, a loop). On the ground: `sit_look` (sits on the ground, looks into the
distance, a loop).
