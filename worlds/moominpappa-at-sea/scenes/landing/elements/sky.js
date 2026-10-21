// A northern August dawn in watercolour: high pale grey-blue, warming to peach and rose at the horizon, the warmth
// strongest on the left where the sun is coming up behind the viewer's shoulder; long soft clouds drifting with the
// wind (a layer), a band of pale haze on the sea's line.
const H = 0.64, A = e.aspect, L = -0.3, R = A + 0.3, W = R - L;
const air = g.createLinearGradient(0, -0.35, 0, H);
air.addColorStop(0, "#8eaac2");
air.addColorStop(0.42, "#b7c8d5");
air.addColorStop(0.78, "#e2d8d4");
air.addColorStop(0.93, "#f1d9c9");
air.addColorStop(1, "#f6e2cf");
g.fillStyle = air;
g.fillRect(L, -0.35, W, H + 0.36);
g.fillStyle = "#9fb3c0";
g.fillRect(L, H, W, 1.25 - H);
const warm = g.createRadialGradient(-0.15, H, 0, -0.15, H, 1.1);
warm.addColorStop(0, "rgba(255, 210, 172, 0.7)");
warm.addColorStop(0.45, "rgba(250, 200, 182, 0.25)");
warm.addColorStop(1, "rgba(250, 200, 182, 0)");
g.fillStyle = warm;
g.fillRect(L, -0.35, W, H + 0.36);
// a soft band of haze along the sea's line
const band = g.createLinearGradient(0, H - 0.06, 0, H + 0.01);
band.addColorStop(0, "rgba(246, 232, 222, 0)");
band.addColorStop(0.75, "rgba(246, 232, 222, 0.55)");
band.addColorStop(1, "rgba(246, 232, 222, 0.2)");
g.fillStyle = band;
g.fillRect(L, H - 0.06, W, 0.07);
// clouds: long soft lumps, lavender-grey with a rose underside, each painted three times a width apart so the drift
// wraps round seamlessly
const clouds = [];
for (let i = 0; i < 11; i++) {
  const y = 0.06 + e.rnd() * 0.42;
  clouds.push({ x: L + e.rnd() * W, y, w: 0.18 + e.rnd() * 0.32, h: 0.018 + e.rnd() * 0.03, k: 0.5 + 0.5 * (y / 0.48) });
}
e.layer("clouds", { drift: [0.0022, 0], box: [L, -0.35, R, H] }, c => {
  for (const cl of clouds) {
    for (const off of [-W, 0, W]) {
      for (let j = 0; j < 4; j++) {
        const cx = cl.x + off + (j - 1.5) * cl.w * 0.3, cy = cl.y + (j % 2) * cl.h * 0.4, rx = cl.w * (0.45 - Math.abs(j - 1.5) * 0.08);
        const s = c.createRadialGradient(cx, cy, 0, cx, cy, rx);
        s.addColorStop(0, `rgba(${Math.round(196 + 40 * cl.k)}, ${Math.round(188 + 18 * cl.k)}, ${Math.round(204 + 2 * cl.k)}, 0.5)`);
        s.addColorStop(0.6, `rgba(${Math.round(214 + 30 * cl.k)}, ${Math.round(196 + 14 * cl.k)}, ${Math.round(206)}, 0.22)`);
        s.addColorStop(1, "rgba(230, 210, 210, 0)");
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
