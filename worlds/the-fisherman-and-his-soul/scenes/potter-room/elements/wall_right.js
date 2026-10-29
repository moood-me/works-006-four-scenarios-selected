// The right wall (facing the room; x from the back, 5.1 m ahead, toward the front): its plaster (lib.wall), the doorway
// to the lane (x 3.0…3.9 — 2.1…1.2 m ahead, 1.95 high) left unpainted, its frame round it
e.lib.wall(g, 17, 0, 4.6, -2.5);
g.save();
g.globalCompositeOperation = 'destination-out';
g.fillRect(3.0, -1.95, 0.9, 1.97);
g.restore();
g.fillStyle = '#4a3828';
g.fillRect(2.94, -2.01, 1.02, 0.07);
g.fillRect(2.94, -1.95, 0.06, 1.95);
g.fillRect(3.9, -1.95, 0.06, 1.95);
