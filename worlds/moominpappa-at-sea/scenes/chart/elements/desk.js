// the veranda table's old boards under the chart (seen only past the sheet's ends and on a tall screen above and
// below it): warm brown planks running across, their joints and grain
const L = -0.3, R = e.aspect + 0.3, T = -0.35, B = 1.25;
g.fillStyle = '#5a3f2a';
g.fillRect(L, T, R - L, B - T);
for (let y = T; y < B; y += 0.11) {
  const k = e.rnd();
  g.fillStyle = `rgba(${k < 0.5 ? '40, 26, 16' : '120, 86, 56'}, ${0.12 + 0.12 * e.rnd()})`;
  g.fillRect(L, y, R - L, 0.11);
  g.fillStyle = 'rgba(28, 18, 10, 0.55)';
  g.fillRect(L, y + 0.106, R - L, 0.004);
  g.strokeStyle = 'rgba(36, 24, 14, 0.18)';
  g.lineWidth = 0.0025;
  for (let j = 0; j < 5; j++) {
    const yy = y + 0.015 + 0.08 * e.rnd();
    g.beginPath();
    g.moveTo(L, yy);
    for (let x = L; x <= R; x += 0.2) g.lineTo(x, yy + 0.004 * Math.sin(x * 7 + j * 3 + y * 40));
    g.stroke();
  }
}
