# closeups — paws and things close (engine 3)

Shots for the inserts (`insert`) of the world's scenes: the knot of the net, Mama's needle, the lantern's handle, the
match at the wick, the matchbox, the mooring, the son's paws on the lantern. No faces. The paws: **Papa's**, **Mama's**,
**the son's** (round white Moomin paws, short soft fingers, a fine ink line), **the Fisherman's** hand (thin, grey,
knotted, the faded oilskin's sleeve). Their light is painted (the lantern's warm, the moon's cold, the lightning's
white); the scene's light does not fall on an insert.

## How a scene shows a shot

In the scene's `modules` — `closeups`. The insert's element — its id the shot's name, opened by the key `<shot>_open`
(0 closed … 1 open; in the scene's `states`):

```json
{ "id": "knot", "name": "The knot close", "insert": "knot_open" }
```

`elements/knot.js` (its code — painted once): `e.kit.closeups.paint(g, e, "knot");`

`elements/knot.animate.js` (every frame): `e.kit.closeups.live(e, "knot", { pull: e.state.knot, paws: e.state.knot_paws });`

- `paint(g, e, shot)` reads none of the scene's keys. `live(e, shot, now)` — `now` a plain object, its fields as in the
  table (a field missing — its default); it only moves layers and marks the points.
- The background is painted across the widest frame (21:9); the paws, the thing and every point within the middle 4:3,
  not low (not under the game's lines).

## Shots

| shot (= element id) | what is in it | `now` (default) | points |
| --- | --- | --- | --- |
| `knot` | the Fisherman's tarred net close, a hard knot in its mesh, cork floats; Papa's two paws at it | `pull` 0…1 (0) — the thread drawn slowly out of the knot, at 1 the knot loose; `paws` 0…1 (1) — Papa's paws there (0: the net alone — on the Fisherman's knees); `flash` 0…1 (0) — the lightning's white light over it | `knot#thread` — the thread's end to draw (moves with `pull`); `knot#knot` — the knot |
| `needle` | Mama's paws in the lantern's light: the needle held up in the left, the thread's end in the right | `thread` 0…1 (0) — the thread's end to the eye and through (1); `low` 0…1 (0) — the light turned low (dimmer, warmer) | `needle#eye` — the needle's eye; `needle#thread` — the thread's end (moves with `thread`) |
| `handle` | the lantern's bail: Papa's paw round it, the son's smaller paw closing on it beside his | `give` 0…1 (0) — Papa's paw opens and goes off; the son's closes and holds | `handle#papa` — Papa's paw; `handle#troll` — the son's |
| `match` | the burner's wick in the dark lamp; Papa's paw bringing a lit match to it, the draught bending its flame | `match` 0…1 (0) — the match from far to the wick; `lit` 0…1 (0) — the wick catching; `out` 0/1 (0) — the match's flame blown out | `match#flame` — the match's flame (moves with `match`); `match#wick` — the wick |
| `matchbox` | Papa's paw laying his matchbox into the Fisherman's open palm | `give` 0…1 (0) — the box from Papa's paw into the palm; `close` 0…1 (0) — the Fisherman's fingers close on it | `matchbox#box` — the box (moves with `give`); `matchbox#palm` — the palm |
| `mooring` | the boat's mooring rope round the iron ring in the rock, Papa's paw holding its end | `free` 0…1 (0) — the paw opens and the rope slips off the ring into the water | `mooring#rope` — the rope's end in the paw |
| `paws` | the son's paws round the lantern, white with rime; Mama's paws coming to rub them | `frost` 0…1 (1) — the rime on his paws; `rub` 0…1 (0) — Mama's paws over his, rubbing; `thaw` 0…1 (0) — the rime going | `paws#paws` — his paws |

The shot's name with no point (`knot`, `needle`, …) — the main thing in it.

## Where the points stand

In the shot's units: the frame's height, the origin in the frame's middle, y down (16:9 — x ±0.89; the middle 4:3 —
±0.667). On 4:3 and 21:9 all is the same about the middle.

| point | where (when it moves: from → to) |
| --- | --- |
| `knot#knot` (= `knot`) | (−0.08, −0.02) |
| `knot#thread` | (0.14, 0.05) → (0.46, 0.13) with `pull` |
| `needle#eye` (= `needle`) | (−0.06, −0.2) |
| `needle#thread` | (0.33, −0.13) → the eye at `thread` 0.85 → (−0.15, −0.215) at 1 |
| `handle#papa` | (0.1, −0.24); from `give` 0.3 up and off to (0.42, −0.66) |
| `handle#troll` | (−0.12, −0.235) |
| `match#flame` | (−0.4, 0.14) → (0.13, −0.01) with `match` |
| `match#wick` (= `match`) | (0.2, −0.03) |
| `matchbox#box` | (−0.34, −0.15) → (0.19, 0.04) with `give` (there from 0.8) |
| `matchbox#palm` (= `matchbox`) | (0.2, 0.07) |
| `mooring#rope` | (0.22, 0.05) |
| `paws#paws` | (0, 0.13) |

## Layers (what `live` moves)

The layers and the motions are inside the module; the scene need not know of them. A shot is painted once; while it
is open nothing is painted anew.

- `knot`: `hard`, `loose` (the knot tight and loosened, cross-faded by `pull`), `thread` (painted along +x from the
  knot, turned to its end and drawn out), `paw_l`, `paw_r` (with the thread's end), `flash` (a cold white, `add`).
- `needle`: `glow` (the lantern's light, flickering; dimmer at `low`), `hand` (her right paw and the thread, moved
  with its end), `dim` (the room darker at `low`); the needle and her left paw are the painting.
- `handle`: `glow`; `troll_open`, `troll_shut` (cross-faded); `papa_shut`, `papa_open` (cross-faded, then up and off).
- `match`: `wickglow`, `wick` (the wick's flame, grown from the wick by `lit`), `hand` (the paw and the match),
  `mflame` (its flame, bent by the draught), `smoke` (at `out`).
- `matchbox`: `f_open` (his open fingers), `box`, `papa` (with the box; from 0.8 back and gone), `f_shut` (his fingers
  closed over the box).
- `mooring`: `glints` (drifting on the water), `rope` (slips off and down whole), `shut`, `open` (Papa's paw).
- `paws`: `glow`, `cold` (his paws blued), `rime`, `warm` (pink coming back), `mama` (her paws coming down, rubbing).

## Checked

A trial spec with the seven inserts (`sheets/pm-closeups/closeups-trial.json` beside the world's clones, not a scene of
the world), rendered on the GPU: each shot at the start, in between and at the end of its fields, 16:9 and 21:9.
