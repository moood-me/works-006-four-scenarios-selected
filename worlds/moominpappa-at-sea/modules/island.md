# island — the island and its sea and sky, by the hour

One island for every scene of “Moominpappa at Sea” that sees its sea or sky (`landing`, `cape`, `middle`, `shore`, the
window of `round-room`, the gallery of `lantern-room`, `sea`): the same granite, sea, lighthouse, pines and sky, in the
same hand. Painted once, in daylight colours; the hour and the weather are the scene's light (its looks) and the
shaders of the sky and the sea, moved by the state — no painting is made again for them. In the scene's `modules`:
`["cast", "island"]`; `e.kit.island` in code, `kit.island` in the lib, `scene.kit.island` in scripts.

## The common keys

`dawn`, `dusk`, `night` 0…1 (looks of the light, in this order — a later one over an earlier; the day is all 0; each
may move before the eyes), `moon` 0…1 (the phase: a thin crescent → full; changes between steps; seen by night),
`calm` 0…1 (the sea still: few crests, slow — a quiet night), `storm` 0…1 (grey light and sky, the storm's clouds, many quick crests, rain, wind; over a half — lightning now and
then by `lightning`), `flash` 0…1 (lightning: a far light, the look `flash`, the bolt and the lit sky), `lighthouse_lit`
0…1 (the lighthouse's lamp burns: its lantern's glass warm, its light `lantern` and its glow), `beam` 0…1 (the
lighthouse's beam: a cone of light from the lantern, seen in the air where the look's `hazeGlow` is over 0 — by night,
at dusk, in a storm) and `beam_turn` (its bearing, degrees: `beam(scene)` in the scene's script turns it on and on
while `beam` is on, a turn in 12 s), `room_lit` 0/1 (the round room's window on the tower lit — its light `window`), `beam_tilt` (its height, degrees: −1 — a little down, out to sea; a piece tilts it
down onto the one «in the beam» as it passes, and back). Their defaults and `states` — `tools/island.py` `STATE`, `STATES`.

## What a scene writes (tools/island.py)

A scene's generator (`tools/<scene>.py`) takes from `tools/island.py`: `light(wind)` (the day as the base light, the
looks `dawn`, `dusk`, `night`, `storm`, `flash`), `lights(sun, sun_dawn, sun_dusk, bolt, lantern)` (its sun at each hour —
`[bearing, height]`, colour, strength —, the moon from `sky#moon` on `night`, the lightning from where its bolt is on
`flash`, the lantern of `lighthouse#lantern` on `lighthouse_lit`), `sky(low, day, dawn_x, dusk_x)`, `sea(elevation,
reflect)`, `lighthouse(across, distance)`, `RAIN` (rain on `storm`), `STATE`, `STATES`, and `shaders(folder)` — it
copies `tools/island/sky.wgsl` and `tools/island/sea.wgsl` beside its sky and sea (the same text in every scene: a
change is made there and copied by every generator).

## All round

For a scene whose camera turns (looks round, rides a boat): `tools/island.py` `sky(..., round=True)` and
`sea(..., round=True)`, and in the element code `island.sky(g, e, {…, round: true})`, `island.sea(g, e, {round: true,
reach})` — the sky painted a whole turn about the gaze (2π stage heights, its ends meeting; clouds, storm clouds and
stars as thick all round), the sea centred on the start, 6000 × 6000 m, the crests on every side out to `reach` metres
(520). Without it (landing, cape) the sky is the stage and its margins, the sea and its crests ahead.

An engine gap (2026-10-27): with a camera that looks ahead (not `around`), turned so far that the gaze comes to the
end of a whole-turn sky (`camera_yaw` ≈ 180° here), the painting is drawn only up to its own end — its other end,
a turn on, is not drawn there; the sky's soft carry fills it (lighter, no stars, a cloud smeared): a sharp seam.

## The land

- `bump(a, d, ca, cd, ra, rd)` — a round knoll, 1 at its centre; `ridge(a, d, a0, d0, a1, d1, h0, h1, w)` — a granite
  back along a segment, h0 → h1, half-width w. A scene's land (its lib) is made of them.
- `shoreOf(land, SEA, a0, a1, d0, d1)` — the scene's `shore(lo, hi, step, fn)`: fn(across, distance, h) on a grid
  where the land is within [lo, hi] over the sea. The painters below read the scene's lib (`e.lib`): `SEA`, `land(a,
  d)`, `shore`.

## The painters

- `sky(g, e, {low, moon: [x, y], bolt: [x, y]})` — a sky element (`island.sky(...)`; shader `sky.wgsl`, animate
  `e.kit.island.skyMove(e)`): its colours by the hour are the shader's; its layers, white, coloured there — the clouds
  (drifting), the storm's clouds (heavy, faster, with gaps), the stars, the moon at its phase (point `sky#moon`, glow
  `moon` — the sea's mirror draws its path), the bolt. `low` is the uniform `low` (where the sky's colours end; the
  scene's horizon decides it), the day's sun's warmth at `day` [x, y], the dawn's and the dusk's at the horizon by
  `dawn_x`, `dusk_x` — the sky element's `uniforms`.
- `sea(g, e, {D})` — the sea plane `D` metres out (shader `sea.wgsl`, animate `e.kit.island.seaMove(e)`): grey-blue,
  the shallows where the scene's land runs under it, the crests (more and quicker in a storm), the foam washing the
  waterline.
- `granite(g, e, {centre, size, pools, marks, near, crack})` — the draped granite plane over the land: drifts,
  speckle, lichen on the dry tops, the joints and cracks, rain pools, the wet rim. `marks` — how many drifts, specks,
  lichens, cracks ([60, 900, 260, 110]); `near` — for a big plane, the share of each anywhere, the rest near the viewer;
  `crack` — [width, spread, dark alpha, pale alpha, the long ones' way, the short ones' way].; `points` — [[across, distance, name], …]: named points on the land (`<id>#name`, lifted onto it).
- `lighthouse(g, e, {doorway})` — the white tower (a form; `TOWER`, `TOWER_ROUND`): points `lighthouse#door`,
  `lighthouse#lantern`; the lantern's glow `lantern` (lit by the scene's light `lantern` on `lighthouse_lit` — a scene
  with the lighthouse takes it into its lights, else the glow shows by day); its glass warm when `lighthouse_lit` is
  over a half (the element repaints on that key only: `"redraw": {"lighthouse_lit": 1}`). `doorway: true` — the door is
  a card of its own (`door(g, e, {hinge})`, painted from its hinge — left by default, or right; `DOOR` its size; point
  `<id>#door`), the tower shows the dark
  doorway behind it.
- `steps(g, e)` — the granite steps to the door (box [-0.8, -0.55, 0.8, 0.05]).
- `pine(g, e)` — a small crooked black pine, its crown a layer the wind sways (box [-1.9, -3.75, 1.75, 0.1]; point
  `<id>#crown`); copies of it stand about.

## The people at their places

`places(scene, PLACES)` — in the scene's script: each person stands where `<id>_at` names, `PLACES[id][name]` =
`{at: [across, distance], on, turn, do, look, reach}` (the person's `"place": {"across": "<id>_a", "distance":
"<id>_d"}`); set at once when `<id>_at` changes, and on opening only if it differs from `<id>_placed` (so a scene
restored goes on as it was). A scene declares `<id>_at`, `<id>_placed`, `<id>_a`, `<id>_d` in its `states`.

## The beam

`beam(scene, period)` — in the script of a scene with the lighthouse (and its lights from `lights()`): while `beam`
is on, `beam_turn` goes round, a turn every `period` seconds (12); put out, it stops. The light `beam` is the
lighthouse's own e.light `beam` (so the tower casts no shadow of it) with a cone 10° wide, a little down; in a storm (thick haze) it gives 0.4 of its strength, so that it is a strong beam and not a white wall.

## The storm's script

`lightning(scene)` — in the scene's script: while `storm` is over a half, now and then `flash` up and down (sometimes
twice), the more often the stronger the storm; each strike told (`flash:strike` — the game's thunder). A game's moments set `flash` the same way.

Used by: `landing`, `cape`, `middle`, `shore`, `sea`, `valley`, `round-room`, `lantern-room`.
