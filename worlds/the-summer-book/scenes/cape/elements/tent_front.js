// The tent's front: a small A-tent of pale canvas, its door flaps tied back on either side, the opening dark-warm
// inside (the tent's inside — tent_back, the floor, the lantern — is seen through it: the opening is cut out). The
// canvas is thin (translucent): the lantern's candle inside makes it glow. Metres from the middle of its foot; 1.6 m
// wide, 1.15 m to the ridge.
g.fillStyle = '#e6dfcf';
g.beginPath();
g.moveTo(-0.8, 0.02);
g.lineTo(0, -1.15);
g.lineTo(0.8, 0.02);
g.closePath();
g.fill();
// seams from the ridge
g.strokeStyle = 'rgba(150,140,120,0.5)';
g.lineWidth = 0.012;
g.beginPath();
g.moveTo(0, -1.15);
g.lineTo(-0.5, 0.02);
g.moveTo(0, -1.15);
g.lineTo(0.5, 0.02);
g.stroke();
// the opening
g.globalCompositeOperation = 'destination-out';
g.beginPath();
g.moveTo(-0.34, 0.03);
g.lineTo(0, -0.9);
g.lineTo(0.34, 0.03);
g.closePath();
g.fill();
g.globalCompositeOperation = 'source-over';
// the flaps tied back: folded canvas at either side of the opening, a darker underside, the ties
for (const s of [-1, 1]) {
  g.fillStyle = '#d6cdb9';
  g.beginPath();
  g.moveTo(s * 0.34, 0.02);
  g.lineTo(s * 0.12, -0.62);
  g.lineTo(s * 0.52, 0.02);
  g.closePath();
  g.fill();
  g.fillStyle = '#c3b9a4';
  g.beginPath();
  g.moveTo(s * 0.34, 0.02);
  g.lineTo(s * 0.2, -0.4);
  g.lineTo(s * 0.4, 0.02);
  g.closePath();
  g.fill();
  g.strokeStyle = '#8a7a62';
  g.lineWidth = 0.015;
  g.beginPath();
  g.moveTo(s * 0.22, -0.4);
  g.lineTo(s * 0.36, -0.42);
  g.stroke();
}
// the front pole and its peg, the guy rope's knot at the ridge
g.fillStyle = '#8b7558';
g.fillRect(-0.015, -1.17, 0.03, 0.06);
g.fillStyle = '#7a6a55';
g.beginPath();
g.arc(0, -1.15, 0.025, 0, 6.2832);
g.fill();
e.at(0, -0.45, 'door');
