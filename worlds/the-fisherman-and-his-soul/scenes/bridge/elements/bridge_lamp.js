// A lamp of the bridge on its parapet: a thin iron post from the coping (its foot, 0) up 1.5 m, a crook, and a lantern
// of four panes hanging from it, its glass warm; its flame glows (the scene's lamps shine from there)
g.fillStyle = '#2b2622';
g.fillRect(-0.04, -1.55, 0.08, 1.55);
g.fillRect(-0.09, -0.08, 0.18, 0.08);
g.fillRect(-0.04, -1.62, 0.14, 0.05);
g.beginPath();
g.moveTo(-0.14, -1.18);
g.lineTo(0.14, -1.18);
g.lineTo(0.1, -1.25);
g.lineTo(-0.1, -1.25);
g.closePath();
g.fill();
g.fillStyle = '#ffd59a';
g.fillRect(-0.11, -1.47, 0.22, 0.29);
g.fillStyle = '#2b2622';
g.fillRect(-0.015, -1.47, 0.03, 0.29);
g.beginPath();
g.moveTo(-0.14, -1.47);
g.lineTo(0, -1.6);
g.lineTo(0.14, -1.47);
g.closePath();
g.fill();
e.light(0, -1.33, 0.22, '#ffc070', 1.2, 'flame');
