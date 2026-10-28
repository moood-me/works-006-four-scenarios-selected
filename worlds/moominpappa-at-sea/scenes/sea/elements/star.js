// The star Papa steers by, ahead of the bow (on the round sky a little past the turn straight behind the aft view —
// over the bow seen from behind the stern),
// bright and a little blue, its rays; seen at night (its animate shows it as far as `night` is). Its point `star`.
const x = e.aspect / 2 - Math.PI + 0.23, y = 0.4;
e.layer('star', {}, c => {
  c.strokeStyle = 'rgba(236, 242, 255, 0.85)';
  c.lineWidth = 0.0018;
  for (let k = 0; k < 4; k++) {
    const a = (k / 4) * Math.PI + 0.3, l = k % 2 ? 0.012 : 0.02;
    c.beginPath();
    c.moveTo(x - Math.cos(a) * l, y - Math.sin(a) * l);
    c.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l);
    c.stroke();
  }
  c.fillStyle = '#f4f7ff';
  c.beginPath();
  c.arc(x, y, 0.0035, 0, Math.PI * 2);
  c.fill();
  e.light(x, y, 0.015, '#dfe8ff', 0.9, 'glow');
  e.at(x, y);
});
