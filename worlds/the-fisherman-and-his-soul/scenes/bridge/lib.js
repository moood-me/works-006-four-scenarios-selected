// What the town's houses share: a house painted flat, its front toward the viewer — plain limewashed walls, a steep
// roof, windows in rows, some lit (their glass warm and glowing: e.light, a glow and a little light of its own), a
// door. In metres, its foot's middle at the origin. `k` — the kind: its width, its floors, the eave and the ridge, how
// many windows a floor, which of them are lit (by `seed`)
function house(g, e, k) {
  const hash = (n, s) => anim.hash(n, k.seed * 37 + s);
  const w = k.width;
  const eave = k.eave;
  g.fillStyle = k.wall;
  g.fillRect(-w / 2, -eave, w, eave);
  // a darker plinth and the shade under the eave
  g.fillStyle = 'rgba(70, 60, 52, 0.35)';
  g.fillRect(-w / 2, -0.5, w, 0.5);
  g.fillStyle = 'rgba(40, 34, 30, 0.3)';
  g.fillRect(-w / 2, -eave, w, 0.25);
  // the roof: a gable over the front, or a hip seen from the front
  g.fillStyle = k.roof;
  g.beginPath();
  g.moveTo(-w / 2 - 0.3, -eave + 0.05);
  if (k.hip) {
    g.lineTo(-w / 2 + 1.2, -k.ridge);
    g.lineTo(w / 2 - 1.2, -k.ridge);
  } else {
    g.lineTo(0, -k.ridge);
  }
  g.lineTo(w / 2 + 0.3, -eave + 0.05);
  g.closePath();
  g.fill();
  // a chimney
  g.fillRect(w * 0.18, -k.ridge + 0.3, 0.45, 1.2);
  // the windows: rows of them, lit or dark
  const cols = k.cols;
  let n = 0;
  for (let f = 0; f < k.floors; f++) {
    const y = -1.15 - f * 2.4 - 1.1;
    for (let c = 0; c < cols; c++) {
      const x = -w / 2 + (w * (c + 0.5)) / cols - 0.35;
      if (f === 0 && c === k.door) {
        g.fillStyle = '#3a2e28';
        g.fillRect(x - 0.05, -2.1, 0.8, 2.1);
        continue;
      }
      const lit = hash(n++, 1) < k.lit;
      g.fillStyle = '#4a3c32';
      g.fillRect(x - 0.06, y - 0.06, 0.82, 1.27);
      g.fillStyle = lit ? '#ffd08a' : '#2c3442';
      g.fillRect(x, y, 0.7, 1.15);
      g.fillStyle = '#4a3c32';
      g.fillRect(x + 0.33, y, 0.04, 1.15);
      g.fillRect(x, y + 0.52, 0.7, 0.04);
      if (lit) e.light(x + 0.35, y + 0.6, 0.8, '#ffc070', 1.6 + 0.6 * hash(n, 2), `w${n}`);
    }
  }
}
return { house };
