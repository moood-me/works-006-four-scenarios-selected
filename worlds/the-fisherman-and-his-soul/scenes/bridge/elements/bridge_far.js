// The far parapet of the bridge, its inner face seen over the road: a low stone wall the length of the bridge, its
// coping, and at its head on our quay (x 11.2–11.7) the end pillar, taller, that the bridge's lamp stands on. Metres,
// its foot on the road
g.fillStyle = '#9c917f';
g.fillRect(-11.7, -0.8, 22.9, 0.8);
g.fillRect(11.2, -1.1, 0.5, 1.1);
g.fillStyle = 'rgba(58, 52, 46, 0.35)';
for (let r = 0; r < 2; r++) {
  g.fillRect(-11.7, -0.8 + 0.36 * r, 22.9, 0.025);
  for (let i = 0; i < 44; i++) g.fillRect(-11.7 + (i + (r % 2) * 0.5) * 0.52, -0.8 + 0.36 * r, 0.025, 0.36);
}
g.fillStyle = '#b8ad9b';
g.fillRect(-11.7, -0.86, 22.9, 0.12);
g.fillRect(11.12, -1.18, 0.66, 0.14);
