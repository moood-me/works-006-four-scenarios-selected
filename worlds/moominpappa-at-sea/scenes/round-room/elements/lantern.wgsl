// The storm lantern's globe (modules/lantern.md; the same text in every scene with a lantern — tools/lantern): it glows
// from within as much as the flame burns (u_lit 0…1, set by the module's move); the guard's wires and the cap stay
// before it.
fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let tin = layer(0, at);
  let globe = layer(1, at);
  emission = globe.rgb * (1.0 - tin.a) * u_lit * 1.6;
  return tin + globe * (1.0 - tin.a);
}
