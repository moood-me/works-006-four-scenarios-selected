# The Pier (С1 «Мостки») — the look of the world

The first scene of «The Fisherman and His Soul» (stage 2 of the game stages: the look). A moonlit night in the bay:
the pier runs from the bottom left out into the water; at its end the lantern post, the Fisherman by it; his Soul
— his shadow, risen — beside him on the boards; the Mermaid in the water by the pier's end, to the chest, her tail
out of the water behind her, the stone glowing in the water beyond. People stand (the engine's `stand`), nothing moves
but the water, the lantern, the reeds, the mist, the stars.

## Where things are (metres; the viewer at 0, the water's surface at -0.48)

- `relief.js`: the floor drops from 0 at 0.8 m to -2.4 at 4 m out, and stays there. Elements standing on it give
  `elevation` over that floor: the water plane and the far cards 1.92 (at the surface).
- `pier_deck`: a plane from 2 m behind the viewer to (0.24, 5.0), turned -44.7°, its top at 0.15 (a plane's
  elevation is absolute, not over the floor) — people stand on it (`walk`). `pier_beam` its near side;
  `pier_posts` copies, each copy's elevation putting its foot at -2.6.
- `lantern_post` at the deck's right corner by its end (0.75, 4.49); its lantern a layer swinging on the hook; the
  light `lantern` is its `#flame`, just before the Fisherman's face.
- `rock` — a form (`kit.lump`) at (2.9, 6.2), top ~1 m out of the water; `water` glows teal round it (`#glow`, a
  light that reaches the Mermaid). `fin` — her tail's fluke out of the water behind her (2.05, 5.6), rocking.
- People: `fisherman` (-0.15, 4.75) on the deck by the lantern; `soul` (-0.9, 4.1) on the deck beside him, no shadow
  of its own (`"shadow": false`); `mermaid` (1.3, 4.4) by the pier's end, stood 0.8 m over the floor so that the
  water hides her from the chest down; `rings` round her. Their looks (`<id>_look`) cheat their faces toward the
  viewer: the Fisherman looks down toward her, a little nearer the camera; she up toward him; the Soul out at us.
- Far: `far_shore` (the fir wood, where the well is), `far_ridge`, `town` (the town of lights at 900 m on the right,
  glows only), `mist`.
- The water mirrors the sky (`fade` 0): the moon's path and the stars broken by `ripple` into wavering glints.

## Wanted from the engine

- The Soul should be see-through (the water seen through him): people are drawn opaque — he is the Fisherman's
  figure in a shadow's colours for now.
