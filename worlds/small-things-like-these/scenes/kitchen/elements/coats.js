// The coats on the pegs by the right corner (x −0.32…0.32; the pegs 1.8 m up): Bill's mustard overcoat hung by its
// collar from the middle peg, a sleeve fallen forward, his tweed cap on the peg to the right; Eileen's dark brown coat
// behind it on the left peg, a child's red-and-grey school scarf over it.
// Eileen's coat
g.fillStyle = "#4a3a30";
g.beginPath();
g.moveTo(-0.2, -1.78);
g.quadraticCurveTo(-0.32, -1.6, -0.3, -0.95);
g.lineTo(-0.08, -0.92);
g.lineTo(-0.1, -1.7);
g.closePath();
g.fill();
// the school scarf
g.fillStyle = "#8a2f2c";
g.fillRect(-0.24, -1.74, 0.07, 0.5);
g.fillStyle = "#9a9a98";
for (let y = -1.7; y < -1.26; y += 0.08) g.fillRect(-0.24, y, 0.07, 0.03);
// Bill's overcoat: the collar on the peg, the body hanging, a sleeve forward
g.fillStyle = "#b5862c";
g.beginPath();
g.moveTo(-0.04, -1.8);
g.quadraticCurveTo(-0.2, -1.72, -0.2, -1.5);
g.lineTo(-0.22, -0.6);
g.quadraticCurveTo(0.0, -0.56, 0.2, -0.62);
g.lineTo(0.17, -1.5);
g.quadraticCurveTo(0.16, -1.72, 0.0, -1.8);
g.closePath();
g.fill();
g.fillStyle = "#9c7224";
g.beginPath();
g.moveTo(0.02, -1.74);
g.lineTo(0.0, -0.58);
g.lineTo(0.03, -0.58);
g.lineTo(0.05, -1.72);
g.closePath();
g.fill();
g.fillStyle = "#a57a28";
g.beginPath();
g.moveTo(-0.17, -1.55);
g.quadraticCurveTo(-0.16, -1.15, -0.1, -0.95);
g.lineTo(-0.03, -0.97);
g.quadraticCurveTo(-0.08, -1.2, -0.08, -1.55);
g.closePath();
g.fill();
g.fillStyle = "#7a5a1c";
for (const y of [-1.45, -1.25, -1.05]) {
  g.beginPath();
  g.arc(0.06, y, 0.012, 0, 6.3);
  g.fill();
}
// the cap on its peg
g.fillStyle = "#4d4a42";
g.beginPath();
g.ellipse(0.17, -1.79, 0.1, 0.05, 0, 3.14, 6.28);
g.fill();
g.fillRect(0.07, -1.8, 0.22, 0.025);
