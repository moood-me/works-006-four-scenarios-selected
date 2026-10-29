// The shore from above (the land behind the viewer: its centre 21 m behind, x across from −10, y toward the viewer — a
// point `distance` ahead is at y = −21 − distance): wet dark sand at the water's edge (1.44 m ahead), pale sand back to
// the bank's foot, the bank's rough grass rising, the field on its top, a trodden path from the pier's root up the bank.
// In the snow (`snow`, chapter 4's winter) all of it white, the water's edge frozen grey
const Y = d => -21 - d;
const X = a => a + 10;
const snow = !!e.state.snow;
g.fillStyle = snow ? '#e6eaf0' : '#d6c6a4';
g.fillRect(-35, -24, 70, 48);
// the sand: soft patches, the wrack line, the wet band at the edge
for (let i = 0; i < 260; i++) {
  const x = -35 + 70 * e.anim.hash(i, 1);
  const d = -6 + 7.5 * e.anim.hash(i, 2);
  const r = 0.3 + 1.2 * e.anim.hash(i, 3);
  g.fillStyle = snow ? 'rgba(200, 210, 224, 0.35)' : (e.anim.hash(i, 4) > 0.5 ? 'rgba(232, 218, 186, 0.45)' : 'rgba(176, 160, 128, 0.3)');
  g.beginPath();
  g.ellipse(x, Y(d), r * 1.6, r, 0, 0, Math.PI * 2);
  g.fill();
}
const wet = g.createLinearGradient(0, Y(1.6), 0, Y(0.4));
wet.addColorStop(0, snow ? 'rgba(150, 164, 180, 0.9)' : 'rgba(120, 104, 80, 0.9)');
wet.addColorStop(1, snow ? 'rgba(150, 164, 180, 0)' : 'rgba(120, 104, 80, 0)');
g.fillStyle = wet;
g.fillRect(-35, Y(1.6), 70, 1.2);
g.fillStyle = snow ? 'rgba(170, 180, 194, 0.6)' : 'rgba(120, 100, 70, 0.55)';
for (let i = 0; i < 90; i++) g.fillRect(-35 + 70 * e.anim.hash(i, 9), Y(-1.2 + 0.5 * e.anim.hash(i, 10)), 0.2 + 0.5 * e.anim.hash(i, 11), 0.05);
// the bank: rough grass from its foot (6 m behind) up to the field (11 m behind), the field's turf beyond
const bank = g.createLinearGradient(0, Y(-5.5), 0, Y(-11.5));
bank.addColorStop(0, snow ? 'rgba(220, 226, 236, 0)' : 'rgba(120, 132, 86, 0)');
bank.addColorStop(0.25, snow ? '#dde3ec' : '#7d8a58');
bank.addColorStop(1, snow ? '#e8ecf2' : '#6f7e4c');
g.fillStyle = bank;
g.fillRect(-35, Y(-5.5), 70, -6);
g.fillStyle = snow ? '#eef1f6' : '#8a9a5c';
g.fillRect(-35, -24, 70, Y(-11.5) + 24);
for (let i = 0; i < 400; i++) {
  const x = -35 + 70 * e.anim.hash(i, 21);
  const y = -24 + (Y(-6) + 24) * e.anim.hash(i, 22);
  g.fillStyle = snow ? 'rgba(190, 200, 214, 0.4)' : (e.anim.hash(i, 23) > 0.5 ? 'rgba(96, 110, 62, 0.45)' : 'rgba(150, 160, 98, 0.4)');
  g.fillRect(x, y, 0.08 + 0.12 * e.anim.hash(i, 24), 0.3 + 0.5 * e.anim.hash(i, 25));
}
// the path from the pier's root (−6.8, −2) up the bank to the field
g.strokeStyle = snow ? 'rgba(200, 206, 216, 0.8)' : 'rgba(176, 150, 112, 0.75)';
g.lineWidth = 0.9;
g.beginPath();
g.moveTo(X(-6.8), Y(-2));
g.quadraticCurveTo(X(-5.5), Y(-7), X(-4.2), Y(-12.5));
g.stroke();
