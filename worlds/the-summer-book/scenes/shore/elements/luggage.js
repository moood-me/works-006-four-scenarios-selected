// The things carried down to the pier on the last morning (`luggage`): a canvas kitbag tied at the neck, a lidded
// wicker basket, a battered brown suitcase, the plaid rolled and strapped, a box of books. Metres from the middle of
// their foot; about 1.6 m along.
if (!e.state.luggage) return;
// the suitcase lying flat, the box on it
g.fillStyle = '#7a5a40';
g.fillRect(-0.85, -0.22, 0.7, 0.22);
g.fillStyle = '#5f4632';
g.fillRect(-0.85, -0.13, 0.7, 0.025);
g.fillStyle = '#c4b49a';
g.fillRect(-0.75, -0.48, 0.45, 0.26);
// the kitbag
g.fillStyle = '#a49c86';
g.beginPath();
g.moveTo(-0.1, 0);
g.bezierCurveTo(-0.18, -0.35, -0.1, -0.62, 0.02, -0.66);
g.lineTo(0.12, -0.66);
g.bezierCurveTo(0.26, -0.6, 0.32, -0.35, 0.26, 0);
g.closePath();
g.fill();
g.strokeStyle = '#6f6a5c';
g.lineWidth = 0.02;
g.beginPath();
g.moveTo(0.0, -0.6);
g.lineTo(0.15, -0.6);
g.stroke();
// the lidded basket
g.fillStyle = '#b38f5c';
g.fillRect(0.38, -0.34, 0.5, 0.34);
g.fillStyle = '#9c7a4a';
g.fillRect(0.36, -0.4, 0.54, 0.07);
g.strokeStyle = 'rgba(110,80,40,0.6)';
g.lineWidth = 0.012;
for (let y = -0.3; y < 0; y += 0.06) {
  g.beginPath();
  g.moveTo(0.38, y);
  g.lineTo(0.88, y);
  g.stroke();
}
// the plaid rolled and strapped
g.fillStyle = '#8c4d3e';
g.beginPath();
g.ellipse(0.75, -0.55, 0.22, 0.12, 0, 0, 6.2832);
g.fill();
g.fillStyle = '#4a3a30';
g.fillRect(0.66, -0.67, 0.035, 0.24);
g.fillRect(0.82, -0.67, 0.035, 0.24);
e.at(0.6, -0.4, 'basket');
