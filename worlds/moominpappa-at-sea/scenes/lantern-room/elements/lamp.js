// The lamp's pedestal: a cast-iron column turned like a candlestick, painted dark green, its foot bolted to the floor
// (a form: kit.revolve). Its painting is the column unrolled — the way round by the profile's length.
const P = [[0.13, 0.9], [0.17, 0.86], [0.15, 0.78], [0.1, 0.62], [0.1, 0.24], [0.17, 0.16], [0.27, 0.07], [0.29, 0]];
let len = 0;
for (let i = 1; i < P.length; i++) len += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]);
const W = 2 * Math.PI * 0.18;
g.fillStyle = "#3c4f4b";
g.fillRect(-W / 2, -len, W, len);
g.fillStyle = "rgba(200, 210, 200, 0.12)";
for (let i = 0; i < 20; i++) g.fillRect(-W / 2 + e.rnd() * W, -len + e.rnd() * len, 0.02, 0.1);
g.fillStyle = "#b08d4a";
g.fillRect(-W / 2, -len, W, 0.04);
e.form(e.kit.revolve(P), { closed: "u", ground: "#3c4f4b" });
