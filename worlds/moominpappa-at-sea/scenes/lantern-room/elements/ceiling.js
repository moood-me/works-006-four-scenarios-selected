// The lantern's ceiling from below (a plane turned face down: x across, y away from the viewer; its centre over the
// lamp): sooty boards under the cap, eight iron ribs running out from the vent's black ring over the lamp.
const L = e.lib;
g.fillStyle = "#cfc9be";
g.fillRect(-L.R - 0.1, -L.R - 0.1, 2 * L.R + 0.2, 2 * L.R + 0.2);
const soot = g.createRadialGradient(0, 0, 0.2, 0, 0, 1.6);
soot.addColorStop(0, "rgba(40, 36, 34, 0.75)");
soot.addColorStop(1, "rgba(40, 36, 34, 0)");
g.fillStyle = soot;
g.fillRect(-L.R, -L.R, 2 * L.R, 2 * L.R);
g.fillStyle = "#3a3e3c";
for (let i = 0; i < 8; i++) {
  g.save();
  g.rotate((i / 8) * Math.PI * 2);
  g.fillRect(0.2, -0.035, L.R, 0.07);
  g.restore();
}
g.fillStyle = "#1c1c1e";
g.beginPath();
g.arc(0, 0, 0.16, 0, Math.PI * 2);
g.fill();
