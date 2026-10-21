// The right wall, seen along its length (x from the back wall at 6 m, running toward the start): the panelling and the
// distemper as the back wall's; the door to the hall at x 1.15…2.0, shut — brown-grained, four panels, a brass knob;
// a light switch beside it.
e.lib.wall(g, 64, -0.05, 3.75, -2.92);
g.fillStyle = "#5c4836";
g.fillRect(1.08, -2.14, 0.99, 2.16);
g.fillStyle = "#7c6146";
g.fillRect(1.15, -2.07, 0.85, 2.07);
g.fillStyle = "#6c533b";
for (const [x, y, w, h] of [[1.22, -1.98, 0.32, 0.78], [1.61, -1.98, 0.32, 0.78], [1.22, -1.0, 0.32, 0.86], [1.61, -1.0, 0.32, 0.86]]) g.fillRect(x, y, w, h);
g.fillStyle = "#c9a24e";
g.beginPath();
g.arc(1.24, -1.0, 0.03, 0, 6.3);
g.fill();
g.fillStyle = "#e9e4d8";
g.fillRect(0.88, -1.42, 0.08, 0.1);
