// The laundry across the yard, its long front seen straight on (x −6…6 about across 7 m; eaves 3 m, ridge 4.5 m): grey
// render streaked by the damp, a darker plinth, four tall windows (what is lit in them is `laundry_lit`; here only their
// deep reveals), a slate roof, a short chimney stack, a downpipe; a lamp bracket over the middle.
const r = e.lib.stream(43);
// the roof: slate rising from the eaves to the ridge
g.fillStyle = "#4e5462";
g.beginPath();
g.moveTo(-6, -3.0);
g.lineTo(-6, -4.5);
g.lineTo(6, -4.5);
g.lineTo(6, -3.0);
g.closePath();
g.fill();
g.fillStyle = "rgba(30, 34, 42, 0.35)";
for (let y = -4.4; y < -3.0; y += 0.14) g.fillRect(-6, y, 12, 0.012);
// frost along the ridge
g.fillStyle = "rgba(220, 226, 232, 0.5)";
g.fillRect(-6, -4.5, 12, 0.05);
// the chimney stack
g.fillStyle = "#6d6a66";
g.fillRect(2.4, -4.68, 0.5, 0.4);
g.fillStyle = "#4a4744";
g.fillRect(2.36, -4.7, 0.58, 0.05);
// the eaves and the gutter
g.fillStyle = "#3b3e44";
g.fillRect(-6, -3.06, 12, 0.08);
// the render, streaked by the damp
g.fillStyle = "#979b98";
g.fillRect(-6, -3.0, 12, 3.05);
for (let i = 0; i < 40; i++) {
  const x = -6 + r() * 12;
  const streak = g.createLinearGradient(0, -3.0, 0, -1.2 - r());
  streak.addColorStop(0, "rgba(70, 76, 74, 0.25)");
  streak.addColorStop(1, "rgba(70, 76, 74, 0)");
  g.fillStyle = streak;
  g.fillRect(x, -3.0, 0.08 + r() * 0.2, 2.2);
}
g.fillStyle = "#6f7270";
g.fillRect(-6, -0.45, 12, 0.5);
// the windows' reveals, dark round where the lit panes are
g.fillStyle = "#3a403f";
for (const x of [-2.4, -0.8, 0.8, 2.4]) g.fillRect(x - 0.52, -2.68, 1.04, 1.86);
g.fillStyle = "#b9bbb6";
for (const x of [-2.4, -0.8, 0.8, 2.4]) g.fillRect(x - 0.56, -0.86, 1.12, 0.07);
// the downpipe
g.fillStyle = "#3b3e44";
g.fillRect(4.1, -3.0, 0.08, 3.0);
// the lamp's bracket over the middle
g.fillStyle = "#2c2f33";
g.fillRect(-0.02, -3.0, 0.04, 0.12);
g.fillRect(-0.02, -2.9, 0.22, 0.03);
