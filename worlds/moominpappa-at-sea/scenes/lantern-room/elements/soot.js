// The solid side nearest the burner: boards blackened by years of soot, thickest at the burner's height toward the lamp.
// Under the soot the keeper wrote in pencil how to light the lamp; in the day's light only the grooves under a finger —
// in a light held slanting to the wall the writing comes up (a layer as legible as `slant`, by animate). Its point: the
// grooves.
const L = e.lib, w = L.WS / 2;
L.boards(g, e, -w, w, 0, L.H);
g.fillStyle = "#3c4f4b";
g.fillRect(-w, -L.H, 0.05, L.H);
g.fillRect(w - 0.05, -L.H, 0.05, L.H);
// the soot: one soft cloud fanning up from the burner's height on the lamp's side to the top, darkest low by the lamp,
// a few faint streaks where it ran
g.save();
g.beginPath();
g.rect(-w, -L.H, 2 * w, L.H);
g.clip();
for (let i = 0; i < 9; i++) {
  const k = i / 8, x = w * (0.45 - 0.3 * k) + (e.rnd() - 0.5) * 0.2, y = -1.2 - 1.2 * k, r = 0.35 + 0.4 * k;
  const s = g.createRadialGradient(x, y, 0, x, y, r);
  s.addColorStop(0, `rgba(34, 31, 30, ${0.5 - 0.2 * k})`);
  s.addColorStop(1, "rgba(34, 31, 30, 0)");
  g.fillStyle = s;
  g.fillRect(x - r, y - r, 2 * r, 2 * r);
}
g.strokeStyle = "rgba(30, 28, 28, 0.14)";
g.lineWidth = 0.02;
for (let i = 0; i < 12; i++) {
  const x = -w * 0.2 + e.rnd() * w, y = -L.H + 0.05 + e.rnd() * 0.5;
  g.beginPath();
  g.moveTo(x, y);
  g.lineTo(x + (e.rnd() - 0.5) * 0.04, y + 0.5 + e.rnd() * 0.6);
  g.stroke();
}
g.restore();
e.layer("grooves", {}, c => {
  const pale = "rgba(214, 208, 196, 0.92)";
  const x0 = -w + 0.12, width = 2 * w - 0.24;
  const n = L.writeWrapped(c, tr("In a wind, warm the burner with paraffin till the flame goes blue. Do not let go before."), x0, -2.05, 0.05, width, 0.075, pale);
  L.writeWrapped(c, tr("The oil is thick: warm it in a pot on the stove, carry it up wrapped. On a still evening warm oil runs by itself; in a wind, only with paraffin."), x0, -2.05 + n * 0.075 + 0.1, 0.05, width, 0.075, pale);
});
e.at(0, -1.75, "grooves");
