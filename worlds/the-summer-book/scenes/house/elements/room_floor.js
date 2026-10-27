// The room's floor from above: the same painted grey boards as the veranda's, a round braided rug between the beds.
// Metres from its middle, y toward the door.
g.fillStyle = '#8f8a80';
g.fillRect(-2.7, -1.7, 5.4, 3.4);
const tones = ['#a8a295', '#a29c8f', '#aea89b'];
for (let i = 0, x = -2.7; x < 2.7; x += 0.16, i++) {
  g.fillStyle = tones[i % 3];
  g.fillRect(x + 0.007, -1.7, 0.146, 3.4);
}
const RING = ['#b88c7c', '#d8d0bf', '#8ea0ab', '#d8d0bf'];
for (let k = 0; k < 8; k++) {
  g.fillStyle = RING[k % 4];
  g.beginPath();
  g.ellipse(0.1, 0.1, 0.62 - k * 0.07, 0.5 - k * 0.056, 0, 0, 6.2832);
  g.fill();
}
