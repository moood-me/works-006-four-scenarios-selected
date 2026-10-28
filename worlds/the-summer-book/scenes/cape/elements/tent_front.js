// The tent's front: a small A-tent of pale canvas, 1.6 m wide, 1.15 m to the ridge (metres from the middle of its foot).
// Painted while the tent stands (`tent`), its door by `flap` (changes between steps, or once in a piece): `open` — the
// opening cut out (the tent's inside — tent_back, the floor, the lantern — seen through it), the flaps thrown back and
// tied at either side (the layer `open`, stirring in the wind); `shut` — the two flaps laced over it, the front whole.
// The canvas is thin (translucent): the candle inside makes it glow, and whoever sits between the candle and the shut
// door is a sharp shadow on it (an opaque painting facing a way: the scene's light `candle` named in their shadow).
e.at(0, -0.45, 'door');
if (!e.lib.tentShown(e.state, 'up')) return;
g.fillStyle = '#e6dfcf';
g.beginPath();
g.moveTo(-0.8, 0.02);
g.lineTo(0, -1.15);
g.lineTo(0.8, 0.02);
g.closePath();
g.fill();
// seams from the ridge
g.strokeStyle = 'rgba(150,140,120,0.5)';
g.lineWidth = 0.012;
g.beginPath();
g.moveTo(0, -1.15);
g.lineTo(-0.5, 0.02);
g.moveTo(0, -1.15);
g.lineTo(0.5, 0.02);
g.stroke();
const open = (e.state.flap ?? 'open') === 'open';
// the opening
if (open) {
  g.globalCompositeOperation = 'destination-out';
  g.beginPath();
  g.moveTo(-0.34, 0.03);
  g.lineTo(0, -0.9);
  g.lineTo(0.34, 0.03);
  g.closePath();
  g.fill();
  g.globalCompositeOperation = 'source-over';
}
// the front pole's top and the guy rope's knot at the ridge
g.fillStyle = '#8b7558';
g.fillRect(-0.015, -1.17, 0.03, 0.06);
g.fillStyle = '#7a6a55';
g.beginPath();
g.arc(0, -1.15, 0.025, 0, 6.2832);
g.fill();
// the flaps tied back: folded canvas at either side of the opening, a darker underside, the ties
if (open) e.layer('open', { pivot: [0, -0.9], wind: { strength: 0.06, gust: 0.7 } }, c => {
  for (const s of [-1, 1]) {
    c.fillStyle = '#d6cdb9';
    c.beginPath();
    c.moveTo(s * 0.34, 0.02);
    c.lineTo(s * 0.12, -0.62);
    c.lineTo(s * 0.52, 0.02);
    c.closePath();
    c.fill();
    c.fillStyle = '#c3b9a4';
    c.beginPath();
    c.moveTo(s * 0.34, 0.02);
    c.lineTo(s * 0.2, -0.4);
    c.lineTo(s * 0.4, 0.02);
    c.closePath();
    c.fill();
    c.strokeStyle = '#8a7a62';
    c.lineWidth = 0.015;
    c.beginPath();
    c.moveTo(s * 0.22, -0.4);
    c.lineTo(s * 0.36, -0.42);
    c.stroke();
  }
});
// the flaps laced shut over the opening, meeting down its middle, the lacing
if (!open) {
  g.fillStyle = '#e1d9c7';
  g.beginPath();
  g.moveTo(-0.36, 0.03);
  g.lineTo(0, -0.92);
  g.lineTo(0.36, 0.03);
  g.closePath();
  g.fill();
  g.strokeStyle = 'rgba(140,128,108,0.7)';
  g.lineWidth = 0.012;
  g.beginPath();
  g.moveTo(0, -0.9);
  g.lineTo(0, 0.02);
  g.stroke();
  g.strokeStyle = '#8a7a62';
  g.lineWidth = 0.01;
  for (let y = -0.7; y < 0; y += 0.14) {
    g.beginPath();
    g.moveTo(-0.03, y);
    g.lineTo(0.03, y + 0.05);
    g.moveTo(0.03, y);
    g.lineTo(-0.03, y + 0.05);
    g.stroke();
  }
}
