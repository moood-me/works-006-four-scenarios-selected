// The room's floor from above: the same painted grey boards as the veranda's, worn paler between the beds and the
// window, a round braided rug before the beds, a narrow rag runner from the second door. Metres from its middle (x
// as the house's frame less −0.2, y toward the veranda — the frame's −z, so the far wall is y −1.925).
g.fillStyle = '#8f8a80';
g.fillRect(-2.55, -1.925, 5.1, 3.85);
const tones = ['#a8a295', '#a29c8f', '#aea89b'];
for (let i = 0, x = -2.55; x < 2.55; x += 0.16, i++) {
  g.fillStyle = tones[i % 3];
  g.fillRect(x + 0.007, -1.925, 0.146, 3.85);
}
g.fillStyle = 'rgba(196,190,176,0.3)';
g.beginPath();
g.ellipse(0.5, -0.9, 0.9, 0.6, 0, 0, 6.2832);
g.fill();
// the braided rug before the beds' feet
const RING = ['#b88c7c', '#d8d0bf', '#8ea0ab', '#d8d0bf'];
for (let k = 0; k < 8; k++) {
  g.fillStyle = RING[k % 4];
  g.beginPath();
  g.ellipse(-1.45, 0.65, 0.7 - k * 0.08, 0.5 - k * 0.057, 0, 0, 6.2832);
  g.fill();
}
// the runner from the second door
const RUG = ['#8ea0ab', '#d8d0bf', '#b88c7c', '#d8d0bf', '#7f8f82', '#c9bfa8'];
for (let k = 0, x = 1.15; x < 2.45; x += 0.075, k++) {
  g.fillStyle = RUG[k % RUG.length];
  g.fillRect(x, -0.35, 0.075, 0.6);
}
