// The two beds side by side, seen from their foot: Grandmother's on the left, Sophia's, smaller, on the right — white
// iron bedsteads, white covers, a grey wool blanket folded at each foot, the pillows beyond. Metres from the middle of
// their foot (between the two), 1 m to the tops of their head-rails.
const bed = (x0, w, rail) => {
  // the head-rail beyond, the pillow, the cover
  g.fillStyle = '#e9e7e1';
  g.fillRect(x0, -rail - 0.05, w, 0.04);
  for (let k = 0; k <= 6; k++) g.fillRect(x0 + (k * w) / 6 - 0.012, -rail - 0.05, 0.024, 0.4);
  g.fillStyle = '#f2f0ea';
  g.beginPath();
  g.ellipse(x0 + w / 2, -rail + 0.35, w * 0.36, 0.09, 0, 0, 6.2832);
  g.fill();
  g.fillStyle = '#ecebe5';
  g.fillRect(x0, -0.58, w, 0.2);
  // the folded blanket at the foot
  g.fillStyle = '#8e9296';
  g.fillRect(x0 + 0.04, -0.6, w - 0.08, 0.1);
  // the foot-rail
  g.fillStyle = '#e4e2dc';
  g.fillRect(x0 - 0.03, -0.66, 0.04, 0.68);
  g.fillRect(x0 + w - 0.01, -0.66, 0.04, 0.68);
  g.fillRect(x0, -0.64, w, 0.035);
  g.fillRect(x0, -0.42, w, 0.025);
  for (let k = 1; k < 5; k++) g.fillRect(x0 + (k * w) / 5 - 0.008, -0.64, 0.016, 0.24);
  g.fillStyle = '#d8d6cf';
  g.fillRect(x0, -0.38, w, 0.38);
};
bed(-1.55, 1.0, 1.0);
bed(0.35, 0.8, 0.85);
