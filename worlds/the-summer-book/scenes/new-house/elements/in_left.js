// The left wall from inside, the veranda's and the room's: new white-painted panels, a pale wooden skirting, the two
// windows cut out (the veranda's x −3.3…−2.3, the room's −1.3…0.1: x = distance − 12.8; sill 0.7 m, head 2.1 m over
// the floor); the bed's head stands against it. Metres from the wall's middle at the floor, 2.6 m to the ceiling.
g.fillStyle = '#ecebe5';
g.fillRect(-3.7, -2.62, 7.4, 2.64);
g.strokeStyle = 'rgba(196,194,186,0.5)';
g.lineWidth = 0.008;
g.beginPath();
for (let x = -3.68 + 0.6; x < 3.68; x += 0.6) {
  g.moveTo(x, -2.6);
  g.lineTo(x, -0.1);
}
g.stroke();
g.fillStyle = '#d9c7a6';
g.fillRect(-3.7, -0.1, 7.4, 0.1);
// the corner where the dividing wall meets it (distance 11)
g.fillStyle = 'rgba(170,166,158,0.45)';
g.fillRect(-1.84, -2.62, 0.08, 2.62);
g.globalCompositeOperation = 'destination-out';
g.fillRect(-3.3, -2.1, 1.0, 1.4);
g.fillRect(-1.3, -2.1, 1.4, 1.4);
g.globalCompositeOperation = 'source-over';
