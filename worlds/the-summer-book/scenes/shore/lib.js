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
function raw(x, z) {
  const s = coast(z) - x;
  let h = -1.1 + 1.1 * sm((s + 2.5) / 5.7);
  h += 0.45 * sm((s - 4) / 10);
  h += 3.2 * sm((z - 18) / 16) * sm((s - 5) / 9);
  h += 0.12 * Math.sin(0.9 * x + 0.5 * z) * Math.sin(0.6 * z - 0.4 * x) * sm((s - 0.8) / 3.2);
  // the island ends: beyond 50 m ahead and 40 m to the left it goes down under the sea
  h -= 4.6 * sm((z - 48) / 14) + 4.6 * sm((-x - 38) / 12);
  return h;
}
const ZERO = raw(0, 0);
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
return { WATER, coast, ground, shore, sm, edge };
