// The night sky over the river: deep ink above, a paler blue toward the horizon; the moon high on the left, over the
// bridge, painted once — its glow is the engine's (e.light), its light is the scene's "moon" (from "sky#disc")
const W = e.aspect;
const sky = g.createLinearGradient(0, -0.35, 0, 0.52);
sky.addColorStop(0, '#0a1128');
sky.addColorStop(0.4, '#152448');
sky.addColorStop(0.78, '#2c416f');
sky.addColorStop(1, '#4d6596');
g.fillStyle = sky;
g.fillRect(-0.3, -0.35, W + 0.6, 0.87);
g.fillStyle = '#4d6596';
g.fillRect(-0.3, 0.52, W + 0.6, 0.73);
// the moon: a full disc, a few soft grey seas on it
const mx = 0.33;
const my = 0.12;
const r = 0.03;
g.fillStyle = '#f4f0e3';
g.beginPath();
g.arc(mx, my, r, 0, Math.PI * 2);
g.fill();
g.fillStyle = 'rgba(176, 178, 170, 0.35)';
for (const [dx, dy, rr] of [[-0.009, -0.006, 0.009], [0.008, 0.004, 0.007], [-0.002, 0.012, 0.005], [0.011, -0.01, 0.004]]) {
  g.beginPath();
  g.arc(mx + dx, my + dy, rr, 0, Math.PI * 2);
  g.fill();
}
e.at(mx, my, 'disc');
e.light(mx, my, 0.1, '#dfe8ff', 1.1);
