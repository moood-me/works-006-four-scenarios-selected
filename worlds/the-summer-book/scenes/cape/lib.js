// «The Cape» — the land's shape (relief.js reads it) and what the paintings share. The island's far end: one bare
// granite back going down into the open sea on the right and ahead; on the left the island goes on and rises, far off,
// to the pines and the house. The viewer stands on the rock; the sea's edge runs from near on the right away to the
// left.
const { clamp } = anim;
const sm = u => {
  const v = clamp(u, 0, 1);
  return v * v * (3 - 2 * v);
};
const soft = x => (x > 20 ? x : Math.log(1 + Math.exp(x)));
// the line the rock is laid along: metres across at a distance (near on the right, bending away to the left)
const coast = z => 8 - 0.55 * z + 0.42 * soft(z - 13);
function raw(x, z) {
  const s = coast(z) - x;
  let h = -1.1 + 1.1 * sm((s + 2) / 5);
  // low rounded backs of rock
  h += 0.3 * Math.exp(-((x + 3) ** 2 + (z - 9) ** 2) / 6) + 0.2 * Math.exp(-((x - 4.5) ** 2 + (z - 4) ** 2) / 4);
  h += 0.1 * Math.sin(0.8 * x + 0.5 * z) * Math.sin(0.55 * z - 0.35 * x) * sm((s - 0.5) / 3);
  // inland the island rises to the pines and the house
  h += 7 * sm((s - 6) / 26) * sm((z - 12) / 30);
  // and ends: beyond 95 m ahead and 60 m to the left it goes down under the sea
  h -= 9 * sm((z - 92) / 14) + 9 * sm((-x - 58) / 12);
  return h;
}
const ZERO = raw(0, 0);
const ground = (x, z) => raw(x, z) - ZERO;
// the sea's surface, metres (the viewer stands at 0 on the rock)
const WATER = -0.75 - ZERO;
// where the sea meets the rock at a distance: metres across
function shore(z) {
  let a = coast(z) - 4;
  let b = coast(z) + 4;
  for (let i = 0; i < 24; i++) {
    const m = (a + b) / 2;
    if (ground(m, z) > WATER) a = m;
    else b = m;
  }
  return (a + b) / 2;
}
// a soft round glow, stretched (rx, ry its half-widths), falling off smoothly to nothing
function glow(g, x, y, rx, ry, color, alpha) {
  const [r, gg, b] = [1, 3, 5].map(i => parseInt(color.slice(i, i + 2), 16));
  g.save();
  g.translate(x, y);
  g.scale(rx, ry);
  const grad = g.createRadialGradient(0, 0, 0, 0, 0, 1);
  for (const u of [0, 0.25, 0.5, 0.75, 1]) grad.addColorStop(u, `rgba(${r},${gg},${b},${(1 - u * u) ** 2})`);
  g.globalAlpha = alpha;
  g.fillStyle = grad;
  g.beginPath();
  g.arc(0, 0, 1, 0, 6.2832);
  g.fill();
  g.restore();
}
// a slope of the tent's roof, pale canvas seen from above (both slopes, tent_slope_r and tent_slope_l): a seam along
// the ridge, two seams down it, the hem darker where it meets the rock. Metres from its middle, x along the ridge
// (1.9 m), y down the slope (1.4 m)
function tentSlope(g) {
  g.fillStyle = '#e6dfcf';
  g.fillRect(-0.95, -0.7, 1.9, 1.4);
  g.strokeStyle = 'rgba(150,140,120,0.5)';
  g.lineWidth = 0.012;
  for (const x of [-0.32, 0.32]) {
    g.beginPath();
    g.moveTo(x, -0.7);
    g.lineTo(x, 0.7);
    g.stroke();
  }
  g.fillStyle = '#d3cab6';
  g.fillRect(-0.95, -0.7, 1.9, 0.04);
  g.fillRect(-0.95, 0.62, 1.9, 0.08);
}
return { WATER, coast, ground, shore, sm, glow, tentSlope };
