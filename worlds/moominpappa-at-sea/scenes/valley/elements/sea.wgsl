// The crests come and go in patches the breeze carries; the foam at the beach's edge swells and ebbs as the swell
// washes in.
fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let base = layer(0, at);
  let crest = layer(1, at);
  let foam = layer(2, at);
  let n = noise2(vec2f(at.x * 0.08 - u_time * 0.15, at.y * 0.12 + u_time * 0.04));
  let show = smoothstep(0.45, 0.66, n);
  let wash = 0.45 + 0.55 * sin(u_time * 0.7 + at.y * 0.4);
  var c = crest * show + base * (1.0 - crest.a * show);
  c = foam * wash + c * (1.0 - foam.a * wash);
  return c;
}
