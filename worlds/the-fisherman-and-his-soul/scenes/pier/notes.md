# The Pier (С1 «Мостки») — the look of the world

The first scene of «The Fisherman and His Soul» (stage 2 of the game stages: the look). A moonlit night in the bay:
the pier runs from the bottom left out into the water; at its end the lantern post, the Fisherman by it; his Soul
— his shadow, risen — behind him on the boards; the Mermaid in the water by the pier's end, to the shoulders, the
stone glowing in the water behind her, her tail out beyond it. People stand (the engine's `stand`), nothing moves
but the water, the lantern, the reeds, the mist, the stars.

## Where things are (metres; the viewer at 0, the water's surface at -0.48)

- `relief.js`: the floor drops from 0 at 0.8 m to -2.4 at 4 m out, and stays there. Elements standing on it give
  `elevation` over that floor: the water plane and the far cards 1.92 (at the surface).
- `pier_deck`: a plane from 2 m behind the viewer to (1.25, 6.0), turned -44.7°, its top at 0.15 — people stand on
  it (`walk`). `pier_beam` its near side; `pier_posts` copies, each copy's elevation putting its foot at -2.6.
- `lantern_post` at the deck's right edge by its end; its lantern a layer swinging on the hook; the light `lantern`
  is its `#flame`.
- `rock` — a form (`kit.lump`) at (3.7, 7.0), top ~1 m out of the water; `water` glows teal round it (`#glow`, a
  light that reaches the Mermaid).
- People: `fisherman` (0.78, 5.5) on the deck, `soul` (-0.75, 4.25) on the deck, `mermaid` (2.6, 5.0) stood 0.8 m
  over the floor so that the water hides her from the chest down. Their looks (`<id>_look`) cheat their faces
  toward the viewer: each looks a little nearer the camera than at the other.
- Far: `far_shore` (the fir wood, where the well is), `far_ridge`, `town` (the town of lights, glows only), `mist`.

## Wanted from the engine

- The Soul should be see-through (the water seen through him): people are drawn opaque — he is the Fisherman's
  figure in a shadow's colours for now.
