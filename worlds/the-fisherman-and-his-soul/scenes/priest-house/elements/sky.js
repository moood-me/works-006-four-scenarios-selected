// The sky seen through the open door: over the sea, low in the doorway. Painted twice, once: the night (deep ink above,
// a paler blue to the sea's horizon, the full moon low over the water — its glow the engine's, its light the scene's
// "moon", from "sky#disc", coming in at the door) and, as the layer `dawn`, the early morning (a pale sky, warm low over
// the sea where the sun is about to rise). The shader shows the dawn over the night by `morning` (sky.animate.js), and the
// stars of the night
const W = e.aspect;
const night = g.createLinearGradient(0, -0.35, 0, 0.46);
night.addColorStop(0, '#0a1128');
night.addColorStop(0.45, '#162650');
night.addColorStop(0.85, '#30467a');
night.addColorStop(1, '#5571a4');
g.fillStyle = night;
g.fillRect(-0.3, -0.35, W + 0.6, 0.81);
g.fillStyle = '#5571a4';
g.fillRect(-0.3, 0.46, W + 0.6, 0.79);
// the moon: a full disc low over the sea, a few soft grey seas on it
const mx = 1.0;
const my = 0.405;
const r = 0.024;
g.fillStyle = '#f6f1e2';
g.beginPath();
g.arc(mx, my, r, 0, Math.PI * 2);
g.fill();
g.fillStyle = 'rgba(176, 178, 170, 0.35)';
for (const [dx, dy, rr] of [[-0.007, -0.005, 0.007], [0.006, 0.003, 0.0055], [-0.002, 0.009, 0.004], [0.008, -0.008, 0.003]]) {
  g.beginPath();
  g.arc(mx + dx, my + dy, rr, 0, Math.PI * 2);
  g.fill();
}
e.at(mx, my, 'disc');
e.light(mx, my, 0.09, '#dfe8ff', 1.1, 'glow');
// the early morning: a pale blue above, a warm haze low over the sea, brightest where the sun will come up
e.layer('dawn', {}, g => {
  const day = g.createLinearGradient(0, -0.35, 0, 0.46);
  day.addColorStop(0, '#6c84b2');
  day.addColorStop(0.55, '#a9b9d4');
  day.addColorStop(0.88, '#dfd9d2');
  day.addColorStop(1, '#f2dcc0');
  g.fillStyle = day;
  g.fillRect(-0.3, -0.35, W + 0.6, 0.81);
  g.fillStyle = '#f2dcc0';
  g.fillRect(-0.3, 0.46, W + 0.6, 0.79);
  const sun = g.createRadialGradient(0.96, 0.45, 0, 0.96, 0.45, 0.22);
  sun.addColorStop(0, 'rgba(255, 236, 200, 0.9)');
  sun.addColorStop(1, 'rgba(255, 236, 200, 0)');
  g.fillStyle = sun;
  g.fillRect(0.6, 0.2, 0.72, 0.5);
});
