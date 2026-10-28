// Sophia's pillow, from above, and on it — when there is one (`bird`) — a dead bird the cat brought: a small grey-brown
// bird lying on its side, a wing loose, its feet drawn up. Metres from the pillow's middle (x across, y toward the room).
g.fillStyle = '#f6f4ef';
g.beginPath();
g.ellipse(0, 0, 0.27, 0.17, 0, 0, 6.2832);
g.fill();
g.strokeStyle = 'rgba(180,176,166,0.6)';
g.lineWidth = 0.01;
g.beginPath();
g.ellipse(0, 0, 0.21, 0.11, 0, 0, 6.2832);
g.stroke();
if (e.state.bird) {
  g.fillStyle = '#7a6a5a';
  g.beginPath();
  g.ellipse(0.02, 0.02, 0.075, 0.04, -0.3, 0, 6.2832);
  g.fill();
  g.fillStyle = '#9b8a74';
  g.beginPath();
  g.ellipse(0.0, 0.035, 0.05, 0.022, -0.3, 0, 6.2832);
  g.fill();
  g.fillStyle = '#6a5c4e';
  g.beginPath();
  g.arc(0.085, -0.015, 0.025, 0, 6.2832);
  g.fill();
  g.fillStyle = '#3a3430';
  g.beginPath();
  g.moveTo(0.105, -0.02);
  g.lineTo(0.135, -0.03);
  g.lineTo(0.105, -0.008);
  g.closePath();
  g.fill();
  g.fillStyle = '#5e5248';
  g.beginPath();
  g.moveTo(-0.05, 0.03);
  g.lineTo(-0.11, 0.06);
  g.lineTo(-0.1, 0.03);
  g.closePath();
  g.fill();
  g.strokeStyle = '#4a4038';
  g.lineWidth = 0.004;
  g.beginPath();
  g.moveTo(0.01, 0.05);
  g.lineTo(0.0, 0.075);
  g.moveTo(0.03, 0.05);
  g.lineTo(0.035, 0.075);
  g.stroke();
}
e.at(0, 0, 'pillow');
