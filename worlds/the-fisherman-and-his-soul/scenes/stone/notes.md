# The Stone (С2 «Камень») — stage 4

The stone in the middle of the bay, seen from the pier (scenario §4 С2; §5 П.1–П.5, 1.1; also 3С.1 «Подняться» and
the last frame of «Два огня»). A moonlit night, the same look as `pier`: the viewer stands on the pier 3.4 m from its
end (its last planks and two end posts at the bottom); ahead, a big flat-topped boulder 1.2 m out of the water, the
water round it glowing teal from below; on its left the Fisherman's boat moored, its lantern on the bow; the moon high
over the gap between them, the fir wood far left, the town far right. People stand or sit (the engine's `stand`, the
cast's `seated`); nothing moves but the water, the lantern, the mist, the clouds, the stars and their breath.

## Where things are (metres; the viewer at 0, on the deck at 0.05; the water's surface at -0.63)

- `relief.js`: 0 under the viewer, down to the bay's floor (-2.6) from 2.4 m out; a sandbar at the stone's right
  front (2.3, 6.2) coming up to -1.1 — knee-deep, where the Fisherman wades in 1.1.
- `rock` — a form of its own (not `kit.lump`: its top must be known to sit on) at (1.2, 6.8), its foot on the floor
  (`onLand` false, -2.6): a flat top 3.2 m over the floor (0.57 out to 0.55 of its radius, 1.45 × 1.1 m), shoulders
  rounding down; the painting is it unrolled (its front in the middle; the water's line 0.66 down it).
- `water` — the mirror (as the pier's), its glow `#glow` at the stone (lights her and whoever is near); `deep` — the
  two pale lights under the water before the stone (`deep_lights`).
- The boat — `boat` an unseen anchor at (-2.6, 5.4) at the water's level, facing 75 (bow to the right, toward the
  stone); on it `hull` (a form, `kit.loft` of `lib.RIBS`, stem at -1.7, stern at 1.6 along it), `transom`, `boards` (the
  plane he stands on, `walk`, 5 cm over the water — so the water does not show inside), `thwart`, `net_heap`,
  `bow_lantern` (its flame the scene's light `lantern`, `on`: `lantern`). All of them paint nothing while `boat` is
  false. `net_over` — the net hauled over the bow, ropes from the stem and its mesh and floats on the water there.
- `deck`, `deck_end`, `posts` — the pier where the viewer stands. `far_lamp` — a lantern far away on the right going
  along the shore road, the bridge's end, up the hill to the town (`far_light`); a glow only.
- People (`lib.PLACES`, put by `script.js` at once when `fisherman_at` / `mermaid_at` change; each turned half toward
  the other, half toward the viewer, and looking at the other while the other is here; `<id>_placed` — the place last
  put, so a reopened scene keeps what a game did with them):
  - `fisherman_at`: `boat` (-1.88, 5.59) on the boards by the bow — П.1–П.5; `shallows` (2.4, 5.8) knee-deep on the
    sandbar — 1.1; `water` (0.2, 4.9), 0.6 over the floor, to the shoulders — 3С.1.
  - `mermaid_at`: `stone` — sitting (`seated`) on the top's front-left edge, `mermaid_on` [0.78, 6.4, 3.15], her tail
    hanging down its front — П.5, 1.1; `water` (0.1, 5.6), 0.77 over the floor, to the shoulders — П.4, 1.1's end;
    `net` (-0.5, 5.7) off the bow, in the net (`net` over) — П.3. The empty stone: `mermaid_here` false.
  - She has the cast's new part `tail` (`mermaid_with: ["tail"]`) and is barefoot (`mermaid_wear`) so that nothing dark
    shows at the fluke.
- The Soul has no moment here: at П and 1.1 he is not yet cut away (his shadow is his own, one). The far lantern is
  his (3С.1, «Два огня»).

## The moments (what a game sets)

П.1–П.2: `boat`, `lantern` 1, `net` heap → over, `fisherman_at` boat, `mermaid_here` false. П.3: `net` over,
`mermaid_at` net (`mermaid_mood` eyes_closed while she sleeps). П.4: `mermaid_at` water, then not here. П.5: she on
the stone, or the stone empty. 1.1: `boat` false, `lantern` 0, `fisherman_at` shallows, `mermaid_at` stone. 3С.1:
`boat` false, `fisherman_at` water, `mermaid_here` false, `far_light` moving 0.5 → 1. «Два огня», the last frame: no
one here, `deep_lights`, `far_light` toward 1.

## Seen, not mended (stage 5 / people)

- The tail covers her legs, but the cast's `seated` sits with the knees apart: her shins show a little at its sides.
  A seated loop with the legs together (a mermaid's) would mend it — a motion, not this scene's.
- The far lantern at ~880 m is a small glow: seen, but not much. Frame it closer in a piece if it must read.
- `measure_scene` (2026-10-29, `76e26fa`, T4): desktop / laptop / phone fail 5 / 4 / 5 of 17 — all the scene thread's
  JS (median ~5 ms against 3), its GC (2.4–2.8 ms against 2) and its allocation a frame (31–41 KB against 1 KB), the
  allocation judged being the engine's own modules (sheets/cache, people/player, render/…; the scene's code ~1 KB a
  frame, most of it the tail part drawn each frame and the rings' animate — the latter since made allocation-free);
  frames p95 16.8 against 16.7 (one display period). GPU ~5 ms, soft run 0, pages ~330–400 of 1420, open 3.2 s.
  Not chased further here: the judged part is the engine's.
