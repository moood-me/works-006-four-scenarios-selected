// The four big windows over the sea: new white frames round tall panes, a slim transom high in each (their glass is
// `glass_sea`). The card faces into the room (x as the world's). Metres from the middle of the gable at the sill (0.35 m
// over the floor), 1.9 m high. Its rectangle is where the day comes into the room (light `sea_in`).
g.fillStyle = '#f7f6f2';
const T = 0.07;
for (const [a, b] of [[-2.55, -1.5], [-1.2, -0.15], [0.15, 1.2], [1.5, 2.55]]) {
  g.fillRect(a, -1.9, b - a, T);
  g.fillRect(a, -T, b - a, T);
  g.fillRect(a, -1.9, T, 1.9);
  g.fillRect(b - T, -1.9, T, 1.9);
  g.fillRect(a, -1.5, b - a, 0.035);
}
