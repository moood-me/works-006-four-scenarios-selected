// The dresser against the left wall, seen face on (x −0.65…0.65, 2.1 m high): a painted cupboard below with two doors,
// its worktop at 0.9 m with the wireless set on it — a brown box with a cloth grille and a dial — open shelves above
// with blue-and-white plates standing on their edges, cups hanging from hooks under the shelves.
const L = e.lib;
g.fillStyle = "#c9c2a6";
g.fillRect(-0.65, -2.1, 1.3, 2.12);
g.fillStyle = "#8e9f88";
g.fillRect(-0.62, -0.86, 1.24, 0.82);
g.strokeStyle = "#76866f";
g.lineWidth = 0.015;
g.strokeRect(-0.56, -0.8, 0.54, 0.7);
g.strokeRect(0.02, -0.8, 0.54, 0.7);
g.fillStyle = "#b8954a";
g.fillRect(-0.07, -0.5, 0.025, 0.06);
g.fillRect(0.045, -0.5, 0.025, 0.06);
g.fillStyle = "#6c5642";
g.fillRect(-0.68, -0.92, 1.36, 0.06);
// the wireless
g.fillStyle = "#6a4a32";
g.fillRect(0.12, -1.2, 0.4, 0.28);
g.fillStyle = "#c9b48a";
g.fillRect(0.15, -1.17, 0.2, 0.22);
g.fillStyle = "#ece2c4";
g.fillRect(0.38, -1.15, 0.11, 0.06);
g.fillStyle = "#3a2a1e";
g.beginPath();
g.arc(0.405, -1.0, 0.022, 0, 6.3);
g.arc(0.465, -1.0, 0.022, 0, 6.3);
g.fill();
// the shelves, the plates, the cups
g.fillStyle = "#b0a888";
g.fillRect(-0.6, -2.02, 1.2, 1.1);
for (const y of [-1.62, -1.28]) {
  g.fillStyle = "#6c5642";
  g.fillRect(-0.62, y, 1.24, 0.03);
}
g.fillStyle = "#6c5642";
g.fillRect(-0.62, -2.05, 1.24, 0.04);
for (let x = -0.48; x < 0.55; x += 0.24) L.plate(g, x, -1.73, 0.1);
for (let x = -0.48; x < 0.1; x += 0.2) L.plate(g, x, -1.37, 0.08);
for (let x = -0.5; x < 0.55; x += 0.2) {
  g.fillStyle = "#e9ecea";
  g.fillRect(x, -1.24, 0.08, 0.07);
  g.strokeStyle = "#3f5f93";
  g.lineWidth = 0.01;
  g.beginPath();
  g.arc(x + 0.09, -1.21, 0.02, -1.5, 1.5);
  g.stroke();
}
