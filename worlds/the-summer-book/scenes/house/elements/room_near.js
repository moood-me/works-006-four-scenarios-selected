// The room's near wall seen from inside: the same paper as the far wall, the doorway to the veranda cut out (its
// glass door stands open on the veranda's side). The card faces the room (facing 0): its x runs against the house's
// frame — u = −x; the doorway (x 1.3…2.15) is u −2.15…−1.3. Metres from the frame's x 0 at the floor.
g.fillStyle = '#ddd6c6';
g.fillRect(-2.35, -2.62, 5.1, 2.64);
g.fillStyle = 'rgba(130,146,160,0.35)';
for (let row = 0; row < 11; row++) {
  const y = -2.5 + row * 0.22;
  for (let x = -2.3 + (row % 2) * 0.11; x < 2.75; x += 0.22) {
    g.beginPath();
    g.ellipse(x, y, 0.012, 0.022, 0.4, 0, 6.2832);
    g.fill();
  }
}
g.fillStyle = '#bcb5a6';
g.fillRect(-2.35, -0.12, 5.1, 0.14);
g.fillStyle = '#e8e3d8';
g.fillRect(-2.35, -2.62, 5.1, 0.06);
// the doorway's white casing, then the opening
g.fillStyle = '#efede7';
g.fillRect(-2.25, -2.17, 1.05, 2.19);
g.globalCompositeOperation = 'destination-out';
g.fillRect(-2.15, -2.07, 0.85, 2.1);
g.globalCompositeOperation = 'source-over';
// a small framed picture of a boat over where the beds' feet are
g.fillStyle = '#b8a78a';
g.fillRect(1.55, -1.75, 0.34, 0.26);
g.fillStyle = '#e7e3d6';
g.fillRect(1.58, -1.72, 0.28, 0.2);
g.fillStyle = '#7d8b93';
g.beginPath();
g.moveTo(1.62, -1.57);
g.lineTo(1.82, -1.57);
g.lineTo(1.78, -1.54);
g.lineTo(1.65, -1.54);
g.closePath();
g.fill();
g.fillRect(1.715, -1.69, 0.008, 0.12);
