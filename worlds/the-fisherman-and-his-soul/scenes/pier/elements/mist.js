// A low mist lying on the water far out, under the far shore: soft long banks drifting slowly to the right, painted
// round the layer's box so that its ends meet
e.layer('banks', { box: [-90, -7, 90, 1], drift: [0.35, 0] }, g => {
  for (let i = 0; i < 14; i++) {
    const x = -90 + 180 * e.anim.hash(i, 1);
    const y = -1.2 - 2.2 * e.anim.hash(i, 2);
    const w = 14 + 22 * e.anim.hash(i, 3);
    const h = 1.2 + 1.6 * e.anim.hash(i, 4);
    for (const dx of [-180, 0, 180]) {
      const grad = g.createRadialGradient(x + dx, y, 0, x + dx, y, w);
      grad.addColorStop(0, `rgba(200, 212, 230, ${(0.28 + 0.2 * e.anim.hash(i, 5)).toFixed(3)})`);
      grad.addColorStop(1, 'rgba(200, 212, 230, 0)');
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
