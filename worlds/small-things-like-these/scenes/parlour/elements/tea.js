// The tea things on the table (0.77 m up; seen from the front, x −0.55…0.4 about across 0.62 m): Bill's cup and saucer
// set down at the table's edge (x −0.46), a white china teapot with a gold band (x 0.12; its spout's point `spout`, the
// steam rises from it), the sugar bowl with its tongs (x 0.3).
const gold = "#c4a256";
const china = "#f7f5ef";
// Bill's cup on its saucer
g.fillStyle = china;
g.beginPath();
g.ellipse(-0.46, -0.008, 0.07, 0.012, 0, 0, 6.3);
g.fill();
g.beginPath();
g.moveTo(-0.5, -0.07);
g.lineTo(-0.42, -0.07);
g.quadraticCurveTo(-0.42, -0.015, -0.46, -0.014);
g.quadraticCurveTo(-0.5, -0.015, -0.5, -0.07);
g.closePath();
g.fill();
g.strokeStyle = china;
g.lineWidth = 0.008;
g.beginPath();
g.arc(-0.41, -0.05, 0.016, -1.4, 1.4);
g.stroke();
g.fillStyle = gold;
g.fillRect(-0.5, -0.07, 0.08, 0.006);
// the teapot: its round body, the lid and knob, the spout to the left, the handle to the right, a gold band
g.fillStyle = china;
g.beginPath();
g.ellipse(0.12, -0.09, 0.1, 0.085, 0, 0, 6.3);
g.fill();
g.fillRect(0.06, -0.012, 0.12, 0.012);
g.beginPath();
g.ellipse(0.12, -0.172, 0.055, 0.016, 0, 0, 6.3);
g.fill();
g.beginPath();
g.arc(0.12, -0.195, 0.014, 0, 6.3);
g.fill();
g.beginPath();
g.moveTo(0.04, -0.07);
g.quadraticCurveTo(-0.02, -0.08, -0.05, -0.15);
g.lineTo(-0.035, -0.155);
g.quadraticCurveTo(-0.01, -0.11, 0.04, -0.11);
g.closePath();
g.fill();
g.strokeStyle = china;
g.lineWidth = 0.014;
g.beginPath();
g.arc(0.22, -0.1, 0.04, -1.3, 1.3);
g.stroke();
g.fillStyle = gold;
g.fillRect(0.025, -0.115, 0.19, 0.008);
g.fillRect(0.07, -0.165, 0.1, 0.005);
e.at(-0.045, -0.155, "spout");
// the sugar bowl and the tongs over it
g.fillStyle = china;
g.beginPath();
g.moveTo(0.25, -0.07);
g.lineTo(0.35, -0.07);
g.quadraticCurveTo(0.35, -0.01, 0.3, -0.008);
g.quadraticCurveTo(0.25, -0.01, 0.25, -0.07);
g.closePath();
g.fill();
g.fillStyle = gold;
g.fillRect(0.25, -0.07, 0.1, 0.006);
g.fillStyle = "#b9bbbd";
g.fillRect(0.29, -0.11, 0.006, 0.05);
g.fillRect(0.305, -0.11, 0.006, 0.05);
