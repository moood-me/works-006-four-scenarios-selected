// The old tin tea box on the floor by Sophia's bed (`teabox`: where she keeps the cat's birds): faded red, a pale
// pattern, its lid on. Metres from the middle of its front at the floor; nothing when it is not there.
if (e.state.teabox) {
  g.fillStyle = '#a5544a';
  g.fillRect(-0.09, -0.11, 0.18, 0.11);
  g.fillStyle = '#8f4840';
  g.fillRect(-0.095, -0.13, 0.19, 0.03);
  g.fillStyle = 'rgba(232,214,170,0.75)';
  for (const x of [-0.05, 0, 0.05]) {
    g.beginPath();
    g.arc(x, -0.055, 0.016, 0, 6.2832);
    g.fill();
  }
}
