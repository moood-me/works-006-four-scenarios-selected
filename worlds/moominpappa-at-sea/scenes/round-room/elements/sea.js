// The night sea below the lighthouse, from above (the plane's own metres: x across, y toward the viewer; its centre
// 1450 m out): dark grey-blue, the white crests the wind still raises all over it (a layer its shader shows in
// patches that come and go — as on the landing; no shore in sight here).
const D = 1450;
g.fillStyle = "#33495f";
g.fillRect(-1200, -1500, 2400, 3000);
e.layer("crests", {}, c => {
  c.strokeStyle = "rgba(236, 240, 246, 0.85)";
  c.lineCap = "round";
  for (let i = 0; i < 2600; i++) {
    const d = 25 + 520 * e.rnd() ** 2, a = (e.rnd() - 0.5) * (60 + d * 2.4);
    const len = 0.9 + e.rnd() * 2.2 + d * 0.012;
    c.lineWidth = 0.16 + e.rnd() * 0.16 + d * 0.0025;
    c.beginPath();
    c.moveTo(a - len / 2, D - d);
    c.quadraticCurveTo(a, D - d - len * 0.12, a + len / 2, D - d + len * 0.05);
    c.stroke();
  }
});
