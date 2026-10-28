// The veranda's floor from above: wide boards painted a soft grey, worn paler where feet go (from the door to the
// table, along the glazing), a long striped rag rug before the door to the room. Metres from its middle, x along the
// back wall, y toward the viewer (its far edge, y -3.2, is the back wall; its left edge, x -3.2, the glazing).
g.fillStyle = '#8f8a80';
g.fillRect(-3.2, -3.2, 6.4, 6.4);
const tones = ['#aaa497', '#a49e91', '#b0aa9d', '#a8a194'];
const W = 0.16;
for (let i = 0, x = -3.2; x < 3.2; x += W, i++) {
  g.fillStyle = tones[i % 4];
  g.fillRect(x + 0.007, -3.2, W - 0.014, 6.4);
}
// worn paler where feet go
g.fillStyle = 'rgba(196,190,176,0.35)';
g.beginPath();
g.ellipse(-1.6, -2.0, 1.1, 0.8, 0.5, 0, 6.2832);
g.fill();
g.beginPath();
g.ellipse(-2.4, -1.4, 0.5, 1.1, 0, 0, 6.2832);
g.fill();
// the rag rug before the door: long, striped across in faded colours
const RUG = ['#8ea0ab', '#d8d0bf', '#b88c7c', '#d8d0bf', '#7f8f82', '#c9bfa8'];
for (let k = 0, y = -3.05; y < -1.55; y += 0.075, k++) {
  g.fillStyle = RUG[k % RUG.length];
  g.fillRect(-1.95, y, 0.95, 0.075);
}
g.strokeStyle = 'rgba(120,110,96,0.5)';
g.lineWidth = 0.012;
g.strokeRect(-1.95, -3.05, 0.95, 1.5);
