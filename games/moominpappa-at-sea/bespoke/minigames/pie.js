// М11а «To the Cape» (the finale «The Pie on the Cape», the cape at moonlight, after the piece `pie_way`: Papa at the
// first stone with Mama's pie): lead anywhere — the arrow is the pie's tilt in his paws (`carry_tilt` −1…1, the scene
// tips the pie and him under it), steered (`rate`); the zone — level. The stones rock it (`push`). He goes on
// over the stones (`carry` 0…1: the scene puts him along the way) only while the finger leads, and slower the more it
// tilts; tipped to the edge (|tilt| ≥ WOBBLE) — a wobble (into danger), and he stands a moment; the first time My:
// «You'll drop it». By him — the end (clean; flawed if it wobbled); the piece after it: the pie set down.
// The late «Pie» carries bread alone (bread.js): no My.
//   What he does: Papa carries Mama's pie over the stones to the Fisherman on his cape.
//   What he wants: to bring it whole — to a stranger, on his birthday.
//   How it is for him: carrying to someone else; careful, a little solemn, My at his heels.
//   What the player feels: keeping it level, stone by stone.
//   → { wobbles }
import { clamp, until, keys, teach, settle } from './hands.js';

const WAY = 7; // s of leading over the stones
const STONE = 1.2, PUSH = 0.5; // s: a stone rocks it; the rock at its height
const ZONE = 0.4, WOBBLE = 0.85, LEVEL = 0.4, STAND = 0.8; // s he stands after a wobble

// carrying({bread}) → the minigame: bread — the late «Pie», alone with the bread (bread.js)
export function carrying({ bread = false } = {}) {
  return {
    title: tr('To the Cape'),
    about: 9,
    skipped: { wobbles: 0 },
    points: [],
    keys: ['carry', 'carry_tilt'],
    async run(g, b, opts, signal) {
      const mg = g.minigame({ phrase: bread ? tr('Bread, and the rocks to the cape.') : tr('A pie, and the rocks to the cape.') });
      const send = keys(g);
      settle(signal, () => { g.set('carry', 1, 0.8); g.set('carry_tilt', 0, 0.6); });
      send('carry', 0);
      send('carry_tilt', 0);
      const lead = mg.lead({ zone: { at: 0, width: ZONE }, steer: 'rate', release: 'stay', push: 0 });
      teach(b, mg, [lead]);
      let way = 0, wobbles = 0, tipped = false, stand = 0, walked = 0;
      const done = await until(mg, ({ dt }) => {
        const s = lead.state, a = Math.abs(s.arrow);
        if (stand > 0) stand -= dt;
        else if (s.held) {
          way = clamp(way + (dt / WAY) * (1 - 0.6 * a));
          walked += dt;
        }
        const k = Math.floor(walked / STONE), into = walked - k * STONE;
        lead.set({ push: s.held && stand <= 0 ? (k % 2 ? -1 : 1) * PUSH * Math.sin((Math.PI * into) / STONE) : 0 });
        if (!tipped && a >= WOBBLE) {
          tipped = true;
          wobbles++;
          stand = STAND;
          g.failed();
          mg.error('danger', { chip: true });
          if (!bread && wobbles === 1) g.say('my', 'You’ll drop it');
        }
        if (tipped && a < LEVEL) tipped = false;
        send('carry', way);
        send('carry_tilt', s.arrow);
        mg.plate.set({ fill: way, glow: stand > 0 || !s.in ? 'bad' : s.held ? 'good' : 'idle' });
        return way >= 1;
      });
      if (!done) return this.skipped;
      send('carry', 1);
      g.set('carry_tilt', 0, 0.6);
      await mg.end({ as: wobbles ? 'flawed' : 'clean' });
      return { wobbles };
    },
  };
}

export default carrying();
