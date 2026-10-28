// each throw (`rings` counted up): the three rings spread from where it fell and die away, one after another
const m = e.mem;
const n = e.state.rings ?? 0;
m.n ??= n;
if (n !== m.n) {
  m.n = n;
  m.at = e.t;
}
const age = m.at == null ? 99 : e.t - m.at;
['r1', 'r2', 'r3'].forEach((name, i) => {
  const u = (age - i * 0.45) / 4;
  const l = e.layer(name);
  l.scale = 0.05 + 1.9 * Math.max(0, Math.min(1, u));
  l.alpha = u > 0 && u < 1 ? (1 - u) * (1 - u) : 0;
});
