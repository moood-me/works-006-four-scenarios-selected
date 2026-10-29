// A school of small silver fish 13 m out, 2–4 m over the sand: two loose shoals — one layer going right, one going
// left, higher and slower —, each drifting through its box and round again (its ends meet: fish near an end are
// painted at the other end too)
const W = 36;
const shoal = (name, n, dir, y0, seed, speed) => {
  // its own box only the band it swims in (0.8 m over and under its middle)
  e.layer(name, { box: [-W / 2, y0 - 0.85, W / 2, y0 + 0.85], drift: [dir * speed, 0] }, g => {
    for (let i = 0; i < n; i++) {
      const group = i % 2 ? -6 : 7;
      const x = group + 7 * (e.anim.hash(i, seed) - 0.5) * (1 + e.anim.hash(i, seed + 1));
      const y = y0 + 1.4 * (e.anim.hash(i, seed + 2) - 0.5);
      const len = 0.16 + 0.08 * e.anim.hash(i, seed + 3);
      for (const dx of [0, -W, W]) {
        if (Math.abs(x + dx) < W / 2 + 0.3) e.lib.fish(g, x + dx, y, len, dir, '#9fb4bf', '#e6eef0');
      }
    }
  });
};
shoal('right', 46, 1, -2.2, 1, 0.55);
shoal('left', 24, -1, -3.6, 11, 0.35);
