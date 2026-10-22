// Mappe, the cat: big, grey, wild, sitting on the porch's landing side-on, facing the sea, his tail round to the front
// (the layer `tail` stirs now and then, by animate). Metres from where he sits; about 0.38 m tall.
g.fillStyle = '#6f7274';
g.beginPath();
g.ellipse(0, -0.14, 0.13, 0.16, 0.15, 0, 6.2832);
g.fill();
g.beginPath();
g.ellipse(0.09, -0.3, 0.085, 0.075, 0, 0, 6.2832);
g.fill();
g.beginPath();
g.moveTo(0.05, -0.36);
g.lineTo(0.07, -0.43);
g.lineTo(0.11, -0.37);
g.closePath();
g.moveTo(0.12, -0.36);
g.lineTo(0.15, -0.42);
g.lineTo(0.17, -0.34);
g.closePath();
g.fill();
g.fillStyle = '#5f6264';
g.fillRect(0.04, -0.07, 0.035, 0.08);
g.fillRect(0.09, -0.07, 0.035, 0.08);
g.fillStyle = '#c9c07a';
g.beginPath();
g.arc(0.15, -0.31, 0.012, 0, 6.2832);
g.fill();
e.layer('tail', { pivot: [-0.1, -0.02] }, c => {
  c.strokeStyle = '#6a6d6f';
  c.lineCap = 'round';
  c.lineWidth = 0.05;
  c.beginPath();
  c.moveTo(-0.1, -0.02);
  c.quadraticCurveTo(-0.22, 0.0, -0.2, -0.12);
  c.stroke();
});
e.at(0.09, -0.3, 'cat');
