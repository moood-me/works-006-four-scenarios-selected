// Papa's drawing of the island on a long sheet of watercolour paper, in ink and wash (he draws for books): the pale sea
// all round with his little waves, skerries; the long granite island — at its west end the house with its veranda, the
// peonies, the pier and the rowboat; the magic forest of grey dead trees on its crown; the calm bay on its south shore,
// the row of little graves, the full moon's path on the flat water; on the far side, the new house with its black
// windows under a storm cloud and its rain; the long back of rock to the cape and the tent on it, the fog coming in;
// out to the east the big boat going away into the white. A dotted path from the house to the cape and through the
// forest to the new house. The labels in his hand. Painted once; the sheet's foot at the anchor, u across from its
// left end, v down from its top (lib.js: the chapters' points over u CHAPTERS).
const L = e.lib;
const W = L.W;
const H = L.SHEET;
const INK = '#3a332d';
const r = () => e.rnd();
g.translate(0, -H);
// nothing past the paper
g.beginPath();
g.rect(0, 0, W, H);
g.clip();

// the paper: warm and a little uneven, foxed faintly toward its edges
g.fillStyle = '#f2ead9';
g.fillRect(0, 0, W, H);
for (let i = 0; i < 260; i++) {
  g.globalAlpha = 0.05 + 0.06 * r();
  g.fillStyle = r() < 0.5 ? '#d9cbb0' : '#fbf6ea';
  g.beginPath();
  g.ellipse(W * r(), H * r(), 0.3 + 1.4 * r(), 0.2 + 0.8 * r(), r() * 3, 0, 6.2832);
  g.fill();
}
g.globalAlpha = 1;
const edge = g.createLinearGradient(0, 0, 0, H);
edge.addColorStop(0, 'rgba(196,170,128,0.22)');
edge.addColorStop(0.05, 'rgba(196,170,128,0)');
edge.addColorStop(0.95, 'rgba(196,170,128,0)');
edge.addColorStop(1, 'rgba(196,170,128,0.22)');
g.fillStyle = edge;
g.fillRect(0, 0, W, H);

// the island's outline: its north and south shores along it, narrowing to the west tip and to the long cape in the east
const U0 = 9.8;
const U1 = 41.6;
const north = u => 6.95 + 0.32 * Math.sin(u * 0.55) + 0.2 * Math.sin(u * 1.3 + 1);
const south = u => 10.65 + 0.28 * Math.sin(u * 0.7 + 2) - 0.85 * Math.exp(-(((u - 26.2) / 1.5) ** 2));
const taper = u => Math.min(1, Math.sqrt(Math.max(0, (u - U0) / 1.8))) * Math.min(1, Math.max(0, (U1 - u) / 6.5) ** 0.6);
const mid = u => (north(u) + south(u)) / 2 + 0.25 * Math.max(0, (u - 35) / 6.6);
const half = u => ((south(u) - north(u)) / 2) * taper(u);
const top = u => mid(u) - half(u);
const bot = u => mid(u) + half(u);
const shore = [];
for (let u = U0; u <= U1; u += 0.25) shore.push([u, top(u) + (r() - 0.5) * 0.06]);
for (let u = U1; u >= U0; u -= 0.25) shore.push([u, bot(u) + (r() - 0.5) * 0.06]);
const outline = () => {
  g.beginPath();
  shore.forEach(([u, v], i) => (i ? g.lineTo(u, v) : g.moveTo(u, v)));
  g.closePath();
};

// the sea: a pale grey-blue wash not quite to the paper's edges, darker along the shore, fading into white in the east
g.fillStyle = 'rgba(176,196,200,0.55)';
g.filter = 'blur(0.08px)';
g.beginPath();
g.moveTo(0.7, 0.6);
for (let u = 0.7; u <= W - 0.7; u += 1.2) g.lineTo(u, 0.55 + 0.15 * r());
for (let v = 0.6; v <= H - 0.6; v += 1.2) g.lineTo(W - 0.6 - 0.15 * r(), v);
for (let u = W - 0.7; u >= 0.7; u -= 1.2) g.lineTo(u, H - 0.55 - 0.15 * r());
for (let v = H - 0.6; v >= 0.6; v -= 1.2) g.lineTo(0.6 + 0.15 * r(), v);
g.closePath();
g.fill();
g.strokeStyle = 'rgba(132,158,166,0.5)';
g.lineWidth = 0.9;
g.lineJoin = 'round';
outline();
g.stroke();
g.filter = 'none';
// the calm: the bay's water flat, a few long level strokes; elsewhere his little waves
g.strokeStyle = 'rgba(70,90,98,0.55)';
g.lineWidth = 0.025;
g.lineCap = 'round';
g.beginPath();
for (let i = 0; i < 70; i++) {
  const u = 1 + (W - 2) * r();
  const v = 0.9 + (H - 1.8) * r();
  if (v > top(u) - 0.5 && v < bot(u) + 0.5 && u > U0 - 0.5 && u < U1 + 0.5) continue;
  if (u > 23.5 && u < 29 && v > 10) continue;
  g.moveTo(u, v);
  g.quadraticCurveTo(u + 0.12, v - 0.1, u + 0.24, v);
  g.quadraticCurveTo(u + 0.36, v + 0.1, u + 0.48, v);
}
for (const [u, v, l] of [[24.0, 10.9, 1.6], [25.2, 11.35, 2.2], [24.6, 11.8, 1.5], [27.0, 11.1, 1.3], [27.3, 11.95, 1.4]]) {
  g.moveTo(u, v);
  g.lineTo(u + l, v);
}
g.stroke();
// the wash's own brush strokes: a little darker, long, level
g.strokeStyle = 'rgba(118,144,152,0.22)';
g.lineWidth = 0.14;
g.filter = 'blur(0.05px)';
g.beginPath();
for (let i = 0; i < 34; i++) {
  const u = 1 + (W - 6) * r();
  const v = 0.9 + (H - 1.8) * r();
  if (v > top(u) - 0.4 && v < bot(u) + 0.4 && u > U0 - 0.4 && u < U1 + 0.4) continue;
  g.moveTo(u, v);
  g.lineTo(u + 1 + 2 * r(), v + 0.05 * (r() - 0.5));
}
g.stroke();
g.filter = 'none';
// the full moon's path on the flat water, and the moon over it
g.fillStyle = 'rgba(250,248,238,0.9)';
for (let i = 0; i < 16; i++) {
  const v = 10.75 + i * 0.09;
  g.fillRect(26.1 - 0.06 - 0.12 * r(), v, 0.12 + 0.24 * r(), 0.035);
}
g.strokeStyle = INK;
g.lineWidth = 0.03;
g.beginPath();
g.arc(26.2, 12.15, 0.22, 0, 6.2832);
g.stroke();
// skerries: little granite backs in ink
const rock = (u, v, w) => {
  g.fillStyle = '#d4c4b6';
  g.beginPath();
  g.moveTo(u - w, v);
  g.bezierCurveTo(u - w * 0.6, v - w * 0.55, u + w * 0.5, v - w * 0.6, u + w, v);
  g.closePath();
  g.fill();
  g.strokeStyle = INK;
  g.lineWidth = 0.03;
  g.stroke();
};
for (const [u, v, w] of [[5.4, 6.6, 0.45], [6.9, 7.3, 0.28], [3.2, 4.4, 0.32], [20.1, 12.0, 0.3], [35.4, 11.9, 0.38], [38.2, 5.6, 0.3], [51.5, 6.4, 0.34], [12.5, 5.2, 0.25]]) rock(u, v, w);

// the island: granite wash, darker toward the shore, his ink line round it
g.fillStyle = '#ddcfc2';
outline();
g.fill();
g.save();
outline();
g.clip();
g.strokeStyle = 'rgba(176,154,138,0.55)';
g.lineWidth = 0.55;
g.filter = 'blur(0.06px)';
outline();
g.stroke();
g.filter = 'blur(0.15px)';
for (let i = 0; i < 80; i++) {
  const u = U0 + (U1 - U0) * r();
  const v = top(u) + (bot(u) - top(u)) * r();
  g.fillStyle = r() < 0.5 ? 'rgba(232,220,208,0.3)' : r() < 0.7 ? 'rgba(196,178,164,0.3)' : 'rgba(160,168,138,0.22)';
  g.beginPath();
  g.ellipse(u, v, 0.4 + 1.1 * r(), 0.2 + 0.4 * r(), 0, 0, 6.2832);
  g.fill();
}
g.filter = 'none';
g.restore();
g.strokeStyle = INK;
g.lineWidth = 0.045;
outline();
g.stroke();
// a few strokes of the rock's grain along it
g.strokeStyle = 'rgba(58,51,45,0.4)';
g.lineWidth = 0.018;
g.beginPath();
for (let i = 0; i < 40; i++) {
  const u = U0 + 1 + (U1 - U0 - 2) * r();
  const v = top(u) + 0.25 + (bot(u) - top(u) - 0.5) * r();
  if (u > 16.8 && u < 24.6) continue;
  g.moveTo(u, v);
  g.lineTo(u + 0.3 + 0.3 * r(), v + 0.05 * (r() - 0.5));
}
g.stroke();

// the dotted paths: from the house east along the island to the cape's tent, and from the forest to the new house
g.strokeStyle = 'rgba(58,51,45,0.75)';
g.lineWidth = 0.035;
g.setLineDash([0.05, 0.15]);
g.beginPath();
g.moveTo(15.9, 9.35);
g.bezierCurveTo(19, 10.35, 23, 9.9, 26.2, 9.2);
g.bezierCurveTo(29.5, 8.6, 33, 9.7, 36, 9.45);
g.bezierCurveTo(37, 9.35, 37.6, 9.3, 38.1, 9.32);
g.moveTo(23.6, 9.5);
g.bezierCurveTo(26, 8.4, 28.5, 8.0, 30.9, 7.85);
g.stroke();
g.setLineDash([]);

// the magic forest: a grey-green wash of moss, and his little dead trees in ink, crooked, bare
g.fillStyle = 'rgba(160,168,138,0.55)';
g.filter = 'blur(0.1px)';
g.beginPath();
g.ellipse(20.8, 8.75, 3.8, 1.45, -0.05, 0, 6.2832);
g.fill();
g.filter = 'none';
g.strokeStyle = INK;
g.lineCap = 'round';
g.lineWidth = 0.03;
g.beginPath();
for (let i = 0; i < 30; i++) {
  const u = 17.4 + 6.8 * r();
  const v = top(u) + 0.9 + (bot(u) - top(u) - 1.6) * r();
  if (Math.abs(u - 20.6) < 0.5 && Math.abs(v - 9.1) < 0.4) continue;
  const h = 0.45 + 0.35 * r();
  const lean = 0.12 + 0.1 * r();
  g.moveTo(u, v);
  g.quadraticCurveTo(u + lean * 0.2, v - h * 0.55, u + lean, v - h);
  for (const k of [0.45, 0.7]) {
    const bu = u + lean * k * k;
    const bv = v - h * k;
    g.moveTo(bu, bv);
    g.lineTo(bu - 0.16 - 0.1 * r(), bv - 0.14 - 0.08 * r());
    g.moveTo(bu, bv);
    g.lineTo(bu + 0.18 + 0.1 * r(), bv - 0.12 - 0.1 * r());
  }
}
g.stroke();
// the stump in the clearing
g.fillStyle = '#c9b49a';
g.beginPath();
g.ellipse(20.6, 9.1, 0.18, 0.09, 0, 0, 6.2832);
g.fill();
g.lineWidth = 0.025;
g.stroke();

// the house at the west end: white boards (the paper), the dark roof, the veranda's small panes, the chimney; the
// peonies pink by its steps; the pier out into the sea, the rowboat at it
const house = (u, v, w, roofColor, windows) => {
  g.fillStyle = '#fbf8f0';
  g.fillRect(u - w / 2, v - w * 0.55, w, w * 0.55);
  g.fillStyle = roofColor;
  g.beginPath();
  g.moveTo(u - w * 0.62, v - w * 0.5);
  g.lineTo(u, v - w * 1.12);
  g.lineTo(u + w * 0.62, v - w * 0.5);
  g.closePath();
  g.fill();
  g.strokeStyle = INK;
  g.lineWidth = 0.03;
  g.stroke();
  g.strokeRect(u - w / 2, v - w * 0.55, w, w * 0.55);
  windows();
};
house(14.3, 9.15, 1.2, '#6f7478', () => {
  g.strokeStyle = INK;
  g.lineWidth = 0.015;
  g.strokeRect(13.8, 8.75, 0.55, 0.3);
  g.beginPath();
  for (const u of [13.94, 14.08, 14.22]) {
    g.moveTo(u, 8.75);
    g.lineTo(u, 9.05);
  }
  g.moveTo(13.8, 8.9);
  g.lineTo(14.35, 8.9);
  g.stroke();
  g.strokeRect(14.55, 8.72, 0.22, 0.43);
  g.fillStyle = '#6f7478';
  g.fillRect(14.5, 7.95, 0.12, 0.3);
});
g.fillStyle = '#d98ea0';
for (let i = 0; i < 9; i++) {
  g.beginPath();
  g.arc(13.35 + 0.28 * r(), 9.05 + 0.18 * r(), 0.045 + 0.02 * r(), 0, 6.2832);
  g.fill();
}
g.fillStyle = '#86916c';
g.fillRect(13.3, 9.12, 0.36, 0.06);
// the pier and the rowboat
g.strokeStyle = INK;
g.lineWidth = 0.025;
g.fillStyle = '#c8b18c';
g.fillRect(14.9, bot(15) - 0.15, 0.24, 1.3);
g.strokeRect(14.9, bot(15) - 0.15, 0.24, 1.3);
g.beginPath();
for (let v = bot(15) + 0.05; v < bot(15) + 1.15; v += 0.14) {
  g.moveTo(14.9, v);
  g.lineTo(15.14, v);
}
g.stroke();
g.fillStyle = '#7d8a90';
g.beginPath();
g.ellipse(15.42, bot(15) + 0.75, 0.1, 0.32, 0, 0, 6.2832);
g.fill();
g.stroke();

// the calm bay's little graves on the shore: a row of mounds, a shell and a wooden bird on each
for (let k = 0; k < 5; k++) {
  const u = 25.3 + k * 0.38;
  const v = bot(u) - 0.42;
  g.fillStyle = '#b9a58c';
  g.beginPath();
  g.ellipse(u, v, 0.13, 0.06, 0, 0, 6.2832);
  g.fill();
  g.strokeStyle = INK;
  g.lineWidth = 0.018;
  g.stroke();
  g.fillStyle = '#f4efe2';
  g.beginPath();
  g.arc(u - 0.03, v - 0.02, 0.03, 0, 6.2832);
  g.fill();
  g.beginPath();
  g.moveTo(u + 0.02, v - 0.03);
  g.lineTo(u + 0.08, v - 0.1);
  g.lineTo(u + 0.11, v - 0.07);
  g.stroke();
}

// the storm over the far side: a heavy grey cloud, its rain slanting down to the sea, a crooked flash
g.fillStyle = 'rgba(132,138,146,0.5)';
g.filter = 'blur(0.12px)';
for (const [u, v, rx, ry] of [[30.2, 1.9, 2.0, 0.75], [32.4, 1.6, 2.2, 0.85], [34.3, 2.1, 1.5, 0.6], [31.4, 2.5, 2.4, 0.6]]) {
  g.beginPath();
  g.ellipse(u, v, rx, ry, 0, 0, 6.2832);
  g.fill();
}
g.filter = 'none';
g.strokeStyle = 'rgba(80,90,100,0.45)';
g.lineWidth = 0.018;
g.beginPath();
for (let i = 0; i < 34; i++) {
  const u = 28.8 + 6.2 * r();
  const v = 2.6 + 0.4 * r();
  g.moveTo(u, v);
  g.lineTo(u - 0.5, v + 1.6 + 1.2 * r());
}
g.stroke();
g.strokeStyle = INK;
g.lineWidth = 0.035;
g.beginPath();
g.moveTo(33.4, 2.4);
g.lineTo(33.0, 3.3);
g.lineTo(33.35, 3.3);
g.lineTo(32.85, 4.4);
g.stroke();

// the new house on the far side: white and new, the steep black roof, its big black windows; dead trees round it
house(31.5, 7.95, 1.1, '#26292d', () => {
  g.fillStyle = '#2b2f33';
  for (const u of [31.08, 31.33, 31.58, 31.83]) g.fillRect(u - 0.08, 7.55, 0.16, 0.3);
});
g.strokeStyle = INK;
g.lineWidth = 0.025;
g.beginPath();
for (const [u, v, h] of [[30.4, 8.1, 0.55], [30.0, 8.35, 0.45], [32.6, 8.05, 0.6], [33.0, 8.4, 0.5], [32.3, 8.6, 0.4]]) {
  g.moveTo(u, v);
  g.quadraticCurveTo(u + 0.04, v - h * 0.6, u + 0.12, v - h);
  g.moveTo(u + 0.05, v - h * 0.6);
  g.lineTo(u - 0.12, v - h * 0.82);
  g.moveTo(u + 0.08, v - h * 0.75);
  g.lineTo(u + 0.26, v - h * 0.92);
}
g.stroke();

// the cape: its stones, the tent on its tip, the fog coming in over it and the sea beyond
g.fillStyle = '#e8d9a8';
g.beginPath();
g.moveTo(38.05, 9.5);
g.lineTo(38.4, 8.9);
g.lineTo(38.75, 9.5);
g.closePath();
g.fill();
g.strokeStyle = INK;
g.lineWidth = 0.025;
g.stroke();
g.beginPath();
g.moveTo(38.4, 8.9);
g.lineTo(38.4, 8.77);
g.moveTo(38.4, 9.0);
g.lineTo(38.33, 9.5);
g.stroke();
g.fillStyle = '#c9b8a8';
for (const [u, v] of [[37.85, 9.57], [38.95, 9.55], [38.45, 9.7], [38.15, 9.7]]) {
  g.beginPath();
  g.ellipse(u, v, 0.07, 0.04, 0, 0, 6.2832);
  g.fill();
}

// the big boat going out east into the fog, the dinghy on its painter behind, its wake back toward the cape
g.strokeStyle = 'rgba(58,51,45,0.6)';
g.lineWidth = 0.02;
g.beginPath();
g.moveTo(43.0, 10.12);
g.quadraticCurveTo(42.5, 10.0, 41.9, 9.86);
g.moveTo(43.0, 10.34);
g.quadraticCurveTo(42.5, 10.48, 41.9, 10.6);
g.stroke();
g.fillStyle = '#5e6b74';
g.beginPath();
g.moveTo(43.0, 10.1);
g.lineTo(44.4, 10.1);
g.quadraticCurveTo(45.0, 10.23, 44.4, 10.37);
g.lineTo(43.0, 10.37);
g.closePath();
g.fill();
g.strokeStyle = INK;
g.lineWidth = 0.025;
g.stroke();
g.fillStyle = '#f4efe2';
g.fillRect(43.3, 9.91, 0.45, 0.2);
g.strokeRect(43.3, 9.91, 0.45, 0.2);
g.fillStyle = INK;
for (const u of [43.9, 44.08, 44.22]) {
  g.beginPath();
  g.arc(u, 10.05, 0.04, 0, 6.2832);
  g.fill();
}
g.beginPath();
g.moveTo(43.0, 10.23);
g.lineTo(42.4, 10.27);
g.stroke();
g.fillStyle = '#9aa6aa';
g.beginPath();
g.ellipse(42.2, 10.28, 0.2, 0.07, 0, 0, 6.2832);
g.fill();
g.stroke();
// the fog: white body colour washed over the cape's end and the sea beyond, in soft patches, thicker to the east
for (const [u, v, rad, a] of [[40.3, 9.0, 2.2, 0.3], [44.6, 7.2, 3.2, 0.45], [46.5, 10.6, 3.0, 0.5], [49.5, 4.5, 3.6, 0.6],
  [50.5, 8.8, 4.0, 0.7], [53.5, 6.0, 4.0, 0.8], [55.0, 10.5, 3.6, 0.85], [54.5, 2.0, 3.2, 0.85], [47.5, 1.8, 3.0, 0.5]]) {
  const f = g.createRadialGradient(u, v, 0, u, v, rad);
  f.addColorStop(0, `rgba(250,248,242,${a})`);
  f.addColorStop(0.55, `rgba(250,248,242,${a * 0.7})`);
  f.addColorStop(1, 'rgba(250,248,242,0)');
  g.fillStyle = f;
  g.beginPath();
  g.ellipse(u, v, rad * 1.4, rad, 0, 0, 6.2832);
  g.fill();
}

// his labels
g.fillStyle = INK;
g.textAlign = 'center';
g.font = 'italic 0.46px Georgia, serif';
g.fillText(tr('The house'), 13.7, 10.15);
g.fillText(tr('The magic forest'), 20.7, 10.25);
g.fillText(tr('The new house'), 31.5, 8.85);
g.fillText(tr('The cape'), 36.4, 8.7);
g.font = 'italic 1.0px Georgia, serif';
g.fillText(tr('The Island'), 7.6, 11.0);
g.lineWidth = 0.025;
g.beginPath();
g.moveTo(5.2, 11.25);
g.bezierCurveTo(6.6, 11.35, 8.6, 11.15, 10.0, 11.3);
g.stroke();
