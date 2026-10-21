// The boat «Adventure» pulled up on the rocks of the cove, lying a little over on her side: a clinker hull of pale
// weathered blue with a white rail, her stub of a mast with the sail furled round it, a ship's lantern on the bow
// (out), a rope from the bow to a stone. Seen from her side.
const tilt = -0.07;
g.save();
g.rotate(tilt);
// the hull: keel low, the bow up to the right
g.fillStyle = "#7f9cb0";
g.beginPath();
g.moveTo(-1.75, -0.78);
g.quadraticCurveTo(-1.82, -0.2, -1.2, -0.05);
g.quadraticCurveTo(0.2, 0.08, 1.2, -0.08);
g.quadraticCurveTo(1.75, -0.3, 1.92, -0.95);
g.quadraticCurveTo(0.2, -0.72, -1.75, -0.78);
g.closePath();
g.fill();
// the strakes: clinker lines along her
g.strokeStyle = "rgba(52, 70, 86, 0.6)";
g.lineWidth = 0.025;
for (const k of [0.22, 0.44, 0.64]) {
  g.beginPath();
  g.moveTo(-1.76, -0.78 + k * 0.7);
  g.quadraticCurveTo(0.1, -0.7 + k * 0.78, 1.88 - k * 0.5, -0.92 + k * 0.82);
  g.stroke();
}
// the keel, dark, and a strip of weed
g.fillStyle = "#3d3b3a";
g.beginPath();
g.moveTo(-1.3, -0.06);
g.quadraticCurveTo(0.2, 0.12, 1.25, -0.06);
g.lineTo(1.2, -0.02);
g.quadraticCurveTo(0.2, 0.16, -1.25, -0.01);
g.closePath();
g.fill();
// the white rail
g.strokeStyle = "#ecebe6";
g.lineWidth = 0.07;
g.beginPath();
g.moveTo(-1.76, -0.8);
g.quadraticCurveTo(0.2, -0.74, 1.94, -0.97);
g.stroke();
// the mast and the furled sail
g.fillStyle = "#6b5440";
g.fillRect(-0.12, -2.75, 0.07, 2.0);
g.fillStyle = "#e7dfcf";
g.beginPath();
g.moveTo(-0.11, -2.55);
g.quadraticCurveTo(0.02, -1.7, -0.05, -0.9);
g.lineTo(-0.14, -0.9);
g.quadraticCurveTo(-0.22, -1.7, -0.11, -2.55);
g.fill();
g.strokeStyle = "rgba(120, 100, 80, 0.8)";
g.lineWidth = 0.015;
for (const y of [-2.2, -1.8, -1.4, -1.05]) {
  g.beginPath();
  g.moveTo(-0.2, y);
  g.lineTo(0.02, y + 0.03);
  g.stroke();
}
// the lantern on its bracket at the bow: brass, its glass dark
g.fillStyle = "#3a3632";
g.fillRect(1.66, -1.18, 0.04, 0.24);
g.fillStyle = "#a5874f";
g.fillRect(1.6, -1.42, 0.17, 0.05);
g.fillRect(1.6, -1.2, 0.17, 0.04);
g.fillStyle = "#58646c";
g.fillRect(1.62, -1.37, 0.13, 0.17);
g.fillStyle = "#a5874f";
g.beginPath();
g.moveTo(1.6, -1.42);
g.lineTo(1.685, -1.5);
g.lineTo(1.77, -1.42);
g.fill();
e.at(1.68, -1.3, "lantern");
g.restore();
// the rope from the bow down to a stone
g.strokeStyle = "#a58f6c";
g.lineWidth = 0.025;
g.beginPath();
g.moveTo(1.85, -0.85);
g.quadraticCurveTo(2.1, -0.2, 2.35, 0);
g.stroke();
e.at(0, -0.6, "boat");
