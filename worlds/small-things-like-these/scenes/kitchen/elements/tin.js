// The biscuit tin the household's money is kept in, open before Eileen (x −0.16…0.16, 0.24 m with its lid): a red
// tartan tin, its lid standing open behind it on its hinge, inside it the week's coins and a green pound note folded
// over its rim — it must read at a glance as the money tin; the point `tin` — what Eileen counts.
// the lid standing up behind, its inside a plain tin colour with a printed thistle
g.fillStyle = "#8a2f2c";
g.fillRect(-0.15, -0.24, 0.3, 0.13);
g.fillStyle = "#c9c3b4";
g.fillRect(-0.135, -0.228, 0.27, 0.106);
g.fillStyle = "#6a4a7a";
g.beginPath();
g.arc(0, -0.19, 0.022, 0, 6.3);
g.fill();
g.fillStyle = "#4f6a45";
g.fillRect(-0.004, -0.17, 0.008, 0.04);
// the body: red tartan, a dark green band and lines
g.fillStyle = "#9a3430";
g.fillRect(-0.16, -0.1, 0.32, 0.1);
g.fillStyle = "#2f4a3a";
for (let x = -0.15; x < 0.16; x += 0.06) g.fillRect(x, -0.1, 0.018, 0.1);
g.fillRect(-0.16, -0.062, 0.32, 0.014);
g.fillStyle = "#e0c46a";
for (let x = -0.12; x < 0.16; x += 0.06) g.fillRect(x, -0.1, 0.004, 0.1);
// its open top seen from above: the inside, full of coins
g.fillStyle = "#b9b2a2";
g.beginPath();
g.ellipse(0, -0.1, 0.16, 0.035, 0, 0, 6.3);
g.fill();
const r = e.lib.stream(92);
for (let i = 0; i < 16; i++) {
  g.fillStyle = r() < 0.35 ? "#b58a45" : "#cfccc4";
  g.beginPath();
  g.ellipse((r() - 0.5) * 0.24, -0.1 + (r() - 0.5) * 0.04, 0.019, 0.007, 0, 0, 6.3);
  g.fill();
}
// the pound note folded over the rim
g.fillStyle = "#7f9c78";
g.beginPath();
g.moveTo(0.03, -0.115);
g.lineTo(0.12, -0.11);
g.lineTo(0.125, -0.06);
g.lineTo(0.04, -0.065);
g.closePath();
g.fill();
g.fillStyle = "#5f7a5a";
g.fillRect(0.06, -0.1, 0.035, 0.02);
e.at(0, -0.1, "tin");
