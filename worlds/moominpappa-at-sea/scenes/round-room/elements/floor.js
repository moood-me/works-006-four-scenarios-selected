// The floor from above (the plane's metres: x across, y toward the viewer; its centre the room's middle): broad
// scrubbed pine boards running from the door to the window, a little grey with salt, the room's circle their edge; a
// striped rag rug under the table that Moominmamma has already laid down.
const L = e.lib, R = L.R + 0.05;
g.save();
g.beginPath();
g.arc(0, 0, R, 0, Math.PI * 2);
g.clip();
g.fillStyle = "#a88e72";
g.fillRect(-R, -R, 2 * R, 2 * R);
const bw = 0.24;
for (let x = -R; x < R; x += bw) {
  const k = e.rnd();
  g.fillStyle = k < 0.33 ? "rgba(90, 70, 52, 0.18)" : k < 0.66 ? "rgba(236, 222, 200, 0.16)" : "rgba(150, 140, 130, 0.14)";
  g.fillRect(x, -R, bw, 2 * R);
  g.fillStyle = "rgba(60, 46, 36, 0.55)";
  g.fillRect(x, -R, 0.012, 2 * R);
  // the boards' butt joints and nails
  let y = -R + e.rnd() * 2;
  while (y < R) {
    g.fillRect(x, y, bw, 0.01);
    g.fillStyle = "rgba(50, 44, 40, 0.6)";
    g.fillRect(x + 0.04, y + 0.03, 0.012, 0.012);
    g.fillRect(x + bw - 0.06, y + 0.03, 0.012, 0.012);
    g.fillStyle = "rgba(60, 46, 36, 0.55)";
    y += 1.4 + e.rnd() * 1.8;
  }
}
// the grain: long faint streaks along the boards
g.strokeStyle = "rgba(96, 74, 56, 0.16)";
g.lineWidth = 0.006;
for (let i = 0; i < 260; i++) {
  const x = -R + e.rnd() * 2 * R, y = -R + e.rnd() * 2 * R;
  g.beginPath();
  g.moveTo(x, y);
  g.quadraticCurveTo(x + (e.rnd() - 0.5) * 0.03, y + 0.3, x + (e.rnd() - 0.5) * 0.02, y + 0.6 + e.rnd() * 0.6);
  g.stroke();
}
// sand blown in along the wall
const sand = g.createRadialGradient(0, 0, R - 0.5, 0, 0, R);
sand.addColorStop(0, "rgba(200, 186, 160, 0)");
sand.addColorStop(1, "rgba(200, 186, 160, 0.35)");
g.fillStyle = sand;
g.fillRect(-R, -R, 2 * R, 2 * R);
g.restore();
// the rag rug: an oval of plaited stripes, red, ochre, blue, cream
const rx = 0.02, ry = 3.8 - 4.45;
const stripes = ["#b5503f", "#d8b46a", "#6e8aa6", "#e8dcc6", "#b5503f", "#8f6a4a", "#d8b46a", "#6e8aa6"];
for (let i = 0; i < stripes.length; i++) {
  const k = 1 - i / stripes.length;
  g.fillStyle = stripes[i];
  g.beginPath();
  g.ellipse(rx, ry, 1.35 * k, 0.85 * k, 0, 0, Math.PI * 2);
  g.fill();
}
