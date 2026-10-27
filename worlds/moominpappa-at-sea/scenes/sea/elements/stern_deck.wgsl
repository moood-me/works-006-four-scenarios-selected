// the rime over the deck from its stern edge (y −0.28: the far edge, away from the bow) forward as far as `frost` (all
// of it at 1), its front uneven
fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let front = -0.28 + u_frost * 0.62 + 0.06 * (noise2(at * 18.0) - 0.5);
  let k = (1.0 - smoothstep(front - 0.04, front + 0.04, at.y)) * select(0.0, 1.0, u_frost > 0.0);
  let r = layer(1, at) * k;
  return r + painted * (1.0 - r.a);
}
