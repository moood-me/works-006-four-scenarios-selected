// The house's long left side: new white boards over the granite plinth, two big windows cut out — the veranda's and
// the room's (their frames are `win_left`). The card faces left, so its own x runs back toward the start: x = 12.8 −
// distance. Metres from the middle of its foot, the eaves 3.05 m up.
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
// the eaves' shadow line under the roof's edge
g.fillStyle = 'rgba(60,62,66,0.35)';
g.fillRect(-3.8, EAVE, 7.6, 0.08);
g.fillStyle = '#8e8984';
g.fillRect(-3.8, -H.floor, 7.6, H.floor + 0.05);
g.strokeStyle = 'rgba(70,66,62,0.5)';
g.lineWidth = 0.015;
for (const x of [-2.6, -0.8, 1.1, 2.9]) {
  g.beginPath();
  g.moveTo(x, -H.floor);
  g.lineTo(x + 0.04, 0.05);
  g.stroke();
}
// the windows: the veranda's (distance 9.5…10.5) and the room's (11.5…12.9), sill 0.7 m, head 2.1 m over the floor
g.globalCompositeOperation = 'destination-out';
g.fillRect(2.3, -2.55, 1.0, 1.4);
g.fillRect(-0.1, -2.55, 1.4, 1.4);
g.globalCompositeOperation = 'source-over';
