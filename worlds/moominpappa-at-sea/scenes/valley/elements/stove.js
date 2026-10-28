// The little iron stove at the veranda's corner, the wide copper jam pan on it; its fire glows in the grate while the
// jam cooks (`jam`: the layer fire and the light `stove_fire`). The pan's point (`stove#pan`): where the steam rises
// and Mama looks.
g.fillStyle = '#34312e';
g.fillRect(-0.24, -0.46, 0.48, 0.4);
for (const x of [-0.2, 0.2]) g.fillRect(x - 0.025, -0.08, 0.05, 0.08);
g.fillStyle = '#45413c';
g.fillRect(-0.27, -0.49, 0.54, 0.05);
g.fillStyle = '#211e1c';
g.fillRect(-0.12, -0.33, 0.24, 0.14);
e.layer('fire', {}, c => {
  const s = c.createRadialGradient(0, -0.24, 0, 0, -0.24, 0.12);
  s.addColorStop(0, '#ffcf70');
  s.addColorStop(0.6, '#e8642a');
  s.addColorStop(1, 'rgba(160, 40, 20, 0.6)');
  c.fillStyle = s;
  c.fillRect(-0.11, -0.32, 0.22, 0.12);
  e.light(0, -0.26, 0.15, '#ff9c4a', 0.8, 'fire');
});
// the pan
g.fillStyle = '#b8683c';
g.beginPath();
g.moveTo(-0.25, -0.49);
g.lineTo(-0.22, -0.6);
g.lineTo(0.22, -0.6);
g.lineTo(0.25, -0.49);
g.closePath();
g.fill();
g.fillStyle = '#d88a54';
g.fillRect(-0.23, -0.61, 0.46, 0.025);
g.fillStyle = '#6a4a30';
g.fillRect(0.24, -0.57, 0.22, 0.02);
e.at(0, -0.62, 'pan');
