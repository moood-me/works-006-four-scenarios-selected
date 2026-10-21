// What the well's elements share: a fir painted flat, in the world's plain style — a short trunk and tiers of
// branches, each tier a wide low triangle with a ragged hem, a darker underside; in metres, its foot at the origin,
// `h` tall. `seed` makes each kind its own (how many tiers, how ragged, how it leans)
function fir(g, h, seed, colors) {
  const hash = (n, s) => anim.hash(n, seed * 31 + s);
  const tiers = 8 + Math.floor(4 * hash(0, 1));
  g.fillStyle = colors.trunk;
  g.fillRect(-0.016 * h, -0.2 * h, 0.032 * h, 0.2 * h);
  for (let i = 0; i < tiers; i++) {
    const u = i / tiers;
    const top = -h * (0.16 + 0.84 * (i + 1) / tiers) - 0.06 * h;
    const foot = -h * (0.1 + 0.84 * u);
    const half = h * (0.22 * (1 - u) + 0.03) * (0.85 + 0.3 * hash(i, 2));
    const lean = h * 0.03 * (hash(i, 3) - 0.5);
    g.fillStyle = colors.under;
    g.beginPath();
    g.moveTo(lean, top);
    g.lineTo(half + lean, foot);
    g.lineTo(-half + lean, foot);
    g.closePath();
    g.fill();
    // the tier's lit top and its ragged hem: teeth along the foot
    g.fillStyle = colors.body;
    g.beginPath();
    g.moveTo(lean, top);
    g.lineTo(half + lean, foot - 0.02 * h);
    const teeth = 5 + Math.floor(4 * hash(i, 4));
    for (let k = teeth; k >= 0; k--) {
      const x = -half + (2 * half * k) / teeth + lean;
      g.lineTo(x, foot - 0.02 * h - (k % 2 ? 0.045 * h * (0.5 + hash(i * 9 + k, 5)) : 0));
    }
    g.lineTo(-half + lean, foot - 0.02 * h);
    g.closePath();
    g.fill();
  }
}
return { fir };
