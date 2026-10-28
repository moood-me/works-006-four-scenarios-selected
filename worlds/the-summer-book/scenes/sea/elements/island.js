// The island seen from the sea as the boat leaves it: one long low back of pinkish-grey granite going down smooth into
// the water, the dark wet band along it; on its crown the wind-bent pines and the white house with its dark roof,
// the veranda's glass and the window of the room in the gable — Grandmother's; the pier below it; on the right the
// cape, bare rock going down to the open sea. Painted flat, as far things are (the shore's hand). Metres from the middle
// of its waterline; 200 m long. Points: `window` (the room's window), `cape` (the cape's end), `pier`.
// the rock
g.fillStyle = '#b3a9a1';
g.beginPath();
g.moveTo(-100, 0.6);
g.bezierCurveTo(-85, -3, -60, -7, -30, -8.5);
g.bezierCurveTo(0, -10, 30, -8, 55, -5);
g.bezierCurveTo(75, -3, 88, -1.5, 100, 0.6);
g.closePath();
g.fill();
// darker and lighter grains of the rock, long along the slope
for (let i = 0; i < 70; i++) {
  const x = -95 + 190 * e.rnd();
  const y = -0.5 - 6 * e.rnd() * e.rnd();
  g.globalAlpha = 0.35;
  g.fillStyle = e.rnd() < 0.5 ? '#c3b9b0' : '#a1978f';
  g.beginPath();
  g.ellipse(x, y, 2 + 5 * e.rnd(), 0.3 + 0.5 * e.rnd(), 0, 0, 6.2832);
  g.fill();
}
g.globalAlpha = 1;
// the grass and heather on the crown
g.fillStyle = '#87916f';
g.beginPath();
g.moveTo(-70, -4.6);
g.bezierCurveTo(-50, -7.2, -20, -9, 0, -9.4);
g.bezierCurveTo(20, -9.2, 35, -7.6, 48, -5.6);
g.bezierCurveTo(30, -6.6, 0, -7.2, -30, -6.6);
g.closePath();
g.fill();
// the wet band at the water
g.fillStyle = '#7f7974';
g.fillRect(-100, -0.2, 200, 0.8);
// the pines on the crown, wind-bent, flat dark tiers
const pine = (x, h) => {
  const base = -8.6 - 0.6 * Math.cos(x / 30);
  g.strokeStyle = '#6b5d52';
  g.lineWidth = 0.4;
  g.beginPath();
  g.moveTo(x, base);
  g.quadraticCurveTo(x - 0.4, base - h * 0.6, x + 1.2, base - h);
  g.stroke();
  for (let k = 0; k < 3; k++) {
    const cx = x + 0.6 + k * 0.45;
    const cy = base - h * (0.62 + 0.17 * k);
    const w = 3.4 - 0.7 * k;
    g.fillStyle = k === 1 ? '#45524b' : '#4d5a53';
    g.beginPath();
    g.moveTo(cx - w / 2, cy + 0.2);
    g.bezierCurveTo(cx - w * 0.45, cy - 0.9, cx + w * 0.2, cy - 1.1, cx + w * 0.5, cy + 0.2);
    g.closePath();
    g.fill();
  }
};
for (const [x, h] of [[-42, 8], [-37, 9], [-33, 7.5], [-28, 9.5], [-24, 8], [-6, 8.5], [-2, 9], [14, 7.5], [19, 8.5]]) pine(x, h);
// the house: its gable to the sea, the veranda's glass, the room's window above, the dark roof
const HX = -14;
const HB = -9.2;
g.fillStyle = '#dcd8cf';
g.beginPath();
g.moveTo(HX - 2.5, HB);
g.lineTo(HX - 2.5, HB - 3);
g.lineTo(HX, HB - 4.8);
g.lineTo(HX + 2.5, HB - 3);
g.lineTo(HX + 2.5, HB);
g.closePath();
g.fill();
g.fillStyle = '#d0ccc2';
g.fillRect(HX + 2.5, HB - 3, 6, 3);
g.fillStyle = '#545a60';
g.beginPath();
g.moveTo(HX - 2.8, HB - 2.8);
g.lineTo(HX, HB - 5.0);
g.lineTo(HX + 6.5, HB - 5.0);
g.lineTo(HX + 8.9, HB - 3);
g.lineTo(HX + 2.6, HB - 3);
g.closePath();
g.fill();
g.fillStyle = '#7f8f96';
g.fillRect(HX - 2.2, HB - 2.5, 3.1, 1.6);
g.fillStyle = '#ecebe6';
for (let x = HX - 2.2; x <= HX + 0.9; x += 0.39) g.fillRect(x, HB - 2.5, 0.05, 1.6);
g.fillRect(HX - 2.2, HB - 1.75, 3.1, 0.05);
g.fillStyle = '#5d6c73';
g.fillRect(HX - 0.3, HB - 4.0, 0.6, 0.75);
g.fillStyle = '#ecebe6';
g.fillRect(HX - 0.03, HB - 4.0, 0.06, 0.75);
// the pier and the boat moored at it
g.fillStyle = '#8f8880';
g.fillRect(HX + 4, -0.75, 10, 0.25);
g.fillStyle = '#6e6862';
for (let x = HX + 4.2; x < HX + 14; x += 2.4) g.fillRect(x, -0.5, 0.15, 0.6);
// the cape: bare rock at the right end, a few boulders, the sea round it
g.fillStyle = '#a69d95';
for (const [x, r] of [[78, 1.4], [84, 1.0], [70, 1.2]]) {
  g.beginPath();
  g.ellipse(x, -0.8 - r * 0.4, r * 1.6, r, 0, 0, 6.2832);
  g.fill();
}
e.at(HX, HB - 3.62, 'window');
e.at(84, -1.5, 'cape');
e.at(HX + 9, -0.75, 'pier');
