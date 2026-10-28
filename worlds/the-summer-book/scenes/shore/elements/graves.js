// The graves (`graves` 0…5): a strip of coarse sand between two grey stones above the water, and in it a row of little
// pits filled in, each with a shell on it and a bird whittled from a chip stuck upright at its head — as many as the
// key says. Metres from the middle of its foot; 1.8 m along. Point: `pit` — where the next one is dug (after the last).
const n = Math.max(0, Math.min(5, Math.round(e.state.graves ?? 0)));
// the stones either side and the sand between
g.fillStyle = '#8f8882';
g.beginPath();
g.ellipse(-0.95, -0.14, 0.24, 0.16, 0, 0, 6.2832);
g.fill();
g.beginPath();
g.ellipse(0.98, -0.18, 0.3, 0.2, 0.2, 0, 6.2832);
g.fill();
g.fillStyle = '#c8bca4';
g.beginPath();
g.ellipse(0, -0.02, 0.85, 0.07, 0, 0, 6.2832);
g.fill();
const X = k => -0.6 + k * 0.3;
for (let k = 0; k < n; k++) {
  const x = X(k);
  // the filled pit, darker sand
  g.fillStyle = '#ab9f88';
  g.beginPath();
  g.ellipse(x, -0.03, 0.11, 0.035, 0, 0, 6.2832);
  g.fill();
  // the shell
  g.fillStyle = k % 2 ? '#efe6dc' : '#e8d4c4';
  g.beginPath();
  g.moveTo(x - 0.05, -0.05);
  g.quadraticCurveTo(x, -0.11, x + 0.05, -0.05);
  g.closePath();
  g.fill();
  // the wooden bird on its stick
  g.fillStyle = '#c9b48e';
  g.fillRect(x + 0.07, -0.2, 0.012, 0.17);
  g.beginPath();
  g.ellipse(x + 0.08, -0.22, 0.05, 0.022, -0.2, 0, 6.2832);
  g.fill();
  g.beginPath();
  g.moveTo(x + 0.12, -0.23);
  g.lineTo(x + 0.15, -0.22);
  g.lineTo(x + 0.12, -0.21);
  g.fill();
}
e.at(X(Math.min(n, 4)), -0.04, 'pit');
