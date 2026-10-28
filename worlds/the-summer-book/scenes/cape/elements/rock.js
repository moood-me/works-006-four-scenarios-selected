// The cape's granite, draped over the relief, seen from above (modules/isle.md: granite — bare pinkish-grey rock worn
// smooth by the sea, the wet band at the water, cracks, lichen), and over it the cape's own: moss and heather in the
// hollows inland, then grass and heather up the island toward the pines and the house (burnt in August: `late`).
// Metres; the plane's middle is at across -15, distance 47.5.
const L = e.lib;
const late = e.state.late ?? 0;
const Z0 = -5;
const Z1 = 100;
const { X, Y, blob } = e.kit.isle.granite(g, e, {
  centre: [-15, 47.5], size: [90, 105], z: [Z0, Z1], east: 40,
  mottle: [300, 45], band: [0.5, 0.22], cracks: [60, 40, 10], lichen: [320, 45, 12, 0.04, 0.14],
});
// moss and heather in the hollows inland, thicker the farther up the island
const MOSS = late > 0.5 ? ['#968f66', '#8a855c'] : ['#86926c', '#7a8662'];
for (let i = 0; i < 220; i++) {
  const z = Z0 + (Z1 - Z0) * e.rnd();
  const x = L.coast(z) - 7 - 45 * e.rnd() * e.rnd();
  blob(x, z, 0.3 + 1.0 * e.rnd(), 0.25 + 0.7 * e.rnd(), MOSS[e.rnd() < 0.5 ? 0 : 1], 0.6);
}
// up the island: the grass and heather round the house and the pines, its edge ragged
g.globalAlpha = 1;
g.fillStyle = late > 0.5 ? '#a0996d' : '#87916f';
g.beginPath();
for (let z = 26; z <= Z1; z += 1) {
  const x = L.coast(z) - 12 - 6 * L.sm((60 - z) / 30) - 1.2 * Math.sin(z * 0.9);
  if (z === 26) g.moveTo(X(x), Y(z));
  else g.lineTo(X(x), Y(z));
}
g.lineTo(X(-60), Y(Z1));
g.lineTo(X(-60), Y(26));
g.closePath();
g.fill();
const GRASS = late > 0.5 ? ['#8f8a62', '#b0a67c', '#a89d8a', '#857f5c'] : ['#77825f', '#9aa27c', '#a59c8d', '#6c7757'];
for (let i = 0; i < 300; i++) {
  const z = 26 + (Z1 - 26) * e.rnd();
  const x = L.coast(z) - 12 - 45 * e.rnd();
  blob(x, z, 0.5 + 1.5 * e.rnd(), 0.4 + 1.0 * e.rnd(), GRASS[i % 4], 0.6);
}
g.globalAlpha = 1;
