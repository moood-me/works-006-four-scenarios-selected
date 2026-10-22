// The house's long side, toward the sea: the same weathered boards, two windows with white frames and the sky in
// their glass, the foundation stones. Metres from its front corner at the foot, running away along x (6 m), 3 m tall.
const L = 6;
const H = 3;
g.fillStyle = '#d6d2c8';
g.fillRect(0, -H, L, H + 0.05);
g.strokeStyle = '#c0baaf';
g.lineWidth = 0.025;
for (let x = 0.16; x < L; x += 0.16) {
  g.beginPath();
  g.moveTo(x, -H);
  g.lineTo(x, 0.05);
  g.stroke();
}
const wx = g.createLinearGradient(0, -H, 0, 0);
wx.addColorStop(0, 'rgba(110,108,104,0.25)');
wx.addColorStop(0.2, 'rgba(110,108,104,0)');
wx.addColorStop(0.85, 'rgba(110,108,104,0)');
wx.addColorStop(1, 'rgba(110,108,104,0.22)');
g.fillStyle = wx;
g.fillRect(0, -H, L, H + 0.05);
g.fillStyle = '#8c8781';
g.fillRect(-0.05, -0.05, L + 0.1, 0.4);
g.fillStyle = '#7a756f';
for (let x = 0; x < L; x += 0.45) g.fillRect(x + 0.02, -0.02, 0.38, 0.32);
const glass = g.createLinearGradient(0, -2.3, 0, -1.1);
glass.addColorStop(0, '#b6c3c8');
glass.addColorStop(1, '#748389');
for (const cx of [1.7, 4.3]) {
  g.fillStyle = '#ecebe6';
  g.fillRect(cx - 0.5, -2.4, 1.0, 1.32);
  g.fillStyle = glass;
  g.fillRect(cx - 0.42, -2.32, 0.38, 0.52);
  g.fillRect(cx + 0.04, -2.32, 0.38, 0.52);
  g.fillRect(cx - 0.42, -1.72, 0.38, 0.56);
  g.fillRect(cx + 0.04, -1.72, 0.38, 0.56);
  g.fillStyle = '#f2f1ec';
  g.fillRect(cx - 0.6, -1.1, 1.2, 0.07);
}
