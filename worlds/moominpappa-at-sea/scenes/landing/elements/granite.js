// The island's granite from above (the plane's metres: x across, y toward the viewer; its centre at across 2,
// distance 15): pink, with greyer and warmer drifts through it, rusty and grey-green lichen, the long joints and
// cracks the ice left, a few rain pools in its hollows, and the dark wet rim where the sea washes it.
const CA = 2, CD = 15, land = e.lib, at = (a, d) => [a - CA, CD - d];
g.fillStyle = "#d6a79c";
g.fillRect(-30, -30, 60, 60);
const blot = (x, y, r, color, alpha) => {
  const s = g.createRadialGradient(x, y, 0, x, y, r);
  s.addColorStop(0, `rgba(${color}, ${alpha})`);
  s.addColorStop(1, `rgba(${color}, 0)`);
  g.fillStyle = s;
  g.fillRect(x - r, y - r, r * 2, r * 2);
};
// drifts of colour in the stone: grey, warmer rose, pale
for (let i = 0; i < 60; i++) {
  const x = (e.rnd() - 0.5) * 56, y = (e.rnd() - 0.5) * 56, r = 2 + e.rnd() * 6, k = e.rnd();
  blot(x, y, r, k < 0.4 ? "168, 154, 158" : k < 0.75 ? "214, 146, 128" : "238, 210, 196", 0.45 + e.rnd() * 0.3);
}
// the speckle of the grain: small dots, dark and light
for (let i = 0; i < 900; i++) {
  const x = (e.rnd() - 0.5) * 56, y = (e.rnd() - 0.5) * 56, r = 0.03 + e.rnd() * 0.07;
  g.fillStyle = e.rnd() < 0.5 ? "rgba(120, 92, 90, 0.35)" : "rgba(248, 228, 218, 0.45)";
  g.fillRect(x - r, y - r, r * 2, r * 2);
}
// lichen: rusty orange and grey-green rosettes on the higher, drier stone
for (let i = 0; i < 260; i++) {
  const a = CA + (e.rnd() - 0.5) * 56, d = CD + (e.rnd() - 0.5) * 56;
  if (land.land(a, d) - land.SEA < 0.9) continue;
  const [x, y] = at(a, d), r = 0.2 + e.rnd() * 0.6;
  blot(x, y, r, e.rnd() < 0.55 ? "206, 146, 72" : "158, 164, 132", 0.55 + e.rnd() * 0.25);
}
// the joints and cracks: long gently wandering lines, a few short ones across them
g.lineCap = "round";
for (let i = 0; i < 110; i++) {
  let x = (e.rnd() - 0.5) * 54, y = (e.rnd() - 0.5) * 54, ang = e.rnd() < 0.6 ? -1.1 + e.rnd() * 0.4 : 0.3 + e.rnd() * 0.5;
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
// rain pools in the hollows of the higher stone: grey-blue, a pale rim
for (const [a, d, rx, ry, t] of [[-0.6, 3.2, 0.5, 0.3, 0.3], [3.4, 11.5, 0.7, 0.35, -0.2], [6.2, 18.5, 0.45, 0.25, 0.5], [-2.3, 9.8, 0.35, 0.22, 0]]) {
  const [x, y] = at(a, d);
  g.fillStyle = "rgba(236, 222, 214, 0.8)";
  g.beginPath();
  g.ellipse(x, y, rx + 0.06, ry + 0.06, t, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "#8ea3b2";
  g.beginPath();
  g.ellipse(x, y, rx, ry, t, 0, Math.PI * 2);
  g.fill();
}
// the wet rim: darker and browner down to the water, where the swell washes the stone
land.shore(-0.1, 0.55, 0.45, (a, d, h) => {
  const [x, y] = at(a, d);
  blot(x, y, 0.75, "104, 80, 82", 0.4 * (1 - h / 0.55));
});
