// The island's rock outside the glazing, draped over the relief, seen from above: thin grass and heather along the
// house, then the bare pinkish-grey granite falling away to the sea, cracks, lichen, the dark wet band where the water
// meets it. Metres; the plane's middle is at across CX, distance CZ: a world point (a, d) is (a - CX, CZ - d) here. The
// bands run parallel to the glazing (lib: x in the veranda's frame).
const L = e.lib;
const CX = -19;
const CZ = 20;
const P = (x, z) => [L.wa(x, z) - CX, CZ - L.wd(x, z)];
// a band between x0 and x1 (the veranda's frame) all along the glazing
const band = (x0, x1, color, alpha) => {
  g.globalAlpha = alpha;
  g.fillStyle = color;
  g.beginPath();
  for (const [x, z] of [[x0, -45], [x1, -45], [x1, 4], [x0, 4]]) g.lineTo(...P(x, z));
  g.closePath();
  g.fill();
};
const blob = (x, z, rx, rz, color, alpha) => {
  const [px, py] = P(x, z);
  g.globalAlpha = alpha;
  g.fillStyle = color;
  g.beginPath();
  g.ellipse(px, py, rx, rz, Math.PI / 4, 0, 6.2832);
  g.fill();
};
g.globalAlpha = 1;
g.fillStyle = '#b1a79f';
g.fillRect(-21, -20, 42, 40);
// mottled grains of the rock, long along the slope
for (let i = 0; i < 220; i++) blob(-40 * e.rnd(), -45 + 49 * e.rnd(), 0.4 + 1.4 * e.rnd(), 0.3 + 1.0 * e.rnd(), e.rnd() < 0.5 ? '#c2b8af' : '#9f958d', 0.35);
// the wet band and the rock under the water
band(L.shore + 0.5, L.shore - 0.2, '#998f88', 0.6);
band(L.shore + 0.2, L.shore - 0.4, '#7d7772', 0.8);
band(L.shore - 0.05, -45, '#5d6866', 1);
// cracks running down to the sea
g.lineCap = 'round';
g.strokeStyle = '#6d6660';
for (let i = 0; i < 40; i++) {
  let x = -1.5 - 9 * e.rnd();
  let z = -40 + 40 * e.rnd();
  g.globalAlpha = 0.55;
  g.lineWidth = 0.02 + 0.03 * e.rnd();
  g.beginPath();
  g.moveTo(...P(x, z));
  const n = 4 + Math.floor(4 * e.rnd());
  for (let k = 0; k < n; k++) {
    x -= 0.5 + 0.6 * e.rnd();
    z += (e.rnd() - 0.5) * 0.9;
    g.lineTo(...P(x, z));
  }
  g.stroke();
}
// lichen rosettes on the open rock
const LICHEN = ['#cdb46a', '#d9d6c6', '#97a184', '#b9b58f'];
for (let i = 0; i < 200; i++) {
  const r = 0.05 + 0.22 * e.rnd() * e.rnd();
  blob(-2 + (L.shore + 2.6) * e.rnd(), -40 + 40 * e.rnd(), r, r * 0.8, LICHEN[i % 4], 0.75);
}
// thin grass and heather along the house's foot
const GRASS = ['#77825f', '#9aa27c', '#a59c8d', '#6c7757'];
for (let i = 0; i < 160; i++) blob(-1.6 * e.rnd(), -40 + 44 * e.rnd(), 0.3 + 0.8 * e.rnd(), 0.2 + 0.6 * e.rnd(), GRASS[i % 4], 0.65);
g.globalAlpha = 1;
