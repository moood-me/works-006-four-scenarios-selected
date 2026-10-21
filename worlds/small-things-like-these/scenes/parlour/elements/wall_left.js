// The left wall, seen along its length (x from the room's front at 0.55 m ahead, running back to the back wall at
// 4.4 m): the panelling and the distemper as the back wall's; a gilt-framed icon of Our Lady of Perpetual Help (x 2.5…3.0,
// at 3.05…3.55 m ahead) by the door. Its wall light is `sconce`, the chair against it `side_chair`.
const L = e.lib;
L.wall(g, 34, -0.05, 3.95, -3.6);
L.frame(g, 2.5, -2.25, 0.5, 0.62, 0.05);
g.fillStyle = "#c7a54e";
g.fillRect(2.5, -2.25, 0.5, 0.62);
g.fillStyle = "#4a2a3a";
g.beginPath();
g.moveTo(2.58, -1.63);
g.quadraticCurveTo(2.6, -2.05, 2.75, -2.1);
g.quadraticCurveTo(2.9, -2.05, 2.92, -1.63);
g.closePath();
g.fill();
g.fillStyle = "#8a3a30";
g.beginPath();
g.moveTo(2.68, -1.63);
g.quadraticCurveTo(2.7, -1.9, 2.8, -1.92);
g.quadraticCurveTo(2.86, -1.8, 2.86, -1.63);
g.closePath();
g.fill();
g.fillStyle = "#d9b896";
g.beginPath();
g.arc(2.75, -2.06, 0.04, 0, 6.3);
g.fill();
g.beginPath();
g.arc(2.82, -1.9, 0.025, 0, 6.3);
g.fill();
