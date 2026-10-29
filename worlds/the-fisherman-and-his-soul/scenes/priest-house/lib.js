// What the room's walls share: limewashed plaster, white and a little uneven, and the blue-grey band painted along its
// foot. `wall(g, seed, left, right, top)` — in metres, its foot at y 0, `top` negative (the ceiling's height); the
// whitewash a few soft patches of a shade darker or lighter, never a pattern
const LIME = '#ebe6da';
const BAND = '#8b98a6';
function wall(g, seed, left, right, top) {
  g.save();
  g.beginPath();
  g.rect(left, top, right - left, -top + 0.02);
  g.clip();
  g.fillStyle = LIME;
  g.fillRect(left, top, right - left, -top + 0.02);
  for (let i = 0; i < 26; i++) {
    const x = left + (right - left) * anim.hash(i, seed);
    const y = top + -top * anim.hash(i, seed + 1);
    const w = 0.3 + 0.9 * anim.hash(i, seed + 2);
    g.fillStyle = anim.hash(i, seed + 3) > 0.5 ? 'rgba(214, 206, 190, 0.35)' : 'rgba(250, 248, 242, 0.4)';
    g.beginPath();
    g.ellipse(x, y, w, w * 0.6, 0, 0, Math.PI * 2);
    g.fill();
  }
  g.fillStyle = BAND;
  g.fillRect(left, -0.34, right - left, 0.36);
  g.fillStyle = 'rgba(60, 70, 84, 0.35)';
  g.fillRect(left, -0.35, right - left, 0.02);
  g.restore();
}
return { wall, LIME, BAND };
