// The big boat's deck from above: grey floorboards along it, worn paler down the middle where they walk, the bilge's
// dark gaps, cut to the boat's shape: the plane's far edge (y −4.4) is the stern, its near edge (y 4.4) the bow, where
// it narrows to the stem. Metres from its middle.
// Points: `seat` (by the forward thwart, where they sit), `bow` (the bow's deck).
g.fillStyle = '#8f8a82';
g.beginPath();
g.moveTo(-1.15, -4.4);
g.lineTo(1.15, -4.4);
g.lineTo(1.25, 2.4);
g.lineTo(0, 4.4);
g.lineTo(-1.25, 2.4);
g.closePath();
g.fill();
g.save();
g.clip();
for (let x = -1.25; x < 1.25; x += 0.14) {
  const v = e.rnd();
  g.fillStyle = v < 0.2 ? '#7d786f' : v < 0.7 ? '#9a958c' : '#a6a198';
  g.fillRect(x + 0.012, -4.4, 0.12, 8.8);
}
g.fillStyle = 'rgba(220,214,204,0.25)';
g.fillRect(-0.35, -4.4, 0.7, 8.8);
g.restore();
e.at(-0.1, 0.2, 'seat');
e.at(0, 3.4, 'bow');
