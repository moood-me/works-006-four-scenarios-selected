// The lamp over the table (hanging from the ceiling, 0.95 m above the shade's rim at 1.95 m): a plaited flex, a cone
// shade of green enamel, white inside, the bulb at its mouth; its glow `bulb` — the scene's light `lamp` shines from it.
g.strokeStyle = "#3a3330";
g.lineWidth = 0.01;
g.beginPath();
g.moveTo(0, -0.95);
g.lineTo(0, -0.24);
g.stroke();
g.fillStyle = "#c9c2b0";
g.fillRect(-0.03, -0.26, 0.06, 0.06);
g.fillStyle = "#3f6a52";
g.beginPath();
g.moveTo(-0.05, -0.2);
g.lineTo(0.05, -0.2);
g.lineTo(0.22, -0.02);
g.lineTo(-0.22, -0.02);
g.closePath();
g.fill();
g.fillStyle = "#f2efe6";
g.beginPath();
g.ellipse(0, -0.02, 0.22, 0.025, 0, 0, 6.3);
g.fill();
g.fillStyle = "#fff4dc";
g.beginPath();
g.ellipse(0, -0.005, 0.045, 0.035, 0, 0, 6.3);
g.fill();
e.light(0, 0, 0.3, "#ffd49a", 1, "bulb");
