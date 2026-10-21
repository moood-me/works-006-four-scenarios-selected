// The far shore on the left: a low dark wood of firs along the water (where the well is), running down into the sea
// toward the right. Metres, origin where its foot meets the water; the haze fades it into the night
const land = x => 3 + 5 * anim.span(x, 420, -200) + 3 * Math.sin(x * 0.011) + 2 * Math.sin(x * 0.037);
g.fillStyle = '#3a4a52';
g.beginPath();
g.moveTo(-760, 2);
for (let x = -760; x <= 470; x += 10) g.lineTo(x, -Math.max(0, land(x) * anim.span(x, 470, 300)));
g.lineTo(470, 2);
g.closePath();
g.fill();
g.fillStyle = '#33434c';
for (let i = 0; i < 260; i++) {
  const x = -750 + 1080 * anim.hash(i, 7);
  const base = -land(x) * anim.span(x, 470, 300) + 1;
  const h = (8 + 14 * anim.hash(i, 8)) * (0.4 + 0.6 * anim.span(x, 330, 100));
  const w = h * (0.22 + 0.08 * anim.hash(i, 9));
  g.beginPath();
  g.moveTo(x, base - h);
  g.lineTo(x + w, base);
  g.lineTo(x - w, base);
  g.closePath();
  g.fill();
}
