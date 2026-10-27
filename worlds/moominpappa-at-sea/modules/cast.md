# cast — the people of “Moominpappa at Sea”

A module for scenes with people (elements with `person`: `{"cast": "cast", "who": …}`). In the scene's `modules`.
6 looks, 3 motions. A part's lengths are a man's metres times `F.fit.h` (the height as a share of 1.76 m).

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
