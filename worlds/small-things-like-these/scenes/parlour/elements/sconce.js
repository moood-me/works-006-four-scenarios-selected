// A wall light by the door on the left wall (1.3…1.6 m up): a brass backplate and arm, a small frosted tulip shade,
// lit; its glow `bulb` — the scene's light `sconce` shines from it, on Sara's face.
g.fillStyle = "#b89448";
g.fillRect(-0.03, -0.12, 0.06, 0.12);
g.fillRect(-0.005, -0.12, 0.01, 0.06);
g.fillStyle = "#fbefd6";
g.beginPath();
g.moveTo(-0.06, -0.28);
g.quadraticCurveTo(-0.07, -0.18, -0.025, -0.14);
g.lineTo(0.025, -0.14);
g.quadraticCurveTo(0.07, -0.18, 0.06, -0.28);
g.closePath();
g.fill();
e.light(0, -0.21, 0.12, "#ffd8a0", 0.8, "bulb");
