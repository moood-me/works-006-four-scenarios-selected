// The cape's granite, draped over the relief, seen from above: bare pinkish-grey rock worn smooth by the sea, a dark
// wet band at the water, cracks running down to it, lichen in yellow and grey-green; inland, farther up the island, thin
// heather and moss in the hollows, then grass and heather toward the pines and the house. Metres; the plane's middle
// is at across CX, distance CZ: a point (x, z) of the world is (x - CX, CZ - z) here.
const L = e.lib;
const CX = -15;
const CZ = 47.5;
const X = x => x - CX;
const Y = z => CZ - z;
const Z0 = -5;
const Z1 = 100;
const blob = (x, z, rx, rz, color, alpha) => {
  g.globalAlpha = alpha;
  g.fillStyle = color;
  g.beginPath();
  g.ellipse(X(x), Y(z), rx, rz, 0, 0, 6.2832);
  g.fill();
};
// the granite
g.globalAlpha = 1;
g.fillStyle = '#b1a79f';
g.fillRect(-45, -52.5, 90, 105);
// mottled: lighter and darker grains of the rock, long along the slope
for (let i = 0; i < 300; i++) {
  const z = Z0 + (Z1 - Z0) * e.rnd();
  const x = L.coast(z) - 1 - 45 * e.rnd() * e.rnd();
  blob(x, z, 0.4 + 1.6 * e.rnd(), 0.3 + 1.2 * e.rnd(), e.rnd() < 0.5 ? '#c2b8af' : '#9f958d', 0.35);
}
// the land along the water: the wet band and, below it, the rock under the sea
const edge = [];
for (let z = Z0; z <= Z1; z += 0.5) edge.push([L.shore(z), z]);
const band = (inland, color, alpha) => {
  g.globalAlpha = alpha;
  g.fillStyle = color;
  g.beginPath();
  edge.forEach(([x, z], i) => (i ? g.lineTo(X(x - inland), Y(z)) : g.moveTo(X(x - inland), Y(z))));
  g.lineTo(X(40), Y(Z1));
  g.lineTo(X(40), Y(Z0));
  g.closePath();
  g.fill();
};
band(0.5, '#998f88', 0.6);
band(0.22, '#7d7772', 0.8);
band(-0.05, '#5d6866', 1);
// cracks: thin dark lines running down the slope to the sea, a little crooked
g.lineCap = 'round';
g.strokeStyle = '#6d6660';
for (let i = 0; i < 60; i++) {
  const z = Z0 + 40 * e.rnd();
  let x = L.coast(z) - 10 * e.rnd();
  let zz = z;
  g.globalAlpha = 0.55;
  g.lineWidth = 0.02 + 0.03 * e.rnd();
  g.beginPath();
  g.moveTo(X(x), Y(zz));
  const n = 3 + Math.floor(5 * e.rnd());
  for (let k = 0; k < n; k++) {
    x += 0.5 + 0.6 * e.rnd();
    zz += (e.rnd() - 0.5) * 0.9;
    g.lineTo(X(x), Y(zz));
  }
  g.stroke();
}
// lichen: small yellow, pale and grey-green rosettes on the open rock
const LICHEN = ['#cdb46a', '#d9d6c6', '#97a184', '#b9b58f'];
for (let i = 0; i < 320; i++) {
  const z = Z0 + 45 * e.rnd();
  const x = L.coast(z) - 0.6 - 12 * e.rnd();
  const r = 0.04 + 0.14 * e.rnd() * e.rnd();
  blob(x, z, r, r * (0.7 + 0.4 * e.rnd()), LICHEN[i % 4], 0.75);
}
// moss and heather in the hollows inland, thicker the farther up the island
for (let i = 0; i < 220; i++) {
  const z = Z0 + (Z1 - Z0) * e.rnd();
  const x = L.coast(z) - 7 - 45 * e.rnd() * e.rnd();
  blob(x, z, 0.3 + 1.0 * e.rnd(), 0.25 + 0.7 * e.rnd(), e.rnd() < 0.5 ? '#86926c' : '#7a8662', 0.6);
}
// up the island: the grass and heather round the house and the pines, its edge ragged
g.globalAlpha = 1;
g.fillStyle = '#87916f';
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
const GRASS = ['#77825f', '#9aa27c', '#a59c8d', '#6c7757'];
for (let i = 0; i < 300; i++) {
  const z = 26 + (Z1 - 26) * e.rnd();
  const x = L.coast(z) - 12 - 45 * e.rnd();
  blob(x, z, 0.5 + 1.5 * e.rnd(), 0.4 + 1.0 * e.rnd(), GRASS[i % 4], 0.6);
}
g.globalAlpha = 1;
