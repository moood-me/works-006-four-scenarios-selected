// The doorway as seen from the room: its casing of white-painted boards round the arched opening, flush on the wall's
// face (the opening itself is clear: the leaf, the reveal, the threshold and the step outside are their own). Its
// points: the door (where a hand holds it), its threshold.
const L = e.lib, b = 0.1;
g.fillStyle = "#e4e1da";
g.beginPath();
L.arch(g, b);
g.lineTo(L.DOOR.half, 0);
L.arch(g, 0);
g.fill("evenodd");
g.strokeStyle = "rgba(110, 104, 96, 0.55)";
g.lineWidth = 0.008;
for (const out of [0, b]) {
  g.beginPath();
  L.arch(g, out);
  g.stroke();
}
e.at(0, -1.0, "door");
e.at(0, -0.02, "threshold");
