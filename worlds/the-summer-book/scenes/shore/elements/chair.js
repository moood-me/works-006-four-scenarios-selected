// The chair Papa puts by the gate for his mother (`chair`): a plain wooden kitchen chair, white paint worn grey — set
// upright beside the gate, or shoved aside, askew on the stones where she pushed it; none — not there. Metres from the
// middle of its foot; 0.9 m tall. Point: `back` (the top of its back, where a hand holds it).
const st = e.state.chair ?? 'none';
if (st === 'none') return;
const shoved = st === 'shoved';
g.save();
if (shoved) {
  g.translate(0.35, 0);
  g.rotate(-0.22);
}
g.fillStyle = '#cfc9bd';
g.fillRect(-0.22, -0.48, 0.44, 0.05);
g.fillStyle = '#bdb6a9';
g.fillRect(-0.21, -0.45, 0.04, 0.45);
g.fillRect(0.17, -0.45, 0.04, 0.45);
g.fillRect(-0.15, -0.43, 0.03, 0.4);
g.fillRect(0.12, -0.43, 0.03, 0.4);
g.fillRect(-0.21, -0.2, 0.42, 0.025);
g.fillRect(-0.21, -0.95, 0.04, 0.5);
g.fillRect(0.17, -0.95, 0.04, 0.5);
g.fillRect(-0.21, -0.95, 0.42, 0.07);
g.fillRect(-0.21, -0.75, 0.42, 0.04);
e.at(0, -0.93, 'back');
g.restore();
