// The wall clock on the back wall (x −0.2…0.2, 1.42…2.62 m up): a mahogany regulator — the round white dial in its
// head, its hands at twenty past six; the trunk's glass door with the long pendulum behind it (layer `pendulum`, swung
// by the clock's animate about its hook at 2.12 m); a turned finial below.
const M = e.lib.MAHOGANY;
// the head with the dial
g.fillStyle = M;
g.beginPath();
g.arc(0, -2.35, 0.2, 0, 6.3);
g.fill();
g.fillStyle = "#c9a560";
g.beginPath();
g.arc(0, -2.35, 0.165, 0, 6.3);
g.fill();
g.fillStyle = "#f3efe4";
g.beginPath();
g.arc(0, -2.35, 0.15, 0, 6.3);
g.fill();
g.fillStyle = "#2b2420";
for (let i = 0; i < 12; i++) {
  const a = (i / 12) * Math.PI * 2;
  const w = i % 3 === 0 ? 0.012 : 0.006;
  g.save();
  g.translate(Math.sin(a) * 0.125, -2.35 - Math.cos(a) * 0.125);
  g.rotate(a);
  g.fillRect(-w / 2, -0.015, w, 0.03);
  g.restore();
}
// the hands: twenty past six
const hand = (a, len, w) => {
  g.save();
  g.translate(0, -2.35);
  g.rotate(a);
  g.fillRect(-w / 2, -len, w, len + 0.015);
  g.restore();
};
hand((6 + 20 / 60) / 12 * Math.PI * 2, 0.075, 0.012);
hand((20 / 60) * Math.PI * 2, 0.115, 0.007);
g.beginPath();
g.arc(0, -2.35, 0.012, 0, 6.3);
g.fill();
// the trunk, its glass door: dark inside, a brass rim
g.fillStyle = M;
g.fillRect(-0.15, -2.16, 0.3, 0.66);
g.fillStyle = "#2a1912";
g.fillRect(-0.11, -2.12, 0.22, 0.56);
g.strokeStyle = "#c9a560";
g.lineWidth = 0.008;
g.strokeRect(-0.11, -2.12, 0.22, 0.56);
// the finial
g.fillStyle = M;
g.beginPath();
g.moveTo(-0.15, -1.5);
g.lineTo(0.15, -1.5);
g.lineTo(0.04, -1.45);
g.lineTo(0, -1.42);
g.lineTo(-0.04, -1.45);
g.closePath();
g.fill();
// the pendulum: a brass rod and its bob, hanging from the hook at the trunk's top
e.layer("pendulum", { pivot: [0, -2.11], depth: 0.005 }, (p) => {
  p.fillStyle = "#b8924a";
  p.fillRect(-0.005, -2.11, 0.01, 0.44);
  p.fillStyle = "#d4b066";
  p.beginPath();
  p.arc(0, -1.65, 0.045, 0, 6.3);
  p.fill();
  p.fillStyle = "#a07f3a";
  p.beginPath();
  p.arc(0, -1.65, 0.03, 0, 6.3);
  p.fill();
});
