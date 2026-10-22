// The house's gable end, turned toward the sea: weathered white boards, the glazed veranda across the ground floor
// (small panes in white frames; behind the glass Papa's table, his papers, the lamp), the door on the right with the
// porch before it, a small window in the gable, dark barge boards. Metres from the middle of its foot; 5 m wide,
// 3 m to the eaves, 4.8 m to the ridge.
const W = 2.5;
const EAVE = -3;
const RIDGE = -4.8;
// the boards
g.fillStyle = '#dcd8cf';
g.beginPath();
g.moveTo(-W, 0.05);
g.lineTo(-W, EAVE);
g.lineTo(0, RIDGE);
g.lineTo(W, EAVE);
g.lineTo(W, 0.05);
g.closePath();
g.fill();
g.save();
g.clip();
g.strokeStyle = '#c4beb3';
g.lineWidth = 0.025;
for (let x = -W + 0.16; x < W; x += 0.16) {
  g.beginPath();
  g.moveTo(x, RIDGE);
  g.lineTo(x, 0.05);
  g.stroke();
}
// weathering: the boards greyer low down and under the eaves
const wx = g.createLinearGradient(0, RIDGE, 0, 0);
wx.addColorStop(0, 'rgba(120,118,112,0.18)');
wx.addColorStop(0.25, 'rgba(120,118,112,0)');
wx.addColorStop(0.85, 'rgba(120,118,112,0)');
wx.addColorStop(1, 'rgba(120,118,112,0.22)');
g.fillStyle = wx;
g.fillRect(-W, RIDGE, 2 * W, -RIDGE + 0.05);
g.restore();
// the foundation: grey stones under the sill
g.fillStyle = '#8c8781';
g.fillRect(-W - 0.05, -0.05, 2 * W + 0.1, 0.4);
g.fillStyle = '#7a756f';
for (let x = -W; x < W; x += 0.45) g.fillRect(x + 0.02, -0.02, 0.38, 0.32);
// a band between the floors
g.fillStyle = '#c9c3b8';
g.fillRect(-W, EAVE - 0.05, 2 * W, 0.12);
// the veranda: a long glazed band of small panes, white frames
const VX0 = -2.3;
const VX1 = 0.85;
const VY0 = -2.55;
const VY1 = -0.85;
g.fillStyle = '#ecebe6';
g.fillRect(VX0 - 0.1, VY0 - 0.1, VX1 - VX0 + 0.2, VY1 - VY0 + 0.2);
const glass = g.createLinearGradient(0, VY0, 0, VY1);
glass.addColorStop(0, '#b9c6cb');
glass.addColorStop(0.45, '#8e9ea4');
glass.addColorStop(1, '#6f7f86');
const COLS = 8;
const ROWS = 3;
const pw = (VX1 - VX0) / COLS;
const ph = (VY1 - VY0) / ROWS;
for (let i = 0; i < COLS; i++) {
  for (let j = 0; j < ROWS; j++) {
    g.fillStyle = glass;
    g.fillRect(VX0 + i * pw + 0.035, VY0 + j * ph + 0.035, pw - 0.07, ph - 0.07);
  }
}
// behind the glass: Papa's table under the window, the papers on it, a lamp; seen dimly
g.save();
g.beginPath();
for (let i = 0; i < COLS; i++) {
  for (let j = 0; j < ROWS; j++) g.rect(VX0 + i * pw + 0.035, VY0 + j * ph + 0.035, pw - 0.07, ph - 0.07);
}
g.clip();
g.globalAlpha = 0.55;
g.fillStyle = '#4d5559';
g.fillRect(-2.0, -1.12, 2.0, 0.06);
g.fillRect(-1.9, -1.06, 0.05, 0.3);
g.fillRect(-0.1, -1.06, 0.05, 0.3);
g.fillStyle = '#e8e4da';
g.fillRect(-1.6, -1.17, 0.35, 0.05);
g.fillRect(-1.15, -1.16, 0.28, 0.04);
g.fillStyle = '#5a5f5c';
g.fillRect(-0.45, -1.5, 0.03, 0.38);
g.beginPath();
g.moveTo(-0.62, -1.5);
g.lineTo(-0.26, -1.5);
g.lineTo(-0.36, -1.68);
g.lineTo(-0.52, -1.68);
g.closePath();
g.fill();
// the sky's reflection: a pale slanting sheen across the panes
g.globalAlpha = 0.35;
g.fillStyle = '#e4eaec';
g.beginPath();
g.moveTo(VX0, VY0 + 0.4);
g.lineTo(VX0 + 1.2, VY0);
g.lineTo(VX0 + 1.8, VY0);
g.lineTo(VX0 + 0.3, VY1);
g.lineTo(VX0, VY1);
g.closePath();
g.fill();
g.restore();
// the sill under the veranda's windows
g.fillStyle = '#f2f1ec';
g.fillRect(VX0 - 0.16, VY1 + 0.06, VX1 - VX0 + 0.32, 0.07);
// the door: dark teal, glazed above, white frame
g.fillStyle = '#ecebe6';
g.fillRect(1.05, -2.3, 1.1, 2.35);
g.fillStyle = '#3d5658';
g.fillRect(1.15, -2.2, 0.9, 2.25);
g.fillStyle = glass;
g.fillRect(1.25, -2.1, 0.7, 0.75);
g.fillStyle = '#ecebe6';
g.fillRect(1.58, -2.1, 0.04, 0.75);
g.fillStyle = '#2e4042';
g.fillRect(1.27, -1.15, 0.66, 0.05);
g.fillRect(1.27, -0.6, 0.66, 0.05);
g.fillStyle = '#c9b98a';
g.beginPath();
g.arc(1.93, -1.05, 0.03, 0, 6.2832);
g.fill();
// the gable's little window
g.fillStyle = '#ecebe6';
g.fillRect(-0.34, -4.0, 0.68, 0.78);
g.fillStyle = glass;
g.fillRect(-0.27, -3.93, 0.24, 0.64);
g.fillRect(0.03, -3.93, 0.24, 0.64);
// the barge boards along the roof's edges, a little over the wall
g.strokeStyle = '#4b5056';
g.lineWidth = 0.14;
g.lineCap = 'square';
g.beginPath();
g.moveTo(-W - 0.3, EAVE + 0.22);
g.lineTo(0, RIDGE - 0.08);
g.lineTo(W + 0.3, EAVE + 0.22);
g.stroke();
e.at(-0.8, -1.7, 'veranda');
e.at(1.6, -1.2, 'door');
e.at(0, -3.6, 'gable');
