# cast — the people of “Small Things Like These”

A module for scenes with people (elements with `person`: `{"cast": "cast", "who": …}` — people_guide). In the scene's
`modules`. No motions of its own yet: the engine's `stand` and `walk` (breathing standing is the engine's). A part's
lengths are a man's metres times `F.fit.h` (the height as a share of 1.76 m) or `F.k`.

## Style

`keegan` — the engine's flat geometry (`flat`): straight edges, plain colours lit by the scene's light (`paint: lit`),
a fine line; the world's own face `keegan` (the cast's `shapes.faces`): a white eye with a dark iris, thick dark brows,
a nose, a full line of darker lips — bold enough to read at 6–9 m; `<id>_mood` shows on it (the engine's expressions;
`thinking` here is a cool, measuring look, `tired` heavy lids). The head a little larger (1.22). The palette is the world's: greys, frost white, coal black; the warm colours are few —
Bill's mustard coat is one.

## Who

- `bill` — Bill Furlong, 39, the coal merchant: a mustard overcoat to the knee (`overcoat`), a tweed cap, a dark green
  scarf, grey-brown work trousers, hands black with coal (`coal_hands`).
- `bill_home` — Bill at home: the coat on its hook and the cap off — a white shirt and a bottle-green waistcoat (`waistcoat`); the
  hands as black. A scene that has him come in puts it on him with `bill_wear` (the look's object:
  `scene.kit.cast.characters.bill_home`).
- `eileen` — Eileen Furlong, his wife: a wine-coloured dress to mid-calf under a washed-blue wraparound pinafore
  (`pinafore`), her hair pinned up in a bun, flour on her hands (`floury_hands`).
- `sheila` — Sheila, twelve, the daughter who sings in the nuns' choir: the convent school's navy pleated skirt, a grey
  jumper, light socks, a dark ponytail.
- `grace` — Grace, about eight, who steals raisins from the cake: a muted green frock to the knee (`frock`), white
  socks, an auburn bob.
- `sara` — Sara Redmond, seventeen, of the laundry: a thin nightgown greyed with coal dust (`nightgown`), long dark
  hair, barefoot, red hands (`red_hands`: raw red, a little bigger — the frame's one red).
- `mother` — the Mother Superior: a black habit to the ankles (`habit`), a white coif close round the face under a
  black veil set back from the brow (`veil`), a broad white guimpe (`guimpe`), a small cross (`cross`), pale hands.

## Things (`<id>_with`, or a look's `parts`)

`lantern` — a hurricane lantern hanging from the left hand by its bail (it swings a little late as the hand moves); its
glass glows by itself, the light is the scene's: `{"at": "<id>#flame"}`. The point `#flame` is there while the
person has it.
