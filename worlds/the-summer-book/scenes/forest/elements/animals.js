// The wooden animals in the moss by the stump, carved by Grandmother through the summers: a horse, a bird, a dog, a cow
// — and the seal, made this June (the fifth). As many as `animals` says (between steps, or once as the seal is laid
// there). Pale wood, a little silvered. Side-on, metres from the middle of their foot; 1.2 m along the moss.
const n = e.state.animals ?? 0;
const WOOD = '#c9b48e';
const fig = (k, draw) => {
  if (k < n) draw();
};
g.fillStyle = WOOD;
// a horse
fig(0, () => {
  g.beginPath();
  g.ellipse(-0.5, -0.1, 0.07, 0.035, 0, 0, 6.2832);
  g.fill();
  g.fillRect(-0.56, -0.08, 0.015, 0.08);
  g.fillRect(-0.45, -0.08, 0.015, 0.08);
  g.beginPath();
  g.moveTo(-0.44, -0.12);
  g.lineTo(-0.4, -0.18);
  g.lineTo(-0.37, -0.16);
  g.lineTo(-0.42, -0.1);
  g.closePath();
  g.fill();
});
// a bird
fig(1, () => {
  g.beginPath();
  g.ellipse(-0.25, -0.035, 0.04, 0.025, -0.2, 0, 6.2832);
  g.fill();
  g.beginPath();
  g.arc(-0.21, -0.065, 0.016, 0, 6.2832);
  g.fill();
});
// a dog
fig(2, () => {
  g.beginPath();
  g.ellipse(-0.02, -0.07, 0.055, 0.03, 0, 0, 6.2832);
  g.fill();
  g.fillRect(-0.06, -0.05, 0.012, 0.05);
  g.fillRect(0.02, -0.05, 0.012, 0.05);
  g.beginPath();
  g.arc(0.05, -0.1, 0.022, 0, 6.2832);
  g.fill();
});
// a cow
fig(3, () => {
  g.beginPath();
  g.ellipse(0.25, -0.08, 0.07, 0.04, 0, 0, 6.2832);
  g.fill();
  g.fillRect(0.2, -0.06, 0.015, 0.06);
  g.fillRect(0.29, -0.06, 0.015, 0.06);
  g.beginPath();
  g.ellipse(0.33, -0.1, 0.03, 0.022, 0.3, 0, 6.2832);
  g.fill();
});
// the seal: lying, its head up, the newest, whitest wood
fig(4, () => {
  g.fillStyle = '#ddcba6';
  g.beginPath();
  g.moveTo(0.42, -0.005);
  g.quadraticCurveTo(0.48, -0.06, 0.56, -0.09);
  g.quadraticCurveTo(0.6, -0.1, 0.6, -0.07);
  g.quadraticCurveTo(0.56, -0.03, 0.52, -0.005);
  g.closePath();
  g.fill();
  g.beginPath();
  g.moveTo(0.42, -0.005);
  g.lineTo(0.38, -0.03);
  g.lineTo(0.39, 0.0);
  g.closePath();
  g.fill();
});
e.at(0.5, -0.06, 'seal');
e.at(0, -0.06, 'animals');
