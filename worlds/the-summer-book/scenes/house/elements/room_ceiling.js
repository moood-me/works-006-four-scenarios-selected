// The room's ceiling, laid face down from the near wall: narrow boards painted white gone cream, running across. The
// card faces the room's far side (facing 0, tilted down): its x runs against the house's frame (u = −x − 0.2), up the
// card is away toward the far wall (3.8 m). Metres from its foot at the near wall.
g.fillStyle = '#e4e0d7';
g.fillRect(-2.6, -3.85, 5.2, 3.9);
g.strokeStyle = 'rgba(160,152,138,0.4)';
g.lineWidth = 0.012;
for (let x = -2.6; x < 2.6; x += 0.11) {
  g.beginPath();
  g.moveTo(x, -3.85);
  g.lineTo(x, 0.05);
  g.stroke();
}
