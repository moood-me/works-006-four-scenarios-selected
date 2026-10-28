// The house far off up the island, seen from the cape across the rock: its long side and its gable end, weathered
// white boards, the dark felt roof, a chimney; on the gable end the room's window — Grandmother's — looking out at the
// cape (its pane and its light are `far_window`). Painted flat, as far things are. Metres from the middle of its foot;
// the gable end 5 m wide on the right, the side 6 m on the left, 4.8 m to the ridge.
// the long side, a little in shadow
g.fillStyle = '#c9c5bd';
g.fillRect(-6.5, -3, 4, 3.05);
g.fillStyle = '#4f555b';
g.beginPath();
g.moveTo(-6.8, -2.9);
g.lineTo(-5.4, -4.8);
g.lineTo(0, -4.8);
g.lineTo(-2.5, -2.9);
g.closePath();
g.fill();
g.fillStyle = '#a9b6bb';
g.fillRect(-5.6, -2.3, 0.7, 0.9);
g.fillRect(-4, -2.3, 0.7, 0.9);
// the gable end
g.fillStyle = '#dcd8cf';
g.beginPath();
g.moveTo(-2.5, 0.05);
g.lineTo(-2.5, -3);
g.lineTo(0, -4.8);
g.lineTo(2.5, -3);
g.lineTo(2.5, 0.05);
g.closePath();
g.fill();
g.strokeStyle = '#4b5056';
g.lineWidth = 0.16;
g.beginPath();
g.moveTo(-2.8, -2.8);
g.lineTo(0, -4.9);
g.lineTo(2.8, -2.8);
g.stroke();
g.fillStyle = '#cfcac2';
g.fillRect(-1.2, -5.6, 0.5, 1.4);
g.fillStyle = '#8c8781';
g.fillRect(-2.55, -0.25, 5.1, 0.3);
// the room's window: white frame (its pane is far_window's), and the small gable window, dark
g.fillStyle = '#ecebe6';
g.fillRect(-0.62, -2.42, 1.24, 1.34);
g.fillStyle = '#6e7a80';
g.fillRect(-0.25, -4.0, 0.5, 0.6);
