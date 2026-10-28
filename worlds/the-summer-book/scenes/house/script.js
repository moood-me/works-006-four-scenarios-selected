// The house's mechanics: its pieces (the game sets `beat`: modules/beats, lib.film); the island's weather (the thick
// fog's look, the storm's lightning); where the hat, the lamp (lifted at the glass by `lamp_up`), the camp bed (carried
// before Papa while `cot_carried`) and the doctor's drops (`drops_at`) are; the window's leaf and the second door
// turned by `casement` and `creak`; Papa's lantern along its way by `far_light_at`.
const L = scene.lib;
scene.kit.isle.weather(scene);
scene.kit.beats.play(scene, L.film(scene));

function hat() {
  const [x, z, e, , t] = L.HAT[scene.get('hat')] ?? L.HAT.nail;
  scene.set('hat_x', x);
  scene.set('hat_z', z);
  scene.set('hat_e', e);
  scene.set('hat_t', t);
}
function lamp() {
  const [x, z, e] = L.LAMP[scene.get('lamp')] ?? L.LAMP.table;
  scene.set('lamp_x', x);
  scene.set('lamp_z', z);
  scene.set('lamp_e', e + L.LIFT * (scene.get('lamp_up') ?? 0));
}
function drops() {
  const [x, z, e] = L.DROPS[scene.get('drops_at')] ?? L.DROPS.sill;
  scene.set('drops_x', x);
  scene.set('drops_z', z);
  scene.set('drops_e', e);
}
// the camp bed at its place; carried, it goes before Papa, lengthwise, a little off the floor
function cot() {
  if (scene.get('cot_carried')) {
    const a = scene.get('papa_a'), d = scene.get('papa_d'), b = ((scene.get('papa_turn') ?? 0) * Math.PI) / 180;
    const sa = Math.sin(b), cb = Math.cos(b), fx = L.K * (sa - cb), fz = L.K * (sa + cb);
    scene.set('cot_x', L.lx(a, d) + 0.75 * fx);
    scene.set('cot_z', L.lz(a, d) + 0.75 * fz);
    scene.set('cot_f', (Math.atan2(fx, fz) * 180) / Math.PI + 90);
    scene.set('cot_e', 0.25);
    return;
  }
  const [x, z, f] = L.COT[scene.get('cot')] ?? L.COT.veranda;
  scene.set('cot_x', x);
  scene.set('cot_z', z);
  scene.set('cot_f', f);
  scene.set('cot_e', 0);
}
const leaf = () => scene.set('casement_f', 180 + 40 * (scene.get('casement') ?? 0));
const door2 = () => scene.set('door2_f', 270 - 80 * (scene.get('creak') ?? 0));
const lantern = () => {
  const [a, d] = L.far(scene.get('far_light_at') ?? 0);
  scene.set('far_a', a);
  scene.set('far_d', d);
};

for (const [k, f] of [['hat', hat], ['lamp', lamp], ['drops_at', drops], ['cot', cot], ['cot_carried', cot]]) scene.on('change', k, f);
for (const [k, f] of [['lamp_up', lamp], ['casement', leaf], ['creak', door2], ['far_light_at', lantern], ['papa_a', cot], ['papa_d', cot],
  ['papa_turn', cot]]) {
  scene.on('change', k, f);
  scene.on('move', k, f);
}
hat();
lamp();
drops();
cot();
leaf();
door2();
lantern();
