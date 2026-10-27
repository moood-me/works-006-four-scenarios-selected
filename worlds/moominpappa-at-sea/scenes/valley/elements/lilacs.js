// A lilac bush by the house, long past flowering: a dense heap of heart-shaped dark-green leaves on many thin stems (a
// layer the wind stirs). Copies about the house.
g.strokeStyle = '#5a4c3c';
g.lineWidth = 0.035;
for (let i = 0; i < 7; i++) {
  g.beginPath();
  g.moveTo((i - 3) * 0.06, 0);
  g.quadraticCurveTo((i - 3) * 0.2, -0.8, (i - 3) * 0.32, -1.4);
  g.stroke();
}
e.layer('leaves', { pivot: [0, -0.4], wind: { strength: 0.15, gust: 0.5, scale: 4 } }, c => {
  for (let i = 0; i < 300; i++) {
    const a = e.rnd() * Math.PI, q = Math.sqrt(e.rnd()), x = -Math.cos(a) * q * 1.25, y = -0.35 - Math.sin(a) * q * 1.6;
    const k = e.rnd();
    c.fillStyle = y < -1.3 ? (k < 0.5 ? '#5f8446' : '#6f9452') : k < 0.5 ? '#3f6232' : '#4d703a';
    c.beginPath();
    c.ellipse(x, y, 0.1, 0.075, e.rnd() * 3, 0, Math.PI * 2);
    c.fill();
  }
});
