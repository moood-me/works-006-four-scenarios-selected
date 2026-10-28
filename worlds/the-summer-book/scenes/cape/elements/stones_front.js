// Stones laid along the tent's front to hold its edges down, either side of the door (the last morning: `stones`).
// Metres from the middle of the front's foot. Each stone a layer painted once (`f0`…`f3`): its animate shows them as
// they are laid, one by one, in a piece (`stones_laid`), and all once they are (`stones`).
let k = 0;
for (const s of [-1, 1]) {
  for (let i = 0; i < 2; i++) {
    const x = s * (0.48 + i * 0.2) + (e.rnd() - 0.5) * 0.04;
    const w = 0.07 + 0.04 * e.rnd();
    const h = 0.05 + 0.05 * e.rnd();
    const color = e.rnd() < 0.5 ? '#9a928b' : '#8a837d';
    e.layer(`f${k++}`, {}, c => {
      c.fillStyle = color;
      c.beginPath();
      c.ellipse(x, -h * 0.8, w, h, 0, 0, 6.2832);
      c.fill();
    });
  }
}
