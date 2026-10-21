// The convent's wall, seen from inside the yard (x 0 at 5 m left of the start's line; the yard's back, 11 m ahead):
// grey rubble stone in courses, a lighter coping white with frost along its top; the coal gate cut in it (x 5.5…6.7,
// 2.25 m high) with dressed jambs and a lintel; to its right the iron hatch of the coal chute, black dust smeared
// under it; damp darker toward the foot.
const L = e.lib;
L.rubble(g, 21, -9.5, -3.25, 17.4, 3.3, "#827f78", ["#a6a39b", "#9c9991", "#b0ada5", "#94918a"]);
// damp at the foot
const damp = g.createLinearGradient(0, 0, 0, -1.2);
damp.addColorStop(0, "rgba(60, 62, 60, 0.45)");
damp.addColorStop(1, "rgba(60, 62, 60, 0)");
g.fillStyle = damp;
g.fillRect(-9.5, -1.2, 17.4, 1.25);
// the coping and its frost
g.fillStyle = "#b2afa7";
g.fillRect(-9.6, -3.42, 17.6, 0.2);
g.fillStyle = "#e8edf1";
g.beginPath();
g.moveTo(-9.6, -3.42);
for (let x = -9.6; x <= 8; x += 0.4) g.lineTo(x, -3.46 - (Math.sin(x * 7.1) * 0.5 + 0.5) * 0.04);
g.lineTo(8, -3.42);
g.closePath();
g.fill();
// the gate's jambs and lintel
g.fillStyle = "#bdb9b0";
g.fillRect(5.33, -2.45, 0.17, 2.45);
g.fillRect(6.7, -2.45, 0.17, 2.45);
g.fillRect(5.33, -2.6, 1.54, 0.35);
// the chute's hatch, iron with rivets, and the coal smeared below it
g.fillStyle = "#2a2624";
g.beginPath();
g.moveTo(7.18, -0.42);
g.bezierCurveTo(7.1, -0.2, 7.8, -0.15, 7.72, -0.42);
g.closePath();
g.fill();
g.fillStyle = "#4a3a30";
g.fillRect(7.18, -0.98, 0.54, 0.52);
g.fillStyle = "#2c2422";
for (const [x, y] of [[7.23, -0.93], [7.67, -0.93], [7.23, -0.51], [7.67, -0.51]]) g.fillRect(x - 0.015, y - 0.015, 0.03, 0.03);
g.fillRect(7.42, -0.76, 0.14, 0.04);
// the opening itself: nothing painted there, the road beyond seen through it
g.globalCompositeOperation = "destination-out";
g.fillRect(5.5, -2.25, 1.2, 2.3);
g.globalCompositeOperation = "source-over";
