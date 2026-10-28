// Papa's chair, pushed back from the table: a plain wooden kitchen chair, its back of three slats, seen three-quarters.
// Metres from the middle of its foot; 0.95 m to the top of its back.
g.fillStyle = '#8c7760';
g.fillRect(-0.22, -0.95, 0.04, 0.97);
g.fillRect(0.1, -0.9, 0.04, 0.92);
for (const y of [-0.9, -0.78, -0.66]) g.fillRect(-0.2, y, 0.32, 0.05);
g.fillStyle = '#9b8569';
g.beginPath();
g.moveTo(-0.24, -0.46);
g.lineTo(0.14, -0.46);
g.lineTo(0.26, -0.4);
g.lineTo(-0.12, -0.4);
g.closePath();
g.fill();
g.fillStyle = '#8c7760';
g.fillRect(-0.24, -0.4, 0.38, 0.04);
g.fillRect(0.22, -0.4, 0.035, 0.42);
g.fillRect(-0.13, -0.4, 0.035, 0.42);
