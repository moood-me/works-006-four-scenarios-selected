// Far on the right, past the open water, the town over the river: a low hill and a scatter of warm lit windows —
// glows only, too far to light anything
g.fillStyle = '#44556a';
g.beginPath();
g.moveTo(-260, 2);
for (let x = -260; x <= 260; x += 8) g.lineTo(x, -(14 * Math.cos(x / 260 * Math.PI / 2) ** 2 + 2));
g.lineTo(260, 2);
g.closePath();
g.fill();
for (let i = 0; i < 16; i++) {
  const x = -120 + 230 * anim.hash(i, 21);
  const y = -2 - 10 * Math.cos(x / 260 * Math.PI / 2) ** 2 * anim.hash(i, 22);
  e.light(x, y, 2.2 + 1.6 * anim.hash(i, 23), '#ffc477', 0.7 + 0.5 * anim.hash(i, 24), `w${i}`);
}
