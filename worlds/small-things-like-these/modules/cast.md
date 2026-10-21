# cast — the people of “Small Things Like These”

A module for scenes with people (elements with `person`: `{"cast": "cast", "who": …}` — people_guide). In the scene's
`modules`. No motions of its own yet: the engine's `stand` and `walk` (breathing standing is the engine's). A part's
lengths are a man's metres times `F.fit.h` (the height as a share of 1.76 m) or `F.k`.

## Style

`keegan` — the engine's flat geometry (`flat`): straight edges, plain colours lit by the scene's light (`paint: lit`),
a fine line; the face `simple` (eyes, brows, nose, a mouth — `<id>_mood` shows on it), the head a little larger
(1.16), so faces read at 6–8 m. The palette is the world's: greys, frost white, coal black; the warm colours are few —
Bill's mustard coat is one.

## Who

- `bill` — Bill Furlong, 39, the coal merchant: a mustard overcoat to the knee (`overcoat`), a tweed cap, a dark green
  scarf, hands black with coal (`coal_hands`).
- `sara` — Sara Redmond, seventeen, of the laundry: a thin nightgown greyed with coal dust (`nightgown`), long dark
  hair, barefoot, red hands (`red_hands`).
- `mother` — the Mother Superior: a black habit to the ankles (`habit`), a white coif round the face under a black veil
  (`veil`), a white guimpe (`guimpe`), a small cross (`cross`), pale hands.

## Things (`<id>_with`, or a look's `parts`)

`lantern` — a hurricane lantern hanging from the left hand by its bail (it swings a little late as the hand moves); its
glass glows by itself, the light is the scene's: `{"at": "<id>#flame"}`. The point `#flame` is there while the
person has it.
