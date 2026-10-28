// The window's casement out at the glass: a white-painted wooden frame, a middle post and two bars — six small panes
// (the glass is its own element behind it).
const L = e.lib, w = 2 * L.WIN.half, h = L.WIN.top - L.WIN.sill, f = 0.06, b = 0.035;
g.fillStyle = "#d9d6cf";
g.beginPath();
g.rect(-w / 2, -h, w, h);
g.rect(-w / 2 + f, -h + f, w - 2 * f, h - 2 * f);
g.fill("evenodd");
g.fillRect(-b / 2, -h + f, b, h - 2 * f);
for (const k of [1 / 3, 2 / 3]) g.fillRect(-w / 2 + f, -h + f + (h - 2 * f) * k - b / 2, w - 2 * f, b);
g.strokeStyle = "rgba(110, 104, 96, 0.5)";
g.lineWidth = 0.008;
g.strokeRect(-w / 2 + f, -h + f, w - 2 * f, h - 2 * f);
e.at(0, -h / 2, "window");
