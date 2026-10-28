scene.kit.island.lightning(scene);
scene.kit.island.beam(scene);
// The pines creep toward the lighthouse as `pines` goes from 0 to 1: each its own place (pine<k>_a, pine<k>_d), set
// from where `pines` is now — when the scene opens, when it is set, and every frame while it moves.
const L = scene.lib;
const creep = () => {
  const u = scene.get('pines');
  for (let k = 0; k < L.PINES.length; k++) {
    const [a, d] = L.pineAt(k, u);
    scene.set(`pine${k + 1}_a`, a);
    scene.set(`pine${k + 1}_d`, d);
  }
};
creep();
scene.on('change', 'pines', creep);
scene.on('move', 'pines', creep);
// the pieces (lib.js `film`), played by `beat` through the world's `beats`
scene.kit.beats.play(scene, L.film(scene));
// «Охапка»: as the minigame moves armful_way (0 → 1) Papa walks on under the armful toward the ring, at its gait; the
// armful's sway (−1…1) turns him this way and that from the way he goes; leaned over to the edge (|sway| ≥ 0.92) some
// of it slides off — a burst of weed (spill counts them), once till it is upright again
const way = () => scene.person('papa').walk([L.along(L.ARMFUL_WAY, scene.get('armful_way'))]);
let over = false;
const sway = () => {
  const [a, d] = L.ARMFUL_WAY[0], [a2, d2] = L.ARMFUL_WAY[1], v = scene.get('sway');
  scene.set('papa_turn', L.turnTo(a, d, a2, d2) + 14 * v);
  if (!over && Math.abs(v) >= 0.92) { over = true; scene.set('spill', scene.get('spill') + 1); }
  if (over && Math.abs(v) < 0.4) over = false;
};
for (const [key, fn] of [['armful_way', way], ['sway', sway]]) {
  scene.on('change', key, fn);
  scene.on('move', key, fn);
}
