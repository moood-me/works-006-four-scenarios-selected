// The right side's two windows (the veranda's and the room's), as the left side's. The card faces into the house, its
// own x running back toward the start (x = 12.8 − distance): the veranda's window x 2.3…3.3, the room's −0.2…1.2.
// Metres from the wall's middle at the sill (0.7 m over the floor), 1.4 m high.
g.fillStyle = '#f7f6f2';
const T = 0.06;
for (const [a, b] of [[2.3, 3.3], [-0.2, 1.2]]) {
  g.fillRect(a, -1.4, b - a, T);
  g.fillRect(a, -T, b - a, T);
  g.fillRect(a, -1.4, T, 1.4);
  g.fillRect(b - T, -1.4, T, 1.4);
  g.fillRect(a, -1.08, b - a, 0.04);
}
