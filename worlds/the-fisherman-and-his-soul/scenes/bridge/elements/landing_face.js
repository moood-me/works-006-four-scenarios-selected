// The landing's face toward the river and the steps up to the quay at its far end: dressed stone, wet and dark at its
// foot. Metres, its foot at the water (the landing's top at −0.25)
g.fillStyle = '#6a6458';
g.fillRect(-1.1, -0.27, 2.2, 0.27);
g.fillStyle = 'rgba(30, 36, 40, 0.5)';
g.fillRect(-1.1, -0.08, 2.2, 0.08);
for (let i = 0; i < 6; i++) {
  g.fillStyle = i % 2 ? '#7c7468' : '#857d70';
  g.fillRect(-1.1, -0.27 - 0.29 * (i + 1), 0.45, 0.29);
}
