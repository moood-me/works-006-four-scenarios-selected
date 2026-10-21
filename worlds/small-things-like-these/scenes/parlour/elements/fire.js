// What burns in the grate (just before the iron insert's arched opening, x −0.22…0.22): a heap of coals glowing orange
// to their hearts, darker lumps on top, the grate's black bars before them; the fire's glow `coals` and its point (the
// flames rise from it) — the scene's light `fire` shines from it.
const r = e.lib.stream(51);
const heap = g.createRadialGradient(0, -0.1, 0.02, 0, -0.1, 0.22);
heap.addColorStop(0, "#ffd27a");
heap.addColorStop(0.5, "#ff8a3a");
heap.addColorStop(1, "#a8361c");
g.fillStyle = heap;
g.beginPath();
g.ellipse(0, -0.08, 0.2, 0.12, 0, Math.PI, 0);
g.lineTo(0.2, -0.04);
g.lineTo(-0.2, -0.04);
g.closePath();
g.fill();
g.fillStyle = "#2a1a14";
for (let i = 0; i < 9; i++) {
  g.beginPath();
  g.ellipse(-0.16 + r() * 0.32, -0.1 - r() * 0.07, 0.025 + r() * 0.02, 0.016 + r() * 0.01, r() * 3, 0, 6.3);
  g.fill();
}
// the grate's bars and its rail
g.fillStyle = "#1c1918";
for (let x = -0.19; x <= 0.2; x += 0.055) g.fillRect(x, -0.12, 0.012, 0.1);
g.fillRect(-0.21, -0.05, 0.42, 0.025);
g.fillRect(-0.21, -0.125, 0.42, 0.012);
g.fillRect(-0.2, -0.025, 0.02, 0.03);
g.fillRect(0.18, -0.025, 0.02, 0.03);
e.light(0, -0.12, 0.22, "#ff9a4a", 1, "coals");
e.at(0, -0.12, "coals");
