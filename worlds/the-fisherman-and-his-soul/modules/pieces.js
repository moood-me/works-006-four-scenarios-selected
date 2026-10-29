// pieces — what the scenes' pieces share (pieces.md): the camera's keys at rest and a framed shot, a person's place's
// keys as a cut sets them, a moment told and held, a cut made ready first, a walk then a turn
const CAM0 = { camera_target: null, camera_shot: 'full', camera_frame: null, camera_glide: 1.5, camera_x: 0, camera_z: 0, camera_h: 0, camera_look: 0, camera_yaw: 0, camera_pitch: 0 };
return {
  CAM0,
  // a shot framed by the operator: on `target` ('id' | 'id#point'), `size` (wide/full/medium/close), its point at
  // `frame` ([x, y] of the frame; null — the operator's), over the base camera (the scene's own at rest unless said)
  shot(target, size = 'medium', frame = null, base = CAM0) {
    return { ...base, camera_target: target, camera_shot: size, camera_frame: frame };
  },
  // the keys that put `id` at its place `name` of PLACES at once (places.md) — as a piece's `from` or a cut sets them
  at(PLACES, id, name) {
    const p = PLACES[id]?.[name];
    if (!p) return {};
    const o = { [`${id}_at`]: name, [`${id}_placed`]: name, [`${id}_a`]: p.at[0], [`${id}_d`]: p.at[1], [`${id}_on`]: p.on ?? null };
    if (p.at.length > 2) o[`${id}_e`] = p.at[2];
    if (p.turn != null) o[`${id}_turn`] = p.turn;
    return o;
  },
  // a moment told (the game says its lines there), then held a while
  async tell(s, text, hold = 0) {
    s.tell(text);
    if (hold) await s.wait(hold);
  },
  // a cut to a shot made ready first (shown whole)
  async cut(s, values) {
    const next = s.shot(values);
    await s.until(() => next.ready);
    next.cut();
  },
  // what a piece that follows another needs of its own opening: its `from` values that differ now, set at once (a piece
  // played after the one before in the same opening is not cut to its `from` — beats.md); a camera's change is a cut
  open(s, values) {
    for (const [k, v] of Object.entries(values)) if (JSON.stringify(s.get(k)) !== JSON.stringify(v)) s.set(k, v);
  },
  // the camera's keys set (the operator glides there over `glide` seconds)
  frame(s, values, glide = 1.5) {
    s.set('camera_glide', glide);
    for (const [k, v] of Object.entries(values)) s.set(k, v);
  },
  // a walk along points at one's own pace, then a turn (and a motion of one's own as the gait, if said)
  async go(s, id, pts, turn = null, gait = null) {
    const p = s.person(id);
    if (gait) p.gait(gait);
    await p.walk(pts);
    if (gait) p.gait(null);
    if (turn != null) await p.turn(turn);
  },
  // a looped motion as what one does from now (at once)
  loop(s, id, motion) {
    return s.person(id).do(motion, { loop: true });
  },
};
