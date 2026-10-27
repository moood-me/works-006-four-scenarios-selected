// The cape's mechanics: the storm's lightning (the island's); the Fisherman's net in his hands unless it is folded
// (`net`); the people at their places (`<id>_at`: lib.PLACES, put by the island's `places`).
const L = scene.lib;
scene.kit.island.lightning(scene);
scene.kit.island.beam(scene);
function net() {
  scene.set('fisher_with', (scene.get('net') ?? 'dry') === 'folded' ? [] : null);
}
scene.on('change', 'net', net);
net();
scene.kit.island.places(scene, L.PLACES);
