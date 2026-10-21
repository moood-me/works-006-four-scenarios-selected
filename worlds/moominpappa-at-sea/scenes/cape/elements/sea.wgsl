// The crests come and go in patches the wind carries; the foam round the rocks swells and ebbs as the swell washes in.
fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let base = layer(0, at);
  let crest = layer(1, at);
  let foam = layer(2, at);
  let n = noise2(vec2f(at.x * 0.09 - u_time * 0.21, at.y * 0.13 + u_time * 0.05));
  let show = smoothstep(0.38, 0.6, n);
  let wash = 0.5 + 0.5 * sin(u_time * 0.8 + at.x * 0.3 + at.y * 0.45);
  var c = crest * show + base * (1.0 - crest.a * show);
  c = foam * wash + c * (1.0 - foam.a * wash);
  return c;
}
