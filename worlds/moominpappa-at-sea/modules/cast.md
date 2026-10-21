# cast — the people of “Moominpappa at Sea”

A module for scenes with people (elements with `person`: `{"cast": "cast", "who": …}`). In the scene's `modules`.
4 looks, 3 motions. A part's lengths are a man's metres times `F.fit.h` (the height as a share of 1.76 m).

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

The Fisherman and the Groke are not here yet.

## Parts

`tail` — out of the back of the seat, hanging, swinging a little late, a tuft at its end (every Moomin's look has it).

## Motions (Kimodo's, taken from the Scarlet Sails cast)

Standing: `hands_behind` (hands behind the back, a loop). Sitting on a seat (the hips over it — `<id>_on`
`[across, distance, top]`): `seated` (sits at rest, a loop). On the ground: `sit_look` (sits on the ground, looks into the
distance, a loop).
