// A pale light under the water by the stone, not rising (4.1, `under_light`): a glow lying in the water (a plane just
// under its surface) where she would come up; its light faint on the water round it
e.layer('pale', { box: [-1.2, -1.2, 1.2, 1.2] }, g => {
  const r = g.createRadialGradient(0, 0, 0, 0, 0, 1.1);
  r.addColorStop(0, 'rgba(200, 240, 236, 0.85)');
  r.addColorStop(1, 'rgba(200, 240, 236, 0)');
  g.fillStyle = r;
  g.fillRect(-1.2, -1.2, 2.4, 2.4);
});
e.light(0, 0, 0.7, '#c8f0ea', 1.4, 'pale');
