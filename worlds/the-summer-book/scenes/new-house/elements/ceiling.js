// The ceiling of the veranda and the room: new white boards along the house's length, a white glass lamp shade not yet
// hung (its rose and the wire), seen from below — a card laid face down from the land gable to the sea gable. Metres
// from its edge at the land gable (y running toward the sea, −7.36…0; x the other way to the world's).
g.fillStyle = '#f2f1ed';
g.fillRect(-2.9, -7.4, 5.8, 7.45);
g.strokeStyle = 'rgba(200,198,190,0.6)';
g.lineWidth = 0.008;
g.beginPath();
for (let x = -2.88 + 0.12; x < 2.88; x += 0.12) {
  g.moveTo(x, -7.4);
  g.lineTo(x, 0.05);
}
g.stroke();
// the dividing wall's line, and the room's ceiling rose with its bare wire
g.fillStyle = 'rgba(190,186,178,0.6)';
g.fillRect(-2.9, -1.94, 5.8, 0.04);
g.fillStyle = '#e8e6df';
g.beginPath();
g.arc(0, -4.6, 0.09, 0, 6.2832);
g.fill();
