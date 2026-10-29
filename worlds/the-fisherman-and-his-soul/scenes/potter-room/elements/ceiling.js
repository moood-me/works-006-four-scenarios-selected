// The low ceiling from below (its centre 2.8 m ahead; y toward the viewer): smoky boards between three dark beams
// running across the room
g.fillStyle = '#5a4634';
g.fillRect(-2.7, -2.3, 5.4, 4.6);
g.fillStyle = 'rgba(30, 22, 16, 0.4)';
for (let x = -2.7; x < 2.7; x += 0.3) g.fillRect(x, -2.3, 0.015, 4.6);
g.fillStyle = '#3a2c20';
for (const y of [-1.5, 0, 1.5]) g.fillRect(-2.7, y - 0.09, 5.4, 0.18);
