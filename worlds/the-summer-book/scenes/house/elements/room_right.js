// The room's right wall (facing into the room: its x runs back toward the veranda, u = −z, −3.85…−0.05) with the
// second door, the creaking one, to the entry and the porch (the opening z 1.55…2.4 — u −2.4…−1.55 —, 2.0 m high,
// its white casing; the leaf is `door2`). Metres from the frame's z 0 at the floor.
g.fillStyle = '#ddd6c6';
g.fillRect(-3.85, -2.62, 3.8, 2.64);
g.fillStyle = 'rgba(130,146,160,0.35)';
for (let row = 0; row < 11; row++) {
  const y = -2.5 + row * 0.22;
  for (let x = -3.8 + (row % 2) * 0.11; x < -0.05; x += 0.22) {
    g.beginPath();
    g.ellipse(x, y, 0.012, 0.022, 0.4, 0, 6.2832);
    g.fill();
  }
}
g.fillStyle = '#bcb5a6';
g.fillRect(-3.85, -0.12, 3.8, 0.14);
g.fillStyle = '#e8e3d8';
g.fillRect(-3.85, -2.62, 3.8, 0.06);
// the casing, then the opening
g.fillStyle = '#efede7';
g.fillRect(-2.5, -2.1, 1.05, 2.12);
g.globalCompositeOperation = 'destination-out';
g.fillRect(-2.4, -2.0, 0.85, 2.03);
g.globalCompositeOperation = 'source-over';
