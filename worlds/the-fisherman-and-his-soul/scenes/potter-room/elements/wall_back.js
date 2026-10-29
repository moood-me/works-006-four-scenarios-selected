// The back wall (facing the room, 5.1 m ahead): its plaster (lib.wall), the window onto the river (x 1.4…2.2, 0.95…1.75 m
// up) left unpainted — the night beyond it is the sky's and outside's; its frame is window_bars'
e.lib.wall(g, 3, -2.75, 2.75, -2.5);
g.save();
g.globalCompositeOperation = 'destination-out';
g.fillRect(1.4, -1.75, 0.8, 0.8);
g.restore();
