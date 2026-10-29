// What the window looks out on: across the river the bridge's dark arches, two of its lamps warm on the parapet, their
// glints on the water below, the far bank's low line. Metres, its foot (the water) at the origin; far enough that it
// barely moves
g.fillStyle = '#2b3348';
g.fillRect(-30, -4, 60, 4.2);
g.fillStyle = '#4a4e5c';
g.fillRect(-30, -9, 60, 4.6);
// the arches cut out of the bridge's face
g.fillStyle = '#2b3348';
for (const cx of [-14, 0, 14]) {
  g.beginPath();
  g.ellipse(cx, -4.4, 5.2, 3.6, 0, Math.PI, 0);
  g.fill();
}
g.fillStyle = '#3e4252';
g.fillRect(-30, -10.2, 60, 1.2);
for (const x of [-10, 6]) {
  g.fillStyle = '#1e1c22';
  g.fillRect(x - 0.08, -12, 0.16, 1.8);
  g.fillStyle = '#ffd08a';
  g.fillRect(x - 0.3, -12.6, 0.6, 0.7);
  e.light(x, -12.25, 0.9, '#ffc070', 1.4, 'lamp' + (x > 0 ? 'r' : 'l'));
  g.fillStyle = 'rgba(255, 200, 120, 0.45)';
  g.fillRect(x - 0.12, -1.6, 0.24, 1.4);
}
g.fillStyle = '#353a4a';
g.beginPath();
g.moveTo(-30, -9.5);
g.lineTo(-30, -16);
g.quadraticCurveTo(0, -19, 30, -15);
g.lineTo(30, -9.5);
g.closePath();
g.fill();
