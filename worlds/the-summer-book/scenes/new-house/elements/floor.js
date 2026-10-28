// The floor of the veranda and the room, from above: new pale pine boards running the house's length, their joints,
// clean — nobody has walked on them all summer; a threshold strip under the doorway between the two. Metres from its
// middle (the house's x; y toward the start: the veranda at the far bottom, y 1.92…3.68).
g.fillStyle = '#e4d4b5';
g.fillRect(-2.9, -3.7, 5.8, 7.4);
for (let i = 0; i < 41; i++) {
  const x = -2.88 + i * 0.14;
  g.fillStyle = i % 3 === 0 ? 'rgba(206,184,146,0.35)' : i % 3 === 1 ? 'rgba(240,226,198,0.3)' : 'rgba(220,200,166,0.25)';
  g.fillRect(x, -3.7, 0.14, 7.4);
}
g.strokeStyle = 'rgba(150,126,92,0.45)';
g.lineWidth = 0.006;
g.beginPath();
for (let i = 1; i < 41; i++) {
  const x = -2.88 + i * 0.14;
  g.moveTo(x, -3.7);
  g.lineTo(x, 3.7);
}
g.stroke();
// the boards' end joints, staggered
g.beginPath();
for (let i = 0; i < 41; i++) {
  const x = -2.88 + i * 0.14;
  const y = -3.7 + ((i * 2.37) % 3.1) + 0.4;
  g.moveTo(x, y);
  g.lineTo(x + 0.14, y);
  if (y + 3.6 < 3.7) {
    g.moveTo(x, y + 3.6);
    g.lineTo(x + 0.14, y + 3.6);
  }
}
g.stroke();
// the threshold under the doorway (the dividing wall at y 1.8)
g.fillStyle = '#cdb48c';
g.fillRect(-0.5, 1.72, 1.0, 0.16);
