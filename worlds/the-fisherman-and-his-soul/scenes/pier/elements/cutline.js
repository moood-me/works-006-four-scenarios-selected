// The line the knife is drawn along (М3, М6): where his shadow, falling from his feet toward the viewer (his back to
// the moon), leaves him — on the boards just before his knees as he kneels at the pier's end, across, so that it lies
// open to the viewer and is not hidden under him; a dark band of shadow; the cut a thin line of light along it (layer
// `cut`, drawn out from the heel by `cut` — its animate), ragged when `cut_rough`. Seen from above (x across, y toward
// the viewer), metres from the element's place. Points `heel`, `toe` (the line's two ends, left and right)
const HEEL = [-0.2, 0];
const TOE = [0.2, 0.02];
const rough = !!e.state.cut_rough;
g.fillStyle = 'rgba(20, 22, 34, 0.55)';
g.save();
g.translate((HEEL[0] + TOE[0]) / 2, (HEEL[1] + TOE[1]) / 2);
g.rotate(Math.atan2(TOE[1] - HEEL[1], TOE[0] - HEEL[0]));
g.beginPath();
g.ellipse(0, 0, 0.26, 0.07, 0, 0, Math.PI * 2);
g.fill();
g.restore();
e.layer('cut', { pivot: HEEL }, g => {
  g.strokeStyle = 'rgba(236, 244, 255, 0.95)';
  g.lineWidth = 0.008;
  g.beginPath();
  g.moveTo(HEEL[0], HEEL[1]);
  const n = 10;
  for (let i = 1; i <= n; i++) {
    const u = i / n;
    const j = rough ? (e.anim.hash(i, 1) - 0.5) * 0.03 : 0;
    g.lineTo(HEEL[0] + (TOE[0] - HEEL[0]) * u + j, HEEL[1] + (TOE[1] - HEEL[1]) * u - j * 0.6);
  }
  g.stroke();
  e.light(TOE[0], TOE[1], 0.03, '#e8f0ff', 0.6, 'edge');
});
e.at(HEEL[0], HEEL[1], 'heel');
e.at(TOE[0], TOE[1], 'toe');
