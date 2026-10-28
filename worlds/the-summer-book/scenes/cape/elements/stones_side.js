// Stones laid along the tent's near side to hold its edge down (the last morning: `stones`), side-on, x back from its
// front. Metres from the front corner's foot.
if (!e.state.stones || !e.lib.tentShown(e.state, 'up')) return;
for (let i = 0; i < 9; i++) {
  const x = 0.08 + i * 0.22 + (e.rnd() - 0.5) * 0.05;
  const w = 0.08 + 0.04 * e.rnd();
  const h = 0.06 + 0.05 * e.rnd();
  g.fillStyle = e.rnd() < 0.5 ? '#9a928b' : '#8a837d';
  g.beginPath();
  g.ellipse(x, -h * 0.8, w, h, 0, 0, 6.2832);
  g.fill();
}
