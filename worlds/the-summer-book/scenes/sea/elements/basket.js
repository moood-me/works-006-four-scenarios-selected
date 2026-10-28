// The lidded wicker basket in the bow (`basket`): the cat Mappe sitting on its lid, big and grey, his tail round his
// feet, facing the island going away — or the lid shut down and strapped, him in it. Metres from the middle of its
// foot; 0.6 m wide. Point: `cat` (his head; or the lid's strap).
const cat = e.state.basket === 'cat';
g.fillStyle = '#b38f5c';
g.fillRect(-0.3, -0.4, 0.6, 0.4);
g.strokeStyle = 'rgba(110,80,40,0.6)';
g.lineWidth = 0.012;
for (let y = -0.34; y < 0; y += 0.06) {
  g.beginPath();
  g.moveTo(-0.3, y);
  g.lineTo(0.3, y);
  g.stroke();
}
g.fillStyle = '#9c7a4a';
g.fillRect(-0.32, -0.46, 0.64, 0.07);
if (cat) {
  g.fillStyle = '#6f7274';
  g.beginPath();
  g.ellipse(0, -0.6, 0.15, 0.17, 0, 0, 6.2832);
  g.fill();
  g.beginPath();
  g.ellipse(0, -0.82, 0.09, 0.08, 0, 0, 6.2832);
  g.fill();
  g.beginPath();
  g.moveTo(-0.08, -0.86);
  g.lineTo(-0.06, -0.94);
  g.lineTo(-0.02, -0.88);
  g.closePath();
  g.moveTo(0.08, -0.86);
  g.lineTo(0.06, -0.94);
  g.lineTo(0.02, -0.88);
  g.closePath();
  g.fill();
  g.strokeStyle = '#6a6d6f';
  g.lineWidth = 0.045;
  g.lineCap = 'round';
  g.beginPath();
  g.moveTo(0.12, -0.47);
  g.quadraticCurveTo(0.2, -0.43, 0.02, -0.45);
  g.stroke();
  e.at(0, -0.82, 'cat');
} else {
  g.fillStyle = '#4a3a30';
  g.fillRect(-0.03, -0.46, 0.06, 0.46);
  e.at(0, -0.46, 'cat');
}
