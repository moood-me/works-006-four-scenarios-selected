// His net hauled over the boat's bow into the water (П.2–П.3): from the stem's rail a few dripping ropes of it slanting
// down to the water off the bow, a band of its mesh lying on the water there — round her shoulders while she is in it
// (`mermaid_at` net), a row of cork floats along its edge. Metres from where it meets the water before her (the card's
// foot); only while `net` is over
if (!e.state.boat || e.state.net !== 'over') return;
g.strokeStyle = 'rgba(120, 96, 70, 0.9)';
g.lineWidth = 0.012;
for (let i = 0; i < 4; i++) {
  g.beginPath();
  g.moveTo(-0.44 + 0.02 * i, -0.6 + 0.03 * i);
  g.quadraticCurveTo(-0.2 + 0.05 * i, -0.3, -0.05 + 0.12 * i, 0);
  g.stroke();
}
// the mesh on the water: diamonds across a low band
g.strokeStyle = 'rgba(132, 106, 80, 0.85)';
g.lineWidth = 0.008;
for (let x = -0.5; x <= 0.5; x += 0.06) {
  g.beginPath();
  g.moveTo(x, -0.06);
  g.lineTo(x + 0.06, 0.02);
  g.moveTo(x + 0.06, -0.06);
  g.lineTo(x, 0.02);
  g.stroke();
}
g.fillStyle = '#d8c79a';
for (let i = 0; i < 7; i++) {
  g.beginPath();
  g.ellipse(-0.45 + 0.15 * i, -0.06, 0.03, 0.018, 0, 0, Math.PI * 2);
  g.fill();
}
