// The valley's sky, painted once in four lights its shader mixes by the looks (sky.wgsl): the soft blue of a late
// August afternoon (the painting), the golden evening (layer dusk), a clear moonlit night, deep blue but light enough
// to read, with stars (night), the rose of early morning (dawn); and the clouds (a layer the wind carries), tinted by
// the shader to the light. Far off on the right over the hills, the blue Lonely Mountains, in each light its own colour.
const H = 0.56, A = e.aspect, L = -0.3, R = A + 0.3, T = -0.35, B = 1.25, W = R - L;
const PEAKS = [];
for (let i = 0; i < 9; i++) {
  PEAKS.push([0.95 + i * 0.17 + (e.rnd() - 0.5) * 0.06, H - 0.07 - e.rnd() * 0.06]);
}
const sky = (c, stops, glow) => {
  const gr = c.createLinearGradient(0, T, 0, H + 0.05);
  for (const [k, col] of stops) gr.addColorStop(k, col);
  c.fillStyle = gr;
  c.fillRect(L, T, W, B - T);
  if (glow) {
    const [x, y, r, col] = glow;
    const s = c.createRadialGradient(x, y, 0, x, y, r);
    s.addColorStop(0, col);
    s.addColorStop(1, col.replace(/[\d.]+\)$/, '0)'));
    c.fillStyle = s;
    c.fillRect(L, T, W, H + 0.1 - T);
  }
};
const mountains = (c, far, near) => {
  c.fillStyle = far;
  c.beginPath();
  c.moveTo(0.8, H + 0.02);
  for (const [x, y] of PEAKS) {
    c.lineTo(x - 0.05, y + 0.03);
    c.lineTo(x, y);
    c.lineTo(x + 0.06, y + 0.035);
  }
  c.lineTo(R, H - 0.04);
  c.lineTo(R, H + 0.02);
  c.closePath();
  c.fill();
  c.fillStyle = near;
  c.beginPath();
  c.moveTo(1.0, H + 0.02);
  for (let x = 1.0; x <= R; x += 0.05) c.lineTo(x, H - 0.025 - 0.012 * Math.sin(x * 9) - 0.01 * Math.sin(x * 23));
  c.lineTo(R, H + 0.02);
  c.closePath();
  c.fill();
};
// the afternoon
sky(g, [[0, '#7fa6cc'], [0.45, '#a9c5dc'], [0.82, '#d7e4e9'], [1, '#eef0e4']], [0.3, H, 0.9, 'rgba(255, 246, 222, 0.35)']);
mountains(g, '#a7b9c9', '#9aae9f');
// the evening: warm gold low on the left where the sun is going down behind the viewer's shoulder
e.layer('dusk', {}, c => {
  sky(c, [[0, '#8ea7c9'], [0.4, '#c3c2c8'], [0.75, '#f0c9a4'], [1, '#f8d7a6']], [-0.25, H - 0.02, 1.4, 'rgba(255, 196, 120, 0.6)']);
  mountains(c, '#b79fae', '#a29a86');
});
// the night: clear, blue, the stars
e.layer('night', {}, c => {
  sky(c, [[0, '#26375f'], [0.55, '#344a78'], [0.9, '#4c628f'], [1, '#5a6f96']], [0.5, H, 0.8, 'rgba(120, 140, 190, 0.3)']);
  for (let i = 0; i < 420; i++) {
    const x = L + e.rnd() * W, y = T + (H - 0.03 - T) * e.rnd() ** 1.3, r = 0.0007 + 0.0018 * e.rnd() ** 3;
    c.fillStyle = `rgba(240, 244, 255, ${0.45 + 0.5 * e.rnd()})`;
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI * 2);
    c.fill();
  }
  mountains(c, '#34446a', '#2e3d50');
});
// the morning: pale rose on the right, where the sun comes up
e.layer('dawn', {}, c => {
  sky(c, [[0, '#9ab3d0'], [0.45, '#c7cfdc'], [0.82, '#efd6d0'], [1, '#f6ddcf']], [A + 0.2, H, 1.1, 'rgba(255, 214, 196, 0.55)']);
  mountains(c, '#b6aec4', '#a3a69a');
});
// the clouds: soft heaps and long streaks, white (the shader tints them), each painted three times a width apart so
// the drift wraps round seamlessly
const clouds = [];
for (let i = 0; i < 12; i++) {
  const y = 0.02 + e.rnd() * 0.4;
  clouds.push({ x: L + e.rnd() * W, y, w: 0.14 + e.rnd() * 0.3, h: 0.02 + e.rnd() * 0.035 });
}
e.layer('clouds', { drift: [0.0018, 0], box: [L, T, R, H] }, c => {
  for (const cl of clouds) {
    for (const off of [-W, 0, W]) {
      for (let j = 0; j < 5; j++) {
        const cx = cl.x + off + (j - 2) * cl.w * 0.24, cy = cl.y - (j % 2) * cl.h * 0.45, rx = cl.w * (0.4 - Math.abs(j - 2) * 0.06);
        const s = c.createRadialGradient(cx, cy, 0, cx, cy, rx);
        s.addColorStop(0, 'rgba(255, 255, 255, 0.62)');
        s.addColorStop(0.55, 'rgba(255, 255, 255, 0.3)');
        s.addColorStop(1, 'rgba(255, 255, 255, 0)');
        c.fillStyle = s;
        c.save();
        c.translate(cx, cy);
        c.scale(1, cl.h / rx);
        c.translate(-cx, -cy);
        c.beginPath();
        c.arc(cx, cy, rx, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }
  }
});
