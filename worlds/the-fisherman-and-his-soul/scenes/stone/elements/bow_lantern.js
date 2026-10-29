// The Fisherman's lantern on the boat's bow: a short iron-shod pole up from the stem, an arm out over the water and
// the lantern hanging from its hook — a layer that swings a little (animate). Its flame is the scene's light
// "lantern". Nothing while the boat is not here
if (!e.state.boat) return;
g.fillStyle = '#4f4034';
g.fillRect(-0.03, -0.62, 0.06, 0.66);
g.fillStyle = 'rgba(30, 24, 20, 0.45)';
g.fillRect(0.008, -0.62, 0.02, 0.66);
g.fillRect(-0.03, -0.62, 0.3, 0.035);
e.layer('lantern', { pivot: [0.22, -0.6], box: [0.08, -0.62, 0.36, -0.2] }, g => {
  g.strokeStyle = '#2a2420';
  g.lineWidth = 0.012;
  g.beginPath();
  g.moveTo(0.22, -0.6);
  g.lineTo(0.22, -0.5);
  g.stroke();
  g.fillStyle = '#2f2a26';
  g.beginPath();
  g.moveTo(0.22, -0.52);
  g.lineTo(0.29, -0.46);
  g.lineTo(0.15, -0.46);
  g.closePath();
  g.fill();
  g.fillStyle = '#ffe2a8';
  g.fillRect(0.162, -0.46, 0.116, 0.18);
  g.fillStyle = '#2f2a26';
  for (const x of [0.162, 0.215, 0.267]) g.fillRect(x, -0.46, 0.011, 0.18);
  g.fillRect(0.15, -0.28, 0.14, 0.03);
  e.light(0.22, -0.37, 0.12, '#ffc574', 1.2, 'flame');
});
