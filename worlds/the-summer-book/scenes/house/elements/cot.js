// Papa's camp bed (`cot`: along the veranda's back wall, or in the room before the window onto the cape): a canvas
// folding bed on crossed legs, made with a grey wool blanket and a white pillow at its left end. Metres from the middle
// of its foot; 1.9 m long, 0.48 m high.
g.fillStyle = '#7b6a55';
for (const x of [-0.85, 0.85]) {
  g.save();
  g.translate(x, -0.2);
  g.rotate(0.6);
  g.fillRect(-0.02, -0.24, 0.04, 0.48);
  g.rotate(-1.2);
  g.fillRect(-0.02, -0.24, 0.04, 0.48);
  g.restore();
}
g.fillStyle = '#b3a88f';
g.fillRect(-0.95, -0.42, 1.9, 0.06);
g.fillStyle = '#8b8f93';
g.fillRect(-0.62, -0.48, 1.56, 0.12);
g.fillStyle = '#7c8084';
g.fillRect(-0.62, -0.38, 1.56, 0.03);
g.fillStyle = '#efede7';
g.beginPath();
g.ellipse(-0.76, -0.47, 0.17, 0.06, 0, 0, 6.2832);
g.fill();
