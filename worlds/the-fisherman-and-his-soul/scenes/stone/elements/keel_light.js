// A pale light passing under the boat's keel in the dark water (4.6, the widow's boat): a soft glow lying on the water
// under the hull (a plane at its surface), its light reaching the hull and him; shown by `pass_light` (its animate)
e.layer('pale', { box: [-1.6, -0.9, 1.6, 0.9] }, g => {
  const r = g.createRadialGradient(0, 0, 0, 0, 0, 1.4);
  r.addColorStop(0, 'rgba(206, 240, 236, 0.75)');
  r.addColorStop(1, 'rgba(206, 240, 236, 0)');
  g.fillStyle = r;
  g.save();
  g.scale(1, 0.55);
  g.fillRect(-1.6, -1.6, 3.2, 3.2);
  g.restore();
});
e.light(0, 0, 0.9, '#c8f0ea', 1.6, 'pass');
