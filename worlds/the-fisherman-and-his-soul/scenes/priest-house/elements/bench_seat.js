// The bench's seat seen from above (1.6 m long, 0.34 deep; y toward the sitter's front): one thick scrubbed board, its
// grain along it. Its middle is the seat's point
g.fillStyle = '#9c7c5c';
g.fillRect(-0.8, -0.17, 1.6, 0.34);
g.fillStyle = 'rgba(70, 50, 34, 0.3)';
for (const y of [-0.09, 0.0, 0.08]) g.fillRect(-0.8, y, 1.6, 0.008);
g.fillStyle = 'rgba(60, 42, 28, 0.6)';
g.fillRect(-0.8, 0.15, 1.6, 0.02);
e.at(0, 0, 'seat');
