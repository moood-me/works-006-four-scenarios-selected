// The gangway laid from the far rock to the big boat's side: two grey planks with cleats, a hand rail of rope on
// posts along its near side (`big_boat`: there with the boat). Seen side-on, running up to the right; metres from its
// foot on the rock; 2.2 m long. Point: `rail` (the rail halfway along, where a hand rests on it).
if (!e.state.big_boat) return;
g.fillStyle = '#8f8880';
g.beginPath();
g.moveTo(0, 0);
g.lineTo(2.2, -0.35);
g.lineTo(2.2, -0.27);
g.lineTo(0, 0.08);
g.closePath();
g.fill();
g.fillStyle = '#6f6962';
for (let i = 1; i < 6; i++) g.fillRect(i * 0.36, -i * 0.058 - 0.03, 0.04, 0.05);
g.fillStyle = '#7a7168';
for (const x of [0.15, 1.1, 2.05]) g.fillRect(x - 0.025, -x * 0.16 - 0.9, 0.05, 0.9);
g.strokeStyle = '#b8ab92';
g.lineWidth = 0.03;
g.beginPath();
g.moveTo(0.15, -0.92);
g.quadraticCurveTo(1.1, -1.0, 2.05, -1.25);
g.stroke();
e.at(1.1, -1.03, 'rail');
