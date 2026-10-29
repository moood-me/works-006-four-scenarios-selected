// The door, opened into the room and standing back against the wall right of the doorway (its hinges on the left, by the
// doorway): five upright planks, two ledges across, iron strap hinges, a ring for a handle
g.fillStyle = '#6e5038';
g.fillRect(-0.55, -2.24, 1.1, 2.24);
g.fillStyle = 'rgba(40, 28, 20, 0.45)';
for (let i = 1; i < 5; i++) g.fillRect(-0.55 + 0.22 * i - 0.01, -2.24, 0.02, 2.24);
g.fillStyle = '#5e4430';
g.fillRect(-0.55, -1.9, 1.1, 0.12);
g.fillRect(-0.55, -0.5, 1.1, 0.12);
g.fillStyle = '#2b2622';
g.fillRect(-0.55, -1.87, 0.6, 0.05);
g.fillRect(-0.55, -0.47, 0.6, 0.05);
g.strokeStyle = '#2b2622';
g.lineWidth = 0.02;
g.beginPath();
g.arc(0.42, -1.05, 0.05, 0, Math.PI * 2);
g.stroke();
