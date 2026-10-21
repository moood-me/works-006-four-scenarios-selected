// The steps up to the lighthouse door: rough granite slabs laid up the knoll's face, greyer than the rock, their
// edges worn round.
for (let i = 0; i < 3; i++) {
  const y = -i * 0.17, w = 1.5 - i * 0.14;
  g.fillStyle = i % 2 ? "#b7a4a0" : "#c2aea8";
  g.beginPath();
  g.moveTo(-w / 2, y);
  g.lineTo(-w / 2 + 0.05, y - 0.17);
  g.lineTo(w / 2 - 0.04, y - 0.17);
  g.lineTo(w / 2, y);
  g.closePath();
  g.fill();
  g.fillStyle = "rgba(90, 70, 70, 0.45)";
  g.fillRect(-w / 2, y - 0.03, w, 0.03);
}
