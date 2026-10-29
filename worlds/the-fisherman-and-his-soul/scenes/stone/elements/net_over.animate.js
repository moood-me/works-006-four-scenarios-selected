// the net drawn in toward the bow as it is hauled (`haul` 0 → 1: from a length out on the water to under the stem), the
// catch coming up with it (`fish`), the knot by her hand loosening (`knot`)
const s = e.state;
const c = e.anim.clamp;
const out = 1 - c(s.haul ?? 1, 0, 1);
const ropes = e.layer('ropes');
ropes.scaleX = 1 + 0.7 * out;
ropes.scaleY = 1 - 0.15 * out;
for (const name of ['mesh', 'fish']) {
  const l = e.layer(name);
  l.x = 0.45 * out;
  l.scaleX = 1 + 0.35 * out;
}
e.layer('fish').alpha = c(s.fish ?? 0, 0, 1);
const k = c(s.knot ?? 0, 0, 1);
const knot = e.layer('knot');
knot.scale = 1 + 0.8 * k;
knot.rotate = 0.9 * k;
knot.alpha = 1 - 0.55 * k;
