// The valley's mechanics.
// - `where` names a set-up (lib.js SETUPS): where everyone is, sits, faces and looks, and the camera — put as one cut
//   as the scene opens (or is restored) and whenever the game names another.
// - The little fire in the moss: its grey smoke and its ember while it smoulders, white steam as the ladle quenches it
//   (`smoke`): what the emitters and the ember's light read (`smoke_grey`, `smoke_white`) is worked out here from
//   `moss` and `smoke`.
const L = scene.lib;
function setup() {
  const S = L.SETUPS[scene.get('where')] ?? L.SETUPS.garden, v = { ...L.CAMERA, ...S.camera, ...S.keys };
  for (const [id, p] of Object.entries(S.people)) {
    v[`${id}_a`] = p.a;
    v[`${id}_d`] = p.d;
    v[`${id}_turn`] = p.turn;
    v[`${id}_do`] = p.does;
    v[`${id}_look`] = p.look;
    v[`${id}_on`] = p.on;
  }
  scene.cut(v);
}
function smoke() {
  const on = scene.get('moss') === 'smoulder', k = scene.get('smoke') ?? 0;
  scene.set('smoke_grey', on ? 1 - k : 0);
  scene.set('smoke_white', on ? k : 0);
}
setup();
smoke();
scene.on('change', 'where', setup);
scene.on('change', 'moss', smoke);
scene.on('change', 'smoke', smoke);
scene.on('move', 'smoke', smoke);
