// the rime round the Groke out to a radius growing with `ring` (its edge soft and uneven), and her track's patches as
// far as `track` (layer 2's grey: the share of the way at each)
fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let d = length((at - vec2f(u_gx, u_gy)) * vec2f(1.0, 1.1));
  let edge = u_ring * 1.05 + 0.12 * (noise2(at * 6.0) - 0.5);
  let inRing = 1.0 - smoothstep(edge - 0.12, edge, d);
  let track = layer(1, at);
  let share = layer(2, at);
  let u = share.r / max(share.a, 0.0001);
  let on = select(0.0, 1.0, share.a > 0.02 && u <= u_track + 0.001);
  let ring = painted * inRing * select(0.0, 1.0, u_ring > 0.0);
  let t = track * on;
  return t + ring * (1.0 - t.a);
}
