// The night table's top from above: painted wood, a white crocheted mat in the middle. Metres from its middle.
g.fillStyle = '#d9d2c2';
g.fillRect(-0.2, -0.18, 0.4, 0.36);
g.fillStyle = '#f3f1ea';
g.beginPath();
g.arc(0, 0, 0.12, 0, 6.2832);
g.fill();
g.strokeStyle = 'rgba(190,184,170,0.8)';
g.lineWidth = 0.004;
for (const r of [0.05, 0.08, 0.11]) {
  g.beginPath();
  g.arc(0, 0, r, 0, 6.2832);
  g.stroke();
}
