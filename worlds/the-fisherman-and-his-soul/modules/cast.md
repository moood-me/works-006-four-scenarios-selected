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

## Things (the cast's parts: `<id>_with`)

- `lantern` — the Fisherman's lantern hanging from the right hand by its bail, swinging a little late; its glass glows,
  its flame is the person's point `#flame` (the scene's light: `"at": "<id>#flame"`).
- `tambourine` — a tambourine lying on the lap between the hands, a little above the dress (for sitting); point
  `#tambourine`.

## Motions

- `seated` — sits upright, the hands resting in the lap, breathing (a loop; on a seat through `<id>_on`).
- `hands_behind` — stands still, the hands clasped behind the back, looking ahead (a loop).
