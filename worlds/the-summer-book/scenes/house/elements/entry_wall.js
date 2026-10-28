// The entry's far wall, seen through the second door: plain grey boards, the outer door to the porch (light at its
// cracks), coats on wooden pegs, Papa's big storm lantern hanging on its hook, a broom. Facing back into the room
// (its x runs toward the veranda, u = −z, −3.4…−0.6). Metres from the frame's z 0 at the floor.
g.fillStyle = '#a7a39a';
g.fillRect(-3.4, -2.4, 2.8, 2.42);
g.strokeStyle = 'rgba(100,96,88,0.4)';
g.lineWidth = 0.01;
for (let x = -3.4 + 0.15; x < -0.6; x += 0.15) {
  g.beginPath();
  g.moveTo(x, -2.4);
  g.lineTo(x, 0.02);
  g.stroke();
}
// the outer door: planks, the light at its cracks
g.fillStyle = '#7e7a70';
g.fillRect(-2.35, -1.98, 0.82, 2.0);
g.fillStyle = '#efe7d2';
g.fillRect(-2.37, -1.98, 0.02, 2.0);
g.fillRect(-1.53, -1.98, 0.02, 2.0);
g.fillRect(-2.35, -2.0, 0.82, 0.02);
g.fillStyle = '#2f2f31';
g.fillRect(-1.68, -1.05, 0.08, 0.03);
// pegs and the coats on them: Papa's dark jacket, an oilskin
g.fillStyle = '#6e5c48';
for (const x of [-3.2, -2.95, -0.95]) g.fillRect(x, -1.72, 0.04, 0.04);
g.fillStyle = '#3e4644';
g.beginPath();
g.moveTo(-3.18, -1.7);
g.lineTo(-3.34, -0.95);
g.lineTo(-3.0, -0.92);
g.closePath();
g.fill();
g.fillStyle = '#b39a3c';
g.beginPath();
g.moveTo(-2.93, -1.7);
g.lineTo(-3.08, -0.85);
g.lineTo(-2.75, -0.82);
g.closePath();
g.fill();
// the storm lantern on its hook
g.fillStyle = '#4a4c4e';
g.fillRect(-0.94, -1.7, 0.012, 0.08);
g.fillRect(-1.0, -1.62, 0.12, 0.02);
g.fillStyle = 'rgba(214,220,214,0.9)';
g.fillRect(-0.99, -1.6, 0.1, 0.16);
g.fillStyle = '#4a4c4e';
g.fillRect(-1.0, -1.44, 0.12, 0.04);
// the broom
g.strokeStyle = '#8b7556';
g.lineWidth = 0.025;
g.beginPath();
g.moveTo(-1.2, -1.45);
g.lineTo(-1.32, -0.25);
g.stroke();
g.fillStyle = '#b8a171';
g.beginPath();
g.moveTo(-1.38, -0.3);
g.lineTo(-1.24, -0.3);
g.lineTo(-1.2, 0.0);
g.lineTo(-1.46, 0.0);
g.closePath();
g.fill();
