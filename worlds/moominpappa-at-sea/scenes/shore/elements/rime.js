// The frost round the Groke, from above (the plane's metres: x across, y toward the viewer; its centre at across -2.2,
// distance 12, on the level strand): painted once for where she sits (groke_at) — the white rime crystals out to its
// widest, the sand under her dark and damp where she has warmed, the white trail from her seat down to the water.
// Its shader shows as much of each as the keys say (frost, warm, track): the rime grows and melts, the dark circle
// comes (over the rime: frost round where she sat), the trail runs out to the water — no painting again.
const CA = -2.2, CD = 12, R = 3.4, L = e.lib, seat = L.SEATS[e.state.groke_at] ?? L.SEATS.edge;
// (only on the sand: the plane lies level on the strand, a little over the sea — the shader ends it at the water's
// edge, wx)
const sx = seat[0] - CA, sy = CD - seat[1], wx = L.WATER - 0.55 - CA;
// 1: the rime — a pale bloom, then many short white needles, denser and longer toward her
e.layer("rime", {}, c => {
  const s = c.createRadialGradient(sx, sy, 0, sx, sy, R);
  s.addColorStop(0, "rgba(244, 249, 252, 0.95)");
  s.addColorStop(0.55, "rgba(236, 244, 250, 0.7)");
  s.addColorStop(1, "rgba(236, 244, 250, 0.25)");
  c.fillStyle = s;
  c.beginPath();
  c.arc(sx, sy, R, 0, Math.PI * 2);
  c.fill();
  c.lineCap = "round";
  for (let i = 0; i < 1400; i++) {
    const a = e.rnd() * Math.PI * 2, r = R * Math.sqrt(e.rnd()), x = sx + Math.cos(a) * r, y = sy + Math.sin(a) * r, len = 0.05 + 0.12 * (1 - r / R) + e.rnd() * 0.06;
    const t = e.rnd() * Math.PI;
    c.strokeStyle = e.rnd() < 0.7 ? "rgba(255, 255, 255, 0.9)" : "rgba(196, 214, 230, 0.8)";
    c.lineWidth = 0.012 + e.rnd() * 0.012;
    c.beginPath();
    c.moveTo(x - Math.cos(t) * len, y - Math.sin(t) * len);
    c.lineTo(x + Math.cos(t) * len, y + Math.sin(t) * len);
    c.stroke();
  }
});
// 2: the warmed sand — darker, damp, under where she sits
e.layer("warm", {}, c => {
  const s = c.createRadialGradient(sx, sy, 0, sx, sy, 1.5);
  s.addColorStop(0, "rgba(104, 92, 76, 0.9)");
  s.addColorStop(0.7, "rgba(120, 106, 88, 0.7)");
  s.addColorStop(1, "rgba(120, 106, 88, 0)");
  c.fillStyle = s;
  c.beginPath();
  c.arc(sx, sy, 1.5, 0, Math.PI * 2);
  c.fill();
});
// 3: the trail — white rime over a broad band from her seat down to the water, crystals along it (the shader gives it
// its ragged edges and how far it has run)
e.layer("trail", {}, c => {
  c.fillStyle = "rgba(240, 247, 252, 0.88)";
  c.fillRect(wx, sy - 0.8, sx - wx + 0.3, 1.6);
  c.strokeStyle = "rgba(255, 255, 255, 0.9)";
  c.lineWidth = 0.014;
  for (let i = 0; i < 420; i++) {
    const x = wx + (sx - wx + 0.3) * e.rnd(), y = sy + (e.rnd() - 0.5) * 1.6, t = e.rnd() * Math.PI, len = 0.05 + e.rnd() * 0.07;
    c.beginPath();
    c.moveTo(x - Math.cos(t) * len, y - Math.sin(t) * len);
    c.lineTo(x + Math.cos(t) * len, y + Math.sin(t) * len);
    c.stroke();
  }
});
