// The coal gate's leaf, an iron grille standing open into the yard (painted from its hinge, x 0…1.2): a frame, upright
// bars, two rails, the lock box; frost on the top rail.
g.strokeStyle = "#232324";
g.lineWidth = 0.05;
g.strokeRect(0.03, -2.2, 1.14, 2.15);
g.lineWidth = 0.025;
g.beginPath();
for (let x = 0.15; x < 1.15; x += 0.12) {
  g.moveTo(x, -2.2);
  g.lineTo(x, -0.05);
}
g.moveTo(0.03, -1.45);
g.lineTo(1.17, -1.45);
g.moveTo(0.03, -0.6);
g.lineTo(1.17, -0.6);
g.stroke();
g.fillStyle = "#2b2a2a";
g.fillRect(0.98, -1.25, 0.16, 0.22);
g.strokeStyle = "rgba(232, 238, 242, 0.9)";
g.lineWidth = 0.02;
g.beginPath();
g.moveTo(0.03, -2.235);
g.lineTo(1.17, -2.235);
g.stroke();
