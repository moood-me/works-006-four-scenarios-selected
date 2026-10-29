// The sky over the glade in the fir wood: the full moon high over the back of the glade.
// Painted once: the night (deep ink above, a paler blue toward the horizon, the full moon — its glow the engine's,
// its light the scene's "moon", from "sky#disc"); and
// as layers the hours the shader shows over it (sky.wgsl, by the animate from the state, hours.md): `dusk` (an evening:
// rose and amber low, the sky still blue above, the moon not up yet),
// `dawn` (pale, pearl low, the moon faint)
const W = e.aspect;
const X1 = W + 0.3;
const sky = g.createLinearGradient(0, -0.35, 0, 0.55);
sky.addColorStop(0, '#0a1128');
sky.addColorStop(0.4, '#152448');
sky.addColorStop(0.78, '#2c416f');
sky.addColorStop(1, '#4d6596');
g.fillStyle = sky;
g.fillRect(-0.3, -0.35, X1 + 0.3, 0.55 + 0.35);
g.fillStyle = '#4d6596';
g.fillRect(-0.3, 0.55, X1 + 0.3, 1.25 - 0.55);
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
  g.arc(mx + dx * r / 0.03, my + dy * r / 0.03, rr * r / 0.03, 0, Math.PI * 2);
  g.fill();
}
e.at(mx, my, 'disc');
e.light(mx, my, 0.109, '#dfe8ff', 1.1, 'glow');
e.layer('dusk', { box: [-0.3, -0.35, X1, 1.25] }, g => {
  const sky = g.createLinearGradient(0, -0.35, 0, 0.55);
  sky.addColorStop(0, '#1e2752');
  sky.addColorStop(0.42, '#3b4678');
  sky.addColorStop(0.74, '#9a7a96');
  sky.addColorStop(0.92, '#dc9f86');
  sky.addColorStop(1, '#efb487');
  g.fillStyle = sky;
  g.fillRect(-0.3, -0.35, X1 + 0.3, 0.55 + 0.35);
  g.fillStyle = '#efb487';
  g.fillRect(-0.3, 0.55, X1 + 0.3, 1.25 - 0.55);
});
e.layer('dawn', { box: [-0.3, -0.35, X1, 1.25] }, g => {
  const sky = g.createLinearGradient(0, -0.35, 0, 0.55);
  sky.addColorStop(0, '#6178a8');
  sky.addColorStop(0.5, '#a2b2d0');
  sky.addColorStop(0.85, '#dcd8d6');
  sky.addColorStop(1, '#f1dcc4');
  g.fillStyle = sky;
  g.fillRect(-0.3, -0.35, X1 + 0.3, 0.55 + 0.35);
  g.fillStyle = '#f1dcc4';
  g.fillRect(-0.3, 0.55, X1 + 0.3, 1.25 - 0.55);
  g.fillStyle = 'rgba(250, 248, 240, 0.4)';
  g.beginPath();
  g.arc(0.6, 0.11, 0.032, 0, Math.PI * 2);
  g.fill();
});
