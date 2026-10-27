// The bench behind the table, facing the room: a long pine plank on two trestle ends, worn pale where they sit.
g.fillStyle = "#8c6e50";
for (const x of [-0.68, 0.6]) {
  g.beginPath();
  g.moveTo(x - 0.05, 0);
  g.lineTo(x + 0.02, -0.42);
  g.lineTo(x + 0.06, -0.42);
  g.lineTo(x + 0.13, 0);
  g.closePath();
  g.fill();
}
g.fillStyle = "#a88a64";
g.fillRect(-0.8, -0.46, 1.6, 0.05);
g.fillStyle = "rgba(240, 222, 190, 0.3)";
g.fillRect(-0.6, -0.46, 1.2, 0.012);
g.fillStyle = "rgba(60, 42, 30, 0.45)";
g.fillRect(-0.8, -0.41, 1.6, 0.01);
