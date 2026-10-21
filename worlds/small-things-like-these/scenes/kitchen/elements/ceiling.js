// The ceiling from above, as a plan (2.9 m up): cream boards running from the front to the back wall, yellowed by smoke
// toward the range's side.
const L = e.lib;
L.boards(g, 72, -3.25, -1.9, 6.5, 3.8, "#e6dcc4", "#cbbfa4", 0.12);
const smoke = g.createLinearGradient(-3.25, 0, 0.5, 0);
smoke.addColorStop(0, "rgba(150, 126, 90, 0.3)");
smoke.addColorStop(1, "rgba(150, 126, 90, 0)");
g.fillStyle = smoke;
g.fillRect(-3.25, -1.9, 6.5, 3.8);
