// The house's long right side: the same new boards and plinth, the veranda's window and the room's cut out (their
// frames are `win_right`). The card faces right, its own x running away from the start: x = distance − 12.8. Metres
// from the middle of its foot.
const H = e.lib.HOUSE;
const EAVE = -(H.floor + H.wall);
g.fillStyle = '#ebeae5';
g.fillRect(-3.8, EAVE, 7.6, -EAVE + 0.05);
g.strokeStyle = 'rgba(190,188,180,0.5)';
g.lineWidth = 0.012;
for (let y = EAVE + 0.16; y < -H.floor; y += 0.16) {
  g.beginPath();
  g.moveTo(-3.8, y);
  g.lineTo(3.8, y);
  g.stroke();
}
g.fillStyle = '#f7f6f2';
g.fillRect(-3.8, EAVE, 0.12, -EAVE - H.floor);
g.fillRect(3.68, EAVE, 0.12, -EAVE - H.floor);
g.fillStyle = 'rgba(60,62,66,0.35)';
g.fillRect(-3.8, EAVE, 7.6, 0.08);
g.fillStyle = '#8e8984';
g.fillRect(-3.8, -H.floor, 7.6, H.floor + 0.05);
g.strokeStyle = 'rgba(70,66,62,0.5)';
g.lineWidth = 0.015;
for (const x of [-3.0, -1.2, 0.7, 2.5]) {
  g.beginPath();
  g.moveTo(x, -H.floor);
  g.lineTo(x - 0.04, 0.05);
  g.stroke();
}
// the windows: the veranda's (distance 9.5…10.5) and the room's (11.6…13.0)
g.globalCompositeOperation = 'destination-out';
g.fillRect(-3.3, -2.55, 1.0, 1.4);
g.fillRect(-1.2, -2.55, 1.4, 1.4);
g.globalCompositeOperation = 'source-over';
