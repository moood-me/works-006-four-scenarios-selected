// The house's mechanics: the island's weather (the thick fog's look, the storm's lightning); the view (`view` — a cut
// to where the camera looks from, all its keys set, nothing left over from another view); where people stand
// (`<id>_at` — put there at once, turned, looking as the spot says; Sophia hand in hand with Grandmother when both are
// before the glass door; Papa with his mug at his table); where the hat, the lamp and the camp bed are; the window's
// leaf and the second door turned by `casement` and `creak`; Papa's lantern along its way by `far_light_at`.
const L = scene.lib;
scene.kit.isle.weather(scene);

function view() {
  const name = scene.get('view');
  const v = L.VIEW[name] ?? L.VIEW.veranda;
  const sophia = scene.get('sophia_at') === 'window' && scene.get('sophia_here') !== false;
  const h = name === 'face' && sophia ? L.faceH : v.h;
  scene.cut({ camera_target: null, camera_x: v.x, camera_z: v.z, camera_h: h, camera_yaw: v.yaw, camera_look: 0, camera_pitch: 0, camera_roll: 0 });
}
function people() {
  for (const id of ['grandma', 'sophia', 'papa']) {
    const s = L.SPOT[id][scene.get(`${id}_at`)];
    if (!s) continue;
    scene.set(`${id}_a`, s.a);
    scene.set(`${id}_d`, s.d);
    scene.set(`${id}_turn`, s.turn);
    scene.set(`${id}_look`, s.look);
  }
  const together = scene.get('grandma_at') === 'door' && scene.get('sophia_at') === 'door';
  scene.set('sophia_reach', together ? { r: 'grandma#hand_l' } : null);
  const table = scene.get('papa_at') === 'table';
  scene.set('papa_with', table ? ['mug'] : null);
  scene.set('papa_reach', table ? { r: [-0.795, 4.691, 1.45], l: [-0.727, 4.749, 1.45] } : null);
}
function things() {
  const [hx, hz, he, , ht] = L.HAT[scene.get('hat')] ?? L.HAT.nail;
  scene.set('hat_x', hx);
  scene.set('hat_z', hz);
  scene.set('hat_e', he);
  scene.set('hat_t', ht);
  const [lx, lz, le] = L.LAMP[scene.get('lamp')] ?? L.LAMP.table;
  scene.set('lamp_x', lx);
  scene.set('lamp_z', lz);
  scene.set('lamp_e', le);
  const [cx, cz, cf] = L.COT[scene.get('cot')] ?? L.COT.veranda;
  scene.set('cot_x', cx);
  scene.set('cot_z', cz);
  scene.set('cot_f', cf);
}
const leaf = () => scene.set('casement_f', 180 + 40 * (scene.get('casement') ?? 0));
const door2 = () => scene.set('door2_f', 270 - 80 * (scene.get('creak') ?? 0));
const lantern = () => {
  const [a, d] = L.far(scene.get('far_light_at') ?? 0);
  scene.set('far_a', a);
  scene.set('far_d', d);
};

scene.on('change', 'view', view);
for (const k of ['sophia_at', 'sophia_here']) scene.on('change', k, () => scene.get('view') === 'face' && view());
for (const k of ['grandma_at', 'sophia_at', 'papa_at']) scene.on('change', k, people);
for (const k of ['hat', 'lamp', 'cot']) scene.on('change', k, things);
for (const [k, f] of [['casement', leaf], ['creak', door2], ['far_light_at', lantern]]) {
  scene.on('change', k, f);
  scene.on('move', k, f);
}
view();
people();
things();
leaf();
door2();
lantern();
