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
- `beard`, `ribbon`, `fiddle`, `pipe` — the looks' own (above).
- The Soul's left hand «like smoke» (the knife's miss, М3) is not a look: the scenes where the Soul is seen give smoke
  rising off `soul#hand_l` by their key `soul_smoke` (particles: people are drawn opaque, a hand cannot blur).

## Motions

- `seated` — sits upright, the hands resting in the lap, breathing (a loop; on a seat through `<id>_on`).
- `hands_behind` — stands still, the hands clasped behind the back, looking ahead (a loop).
