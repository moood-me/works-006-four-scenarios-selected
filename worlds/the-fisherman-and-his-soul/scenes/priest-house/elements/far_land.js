// The far side of the bay, across the water from the hill: a long low headland, its wooded back paler in the haze,
// and at its right end, small and far, the town's few lights. Metres, its foot (the water's level) at the origin
g.fillStyle = '#4e5f72';
g.beginPath();
g.moveTo(-2400, 4);
for (let x = -2400; x <= 1400; x += 20) {
  const h = (22 + 14 * Math.sin(x * 0.0024 + 0.6) + 6 * Math.sin(x * 0.011)) * e.anim.span(x, 1400, 700) * e.anim.span(x, -2400, -1900);
  g.lineTo(x, -h);
}
g.lineTo(1400, 4);
g.closePath();
g.fill();
// the town's lights at the headland's foot
for (let i = 0; i < 7; i++) {
  const x = 820 + 260 * e.anim.hash(i, 1);
  const y = -2 - 9 * e.anim.hash(i, 2);
  g.fillStyle = '#ffd08a';
  g.fillRect(x - 1.2, y - 1.2, 2.4, 2.4);
  e.light(x, y, 3, '#ffc070', 1.2, `t${i}`);
}
