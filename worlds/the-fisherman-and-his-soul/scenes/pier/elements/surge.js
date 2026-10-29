// The sea coming over the sand (chapter 4's wave, `wave`): a sheet of dark green-grey water seen from above, its foam
// at its landward edge (y +4) in streaks and lumps; the scene's script moves it in from the sea and up over the sand
// (surge_d, surge_e): under the water at 0, at the edge at 0.3, over the sand to the hut at 1, a little raised —
// what lies on the sand under it
g.fillStyle = '#2f4a4c';
g.fillRect(-20, -4, 40, 8);
for (let i = 0; i < 160; i++) {
  const x = -20 + 40 * e.anim.hash(i, 1);
  const y = -4 + 7.2 * e.anim.hash(i, 2);
  g.fillStyle = 'rgba(200, 220, 222, ' + (0.15 + 0.3 * e.anim.hash(i, 3)).toFixed(3) + ')';
  g.fillRect(x, y, 0.5 + 1.5 * e.anim.hash(i, 4), 0.06);
}
const foam = g.createLinearGradient(0, 3.0, 0, 4);
foam.addColorStop(0, 'rgba(226, 236, 236, 0)');
foam.addColorStop(0.6, 'rgba(226, 236, 236, 0.9)');
foam.addColorStop(1, 'rgba(240, 246, 246, 1)');
g.fillStyle = foam;
g.fillRect(-20, 3.0, 40, 1);
e.layer('churn', { box: [-20, 2.6, 20, 4], drift: [0.6, 0] }, g => {
  for (let i = 0; i < 70; i++) {
    const x = -20 + 40 * e.anim.hash(i, 7);
    g.fillStyle = 'rgba(246, 250, 250, 0.7)';
    g.beginPath();
    g.ellipse(x, 3.6 + 0.3 * e.anim.hash(i, 8), 0.3 + 0.4 * e.anim.hash(i, 9), 0.08, 0, 0, Math.PI * 2);
    g.fill();
    g.beginPath();
    g.ellipse(x - 40, 3.6 + 0.3 * e.anim.hash(i, 8), 0.3 + 0.4 * e.anim.hash(i, 9), 0.08, 0, 0, Math.PI * 2);
    g.fill();
  }
});
