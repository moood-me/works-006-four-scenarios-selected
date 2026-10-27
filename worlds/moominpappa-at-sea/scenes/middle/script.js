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
// «Охапка» (sway −1…1): the armful sways and Papa under it turns this way and that from the way he is going
const sway = () => {
  const [a, d] = L.ARMFUL[1], [a2, d2] = L.ARMFUL[2];
  scene.set('papa_turn', L.turnTo(a, d, a2, d2) + 14 * scene.get('sway'));
};
scene.on('change', 'sway', sway);
scene.on('move', 'sway', sway);
