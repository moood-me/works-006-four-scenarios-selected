// The lamp's drum: the panels turning round as it burns (u_spin, the angle — animate keeps it), the flame lit from
// within (u_lit 0…1), the blue flame (u_blue), the glass clear as far as it has been wiped (u_clean); the bull's-eyes
// of the panels catch the flame.
fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let base = layer(0, at);
  let glass = layer(1, at);
  let flame = layer(2, at);
  let blue = layer(3, at);
  let grime = layer(4, at);
  let x = clamp(at.x / 0.38, -1.0, 1.0);
  let phi = asin(x) + u_spin;
  let panel = fract(phi * 8.0 / (2.0 * PI));
  let seam = 1.0 - smoothstep(0.0, 0.05, min(panel, 1.0 - panel));
  let bull = 1.0 - smoothstep(0.0, 0.2, abs(panel - 0.5));
  let side = sqrt(1.0 - x * x);
  var c = base;
  c = flame * u_lit + c * (1.0 - flame.a * u_lit);
  c = blue * u_blue + c * (1.0 - blue.a * u_blue);
  let g2 = vec4f(glass.rgb * (1.0 - 0.45 * seam * side), glass.a);
  c = g2 + c * (1.0 - g2.a);
  let murk = grime.a * (1.0 - u_clean);
  c = vec4f(grime.rgb, grime.a) * (1.0 - u_clean) + c * (1.0 - murk);
  let clear = 1.0 - 0.7 * murk;
  emission = (flame.rgb * u_lit * 2.2 + blue.rgb * u_blue * 1.6 + vec3f(1.0, 0.86, 0.6) * bull * side * glass.a * u_lit * 1.2) * clear;
  return c;
}
