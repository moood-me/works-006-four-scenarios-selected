// His net heaped in the boat on the boards by the thwart: brown twine in loose folds, a row of pale cork floats along
// its top. Only while it is in the boat (`net` heap)
if (!e.state.boat || e.state.net !== 'heap') return;
g.fillStyle = '#5e4a38';
g.beginPath();
g.moveTo(-0.42, 0);
g.bezierCurveTo(-0.4, -0.16, -0.22, -0.26, -0.02, -0.24);
g.bezierCurveTo(0.18, -0.28, 0.36, -0.18, 0.42, 0);
g.closePath();
g.fill();
g.strokeStyle = 'rgba(150, 124, 96, 0.55)';
g.lineWidth = 0.008;
for (let i = 0; i < 9; i++) {
  const y = -0.22 + 0.025 * i;
  g.beginPath();
  g.moveTo(-0.38 + 0.02 * i, y + 0.02);
  g.quadraticCurveTo(0, y - 0.04, 0.38 - 0.02 * i, y + 0.02);
  g.stroke();
}
g.fillStyle = '#d8c79a';
for (let i = 0; i < 6; i++) {
  g.beginPath();
  g.ellipse(-0.3 + 0.12 * i, -0.2 - 0.04 * Math.sin(i * 1.3), 0.035, 0.022, 0.2, 0, Math.PI * 2);
  g.fill();
}
