// The sky over the open sea in two hours, each painted once and cross-faded by `night` (animate): an August dusk —
// pearl-grey above, a faint rose along the horizon where the sun has just gone — and the moonlit night — deep blue
// above, paling toward the horizon, a few stars, long thin clouds silvered by the moon (the moon itself stands
// behind the viewer, over the island: its light is the scene's far light "moon"). Screen heights; the horizon at 0.45.
const A = e.aspect;
const HZ = 0.45;
const X0 = -0.3;
const X1 = A + 0.3;
const Y0 = -0.35;
const glow = e.lib.glow;
e.layer('dusk', {}, c => {
  const sky = c.createLinearGradient(0, Y0, 0, HZ);
  sky.addColorStop(0, '#98a3b6');
  sky.addColorStop(0.5, '#bcc1cb');
  sky.addColorStop(0.85, '#dcd3cf');
  sky.addColorStop(1, '#e8d8cf');
  c.fillStyle = sky;
  c.fillRect(X0, Y0, X1 - X0, HZ - Y0);
  c.fillStyle = '#d4d3d2';
  c.fillRect(X0, HZ, X1 - X0, 1.25 - HZ);
  // where the sun went down, far on the left over the sea
  glow(c, A * 0.12, HZ, 0.9, 0.12, '#f0d2c2', 0.8);
  glow(c, A * 0.5, HZ, 1.6, 0.05, '#efe4dc', 0.7);
});
e.layer('night', {}, c => {
  const sky = c.createLinearGradient(0, Y0, 0, HZ);
  sky.addColorStop(0, '#26355a');
  sky.addColorStop(0.55, '#3d5079');
  sky.addColorStop(0.9, '#6a7ca2');
  sky.addColorStop(1, '#8190b0');
  c.fillStyle = sky;
  c.fillRect(X0, Y0, X1 - X0, HZ - Y0);
  c.fillStyle = '#596a8e';
  c.fillRect(X0, HZ, X1 - X0, 1.25 - HZ);
  // the moon's light on the air over the sea: the horizon pale, a little brighter on the right
  glow(c, A * 0.65, HZ, 1.5, 0.1, '#a4b2cf', 0.75);
  for (let i = 0; i < 150; i++) {
    const y = Y0 + Math.pow(e.rnd(), 1.3) * (HZ - 0.1 - Y0);
    c.globalAlpha = 0.3 + 0.6 * e.rnd() * (1 - (y - Y0) / (HZ - Y0));
    c.fillStyle = '#eef1fb';
    c.beginPath();
    c.arc(X0 + e.rnd() * (X1 - X0), y, 0.0012 + 0.0016 * e.rnd(), 0, 6.2832);
    c.fill();
  }
  c.globalAlpha = 1;
});
// long thin clouds, drifting slowly (wrapping round the layer's box: kept inside it): pale by dusk, silver by night
const clouds = (c, a, b) => {
  for (let i = 0; i < 12; i++) {
    const y = -0.22 + 0.5 * e.rnd();
    const len = 0.25 + 0.45 * e.rnd();
    const x = X0 + len + (X1 - X0 - 2 * len) * e.rnd();
    const thick = 0.008 + 0.02 * e.rnd();
    glow(c, x, y, len, thick, i % 3 ? a : b, 0.55);
  }
};
e.layer('clouds_dusk', { drift: [0.002, 0], box: [X0, Y0, X1, HZ] }, c => clouds(c, '#e3e2e4', '#f0e2dc'));
e.layer('clouds_night', { drift: [0.002, 0], box: [X0, Y0, X1, HZ] }, c => clouds(c, '#9aa8c6', '#b9c4dc'));
