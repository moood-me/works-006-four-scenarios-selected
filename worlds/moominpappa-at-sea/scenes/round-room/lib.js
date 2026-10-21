// The round room at the foot of the lighthouse: a circle of whitewashed wall round the point C (across, distance),
// radius R, H high under a ceiling of beams; the walls are bent sheets (forms) of that circle, the window's column
// between two of them. An angle round the room (degrees) is measured as a bearing from C: 0 straight ahead, + to the
// right.
const C = [0, 3.8], R = 3.6, H = 3.6, DEG = Math.PI / 180;
// the window: its middle's angle, its half-width (metres along the wall), its sill and its top, how thick the wall is
const WIN = { mid: 32, half: 0.5, sill: 0.65, top: 2.1, deep: 0.6 };
// where an angle of the room is at r from C: [across, distance]
const at = (theta, r = R) => [C[0] + r * Math.sin(theta * DEG), C[1] + r * Math.cos(theta * DEG)];
// x on a wall's painting (metres along the wall from its middle) of an angle, its middle at `mid`
const wallX = (theta, mid) => R * (theta - mid) * DEG;
// the whitewash every wall shares: a pale lime white, the blue-grey dado below with its dark rule, a few damp clouds
// and hairline cracks (each wall's own e.rnd), over the painting's box [x0, x1] × [−top, −bottom] (wall heights)
function whitewash(g, e, x0, x1, bottom, top) {
  g.fillStyle = "#ece6d9";
  g.fillRect(x0, -top, x1 - x0, top - bottom);
  const dado = 0.95;
  if (bottom < dado) {
    g.fillStyle = "#93a7ad";
    g.fillRect(x0, -Math.min(dado, top), x1 - x0, Math.min(dado, top) - bottom);
    if (top > dado) {
      g.fillStyle = "#4f5f68";
      g.fillRect(x0, -dado - 0.025, x1 - x0, 0.03);
    }
  }
  const n = Math.ceil((x1 - x0) * 3);
  for (let i = 0; i < n; i++) {
    const x = x0 + e.rnd() * (x1 - x0), y = -bottom - e.rnd() * (top - bottom), r = 0.25 + e.rnd() * 0.7;
    const s = g.createRadialGradient(x, y, 0, x, y, r);
    s.addColorStop(0, e.rnd() < 0.6 ? "rgba(178, 170, 156, 0.22)" : "rgba(255, 252, 244, 0.35)");
    s.addColorStop(1, "rgba(178, 170, 156, 0)");
    g.fillStyle = s;
    g.fillRect(x - r, y - r, 2 * r, 2 * r);
  }
  g.strokeStyle = "rgba(120, 112, 104, 0.45)";
  g.lineWidth = 0.008;
  for (let i = 0; i < n / 3; i++) {
    let x = x0 + e.rnd() * (x1 - x0), y = -bottom - e.rnd() * (top - bottom);
    g.beginPath();
    g.moveTo(x, y);
    for (let k = 0; k < 4; k++) {
      x += (e.rnd() - 0.5) * 0.18;
      y += 0.06 + e.rnd() * 0.1;
      g.lineTo(x, y);
    }
    g.stroke();
  }
}
// the keeper's knot, drawn small in pencil under each of his lines: a loop, its two ends crossing through it
function knot(g, x, y, s) {
  g.beginPath();
  g.ellipse(x, y, s, s * 0.6, 0, 0, Math.PI * 2);
  g.moveTo(x - s * 1.8, y + s * 0.9);
  g.quadraticCurveTo(x - s * 0.2, y + s * 0.2, x + s * 0.4, y - s * 0.9);
  g.moveTo(x + s * 1.8, y + s * 0.9);
  g.quadraticCurveTo(x + s * 0.2, y + s * 0.2, x - s * 0.4, y - s * 0.9);
  g.stroke();
}
// a painted flower of Moominmamma's: a curving stem from (x, y) up by h, two leaves, a round head of petals
function flower(g, x, y, h, lean, petal, heart) {
  const tx = x + lean, ty = y - h;
  g.strokeStyle = "#4f7d45";
  g.lineWidth = h * 0.05;
  g.lineCap = "round";
  g.beginPath();
  g.moveTo(x, y);
  g.quadraticCurveTo(x - lean * 0.4, y - h * 0.55, tx, ty);
  g.stroke();
  g.fillStyle = "#5f9150";
  for (const [k, side] of [[0.35, -1], [0.55, 1]]) {
    const lx = x + lean * k * 0.3, ly = y - h * k;
    g.beginPath();
    g.ellipse(lx + side * h * 0.1, ly, h * 0.11, h * 0.04, side * -0.6, 0, Math.PI * 2);
    g.fill();
  }
  g.fillStyle = petal;
  const r = h * 0.11;
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    g.beginPath();
    g.ellipse(tx + Math.cos(a) * r, ty + Math.sin(a) * r, r * 0.85, r * 0.55, a, 0, Math.PI * 2);
    g.fill();
  }
  g.fillStyle = heart;
  g.beginPath();
  g.arc(tx, ty, r * 0.6, 0, Math.PI * 2);
  g.fill();
}
return { C, R, H, DEG, WIN, at, wallX, whitewash, knot, flower };
