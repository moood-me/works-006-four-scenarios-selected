// The veranda's glazing: a row of tall windows in white frames, each of six small panes; the glass itself is clear
// (nothing painted: the morning beyond). Its rectangle is where the sun and the sky come in (lights "sun", "sky_in").
// Metres from the veranda's far corner at the sill, running toward the viewer (x −6.4…0), 1.45 m tall.
g.fillStyle = '#efede7';
g.fillRect(-6.4, -1.45, 6.4, 0.07);
g.fillRect(-6.4, -0.06, 6.4, 0.06);
const BAY = 6.4 / 6;
for (let i = 0; i <= 6; i++) g.fillRect(-i * BAY - 0.04, -1.45, 0.08, 1.45);
for (let i = 0; i < 6; i++) {
  const x0 = -(i + 1) * BAY;
  g.fillRect(x0 + BAY / 2 - 0.0125, -1.45, 0.025, 1.45);
  for (const y of [-0.98, -0.51]) g.fillRect(x0, y - 0.0125, BAY, 0.025);
}
e.at(-1.6, -0.75, 'window');
