// The potter's house on the quay at the bridge's head: its long limewashed front looks across the lane at the river
// (x runs toward the viewer: −3.8 is 10.1 m out, 3.8 is 2.5 m out). A low stone plinth, the eave at 2.6 m; the door
// (x −1.1) — its leaf is door_leaf's, opening into the room —, a window each side with grey-blue shutters
// open. What shows through the door and the windows — the lit room — is cottage_glow's. Metres, its foot at the origin
g.fillStyle = '#ddd3be';
g.fillRect(-3.8, -2.62, 7.6, 2.62);
g.fillStyle = '#8f8676';
g.fillRect(-3.8, -0.42, 7.6, 0.42);
g.fillStyle = 'rgba(70, 60, 50, 0.25)';
for (let i = 0; i < 19; i++) g.fillRect(-3.8 + 0.4 * i + 0.12 * e.anim.hash(i, 1), -0.42, 0.02, 0.42);
// the shade under the eave and the eave's edge
g.fillStyle = 'rgba(50, 42, 36, 0.35)';
g.fillRect(-3.8, -2.62, 7.6, 0.22);
g.fillStyle = '#4e3a30';
g.fillRect(-3.85, -2.7, 7.7, 0.1);
// the door's frame
g.fillStyle = '#5a4434';
g.fillRect(-1.65, -2.03, 1.1, 0.08);
g.fillRect(-1.65, -2.03, 0.08, 2.03);
g.fillRect(-0.63, -2.03, 0.08, 2.03);
// the windows' frames, sills and shutters
for (const x of [1.3, -2.9]) {
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
