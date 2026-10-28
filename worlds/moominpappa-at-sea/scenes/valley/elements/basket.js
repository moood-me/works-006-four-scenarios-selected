// Mama's basket packed, seen from above (an insert, `basket`, in an oval): its wicker rim on the veranda's boards and in
// it what she has put in so far (`packed`: the hat, the notebook, the sweater, the jar — in that order) — Papa's top
// hat and his notebook, Moomintroll's striped sweater and, under its edge, the jar of
// jam nobody asked about; the candles lying across it while they are packed (`candles` "basket"); the box of paints on
// top when she took them (`paints`, and `packed` 5). Warm evening light painted from the upper left, as an insert's light is.
const A = e.aspect, X = A / 2, Y = 0.52, st = e.state, pk = st.packed ?? 5;
// the boards
g.fillStyle = '#a58d6c';
g.fillRect(-0.4, -0.05, A + 0.8, 1.1);
for (let x = -0.4; x < A + 0.4; x += 0.14) {
  g.fillStyle = `rgba(${e.rnd() < 0.5 ? '110, 90, 66' : '200, 184, 156'}, ${0.2 + 0.2 * e.rnd()})`;
  g.fillRect(x, -0.05, 0.14, 1.1);
  g.fillStyle = 'rgba(60, 46, 32, 0.6)';
  g.fillRect(x + 0.136, -0.05, 0.004, 1.1);
}
const shade = (draw, dx, dy) => {
  g.save();
  g.translate(dx ?? 0.018, dy ?? 0.022);
  g.fillStyle = 'rgba(40, 26, 14, 0.3)';
  draw(true);
  g.restore();
  draw(false);
};
// the basket: its shadow, the wicker rim and sides, the dark inside
g.fillStyle = 'rgba(40, 26, 14, 0.35)';
g.beginPath();
g.ellipse(X + 0.03, Y + 0.04, 0.56, 0.4, 0, 0, Math.PI * 2);
g.fill();
g.fillStyle = '#b8935a';
g.beginPath();
g.ellipse(X, Y, 0.55, 0.39, 0, 0, Math.PI * 2);
g.fill();
g.strokeStyle = 'rgba(110, 78, 40, 0.7)';
g.lineWidth = 0.006;
for (let a = 0; a < Math.PI * 2; a += 0.06) {
  g.beginPath();
  g.moveTo(X + Math.cos(a) * 0.47, Y + Math.sin(a) * 0.32);
  g.lineTo(X + Math.cos(a + 0.03) * 0.55, Y + Math.sin(a + 0.03) * 0.39);
  g.stroke();
}
g.fillStyle = '#5a4128';
g.beginPath();
g.ellipse(X, Y + 0.01, 0.47, 0.32, 0, 0, Math.PI * 2);
g.fill();
// the jar of jam, its lid peeping out from under the sweater (in fourth)
if (pk >= 4) shade(s => {
  g.fillStyle = s ? g.fillStyle : '#d6e0e0';
  g.beginPath();
  g.arc(X + 0.17, Y + 0.17, 0.075, 0, Math.PI * 2);
  g.fill();
  if (!s) {
    g.fillStyle = '#f2ead8';
    g.beginPath();
    g.arc(X + 0.17, Y + 0.17, 0.062, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = '#9a7a52';
    g.lineWidth = 0.006;
    g.stroke();
    g.fillStyle = '#a3242a';
    g.beginPath();
    g.arc(X + 0.17, Y + 0.17, 0.03, 0, Math.PI * 2);
    g.fill();
  }
});
// the sweater, folded: blue-grey knit with cream stripes (third)
if (pk >= 3) shade(s => {
  g.save();
  g.translate(X - 0.07, Y + 0.05);
  g.rotate(-0.12);
  if (!s) g.fillStyle = '#6f88a4';
  g.beginPath();
  g.moveTo(-0.26, -0.15);
  g.quadraticCurveTo(0, -0.18, 0.24, -0.14);
  g.quadraticCurveTo(0.28, 0, 0.23, 0.15);
  g.quadraticCurveTo(0, 0.19, -0.25, 0.15);
  g.quadraticCurveTo(-0.29, 0, -0.26, -0.15);
  g.fill();
  if (!s) {
    g.fillStyle = '#ece4cf';
    for (const y of [-0.08, 0.0, 0.08]) g.fillRect(-0.25, y - 0.012, 0.49, 0.024);
    g.strokeStyle = 'rgba(40, 56, 80, 0.35)';
    g.lineWidth = 0.004;
    for (let x = -0.24; x < 0.24; x += 0.02) {
      g.beginPath();
      g.moveTo(x, -0.15);
      g.lineTo(x, 0.15);
      g.stroke();
    }
  }
  g.restore();
});
// Papa's notebook (second)
if (pk >= 2) shade(s => {
  g.save();
  g.translate(X - 0.27, Y - 0.15);
  g.rotate(0.25);
  if (!s) g.fillStyle = '#4f6a4a';
  g.fillRect(-0.09, -0.12, 0.18, 0.24);
  if (!s) {
    g.fillStyle = '#e9e0c8';
    g.fillRect(-0.05, -0.06, 0.1, 0.04);
    g.fillStyle = '#c8b484';
    g.fillRect(0.075, -0.12, 0.015, 0.24);
  }
  g.restore();
});
// Papa's top hat, upside down: the brim's ring, the crown's inside (first)
if (pk >= 1) shade(s => {
  if (!s) g.fillStyle = '#232124';
  g.beginPath();
  g.ellipse(X + 0.24, Y - 0.1, 0.16, 0.13, 0.2, 0, Math.PI * 2);
  g.fill();
  if (!s) {
    g.fillStyle = '#3a3438';
    g.beginPath();
    g.ellipse(X + 0.24, Y - 0.1, 0.1, 0.085, 0.2, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = '#7a3036';
    g.beginPath();
    g.ellipse(X + 0.24, Y - 0.1, 0.075, 0.062, 0.2, 0, Math.PI * 2);
    g.fill();
  }
}, 0.03, 0.035);
// the candles, lying across, while they are packed
if ((st.candles ?? 'shelf') === 'basket') {
  shade(s => {
    g.save();
    g.translate(X - 0.02, Y - 0.2);
    g.rotate(-0.08);
    for (const dy of [-0.024, 0, 0.024]) {
      if (!s) g.fillStyle = '#f6f1e2';
      g.fillRect(-0.2, dy - 0.01, 0.4, 0.02);
    }
    if (!s) {
      g.fillStyle = '#3a3030';
      for (const dy of [-0.024, 0, 0.024]) g.fillRect(0.2, dy - 0.002, 0.02, 0.004);
    }
    g.restore();
  });
}
// the box of paints on top, open: its pans of colour
if (st.paints && pk >= 5) {
  shade(s => {
    g.save();
    g.translate(X + 0.04, Y + 0.08);
    g.rotate(0.1);
    if (!s) g.fillStyle = '#1f3c6a';
    g.fillRect(-0.15, -0.07, 0.3, 0.14);
    if (!s) {
      g.fillStyle = '#e8e4da';
      g.fillRect(-0.14, -0.06, 0.28, 0.12);
      const colours = ['#c8382c', '#e89a2a', '#f0d040', '#5a9a44', '#2f6aa8', '#7a4a9a', '#8a5a3a', '#2a2a2a'];
      colours.forEach((col, i) => {
        g.fillStyle = col;
        g.fillRect(-0.13 + (i % 4) * 0.068, -0.05 + Math.floor(i / 4) * 0.055, 0.05, 0.042);
      });
    }
    g.restore();
  });
}
// the evening light: warm from the upper left, the oval's edges dimmer
const light = g.createRadialGradient(X - 0.35, Y - 0.35, 0.05, X, Y, 0.8);
light.addColorStop(0, 'rgba(255, 220, 160, 0.18)');
light.addColorStop(0.6, 'rgba(255, 200, 140, 0.04)');
light.addColorStop(1, 'rgba(60, 36, 18, 0.35)');
g.fillStyle = light;
g.fillRect(-0.4, -0.05, A + 0.8, 1.1);
