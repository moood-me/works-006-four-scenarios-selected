// The window onto the cape: its white frame round the opening and the left leaf, which stays shut — its stiles and
// rails, three panes one over another (the glass itself is `room_glass`, a pane that mirrors the room; the right leaf,
// which opens, is `casement`). Metres from the middle of the opening at the sill (1.1 m wide, 1.18 m high). Its
// rectangle is where the day comes in (light `win_in`).
g.fillStyle = '#efede7';
// the frame round the opening
g.fillRect(-0.6, -1.24, 1.2, 0.08);
g.fillRect(-0.6, -1.24, 0.08, 1.24);
g.fillRect(0.52, -1.24, 0.08, 1.24);
g.fillRect(-0.6, -0.06, 1.2, 0.06);
// the left leaf: its stiles, rails and two glazing bars
g.fillRect(-0.55, -1.18, 0.05, 1.18);
g.fillRect(-0.04, -1.18, 0.04, 1.18);
g.fillRect(-0.55, -1.18, 0.55, 0.05);
g.fillRect(-0.55, -0.07, 0.55, 0.07);
for (const y of [-0.8, -0.42]) g.fillRect(-0.55, y - 0.012, 0.55, 0.024);
// the catch
g.fillStyle = '#b39e6a';
g.fillRect(-0.03, -0.62, 0.02, 0.07);
