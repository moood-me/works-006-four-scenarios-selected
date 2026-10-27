// The cups on the table (`cups` 0–2): plain white enamel mugs with a blue rim; the first one is the cup — the one put
// down and waited by, touched. Their steam is the scene's (tea_steam, by `tea`).
const n = e.state.cups ?? 0;
for (let i = 0; i < n; i++) {
  const x = i * 0.22;
  g.fillStyle = "#eeeae2";
  g.fillRect(x - 0.04, -0.085, 0.08, 0.085);
  g.fillStyle = "#4f6f9a";
  g.fillRect(x - 0.04, -0.085, 0.08, 0.01);
  g.strokeStyle = "#eeeae2";
  g.lineWidth = 0.012;
  g.beginPath();
  g.arc(x + 0.05, -0.045, 0.022, -Math.PI / 2, Math.PI / 2);
  g.stroke();
}
e.at(0, -0.09, "cup");
