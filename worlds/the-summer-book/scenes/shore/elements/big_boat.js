// The big boat that takes them off the island at the end of August: a broad grey-white wooden motor boat, a dark
// rubbing strake, a low wheelhouse aft with small windows, a mast with a light at its top, fenders over the side; it
// lies off the far rock where the water is deep (`big_boat`: there or not — it comes between steps). Seen side-on, bow to
// the right. Metres from the middle of its waterline; 9 m long. Points: `deck` (amidships, where they sit), `bow`.
if (!e.state.big_boat) return;
e.layer('hull', { pivot: [0, 0] }, c => {
  c.fillStyle = '#d9d7d0';
  c.beginPath();
  c.moveTo(-4.4, -1.15);
  c.lineTo(4.6, -1.45);
  c.bezierCurveTo(4.2, -0.4, 3.4, 0.15, 2.2, 0.2);
  c.lineTo(-3.6, 0.2);
  c.bezierCurveTo(-4.1, 0.1, -4.35, -0.5, -4.4, -1.15);
  c.closePath();
  c.fill();
  c.fillStyle = '#3d4850';
  c.beginPath();
  c.moveTo(-4.45, -1.2);
  c.lineTo(4.66, -1.5);
  c.lineTo(4.6, -1.35);
  c.lineTo(-4.4, -1.06);
  c.closePath();
  c.fill();
  c.fillStyle = '#8d8a84';
  c.fillRect(-4.0, -0.05, 7.4, 0.25);
  // the wheelhouse aft, its windows
  c.fillStyle = '#e6e3dc';
  c.fillRect(-3.3, -2.35, 2.0, 1.25);
  c.fillStyle = '#5c6970';
  c.fillRect(-3.3, -2.45, 2.1, 0.12);
  c.fillStyle = '#7f9198';
  for (const x of [-3.1, -2.55, -2.0]) c.fillRect(x, -2.1, 0.4, 0.45);
  // the mast, its light, the fenders
  c.fillStyle = '#6b6158';
  c.fillRect(0.9, -4.4, 0.08, 3.1);
  c.fillStyle = '#efe7d2';
  c.beginPath();
  c.arc(0.94, -4.45, 0.07, 0, 6.2832);
  c.fill();
  c.fillStyle = '#5a534c';
  for (const x of [-2.4, -0.4, 1.6]) {
    c.beginPath();
    c.ellipse(x, -0.75, 0.1, 0.2, 0, 0, 6.2832);
    c.fill();
  }
  e.at(-0.3, -1.3, 'deck');
  e.at(4.2, -1.45, 'bow');
});
