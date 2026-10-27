// The round wall from the near left round to the window (a bent sheet of the room's circle, its painting the wall
// unrolled, left to right as seen from inside): whitewash over a blue-grey dado. Under the stair's top, the keeper's
// wall — years of his pencil lines, each signed with a small knot — and across "Nobody again" Moominpappa's log
// (`log`, `log_depth`). Low on the dado the oldest lines, under dust (`line27`: the one of the 27th of August, and the
// next). Between them and the window, over the table, Moominmamma's garden (`garden` −1 bare … 4, in her `paints`;
// `apple_leaves`, `clouds`; little Papa at the gate while the garden is at 1 or less).
const L = e.lib, S = e.state, { mid: MID, width: W, bend } = L.WALLS.a, H = L.H, x = t => L.wallX(t, MID);
L.whitewash(g, e, -W / 2, W / 2, 0, H);
const pencil = "rgba(70, 66, 70, 0.85)", size = 0.055;
const sign = (tx, ty, w) => {
  g.strokeStyle = pencil;
  g.lineWidth = 0.004;
  L.knot(g, tx + w + 0.06, ty - size * 0.3, 0.018);
};

// the oldest lines low on the dado under the stair; among them the 27th of August's and, under it, the next
const low = [[-58, 0.62, 0.6], [-56, 0.3, 0.8], [-52, 0.74, 0.5], [-30, 0.62, 0.7], [-27, 0.34, 0.6], [-24, 0.7, 0.5], [-29, 0.22, 0.5]];
for (const [t, h, len] of low) {
  L.scribble(g, e, x(t), -h, len, size, pencil);
  sign(x(t), -h, len);
}
const line27 = [x(-50), -0.44], next = [x(-50), -0.27];
sign(line27[0], line27[1], L.write(g, tr("27 August. Wind north. Today I am forty. Nobody knows."), line27[0], line27[1], 0.05, pencil, -0.005));
sign(next[0], next[1], L.write(g, tr("Ate bread. Whose, I don't know."), next[0], next[1], 0.05, pencil, 0.004));
// the dust over them, but where a paw or a finger has wiped it: the line (clean), and the next (next), or a finger's
// stripe under the line (stripe)
const wiped = S.line27 ?? "dust", d0 = x(-62), d1 = x(-20);
g.save();
g.beginPath();
g.rect(d0, -0.85, d1 - d0, 0.85);
if (wiped !== "dust") g.rect(line27[0] - 0.08, line27[1] - 0.075, 1.25, 0.11);
if (wiped === "next") g.rect(next[0] - 0.08, next[1] - 0.075, 0.82, 0.11);
if (wiped === "stripe") g.rect(line27[0] + 0.1, line27[1] + 0.05, 1.6, 0.035);
g.clip("evenodd");
const film = g.createLinearGradient(d0, 0, d1, 0);
film.addColorStop(0, "rgba(186, 182, 168, 0)");
film.addColorStop(0.15, "rgba(186, 182, 168, 0.5)");
film.addColorStop(0.85, "rgba(186, 182, 168, 0.5)");
film.addColorStop(1, "rgba(186, 182, 168, 0)");
g.fillStyle = film;
g.fillRect(d0, -0.85, d1 - d0, 0.85);
for (let i = 0; i < 90; i++) {
  const px = d0 + e.rnd() * (d1 - d0), py = -e.rnd() * 0.85, r = 0.05 + e.rnd() * 0.18;
  const s = g.createRadialGradient(px, py, 0, px, py, r);
  s.addColorStop(0, `rgba(170, 164, 150, ${0.15 + e.rnd() * 0.2})`);
  s.addColorStop(1, "rgba(170, 164, 150, 0)");
  g.fillStyle = s;
  g.fillRect(px - r, py - r, 2 * r, 2 * r);
}
g.restore();

// the keeper's lines over the dado, under the stair's top: [angle, height, legible text or null (a scribble so long)]
const lines = [
  [-39, 2.4, null, 0.4], [-34, 2.4, null, 0.55], [-38, 2.18, tr("Calm. The sea is good today."), 0],
  [-40, 1.96, tr("Ice on the steps. Wind north."), 0], [-40, 1.74, tr("Fog. Heard a ship. It did not come."), 0],
  [-40, 1.52, tr("Wind south-west. Nobody again."), 0],
];
for (const [t, h, text, len] of lines) {
  const tx = x(t), ty = -h;
  sign(tx, ty, text ? L.write(g, text, tx, ty, size, pencil, -0.01) : (L.scribble(g, e, tx, ty, len, size, pencil), len));
}
// Moominpappa's log, written standing, high and big, across "Nobody again" and under it
const ink = "rgba(24, 24, 34, 1)", log = S.log ?? 0;
if (log >= 1) L.write(g, tr("23 August. Arrived."), x(-41), -1.5, 0.11, ink, -0.04);
if (S.log_depth) L.write(g, tr("Depth: more than the rope."), x(-41), -1.3, 0.085, ink, -0.03);
if (log >= 2) L.write(g, tr("27 August. Calm."), x(-40), -1.13, 0.095, ink, -0.02);

// Moominmamma's garden: from the dado's top (its ground) up toward the ceiling, the gate and fence at its left, the
// apple tree, the stream, the family as she paints them, the veranda under the shelf
const n = S.garden ?? -1;
if (n >= 0) {
  const P = L.PAINTS[S.paints] ?? L.PAINTS.green, G = -1.0, sketch = "rgba(70, 66, 70, 0.55)";
  const wash = (fill, k) => { g.globalAlpha = k; g.fillStyle = fill; };
  const full = n >= 1 ? 1 : 0.45;
  // the sky she lays behind it all once it is whole
  if (n >= 4) {
    const s = g.createLinearGradient(0, -2.9, 0, G);
    s.addColorStop(0, "rgba(255, 255, 255, 0)");
    s.addColorStop(0.5, P.sky);
    s.addColorStop(1, P.sky);
    g.globalAlpha = 0.55;
    g.fillStyle = s;
    g.beginPath();
    g.ellipse(x(-5), -1.9, 1.15, 0.95, 0, 0, Math.PI * 2);
    g.fill();
    g.globalAlpha = 1;
  }
  if (S.clouds) {
    for (const [t, h, r] of [[-17, 2.95, 0.16], [-13, 3.02, 0.2], [-9, 2.93, 0.14], [-5, 3.05, 0.12]]) {
      g.fillStyle = "#f4f6fa";
      g.strokeStyle = sketch;
      g.lineWidth = 0.006;
      g.beginPath();
      g.ellipse(x(t), -h, r * 1.6, r * 0.7, 0, 0, Math.PI * 2);
      g.fill();
      g.stroke();
    }
  }
  // the grass: a wavy strip along the ground
  g.beginPath();
  g.moveTo(x(-22), G);
  for (let t = -22; t <= 12; t += 1) g.lineTo(x(t), G - 0.1 - 0.03 * Math.sin(t * 1.3));
  g.lineTo(x(12), G);
  g.closePath();
  wash(P.grass, n >= 1 ? 0.9 : 0.35);
  g.fill();
  g.globalAlpha = 1;
  g.strokeStyle = sketch;
  g.lineWidth = 0.006;
  g.stroke();
  // the path from the gate to the veranda's steps
  if (n >= 2) {
    g.fillStyle = P.path;
    g.beginPath();
    g.moveTo(x(-19), G);
    g.quadraticCurveTo(x(-8), G - 0.12, x(2), G - 0.04);
    g.lineTo(x(2), G);
    g.closePath();
    g.fill();
  }
  // the stream, winding along the bottom
  g.strokeStyle = n >= 2 ? P.water : sketch;
  g.lineWidth = n >= 2 ? 0.045 : 0.008;
  g.beginPath();
  g.moveTo(x(-9), G - 0.02);
  g.bezierCurveTo(x(-5), G - 0.09, x(-2), G + 0.0, x(1), G - 0.05);
  g.stroke();
  // bushes
  if (n >= 2) {
    for (const [t, r] of [[-21, 0.13], [11, 0.15], [-6.5, 0.09]]) {
      g.fillStyle = P.leafDark;
      g.beginPath();
      g.ellipse(x(t), G - r * 0.7, r, r * 0.75, 0, 0, Math.PI * 2);
      g.fill();
    }
  }
  // the apple tree: trunk, branches, the crown (its top without its last leaves, if so)
  const tx = x(-13), cy = -2.2;
  g.strokeStyle = P.trunk;
  g.lineCap = "round";
  g.lineWidth = 0.07;
  g.beginPath();
  g.moveTo(tx, G - 0.05);
  g.quadraticCurveTo(tx - 0.03, -1.4, tx + 0.02, -1.75);
  g.stroke();
  g.lineWidth = 0.03;
  for (const [dx, dy] of [[-0.42, -2.35], [0.38, -2.4], [-0.15, -2.62], [0.2, -2.58], [0.5, -2.1], [-0.5, -2.05]]) {
    g.beginPath();
    g.moveTo(tx + 0.02, -1.75);
    g.quadraticCurveTo(tx + dx * 0.4, cy + 0.1, tx + dx, dy);
    g.stroke();
  }
  const leaves = S.apple_leaves ?? true;
  g.save();
  g.beginPath();
  g.ellipse(tx, cy, 0.62, 0.48, 0, 0, Math.PI * 2);
  g.clip();
  for (let i = 0; i < 70; i++) {
    const a = e.rnd() * Math.PI * 2, r = Math.sqrt(e.rnd()), px = tx + Math.cos(a) * r * 0.6, py = cy + Math.sin(a) * r * 0.46;
    if (!leaves && py < cy - 0.18) continue;
    if (n < 1 && i % 2) continue;
    wash(i % 3 ? P.leaf : P.leafDark, full);
    g.beginPath();
    g.ellipse(px, py, 0.09, 0.06, a, 0, Math.PI * 2);
    g.fill();
  }
  g.restore();
  g.globalAlpha = 1;
  g.strokeStyle = sketch;
  g.lineWidth = 0.006;
  g.beginPath();
  g.ellipse(tx, cy, 0.62, 0.48, 0, 0, Math.PI * 2);
  g.stroke();
  if (n >= 3) {
    g.fillStyle = P.apple;
    for (const [dx, dy] of [[-0.3, 0.1], [0.2, 0.18], [0.35, -0.05], [-0.1, 0.25], [0.05, -0.1], [-0.4, -0.08]]) {
      if (!leaves && dy < -0.18) continue;
      g.beginPath();
      g.arc(tx + dx, cy + dy, 0.035, 0, Math.PI * 2);
      g.fill();
    }
  }
  // the gate in its bit of fence, left; little Papa standing at it while the garden is small
  g.strokeStyle = n >= 1 ? P.trunk : sketch;
  g.lineWidth = 0.02;
  for (let t = -22; t <= -16; t += 1) {
    if (t === -20 || t === -19) continue;
    g.beginPath();
    g.moveTo(x(t), G);
    g.lineTo(x(t), G - 0.32);
    g.stroke();
  }
  g.beginPath();
  g.moveTo(x(-22), G - 0.22);
  g.lineTo(x(-20.6), G - 0.22);
  g.moveTo(x(-18.4), G - 0.22);
  g.lineTo(x(-16), G - 0.22);
  g.stroke();
  const gx0 = x(-20.4), gx1 = x(-18.6);
  g.strokeStyle = n >= 1 ? P.house : sketch;
  g.lineWidth = 0.018;
  g.strokeRect(gx0, G - 0.4, gx1 - gx0, 0.38);
  g.beginPath();
  g.moveTo(gx0, G - 0.02);
  g.lineTo(gx1, G - 0.4);
  g.stroke();
  e.at((gx0 + gx1) / 2, G - 0.22, "gate");
  if (n <= 1) L.moomin(g, x(-23.6), G - 0.02, 0.3, { hat: true });
  // the veranda: the blue house's corner, its posts, the steps, the roof — under the shelf
  const v0 = x(1.5), v1 = x(10.5);
  wash(P.house, full);
  g.fillRect(v0 + 0.2, G - 0.62, v1 - v0 - 0.2, 0.62);
  wash(P.roof, full);
  g.beginPath();
  g.moveTo(v0 - 0.05, G - 0.6);
  g.lineTo(v1 + 0.05, G - 0.6);
  g.lineTo(v1 - 0.1, G - 0.78);
  g.lineTo(v0 + 0.15, G - 0.78);
  g.closePath();
  g.fill();
  g.globalAlpha = 1;
  g.strokeStyle = sketch;
  g.lineWidth = 0.006;
  g.strokeRect(v0 + 0.2, G - 0.62, v1 - v0 - 0.2, 0.62);
  g.strokeStyle = "#efe8dc";
  g.lineWidth = 0.025;
  for (let i = 0; i < 4; i++) {
    const px = v0 + 0.1 + (i * (v1 - v0 - 0.2)) / 3;
    g.beginPath();
    g.moveTo(px, G);
    g.lineTo(px, G - 0.6);
    g.stroke();
  }
  g.beginPath();
  g.moveTo(v0 + 0.1, G - 0.3);
  g.lineTo(v1 - 0.1, G - 0.3);
  g.stroke();
  if (n >= 1) {
    g.fillStyle = "#f2e7a0";
    g.fillRect(x(6), G - 0.48, 0.12, 0.12);
  }
  // the family as she paints them: the boy, Little My, herself with her basket
  L.moomin(g, x(-6), G - 0.03, 0.27, {});
  L.myFigure(g, x(-3.6), G - 0.03, 0.17);
  L.moomin(g, x(-1), G - 0.03, 0.28, { apron: "#b8473a", basket: true, flip: true });
  // flowers along the ground, more as the garden grows; at nothing yet — two stems pencilled in
  const spots = [-17, -9, 4, -21.5, -15, -7.5, 0, 11, -11, 3, 8, -17.8, -12.4, -4.6, 9.5, -20.6, -14, -2.3, 6, 10.8];
  const many = [2, 4, 8, 13, 20][n];
  for (let i = 0; i < many; i++) {
    const t = spots[i], h = 0.1 + ((i * 37) % 7) * 0.012;
    L.flower(g, x(t), G - 0.06, h, ((i % 3) - 1) * 0.02, n === 0 ? null : P.petals[i % 4], P.heart, n === 0 ? sketch : P.leaf);
  }
  e.at(x(-8), -1.6, "garden");
  e.at(tx, cy, "apple");
}
e.at(line27[0] + 0.55, line27[1] - 0.02, "line27");
e.at(x(-37), -1.55, "nobody");
e.at(x(-33), -1.52, "log");
e.at(x(-33), -1.98, "keeper");
e.form(e.kit.bend(W, H, bend), { ground: "#ece6d9" });
