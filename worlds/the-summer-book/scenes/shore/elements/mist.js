// A low white mist lying on the sea at the horizon, in two thin banks drifting slowly opposite ways (layers that
// wrap round their boxes: the banks are kept within them). Metres from its foot on the water; 1600 m long.
const bank = (c, n, y0, thick, color, alpha) => {
  for (let i = 0; i < n; i++) {
    const len = 60 + 160 * e.rnd();
    const x = -800 + len + (1600 - 2 * len) * e.rnd();
    const y = y0 - thick * e.rnd();
    c.save();
    c.translate(x, y);
    c.scale(len, thick * (0.6 + 0.6 * e.rnd()));
    const r = c.createRadialGradient(0, 0, 0, 0, 0, 1);
    r.addColorStop(0, color);
    r.addColorStop(1, color + '00');
    c.globalAlpha = alpha;
    c.fillStyle = r;
    c.beginPath();
    c.arc(0, 0, 1, 0, 6.2832);
    c.fill();
    c.restore();
  }
};
e.layer('far', { drift: [1.2, 0], box: [-800, -16, 800, 2] }, c => bank(c, 12, -2, 6, '#eef0ee', 0.55));
e.layer('near', { drift: [-0.8, 0], box: [-800, -16, 800, 2] }, c => bank(c, 9, -1, 4, '#f4f3ef', 0.45));
