// The island's granite, draped over the relief, seen from above: pinkish-grey rock worn smooth, a dark wet band at
// the water, cracks running down to the sea, lichen in yellow and grey-green, moss in the hollows, and inland the thin
// grass and heather round the house, the worn path from the porch to the pier. Metres; the plane's middle is at
// across CX, distance CZ: a point (x, z) of the world is (x - CX, CZ - z) here.
const L = e.lib;
const CX = -24;
const CZ = 32;
const X = x => x - CX;
const Y = z => CZ - z;
const Z0 = -4;
const Z1 = 70;
const blob = (x, z, rx, rz, color, alpha) => {
  g.globalAlpha = alpha;
  g.fillStyle = color;
  g.beginPath();
  g.ellipse(X(x), Y(z), rx, rz, 0, 0, 6.2832);
  g.fill();
};
// the granite
g.globalAlpha = 1;
g.fillStyle = '#b3a9a1';
g.fillRect(-33, -38, 66, 76);
// mottled: lighter and darker grains of the rock, long along the slope
for (let i = 0; i < 260; i++) {
  const z = Z0 + (Z1 - Z0) * e.rnd();
  const x = L.coast(z) - 1 - 40 * e.rnd() * e.rnd();
  blob(x, z, 0.4 + 1.6 * e.rnd(), 0.3 + 1.2 * e.rnd(), e.rnd() < 0.5 ? '#c3b9b0' : '#a1978f', 0.35);
}
// the land along the water: the wet band and, below it, the rock under the sea (seen only where the sea is clear)
const edge = [];
for (let z = Z0; z <= Z1; z += 0.5) edge.push([L.shore(z), z]);
const band = (inland, color, alpha) => {
  g.globalAlpha = alpha;
  g.fillStyle = color;
  g.beginPath();
  edge.forEach(([x, z], i) => (i ? g.lineTo(X(x - inland), Y(z)) : g.moveTo(X(x - inland), Y(z))));
  g.lineTo(X(10), Y(Z1));
  g.lineTo(X(10), Y(Z0));
  g.closePath();
  g.fill();
};
band(0.45, '#9b928b', 0.6);
band(0.2, '#7f7974', 0.8);
band(-0.05, '#5f6a68', 1);
// cracks: thin dark lines running down the slope to the sea, a little crooked
g.lineCap = 'round';
g.strokeStyle = '#6f6862';
for (let i = 0; i < 46; i++) {
  const z = Z0 + (Z1 - Z0) * e.rnd();
  let x = L.coast(z) - 9 * e.rnd();
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
for (let i = 0; i < 220; i++) {
  const z = Z0 + (Z1 - Z0) * e.rnd();
  const x = L.coast(z) - 0.6 - 7 * e.rnd();
  const r = 0.05 + 0.22 * e.rnd() * e.rnd();
  blob(x, z, r, r * (0.7 + 0.4 * e.rnd()), LICHEN[i % 4], 0.75);
}
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
