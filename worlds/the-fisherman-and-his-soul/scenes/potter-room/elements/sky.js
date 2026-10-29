// The sky seen through the window, over the river and the bridge: night — deep blue, a few stars (the shader's) — and,
// as the layer `dawn`, an early morning: pale, warm low. The shader shows the dawn over the night by `morning`
// (sky.animate.js)
const W = e.aspect;
const night = g.createLinearGradient(0, -0.35, 0, 0.5);
night.addColorStop(0, '#0c1430');
night.addColorStop(0.6, '#1b2c58');
night.addColorStop(1, '#3a5486');
g.fillStyle = night;
g.fillRect(-0.3, -0.35, W + 0.6, 0.85);
g.fillStyle = '#3a5486';
g.fillRect(-0.3, 0.5, W + 0.6, 0.75);
e.layer('dawn', {}, g => {
  const day = g.createLinearGradient(0, -0.35, 0, 0.5);
  day.addColorStop(0, '#7a92bc');
  day.addColorStop(0.6, '#b9c6da');
  day.addColorStop(1, '#f0dcc0');
  g.fillStyle = day;
  g.fillRect(-0.3, -0.35, W + 0.6, 0.85);
  g.fillStyle = '#f0dcc0';
  g.fillRect(-0.3, 0.5, W + 0.6, 0.75);
});
