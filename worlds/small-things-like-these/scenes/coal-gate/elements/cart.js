// Bill's hand cart in the near right of the yard, two sacks of coal still on it: a two-wheeled iron-shod barrow, its
// wooden bed and long handles to the left, the sacks black and lumpy, a little coal spilt on the frost under it.
// the spilt coal
g.fillStyle = "#1d1c1d";
for (const [x, w] of [[-0.5, 0.05], [-0.2, 0.04], [0.35, 0.06], [0.6, 0.035]]) {
  g.beginPath();
  g.ellipse(x, 0.0, w, w * 0.5, 0, 0, 6.3);
  g.fill();
}
// the handles
g.strokeStyle = "#4e4134";
g.lineWidth = 0.05;
g.beginPath();
g.moveTo(-0.85, -0.82);
g.lineTo(0.3, -0.46);
g.stroke();
// the wheel
g.strokeStyle = "#232324";
g.lineWidth = 0.05;
g.beginPath();
g.arc(0.35, -0.3, 0.28, 0, 6.3);
g.stroke();
g.lineWidth = 0.025;
g.beginPath();
for (let k = 0; k < 8; k++) {
  const a = (k / 8) * Math.PI * 2;
  g.moveTo(0.35, -0.3);
  g.lineTo(0.35 + Math.cos(a) * 0.27, -0.3 + Math.sin(a) * 0.27);
}
g.stroke();
// the bed
g.fillStyle = "#5a4b3c";
g.beginPath();
g.moveTo(-0.55, -0.5);
g.lineTo(0.75, -0.5);
g.lineTo(0.8, -0.72);
g.lineTo(-0.6, -0.72);
g.closePath();
g.fill();
// the sacks
g.fillStyle = "#262426";
g.beginPath();
g.moveTo(-0.55, -0.72);
g.bezierCurveTo(-0.62, -1.1, -0.05, -1.12, 0.02, -0.72);
g.closePath();
g.fill();
g.beginPath();
g.moveTo(0.0, -0.72);
g.bezierCurveTo(-0.02, -1.05, 0.78, -1.08, 0.78, -0.72);
g.closePath();
g.fill();
g.strokeStyle = "#3b393a";
g.lineWidth = 0.015;
g.beginPath();
g.moveTo(-0.3, -1.0);
g.lineTo(-0.22, -1.04);
g.moveTo(0.38, -0.98);
g.lineTo(0.46, -1.0);
g.stroke();
