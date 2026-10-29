// Inland, behind the field, far: low hills with a dark line of firs along their tops (the wood where the well is), and
// the far side of the bay running away along the shore — what the shore's view sees beyond the land. Metres, origin
// where its foot meets the land; the haze fades it
g.fillStyle = '#5d6e66';
g.beginPath();
g.moveTo(-600, 4);
for (let x = -600; x <= 600; x += 12) g.lineTo(x, -(18 + 12 * Math.sin(x * 0.006 + 2) + 6 * Math.sin(x * 0.021)));
g.lineTo(600, 4);
g.closePath();
g.fill();
g.fillStyle = '#44544e';
for (let i = 0; i < 220; i++) {
  const x = -590 + 1180 * e.anim.hash(i, 3);
  const base = -(18 + 12 * Math.sin(x * 0.006 + 2) + 6 * Math.sin(x * 0.021)) + 1;
  const h = 6 + 8 * e.anim.hash(i, 4);
  g.beginPath();
  g.moveTo(x, base - h);
  g.lineTo(x + h * 0.25, base);
  g.lineTo(x - h * 0.25, base);
  g.closePath();
  g.fill();
}
