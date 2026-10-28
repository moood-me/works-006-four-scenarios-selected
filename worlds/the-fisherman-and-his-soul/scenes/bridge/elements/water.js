// The river from above (its plane's centre 195 m ahead, y toward the viewer): dark water under its mirror, a little
// greener near the banks; faint short lines of current drifting toward the viewer, painted round the layer's box so
// that its ends meet
const W = 11.7;
const D = 205;
const deep = g.createLinearGradient(-W, 0, W, 0);
deep.addColorStop(0, '#3d5560');
deep.addColorStop(0.15, '#33495e');
deep.addColorStop(0.85, '#33495e');
deep.addColorStop(1, '#3d5560');
g.fillStyle = deep;
g.fillRect(-W, -D, 2 * W, 2 * D);
e.layer('current', { box: [-W, -D, W, D], drift: [0, 0.3] }, g => {
  for (let i = 0; i < 1400; i++) {
    const x = -W + 2 * W * e.anim.hash(i, 1);
    const y = -D + 2 * D * e.anim.hash(i, 2);
    const len = 0.6 + 2.2 * e.anim.hash(i, 3);
    g.fillStyle = `rgba(170, 196, 214, ${(0.08 + 0.14 * e.anim.hash(i, 4)).toFixed(3)})`;
    for (const k of y + 0.06 > D ? [0, -2 * D] : [0]) g.fillRect(x - len / 2, y + k, len, 0.06);
  }
});
