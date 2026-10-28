// Moominpappa's sea chart: an old printed chart of the gulf he keeps at home, gone over in his pencil and a little
// watercolour — the coast of the valley on the left, the open sea with its compass rose and soundings, far out on the
// right a dot of an island with a lighthouse (ringed in pencil), the printed plan of that island at a large scale, and
// past it more open sea and the chart's cartouche. Painted in the chart's own units (W × H, x right, y down): the
// caller scales and places it. (The drawing is laid out OX units in from the left edge — the valley's hinterland
// before it; what is exported is in the chart's units.) The scene
// `chart` hangs it as the play's map; the valley's insert `chart` shows it on the veranda table under the lamp.
const W = 140, H = 28, OX = 20;
const hash = (n, seed) => anim.hash(n, seed);
// the valley's coast, from the top edge down to the bottom; the land lies left of it
const COAST = [[16.5, 0], [18, 2.2], [17.2, 4.4], [19.6, 6.2], [21.4, 8.6], [20.2, 10.8], [18, 12.2], [15.8, 13.2], [15.1, 14.6],
  [15.6, 16], [17.4, 16.8], [19.8, 17.6], [22, 19.6], [21, 22.2], [19.2, 24], [20.4, 26.2], [19.5, 28]];
// the river of the valley, from the hills down to its mouth in the bay
const RIVER = [[3, 6], [6, 9.2], [9, 10.6], [11.6, 12.6], [13.6, 14], [15.3, 14.7]];
// islets off the coast: [x, y, size]
const ISLETS = [[24.2, 8.6, 0.7], [23.4, 23.2, 0.9], [27.4, 15.6, 0.45], [25.6, 4.2, 0.5]];
// the compass rose
const ROSE = [40, 14.5, 5.2];
// the island on the chart, and its lighthouse
const ISLAND = [60, 13.2];
// the inset: the island's plan at a large scale — its frame, the island's outline in it, what is on the island
const INSET = [66, 3.4, 98, 25.4];
const PLAN = [[71, 18.6], [72.6, 16.8], [74.4, 13.4], [76.8, 10.4], [79.6, 8.6], [83.4, 8], [86.6, 8.8], [89.6, 10.2], [92, 12.4],
  [93.6, 15], [93, 17.6], [90.6, 19.4], [87.2, 20.4], [83.6, 20.8], [80.6, 20.2], [78.6, 21.4], [76.6, 20.4], [74.4, 19.4], [72.2, 19.6]];
const PLACES = { lighthouse: [84.6, 11.6], landing: [79.6, 20.6], cape: [71.4, 18.9], pool: [80.6, 14.6], shore: [92.2, 15.6] };
// Papa's course, from the valley's bay to the island: a curve, as pencilled
const FROM = [16.4, 15.4], C1 = [30, 20.5], C2 = [46, 8.2], TO = [58.6, 13.6];
function courseIn(t) {
  const u = 1 - t;
  return [u * u * u * FROM[0] + 3 * u * u * t * C1[0] + 3 * u * t * t * C2[0] + t * t * t * TO[0],
    u * u * u * FROM[1] + 3 * u * u * t * C1[1] + 3 * u * t * t * C2[1] + t * t * t * TO[1]];
}
const PENCIL = 'rgba(70, 64, 60, 0.85)', SEPIA = '#5d4630', SEA = 'rgba(96, 140, 168, ', LAND = '#d9c58e';

function poly(g, pts, close) {
  g.beginPath();
  pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
  if (close) g.closePath();
}
// a watercolour wash: a few soft blots of one colour
function wash(g, x, y, r, rgb, a) {
  const s = g.createRadialGradient(x, y, 0, x, y, r);
  s.addColorStop(0, `rgba(${rgb}, ${a})`);
  s.addColorStop(1, `rgba(${rgb}, 0)`);
  g.fillStyle = s;
  g.fillRect(x - r, y - r, 2 * r, 2 * r);
}
// the sea shaded darker along a coast (the engraver's lines of water), as strokes of the outline wider and fainter
function waterline(g, pts, close) {
  g.lineJoin = 'round';
  for (const [w, a] of [[1.6, 0.08], [0.8, 0.12], [0.3, 0.2]]) {
    g.strokeStyle = SEA + a + ')';
    g.lineWidth = w;
    poly(g, pts, close);
    g.stroke();
  }
}
function hill(g, x, y, s) {
  g.strokeStyle = SEPIA;
  g.lineWidth = 0.07;
  g.beginPath();
  g.moveTo(x - s, y);
  g.quadraticCurveTo(x - s * 0.3, y - s * 1.1, x, y - s * 1.2);
  g.quadraticCurveTo(x + s * 0.4, y - s * 0.9, x + s, y);
  g.stroke();
  g.lineWidth = 0.04;
  for (let k = 0; k < 4; k++) {
    const hx = x + s * (0.1 + k * 0.2);
    g.beginPath();
    g.moveTo(hx, y - s * (1.05 - k * 0.24));
    g.lineTo(hx + s * 0.12, y - s * (0.72 - k * 0.17));
    g.stroke();
  }
}
function tree(g, x, y, s) {
  g.fillStyle = 'rgba(92, 120, 72, 0.75)';
  g.beginPath();
  g.arc(x, y - s, s * 0.6, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = SEPIA;
  g.lineWidth = 0.05;
  g.beginPath();
  g.moveTo(x, y - s * 0.4);
  g.lineTo(x, y);
  g.stroke();
}
function pine(g, x, y, s) {
  g.strokeStyle = '#2c3a2e';
  g.lineWidth = 0.06;
  g.beginPath();
  g.moveTo(x, y);
  g.lineTo(x, y - s * 1.3);
  g.moveTo(x - s * 0.5, y - s * 0.35);
  g.lineTo(x, y - s * 1.1);
  g.lineTo(x + s * 0.5, y - s * 0.35);
  g.moveTo(x - s * 0.35, y - s * 0.75);
  g.lineTo(x, y - s * 1.3);
  g.lineTo(x + s * 0.35, y - s * 0.75);
  g.stroke();
}
// the lighthouse's sign: a little tower, its light in rays
function lighthouse(g, x, y, s) {
  g.strokeStyle = 'rgba(200, 150, 40, 0.8)';
  g.lineWidth = 0.06 * s;
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * Math.PI * 2;
    g.beginPath();
    g.moveTo(x + Math.cos(a) * 0.55 * s, y - 1.1 * s + Math.sin(a) * 0.55 * s);
    g.lineTo(x + Math.cos(a) * 1.05 * s, y - 1.1 * s + Math.sin(a) * 1.05 * s);
    g.stroke();
  }
  g.fillStyle = '#f4efe2';
  g.strokeStyle = SEPIA;
  g.lineWidth = 0.06 * s;
  g.beginPath();
  g.moveTo(x - 0.28 * s, y);
  g.lineTo(x - 0.17 * s, y - 1.0 * s);
  g.lineTo(x + 0.17 * s, y - 1.0 * s);
  g.lineTo(x + 0.28 * s, y);
  g.closePath();
  g.fill();
  g.stroke();
  g.fillStyle = '#e8b84a';
  g.fillRect(x - 0.17 * s, y - 1.25 * s, 0.34 * s, 0.25 * s);
  g.strokeRect(x - 0.17 * s, y - 1.25 * s, 0.34 * s, 0.25 * s);
}
function frame(g, x0, y0, x1, y1) {
  g.strokeStyle = SEPIA;
  g.lineWidth = 0.08;
  g.strokeRect(x0, y0, x1 - x0, y1 - y0);
  g.lineWidth = 0.03;
  g.strokeRect(x0 + 0.35, y0 + 0.35, x1 - x0 - 0.7, y1 - y0 - 0.7);
}
function soundings(g, n, x0, y0, x1, y1, seed, avoid) {
  g.fillStyle = 'rgba(74, 70, 66, 0.7)';
  g.font = 'italic 0.48px Georgia, serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  for (let i = 0; i < n; i++) {
    const x = x0 + (x1 - x0) * hash(i, seed), y = y0 + (y1 - y0) * hash(i, seed + 1);
    if (avoid(x, y)) continue;
    g.fillText(String(Math.round(4 + 40 * hash(i, seed + 2) ** 1.6)), x, y);
  }
}

// the whole chart; { course: true } — Papa's course pencilled on it too
function paint(g, opts) {
  const o = opts || {};
  g.save();
  g.beginPath();
  g.rect(0, 0, W, H);
  g.clip();
  // the paper: yellowed, stains, the folds it has been kept in
  g.fillStyle = '#ece0bf';
  g.fillRect(0, 0, W, H);
  for (let i = 0; i < 40; i++) {
    wash(g, W * hash(i, 11), H * hash(i, 12), 2 + 6 * hash(i, 13), '160, 120, 70', 0.05 + 0.07 * hash(i, 14));
  }
  g.translate(OX, 0);
  // the open sea washed in thin blue, deeper away from the coasts
  for (let i = 0; i < 62; i++) {
    const x = 20 + 98 * hash(i, 21), y = H * hash(i, 22);
    wash(g, x, y, 4 + 5 * hash(i, 23), '150, 186, 204', 0.12 + 0.1 * hash(i, 24));
  }
  // the land of the valley: its ochre and green, the sea darker along its coast
  const land = [...COAST, [-OX, 28], [-OX, 0]];
  waterline(g, COAST, false);
  for (const [x, y, r] of ISLETS) {
    const pts = [];
    for (let k = 0; k < 9; k++) {
      const a = (k / 9) * Math.PI * 2, q = r * (0.75 + 0.45 * hash(k + x * 7, 31));
      pts.push([x + Math.cos(a) * q * 1.4, y + Math.sin(a) * q]);
    }
    waterline(g, pts, true);
    g.fillStyle = '#e2c0a8';
    poly(g, pts, true);
    g.fill();
    g.strokeStyle = SEPIA;
    g.lineWidth = 0.05;
    g.stroke();
  }
  g.fillStyle = LAND;
  poly(g, land, true);
  g.fill();
  g.save();
  poly(g, land, true);
  g.clip();
  for (let i = 0; i < 40; i++) {
    wash(g, -OX + (OX + 20) * hash(i, 41), H * hash(i, 42), 1.5 + 3 * hash(i, 43), hash(i, 44) < 0.6 ? '130, 160, 90' : '200, 150, 80', 0.3);
  }
  g.restore();
  g.strokeStyle = SEPIA;
  g.lineWidth = 0.08;
  poly(g, COAST, false);
  g.stroke();
  // the hills and the Lonely Mountains, the woods, the river, the house
  for (const [x, y, s] of [[3, 4.6, 1.4], [5.6, 3.2, 1.2], [8, 5, 1], [2.4, 8.4, 0.9], [4.2, 23.8, 1.2], [7, 25.4, 1], [2.4, 26.4, 0.8],
    [11.8, 3, 0.8], [-17, 5, 1.6], [-13.5, 3.4, 1.4], [-10, 5.6, 1.2], [-15.5, 9.5, 1.3], [-6.5, 3.6, 1.1], [-3, 6.2, 1], [-16, 22, 1.5],
    [-11.5, 24.4, 1.2], [-6, 25.6, 1], [-12, 15.5, 1]]) hill(g, x, y, s);
  for (let i = 0; i < 30; i++) {
    const x = -18 + 18 * hash(i, 54), y = 10 + 11 * hash(i, 55);
    tree(g, x, y, 0.35 + 0.2 * hash(i, 56));
  }
  for (let i = 0; i < 26; i++) {
    const x = 4 + 13 * hash(i, 51), y = 9 + 13 * hash(i, 52);
    if (Math.abs(y - (14.2 + (x - 13) * 0.42)) < 1.2) continue;
    tree(g, x, y, 0.35 + 0.2 * hash(i, 53));
  }
  g.strokeStyle = SEA + '0.9)';
  g.lineWidth = 0.18;
  g.lineCap = 'round';
  poly(g, RIVER, false);
  g.stroke();
  // the Moomins' house: a little blue round tower, its red roof
  g.fillStyle = '#4f86c0';
  g.fillRect(10.2, 15.6, 1.2, 1.8);
  g.fillStyle = '#b24a35';
  g.beginPath();
  g.moveTo(9.9, 15.7);
  g.lineTo(10.8, 14.4);
  g.lineTo(11.7, 15.7);
  g.closePath();
  g.fill();
  g.strokeStyle = SEPIA;
  g.lineWidth = 0.05;
  g.strokeRect(10.2, 15.6, 1.2, 1.8);
  g.fillStyle = SEPIA;
  g.font = 'italic 1.05px Georgia, serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(tr('Moominvalley'), 9.2, 19.4);
  // the compass rose and its rhumb lines
  const [rx, ry, rr] = ROSE;
  g.strokeStyle = 'rgba(120, 70, 60, 0.22)';
  g.lineWidth = 0.035;
  for (let k = 0; k < 16; k++) {
    const a = (k / 16) * Math.PI * 2;
    g.beginPath();
    g.moveTo(rx + Math.cos(a) * rr, ry + Math.sin(a) * rr);
    g.lineTo(rx + Math.cos(a) * 60, ry + Math.sin(a) * 60);
    g.stroke();
  }
  g.strokeStyle = SEPIA;
  g.lineWidth = 0.05;
  for (const r of [rr, rr * 0.82]) {
    g.beginPath();
    g.arc(rx, ry, r, 0, Math.PI * 2);
    g.stroke();
  }
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * Math.PI * 2 - Math.PI / 2, long = k % 2 === 0, len = rr * (long ? 0.95 : 0.6), wd = rr * (long ? 0.13 : 0.1);
    const tip = [rx + Math.cos(a) * len, ry + Math.sin(a) * len];
    const l = [rx + Math.cos(a - Math.PI / 2) * wd, ry + Math.sin(a - Math.PI / 2) * wd];
    const r = [rx + Math.cos(a + Math.PI / 2) * wd, ry + Math.sin(a + Math.PI / 2) * wd];
    g.fillStyle = long ? '#a8473a' : '#e7d6ae';
    poly(g, [l, tip, [rx, ry]], true);
    g.fill();
    g.fillStyle = long ? '#f1e5c8' : '#8a6a48';
    poly(g, [r, tip, [rx, ry]], true);
    g.fill();
    g.strokeStyle = SEPIA;
    poly(g, [l, tip, r], false);
    g.stroke();
  }
  g.fillStyle = SEPIA;
  g.font = 'bold 0.9px Georgia, serif';
  g.fillText(tr.c('the compass rose: north', 'N'), rx, ry - rr - 0.7);
  // the sea's own marks: pencilled waves, soundings, a sea horse drawn in the margin of the sea
  g.strokeStyle = 'rgba(70, 96, 120, 0.45)';
  g.lineWidth = 0.05;
  for (let i = 0; i < 120; i++) {
    const x = 22 + 44 * hash(i, 61), y = 1 + 26 * hash(i, 62);
    if (Math.hypot(x - rx, y - ry) < rr + 0.6 || Math.hypot(x - ISLAND[0], y - ISLAND[1]) < 3) continue;
    g.beginPath();
    g.moveTo(x - 0.5, y);
    g.quadraticCurveTo(x - 0.25, y - 0.28, x, y);
    g.quadraticCurveTo(x + 0.25, y + 0.28, x + 0.5, y);
    g.stroke();
  }
  soundings(g, 70, 22, 1.5, 65, 27, 71, (x, y) => Math.hypot(x - rx, y - ry) < rr + 1 || Math.hypot(x - ISLAND[0], y - ISLAND[1]) < 3.2);
  g.font = 'italic 1.4px Georgia, serif';
  g.fillStyle = 'rgba(60, 88, 110, 0.7)';
  g.fillText(tr('The Open Sea'), 47, 24.6);
  // the island on the chart: a dot of granite, its lighthouse; Papa's pencil ring round it
  const [ix, iy] = ISLAND;
  const dot = [];
  for (let k = 0; k < 11; k++) {
    const a = (k / 11) * Math.PI * 2, q = 0.9 + 0.35 * hash(k, 81);
    dot.push([ix + Math.cos(a) * q * 1.5, iy + Math.sin(a) * q]);
  }
  waterline(g, dot, true);
  g.fillStyle = '#e3b0a2';
  poly(g, dot, true);
  g.fill();
  g.strokeStyle = SEPIA;
  g.lineWidth = 0.06;
  g.stroke();
  lighthouse(g, ix + 0.3, iy + 0.1, 1.2);
  g.fillStyle = SEPIA;
  g.font = 'italic 0.75px Georgia, serif';
  g.fillText(tr('Lighthouse'), ix, iy + 2.2);
  g.strokeStyle = PENCIL;
  g.lineWidth = 0.07;
  g.beginPath();
  g.ellipse(ix + 0.1, iy - 0.3, 3.4, 2.7, -0.15, 0.3, Math.PI * 2 + 0.1);
  g.stroke();
  g.beginPath();
  g.moveTo(ix + 3.1, iy - 2.2);
  g.lineTo(ix + 3.9, iy - 3.3);
  g.moveTo(ix + 3.9, iy - 2.4);
  g.lineTo(ix + 4.2, iy - 3.6);
  g.stroke();
  // the inset: the island's plan at a large scale, in its frame, its title
  const [x0, y0, x1, y1] = INSET;
  g.fillStyle = '#efe5c8';
  g.fillRect(x0, y0, x1 - x0, y1 - y0);
  for (let i = 0; i < 14; i++) {
    wash(g, x0 + (x1 - x0) * hash(i, 91), y0 + (y1 - y0) * hash(i, 92), 3 + 3 * hash(i, 93), '150, 186, 204', 0.16);
  }
  waterline(g, PLAN, true);
  g.fillStyle = '#e4ae9e';
  poly(g, PLAN, true);
  g.fill();
  g.save();
  poly(g, PLAN, true);
  g.clip();
  for (let i = 0; i < 18; i++) {
    wash(g, 71 + 23 * hash(i, 101), 8 + 13 * hash(i, 102), 1 + 2 * hash(i, 103), hash(i, 104) < 0.5 ? '170, 150, 154' : '236, 196, 180', 0.4);
  }
  // the sand of the shore on the island's east side
  for (let i = 0; i < 140; i++) {
    const a = hash(i, 111) * 1.6 - 0.8, r = 2.6 * hash(i, 112);
    g.fillStyle = 'rgba(176, 140, 80, 0.7)';
    g.fillRect(PLACES.shore[0] + Math.cos(a) * r - 0.6, PLACES.shore[1] + Math.sin(a) * r * 1.6, 0.08, 0.08);
  }
  g.restore();
  g.strokeStyle = SEPIA;
  g.lineWidth = 0.08;
  poly(g, PLAN, true);
  g.stroke();
  for (let i = 0; i < 12; i++) {
    pine(g, 77.5 + 9 * hash(i, 121), 12 + 5.5 * hash(i, 122), 0.5 + 0.2 * hash(i, 123));
  }
  g.fillStyle = '#2a2c30';
  g.beginPath();
  g.ellipse(PLACES.pool[0], PLACES.pool[1], 0.7, 0.45, 0.2, 0, Math.PI * 2);
  g.fill();
  lighthouse(g, PLACES.lighthouse[0], PLACES.lighthouse[1], 2.2);
  // reefs: little crosses about the island
  g.strokeStyle = SEPIA;
  g.lineWidth = 0.05;
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2 + hash(i, 131), x = 82.5 + Math.cos(a) * (12.5 + 1.5 * hash(i, 132)), y = 14.5 + Math.sin(a) * (8 + hash(i, 133));
    if (x < x0 + 1 || x > x1 - 1 || y < y0 + 2.4 || y > y1 - 1) continue;
    g.beginPath();
    g.moveTo(x - 0.25, y);
    g.lineTo(x + 0.25, y);
    g.moveTo(x, y - 0.25);
    g.lineTo(x, y + 0.25);
    g.stroke();
  }
  soundings(g, 26, x0 + 1, y0 + 2.6, x1 - 1, y1 - 1, 141, (x, y) => Math.hypot((x - 82.5) / 12, (y - 14.5) / 7.5) < 1.1);
  frame(g, x0, y0, x1, y1);
  g.fillStyle = SEPIA;
  g.font = 'italic 1.1px Georgia, serif';
  g.fillText(tr('The Lighthouse Island'), (x0 + x1) / 2, y0 + 1.5);
  // past the plan, more open sea: soundings, waves; the chart's cartouche with its title and a scale of miles
  soundings(g, 40, 101, 2, 118, 26, 151, () => false);
  g.strokeStyle = 'rgba(70, 96, 120, 0.45)';
  g.lineWidth = 0.05;
  for (let i = 0; i < 40; i++) {
    const x = 101 + 17 * hash(i, 161), y = 1.5 + 25 * hash(i, 162);
    if (x > 103 && x < 117 && y > 15 && y < 25.5) continue;
    g.beginPath();
    g.moveTo(x - 0.5, y);
    g.quadraticCurveTo(x - 0.25, y - 0.28, x, y);
    g.quadraticCurveTo(x + 0.25, y + 0.28, x + 0.5, y);
    g.stroke();
  }
  g.fillStyle = '#f1e7cc';
  g.fillRect(103.5, 16, 13.5, 9);
  frame(g, 103.5, 16, 117, 25);
  g.fillStyle = SEPIA;
  g.font = 'italic 1.3px Georgia, serif';
  g.fillText(tr('Chart of the Gulf'), 110.25, 19.2);
  g.strokeStyle = SEPIA;
  g.lineWidth = 0.08;
  g.beginPath();
  g.moveTo(106, 22.6);
  g.lineTo(114.5, 22.6);
  g.stroke();
  for (let k = 0; k <= 4; k++) {
    g.fillStyle = k % 2 ? '#ece0bf' : SEPIA;
    if (k < 4) g.fillRect(106 + k * 2.125, 22.35, 2.125, 0.25);
  }
  // Papa's course, in pencil dashes
  if (o.course) courseDraw(g);
  // the chart's border
  frame(g, 0.6 - OX, 0.6, W - OX - 0.6, H - 0.6);
  g.restore();
}
// Papa's course as a pencilled dashed line (in the drawing's own units)
function courseDraw(g) {
  g.strokeStyle = PENCIL;
  g.lineWidth = 0.13;
  g.lineCap = 'round';
  g.setLineDash([0.7, 0.5]);
  g.beginPath();
  for (let i = 0; i <= 60; i++) {
    const [x, y] = courseIn(i / 60);
    if (i) g.lineTo(x, y);
    else g.moveTo(x, y);
  }
  g.stroke();
  g.setLineDash([]);
}
// …in the chart's units
function courseLine(g) {
  g.save();
  g.translate(OX, 0);
  courseDraw(g);
  g.restore();
}
// the course's point at t, the island, its plan's places and frame — in the chart's units
const course = t => {
  const [x, y] = courseIn(t);
  return [x + OX, y];
};
const out = ([x, y]) => [x + OX, y];
return {
  W, H, ISLAND: out(ISLAND), PLACES: Object.fromEntries(Object.entries(PLACES).map(([k, p]) => [k, out(p)])),
  INSET: [INSET[0] + OX, INSET[1], INSET[2] + OX, INSET[3]], course, courseLine, paint,
};
