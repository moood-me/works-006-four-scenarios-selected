// The wireless on its shelf on the back wall (x −0.3…0.3, the shelf at the foot): a walnut cabinet with a rounded top,
// a cloth grille behind a sunrise fretwork, the dial's glass lit from inside (its small glow `dial`) and two knobs;
// a plain shelf on two iron brackets under it.
g.fillStyle = "#6c5642";
g.fillRect(-0.3, -0.035, 0.6, 0.035);
g.fillStyle = "#3a3634";
for (const x of [-0.22, 0.2]) {
  g.beginPath();
  g.moveTo(x, 0);
  g.lineTo(x + 0.02, 0);
  g.lineTo(x + 0.02, 0.12);
  g.closePath();
  g.fill();
}
// the cabinet
g.fillStyle = "#6a432a";
g.beginPath();
g.moveTo(-0.21, -0.035);
g.lineTo(-0.21, -0.32);
g.quadraticCurveTo(-0.21, -0.46, 0, -0.46);
g.quadraticCurveTo(0.21, -0.46, 0.21, -0.32);
g.lineTo(0.21, -0.035);
g.closePath();
g.fill();
// the cloth grille and the sunrise fret over it
g.fillStyle = "#c9b48a";
g.beginPath();
g.moveTo(-0.15, -0.16);
g.lineTo(-0.15, -0.31);
g.quadraticCurveTo(-0.15, -0.41, 0, -0.41);
g.quadraticCurveTo(0.15, -0.41, 0.15, -0.31);
g.lineTo(0.15, -0.16);
g.closePath();
g.fill();
g.strokeStyle = "#5a3822";
g.lineWidth = 0.014;
g.beginPath();
for (const a of [-1.2, -0.6, 0, 0.6, 1.2]) {
  g.moveTo(0, -0.16);
  g.lineTo(Math.sin(a) * 0.17, -0.16 - Math.cos(a) * 0.23);
}
g.stroke();
// the dial and the knobs
g.fillStyle = "#efe0b0";
g.fillRect(-0.12, -0.13, 0.24, 0.05);
g.fillStyle = "#6a432a";
for (let x = -0.1; x < 0.12; x += 0.04) g.fillRect(x, -0.125, 0.004, 0.015);
g.fillStyle = "#2a1c14";
for (const x of [-0.14, 0.14]) {
  g.beginPath();
  g.arc(x, -0.06, 0.022, 0, 6.3);
  g.fill();
}
e.light(0, -0.105, 0.05, "#ffd9a0", 0.35, "dial");
