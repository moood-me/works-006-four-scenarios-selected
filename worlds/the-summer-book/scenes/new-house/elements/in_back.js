// The sea gable from inside the room: the new white panels and skirting, the four big windows cut out (sill 0.35 m,
// head 2.25 m over the floor). Metres from the wall's middle at the floor (x as the world's).
g.fillStyle = '#ecebe5';
g.fillRect(-2.9, -2.62, 5.8, 2.64);
g.fillStyle = '#d9c7a6';
g.fillRect(-2.9, -0.1, 5.8, 0.1);
g.globalCompositeOperation = 'destination-out';
for (const [a, b] of [[-2.55, -1.5], [-1.2, -0.15], [0.15, 1.2], [1.5, 2.55]]) g.fillRect(a, -2.25, b - a, 1.9);
g.globalCompositeOperation = 'source-over';
