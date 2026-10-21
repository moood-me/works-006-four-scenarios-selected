// What is lit in the houses across the street (on their card, just before it): the pink house's wide window — a warm
// room behind lace curtains —, its fanlight from the hall; the street lamp's head, its glow `lamp` — the scene's light
// `streetlamp` shines from it.
const room = g.createLinearGradient(0, -2.3, 0, -0.95);
room.addColorStop(0, "#f6d9a2");
room.addColorStop(1, "#d8a96c");
g.fillStyle = room;
g.fillRect(0.02, -2.3, 1.16, 1.34);
g.fillStyle = "#e9e3d2";
g.fillRect(0.58, -2.3, 0.04, 1.34);
g.fillRect(0.02, -1.66, 1.16, 0.04);
g.fillStyle = "rgba(255, 250, 238, 0.45)";
g.fillRect(0.02, -2.3, 0.3, 1.34);
g.fillRect(0.88, -2.3, 0.3, 1.34);
e.light(0.6, -1.6, 0.5, "#ffd49a", 0.4, "window");
g.fillStyle = "#f2c98a";
g.beginPath();
g.moveTo(-1.56, -2.27);
g.lineTo(-0.59, -2.27);
g.lineTo(-0.59, -2.4);
g.quadraticCurveTo(-1.075, -2.66, -1.56, -2.4);
g.closePath();
g.fill();
// the lamp's head
g.fillStyle = "#ffd28a";
g.beginPath();
g.ellipse(-0.33, -4.38, 0.12, 0.05, 0, 0, 6.3);
g.fill();
e.light(-0.33, -4.36, 0.35, "#ffbe6e", 0.8, "lamp");
