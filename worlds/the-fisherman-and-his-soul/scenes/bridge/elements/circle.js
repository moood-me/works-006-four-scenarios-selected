// The empty circle on the cobbles of the square (3.2, `square`): seen from above, a ring of trodden sand where the
// dancing is, nobody in it. Metres from its middle; nothing without the square
if (!e.state.square) return;
g.strokeStyle = 'rgba(196, 176, 140, 0.55)';
g.lineWidth = 0.32;
g.beginPath();
g.arc(0, 0, 1.15, 0, Math.PI * 2);
g.stroke();
g.fillStyle = 'rgba(176, 156, 124, 0.25)';
g.beginPath();
g.arc(0, 0, 1.0, 0, Math.PI * 2);
g.fill();
