// The beds' right sides, seen from the room's right: the cover hanging down the side, the iron side rail, the legs.
// Sophia's here (1.68 m long, from her bed's foot toward the far wall), Grandmother's a part 0.95 m behind it (2.0 m).
// Metres from each side's foot end on the floor, running toward the head.
const side = (c, len, top, rail, cover) => {
  c.fillStyle = cover;
  c.fillRect(0.02, -top, len - 0.04, 0.26);
  c.fillStyle = '#e8e6df';
  c.fillRect(0, -top + 0.1, len, 0.03);
  c.fillRect(0, -top, 0.035, top + 0.02);
  c.fillRect(len - 0.035, -rail, 0.035, rail + 0.02);
};
side(g, 1.68, 0.45, 0.85, '#c3a89a');
e.part(-0.3, 0.95, c => side(c, 1.98, 0.5, 1.0, '#7f8387'), [-0.02, -1.05, 2.0, 0.02]);
