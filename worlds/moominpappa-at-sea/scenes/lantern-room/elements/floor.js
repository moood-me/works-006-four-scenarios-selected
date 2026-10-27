// The lantern room's floor from above (x across, y toward the viewer; its centre the lamp's): broad grey-painted
// boards inside the ten sides, worn pale in a ring round the lamp where the keeper walked, a dark ring of old oil by
// the barrel; the hatch an open square (the stair goes down through it), its lid laid back open on the boards.
const L = e.lib, poly = new Path2D();
for (let i = 0; i <= 10; i++) {
  const t = (i * L.SIDE + 18) * L.DEG;
  const x = L.R * Math.sin(t), y = -L.R * Math.cos(t);
  if (i === 0) poly.moveTo(x, y);
  else poly.lineTo(x, y);
}
const ha = L.HATCH.a - L.C[0], hy = L.C[1] - L.HATCH.d, hh = L.HATCH.half;
poly.rect(ha - hh, hy - hh, 2 * hh, 2 * hh);
g.save();
g.clip(poly, "evenodd");
g.fillStyle = "#9a958c";
g.fillRect(-L.R, -L.R, 2 * L.R, 2 * L.R);
for (let x = -L.R; x < L.R; x += 0.2) {
  g.fillStyle = e.rnd() < 0.5 ? "rgba(70, 64, 58, 0.12)" : "rgba(230, 226, 216, 0.1)";
  g.fillRect(x, -L.R, 0.2, 2 * L.R);
  g.fillStyle = "rgba(50, 46, 42, 0.45)";
  g.fillRect(x, -L.R, 0.01, 2 * L.R);
}
const worn = g.createRadialGradient(0, 0, 0.5, 0, 0, 1.2);
worn.addColorStop(0, "rgba(220, 214, 200, 0)");
worn.addColorStop(0.6, "rgba(220, 214, 200, 0.28)");
worn.addColorStop(1, "rgba(220, 214, 200, 0)");
g.fillStyle = worn;
g.fillRect(-L.R, -L.R, 2 * L.R, 2 * L.R);
const [ba, bd] = L.at(-100, 2.2);
g.strokeStyle = "rgba(60, 46, 30, 0.45)";
g.lineWidth = 0.05;
g.beginPath();
g.ellipse(ba - L.C[0], L.C[1] - bd, 0.36, 0.33, 0, 0, Math.PI * 2);
g.stroke();
g.restore();
// the hatch's frame, and its lid laid back open toward the viewer
g.strokeStyle = "#4a3e34";
g.lineWidth = 0.05;
g.strokeRect(ha - hh, hy - hh, 2 * hh, 2 * hh);
g.fillStyle = "#857a6c";
g.fillRect(ha - hh, hy + hh + 0.03, 2 * hh, 2 * hh - 0.05);
g.fillStyle = "rgba(40, 34, 30, 0.5)";
for (const x of [ha - hh + 0.12, ha + hh - 0.16]) g.fillRect(x, hy + hh + 0.06, 0.04, 2 * hh - 0.12);
