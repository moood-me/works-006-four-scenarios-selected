// The burner by `flame`: out; smoky (a dull smoking flame, its soot the scene's particles); blue (the paraffin burning,
// the oil not yet running); flare (the flame up a moment and dying: the lamp not lit, no beam); lit — and then the drum
// turns. The lenses as clean as `lenses`.
const S = e.state, f = S.flame ?? "out", m = e.mem;
const lit = f === "lit" || f === "flare" ? 1 : f === "smoky" ? 0.35 : 0, blue = f === "blue" ? 1 : 0;
m.spin = ((m.spin ?? 0) + e.dt * 0.45 * (f === "lit" ? 1 : 0)) % (2 * Math.PI);
e.uniform("spin", m.spin);
e.uniform("lit", lit);
e.uniform("blue", blue);
e.uniform("clean", S.lenses ?? 0);
e.glow("flame", lit);
e.glow("blue", blue);
