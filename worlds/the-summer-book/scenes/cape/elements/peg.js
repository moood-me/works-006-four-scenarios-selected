// The front guy rope and its peg (side-on: the card stands along the tent's line, x back from its front): the rope from
// the ridge's knot down to the peg driven into a crack of the rock 0.9 m before the door. Its point `peg`.
e.at(-0.89, -0.1, 'peg');
if (!e.lib.tentShown(e.state, 'up')) return;
g.strokeStyle = '#b4a27e';
g.lineWidth = 0.012;
g.beginPath();
g.moveTo(0, -1.15);
g.quadraticCurveTo(-0.45, -0.52, -0.88, -0.1);
g.stroke();
g.fillStyle = '#8f7b5e';
g.beginPath();
g.moveTo(-0.92, -0.16);
g.lineTo(-0.86, -0.17);
g.lineTo(-0.88, 0.02);
g.closePath();
g.fill();
