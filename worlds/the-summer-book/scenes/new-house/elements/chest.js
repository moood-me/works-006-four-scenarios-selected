// The chest of drawers against the right wall, its front to the room: a new white carcase, its plinth, three openings
// where its drawers sit (the dark wood inside shows as a drawer comes out; the drawers themselves are `drawer<k>_…`).
// The card faces left, its own x running back toward the start (x = 15.2 − distance). Metres from the front's middle
// at the floor, 0.9 m high. The point `drawers`: the middle drawer, where Sophia's hands go.
const C = e.lib.CHEST;
g.fillStyle = '#f2f1ec';
g.fillRect(-0.6, -C.top, 1.2, C.top);
g.fillStyle = '#d8d6cf';
g.fillRect(-0.6, -0.05, 1.2, 0.05);
g.fillStyle = '#6f665b';
for (const f of C.feet) g.fillRect(-0.56, -(f + 0.25), 1.12, 0.25);
g.fillStyle = 'rgba(40,34,28,0.35)';
for (const f of C.feet) g.fillRect(-0.56, -(f + 0.25), 1.12, 0.05);
e.at(0, -(C.feet[1] + 0.13), 'drawers');
