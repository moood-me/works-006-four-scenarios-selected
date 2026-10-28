// The island's granite, draped over the relief, seen from above (modules/isle.md: granite — the rock worn smooth,
// its wet band at the water, cracks, lichen), and over it the shore's own: inland the thin grass and heather round the
// house, the worn path from the porch to the pier. Metres; the plane's middle is at across -24, distance 32.
const L = e.lib;
// August (`late`): the grass burnt
const late = e.state.late ?? 0;
const Z0 = -4;
const Z1 = 70;
const { X, Y, blob, edge } = e.kit.isle.granite(g, e, {
  centre: [-24, 32], size: [66, 76], z: [Z0, Z1], east: 10,
  mottle: [260, 40], band: [0.45, 0.2], cracks: [46, Z1 - Z0, 9], lichen: [220, Z1 - Z0, 7, 0.05, 0.22],
});
// inland: thin grass and heather from about four metres up the rock, its edge ragged; moss in the hollows before it
for (let i = 0; i < 160; i++) {
  const z = Z0 + (Z1 - Z0) * e.rnd();
  const x = L.coast(z) - 3.2 - 1.6 * e.rnd();
  blob(x, z, 0.3 + 0.7 * e.rnd(), 0.25 + 0.5 * e.rnd(), e.rnd() < 0.5 ? (late > 0.5 ? '#9a9468' : '#86926c') : late > 0.5 ? '#8d875e' : '#7a8662', 0.7);
}
g.globalAlpha = 1;
g.fillStyle = late > 0.5 ? '#a19a6e' : '#8b9573';
g.beginPath();
edge.forEach(([, z], i) => {
  const x = L.coast(z) - 4.3 - 0.5 * Math.sin(z * 1.7);
  if (i) g.lineTo(X(x), Y(z));
  else g.moveTo(X(x), Y(z));
});
g.lineTo(X(-60), Y(Z1));
g.lineTo(X(-60), Y(Z0));
g.closePath();
g.fill();
// in the grass: darker heather and lighter dry tufts, granite showing through
const GRASS = late > 0.5 ? ['#8f8a62', '#b0a67c', '#a89d8a', '#857f5c'] : ['#77825f', '#9aa27c', '#a59c8d', '#6c7757'];
for (let i = 0; i < 420; i++) {
  const z = Z0 + (Z1 - Z0) * e.rnd();
  const x = L.coast(z) - 4.6 - 50 * e.rnd() * e.rnd();
  blob(x, z, 0.3 + 1.1 * e.rnd(), 0.2 + 0.8 * e.rnd(), GRASS[i % 4], 0.6);
}
// the worn path: from the porch down to the rock by the pier and on along the rock to the sea's edge
g.globalAlpha = 0.55;
g.strokeStyle = '#a89d88';
g.lineJoin = 'round';
g.lineWidth = 0.7;
g.beginPath();
g.moveTo(X(-6.1), Y(13.9));
g.bezierCurveTo(X(-5.2), Y(12), X(-4), Y(10), X(-3.1), Y(8.6));
g.moveTo(X(-5.3), Y(12.4));
g.bezierCurveTo(X(-4), Y(13.4), X(-2.6), Y(15.6), X(-1.3), Y(16));
g.stroke();
g.globalAlpha = 1;
// under the clear water off the rock: the shelf — paler granite, weed in brown and green fronds, a white stone — and
// past its lip the deep, dark (painted last: the rock's own marks come out as approved)
g.globalAlpha = 1;
g.filter = 'blur(0.35px)';
for (let z = 2.5; z <= 9.5; z += 0.5) blob(L.coast(z) + 4.2, z, 1.4, 0.7, '#46524f', 0.55);
g.globalAlpha = 1;
g.fillStyle = '#a49c92';
g.beginPath();
for (let z = 4.6; z <= 7.2; z += 0.2) g.lineTo(X(L.coast(z) + 3.15), Y(z));
for (let z = 7.2; z >= 4.6; z -= 0.2) g.lineTo(X(L.shore(z) - 0.05), Y(z));
g.closePath();
g.fill();
for (let i = 0; i < 40; i++) {
  const z = 4.8 + 2.2 * e.rnd();
  const x = L.shore(z) + 0.2 + 2.5 * e.rnd();
  blob(x, z, 0.12 + 0.25 * e.rnd(), 0.05 + 0.08 * e.rnd(), e.rnd() < 0.5 ? '#6e7a4c' : '#8a7a46', 0.85);
}
g.filter = 'none';
blob(2.9, 5.95, 0.24, 0.17, '#ebe8e0', 1);
blob(2.95, 5.9, 0.12, 0.08, '#f7f5ef', 1);
e.at(X(0.9), Y(5.4), 'ledge');
e.at(X(2.6), Y(5.8), 'shelf');
e.at(X(-0.6), Y(6.6), 'warm');
g.globalAlpha = 1;
