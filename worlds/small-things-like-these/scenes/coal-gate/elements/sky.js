// The sky before light on a December morning (stage heights; the horizon at 0.5): a deep slate blue overhead, paler
// down to a white, misty band at the horizon with the faintest warmth in it — the day has not come. Long soft streaks
// of cloud drift on a layer of their own (`clouds`).
const W = e.aspect;
const sky = g.createLinearGradient(0, -0.35, 0, 0.62);
sky.addColorStop(0, "#3c4a66");
sky.addColorStop(0.35, "#5d6d8a");
sky.addColorStop(0.7, "#9aa8bc");
sky.addColorStop(0.9, "#cfd5dc");
sky.addColorStop(1, "#e2ddd6");
g.fillStyle = sky;
g.fillRect(-0.3, -0.35, W + 0.6, 1.6);
e.layer("clouds", { drift: [0.004, 0], box: [-0.3, -0.35, W + 0.3, 0.55] }, (c) => {
  const r = e.lib.stream(7);
  for (let i = 0; i < 7; i++) {
    const x = -0.1 + (i / 7) * (W + 0.2) + r() * 0.1;
    const y = 0.08 + r() * 0.3;
    const len = 0.25 + r() * 0.35;
    const t = 0.012 + r() * 0.02;
    const band = c.createRadialGradient(x, y, 0, x, y, len);
    band.addColorStop(0, "rgba(132, 144, 166, 0.55)");
    band.addColorStop(1, "rgba(132, 144, 166, 0)");
    c.fillStyle = band;
    c.save();
    c.translate(x, y);
    c.scale(1, t / len);
    c.translate(-x, -y);
    c.beginPath();
    c.arc(x, y, len, 0, 6.3);
    c.fill();
    c.restore();
  }
});
