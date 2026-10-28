// The boat's transom, the flat board across her stern: weathered planks, the white capping on top, the rudder's pintles.
g.fillStyle = '#86a2b5';
g.beginPath();
g.moveTo(-0.53, -0.77);
g.lineTo(0.53, -0.77);
g.quadraticCurveTo(0.5, -0.2, 0, 0);
g.quadraticCurveTo(-0.5, -0.2, -0.53, -0.77);
g.fill();
g.fillStyle = 'rgba(46, 66, 84, 0.5)';
for (const y of [-0.6, -0.42, -0.25]) g.fillRect(-0.5, y, 1.0, 0.02);
g.fillStyle = '#efede6';
g.fillRect(-0.55, -0.8, 1.1, 0.06);
g.fillStyle = '#5a4a3a';
g.fillRect(-0.04, -0.75, 0.08, 0.7);
