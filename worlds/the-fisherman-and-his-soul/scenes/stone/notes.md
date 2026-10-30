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

## Stage 5: the hours, the net, the boat (2026-10-29, r3/rybak-pieces)

- The hours (modules `hours`, hours.md): `light` night / evening / dawn → `dusk`, `dawn` (looks; the sky's layers by its
  shader — the evening rose and amber low, the moon pale; the dawn pearl, the moon faint; the low suns `sun_dusk`,
  `sun_dawn`). A piece going from evening into night moves `dusk` itself, then names `light`.
- The net (`net_over`): `haul` 0 → 1 draws it in from a length out on the water to under the stem (layers `ropes`,
  `mesh`, `fish` moved by its animate — nothing repainted); `fish` 0…1 the catch in it; `knot` 0…1 the knot by her hand
  loosening; `net_hole` 0 / 1 / 2 torn at its far edge, wider (painted once a change) — in the heap too (`net_heap`).
  Points `net_over#rope` (the hauling rope at the stem), `net_over#knot` (by her hand) — only while `net` is over and the
  boat here.
- `heel` 0…1 — the boat dipping its bow under the net's weight: the script turns it into `boat_tilt` (−6° at 1), the
  boat's anchor's `tilt` (everything on it goes with it).
- `splash` — a pulse (count it up): her tail beats the water (particles `splash` at `mermaid#feet`).
- `pass_light` 0 → 1 → 0 — a pale light passing under the keel (`keel_light`: a glow on the water under the hull).
- Not rendered at this stage (few renders tonight): the net's layers and the dusk are the pieces' first look.

## Pieces

The pieces (`lib.film`, played by the world's `beats` from `script.js`; the shared kit `modules/pieces.js`): the
prologue's `night`, `in_net`, `go_word`, `go_free`, `evenings`; chapter I's `ask_wife`, `laugh_tail`, `dive`; 3С.1's
`rise`; 4.5–4.6's `boat_out`, `keel_light`; «Два огня»'s `two_lights`. Their variants (keys the game sets with the
piece): `looks` (go_word, go_free), `net_way` — the contract's «net» (evenings; the scene's `net` is where the net is),
`fish` (keel_light). A piece that follows another (`after`) and is played in the same opening is not cut to its `from`:
it sets what it needs that differs (`pieces.open`). Framed shots are the operator's on someone (`camera_target`) and
never with the camera's offsets on top (the offsets move the operator's pose: the target behind the lens). Sheet
(2026-10-29): the night's push in, the evenings, the wading in, the dive — as meant; fixed after it: the following
pieces' framing (they were left on the piece before), the light under the keel framed wide (a close shot put the lens
in the hull).

## Contract for the check

```json
{"beats": {
 "night": {"after":[],"tells":["night:cast","night:rope"],"seconds":15,"show":false},
 "in_net": {"after":["night"],"tells":["in_net:wake","in_net:hold"],"seconds":15,"show":false},
 "go_word": {"after":["in_net"],"tells":["go_word:under"],"seconds":6,"show":false},
 "go_free": {"after":["in_net"],"tells":["go_free:linger","go_free:turn","go_free:under"],"seconds":12,"show":false},
 "evenings": {"after":[],"tells":["evenings:sing","evenings:empty","evenings:end"],"seconds":18,"show":false},
 "ask_wife": {"after":[],"tells":["ask_wife:there"],"seconds":8,"show":false},
 "laugh_tail": {"after":["ask_wife"],"tells":["laugh_tail:splash"],"seconds":4,"show":false},
 "dive": {"after":["laugh_tail"],"tells":["dive:under"],"seconds":5,"show":false},
 "rise": {"after":[],"tells":["rise:watch","rise:pulled"],"seconds":12,"show":false},
 "boat_out": {"after":[],"tells":["boat_out:cast"],"seconds":8,"show":false},
 "keel_light": {"after":["boat_out"],"tells":["keel_light:light"],"seconds":10,"show":false},
 "two_lights": {"after":[],"tells":["two_lights:end"],"seconds":10,"show":false}
},
 "points": ["net_over#rope","net_over#knot","sky#disc"],
 "keys": ["light","boat","lantern","net","haul","heel","fish","knot","splash","pass_light","net_hole","deep_lights","far_light","fisherman_at","mermaid_at"]}
```

## Polish (2026-10-30, r3/polish-rybak)

- In the net (П.3–П.4): she turned to us (`IN_NET`); the two framed from the pier's end with the camera's own keys
  (`HOLD`) — an operator on someone in the water puts its eye over the bay's floor, at the water's face, under the net
  (the back of her head behind the net's ropes, then his legs). `go_word`/`go_free` keep that shot.
- «Два огня»: the two lights under the water larger and brighter, the far lantern going over the hill brighter (its
  glow 14 m) — they were points.
- (second round) The prologue's night: the bay from the pier's end with the boat whole and broadside (`SEA_WIDE`), then
  in to its bow (`AT_BOW`, the camera's own keys): his hands, the rope, the net over the bow in the water — М1 is played
  there (the medium on him showed hands pulling at nothing).
- (third round, from a play in the browser) The boat did not hold together: its hull's skin was seen from outside only
  (a form is seen from its face's side) and lay across the boat (without `facing` a form faces the eye). Now `hull_in` —
  the same skin with its face inward, the boat's inside (tarred wood, the ribs) — and both `facing` 180, as the anchor
  lies (the loft's z = −distance: the stem on the bow lantern, the stern on the transom; the engine's author's
  answer: a child's across/distance are the anchor's, its own `facing` only turns it in place).
- (2026-10-30, sixth round) `go_free`: the camera on her as she lingers (her place in the water is past the edge of the
  net's shot) — «Do you want nothing?» is said in the frame.
- (sixth round) `net_over#knot` — by her left hand at the floats (it was over her face, where М1б's sign is her face
  growing quiet); `laugh_tail` on a medium shot.
