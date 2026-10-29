// The altar-table against the left wall, its long side toward the room (x runs away from the viewer: −0.92 is its near
// end, 2.78 m ahead): a plain table under a white linen cloth falling to the floor, a woven band of blue and madder
// across the cloth's fall, a short fringe at its hem
g.fillStyle = '#f2eee4';
g.fillRect(-0.92, -0.95, 1.84, 0.95);
// the folds of the linen: faint upright shades
g.fillStyle = 'rgba(190, 182, 166, 0.35)';
for (let i = 0; i < 9; i++) g.fillRect(-0.85 + 0.2 * i + 0.04 * e.anim.hash(i, 1), -0.8, 0.025, 0.78);
// the band
g.fillStyle = '#3f5c88';
g.fillRect(-0.92, -0.86, 1.84, 0.1);
g.fillStyle = '#9a4a3c';
g.fillRect(-0.92, -0.83, 1.84, 0.03);
// the fringe
g.fillStyle = '#d8d0bf';
for (let x = -0.9; x < 0.92; x += 0.035) g.fillRect(x, -0.04, 0.012, 0.04);
