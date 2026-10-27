// The Moomins' house: a tall round tower of blue boards, white-framed windows on three floors, a little white
// balcony over the door, a red cone of a roof in scalloped tiles with a thin spire, a grey stone plinth. A form (a
// revolve of lib.HOUSE.profile); its painting is the house unrolled — the way round across (the front, the door, in
// the middle), its profile down from the spire's tip; a height on the house is the row lib.HOUSE.at(h). Lit by the
// scene like any form: the painting carries colour, not light.
const H = e.lib.HOUSE, W = H.round, X0 = -W / 2, row = h => -H.len + H.at(h);
// the roof: tiles in scalloped rows, red going rust, the eaves' underside dark
const r0 = row(10.3), r1 = row(6.75), r2 = row(6.6);
g.fillStyle = '#3d3a3a';
g.fillRect(X0, r0, W, row(9.5) - r0);
g.fillStyle = '#b5523a';
g.fillRect(X0, row(9.5), W, r1 - row(9.5));
for (let y = row(9.5) + 0.12; y < r1; y += 0.26) {
  const k = (y - row(9.5)) / (r1 - row(9.5));
  g.fillStyle = `rgba(${Math.round(120 + 40 * k)}, ${Math.round(48 + 14 * k)}, 34, 0.55)`;
  for (let x = X0 + ((y * 7) % 0.3); x < -X0; x += 0.3) {
    g.beginPath();
    g.arc(x, y, 0.15, 0, Math.PI);
    g.fill();
  }
}
g.fillStyle = '#6a3a2c';
g.fillRect(X0, r1, W, r2 - r1);
// the wall: blue boards, their joints
const w0 = r2, w1 = row(0.22);
g.fillStyle = '#5b8fc9';
g.fillRect(X0, w0, W, w1 - w0);
g.fillStyle = 'rgba(34, 70, 120, 0.35)';
for (let x = X0; x < -X0; x += 0.19) g.fillRect(x, w0, 0.018, w1 - w0);
g.fillStyle = 'rgba(200, 222, 246, 0.18)';
for (let i = 0; i < 40; i++) g.fillRect(X0 + W * e.rnd(), w0 + (w1 - w0) * e.rnd(), 0.17, 0.4 + 1.6 * e.rnd());
// a white cornice under the eaves, a white band at each floor
g.fillStyle = '#f2efe6';
g.fillRect(X0, w0, W, 0.14);
g.fillRect(X0, row(2.75), W, 0.08);
g.fillRect(X0, row(5.0), W, 0.07);
// the plinth
g.fillStyle = '#8f8a82';
g.fillRect(X0, w1, W, -w1);
// windows: white frames, a cross of bars, the glass grey-blue
const win = (x, h0, h1, wd) => {
  const y0 = row(h1), y1 = row(h0);
  g.fillStyle = '#f4f1e8';
  g.fillRect(x - wd / 2 - 0.09, y0 - 0.09, wd + 0.18, y1 - y0 + 0.18);
  g.fillStyle = '#5f7286';
  g.fillRect(x - wd / 2, y0, wd, y1 - y0);
  g.fillStyle = 'rgba(210, 226, 238, 0.35)';
  g.fillRect(x - wd / 2, y0, wd * 0.45, (y1 - y0) * 0.5);
  g.fillStyle = '#f4f1e8';
  g.fillRect(x - 0.035, y0, 0.07, y1 - y0);
  g.fillRect(x - wd / 2, (y0 + y1) / 2 - 0.035, wd, 0.07);
};
for (const x of [-2.4, 2.4, -4.8, 4.8, -7.4, 7.4]) win(x, 0.95, 1.95, 0.62);
for (const x of [0, -2.6, 2.6, -5.2, 5.2, -7.8, 7.8]) win(x, 3.15, 4.15, 0.62);
// the attic's round windows
for (const x of [0, -3.6, 3.6, -7.2, 7.2]) {
  const y = row(5.75);
  g.fillStyle = '#f4f1e8';
  g.beginPath();
  g.arc(x, y, 0.36, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = '#5f7286';
  g.beginPath();
  g.arc(x, y, 0.27, 0, Math.PI * 2);
  g.fill();
}
// the door in the front: green-brown boards in a white frame, a little window in it, its knob
const d0 = row(2.3), d1 = row(0.22);
g.fillStyle = '#f4f1e8';
g.fillRect(-0.62, d0 - 0.1, 1.24, d1 - d0 + 0.1);
g.fillStyle = '#6b5a3c';
g.fillRect(-0.52, d0, 1.04, d1 - d0);
g.fillStyle = 'rgba(40, 30, 20, 0.35)';
for (const x of [-0.26, 0, 0.26]) g.fillRect(x - 0.01, d0, 0.02, d1 - d0);
g.fillStyle = '#5f7286';
g.beginPath();
g.arc(0, d0 + 0.42, 0.18, 0, Math.PI * 2);
g.fill();
g.fillStyle = '#c9a24a';
g.beginPath();
g.arc(0.36, row(1.1), 0.05, 0, Math.PI * 2);
g.fill();
// the little balcony over the door: white balusters and rail
const b0 = row(3.0), b1 = row(2.45);
g.fillStyle = '#f4f1e8';
g.fillRect(-1.5, b0, 3.0, 0.07);
g.fillRect(-1.5, b1 - 0.07, 3.0, 0.07);
for (let x = -1.45; x <= 1.46; x += 0.16) g.fillRect(x - 0.025, b0, 0.05, b1 - b0);
e.form(e.kit.revolve(H.profile), { closed: 'u', ground: '#5b8fc9' });
