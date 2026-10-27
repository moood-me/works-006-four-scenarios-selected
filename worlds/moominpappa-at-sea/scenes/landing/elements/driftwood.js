// Driftwood the storm threw up along the cove's waterline (`driftwood`): bleached grey trunks and branches with stubs
// of roots, tangles of brown kelp over them — each a part at its own depth along the shore.
if (e.state.driftwood) {
  const logs = [[-1.1, -2.3, 2.2, 0.16, 0.12], [0.25, -0.2, 1.6, 0.12, -0.08], [0.6, 2.4, 2.6, 0.2, 0.05], [0.9, 4.6, 1.3, 0.1, -0.15], [-0.2, 5.6, 1.9, 0.14, 0.1], [2.5, 0.5, 1.1, 0.09, 0.2]];
  for (const [dx, dz, len, r, turn] of logs) {
    e.part(dx, dz, p => {
      p.save();
      p.rotate(turn * 0.3);
      p.fillStyle = "#b9b2a8";
      p.beginPath();
      p.moveTo(-len / 2, -r * 0.2);
      p.quadraticCurveTo(-len / 2 - 0.05, -r * 2, -len / 2 + 0.1, -r * 2);
      p.lineTo(len / 2 - 0.05, -r * 1.7);
      p.quadraticCurveTo(len / 2 + 0.04, -r, len / 2, 0);
      p.closePath();
      p.fill();
      p.strokeStyle = "rgba(110, 100, 92, 0.6)";
      p.lineWidth = 0.012;
      for (let k = 0; k < 3; k++) {
        p.beginPath();
        p.moveTo(-len / 2 + 0.1, -r * (0.5 + 0.4 * k));
        p.lineTo(len / 2 - 0.1, -r * (0.45 + 0.38 * k));
        p.stroke();
      }
      // a stub of a root at one end, a broken branch
      p.strokeStyle = "#a9a196";
      p.lineWidth = r * 0.5;
      p.lineCap = "round";
      p.beginPath();
      p.moveTo(-len / 2 + 0.05, -r);
      p.lineTo(-len / 2 - 0.15, -r * 2.6);
      p.moveTo(len * 0.1, -r * 1.8);
      p.lineTo(len * 0.18, -r * 3.4);
      p.stroke();
      // kelp over it
      p.fillStyle = "rgba(96, 78, 40, 0.85)";
      p.beginPath();
      p.ellipse(len * 0.2, -r * 1.6, len * 0.12, r * 0.6, 0.1, 0, Math.PI * 2);
      p.fill();
      p.restore();
    }, [-len / 2 - 0.4, -0.7, len / 2 + 0.3, 0.1]);
  }
}
