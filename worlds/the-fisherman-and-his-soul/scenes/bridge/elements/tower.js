// The tower on the top of the town's hill: a plain square stone tower, a belfry of two dark openings, a steep
// pointed roof; one window lit low down. Metres, its foot at the origin
g.fillStyle = '#c8bfae';
g.fillRect(-2.4, -20, 4.8, 20);
g.fillStyle = '#5f4a44';
g.beginPath();
g.moveTo(-2.9, -19.8);
g.lineTo(0, -26);
g.lineTo(2.9, -19.8);
g.closePath();
g.fill();
g.fillStyle = '#26303c';
for (const x of [-1.5, 0.4]) {
  g.beginPath();
  g.moveTo(x, -15.2);
  g.lineTo(x, -17.6);
  g.arc(x + 0.55, -17.6, 0.55, Math.PI, 0);
  g.lineTo(x + 1.1, -15.2);
  g.closePath();
  g.fill();
}
g.fillStyle = 'rgba(60, 52, 46, 0.35)';
g.fillRect(-2.4, -14.6, 4.8, 0.2);
g.fillStyle = '#ffd08a';
g.fillRect(-0.35, -6.5, 0.7, 1.1);
e.light(0, -5.95, 0.6, '#ffc070', 1.1, 'window');
