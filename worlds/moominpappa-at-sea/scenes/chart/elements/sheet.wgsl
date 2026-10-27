// the chart with Papa's course pencilled as far as `cut`: the ink shown where the share of the way under it (layer 2:
// its grey is the share) is short of it
fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let ink = layer(1, at);
  let share = layer(2, at);
  let u = share.r / max(share.a, 0.0001);
  let on = select(0.0, 1.0, share.a > 0.02 && u < u_cut);
  return vec4f(painted.rgb * (1.0 - ink.a * on) + ink.rgb * on, painted.a);
}
