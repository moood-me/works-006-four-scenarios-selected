// The island's sea (modules/island.md; the same text in every scene of the island — tools/island/sea.wgsl): the crests
// come and go in patches the wind carries, the foam round the rocks swells and ebbs as the swell washes in; in a storm
// (u_storm) the crests are many and quick and the foam beats harder.
fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let base = layer(0, at);
  let crest = layer(1, at);
  let foam = layer(2, at);
  let n = noise2(vec2f(at.x * 0.09 - u_time * (0.21 + 0.35 * u_storm), at.y * 0.13 + u_time * (0.05 + 0.1 * u_storm)));
  let show = smoothstep(0.38 - 0.3 * u_storm, 0.6 - 0.25 * u_storm, n);
  let wash = clamp(0.5 + 0.5 * sin(u_time * (0.8 + 0.7 * u_storm) + at.x * 0.3 + at.y * 0.45) + 0.5 * u_storm, 0.0, 1.0);
  var c = crest * show + base * (1.0 - crest.a * show);
  c = foam * wash + c * (1.0 - foam.a * wash);
  return c;
}
