// The valley's mechanics.
// - The little fire in the moss: its grey smoke and its ember while it smoulders, white steam as the ladle quenches it
//   (`smoke`): what the emitters and the ember's light read (`smoke_grey`, `smoke_white`) is worked out here from
//   `moss` and `smoke`.
// - The pieces, as the game names them (`beat`; lib.FILM, the module beats).
const L = scene.lib;
function smoke() {
  const on = scene.get('moss') === 'smoulder', k = scene.get('smoke') ?? 0;
  scene.set('smoke_grey', on ? 1 - k : 0);
  scene.set('smoke_white', on ? k : 0);
}
smoke();
scene.on('change', 'moss', smoke);
scene.on('change', 'smoke', smoke);
scene.on('move', 'smoke', smoke);
scene.kit.beats.play(scene, L.FILM);
