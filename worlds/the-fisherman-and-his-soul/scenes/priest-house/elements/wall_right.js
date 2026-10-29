// The right wall (x runs toward the viewer: 0 is the back corner, 5.6 m ahead; 5.6 is 0.4 m ahead): white limewash, the
// band at its foot, and a row of wooden pegs at head height near the back, the Priest's cloak and stole hanging there
e.lib.wall(g, 37, -0.05, 5.65, -3.3);
g.fillStyle = '#5a4434';
g.fillRect(0.4, -1.86, 1.5, 0.07);
for (const x of [0.6, 1.1, 1.6]) g.fillRect(x - 0.02, -1.9, 0.04, 0.05);
// the cloak: a long dark fall from the first peg; the stole: a narrow pale band from the third
g.fillStyle = '#34303a';
g.beginPath();
g.moveTo(0.56, -1.86);
g.lineTo(0.66, -1.86);
g.lineTo(0.86, -0.7);
g.lineTo(0.38, -0.7);
g.closePath();
g.fill();
g.fillStyle = '#e8e2d2';
g.fillRect(1.56, -1.86, 0.08, 0.8);
g.fillStyle = '#b8a26a';
g.fillRect(1.56, -1.12, 0.08, 0.04);
