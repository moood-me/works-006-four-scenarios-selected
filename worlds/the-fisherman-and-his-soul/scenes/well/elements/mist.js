// A low mist among the firs at the far side of the glade: soft long banks lying on the ground, drifting slowly to the
// right, painted round the layer's box so that its ends meet
e.layer('banks', { box: [-40, -3, 40, 0.5], drift: [0.18, 0] }, g => {
  for (let i = 0; i < 10; i++) {
    const x = -40 + 80 * e.anim.hash(i, 1);
    const y = -0.4 - 0.9 * e.anim.hash(i, 2);
    const w = 6 + 9 * e.anim.hash(i, 3);
    const h = 0.6 + 0.6 * e.anim.hash(i, 4);
    for (const dx of [-80, 0, 80]) {
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
