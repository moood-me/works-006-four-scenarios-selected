// The floor seen from above (its centre 3.425 m ahead; x across, y toward the viewer — a point `distance` ahead is at
// y = 3.425 − distance): big pale flagstones, worn smooth, their joints a darker grey; under the doorway (x −0.1…1.0,
// 6.0–6.45 m ahead) the threshold, one long darker stone hollowed a little by feet
const Y = d => 3.425 - d;
g.fillStyle = '#7d776d';
g.fillRect(-3.2, -3.025, 6.4, 6.05);
const rows = [0.4, 1.25, 2.05, 2.95, 3.8, 4.7, 5.5, 6.0];
for (let r = 0; r < rows.length - 1; r++) {
  let x = -3.2 - 0.4 * e.anim.hash(r, 1);
  let i = 0;
  while (x < 3.2) {
    const w = 0.7 + 0.5 * e.anim.hash(r * 30 + i, 2);
    const t = 176 + Math.round(18 * e.anim.hash(r * 30 + i, 3));
    g.fillStyle = `rgb(${t}, ${t - 5}, ${t - 14})`;
    g.fillRect(x + 0.02, Y(rows[r + 1]) + 0.02, w - 0.04, rows[r + 1] - rows[r] - 0.04);
    x += w;
    i++;
  }
}
// the threshold stone, its middle worn paler
g.fillStyle = '#958c7e';
g.fillRect(-0.12, Y(6.45), 1.14, 0.47);
g.fillStyle = 'rgba(214, 204, 186, 0.35)';
g.beginPath();
g.ellipse(0.45, Y(6.22), 0.32, 0.12, 0, 0, Math.PI * 2);
g.fill();
