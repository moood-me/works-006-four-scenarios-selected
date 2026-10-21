// The potter's house on the quay at the bridge's head: its long limewashed front looks across the lane at the river
// (x runs toward the viewer: −2.7 is 8.7 m out, 2.7 is 3.3 m out). A low stone plinth, the eave at 2.6 m; the door in
// the middle stands open (its leaf back against the wall on the near side), a window each side with grey-blue shutters
// open. What shows through the door and the windows — the lit room — is cottage_glow's. Metres, its foot at the origin
g.fillStyle = '#ddd3be';
g.fillRect(-2.7, -2.62, 5.4, 2.62);
g.fillStyle = '#8f8676';
g.fillRect(-2.7, -0.42, 5.4, 0.42);
g.fillStyle = 'rgba(70, 60, 50, 0.25)';
for (let i = 0; i < 14; i++) g.fillRect(-2.7 + 0.39 * i + 0.12 * e.anim.hash(i, 1), -0.42, 0.02, 0.42);
// the shade under the eave and the eave's edge
g.fillStyle = 'rgba(50, 42, 36, 0.35)';
g.fillRect(-2.7, -2.62, 5.4, 0.22);
g.fillStyle = '#4e3a30';
g.fillRect(-2.75, -2.7, 5.5, 0.1);
// the door's frame and its open leaf against the wall
g.fillStyle = '#5a4434';
g.fillRect(-0.55, -2.03, 1.1, 0.08);
g.fillRect(-0.55, -2.03, 0.08, 2.03);
g.fillRect(0.47, -2.03, 0.08, 2.03);
g.fillStyle = '#6b513d';
g.fillRect(0.6, -1.95, 0.85, 1.93);
g.fillStyle = 'rgba(40, 30, 24, 0.5)';
for (const x of [0.81, 1.02, 1.23]) g.fillRect(x, -1.95, 0.02, 1.93);
g.fillRect(0.6, -1.6, 0.85, 0.05);
g.fillRect(0.6, -0.45, 0.85, 0.05);
// the windows' frames, sills and shutters
for (const x of [1.85, -1.9]) {
  g.fillStyle = '#5a4434';
  g.fillRect(x - 0.42, -1.78, 0.84, 0.06);
  g.fillRect(x - 0.42, -1.78, 0.06, 0.9);
  g.fillRect(x + 0.36, -1.78, 0.06, 0.9);
  g.fillStyle = '#9c917f';
  g.fillRect(x - 0.48, -0.9, 0.96, 0.07);
  g.fillStyle = '#62707e';
  if (x > 0) {
    g.fillRect(x + 0.45, -1.76, 0.36, 0.86);
  } else {
    g.fillRect(x - 0.81, -1.76, 0.36, 0.86);
    g.fillRect(x + 0.45, -1.76, 0.36, 0.86);
  }
}
