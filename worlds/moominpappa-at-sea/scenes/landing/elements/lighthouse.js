// The lighthouse: a white tower turned on a lathe (a form), tapering up to a dark gallery and the lantern — its glass
// dark: the light is out — under a black cap; a door at its foot facing the landing, two small windows up the tower,
// weather streaks down the whitewash. Its painting is the tower unrolled: the way round (its front in the middle) by
// the profile's length, top down.
const P = e.lib.TOWER, W = e.lib.TOWER_ROUND, L = P.len, y = h => -L + P.at(h);
g.fillStyle = "#f2efe9";
g.fillRect(-W / 2, -L, W, L);
// the whitewash's streaks and the damp near the foot
for (let i = 0; i < 70; i++) {
  const x = (e.rnd() - 0.5) * W, top = y(10.5 - e.rnd() * 9), len = 0.6 + e.rnd() * 3;
  g.fillStyle = `rgba(150, 146, 140, ${0.08 + e.rnd() * 0.12})`;
  g.fillRect(x, top, 0.04 + e.rnd() * 0.08, len);
}
const damp = g.createLinearGradient(0, y(1.6), 0, y(0));
damp.addColorStop(0, "rgba(160, 150, 140, 0)");
damp.addColorStop(1, "rgba(150, 132, 122, 0.55)");
g.fillStyle = damp;
g.fillRect(-W / 2, y(1.6), W, y(0) - y(1.6));
// the plinth: granite blocks
g.fillStyle = "#c9a097";
g.fillRect(-W / 2, y(0.42), W, y(0) - y(0.42));
g.strokeStyle = "rgba(110, 82, 78, 0.6)";
g.lineWidth = 0.03;
for (let x = -W / 2; x < W / 2; x += 0.7) {
  g.beginPath();
  g.moveTo(x, y(0.42));
  g.lineTo(x, y(0));
  g.stroke();
}
// the gallery's parapet, the lantern's glass and its bars, the cap
g.fillStyle = "#2d3034";
g.fillRect(-W / 2, y(11.95), W, y(11.15) - y(11.95));
g.fillStyle = "#3b4651";
g.fillRect(-W / 2, y(13.3), W, y(11.95) - y(13.3));
const glint = g.createLinearGradient(-W / 2, 0, W / 2, 0);
glint.addColorStop(0, "rgba(190, 206, 220, 0)");
glint.addColorStop(0.38, "rgba(190, 206, 220, 0.4)");
glint.addColorStop(0.46, "rgba(190, 206, 220, 0)");
glint.addColorStop(1, "rgba(190, 206, 220, 0)");
g.fillStyle = glint;
g.fillRect(-W / 2, y(13.3), W, y(11.95) - y(13.3));
g.fillStyle = "#1f2226";
for (let x = -W / 2; x < W / 2; x += W / 10) g.fillRect(x - 0.05, y(13.3), 0.1, y(11.95) - y(13.3));
g.fillRect(-W / 2, y(12.65) - 0.04, W, 0.08);
g.fillStyle = "#26252a";
g.fillRect(-W / 2, -L, W, y(13.3) + L);
// the door: dark red-brown boards in an arch, an iron ring; the windows
g.fillStyle = "#6e3c33";
g.beginPath();
g.moveTo(-0.5, y(0.42));
g.lineTo(-0.5, y(1.75));
g.arc(0, y(1.75), 0.5, Math.PI, 0);
g.lineTo(0.5, y(0.42));
g.closePath();
g.fill();
g.strokeStyle = "rgba(40, 22, 20, 0.6)";
g.lineWidth = 0.03;
for (const x of [-0.25, 0, 0.25]) {
  g.beginPath();
  g.moveTo(x, y(0.45));
  g.lineTo(x, y(2.15));
  g.stroke();
}
g.strokeStyle = "#2a2626";
g.lineWidth = 0.035;
g.beginPath();
g.arc(0.3, y(1.25), 0.07, 0, Math.PI * 2);
g.stroke();
for (const h of [5.2, 8.6]) {
  g.fillStyle = "#3a434c";
  g.fillRect(-0.22, y(h + 0.7), 0.44, 0.7);
  g.fillStyle = "#8a7e74";
  g.fillRect(-0.28, y(h) - 0.06, 0.56, 0.08);
}
e.at(0, y(1.2), "door");
e.at(0, y(12.6), "lantern");
e.form(e.kit.revolve(P.profile), { closed: "u", ground: "#f2efe9" });
