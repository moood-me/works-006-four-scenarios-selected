// A clump of tall weed from the sand (its foot, 0) up some 3.5–4.6 m: a few stems, long ribbon leaves along them, olive
// and golden-brown, a float at a leaf's root here and there — a layer that sways in the current from its foot (the
// scene's wind is the current); thin, so the light from above comes through it
e.layer('clump', { pivot: [0, 0], wind: { strength: 0.3, gust: 0.25, scale: 2 } }, g => {
  const h = (i, s) => e.anim.hash(i, s);
  for (let i = 0; i < 5; i++) {
    const x0 = -0.2 + 0.4 * h(i, 1);
    const top = 3.4 + 1.2 * h(i, 2);
    const lean = (h(i, 3) - 0.5) * 0.9;
    const at = t => [x0 + lean * t * t + 0.12 * Math.sin(t * 5 + i), -top * t];
    g.strokeStyle = '#6b6a3a';
    g.lineWidth = 0.035;
    g.beginPath();
    for (let k = 0; k <= 12; k++) g.lineTo(...at(k / 12));
    g.stroke();
    for (let k = 1; k < 9; k++) {
      const t = k / 9 + 0.04 * h(i * 9 + k, 4);
      const [x, y] = at(t);
      const side = k % 2 ? 1 : -1;
      const len = 0.45 + 0.4 * h(i * 9 + k, 5);
      const wide = 0.06 + 0.05 * h(i * 9 + k, 6);
      g.fillStyle = h(i * 9 + k, 7) > 0.45 ? '#8a8a3c' : '#a8913e';
      g.beginPath();
      g.moveTo(x, y);
      g.bezierCurveTo(x + side * len * 0.4, y - wide * 2, x + side * len * 0.8, y - 0.1 - wide, x + side * len, y - 0.28);
      g.bezierCurveTo(x + side * len * 0.75, y - 0.08, x + side * len * 0.35, y + wide, x, y);
      g.closePath();
      g.fill();
      if (k % 3 === 0) {
        g.fillStyle = '#b9a050';
        g.beginPath();
        g.ellipse(x + side * 0.05, y - 0.02, 0.035, 0.05, 0, 0, Math.PI * 2);
        g.fill();
      }
    }
  }
});
