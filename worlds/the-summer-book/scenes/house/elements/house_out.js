// The house's front beyond the veranda's glazing: the outside of the room's near wall, wide clapboards painted a
// weathered grey, a white corner board, its foot on the rock 0.3 m under the floor. Metres from the veranda's far
// corner (x −2.85…0 along the house's frame), 2.8 m to the eaves.
g.fillStyle = '#b8b5ad';
g.fillRect(-2.85, -2.8, 2.85, 3.15);
g.strokeStyle = 'rgba(110,106,98,0.45)';
g.lineWidth = 0.014;
for (let y = -2.8 + 0.18; y < 0.35; y += 0.18) {
  g.beginPath();
  g.moveTo(-2.85, y);
  g.lineTo(0, y);
  g.stroke();
}
g.fillStyle = '#e9e7e0';
g.fillRect(-2.85, -2.8, 0.12, 3.15);
g.fillStyle = '#7a776f';
g.fillRect(-2.85, 0.2, 2.85, 0.15);
