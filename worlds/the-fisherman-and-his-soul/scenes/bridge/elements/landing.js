// A landing of stone down at the water under the bridge's end, against the quay's wall (where one sits by the river —
// 3.1): seen from above, worn slabs, darker and wet at the water's edge
g.fillStyle = '#7a7266';
g.fillRect(-0.6, -1.1, 1.2, 2.2);
for (let i = 0; i < 4; i++) {
  const tone = 120 + Math.round(18 * e.anim.hash(i, 1));
  g.fillStyle = 'rgb(' + tone + ', ' + (tone - 4) + ', ' + (tone - 14) + ')';
  g.fillRect(-0.58, -1.08 + 0.55 * i, 1.16, 0.51);
}
g.fillStyle = 'rgba(40, 46, 50, 0.45)';
g.fillRect(-0.6, -1.1, 0.25, 2.2);
