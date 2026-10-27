// the whitened grass shown out from the middle as far as `ring` (its edge soft and uneven)
fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let edge = u_ring * 1.15 + 0.1 * (noise2(at * 5.0) - 0.5);
  let k = (1.0 - smoothstep(edge - 0.15, edge, abs(at.x))) * select(0.0, 1.0, u_ring > 0.0);
  return painted * k;
}
