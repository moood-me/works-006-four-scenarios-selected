// The far bank — the bay's side, where the Fisherman came from: seen across the river, a low earth bank with reeds at
// the water, then scrub, round willows and a few tall poplars, dark under the moon. Its face looks across the river at
// the viewer; x runs away along the bank (−72 is 8 m ahead, 102 is 182 m ahead), its foot at the bank's edge
g.fillStyle = '#3a3a30';
g.fillRect(-72, -0.8, 174, 1.3);
// reeds at the water
g.strokeStyle = '#4f5a3c';
g.lineWidth = 0.06;
for (let i = 0; i < 420; i++) {
  const x = -72 + 174 * e.anim.hash(i, 1);
  const h = 0.9 + 1.2 * e.anim.hash(i, 2);
  g.beginPath();
  g.moveTo(x, 0.3);
  g.lineTo(x + 0.3 * (e.anim.hash(i, 3) - 0.5), 0.3 - h);
  g.stroke();
}
// willows: low round crowns
for (let i = 0; i < 70; i++) {
  const x = -72 + 174 * e.anim.hash(i, 4);
  const r = 2 + 2.5 * e.anim.hash(i, 5);
  g.fillStyle = e.anim.hash(i, 6) > 0.5 ? '#3a4c42' : '#425446';
  g.beginPath();
  g.ellipse(x, -0.8 - r * 0.8, r * 1.3, r, 0, 0, Math.PI * 2);
  g.fill();
}
// poplars: tall narrow spires
for (let i = 0; i < 26; i++) {
  const x = -60 + 160 * e.anim.hash(i, 7);
  const h = 9 + 6 * e.anim.hash(i, 8);
  g.fillStyle = '#34463c';
  g.beginPath();
  g.ellipse(x, -0.8 - h / 2, 1.1 + 0.4 * e.anim.hash(i, 9), h / 2, 0, 0, Math.PI * 2);
  g.fill();
}
