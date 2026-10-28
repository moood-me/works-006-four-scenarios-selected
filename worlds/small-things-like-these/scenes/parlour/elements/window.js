// The window onto the yard (the opening x −0.45…0.45, 0.8…2.7 m up): a tall sash window, its casing and bars painted
// white, three panes over three; heavy old-gold brocade curtains drawn back to either side on a brass pole, held by
// tie-backs (the glass is `window_glass`; the yard beyond, through it).
const frame = new Path2D();
frame.rect(-0.52, -2.78, 1.04, 2.04);
frame.rect(-0.45, -2.7, 0.9, 1.9);
g.fillStyle = "#e9e4d6";
g.fill(frame, "evenodd");
// the bars: the meeting rail, the upright, the glazing bars
g.fillStyle = "#e3ddcd";
g.fillRect(-0.45, -1.78, 0.9, 0.05);
g.fillRect(-0.015, -2.7, 0.03, 1.9);
for (const y of [-2.24, -1.28]) g.fillRect(-0.45, y - 0.011, 0.9, 0.022);
// the pole and its finials
g.fillStyle = "#b89448";
g.fillRect(-0.66, -2.88, 1.32, 0.025);
for (const x of [-0.66, 0.66]) {
  g.beginPath();
  g.arc(x, -2.868, 0.025, 0, 6.3);
  g.fill();
}
// the curtains: drawn back, gathered at the tie-back, falling to the sill's height; their folds
for (const s of [-1, 1]) {
  const c = new Path2D();
  c.moveTo(s * 0.66, -2.86);
  c.lineTo(s * 0.4, -2.86);
  c.quadraticCurveTo(s * 0.4, -1.9, s * 0.5, -1.45);
  c.quadraticCurveTo(s * 0.42, -1.0, s * 0.36, -0.7);
  c.lineTo(s * 0.68, -0.7);
  c.quadraticCurveTo(s * 0.62, -1.1, s * 0.6, -1.45);
  c.quadraticCurveTo(s * 0.62, -2.2, s * 0.66, -2.86);
  c.closePath();
  g.fillStyle = "#a5824f";
  g.fill(c);
  g.save();
  g.clip(c);
  g.fillStyle = "rgba(80, 56, 30, 0.28)";
  for (let k = 0; k < 6; k++) g.fillRect(s * (0.42 + k * 0.045), -2.86, 0.014, 2.2);
  g.fillStyle = "rgba(255, 238, 200, 0.14)";
  for (let k = 0; k < 6; k++) g.fillRect(s * (0.44 + k * 0.045), -2.86, 0.01, 2.2);
  g.restore();
  // the tie-back
  g.fillStyle = "#7a5a2e";
  g.fillRect(Math.min(s * 0.5, s * 0.62), -1.48, 0.12, 0.05);
}
