// The ceiling (3.3 m up), seen from above as planes are painted (y toward the viewer; its centre 3.2 m ahead): white
// plaster between three dark beams running across the room
g.fillStyle = '#ece8de';
g.fillRect(-3.2, -2.8, 6.4, 5.6);
g.fillStyle = '#5a4636';
for (const d of [1.7, 3.3, 4.9]) g.fillRect(-3.2, 3.2 - d - 0.1, 6.4, 0.2);
