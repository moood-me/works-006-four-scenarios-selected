// The lamp's cap over the lens: a brass dome narrowing to the vent pipe that goes up through the ceiling (a form).
const P = [[0.06, 0.65], [0.07, 0.62], [0.07, 0.36], [0.2, 0.26], [0.36, 0.08], [0.4, 0]];
let len = 0;
for (let i = 1; i < P.length; i++) len += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]);
const W = 2 * Math.PI * 0.25;
g.fillStyle = "#a88446";
g.fillRect(-W / 2, -len, W, len);
g.fillStyle = "#2a2826";
g.fillRect(-W / 2, -len, W, 0.3);
g.fillStyle = "rgba(60, 40, 20, 0.3)";
for (let i = 0; i < 24; i++) g.fillRect(-W / 2 + e.rnd() * W, -len + 0.3 + e.rnd() * (len - 0.3), 0.03, 0.05);
e.form(e.kit.revolve(P), { closed: "u", ground: "#a88446" });
