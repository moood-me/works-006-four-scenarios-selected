// A few long thin clouds across the middle of the sky, drifting very slowly to the right; painted wrapping round the
// layer's box so that its ends meet
const W = e.aspect + 0.6;
e.layer('streaks', { box: [-0.3, 0.06, e.aspect + 0.3, 0.44], drift: [0.0025, 0] }, g => {
  for (let i = 0; i < 9; i++) {
    const x = -0.3 + W * anim.hash(i, 1);
    const y = 0.12 + 0.28 * anim.hash(i, 2);
    const w = 0.18 + 0.35 * anim.hash(i, 3);
    const h = 0.006 + 0.012 * anim.hash(i, 4);
    for (const dx of [-W, 0, W]) {
      const grad = g.createRadialGradient(x + dx, y, 0, x + dx, y, w);
      grad.addColorStop(0, `rgba(122, 142, 186, ${(0.22 + 0.15 * anim.hash(i, 5)).toFixed(3)})`);
      grad.addColorStop(1, 'rgba(122, 142, 186, 0)');
      g.save();
      g.translate(x + dx, y);
      g.scale(1, h / w);
      g.translate(-(x + dx), -y);
      g.fillStyle = grad;
      g.fillRect(x + dx - w, y - w, 2 * w, 2 * w);
      g.restore();
    }
  }
});
