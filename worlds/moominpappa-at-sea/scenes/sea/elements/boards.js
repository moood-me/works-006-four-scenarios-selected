// The floorboards in the bottom of the boat, from above: worn grey-brown boards along her, a coil of rope, a bailer.
g.fillStyle = '#8f7a62';
g.fillRect(-0.4, -1.8, 0.8, 3.6);
for (let x = -0.4; x < 0.4; x += 0.13) {
  g.fillStyle = 'rgba(50, 40, 30, 0.55)';
  g.fillRect(x + 0.125, -1.8, 0.008, 3.6);
}
g.strokeStyle = '#b39c74';
g.lineWidth = 0.025;
for (let r = 0.04; r < 0.16; r += 0.03) {
  g.beginPath();
  g.arc(0.15, -1.2, r, 0, Math.PI * 2);
  g.stroke();
}
g.fillStyle = '#6f8c7a';
g.beginPath();
g.ellipse(-0.18, 0.9, 0.12, 0.08, 0.3, 0, Math.PI * 2);
g.fill();
