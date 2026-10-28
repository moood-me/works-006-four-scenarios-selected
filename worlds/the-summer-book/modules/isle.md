# isle — the island's sea and sky, by the hour and the weather

One island for every scene of «The Summer Book» that sees its sea or sky (`shore`, `cape`, `house` through its
windows, `forest`, `new-house`, `sea`): the same sky, sea, mist and fog, granite and pines, in the same hand. Painted
once, in daylight colours; the hour and the weather are the scene's light (its looks) and the sky's shader, and the
sea's and the mist's layers moved by their animates — no painting reads a key that moves. In the scene's `modules`:
`["cast", "isle"]`; `e.kit.isle` in code, `kit.isle` in the lib, `scene.kit.isle` in scripts.

## The common keys

`dawn`, `dusk`, `night` 0…1 (looks of the light; the day is all 0; a later one over an earlier: late → dawn → dusk →
night), `late` 0…1 (August: the sun lower, the light warmer; changes between steps — a scene's own painting may read
it, the burnt grass), `calm` (the July dead calm: the sea glass), `storm` (white-grey sky, heavy clouds, grey light, rain,
wind, crests and foam; over a half — lightning now and then, `flash:strike` told), `flash` (lightning: a far light,
the look `flash`, the bolt and the lit sky), `fog` (up to a half — its banks over the water and its wall on the
horizon, as a scene's mist elements say; over a half — the island in it: the look `fog_air`, the sky gone white), `moon`
(the phase, 0 a crescent … 1 full; default full). `fog_air` is the scene's own: the island's script sets it from `fog`.
Defaults (the empty play: a June day) and `states` — `tools/isle.py` `STATE`, `STATES`.

The day is the veranda's approved morning, the dawn the shore's approved June dawn, the dusk and the night the
cape's approved August dusk and moonlit night: a scene moved onto the island looks as it did at its hour.

## What a scene writes (tools/isle.py)

A scene's generator (`tools/<scene>.py`, run `python -B tools/<scene>.py <world>`) takes from `tools/isle.py`:

- `light(wind, **extra)` — the day as the base light (`extra`: the scene's own fields, a room's `inside`), the looks
  `late`, `dawn`, `dusk`, `night`, `fog_air`, `storm`, `flash`.
- `lights(sun, late, dawn, dusk, moon, bolt)` — the far lights `sun`, `sun_late`, `sun_dawn`, `sun_dusk`, `moon` (each
  `(from, colour, strength)`, `from` the sky's point — `"sky#sun"`, `"sky#sun_late"`, `"sky#sun_dawn"`, `"sky#moon"` —
  or `[bearing, height]` where its disc is not ahead), `flash` from `bolt` `[bearing, height]`. Light ids are these;
  the looks turn them by the hour.
- `sky(folder, low, sun, late, dawn, dusk_x, night_x, bolt, moon=None, band_x)` — writes `elements/sky.js`,
  `sky.animate.js`, `sky.wgsl` (copied from `tools/isle/sky.wgsl`: the same text everywhere — a change is made there and
  every generator run again) and returns the element. Positions in stage heights; `low` = the scene's horizon.
- `sea(folder, elevation, reflect, centre, size, clear)` — writes `elements/sea.js`, `sea.animate.js`, returns the
  plane. The scene's lib gives `WATER`, `ground(across, distance)` and `edge` (`[[across, distance], …]` along its
  waterline: the storm's foam). `clear` — where the water is clear over the rock under it (the bottom seen).
- `RAIN` — rain on `storm`; `STATE`, `STATES`; `write_json(path, spec)` (UTF-8, `\n`).

The scene's `script.js` calls `scene.kit.isle.weather(scene)` (`fog_air` from `fog`; the storm's lightning).

## The painters (modules/isle.js)

- `sky(g, e, o)` / `skyMove(e, {moon})` — written by `tools/isle.py`. Points `sky#sun`, `#sun_late`, `#sun_dawn`,
  `#moon` (when the moon is ahead); glows of the same names (the mirror draws their paths on the sea).
- `sea(g, e, o)` / `seaMove(e)` — layers `streaks` (gone as `calm` comes), `crests_a`, `crests_b`, `foam` (by `storm`).
- `mist(g, e, {box, layers: [{name, n, y, thick, len: [min, max], color, alpha, drift, soft}]})` — banks on the water,
  each layer drifting; `wall(g, e, {len, high})` — the fog's wall on the horizon (layer `wall`); `fogMove(e, {layer:
  [a0, k]})` — in their animates: each layer's alpha a0 + k · fog.
- `granite(g, e, {centre, size, z, east, mottle, band, cracks, lichen})` — the draped rock; the lib gives `coast(z)`,
  `shore(z)`. Returns `{X, Y, blob, edge}` for the scene's own grass and paths after it.
- `pine`, `juniper`, `tuft`, `skerry`, `islet` (g, e) — boxes in their comments; `glow`, `soft`, `sm`, `fogK`.

## Engine limits met

- A plane with its own shader does not hide what is under or behind it (2026-10-27): with a `sea.wgsl` on the shore's
  sea the pier's posts below the water and the boat's hull under the waterline showed through it; without the shader
  they are hidden. So the sea's weather is layers moved by its animate, not a shader (reported).
- A mirror's `strength`, `rough`, `ripple` are fixed numbers, not keys: the storm's sea mirrors as the calm one does,
  only its crests, foam and the grey sky it mirrors tell it (reported).

Used by: `shore`.
