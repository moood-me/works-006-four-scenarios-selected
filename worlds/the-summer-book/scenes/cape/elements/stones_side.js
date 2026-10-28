// Stones laid along the tent's near side to hold its edge down (the last morning: `stones`), side-on, x back from its
// front. Metres from the front corner's foot. Each stone a layer painted once (`s0`…`s8`): its animate shows them as
// they are laid, one by one, in a piece (`stones_laid`), and all once they are (`stones`).
for (let i = 0; i < 9; i++) {
  const x = 0.08 + i * 0.22 + (e.rnd() - 0.5) * 0.05;
  const w = 0.08 + 0.04 * e.rnd();
  const h = 0.06 + 0.05 * e.rnd();
  const color = e.rnd() < 0.5 ? '#9a928b' : '#8a837d';
  e.layer(`s${i}`, {}, c => {
    c.fillStyle = color;
    c.beginPath();
    c.ellipse(x, -h * 0.8, w, h, 0, 0, 6.2832);
    c.fill();
  });
}
