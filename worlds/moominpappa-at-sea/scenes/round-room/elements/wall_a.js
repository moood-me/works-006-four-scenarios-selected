// The round wall from the near left round to the window (a bent sheet of the room's circle, its painting the wall
// unrolled, left to right as seen from inside): whitewash over a blue-grey dado; behind the table the keeper's wall —
// years of his pencil lines, each signed with a small knot, the lowest by the floor faint under dust — and across one
// of them Moominpappa's own first line, big and new.
const L = e.lib, { mid: MID, width: W, bend } = L.WALLS.a, H = L.H, x = t => L.wallX(t, MID);
L.whitewash(g, e, -W / 2, W / 2, 0, H);
// the keeper's lines: [angle, height, legible text or null (a scribble of so many metres)]
const pencil = "rgba(70, 66, 70, 0.85)";
const write = (text, tx, ty, size, color, slant) => {
  g.save();
  g.translate(tx, ty);
  g.rotate(slant);
  g.scale(0.01, 0.01);
  g.fillStyle = color;
  g.font = `italic ${Math.round(size * 100)}px Georgia, serif`;
  g.fillText(text, 0, 0);
  const w = g.measureText(text).width * 0.01;
  g.restore();
  return w;
};
const scribble = (tx, ty, len, size) => {
  g.strokeStyle = pencil;
  g.lineWidth = size * 0.09;
  g.beginPath();
  g.moveTo(tx, ty);
  let px = tx;
  while (px < tx + len) {
    const step = size * (0.25 + e.rnd() * 0.35);
    g.quadraticCurveTo(px + step * 0.5, ty - size * (0.3 + e.rnd() * 0.5), px + step, ty - (e.rnd() < 0.2 ? size * 0.45 : 0));
    px += step;
    if (e.rnd() < 0.18) {
      px += size * 0.35;
      g.moveTo(px, ty);
    }
  }
  g.stroke();
};
const said = {
  sw: tr("Wind south-west. Nobody again."),
  fog: tr("Fog. Heard a ship. It did not come."),
  ice: tr("Ice on the steps. Wind north."),
  calm: tr("Calm. The sea is good today."),
};
const lines = [
  [-39, 2.45, null, 0.9], [-38, 2.22, said.ice, 0], [-39, 1.98, null, 1.1], [-37, 1.74, null, 0.7], [-38.5, 1.5, null, 1.0],
  [-36, 1.27, null, 0.8], [-31, 2.5, null, 0.8], [-30, 2.28, null, 1.0], [-29, 2.06, said.fog, 0], [-31, 1.62, null, 0.9],
  [-29.5, 1.38, null, 1.1], [-22, 2.42, null, 0.9], [-21, 2.18, null, 0.7], [-23, 1.52, said.sw, 0], [-21, 1.28, null, 0.9],
  [-13, 2.35, null, 1.0], [-12, 2.1, said.calm, 0], [-13.5, 1.86, null, 0.8], [-12, 1.6, null, 1.0], [-11, 1.36, null, 0.7],
  [-5, 2.4, null, 0.8], [-4, 2.15, null, 1.0], [-5.5, 1.9, null, 0.7], [-3, 1.66, null, 0.9], [-4, 1.4, null, 0.8],
];
const size = 0.055;
for (const [t, h, text, len] of lines) {
  const tx = x(t), ty = -h, w = text ? write(text, tx, ty, size, pencil, -0.01) : (scribble(tx, ty, len, size), len);
  g.strokeStyle = pencil;
  g.lineWidth = 0.004;
  L.knot(g, tx + w + 0.06, ty - size * 0.3, 0.018);
}
// the oldest lines, low on the dado, half lost under the dust
for (let i = 0; i < 9; i++) {
  const t = -38 + i * 4.3 + e.rnd() * 1.5, h = 0.35 + (i % 3) * 0.17;
  g.globalAlpha = 0.45;
  scribble(x(t), -h, 0.5 + e.rnd() * 0.5, size);
  g.strokeStyle = pencil;
  g.lineWidth = 0.004;
  L.knot(g, x(t) + 1.05, -h - 0.02, 0.016);
  g.globalAlpha = 1;
}
// Moominpappa's first line of his log, written standing, high and big, straight across "Nobody again"
write(tr("23 August. Arrived."), x(-25), -1.56, 0.15, "rgba(24, 24, 34, 1)", -0.04);
e.at(x(-23), -1.55, "nobody");
e.at(x(-20), -1.62, "log");
e.at(x(-12), -2.1, "keeper");
e.form(e.kit.bend(W, H, bend), { ground: "#ece6d9" });
