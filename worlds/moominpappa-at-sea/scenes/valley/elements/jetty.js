// The jetty from above (4.6 m out from the beach by 1.1): grey weathered boards across it, their gaps, a coil of rope.
g.fillStyle = '#a49b8a';
g.fillRect(-2.3, -0.55, 4.6, 1.1);
for (let x = -2.3; x < 2.3; x += 0.15) {
  g.fillStyle = `rgba(${e.rnd() < 0.5 ? '120, 112, 98' : '196, 188, 170'}, ${0.2 + 0.2 * e.rnd()})`;
  g.fillRect(x, -0.55, 0.15, 1.1);
  g.fillStyle = 'rgba(50, 44, 38, 0.6)';
  g.fillRect(x + 0.14, -0.55, 0.012, 1.1);
}
g.strokeStyle = '#b39c74';
g.lineWidth = 0.03;
for (let r = 0.05; r < 0.2; r += 0.035) {
  g.beginPath();
  g.arc(-1.7, 0.25, r, 0, Math.PI * 2);
  g.stroke();
}
