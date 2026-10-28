// The new house on the island's far side, seen from the sea: white and new on its rock among the grey trees, its big
// windows black — no one there all summer. Painted flat, as far things are. Metres from the middle of its foot at the
// waterline; 22 m wide. Point: `windows`.
g.fillStyle = '#9a928b';
g.beginPath();
g.moveTo(-11, 0.6);
g.bezierCurveTo(-8, -1.4, 6, -1.8, 11, 0.6);
g.closePath();
g.fill();
g.fillStyle = '#ecebe6';
g.fillRect(-3.4, -5.8, 7.2, 4.4);
g.fillStyle = '#25282d';
g.beginPath();
g.moveTo(-4.0, -5.6);
g.lineTo(0.2, -8.4);
g.lineTo(4.4, -5.6);
g.closePath();
g.fill();
g.fillStyle = '#1f2327';
for (const x of [-2.9, -1.0, 0.9, 2.5]) g.fillRect(x, -4.9, 1.2, 1.9);
g.fillStyle = '#5f645e';
g.beginPath();
g.moveTo(-10.5, -0.4);
for (let x = -10.5; x <= 10.5; x += 0.7) g.lineTo(x, (x > -4 && x < 4.5 ? -1.0 : -2.6) - 0.8 * e.rnd());
g.lineTo(10.5, -0.4);
g.closePath();
g.fill();
e.at(0.2, -4, 'windows');
