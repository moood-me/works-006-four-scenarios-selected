// The moon over the sea on the left, as full as `moon` says (0 a thin new crescent … 1 full; lit on its right as it
// waxes), a soft glow round it; seen at night (its animate shows it as far as `night` is). The moon's light comes
// from its disc (`moon#disc`).
const x = 0.52, y = 0.17, r = 0.026, f = 0.12 + 0.88 * Math.max(0, Math.min(1, e.state.moon ?? 0));
e.layer('disc', {}, c => {
  c.fillStyle = 'rgba(214, 222, 240, 0.16)';
  c.beginPath();
  c.arc(x, y, r, 0, Math.PI * 2);
  c.fill();
  // the lit part: the right half, and on its left an ellipse (cut away while a crescent, added once past half)
  const w = r * Math.abs(1 - 2 * f);
  c.fillStyle = '#f4f1e2';
  c.beginPath();
  c.arc(x, y, r, -Math.PI / 2, Math.PI / 2);
  if (f < 0.5) c.ellipse(x, y, w, r, 0, Math.PI / 2, -Math.PI / 2, true);
  else c.ellipse(x, y, w, r, 0, Math.PI / 2, Math.PI * 1.5, false);
  c.fill();
  e.light(x, y, r * 4, '#cfdaf5', 0.5, 'glow');
  e.at(x, y, 'disc');
});
