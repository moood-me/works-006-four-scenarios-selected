// The island's granite, draped over the relief, seen from above (modules/isle.md: granite — the rock worn smooth,
// its wet band at the water, cracks, lichen), and over it the shore's own: inland the thin grass and heather round the
// house, the worn path from the porch to the pier. Metres; the plane's middle is at across -24, distance 32.
const L = e.lib;
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
  blob(x, z, 0.3 + 0.7 * e.rnd(), 0.25 + 0.5 * e.rnd(), e.rnd() < 0.5 ? '#86926c' : '#7a8662', 0.7);
}
g.globalAlpha = 1;
g.fillStyle = '#8b9573';
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
const GRASS = ['#77825f', '#9aa27c', '#a59c8d', '#6c7757'];
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
