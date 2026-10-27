// The storm lantern, the room's only light at night: a tin font, a glass globe in its wire guard, a cap and a bail
// handle. It stands where `lantern_at` says (the script moves its place: lantern_a/d/e); its flame by `flame` — full,
// turned low, out (an empty lantern, the globe sooty and cold), or out and white with rime. The globe and the flame
// are a layer the shader lights from within as much as the flame burns (u_lit, by animate); the flame's glow and light
// are the engine's (e.light "flame", dimmed by e.glow). Not in the room (`none`): nothing painted but its light, out.
const L = e.lib, S = e.state, flame = S.flame ?? "full", here = (S.lantern_at ?? "table") !== "none";
if (here) {
  g.fillStyle = "#6f6a5e";
  g.beginPath();
  g.ellipse(0, -0.03, 0.11, 0.03, 0, 0, Math.PI * 2);
  g.fill();
  g.fillRect(-0.11, -0.1, 0.22, 0.07);
  g.fillStyle = "#8a8474";
  g.fillRect(-0.09, -0.12, 0.18, 0.03);
  // the guard wires, the cap, the handle
  g.strokeStyle = "#4a4640";
  g.lineWidth = 0.008;
  for (const x of [-0.085, 0, 0.085]) {
    g.beginPath();
    g.moveTo(x * 0.7, -0.12);
    g.quadraticCurveTo(x * 1.25, -0.21, x * 0.7, -0.3);
    g.stroke();
  }
  g.fillStyle = "#6f6a5e";
  g.fillRect(-0.06, -0.33, 0.12, 0.03);
  g.beginPath();
  g.moveTo(-0.045, -0.33);
  g.lineTo(0, -0.37);
  g.lineTo(0.045, -0.33);
  g.fill();
  g.lineWidth = 0.01;
  g.beginPath();
  g.moveTo(-0.1, -0.1);
  g.quadraticCurveTo(-0.13, -0.44, 0, -0.45);
  g.quadraticCurveTo(0.13, -0.44, 0.1, -0.1);
  g.stroke();
  if (flame === "frost") {
    g.fillStyle = "rgba(240, 246, 252, 0.85)";
    for (let i = 0; i < 30; i++) g.fillRect(-0.11 + e.rnd() * 0.22, -0.12 + e.rnd() * 0.1, 0.01, 0.006);
  }
  // the globe and the flame: lit from within by the shader
  e.layer("globe", {}, c => {
    const globe = new Path2D();
    globe.moveTo(-0.05, -0.12);
    globe.bezierCurveTo(-0.11, -0.16, -0.11, -0.26, -0.05, -0.3);
    globe.lineTo(0.05, -0.3);
    globe.bezierCurveTo(0.11, -0.26, 0.11, -0.16, 0.05, -0.12);
    globe.closePath();
    if (flame === "full" || flame === "low") {
      const glass = c.createRadialGradient(0, -0.2, 0.01, 0, -0.2, 0.09);
      glass.addColorStop(0, "rgba(255, 214, 140, 0.95)");
      glass.addColorStop(1, "rgba(226, 184, 118, 0.8)");
      c.fillStyle = glass;
      c.fill(globe);
      const t = flame === "full" ? 1 : 0.55;
      c.fillStyle = "#ffe0a0";
      c.beginPath();
      c.moveTo(0, -0.17 - 0.08 * t);
      c.quadraticCurveTo(0.02 * t, -0.2, 0, -0.17);
      c.quadraticCurveTo(-0.02 * t, -0.2, 0, -0.17 - 0.08 * t);
      c.fill();
    } else {
      c.fillStyle = flame === "frost" ? "rgba(232, 240, 248, 0.9)" : "rgba(150, 142, 128, 0.75)";
      c.fill(globe);
      c.fillStyle = "rgba(40, 36, 32, 0.4)";
      c.fillRect(-0.06, -0.3, 0.12, 0.05);
    }
  });
}
e.light(0, -0.21, 0.14, "#ffc874", 1.2, "flame");
e.at(0, -0.21, "flame");
