// The two beds from above, their heads at the far wall: Grandmother's on the left (0.9 m wide), Sophia's on the right
// (0.75 m), a hand's width between them. White sheets turned down over grey wool (Grandmother's) and an old faded quilt
// (Sophia's); Grandmother's pillow (Sophia's is `pillow`). Metres from the plane's middle (x as the house's frame
// plus 1.725, y toward the room's near wall: Grandmother's bed x −0.925…−0.025, y −0.99…0.99; Sophia's 0.175…0.925,
// −0.99…0.69). The point `gap`: the edge of Grandmother's blanket by Sophia's bed (her palm there, not reaching over);
// `cover`: the middle of Grandmother's bed, where the blanket is held up over the two (М8б).
// Grandmother's
g.fillStyle = '#efede7';
g.fillRect(-0.925, -0.99, 0.9, 0.56);
g.fillStyle = '#878b8f';
g.fillRect(-0.925, -0.45, 0.9, 1.44);
g.fillStyle = '#9a9ea2';
g.fillRect(-0.925, -0.45, 0.9, 0.06);
g.fillStyle = '#6f7478';
for (const y of [0.55, 0.62]) g.fillRect(-0.925, y, 0.9, 0.025);
g.fillStyle = '#f4f2ec';
g.fillRect(-0.925, -0.52, 0.9, 0.08);
// her pillow
g.fillStyle = '#f6f4ef';
g.beginPath();
g.ellipse(-0.475, -0.8, 0.36, 0.15, 0, 0, 6.2832);
g.fill();
g.strokeStyle = 'rgba(180,176,166,0.6)';
g.lineWidth = 0.01;
g.beginPath();
g.ellipse(-0.475, -0.8, 0.3, 0.1, 0, 0, 6.2832);
g.stroke();
// Sophia's
g.fillStyle = '#efede7';
g.fillRect(0.175, -0.99, 0.75, 0.5);
const Q = ['#c99a86', '#9fb1b8', '#d8cfb8', '#a9b49a', '#c4a39b', '#b9c3c6'];
for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 9; j++) {
    g.fillStyle = Q[(i * 5 + j * 2) % 6];
    g.fillRect(0.175 + i * 0.125, -0.47 + j * 0.129, 0.125, 0.129);
  }
}
g.fillStyle = '#f4f2ec';
g.fillRect(0.175, -0.53, 0.75, 0.07);
e.at(-0.05, 0.05, 'gap');
e.at(-0.475, -0.25, 'cover');
