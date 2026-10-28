// The land from above (its centre 20 m right, 110 m ahead; x across, y toward the viewer — a point at `across`,
// `distance` is at x = across − 20, y = 110 − distance): our bank to the right of the quay's edge (across −1.6) —
// trodden earth by the river, the town's hill beyond with its grass, gardens and the street climbing it; the river's
// bed under the water; the far bank on the left, dark meadow and scrub
const X = a => a - 20;
const Y = d => 110 - d;
// the far bank and the bed
g.fillStyle = '#34432f';
g.fillRect(-100, -120, 200, 240);
g.fillStyle = '#3b3a33';
g.fillRect(X(-24.5), -120, 23, 240);
// our bank
g.fillStyle = '#5a5244';
g.fillRect(X(-1.6), -120, 100, 240);
// grass and gardens up the hill: soft patches
for (let i = 0; i < 260; i++) {
  const x = X(4 + 90 * e.anim.hash(i, 1));
  const y = Y(26 + 150 * e.anim.hash(i, 2));
  const r = 2 + 6 * e.anim.hash(i, 3);
  g.fillStyle = e.anim.hash(i, 4) > 0.5 ? 'rgba(60, 78, 52, 0.7)' : 'rgba(78, 92, 60, 0.6)';
  g.beginPath();
  g.ellipse(x, y, r * 1.6, r, 0, 0, Math.PI * 2);
  g.fill();
}
// the far bank: darker scrub in patches
for (let i = 0; i < 220; i++) {
  const x = X(-26 - 70 * e.anim.hash(i, 5));
  const y = Y(-5 + 230 * e.anim.hash(i, 6));
  const r = 1.5 + 5 * e.anim.hash(i, 7);
  g.fillStyle = e.anim.hash(i, 8) > 0.5 ? 'rgba(36, 50, 38, 0.7)' : 'rgba(58, 70, 48, 0.5)';
  g.beginPath();
  g.ellipse(x, y, r * 1.5, r, 0, 0, Math.PI * 2);
  g.fill();
}
// the street from the bridge's head climbing the hill to the right, paved
g.fillStyle = '#7a6f5f';
g.beginPath();
g.moveTo(X(-1.6), Y(10));
g.lineTo(X(-1.6), Y(14.4));
g.quadraticCurveTo(X(12), Y(26), X(30), Y(70));
g.lineTo(X(38), Y(140));
g.lineTo(X(42), Y(140));
g.lineTo(X(35), Y(68));
g.quadraticCurveTo(X(16), Y(20), X(3), Y(10));
g.closePath();
g.fill();
