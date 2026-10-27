// «The House» — the veranda's frame and the land outside it. The veranda is laid on the unseen anchor `veranda` at its
// far corner (across CX, distance CZ, facing 225): in its frame x runs along the back wall (the house's wall, the door
// to the room) to the right, z away behind it (the room); the glazed wall stands at x 0, the floor lies at x > 0,
// z < 0; behind the back wall (z > 0) is the house and the room. Round the house the rock falls away to the sea.
const { clamp } = anim;
const CX = -0.6;
const CZ = 7;
const K = Math.SQRT1_2;
const sm = u => {
  const v = clamp(u, 0, 1);
  return v * v * (3 - 2 * v);
};
// the veranda's frame from the world's metres, and back
const lx = (a, d) => K * (a - CX - (d - CZ));
const lz = (a, d) => K * (a - CX + (d - CZ));
const wa = (x, z) => CX + K * (x + z);
const wd = (x, z) => CZ + K * (z - x);
// the land's fall by how far out from the house (−x, metres: x 0 at its walls, negative outside)
const drop = x => 0.6 * sm(-x / 1.2) + 4.5 * sm((-x - 0.8) / 8);
// the land's height: level under the house (x 0…7, z −7…3.6 in the veranda's frame; its floors stand 0.3 m over it, on
// the anchor's elevation), falling away to the sea all round it — outside the glazing, behind the room
const ground = (a, d) => {
  const x = lx(a, d);
  const z = lz(a, d);
  return -drop(-Math.max(-x, z - 3.6, -z - 7, x - 7));
};
// the sea's surface, metres
const WATER = -4.4;
// how far out from the glazing the sea meets the rock (x in the veranda's frame)
let shore = -1;
for (let lo = -40, hi = 0, i = 0; i < 30; i++) {
  shore = (lo + hi) / 2;
  if (-drop(shore) > WATER) hi = shore;
  else lo = shore;
}
return { CX, CZ, lx, lz, wa, wd, ground, WATER, shore, sm };
