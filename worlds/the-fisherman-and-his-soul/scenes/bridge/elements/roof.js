// The potter's roof from above: one slope from the eave over the lane (y 1.1) up to the ridge (y −1.1), 5.8 m along
// the house (x): rows of old clay tiles, each row a little different, darker toward the eave; the ridge's capping
g.fillStyle = '#5e4034';
g.fillRect(-2.9, -1.1, 5.8, 2.2);
let row = 0;
for (let y = -1.0; y < 1.1; y += 0.2) {
  let x = -2.9 + (row % 2 ? 0.12 : 0);
  let i = 0;
  while (x < 2.9) {
    const tone = 0.85 + 0.25 * e.anim.hash(row * 40 + i, 1);
    g.fillStyle = `rgb(${Math.round(130 * tone)}, ${Math.round(84 * tone)}, ${Math.round(64 * tone)})`;
    g.fillRect(x + 0.01, y, 0.22, 0.17);
    x += 0.24;
    i++;
  }
  row++;
}
g.fillStyle = '#4a3229';
g.fillRect(-2.9, -1.1, 5.8, 0.12);
