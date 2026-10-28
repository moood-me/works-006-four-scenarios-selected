// The wide owners' bed from above, its head to the left wall: made and never slept in — two big white pillows side by
// side at the head, a new pale grey woven bedspread drawn smooth over it all, a darker band along its edge, folded
// back a hand's width under the pillows. Metres from its middle (x as the world's: the head at −0.99, the foot at
// 0.99; y toward the start, the bed 1.7 m wide). The point `seat`: the foot's edge, where Grandmother sits.
g.fillStyle = '#cfd1cf';
g.fillRect(-0.99, -0.85, 1.98, 1.7);
g.strokeStyle = 'rgba(160,164,164,0.4)';
g.lineWidth = 0.01;
g.beginPath();
for (let y = -0.8; y < 0.85; y += 0.05) {
  g.moveTo(-0.6, y);
  g.lineTo(0.99, y);
}
g.stroke();
g.fillStyle = '#a9b0b3';
g.fillRect(-0.6, -0.85, 1.59, 0.07);
g.fillRect(-0.6, 0.78, 1.59, 0.07);
g.fillRect(0.92, -0.85, 0.07, 1.7);
// the turned-back sheet and the pillows
g.fillStyle = '#f5f4f0';
g.fillRect(-0.99, -0.85, 0.42, 1.7);
g.fillStyle = '#fbfaf7';
for (const y of [-0.42, 0.42]) {
  g.beginPath();
  g.ellipse(-0.76, y, 0.2, 0.36, 0, 0, 6.2832);
  g.fill();
}
g.strokeStyle = 'rgba(190,188,180,0.55)';
g.lineWidth = 0.008;
for (const y of [-0.42, 0.42]) {
  g.beginPath();
  g.ellipse(-0.76, y, 0.15, 0.3, 0, 0, 6.2832);
  g.stroke();
}
e.at(0.92, 0, 'seat');
