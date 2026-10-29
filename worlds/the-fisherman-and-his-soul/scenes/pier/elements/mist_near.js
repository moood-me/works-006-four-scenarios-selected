// Mist over the water near the pier (the dawn's, the morning's: `mist`): soft long banks lying low on the water, drifting
// slowly, painted round the layer's box so that its ends meet; shown by `mist` (its animate)
e.layer('banks', { box: [-40, -4, 40, 0.5], drift: [0.25, 0] }, g => {
  for (let i = 0; i < 12; i++) {
    const x = -40 + 80 * e.anim.hash(i, 1);
    const y = -0.6 - 1.8 * e.anim.hash(i, 2);
    const w = 6 + 9 * e.anim.hash(i, 3);
    const h = 0.8 + 1.0 * e.anim.hash(i, 4);
    for (const dx of [-80, 0, 80]) {
      const grad = g.createRadialGradient(x + dx, y, 0, x + dx, y, w);
      grad.addColorStop(0, 'rgba(214, 222, 234, ' + (0.4 + 0.2 * e.anim.hash(i, 5)).toFixed(3) + ')');
      grad.addColorStop(1, 'rgba(214, 222, 234, 0)');
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
