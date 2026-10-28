// The stones — one factory for three mini-games (plan.md: `stones` and `fog` one factory):
//   М7в «The Stones» (3.3 «moss», the forest at night, after the piece `night_path`: Grandmother at the first stone with
//     the lantern, Sophia beside her, the stones ahead) — the lantern swings (`lantern_sway`); a slip: Sophia catches
//     her skirt (`grab`).
//   М10а «The Stones in the Fog» (Ш3 «go», the cape in the lit fog, after the piece `fog_way`: Grandmother at the first
//     stone, the lantern before her) — a slip: the lantern goes out and lights again (`lantern_dip`). With her strength
//     at 1 or less the walk ends at the second stone (the piece `sit_half` follows: she sits down halfway).
//   М10а «The Stones in the Fog», without the lantern (Ш3 «behind», after `fog_way` without it) — a slip: she sits down
//     on the stone and waits, then goes on (`rest`); with her strength at 1 or less she sits down at the second stone
//     to get her breath (`rest`, long enough to sit down and breathe), whatever the hands do, and goes on.
// Balance — lead anywhere, one track for the whole way, the arrow the lantern (or her body, in the dark) tilting on
// the wet stones; a quiet ring on the next stone (`path#stone<n>`), its arc of danger how far it tilts. Kept steady
// KEEP s (the finger leading, the arrow in the zone) — she steps on to it (the snap on the stone) (`step` n: the scene walks her there at her pace and tells `step:stone<n>`; meanwhile
// the scene's turn — the marks hidden); tilted too far — a slip (a mistake: the scene shows it, she catches herself).
// She starts at the first stone (`step` 1). Each stone ends by its count all the same (STONE s from the first touch —
// the scenario's way out by time; then flawed), and never touched for ALONE s she goes on by herself. At the last stone — the end
// (clean; flawed if she slipped); the piece after it goes on from there.
//   What she does: Grandmother goes down the wet stones at night — to the other side of the island with the child, or
//     to the tent in the fog.
//   What she wants: to get there — with the child (a night outing), to the child (she is alone in the fog).
//   How it is for her: the stones slippery, the legs old, the light small; going all the same.
//   What the player feels: keeping the light steady, stone by stone.
//   → { slips }
import { clamp, until, keys, teachLead, settle, wobble } from './hands.js';

const KEEP = 3, STONE = 10, ALONE = 12, OFF = 0.9, PUSH = 0.6;
// s the rest is held (`rest` true; the scene walks her to the low stone by hers and sits her — it tells no moment —,
// then false: she rises slowly and is back): after a slip in the dark; to get her breath at the second stone
const REST = 7.5, BREATH = 7.5;
const WALK = 8000; // ms: the longest a step to a stone is waited for

// path({title, phrase, about, slip: 'sway' | 'dip' | 'rest', short, breath, body}) → a minigame; short(state) — the walk
// ends at the second stone; breath(state) — she sits down at the second stone to get her breath; body — the scene shows
// the arrow on her (`balance` −1 left … 1 right: her arm out to that side, the cape's)
export function path({ title, phrase, about, slip, short = () => false, breath = () => false, body = false }) {
  const keyed = [...{ sway: ['lantern_sway', 'grab'], dip: ['lantern_dip'], rest: ['rest'] }[slip], ...(body ? ['balance'] : [])];
  return {
    title, about,
    skipped: { slips: 0 },
    points: ['path#stone2', 'path#stone3'],
    keys: ['step', ...keyed],
    async run(g, b, opts, signal) {
      const mg = g.minigame({ phrase });
      const send = keys(g);
      const last = short(g.state) ? 2 : 3, rests = breath(g.state);
      const over = settle(signal, () => {
        g.set('step', last);
        if (slip === 'sway') { g.set('lantern_sway', 0, 0.6); g.set('grab', false); }
        if (slip === 'dip') g.set('lantern_dip', 0, 0.6);
        if (slip === 'rest') g.set('rest', false);
        if (body) g.set('balance', 0, 0.6);
      });
      g.set('step', 1);
      if (slip === 'sway') { g.set('lantern_sway', 0); g.set('grab', false); }
      if (slip === 'dip') g.set('lantern_dip', 0);
      if (slip === 'rest') g.set('rest', false);
      mg.plate.set({ notches: last > 2 ? [0.5] : [] });
      const lead = mg.lead({ zone: { at: 0, width: 0.45 }, steer: 'rate', release: 'stay', push: 0 });
      // (the ghost shows the leading only while there is something to lead: not while the scene walks or she sits)
      let taught = teachLead(mg, lead);
      const quiet = () => { taught?.remove(); taught = null; };
      // phase: 'steady' (kept steady toward stone n) → 'walk' (stepping to it, the scene's turn) → 'there' (reached)
      // → the next stone; 'rest' — sat down (`why`: 'slip' — back to steadying for the same stone; 'breath' — on)
      let n = 2, ring = null, phase = 'steady', why = null, kept = 0, slips = 0, begun = null, from = mg.t;
      let till = 0, caught = 0, dip = Infinity, grabbed = Infinity, rested = false, lapsed = 0;
      const touch = mg.on('down', () => { begun ??= mg.t; });
      const aim = () => { ring = mg.mark({ at: `path#stone${n}`, kind: 'ring', quiet: true, danger: 0 }); };
      aim();
      // on to stone n: the scene's turn till she is there
      const go = () => {
        phase = 'walk';
        ring.remove();
        ring = null;
        mg.sceneTurn(true);
        quiet();
        lead.set({ push: 0 });
        if (body) g.set('balance', 0, 0.6);
        send('step', n);
        g.told(`step:stone${n}`, WALK).then(() => { if (phase === 'walk') phase = 'there'; });
      };
      const sit = (reason, s, t) => {
        phase = 'rest'; why = reason; till = t + s;
        mg.sceneTurn(true);
        quiet();
        lead.set({ push: 0 });
        g.set('rest', true);
        if (body) g.set('balance', 0, 0.6);
        mg.plate.set({ phrase: tr('She sits down on a low stone to get her breath.') });
      };
      const t00 = mg.t;
      const done = await until(mg, ({ t, dt }) => {
        const s = lead.state;
        if (t >= dip) { dip = Infinity; g.set('lantern_dip', 0, 0.8); }
        if (t >= grabbed) { grabbed = Infinity; g.set('grab', false); g.mood('sophia', 'neutral'); }
        if (phase === 'steady') {
          if (Math.abs(s.arrow) >= OFF && t >= caught) {
            slips++;
            caught = t + 1.2;
            g.failed();
            mg.error('off', { at: ring, chip: true });
            if (slip === 'sway') { g.set('grab', true); g.mood('sophia', 'afraid'); grabbed = t + 1.2; }
            if (slip === 'dip') { g.set('lantern_dip', 1, 0.2); dip = t + 0.6; }
            if (slip === 'rest') { sit('slip', REST, t); return false; }
          }
          lead.set({ push: begun == null ? 0 : t < caught ? -Math.sign(s.arrow) * 1.6 * Math.min(1, Math.abs(s.arrow) * 4) : wobble(t - begun, PUSH, n) });
          if (s.held && s.in) kept += dt;
          // (the ghost leading: the lantern and her body move with its knob, as with a finger)
          const arrow = taught?.arrow() ?? s.arrow;
          if (slip === 'sway') send('lantern_sway', clamp(Math.abs(arrow)));
          if (body) send('balance', clamp(arrow, -1, 1));
          ring.set({ danger: clamp(Math.abs(arrow) / OFF) });
          mg.plate.set({ fill: clamp((n - 2 + clamp(kept / KEEP)) / (last - 1)), glow: !s.held ? 'idle' : s.in ? 'good' : 'bad' });
          const alone = begun == null && t - t00 >= ALONE, late = begun != null && t - Math.max(from, begun) >= STONE;
          if (kept >= KEEP || alone || late) {
            if (slip === 'sway') send('lantern_sway', 0);
            if (kept >= KEEP) mg.snap({ at: ring }); else if (late) lapsed++;
            go();
          }
        } else if (phase === 'there') {
          if (rests && n === 2 && !rested) { rested = true; sit('breath', BREATH, t); return false; }
          if (n >= last) return true;
          n++;
          phase = 'steady';
          kept = 0;
          from = t;
          mg.sceneTurn(false);
          taught = teachLead(mg, lead);
          aim();
        } else if (phase === 'rest' && t >= till) {
          g.set('rest', false);
          mg.plate.set({ phrase });
          if (why === 'breath') phase = 'there';
          else { phase = 'steady'; mg.sceneTurn(false); taught = teachLead(mg, lead); from = t; kept = 0; }
        }
        return false;
      });
      touch();
      quiet();
      if (!done) return this.skipped;
      if (slip === 'sway' && grabbed !== Infinity) { g.set('grab', false); g.mood('sophia', 'neutral'); }
      mg.sceneTurn(false);
      if (body) g.set('balance', 0, 0.6);
      over();
      await mg.end({ as: begun == null ? 'neutral' : slips || lapsed ? 'flawed' : 'clean' });
      return { slips };
    },
  };
}
