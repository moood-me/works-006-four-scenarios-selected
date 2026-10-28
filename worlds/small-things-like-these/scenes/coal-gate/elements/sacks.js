// Coal sacks in the shed, just inside the door to the left (on `shed`): two full ones slumped against each other, black
// with dust, their necks tied, and an empty one thrown over the heap's foot. The sacks and the coal are the frame's
// black, lit only by Bill's lantern.
const sack = (x, w, h, lean, cloth, dust) => {
  g.fillStyle = cloth;
  g.beginPath();
  g.moveTo(x - w * 0.5, 0);
  g.bezierCurveTo(x - w * 0.62, -h * 0.5, x - w * 0.42 + lean, -h * 0.92, x - w * 0.12 + lean, -h);
  g.lineTo(x + w * 0.12 + lean, -h);
  g.bezierCurveTo(x + w * 0.42 + lean, -h * 0.92, x + w * 0.62, -h * 0.5, x + w * 0.5, 0);
  g.closePath();
  g.fill();
  const grime = g.createLinearGradient(0, -h, 0, 0);
  grime.addColorStop(0, "rgba(22, 21, 22, 0)");
  grime.addColorStop(1, dust);
  g.fillStyle = grime;
  g.fill();
  g.strokeStyle = "rgba(20, 19, 20, 0.6)";
  g.lineWidth = 0.012;
  g.beginPath();
  g.moveTo(x - w * 0.25, -h * 0.15);
  g.quadraticCurveTo(x - w * 0.1 + lean * 0.5, -h * 0.55, x - w * 0.12 + lean, -h * 0.9);
  g.moveTo(x + w * 0.28, -h * 0.2);
  g.quadraticCurveTo(x + w * 0.2 + lean * 0.5, -h * 0.6, x + w * 0.1 + lean, -h * 0.88);
  g.stroke();
  // the tied neck
  g.fillStyle = cloth;
  g.beginPath();
  g.ellipse(x + lean, -h - 0.05, w * 0.1, 0.07, 0, 0, 6.3);
  g.fill();
  g.fillStyle = "#1a1919";
  g.fillRect(x + lean - w * 0.13, -h - 0.005, w * 0.26, 0.03);
};
// the empty sack on the floor
g.fillStyle = "#3e3832";
g.beginPath();
g.moveTo(-0.62, 0);
g.quadraticCurveTo(-0.5, -0.16, -0.2, -0.12);
g.quadraticCurveTo(0.05, -0.2, 0.3, -0.08);
g.lineTo(0.34, 0);
g.closePath();
g.fill();
sack(-0.22, 0.48, 0.74, -0.05, "#4a4239", "rgba(22, 21, 22, 0.75)");
sack(0.2, 0.5, 0.82, 0.04, "#433c34", "rgba(22, 21, 22, 0.7)");
