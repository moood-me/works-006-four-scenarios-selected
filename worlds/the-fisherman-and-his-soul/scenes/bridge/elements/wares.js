// The potter's bench beyond his door with what he made: a plank on two trestles, on it jugs and bowls of fired clay in
// their earthy reds and ochres. As cottage's front, x toward the viewer; its
// foot at the origin
g.fillStyle = '#5c4636';
g.fillRect(-0.75, -0.46, 1.5, 0.06);
for (const x of [-0.6, 0.55]) g.fillRect(x, -0.42, 0.06, 0.42);
const pots = [[-0.55, 0.11, 0.17, '#a85c3c'], [-0.28, 0.08, 0.1, '#c48a58'], [-0.05, 0.13, 0.22, '#93583e'], [0.22, 0.09, 0.12, '#b8744a'], [0.46, 0.1, 0.15, '#a0603f']];
for (const [x, r, h, c] of pots) {
  g.fillStyle = c;
  g.beginPath();
  g.ellipse(x, -0.46 - h / 2, r, h / 2, 0, 0, Math.PI * 2);
  g.fill();
  g.fillRect(x - r * 0.45, -0.46 - h - 0.04, r * 0.9, 0.06);
}
