// The beds' feet, seen from the room: white iron bedsteads with brass knobs, the cover hanging over the end. Grandmother's
// here (0.9 m wide, its rail 0.85 m high), Sophia's a part 1.025 m to the right and 0.3 m farther (0.75 m, 0.75 m).
// Metres from the middle of each foot on the floor.
const foot = (c, w, rail, top, cover) => {
  const h = w / 2;
  // the cover hanging over the end
  c.fillStyle = cover;
  c.beginPath();
  c.moveTo(-h + 0.02, -top);
  c.lineTo(h - 0.02, -top);
  c.bezierCurveTo(h, -top + 0.12, h - 0.01, -top + 0.2, h - 0.02, -top + 0.25);
  c.lineTo(-h + 0.02, -top + 0.25);
  c.bezierCurveTo(-h + 0.01, -top + 0.2, -h, -top + 0.12, -h + 0.02, -top);
  c.closePath();
  c.fill();
  // the iron: posts, rails, rods, knobs
  c.fillStyle = '#e8e6df';
  c.fillRect(-h, -rail, 0.035, rail + 0.02);
  c.fillRect(h - 0.035, -rail, 0.035, rail + 0.02);
  c.fillRect(-h, -rail + 0.02, w, 0.03);
  c.fillRect(-h, -top + 0.1, w, 0.03);
  for (let k = 1; k < 6; k++) c.fillRect(-h + (k * w) / 6 - 0.008, -rail + 0.02, 0.016, rail - top + 0.1);
  c.fillStyle = '#c9b06e';
  for (const x of [-h + 0.0175, h - 0.0175]) {
    c.beginPath();
    c.arc(x, -rail - 0.02, 0.028, 0, 6.2832);
    c.fill();
  }
};
foot(g, 0.9, 0.85, 0.5, '#7f8387');
e.part(1.025, 0.3, c => foot(c, 0.75, 0.75, 0.45, '#c3a89a'), [-0.42, -0.82, 0.42, 0.02]);
