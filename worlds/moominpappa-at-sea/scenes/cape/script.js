// The cape's mechanics: the storm's lightning and the beam (the island's); the Fisherman's net in his hands unless it
// is folded (`net`: his look's net taken off by `fisher_wear`, the folded roll is the element `net`); the people at their places (`<id>_at`: lib.PLACES, put by the island's `places`); Papa along the
// way over the rocks by the minigames' keys — `cross` (0…3: at each hold, the storm) and `carry` (0…1: the pie, the
// bread); the pieces (lib.FILM, the module beats).
const L = scene.lib;
scene.kit.island.lightning(scene);
scene.kit.island.beam(scene);
function net() {
  scene.set('fisher_wear', (scene.get('net') ?? 'dry') === 'folded' ? { parts: [] } : null);
}
scene.on('change', 'net', net);
net();
scene.kit.island.places(scene, L.PLACES);
// Papa along the way: `u` 0…4 (way0 before the first hold … way4 by him), only while a piece of the way plays
const along = u => {
  const k = Math.max(0, Math.min(L.WAY.length - 2, Math.floor(u))), f = Math.max(0, Math.min(1, u - k)), [a0, d0] = L.WAY[k], [a1, d1] = L.WAY[k + 1];
  scene.set('papa_a', a0 + (a1 - a0) * f);
  scene.set('papa_d', d0 + (d1 - d0) * f);
};
const onWay = () => ['crossing', 'pie_way', 'bread_way'].includes(scene.get('beat'));
scene.on('change', 'cross', v => onWay() && along(+v || 0));
const carry = () => onWay() && along(4 * (scene.get('carry') ?? 0));
scene.on('change', 'carry', carry);
scene.on('move', 'carry', carry);
scene.kit.beats.play(scene, L.FILM);
