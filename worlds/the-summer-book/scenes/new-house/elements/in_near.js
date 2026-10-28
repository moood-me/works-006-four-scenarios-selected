// The dividing wall from the room's side: the new white panels and skirting, the open doorway to the veranda (no door
// hung yet) in a pale wooden frame, a light switch. Metres from its middle at the floor (its own x the other way to the
// world's; the doorway is in the middle either way).
g.fillStyle = '#ecebe5';
g.fillRect(-2.9, -2.62, 5.8, 2.64);
g.fillStyle = '#d9c7a6';
g.fillRect(-2.9, -0.1, 5.8, 0.1);
g.fillStyle = '#e2d2b4';
g.fillRect(-0.55, -2.15, 1.1, 2.15);
g.fillStyle = '#f6f5f1';
g.fillRect(-0.85, -1.3, 0.08, 0.12);
g.globalCompositeOperation = 'destination-out';
g.fillRect(-0.45, -2.05, 0.9, 2.1);
g.globalCompositeOperation = 'source-over';
