// The surface overhead seen from below: a net of light wavering over it (two ridged noises drifting against each
// other), finer toward the level of the eye as the surface goes away, gone below it; dimmer at dusk. And the warm light
// far above going over the surface (his lantern on the bridge, 3С.1): a soft glow at (u_lx, 0.07), u_lamp of it
fn ridge(p: vec2f) -> f32 {
  let n = noise2(p);
  return 1.0 - abs(n * 2.0 - 1.0);
}
fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let q = 1.0 / max(0.56 - at.y, 0.05);
  let p = vec2f(at.x * 3.2 * q, q * 7.0);
  let a = ridge(p + vec2f(u_time * 0.11, u_time * 0.05));
  let b = ridge(p * 1.6 + vec2f(-u_time * 0.08, u_time * 0.06));
  let net = pow(a * b, 6.0);
  let high = 1.0 - smoothstep(-0.05, 0.3, at.y);
  let lamp = exp(-dot(at - vec2f(u_lx, 0.07), at - vec2f(u_lx, 0.07)) / 0.0012);
  emission = vec3f(0.88, 1.0, 0.96) * net * high * 0.8 * (1.0 - 0.7 * u_dusk) + vec3f(1.0, 0.72, 0.38) * lamp * u_lamp * 2.2;
  return painted;
}
