# places — people at a scene's named places

For scenes whose people the game and the pieces put at named spots: `pier` (the boards, the pier's edge, the shallows,
the shore…), `bridge`, `potter-room`. (The `stone` has its own: lib.PLACES and script.js, turned to each other.)

The scene's lib gives `PLACES = {id: {name: {at: [across, distance], turn, on}}}` (`on` — a seat or a lying place, the
person's `_on`: `[across, distance, elevation]`); each person there has `"place": {"across": "<id>_a", "distance":
"<id>_d"}` and the scene's `states` declare `<id>_at` (its names), `<id>_a`, `<id>_d`, `<id>_placed`. The script calls
`scene.kit.places.follow(scene, scene.lib.PLACES)`: `<id>_at` set — put there at once (place, turn, seat); on opening,
put where `<id>_at` says unless `<id>_placed` says it is done. What they do there (`_do`), look at, reach for — the game's
and the pieces'; a walk from one place to another — a piece's (`walk`, then `<id>_at` named as it ends: nothing moves).
