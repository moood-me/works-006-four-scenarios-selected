// A tuft of sea-grass by the door outside (about 0.6 m): pale stiff blades bending in the wind off the sea
e.layer('tuft', { pivot: [0, 0], wind: { strength: 0.45, gust: 0.5 } }, g => {
  for (let i = 0; i < 16; i++) {
    const x = -0.25 + 0.5 * e.anim.hash(i, 1);
    const h = 0.35 + 0.35 * e.anim.hash(i, 2);
    const lean = (e.anim.hash(i, 3) - 0.5) * 0.4;
    g.strokeStyle = e.anim.hash(i, 4) > 0.5 ? '#6e7552' : '#848a62';
    g.lineWidth = 0.012 + 0.008 * e.anim.hash(i, 5);
    g.beginPath();
    g.moveTo(x, 0);
    g.quadraticCurveTo(x + lean * 0.2, -h * 0.6, x + lean, -h);
    g.stroke();
  }
});
