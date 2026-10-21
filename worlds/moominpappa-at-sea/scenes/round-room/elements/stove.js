// The little iron cooking stove by the wall, cold: a black round body on short legs, its door shut, a pan on the hob,
// its pipe going up to the ceiling; beside it the rope of the driftwood bundle, almost empty.
const H = e.lib.H;
g.fillStyle = "#2b2a2c";
g.fillRect(-0.04, -H, 0.08, H - 0.78);
g.fillStyle = "#3a383a";
g.fillRect(-0.05, -1.0, 0.1, 0.22);
g.fillStyle = "#302e30";
g.beginPath();
g.moveTo(-0.3, -0.12);
g.lineTo(-0.32, -0.7);
g.quadraticCurveTo(0, -0.8, 0.32, -0.7);
g.lineTo(0.3, -0.12);
g.closePath();
g.fill();
g.fillStyle = "#454245";
g.fillRect(-0.34, -0.74, 0.68, 0.05);
for (const x of [-0.24, 0.24]) g.fillRect(x - 0.03, -0.12, 0.06, 0.12);
g.fillStyle = "#1b1a1c";
g.fillRect(-0.13, -0.5, 0.26, 0.2);
g.strokeStyle = "#5a5658";
g.lineWidth = 0.012;
g.strokeRect(-0.13, -0.5, 0.26, 0.2);
// the pan
g.fillStyle = "#6d6a64";
g.fillRect(-0.24, -0.86, 0.26, 0.12);
g.fillRect(0.02, -0.83, 0.16, 0.02);
// the bundle's rope with two sticks of driftwood left in it
g.strokeStyle = "#a88c64";
g.lineWidth = 0.02;
g.beginPath();
g.ellipse(0.55, -0.05, 0.18, 0.05, 0, 0, Math.PI * 2);
g.stroke();
g.strokeStyle = "#c2b39a";
g.lineWidth = 0.05;
g.beginPath();
g.moveTo(0.38, -0.04);
g.lineTo(0.74, -0.09);
g.moveTo(0.42, -0.1);
g.lineTo(0.7, -0.02);
g.stroke();
e.at(0, -0.6, "stove");
