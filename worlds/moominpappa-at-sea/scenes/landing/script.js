// The landing rocks' mechanics: the storm's lightning (the island's); and what the game's keys put where — the pines
// creeping to the door (`pines`), the door's swing (`door`), the boat in the cove (`boat`, `boat_up`), the people at
// their places (`<id>_at`: lib.PLACES, put by the island's `places`); the boat off out of the cove (`boat_off`); the
// pieces (lib.FILM, the module beats). All from the state: a scene opened again goes on as it was.
const L = scene.lib;
scene.kit.island.lightning(scene);
scene.kit.island.beam(scene);
const mix = (a, b, u) => a + (b - a) * u;
function pines() {
  const u = scene.get('pines') ?? 0;
  L.PINES.forEach(([a0, d0, a1, d1], i) => {
    scene.set(`pine${i + 1}_a`, mix(a0, a1, u));
    scene.set(`pine${i + 1}_d`, mix(d0, d1, u));
  });
}
// the door: with the pines at the threshold it opens only so far — at `DOOR_STOP` it bumps a pine and swings back
// a little, and holds there (the door minigame pushes on)
let bumped = false;
function door() {
  const u = scene.get('door') ?? 0, stop = (scene.get('pines') ?? 0) >= 0.5 ? L.DOOR_STOP : 1, at = v => 180 - L.DOOR_OPEN * v;
  if (u < stop) {
    bumped = false;
    scene.set('door_turn', at(u));
    return;
  }
  if (bumped) return;
  bumped = true;
  scene.set('door_turn', at(stop));
  scene.move('door_turn', at(stop - 0.16), { over: 0.2, ease: 'out' });
  scene.after(0.2, () => scene.move('door_turn', at(stop), { over: 0.4, ease: 'inOut' }));
}
function boat() {
  const u = (scene.get('boat') ?? 'moored') === 'moored' ? scene.get('boat_up') ?? 0 : 1, [a0, d0, t0] = L.BOAT.moored, [a1, d1, t1] = L.BOAT.up;
  const o = scene.get('boat_off') ?? 0, [a2, d2, t2] = L.BOAT.off;
  scene.set('boat_a', mix(mix(a0, a1, u), a2, o));
  scene.set('boat_d', mix(mix(d0, d1, u), d2, o));
  scene.set('boat_turn', mix(mix(t0, t1, u), t2, o));
}
const follow = (key, fn) => {
  scene.on('change', key, fn);
  scene.on('move', key, fn);
};
follow('pines', pines);
follow('door', door);
follow('boat', boat);
follow('boat_up', boat);
follow('boat_off', boat);
pines();
door();
boat();
scene.kit.island.places(scene, L.PLACES);
// the pieces, as the game names them (`beat`)
scene.kit.beats.play(scene, L.FILM);
