// The boat's stern board closing the hull at its stern (from the rail, 0.54 over the water, to the keel), weathered
// grey-blue like the strakes, its edge pale. Nothing while the boat is not here
if (!e.state.boat) return;
g.fillStyle = '#6a7f8c';
g.beginPath();
g.moveTo(-0.5, -0.54);
g.lineTo(0.5, -0.54);
g.lineTo(0.16, 0.15);
g.lineTo(-0.16, 0.15);
g.closePath();
g.fill();
g.fillStyle = 'rgba(38, 48, 58, 0.5)';
for (const y of [-0.36, -0.18, 0]) g.fillRect(-0.45, y, 0.9, 0.018);
g.fillStyle = '#b8a88e';
g.fillRect(-0.5, -0.56, 1, 0.05);
