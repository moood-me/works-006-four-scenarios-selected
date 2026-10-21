// The Fisherman's fish box: a small weathered crate of grey boards, two silver fish of the morning's catch in it.
g.fillStyle = "#8d8378";
g.fillRect(-0.32, -0.24, 0.64, 0.24);
g.strokeStyle = "rgba(60, 52, 48, 0.6)";
g.lineWidth = 0.012;
for (const y of [-0.16, -0.08]) {
  g.beginPath();
  g.moveTo(-0.32, y);
  g.lineTo(0.32, y);
  g.stroke();
}
g.fillStyle = "#a59b8f";
g.fillRect(-0.34, -0.26, 0.68, 0.035);
for (const [x, a] of [[-0.08, -0.25], [0.1, 0.2]]) {
  g.save();
  g.translate(x, -0.27);
  g.rotate(a);
  g.fillStyle = "#c9d0d4";
  g.beginPath();
  g.ellipse(0, 0, 0.13, 0.032, 0, 0, Math.PI * 2);
  g.fill();
  g.beginPath();
  g.moveTo(0.12, 0);
  g.lineTo(0.18, -0.035);
  g.lineTo(0.18, 0.035);
  g.closePath();
  g.fill();
  g.fillStyle = "#6f7d86";
  g.fillRect(-0.12, -0.03, 0.22, 0.012);
  g.restore();
}
