// The bundle of blankets Moominmamma sits on: a soft round heap (a form), an ochre woollen blanket with grey-blue
// checks over it, a rope round it. Its painting is the heap unrolled: the way round by the slope, top down.
const W = 2.3, S = 0.56;
g.fillStyle = "#c9a065";
g.fillRect(-W / 2, -S, W, S);
g.strokeStyle = "rgba(92, 112, 132, 0.75)";
g.lineWidth = 0.035;
for (let x = -W / 2; x < W / 2; x += 0.16) {
  g.beginPath();
  g.moveTo(x, -S);
  g.lineTo(x, 0);
  g.stroke();
}
g.strokeStyle = "rgba(92, 112, 132, 0.55)";
for (let y = -S + 0.08; y < 0; y += 0.13) {
  g.beginPath();
  g.moveTo(-W / 2, y);
  g.lineTo(W / 2, y);
  g.stroke();
}
g.fillStyle = "#a2895f";
g.fillRect(-W / 2, -0.24, W, 0.045);
e.form(e.kit.lump([[0.42, 0], [0.3, -0.21], [0, -0.3], [-0.3, -0.21], [-0.42, 0], [-0.3, 0.21], [0, 0.3], [0.3, 0.21]], 0.4, 2), { closed: "u", ground: "#c9a065" });
