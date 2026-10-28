// the afternoon's sky turned to the evening's, the morning's and the night's as far as the looks are; the clouds over
// it in the light's colour — white by day, gold in the evening, rose in the morning, grey-blue and fainter at night
fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  var c = painted;
  c = mix(c, layer(1, at), u_dusk);
  c = mix(c, layer(3, at), u_dawn);
  c = mix(c, layer(2, at), u_night);
  let cl = layer(4, at);
  var tint = mix(vec3f(1.0, 0.99, 0.97), vec3f(1.0, 0.72, 0.5), u_dusk);
  tint = mix(tint, vec3f(1.0, 0.8, 0.78), u_dawn);
  tint = mix(tint, vec3f(0.36, 0.42, 0.6), u_night);
  let k = cl.a * (1.0 - 0.5 * u_night);
  return vec4f(c.rgb * (1.0 - k) + tint * k, c.a);
}
