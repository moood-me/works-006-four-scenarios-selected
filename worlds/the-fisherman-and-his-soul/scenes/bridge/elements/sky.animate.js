// the hours over the night by the state (hours.md): the shader's uniforms; the moon's glow going as the night goes, the
// low moon's coming with the dusk
const s = e.state;
const c = e.anim.clamp;
const dusk = c(s.dusk ?? 0, 0, 1);
const dawn = c(s.dawn ?? 0, 0, 1);
const day = c(s.day ?? 0, 0, 1);
e.uniform('dusk', dusk);
e.uniform('dawn', dawn);
e.uniform('day', day);
e.glow('glow', (1 - dusk) * (1 - dawn) * (1 - day));
