# cast — the people of “Moominpappa at Sea”

A module for scenes with people (elements with `person`: `{"cast": "cast", "who": …}`). In the scene's `modules`.
7 looks, 57 motions, 33 parts. A part's lengths are a man's metres times `F.fit.h` (the height as a share of 1.76 m);
what is carried is in real metres (the same lantern, cup, pie in any paw).

## Style

`moomin` — made from the engine's `soft`: round shapes, a head as big as a Moomin's (2.45 of a man's), hardly a neck,
short chubby limbs, a pear-shaped body, a fine tinted ink line, colours and shade under the scene's light. The face
`moomin`: a long round snout out of the head's front, small dark eyes close together high on it, fine brows, the mouth
under the snout's end, small ears on the crown (none under a hat). It takes `<id>_mood` (neutral, smile, laugh, sad,
angry, surprised, afraid, disgusted, thinking, tired). `moomin_blush` — the same, a pink flush on the cheeks of the
snout.

## Who

- `papa` — Moominpappa: the tallest (0.72 of a man), his black top hat (`tophat`), a tail.
- `mama` — Moominmamma: a little shorter and rounder, her apron (one quiet red; Jansson's is striped), a tail. Her
  handbag is the scene's own thing, beside her.
- `troll` — Moomintroll, the son: smaller (0.6), slighter, a tail. `troll_blush` — the same, blushing.
- `my` — Little My: tiny (0.4), in her own style `my` (from `moomin`: a big round head, thin limbs), her own face `my`
  (round dark eyes set wide, sharp brows, a mouth that smirks to one side — it takes `<id>_mood` as the Moomins'),
  orange hair in a tall `topknot`, a red `bell` dress from the shoulders, bare arms and legs.
- `fisher` — the Fisherman: thin and long, taller than Papa (0.8 of a man), in his own style `fisher` (from `moomin`:
  a smaller long head on a thin neck, long thin limbs, a narrow body), his own face `fisher` (small dark eyes under
  heavy grey brows, a long drooping nose, a thin mouth, grey stubble under the jaw — it takes `<id>_mood`), a faded
  oilskin to below the knees, ragged at the hem (`oilcoat`), an ochre sou'wester (`souwester`), his net (`netload`).
- `groke` — the Groke (Морра): big and round (much the widest), in her own style `groke` (from `moomin`: a big wide
  head sunk into the shoulders, no neck, short legs, thick arms, a body widening down to a mound), her own face `groke`
  (big pale round eyes bulging, a small dark pupil in each, heavy sagging brows, a broad round nose, a wide mouth drawn
  down — it takes `<id>_mood`), grey-blue all over; her cloak `groke` falls from the shoulders to the ground (no feet
  seen) over a frost-white layer a little longer and wider: the cold white edge at the hem and between its tatters.
  The frost she leaves on the ground is the scene's, not hers.

For a while (`<id>_wear` — fields over the look): the son blushing («краснеет») — `troll_wear: {"face": "moomin_blush"}`
(or the whole look, `scene.kit.cast.characters.troll_blush` — the object, not its name); the Fisherman's hands empty
of his net (the finals' `folded`) — `fisher_wear: {"parts": []}` (`<id>_with` only adds to the look's own parts: an
empty `fisher_with` leaves `netload` on him). A new look is built in the background and put on when whole: on a cut,
say the shot ahead (`s.shot({... troll_wear ...})`).

## Motions (`<id>_do`, `go`, a gait `<id>_gait`)

Made by Kimodo (`make_motion`), looked at on the Moomins' proportions (`look_at_motion`), put with `put_motion`.
*once* — done once, ends where it says; *loop* — on the spot; *gait* — `<id>_gait` (or looped on the spot).

| id | kind | what |
| --- | --- | --- |
| `hands_behind` | loop | stands, hands behind the back |
| `stroll` | gait | walks slowly, hands behind the back (Papa in the garden) |
| `carry_walk` | gait | walks with something in both arms before the chest (a bundle, the blanket, the pie, the bread, the pot, a stone) |
| `carry_high` | gait | walks with an armful up at the head between the paws, unsteady (a Moomin's arms reach no higher: the `armful` sits on his head) |
| `hand_walk` | gait | walks with something hanging in the right paw (the basket, the can), leaning from it |
| `lantern_walk` | gait | walks holding the lantern out before him in the right paw (the son with the lantern: hanging lower it trails at his feet) |
| `run` | gait | runs |
| `back_away` | gait | steps backwards slowly, hunched, facing as before (the son backing from the Groke) |
| `glide` | gait | the Groke: a slow heavy shuffle (her feet unseen under the cloak), into the sea too |
| `hold` | loop | stands holding something in both arms before the chest |
| `hold_high` | loop | stands holding an armful up at the head |
| `hold_lantern` | loop | stands holding the lantern out before him, right paw, chest high (М5в, 3.6) |
| `hold_lantern_side` | loop | stands with the right paw up beside the head, the lantern at the wall (М5а, М5г) |
| `sit_down` | once | sits down low onto a seat (`<id>_on` [across, distance, top]) and ends seated |
| `seated` | loop | sits at rest |
| `rise` | once | gets up from a low seat and ends standing |
| `sit_floor` / `rise_floor` | once | sits down on the ground, the knees drawn up / gets up from there (the Groke too) |
| `sit_look` | loop | sits on the ground, looks into the distance (the Groke facing the lighthouse) |
| `huddle` | loop | sits on the ground hugging the knees, rocking a little |
| `doze` | loop | sits asleep, slumped, the head sunk (Mama on the bundle, in the boat; Papa asleep at the table) |
| `wake` | once | from `doze`'s pose: lifts the head and wakes, ends seated (play it after `doze`) |
| `doze_floor` | loop | sits on the floor leaning back (against a wall), the legs out, asleep |
| `lie` | loop | lies on the back, breathing (the cot, the bench, the floor — `<id>_on` a point of it) |
| `lie_side` | loop | lies on the side asleep, an arm under the head (Mama facing the wall) |
| `crouch` / `crouch_rise` | once | crouches down and stays crouched / stands up from it |
| `crouched` | loop | crouched, working with both paws at the ground (weed, the ring's stones, the water, the caulking, the mooring) |
| `put_down` / `pick_up` | once | bends to the ground and sets something down / picks it up, straightens |
| `put_table` | once | sets something on a table or a shelf before him |
| `give` / `take` | once | holds something out before him / takes what is held out, to the chest |
| `seated_hold` | loop | seated, holding something before the chest in both paws, trembling (the son with the lantern on the stern) |
| `rub_paws` | loop | bent forward, the paws together before him, rubbing (with `<id>_reach` to the other's `#hands`) |
| `tuck` | once | bends forward, tucks a blanket round someone before him, straightens |
| `lower_rope` | loop | bent at the edge, paying a rope out low before him (М4а) |
| `pull_rope` | loop | leaning back, hauling a rope toward him (М8 the boat; pulling the sleeve) |
| `lean_door` | loop | leans into a door with the shoulder and both paws, pushing (М6а) |
| `paint` | loop | paints before him with a brush in the right paw |
| `write_high` | loop | writes on the wall before him, high, with the right paw |
| `seated_write` | loop | seated, leaning forward, writing in a book on the knees |
| `wipe` | loop | wipes in small circles with the right paw (the lenses) |
| `strike` | once | strikes a match and holds it up |
| `stir` | loop | stirs a pan before him with the right paw |
| `sew` | loop | seated, sewing: the needle drawn up and out |
| `thread` | loop | seated, threading a needle held close before the eyes |
| `mend_net` | loop | seated, working a net on the knees with both hands |
| `eat` | loop | seated, eating from the right hand |
| `wring` | loop | seated, wringing out a wet cloth before the chest |
| `shake_lantern` | once | lifts the lantern to the ear and shakes it |
| `rub_eyes` | once | rubs the eyes with both paws |
| `startle` | once | a start, a step back, both paws to the chest (Mama drops the cup) |
| `shout` | once | shouts at the sea, the arms flung out |
| `lift_hand` | once | raises the right hand to the shoulder after someone and keeps it up |
| `sway` | loop | the Groke: stands over the light swaying from side to side |
| `reach_toward` | once | the Groke: lifts both arms toward what is before her (the beam) and keeps them up |

Not made — what to do instead (the model, three tries each, on the Moomins' proportions):

- `rise_half` (П.5, Papa half rises at the supper): it never sat back down after half rising — `rise`, then
  `go('sit_down', {to: seat})`.
- `doze_table` (asleep with the head on the arms on the table): a Moomin's head does not come down to its short arms
  — `doze` at the table.
- `steer`, `seated_push`, `seated_rub`, `palm_wall` — a paw at a thing is the engine's reach, not a motion: `seated`
  with `<id>_reach {"r": "tiller#grip"}` (the tiller); `seated` with the reach to the lantern's point as it slides
  over the table; `seated` with both paws to `"troll#hands"` (the rubbing itself is the close-up `paws`); standing
  with `{"r": "wall_a#gate"}` (the palm on the gate — the motions' palm stayed behind the big head).

Not motions either: moving along the thwart seated — a seated loop and `walk(points, {steps: false})`; looking back,
down, at someone — `<id>_look`; a paw on the son's shoulder — `<id>_reach {"r": "troll#shoulder_l"}`; the Groke's
howl — `sit_look` with her `_look` up and her `_mood`.

## Parts (`<id>_with`: added to the look's own — `["lantern"]`; `null` — none again)

In the right paw unless said. A part's point is `"<id>#<point>"` (for `look`, `reach`, a light's `at`, the camera).

| part | what | points |
| --- | --- | --- |
| `tail` | (every Moomin's look) out of the back of the seat, hanging, swinging a little late, a tuft at its end | — |
| `netload` | (the Fisherman's look) a bundle of his net between his hands, the rest falling to his feet, cork floats | — |
| `lantern` | the family's storm lantern hanging by its bail, burning (its globe glows) | `flame`, `globe` |
| `lantern_low` | the same, turned low (amber) | `flame`, `globe` |
| `lantern_out` | the same, out, the globe sooty | `flame`, `globe` |
| `lantern_frost` | the same, out and white with rime | `flame`, `globe` |
| `ladle` | Papa's ladle (М1) | `ladle` |
| `spoon` | the son's spoon | — |
| `bundle` | a bundle of blankets in both arms, strapped | `bundle` |
| `basket` / `basket_weed` | Mama's wicker basket hanging by its handle / full of seaweed | `basket` |
| `can` | the paraffin can hanging by its handle | `can` |
| `pie` | Mama's pie in its tin, level in both paws | `pie` |
| `bread` | a loaf in both paws | `bread` |
| `blanket` | a folded blanket in both arms | `blanket` |
| `blanket_wrap` | a blanket round the shoulders and the trunk (sitting or standing: Mama asleep in the boat, the son at dawn) | — |
| `armful` | an armful of seaweed on the head between the paws, strands hanging | `armful` |
| `rope` | the coil in the left paw, the line from the right down to its lead | `coil`, `lead` |
| `stone` | a round stone in both paws | `stone` |
| `brush` | Mama's brush, its tip wet red | `tip` |
| `sewing` | the needle in the right, the cloth in the left | `needle` |
| `pencil` | Papa's pencil | `tip` |
| `book` | Papa's book in the left paw, the pencil in the right | `page` |
| `match` | a lit match (its flame glows) | `flame` |
| `matchbox` | Papa's matchbox | `matchbox` |
| `cup` | a cup | `cup` |
| `key` | the lighthouse's iron key (Little My) | `key` |
| `pot` | the oil pot wrapped in the black frock coat, both arms | `pot` |
| `rag` | a rag (the lenses) | — |
| `net_shoulder` | the Fisherman's net rolled over his left shoulder (the finals, `folded`; with `fisher_wear: {"parts": []}`) | `net` |
| `rime_paws` | the son: rime on the paws (`hold:frost`, the morning after) | — |
| `rime_arms` | the son: rime up the arms to the elbows («белый до локтей», `beside:white`) | — |

**A lantern in a paw** is lit by the scene's light at its flame: `{"id": "…", "at": "troll#flame", "on": "<key>"}` —
the point of the part he has with him now (the scene's standing lantern `here: false` meanwhile). Burning, low, out or
rimed is which part (a part reads no keys); the light's `on` goes with it. The lantern hangs about 0.45 m below the paw
(as tall as the standing one): carried, it is held out (`lantern_walk`, `hold_lantern`, `hold_lantern_side`). Held out
in both paws (the son on the stern): `seated_hold` and `<id>_reach {"l": "troll#globe"}`.

**The rime on the son** grows in two steps — `rime_paws`, then `rime_arms` (a part does not grow by a key); thawing,
off again.

## Close-ups

The module `closeups` (`closeups.md`): the paws close — `knot`, `needle`, `handle`, `match`, `matchbox`, `mooring`,
`paws`.

## Checked

Every motion looked at on the Moomins' proportions (`look_at_motion`); the parts and the looks rendered on the GPU in a
trial spec (`sheets/pm-people/people-trial.json` beside the world's clones, not a scene of the world).
