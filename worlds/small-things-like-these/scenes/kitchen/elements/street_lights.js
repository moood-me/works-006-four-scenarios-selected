// The Christmas lights strung across the street (8 m off; x 0 at 3.4 m right of the start's line): a wire sagging
// from house to house, coloured bulbs along it — red, green, amber, blue — each its own small glow.
const sag = (x) => -3.2 + 1.0 * (1 - (x / 5) * (x / 5));
g.strokeStyle = "#2a2a2c";
g.lineWidth = 0.012;
g.beginPath();
g.moveTo(-5, sag(-5));
for (let x = -4.8; x <= 5; x += 0.2) g.lineTo(x, sag(x));
g.stroke();
const colours = ["#ff5a4a", "#5fd27a", "#ffc24a", "#6a9cff"];
let i = 0;
for (let x = -4.6; x <= 4.7; x += 0.5) {
  const c = colours[i % 4];
  g.fillStyle = c;
  g.beginPath();
  g.ellipse(x, sag(x) + 0.045, 0.022, 0.035, 0, 0, 6.3);
  g.fill();
  e.light(x, sag(x) + 0.045, 0.07, c, 0.5, `b${i}`);
  i++;
}
