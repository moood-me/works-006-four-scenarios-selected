// A late August afternoon over the open sea, in watercolour: a clear washed blue high up, going to pale gold and
// warm apricot round the low sun on the left, a band of haze on the sea's line; long torn clouds the wind drives
// (a layer that drifts), their undersides gilded nearer the sun. The sun itself: a small white-gold disc with its glow
// (its e.light — the path of light on the sea; the scene's sun shines from it: "sky#sun").
const H = 0.56, A = e.aspect, L = -0.3, R = A + 0.3, W = R - L, SX = 0.32, SY = 0.37;
const air = g.createLinearGradient(0, -0.35, 0, H);
air.addColorStop(0, "#6f97bd");
air.addColorStop(0.4, "#9dbbd2");
air.addColorStop(0.75, "#d9dccf");
air.addColorStop(0.92, "#f2dfba");
air.addColorStop(1, "#f6e3c2");
g.fillStyle = air;
g.fillRect(L, -0.35, W, H + 0.36);
g.fillStyle = "#a6b6b8";
g.fillRect(L, H, W, 1.25 - H);
// the warmth round the sun, wide and soft
const warm = g.createRadialGradient(SX, SY, 0, SX, SY, 1.25);
warm.addColorStop(0, "rgba(255, 236, 196, 0.95)");
warm.addColorStop(0.18, "rgba(252, 214, 160, 0.6)");
warm.addColorStop(0.5, "rgba(244, 200, 160, 0.22)");
warm.addColorStop(1, "rgba(244, 200, 160, 0)");
g.fillStyle = warm;
g.fillRect(L, -0.35, W, H + 0.36);
// the haze along the sea's line
const band = g.createLinearGradient(0, H - 0.09, 0, H);
band.addColorStop(0, "rgba(246, 228, 204, 0)");
band.addColorStop(0.7, "rgba(246, 228, 204, 0.6)");
band.addColorStop(1, "rgba(246, 228, 204, 0.35)");
g.fillStyle = band;
g.fillRect(L, H - 0.09, W, 0.09);
// the sun
g.fillStyle = "#fff6e2";
g.beginPath();
g.arc(SX, SY, 0.022, 0, Math.PI * 2);
g.fill();
e.light(SX, SY, 0.09, "#ffe2a8", 1.4, "sun");
e.at(SX, SY, "sun");
// clouds: long torn lumps, blue-grey above, gold beneath where the sun is near; each painted three times a width
// apart so the drift wraps round
const clouds = [];
for (let i = 0; i < 12; i++) {
  const y = 0.04 + e.rnd() * 0.36;
  clouds.push({ x: L + e.rnd() * W, y, w: 0.16 + e.rnd() * 0.36, h: 0.014 + e.rnd() * 0.024 });
}
e.layer("clouds", { drift: [0.003, 0], box: [L, -0.35, R, H] }, c => {
  for (const cl of clouds) {
    for (const off of [-W, 0, W]) {
      const near = Math.max(0, 1 - Math.hypot(cl.x - SX, (cl.y - SY) * 2) / 1.2);
      for (let j = 0; j < 5; j++) {
        const cx = cl.x + off + (j - 2) * cl.w * 0.26, cy = cl.y + ((j * 7) % 3 - 1) * cl.h * 0.35, rx = cl.w * (0.42 - Math.abs(j - 2) * 0.07);
        const s = c.createRadialGradient(cx, cy, 0, cx, cy, rx);
        s.addColorStop(0, `rgba(${Math.round(222 + 30 * near)}, ${Math.round(220 + 10 * near)}, ${Math.round(226 - 40 * near)}, 0.55)`);
        s.addColorStop(0.6, `rgba(${Math.round(214 + 34 * near)}, ${Math.round(210 + 8 * near)}, ${Math.round(214 - 40 * near)}, 0.24)`);
        s.addColorStop(1, "rgba(230, 220, 210, 0)");
        c.fillStyle = s;
        c.save();
        c.translate(cx, cy);
        c.scale(1, cl.h / rx);
        c.translate(-cx, -cy);
        c.beginPath();
        c.arc(cx, cy, rx, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }
  }
});
