// The two bunks along the wall, one over the other: plain plank frames, the family's blankets on them — ochre with
// grey-blue checks, as on the landing —, a pillow.
const w = 2, posts = 0.07;
g.fillStyle = "#8c6e50";
for (const x of [-w / 2, w / 2 - posts]) g.fillRect(x, -1.75, posts, 1.75);
for (const y of [-0.45, -1.35]) {
  g.fillStyle = "#9c7d5a";
  g.fillRect(-w / 2, y, w, 0.12);
  g.fillStyle = "#c9a065";
  g.beginPath();
  g.moveTo(-w / 2 + 0.1, y);
  g.quadraticCurveTo(-0.2, y - 0.22, w / 2 - 0.15, y - 0.06);
  g.lineTo(w / 2 - 0.15, y);
  g.closePath();
  g.fill();
  g.strokeStyle = "rgba(92, 112, 132, 0.6)";
  g.lineWidth = 0.025;
  for (let x = -w / 2 + 0.2; x < w / 2 - 0.2; x += 0.16) {
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + 0.02, y - 0.14);
    g.stroke();
  }
  g.fillStyle = "#ece6d8";
  g.beginPath();
  g.ellipse(w / 2 - 0.35, y - 0.08, 0.22, 0.08, 0, 0, Math.PI * 2);
  g.fill();
}
