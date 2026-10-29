# The Well (С4 «Колодец») — the look of the world, its second place

The second scene of «The Fisherman and His Soul» (stage 2 of the game stages: the look). Midnight, the full moon over
a glade in the fir wood (chapter 1, 1.4–1.6): the stone well with its posts and bucket in the middle, a path of flat
slabs leading to it from the viewer's feet; the Witch sitting on the well's rim, her tambourine on her lap; the
Fisherman before her with his lantern in his hand, the two facing each other across its light; at the edge of the wood
on the right, by a fir, the man in black velvet, pale, his hands behind his back, watching. People stand and sit (the
cast's `seated`, `hands_behind`, the engine's `stand`); nothing moves but the firs and the grass in the wind, the
bucket on its rope, the lantern swinging in the hand, the mist, the fireflies, the stars.

## Where things are (metres; the viewer at 0)

- `relief.js`: level round the viewer and the well, the wood's floor rising 0.9 m from 14 to 34 m out (a little more on
  the left). `ground` — one plane draped over it (90 × 70 m, centred 25 m out): moss, the trodden ring round the well,
  the slabs of the path.
- `well` — a form (`kit.revolve`) at (0.9, 7.5): outer radius 0.7, the rim 0.8 high, the water inside at 0.45; its
  painting is the profile unrolled (notes in its code). `well_frame` — a card on the well's centre: posts at ±0.84,
  the crossbeam at 2.2, the windlass, the bucket a layer swaying on its rope.
- `fir`, `fir_slim` — two kinds of fir (`lib.fir`: tiers of flat ragged triangles), copies round the glade: the left
  wall from 6 m out (the nearest at (-5.6, 3.8) frames the left edge), the right wall from 8 m, the back of the glade
  26–42 m out, farther in the middle where the moon is, a second row behind. `far_wood` — the wood going on at 160 m.
- People: `witch` sits on the rim's left side — `witch_on` [0.34, 7.29, 0.8], turned 250 (toward the Fisherman, a little
  toward us), her legs hanging over the outside; `fisherman` (-0.98, 6.81) turned 110, the lantern (`fisherman_with`)
  in his right hand on our side — the scene's light `lantern` is at `fisherman#flame`; `velvet` (3.5, 10.4) by the
  fir at (4.6, 11.4), turned 235. Looks: the two at each other, the man in black at the Fisherman.
- `mist` — two banks lying among the far firs; `fireflies` over the glade, few.

## Wanted from the engine / not yet

- The Witch should swing her bare feet (the scenario: «болтает босыми ногами»): the motion service was paused when
  this was made; `seated` (hands in the lap) stands in. A swinging-feet seated loop can replace it in the cast.

## Stage 5: the hours, the dance, the knife (2026-10-29, r3/rybak-pieces)

- The hours (hours.md): `time` midnight / evening / dawn → `dusk`, `dawn` (the evening: dusk, the moon not up; the dawn:
  pale, the moon faint). The sky's layers by its shader.
- People now stand at their place's keys (`fisherman_a`, `_d`, `witch_a`, `_d`; the Witch sits on the rim by `witch_on`).
- `round` — the dance: while set, the script moves the Fisherman and the Witch round the well on a circle of 1.3 m, on
  its opposite sides, each turned to the other across it (lib.ROUND: a lap in 16 s, moved in eight steps of the clock;
  the Witch let off the rim — `witch_on` null). Their motions (`dance_round`, `dance_tambourine`) are the pieces'; the
  tambourine held up is the cast's `tambourine_hand` (point `witch#tambourine`).
- `stumble` — a pulse (1 → 0): he is thrown 0.3 m out of the circle and back.
- `knife_ground` — the knife on the slabs at his feet (point `knife_ground#knife`).
- Not rendered at this stage.

## Pieces

The pieces (`lib.film`, the world's `beats` from `script.js`): `well_evening`, `long_look` (1.4), `dance`,
`velvet`, `sign_velvet`, `broken`, `demand`, `dance_dawn` (1.5–1.6). The dance round the well is the scene's `round`;
the man in black now stands at his place's keys (`velvet_a`, `velvet_d`). Variant: `stumbled` (velvet). Not rendered at
this stage.

## Contract for the check

```json
{"beats": {
 "well_evening": {"after":[],"tells":["well_evening:there"],"seconds":10,"show":false},
 "long_look": {"after":["well_evening"],"tells":["long_look:end"],"seconds":4,"show":false},
 "dance": {"after":[],"tells":["dance:begin"],"seconds":8,"show":false},
 "velvet": {"after":["dance"],"tells":["velvet:bow"],"seconds":8,"show":false},
 "sign_velvet": {"after":["velvet"],"tells":["sign_velvet:sign","sign_velvet:gone","sign_velvet:cry"],"seconds":12,"show":false},
 "broken": {"after":["sign_velvet"],"tells":["broken:end"],"seconds":4,"show":false},
 "demand": {"after":["broken"],"tells":["demand:promise","demand:whisper","demand:knife","demand:away"],"seconds":14,"show":false},
 "dance_dawn": {"after":["broken"],"tells":["dance_dawn:laugh","dance_dawn:dawn","dance_dawn:hand"],"seconds":18,"show":false}
},
 "points": ["witch#tambourine","knife_ground#knife","sky#disc"],
 "keys": ["time","round","stumble","knife_ground"]}
```
