// The family's storm lantern on its iron bracket at the bow (the world's `lantern`): burning (`lantern_at` "bow"), put
// out ("out"), or gone from the bracket while Papa or the son holds it ("papa", "troll" — the bracket stays). Its light
// `bow_lantern` from `lantern#flame`.
const at = e.state.lantern_at ?? 'bow';
e.kit.lantern.paint(g, e, { flame: at === 'out' ? 'out' : 'full', here: at === 'bow' || at === 'out', bracket: true });
