// Beds made in the page (after «Papa and the Sea»'s, the ones the owner liked, 2026-10-16,
// docs/history/2026-10-16-game-sounds.md): the wind, and the fog's drops off the rock and the canvas. Not noise through
// a filter swelling by a sine: noise only where the thing is noise (wind) — low, steep above, moved by slow random
// curves; the drops are drops. sound.js's bed() builds them: built[name](kit(a, keep, every), out) — `a` its
// AudioContext, keep and every its own (a node stopped with the bed; fn now and five times a second while it sounds).
const rnd = (a, b) => a + Math.random() * (b - a);
const made = new WeakMap(); // AudioContext → its buffers (noise, textures)
const kept = (a, key, make) => { const m = made.get(a) || made.set(a, new Map()).get(a); if (!m.has(key)) m.set(key, make()); return m.get(key); };

const fl = (a, type, frequency, Q = 0.7) => { const f = a.createBiquadFilter(); f.type = type; f.frequency.value = frequency; f.Q.value = Q; return f; };
const gain = (a, v) => { const g = a.createGain(); g.gain.value = v; return g; };

// noise, ten seconds of it, each ear its own; brown made to meet itself at the loop
const noiseBuf = (a, kind) => kept(a, `noise:${kind}`, () => {
  const n = a.sampleRate * 10, b = a.createBuffer(2, n, a.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = b.getChannelData(c);
    let last = 0, b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < n; i++) {
      const w = Math.random() * 2 - 1;
      if (kind === 'brown') d[i] = (last = (last + 0.02 * w) / 1.02) * 3.5;
      else { b0 = 0.99765 * b0 + w * 0.099; b1 = 0.963 * b1 + w * 0.2965; b2 = 0.57 * b2 + w * 1.0527; d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.2; }
    }
    const gap = d[n - 1] - d[0];
    for (let i = 0; i < n; i++) d[i] -= gap * i / (n - 1);
  }
  return b;
});
// a slow random curve −1…1 (cosine between random points, `rate` of them a second), 48 s round
function slowBuf(a, rate) {
  const sr = 8000, secs = 48, n = sr * secs, b = a.createBuffer(1, n, sr), d = b.getChannelData(0);
  const pts = Math.max(4, Math.round(secs * rate)), v = Array.from({ length: pts }, () => Math.random() * 2 - 1);
  for (let i = 0; i < n; i++) {
    const x = i / n * pts, k = Math.floor(x), s = (1 - Math.cos(Math.PI * (x - k))) / 2, p = v[k % pts], q = v[(k + 1) % pts];
    d[i] = p + (q - p) * s;
  }
  return b;
}
// textures: many small events written once into a stereo loop (an event past the end goes on from its start)
function texture(a, key, secs, fill) {
  return kept(a, key, () => {
    const sr = a.sampleRate, n = Math.floor(secs * sr), b = a.createBuffer(2, n, sr), L = b.getChannelData(0), R = b.getChannelData(1);
    fill((t0, pan, len, sample) => {
      const i0 = Math.floor(t0 * sr), m = Math.floor(len * sr), gl = Math.cos((pan + 1) * Math.PI / 4), gr = Math.sin((pan + 1) * Math.PI / 4);
      for (let i = 0; i < m; i++) { const v = sample(i / sr), j = (i0 + i) % n; L[j] += v * gl; R[j] += v * gr; }
    }, secs);
    let peak = 0;
    for (let i = 0; i < n; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
    const k = peak ? 0.9 / peak : 1;
    for (let i = 0; i < n; i++) { L[i] *= k; R[i] *= k; }
    return b;
  });
}
const bub = (f0, dur, amp, rise) => t => amp * Math.min(1, t / 0.0008) * Math.exp(-t / (dur / 4)) * Math.sin(2 * Math.PI * (f0 * t + f0 * (rise - 1) * t * t / (2 * dur)));
const tex = {
  drips: a => texture(a, 'drips', 30, (put, s) => {
    for (let t = 0; t < s; t += rnd(0.6, 3.5)) { const d = rnd(0.03, 0.07); put(t, rnd(-0.7, 0.7), d, bub(rnd(1100, 2600), d, rnd(0.3, 1), rnd(1.4, 2.2))); }
  }),
};

// what a bed is built with: its sources looped from a random point, slow curves driving its params, things now and then
export function kit(a, keep, every) {
  const B = {
    a, keep, every,
    src(buf, rate = 1) { const s = a.createBufferSource(); s.buffer = buf; s.loop = true; s.playbackRate.value = rate; s.start(a.currentTime, Math.random() * buf.duration); return keep(s); },
    noise: kind => B.src(noiseBuf(a, kind)),
    slow: rate => B.src(slowBuf(a, rate)),
    drive(src, param, depth) { const g = gain(a, depth); src.connect(g).connect(param); return g; },
    events(first, gap, fn) {
      let next = a.currentTime + first;
      every(() => { const now = a.currentTime; while (next < now + 0.5) { const t = Math.max(next, now + 0.02); fn(t); next = t + gap(); } });
    },
  };
  return B;
}

// ── one-shot pieces ─────────────────────────────────────────────────────────
function bubble(a, t, dest, f0, dur, amp, rise = 1.5) {
  const o = a.createOscillator(), e = a.createGain();
  o.frequency.setValueAtTime(f0, t);
  o.frequency.exponentialRampToValueAtTime(f0 * rise, t + dur);
  e.gain.setValueAtTime(0, t);
  e.gain.linearRampToValueAtTime(amp, t + 0.002);
  e.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(e).connect(dest);
  o.start(t);
  o.stop(t + dur + 0.02);
}
// ── layers ──────────────────────────────────────────────────────────────────
// wind: low noise, steep above, swelling and darkening with one slow random gust; howls — narrow tones riding it
function wind(B, dest, { lp = 500, lpDepth = 280, level = 0.4, gustRate = 0.07, gustDepth = 0.45, howls = [] }) {
  const a = B.a, gust = B.slow(gustRate), flutter = B.slow(gustRate * 6);
  const amp = gain(a, level), lp1 = fl(a, 'lowpass', lp, 0.5), lp2 = fl(a, 'lowpass', lp * 2, 0.5);
  B.noise('pink').connect(fl(a, 'highpass', 70, 0.5)).connect(lp1).connect(lp2).connect(amp).connect(dest);
  B.drive(gust, lp1.frequency, lpDepth);
  B.drive(gust, amp.gain, level * gustDepth);
  B.drive(flutter, amp.gain, level * gustDepth * 0.2);
  for (const [f, depth, Q, lv] of howls) {
    const b1 = fl(a, 'bandpass', f, Q), b2 = fl(a, 'bandpass', f, Q), ha = gain(a, lv * 0.6);
    B.noise('pink').connect(b1).connect(b2).connect(ha).connect(dest);
    B.drive(gust, b1.frequency, depth);
    B.drive(gust, b2.frequency, depth);
    B.drive(gust, ha.gain, lv * 0.55);
  }
}
// ── the beds: built[name](B, out, k); k — the game's trim, bringing it to as loud as the bed it took the place of ──
const trimmed = (B, out, k) => { const g = gain(B.a, k); g.connect(out); return g; };
export const built = {
  wind: (B, out, k = 1) => wind(B, trimmed(B, out, k), { lp: 450, lpDepth: 250, level: 0.42, howls: [[380, 160, 12, 0.06]] }),
  // the fog: drops off the rock and the canvas, slow, and now and then a small one into a pool
  drips: (B, out, k = 1) => {
    const a = B.a, o = trimmed(B, out, k);
    B.src(tex.drips(a)).connect(gain(a, 0.45)).connect(o);
    B.events(0.5, () => rnd(0.4, 1.6), t => bubble(a, t, o, rnd(600, 1400), rnd(0.015, 0.03), 0.012, 1.5));
  },
};
