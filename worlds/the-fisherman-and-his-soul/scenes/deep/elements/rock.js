// The foot of the stone seen from under the water: a great boulder rising from the sand past the top of the view (9 m
// of it, the surface 7 m up), broad at its foot, narrowing a little upward, its outline uneven. A form of its own:
// round its rim (u, its front — toward the viewer — in the painting's middle) and from its top (v 0) down to its foot
// (v 1). The painting is it unrolled: grey-green stone, paler patches where the light from above falls, dark cracks,
// a band of green weed-fuzz at its foot, barnacles, and a few sea anemones and a starfish low on its front — the
// scene's one small warm accent
const W = 15;
const H = 9;
const h = (i, s) => e.anim.hash(i, s);
g.fillStyle = '#7c8984';
g.fillRect(-W / 2, -H, W, H);
const tone = g.createLinearGradient(0, -H, 0, 0);
tone.addColorStop(0, 'rgba(196, 210, 200, 0.45)');
tone.addColorStop(0.55, 'rgba(196, 210, 200, 0)');
tone.addColorStop(0.85, 'rgba(70, 92, 80, 0)');
tone.addColorStop(1, 'rgba(70, 92, 80, 0.6)');
g.fillStyle = tone;
g.fillRect(-W / 2, -H, W, H);
for (let i = 0; i < 120; i++) {
  const x = -W / 2 + W * h(i, 1);
  const y = -H + (H - 0.4) * h(i, 2);
  const r = 0.12 + 0.4 * h(i, 3);
  g.fillStyle = h(i, 4) > 0.5 ? 'rgba(170, 186, 172, 0.35)' : 'rgba(84, 100, 96, 0.35)';
  g.beginPath();
  g.ellipse(x, y, r * 1.5, r, 0, 0, Math.PI * 2);
  g.fill();
}
g.strokeStyle = 'rgba(50, 62, 60, 0.6)';
g.lineWidth = 0.05;
for (let i = 0; i < 14; i++) {
  let x = -W / 2 + W * h(i, 5);
  let y = -H + (H - 1.5) * h(i, 6);
  g.beginPath();
  g.moveTo(x, y);
  for (let k = 0; k < 5; k++) {
    x += 0.5 * (h(i * 5 + k, 7) - 0.5);
    y += 0.25 + 0.35 * h(i * 5 + k, 8);
    g.lineTo(x, y);
  }
  g.stroke();
}
// weed-fuzz at the foot
g.fillStyle = 'rgba(92, 132, 84, 0.85)';
for (let i = 0; i < 220; i++) {
  const x = -W / 2 + W * h(i, 9);
  const top = -0.6 - 0.9 * h(i, 10);
  g.fillRect(x, top, 0.04 + 0.04 * h(i, 11), -top);
}
// barnacles
g.fillStyle = 'rgba(226, 224, 208, 0.8)';
for (let i = 0; i < 160; i++) {
  const x = -W / 2 + W * h(i, 12);
  const y = -2.6 + 1.8 * h(i, 13);
  g.beginPath();
  g.arc(x, y, 0.02 + 0.03 * h(i, 14), 0, Math.PI * 2);
  g.fill();
}
// anemones and a starfish, low on its front (the painting's middle)
for (let i = 0; i < 6; i++) {
  const x = -2.2 + 4.4 * h(i, 15);
  const y = -0.5 - 0.9 * h(i, 16);
  g.fillStyle = '#d98c7c';
  g.beginPath();
  g.arc(x, y, 0.07, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = '#e8a898';
  g.lineWidth = 0.02;
  for (let k = 0; k < 9; k++) {
    const a = Math.PI + (k / 8) * Math.PI;
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + 0.13 * Math.cos(a), y + 0.13 * Math.sin(a));
    g.stroke();
  }
}
g.fillStyle = '#d99a5c';
g.beginPath();
for (let k = 0; k < 10; k++) {
  const a = (k / 10) * Math.PI * 2 - Math.PI / 2;
  const r = k % 2 ? 0.07 : 0.2;
  g.lineTo(1.1 + r * Math.cos(a), -1.9 + r * Math.sin(a));
}
g.closePath();
g.fill();
const RX = 2.7;
const RZ = 2.1;
e.form((u, v) => {
  const a = (u - 0.5) * Math.PI * 2;
  const n = 1 + 0.09 * Math.sin(3 * a + 1.1) + 0.05 * Math.sin(5 * a + 0.3) + 0.03 * Math.sin(7 * a + 2.4);
  let r;
  if (v < 0.04) r = (v / 0.04) * 0.74;
  else {
    const t = (v - 0.04) / 0.96;
    r = 0.74 + 0.26 * t * t + 0.04 * Math.sin(t * 9 + a * 2);
  }
  const y = v < 0.04 ? H : H * (1 - (v - 0.04) / 0.96);
  return [r * RX * n * Math.sin(a), y, r * RZ * n * Math.cos(a)];
}, { closed: 'u', ground: '#6f7c78' });
