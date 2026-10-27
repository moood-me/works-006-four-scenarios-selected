// The island's sky (modules/island.md; the same text in every scene of the island — tools/island/sky.wgsl, copied by
// tools/island.py). Its colours by the hour are worked out here, as the painter's gradients were (in sRGB, mixed as a
// canvas mixes them): the day (a washed blue, warm gold round the low sun at u_day_x, u_day_y), the dawn (pale
// grey-blue to peach and rose, warm at the horizon by u_dawn_x), the dusk (violet-blue to apricot, warm at u_dusk_x),
// the moonlit night (a deep clear blue, light at the sea's line) — mixed by the state (u_dawn, u_dusk, u_night, in
// that order) — and the storm's grey over any of them; u_low is where they end at the bottom. Over them the painted
// layers, white, coloured here by the hour: 1 the clouds, 2 the storm's clouds, 3 the stars, 4 the moon, 5 the
// lightning's bolt (u_flash).
fn seg(t: f32, a: f32, b: f32) -> f32 {
  return clamp((t - a) / (b - a), 0.0, 1.0);
}
fn rgb(r: f32, g: f32, b: f32) -> vec3f {
  return vec3f(r, g, b) / 255.0;
}
// a five-stop gradient at t (0…1), its inner stops at p.x, p.y, p.z
fn ramp(t: f32, p: vec3f, c0: vec3f, c1: vec3f, c2: vec3f, c3: vec3f, c4: vec3f) -> vec3f {
  var c = mix(c0, c1, seg(t, 0.0, p.x));
  c = mix(c, c2, seg(t, p.x, p.y));
  c = mix(c, c3, seg(t, p.y, p.z));
  return mix(c, c4, seg(t, p.z, 1.0));
}
// the day: the washed blue, the warm gold round the sun, the haze on the sea's line
fn day_sky(at: vec2f, h: f32) -> vec3f {
  let t = clamp((at.y + 0.35) / (h + 0.35), 0.0, 1.0);
  var c = ramp(t, vec3f(0.4, 0.75, 0.92), rgb(111.0, 151.0, 189.0), rgb(157.0, 187.0, 210.0), rgb(217.0, 220.0, 207.0), rgb(242.0, 223.0, 186.0), rgb(246.0, 227.0, 194.0));
  c = select(c, rgb(166.0, 182.0, 184.0), at.y > h);
  if (at.y < h + 0.01) {
    let d = length(at - vec2f(u_day_x, u_day_y)) / 1.5;
    var w = mix(rgb(255.0, 228.0, 184.0), rgb(252.0, 214.0, 160.0), seg(d, 0.0, 0.25));
    w = mix(w, rgb(244.0, 200.0, 160.0), seg(d, 0.25, 0.5));
    let a = mix(mix(mix(0.9, 0.55, seg(d, 0.0, 0.25)), 0.22, seg(d, 0.25, 0.5)), 0.0, seg(d, 0.5, 1.0));
    c = mix(c, w, a);
  }
  if (at.y > h - 0.09 && at.y < h) {
    let b = (at.y - (h - 0.09)) / 0.09;
    c = mix(c, rgb(246.0, 228.0, 204.0), mix(mix(0.0, 0.6, seg(b, 0.0, 0.7)), 0.35, seg(b, 0.7, 1.0)));
  }
  return c;
}
// the dawn: pale grey-blue high, peach and rose low, warm at the horizon on one side
fn dawn_sky(at: vec2f, h: f32) -> vec3f {
  let t = clamp((at.y + 0.35) / (h + 0.35), 0.0, 1.0);
  var c = ramp(t, vec3f(0.42, 0.78, 0.93), rgb(142.0, 170.0, 194.0), rgb(183.0, 200.0, 213.0), rgb(226.0, 216.0, 212.0), rgb(241.0, 217.0, 201.0), rgb(246.0, 226.0, 207.0));
  c = select(c, rgb(159.0, 179.0, 192.0), at.y > h);
  if (at.y < h + 0.01) {
    let d = length(at - vec2f(u_dawn_x, h)) / 1.1;
    let w = mix(rgb(255.0, 210.0, 172.0), rgb(250.0, 200.0, 182.0), seg(d, 0.0, 0.45));
    let a = mix(mix(0.7, 0.25, seg(d, 0.0, 0.45)), 0.0, seg(d, 0.45, 1.0));
    c = mix(c, w, a);
  }
  if (at.y > h - 0.06 && at.y < h + 0.01) {
    let b = (at.y - (h - 0.06)) / 0.07;
    c = mix(c, rgb(246.0, 232.0, 222.0), mix(mix(0.0, 0.55, seg(b, 0.0, 0.75)), 0.2, seg(b, 0.75, 1.0)));
  }
  return c;
}
// the dusk: violet-blue high, rose and apricot low, the afterglow warm on the side the sun went down
fn dusk_sky(at: vec2f, h: f32) -> vec3f {
  let t = clamp((at.y + 0.35) / (h + 0.35), 0.0, 1.0);
  var c = ramp(t, vec3f(0.4, 0.74, 0.9), rgb(96.0, 112.0, 160.0), rgb(150.0, 148.0, 188.0), rgb(222.0, 178.0, 180.0), rgb(246.0, 188.0, 152.0), rgb(248.0, 202.0, 162.0));
  c = select(c, rgb(150.0, 150.0, 172.0), at.y > h);
  if (at.y < h + 0.01) {
    let d = length(at - vec2f(u_dusk_x, h)) / 1.3;
    let w = mix(rgb(255.0, 176.0, 116.0), rgb(250.0, 166.0, 126.0), seg(d, 0.0, 0.3));
    let a = mix(mix(0.8, 0.42, seg(d, 0.0, 0.3)), 0.0, seg(d, 0.3, 1.0));
    c = mix(c, w, a);
  }
  if (at.y > h - 0.07 && at.y < h + 0.01) {
    let b = (at.y - (h - 0.07)) / 0.08;
    c = mix(c, rgb(250.0, 206.0, 184.0), mix(mix(0.0, 0.5, seg(b, 0.0, 0.75)), 0.25, seg(b, 0.75, 1.0)));
  }
  return c;
}
// the moonlit night: a deep clear blue, lighter down to the sea's line
fn night_sky(at: vec2f, h: f32) -> vec3f {
  let t = clamp((at.y + 0.35) / (h + 0.35), 0.0, 1.0);
  var c = ramp(t, vec3f(0.45, 0.8, 0.94), rgb(36.0, 50.0, 90.0), rgb(58.0, 78.0, 124.0), rgb(98.0, 116.0, 160.0), rgb(128.0, 142.0, 180.0), rgb(142.0, 154.0, 188.0));
  c = select(c, rgb(72.0, 86.0, 122.0), at.y > h);
  if (at.y > h - 0.08 && at.y < h + 0.01) {
    let b = (at.y - (h - 0.08)) / 0.09;
    c = mix(c, rgb(172.0, 182.0, 212.0), mix(mix(0.0, 0.35, seg(b, 0.0, 0.75)), 0.15, seg(b, 0.75, 1.0)));
  }
  return c;
}
// the storm's grey over a colour
fn stormy(c: vec3f, k: f32) -> vec3f {
  let y = dot(c, vec3f(0.3, 0.59, 0.11));
  return mix(c, vec3f(y) * vec3f(0.86, 0.9, 0.96), k);
}
fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let h = u_low;
  var c = day_sky(at, h);
  c = mix(c, dawn_sky(at, h), u_dawn);
  c = mix(c, dusk_sky(at, h), u_dusk);
  c = mix(c, night_sky(at, h), u_night);
  c = stormy(c, u_storm * 0.85);
  // the stars, twinkling, by night and clear sky
  let star = layer(3, at);
  let twinkle = 0.55 + 0.45 * noise2(at * 220.0 + vec2f(u_time * 1.3, 0.0));
  c = min(c + vec3f(star.a * twinkle * u_night * (1.0 - 0.85 * u_storm)), vec3f(1.0));
  // the moon by night: its lit part and its ring, pale; the rest of its disc a little lighter than the sky; in a storm
  // only a faint glow of it behind the clouds
  let moon = layer(4, at);
  let lit = moon.r / max(moon.a, 0.001);
  let mc = mix(rgb(66.0, 78.0, 112.0), rgb(250.0, 246.0, 230.0), lit);
  let moon_seen = u_night * (1.0 - 0.88 * u_storm);
  c = mix(c, mc, moon.a * moon_seen);
  // the clouds, coloured by the hour and by where they are: gold near the day's sun, rose low at dawn, apricot near
  // the dusk's afterglow, grey-blue by night
  let k = 0.5 + 0.5 * clamp(at.y / 0.48, 0.0, 1.0);
  let near_day = max(0.0, 1.0 - length(vec2f(at.x - u_day_x, (at.y - u_day_y) * 2.0)) / 1.6);
  let near_dusk = max(0.0, 1.0 - length(vec2f(at.x - u_dusk_x, (at.y - h) * 2.0)) / 1.6);
  var ct = mix(rgb(222.0, 220.0, 226.0), rgb(252.0, 230.0, 186.0), near_day);
  ct = mix(ct, vec3f(196.0 + 40.0 * k, 188.0 + 18.0 * k, 204.0 + 2.0 * k) / 255.0, u_dawn);
  ct = mix(ct, mix(rgb(178.0, 160.0, 196.0), rgb(252.0, 182.0, 142.0), max(near_dusk, k - 0.5)), u_dusk);
  ct = mix(ct, mix(rgb(98.0, 110.0, 148.0), rgb(130.0, 140.0, 174.0), k - 0.5), u_night);
  ct = stormy(ct, u_storm);
  c = mix(c, ct, layer(1, at).a);
  // the storm's clouds: their bellies darker where they are thick; darker by night, yet seen
  let sc = layer(2, at);
  let dark = mix(1.0, 0.68, u_night) * mix(1.0, 0.85, u_dusk);
  let scol = mix(rgb(156.0, 162.0, 172.0), rgb(86.0, 94.0, 108.0), sc.a) * dark;
  c = mix(c, scol, sc.a * u_storm);
  // the lightning: the whole sky lit a moment, the bolt white
  c = mix(c, rgb(226.0, 232.0, 255.0), u_flash * 0.5);
  let bolt = layer(5, at).a * u_flash;
  c = mix(c, vec3f(1.0), bolt);
  emission = vec3f(bolt * 3.0) + srgbToLinear(rgb(250.0, 246.0, 230.0)) * moon.a * lit * moon_seen * 0.35;
  return vec4f(srgbToLinear(clamp(c, vec3f(0.0), vec3f(1.0))), 1.0);
}
