// The potter's room's mechanics: the people at their named places (places.md: `<id>_at`); the door turned by `door`
// (0 shut … 1 open: door_turn); the cup carried back to the shelf (М5): `carry` 0 → 1 walks the Fisherman from before the
// bench to the shelf, and `cup_tilt` −1…1 sways the hand that holds the cup (his right hand reaching a little before
// him, to one side and the other) — let go of (reach back to the motion's) once the cup is on the shelf
const L = scene.lib;
scene.kit.places.follow(scene, L.PLACES);
const door = () => scene.set('door_turn', 270 + 85 * Math.min(1, Math.max(0, Number(scene.get('door')) || 0)));
scene.on('change', 'door', door);
scene.on('move', 'door', door);
door();
const [A, B] = L.CARRY;
const carry = () => {
  const u = Math.min(1, Math.max(0, Number(scene.get('carry')) || 0));
  scene.set('fisherman_a', A[0] + (B[0] - A[0]) * u);
  scene.set('fisherman_d', A[1] + (B[1] - A[1]) * u);
  scene.set('fisherman_turn', 48);
  hand();
};
// the hand with the cup: before him on the way to the shelf, swayed to the side by the tilt
const hand = () => {
  if (scene.get('cup_at') !== 'hand' || !(Number(scene.get('carry')) > 0 || Number(scene.get('cup_tilt')))) return;
  const t = Math.max(-1, Math.min(1, Number(scene.get('cup_tilt')) || 0));
  const a = Number(scene.get('fisherman_a')) || 0, d = Number(scene.get('fisherman_d')) || 0;
  // (the way he goes: toward the shelf — 48° right of ahead; his right side 90° on)
  const f = [0.74, 0.67], s = [0.67, -0.74];
  scene.set('fisherman_reach', { r: [a + 0.32 * f[0] + 0.16 * t * s[0] + 0.12 * s[0], d + 0.32 * f[1] + 0.16 * t * s[1] + 0.12 * s[1], 1.08] });
};
scene.on('move', 'carry', carry);
scene.on('change', 'carry', carry);
scene.on('move', 'cup_tilt', hand);
scene.on('change', 'cup_tilt', hand);
scene.on('change', 'cup_at', v => { if (v === 'shelf') scene.set('fisherman_reach', null); });
