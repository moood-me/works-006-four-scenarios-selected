// A board nailed to the pedestal's front, by the lamp: two nails, and on them the sheets Moominpappa has pinned up of
// what he read under the soot (`sheets` 0–2: "The Burner", then "The Pot"); the second nail bare while there is one.
// Its point: the sheets.
const n = e.state.sheets ?? 0;
g.fillStyle = "#8c6e50";
g.fillRect(-0.2, -0.3, 0.4, 0.3);
g.strokeStyle = "rgba(50, 36, 26, 0.6)";
g.lineWidth = 0.006;
g.strokeRect(-0.2, -0.3, 0.4, 0.3);
const titles = [tr("The Burner"), tr("The Pot")];
for (let i = 0; i < 2; i++) {
  const x = -0.1 + i * 0.2;
  if (i < n) {
    g.fillStyle = "#f1ece0";
    g.save();
    g.translate(x, -0.27);
    g.rotate((i ? 1 : -1) * 0.04);
    g.fillRect(-0.075, 0, 0.15, 0.21);
    g.fillStyle = "#2c2a30";
    g.font = "italic 3px Georgia, serif";
    g.scale(0.01, 0.01);
    g.textAlign = "center";
    g.fillText(titles[i], 0, 4.5);
    g.restore();
    g.fillStyle = "rgba(60, 56, 64, 0.5)";
    for (let k = 0; k < 6; k++) g.fillRect(x - 0.06, -0.2 + k * 0.025, 0.1 + ((k * 13) % 3) * 0.01, 0.004);
  }
  g.fillStyle = "#2a2626";
  g.beginPath();
  g.arc(x, -0.265, 0.008, 0, Math.PI * 2);
  g.fill();
}
e.at(0, -0.17, "sheet");
