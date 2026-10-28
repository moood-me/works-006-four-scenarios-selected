// The bed's head board against the left wall: one wide plain board of pale new birch on two posts. The card faces
// right (x = distance − 14.15). Metres from its middle at the floor, 0.95 m high.
g.fillStyle = '#dcc7a2';
g.fillRect(-0.88, -0.95, 1.76, 0.4);
g.fillRect(-0.88, -0.95, 0.07, 0.95);
g.fillRect(0.81, -0.95, 0.07, 0.95);
g.strokeStyle = 'rgba(170,140,100,0.35)';
g.lineWidth = 0.006;
g.beginPath();
for (const y of [-0.86, -0.78, -0.69, -0.61]) {
  g.moveTo(-0.8, y);
  g.bezierCurveTo(-0.3, y - 0.01, 0.2, y + 0.012, 0.8, y);
}
g.stroke();
