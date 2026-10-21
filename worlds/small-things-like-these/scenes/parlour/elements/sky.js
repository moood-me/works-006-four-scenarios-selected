// The sky before dawn (stage heights; the horizon at 0.34) — seen only over the laundry's roof through the window: a
// deep December blue, a little lighter low down where the day will come.
const W = e.aspect;
const sky = g.createLinearGradient(0, -0.35, 0, 0.6);
sky.addColorStop(0, "#18213c");
sky.addColorStop(0.45, "#2c3a5f");
sky.addColorStop(0.75, "#4d5b80");
sky.addColorStop(1, "#5d6888");
g.fillStyle = sky;
g.fillRect(-0.3, -0.35, W + 0.6, 1.6);
