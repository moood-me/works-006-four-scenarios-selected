// The Witch's knife lying on the boards where he threw it (`knife` boards — М6's miss): seen from above, aslant across
// two planks. Metres from its middle
if (e.state.knife !== 'boards') return;
const rust = !!e.state.rust;
g.save();
g.rotate(0.6);
g.fillStyle = '#4c7448';
g.fillRect(-0.13, -0.018, 0.1, 0.036);
g.fillStyle = '#2a2420';
g.fillRect(-0.035, -0.03, 0.016, 0.06);
g.fillStyle = rust ? '#8a5638' : '#d6dadf';
g.beginPath();
g.moveTo(-0.02, -0.02);
g.lineTo(0.15, -0.006);
g.lineTo(0.17, 0);
g.lineTo(-0.02, 0.02);
g.closePath();
g.fill();
g.restore();
e.at(0, 0, 'knife');
