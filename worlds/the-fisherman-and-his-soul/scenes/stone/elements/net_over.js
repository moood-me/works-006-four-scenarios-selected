// His net hauled over the boat's bow into the water (П.2–П.3, 4.5): from the stem's rail a few dripping ropes of it
// slanting down to the water off the bow, a band of its mesh lying on the water there — round her shoulders while she
// is in it (`mermaid_at` net) — a row of cork floats along its edge. Metres from where it meets the water before her (the
// card's foot); only while `net` is over. Layers its animate moves: `ropes` (about the stem) and `mesh`, `fish` — the
// net drawn in toward the bow as `haul` goes 0 → 1, fuller as `fish` does; `knot` — the knot by her hand, loosening
// (`knot` 1: loose). Torn at its far edge with `net_hole` 1, wider with 2 (painted: it changes once). Points: `rope` —
// the rope at the bow where his hands pull; `knot` — the knot by her hand
if (!e.state.boat || e.state.net !== 'over') return;
const hole = e.state.net_hole ?? 0;
e.layer('ropes', { pivot: [-0.44, -0.6] }, g => {
  g.strokeStyle = 'rgba(120, 96, 70, 0.9)';
  g.lineWidth = 0.012;
  for (let i = 0; i < 4; i++) {
    g.beginPath();
    g.moveTo(-0.44 + 0.02 * i, -0.6 + 0.03 * i);
    g.quadraticCurveTo(-0.2 + 0.05 * i, -0.3, -0.05 + 0.12 * i, 0);
    g.stroke();
  }
  // the hauling rope, thicker, at the stem
  g.strokeStyle = '#8a6a48';
  g.lineWidth = 0.022;
  g.beginPath();
  g.moveTo(-0.46, -0.62);
  g.quadraticCurveTo(-0.36, -0.42, -0.3, -0.2);
  g.stroke();
});
// the mesh on the water: diamonds across a low band — a gap torn at its far (right) edge as `net_hole` says
const torn = x => (hole >= 1 && x > 0.32 && x < 0.44) || (hole >= 2 && x > 0.2 && x < 0.5);
e.layer('mesh', { pivot: [-0.44, -0.02] }, g => {
  g.strokeStyle = 'rgba(132, 106, 80, 0.85)';
  g.lineWidth = 0.008;
  for (let x = -0.5; x <= 0.5; x += 0.06) {
    if (torn(x)) continue;
    g.beginPath();
    g.moveTo(x, -0.06);
    g.lineTo(x + 0.06, 0.02);
    g.moveTo(x + 0.06, -0.06);
    g.lineTo(x, 0.02);
    g.stroke();
  }
  if (hole >= 1) {
    // the torn threads hanging at the gap
    g.strokeStyle = 'rgba(132, 106, 80, 0.7)';
    for (const x of hole >= 2 ? [0.2, 0.26, 0.5] : [0.32, 0.44]) {
      g.beginPath();
      g.moveTo(x, -0.05);
      g.quadraticCurveTo(x + 0.02, -0.01, x - 0.01, 0.03);
      g.stroke();
    }
  }
  g.fillStyle = '#d8c79a';
  for (let i = 0; i < 7; i++) {
    const x = -0.45 + 0.15 * i;
    if (torn(x)) continue;
    g.beginPath();
    g.ellipse(x, -0.06, 0.03, 0.018, 0, 0, Math.PI * 2);
    g.fill();
  }
});
// the catch in the mesh: silver backs of fish, a flick of a tail here and there
e.layer('fish', { pivot: [-0.44, -0.02] }, g => {
  for (let i = 0; i < 9; i++) {
    const x = -0.4 + 0.75 * e.anim.hash(i, 1);
    if (torn(x)) continue;
    const y = -0.045 + 0.04 * e.anim.hash(i, 2);
    g.fillStyle = e.anim.hash(i, 3) > 0.5 ? '#c9d3d8' : '#a9b8bf';
    g.beginPath();
    g.ellipse(x, y, 0.035, 0.011, (e.anim.hash(i, 4) - 0.5) * 0.6, 0, Math.PI * 2);
    g.fill();
  }
});
// the knot by her hand: a loop of twine over a float, its ends
e.layer('knot', { pivot: [0.1, -0.08] }, g => {
  g.strokeStyle = '#9a7a56';
  g.lineWidth = 0.012;
  g.beginPath();
  g.ellipse(0.1, -0.08, 0.025, 0.018, 0.4, 0, Math.PI * 2);
  g.stroke();
  g.beginPath();
  g.moveTo(0.12, -0.07);
  g.quadraticCurveTo(0.16, -0.05, 0.15, -0.01);
  g.moveTo(0.08, -0.07);
  g.quadraticCurveTo(0.05, -0.04, 0.07, 0);
  g.stroke();
});
e.at(-0.42, -0.58, 'rope');
e.at(0.1, -0.08, 'knot');
