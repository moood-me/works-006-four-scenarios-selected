// A low mist lying on the river: soft long banks over the water, drifting slowly to the right, painted round the
// layer's box so that its ends meet
e.layer('banks', { box: [-20, -2.5, 20, 0.5], drift: [0.15, 0] }, g => {
  for (let i = 0; i < 10; i++) {
    const x = -20 + 40 * e.anim.hash(i, 1);
    const y = -0.3 - 0.6 * e.anim.hash(i, 2);
    const w = 4 + 6 * e.anim.hash(i, 3);
    const h = 0.4 + 0.4 * e.anim.hash(i, 4);
    for (const dx of [-40, 0, 40]) {
      const grad = g.createRadialGradient(x + dx, y, 0, x + dx, y, w);
      grad.addColorStop(0, `rgba(196, 208, 228, ${(0.22 + 0.16 * e.anim.hash(i, 5)).toFixed(3)})`);
      grad.addColorStop(1, 'rgba(196, 208, 228, 0)');
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
