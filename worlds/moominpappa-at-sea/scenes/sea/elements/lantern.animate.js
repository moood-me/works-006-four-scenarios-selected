// the lantern is on its bracket but while the son holds it; it burns there while `lantern_at` is "bow"
const at = e.state.lantern_at ?? 'bow';
e.layer('lamp').alpha = at === 'troll' ? 0 : 1;
e.layer('lit').alpha = at === 'bow' ? 1 : 0;
