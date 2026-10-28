// the side's stones: all of them once they are laid (`stones`); while they are being laid (`stones_laid` past the
// front's 0.3), one by one
const up = e.lib.tentShown(e.state, 'up');
const n = e.state.stones ? 9 : Math.floor(9 * Math.max(0, ((e.state.stones_laid ?? 0) - 0.3) / 0.7) + 1e-6);
for (let i = 0; i < 9; i++) e.layer(`s${i}`).alpha = up && i < n ? 1 : 0;
