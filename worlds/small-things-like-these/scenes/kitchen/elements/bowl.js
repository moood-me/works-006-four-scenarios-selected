// The mixing bowl (x −0.2…0.2, 0.17 m high): cream earthenware with a blue band, the cake's batter inside, raisins and
// cherries in it; the point `mix` at its rim — where the hands go.
g.fillStyle = "#e8dcc0";
g.beginPath();
g.moveTo(-0.19, -0.15);
g.quadraticCurveTo(-0.17, 0, 0, 0);
g.quadraticCurveTo(0.17, 0, 0.19, -0.15);
g.closePath();
g.fill();
g.fillStyle = "#5d7aa6";
g.fillRect(-0.185, -0.13, 0.37, 0.02);
g.fillStyle = "#d9b98a";
g.beginPath();
g.ellipse(0, -0.15, 0.19, 0.035, 0, 0, 6.3);
g.fill();
g.fillStyle = "#3a2420";
for (const [x, y] of [[-0.08, -0.155], [0.02, -0.145], [0.1, -0.16], [-0.02, -0.165]]) g.fillRect(x, y, 0.012, 0.008);
g.fillStyle = "#b8282e";
g.fillRect(0.05, -0.152, 0.014, 0.01);
e.at(0, -0.16, "mix");
