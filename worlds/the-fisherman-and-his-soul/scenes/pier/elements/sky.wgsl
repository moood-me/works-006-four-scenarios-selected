// the night (its painting), the dusk (layer 1), the dawn (layer 2), the day (layer 3) shown over it by their uniforms; stars in
// the night: one in some cells of a grid over the sky, each its own size and its own slow twinkle, none near the
// horizon and none in the moon's glow, going as the night goes
fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  var c = mix(painted, layer(1, at), u_dusk);
  c = mix(c, layer(2, at), u_dawn);
  c = mix(c, layer(3, at), u_day);
  let grid = 64.0;
  let cell = floor(at * grid);
  let h = hash2(cell);
  let off = vec2f(hash2(cell + vec2f(7.1, 3.3)), hash2(cell + vec2f(1.7, 9.2))) * 0.6 + vec2f(0.2, 0.2);
  let p = (at * grid - cell - off) / grid;
  let px = abs(at_dx.x) + abs(at_dy.y);
  let size = px * (0.9 + 1.6 * hash2(cell + vec2f(5.0, 5.0)));
  let star = select(0.0, 1.0, h > 0.972) * (1.0 - smoothstep(size * 0.3, size, length(p)));
  let twinkle = 0.6 + 0.4 * sin(u_time * (0.5 + 1.4 * hash2(cell + vec2f(2.0, 8.0))) + h * 40.0);
  let high = 1.0 - smoothstep(0.24, 0.46, at.y);
  let clear = smoothstep(0.07, 0.15, length(at - vec2f(0.46, 0.17)));
  let night = (1.0 - u_dusk) * (1.0 - u_dawn) * (1.0 - u_day);
  emission = vec3f(0.82, 0.88, 1.0) * star * twinkle * high * clear * 1.6 * night;
  return c;
}
