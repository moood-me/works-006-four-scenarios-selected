// The Sacred Heart lamp under the picture: a small red glass on a brass bracket, lit day and night; its glow `lamp` —
// the scene's light `sacred` shines from it.
g.fillStyle = "#b8954a";
g.fillRect(-0.05, -0.02, 0.1, 0.02);
g.fillRect(-0.008, -0.03, 0.016, 0.03);
g.fillStyle = "#c8322a";
g.beginPath();
g.moveTo(-0.035, -0.03);
g.lineTo(-0.03, -0.1);
g.quadraticCurveTo(0, -0.12, 0.03, -0.1);
g.lineTo(0.035, -0.03);
g.closePath();
g.fill();
e.light(0, -0.07, 0.08, "#ff4a35", 0.6, "lamp");
