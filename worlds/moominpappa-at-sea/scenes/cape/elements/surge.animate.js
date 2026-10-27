// The waves come in every few seconds, never in step: the sheet rises toward the stone, lingers under him, ebbs.
const s = e.state.storm ?? 0, wash = e.layer("wash");
const phase = (e.t * 0.16 + 0.3 * e.anim.noise(e.t * 0.05, 7)) % 1, k = Math.sin(Math.PI * Math.min(1, phase * 1.6)) ** 2;
wash.alpha = Math.max(0, s - 0.3) / 0.7 * k;
wash.y = (1 - k) * 0.5;
