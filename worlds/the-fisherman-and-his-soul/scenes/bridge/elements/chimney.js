// The potter's chimney over the ridge: a stack of old brick (its foot inside the house, 0; its top at 4.75 m), a
// cap of flat stone; the smoke rising from it is the scene's particles
g.fillStyle = '#8a5f4c';
g.fillRect(-0.24, -4.7, 0.48, 4.7);
g.fillStyle = 'rgba(50, 36, 30, 0.35)';
for (let i = 0; i < 12; i++) g.fillRect(-0.24, -4.7 + 0.12 * i, 0.48, 0.015);
g.fillStyle = '#9c917f';
g.fillRect(-0.3, -4.78, 0.6, 0.08);
