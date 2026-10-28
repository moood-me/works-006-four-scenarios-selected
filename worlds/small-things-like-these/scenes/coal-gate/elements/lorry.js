// Bill's lorry on the road beyond the gate, side on (only a slice of it is seen through the gate): a flat bed with
// sideboards and coal sacks heaped on it (x −3.4…0.3), a dark green cab with its door and window (x 0.3…2.3), black
// wheels with frost on the tyres' tops.
// the bed and its sideboards
g.fillStyle = "#4b3f33";
g.fillRect(-3.4, -1.45, 3.7, 0.6);
g.fillStyle = "#3a3129";
for (let x = -3.3; x < 0.3; x += 0.62) g.fillRect(x, -1.45, 0.05, 0.6);
// the sacks heaped on it, black with coal
const sacks = new Path2D();
for (let i = 0; i < 6; i++) {
  const x = -3.1 + i * 0.58;
  sacks.moveTo(x - 0.3, -1.45);
  sacks.bezierCurveTo(x - 0.32, -1.95, x + 0.3, -2.0, x + 0.3, -1.45);
}
g.fillStyle = "#262426";
g.fill(sacks);
g.strokeStyle = "#3e3b3c";
g.lineWidth = 0.02;
g.stroke(sacks);
// the cab
g.fillStyle = "#33463c";
g.beginPath();
g.moveTo(0.3, -0.75);
g.lineTo(0.3, -2.45);
g.lineTo(1.75, -2.45);
g.quadraticCurveTo(2.05, -2.4, 2.1, -1.7);
g.lineTo(2.3, -1.55);
g.lineTo(2.3, -0.75);
g.closePath();
g.fill();
g.fillStyle = "#9eabb3";
g.fillRect(0.55, -2.25, 0.85, 0.6);
g.strokeStyle = "#22302a";
g.lineWidth = 0.03;
g.strokeRect(0.45, -2.35, 1.05, 1.5);
// the chassis and the wheels
g.fillStyle = "#1e1e1f";
g.fillRect(-3.4, -0.85, 5.7, 0.18);
for (const x of [-2.4, 1.3]) {
  g.fillStyle = "#1a1a1b";
  g.beginPath();
  g.arc(x, -0.42, 0.42, 0, 6.3);
  g.fill();
  g.fillStyle = "#5d5f62";
  g.beginPath();
  g.arc(x, -0.42, 0.17, 0, 6.3);
  g.fill();
  g.strokeStyle = "rgba(226, 232, 237, 0.8)";
  g.lineWidth = 0.04;
  g.beginPath();
  g.arc(x, -0.42, 0.4, 3.6, 5.8);
  g.stroke();
}
