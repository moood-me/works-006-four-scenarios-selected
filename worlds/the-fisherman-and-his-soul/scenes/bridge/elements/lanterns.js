// The square's night (3.2, `square`): a string of paper lanterns hung across the lane from the potter's eave to a pole
// at the quay's edge, sagging, each warm and glowing — each its own small light. Metres, the pole's foot (the quay's
// edge) at the origin, x across the lane to the right (the eave at 4.1). Nothing without the square
if (!e.state.square) return;
g.fillStyle = '#3a2e26';
g.fillRect(-0.05, -3.4, 0.1, 3.4);
g.strokeStyle = '#3a2e26';
g.lineWidth = 0.02;
g.beginPath();
g.moveTo(0, -3.3);
g.quadraticCurveTo(2.05, -2.5, 4.1, -2.75);
g.stroke();
const COLS = ['#ffd27a', '#ffb066', '#ff9a6a', '#ffe0a0'];
for (let i = 0; i < 6; i++) {
  const u = (i + 0.5) / 6;
  const x = 4.1 * u;
  const y = (1 - u) * (1 - u) * -3.3 + 2 * (1 - u) * u * -2.5 + u * u * -2.75 + 0.18;
  g.fillStyle = COLS[i % 4];
  g.beginPath();
  g.ellipse(x, y, 0.1, 0.13, 0, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = 'rgba(80, 40, 20, 0.5)';
  g.fillRect(x - 0.06, y - 0.15, 0.12, 0.03);
  e.light(x, y, 0.32, COLS[i % 4], 0.9, 'l' + i);
}
