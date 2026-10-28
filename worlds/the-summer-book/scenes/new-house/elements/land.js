// The island's far side round the new house, draped over the relief, seen from above: bare pinkish-grey granite worn
// smooth, mottled; the dark wet band where it goes under the water behind the house and the rock under the sea;
// cracks; grey-green moss and heather in its hollows, thicker away from the house and toward the forest, burnt
// straw-coloured in August (`late`); lichen rosettes; the worn way of paler stones coming from the forest to the
// veranda. Metres from the plane's middle (across 0, distance −5): a world point (x, z) is (x, −5 − z) here.
const L = e.lib;
const late = +(e.state.late ?? 0);
const P = (x, z) => [x, -5 - z];
const h = (x, z) => L.ground(x, z) - L.WATER;
const blob = (x, z, rx, rz, color, alpha, turn = e.rnd() * 3.1) => {
  const [px, py] = P(x, z);
  g.globalAlpha = alpha;
  g.fillStyle = color;
  g.beginPath();
  g.ellipse(px, py, rx, rz, turn, 0, 6.2832);
  g.fill();
};
const mixC = (c0, c1, u) => {
  const p = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
  const [a, b] = [p(c0), p(c1)];
  return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * u)).join(',')})`;
};
g.globalAlpha = 1;
g.fillStyle = '#b3a9a1';
g.fillRect(-60, -40, 120, 80);
// the rock's grains, long across the slope
for (let i = 0; i < 420; i++) {
  const x = -60 + 120 * e.rnd();
  const z = -45 + 80 * e.rnd();
  if (h(x, z) < -0.3) continue;
  blob(x, z, 0.6 + 1.8 * e.rnd(), 0.3 + 0.9 * e.rnd(), e.rnd() < 0.5 ? '#c3b9b0' : '#a1978f', 0.35);
}
// the wet band at the water and the rock under it, darker the lower: long thin streaks along the shore (the slope is
// steep there, so they stay narrow across it)
for (let i = 0; i < 520; i++) {
  const x = -60 + 120 * e.rnd();
  const z = 5 + 30 * e.rnd();
  const k = h(x, z);
  if (k > 0.45 || k < -1.2) continue;
  blob(x, z, 0.5 + 1.2 * e.rnd(), 0.08 + 0.1 * e.rnd(), k > 0.15 ? '#9a918a' : k > -0.1 ? '#7d7772' : '#5f6d6b', 0.8, 0.12 * (e.rnd() - 0.5));
}
// cracks running down toward the sea
g.lineCap = 'round';
g.strokeStyle = '#6d6660';
for (let i = 0; i < 70; i++) {
  let x = -45 + 90 * e.rnd();
  let z = -30 + 50 * e.rnd();
  if (h(x, z) < 0.6 || L.HOUSE.x0 - 0.6 < x && x < L.HOUSE.x1 + 0.6 && L.HOUSE.z0 - 0.6 < z && z < L.HOUSE.z1 + 0.6) continue;
  g.globalAlpha = 0.5;
  g.lineWidth = 0.02 + 0.04 * e.rnd();
  g.beginPath();
  g.moveTo(...P(x, z));
  const n = 4 + Math.floor(4 * e.rnd());
  const dx = (e.rnd() - 0.5) * 1.2;
  for (let k = 0; k < n; k++) {
    x += dx + (e.rnd() - 0.5) * 0.5;
    z += 0.5 + 0.5 * e.rnd();
    g.lineTo(...P(x, z));
  }
  g.stroke();
}
// moss and heather in the hollows: none on the rock right round the house, more toward the forest
const MOSS = ['#77825f', '#8f9874', '#9a9583', '#6c7757', '#7d6a74'];
const STRAW = '#c4ae7a';
for (let i = 0; i < 420; i++) {
  const x = -60 + 120 * e.rnd();
  const z = -45 + 60 * e.rnd();
  if (h(x, z) < 2.2) continue;
  const near = Math.max(Math.abs(x) - 4.5, 7.5 - z, z - 18);
  if (near < 1.5 + 4 * e.rnd()) continue;
  const c = MOSS[i % 5];
  blob(x, z, 0.4 + 1.1 * e.rnd(), 0.3 + 0.8 * e.rnd(), late > 0 && i % 5 < 3 ? mixC(c, STRAW, 0.6 * late) : c, 0.6);
}
// the worn way of stones from the forest to the veranda's window
for (let i = 0; i < 90; i++) {
  const u = i / 90;
  const z = -40 + 48.4 * u;
  const x = -2.2 + 1.6 * Math.sin(u * 4.2) * (1 - u) + (e.rnd() - 0.5) * 0.9;
  blob(x, z, 0.22 + 0.25 * e.rnd(), 0.18 + 0.2 * e.rnd(), '#cbc2b8', 0.6);
}
// lichen on the open rock
const LICHEN = ['#cdb46a', '#d9d6c6', '#97a184', '#b9b58f'];
for (let i = 0; i < 220; i++) {
  const x = -45 + 90 * e.rnd();
  const z = -40 + 58 * e.rnd();
  if (h(x, z) < 0.8) continue;
  const r = 0.05 + 0.25 * e.rnd() * e.rnd();
  blob(x, z, r, r * 0.8, LICHEN[i % 4], 0.75);
}
g.globalAlpha = 1;
