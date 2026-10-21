// The ceiling (3.6 m up): white-washed plaster, a round plaster rose in its middle.
g.fillStyle = "#ebe8dc";
g.fillRect(-2.65, -1.95, 5.3, 3.9);
g.strokeStyle = "#d6d2c2";
g.lineWidth = 0.02;
for (const rad of [0.3, 0.22, 0.14]) {
  g.beginPath();
  g.arc(0, 0, rad, 0, 6.3);
  g.stroke();
}
