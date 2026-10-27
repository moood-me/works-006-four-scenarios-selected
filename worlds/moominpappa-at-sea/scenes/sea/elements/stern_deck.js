// The little deck at the stern where the son sits, from above (in the boat's frame: x across, y toward the bow): grey
// boards — and the Groke's rime creeping over them from the transom toward his paws (a layer its shader, stern_deck.wgsl,
// shows as far forward as `frost_boat` says).
g.fillStyle = '#9a8468';
g.fillRect(-0.62, -0.28, 1.24, 0.56);
g.fillStyle = 'rgba(50, 40, 30, 0.5)';
for (let x = -0.62; x < 0.62; x += 0.14) g.fillRect(x + 0.135, -0.28, 0.008, 0.56);
e.layer('rime', {}, c => {
  for (let i = 0; i < 160; i++) {
    const x = -0.6 + 1.2 * e.rnd(), y = -0.28 + 0.56 * e.rnd(), r = 0.02 + 0.05 * e.rnd();
    const s = c.createRadialGradient(x, y, 0, x, y, r);
    s.addColorStop(0, 'rgba(246, 250, 255, 0.95)');
    s.addColorStop(1, 'rgba(226, 236, 246, 0)');
    c.fillStyle = s;
    c.fillRect(x - r, y - r, 2 * r, 2 * r);
  }
  c.strokeStyle = 'rgba(255, 255, 255, 0.9)';
  c.lineWidth = 0.006;
  for (let i = 0; i < 90; i++) {
    const x = -0.6 + 1.2 * e.rnd(), y = -0.28 + 0.56 * e.rnd(), a = e.rnd() * 3.1, l = 0.03;
    c.beginPath();
    c.moveTo(x - Math.cos(a) * l, y - Math.sin(a) * l);
    c.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l);
    c.stroke();
  }
});
