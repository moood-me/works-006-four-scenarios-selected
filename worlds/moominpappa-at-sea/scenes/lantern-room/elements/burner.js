// The lamp: its lens drum of glass prisms — rings of them above and below, the belt between — in brass rims, and inside
// it the burner on its wick. A flat sheet facing the room (the drum is seen from one side); its shader turns the drum's
// panels as the lamp burns, lights the flame from within, and lays the grime over the glass as murky as `lenses` says.
// The layers: 1 the glass, 2 the flame, 3 the blue flame (the burner warmed with paraffin), 4 the grime. Its lights,
// the engine's: "flame" (warm, strong) and "blue" — each dimmed by animate. Points: the wick, the lens.
const L = e.lib, r = L.LENS.r, h = L.LENS.top - L.LENS.foot, fy = -(L.LENS.flame - L.LENS.foot);
// the burner inside: its brass font and the wick
g.fillStyle = "#8c7444";
g.fillRect(-0.07, fy + 0.05, 0.14, -fy - 0.07);
g.fillStyle = "#b08d4a";
g.fillRect(-0.09, fy + 0.03, 0.18, 0.04);
g.fillStyle = "#2a2422";
g.fillRect(-0.025, fy - 0.01, 0.05, 0.04);
g.fillStyle = "rgba(60, 70, 72, 0.25)";
g.fillRect(-r, -h, 2 * r, h);
e.layer("glass", {}, c => {
  c.fillStyle = "rgba(196, 222, 226, 0.32)";
  c.beginPath();
  c.moveTo(-r, -0.04);
  c.quadraticCurveTo(-r - 0.04, -h / 2, -r, -h + 0.04);
  c.lineTo(r, -h + 0.04);
  c.quadraticCurveTo(r + 0.04, -h / 2, r, -0.04);
  c.closePath();
  c.fill();
  // the prism rings: close above and below, the belt in the middle broad
  for (let y = -h + 0.07; y < -0.06; y += 0.035) {
    if (y > fy - 0.2 && y < fy + 0.2) continue;
    c.fillStyle = "rgba(255, 255, 255, 0.28)";
    c.fillRect(-r, y, 2 * r, 0.006);
    c.fillStyle = "rgba(70, 100, 110, 0.22)";
    c.fillRect(-r, y + 0.012, 2 * r, 0.008);
  }
  c.fillStyle = "rgba(255, 255, 255, 0.18)";
  c.fillRect(-r, fy - 0.2, 2 * r, 0.01);
  c.fillRect(-r, fy + 0.19, 2 * r, 0.01);
  c.fillStyle = "#b08d4a";
  c.fillRect(-r - 0.03, -h, 2 * r + 0.06, 0.05);
  c.fillRect(-r - 0.03, -0.05, 2 * r + 0.06, 0.05);
});
e.layer("flame", {}, c => {
  const s = c.createRadialGradient(0, fy - 0.07, 0.01, 0, fy - 0.07, 0.12);
  s.addColorStop(0, "rgba(255, 246, 210, 1)");
  s.addColorStop(0.5, "rgba(255, 196, 96, 0.9)");
  s.addColorStop(1, "rgba(255, 150, 60, 0)");
  c.fillStyle = s;
  c.beginPath();
  c.moveTo(0, fy - 0.2);
  c.quadraticCurveTo(0.07, fy - 0.06, 0.03, fy);
  c.lineTo(-0.03, fy);
  c.quadraticCurveTo(-0.07, fy - 0.06, 0, fy - 0.2);
  c.fill();
});
e.layer("blue", {}, c => {
  const s = c.createRadialGradient(0, fy - 0.05, 0.005, 0, fy - 0.05, 0.12);
  s.addColorStop(0, "rgba(200, 220, 255, 1)");
  s.addColorStop(0.6, "rgba(90, 130, 255, 0.85)");
  s.addColorStop(1, "rgba(60, 90, 220, 0)");
  c.fillStyle = s;
  c.beginPath();
  c.ellipse(0, fy - 0.06, 0.07, 0.09, 0, 0, Math.PI * 2);
  c.fill();
});
e.layer("grime", {}, c => {
  for (let i = 0; i < 60; i++) {
    const x = (e.rnd() - 0.5) * 2 * r, y = -e.rnd() * h, rr = 0.05 + e.rnd() * 0.12;
    const s = c.createRadialGradient(x, y, 0, x, y, rr);
    s.addColorStop(0, `rgba(128, 116, 92, ${0.35 + e.rnd() * 0.25})`);
    s.addColorStop(1, "rgba(128, 116, 92, 0)");
    c.fillStyle = s;
    c.fillRect(Math.max(-r, x - rr), y - rr, Math.min(r, x + rr) - Math.max(-r, x - rr), 2 * rr);
  }
});
e.light(0, fy - 0.08, 0.22, "#ffd590", 2, "flame");
e.light(0, fy - 0.03, 0.12, "#8fb4ff", 1, "blue");
e.at(0, fy, "wick");
e.at(0, -h / 2, "lens");
