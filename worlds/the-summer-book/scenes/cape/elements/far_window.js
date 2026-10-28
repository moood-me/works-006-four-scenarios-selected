// Grandmother's window in the far house: its four panes — the lamp lit behind them in the evening (the layer `lit`,
// faded by `window` in animate), the glass grey-blue when it is out. Metres, as far_house's (it stands on the same spot,
// just before it).
const pane = (c, color) => {
  c.fillStyle = color;
  for (const [x, y] of [[-0.54, -2.34], [0.04, -2.34], [-0.54, -1.71], [0.04, -1.71]]) c.fillRect(x, y, 0.5, 0.55);
};
pane(g, '#7a878e');
e.layer('lit', {}, c => pane(c, '#ffd38e'));
e.light(0, -1.75, 0.6, '#ffcf88', 1, 'window');
e.at(0, -1.75, 'window');
