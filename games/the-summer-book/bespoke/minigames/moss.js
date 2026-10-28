// М6 «The Moss» (3.1, the forest at the end of July, after the piece `swim`: Grandmother standing by the stump, the
// ground swimming): balance — lead anywhere, the arrow her head's horizon, tilted by the dizziness; a quiet ring on her
// (`grandma#chest`), its arc of danger how far it tilts. The grey trees wheel about her (`spin`): fast while it tilts,
// quieter as it is kept level. Tilted too far — she nearly falls (a mistake; Sophia looks up, afraid). It ends by its
// count (SECONDS from the first touch; the bar — the time it was kept level by the finger: clean if most of it;
// flawed if she nearly fell or it was let go — then she sits longer, and Sophia comes nearer); the piece after it: she sits down heavily on the stump, `spin` easing to 0.
//   What she does: Grandmother stands holding on to herself while the forest spins.
//   What she wants: not to fall — not in front of the child.
//   How it is for her: the ground swims; the stuffy grey day; fear she does not show.
//   What the player feels: keeping a horizon level while everything wheels.
//   → { slips }
import { clamp, keys, balance, settle, wobble } from './hands.js';

const SECONDS = 8, PUSH = 0.75;

export default {
  title: tr('The Moss'),
  about: 10,
  skipped: { slips: 0 },
  points: ['grandma#chest'],
  keys: ['spin'],
  async run(g, b, opts, signal) {
    const mg = g.minigame({ phrase: tr('The ground swims, and the grey trees go round.') });
    const send = keys(g);
    const over = settle(signal, () => g.set('spin', 0.3, 0.8));
    send('spin', 0.7);
    const r = await balance(g, b, mg, { at: 'grandma#chest', seconds: SECONDS, push: t => wobble(t, PUSH, 1.3),
      frame: ({ arrow, on, t }) => send('spin', on ? clamp(0.2 + 0.8 * Math.abs(arrow)) : 0.6 + 0.1 * Math.sin(2 * t)),
      slip: () => g.mood('sophia', 'afraid') });
    if (!r) return this.skipped;
    over();
    await mg.end({ as: r.as });
    return { slips: r.slips };
  },
};
