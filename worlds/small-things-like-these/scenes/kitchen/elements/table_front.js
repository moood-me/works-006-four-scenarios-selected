// The table seen from the front (its near edge 4.175 m ahead; x −0.82…0.82): the oilcloth's hanging edge, the apron
// rail, two front legs; the two back legs a part 0.85 m farther.
const legs = (c) => {
  c.fillStyle = "#5a4330";
  c.fillRect(-0.76, -0.7, 0.06, 0.7);
  c.fillRect(0.7, -0.7, 0.06, 0.7);
};
e.part(0, 0.85, legs, [-0.8, -0.72, 0.8, 0.02]);
legs(g);
g.fillStyle = "#4e3a2a";
g.fillRect(-0.78, -0.7, 1.56, 0.08);
g.fillStyle = "#efe6d2";
g.fillRect(-0.82, -0.78, 1.64, 0.1);
g.fillStyle = "rgba(178, 74, 62, 0.28)";
for (let x = -0.82; x < 0.82; x += 0.06) g.fillRect(x, -0.78, 0.03, 0.1);
g.fillRect(-0.82, -0.72, 1.64, 0.03);
