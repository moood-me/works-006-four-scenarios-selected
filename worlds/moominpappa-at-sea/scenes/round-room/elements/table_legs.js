// What holds the table up: an apron board under the top's front edge and four square legs, each a part at its own
// depth (the anchor is the table's middle on the floor; the top is 0.72 m up).
const w = 1.5, d = 0.8, top = 0.72, leg = 0.07;
const legAt = (dx, dz) => e.part(dx, dz, p => {
  p.fillStyle = "#9c7d5a";
  p.fillRect(-leg / 2, -top + 0.04, leg, top - 0.04);
  p.fillStyle = "rgba(60, 42, 30, 0.35)";
  p.fillRect(leg / 6, -top + 0.04, leg / 3, top - 0.04);
}, [-leg, -top, leg, 0.02]);
legAt(-w / 2 + 0.1, -d / 2 + 0.1);
legAt(w / 2 - 0.1, -d / 2 + 0.1);
legAt(-w / 2 + 0.1, d / 2 - 0.1);
legAt(w / 2 - 0.1, d / 2 - 0.1);
e.part(0, -d / 2 + 0.02, p => {
  p.fillStyle = "#b08f68";
  p.fillRect(-w / 2, -top, w, 0.1);
  p.fillStyle = "rgba(60, 42, 30, 0.45)";
  p.fillRect(-w / 2, -top + 0.09, w, 0.012);
}, [-w / 2 - 0.02, -top - 0.02, w / 2 + 0.02, -top + 0.12]);
