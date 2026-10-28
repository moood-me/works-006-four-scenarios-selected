// The plain board bench along Papa's table, on its room side (where Grandmother and Sophia sit at it): a worn pine seat
// on two splayed legs, a stretcher between them. Seen from its side, along the table (x toward the house's wall), 0.44 m
// high. Metres from its middle at the floor.
g.fillStyle = '#9c8466';
g.fillRect(-0.58, -0.44, 1.16, 0.05);
g.fillStyle = '#8a7358';
g.fillRect(-0.58, -0.395, 1.16, 0.015);
for (const x of [-0.45, 0.45]) {
  g.beginPath();
  g.moveTo(x - 0.035, -0.39);
  g.lineTo(x + 0.035, -0.39);
  g.lineTo(x + 0.05 * Math.sign(x) + 0.03, 0);
  g.lineTo(x + 0.05 * Math.sign(x) - 0.03, 0);
  g.closePath();
  g.fill();
}
g.fillRect(-0.45, -0.17, 0.9, 0.03);
g.strokeStyle = 'rgba(80,64,48,0.35)';
g.lineWidth = 0.004;
g.beginPath();
g.moveTo(-0.55, -0.42);
g.lineTo(0.55, -0.425);
g.stroke();
