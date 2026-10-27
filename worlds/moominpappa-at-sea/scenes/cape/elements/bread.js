// The flat stone by the path onto the cape where Moominmamma leaves the Fisherman his bread (`bread#stone`): a low
// grey slab; on it, when `bread`, a round loaf wrapped in a blue-checked cloth.
g.fillStyle = "#9d8a85";
g.beginPath();
g.moveTo(-0.5, 0.02);
g.quadraticCurveTo(-0.52, -0.14, -0.3, -0.17);
g.lineTo(0.34, -0.16);
g.quadraticCurveTo(0.52, -0.12, 0.5, 0.02);
g.closePath();
g.fill();
g.fillStyle = "rgba(70, 56, 56, 0.35)";
g.fillRect(-0.48, -0.03, 0.96, 0.05);
if (e.state.bread) {
  g.fillStyle = "#e8e2d6";
  g.beginPath();
  g.moveTo(-0.24, -0.16);
  g.quadraticCurveTo(-0.22, -0.34, 0, -0.36);
  g.quadraticCurveTo(0.22, -0.34, 0.24, -0.16);
  g.closePath();
  g.fill();
  g.strokeStyle = "rgba(70, 96, 140, 0.7)";
  g.lineWidth = 0.012;
  for (let x = -0.2; x <= 0.2; x += 0.06) {
    g.beginPath();
    g.moveTo(x, -0.16);
    g.lineTo(x * 0.8, -0.33);
    g.stroke();
  }
  g.fillStyle = "#b9874e";
  g.beginPath();
  g.ellipse(0.02, -0.33, 0.13, 0.05, 0, Math.PI, 0);
  g.fill();
  g.strokeStyle = "#e8e2d6";
  g.lineWidth = 0.02;
  g.beginPath();
  g.moveTo(-0.08, -0.36);
  g.lineTo(0.14, -0.29);
  g.stroke();
}
e.at(0, -0.2, "stone");
