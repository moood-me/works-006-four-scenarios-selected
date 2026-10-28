// The entry's floor from above: bare worn boards, a mat before the outer door. Metres from its middle (x along the
// house's frame, y toward the veranda — the frame's −z).
g.fillStyle = '#8a8478';
g.fillRect(-0.85, -1.4, 1.7, 2.8);
const tones = ['#9c9588', '#968f82', '#a29b8e'];
for (let i = 0, x = -0.85; x < 0.85; x += 0.16, i++) {
  g.fillStyle = tones[i % 3];
  g.fillRect(x + 0.007, -1.4, 0.146, 2.8);
}
g.fillStyle = '#7d6e58';
g.fillRect(0.3, -0.2, 0.5, 0.75);
