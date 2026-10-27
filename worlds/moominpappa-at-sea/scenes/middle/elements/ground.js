// The island's middle from above (the plane's metres: x across, y toward the viewer; its centre at across 3, distance
// 30): the island's granite (modules/island) on the backs and the knoll, and over it, in the hollows, the island's
// low growth over thin peat — dark crowberry, rusty heather, grey reindeer lichen, soft green moss in the son's
// clearing; a worn path from the clearing up through the pines toward the lighthouse; the granite round the pool's
// basin dark where it is wet.
const CA = 3, CD = 30, L = e.lib, at = (a, d) => [a - CA, CD - d];
e.kit.island.granite(g, e, { centre: [CA, CD], size: [100, 100], near: [0.3, 0.3, 0.4, 0.3], marks: [90, 1400, 320, 150] });
const blot = (x, y, r, color, alpha) => {
  const s = g.createRadialGradient(x, y, 0, x, y, r);
  s.addColorStop(0, `rgba(${color}, ${alpha})`);
  s.addColorStop(1, `rgba(${color}, 0)`);
  g.fillStyle = s;
  g.fillRect(x - r, y - r, r * 2, r * 2);
};
// how low the land lies there against its neighbours (a hollow holds peat and growth): above 0 a hollow
const hollow = (a, d) => (L.land(a - 2, d) + L.land(a + 2, d) + L.land(a, d - 2) + L.land(a, d + 2)) / 4 - L.land(a, d);
// growth in the hollows and on the gentle ground: clumps of crowberry, heather, grey lichen — each a cluster of small
// crisp dabs over a faint dark patch of peat
const tones = [["44, 62, 40", "62, 84, 50"], ["118, 66, 70", "150, 92, 84"], ["190, 196, 176", "214, 216, 198"], ["92, 112, 56", "128, 146, 72"]];
for (let i = 0; i < 2200; i++) {
  const a = (e.rnd() - 0.5) * 40, d = -4 + 34 * e.rnd() ** 1.3, h = hollow(a, d);
  const pool = ((a - L.POOL.a) / (L.POOL.ra + 0.6)) ** 2 + ((d - L.POOL.d) / (L.POOL.rd + 0.6)) ** 2 < 1;
  if (pool || h < -0.04 + e.rnd() * 0.06) continue;
  const [x, y] = at(a, d), t = tones[Math.floor(e.rnd() * 4)], r = 0.25 + e.rnd() * 0.45;
  blot(x, y, r * 1.3, "86, 70, 56", 0.25);
  for (let k = 0; k < 14; k++) {
    const q = e.rnd() * Math.PI * 2, u = r * Math.sqrt(e.rnd());
    g.fillStyle = `rgba(${t[k % 2]}, ${0.75 + e.rnd() * 0.25})`;
    g.beginPath();
    g.arc(x + Math.cos(q) * u, y + Math.sin(q) * u, 0.04 + e.rnd() * 0.07, 0, Math.PI * 2);
    g.fill();
  }
}
// the son's clearing: soft bright moss, round and close
{
  const [x, y] = at(L.RING.a, L.RING.d);
  blot(x, y, 2.8, "126, 152, 84", 0.95);
  blot(x + 0.4, y - 0.3, 1.8, "146, 170, 96", 0.8);
  for (let i = 0; i < 260; i++) {
    const t = e.rnd() * Math.PI * 2, r = 2.4 * Math.sqrt(e.rnd());
    g.fillStyle = e.rnd() < 0.5 ? "rgba(98, 128, 66, 0.6)" : "rgba(176, 196, 120, 0.5)";
    g.beginPath();
    g.arc(x + Math.cos(t) * r, y + Math.sin(t) * r * 0.9, 0.04 + e.rnd() * 0.06, 0, Math.PI * 2);
    g.fill();
  }
}
// the path: from the clearing up through the pines toward the lighthouse — trodden earth, a few small stones on it
const way = [at(L.RING.a + 1.2, L.RING.d + 1.4)];
for (const [a, d] of [[0.6, 11], [1.6, 15], [1.2, 20], [2.6, 26], [3.2, 33], [3.9, 40]]) way.push(at(a, d));
g.strokeStyle = "rgba(128, 100, 80, 0.55)";
g.lineCap = "round";
g.lineJoin = "round";
g.lineWidth = 0.38;
g.beginPath();
way.forEach(([x, y], i) => (i ? g.quadraticCurveTo((way[i - 1][0] + x) / 2 + 0.5, (way[i - 1][1] + y) / 2, x, y) : g.moveTo(x, y)));
g.stroke();
for (let i = 1; i < way.length; i++) {
  for (let k = 0; k < 18; k++) {
    const u = e.rnd(), x = way[i - 1][0] + (way[i][0] - way[i - 1][0]) * u + (e.rnd() - 0.5) * 0.4, y = way[i - 1][1] + (way[i][1] - way[i - 1][1]) * u;
    g.fillStyle = e.rnd() < 0.5 ? "rgba(176, 160, 150, 0.8)" : "rgba(98, 80, 70, 0.6)";
    g.beginPath();
    g.ellipse(x, y, 0.03 + e.rnd() * 0.04, 0.02 + e.rnd() * 0.03, e.rnd() * 3, 0, Math.PI * 2);
    g.fill();
  }
}
// the pool's basin: the granite darker and browner down to the water, wet
{
  const [x, y] = at(L.POOL.a, L.POOL.d);
  g.save();
  g.translate(x, y);
  g.scale(L.POOL.ra + 0.7, L.POOL.rd + 0.6);
  const s = g.createRadialGradient(0, 0, 0.6, 0, 0, 1);
  s.addColorStop(0, "rgba(84, 64, 58, 0.85)");
  s.addColorStop(1, "rgba(120, 90, 84, 0)");
  g.fillStyle = s;
  g.beginPath();
  g.arc(0, 0, 1, 0, Math.PI * 2);
  g.fill();
  g.restore();
}
// where the path goes in among the pines: ground#path
e.at(...at(1.2, 13), "path");
