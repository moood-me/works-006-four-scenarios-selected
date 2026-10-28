// М7а «The Cup» (3.3 «papa», the veranda at dusk, after the piece `doctor`: «I've written to the doctor…», her cup over
// the table): balance — lead anywhere, the arrow the cup in her hands (`tilt` −1…1, tipping as the arrow goes), tilted
// by the hand that trembles while he talks; a quiet ring on the cup (`table#cup`), its arc of danger how far it tips.
// Tipped too far — coffee spills (a mistake; Papa sees her hand). It ends by its count (SECONDS from the first touch;
// the bar — the time it was kept level by the finger: clean if most of it; flawed if it spilt or was let go), the cup set level; the piece after it: «All right. Only don't put a chair for me by the
// gate».
//   What she does: Grandmother holds her cup level while her son tells her she is to winter in town.
//   What she wants: to keep a straight face — not to show what his words do.
//   How it is for her: the doctor, the boat on Thursday, the town; her hand.
//   What the player feels: keeping a full cup steady.
//   → { spilt }
import { keys, balance, settle, wobble } from './hands.js';

const SECONDS = 8, PUSH = 0.6;

export default {
  title: tr('The Cup'),
  about: 10,
  skipped: { spilt: 0 },
  points: ['table#cup'],
  keys: ['tilt'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('A full cup, and Papa talking about the doctor.') });
    const send = keys(g);
    const over = settle(signal, () => g.set('tilt', 0, 0.5));
    send('tilt', 0);
    const r = await balance(g, b, mg, { at: 'table#cup', seconds: SECONDS, push: t => wobble(t, PUSH, 2.1),
      frame: ({ arrow }) => send('tilt', arrow),
      slip: () => g.mood('papa', 'sad') });
    if (!r) return this.skipped;
    g.set('tilt', 0, 0.5);
    over();
    await mg.end({ as: r.as });
    return { spilt: r.slips };
  },
};
