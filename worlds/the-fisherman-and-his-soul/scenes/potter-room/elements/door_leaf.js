// The door to the lane: a leaf of boards hinged on the far side of the doorway (painted from its hinge, x 0 … 0.9 toward
// the front), turned into the room by `door` (its place's key door_turn: 270 shut, 355 open). Metres, its foot at the
// origin
g.fillStyle = '#6b513d';
g.fillRect(0, -1.94, 0.9, 1.94);
g.fillStyle = 'rgba(40, 30, 24, 0.5)';
for (const x of [0.22, 0.45, 0.68]) g.fillRect(x, -1.94, 0.02, 1.94);
g.fillRect(0, -1.6, 0.9, 0.05);
g.fillRect(0, -0.42, 0.9, 0.05);
g.fillStyle = '#2a2420';
g.fillRect(0.76, -1.02, 0.07, 0.05);
