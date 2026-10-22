// A tuft of thin grass in a crack of the rock, dry at the tips (the layer `blades` bends in the wind). Metres from its
// foot; about 0.4 m tall.
e.layer('blades', { pivot: [0, 0], wind: { strength: 0.5, gust: 0.5 } }, c => {
  c.lineCap = 'round';
  for (let i = 0; i < 14; i++) {
    const x = (e.rnd() - 0.5) * 0.18;
    const top = 0.22 + 0.2 * e.rnd();
    const lean = (e.rnd() - 0.4) * 0.22;
    c.strokeStyle = i % 3 === 0 ? '#b6ad8a' : i % 3 === 1 ? '#8c9670' : '#7a8562';
    c.lineWidth = 0.012;
    c.beginPath();
    c.moveTo(x, 0.02);
    c.quadraticCurveTo(x + lean * 0.3, -top * 0.6, x + lean, -top);
    c.stroke();
  }
});
