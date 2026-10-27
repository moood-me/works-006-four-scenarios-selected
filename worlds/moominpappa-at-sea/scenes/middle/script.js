scene.kit.island.lightning(scene);
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
