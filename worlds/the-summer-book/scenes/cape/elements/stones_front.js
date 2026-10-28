// Stones laid along the tent's front to hold its edges down, either side of the door (the last morning: `stones`).
// Metres from the middle of the front's foot.
if (!e.state.stones || !e.lib.tentShown(e.state, 'up')) return;
for (const s of [-1, 1]) {
  for (let i = 0; i < 2; i++) {
    const x = s * (0.48 + i * 0.2) + (e.rnd() - 0.5) * 0.04;
    const w = 0.07 + 0.04 * e.rnd();
    const h = 0.05 + 0.05 * e.rnd();
    g.fillStyle = e.rnd() < 0.5 ? '#9a928b' : '#8a837d';
    g.beginPath();
    g.ellipse(x, -h * 0.8, w, h, 0, 0, 6.2832);
    g.fill();
  }
}
