// The sounds of “The Summer Book”, made in the page (Web Audio): recordings (sounds/, CC0) and what is made here; as
// loud as the page's "sounds" slider says (MooodVolume.output). The page may be heard only after the player's first
// touch: game.js wakes it as the map is left (a touch); till then its time stands, and what was asked for begins at the
// touch. Made after «Papa and the Sea»'s (its sound.js).
//   wake() — the page may be heard from now on (game.js: as the map is left — a touch; again, it changes nothing)
//   pause(on) — all of it stands while the play is paused (the page's ⏸: game.js b.onPause) and goes on from there after
//   unheard() → {sounds, wake()} — the same, unheard, for a step played unseen (jump.js); a step plays them as g.sound
// One AudioContext → the master level → a compressor. Two airs a sound goes out into: the open air's (1.5 s, dark) and
// the room's (the house's rooms: 0.5 s).
// The beds — what lasts; one of each for the page, as loud as `level` (0 — silence, and the bed is taken down), getting
// there over `seconds`:
//   beds(levels, seconds) — the named beds to their levels, every other one to silence (g.beds)
//   sea — the sea on the shore · sea_in — the same heard through the house's walls · storm — the storm · wind — low
//   wind in random gusts (ambience.js) · trees — the dead trees creaking · drips — the fog's drops (ambience.js) ·
//   bell — the buoy's bell far out in the fog · motor — the big boat's motor. The dead calm is none of them: silence.
// Played once:
//   creak({slow}) (the second door) · door (shut quietly) · strike (a match) · knife (a shaving off the driftwood) ·
//   cup · rustle (the net) · splash(level) · thunder(level) · knock (three knocks on the canvas) · purr(seconds) ·
//   hiss (the cat in the basket) · cough({wall}) (Papa on the veranda, through the wall; wall: false — Grandmother, near)
import { built, kit } from './ambience.js';

let ctx = null, master = null, rooms = null, still = null, awake = false, held = false;
// a room's tail: decaying noise, low-passed by `dark` (0 bright … 1 dull)
function impulse(a, seconds, curve, dark) {
  const n = Math.floor(a.sampleRate * seconds), ir = a.createBuffer(2, n, a.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = ir.getChannelData(c);
    for (let i = 0, lp = 0; i < n; i++) {
      const k = 1 - dark * (0.2 + 0.75 * i / n);
      lp += ((Math.random() * 2 - 1) - lp) * k;
      d[i] = lp * Math.pow(1 - i / n, curve);
    }
  }
  return ir;
}
function audio() {
  if (!ctx) {
    ctx = new AudioContext();
    if (!awake) ctx.suspend();
    const limit = ctx.createDynamicsCompressor();
    limit.threshold.value = -12;
    limit.ratio.value = 4;
    master = ctx.createGain();
    master.gain.value = 0.85;
    master.connect(limit).connect(MooodVolume.output(ctx)).connect(ctx.destination);
    rooms = {};
    for (const [name, seconds, curve, dark, back] of [['open', 1.5, 2.2, 0.75, 0.8], ['room', 0.5, 2, 0.4, 0.9]]) {
      const r = ctx.createConvolver(), g = ctx.createGain();
      r.buffer = impulse(ctx, seconds, curve, dark);
      g.gain.value = back;
      r.connect(g).connect(master);
      rooms[name] = r;
    }
    still = ctx.createGain();
    still.gain.value = 0;
    still.connect(master);
  }
  if (awake && !held && ctx.state === 'suspended') ctx.resume();
  return ctx;
}
export function wake() {
  // (a context the browser held back resumes at the next touch)
  if (!awake) for (const touch of ['pointerdown', 'keydown']) addEventListener(touch, audio, { once: true, capture: true });
  awake = true;
  audio();
}
export function pause(on) {
  held = !!on;
  if (!ctx || !awake) return;
  if (held) ctx.suspend();
  else ctx.resume();
}

// where a sound goes: straight out, and `wet` of it into a room's air ('open' — open, or 'room' — a small room)
const airs = {};
function air(wet, room = 'open') {
  const k = `${room}:${wet}`;
  if (airs[k]) return airs[k];
  const a = audio(), out = a.createGain(), send = a.createGain();
  send.gain.value = wet;
  out.connect(master);
  out.connect(send).connect(rooms[room]);
  return (airs[k] = out);
}
// fn once `seconds` of the sounds' own time have gone by (it stands with them)
function after(seconds, fn) {
  const a = audio(), clock = a.createConstantSource();
  clock.connect(still);
  clock.onended = fn;
  clock.start();
  clock.stop(a.currentTime + seconds);
  return clock;
}
function setup(f, { type, frequency, Q = 1, gain = 0 }) {
  f.type = type;
  f.frequency.value = frequency;
  f.Q.value = Q;
  f.gain.value = gain;
  return f;
}
const filter = how => setup(audio().createBiquadFilter(), how);
function to(param, v, seconds) {
  const t = audio().currentTime;
  param.cancelScheduledValues(t);
  param.setValueAtTime(param.value, t);
  param.linearRampToValueAtTime(v, t + Math.max(0.02, seconds));
}
function shape(param, t, points, from = 0) {
  param.setValueAtTime(from, t);
  for (const [s, v] of points) param.linearRampToValueAtTime(v, t + s);
}
const noises = {};
function noise(kind) {
  if (noises[kind]) return noises[kind];
  const a = audio(), n = a.sampleRate * 4, buf = a.createBuffer(1, n, a.sampleRate), d = buf.getChannelData(0);
  let last = 0, b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < n; i++) {
    const w = Math.random() * 2 - 1;
    if (kind === 'brown') d[i] = (last = (last + 0.02 * w) / 1.02) * 3.5;
    else if (kind === 'pink') {
      b0 = 0.99765 * b0 + w * 0.099; b1 = 0.963 * b1 + w * 0.2965; b2 = 0.57 * b2 + w * 1.0527;
      d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.2;
    } else d[i] = w;
  }
  return (noises[kind] = buf);
}
function noiseOf(kind, t, seconds) {
  const s = audio().createBufferSource();
  s.buffer = noise(kind);
  s.loop = true;
  s.start(t, Math.random() * 3);
  if (seconds) s.stop(t + seconds);
  return s;
}
function drift(param, rate, depth) {
  const a = audio(), o = a.createOscillator(), g = a.createGain();
  o.frequency.value = rate;
  g.gain.value = depth;
  o.connect(g).connect(param);
  o.start();
  return o;
}
const hz = m => 440 * 2 ** ((m - 69) / 12);
const rnd = (a, b) => a + Math.random() * (b - a);
const now = (d = 0.02) => audio().currentTime + d;

// something struck: its partials ringing down, [hz, seconds, loudness]
function ring(t, dest, partials, attack = 0.004) {
  const a = audio();
  for (const [f, d, v] of partials) {
    const o = a.createOscillator(), e = a.createGain();
    o.frequency.value = f * (1 + (Math.random() - 0.5) * 0.004);
    e.gain.setValueAtTime(0, t);
    e.gain.linearRampToValueAtTime(v, t + attack);
    e.gain.exponentialRampToValueAtTime(0.0005, t + d);
    o.connect(e).connect(dest);
    o.start(t);
    o.stop(t + d + 0.05);
  }
}
// a burst of noise through a band, dying away: a click, a thud, a slam
function burst(t, dest, { kind = 'white', f, Q = 1, len, loud, attack = Math.min(0.006, len / 4) }) {
  const a = audio(), e = a.createGain();
  noiseOf(kind, t, len + 0.05).connect(filter({ type: 'bandpass', frequency: f, Q })).connect(e);
  e.gain.setValueAtTime(0, t);
  e.gain.linearRampToValueAtTime(loud, t + attack);
  e.gain.exponentialRampToValueAtTime(0.0005, t + len);
  e.connect(dest);
}
// noise through a band with an envelope of its own [[seconds, level], …] (a swoosh, a breath, a hiss)
function swell(t, dest, { kind = 'pink', f, Q = 1, type = 'bandpass', points, sweep }) {
  const a = audio(), e = a.createGain(), band = filter({ type, frequency: f, Q }), len = points.at(-1)[0];
  if (sweep) shape(band.frequency, t, sweep, f);
  noiseOf(kind, t, len + 0.05).connect(band).connect(e).connect(dest);
  shape(e.gain, t, points);
  return e;
}
// recordings (sounds/ — CC0, from Freesound: sounds/README.md): fetched and decoded once each; a bed plays one of its own
// round and round from a random point, `gain` bringing it to as loud as the bed it took the place of
const recordings = {};
function recording(file) {
  return (recordings[file] ??= fetch(new URL(`sounds/${file}`, import.meta.url)).then(r => r.arrayBuffer()).then(b => audio().decodeAudioData(b)));
}
function recorded(files, gain) {
  return ({ a, out, keep }) => {
    const s = a.createBufferSource(), g = a.createGain();
    let on = true;
    keep({ stop() { on = false; if (s.buffer) s.stop(); } });
    g.gain.value = gain;
    s.loop = true;
    s.connect(g).connect(out);
    recording(files[Math.floor(Math.random() * files.length)]).then(buf => { if (on) { s.buffer = buf; s.start(a.currentTime, Math.random() * buf.duration); } });
  };
}

// the beds: one of each for the page, built when first heard and taken down once silent: build({a, t, out, noise,
// sway, keep, every}) → optionally tune(level, seconds)
const sounding = {};
function bed(name, wet, room, build, level, seconds) {
  let b = sounding[name];
  if (!b) {
    if (!level) return;
    const a = audio(), out = a.createGain(), stops = [];
    const keep = node => { stops.push(() => node.stop()); return node; };
    out.gain.value = 0;
    out.connect(air(wet, room));
    b = sounding[name] = { out, stops, closing: null };
    b.tune = build({
      a, out, keep, t: a.currentTime,
      noise: kind => keep(noiseOf(kind, a.currentTime)),
      sway: (param, rate, depth) => keep(drift(param, rate, depth)),
      every(fn) {
        fn();
        const timer = setInterval(fn, 200);
        stops.push(() => clearInterval(timer));
      },
    });
  }
  if (b.closing) {
    b.closing.onended = null;
    b.closing = null;
  }
  to(b.out.gain, level, seconds);
  b.tune?.(level, seconds);
  if (!level) b.closing = after(Math.max(0.02, seconds) + 0.1, () => {
    for (const stop of b.stops) stop();
    b.out.disconnect();
    delete sounding[name];
  });
}
// (what comes at its times, scheduled 0.4 s ahead of the sounds' clock: `next` → the next time)
function schedule(a, first, fn) {
  let next = first;
  return () => {
    const t = a.currentTime;
    if (next < t) next = t;
    while (next < t + 0.4) next = fn(next);
  };
}


// ── beds ───────────────────────────────────────────────────────────────────────────────────────────────────────────

const SEA = ['sea-shore-240645.mp3', 'sea-shore-517945.mp3'];
// the sea on the shore: a recording
export function sea(level = 1, seconds = 2) { bed('sea', 0.05, 'open', recorded(SEA, 2.61), level, seconds); }
// the sea through the house's walls: the same, muffled
export function sea_in(level = 1, seconds = 2) {
  bed('sea_in', 0.3, 'room', ({ a, out, keep }) => {
    const wall = filter({ type: 'lowpass', frequency: 420, Q: 0.6 });
    wall.connect(out);
    recorded(SEA, 3.4)({ a, out: wall, keep });
  }, level, seconds);
}
// the storm: a recording
export function storm(level = 1, seconds = 2) { bed('storm', 0.05, 'open', recorded(['storm-441108.mp3'], 2.55), level, seconds); }
// low wind in random gusts (ambience.js); in the dead trees of the forest it creaks (creaks: the trees' creaking now
// and then)
export function wind(level = 1, seconds = 2) { bed('wind', 0.2, 'open', ({ a, out, keep, every }) => built.wind(kit(a, keep, every), out, 1.3), level, seconds); }
// the dead trees creaking in the wind, now and then: a slow rub of wood, low
export function trees(level = 1, seconds = 2) {
  bed('trees', 0.4, 'open', ({ a, t, out, every }) => {
    every(schedule(a, t + rnd(0.5, 2), at => {
      const o = a.createOscillator(), e = a.createGain(), len = rnd(0.8, 1.8);
      o.type = 'sawtooth';
      shape(o.frequency, at, [[len * 0.5, rnd(70, 95)], [len, rnd(55, 75)]], rnd(55, 70));
      o.connect(filter({ type: 'bandpass', frequency: rnd(380, 520), Q: 6 })).connect(e).connect(out);
      shape(e.gain, at, [[0.25, 0.14], [len * 0.7, 0.1], [len, 0]]);
      o.start(at);
      o.stop(at + len + 0.05);
      return at + rnd(3, 8);
    }));
  }, level, seconds);
}
// the fog: drops off the rock and the canvas (ambience.js)
export function drips(level = 1, seconds = 2) { bed('drips', 0.3, 'open', ({ a, out, keep, every }) => built.drips(kit(a, keep, every), out, 1.6), level, seconds); }
// the buoy's bell far out in the fog: a slow, uneven toll, muffled by the distance
export function bell(level = 1, seconds = 2) {
  bed('bell', 0.85, 'open', ({ a, t, out, every }) => {
    const far = filter({ type: 'lowpass', frequency: 1400, Q: 0.5 });
    far.connect(out);
    every(schedule(a, t + rnd(1, 4), at => {
      ring(at, far, [[392, 3.5, 0.05], [784 * 1.01, 2.2, 0.025], [1176, 1.2, 0.012], [523, 2.8, 0.015]], 0.004);
      return at + rnd(5, 11);
    }));
  }, level, seconds);
}
// the big boat's motor: a low, steady chug with its own small unevenness
export function motor(level = 1, seconds = 2) {
  bed('motor', 0.1, 'open', ({ a, out, keep, sway }) => {
    const o = keep(a.createOscillator()), chug = keep(a.createOscillator()), g = a.createGain(), depth = a.createGain();
    o.type = 'sawtooth';
    o.frequency.value = 46;
    chug.frequency.value = 7.5;
    depth.gain.value = 0.35;
    g.gain.value = 0.5;
    chug.connect(depth).connect(g.gain);
    sway(o.frequency, 0.3, 1.5);
    o.connect(filter({ type: 'lowpass', frequency: 260, Q: 0.8 })).connect(g).connect(out);
    o.start();
    chug.start();
  }, level, seconds);
}

const BEDS = { sea, sea_in, storm, wind, trees, drips, bell, motor };
export const BED_NAMES = Object.keys(BEDS);
export function beds(levels = {}, seconds = 2) {
  for (const [name, play] of Object.entries(BEDS)) play(levels[name] ?? 0, seconds);
}

// ── once ───────────────────────────────────────────────────────────────────────────────────────────────────────────

// the second door, the creaking one: a long rub of 0.6 s (slowly opened — longer and quieter)
export function creak({ slow = false } = {}) {
  const a = audio(), t = now(), o = a.createOscillator(), e = a.createGain(), len = slow ? 1.2 : 0.6;
  o.type = 'sawtooth';
  o.frequency.setValueAtTime(rnd(95, 120), t);
  o.frequency.linearRampToValueAtTime(rnd(150, 190), t + len);
  for (const [f, Q] of [[600, 9], [1250, 7]]) o.connect(filter({ type: 'bandpass', frequency: f, Q })).connect(e);
  shape(e.gain, t, [[0.06, slow ? 0.1 : 0.22], [len * 0.75, slow ? 0.07 : 0.16], [len, 0]]);
  e.connect(air(0.3, 'room'));
  o.start(t);
  o.stop(t + len + 0.05);
}
// a door shut quietly: the latch's click and the soft knock of the wood
export function door() {
  const t = now(), out = air(0.35, 'room');
  burst(t, out, { f: 2800, Q: 3, len: 0.03, loud: 0.25 });
  burst(t + 0.05, out, { kind: 'brown', f: 110, Q: 0.9, len: 0.25, loud: 0.6, attack: 0.002 });
}
// a match struck: the scratch, then the little flame's breath
export function strike() {
  const t = now(), out = air(0.2, 'open');
  burst(t, out, { f: 3200, Q: 1.2, len: 0.06, loud: 0.5 });
  swell(t + 0.05, out, { kind: 'pink', f: 1800, Q: 0.8, points: [[0.08, 0.25], [0.5, 0.08], [0.9, 0]] });
}
// the knife shaving the driftwood: a short dry rasp, a curl of wood
export function knife() {
  const t = now(), out = air(0.1, 'open');
  swell(t, out, { kind: 'white', f: 2600, Q: 1.4, points: [[0.04, 0.18], [0.3, 0.12], [0.45, 0]], sweep: [[0.45, 1900]] });
}
// a cup set down on the table (or knocked against it)
export function cup() {
  const t = now(), out = air(0.25, 'room');
  burst(t, out, { kind: 'brown', f: 320, Q: 1.4, len: 0.06, loud: 0.5, attack: 0.002 });
  ring(t, out, [[1880, 0.18, 0.05], [3120, 0.12, 0.03], [4460, 0.07, 0.015]], 0.001);
}
// the net drawn through the hands: a dry rustle
export function rustle() {
  swell(now(), air(0.15, 'open'), { kind: 'white', f: 3200, Q: 0.6, points: [[0.1, 0.1], [0.5, 0.06], [0.8, 0]] });
}
// water: a splash (level: a child sitting down in it — 1; a pebble — 0.25)
export function splash(level = 1) {
  const t = now(), out = air(0.4, 'open');
  burst(t, out, { kind: 'pink', f: 600 + 900 * (1 - level), Q: 0.8, len: 0.15 + 0.2 * level, loud: 0.8 * level, attack: 0.01 });
  swell(t + 0.08, out, { kind: 'white', f: 3500, Q: 0.7, type: 'highpass', points: [[0.15, 0.15 * level], [0.9, 0.06 * level], [1.4, 0]] });
}
// thunder: a crack, then the long roll
export function thunder(level = 1) {
  const t = now(), out = air(0.8, 'open');
  burst(t, out, { kind: 'brown', f: 140, Q: 0.6, len: 0.5, loud: 1.2 * level, attack: 0.005 });
  swell(t + 0.2, out, { kind: 'brown', f: 90, Q: 0.4, type: 'lowpass', points: [[0.8, 0.8 * level], [2.5, 0.5 * level], [4.5, 0]] });
}
// three knocks on the tent's wet canvas: dull, soft (the motif of the night of the fog)
export function knock() {
  const t = now(), out = air(0.3, 'open');
  for (let i = 0; i < 3; i++) burst(t + i * 0.55, out, { kind: 'brown', f: 180, Q: 1.2, len: 0.12, loud: 0.7, attack: 0.003 });
}
// the cat purring: a low rattle, breathing in and out
export function purr(seconds = 4) {
  const a = audio(), t = now(), o = a.createOscillator(), am = a.createOscillator(), depth = a.createGain(), e = a.createGain();
  o.type = 'sawtooth';
  o.frequency.value = 27;
  am.frequency.value = 0.45;
  depth.gain.value = 0.06;
  am.connect(depth).connect(e.gain);
  o.connect(filter({ type: 'lowpass', frequency: 300, Q: 0.7 })).connect(e).connect(air(0.15, 'room'));
  shape(e.gain, t, [[0.6, 0.12], [seconds - 0.6, 0.1], [seconds, 0]]);
  for (const x of [o, am]) { x.start(t); x.stop(t + seconds + 0.05); }
}
// the cat shut in the basket: a hiss, and his claws on the wicker
export function hiss() {
  const t = now(), out = air(0.2, 'open');
  swell(t, out, { kind: 'white', f: 4200, Q: 0.9, type: 'highpass', points: [[0.05, 0.22], [0.7, 0.15], [0.9, 0]] });
  for (let i = 0; i < 6; i++) burst(t + 1 + i * rnd(0.08, 0.16), out, { f: rnd(2500, 3800), Q: 3, len: 0.04, loud: 0.2 });
}

// a cough: two dry barks — Papa's on the veranda beyond the wall (muffled), or Grandmother's near (wall: false)
export function cough({ wall = true } = {}) {
  const t = now(), out = filter({ type: 'lowpass', frequency: wall ? 900 : 2600, Q: 0.6 });
  out.connect(air(wall ? 0.4 : 0.2, 'room'));
  for (const [at, loud] of [[0, 0.5], [0.32, 0.35]]) burst(t + at, out, { kind: 'pink', f: wall ? 420 : 560, Q: 1.1, len: 0.18, loud, attack: 0.01 });
}

// the same, unheard: a step played unseen (jump.js) — the beds as it leaves them are heard once it is seen
export function unheard() {
  const levels = {}, none = () => {};
  const bedOf = name => (level = 1) => { levels[name] = level; };
  return {
    sounds: {
      wake: none,
      beds(set = {}) { for (const name in BEDS) levels[name] = set[name] ?? 0; },
      ...Object.fromEntries(Object.keys(BEDS).map(name => [name, bedOf(name)])),
      creak: none, door: none, strike: none, knife: none, cup: none, rustle: none, splash: none, thunder: none, knock: none,
      purr: none, hiss: none, cough: none,
    },
    wake() { for (const [name, level] of Object.entries(levels)) BEDS[name](level, 1); },
  };
}
