// The left side's two windows (the veranda's and the room's): new white frames round big clear panes, a transom near
// the top. The card faces into the house, its own x running away from the start (x = distance − 12.8): the veranda's
// window x −3.3…−2.3, the room's −1.3…0.1. Metres from the wall's middle at the sill (0.7 m over the floor), 1.4 m high.
g.fillStyle = '#f7f6f2';
const T = 0.06;
for (const [a, b] of [[-3.3, -2.3], [-1.3, 0.1]]) {
  g.fillRect(a, -1.4, b - a, T);
  g.fillRect(a, -T, b - a, T);
  g.fillRect(a, -1.4, T, 1.4);
  g.fillRect(b - T, -1.4, T, 1.4);
  g.fillRect(a, -1.08, b - a, 0.04);
}
