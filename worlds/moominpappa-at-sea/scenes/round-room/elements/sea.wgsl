// The crests come and go in patches the wind carries.
fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let base = layer(0, at);
  let crest = layer(1, at);
  let n = noise2(vec2f(at.x * 0.09 - u_time * 0.21, at.y * 0.13 + u_time * 0.05));
  let show = smoothstep(0.38, 0.6, n);
  return crest * show + base * (1.0 - crest.a * show);
}
