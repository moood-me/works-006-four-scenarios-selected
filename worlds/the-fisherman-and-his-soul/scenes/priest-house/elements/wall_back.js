// The back wall, seen straight on (x across from the start's line; the wall 6 m ahead, the ceiling at 3.3 m): white
// limewash, the blue-grey band at its foot, and the doorway (x −0.1…1.0, 2.25 m high) cut through it — left unpainted:
// the night is seen through it; its sides and head are `jamb_l`, `jamb_r`, `soffit`
g.save();
g.beginPath();
g.rect(-3.25, -3.3, 6.5, 3.32);
g.rect(-0.1, -2.25, 1.1, 2.27);
g.clip('evenodd');
e.lib.wall(g, 11, -3.25, 3.25, -3.3);
// a thin shade round the doorway's edge, where the plaster turns into it
g.strokeStyle = 'rgba(150, 140, 124, 0.5)';
g.lineWidth = 0.03;
g.strokeRect(-0.1, -2.25, 1.1, 2.3);
g.restore();
