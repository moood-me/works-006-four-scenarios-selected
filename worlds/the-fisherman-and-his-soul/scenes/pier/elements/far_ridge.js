// Farther still, behind the wood: a long pale ridge of hills, almost gone in the haze
g.fillStyle = '#56687a';
g.beginPath();
g.moveTo(-2600, 2);
for (let x = -2600; x <= 900; x += 25) g.lineTo(x, -(28 + 22 * Math.sin(x * 0.0021 + 1) + 10 * Math.sin(x * 0.0063)) * e.anim.span(x, 900, 400));
g.lineTo(900, 2);
g.closePath();
g.fill();
