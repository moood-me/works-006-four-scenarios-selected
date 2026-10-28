// Sophia's tent on the cape, seen from the house 65 m off: a small ridge tent of pale yellowish canvas, its front
// facing the house, the door's flaps, the guy ropes and pegs. The canvas is thin (translucent): the candle inside
// (its glow `candle`, `tent_light`) makes it glow. Metres from the middle of its front at the foot; 1.25 m high. The
// point `tent`.
g.fillStyle = '#e4dcc4';
g.beginPath();
g.moveTo(-0.85, 0);
g.lineTo(0, -1.22);
g.lineTo(0.85, 0);
g.closePath();
g.fill();
g.fillStyle = '#d3c9ae';
g.beginPath();
g.moveTo(-0.2, 0);
g.lineTo(0, -0.95);
g.lineTo(0.22, 0);
g.closePath();
g.fill();
g.strokeStyle = '#9b927e';
g.lineWidth = 0.025;
g.beginPath();
g.moveTo(0, -1.22);
g.lineTo(0, -1.3);
g.moveTo(-0.85, 0);
g.lineTo(0, -1.22);
g.lineTo(0.85, 0);
g.stroke();
g.strokeStyle = 'rgba(120,112,98,0.8)';
g.lineWidth = 0.012;
g.beginPath();
g.moveTo(0, -1.25);
g.lineTo(-0.95, 0.03);
g.moveTo(0, -1.25);
g.lineTo(0.95, 0.03);
g.stroke();
// the candle inside: its glow through the canvas (`tent_light`)
e.light(0, -0.4, 1.2, '#ffc27a', 1.8, 'candle');
e.at(0, -0.6, 'tent');
