// The bridge seen from downstream: its face toward the viewer across the river, from the far bank (x −11.7, out of view
// on the left) to its head on our quay (x 11.25 — the abutment, then the end pillar up to 11.7). Metres, its foot on
// the river's bed: the water at y −1.5, the road at −3.5, the parapet's coping at −4.3, the end pillar's top at −4.6.
// Three stone arches springing at the water from two piers; the arches' openings cut through (what is beyond shows
// through them — the river upstream); a ring of voussoirs round each, the courses of stone, a string course at the
// road, darker wet stone down at the water
const spans = [[-10.65, -4.15], [-2.95, 3.55], [4.75, 11.25]];
const R = 4.18;
const crown = -3.05;
const stone = g.createLinearGradient(0, -4.6, 0, 0);
stone.addColorStop(0, '#a89d8c');
stone.addColorStop(0.55, '#988d7d');
stone.addColorStop(0.8, '#6d6a5e');
stone.addColorStop(1, '#4f5048');
// the body, the arches cut from it; what is painted over it stays within it
const body = new Path2D();
body.moveTo(-11.7, 0.2);
body.lineTo(-11.7, -4.3);
body.lineTo(11.2, -4.3);
body.lineTo(11.2, -4.6);
body.lineTo(11.7, -4.6);
body.lineTo(11.7, 0.2);
body.closePath();
for (const [x0, x1] of spans) {
  const cx = (x0 + x1) / 2;
  const cy = crown + R;
  const half = (x1 - x0) / 2;
  const a = Math.atan2(-Math.sqrt(R * R - half * half), -half);
  body.moveTo(x0, 0.2);
  body.lineTo(x0, cy - Math.sqrt(R * R - half * half));
  body.arc(cx, cy, R, a, Math.PI - a - 2 * Math.PI, false);
  body.lineTo(x1, 0.2);
  body.closePath();
}
g.fillStyle = stone;
g.fill(body, 'evenodd');
g.save();
g.clip(body, 'evenodd');
// courses of stone: horizontal joints, staggered vertical ones
g.fillStyle = 'rgba(58, 52, 46, 0.35)';
for (let r = 0; r < 12; r++) {
  const y = -4.3 + 0.36 * r;
  g.fillRect(-11.7, y, 23.4, 0.025);
  for (let i = 0; i < 46; i++) {
    const x = -11.7 + (i + (r % 2) * 0.5) * 0.52 + 0.1 * e.anim.hash(r * 50 + i, 1);
    g.fillRect(x, y, 0.025, 0.36);
  }
}
// the voussoirs: a lighter ring round each arch, its joints radial
for (const [x0, x1] of spans) {
  const cx = (x0 + x1) / 2;
  const cy = crown + R;
  const half = (x1 - x0) / 2;
  const a = Math.atan2(-Math.sqrt(R * R - half * half), -half);
  const b = Math.PI - a - 2 * Math.PI;
  g.strokeStyle = '#b3a895';
  g.lineWidth = 0.42;
  g.beginPath();
  g.arc(cx, cy, R + 0.21, a, b, false);
  g.stroke();
  g.strokeStyle = 'rgba(58, 52, 46, 0.5)';
  g.lineWidth = 0.025;
  for (let k = 0; k <= 22; k++) {
    const t = a + ((b - a) * k) / 22;
    g.beginPath();
    g.moveTo(cx + R * Math.cos(t), cy + R * Math.sin(t));
    g.lineTo(cx + (R + 0.42) * Math.cos(t), cy + (R + 0.42) * Math.sin(t));
    g.stroke();
  }
}
// the string course at the road
g.fillStyle = '#b8ad9b';
g.fillRect(-11.7, -3.55, 23.4, 0.14);
// wet stone at the water: a darker, greener band, and a pale tide line
g.fillStyle = 'rgba(46, 60, 52, 0.45)';
g.fillRect(-11.7, -2.0, 23.4, 2.2);
g.fillStyle = 'rgba(190, 196, 180, 0.18)';
g.fillRect(-11.7, -2.05, 23.4, 0.05);
g.restore();
// the parapet's coping and the end pillar's cap, standing a little proud
g.fillStyle = '#b8ad9b';
g.fillRect(-11.7, -4.36, 22.9, 0.12);
g.fillRect(11.12, -4.68, 0.66, 0.14);
