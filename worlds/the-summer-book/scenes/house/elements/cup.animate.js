// in her hands while `cup` is, tipped by `tilt`; the point with it
const on = !!e.state.cup;
const cup = e.layer('cup');
cup.alpha = on ? 1 : 0;
if (on) {
  const [x, y] = e.point('grandma#hands');
  cup.x = x;
  cup.y = y + 0.04;
  cup.rotate = 0.6 * (+(e.state.tilt ?? 0));
  e.at(x, y - 0.01, 'cup');
}
