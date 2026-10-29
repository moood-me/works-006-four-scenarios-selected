// The bench by the hearth: its front board and two legs (facing the room, its seat 0.45 high; the seat itself is
// bench_top). Point `seat` — where one sits or lies
g.fillStyle = '#7a5c40';
g.fillRect(-0.75, -0.45, 1.5, 0.08);
g.fillStyle = '#5e4630';
for (const x of [-0.66, 0.6]) g.fillRect(x, -0.37, 0.07, 0.37);
g.fillRect(-0.7, -0.37, 1.4, 0.05);
e.at(0, -0.45, 'seat');
