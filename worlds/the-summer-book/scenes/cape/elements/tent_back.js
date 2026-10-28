// The tent's back, seen from inside through the door (and from behind it, from the sea): the same pale canvas, a seam
// down its middle, the back pole. Metres from the middle of its foot. Its point `palm`: where a hand from outside lies
// on the canvas, low by its left edge (Grandmother sitting behind the tent).
e.at(-0.55, -0.35, 'palm');
if (!e.lib.tentShown(e.state, 'up')) return;
g.fillStyle = '#e2dac8';
g.beginPath();
g.moveTo(-0.8, 0.02);
g.lineTo(0, -1.15);
g.lineTo(0.8, 0.02);
g.closePath();
g.fill();
g.fillStyle = '#8b7558';
g.fillRect(-0.015, -1.15, 0.03, 1.17);
