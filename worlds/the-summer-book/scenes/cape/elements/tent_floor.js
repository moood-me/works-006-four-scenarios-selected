// The tent's floor: Sophia's grey blanket spread on a groundsheet, a pillow at the back. Seen from above, metres from
// its middle, y toward the door.
if (!e.lib.tentShown(e.state, 'up')) return;
g.fillStyle = '#8d8a80';
g.fillRect(-0.75, -0.92, 1.5, 1.84);
g.fillStyle = '#9fa3a6';
g.fillRect(-0.55, -0.8, 1.1, 1.5);
g.strokeStyle = 'rgba(70,74,80,0.5)';
g.lineWidth = 0.03;
g.strokeRect(-0.5, -0.75, 1.0, 1.4);
g.fillStyle = '#e9e4da';
g.beginPath();
g.ellipse(0, -0.62, 0.3, 0.14, 0, 0, 6.2832);
g.fill();
