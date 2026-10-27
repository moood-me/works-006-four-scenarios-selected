// A bare skerry far out: a low smooth back of granite, rounded like a whale, a paler crown where the gulls sit. Metres
// from its foot at the waterline; 40 m long, 5 m high (copies scale and flip it).
g.fillStyle = '#8f8b88';
g.beginPath();
g.moveTo(-20, 0.6);
g.bezierCurveTo(-15, -1.5, -9, -4.8, -2, -5);
g.bezierCurveTo(5, -5.2, 11, -2.6, 20, 0.6);
g.closePath();
g.fill();
g.fillStyle = '#a7a29d';
g.beginPath();
g.moveTo(-9, -3.2);
g.bezierCurveTo(-5, -4.9, 2, -5.1, 7, -3.6);
g.bezierCurveTo(2, -4.2, -4, -4.1, -9, -3.2);
g.closePath();
g.fill();
g.fillStyle = '#6f6c6a';
g.fillRect(-20, 0, 40, 0.6);
