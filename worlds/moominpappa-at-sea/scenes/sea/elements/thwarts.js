// The two thwarts, the plank seats across the boat, from above (one plane over her after half, in her frame: y toward
// the bow): the middle one (Mama's and the son's) and the narrower one by the stern (Papa's at the tiller), grey-brown,
// worn paler where people sit; clear between them.
for (const [y, w] of [[0.45, 0.76], [-0.45, 0.6]]) {
  g.fillStyle = '#9a8468';
  g.fillRect(-w, y - 0.12, 2 * w, 0.24);
  g.fillStyle = 'rgba(214, 200, 176, 0.35)';
  g.fillRect(-0.35, y - 0.1, 0.7, 0.2);
  g.fillStyle = 'rgba(50, 40, 30, 0.5)';
  g.fillRect(-w, y - 0.005, 2 * w, 0.01);
}
