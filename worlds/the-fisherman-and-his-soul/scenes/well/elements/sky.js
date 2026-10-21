// The night sky over the glade: deep ink above, a paler blue toward the tops of the firs; the full moon high over the
// back of the glade, painted once — its glow is the engine's (e.light), its light is the scene's "moon" (from "sky#disc")
const W = e.aspect;
const sky = g.createLinearGradient(0, -0.35, 0, 0.55);
sky.addColorStop(0, '#0a1128');
sky.addColorStop(0.4, '#152448');
sky.addColorStop(0.8, '#2b406c');
sky.addColorStop(1, '#465e8e');
g.fillStyle = sky;
g.fillRect(-0.3, -0.35, W + 0.6, 0.9);
g.fillStyle = '#465e8e';
g.fillRect(-0.3, 0.55, W + 0.6, 0.7);
// the moon: a full disc, a few soft grey seas on it
const mx = 0.6;
const my = 0.11;
const r = 0.032;
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
e.light(mx, my, 0.11, '#dfe8ff', 1.1);
