// How much of the rime, the warmed sand and the trail shows: the rime out to frost of its widest, its edge ragged and
// soft; the trail from her seat toward the water by track, its sides ragged; over them the dark circle by warm; all
// of it fading out at the water's edge (wx). The rime and the trail give back a little light of their own — white
// by night too — and a few crystals glint.
fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let p = at - vec2f(u_sx, u_sy);
  let r = length(p);
  let n = noise2(at * 1.7);
  let reach = u_frost * 3.4 * (0.82 + 0.3 * n);
  let fm = (1.0 - smoothstep(reach - 0.4, reach, r)) * step(0.001, u_frost);
  let wm = u_warm;
  let along = (u_sx - at.x) / max(u_tl, 0.01);
  let half = 0.42 + 0.22 * noise2(vec2f(at.x * 2.3, 7.0)) + 0.1 * noise2(at * 6.0);
  let band = 1.0 - smoothstep(half - 0.08, half, abs(at.y - u_sy));
  let tm = (1.0 - smoothstep(u_track - 0.06, u_track, along + 0.08 * n)) * smoothstep(-0.12 - 0.1 * n, 0.0, along) * band * step(0.001, u_track);
  let dry = smoothstep(u_wx, u_wx + 0.35 + 0.3 * n, at.x);
  let rime = layer(1, at) * dry;
  let warm = layer(2, at) * dry;
  let trail = layer(3, at) * dry;
  var c = rime * fm;
  c = trail * tm + c * (1.0 - trail.a * tm);
  c = warm * wm + c * (1.0 - warm.a * wm);
  let tw = step(0.985, hash2(floor(at * 22.0))) * (0.5 + 0.5 * sin(u_time * 2.3 + hash2(floor(at * 22.0) + 3.1) * 40.0));
  // (rime gives back the light a little brighter than sand: it reads white by night too)
  emission = (vec3f(0.12, 0.14, 0.16) + vec3f(0.5, 0.56, 0.62) * tw) * rime.a * fm + vec3f(0.1, 0.12, 0.14) * trail.a * tm;
  return c;
}
