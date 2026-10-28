// The entry's side walls: plain grey boards (two copies, one each side, facing in). Metres from the middle of the
// wall's foot; 1.7 m across, 2.4 m high.
g.fillStyle = '#aaa69d';
g.fillRect(-0.85, -2.4, 1.7, 2.42);
g.strokeStyle = 'rgba(100,96,88,0.4)';
g.lineWidth = 0.01;
for (let x = -0.85 + 0.15; x < 0.85; x += 0.15) {
  g.beginPath();
  g.moveTo(x, -2.4);
  g.lineTo(x, 0.02);
  g.stroke();
}
