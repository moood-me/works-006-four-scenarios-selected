// The boat's floorboards seen from above (along the boat: y), a little over the water inside the hull — he stands on
// them. Nothing while the boat is not here
if (!e.state.boat) return;
g.fillStyle = '#5e5044';
g.fillRect(-0.35, -1.1, 0.7, 2.2);
for (let i = 0; i < 5; i++) {
  const tone = 104 + Math.round(22 * e.anim.hash(i, 2));
  g.fillStyle = `rgb(${tone + 8}, ${tone - 4}, ${tone - 18})`;
  g.fillRect(-0.35 + i * 0.14 + 0.006, -1.1, 0.128, 2.2);
}
g.fillStyle = 'rgba(40, 34, 30, 0.35)';
for (const y of [-0.6, 0.2, 0.9]) g.fillRect(-0.35, y, 0.7, 0.04);
