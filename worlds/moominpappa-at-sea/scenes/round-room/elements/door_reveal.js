// The doorway's reveal through the wall's thickness — up one jamb, round the arch's underside, down the other — one
// form carried from the room's face out to the step (kit.extrude: the arch's section along the way out). Its painting
// is that section unrolled (x along it, from the right jamb's foot) by the way through the wall (y): whitewash over the
// dado at the jambs' feet, scuffed grey low down where boots and baskets knock it.
const L = e.lib, w = L.DOOR.half, s = L.DOOR.spring, d = L.DOOR.deep;
const profile = [[w, 0], [w, s]];
for (let i = 1; i < 12; i++) {
  const a = (i / 12) * Math.PI;
  profile.push([w * Math.cos(a), s + w * Math.sin(a)]);
}
profile.push([-w, s], [-w, 0]);
const len = 2 * s + Math.PI * w;
g.fillStyle = "#e6e0d3";
g.fillRect(-len / 2, -d, len, d);
g.fillStyle = "#93a7ad";
g.fillRect(-len / 2, -d, L.DADO, d);
g.fillRect(len / 2 - L.DADO, -d, L.DADO, d);
g.fillStyle = "rgba(120, 112, 100, 0.25)";
g.fillRect(-len / 2, -d, 0.3, d);
g.fillRect(len / 2 - 0.3, -d, 0.3, d);
const cold = g.createLinearGradient(0, 0, 0, -d);
cold.addColorStop(0, "rgba(150, 160, 170, 0)");
cold.addColorStop(1, "rgba(150, 160, 170, 0.3)");
g.fillStyle = cold;
g.fillRect(-len / 2, -d, len, d);
e.form(e.kit.extrude(profile, [[0, 0, 0], [0, 0, -d]]), { ground: "#e6e0d3" });
