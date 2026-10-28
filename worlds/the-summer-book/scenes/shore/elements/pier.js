// The pier: grey weathered boards laid across it, gaps between them, a few darker, two long stringers showing at the
// ends. Seen from above, metres from its middle: 10 m long along x, 1.3 m wide.
g.fillStyle = '#5f5a54';
g.fillRect(-5, -0.65, 10, 1.3);
for (let x = -5; x < 5; x += 0.19) {
  const v = e.rnd();
  g.fillStyle = v < 0.15 ? '#8a847c' : v < 0.7 ? '#a49d93' : '#b2aba1';
  g.fillRect(x + 0.015, -0.65, 0.16, 1.3);
}
g.fillStyle = 'rgba(70,66,62,0.6)';
for (let x = -4.8; x < 5; x += 1.25) {
  g.beginPath();
  g.arc(x, -0.5, 0.025, 0, 6.2832);
  g.arc(x, 0.5, 0.025, 0, 6.2832);
  g.fill();
}
e.at(4.6, 0, 'end');
