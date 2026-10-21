// What is lit in the laundry's openings (on the laundry's card, just before it): the windows' panes steamed over from
// within — pale and warm, brighter toward their tops where the steam gathers, with their glazing bars —, the open
// kitchen door, a warm lamplit room behind it. Each window a glow (`w0`…`w4`); the door's glow `door` lights the
// yard before it (the scene's `kitchen`).
const panes = [[-2.3, -2.95, 0.95, 2.05], [1.5, -2.95, 0.95, 2.05], [-2.05, -5.95, 0.8, 1.7], [-0.3, -5.95, 0.8, 1.7], [1.55, -5.95, 0.8, 1.7]];
panes.forEach(([x, y, w, h], i) => {
  const glass = g.createLinearGradient(0, y, 0, y + h);
  glass.addColorStop(0, "#fbf1dc");
  glass.addColorStop(0.5, "#ecdcbc");
  glass.addColorStop(1, "#d8c7a6");
  g.fillStyle = glass;
  g.fillRect(x, y, w, h);
  g.fillStyle = "#2c3530";
  g.fillRect(x + w / 2 - 0.025, y, 0.05, h);
  for (let k = 1; k < 4; k++) g.fillRect(x, y + (h * k) / 4 - 0.02, w, 0.04);
  e.light(x + w / 2, y + h * 0.4, 0.55, "#ffe6bc", 0.45, `w${i}`);
});
// the kitchen through the door: lamplight on a whitewashed wall, the dark of a dresser to one side
const room = g.createRadialGradient(0.6, -1.4, 0.05, 0.6, -1.2, 1.3);
room.addColorStop(0, "#f7d9a6");
room.addColorStop(1, "#b98a58");
g.fillStyle = room;
g.fillRect(0.2, -2.05, 0.8, 2.05);
g.fillStyle = "#6b4c34";
g.fillRect(0.2, -1.6, 0.18, 1.6);
e.light(0.6, -1.3, 0.6, "#ffcf94", 0.55, "door");
