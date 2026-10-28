// The dividing wall from the veranda's side: the new white panels and skirting, the open doorway into the room in its
// pale wooden frame, a row of empty coat pegs. Metres from its middle at the floor (x as the world's).
g.fillStyle = '#ecebe5';
g.fillRect(-2.9, -2.62, 5.8, 2.64);
g.fillStyle = '#d9c7a6';
g.fillRect(-2.9, -0.1, 5.8, 0.1);
g.fillStyle = '#e2d2b4';
g.fillRect(-0.55, -2.15, 1.1, 2.15);
g.fillRect(-2.5, -1.72, 1.4, 0.07);
g.fillStyle = '#b89870';
for (const x of [-2.35, -2.0, -1.65, -1.3]) g.fillRect(x, -1.68, 0.03, 0.06);
g.globalCompositeOperation = 'destination-out';
g.fillRect(-0.45, -2.05, 0.9, 2.1);
g.globalCompositeOperation = 'source-over';
