// A tuft of tall late-summer grass near the eye, a few seed heads and a yarrow among it (a layer the wind bends).
// Copies along the foreground.
e.layer('blades', { pivot: [0, 0], wind: { strength: 0.5, gust: 0.6, scale: 3 } }, c => {
  c.lineCap = 'round';
  for (let i = 0; i < 26; i++) {
    const x0 = (e.rnd() - 0.5) * 0.3, h = 0.3 + 0.45 * e.rnd(), lean = (e.rnd() - 0.5) * 0.35, k = e.rnd();
    c.strokeStyle = k < 0.35 ? '#c2b06a' : k < 0.7 ? '#7f9c52' : '#9aae5c';
    c.lineWidth = 0.012 + 0.008 * e.rnd();
    c.beginPath();
    c.moveTo(x0, 0);
    c.quadraticCurveTo(x0 + lean * 0.3, -h * 0.6, x0 + lean, -h);
    c.stroke();
    if (e.rnd() < 0.25) {
      c.fillStyle = '#d8c58a';
      c.beginPath();
      c.ellipse(x0 + lean, -h - 0.03, 0.012, 0.04, lean, 0, Math.PI * 2);
      c.fill();
    }
  }
  c.fillStyle = '#f2ede0';
  for (let i = 0; i < 9; i++) {
    c.beginPath();
    c.arc(0.06 + (e.rnd() - 0.5) * 0.06, -0.52 + (e.rnd() - 0.5) * 0.04, 0.013, 0, Math.PI * 2);
    c.fill();
  }
});
