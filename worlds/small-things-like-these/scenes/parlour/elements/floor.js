// The parlour's floor from above (x across, y toward the viewer; its centre 2.5 m ahead): honey oak boards running
// from the door to the window, polished to a shine (the plane mirrors the fire and the lamp a little — `reflect`), each
// board a shade of its own, their joints fine and dark.
const r = e.lib.stream(71);
const tones = ["#93603c", "#8a5937", "#9c6842", "#8f5d3a", "#976440"];
for (let y = -1.95; y < 1.95; y += 0.12) {
  let x = -2.65 - r() * 1.2;
  while (x < 2.65) {
    const len = 0.9 + r() * 1.3;
    g.fillStyle = tones[Math.floor(r() * tones.length)];
    g.fillRect(Math.max(x, -2.65), y, Math.min(x + len, 2.65) - Math.max(x, -2.65), 0.12);
    g.fillStyle = "#5e3b25";
    g.fillRect(x + len - 0.004, y, 0.008, 0.12);
    x += len;
  }
  g.fillStyle = "#5e3b25";
  g.fillRect(-2.65, y, 5.3, 0.006);
}
