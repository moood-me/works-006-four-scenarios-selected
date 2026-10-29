// The hut of willow rods he weaves by the water (chapter 4): rods bent into a low dome, bound, a dark doorway toward
// the water. `hut`: none — nothing; half — the frame of rods only, half woven; built — whole, a thatch of reeds on it;
// gone — a few rods strewn on the sand where the wave took it. `shawl` — the Witch's shawl and a loaf laid by its door
// (4.4); `snow` — snow on it. Metres, its foot's middle at the origin, its face toward the shore's view
const h = e.state.hut ?? 'none';
if (h === 'none') return;
const snow = !!e.state.snow;
const ROD = '#7a6446';
if (h === 'gone') {
  g.strokeStyle = ROD;
  g.lineWidth = 0.035;
  for (let i = 0; i < 7; i++) {
    const x = -1.2 + 2.4 * e.anim.hash(i, 1);
    g.beginPath();
    g.moveTo(x, -0.02);
    g.quadraticCurveTo(x + 0.3, -0.12, x + 0.6 + 0.4 * e.anim.hash(i, 2), -0.03);
    g.stroke();
  }
  return;
}
// the rods: arcs over the floor, from one side to the other
g.strokeStyle = ROD;
g.lineWidth = 0.045;
const n = h === 'half' ? 6 : 11;
for (let i = 0; i < n; i++) {
  const w = 1.05 - 0.06 * i;
  g.beginPath();
  g.moveTo(-w, 0);
  g.quadraticCurveTo(-w * 0.6, -1.75 + 0.05 * i, 0, -1.7 + 0.05 * i);
  g.quadraticCurveTo(w * 0.6, -1.75 + 0.05 * i, w, 0);
  g.stroke();
}
if (h === 'built') {
  // woven through and thatched: a solid low dome of wattle, reeds over it, the doorway dark
  g.fillStyle = '#8e7650';
  g.beginPath();
  g.moveTo(-1.05, 0);
  g.quadraticCurveTo(-1.0, -1.7, 0, -1.72);
  g.quadraticCurveTo(1.0, -1.7, 1.05, 0);
  g.closePath();
  g.fill();
  g.strokeStyle = 'rgba(70, 54, 34, 0.55)';
  g.lineWidth = 0.02;
  for (let y = -1.5; y < 0; y += 0.12) {
    g.beginPath();
    g.moveTo(-1.0, y);
    g.lineTo(1.0, y + 0.03);
    g.stroke();
  }
  g.fillStyle = snow ? '#eef1f6' : '#b8a272';
  g.beginPath();
  g.moveTo(-1.1, -0.9);
  g.quadraticCurveTo(-0.9, -1.85, 0, -1.86);
  g.quadraticCurveTo(0.9, -1.85, 1.1, -0.9);
  g.quadraticCurveTo(0, -1.25, -1.1, -0.9);
  g.fill();
  g.fillStyle = '#2e261e';
  g.beginPath();
  g.moveTo(-0.32, 0);
  g.quadraticCurveTo(-0.32, -0.85, 0, -0.88);
  g.quadraticCurveTo(0.32, -0.85, 0.32, 0);
  g.closePath();
  g.fill();
} else {
  // half woven: a band of wattle round its foot
  g.fillStyle = '#8e7650';
  g.fillRect(-1.0, -0.45, 2.0, 0.45);
  g.strokeStyle = 'rgba(70, 54, 34, 0.55)';
  g.lineWidth = 0.02;
  for (let y = -0.4; y < 0; y += 0.1) {
    g.beginPath();
    g.moveTo(-1.0, y);
    g.lineTo(1.0, y);
    g.stroke();
  }
}
if (e.state.shawl) {
  // by the door: a folded green shawl and a round loaf on it
  g.fillStyle = '#5a6b44';
  g.fillRect(0.4, -0.12, 0.42, 0.12);
  g.fillStyle = '#b07a46';
  g.beginPath();
  g.ellipse(0.6, -0.17, 0.12, 0.07, 0, 0, Math.PI * 2);
  g.fill();
}
