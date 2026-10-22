// A juniper on the rock: a low dense mound, dark blue-green, ragged at the edge (the layer `bush` stirs in the wind).
// Metres from its foot; about 0.9 m tall, 1.6 m wide.
e.layer('bush', { pivot: [0, 0], wind: { strength: 0.05, gust: 0.3 } }, c => {
  c.fillStyle = '#46564e';
  c.beginPath();
  c.moveTo(-0.85, 0.05);
  for (let i = 0; i <= 16; i++) {
    const a = Math.PI - (Math.PI * i) / 16;
    const r = 0.8 + 0.12 * e.rnd();
    c.lineTo(Math.cos(a) * r, -Math.sin(a) * r * 1.05);
  }
  c.lineTo(0.85, 0.05);
  c.closePath();
  c.fill();
  for (let i = 0; i < 18; i++) {
    const a = Math.PI * e.rnd();
    const r = 0.75 * e.rnd();
    c.fillStyle = e.rnd() < 0.5 ? '#56675d' : '#3c4b44';
    c.beginPath();
    c.ellipse(Math.cos(a) * r, -Math.sin(a) * r, 0.18, 0.12, 0, 0, 6.2832);
    c.fill();
  }
});
