// The old armchair by the window, turned a little toward the room: a wing chair in faded grey-green, worn at the arms,
// a crocheted cloth on its back, a check wool plaid folded over its left arm, short dark wooden feet. Seen from the
// front a little from its right. Metres from the middle of its front at the floor; 1.05 m to the top of its back.
// The point `seat`: where one sits.
g.fillStyle = '#4a3f34';
for (const x of [-0.34, 0.3]) g.fillRect(x, -0.1, 0.05, 0.12);
// the back and its wings
g.fillStyle = '#8a958a';
g.beginPath();
g.moveTo(-0.3, -0.45);
g.lineTo(-0.32, -0.95);
g.bezierCurveTo(-0.3, -1.06, 0.26, -1.06, 0.3, -0.95);
g.lineTo(0.3, -0.45);
g.closePath();
g.fill();
g.fillStyle = '#7d887d';
for (const s of [-1, 1]) {
  g.beginPath();
  g.moveTo(s * 0.3, -0.95);
  g.bezierCurveTo(s * 0.42, -0.92, s * 0.42, -0.75, s * 0.4, -0.62);
  g.lineTo(s * 0.36, -0.45);
  g.lineTo(s * 0.3, -0.45);
  g.closePath();
  g.fill();
}
// the cloth on its back
g.fillStyle = '#efece3';
g.beginPath();
g.moveTo(-0.16, -0.98);
g.lineTo(0.16, -0.98);
g.lineTo(0.13, -0.8);
g.lineTo(0, -0.76);
g.lineTo(-0.13, -0.8);
g.closePath();
g.fill();
// the seat's cushion
g.fillStyle = '#95a095';
g.beginPath();
g.moveTo(-0.32, -0.42);
g.lineTo(0.32, -0.42);
g.lineTo(0.34, -0.33);
g.lineTo(-0.34, -0.33);
g.closePath();
g.fill();
// the arms
g.fillStyle = '#7f8a7f';
g.fillRect(-0.42, -0.6, 0.12, 0.5);
g.fillRect(0.3, -0.6, 0.12, 0.5);
g.fillStyle = '#9aa496';
g.beginPath();
g.ellipse(-0.36, -0.6, 0.07, 0.035, 0, 0, 6.2832);
g.ellipse(0.36, -0.6, 0.07, 0.035, 0, 0, 6.2832);
g.fill();
// the front under the seat
g.fillStyle = '#76817a';
g.fillRect(-0.32, -0.33, 0.64, 0.24);
// the plaid over its left arm: red and grey check
g.save();
g.beginPath();
g.moveTo(-0.46, -0.66);
g.lineTo(-0.27, -0.66);
g.lineTo(-0.25, -0.2);
g.lineTo(-0.47, -0.22);
g.closePath();
g.clip();
g.fillStyle = '#9b6a5e';
g.fillRect(-0.5, -0.7, 0.3, 0.55);
g.fillStyle = 'rgba(200,196,186,0.7)';
for (let y = -0.66; y < -0.2; y += 0.08) g.fillRect(-0.5, y, 0.3, 0.02);
for (let x = -0.46; x < -0.24; x += 0.07) g.fillRect(x, -0.7, 0.015, 0.55);
g.restore();
e.at(0, -0.45, 'seat');
