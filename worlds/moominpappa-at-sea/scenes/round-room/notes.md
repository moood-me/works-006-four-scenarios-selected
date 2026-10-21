# The Round Room (С4 of the game «Папа и море»)

The room at the lighthouse's foot on the first evening (2.6, the supper): the storm lantern in the middle of the table,
Moominmamma on a stool at its end and Little My sitting on its corner, Moominpappa standing by the stair to the hatch,
Moomintroll at the window with his back to them all; the night sea with its white crests through the window, the
moon's light coming in at it. Everyone looks at the lantern but the boy (My looks at him).

- The room is a circle (`lib.js`: `C`, `R`, `H`; `at(angle, r)` — an angle is a bearing from `C`). Its wall is bent
  sheets of that circle (forms, `kit.bend` with a negative angle: concave toward the room): `wall_a` from −150° round
  to the window, `wall_b` from the window to 150°, `win_low` and `win_top` the window's column under and over the
  opening. The near part of the circle (behind the viewer) is not built: the room is seen from its open side.
- The window (`WIN`): an opening 1.2 m wide, sill 0.65, top 2.3, in a wall 0.6 thick — its cheeks (`reveal`, two
  copies), the deep sill (a plane; Moominmamma's first painted flowers on it), the casement out at the glass and the
  glass (a pane: the room mirrored faintly in it).
- The ceiling is a plane turned face down (`tilt` 180): its painting's y runs away from the viewer; the hatch is over
  the stair's top.
- Light: the lantern's flame (`lantern#flame`, light `lamp`), the moon from the right only through the window's
  opening (a polygon at the glass: its patch on the floor by the window, its shafts in the air, dust in them), the
  window's own cool light into the room (`window_light`). Everything in the room says `inside`.
- The keeper's wall (`wall_a`, behind the table): his pencil lines with a knot under each (four legible, through
  `tr`), the lowest faint under dust; Moominpappa's «23 August. Arrived.» across «Nobody again». Points:
  `wall_a#nobody`, `wall_a#log`, `wall_a#keeper`, `sill#garden`, `shelf#paraffin`, `stair#stair`, `stair#hatch`,
  `casement#window`, `stove#stove`, `lantern#flame`.
- People (the world's cast): papa stands (`hands_behind`), mama and My sit (`seated`, `<id>_on` — the stool's top,
  the table's), troll stands at the window. Little My came into the cast with this scene.
- The numbers of `scene.json` come from the circle: `tools/round_room.py` writes the file (a wall from angle a to b
  stands at `at((a + b) / 2)`, facing `(a + b) / 2 + 180`, `R · (b − a)` metres wide, bent `−(b − a)` — `lib.js`
  `WALLS` the same for the paintings; the window's cheeks, sill, glass and the moon's polygon from `WIN`). Change
  `C`, `R` or `WIN` in both and run it.
- Stage 2 (the look) only: people stand or sit and breathe; no motions, no camera moves, no showcase yet.
