// A fresh mound at the field's edge («Фонарь на мостках», `mound`): a low heap of dark turned earth, a few stones at its
// foot; with `knife` mound, the Witch's knife laid at its head. Metres, its foot's middle at the origin, its long side
// toward the shore's view
if (!e.state.mound) return;
g.fillStyle = '#5a4634';
g.beginPath();
g.moveTo(-1.0, 0);
g.quadraticCurveTo(-0.7, -0.38, 0, -0.4);
g.quadraticCurveTo(0.7, -0.38, 1.0, 0);
g.closePath();
g.fill();
g.fillStyle = 'rgba(120, 96, 70, 0.6)';
for (let i = 0; i < 14; i++) {
  g.beginPath();
  g.ellipse(-0.8 + 1.6 * e.anim.hash(i, 1), -0.05 - 0.25 * e.anim.hash(i, 2) * (1 - Math.abs(-0.8 + 1.6 * e.anim.hash(i, 1))), 0.05, 0.03, 0, 0, Math.PI * 2);
  g.fill();
}
g.fillStyle = '#8a8a84';
for (const x of [-1.05, 0.98, -0.6, 0.7]) {
  g.beginPath();
  g.ellipse(x, -0.03, 0.08, 0.05, 0, 0, Math.PI * 2);
  g.fill();
}
if (e.state.knife === 'mound') {
  g.fillStyle = '#4c7448';
  g.fillRect(-1.0, -0.47, 0.1, 0.035);
  g.fillStyle = '#c9ccd0';
  g.fillRect(-0.9, -0.465, 0.17, 0.025);
}
e.at(-0.95, -0.42, 'head');
