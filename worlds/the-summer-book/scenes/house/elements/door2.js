// The second door, the creaking one, from the room into the entry: an old board door painted a faded grey-blue,
// ledged and braced, a black iron latch and its handle. Painted from its hinge (x 0…0.85, the leaf to its right as
// seen from the room), 2.0 m tall; it opens outward, into the entry (`creak`).
g.fillStyle = '#8c9aa2';
g.fillRect(0, -2.0, 0.85, 2.0);
g.strokeStyle = 'rgba(70,80,88,0.45)';
g.lineWidth = 0.008;
for (let x = 0.14; x < 0.85; x += 0.14) {
  g.beginPath();
  g.moveTo(x, -2.0);
  g.lineTo(x, 0);
  g.stroke();
}
// the ledges and the brace
g.fillStyle = '#95a3aa';
g.fillRect(0.04, -1.78, 0.77, 0.1);
g.fillRect(0.04, -0.3, 0.77, 0.1);
g.save();
g.translate(0.08, -0.25);
g.rotate(-Math.atan2(1.43, 0.69));
g.fillRect(0, -0.05, Math.hypot(1.43, 0.69), 0.1);
g.restore();
// worn paler round the latch where hands go
g.fillStyle = 'rgba(200,206,206,0.35)';
g.beginPath();
g.ellipse(0.74, -1.0, 0.08, 0.16, 0, 0, 6.2832);
g.fill();
// the latch: its bar, the handle
g.fillStyle = '#2f2f31';
g.fillRect(0.55, -1.06, 0.26, 0.022);
g.fillRect(0.76, -1.08, 0.03, 0.06);
g.beginPath();
g.ellipse(0.72, -0.95, 0.018, 0.07, 0, 0, 6.2832);
g.fill();
e.at(0.72, -0.98, 'handle');
