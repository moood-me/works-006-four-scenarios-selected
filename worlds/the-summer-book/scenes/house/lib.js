// «The House» — the house's frame, the land round it, where people stand and where the camera looks from. Everything of
// the house is laid on the unseen anchor `veranda` at the veranda's far corner (across CX, distance CZ, facing 225): in
// its frame x runs right along the back wall, z away behind it, y up from the floor (0.3 m over the land). The veranda
// is x 0…6.4, z −6.4…0 (its glazing at x 0, the house's wall with the doorway at z 0); behind that wall the room, x
// −2.7…2.3, z 0.1…3.8 (its window onto the cape in the far wall, the second door in the right wall to the entry). Round
// the house the rock falls to the sea; from the room's far side a long back of granite runs down to the cape, where
// Sophia's tent stands. tools/house.py writes scene.json from the same numbers — keep them the same.
const { clamp } = anim;
const CX = -0.6;
const CZ = 7;
const K = Math.SQRT1_2;
const sm = u => {
  const v = clamp(u, 0, 1);
  return v * v * (3 - 2 * v);
};
// the house's frame from the world's metres, and back
const lx = (a, d) => K * (a - CX - (d - CZ));
const lz = (a, d) => K * (a - CX + (d - CZ));
const wa = (x, z) => CX + K * (x + z);
const wd = (x, z) => CZ + K * (z - x);
// a way in the frame (dx, dz) as a bearing in the world (degrees: 0 ahead, 90 to the right)
const bearing = (dx, dz) => (Math.atan2(dx + dz, dz - dx) * 180) / Math.PI;
// the sea's surface, metres
const WATER = -4.4;
// the land's fall by how far out from the house's walls (s metres)
const drop = s => 0.6 * sm(s / 1.2) + 4.5 * sm((s - 0.8) / 8);
// how far out from the house a point of the frame is: the veranda and the rest of the house (x 0…7, z −7…3.9) and
// the room jutting out on the left behind the veranda (x −2.8…0, z 0…3.9)
const out = (x, z) => Math.min(Math.max(-x, x - 7, -z - 7, z - 3.9), Math.max(-x - 2.8, x, -z, z - 3.9));
// the back of granite from the room's window down to the cape: from W (by the window) to T (the cape, where the tent
// stands), u 0…1 along it, v metres aside
const W = [wa(0.3, 3.8), wd(0.3, 3.8)];
const T = [22.4, 71.3];
const RA = T[0] - W[0];
const RD = T[1] - W[1];
const RL = Math.hypot(RA, RD);
function ridge(a, d) {
  const pa = a - W[0];
  const pd = d - W[1];
  const u = (pa * RA + pd * RD) / (RL * RL);
  const v = Math.abs(pa * RD - pd * RA) / RL;
  const w = 6 + 4 * Math.sin(Math.PI * clamp(u, 0, 1));
  let h = -0.5 - 2.5 * sm(u);
  h += 0.25 * Math.sin(0.31 * a + 0.2 * d) * Math.sin(0.17 * d - 0.23 * a);
  h -= 5.5 * sm((v - w) / 6);
  h -= 6 * sm((-u * RL) / 4);
  h -= 6 * sm(((u - 1) * RL) / 7);
  return h;
}
// whether a point is on the back's crest (its middle, along the way down to the cape)
function crest(a, d) {
  const pa = a - W[0];
  const pd = d - W[1];
  const u = (pa * RA + pd * RD) / (RL * RL);
  const v = Math.abs(pa * RD - pd * RA) / RL;
  return u > 0.02 && u < 1.02 && v < 0.7 * (6 + 4 * Math.sin(Math.PI * clamp(u, 0, 1)));
}
// the land's height: level under the house, falling away to the sea all round it, and the cape's back behind it
const ground = (a, d) => Math.max(-drop(out(lx(a, d), lz(a, d))), ridge(a, d));
// the waterline round the house and along the cape ([[across, distance], …]: the storm's foam) — from a ring well out
// at sea in toward the land's middle, where the water first meets the rock
const edge = [];
for (let i = 0; i < 160; i++) {
  const t = (i / 160) * 2 * Math.PI;
  const sa = Math.sin(t);
  const sd = Math.cos(t);
  const ca = 6 + 22 * sa;
  const cd = 32 + 50 * sd;
  const at = r => ground(ca - sa * r * 22, cd - sd * r * 50) > WATER;
  if (at(0) || !at(1)) continue;
  let lo = 0;
  let hi = 1;
  for (let k = 0; k < 20; k++) {
    const r = (lo + hi) / 2;
    if (at(r)) hi = r;
    else lo = r;
  }
  edge.push([ca - sa * hi * 22, cd - sd * hi * 50]);
}
// where people stand (`<id>_at`): the frame's x, z, the way they face (dx, dz), what they look at
const P = (x, z, dx, dz, look) => ({ a: wa(x, z), d: wd(x, z), turn: bearing(dx, dz), look: look ?? null });
// the tent on the cape (its candle's place) and the moon over the sea beyond it, as world points to look at
const TENT = [T[0], T[1], 1.0];
const MOON = [wa(0.3, 3.8) + 200 * Math.sin(0.384), wd(0.3, 3.8) + 200 * Math.cos(0.384), 30];
const SPOT = {
  grandma: {
    // on the veranda before the door, looking down at Sophia (stage 2's)
    door: { a: 0.036, d: 4.384, turn: 175, look: 'sophia' },
    table: P(0.95, -2.7, 0.25, 1, 'papa'),
    bed: P(-1.65, 1.45, 3.65, -1.1),
    window: P(-0.05, 3.3, -0.5, 0.87, TENT),
    chair: P(0.8, 2.9, 1.2, -2.55),
    door2: P(1.8, 1.25, 0.6, 1, 'door2#handle'),
  },
  sophia: {
    door: { a: 0.39, d: 3.606, turn: 190, look: [0.25, 2.9, 0.3] },
    bed: P(-1.0, 1.75, 3, -1.4),
    window: P(0.1, 3.38, -0.6, 0.8, MOON),
    door2: P(1.5, 0.75, 0.3, 1, 'grandma'),
  },
  papa: {
    table: { a: -0.954, d: 4.95, turn: 150, look: 'grandma' },
    cot: P(4.4, -1.1, 0.97, -3.43),
    doorway: P(1.72, -0.25, 0, 1, 'pillow#pillow'),
    room: P(1.1, 1.5, -1, 0.5),
    door2: P(2.8, 2.15, -1, -0.2, 'grandma'),
  },
};
// the views (`view`): where the camera stands (the frame's x, z), the point it looks toward, how much higher than the
// viewer's eyes (1.4 m over the floor) — as the camera's keys from the start
const V = (x, z, ax, az, h) => ({ x: wa(x, z), z: wd(x, z), h, yaw: bearing(ax - x, az - z) });
const VIEW = {
  // the veranda from inside, into its far corner (stage 2's)
  veranda: { x: 0, z: 0, h: 0, yaw: 0 },
  // the room from inside its doorway: the beds, the window onto the cape, the armchair
  room: V(2.0, 0.35, -0.7, 3.4, 0.15),
  // at the window, from behind the one standing there on the right: her face in the glass, the cape beyond
  window: V(1.25, 1.75, 0.05, 3.5, -0.2),
  // close on the face of the one at the window, from beside the night table: she looks out at the moon, the tent
  // (the eyes' height hers: Sophia's when she is there, else Grandmother's — `faceH`)
  face: V(-0.85, 2.95, 0.0, 3.35, 0.08),
  // from the beds' side to the second door and the doorway to the veranda
  door: V(-0.6, 1.2, 2.3, 1.75, 0.1),
};
// where things stand by their keys, in the frame (x, z, y — over the floor)
const LAMP = { table: [-0.52, 3.6, 0.6], window: [0.05, 3.71, 0.84], burnt: [0.05, 3.71, 0.84], none: [0.05, 3.71, 0.84] };
// the hat on its nail by the door (facing the veranda), lying on Sophia's bed (face up), gone
const HAT = { nail: [2.45, -0.03, 1.38, 180, 0], bed: [-1.12, 2.45, 0.52, 180, 90], none: [2.45, -0.03, 1.38, 180, 0] };
// Papa's camp bed along the veranda's back wall, or in the room before the window onto the cape
// (x, z, facing; in the room its head under the window, along the room)
const COT = { veranda: [4.6, -0.45, 180], room: [0.3, 2.8, 90] };
// the face view's camera height for Sophia's eyes (Grandmother's is the view's own)
const faceH = -0.33;
// Papa's lantern going out to the cape and back: from the porch round the house (u 0) to the tent (u 1)
const FAR0 = [wa(2.6, 4.6), wd(2.6, 4.6)];
const far = u => [FAR0[0] + (T[0] - 1.5 - FAR0[0]) * u, FAR0[1] + (T[1] - 2.5 - FAR0[1]) * u];
return { CX, CZ, K, lx, lz, wa, wd, bearing, ground, ridge, crest, out, WATER, edge, sm, W, T, TENT, MOON, SPOT, VIEW, LAMP, HAT, COT, faceH, far };
