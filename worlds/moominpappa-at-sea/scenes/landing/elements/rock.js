// Low wet rocks at the cove's edge, where Papa stands looking out to sea at dusk: two dark, rounded stones at the
// water, darker and glossy where the swell reaches them; his feet behind them (`rock#edge`).
g.fillStyle = "#a1817b";
g.beginPath();
g.moveTo(-0.9, 0.02);
g.quadraticCurveTo(-0.85, -0.32, -0.4, -0.36);
g.quadraticCurveTo(-0.05, -0.38, 0.1, -0.2);
g.quadraticCurveTo(0.35, -0.42, 0.75, -0.3);
g.quadraticCurveTo(0.95, -0.15, 0.9, 0.02);
g.closePath();
g.fill();
const wet = g.createLinearGradient(0, -0.4, 0, 0.02);
wet.addColorStop(0, "rgba(90, 64, 64, 0)");
wet.addColorStop(1, "rgba(80, 58, 60, 0.6)");
g.fillStyle = wet;
g.fill();
g.fillStyle = "rgba(248, 236, 228, 0.5)";
g.beginPath();
g.ellipse(-0.45, -0.3, 0.2, 0.04, -0.1, 0, Math.PI * 2);
g.ellipse(0.45, -0.34, 0.18, 0.035, 0.1, 0, Math.PI * 2);
g.fill();
e.at(0.2, -0.3, "edge");
