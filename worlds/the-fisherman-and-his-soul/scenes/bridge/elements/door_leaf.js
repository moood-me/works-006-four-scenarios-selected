// The potter's door: a leaf of boards hinged on the near side of his doorway (as cottage's front, x toward the viewer:
// painted from the hinge, x −1.0 … 0), turned into the room by `door` (its place's key door_turn: 270 shut, 350 open);
// shut, it covers the lit room. Metres, its foot at the origin
g.fillStyle = '#6b513d';
g.fillRect(-1.0, -1.97, 1.0, 1.97);
g.fillStyle = 'rgba(40, 30, 24, 0.5)';
for (const x of [-0.75, -0.5, -0.25]) g.fillRect(x, -1.97, 0.02, 1.97);
g.fillRect(-1.0, -1.62, 1.0, 0.05);
g.fillRect(-1.0, -0.46, 1.0, 0.05);
g.fillStyle = '#2a2420';
g.fillRect(-0.88, -1.02, 0.07, 0.05);
