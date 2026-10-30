# The Deep (С6 «Глубина») — stage 4

Under the water (scenario §4 С6; §5 2.1, 2.5, 3С.1 and the ending «Два огня»): the sea's floor of pale rippled sand,
tall weed swaying in the current, the light coming down from the surface in shafts, bright and turquoise; fish going
by; the two of them sitting side by side on a low stone half sunk in the sand at the foot of the big stone. The same
world as `pier` and `stone` — the cast's people, plain quiet colours, the engine's light — but by day under the water:
bright, not murky. People sit or stand (the cast's `seated`, the engine's `stand`); nothing moves but the weed, the
fish, the bubbles, the motes, the net of light on the surface and their breath.

## Where things are (metres; the viewer at 0 on the sand, eyes 1.7 over it; the surface 7 m up)

- No `relief`: the floor is level (0). `sand` — one plane draped over it (120 × 80 m, centred 30 m out): pale sand,
  ripple marks near, pebbles and shells, weed's shade round the stone's foot.
- `sky` — the water above and all round: the surface's pale brightness at the top going down to the haze's turquoise
  at the eye's level (`hazeColor` `#4fb3b6`, so the far sand fades into it). Its shader (`sky.wgsl`) lays a wavering
  net of light over the surface and the warm glow of `far_light`; `sky.animate.js` gives it `dusk` and where the glow
  is. Its painting reads `dusk` (painted again when it is set).
- The light: `sun` — far, behind the viewer on the right, high (`from` [160, 72]: their faces lit), coming in only `through` seven
  pools of the surface at 7 m (flat polygons): the shafts in the haze (`shafts` 3) and the bright patches on the sand.
  The first pool is placed so that its patch falls on the two of them; the rest over the weed, the stone, far out.
  `ambient` 0.78 turquoise keeps everything outside the patches bright.
- `rock` — the stone's foot (a form of its own, not С2's: 9 m of it, up past the top of the view) at (3.2, 9); its
  front has the scene's one warm accent, a few anemones and a starfish. `far_rocks` — a line of rocks 26 m out in the
  haze.
- `slab` — the low stone they sit on: a smooth `kit.lump` 3 × 1 m, 0.44 high, at (0, 4.3).
- `kelp` (copies, 3.5–4.6 m, `translucent`, swaying by the scene's `wind` — the current) frame the view left and right
  and stand farther back; `grass` tufts on the sand round the slab.
- `school` — two loose shoals of small fish 13 m out (two drifting layers, opposite ways); `fish` — three bigger ones
  6.5 m out going left behind the two. `bubbles`, `bubbles_weed` — bubbles rising by the stone's foot and by the left
  weed; `motes` — specks in the water, lit in the shafts.
- People (`lib.PLACES`; `script.js`): `mermaid` always sitting (`seated`) on the slab's right, `mermaid_on`
  [0.58, 4.22, 0.4], her tail (`mermaid_with: ["tail"]`, barefoot) hanging down its front; `fisherman_at`: `sand` —
  sitting on its left, `fisherman_on` [-0.62, 4.22, 0.4]; `standing` — on his feet on the sand before her (-0.75, 3.25).
  Each turned half toward the other, half toward the viewer, and looking at the other while both are here (set anew
  when `fisherman_at`, `fisherman_here`, `mermaid_here` change — a game sets a look of its own after that, e.g.
  `mermaid_look: "fisherman#feet"` in 2.5). `hands` — her right hand in his left (`<id>_reach`) while he sits.
  `years` — his look `fisherman_old` (white hair; the cast's, appended) as `fisherman_wear`.
- `dusk` — a look: bluer, dimmer, the sun's pools at a quarter; still bright enough for faces.
- The Soul has no moment here: on these paths he is on land (2.2–2.7 on the pier; 3С — gone into the world with the
  lantern; his light is `far_light`).

## The moments (what a game sets)

2.1 «Глубина»: `fisherman_at` sand (she sings: her mood is the game's). 2.5 the dance under the water: `fisherman_at`
standing, then her look at his feet. 3С.1: `dusk` 1, `far_light` 0.01 → 1 slowly (his lantern going to the town
overhead); ≤1 of the Song — `hands` true; «Подняться» is С2's (`stone`, `fisherman_at` water). «Два огня», the deep:
`years` true, `hands` true.

## Seen, not mended (stage 5 / people)

- «Двое сидят на песке»: they sit on a low stone in the sand, not on the sand itself — the cast has only `seated` (a
  chair's sitting); sitting on the floor (him: the knees drawn up; her: the legs together to one side under the tail)
  needs motions of the cast.
- The cast's `seated` sits with the knees apart: her shins show a little at the tail's sides (as on `stone`).
- Her hiding her face in her hair (2.5), her palm over his eyes (3С.1), the dance — stage 5's motions.
- The engine draws the `shafts` of a light coming `through` the surface's pools as a bright glow in the water toward
  the light (and the pools' patches on the sand), not as separate columns of light: tried with the sun behind the
  viewer and ahead of him (`from` [20, 70], `shafts` up to 4) — no columns either way. Kept behind (their faces lit).
  Wanted from the engine, or a word on how columns are meant to show.
- `measure_scene` (2026-10-29, last at `7481361`, T4): the soft run walking in passes on all three now. First (`3e2ef8b`,
  `camera.area` [0.8, 0.8, 0, 2.2]) it failed 2.8 / 1.9 / 3.4 s against 0.5 / 0.5 / 1: walking in toward the two of them
  asked 371 / 282 / 137 new pages a second against the 120 / 120 / 30 the painters give. A walk 1 m in halved it; the
  fish layers' boxes cut to their bands changed nothing (pages follow what is painted); the walk 0.4 m in, 0.5 aside
  (`area` [0.5, 0.5, 0, 0.4]) passed. Still failing, the engine's own as on `stone`: the scene thread's JS (median
  3.7–4.1 ms against 3), its GC (2.3–2.7 against 2), allocation a frame (18–24 KB against 1 KB — the report's biggest
  allocators are people/cloth.js, people/player.js, render/sky.js, render/views.js; the scene's code allocates almost
  nothing a frame), frames p95 16.8 against 16.7 (one display period) on desktop and phone. GPU ~5 ms, view pages
  ~400–500 of 1420, open ~3.3 s.

## Stage 5 (2026-10-29, r3/rybak-pieces)

- `mermaid_near` 0…1 (М4): she slides along the slab nearer him — the script moves her seat (`mermaid_on`) from its
  right (0.58) to close beside him (0.08).

## Pieces

The pieces (`lib.film`, the world's `beats` from `script.js`): `deep_song` (2.1, then М4), `dance_deep` (2.5),
`deep_dusk`, `palm_eyes` (3С.1), `white_hair`, `hands_years` («Два огня»). Variants: `sing` (deep_dusk, hands_years),
`first` (hands_years: he / she takes the other's hand first). Not rendered at this stage.

## Contract for the check

```json
{"beats": {
 "deep_song": {"after":[],"tells":["deep_song:sing"],"seconds":10,"show":false},
 "dance_deep": {"after":[],"tells":["dance_deep:dance","dance_deep:laugh","dance_deep:feet","dance_deep:hide"],"seconds":16,"show":false},
 "deep_dusk": {"after":[],"tells":["deep_dusk:begin","deep_dusk:light"],"seconds":12,"show":false},
 "palm_eyes": {"after":["deep_dusk"],"tells":["palm_eyes:palm"],"seconds":8,"show":false},
 "white_hair": {"after":[],"tells":["white_hair:touch"],"seconds":8,"show":false},
 "hands_years": {"after":["white_hair"],"tells":["hands_years:hand"],"seconds":10,"show":false}
},
 "keys": ["mermaid_near","hands","years","dusk","far_light","fisherman_at"]}
```

## Polish (2026-10-30, r3/polish-rybak)

- `deep_song` ends on the two of them whole (М4, «touch nothing», is played on it; the medium on her cut him off). Her
  song is the game's (the music's voice weight 0).
- (second round) «Два огня», `white_hair` / `hands_years`: the two of them near (`TWO_NEAR`, on her, him on the left) —
  his old face and white beard, her hand at his hair; it was seven seconds of the back of his head.
- (2026-10-30, sixth round) `white_hair` on `TWO_SEATED` (the two sitting whole, a little further: the old man's beard
  and hair read so; nearer, the beard was a mask). The beard itself (cast.js) hangs below his mouth now.
