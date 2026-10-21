// The stone with an arrow scratched on it, by the foot of the steps (the keeper's key lies under it): grey granite,
// the arrow pale where it was cut.
g.fillStyle = "#a99c9a";
g.beginPath();
g.moveTo(-0.38, 0);
g.quadraticCurveTo(-0.42, -0.3, -0.12, -0.36);
g.quadraticCurveTo(0.25, -0.4, 0.38, -0.18);
g.quadraticCurveTo(0.44, -0.04, 0.36, 0);
g.closePath();
g.fill();
g.strokeStyle = "#ece2da";
g.lineWidth = 0.025;
g.lineCap = "round";
g.beginPath();
g.moveTo(-0.2, -0.17);
g.lineTo(0.18, -0.2);
g.moveTo(0.1, -0.27);
g.lineTo(0.18, -0.2);
g.lineTo(0.1, -0.13);
g.stroke();
e.at(0, -0.2, "arrow");
