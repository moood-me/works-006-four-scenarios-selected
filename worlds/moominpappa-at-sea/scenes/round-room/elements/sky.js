// A moonlit August night over the sea, seen only through the window: deep blue high up, paling to a grey-blue glow at
// the sea's line, the moon off to the right (out of the window's sight) lighting the edges of long ragged clouds that
// the wind drives (a layer), a few stars between them.
const H = 0.47, A = e.aspect, L = -0.3, R = A + 0.3, W = R - L;
const air = g.createLinearGradient(0, -0.35, 0, H + 0.02);
air.addColorStop(0, "#162038");
air.addColorStop(0.55, "#2c3c60");
air.addColorStop(0.9, "#56688c");
air.addColorStop(1, "#7a8aa8");
g.fillStyle = air;
g.fillRect(L, -0.35, W, H + 0.37);
g.fillStyle = "#3c4c68";
g.fillRect(L, H + 0.02, W, 1.25 - H);
const moon = g.createRadialGradient(A + 0.2, H - 0.25, 0, A + 0.2, H - 0.25, 0.9);
moon.addColorStop(0, "rgba(206, 216, 238, 0.55)");
moon.addColorStop(1, "rgba(206, 216, 238, 0)");
g.fillStyle = moon;
g.fillRect(L, -0.35, W, H + 0.37);
for (let i = 0; i < 160; i++) {
  const x = L + e.rnd() * W, y = -0.35 + e.rnd() * (H + 0.3), r = 0.0007 + e.rnd() * 0.0016;
  g.fillStyle = `rgba(236, 240, 252, ${0.4 + e.rnd() * 0.5})`;
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.fill();
}
const clouds = [];
for (let i = 0; i < 9; i++) clouds.push({ x: L + e.rnd() * W, y: H - 0.03 - e.rnd() * 0.3, w: 0.2 + e.rnd() * 0.35, h: 0.015 + e.rnd() * 0.025 });
e.layer("clouds", { drift: [0.004, 0], box: [L, -0.35, R, H + 0.02] }, c => {
  for (const cl of clouds) {
    for (const off of [-W, 0, W]) {
      for (let j = 0; j < 3; j++) {
        const cx = cl.x + off + (j - 1) * cl.w * 0.35, cy = cl.y + (j % 2) * cl.h * 0.5, rx = cl.w * 0.42;
        const s = c.createRadialGradient(cx, cy, 0, cx, cy, rx);
        s.addColorStop(0, "rgba(150, 162, 190, 0.55)");
        s.addColorStop(0.7, "rgba(110, 124, 156, 0.25)");
        s.addColorStop(1, "rgba(110, 124, 156, 0)");
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
