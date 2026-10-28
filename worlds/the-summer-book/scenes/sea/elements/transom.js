// The stern seen from inside: the transom's planks, the gunwale over them, a cleat with the dinghy's painter on it.
// Metres from the middle of its foot on the deck; 2.3 m wide. Point: `cleat`.
g.fillStyle = '#c4c1b9';
g.fillRect(-1.15, -0.75, 2.3, 0.85);
g.strokeStyle = 'rgba(120,116,108,0.45)';
g.lineWidth = 0.012;
for (let y = -0.6; y < 0.1; y += 0.15) {
  g.beginPath();
  g.moveTo(-1.15, y);
  g.lineTo(1.15, y);
  g.stroke();
}
g.fillStyle = '#4a4f55';
g.fillRect(-1.2, -0.8, 2.4, 0.09);
g.fillStyle = '#6e655a';
g.fillRect(-0.12, -0.86, 0.24, 0.06);
g.strokeStyle = '#b9ab8f';
g.lineWidth = 0.02;
g.beginPath();
g.moveTo(0, -0.84);
g.quadraticCurveTo(0.05, -0.95, 0.02, -1.0);
g.stroke();
e.at(0, -0.84, 'cleat');
