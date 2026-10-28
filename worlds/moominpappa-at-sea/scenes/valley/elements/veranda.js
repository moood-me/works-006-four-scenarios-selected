// The veranda's floor from above (4.6 m by 2.6): grey-brown boards running across, weathered, their joints; a rag rug
// before the table.
g.fillStyle = '#b39a7a';
g.fillRect(-2.3, -1.3, 4.6, 2.6);
for (let y = -1.3; y < 1.3; y += 0.16) {
  g.fillStyle = `rgba(${e.rnd() < 0.5 ? '120, 98, 74' : '206, 190, 160'}, ${0.15 + 0.15 * e.rnd()})`;
  g.fillRect(-2.3, y, 4.6, 0.16);
  g.fillStyle = 'rgba(70, 54, 40, 0.5)';
  g.fillRect(-2.3, y + 0.152, 4.6, 0.012);
}
// the rug: an oval of rags, faded red, blue and cream
for (const [r, c] of [[0.95, '#b8665a'], [0.8, '#e8dcc0'], [0.66, '#6f8fb0'], [0.5, '#e8dcc0'], [0.36, '#b8665a']]) {
  g.fillStyle = c;
  g.beginPath();
  g.ellipse(-0.2, 0.1, r * 1.25, r * 0.7, 0, 0, Math.PI * 2);
  g.fill();
}
