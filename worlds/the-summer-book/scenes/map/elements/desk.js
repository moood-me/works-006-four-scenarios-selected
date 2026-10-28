// Papa's work table on the veranda under the sheet (seen only past the sheet's ends and on a tall screen above and
// below it): old pale boards, grey-brown, running across, their joints and grain
const L = -0.3;
const R = e.aspect + 0.3;
const T = -0.35;
const B = 1.25;
g.fillStyle = '#8b7d6c';
g.fillRect(L, T, R - L, B - T);
for (let y = T; y < B; y += 0.11) {
  g.fillStyle = `rgba(${e.rnd() < 0.5 ? '70, 60, 50' : '160, 146, 126'}, ${0.12 + 0.12 * e.rnd()})`;
  g.fillRect(L, y, R - L, 0.11);
  g.fillStyle = 'rgba(46, 38, 30, 0.5)';
  g.fillRect(L, y + 0.106, R - L, 0.004);
  g.strokeStyle = 'rgba(60, 50, 40, 0.16)';
  g.lineWidth = 0.0025;
  for (let j = 0; j < 5; j++) {
    const yy = y + 0.015 + 0.08 * e.rnd();
    g.beginPath();
    g.moveTo(L, yy);
    for (let x = L; x <= R; x += 0.2) g.lineTo(x, yy + 0.004 * Math.sin(x * 7 + j * 3 + y * 40));
    g.stroke();
  }
}
