// The old beggar's wooden bowl at his feet on the bridge, a few coppers in it (3.7б) — a layer that rocks when a copper
// is knocked out (`copper`: its animate); its point `coins`. Only while the beggar is here. Metres, its foot on the road
if (e.state.beggar_here === false) return;
e.layer('bowl', { pivot: [0, 0] }, g => {
  g.fillStyle = '#6b4a30';
  g.beginPath();
  g.moveTo(-0.13, -0.08);
  g.quadraticCurveTo(-0.12, 0, 0, 0);
  g.quadraticCurveTo(0.12, 0, 0.13, -0.08);
  g.closePath();
  g.fill();
  g.fillStyle = '#4a3220';
  g.fillRect(-0.13, -0.09, 0.26, 0.02);
  for (let i = 0; i < 4; i++) {
    g.fillStyle = i % 2 ? '#b07a3e' : '#c98f4c';
    g.beginPath();
    g.ellipse(-0.06 + 0.04 * i, -0.095, 0.025, 0.009, 0, 0, Math.PI * 2);
    g.fill();
  }
});
e.at(0, -0.1, 'coins');
