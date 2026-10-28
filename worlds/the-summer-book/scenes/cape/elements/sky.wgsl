// The island's sky (modules/isle.md; the same text in every scene of the island — tools/isle/sky.wgsl, copied by
// tools/isle.py). Its colours by the hour are worked out here as a canvas paints them (in sRGB, mixed as a canvas
// mixes): the pearl-grey day (its sun's warmth at u_sun_x, u_sun_y), the August day (lower and warmer, at u_late_x,
// u_late_y), the June dawn (the veiled sun at u_dawn_x, u_dawn_y), the dusk (the afterglow low at u_dusk_x), the
// moonlit night (the horizon pale at u_night_x) — mixed by the state in that order —, the suns' discs by the hour, the
// moon at its phase (u_phase) at u_moon_x, u_moon_y; then, as the engine lays layers, the painted ones: 1 the clouds
// (their colours by the hour), 2 the storm's clouds, 3 the stars, 4 the lightning's bolt (u_flash); the storm's white
// sky (u_storm) and the thick fog's white air (u_fog, its second half) over all. u_low is where the colours end at the
// bottom; u_band_x the middle of the pale band along the horizon.
fn seg(t: f32, a: f32, b: f32) -> f32 {
  return clamp((t - a) / (b - a), 0.0, 1.0);
}
fn rgb(r: f32, g: f32, b: f32) -> vec3f {
  return vec3f(r, g, b) / 255.0;
}
fn to_srgb(c: vec3f) -> vec3f {
  let v = clamp(c, vec3f(0.0), vec3f(1.0));
  return select(1.055 * pow(v, vec3f(1.0 / 2.4)) - 0.055, v * 12.92, v <= vec3f(0.0031308));
}
// a four-stop gradient at t (0…1), its inner stops at p.x, p.y
fn ramp4(t: f32, p: vec2f, c0: vec3f, c1: vec3f, c2: vec3f, c3: vec3f) -> vec3f {
  var c = mix(c0, c1, seg(t, 0.0, p.x));
  c = mix(c, c2, seg(t, p.x, p.y));
  return mix(c, c3, seg(t, p.y, 1.0));
}
// a glow as the painter's: an ellipse (radii r) of colour col falling off straight from a at o to nothing at its edge
fn glow_lin(c: vec3f, at: vec2f, o: vec2f, r: vec2f, col: vec3f, a: f32) -> vec3f {
  let d = length((at - o) / r);
  return mix(c, col, a * max(0.0, 1.0 - d));
}
// the same falling off softly: (1 − u²)², as the painter's five stops have it
fn softk(u: f32) -> f32 {
  let v = clamp(u, 0.0, 1.0);
  var a = mix(1.0, 0.8789, seg(v, 0.0, 0.25));
  a = mix(a, 0.5625, seg(v, 0.25, 0.5));
  a = mix(a, 0.1914, seg(v, 0.5, 0.75));
  return mix(a, 0.0, seg(v, 0.75, 1.0));
}
fn glow_soft(c: vec3f, at: vec2f, o: vec2f, r: vec2f, col: vec3f, a: f32) -> vec3f {
  return mix(c, col, a * softk(length((at - o) / r)));
}
fn rise(at: vec2f, h: f32) -> f32 {
  return clamp((at.y + 0.35) / (h + 0.35), 0.0, 1.0);
}
// the day: pearl-grey, high and cool above, warm pearl toward the water, the veiled sun's brightness
fn day_sky(at: vec2f, h: f32) -> vec3f {
  var c = ramp4(rise(at, h), vec2f(0.45, 0.8), rgb(163.0, 175.0, 188.0), rgb(195.0, 202.0, 209.0), rgb(222.0, 222.0, 218.0), rgb(236.0, 231.0, 222.0));
  c = select(c, rgb(211.0, 214.0, 212.0), at.y > h);
  let s = vec2f(u_sun_x, u_sun_y);
  c = glow_lin(c, at, s, vec2f(0.8, 0.35), rgb(246.0, 236.0, 224.0), 0.85);
  c = glow_lin(c, at, s, vec2f(0.2, 0.12), rgb(251.0, 243.0, 230.0), 0.9);
  return glow_lin(c, at, vec2f(u_band_x, h), vec2f(1.6, 0.06), rgb(243.0, 238.0, 230.0), 0.8);
}
// the August day: the sun lower, the light warmer and a little dusty
fn late_sky(at: vec2f, h: f32) -> vec3f {
  var c = ramp4(rise(at, h), vec2f(0.45, 0.8), rgb(169.0, 176.0, 182.0), rgb(201.0, 203.0, 202.0), rgb(226.0, 220.0, 207.0), rgb(238.0, 226.0, 204.0));
  c = select(c, rgb(214.0, 213.0, 207.0), at.y > h);
  let s = vec2f(u_late_x, u_late_y);
  c = glow_lin(c, at, s, vec2f(0.9, 0.32), rgb(247.0, 228.0, 200.0), 0.85);
  c = glow_lin(c, at, s, vec2f(0.22, 0.12), rgb(251.0, 236.0, 212.0), 0.9);
  return glow_lin(c, at, vec2f(u_band_x, h), vec2f(1.6, 0.06), rgb(242.0, 230.0, 214.0), 0.8);
}
// the June dawn: the same pearl, the sun just up and veiled, low
fn dawn_sky(at: vec2f, h: f32) -> vec3f {
  var c = ramp4(rise(at, h), vec2f(0.45, 0.8), rgb(158.0, 171.0, 185.0), rgb(191.0, 199.0, 207.0), rgb(220.0, 220.0, 217.0), rgb(236.0, 230.0, 220.0));
  c = select(c, rgb(211.0, 214.0, 212.0), at.y > h);
  let s = vec2f(u_dawn_x, u_dawn_y);
  c = glow_lin(c, at, s, vec2f(0.8, 0.3), rgb(246.0, 236.0, 224.0), 0.85);
  c = glow_lin(c, at, s, vec2f(0.2, 0.11), rgb(251.0, 243.0, 230.0), 0.9);
  return glow_lin(c, at, vec2f(u_band_x, h), vec2f(1.6, 0.06), rgb(243.0, 238.0, 230.0), 0.8);
}
// the dusk: pearl-grey above, a faint rose along the horizon where the sun has just gone
fn dusk_sky(at: vec2f, h: f32) -> vec3f {
  var c = ramp4(rise(at, h), vec2f(0.5, 0.85), rgb(152.0, 163.0, 182.0), rgb(188.0, 193.0, 203.0), rgb(220.0, 211.0, 207.0), rgb(232.0, 216.0, 207.0));
  c = select(c, rgb(212.0, 211.0, 210.0), at.y > h);
  c = glow_soft(c, at, vec2f(u_dusk_x, h), vec2f(0.9, 0.12), rgb(240.0, 210.0, 194.0), 0.8);
  return glow_soft(c, at, vec2f(u_band_x, h), vec2f(1.6, 0.05), rgb(239.0, 228.0, 220.0), 0.7);
}
// the moonlit night: deep blue above, paling toward the horizon, the moon's light on the air over the sea
fn night_sky(at: vec2f, h: f32) -> vec3f {
  var c = ramp4(rise(at, h), vec2f(0.55, 0.9), rgb(38.0, 53.0, 90.0), rgb(61.0, 80.0, 121.0), rgb(106.0, 124.0, 162.0), rgb(129.0, 144.0, 176.0));
  c = select(c, rgb(89.0, 106.0, 142.0), at.y > h);
  return glow_soft(c, at, vec2f(u_night_x, h), vec2f(1.5, 0.1), rgb(164.0, 178.0, 207.0), 0.75);
}
// the storm's sky: white-grey and light, lighter toward the horizon (by night a light grey-blue: the storm is light)
fn storm_sky(at: vec2f, h: f32) -> vec3f {
  let t = rise(at, h);
  let day = mix(rgb(178.0, 185.0, 194.0), rgb(226.0, 228.0, 230.0), t * t);
  let night = mix(rgb(120.0, 130.0, 154.0), rgb(178.0, 186.0, 204.0), t * t);
  return mix(day, night, u_night);
}
// how much of a disc of radius r about o covers this pixel (its edge a pixel soft)
fn disc(at: vec2f, o: vec2f, r: f32) -> f32 {
  let px = 0.5 * (abs(at_dx.x) + abs(at_dy.y)) + 0.0001;
  return 1.0 - smoothstep(r - px, r + px, length(at - o));
}
fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let h = u_low;
  let fogk = smoothstep(0.0, 1.0, clamp((u_fog - 0.5) / 0.5, 0.0, 1.0));
  // the hour
  var c = day_sky(at, h);
  c = mix(c, late_sky(at, h), u_late);
  c = mix(c, dawn_sky(at, h), u_dawn);
  c = mix(c, dusk_sky(at, h), u_dusk);
  c = mix(c, night_sky(at, h), u_night);
  // the suns' discs, pale through the veil, each at its hour
  let clear = (1.0 - u_storm) * (1.0 - 0.85 * fogk);
  let lit = (1.0 - u_dusk) * (1.0 - u_night) * clear;
  let white = rgb(255.0, 250.0, 240.0);
  c = mix(c, white, 0.85 * disc(at, vec2f(u_sun_x, u_sun_y), 0.03) * (1.0 - u_late) * (1.0 - u_dawn) * lit);
  c = mix(c, white, 0.85 * disc(at, vec2f(u_late_x, u_late_y), 0.032) * u_late * (1.0 - u_dawn) * lit);
  c = mix(c, white, 0.85 * disc(at, vec2f(u_dawn_x, u_dawn_y), 0.032) * u_dawn * lit);
  // the stars, by night in a clear sky
  let star = layer(3, at);
  c = mix(c, rgb(238.0, 241.0, 251.0), star.a * u_night * (1.0 - u_storm) * (1.0 - fogk));
  // the moon at its phase: a soft ring of light, the lit part pale, the rest of the disc a little lighter than the sky
  let mo = vec2f(u_moon_x, u_moon_y);
  let mr = 0.03;
  let seen = u_night * (1.0 - 0.88 * u_storm) * (1.0 - 0.7 * fogk);
  let md = length(at - mo);
  c = mix(c, rgb(255.0, 255.0, 255.0), 0.28 * seg(0.19 - md, 0.0, 0.19 - mr) * seen);
  let p = (at - mo) / mr;
  let f = 0.12 + 0.88 * clamp(u_phase, 0.0, 1.0);
  let k = abs(2.0 * f - 1.0) * sqrt(max(0.0, 1.0 - p.y * p.y));
  let side = smoothstep(-0.06, 0.06, p.x - select(k, -k, f >= 0.5));
  let inside = disc(at, mo, mr);
  c = mix(c, rgb(66.0, 78.0, 112.0), 0.85 * inside * (1.0 - side) * seen);
  c = mix(c, rgb(250.0, 246.0, 230.0), inside * side * seen);
  // from here as the engine lays its layers: in linear colour
  var L = srgbToLinear(c);
  // the clouds, coloured by the hour: their own colours by day and at dawn, warmer in August, pale rose and grey at
  // dusk, silvered by night; grey in a storm; gone in the thick fog
  let cl = layer(1, at);
  let pc = to_srgb(cl.rgb / max(cl.a, 0.0001));
  let warm = clamp((pc.r - pc.b) * 20.0, 0.0, 1.0);
  var cc = mix(pc, pc * vec3f(1.02, 0.99, 0.93), u_late * (1.0 - u_dawn));
  cc = mix(cc, mix(rgb(227.0, 226.0, 228.0), rgb(240.0, 226.0, 220.0), warm), u_dusk);
  cc = mix(cc, mix(rgb(154.0, 168.0, 198.0), rgb(185.0, 196.0, 220.0), warm), u_night);
  cc = mix(cc, mix(rgb(176.0, 182.0, 190.0), rgb(140.0, 148.0, 166.0), u_night), u_storm);
  L = mix(L, srgbToLinear(cc), cl.a * (1.0 - fogk));
  // the storm: the sky white-grey, its heavy clouds over it, darker in their bellies
  L = mix(L, srgbToLinear(storm_sky(at, h)), 0.9 * u_storm);
  let sc = layer(2, at);
  let scol = mix(mix(rgb(168.0, 175.0, 185.0), rgb(128.0, 136.0, 148.0), sc.a), mix(rgb(120.0, 128.0, 148.0), rgb(92.0, 100.0, 120.0), sc.a), u_night);
  L = mix(L, srgbToLinear(scol), sc.a * u_storm * (1.0 - fogk));
  // the thick fog: the sky gone into white air (pale grey-blue under the moon)
  let fogc = mix(mix(rgb(228.0, 230.0, 231.0), rgb(226.0, 220.0, 216.0), u_dusk), rgb(170.0, 180.0, 204.0), u_night);
  L = mix(L, srgbToLinear(fogc), 0.92 * fogk);
  // the lightning: the whole sky lit a moment, the bolt white
  L = mix(L, srgbToLinear(rgb(226.0, 232.0, 255.0)), 0.5 * u_flash);
  let bolt = layer(4, at).a * u_flash;
  L = mix(L, vec3f(1.0), bolt);
  emission = vec3f(bolt * 3.0) + srgbToLinear(rgb(250.0, 246.0, 230.0)) * inside * side * seen * 0.3;
  return vec4f(L, 1.0);
}
