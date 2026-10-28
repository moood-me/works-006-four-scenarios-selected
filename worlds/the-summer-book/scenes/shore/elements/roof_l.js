// A slope of the roof: dark grey roofing felt in strips, a little weathered. Seen from above, metres from its middle.
g.fillStyle = '#545a60';
g.fillRect(-6, -6, 12, 12);
g.strokeStyle = 'rgba(40,44,48,0.5)';
g.lineWidth = 0.03;
for (let x = -6; x < 6; x += 0.9) {
  g.beginPath();
  g.moveTo(x, -6);
  g.lineTo(x, 6);
  g.stroke();
}
for (let i = 0; i < 30; i++) {
  g.fillStyle = e.rnd() < 0.5 ? 'rgba(120,124,126,0.18)' : 'rgba(30,34,38,0.15)';
  g.beginPath();
  g.ellipse(-5 + 10 * e.rnd(), -5 + 10 * e.rnd(), 0.3 + 0.8 * e.rnd(), 0.2 + 0.4 * e.rnd(), 0, 0, 6.2832);
  g.fill();
}
