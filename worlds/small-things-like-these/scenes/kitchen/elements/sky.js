// The night sky over the street (stage heights; the horizon at 0.4) — seen only past the roofs through the window: a
// deep blue, lighter toward the town's glow low down.
const W = e.aspect;
const sky = g.createLinearGradient(0, -0.35, 0, 0.6);
sky.addColorStop(0, "#1b2440");
sky.addColorStop(0.55, "#2c3a5e");
sky.addColorStop(1, "#4f587a");
g.fillStyle = sky;
g.fillRect(-0.3, -0.35, W + 0.6, 1.6);
