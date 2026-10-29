// The sea below the hill, seen from above (its plane's centre 3000 m ahead, y toward the viewer): its own colour under
// the mirror — the moon's path, the dawn, are the mirror's —, darker near the shore, paler far; faint long lines of
// ripple drifting with the breeze
const deep = g.createLinearGradient(0, -3000, 0, 3000);
deep.addColorStop(0, '#7590ad');
deep.addColorStop(0.98, '#4f6f8c');
deep.addColorStop(1, '#3f6273');
g.fillStyle = deep;
g.fillRect(-4000, -3000, 8000, 6000);
e.layer('ripple', { box: [-4000, -3000, 4000, 3000], drift: [0.25, 0] }, g => {
  for (let i = 0; i < 1600; i++) {
    const x = -4000 + 8000 * e.anim.hash(i, 1);
    const y = -3000 + 5900 * e.anim.hash(i, 2);
    const len = 10 + 40 * e.anim.hash(i, 3);
    g.fillStyle = `rgba(190, 210, 228, ${(0.12 + 0.2 * e.anim.hash(i, 4)).toFixed(3)})`;
    for (const k of x + len > 4000 ? [0, -8000] : [0]) g.fillRect(x + k, y, len, 1.6);
  }
});
