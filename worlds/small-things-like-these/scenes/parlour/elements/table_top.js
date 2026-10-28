// The tea table's top from above (0.77 m up; x across, y toward the viewer — the world's (across, distance) is
// (0.55 + x, 3.2 − y)): the round white cloth, its lace border; on it, flat, a plate of biscuits before the teapot and —
// when `envelope` says so — the Mother's envelope with a Christmas card in it, laid between the lamp and the teapot
// (world (0.52, 2.95)), the card's robin and holly showing at its open flap.
g.fillStyle = "#f3efe5";
g.beginPath();
g.arc(0, 0, 0.468, 0, 6.3);
g.fill();
g.strokeStyle = "rgba(170, 160, 140, 0.6)";
g.lineWidth = 0.008;
g.beginPath();
g.arc(0, 0, 0.42, 0, 6.3);
g.stroke();
g.fillStyle = "rgba(170, 160, 140, 0.45)";
for (let i = 0; i < 48; i++) {
  const a = (i / 48) * Math.PI * 2;
  g.beginPath();
  g.arc(Math.cos(a) * 0.445, Math.sin(a) * 0.445, 0.01, 0, 6.3);
  g.fill();
}
// the plate of biscuits
g.fillStyle = "#f8f6f0";
g.beginPath();
g.arc(0.22, 0.02, 0.085, 0, 6.3);
g.fill();
g.strokeStyle = "#c4a256";
g.lineWidth = 0.006;
g.beginPath();
g.arc(0.22, 0.02, 0.075, 0, 6.3);
g.stroke();
g.fillStyle = "#cf9e5c";
for (const [x, y] of [[0.19, 0.0], [0.24, 0.04], [0.23, -0.02]]) {
  g.beginPath();
  g.arc(x, y, 0.025, 0, 6.3);
  g.fill();
}
if (e.state.envelope) {
  g.save();
  g.translate(-0.03, 0.25);
  g.rotate(-0.25);
  // the card's top at the open flap: red, holly leaves, a berry
  g.fillStyle = "#c33a32";
  g.fillRect(-0.1, -0.09, 0.19, 0.07);
  g.fillStyle = "#2f6a3e";
  for (const [x, y] of [[-0.06, -0.06], [-0.03, -0.075], [0.0, -0.06]]) {
    g.beginPath();
    g.ellipse(x, y, 0.018, 0.009, 0.6, 0, 6.3);
    g.fill();
  }
  g.fillStyle = "#b02a2a";
  g.beginPath();
  g.arc(-0.03, -0.062, 0.007, 0, 6.3);
  g.fill();
  // the envelope over it, its flap's fold
  g.fillStyle = "#fbfaf6";
  g.fillRect(-0.12, -0.06, 0.24, 0.13);
  g.fillStyle = "#e6e2d8";
  g.beginPath();
  g.moveTo(-0.12, -0.06);
  g.lineTo(0, 0.0);
  g.lineTo(0.12, -0.06);
  g.closePath();
  g.fill();
  g.restore();
}
