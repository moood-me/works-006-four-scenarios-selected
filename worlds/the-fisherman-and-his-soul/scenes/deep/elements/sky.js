// The water all round and above, seen from the sand: the surface overhead bright and pale, the water going down to a
// deeper turquoise toward the level of the eye (the haze's colour there, so the sand fades into it), and on below it.
// `dusk` — the evening: the same water, bluer and dimmer. The surface's moving net of light and the warm light far
// above (his lantern, `far_light`) are the shader's (sky.wgsl; uniforms set by the animate)
const W = e.aspect;
const k = e.state.dusk ?? 0;
const mix = (a, b) => {
  const p = parseInt(a.slice(1), 16);
  const q = parseInt(b.slice(1), 16);
  const c = s => Math.round(((p >> s) & 255) * (1 - k) + ((q >> s) & 255) * k);
  return `rgb(${c(16)}, ${c(8)}, ${c(0)})`;
};
const water = g.createLinearGradient(0, -0.35, 0, 1.25);
water.addColorStop(0, mix('#e4fbf3', '#a3c6d8'));
water.addColorStop(0.19, mix('#b4efe6', '#729fbd'));
water.addColorStop(0.34, mix('#7fd5d0', '#4a83a3'));
water.addColorStop(0.5, mix('#4fb3b6', '#2d6f8c'));
water.addColorStop(1, mix('#3a9aa2', '#245e78'));
g.fillStyle = water;
g.fillRect(-0.3, -0.35, W + 0.6, 1.6);
