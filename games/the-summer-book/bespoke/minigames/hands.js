// What the minigames (the other files here; all.js — their table of contents) wait for and send, on the language of
// mini-games (bespoke.minigame — a vocabulary: marks, gestures that report, responses; what happens is each minigame's
// own code). «Папа и море»'s hands.js, with what this game adds: the hold that ends by its count (keep), the balance
// (lead) and the hands-off sign over and over (handsOff). A wait settles with nothing once the mini-game is left
// (skipped, the step left).
//   until(mg, fn) → true once fn({t, dt}) is truthy on a frame of the mini-game; false if it ends first
//   count(mg, s) → true once s seconds of the play's time have gone by; false if it ends first
//   keys(g) → send(key, value) — a key of the scene set when it differs by more than 0.01 from what the scene has now,
//     reaching 0 or 1 always
//   teach(b, mg, gestures) — the ghost shows the gestures as soon as their marks are in the frame — every time, so that
//     what the hands do is plain from the first second — and again whenever the player stands still (2 s, then every
//     4); gone with the gestures
//   settle(signal, fn) → over() — fn if the minigame is cut short (skipped, the step left): the scene left as a
//     minigame played through leaves it (an insert closed, a key at its end); over() — it is played through (called
//     just before mg.end): fn no more
//   pace(tau) → {at(u, dt) → how fast u goes now, a second (smoothed over tau s), reset()}
//   handsOff(mg) → {remove()} — the language's sign of doing nothing (the ghost's hands off), from the first second and
//     over and over (GAP s between), shown anew at once as a finger lifts
//   letGo(g, b, mg, {at, take, sign, wait, held, early}) — “hold, then let go” (scenario §7): a groove at `at`, held
//     till it is full (`take` s: the hand has taken hold; let go sooner — it ebbs, and the hand takes hold again;
//     held(u) each frame of it, early() — let go after it had begun to fill); then the call to let go: the sign
//     (sign(): what the scene shows — the other pulls, the thing slides — and the plate's new line; the ghost cannot
//     show it under a finger that is down), and the groove's arc of time running down `wait` s (5 — the scenario's):
//     the finger lifted — let go; the arc run out — it goes by itself, “held long”. Not taken hold of (full) in ALONE s, the finger
//     up — the same as held long (the scenario's way out by time). → 'let' | 'long' | null (the mini-game ended first)
//   keep(g, b, mg, {at, seconds, take, frame, slip}) — “hold” that ends by its count (scenario §7: “hold and balance
//     end by their count; dropped — it colours”): a groove at `at`; the count (`seconds`) begins as the groove is first
//     pressed (never pressed for ALONE s — over, as if held); frame({fill, taken, held, t, dt, on}) each frame (fill —
//     the hold's, `take` s to full; taken — it has been full once, or slipped: till then the thing stays as it was, the
//     touch never takes it away; on — pressed yet); let go after it had nearly filled — slip() (a mistake: the fill
//     ebbs, the ghost shows the holding again; hold again and it fills again). The bar — the time held. → {slips} | null
//   slowly(g, b, mg, {at, pulls, frame, jerk}) — “pull slowly” (scenario §7: carefully, making up one's mind): a dashed
//     ring at `at`; each slow pull (a tear of TEAR of the frame's height) draws a length out (frame(u) — how far all of
//     it has come, 0…1, moving with the finger, kept when it lets go). Too fast (faster than FAST a second) — it jerks
//     (a mistake; jerk(n): what it does in the scene), that length falls back by BACK and that pull is spent: let go,
//     and draw again. All `pulls` out — done. The way out by time (scenario §7): never touched for ALONE s — done; not
//     done LIMIT s after the first touch — the rest comes by itself (SELF s). → {jerks, self: it came by itself} | null
//   balance(g, b, mg, {at, seconds, keep, width, push, frame, slip}) — “balance” (lead anywhere, steered: the arrow is
//     what tilts — a lantern, a cup, a horizon, a body — and `push(t)` what tilts it, from the first touch on): a
//     quiet ring on the thing (`at`), its arc of danger how far the arrow is off; frame({arrow, in, held, t, dt, on}) each
//     frame (on — touched yet); the arrow at OFF or beyond — slip() once (a mistake), and the arrow brought back to the middle (she has
//     caught herself). Kept counts only while the finger leads and the arrow is in the zone. Ends when it has been kept
//     `keep` s (keep null — by the count `seconds` alone), or at `seconds` from the first touch (never touched for ALONE
//     s — over too). The bar — the time kept (bar(u) — where it stands on the plate, for a balance that is one step of
//     several); kept well (GOOD of it) — the snap on the thing. → {slips, kept: the share kept, alone: never touched,
//     as: how it ends — neutral (never touched), flawed (slipped or kept too little), clean} | null
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
export const teach = (b, mg, gestures) => b.minigame.tricks.teach(mg, gestures, { still: [2, 4] });
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

const GAP = 0.6; // s between the hands-off signs
export function handsOff(mg) {
  let sign = null, next = mg.t, gone = false;
  const again = () => {
    if (gone) return;
    sign?.remove();
    sign = mg.show({ handsOff: true });
    const it = sign;
    next = Infinity;
    it.finished.then(() => { if (sign === it) next = mg.t + GAP; });
  };
  const offs = [mg.on('up', again), mg.on('frame', ({ t }) => { if (t >= next) again(); })];
  return { remove() { gone = true; offs.forEach(f => f()); sign?.remove(); } };
}

const ALONE = 12;
export async function letGo(g, b, mg, { at, take = 1.2, sign = () => {}, wait = 5, held = () => {}, early = () => {} }) {
  const mark = mg.mark({ at, kind: 'groove' });
  const hold = mg.hold({ on: mark, seconds: take, drain: 0.6 });
  const taught = teach(b, mg, [hold]);
  const ebb = hold.on('up', () => { if (hold.state.fill > 0.15 && hold.state.fill < 1) early(); });
  const t00 = mg.t;
  const took = await until(mg, ({ t }) => {
    const s = hold.state;
    held(s.fill);
    mg.plate.set({ fill: 0.5 * s.fill, glow: s.held ? 'good' : 'idle' });
    // (the way out by time: not taken hold of in ALONE s — touched or not — it goes by itself, as held long)
    return (s.fill >= 1 && s.held) || (!s.held && t - t00 >= ALONE);
  });
  ebb();
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

export async function keep(g, b, mg, { at, seconds, take = 1, frame = () => {}, slip = () => {} }) {
  const mark = mg.mark({ at, kind: 'groove' });
  const hold = mg.hold({ on: mark, seconds: take, drain: 1.2 });
  const taught = teach(b, mg, [hold]);
  // begun: the mark first pressed; taken: the hold once full, or let go after it had nearly filled (a slip) — till
  // then the thing stays as it is; kept: the time held
  let begun = null, slips = 0, taken = false, kept = 0;
  const t00 = mg.t;
  const offs = [
    hold.on('down', () => { begun ??= mg.t; }),
    hold.on('up', () => {
      if (hold.state.fill < 1) mg.show({ gestures: [hold] });
      if (hold.state.fill < 0.6) return;
      taken = true;
      slips++;
      g.failed();
      mg.error('early', { at: mark, chip: true });
      slip(slips);
    }),
  ];
  const done = await until(mg, ({ t, dt }) => {
    const s = hold.state, now = begun == null ? 0 : t - begun;
    if (s.fill >= 1) taken = true;
    if (s.held) kept += dt;
    frame({ fill: s.fill, taken, held: s.held, t: now, dt, on: begun != null });
    mg.plate.set({ fill: clamp(kept / seconds), glow: s.held ? 'good' : begun == null ? 'idle' : 'bad' });
    return (begun != null && now >= seconds) || (begun == null && t - t00 >= ALONE);
  });
  offs.forEach(f => f());
  taught.remove();
  if (!done) return null;
  mg.snap({ at: mark });
  mark.remove();
  return { slips };
}

const TEAR = 0.1, FAST = 6, BACK = 0.12, LIMIT = 15, SELF = 1.5;
export async function slowly(g, b, mg, { at, pulls = 3, frame = () => {}, jerk = () => {} }) {
  mg.plate.set({ notches: Array.from({ length: pulls - 1 }, (_, i) => (i + 1) / pulls) });
  const end = mg.mark({ at, kind: 'dash' });
  const pull = mg.pull({ on: end, tear: TEAR });
  teach(b, mg, [pull]);
  // drawn: the lengths out, whole (with what jerked back); this pull's own: spent (torn, or jerked)
  let drawn = 0, spent = false, jerks = 0;
  const speed = pace();
  pull.on('tear', () => { if (!spent) { drawn += 1 / pulls; spent = true; } });
  pull.on('up', () => { spent = false; speed.reset(); });
  // (the way out by time: never touched for ALONE s — done; not done LIMIT s after the first touch — the rest comes by
  // itself, over SELF s)
  let begun = null, self = null;
  const touch = mg.on('down', () => { begun ??= mg.t; });
  const t00 = mg.t;
  const done = await until(mg, ({ t, dt }) => {
    if (begun == null && t - t00 >= ALONE) return true;
    if (self == null && begun != null && t - begun >= LIMIT) { self = t; end.remove(); }
    if (self != null) {
      const u = clamp(drawn + (1 - drawn) * (t - self) / SELF);
      frame(u);
      mg.plate.set({ fill: u, glow: 'idle' });
      return u >= 1;
    }
    const s = pull.state;
    if (s.held && !spent && speed.at(s.u, dt) > FAST) {
      spent = true;
      jerks++;
      drawn = Math.max(0, drawn - BACK);
      g.failed();
      mg.error('jerk', { at: end });
      jerk(jerks);
    }
    const u = clamp(drawn + (s.held && !spent ? Math.min(s.u, 0.99) / pulls : 0));
    frame(u);
    mg.plate.set({ fill: u, glow: spent && s.held ? 'bad' : s.held ? 'good' : 'idle' });
    return drawn >= 1 - 1e-6;
  });
  touch();
  if (!done) return null;
  frame(1);
  if (self == null) {
    mg.snap({ at: end });
    end.remove();
  }
  return { jerks, self: self != null };
}

const OFF = 0.9, GOOD = 0.6; // (a balance played well: kept in the zone, the finger on it, this share of the time)
export async function balance(g, b, mg, { at, seconds, keep: need = null, width = 0.45, push = () => 0, frame = () => {}, slip = () => {}, bar = u => u }) {
  const lead = mg.lead({ zone: { at: 0, width }, steer: 'rate', release: 'stay', push: 0 });
  const mark = mg.mark({ at, kind: 'ring', quiet: true, danger: 0 });
  const taught = teach(b, mg, [lead]);
  let begun = null, kept = 0, slips = 0, caught = 0;
  const touch = mg.on('down', () => { begun ??= mg.t; });
  const t00 = mg.t;
  const done = await until(mg, ({ t, dt }) => {
    const now = begun == null ? 0 : t - begun, s = lead.state;
    if (Math.abs(s.arrow) >= OFF && t >= caught) {
      slips++;
      caught = t + 1.2;
      g.failed();
      mg.error('off', { at: mark, chip: true });
      slip(slips);
    }
    // (caught herself: the arrow pushed back to the middle for a moment)
    lead.set({ push: begun == null ? 0 : t < caught ? -Math.sign(s.arrow) * 1.6 * Math.min(1, Math.abs(s.arrow) * 4) : push(now) });
    if (s.held && s.in) kept += dt;
    mark.set({ danger: clamp(Math.abs(s.arrow) / OFF) });
    frame({ arrow: s.arrow, in: s.in, held: s.held, t: now, dt, on: begun != null });
    mg.plate.set({ fill: bar(clamp(kept / (need ?? seconds))), glow: !s.held ? 'idle' : s.in ? 'good' : 'bad' });
    return (need != null && kept >= need) || (begun != null && now >= seconds) || (begun == null && t - t00 >= ALONE);
  });
  touch();
  taught.remove();
  if (!done) return null;
  const share = begun == null ? 0 : clamp(kept / Math.max(1e-6, need ?? seconds));
  if (share >= GOOD) mg.snap({ at: mark });
  mark.remove();
  lead.remove();
  return { slips, kept: share, alone: begun == null, as: begun == null ? 'neutral' : slips || share < GOOD ? 'flawed' : 'clean' };
}
// a tilt that comes and goes, side to side: strength at its height
export const wobble = (t, strength, seed = 0) => strength * (0.65 * Math.sin(1.1 * t + seed) + 0.35 * Math.sin(2.7 * t + 2 * seed));
