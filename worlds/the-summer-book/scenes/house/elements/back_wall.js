// The house's wall at the back of the veranda: upright tongue-and-groove boards painted a pale grey, a skirting board,
// a rail; the white-framed doorway into the room (the opening cut out: the room is seen through it; its glass door
// stands open — `door`). Metres from the veranda's far corner, running right along the wall (x 0…6.4).
g.fillStyle = '#d6d2c8';
g.fillRect(0, -2.62, 6.4, 2.64);
g.strokeStyle = 'rgba(140,134,124,0.4)';
g.lineWidth = 0.012;
for (let x = 0.1; x < 6.4; x += 0.1) {
  g.beginPath();
  g.moveTo(x, -2.62);
  g.lineTo(x, 0.02);
  g.stroke();
}
g.fillStyle = '#bdb6a9';
g.fillRect(0, -0.12, 6.4, 0.14);
g.fillStyle = '#e4e1da';
g.fillRect(0, -2.0, 6.4, 0.05);
// the doorway's frame, and the opening
g.fillStyle = '#efede7';
g.fillRect(1.2, -2.17, 1.05, 2.19);
g.globalCompositeOperation = 'destination-out';
g.fillRect(1.3, -2.07, 0.85, 2.1);
g.globalCompositeOperation = 'source-over';
e.at(1.725, -1.1, 'doorway');
