// The convent yard under the window, from above (x across, y toward the viewer; its centre 6.5 m right, 12 m ahead):
// cobbles under rime, grey-blue; a darker trodden way along the laundry's front where the girls go to and fro.
const r = e.lib.stream(41);
g.fillStyle = "#7f868d";
g.fillRect(-4.5, -4.25, 9, 8.5);
const tones = ["#9aa1a8", "#8e959c", "#a6adb3", "#949ba2"];
for (let y = -4.25; y < 4.25; y += 0.26) {
  const shift = (Math.round((y + 4.25) / 0.26) % 2) * 0.13;
  for (let x = -4.5 - shift; x < 4.5; x += 0.26) {
    g.fillStyle = tones[Math.floor(r() * tones.length)];
    g.beginPath();
    g.ellipse(x + 0.13, y + 0.13, 0.11, 0.1, 0, 0, 6.3);
    g.fill();
  }
}
// the trodden way along the laundry, the rime worn off it
const way = g.createLinearGradient(0, -4.25, 0, -2.6);
way.addColorStop(0, "rgba(58, 62, 66, 0.55)");
way.addColorStop(1, "rgba(58, 62, 66, 0)");
g.fillStyle = way;
g.fillRect(-4.5, -4.25, 9, 1.65);
