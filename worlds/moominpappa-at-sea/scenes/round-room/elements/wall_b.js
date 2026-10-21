// The round wall from the window round to the near right (a bent sheet of the room's circle, unrolled): whitewash over
// the blue-grey dado, a few iron hooks the keeper left — his yellow oilskin and sou'wester still on one —, a coil of
// rope on a nail.
const L = e.lib, { mid: MID, width: W, bend } = L.WALLS.b, H = L.H, x = t => L.wallX(t, MID);
L.whitewash(g, e, -W / 2, W / 2, 0, H);
const hook = (hx, hy) => {
  g.fillStyle = "#3a3634";
  g.fillRect(hx - 0.015, hy - 0.015, 0.03, 0.03);
  g.strokeStyle = "#3a3634";
  g.lineWidth = 0.014;
  g.beginPath();
  g.moveTo(hx, hy);
  g.quadraticCurveTo(hx + 0.05, hy + 0.02, hx + 0.04, hy - 0.05);
  g.stroke();
};
// the oilskin: a long yellow coat hanging by its loop, the sou'wester over it
const ox = x(47), oy = -1.95;
hook(ox, oy);
g.fillStyle = "#d9a83a";
g.beginPath();
g.moveTo(ox - 0.08, oy + 0.02);
g.quadraticCurveTo(ox - 0.32, oy + 0.1, ox - 0.3, oy + 0.5);
g.lineTo(ox - 0.34, oy + 1.15);
g.quadraticCurveTo(ox, oy + 1.2, ox + 0.33, oy + 1.14);
g.lineTo(ox + 0.29, oy + 0.5);
g.quadraticCurveTo(ox + 0.31, oy + 0.1, ox + 0.08, oy + 0.02);
g.closePath();
g.fill();
g.strokeStyle = "rgba(120, 84, 24, 0.6)";
g.lineWidth = 0.012;
for (const k of [-0.16, 0, 0.14]) {
  g.beginPath();
  g.moveTo(ox + k * 0.5, oy + 0.1);
  g.quadraticCurveTo(ox + k, oy + 0.6, ox + k * 1.6, oy + 1.13);
  g.stroke();
}
g.fillStyle = "#c99634";
g.beginPath();
g.ellipse(ox, oy - 0.02, 0.2, 0.06, 0, 0, Math.PI * 2);
g.fill();
g.beginPath();
g.ellipse(ox, oy - 0.08, 0.11, 0.09, 0, Math.PI, 0);
g.fill();
// a coil of rope on a nail
const rx = x(54), ry = -1.7;
hook(rx, ry);
g.strokeStyle = "#a88c64";
g.lineWidth = 0.025;
for (let i = 0; i < 4; i++) {
  g.beginPath();
  g.ellipse(rx, ry + 0.2, 0.13 + i * 0.012, 0.2 + i * 0.01, 0, 0, Math.PI * 2);
  g.stroke();
}
hook(x(68), -1.9);
hook(x(73), -1.9);
e.form(e.kit.bend(W, H, bend), { ground: "#ece6d9" });
