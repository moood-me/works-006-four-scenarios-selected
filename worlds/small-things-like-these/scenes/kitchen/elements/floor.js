// The floor from above (x across, y toward the viewer; its centre 4.2 m ahead): red quarry tiles, worn paler along the
// way from the range to the table and the door; a rag rug before the range (across −2.5, 5.2 m ahead).
const r = e.lib.stream(71);
g.fillStyle = "#6d4a3c";
g.fillRect(-3.25, -1.85, 6.5, 3.7);
const tones = ["#a8604a", "#9e5844", "#b0684f", "#a35c47"];
for (let y = -1.85; y < 1.85; y += 0.25) {
  for (let x = -3.25; x < 3.25; x += 0.25) {
    g.fillStyle = tones[Math.floor(r() * tones.length)];
    g.fillRect(x + 0.01, y + 0.01, 0.23, 0.23);
  }
}
// worn paler where the feet go
const worn = g.createRadialGradient(-0.6, 0.0, 0.2, -0.6, 0.0, 2.2);
worn.addColorStop(0, "rgba(214, 170, 140, 0.22)");
worn.addColorStop(1, "rgba(214, 170, 140, 0)");
g.fillStyle = worn;
g.fillRect(-3.25, -1.85, 6.5, 3.7);
// the rag rug: an oval of braided rings, faded colours
const cx = -2.45;
const cy = -1.0;
for (let i = 0; i < 7; i++) {
  const k = 1 - i / 7;
  g.fillStyle = ["#7a6a8c", "#b59a6a", "#5f7a6a", "#a0645a", "#8a8070", "#6a7a96", "#b8a27a"][i];
  g.beginPath();
  g.ellipse(cx, cy, 0.62 * k, 0.36 * k, 0, 0, 6.3);
  g.fill();
}
