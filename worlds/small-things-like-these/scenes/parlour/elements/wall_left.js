// The left wall, seen along its length (x from the room's front at 0.55 m ahead, running back to the back wall at
// 4.4 m): the panelling and the distemper as the back wall's; a small gilt-framed icon of Our Lady of Perpetual Help (x 2.95…3.35,
// at 3.5…3.9 m ahead) by the door. Its wall light is `sconce`, the chair against it `side_chair`.
const L = e.lib;
L.wall(g, 34, -0.05, 3.95, -3.6);
// the icon, small (x 2.95…3.35, 1.75…2.25 m up), clear of the wall light before it
g.save();
g.translate(3.15, -2.0);
L.frame(g, -0.2, -0.25, 0.4, 0.5, 0.04);
g.fillStyle = "#c7a54e";
g.fillRect(-0.2, -0.25, 0.4, 0.5);
// Our Lady's dark red-violet mantle, the Child in red at her side, their faces
g.fillStyle = "#4a2a3a";
g.beginPath();
g.moveTo(-0.14, 0.25);
g.quadraticCurveTo(-0.12, -0.08, 0.0, -0.12);
g.quadraticCurveTo(0.12, -0.08, 0.14, 0.25);
g.closePath();
g.fill();
g.fillStyle = "#8a3a30";
g.beginPath();
g.moveTo(-0.06, 0.25);
g.quadraticCurveTo(-0.04, 0.03, 0.04, 0.02);
g.quadraticCurveTo(0.09, 0.12, 0.09, 0.25);
g.closePath();
g.fill();
g.fillStyle = "#d9b896";
g.beginPath();
g.arc(0.0, -0.09, 0.032, 0, 6.3);
g.fill();
g.beginPath();
g.arc(0.055, 0.035, 0.02, 0, 6.3);
g.fill();
g.restore();
