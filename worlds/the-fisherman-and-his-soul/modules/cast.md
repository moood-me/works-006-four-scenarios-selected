# cast — the people of “The Fisherman and His Soul”

A module for scenes with people (elements with `person`: `{"cast": "cast", "who": …}`; people_guide). Its data
(`cast.data.json`, put there with put_motion) holds its motions.

## Style

`bay` — the engine's flat geometry (`flat`): straight edges, plain quiet colours lit by the scene (moon, lantern,
the water's glow), a fine line, a simple face (eyes, brows, a mouth) that reads at a distance.

## Who

- `fisherman` — the young Fisherman: lean, sunburnt, dark short hair, an undyed linen shirt, rolled sea-blue
  trousers, barefoot.
- `soul` — his Soul: the same body and face (the same `body` numbers), in a shadow's colours — slate skin, ink hair,
  dark clothes. The engine draws people opaque: the water does not show through it (wanted: a see-through person).
- `mermaid` — the Mermaid: small and slight, pearl-pale, wet-gold hair to the waist, bare shoulders. Always in the
  water to the chest or the shoulders: the scene stands her lower (`elevation`) so the water plane hides the rest.
- `witch` — the Witch of the well: tall, a long loose fall of red hair, a plain moss-green dress, barefoot.
- `velvet` — the man in black velvet: tall, thin, a pale still face, black hair, all in black (the cast's garment
  `frockcoat`: skirts to the knees).
- `potter` — the potter by the bridge: a widower, broad, greying brown hair, a clay-brown apron over a pale shirt.
- `daughter` — his daughter, six or so: small, a madder-red dress, brown hair to the shoulders.
- `priest` — the Priest (the white house on the hill): an ageing man, upright, grey short hair, a black cassock to the
  ankles (the cast's garment `cassock`).
- `woman_a`, `woman_b` — two women of the village, his flock: one in a slate-blue dress with a kerchief (`hood`), one in
  a brown dress, hair in a bun, a pale shawl (`scarf`).
- `fisherman_old` — the Fisherman years on (the ending «Два огня», scene `deep`): the same man, his hair white. Not a
  person of its own: a scene gives it as his look (`fisherman_wear`: the object `scene.kit.cast.characters.fisherman_old`).
- `girl` — the girl dancing barefoot on the pier at the feast (1.3): fifteen or so, a light linen dress, long brown hair,
  a red ribbon (the cast's part `ribbon`, her look's own).
- `widow` — the widow of the bay (chapter 4): a dark shawl over her head (`hood`), a plain dark dress.
- `widow_girl`, `widow_boy` — her children, barefoot: a girl of nine in a faded blue dress, a boy of six in a big shirt.
- `beggar` — the old beggar asleep on the bridge (3.7б): stooped, a ragged brown coat, grey hair and a grey beard
  (`beard`, his look's own).
- `musician_a` — a fiddler (the square, 3.2): a red waistcoat (`jacket`), a cap, the fiddle (`fiddle`, his look's own:
  under the chin to the left hand, the bow in the right — it reads as playing with the arms up, `play_fiddle`).
- `musician_b` — a younger piper in green, the reed pipe from the lips to the hands (`pipe`, his look's own).

## Things (the cast's parts: `<id>_with`)

- `lantern` — the Fisherman's lantern hanging from the right hand by its bail, swinging a little late; its glass glows,
  its flame is the person's point `#flame` (the scene's light: `"at": "<id>#flame"`). `lantern_out` — the same lantern put
  out: its glass dark (the scene's light at it off).
- `tambourine` — a tambourine lying on the lap between the hands, a little above the dress (for sitting); point
  `#tambourine`.
- `tail` — the Mermaid's tail over her legs: a silver-green tube from the hips down to the ankles and a wide flat fluke
  at the feet (sitting on the stone it hangs down its front). Given by a scene (`mermaid_with: ["tail"]`), not her look's
  own: in the water it is hidden anyway.
- `knife` — the Witch's knife in the right fist: a green snakeskin handle, the blade on past the knuckles as the hand
  points (point `#blade`); `knife_rusty` — the same, the blade rust-brown (chapter 4 on).
- `cup` — the potter's silver cup held upright in the right hand (point `#cup`: the bowl).
- `bag` — a canvas shoulder bag: the strap from the right shoulder across the chest, the bag on the left hip, swinging.
- `bread` — a round loaf between the hands (point `#bread`).
- `ring` — a gold ring on the third finger of the right hand (point `#ring`) — the Soul's (2.4).
- `tambourine_hand` — the tambourine held up in the left hand, its face turned out (dancing; point `#tambourine`).
- `bundles` — the widow's: a cloth bundle hanging from the right hand, a bigger one on the back.
- `fish` — a string of silver fish hanging from the right hand (the market, П.6).
- `net_catch` — his net heavy with the catch slung over the right shoulder (4.6, the shore at dawn).
- `flowers` — a bunch of white flowers in the right hand (the finales; point `#flowers`).
- `beard`, `ribbon`, `fiddle`, `pipe` — the looks' own (above).
- The Soul's left hand «like smoke» (the knife's miss, М3) is not a look: the scenes where the Soul is seen give smoke
  rising off `soul#hand_l` by their key `soul_smoke` (particles: people are drawn opaque, a hand cannot blur).

## Motions

- `seated` — sits upright, the hands resting in the lap, breathing (a loop; on a seat through `<id>_on`).
- `hands_behind` — stands still, the hands clasped behind the back, looking ahead (a loop).

Stage 5's motions (Kimodo, made and looked at 2026-10-29: `docs/history/2026-10-29-rybak-motions.md`; a loop unless
«once»). Where Kimodo gives only the nearest thing, it says so — the scene finishes it (`_reach`, `_look`, `_mood`, parts).

- `haul_net` — pulls a rope hand over hand, knees bent, leaning back.
- `struggle` — flails both arms, twists the shoulders (caught in the net).
- `laugh` — laughs hard, the head back, then doubled over.
- `sign` (once) — the right palm to the forehead, then down to the chest (lands nearer the throat than the heart).
- `rise_sharp` (once) — up quickly from a seat.
- `point_away` (once) — flings the right arm forward and up, pointing, held.
- `dance_light` — light steps turning, the arms out (made on the girl's look).
- `clap` — claps at the chest in rhythm.
- `whisper` — leans a little, the right hand beside the mouth.
- `clumsy_dance` (once) — stumbling steps, the arms out, rights himself (the laugh: `_mood`).
- `look_back` (once) — walks, stops, turns the shoulders back, faces forward again.
- `swing_feet` — **near only**: seated, kicks a leg up twice, then sits still; Kimodo would not swing the legs in five
  takes. On a high seat (`_on`) the legs hang anyway.
- `dance_tambourine` — the left hand held up high all through, the right low, knees bent, swaying (no beat on it).
- `dance_round` — the arms raised, stepping side to side.
- `pull_hands` (once) — walks backward, the arms out, palms up (the hands meet through `_reach`).
- `pant` — bent, the hands on the knees, breathing hard.
- `throw_down` (once) — bends, the right hand flicks down by the knee.
- `hold_out` — both arms held straight out at shoulder height, then drawn back to the chest.
- `kneel` — kneels upright-ish, the hands on the thighs.
- `bend_over` (once) — made going on from `kneel`: bows forward over the ground before the knees.
- `cut_shadow` (once) — crouched low, the right hand along the ground before the feet (the line itself: the scene's `cut`).
- `stab_post` (once) — the right hand thrust forward at chest-to-shoulder height and held (Kimodo makes «stab/knife» a
  boxer's jab; this one is held by a hand constraint).
- `pull_knife` (once) — the right arm reaches forward, grips, pulls back to the chest.
- `rise_ground` (once) — from flat on the back, sits up, crouches, stands.
- `plead` — bent forward, both open hands out, palms up.
- `sit_edge` — seated, the hands resting at the hips (on a high seat through `_on` the legs hang).
- `call_out` — both hands cupped at the mouth, calling.
- `hang_lantern` (once) — the right hand up in front at head height, holds, lowers.
- `weave` — kneeling, bent low, the hands working on the ground before the knees.
- `sit_ground` — on the ground, knees up, the arms round them.
- `drag_back` — walks backward, knees bent, leaning back, the hands low in front.
- `lie_still` — on the back, still.
- `fall_beside` (once) — **near only**: drops to the knees and folds forward to the ground (a collapse — not onto the
  side; five takes would not lie down sideways).
- `bless` (once) — the right hand raised, slow wide strokes in the air.
- `throw_far` (once) — an overhand throw with the right arm.
- `preach` — open hands at chest height, slow gestures.
- `sing` — seated, the head and shoulders barely swaying (Kimodo has no singing: the song is the sound).
- `hide_face` — kneeling (not seated), bows and covers the face with both hands.
- `lie_bench` — lies curled on the side, still.
- `sleep_floor` — curled on the side, still.
- `search` — bends, both hands moving things in front at waist height (not a high shelf).
- `wrist_behind` (once) — both hands go behind the back and stay there.
- `shrug` (once) — a small lift of the shoulders with a tilt of the head (hardly seen far off).
- `hands_under` — seated, the hands together low in the lap between the thighs.
- `sleep_wall` — sits on the ground, the legs out, the head dropped on the arms over the knees (made on the beggar's look).
- `lay_down` (once) — bends, crouches, sets something down, stands.
- `knot_net` — seated, the hands working together in the lap.
- `run` — a steady run.
- `shield` (once) — stoops, the arms out and back behind her (made on the widow's look).
- `play_fiddle` — the left hand up by the left of the head, the right arm bowing (made on musician_a's look).
- `play_pipe` — both hands together at the mouth.
- `wade` — bent forward, the arms pushing ahead, wide heavy strides (Kimodo has no water; the water hides the legs).
