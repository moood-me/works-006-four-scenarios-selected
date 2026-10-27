// the strip from its near end (`near` metres astern of the boat's anchor; the painting's y is 47.5 − that) on astern,
// its near end soft and ragged; its rime glinting a little as the swell moves under it
fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let edge = 47.5 - u_near + 0.5 * (noise2(vec2f(at.x * 3.0, 1.7)) - 0.5);
  let k = 1.0 - smoothstep(edge - 0.8, edge, at.y);
  let glint = 0.12 * smoothstep(0.7, 0.95, noise2(vec2f(at.x * 4.0, at.y * 1.5 + u_time * 0.6)));
  let c = painted * k;
  return vec4f(c.rgb + vec3f(glint) * c.a, c.a);
}
