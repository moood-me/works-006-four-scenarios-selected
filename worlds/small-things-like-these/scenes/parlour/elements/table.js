// The round tea table under its white cloth, as a form turned on a lathe (kit.revolve): the cloth from the top's
// edge (0.77 m) falling straight to its lace hem at 0.5 m, the table's dark underside, the mahogany pedestal and its
// spread foot. Its painting is the way round (u, about 2.9 m) by the profile's length (v): bands at the profile's own
// lengths — the cloth, its lace border at the hem, the underside, the wood. The top is `table_top`.
const P = [[0.44, 0.768], [0.46, 0.75], [0.465, 0.52], [0.44, 0.5], [0.075, 0.49], [0.05, 0.2], [0.06, 0.12], [0.22, 0.04], [0.22, 0]];
const len = [0];
for (let i = 1; i < P.length; i++) len.push(len[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
const [l, t, rr, b] = e.area;
const yAt = (i) => t + (len[i] / len[len.length - 1]) * (b - t);
const w = rr - l;
const r = e.lib.stream(61);
// the cloth
g.fillStyle = "#f1ede2";
g.fillRect(l, t, w, yAt(3) - t);
// its folds falling from the edge, faint
for (let x = l; x < rr; x += 0.09) {
  g.fillStyle = r() < 0.5 ? "rgba(150, 140, 120, 0.12)" : "rgba(255, 255, 255, 0.2)";
  g.fillRect(x, yAt(1), 0.03, yAt(3) - yAt(1));
}
// the lace border along the hem: a band of open rounds and the scalloped edge
const lace0 = yAt(2) - 0.09;
g.fillStyle = "rgba(170, 160, 140, 0.55)";
for (let x = l + 0.02; x < rr; x += 0.05) {
  g.beginPath();
  g.arc(x, lace0 + 0.035, 0.014, 0, 6.3);
  g.fill();
}
for (let x = l; x < rr; x += 0.05) {
  g.beginPath();
  g.arc(x + 0.025, yAt(2) - 0.01, 0.018, 0, 6.3);
  g.fill();
}
g.fillRect(l, lace0, w, 0.006);
// the underside, in the cloth's own shadow
g.fillStyle = "#3a2a22";
g.fillRect(l, yAt(3), w, yAt(4) - yAt(3));
// the pedestal and its foot: mahogany, a lighter bead at the foot's top
g.fillStyle = e.lib.MAHOGANY;
g.fillRect(l, yAt(4), w, b - yAt(4));
g.fillStyle = "#7a4630";
g.fillRect(l, yAt(6) - 0.015, w, 0.03);
e.form(e.kit.revolve(P), { closed: "u" });
