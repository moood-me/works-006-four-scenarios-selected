// The bay seen from above (its plane's centre 3000 m ahead, y toward the viewer): its own colour under the mirror,
// darker and greener near, paler far; faint long lines of ripple drifting with the breeze. Round the stone the water
// glows from below — the sea-people's light (a glow of the engine's that lights what is near it: the Mermaid)
const deep = g.createLinearGradient(0, -3000, 0, 3000);
deep.addColorStop(0, '#7590ad');
deep.addColorStop(0.97, '#4f6f8c');
deep.addColorStop(1, '#3f6273');
g.fillStyle = deep;
g.fillRect(-4000, -3000, 8000, 6000);
e.layer('ripple', { box: [-4000, -3000, 4000, 3000], drift: [0.25, 0] }, g => {
  // long lines far out (near, the mirror's own ripple breaks the water)
  for (let i = 0; i < 2400; i++) {
    const x = -4000 + 8000 * e.anim.hash(i, 1);
    const y = -3000 + 5800 * e.anim.hash(i, 2);
    const len = 10 + 40 * e.anim.hash(i, 3);
    g.fillStyle = `rgba(190, 210, 228, ${(0.12 + 0.2 * e.anim.hash(i, 4)).toFixed(3)})`;
    for (const k of x + len > 4000 ? [0, -8000] : [0]) g.fillRect(x + k, y, len, 1.6);
  }
});
// the glow round the stone (the stone stands 2.9 m right, 6.2 m ahead)
e.light(2.9, 3000 - 6.2, 1.7, '#78e4d2', 0.9, 'glow');
