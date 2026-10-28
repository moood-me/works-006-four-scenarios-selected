// The engine's housing aft: a box of boards painted grey-green, its lid with a brass handle, the tiller's iron over it
// to the right. Metres from the middle of its foot; 0.9 m wide, 0.75 high.
g.fillStyle = '#6f7a70';
g.fillRect(-0.45, -0.72, 0.9, 0.74);
g.fillStyle = '#5c665d';
g.fillRect(-0.48, -0.78, 0.96, 0.08);
g.strokeStyle = 'rgba(40,46,42,0.5)';
g.lineWidth = 0.012;
for (let x = -0.3; x < 0.45; x += 0.15) {
  g.beginPath();
  g.moveTo(x, -0.7);
  g.lineTo(x, 0.02);
  g.stroke();
}
g.fillStyle = '#b39a5c';
g.fillRect(-0.06, -0.62, 0.12, 0.03);
g.strokeStyle = '#3c3f42';
g.lineWidth = 0.035;
g.beginPath();
g.moveTo(0.4, -0.78);
g.lineTo(0.5, -0.95);
g.stroke();
