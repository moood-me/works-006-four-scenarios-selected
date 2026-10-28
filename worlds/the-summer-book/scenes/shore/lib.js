// «The Shore by the House» — the land's shape (relief.js reads it) and what the paintings share. The island is one
// smooth granite back sloping into the sea: the water's edge runs from near the viewer's right away to the left, the
// rock rises gently inland to the grass, the house and the pines on the island's crown; past it the island ends and
// the sea goes on.
const { clamp } = anim;
// the sea's surface, metres (the viewer stands at 0 on the rock)
const WATER = -0.55;
const sm = u => {
  const v = clamp(u, 0, 1);
  return v * v * (3 - 2 * v);
};
// the line the rock is laid along (where it is about half a metre over the sea), metres across at a distance
// (it bulges out round the house, 19 m ahead, where the island is broadest)
const coast = z => 2.4 - 0.2 * z + 1.6 * Math.exp(-(((z - 19) / 5) ** 2)) + 0.3 * Math.sin(1.1 * z + 1);
// the shelf: off the rock where the two stand, a level ledge of granite 0.72 m under the water, about two metres wide
// (between distances SHELF_Z0 and SHELF_Z1), and past it the deep — beyond three metres out the sea floor falls away
const SHELF = 0.72;
const SHELF_Z0 = 4.2;
const SHELF_Z1 = 7.6;
function raw(x, z) {
  const s = coast(z) - x;
  let h = -1.1 + 1.1 * sm((s + 2.5) / 5.7);
  h += 0.45 * sm((s - 4) / 10);
  h += 3.2 * sm((z - 18) / 16) * sm((s - 5) / 9);
  h += 0.12 * Math.sin(0.9 * x + 0.5 * z) * Math.sin(0.6 * z - 0.4 * x) * sm((s - 0.8) / 3.2);
  // the island ends: beyond 50 m ahead and 40 m to the left it goes down under the sea
  h -= 4.6 * sm((z - 48) / 14) + 4.6 * sm((-x - 38) / 12);
  // the shelf (its level set below, once ZERO is known) and the deep
  const m = sm((z - SHELF_Z0) / 0.8) * sm((SHELF_Z1 - z) / 0.8) * sm((0.1 - s) / 0.5) * sm((s + 3.1) / 0.4);
  return h * (1 - m) + SHELF_AT * m - 2.6 * sm((-s - 2.6) / 1.4) * (1 - m);
}
let SHELF_AT = 0;
const ZERO = raw(0, 0);
SHELF_AT = WATER - SHELF + ZERO;
const ground = (x, z) => raw(x, z) - ZERO;
// where the sea meets the rock at a distance: metres across (the rock falls toward the sea along x there)
function shore(z) {
  let a = coast(z) - 4;
  let b = coast(z) + 4;
  for (let i = 0; i < 24; i++) {
    const m = (a + b) / 2;
    if (ground(m, z) > WATER) a = m;
    else b = m;
  }
  return (a + b) / 2;
}
// the waterline, [[across, distance], …] (the island's sea washes it in a storm)
const edge = [];
for (let z = -4; z <= 60; z += 0.4) edge.push([shore(z), z]);
// the people's places (the island's places(): `<id>_at` names one) — where each stands, facing, and what they look at
// and reach for there; the approved look's: Grandmother and Sophia at the water's edge hand in hand, Papa on the grass
const PLACES = {
  grandma: {
    water: { at: [0.2, 4.0], turn: 150, look: [8, 5, 0.2], reach: { l: 'sophia#hand_r' } },
    ledge: { at: [0.6, 5.2], turn: 115, look: 'rock#shelf' },
    warm: { at: [-0.8, 6.3], turn: 150 },
    path: { at: [-3.4, 8.8], turn: 160 },
    gate: { at: [-3.3, 11.2], turn: 170 },
    porch: { at: [-6.9, 13.3], turn: 180 },
    peonies: { at: [-7.5, 13.9], turn: 195 },
    pier: { at: [7.2, 16.0], turn: 95, look: 'rowboat#gunwale' },
    net: { at: [4.6, 15.95], turn: 120, look: 'papa' },
    gangway: { at: [-4.1, 26.5], turn: 120, look: 'gangway#rail' },
    step: { at: [-6.35, 13.4], turn: 200, on: [-6.35, 13.62, 0.2], do: 'sit_stone' },
    knee: { at: [1.45, 5.6], turn: 230, look: 'sophia' },
    dinghy: { at: [1.6, 14.6], turn: 90, on: { on: 'dinghy', at: [-0.75, 0.25, 0.3] }, do: 'sit_stone' },
  },
  sophia: {
    water: { at: [0.68, 4.27], turn: 150, look: 'grandma', reach: { r: 'grandma#hand_l' } },
    edge: { at: [1.0, 5.5], turn: 110, look: 'rock#shelf' },
    shelf: { at: [2.6, 5.8], turn: 230, look: 'grandma' },
    warm: { at: [-0.1, 6.8], turn: 150 },
    graves: { at: [-1.3, 8.8], turn: 200, look: 'graves#pit' },
    porch: { at: [-6.2, 13.4], turn: 200 },
    pier: { at: [6.5, 16.0], turn: 95, look: 'rowboat#gunwale' },
    gangway: { at: [-4.6, 26.1], turn: 120 },
    dinghy: { at: [1.6, 14.6], turn: 270, on: { on: 'dinghy', at: [0.05, 0.25, 0.3] }, do: 'seated' },
  },
  papa: {
    lawn: { at: [-3, 8], turn: 150, look: 'grandma', reach: { r: [-2.893, 7.715, 1.15], l: [-2.807, 7.765, 1.15] } },
    veranda: { at: [-8.29, 16.85], turn: 165 },
    porch: { at: [-6.0, 13.0], turn: 170 },
    pier: { at: [1.0, 15.95], turn: 120 },
    net: { at: [5.6, 16.05], turn: 200, look: 'net#knot' },
    gangway: { at: [-3.4, 26.8], turn: 110 },
    dinghy: { at: [1.6, 14.6], turn: 90, on: { on: 'dinghy', at: [0.8, 0.25, 0.3] }, do: 'seated' },
  },
};
// the cat's places (cat_at): [across, distance, elevation over the land] and which way he faces (1 right, −1 left) —
// on the porch's landing, lying on its rail, on the path above the rock (where he comes from), on the rock past the
// two of them (where he goes)
const CAT = {
  porch: { at: [-6.09, 13.97, 0.62], dir: 1 },
  rail: { at: [-6.87, 14.53, 1.48], dir: 1 },
  path: { at: [-2.6, 7.9, 0], dir: 1 },
  past: { at: [1.0, 9.4, 0], dir: 1 },
};
// Eriksson's boat: from far out on the right, out of sight (rowboat 0), along the shore to the pier's end (1)
const ROWBOAT = [[70, 30], [30, 19], [10.6, 14.9]];
// the dinghy: moored by the pier's root; its circles before the rock (centre, radius); its way out along the shore
// to the gangway (dinghy_at 0 → 1)
const DINGHY = { moored: [1.6, 14.6, 180], circle: [4.0, 12.0, 1.5], out: [[1.6, 14.6], [2.8, 19], [2.4, 23], [-0.6, 26.2]] };
return { WATER, SHELF, coast, ground, shore, sm, edge, PLACES, ROWBOAT, DINGHY, CAT };
