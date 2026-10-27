// The white strip of rime on the water behind the boat — the Groke's wake, where the sea froze round her as she swam:
// floes and slush, brighter in its middle, ragged at its edges, widening and fading far astern. From above (x across,
// y toward the boat; it lies on the water astern of her, its middle 47.5 m from her anchor, 90 m long and up to 7 m wide — on the sea,
// not on her: she pitches, it does not). Painted once; its
// shader (strip.wgsl) shows it from its near end (where the Groke swims — lib.trailNear(`trail`)) on astern.
const C = 47.5;
const band = (y, w, a) => {
  const s = g.createLinearGradient(-w, 0, w, 0);
  s.addColorStop(0, 'rgba(232, 240, 248, 0)');
  s.addColorStop(0.3, `rgba(236, 243, 250, ${a * 0.7})`);
  s.addColorStop(0.5, `rgba(248, 251, 255, ${a})`);
  s.addColorStop(0.7, `rgba(236, 243, 250, ${a * 0.7})`);
  s.addColorStop(1, 'rgba(232, 240, 248, 0)');
  g.fillStyle = s;
  g.fillRect(-w, y, 2 * w, 1.05);
};
for (let y = -45; y < 45; y += 1) {
  const far = (45 - y) / 90; // 0 at the stern's end … 1 far astern
  band(y, 1.3 + 1.9 * far, 1 - 0.25 * far);
}
// floes: flat white pieces, more near, with a bluish shade on one side
for (let i = 0; i < 520; i++) {
  const y = -45 + 90 * e.rnd() ** 0.7, far = (45 - y) / 90, w = 1.2 + 1.8 * far;
  const x = (e.rnd() - 0.5) * 2 * w * (0.4 + 0.6 * e.rnd()), r = 0.1 + 0.3 * e.rnd() * (1 + far);
  g.fillStyle = 'rgba(176, 198, 222, 0.6)';
  g.beginPath();
  g.ellipse(x + 0.02, y + 0.02, r * 1.3, r, e.rnd() * 3, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = 'rgba(252, 253, 255, 0.92)';
  g.beginPath();
  g.ellipse(x, y, r * 1.2, r * 0.9, e.rnd() * 3, 0, Math.PI * 2);
  g.fill();
}
e.at(0, C - 30, 'strip');
