// the front's stones: all of them once they are laid (`stones`); while they are being laid (`stones_laid` 0…0.3),
// one by one
const up = e.lib.tentShown(e.state, 'up');
const n = e.state.stones ? 4 : Math.floor(4 * Math.min(1, (e.state.stones_laid ?? 0) / 0.3) + 1e-6);
for (let i = 0; i < 4; i++) e.layer(`f${i}`).alpha = up && i < n ? 1 : 0;
