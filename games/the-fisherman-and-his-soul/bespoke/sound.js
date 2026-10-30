// The sounds of “The Fisherman and his Soul”, made in the page (Web Audio): recordings (sounds/, CC0) and what is made
// here; as loud as the page's "sounds" slider says (MooodVolume.output). The page runs the audio: it sounds once the
// browser lets it (the first touch), and waits with the scene's music — the play paused, its scene standing —, fading
// out and back in with it. Made after «Papa and the Sea»'s sound.js (its frame: the airs, the beds, the recordings).
// The scenario (§4): sound is the game's main instrument — her song (no words, four notes for every case; a scrap of
// them — memory), the Witch's tambourine, the water by the pier, the town's music and hum, the wave at the end — low,
// with no tune. The scenes' music has no voice in it: her song is only this one, so that the player hears when it
// sounds and when it has fallen silent (the scale «Her song» is read by ear: scenario §8).
//   unheard() → {sounds} — the same, unheard, for a step played unseen (jump.js); a step plays them as g.sound
// One AudioContext → the master level → a compressor. Two airs a sound goes out into: the open air's (1.5 s, dark) and
// the room's (the white room, the potter's room: 0.5 s).
// The beds — what lasts; one of each for the page, as loud as `level` (0 — silence, and the bed is taken down), getting
// there over `seconds`:
//   background(levels, seconds) — the named beds to their levels, every other one to silence: the game's background as
//     the page sounds it (bespoke.onBackground — at a scene's cut with its music, or at once: the game declares it, g.beds
//     and g.scene's beds, and never times it)
//   sea — water lapping at the pier's posts and the boat's side · shore — the sea on the sand · storm — the sea coming in
//   the night of the wave · sea_in — the sea through the white room's walls · wind — low wind in random gusts (the
//   fir wood; the winter shore: cold) · crickets — the summer night's crickets · town — the square at night: far
//   voices, steps · market — the morning market's crowd · fire — the potter's hearth · deep — under the water: its low
//   weight, bubbles going up · claps — the feast's hands clapping the girl's dance · tambourine — the Witch's
//   tambourine, ~100 a minute (in «The Dance» the mini-game strikes it on its own beats: hush first) · song, song_far,
//   song_under — her song round and round: near (in the deep, on the stone by him), far over the water (from the
//   stone, seen from the pier), heard through the water (from under it, by the stone)
// Played once:
//   notes({count, broken, how, level}) — her four notes, once (count 3: the three that hang; broken: two and the third
//   cut off — the oath that broke; how: near | far | under) · hush(name, seconds) — a bed broken off now (her song
//   stopping in the middle): it does not come back unless declared again · again(name, seconds) — her song stopped
//   and begun again `seconds` later (М4: she laughs, and begins again) · splash(level) (her tail on the water) · dive
//   (someone going under) · wave(level) (the black wave breaking) · rope (the net's rope through the hands, a length
//   drawn in) · scrape (the knife along the boards) · thud (the knife driven into the post) · wrench (pulled out of it)
//   · bench (the Priest's bench falling) · coins (coppers on the stall, in the palm) · copper (one falling into the
//   river) · cup (the silver cup ringing against the shelf) · strike(strong) (one beat of the tambourine) · puff (the
//   lantern put out) · door({open}) (the potter's door)
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



// ── her song ───────────────────────────────────────────────────────────────────────────────────────────────────────

// Four notes in the world's key (B♭ minor, the scenes' D♭ major / B♭ minor): F, D♭, E♭ — and down to B♭. Three of them
// hang on the E♭, unresolved (the old Fisherman's «three notes»); the fourth comes home. [midi, beats]
const BEAT = 0.6; // s
const NOTES = [[77, 1], [73, 0.75], [75, 1.25], [70, 2]];
// what she sings round and round: the four notes, and the same four turned about — rising like a call, a turn on the
// way down, once a little higher
const PHRASES = [
  NOTES,
  [[70, 1], [73, 0.75], [75, 1], [77, 2]],
  [[77, 1], [73, 0.5], [75, 0.75], [73, 0.75], [70, 2]],
  NOTES,
  [[80, 1], [77, 0.75], [75, 1], [77, 0.5], [73, 2]],
];
// her voice's colour: a wordless “oo” — the first partial strong, the next few falling fast
let timbre = null;
const oo = a => (timbre ??= a.createPeriodicWave(new Float32Array(7), new Float32Array([0, 1, 0.3, 0.1, 0.045, 0.02, 0.01])));
// how far she is: near (beside him), far (over the water from the stone), under (through the water)
const AIRS = { near: { lp: 4200, wet: 0.45, level: 1 }, far: { lp: 1700, wet: 0.85, level: 0.7 }, under: { lp: 650, wet: 0.7, level: 0.85 } };
// a phrase sung in one breath from t into `out`: the pitch gliding from note to note, the vibrato coming in on the held
// ones, each note leaned into a little. `cut` — the last note broken off after that many seconds. → {end, stop(at, s)}
function voice(t, notes, { out, how = 'near', level = 0.12, cut = null }) {
  const a = audio(), place = AIRS[how], lev = level * place.level;
  const e = a.createGain(), lp = filter({ type: 'lowpass', frequency: place.lp, Q: 0.5 }), oscs = [];
  e.gain.setValueAtTime(0, t);
  e.connect(lp).connect(out);
  const vib = a.createOscillator(), depth = a.createGain();
  vib.frequency.value = 5.1;
  depth.gain.setValueAtTime(0, t);
  vib.connect(depth);
  for (const [detune, v] of [[0, 1], [7, 0.28]]) {
    const o = a.createOscillator(), g = a.createGain();
    o.setPeriodicWave(oo(a));
    o.detune.value = detune;
    g.gain.value = v;
    depth.connect(o.frequency);
    o.connect(g).connect(e);
    oscs.push(o);
  }
  let at = t, prev = null;
  notes.forEach(([m, beats], i) => {
    const f = hz(m), len = i === notes.length - 1 && cut != null ? cut : beats * BEAT;
    for (const o of oscs) {
      o.frequency.setValueAtTime(prev ?? f * 0.985, at);
      o.frequency.exponentialRampToValueAtTime(f, at + (prev == null ? 0.09 : 0.07));
    }
    depth.gain.setValueAtTime(0, at);
    depth.gain.linearRampToValueAtTime(0, at + 0.14);
    depth.gain.linearRampToValueAtTime(f * 0.0065, at + 0.55);
    if (i === 0) e.gain.linearRampToValueAtTime(lev, at + 0.16);
    else { e.gain.linearRampToValueAtTime(lev * 0.8, at + 0.03); e.gain.linearRampToValueAtTime(lev, at + 0.18); }
    prev = f;
    at += len;
  });
  const end = cut != null ? at + 0.08 : at + 0.9;
  if (cut != null) e.gain.linearRampToValueAtTime(0, at + 0.06);
  else { e.gain.linearRampToValueAtTime(lev * 0.75, at - 0.2); e.gain.setTargetAtTime(0, at - 0.2, 0.22); }
  for (const o of [...oscs, vib]) { o.start(t); o.stop(end + 0.1); }
  let over = false;
  return {
    end,
    stop(when, seconds = 0.12) {
      if (over || when >= end) return;
      over = true;
      e.gain.cancelScheduledValues(when);
      e.gain.setTargetAtTime(0, when, seconds / 3);
      for (const o of [...oscs, vib]) { try { o.stop(when + seconds + 0.1); } catch { /* stopped already */ } }
    },
  };
}
// her song round and round, as a bed: a phrase, a breath of rest, the next
const singing = {}; // bed name → {voice: the phrase sounding now, next: when the next may begin}
function sung(name, how) {
  return ({ a, t, out, keep, every }) => {
    const s = singing[name] = { voice: null, next: t + rnd(0.3, 0.9), k: 0 };
    keep({ stop() { s.voice?.stop(a.currentTime, 0.1); if (singing[name] === s) delete singing[name]; } });
    every(() => {
      const t = a.currentTime;
      if (s.next < t) s.next = t + 0.05;
      while (s.next < t + 0.4) {
        s.voice = voice(s.next, PHRASES[s.k++ % PHRASES.length], { out, how });
        s.next = s.voice.end + rnd(1.6, 3.2);
      }
    });
  };
}
export function song(level = 1, seconds = 2) { bed('song', 0.45, 'open', sung('song', 'near'), level, seconds); }
export function song_far(level = 1, seconds = 2) { bed('song_far', 0.85, 'open', sung('song_far', 'far'), level, seconds); }
export function song_under(level = 1, seconds = 2) { bed('song_under', 0.7, 'open', sung('song_under', 'under'), level, seconds); }
// her four notes, once (count 3: the three that hang, the third held; broken: the third cut short)
export function notes({ count = 4, broken = false, how = 'far', level = 0.13 } = {}) {
  const ns = NOTES.slice(0, broken ? 3 : count);
  const held = !broken && count === 3 ? [...ns.slice(0, 2), [ns[2][0], 2.5]] : ns;
  voice(now(0.05), held, { out: air(AIRS[how].wet), how, level, cut: broken ? 0.3 : null });
}
// a bed broken off now: its sound gone in `seconds`, taken down (declared again — it comes back)
export function hush(name, seconds = 0.15) {
  if (!sounding[name]) return;
  if (singing[name]) {
    singing[name].voice?.stop(audio().currentTime, seconds);
    singing[name].next = Infinity;
  }
  bed(name, 0, 'open', null, 0, seconds);
}
// her song stopped now, and begun again `seconds` later
export function again(name, seconds = 1.2) {
  const s = singing[name];
  if (!s) return;
  const t = audio().currentTime;
  s.voice?.stop(t, 0.12);
  s.next = t + seconds;
}

// ── beds ───────────────────────────────────────────────────────────────────────────────────────────────────────────

const SHORE = ['sea-shore-240645.mp3', 'sea-shore-517945.mp3'];
// water lapping at the pier's posts and the boat's side: a recording
export function sea(level = 1, seconds = 2) { bed('sea', 0.05, 'open', recorded(['sea-pier-838025.mp3'], 2.2), level, seconds); }
// the sea on the sand: a recording
export function shore(level = 1, seconds = 2) { bed('shore', 0.05, 'open', recorded(SHORE, 2.61), level, seconds); }
// the sea coming in, the night of the wave: a recording of a storm at a pier
export function storm(level = 1, seconds = 2) { bed('storm', 0.05, 'open', recorded(['storm-441108.mp3'], 2.55), level, seconds); }
// the sea through the white room's walls on the hill: the shore, muffled
export function sea_in(level = 1, seconds = 2) {
  bed('sea_in', 0.3, 'room', ({ a, out, keep }) => {
    const wall = filter({ type: 'lowpass', frequency: 420, Q: 0.6 });
    wall.connect(out);
    recorded(SHORE, 3.4)({ a, out: wall, keep });
  }, level, seconds);
}
// low wind in random gusts (ambience.js): in the firs round the well; on the winter shore, cold
export function wind(level = 1, seconds = 2) { bed('wind', 0.2, 'open', ({ a, out, keep, every }) => built.wind(kit(a, keep, every), out, 1.3), level, seconds); }
export function wind_cold(level = 1, seconds = 2) { bed('wind_cold', 0.2, 'open', ({ a, out, keep, every }) => built.wind_cold(kit(a, keep, every), out, 1.53), level, seconds); }
// the summer night's crickets: each a thin chirp of three pulses at its own pitch and pace, far and near
export function crickets(level = 1, seconds = 2) {
  bed('crickets', 0.5, 'open', ({ a, t, out, every }) => {
    for (const [f, gap, loud] of [[4350, 0.62, 0.1], [4720, 0.81, 0.06], [3980, 1.07, 0.04]]) {
      every(schedule(a, t + rnd(0.1, 0.8), at => {
        for (let i = 0; i < 3; i++) ring(at + i * 0.045, out, [[f, 0.03, loud]], 0.004);
        return at + gap * rnd(0.9, 1.1);
      }));
    }
  }, level, seconds);
}
// the square at night: far voices, steps — a recording
export function town(level = 1, seconds = 2) { bed('town', 0.05, 'open', recorded(['square-414453.mp3'], 1.5), level, seconds); }
// the morning market: a crowd talking, near — a recording
export function market(level = 1, seconds = 2) { bed('market', 0.05, 'open', recorded(['crowd-550916.mp3'], 1.2), level, seconds); }
// the potter's hearth: a recording
export function fire(level = 1, seconds = 2) { bed('fire', 0.05, 'room', recorded(['blaze-484338.mp3'], 2.6), level, seconds); }
// under the water: the sea's low weight swelling slowly, and bubbles going up now and then, a few at a time
export function deep(level = 1, seconds = 2) {
  bed('deep', 0.6, 'open', ({ a, t, out, noise, sway, every }) => {
    const body = a.createGain(), lp = filter({ type: 'lowpass', frequency: 190, Q: 0.6 });
    body.gain.value = 0.28;
    noise('brown').connect(lp).connect(filter({ type: 'lowpass', frequency: 380, Q: 0.5 })).connect(body).connect(out);
    sway(body.gain, 0.07, 0.11);
    sway(lp.frequency, 0.045, 60);
    const up = filter({ type: 'lowpass', frequency: 1800, Q: 0.5 });
    up.connect(out);
    every(schedule(a, t + rnd(0.5, 2), at => {
      for (let i = 0, n = 2 + Math.floor(rnd(0, 4)); i < n; i++) bubble(at + i * rnd(0.06, 0.16), up, rnd(380, 900), rnd(0.04, 0.08), 0.05);
      return at + rnd(1.2, 4.5);
    }));
  }, level, seconds);
}
// the feast: two pairs of hands clapping the girl's dance, a little apart, and a third, quieter
export function claps(level = 1, seconds = 2) {
  bed('claps', 0.3, 'open', ({ a, t, out, every }) => {
    for (const [f, lag, loud] of [[1500, 0, 2], [1150, 0.025, 1.5], [1900, 0.05, 0.8]]) {
      every(schedule(a, t + 0.3 + lag, at => {
        clap(at + rnd(-0.012, 0.012), out, f, loud * rnd(0.8, 1.1));
        return at + 0.42;
      }));
    }
  }, level, seconds);
}
// the Witch's tambourine: a beat 100 times a minute, the first of four the strongest
export function tambourine(level = 1, seconds = 2) {
  bed('tambourine', 0.4, 'open', ({ a, t, out, every }) => {
    let k = 0;
    every(schedule(a, t + 0.3, at => { jingles(at, out, k++ % 4 === 0); return at + 0.6; }));
  }, level, seconds);
}

const BEDS = { sea, shore, storm, sea_in, wind, wind_cold, crickets, town, market, fire, deep, claps, tambourine, song, song_far, song_under };
export const BED_NAMES = Object.keys(BEDS);
export function background(levels, seconds) {
  for (const [name, play] of Object.entries(BEDS)) play(levels[name] ?? 0, seconds);
}

// ── the pieces of sounds ───────────────────────────────────────────────────────────────────────────────────────────

// a bubble going up: a little rising whistle of water
function bubble(t, dest, f0, len, loud) {
  const a = audio(), o = a.createOscillator(), e = a.createGain();
  o.frequency.setValueAtTime(f0, t);
  o.frequency.exponentialRampToValueAtTime(f0 * 1.8, t + len);
  e.gain.setValueAtTime(0, t);
  e.gain.linearRampToValueAtTime(loud, t + 0.004);
  e.gain.exponentialRampToValueAtTime(0.0005, t + len);
  o.connect(e).connect(dest);
  o.start(t);
  o.stop(t + len + 0.02);
}
// a clap of hands: the slap of the palms and the hollow between them
function clap(t, dest, f, loud) {
  burst(t, dest, { f, Q: 1.1, len: 0.05, loud, attack: 0.001 });
  burst(t + 0.004, dest, { f: f * 2.1, Q: 1.6, len: 0.025, loud: loud * 0.5, attack: 0.001 });
}
// one beat of the tambourine: the skin struck, the jingles shaken after it
function jingles(t, dest, strong) {
  const loud = strong ? 3 : 2.1;
  burst(t, dest, { kind: 'brown', f: 260, Q: 1.2, len: 0.09, loud: 0.5 * loud, attack: 0.002 });
  for (let i = 0; i < 5; i++) {
    const at = t + 0.004 + i * rnd(0.012, 0.03), f = rnd(5200, 7400);
    ring(at, dest, [[f, 0.22, 0.035 * loud * rnd(0.6, 1)], [f * 1.41, 0.12, 0.015 * loud]], 0.001);
  }
  burst(t + 0.01, dest, { f: 8000, Q: 0.7, len: 0.16, loud: 0.12 * loud, attack: 0.004 });
}

// ── once ───────────────────────────────────────────────────────────────────────────────────────────────────────────

// her tail on the water (level 1), or something small into it (0.3)
export function splash(level = 1) {
  const t = now(), out = air(0.4, 'open');
  burst(t, out, { kind: 'pink', f: 600 + 700 * (1 - level), Q: 0.8, len: 0.15 + 0.25 * level, loud: 0.8 * level, attack: 0.01 });
  swell(t + 0.07, out, { kind: 'white', f: 3500, Q: 0.7, type: 'highpass', points: [[0.15, 0.16 * level], [0.9, 0.06 * level], [1.4, 0]] });
}
// someone going under: the water closing over, a gulp, bubbles after
export function dive() {
  const t = now(), out = air(0.45, 'open');
  burst(t, out, { kind: 'brown', f: 300, Q: 0.9, len: 0.35, loud: 0.6, attack: 0.02 });
  swell(t + 0.05, out, { kind: 'pink', f: 1400, Q: 0.7, points: [[0.12, 0.12], [0.6, 0.03], [0.9, 0]] });
  for (let i = 0; i < 6; i++) bubble(t + 0.35 + i * rnd(0.07, 0.18), out, rnd(420, 900), rnd(0.04, 0.07), 0.04);
}
// the black wave breaking: a low surge with no tune, its spray after
export function wave(level = 1) {
  const t = now(), out = air(0.5, 'open');
  swell(t, out, { kind: 'brown', f: 200, Q: 0.5, type: 'lowpass', points: [[0.9, 1.0 * level], [1.6, 0.7 * level], [3.2, 0]] });
  swell(t + 0.7, out, { kind: 'pink', f: 2400, Q: 0.6, type: 'highpass', points: [[0.3, 0.22 * level], [1.8, 0]] });
}
// the net's rope through the hands, a length drawn in: the wet rope's creak on the gunwale, water off it
export function rope() {
  const a = audio(), t = now(), o = a.createOscillator(), e = a.createGain(), out = air(0.3, 'open');
  o.type = 'sawtooth';
  o.frequency.setValueAtTime(rnd(85, 110), t);
  o.frequency.linearRampToValueAtTime(rnd(130, 160), t + 0.35);
  for (const [f, Q] of [[520, 8], [1150, 6]]) o.connect(filter({ type: 'bandpass', frequency: f, Q })).connect(e);
  shape(e.gain, t, [[0.05, 0.12], [0.28, 0.08], [0.38, 0]]);
  e.connect(out);
  o.start(t);
  o.stop(t + 0.42);
  swell(t + 0.15, out, { kind: 'white', f: 3000, Q: 0.6, points: [[0.1, 0.05], [0.5, 0.02], [0.7, 0]] });
}
// the knife drawn along the boards at his soles: a thin scrape
export function scrape() {
  swell(now(), air(0.2, 'open'), { kind: 'white', f: 4200, Q: 2.2, points: [[0.08, 0.1], [0.7, 0.07], [0.9, 0]], sweep: [[0.9, 3200]] });
}
// the knife driven into the post: a hard knock of wood, the blade's ring under it
export function thud() {
  const t = now(), out = air(0.3, 'open');
  burst(t, out, { kind: 'brown', f: 420, Q: 1.3, len: 0.12, loud: 0.9, attack: 0.001 });
  burst(t, out, { f: 2400, Q: 2, len: 0.03, loud: 0.3, attack: 0.001 });
  ring(t, out, [[3100, 0.3, 0.02], [4700, 0.18, 0.01]], 0.001);
}
// the knife pulled out of the post: the wood giving it up
export function wrench() {
  const a = audio(), t = now(), o = a.createOscillator(), e = a.createGain(), out = air(0.3, 'open');
  o.type = 'sawtooth';
  o.frequency.setValueAtTime(140, t);
  o.frequency.linearRampToValueAtTime(220, t + 0.18);
  o.connect(filter({ type: 'bandpass', frequency: 900, Q: 7 })).connect(e).connect(out);
  shape(e.gain, t, [[0.03, 0.1], [0.17, 0.06], [0.2, 0]]);
  o.start(t);
  o.stop(t + 0.25);
  burst(t + 0.2, out, { f: 2600, Q: 2.5, len: 0.03, loud: 0.25 });
}
// the Priest's bench going over: the knock of it on the floor, and the rattle of it settling
export function bench() {
  const t = now(), out = air(0.4, 'room');
  burst(t, out, { kind: 'brown', f: 160, Q: 1, len: 0.25, loud: 1.0, attack: 0.002 });
  burst(t + 0.02, out, { f: 900, Q: 1.4, len: 0.06, loud: 0.3 });
  for (const [at, loud] of [[0.16, 0.45], [0.27, 0.25], [0.34, 0.12]]) burst(t + at, out, { kind: 'brown', f: 220, Q: 1.2, len: 0.08, loud, attack: 0.002 });
}
// coppers: on the stall, in the palm
export function coins() {
  const t = now(), out = air(0.3, 'open');
  for (let i = 0; i < 4; i++) {
    const f = rnd(2600, 4200);
    ring(t + i * rnd(0.05, 0.11), out, [[f, 0.3, 0.04], [f * 1.51, 0.18, 0.022], [f * 2.27, 0.09, 0.011]], 0.001);
  }
}
// one copper off the bowl's edge into the river: its ring on the stone, then the little plop far below
export function copper() {
  const t = now(), out = air(0.4, 'open'), f = rnd(3000, 3800);
  ring(t, out, [[f, 0.35, 0.05], [f * 1.51, 0.2, 0.025]], 0.001);
  burst(t + 0.9, out, { kind: 'pink', f: 1100, Q: 1.2, len: 0.12, loud: 0.25, attack: 0.004 });
  bubble(t + 0.93, out, 700, 0.05, 0.03);
}
// the silver cup knocked against the shelf: a bright ring that goes on
export function cup() {
  const t = now(), out = air(0.35, 'room');
  burst(t, out, { kind: 'brown', f: 900, Q: 2, len: 0.03, loud: 0.35, attack: 0.001 });
  ring(t, out, [[2480, 1.6, 0.06], [3910, 1.1, 0.035], [5630, 0.7, 0.018], [7120, 0.4, 0.008]], 0.001);
}
// one beat of the Witch's tambourine (the dance's mini-game strikes it on its beats)
export function strike(strong = false) { jingles(now(0.005), air(0.4, 'open'), strong); }
// the lantern put out: a breath, and the little flame gone
export function puff() {
  swell(now(), air(0.2, 'open'), { kind: 'pink', f: 1100, Q: 0.7, points: [[0.06, 0.18], [0.3, 0.06], [0.45, 0]] });
}
// the potter's door: opened — the hinge; shut — the knock of it in its frame
export function door({ open = true } = {}) {
  const a = audio(), t = now(), out = air(0.35, 'open');
  if (!open) { burst(t, out, { kind: 'brown', f: 95, Q: 0.9, len: 0.35, loud: 1.1, attack: 0.002 }); return; }
  const o = a.createOscillator(), e = a.createGain();
  o.type = 'sawtooth';
  o.frequency.setValueAtTime(110, t);
  o.frequency.linearRampToValueAtTime(190, t + 0.45);
  for (const [f, Q] of [[650, 7], [1400, 6]]) o.connect(filter({ type: 'bandpass', frequency: f, Q })).connect(e);
  shape(e.gain, t, [[0.05, 0.1], [0.4, 0.07], [0.5, 0]]);
  e.connect(out);
  o.start(t);
  o.stop(t + 0.55);
}

// the same, unheard: a step played unseen (jump.js) — nothing heard meanwhile: the beds are silent like what is played
// once (the background the step declared is the jump's: j.background)
export const ONCE = ['notes', 'hush', 'again', 'splash', 'dive', 'wave', 'rope', 'scrape', 'thud', 'wrench', 'bench', 'coins', 'copper', 'cup',
  'strike', 'puff', 'door'];
export function unheard() {
  const none = () => {};
  return { sounds: Object.fromEntries([...BED_NAMES, ...ONCE].map(name => [name, none])) };
}
