# cast — the people of «The Summer Book»

A module for scenes with people (elements with `person`: `{"cast": "cast", "who": …}`). In the scene's `modules`.
Style `summer` (from the engine's `flat`: straight-edged flat shapes lit by the scene, faces `simple` — they take
`<id>_mood`). A part's lengths are a man's metres times `F.fit.h`.

## Who

- `grandma` — Grandmother: old, small and thin, white hair in a bun, a long dark-blue dress (`shawl_dress`), a grey
  shawl to the elbows, dark stockings.
- `sophia` — Sophia, six (0.64 of a man): short fair hair, a faded coral frock to the knee, barefoot.
- `papa` — Papa: tall and lean, dark hair, a green-grey knitted sweater, grey trousers.
- `eriksson` — Eriksson: an old fisherman from the far skerries, square and weathered, a dark cap over grey hair, a
  cream fisherman's sweater, dark trousers. He never comes ashore: he sits on his boat's thwart (`sit_bench`,
  `eriksson_on` a point of the boat's seat).

## Motions (`<id>_do`)

Made by Kimodo (`make_motion`), looked at (`look_at_motion`), put with `put_motion`. *loop* — on the spot.

| id | kind | what |
| --- | --- | --- |
| `hands_behind` | loop | stands, hands behind the back |
| `seated` | loop | sits at rest on a low seat |
| `sit_look` | loop | sits on the ground, looks into the distance |
| `hug_knees` | loop | sits on the ground hugging the knees |
| `sit_bench` | loop | an old man sits on a low bench, leaning forward, the forearms on the knees (Eriksson on his thwart) — `<id>_on` [across, distance, the seat's top] |
| `sit_stone` | loop | sits upright on a low stone, the hands in the lap (Grandmother) — `<id>_on` [across, distance, the stone's top] |
| `sit_ground` | loop | sits on the ground, the knees up, the arms on them, looking ahead (Grandmother) |

## Parts (`<id>_with`)

| part | what |
| --- | --- |
| `mug` | an enamel mug held in both hands before the chest (`#mug`) |

## Checked (2026-10-28, GPU, `sheets/sb-cape/trial*.json` beside the world's clones)

- Seated on a stone (`sit_stone`) the long dress reads: it falls from the lap over the knees to the ground.
- **Seated on the ground with the knees up (`sit_ground`) it does not**: seen from the front the skirt is a flat stiff
  sheet stretched from knee to knee, its hem in the air above the shins (any flare, pleats, with or without the shawl)
  — the engine's cloth (`people/cloth.js`), reported. Until it is mended Grandmother sits on a stone, not on the ground.
