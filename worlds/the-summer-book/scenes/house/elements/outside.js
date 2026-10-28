// The island's rock round the house, draped over the relief, seen from above: thin grass and heather along the house's
// foot, the bare pinkish-grey granite falling away to the sea, cracks, lichen, the dark wet band where the water meets
// it; behind the house the long back of rock running down to the cape — heather and junipers' dark ground along its
// crest, a paler worn way of stones down it to where the tent stands. August (`late`) burns the grass straw-coloured.
// Metres; the plane's middle is at across 0, distance 38: a world point (a, d) is (a, 38 − d) here.
const L = e.lib;
const late = +(e.state.late ?? 0);
const P = (a, d) => [a, 38 - d];
const h = (a, d) => L.ground(a, d) - L.WATER;
const blob = (a, d, rx, rd, color, alpha) => {
  const [px, py] = P(a, d);
  g.globalAlpha = alpha;
  g.fillStyle = color;
  g.beginPath();
  g.ellipse(px, py, rx, rd, e.rnd() * 3.1, 0, 6.2832);
  g.fill();
};
const mixC = (c0, c1, u) => {
  const p = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
  const [a, b] = [p(c0), p(c1)];
  return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * u)).join(',')})`;
};
g.globalAlpha = 1;
g.fillStyle = '#b1a79f';
g.fillRect(-40, -42, 80, 84);
// mottled grains of the rock
for (let i = 0; i < 1100; i++) {
  const a = -40 + 80 * e.rnd();
  const d = -4 + 84 * e.rnd();
  if (h(a, d) < -0.3) continue;
  blob(a, d, 0.5 + 1.6 * e.rnd(), 0.3 + 1.1 * e.rnd(), e.rnd() < 0.5 ? '#c2b8af' : '#9f958d', 0.35);
}
// the wet band at the water and the rock under it, darker the lower
for (let i = 0; i < 1400; i++) {
  const a = -40 + 80 * e.rnd();
  const d = -4 + 84 * e.rnd();
  const k = h(a, d);
  if (k > 0.45 || k < -1.2) continue;
  blob(a, d, 0.6 + 0.8 * e.rnd(), 0.5 + 0.6 * e.rnd(), k > 0.15 ? '#968d86' : k > -0.2 ? '#7d7772' : '#5d6866', 0.8);
}
// cracks running down toward the sea
g.lineCap = 'round';
g.strokeStyle = '#6d6660';
for (let i = 0; i < 90; i++) {
  let a = -30 + 60 * e.rnd();
  let d = 0 + 75 * e.rnd();
  if (h(a, d) < 1) continue;
  g.globalAlpha = 0.5;
  g.lineWidth = 0.02 + 0.04 * e.rnd();
  g.beginPath();
  g.moveTo(...P(a, d));
  const n = 4 + Math.floor(4 * e.rnd());
  const da = (e.rnd() - 0.5) * 1.4;
  const dd = (e.rnd() - 0.5) * 1.4;
  for (let k = 0; k < n; k++) {
    a += da + (e.rnd() - 0.5) * 0.5;
    d += dd + (e.rnd() - 0.5) * 0.5;
    g.lineTo(...P(a, d));
  }
  g.stroke();
}
// the worn way of stones from the house down the back to the cape
for (let i = 0; i < 160; i++) {
  const u = i / 160;
  const a = L.W[0] + (L.T[0] - L.W[0]) * u + (e.rnd() - 0.5) * 1.2;
  const d = L.W[1] + (L.T[1] - L.W[1]) * u + (e.rnd() - 0.5) * 1.2;
  blob(a, d, 0.25 + 0.3 * e.rnd(), 0.2 + 0.25 * e.rnd(), '#cbc2b8', 0.55);
}
// heather and grass on the higher rock: along the house and the cape's crest
const GRASS = ['#77825f', '#9aa27c', '#a59c8d', '#6c7757', '#7d6a74'];
const STRAW = '#c4ae7a';
for (let i = 0; i < 900; i++) {
  const a = -40 + 80 * e.rnd();
  const d = -4 + 84 * e.rnd();
  const k = h(a, d);
  if (!(L.crest(a, d) && k > 1)) continue;
  const c = GRASS[i % 5];
  blob(a, d, 0.35 + 0.9 * e.rnd(), 0.25 + 0.7 * e.rnd(), late > 0 && i % 5 < 3 ? mixC(c, STRAW, 0.6 * late) : c, 0.6);
}
for (let i = 0; i < 420; i++) {
  const x = -4.5 + 13 * e.rnd();
  const z = -8.5 + 14 * e.rnd();
  const s = L.out(x, z);
  if (!(s > 0 && s < 1.6)) continue;
  const c = GRASS[i % 5];
  blob(L.wa(x, z), L.wd(x, z), 0.3 + 0.7 * e.rnd(), 0.2 + 0.5 * e.rnd(), late > 0 && i % 5 < 3 ? mixC(c, STRAW, 0.6 * late) : c, 0.6);
}
// lichen rosettes on the open rock
const LICHEN = ['#cdb46a', '#d9d6c6', '#97a184', '#b9b58f'];
for (let i = 0; i < 420; i++) {
  const a = -40 + 80 * e.rnd();
  const d = -4 + 84 * e.rnd();
  const k = h(a, d);
  if (k < 0.6) continue;
  const r = 0.05 + 0.25 * e.rnd() * e.rnd();
  blob(a, d, r, r * 0.8, LICHEN[i % 4], 0.75);
}
g.globalAlpha = 1;
