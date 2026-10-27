// The lantern room at the top of the lighthouse: a ten-sided room round the lamp at C (across, distance), its corners
// R from C, seen from its open side (the four sides nearest the viewer are not built). Its landward sides are solid —
// boarded, whitewashed; the one nearest the burner black with soot over the keeper's pencil —, its seaward sides glazed
// over a parapet, the gallery outside them with its rail, the sea far below. An angle round the room (degrees) is a
// bearing from C: 0 straight ahead, + to the right. tools/lantern_room.py writes scene.json from the same numbers.
const C = [0, 4.0], R = 2.8, H = 2.6, PARAPET = 1.0, DEG = Math.PI / 180;
const SIDE = 36, RS = R * Math.cos((SIDE / 2) * DEG), WS = 2 * R * Math.sin((SIDE / 2) * DEG);
// where an angle of the room is at r from C: [across, distance]
const at = (theta, r = R) => [C[0] + r * Math.sin(theta * DEG), C[1] + r * Math.cos(theta * DEG)];
// the gallery outside the glass: its floor out to GR, its rail's corners at RAIL
const GR = 3.6, RAIL = 3.55, RAIL_S = RAIL * Math.cos((SIDE / 2) * DEG), RAIL_W = 2 * RAIL * Math.sin((SIDE / 2) * DEG);
// the lamp: its pedestal, the lens drum (its radius, foot and top) with the burner's flame inside, its cap
const LENS = { r: 0.38, foot: 0.9, top: 1.95, flame: 1.4 };
// the hatch in the floor, where the stair comes up: its centre, its half-size; the stair under it goes down to the
// left (people on it stand lower the further left: the relief's pit)
const HATCH = { a: -1.6, d: 4.6, half: 0.35 };
// the land (the relief; the island's painters read it — SEA, land, shore): the floor up here (0) and round the tower
// as far as the viewer stands, the sea sixteen metres below and nothing else in sight
const SEA = -16;
function land(a, d) {
  const x = a - C[0], z = d - C[1];
  if (Math.abs(a - HATCH.a) < HATCH.half && Math.abs(d - HATCH.d) < HATCH.half) {
    return -0.25 - 0.4 * Math.max(0, Math.min(1, (HATCH.a + HATCH.half - a) / (2 * HATCH.half)));
  }
  if (x * x + z * z < 23) return 0;
  return SEA - 3;
}
const shore = () => {};
// a flame's strength by `lantern_flame` (its light and the globe's glow)
const FLAME = { full: 1, low: 0.45, out: 0 };
// the whitewashed boards of the solid sides and the parapet: over the box [x0, x1] × [−top, −bottom]
function boards(g, e, x0, x1, bottom, top) {
  g.save();
  g.beginPath();
  g.rect(x0, -top, x1 - x0, top - bottom);
  g.clip();
  g.fillStyle = "#e9e5dc";
  g.fillRect(x0, -top, x1 - x0, top - bottom);
  g.fillStyle = "rgba(120, 112, 100, 0.3)";
  for (let x = x0 + 0.14; x < x1; x += 0.14) g.fillRect(x, -top, 0.006, top - bottom);
  for (let i = 0; i < (x1 - x0) * 4; i++) {
    const px = x0 + e.rnd() * (x1 - x0), py = -bottom - e.rnd() * (top - bottom), r = 0.15 + e.rnd() * 0.4;
    const s = g.createRadialGradient(px, py, 0, px, py, r);
    s.addColorStop(0, e.rnd() < 0.6 ? "rgba(178, 170, 156, 0.18)" : "rgba(255, 252, 244, 0.3)");
    s.addColorStop(1, "rgba(178, 170, 156, 0)");
    g.fillStyle = s;
    g.fillRect(px - r, py - r, 2 * r, 2 * r);
  }
  g.restore();
}
// a pencil line of the keeper's, `size` metres tall, from (x, y) its baseline; wrapped to `width` metres a line,
// `lead` apart → the lines it took
function writeWrapped(g, text, x, y, size, width, lead, color) {
  g.save();
  g.translate(x, y);
  g.scale(0.01, 0.01);
  g.fillStyle = color;
  g.font = `italic ${Math.round(size * 100)}px Georgia, serif`;
  const words = text.split(" "), rows = [];
  let row = "";
  for (const w of words) {
    const next = row ? `${row} ${w}` : w;
    if (g.measureText(next).width * 0.01 > width && row) {
      rows.push(row);
      row = w;
    } else row = next;
  }
  if (row) rows.push(row);
  rows.forEach((r, i) => g.fillText(r, 0, (i * lead) / 0.01));
  g.restore();
  return rows.length;
}
// The storm lantern as the round room has it (the same lantern carried up): its tin font, the guard's wires, the cap
// and handle; its globe and flame a layer the element's shader lights from within (lantern.wgsl)
function stormLantern(g, e, flame) {
  g.fillStyle = "#6f6a5e";
  g.beginPath();
  g.ellipse(0, -0.03, 0.11, 0.03, 0, 0, Math.PI * 2);
  g.fill();
  g.fillRect(-0.11, -0.1, 0.22, 0.07);
  g.fillStyle = "#8a8474";
  g.fillRect(-0.09, -0.12, 0.18, 0.03);
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
      c.fillStyle = "rgba(150, 142, 128, 0.75)";
      c.fill(globe);
      c.fillStyle = "rgba(40, 36, 32, 0.4)";
      c.fillRect(-0.06, -0.3, 0.12, 0.05);
    }
  });
}
return { C, R, H, PARAPET, DEG, SIDE, RS, WS, at, GR, RAIL, RAIL_S, RAIL_W, LENS, HATCH, SEA, land, shore, FLAME, boards,
  writeWrapped, stormLantern };
