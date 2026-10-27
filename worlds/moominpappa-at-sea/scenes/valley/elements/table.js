// The veranda table: a white cloth with a red border hanging over its edge, its turned legs below. Its point (its top's
// middle) is what the camera frames for the supper.
g.fillStyle = '#7a5a3c';
for (const x of [-0.5, 0.5]) {
  g.beginPath();
  g.moveTo(x - 0.035, -0.42);
  g.quadraticCurveTo(x - 0.06, -0.2, x - 0.03, 0);
  g.lineTo(x + 0.03, 0);
  g.quadraticCurveTo(x + 0.06, -0.2, x + 0.035, -0.42);
  g.fill();
}
g.fillStyle = '#f6f3ea';
g.beginPath();
g.moveTo(-0.62, -0.5);
g.lineTo(0.62, -0.5);
g.lineTo(0.64, -0.3);
g.quadraticCurveTo(0, -0.27, -0.64, -0.3);
g.closePath();
g.fill();
g.fillStyle = '#c4473a';
g.beginPath();
g.moveTo(-0.64, -0.33);
g.quadraticCurveTo(0, -0.3, 0.64, -0.33);
g.lineTo(0.64, -0.3);
g.quadraticCurveTo(0, -0.27, -0.64, -0.3);
g.closePath();
g.fill();
g.strokeStyle = 'rgba(150, 140, 120, 0.5)';
g.lineWidth = 0.01;
for (const x of [-0.4, -0.1, 0.25, 0.5]) {
  g.beginPath();
  g.moveTo(x, -0.48);
  g.lineTo(x + 0.01, -0.3);
  g.stroke();
}
e.at(0, -0.5);
