// The floor from above (x across, y toward the viewer; its centre 2.4 m ahead): worn quarry tiles of a quiet grey-buff,
// set in a darker grout, a few of them a faded brick — the floor is a ground for the people, not a colour of its own;
// worn paler along the way from the range to the table and the door; a rag rug before the range (across −2.45, 3.4 m
// ahead) in faded colours.
const r = e.lib.stream(71);
g.fillStyle = "#5f5852";
g.fillRect(-3.25, -1.85, 6.5, 3.7);
const tones = ["#8c847b", "#857d75", "#928a81", "#8a8279", "#8e857c", "#8f7468"];
for (let y = -1.85; y < 1.85; y += 0.25) {
  for (let x = -3.25; x < 3.25; x += 0.25) {
    const k = r();
    g.fillStyle = tones[k < 0.08 ? 5 : Math.floor(r() * 5)];
    g.fillRect(x + 0.01, y + 0.01, 0.23, 0.23);
  }
}
// worn paler where the feet go
const worn = g.createRadialGradient(-0.6, 0.0, 0.2, -0.6, 0.0, 2.2);
worn.addColorStop(0, "rgba(214, 204, 188, 0.2)");
worn.addColorStop(1, "rgba(214, 204, 188, 0)");
g.fillStyle = worn;
g.fillRect(-3.25, -1.85, 6.5, 3.7);
// the rag rug: an oval of braided rings, faded colours
const cx = -2.45;
const cy = -1.0;
for (let i = 0; i < 7; i++) {
  const k = 1 - i / 7;
  g.fillStyle = ["#6f6a7c", "#a39278", "#647468", "#8e6e66", "#827c72", "#6c7688", "#a8987e"][i];
  g.beginPath();
  g.ellipse(cx, cy, 0.62 * k, 0.36 * k, 0, 0, 6.3);
  g.fill();
}
