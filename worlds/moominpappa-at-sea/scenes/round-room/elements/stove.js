// The little iron cooking stove by the wall: a black round body on short legs, its door, a pan on the hob, its pipe
// going up to the ceiling; beside it the driftwood bundle (`firewood`: full, or only its rope with two sticks in it).
// `stove`: cold; fire — the door's slots glowing, its light the engine's (e.light "fire", dimmed by animate when
// there is no fire); flooded — the sea came down the pipe: water running down its front, a black wet hearth.
const H = e.lib.H, state = e.state.stove ?? "cold";
g.fillStyle = "#2b2a2c";
g.fillRect(-0.04, -H, 0.08, H - 0.78);
g.fillStyle = "#3a383a";
g.fillRect(-0.05, -1.0, 0.1, 0.22);
g.fillStyle = "#302e30";
g.beginPath();
g.moveTo(-0.3, -0.12);
g.lineTo(-0.32, -0.7);
g.quadraticCurveTo(0, -0.8, 0.32, -0.7);
g.lineTo(0.3, -0.12);
g.closePath();
g.fill();
g.fillStyle = "#454245";
g.fillRect(-0.34, -0.74, 0.68, 0.05);
for (const x of [-0.24, 0.24]) g.fillRect(x - 0.03, -0.12, 0.06, 0.12);
// the door: shut; its three slots glow orange with a fire
g.fillStyle = "#1b1a1c";
g.fillRect(-0.13, -0.5, 0.26, 0.2);
g.strokeStyle = "#5a5658";
g.lineWidth = 0.012;
g.strokeRect(-0.13, -0.5, 0.26, 0.2);
g.fillStyle = state === "fire" ? "#ff9a40" : "#0e0d0f";
for (const x of [-0.08, 0, 0.08]) g.fillRect(x - 0.02, -0.45, 0.04, 0.1);
if (state === "flooded") {
  g.strokeStyle = "rgba(150, 170, 186, 0.55)";
  g.lineWidth = 0.012;
  for (const x of [-0.25, -0.1, 0.06, 0.2]) {
    g.beginPath();
    g.moveTo(x, -0.7);
    g.quadraticCurveTo(x + 0.02, -0.4, x - 0.01, -0.12);
    g.stroke();
  }
  g.fillStyle = "rgba(70, 76, 84, 0.8)";
  g.beginPath();
  g.ellipse(0, -0.01, 0.42, 0.04, 0, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "rgba(120, 118, 114, 0.7)";
  g.fillRect(-0.12, -0.31, 0.24, 0.03);
}
// the pan
g.fillStyle = "#6d6a64";
g.fillRect(-0.24, -0.86, 0.26, 0.12);
g.fillRect(0.02, -0.83, 0.16, 0.02);
// the driftwood bundle: its rope, full of grey sticks, or with two left in it
g.strokeStyle = "#a88c64";
g.lineWidth = 0.02;
g.beginPath();
g.ellipse(0.55, -0.05, 0.18, 0.05, 0, 0, Math.PI * 2);
g.stroke();
g.strokeStyle = "#c2b39a";
g.lineCap = "round";
if (e.state.firewood ?? true) {
  for (let i = 0; i < 12; i++) {
    const y = -0.04 - (i % 4) * 0.055, x0 = 0.36 + e.rnd() * 0.05, x1 = 0.7 + e.rnd() * 0.06;
    g.lineWidth = 0.04 + e.rnd() * 0.02;
    g.beginPath();
    g.moveTo(x0, y);
    g.lineTo(x1, y - (e.rnd() - 0.5) * 0.06);
    g.stroke();
  }
  g.strokeStyle = "#a88c64";
  g.lineWidth = 0.02;
  g.beginPath();
  g.moveTo(0.53, -0.25);
  g.lineTo(0.53, 0);
  g.stroke();
} else {
  g.lineWidth = 0.05;
  g.beginPath();
  g.moveTo(0.38, -0.04);
  g.lineTo(0.74, -0.09);
  g.moveTo(0.42, -0.1);
  g.lineTo(0.7, -0.02);
  g.stroke();
}
e.light(0, -0.4, 0.12, "#ff9a50", 1, "fire");
e.at(0, -0.6, "stove");
e.at(-0.1, -0.88, "hob");
