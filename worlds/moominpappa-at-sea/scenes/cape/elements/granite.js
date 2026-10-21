// The cape's and the island's granite from above (the plane's metres: x across, y toward the viewer; its centre at
// across 10, distance 35): pink, with greyer and warmer drifts through it, rusty and grey-green lichen on the dry
// tops, the long joints and cracks the ice left, a few rain pools, tufts of dry grass in the cracks round the
// Fisherman's corner, and the dark wet rim where the sea washes it. The detail is thickest near the viewer.
const CA = 10, CD = 35, L = e.lib, at = (a, d) => [a - CA, CD - d];
// a point on the land, mostly near the viewer (a share k of them anywhere)
const spot = k => (e.rnd() < k ? [CA + (e.rnd() - 0.5) * 98, CD + (e.rnd() - 0.5) * 90] : [(e.rnd() - 0.5) * 30, -6 + 26 * e.rnd() ** 1.4]);
g.fillStyle = "#d8a99c";
g.fillRect(-50, -46, 100, 92);
const blot = (x, y, r, color, alpha) => {
  const s = g.createRadialGradient(x, y, 0, x, y, r);
  s.addColorStop(0, `rgba(${color}, ${alpha})`);
  s.addColorStop(1, `rgba(${color}, 0)`);
  g.fillStyle = s;
  g.fillRect(x - r, y - r, r * 2, r * 2);
};
for (let i = 0; i < 90; i++) {
  const [a, d] = spot(0.5), [x, y] = at(a, d), r = 2 + e.rnd() * 6, k = e.rnd();
  blot(x, y, r, k < 0.4 ? "168, 154, 158" : k < 0.75 ? "216, 148, 126" : "240, 212, 194", 0.45 + e.rnd() * 0.3);
}
for (let i = 0; i < 1100; i++) {
  const [a, d] = spot(0.15), [x, y] = at(a, d), r = 0.012 + e.rnd() * 0.03;
  g.fillStyle = e.rnd() < 0.5 ? "rgba(120, 92, 90, 0.3)" : "rgba(248, 228, 218, 0.35)";
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.fill();
}
for (let i = 0; i < 320; i++) {
  const [a, d] = spot(0.45);
  if (L.land(a, d) - L.SEA < 0.9) continue;
  const [x, y] = at(a, d), r = 0.2 + e.rnd() * 0.6;
  blot(x, y, r, e.rnd() < 0.55 ? "206, 146, 72" : "158, 164, 132", 0.55 + e.rnd() * 0.25);
}
g.lineCap = "round";
for (let i = 0; i < 140; i++) {
  const [a, d] = spot(0.4);
  let [x, y] = at(a, d), ang = e.rnd() < 0.6 ? -0.9 + e.rnd() * 0.4 : 0.4 + e.rnd() * 0.5;
  const n = 3 + Math.floor(e.rnd() * 6);
  g.strokeStyle = e.rnd() < 0.75 ? "rgba(104, 70, 68, 0.75)" : "rgba(246, 232, 224, 0.7)";
  g.lineWidth = 0.035 + e.rnd() * 0.06;
  g.beginPath();
  g.moveTo(x, y);
  for (let s = 0; s < n; s++) {
    ang += (e.rnd() - 0.5) * 0.5;
    x += Math.cos(ang) * (0.8 + e.rnd() * 1.6);
    y += Math.sin(ang) * (0.8 + e.rnd() * 1.6);
    g.lineTo(x, y);
  }
  g.stroke();
}
for (const [a, d, rx, ry, t] of [[2.4, 2.6, 0.45, 0.26, 0.3], [-5.6, 11.5, 0.55, 0.3, -0.2], [21, 34, 0.6, 0.3, 0.4], [3.6, 6.4, 0.3, 0.18, 0]]) {
  const [x, y] = at(a, d);
  g.fillStyle = "rgba(238, 224, 214, 0.8)";
  g.beginPath();
  g.ellipse(x, y, rx + 0.06, ry + 0.06, t, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "#8fa6b6";
  g.beginPath();
  g.ellipse(x, y, rx, ry, t, 0, Math.PI * 2);
  g.fill();
}
// the wet rim
L.shore(-0.1, 0.55, 0.45, (a, d, h) => {
  const [x, y] = at(a, d);
  blot(x, y, 0.75, "104, 80, 82", 0.4 * (1 - h / 0.55));
});
