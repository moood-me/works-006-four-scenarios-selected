// The glass door into the room, standing open toward the veranda: a white-painted frame, six panes above (clear: the
// glass is not painted), a plain panel below, a brass knob. Metres from its hinge (x 0…0.85), 2.05 m tall.
g.fillStyle = '#ebe9e2';
g.fillRect(0, -2.05, 0.85, 2.07);
g.fillStyle = '#dedbd2';
g.fillRect(0.12, -0.85, 0.61, 0.72);
g.strokeStyle = 'rgba(150,144,132,0.6)';
g.lineWidth = 0.012;
g.strokeRect(0.12, -0.85, 0.61, 0.72);
g.globalCompositeOperation = 'destination-out';
const pw = 0.61 / 2;
const ph = 0.95 / 3;
for (let i = 0; i < 2; i++) {
  for (let j = 0; j < 3; j++) g.fillRect(0.12 + i * pw + 0.012, -1.93 + j * ph + 0.012, pw - 0.024, ph - 0.024);
}
g.globalCompositeOperation = 'source-over';
g.fillStyle = '#c9b06e';
g.beginPath();
g.arc(0.76, -1.0, 0.025, 0, 6.2832);
g.fill();
