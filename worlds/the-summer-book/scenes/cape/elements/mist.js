// The fog's first breath over the water: low white banks drifting in from the sea, in two layers going slowly opposite
// ways (wrapping round their boxes: the banks are kept within them); `fog` (animate) says how thick. Metres from its
// foot on the water; 400 m long.
const bank = (c, n, y0, thick, color, alpha) => {
  for (let i = 0; i < n; i++) {
    const len = 18 + 50 * e.rnd();
    const x = -200 + len + (400 - 2 * len) * e.rnd();
    const y = y0 - thick * e.rnd();
    e.lib.glow(c, x, y, len, thick * (0.6 + 0.6 * e.rnd()), color, alpha);
  }
};
e.layer('far', { drift: [0.6, 0], box: [-200, -10, 200, 1] }, c => bank(c, 14, -1.5, 3.5, '#eef0f2', 0.6));
e.layer('near', { drift: [-0.4, 0], box: [-200, -10, 200, 1] }, c => bank(c, 10, -0.6, 2.2, '#f3f3f4', 0.5));
