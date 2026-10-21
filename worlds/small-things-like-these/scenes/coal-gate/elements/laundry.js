// The laundry's long side on the right of the yard (x −2.8 far … 2.8 near): two storeys of grey render over a stone
// plinth, stained under the sills; tall windows with dark green frames (their panes are `laundry_lit`), the kitchen's
// back door at x 0.2…1.0 with a worn stone step; a string course between the floors, a drainpipe, frost on the sills.
// The openings are painted dark here: what is lit in them is the other card's.
const r = e.lib.stream(31);
g.fillStyle = "#aca69c";
g.fillRect(-2.8, -8.4, 5.6, 8.45);
// stains of damp and steam down the render
for (let i = 0; i < 14; i++) {
  const x = -2.7 + r() * 5.4;
  const top = -8 + r() * 5;
  const streak = g.createLinearGradient(0, top, 0, top + 2.5);
  streak.addColorStop(0, "rgba(120, 116, 108, 0.35)");
  streak.addColorStop(1, "rgba(120, 116, 108, 0)");
  g.fillStyle = streak;
  g.fillRect(x, top, Math.min(0.15 + r() * 0.3, 2.8 - x), 2.5);
}
// the plinth and the string course
e.lib.rubble(g, 32, -2.8, -0.55, 5.6, 0.6, "#6a6762", ["#94908a", "#8a8680", "#9d9992"], 0.28);
g.fillStyle = "#bdb8ae";
g.fillRect(-2.8, -3.55, 5.6, 0.14);
// the openings, their frames and sills
// (each [x, y, w, h, a door — no sill])
const openings = [[-2.3, -2.95, 0.95, 2.05, false], [1.5, -2.95, 0.95, 2.05, false], [0.2, -2.05, 0.8, 2.05, true], [-2.05, -5.95, 0.8, 1.7, false], [-0.3, -5.95, 0.8, 1.7, false], [1.55, -5.95, 0.8, 1.7, false]];
for (const [x, y, w, h, door] of openings) {
  g.fillStyle = "#2c3530";
  g.fillRect(x - 0.07, y - 0.07, w + 0.14, h + 0.07);
  g.fillStyle = "#1d2120";
  g.fillRect(x, y, w, h);
  if (!door) {
    g.fillStyle = "#c4bfb5";
    g.fillRect(x - 0.1, y + h, w + 0.2, 0.08);
    g.fillStyle = "#eaeef1";
    g.fillRect(x - 0.1, y + h - 0.02, w + 0.2, 0.03);
  }
}
// the step before the door
g.fillStyle = "#b9b4a9";
g.fillRect(0.08, -0.16, 1.04, 0.2);
g.fillStyle = "#9f9a90";
g.fillRect(0.08, -0.04, 1.04, 0.08);
// the drainpipe
g.fillStyle = "#3a3d3c";
g.fillRect(-0.62, -8.4, 0.09, 8.4);
