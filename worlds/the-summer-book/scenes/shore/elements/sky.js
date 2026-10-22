// A pearl-grey June sky over a still northern sea: high and cool above, warm pearl toward the water, brightest low on
// the right where the sun is behind the veil; long soft clouds that drift (the layer `clouds`).
const A = e.aspect;
const HZ = 0.42;
const X0 = -0.3;
const X1 = A + 0.3;
const glow = (x, y, rx, ry, color, alpha) => {
  g.save();
  g.translate(x, y);
  g.scale(rx, ry);
  const r = g.createRadialGradient(0, 0, 0, 0, 0, 1);
  r.addColorStop(0, color);
  r.addColorStop(1, color + '00');
  g.globalAlpha = alpha;
  g.fillStyle = r;
  g.beginPath();
  g.arc(0, 0, 1, 0, 6.2832);
  g.fill();
  g.restore();
};
const sky = g.createLinearGradient(0, -0.35, 0, HZ);
sky.addColorStop(0, '#9eabb9');
sky.addColorStop(0.45, '#bfc7cf');
sky.addColorStop(0.8, '#dcdcd9');
sky.addColorStop(1, '#ece6dc');
g.fillStyle = sky;
g.fillRect(X0, -0.35, X1 - X0, HZ + 0.35);
// below the horizon: the far sea's colour (the sea plane lies over it)
g.fillStyle = '#d3d6d4';
g.fillRect(X0, HZ, X1 - X0, 1.25 - HZ);
// the veiled sun's brightness, low on the right, and the pale band along the horizon
// (the June sun just up, low on the right, a pale disc through the veil: its glow is what lights the island, and
// its e.light draws its path on the still sea)
const SX = A * 0.78;
const SY = 0.3;
glow(SX, SY, 0.8, 0.3, '#f6ece0', 0.85);
glow(SX, SY, 0.2, 0.11, '#fbf3e6', 0.9);
glow(A * 0.5, HZ, 1.6, 0.06, '#f3eee6', 0.8);
g.globalAlpha = 0.85;
g.fillStyle = '#fff8ee';
g.beginPath();
g.arc(SX, SY, 0.028, 0, 6.2832);
g.fill();
g.globalAlpha = 1;
e.light(SX, SY, 0.05, '#fff3e2', 0.8, 'disc');
e.at(SX, SY, 'sun');
// the clouds: long thin streaks, drifting slowly to the right (wrapping round the layer's box: kept inside it)
e.layer('clouds', { drift: [0.0025, 0], box: [X0, -0.35, X1, HZ] }, c => {
  const W = X1 - X0;
  for (let i = 0; i < 14; i++) {
    const y = -0.25 + 0.55 * e.rnd();
    const len = 0.25 + 0.5 * e.rnd();
    const x = X0 + len + (W - 2 * len) * e.rnd();
    const thick = 0.008 + 0.022 * e.rnd() * (1 - (y + 0.25) / 0.8);
    const cg = i % 3 === 0 ? '#f4f1ea' : '#e2e5e8';
    c.save();
    c.translate(x, y);
    c.scale(len, thick);
    const r = c.createRadialGradient(0, 0, 0, 0, 0, 1);
    r.addColorStop(0, cg);
    r.addColorStop(1, cg + '00');
    c.globalAlpha = 0.55;
    c.fillStyle = r;
    c.beginPath();
    c.arc(0, 0, 1, 0, 6.2832);
    c.fill();
    c.restore();
  }
});
