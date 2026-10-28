// The house's sea gable, over the water: the same new white boards and plinth, its four big windows cut out (their
// frames are `win_sea`, their glass `glass_sea`), a small window in the gable, the black barge boards. It faces the sea
// (its own x runs the other way to the world's: the windows are alike either way). Metres from the middle of its foot.
// The point `windows`: the middle of the big windows.
const H = e.lib.HOUSE;
const EAVE = -(H.floor + H.wall);
const RIDGE = EAVE - 3;
g.fillStyle = '#f0efea';
g.beginPath();
g.moveTo(-3, 0.05);
g.lineTo(-3, EAVE);
g.lineTo(0, RIDGE);
g.lineTo(3, EAVE);
g.lineTo(3, 0.05);
g.closePath();
g.fill();
g.strokeStyle = 'rgba(196,194,186,0.55)';
g.lineWidth = 0.012;
for (let x = -2.88; x < 3; x += 0.12) {
  g.beginPath();
  g.moveTo(x, -H.floor);
  g.lineTo(x, EAVE - (3 - Math.abs(x)));
  g.stroke();
}
g.fillStyle = '#fafaf7';
g.fillRect(-3, EAVE, 0.13, -EAVE - H.floor);
g.fillRect(2.87, EAVE, 0.13, -EAVE - H.floor);
g.fillStyle = '#8e8984';
g.fillRect(-3.02, -H.floor, 6.04, H.floor + 0.05);
g.strokeStyle = 'rgba(70,66,62,0.5)';
g.lineWidth = 0.015;
for (const x of [-1.7, -0.2, 1.3]) {
  g.beginPath();
  g.moveTo(x, -H.floor);
  g.lineTo(x - 0.05, 0.05);
  g.stroke();
}
g.fillStyle = '#f9f8f4';
g.fillRect(-0.4, -4.45, 0.8, 0.9);
g.fillStyle = '#3c434a';
g.fillRect(-0.33, -4.38, 0.66, 0.76);
// the four big windows (sill 0.35 m, head 2.25 m over the floor)
g.globalCompositeOperation = 'destination-out';
for (const [a, b] of [[-2.55, -1.5], [-1.2, -0.15], [0.15, 1.2], [1.5, 2.55]]) g.fillRect(a, -(H.floor + 2.25), b - a, 1.9);
g.globalCompositeOperation = 'source-over';
g.fillStyle = '#25282c';
g.beginPath();
g.moveTo(-3.4, EAVE + 0.5);
g.lineTo(0, RIDGE + 0.1);
g.lineTo(3.4, EAVE + 0.5);
g.lineTo(3.4, EAVE + 0.2);
g.lineTo(0, RIDGE - 0.2);
g.lineTo(-3.4, EAVE + 0.2);
g.closePath();
g.fill();
e.at(0, -(H.floor + 1.3), 'windows');
