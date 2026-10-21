// A tuft of tall grass at the edge of the glade (about 0.8 m): dark blades, a few seed heads, bending in the wind
e.layer('tuft', { pivot: [0, 0], wind: { strength: 0.4, gust: 0.5 } }, g => {
  for (let i = 0; i < 18; i++) {
    const x = -0.3 + 0.6 * e.anim.hash(i, 1);
    const h = 0.45 + 0.4 * e.anim.hash(i, 2);
    const lean = (e.anim.hash(i, 3) - 0.5) * 0.5;
    g.strokeStyle = e.anim.hash(i, 4) > 0.5 ? '#3f4c32' : '#4c5a3a';
    g.lineWidth = 0.012 + 0.01 * e.anim.hash(i, 5);
    g.beginPath();
    g.moveTo(x, 0);
    g.quadraticCurveTo(x + lean * 0.2, -h * 0.6, x + lean, -h);
    g.stroke();
    if (i % 4 === 0) {
      g.fillStyle = '#6a6448';
      g.beginPath();
      g.ellipse(x + lean, -h, 0.012, 0.04, lean, 0, Math.PI * 2);
      g.fill();
    }
  }
});
