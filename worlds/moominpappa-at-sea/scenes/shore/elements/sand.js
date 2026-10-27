// The beach from above (the plane's metres: x across, y toward the viewer; its centre at across 0, distance 18): pale
// warm sand, darker and greyer where the sea wets it along the strand, a line of dried weed and driftwood bits at the
// high-water mark, ripple marks on the wet sand, shells and pebbles; where the knoll's granite comes up, and far
// ahead, the sand thins away.
const CA = 0, CD = 18, L = e.lib, at = (a, d) => [a - CA, CD - d];
g.fillStyle = "#d8bf94";
g.fillRect(-14, -24, 28, 48);
const blot = (x, y, r, color, alpha) => {
  const s = g.createRadialGradient(x, y, 0, x, y, r);
  s.addColorStop(0, `rgba(${color}, ${alpha})`);
  s.addColorStop(1, `rgba(${color}, 0)`);
  g.fillStyle = s;
  g.fillRect(x - r, y - r, r * 2, r * 2);
};
// the wet strand: from the water to a wavering line two metres up the sand
const [wx] = at(L.WATER, 0);
const wet = g.createLinearGradient(wx - 3, 0, wx + 2.6, 0);
wet.addColorStop(0, "rgba(150, 140, 122, 1)");
wet.addColorStop(0.55, "rgba(176, 162, 138, 0.95)");
wet.addColorStop(1, "rgba(196, 180, 152, 0)");
g.fillStyle = wet;
g.fillRect(wx - 3, -24, 5.6, 48);
// drifts of colour: warmer and greyer patches, paler blown sand on the dune
for (let i = 0; i < 70; i++) {
  const x = (e.rnd() - 0.5) * 28, y = (e.rnd() - 0.5) * 48, k = e.rnd();
  blot(x, y, 1.5 + e.rnd() * 4, k < 0.4 ? "196, 172, 132" : k < 0.75 ? "226, 206, 168" : "204, 180, 140", 0.35 + e.rnd() * 0.3);
}
// ripple marks on the wet sand: short wavy lines along the water
g.lineCap = "round";
for (let i = 0; i < 520; i++) {
  const x = wx + e.rnd() * 2.4 - 0.3, y = (e.rnd() - 0.5) * 48, len = 0.3 + e.rnd() * 0.7;
  g.strokeStyle = e.rnd() < 0.5 ? "rgba(128, 118, 102, 0.35)" : "rgba(222, 212, 192, 0.4)";
  g.lineWidth = 0.025;
  g.beginPath();
  g.moveTo(x, y - len / 2);
  g.quadraticCurveTo(x + 0.06, y, x, y + len / 2);
  g.stroke();
}
// the high-water mark: dried bladderwrack, bits of bark and stick, scattered along a wavering line
g.strokeStyle = "rgba(112, 96, 66, 0.5)";
for (let y = -24; y < 24; y += 0.3) {
  if (e.rnd() < 0.45) continue;
  const x = wx + 2.7 + Math.sin(y * 0.4) * 0.35 + (e.rnd() - 0.5) * 0.6;
  g.lineWidth = 0.02 + e.rnd() * 0.03;
  g.beginPath();
  g.moveTo(x, y);
  g.lineTo(x + (e.rnd() - 0.5) * 0.25, y + 0.2 + e.rnd() * 0.25);
  g.stroke();
}
// shells, pebbles: pale and grey dots, a few blue mussel shells
for (let i = 0; i < 700; i++) {
  const x = wx + e.rnd() * 9, y = (e.rnd() - 0.5) * 48, r = 0.02 + e.rnd() * 0.05, k = e.rnd();
  g.fillStyle = k < 0.45 ? "rgba(246, 240, 228, 0.8)" : k < 0.85 ? "rgba(140, 132, 124, 0.6)" : "rgba(62, 70, 88, 0.8)";
  g.beginPath();
  g.ellipse(x, y, r * 1.4, r, e.rnd() * 3, 0, Math.PI * 2);
  g.fill();
}
// the grain: fine speckle all over
for (let i = 0; i < 1500; i++) {
  const x = (e.rnd() - 0.5) * 28, y = (e.rnd() - 0.5) * 48;
  g.fillStyle = e.rnd() < 0.5 ? "rgba(150, 132, 104, 0.25)" : "rgba(252, 246, 232, 0.35)";
  g.fillRect(x, y, 0.03, 0.03);
}
// where the granite comes up through it — the knoll, and the land beyond the beach far ahead — the sand thins away to
// nothing (the island's granite lies under it there)
g.globalCompositeOperation = "destination-out";
for (let i = 0; i < 160; i++) {
  const a = CA + (e.rnd() - 0.5) * 28, d = CD + (e.rnd() - 0.5) * 48, k = L.knoll(a, d);
  if (k < 0.5) continue;
  const [x, y] = at(a, d);
  blot(x, y, 1.5 + e.rnd() * 2.5, "0, 0, 0", Math.min(1, k * 0.6));
}
const far = g.createLinearGradient(0, -24, 0, -14);
far.addColorStop(0, "rgba(0, 0, 0, 1)");
far.addColorStop(1, "rgba(0, 0, 0, 0)");
g.fillStyle = far;
g.fillRect(-14, -24, 28, 10);
g.globalCompositeOperation = "source-over";
