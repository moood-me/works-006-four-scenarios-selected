// A peony bush by the porch: a round mass of deep green leaves and big loose flowers, white flushed with pink (the
// layer `bush` sways a little in the wind). Metres from its foot; about 0.85 m tall.
e.layer('bush', { pivot: [0, 0], wind: { strength: 0.1, gust: 0.4 } }, c => {
  for (let i = 0; i < 26; i++) {
    const a = Math.PI * e.rnd();
    const r = 0.5 * Math.sqrt(e.rnd());
    c.fillStyle = e.rnd() < 0.5 ? '#4f6a4c' : '#5f7a57';
    c.beginPath();
    c.ellipse(Math.cos(a) * r * 1.2, -0.08 - Math.sin(a) * r * 1.2, 0.17, 0.09, a, 0, 6.2832);
    c.fill();
  }
  for (let i = 0; i < 9; i++) {
    const x = (e.rnd() - 0.5) * 0.9;
    const y = -0.35 - 0.4 * e.rnd();
    const r = 0.07 + 0.04 * e.rnd();
    c.fillStyle = i % 3 === 0 ? '#e7a9b0' : '#f3e2df';
    c.beginPath();
    c.arc(x, y, r, 0, 6.2832);
    c.fill();
    c.fillStyle = i % 3 === 0 ? '#d4878f' : '#eac3c2';
    c.beginPath();
    c.arc(x + r * 0.15, y + r * 0.1, r * 0.5, 0, 6.2832);
    c.fill();
  }
});
