// The new house's mechanics, all from the state (a scene opened again goes on as it was): the island's weather (the
// thick fog's look, the storm's lightning); the people at their places (`<id>_at`: lib.PLACES — Grandmother sitting on
// the bed's foot as the place says); the veranda's window leaf turned by `sash`; the drawers pulled one after another
// by `drawers`; Grandmother's lantern — in her hand (its light at her left hand), on the table, on the floor, or none;
// the view (`view`: a cut to where the camera looks from, all its keys set, nothing left over from another view).
const L = scene.lib;
const isle = scene.kit.isle;
isle.weather(scene);

// what a place has them do and sit on (before the island's places: they mark the place as put)
const sit = id => {
  const at = scene.get(`${id}_at`);
  const p = L.PLACES[id][at];
  if (!p || scene.get(`${id}_placed`) === at) return;
  scene.set(`${id}_do`, p.do ?? 'stand');
  scene.set(`${id}_on`, p.on ?? null);
};
for (const id in L.PLACES) {
  scene.on('change', `${id}_at`, () => sit(id));
  sit(id);
}
isle.places(scene, L.PLACES);

// the veranda's window leaf: hinged at its left, swinging out toward the rock (0 shut … 1 open, 75°)
const sash = () => scene.set('sash_f', 180 + 75 * (scene.get('sash') ?? 0));
// the drawers, the top one first
const drawers = () => {
  const u = scene.get('drawers') ?? 0;
  for (let k = 0; k < 3; k++) scene.set(`drawer${k + 1}_x`, L.CHEST.front - L.pulled(k, u));
};
for (const [k, f] of [['sash', sash], ['drawers', drawers]]) {
  scene.on('change', k, f);
  scene.on('move', k, f);
  f();
}

// the lantern: its light in Grandmother's hand, or the lantern standing where it is set
const lantern = () => {
  const at = scene.get('lantern');
  scene.set('lantern_held', at === 'hand' ? 1 : 0);
  const p = L.LANTERN[at];
  scene.set('lantern_set', p ? 1 : 0);
  if (!p) return;
  scene.set('lantern_x', p[0]);
  scene.set('lantern_z', p[1]);
  scene.set('lantern_e', p[2]);
};
scene.on('change', 'lantern', lantern);
lantern();

// the view: a cut, every camera key set
const view = () => {
  const v = L.VIEW[scene.get('view')];
  if (!v) {
    scene.warn(`view: no view "${scene.get('view')}" — the views: ${Object.keys(L.VIEW).join(', ')}`);
    return;
  }
  scene.cut({ camera_target: null, camera_pitch: 0, camera_roll: 0, ...v });
};
scene.on('change', 'view', view);
view();
