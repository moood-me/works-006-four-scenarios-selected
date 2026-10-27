// there when the rope is out or coiled (rope, coil); the less of it here, the more is down in the pool
const s = e.state, here = s.coil || s.rope > 0.001 ? 1 : 0, l = e.layer("coil");
l.alpha = here;
l.scale = s.coil ? 1 : 1 - 0.6 * s.rope;
