# closeups — paws and things close (engine 3)

Shots for the inserts (`insert`) of the world's scenes: the knot of the net, Mama's needle, the lantern's handle, the
match at the wick, the matchbox, the mooring, the son's paws on the lantern. No faces. The paws: **Papa's**, **Mama's**,
**the son's** (round white Moomin paws, short soft fingers, a fine ink line), **the Fisherman's** hand (thin, grey,
knotted, the faded oilskin's sleeve). Their light is painted (the lantern's warm, the moon's cold, the lightning's
white); the scene's light does not fall on an insert.

*Names first (stage 5): the shots, their fields and points below are the contract; the drawing is being made.*

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
