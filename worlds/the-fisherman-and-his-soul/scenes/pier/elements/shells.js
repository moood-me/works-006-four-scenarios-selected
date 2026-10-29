// Shells laid at the field's corner (`shells`: the unmarked graves, the widow's children's): two rows of pale shells
// on the grass, seen from above. Metres from their middle
if (!e.state.shells) return;
for (let i = 0; i < 12; i++) {
  const x = -0.5 + 0.2 * (i % 6);
  const y = i < 6 ? -0.2 : 0.2;
  g.fillStyle = i % 3 ? '#efe4d2' : '#e6cdb8';
  g.beginPath();
  g.ellipse(x, y, 0.06, 0.045, 0.4 * (i % 2 ? 1 : -1), 0, Math.PI * 2);
  g.fill();
}
