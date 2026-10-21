// The potter's lit room seen through his open door and his two windows (as cottage's front: x toward the viewer, the
// door at 0, the windows at 1.85 and −1.9): warm from the hearth inside, the back wall, a shelf with pots and on it the
// small silver cup — his wife's, they drank from it at their wedding; the windows' panes warm behind their bars.
// It glows: the scene's light doesn't darken it
const room = g.createLinearGradient(0, -1.95, 0, 0);
room.addColorStop(0, '#c98a52');
room.addColorStop(0.55, '#f0b674');
room.addColorStop(1, '#a8683e');
g.fillStyle = room;
g.fillRect(-0.47, -1.95, 0.94, 1.95);
// the shelf, its pots and the silver cup
g.fillStyle = '#6e4a32';
g.fillRect(-0.47, -1.32, 0.94, 0.04);
g.fillStyle = '#8f5638';
g.beginPath();
g.ellipse(-0.3, -1.42, 0.07, 0.1, 0, 0, Math.PI * 2);
g.fill();
g.beginPath();
g.ellipse(0.28, -1.4, 0.08, 0.08, 0, 0, Math.PI * 2);
g.fill();
g.fillStyle = '#e4e6ea';
g.beginPath();
g.moveTo(-0.06, -1.5);
g.lineTo(0.06, -1.5);
g.quadraticCurveTo(0.05, -1.4, 0.012, -1.39);
g.lineTo(0.012, -1.34);
g.lineTo(0.04, -1.32);
g.lineTo(-0.04, -1.32);
g.lineTo(-0.012, -1.34);
g.lineTo(-0.012, -1.39);
g.quadraticCurveTo(-0.05, -1.4, -0.06, -1.5);
g.closePath();
g.fill();
e.at(0, -1.42, 'cup');
// the floor's darker boards, the hearth's glow low on the left
g.fillStyle = 'rgba(90, 50, 30, 0.6)';
g.fillRect(-0.47, -0.35, 0.94, 0.35);
e.light(-0.1, -0.7, 0.6, '#ffaa5c', 0.8, 'door');
// the windows' panes behind their bars
for (const [x, n] of [[1.85, 'window'], [-1.9, 'far_window']]) {
  g.fillStyle = '#ffcd88';
  g.fillRect(x - 0.36, -1.72, 0.72, 0.82);
  g.fillStyle = '#5a4434';
  g.fillRect(x - 0.02, -1.72, 0.04, 0.82);
  g.fillRect(x - 0.36, -1.33, 0.72, 0.04);
  e.light(x, -1.3, 0.45, '#ffc070', 0.7, n);
}
