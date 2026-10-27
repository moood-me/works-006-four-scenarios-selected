// Three jars of new jam on the table, red and dark, their paper covers tied with string.
for (const [x, h, c] of [[-0.11, 0.13, '#a3242a'], [0, 0.15, '#7a1c2c'], [0.11, 0.12, '#b8402c']]) {
  g.fillStyle = 'rgba(214, 226, 226, 0.9)';
  g.fillRect(x - 0.045, -h, 0.09, h);
  g.fillStyle = c;
  g.fillRect(x - 0.04, -h + 0.025, 0.08, h - 0.03);
  g.fillStyle = 'rgba(255, 255, 255, 0.35)';
  g.fillRect(x - 0.032, -h + 0.03, 0.015, h - 0.04);
  g.fillStyle = '#f2ead8';
  g.beginPath();
  g.ellipse(x, -h, 0.058, 0.018, 0, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = '#9a7a52';
  g.fillRect(x - 0.05, -h + 0.008, 0.1, 0.008);
}
