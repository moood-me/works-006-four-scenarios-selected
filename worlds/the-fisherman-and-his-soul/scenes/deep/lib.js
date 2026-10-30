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
    sand: { at: [-0.62, 4.22], on: [-0.62, 4.22, 0.4], do: 'seated', turn: 160 },
    standing: { at: [-0.75, 3.25], turn: 150 },
  },
  mermaid: {
    sand: { at: [0.58, 4.22], on: [0.58, 4.22, 0.4], do: 'seated', turn: 200 },
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
// The deep's pieces (the game's contract, game.md «Stage 5 — pieces»; notes.md «Pieces»): played by the world's
// `beats` from the script. `film(scene)` → {name: {from, after, run}}.
function film(scene) {
  const P = kit.pieces;
  // the two on the slab, or he standing before her; turned half to each other; their looks
  const pose = at => {
    const st = { fisherman_at: at, mermaid_at: 'sand', fisherman_here: true, mermaid_here: true };
    return { fisherman_at: at, ...place(at, st), mermaid_turn: turnOf('mermaid', 'sand', st), fisherman_look: 'mermaid', mermaid_look: 'fisherman' };
  };
  const BASE = { hands: false, years: false, dusk: 0, far_light: 0, mermaid_near: 0, fisherman_reach: null, mermaid_reach: null, mermaid_do: 'seated' };
  const film = {
    deep_song: {
      from: () => ({ ...BASE, ...pose('sand'), ...P.CAM0, camera_pitch: 35, camera_z: -0.3 }),
      run: async s => {
        P.loop(s, 'mermaid', 'sing');
        // the camera comes down from the light of the surface to the two
        await s.all(s.move('camera_pitch', 0, { over: 5 }), s.move('camera_z', 0, { over: 5 }));
        // the two of them on the sand, both whole: she sings, he listens (М4 is played on this, hands off)
        P.frame(s, P.shot('mermaid', 'full', [0.66, 0.5]), 2.5);
        await P.tell(s, 'deep_song:sing', 3);
      },
    },
    dance_deep: {
      from: () => ({ ...BASE, ...pose('standing'), ...P.shot('fisherman', 'medium', [0.45, 0.45]) }),
      run: async s => {
        const her = s.person('mermaid');
        // he dances on the sand, clumsily; she laughs
        await s.person('fisherman').do('clumsy_dance');
        await P.tell(s, 'dance_deep:dance', 0.5);
        her.mood('laugh');
        await her.do('laugh');
        await P.tell(s, 'dance_deep:laugh', 0.5);
        // then she looks at his feet, and hides her face
        P.frame(s, P.shot('mermaid', 'close', [0.5, 0.42]), 1.5);
        her.mood('sad');
        her.look('fisherman#feet');
        await P.tell(s, 'dance_deep:feet', 2.5);
        P.loop(s, 'mermaid', 'hide_face');
        await P.tell(s, 'dance_deep:hide', 3);
      },
    },
    deep_dusk: {
      from: () => ({ ...BASE, dusk: 1, far_light: 0.01, ...pose('sand'), ...P.CAM0 }),
      run: async s => {
        if (s.get('sing')) P.loop(s, 'mermaid', 'sing');
        s.set('hands', !s.get('sing'));
        await P.tell(s, 'deep_dusk:begin', 3);
        // the camera looks up: the warm light far above going along
        s.move('camera_pitch', 32, { over: 4 });
        await s.move('far_light', 0.6, { over: 6, ease: 'linear' });
        await P.tell(s, 'deep_dusk:light', 2);
      },
    },
    palm_eyes: {
      after: 'deep_dusk',
      from: () => ({ ...BASE, dusk: 1, far_light: 0.6, ...pose('sand'), ...P.shot('mermaid', 'close', [0.6, 0.45]) }),
      run: async s => {
        P.open(s, P.shot('mermaid', 'close', [0.6, 0.45]));
        s.move('far_light', 1, { over: 3, ease: 'linear' });
        P.loop(s, 'mermaid', 'sing');
        await s.wait(2);
        // she lays her palm over his eyes and sings on
        s.set('hands', false);
        s.set('mermaid_reach', { l: 'fisherman#head' });
        await P.tell(s, 'palm_eyes:palm', 4);
      },
    },
    white_hair: {
      from: () => ({ ...BASE, years: true, ...pose('sand'), ...P.shot('fisherman', 'close', [0.4, 0.42]) }),
      run: async s => {
        await s.wait(1.5);
        // she touches his hair
        s.set('mermaid_reach', { l: 'fisherman#head' });
        await P.tell(s, 'white_hair:touch', 4);
        s.set('mermaid_reach', null);
        await s.wait(1);
      },
    },
    hands_years: {
      after: 'white_hair',
      from: () => ({ ...BASE, years: true, ...pose('sand'), ...P.shot('fisherman#hand_l', 'close', [0.5, 0.5]) }),
      run: async s => {
        P.open(s, P.shot('fisherman#hand_l', 'close', [0.5, 0.5]));
        // who takes whose hand first: «слово» — he hers; «даром» — she his, before he reaches
        if (s.get('first') === 'she') s.set('mermaid_reach', { r: 'fisherman#hand_l' });
        else s.set('fisherman_reach', { l: 'mermaid#hand_r' });
        await s.wait(1.5);
        s.set('hands', true);
        await P.tell(s, 'hands_years:hand', 1);
        if (s.get('sing')) P.loop(s, 'mermaid', 'sing');
        else {
          // (she begins and stops)
          P.loop(s, 'mermaid', 'sing');
          await s.wait(2);
          s.set('mermaid_do', 'seated');
        }
        P.frame(s, P.shot('mermaid', 'medium', [0.6, 0.45]), 2);
        await s.wait(3);
      },
    },
  };
  return film;
}
return { film, PLACES, OTHER, turnOf, place, fish };
