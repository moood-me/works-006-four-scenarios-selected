// The sea from above (the plane's own metres: x across, y toward the viewer; its centre 1450 m out): grey-blue, a
// lighter green-grey over the shallows round the rocks; two layers its shader shows by turns — the white crests the
// wind raises all over it (they come and go), the foam washing round the rocks at the waterline.
const D = 1450, land = e.lib;
g.fillStyle = "#56809c";
g.fillRect(-1200, -1500, 2400, 3000);
// the shallows: where the granite runs on under the water
land.shore(-1.6, 0, 0.9, (a, d, h) => {
  const k = 1 + h / 1.6, s = g.createRadialGradient(a, D - d, 0, a, D - d, 1.5);
  s.addColorStop(0, `rgba(138, 172, 164, ${0.5 * k})`);
  s.addColorStop(1, "rgba(138, 172, 164, 0)");
  g.fillStyle = s;
  g.fillRect(a - 1.5, D - d - 1.5, 3, 3);
});
e.layer("crests", {}, c => {
  c.strokeStyle = "rgba(246, 246, 242, 0.85)";
  c.lineCap = "round";
  for (let i = 0; i < 2800; i++) {
    const d = 6 + 560 * e.rnd() ** 2, a = (e.rnd() - 0.5) * (60 + d * 2.6);
    if (land.land(a, d) > land.SEA - 0.6) continue;
    const len = 0.8 + e.rnd() * 2.2 + d * 0.012;
    c.lineWidth = 0.14 + e.rnd() * 0.16 + d * 0.0025;
    c.beginPath();
    c.moveTo(a - len / 2, D - d);
    c.quadraticCurveTo(a, D - d - len * 0.12, a + len / 2, D - d + len * 0.05);
    c.stroke();
  }
});
e.layer("foam", {}, c => {
  c.fillStyle = "rgba(250, 250, 246, 0.6)";
  land.shore(-0.34, 0.02, 0.45, (a, d) => {
    const r = 0.24 + e.rnd() * 0.32;
    c.beginPath();
    c.ellipse(a + (e.rnd() - 0.5) * 0.3, D - d + (e.rnd() - 0.5) * 0.3, r * 1.4, r, e.rnd() * 3.1, 0, Math.PI * 2);
    c.fill();
  });
});
