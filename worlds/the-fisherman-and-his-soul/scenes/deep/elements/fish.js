// A few bigger fish nearer, 6.5 m out, 1–2.5 m over the sand, going slowly left behind the two of them: silver-blue,
// a yellow fin-tint — one layer drifting through its wide box and round again
const W = 24;
e.layer('few', { box: [-W / 2, -2.8, W / 2, 0.2], drift: [-0.3, 0] }, g => {
  for (const [x, y, len] of [[-3, -1.6, 0.36], [-2.2, -2.2, 0.3], [6, -1.1, 0.4]]) {
    for (const dx of [0, -W, W]) {
      if (Math.abs(x + dx) < W / 2 + 0.3) e.lib.fish(g, x + dx, y, len, -1, '#7d97a6', '#f0e6b8');
    }
  }
});
