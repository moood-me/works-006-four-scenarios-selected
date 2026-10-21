// What is lit across the yard (on the laundry's front, just before it): its four tall windows steamed over from within —
// pale and warm, brighter toward their tops where the steam gathers, their glazing bars dark — and the small lamp on its
// bracket. Each window a glow (`w0`…`w3`), the lamp's `lamp`.
[-2.4, -0.8, 0.8, 2.4].forEach((x, i) => {
  const glass = g.createLinearGradient(0, -2.6, 0, -0.9);
  glass.addColorStop(0, "#fbf1dc");
  glass.addColorStop(0.5, "#ecdcbc");
  glass.addColorStop(1, "#d6c4a2");
  g.fillStyle = glass;
  g.fillRect(x - 0.45, -2.6, 0.9, 1.7);
  g.fillStyle = "#2c3530";
  g.fillRect(x - 0.025, -2.6, 0.05, 1.7);
  for (let k = 1; k < 4; k++) g.fillRect(x - 0.45, -2.6 + (1.7 * k) / 4 - 0.02, 0.9, 0.04);
  e.light(x, -1.9, 0.6, "#ffe6bc", 0.45, `w${i}`);
});
g.fillStyle = "#fff2d6";
g.beginPath();
g.arc(0.2, -2.82, 0.06, 0, 6.3);
g.fill();
e.light(0.2, -2.82, 0.35, "#ffd9a0", 0.6, "lamp");
