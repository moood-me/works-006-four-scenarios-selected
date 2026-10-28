// The Fisherman's cape across the water on the left: a long low tongue of the same pink granite, greyer with the
// distance, a few dark stones at its point.
g.fillStyle = "#c79c95";
g.beginPath();
g.moveTo(-60, 0);
g.bezierCurveTo(-42, -3.2, -18, -4.4, 4, -2.6);
g.bezierCurveTo(14, -1.8, 22, -0.8, 30, 0);
g.closePath();
g.fill();
g.fillStyle = "rgba(150, 128, 128, 0.5)";
g.beginPath();
g.moveTo(-40, -1.2);
g.bezierCurveTo(-26, -2.6, -6, -3.0, 10, -1.6);
g.lineTo(10, -1.2);
g.bezierCurveTo(-6, -2.2, -26, -1.8, -40, -0.6);
g.fill();
g.fillStyle = "#6f5f60";
for (const [x, w, h] of [[24, 1.6, 0.8], [27, 1.0, 0.5], [21, 0.8, 0.6]]) {
  g.beginPath();
  g.ellipse(x, 0, w, h, 0, Math.PI, 0);
  g.fill();
}
e.at(24, -1, "point");
