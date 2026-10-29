// Linen laid out on the field to bleach (`linen`): long white strips on the grass, seen from above, their edges pegged.
// Metres from its middle (x across, y toward the viewer)
if (!e.state.linen) return;
for (let i = 0; i < 4; i++) {
  const x = -3 + 2 * i;
  g.fillStyle = i % 2 ? '#f4f1ea' : '#ece8de';
  g.fillRect(x - 0.45, -2.4, 0.9, 4.8);
  g.fillStyle = 'rgba(180, 176, 166, 0.5)';
  for (const y of [-2.4, 2.35]) g.fillRect(x - 0.45, y, 0.9, 0.05);
}
