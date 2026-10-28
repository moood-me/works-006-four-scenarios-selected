// The sea that came in at the door and down the chimney, lying on the floor (`wet`), seen from above (x across, y
// toward the viewer; its centre the room's middle): a long tongue of water from the door, a pool by the stove, puddles
// between the boards. Dry, nothing (a mirror shows only where it is painted).
if (e.state.wet) {
  const L = e.lib, C = L.C, [da, dd] = L.at(L.DOOR.mid, L.R - 0.5), [sa, sd] = L.at(68, 2.7);
  const pool = (px, py, rx, ry, rot) => {
    g.beginPath();
    g.ellipse(px, py, rx, ry, rot, 0, Math.PI * 2);
    g.fill();
  };
  g.fillStyle = "rgba(128, 146, 164, 0.5)";
  pool(da - C[0], C[1] - dd, 0.75, 0.42, 0.6);
  pool(da - C[0] - 0.7, C[1] - dd + 0.6, 0.5, 0.25, 0.3);
  pool(sa - C[0], C[1] - sd, 0.45, 0.3, 0);
  pool(-0.3, 0.2, 0.6, 0.22, 0.1);
  for (let i = 0; i < 14; i++) pool(-2 + e.rnd() * 4, -2 + e.rnd() * 4, 0.05 + e.rnd() * 0.12, 0.03 + e.rnd() * 0.06, e.rnd() * 3);
}
