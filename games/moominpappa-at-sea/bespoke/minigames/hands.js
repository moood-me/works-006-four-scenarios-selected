// What the minigames (the other files here; all.js — their table of contents) wait for and send, on the language of
// mini-games (bespoke.minigame — a vocabulary: marks, gestures that report, responses; what happens is each minigame's
// own code). A wait settles with nothing once the mini-game is left (skipped, the step left).
//   until(mg, fn) → true once fn({t, dt}) is truthy on a frame of the mini-game; false if it ends first
//   count(mg, s) → true once s seconds of the play's time have gone by; false if it ends first
//   keys(g) → send(key, value) — a key of the scene set when it differs by more than 0.01 from what the scene has now,
//     reaching 0 or 1 always
//   teach(b, mg, gestures) — the ghost shows the gestures as soon as their marks are in the frame — every time, so that
//     what the hands do is plain from the first second — and again whenever the player stands still (3 s, then every
//     6); gone with the gestures
//   settle(signal, fn) → over() — fn if the minigame is cut short (skipped, the step left): the scene left as a
//     minigame played through leaves it (an insert closed, a key at its end); over() — it is played through (called
//     just before mg.end): fn no more
//   pace(tau) → {at(u, dt) → how fast u goes now, a second (smoothed over tau s: a frame's jump is no jerk), reset()}
//   letGo(g, b, mg, {at, take, sign, wait, held}) — “hold, then let go” (scenario §7): a groove at `at`, held till it
//     is full (`take` s: the paw has taken hold; let go sooner — it ebbs, and the paw takes hold again; held(u) each
//     frame of it, early() — let go after it had begun to fill); then the call to let go: the sign (sign(): what the
//     scene shows — the other pulls, the rope slides — and the plate's new line, the ghost cannot show it under a
//     finger that is down), and the groove's arc of time running down `wait` s (5 — the scenario's): the finger lifted — let go; the arc run out — it goes by itself,
//     “held long”. Never touched for ALONE s — the same as held long (the scenario's way out by time).
//     → 'let' | 'long' | null (the mini-game ended first)
export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const until = (mg, fn) => new Promise(ok => {
  const offs = [mg.on('frame', e => { if (fn(e)) { offs.forEach(f => f()); ok(true); } }), mg.on('end', () => { offs.forEach(f => f()); ok(false); })];
});
export const count = (mg, s) => { const t0 = mg.t; return until(mg, ({ t }) => t - t0 >= s); };
export function keys(g) {
  return (key, value) => {
    const was = g.get(key);
    if (typeof was === 'number' && Math.abs(value - was) <= 0.01 && !((value === 0 || value === 1) && value !== was)) return;
    g.set(key, value);
  };
}
export const teach = (b, mg, gestures) => b.minigame.tricks.teach(mg, gestures, { still: [3, 6] });
export function pace(tau = 0.25) {
  let v = 0, was = null;
  return {
    at(u, dt) {
      if (was !== null && dt > 0) v += ((u - was) / dt - v) * Math.min(1, dt / tau);
      was = u;
      return v;
    },
    reset() { v = 0; was = null; },
  };
}
export function settle(signal, fn) {
  let done = false;
  signal.addEventListener('abort', () => { if (!done) fn(); }, { once: true });
  return () => { done = true; };
}

const ALONE = 12;
export async function letGo(g, b, mg, { at, take = 1.2, sign = () => {}, wait = 5, held = () => {}, early = () => {} }) {
  const mark = mg.mark({ at, kind: 'groove' });
  const hold = mg.hold({ on: mark, seconds: take, drain: 0.6 });
  const taught = teach(b, mg, [hold]);
  const ebb = hold.on('up', () => { if (hold.state.fill > 0.15 && hold.state.fill < 1) early(); });
  let touched = false;
  const touch = mg.on('down', () => { touched = true; });
  const t00 = mg.t;
  const took = await until(mg, ({ t }) => {
    const s = hold.state;
    held(s.fill);
    mg.plate.set({ fill: 0.5 * s.fill, glow: s.held ? 'good' : 'idle' });
    return (s.fill >= 1 && s.held) || (!touched && t - t00 >= ALONE);
  });
  ebb();
  touch();
  taught.remove();
  if (!took) return null;
  if (!hold.state.held) { mark.remove(); return 'long'; }
  sign();
  mark.set({ time: 1 });
  const t0 = mg.t;
  let how = null;
  const ok = await until(mg, ({ t }) => {
    const left = clamp(1 - (t - t0) / wait);
    mark.set({ time: left });
    mg.plate.set({ fill: 0.5 + 0.5 * (1 - left), glow: 'good' });
    if (!hold.state.held) how = 'let';
    else if (left <= 0) how = 'long';
    return how;
  });
  if (!ok) return null;
  mg.snap({ at: mark });
  mark.remove();
  return how;
}
