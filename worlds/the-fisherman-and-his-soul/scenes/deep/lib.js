// What the deep's elements and its script share.
//
// The places of its people (metres; the viewer at 0 on the sand, the slab they sit on 4.2 m ahead): `at` — [across,
// distance]; `on` — a seat (on the low slab, its top 0.4 over the sand); `do` — what they do there; `turn` — where they
// face when the other is not here (with the other here, `turnOf`: half toward the other, half toward the viewer).
//   fisherman: sand — sitting on the slab's left, beside her (2.1, 3С.1, «Два огня»); standing — on his feet on the
//     sand before her, a little left (2.5, the dance under the water: he stands, she looks at his feet);
//   mermaid: sand — sitting on the slab's right, her tail hanging down its front (always: she never stands).
const PLACES = {
  fisherman: {
    sand: { at: [-0.42, 4.22], on: [-0.42, 4.22, 0.4], do: 'seated', turn: 160 },
    standing: { at: [-0.6, 3.25], turn: 150 },
  },
  mermaid: {
    sand: { at: [0.38, 4.22], on: [0.38, 4.22, 0.4], do: 'seated', turn: 200 },
  },
};
const OTHER = { fisherman: 'mermaid', mermaid: 'fisherman' };
// where one faces at their place: half toward the other (when the other is here), half toward the viewer — so that both
// faces are seen as they look at each other
function turnOf(id, at, state) {
  const p = PLACES[id][at];
  const other = OTHER[id];
  const q = PLACES[other][state[`${other}_at`] ?? 'sand'];
  if (!q || state[`${other}_here`] === false) return p.turn;
  const b = Math.atan2(q.at[0] - p.at[0], q.at[1] - p.at[1]) * 180 / Math.PI;
  const d = ((180 - b + 540) % 360) - 180;
  return (b + d / 2 + 360) % 360;
}
// the keys that put the Fisherman at a named place at once
function place(at, state) {
  const p = PLACES.fisherman[at];
  if (!p) return null;
  return {
    fisherman_a: p.at[0], fisherman_d: p.at[1], fisherman_placed: at,
    fisherman_on: p.on ?? null, fisherman_do: p.do ?? null, fisherman_turn: turnOf('fisherman', at, state),
  };
}
// a small fish seen from the side, its head at +x when `dir` is 1 (−1: turned the other way): a body of two curves, a
// forked tail, a fin on its back, a pale belly, a dark eye
function fish(g, x, y, len, dir, body, belly) {
  g.save();
  g.translate(x, y);
  g.scale(dir * len, len);
  g.fillStyle = body;
  g.beginPath();
  g.moveTo(0.5, 0);
  g.bezierCurveTo(0.35, -0.2, -0.15, -0.2, -0.32, 0);
  g.bezierCurveTo(-0.15, 0.17, 0.35, 0.17, 0.5, 0);
  g.closePath();
  g.fill();
  g.beginPath();
  g.moveTo(-0.28, 0);
  g.lineTo(-0.52, -0.16);
  g.lineTo(-0.46, 0);
  g.lineTo(-0.52, 0.16);
  g.closePath();
  g.fill();
  g.beginPath();
  g.moveTo(0.05, -0.15);
  g.lineTo(-0.12, -0.25);
  g.lineTo(-0.16, -0.12);
  g.closePath();
  g.fill();
  g.fillStyle = belly;
  g.beginPath();
  g.moveTo(0.42, 0.03);
  g.bezierCurveTo(0.25, 0.13, -0.1, 0.13, -0.26, 0.03);
  g.bezierCurveTo(-0.1, 0.06, 0.25, 0.06, 0.42, 0.03);
  g.closePath();
  g.fill();
  g.fillStyle = '#1d2a30';
  g.beginPath();
  g.arc(0.36, -0.03, 0.028, 0, Math.PI * 2);
  g.fill();
  g.restore();
}
return { PLACES, OTHER, turnOf, place, fish };
