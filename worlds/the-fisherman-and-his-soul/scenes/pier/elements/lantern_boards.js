// His lantern standing on the boards by the post (`lantern_at` boards — after 1.10): the same lantern set down, its
// glass warm; its flame the scene's light "lantern_low". Metres, its foot on the boards
if (e.state.lantern_at !== 'boards') return;
g.fillStyle = '#2f2a26';
g.beginPath();
g.moveTo(0, -0.31);
g.lineTo(0.08, -0.24);
g.lineTo(-0.08, -0.24);
g.closePath();
g.fill();
g.fillStyle = '#ffe2a8';
g.fillRect(-0.065, -0.24, 0.13, 0.2);
g.fillStyle = '#2f2a26';
for (const x of [-0.065, -0.003, 0.055]) g.fillRect(x, -0.24, 0.012, 0.2);
g.fillRect(-0.08, -0.04, 0.16, 0.04);
g.strokeStyle = '#2a2420';
g.lineWidth = 0.012;
g.beginPath();
g.arc(0, -0.33, 0.05, Math.PI, 0);
g.stroke();
e.light(0, -0.14, 0.13, '#ffc574', 1.2, 'flame');
