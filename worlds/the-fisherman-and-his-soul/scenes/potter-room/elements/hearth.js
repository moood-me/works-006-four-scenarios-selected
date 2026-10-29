// The hearth built into the left wall: a stone surround, a sooty opening, the fire in it — a layer that flickers, its
// glow the scene's light "fire" (`fire` 0…1: its animate; 0 — embers only), a pot hanging over it. Metres, its foot's
// middle at the origin, facing the room
g.fillStyle = '#8c8070';
g.fillRect(-0.62, -1.35, 1.24, 1.35);
g.fillStyle = 'rgba(60, 50, 40, 0.4)';
for (let i = 0; i < 12; i++) g.fillRect(-0.62 + 0.21 * (i % 6), -1.35 + 0.34 * Math.floor(i / 6) + 0.02, 0.2, 0.01);
g.fillStyle = '#7a6e60';
g.fillRect(-0.7, -1.42, 1.4, 0.1);
g.fillStyle = '#1a1410';
g.beginPath();
g.moveTo(-0.4, 0);
g.lineTo(-0.4, -0.6);
g.quadraticCurveTo(0, -0.85, 0.4, -0.6);
g.lineTo(0.4, 0);
g.closePath();
g.fill();
g.fillStyle = '#3a2a1c';
g.fillRect(-0.3, -0.08, 0.6, 0.06);
g.fillStyle = '#2a2420';
g.fillRect(-0.004, -0.75, 0.008, 0.2);
g.beginPath();
g.ellipse(0, -0.5, 0.13, 0.1, 0, 0, Math.PI * 2);
g.fill();
e.layer('fire', { flicker: 0.4, blend: 'add', box: [-0.32, -0.42, 0.32, -0.04] }, g => {
  const f = g.createRadialGradient(0, -0.1, 0, 0, -0.14, 0.3);
  f.addColorStop(0, 'rgba(255, 226, 150, 1)');
  f.addColorStop(0.5, 'rgba(255, 150, 70, 0.8)');
  f.addColorStop(1, 'rgba(255, 110, 40, 0)');
  g.fillStyle = f;
  g.beginPath();
  g.moveTo(-0.28, -0.06);
  g.quadraticCurveTo(-0.2, -0.3, -0.08, -0.22);
  g.quadraticCurveTo(-0.02, -0.4, 0.06, -0.24);
  g.quadraticCurveTo(0.18, -0.34, 0.28, -0.06);
  g.closePath();
  g.fill();
  e.light(0, -0.16, 0.22, '#ffb066', 1.4, 'flame');
});
e.at(0, -0.2, 'fire');
