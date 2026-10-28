// A hard chair against the left wall by the door, seen from the side (x across: its back by the wall at −x, its
// front toward the room; x −0.24…0.24): dark oak, a plain rush seat at 0.46 m, its back upright.
g.fillStyle = "#4a3222";
// the back leg and the upright, by the wall (x −0.2)
g.fillRect(-0.21, -0.96, 0.04, 0.96);
// the front leg
g.fillRect(0.16, -0.46, 0.04, 0.46);
// the seat's edge, the rush showing
g.fillStyle = "#b39a62";
g.fillRect(-0.2, -0.5, 0.4, 0.05);
g.fillStyle = "#4a3222";
g.fillRect(-0.2, -0.45, 0.4, 0.025);
// the back's rails
g.fillRect(-0.21, -0.94, 0.04, 0.02);
for (const y of [-0.9, -0.75, -0.62]) g.fillRect(-0.24, y, 0.08, 0.04);
// the stretcher between the legs
g.fillRect(-0.18, -0.16, 0.35, 0.02);
