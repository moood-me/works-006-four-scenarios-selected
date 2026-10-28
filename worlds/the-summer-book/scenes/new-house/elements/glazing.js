// The veranda's glazing in the land gable: new white frames round big clear panes (nothing painted in the glass — the
// veranda dark behind it at night), a transom across each near its top; the left-hand pair's outer leaf is `sash`, the
// one that opens, so here only its jambs and the frame round it. It faces into the veranda, so its own x runs the other
// way to the world's (x = −across). Metres from the middle of the gable at the sill (0.5 m over the floor), 1.5 m high.
// Its rectangle is where the day comes into the veranda (light `ver_in`).
g.fillStyle = '#f7f6f2';
const T = 0.06;
const frame = (a, b) => {
  g.fillRect(a, -1.5, b - a, T);
  g.fillRect(a, -T, b - a, T);
  g.fillRect(a, -1.5, T, 1.5);
  g.fillRect(b - T, -1.5, T, 1.5);
  g.fillRect(a, -1.12, b - a, 0.04);
};
// (world x → its own: the right-hand pair is on its left)
frame(-2.7, -1.65);
frame(-1.65, -0.6);
frame(0.6, 1.65);
// round the leaf that opens (world x −2.7…−1.65, its own 1.65…2.7): only the frame of the opening
g.fillRect(1.65, -1.5, 1.05, 0.03);
g.fillRect(1.65, -0.03, 1.05, 0.03);
g.fillRect(2.67, -1.5, 0.03, 1.5);
