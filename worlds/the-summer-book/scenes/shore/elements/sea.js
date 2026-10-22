// The sea, still as glass: a mirror (reflect) over its own colour — pale pearl far off, a clear cool grey-green near
// the rock. Seen from above, metres from its middle, y toward the viewer; the viewer's line is y = 2000.
const NEAR = 2000;
const at = z => NEAR - z;
const sea = g.createLinearGradient(0, -2000, 0, NEAR);
const stop = (z, c) => sea.addColorStop((at(z) + 2000) / 4000, c);
stop(4000, '#d6d8d5');
stop(600, '#ccd2d2');
stop(150, '#b9c5c7');
stop(40, '#9fb2b4');
stop(0, '#8ba3a6');
g.fillStyle = sea;
g.fillRect(-3000, -2000, 6000, 4000);
// long faint streaks of calm, longer and fewer toward the viewer
g.lineCap = 'round';
for (let i = 0; i < 160; i++) {
  const u = e.rnd();
  const z = 12 + 900 * u * u;
  const len = 3 + z * 0.08 * (0.5 + e.rnd());
  const x = -200 + 700 * e.rnd();
  g.strokeStyle = e.rnd() < 0.6 ? 'rgba(240,242,238,0.10)' : 'rgba(90,110,115,0.08)';
  g.lineWidth = 0.05 + z * 0.002;
  g.beginPath();
  g.moveTo(x, at(z));
  g.lineTo(x + len, at(z));
  g.stroke();
}
