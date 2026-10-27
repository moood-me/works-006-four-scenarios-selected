// A wooded islet far out: a granite shoulder and on it a dark crowd of wind-bent spruce and pine, flat-topped, leaning
// away from the open sea. Metres from its foot at the waterline; 90 m long, about 14 m high.
g.fillStyle = '#8a8784';
g.beginPath();
g.moveTo(-45, 0.6);
g.bezierCurveTo(-36, -3, -20, -5, 0, -5.4);
g.bezierCurveTo(20, -5.2, 34, -3, 45, 0.6);
g.closePath();
g.fill();
g.fillStyle = '#596360';
g.beginPath();
g.moveTo(-34, -3.4);
for (let i = 0; i <= 28; i++) {
  const x = -34 + (68 * i) / 28;
  const top = -5 - 9 * Math.sin((Math.PI * i) / 28) * (0.75 + 0.25 * e.rnd());
  g.lineTo(x - 0.8, top + 1.5);
  g.lineTo(x + 0.6, top);
}
g.lineTo(34, -3.4);
g.closePath();
g.fill();
g.fillStyle = '#6f6c6a';
g.fillRect(-45, 0, 90, 0.6);
