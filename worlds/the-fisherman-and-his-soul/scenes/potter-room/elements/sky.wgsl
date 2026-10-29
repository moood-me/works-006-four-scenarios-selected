// the night (its painting) and the dawn (its layer 1) by u_dawn; a few stars in the night
fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let c = mix(painted, layer(1, at), u_dawn);
  let grid = 60.0;
  let cell = floor(at * grid);
  let h = hash2(cell);
  let off = vec2f(hash2(cell + vec2f(7.1, 3.3)), hash2(cell + vec2f(1.7, 9.2))) * 0.6 + vec2f(0.2, 0.2);
  let p = (at * grid - cell - off) / grid;
  let px = abs(at_dx.x) + abs(at_dy.y);
  let size = px * (0.9 + 1.6 * hash2(cell + vec2f(5.0, 5.0)));
  let star = select(0.0, 1.0, h > 0.97) * (1.0 - smoothstep(size * 0.3, size, length(p)));
  let twinkle = 0.6 + 0.4 * sin(u_time * (0.5 + 1.4 * hash2(cell + vec2f(2.0, 8.0))) + h * 40.0);
  emission = vec3f(0.82, 0.88, 1.0) * star * twinkle * 1.4 * (1.0 - u_dawn);
  return c;
}
