// The sounds of “Moominpappa at Sea”, made in the page (Web Audio): recordings (sounds/, CC0) and what is made here; as
// loud as the page's "sounds" slider says (MooodVolume.output). The page runs the audio: it sounds once the browser
// lets it (the first touch), and waits with the scene's music — the play paused, its scene standing —, fading out and back
// in with it.
//   unheard() → {sounds} — the same, unheard, for a step played unseen (jump.js); a step plays them as g.sound
// One AudioContext → the master level → a compressor. Two airs a sound goes out into: the open air's (1.5 s, dark) and
// the room's (the lighthouse's rooms: 0.5 s).
// The beds — what lasts; one of each for the page, as loud as `level` (0 — silence, and the bed is taken down), getting
// there over `seconds`:
//   background(levels, seconds) — the named beds to their levels, every other one to silence: the game's background as
//     the page sounds it (bespoke.onBackground — at a scene's cut with its music, or at once: the game declares it,
//     g.beds and g.scene's beds, and never times it)
//   sea — the sea on the shore · sea_in — the same heard through the lighthouse's walls (muffled) · storm — the storm
//   · wind — low wind in random gusts (ambience.js) · gale — wind in a boat's rigging · stream — the valley's brook ·
//   fire — a stove's fire · crickets — the August night's crickets · clock — the valley's wall clock · bees — the
//   bees of Mama's garden on the wall: recordings (sounds/) or made here
// Played once:
//   creak (the lighthouse's stair, its door) · door · strike (a match) · flare(level) (a wick, paraffin catching) ·
//   howl(far) (the Groke) · cup (a cup on the table) · rustle (the net) · splash(level) · wave(level) (a wave on the
//   rocks, against the glass) · glass (the gallery's glass struck) · thunder(level) · pour (tea, a measure of paraffin)
import { built, kit } from './ambience.js';

let ctx = null, master = null, rooms = null, still = null;
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
  return ctx;
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
function hiss(kind, t, seconds) {
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
  hiss(kind, t, len + 0.05).connect(filter({ type: 'bandpass', frequency: f, Q })).connect(e);
  e.gain.setValueAtTime(0, t);
  e.gain.linearRampToValueAtTime(loud, t + attack);
  e.gain.exponentialRampToValueAtTime(0.0005, t + len);
  e.connect(dest);
}
// noise through a band with an envelope of its own [[seconds, level], …] (a swoosh, a breath, a hiss)
function swell(t, dest, { kind = 'pink', f, Q = 1, type = 'bandpass', points, sweep }) {
  const a = audio(), e = a.createGain(), band = filter({ type, frequency: f, Q }), len = points.at(-1)[0];
  if (sweep) shape(band.frequency, t, sweep, f);
  hiss(kind, t, len + 0.05).connect(band).connect(e).connect(dest);
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
      noise: kind => keep(hiss(kind, a.currentTime)),
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


// what plays till stopped: `out` is its loudness (base — its own); stopping, it is closed once silent
function handle(out, base, close) {
  let stopped = false;
  return {
    loud(v, seconds = 0.3) {
      if (stopped) return;
      to(out.gain, base * v, seconds);
    },
    stop(seconds = 1) {
      if (stopped) return;
      stopped = true;
      to(out.gain, 0, seconds);
      after(Math.max(0.02, seconds) + 0.05, () => {
        close();
        out.disconnect();
      });
    },
  };
}


// ── beds ───────────────────────────────────────────────────────────────────────────────────────────────────────────

const SEA = ['sea-shore-240645.mp3', 'sea-shore-517945.mp3'];
// the sea on the shore: a recording
export function sea(level = 1, seconds = 2) { bed('sea', 0.05, 'open', recorded(SEA, 2.61), level, seconds); }
// the sea through the lighthouse's walls: the same, muffled
export function sea_in(level = 1, seconds = 2) {
  bed('sea_in', 0.3, 'room', ({ a, out, keep }) => {
    const wall = filter({ type: 'lowpass', frequency: 420, Q: 0.6 });
    wall.connect(out);
    recorded(SEA, 3.4)({ a, out: wall, keep });
  }, level, seconds);
}
// the storm: a recording
export function storm(level = 1, seconds = 2) { bed('storm', 0.05, 'open', recorded(['storm-441108.mp3'], 2.55), level, seconds); }
// low wind in random gusts (ambience.js)
export function wind(level = 1, seconds = 2) { bed('wind', 0.2, 'open', ({ a, out, keep, every }) => built.wind(kit(a, keep, every), out, 1.3), level, seconds); }
// wind in the boat's rigging: a recording
export function gale(level = 1, seconds = 2) { bed('gale', 0.05, 'open', recorded(['wind-rigging-481139.mp3'], 1.54), level, seconds); }
// the valley's brook: a recording
export function stream(level = 1, seconds = 2) { bed('stream', 0.05, 'open', recorded(['stream-197023.mp3'], 2.35), level, seconds); }
// a stove's fire: a recording
export function fire(level = 1, seconds = 2) { bed('fire', 0.05, 'open', recorded(['stove-346321.mp3'], 7.17), level, seconds); }
// the August night's crickets: each a thin chirp of three pulses at its own pitch and pace, far and near
export function crickets(level = 1, seconds = 2) {
  bed('crickets', 0.5, 'open', ({ a, t, out, every }) => {
    for (const [f, gap, loud] of [[4350, 0.62, 0.05], [4720, 0.81, 0.03], [3980, 1.07, 0.02]]) {
      every(schedule(a, t + rnd(0.1, 0.8), at => {
        for (let i = 0; i < 3; i++) ring(at + i * 0.045, out, [[f, 0.03, loud]], 0.004);
        return at + gap * rnd(0.9, 1.1);
      }));
    }
  }, level, seconds);
}
// the wall clock: “tick” and “tock” in turn, every 0.5 s — short clicks of two pitches through a 3 kHz resonance
export function clock(level = 1, seconds = 2) {
  bed('clock', 0.3, 'room', ({ a, t, out, every }) => {
    const res = filter({ type: 'peaking', frequency: 3000, Q: 4, gain: 9 });
    res.connect(out);
    let tick = true;
    every(schedule(a, t + 0.1, at => {
      burst(at, res, { f: tick ? 2600 : 2100, Q: 6, len: 0.025, loud: 0.3 });
      ring(at, res, [[tick ? 3100 : 2500, 0.05, 0.03]], 0.001);
      tick = !tick;
      return at + 0.5;
    }));
  }, level, seconds);
}
// the bees of the painted garden: a few low buzzes, each its own pitch, swelling and passing
export function bees(level = 1, seconds = 2) {
  bed('bees', 0.3, 'room', ({ a, out, keep, sway }) => {
    const band = filter({ type: 'bandpass', frequency: 520, Q: 1.2 });
    band.connect(out);
    for (const [f, rate, v] of [[196, 0.11, 0.05], [223, 0.07, 0.04], [247, 0.16, 0.03]]) {
      const o = keep(a.createOscillator()), g = a.createGain();
      o.type = 'sawtooth';
      o.frequency.value = f;
      g.gain.value = v;
      sway(o.frequency, 0.9, 6);
      sway(g.gain, rate, v * 0.9);
      o.connect(g).connect(band);
      o.start();
    }
  }, level, seconds);
}

const BEDS = { sea, sea_in, storm, wind, gale, stream, fire, crickets, clock, bees };
export const BED_NAMES = Object.keys(BEDS);
export function background(levels, seconds) {
  for (const [name, play] of Object.entries(BEDS)) play(levels[name] ?? 0, seconds);
}

// ── once ───────────────────────────────────────────────────────────────────────────────────────────────────────────

// the lighthouse's wooden stair, its door: a short rub of 0.3 s
export function creak() {
  const a = audio(), t = now(), o = a.createOscillator(), e = a.createGain();
  o.type = 'sawtooth';
  o.frequency.setValueAtTime(rnd(95, 120), t);
  o.frequency.linearRampToValueAtTime(rnd(150, 190), t + 0.3);
  for (const [f, Q] of [[600, 9], [1250, 7]]) o.connect(filter({ type: 'bandpass', frequency: f, Q })).connect(e);
  shape(e.gain, t, [[0.04, 0.22], [0.22, 0.16], [0.3, 0]]);
  e.connect(air(0.3, 'room'));
  o.start(t);
  o.stop(t + 0.35);
}
// a heavy door: its hinge, then the knock of it shut
export function door() {
  const a = audio(), t = now(), out = air(0.35, 'room'), o = a.createOscillator(), e = a.createGain();
  o.type = 'sawtooth';
  o.frequency.setValueAtTime(120, t);
  o.frequency.linearRampToValueAtTime(200, t + 0.35);
  o.frequency.linearRampToValueAtTime(150, t + 0.5);
  for (const [f, Q] of [[650, 7], [1400, 6]]) o.connect(filter({ type: 'bandpass', frequency: f, Q })).connect(e);
  shape(e.gain, t, [[0.05, 0.12], [0.4, 0.08], [0.5, 0]]);
  e.connect(out);
  o.start(t);
  o.stop(t + 0.55);
  burst(t + 0.62, out, { kind: 'brown', f: 90, Q: 0.9, len: 0.35, loud: 1.2, attack: 0.002 });
}
// a match struck: the scratch, then the little flame's breath
export function strike() {
  const t = now(), out = air(0.2, 'room');
  burst(t, out, { f: 3200, Q: 1.2, len: 0.06, loud: 0.5 });
  swell(t + 0.05, out, { kind: 'pink', f: 1800, Q: 0.8, points: [[0.08, 0.25], [0.5, 0.08], [0.9, 0]] });
}
// a wick or paraffin catching: a soft rush of flame
export function flare(level = 1) {
  swell(now(), air(0.25, 'room'), { kind: 'pink', f: 900, Q: 0.6, points: [[0.15, 0.3 * level], [0.8, 0.15 * level], [1.6, 0]], sweep: [[0.15, 1400], [1.6, 700]] });
}
// the Groke's howl: a low hollow tone rising and sinking, slowly wavering, through an “oo”; far — muffled, more of the air
export function howl({ far = false } = {}) {
  const a = audio(), t = now(), out = air(far ? 0.8 : 0.5, 'open'), e = a.createGain(), vowel = filter({ type: 'bandpass', frequency: 380, Q: 2.5 });
  const lp = filter({ type: 'lowpass', frequency: far ? 500 : 1100 });
  for (const [m, v] of [[1, 1], [2, 0.35], [3, 0.12]]) {
    const o = a.createOscillator(), g = a.createGain();
    o.type = 'triangle';
    shape(o.frequency, t, [[1.2, 118 * m], [2.6, 132 * m], [4.2, 96 * m]], 104 * m);
    g.gain.value = v;
    drift(o.frequency, 4.5, 1.5 * m).stop(t + 4.6);
    o.connect(g).connect(vowel);
    o.start(t);
    o.stop(t + 4.6);
  }
  vowel.connect(lp).connect(e).connect(out);
  shape(e.gain, t, [[0.9, far ? 0.5 : 0.9], [3.2, far ? 0.4 : 0.75], [4.5, 0]]);
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
// water: a splash
export function splash(level = 1) {
  const t = now(), out = air(0.4, 'open');
  burst(t, out, { kind: 'pink', f: 600, Q: 0.8, len: 0.35, loud: 0.8 * level, attack: 0.01 });
  swell(t + 0.08, out, { kind: 'white', f: 3500, Q: 0.7, type: 'highpass', points: [[0.15, 0.15 * level], [0.9, 0.06 * level], [1.4, 0]] });
}
// a wave breaking on the rocks or against the glass: a low surge and its spray
export function wave(level = 1) {
  const t = now(), out = air(0.5, 'open');
  swell(t, out, { kind: 'brown', f: 220, Q: 0.5, type: 'lowpass', points: [[0.6, 0.9 * level], [1.2, 0.6 * level], [2.4, 0]] });
  swell(t + 0.5, out, { kind: 'pink', f: 2600, Q: 0.6, type: 'highpass', points: [[0.3, 0.2 * level], [1.5, 0]] });
}
// the gallery's glass struck by the sea: it rings, and a crack runs
export function glass() {
  const t = now(), out = air(0.35, 'room');
  ring(t, out, [[2350, 1.2, 0.09], [3730, 0.8, 0.05], [5100, 0.45, 0.025]], 0.001);
  burst(t + 0.05, out, { f: 5200, Q: 2, len: 0.08, loud: 0.15 });
}
// thunder: a crack, then the long roll
export function thunder(level = 1) {
  const t = now(), out = air(0.8, 'open');
  burst(t, out, { kind: 'brown', f: 140, Q: 0.6, len: 0.5, loud: 1.2 * level, attack: 0.005 });
  swell(t + 0.2, out, { kind: 'brown', f: 90, Q: 0.4, type: 'lowpass', points: [[0.8, 0.8 * level], [2.5, 0.5 * level], [4.5, 0]] });
}
// tea poured, or a measure of paraffin into the lantern: a recording, once
export function pour() {
  const a = audio(), s = a.createBufferSource(), g = a.createGain();
  g.gain.value = 3;
  s.connect(g).connect(air(0.2, 'room'));
  recording('pour-627625.mp3').then(buf => { s.buffer = buf; s.start(a.currentTime, 2); s.stop(a.currentTime + 4.5); });
}

// the same, unheard: a step played unseen (jump.js) — nothing heard meanwhile: the beds are silent like what is played once
// (the background the step declared is the jump's: j.background)
export function unheard() {
  const none = () => {};
  const sounds = {};
  for (const name of [...Object.keys(BEDS), 'creak', 'door', 'strike', 'flare', 'howl', 'cup', 'rustle', 'splash', 'wave', 'glass', 'thunder', 'pour']) sounds[name] = none;
  return { sounds };
}
