// The white patch of rime on the stones by the landing (`frost_patch`) — where something sat in the night: a round
// frosted blot, crystal ticks round its rim. A draped plane (its metres from across -0.4, distance 9.5).
if (e.state.frost_patch) {
  for (let i = 0; i < 16; i++) {
    const x = (e.rnd() - 0.5) * 1.8, y = (e.rnd() - 0.5) * 1.3, r = 0.4 + 0.5 * e.rnd();
    const s = g.createRadialGradient(x, y, 0, x, y, r);
    s.addColorStop(0, "rgba(250, 252, 255, 0.95)");
    s.addColorStop(0.65, "rgba(238, 244, 252, 0.6)");
    s.addColorStop(1, "rgba(238, 244, 252, 0)");
    g.fillStyle = s;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  }
  g.strokeStyle = "rgba(255, 255, 255, 0.85)";
  g.lineWidth = 0.012;
  for (let i = 0; i < 90; i++) {
    const a = e.rnd() * Math.PI * 2, rr = 0.8 + 0.6 * e.rnd(), x = Math.cos(a) * rr, y = Math.sin(a) * rr * 0.75, l = 0.04 + 0.08 * e.rnd(), t = e.rnd() * Math.PI;
    g.beginPath();
    g.moveTo(x - Math.cos(t) * l, y - Math.sin(t) * l);
    g.lineTo(x + Math.cos(t) * l, y + Math.sin(t) * l);
    g.stroke();
  }
}
