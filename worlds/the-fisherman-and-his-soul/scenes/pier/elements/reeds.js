// A clump of reeds out of the shallow water: stems from the floor (its foot, 0) up some 2.3 m, a couple of brown
// cattails, two long leaves bending over — a layer that bends in the wind from its foot
e.layer('clump', { pivot: [0, 0], wind: { strength: 0.35, gust: 0.4 } }, g => {
  for (let i = 0; i < 14; i++) {
    const x = -0.35 + 0.7 * anim.hash(i, 1);
    const h = 1.6 + 0.75 * anim.hash(i, 2);
    const lean = (anim.hash(i, 3) - 0.5) * 0.5;
    g.strokeStyle = anim.hash(i, 4) > 0.5 ? '#5d6a45' : '#4c5a3c';
    g.lineWidth = 0.02 + 0.015 * anim.hash(i, 5);
    g.beginPath();
    g.moveTo(x, 0);
    g.quadraticCurveTo(x + lean * 0.3, -h * 0.6, x + lean, -h);
    g.stroke();
    if (i % 5 === 1) {
      g.fillStyle = '#5b4232';
      g.beginPath();
      g.ellipse(x + lean * 0.93, -h * 0.9, 0.025, 0.09, lean * 0.3, 0, Math.PI * 2);
      g.fill();
    }
  }
  g.fillStyle = '#56643f';
  for (const s of [-1, 1]) {
    g.beginPath();
    g.moveTo(0.02 * s, 0);
    g.quadraticCurveTo(0.1 * s, -1.2, 0.5 * s, -1.6);
    g.quadraticCurveTo(0.12 * s, -1.15, -0.02 * s, 0);
    g.closePath();
    g.fill();
  }
});
