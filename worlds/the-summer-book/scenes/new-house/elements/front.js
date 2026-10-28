// The house's land gable, toward the start: new white boards, the granite plinth, the glazed veranda across the ground
// floor (its two pairs of windows cut out: their frames are `glazing`, the left-hand leaf that opens is `sash`), the
// shut new door between them on its step stone, a small window in the gable, the black barge boards of the steep roof.
// Metres from the middle of its foot (x as the world's, the house's wall x −3…3, the eaves 3.05 m, the ridge 6.05 m).
const H = e.lib.HOUSE;
const EAVE = -(H.floor + H.wall);
const RIDGE = EAVE - 3;
// the boards and the gable
g.fillStyle = '#f2f1ec';
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
// the corner boards
g.fillStyle = '#fafaf7';
g.fillRect(-3, EAVE, 0.13, -EAVE - H.floor);
g.fillRect(2.87, EAVE, 0.13, -EAVE - H.floor);
// the granite plinth
g.fillStyle = '#8e8984';
g.fillRect(-3.02, -H.floor, 6.04, H.floor + 0.05);
g.strokeStyle = 'rgba(70,66,62,0.5)';
g.lineWidth = 0.015;
for (const x of [-2.1, -0.9, 0.6, 1.9]) {
  g.beginPath();
  g.moveTo(x, -H.floor);
  g.lineTo(x + 0.05, 0.05);
  g.stroke();
}
// the door: new, white, a narrow dark light down its middle, a brass handle; its step stone
g.fillStyle = '#e9e8e2';
g.fillRect(-0.5, -2.55, 1.0, 2.1);
g.fillStyle = '#f9f8f4';
g.fillRect(-0.42, -2.48, 0.84, 2.03);
g.fillStyle = '#4a5157';
g.fillRect(-0.06, -2.3, 0.12, 1.45);
g.fillStyle = '#c4a25a';
g.fillRect(0.28, -1.5, 0.08, 0.03);
g.fillStyle = '#a19b94';
g.beginPath();
g.ellipse(0, 0.0, 0.62, 0.12, 0, Math.PI, 0);
g.fill();
// the gable's small window: a dark pane in a white frame
g.fillStyle = '#f9f8f4';
g.fillRect(-0.4, -4.45, 0.8, 0.9);
g.fillStyle = '#3c434a';
g.fillRect(-0.33, -4.38, 0.66, 0.76);
// the veranda's openings (the windows' frames are their own; the glass is clear)
g.globalCompositeOperation = 'destination-out';
g.fillRect(-2.7, -2.45, 2.1, 1.5);
g.fillRect(0.6, -2.45, 2.1, 1.5);
g.globalCompositeOperation = 'source-over';
// the barge boards: the roof's black edge over the gable's top, out past the walls
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
