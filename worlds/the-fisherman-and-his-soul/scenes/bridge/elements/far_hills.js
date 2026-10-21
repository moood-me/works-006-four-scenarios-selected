// Far beyond the town and the bay's wood: low rounded hills, one dark blue band the haze takes. Metres, its foot at the
// origin
g.fillStyle = '#2c3a58';
g.beginPath();
g.moveTo(-760, 4);
for (let x = -760; x <= 760; x += 20) {
  const y = -(16 + 14 * Math.sin(x / 140 + 1.3) + 9 * Math.sin(x / 61 + 0.4) + 6 * e.anim.hash(Math.round(x / 20), 1));
  g.lineTo(x, Math.min(y, -4));
}
g.lineTo(760, 4);
g.closePath();
g.fill();
