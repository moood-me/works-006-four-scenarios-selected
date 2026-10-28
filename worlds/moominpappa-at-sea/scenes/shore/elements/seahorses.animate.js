// each bobs on the swell out of step; going (seahorses_away 0 → 1), they swim off to the left out of sight, their glow fading
const away = e.state.seahorses_away;
for (let i = 0; i < 3; i++) {
  const l = e.layer(`h${i}`), u = Math.min(1, Math.max(0, away * 1.25 - i * 0.12));
  l.y = 0.05 * Math.sin(e.t * 1.3 + i * 2.1);
  l.x = -6 * u;
  l.rotate = 0.06 * Math.sin(e.t * 0.9 + i * 1.7);
  l.alpha = 1 - u;
  e.glow(`glow${i}`, (1 - u) * (0.8 + 0.2 * Math.sin(e.t * 2 + i)));
}
