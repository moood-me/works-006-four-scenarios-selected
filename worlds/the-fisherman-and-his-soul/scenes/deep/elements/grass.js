// A tuft of sea grass on the sand (about 0.5 m): narrow ribbons, green and yellow-green, swaying in the current
e.layer('tuft', { pivot: [0, 0], wind: { strength: 0.4, gust: 0.3, scale: 1.5 } }, g => {
  for (let i = 0; i < 16; i++) {
    const x = -0.22 + 0.44 * e.anim.hash(i, 1);
    const h = 0.3 + 0.3 * e.anim.hash(i, 2);
    const lean = (e.anim.hash(i, 3) - 0.5) * 0.35;
    g.strokeStyle = e.anim.hash(i, 4) > 0.5 ? '#5f8a4a' : '#86a050';
    g.lineWidth = 0.018 + 0.012 * e.anim.hash(i, 5);
    g.beginPath();
    g.moveTo(x, 0);
    g.quadraticCurveTo(x + lean * 0.3, -h * 0.6, x + lean, -h);
    g.stroke();
  }
});
