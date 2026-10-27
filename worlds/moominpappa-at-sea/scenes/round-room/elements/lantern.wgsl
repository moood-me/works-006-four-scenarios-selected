// The globe glows from within as much as the flame burns (u_lit 0…1, set by animate from `flame`); the guard's wires
// and the cap stay before it.
fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let tin = layer(0, at);
  let globe = layer(1, at);
  emission = globe.rgb * (1.0 - tin.a) * u_lit * 1.6;
  return tin + globe * (1.0 - tin.a);
}
