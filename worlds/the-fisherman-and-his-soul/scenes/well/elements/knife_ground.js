// The Witch's knife lying on the slabs at his feet where she threw it down (1.6, `knife_ground`): seen from above (a
// plane on the ground), the green snakeskin handle and the bright blade, a little aslant. Its point `knife`
if (!e.state.knife_ground) return;
g.save();
g.rotate(-0.5);
g.fillStyle = '#4c7448';
g.fillRect(-0.13, -0.018, 0.1, 0.036);
g.fillStyle = 'rgba(30, 50, 30, 0.6)';
for (let i = 0; i < 5; i++) g.fillRect(-0.125 + 0.02 * i, -0.018, 0.008, 0.036);
g.fillStyle = '#2a2420';
g.fillRect(-0.035, -0.03, 0.016, 0.06);
g.fillStyle = '#d6dadf';
g.beginPath();
g.moveTo(-0.02, -0.02);
g.lineTo(0.15, -0.006);
g.lineTo(0.17, 0);
g.lineTo(-0.02, 0.02);
g.closePath();
g.fill();
g.restore();
e.at(0, 0, 'knife');
