// none while she is not in the water (on the sand, gone)
const inWater = e.state.mermaid_here !== false && e.state.mermaid_at !== 'sand';
// each ring widens from her and fades, a third of the way behind the one before; slowly
for (let k = 0; k < 3; k++) {
  const u = (e.t / 4.5 + k / 3) % 1;
  const ring = e.layer(`ring${k}`);
  ring.scale = 0.45 + 0.55 * u;
  ring.alpha = inWater ? Math.sin(Math.PI * u) * (1 - u) : 0;
}
