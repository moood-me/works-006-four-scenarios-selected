// What the stone's elements and its script share.
//
// The places of its people (metres; the viewer on the pier at 0, the water at -0.63): `at` — [across, distance,
// elevation over the bay's floor there]; `on` — a seat (her place on the stone's top); `do` — what they do there; `turn`
// — where they face when the other is not here (with the other here, `turnOf`).
//   fisherman: boat — standing in his boat by its bow, over the boards; shallows — knee-deep on the sandbar at the
//     stone's right front (1.1); water — in the deep water before the stone to the shoulders (3С.1);
//   mermaid: stone — sitting on the edge of its flat top, her tail hanging down its front; water — to the shoulders in
//     the water at its left front; net — to the shoulders in the water off the boat's bow, in his net (П.3).
const PLACES = {
  fisherman: {
    boat: { at: [-1.88, 5.59, 0], turn: 130 },
    shallows: { at: [2.4, 5.8, 0], turn: 225 },
    water: { at: [0.2, 4.9, 0.6], turn: 150 },
  },
  mermaid: {
    stone: { at: [0.78, 6.4, 0], on: [0.78, 6.4, 3.15], do: 'seated', turn: 215 },
    water: { at: [0.1, 5.6, 0.77], turn: 200 },
    net: { at: [-0.5, 5.7, 0.77], turn: 240 },
  },
};
const OTHER = { fisherman: 'mermaid', mermaid: 'fisherman' };
// where one faces at their place: half toward the other (when the other is here), half toward the viewer — so that both
// faces are seen as they look at each other
function turnOf(id, at, state) {
  const p = PLACES[id][at];
  const other = OTHER[id];
  const q = PLACES[other][state[`${other}_at`]];
  if (!q || state[`${other}_here`] === false) return p.turn;
  const b = Math.atan2(q.at[0] - p.at[0], q.at[1] - p.at[1]) * 180 / Math.PI;
  const d = ((180 - b + 540) % 360) - 180;
  return (b + d / 2 + 360) % 360;
}
// the keys that put one at a named place at once
function place(id, at, state) {
  const p = PLACES[id][at];
  if (!p) return null;
  const other = OTHER[id];
  return {
    [`${id}_a`]: p.at[0], [`${id}_d`]: p.at[1], [`${id}_e`]: p.at[2], [`${id}_placed`]: at,
    [`${id}_on`]: p.on ?? null, [`${id}_do`]: p.do ?? null, [`${id}_turn`]: turnOf(id, at, state),
    [`${id}_look`]: state[`${other}_here`] === false ? null : other,
  };
}
// the boat's ribs from the stem to the stern: [along (− toward the bow), half its beam, its rail and its keel over the
// water], and one rib's points from the left rail down round the keel up to the right rail ([x, y, z] of the hull's form:
// x across, y up, z toward the bow)
const RIBS = [[-1.7, 0.03, 0.62, 0.2], [-1.3, 0.36, 0.55, -0.12], [-0.7, 0.58, 0.5, -0.24], [0, 0.66, 0.47, -0.27],
  [0.7, 0.62, 0.48, -0.25], [1.3, 0.55, 0.52, -0.2], [1.6, 0.5, 0.54, -0.15]];
function rib([d, w, rail, keel]) {
  const H = rail - keel;
  const k = [[1, 0], [0.97, 0.25], [0.85, 0.55], [0.55, 0.85], [0, 1]];
  const side = k.map(([x, y]) => [-w * x, rail - H * y, -d]);
  return [...side, ...side.slice(0, -1).reverse().map(([x, y, z]) => [-x, y, z])];
}
// rings on the water round someone standing in it (seen from above: circles), each a layer that widens and fades
// (their animate: `ringsMove`)
function rings(e) {
  for (let k = 0; k < 3; k++) {
    e.layer(`ring${k}`, { pivot: [0, 0], box: [-0.8, -0.8, 0.8, 0.8] }, g => {
      g.strokeStyle = 'rgba(214, 232, 240, 0.55)';
      g.lineWidth = 0.025;
      g.beginPath();
      g.arc(0, 0, 0.62, 0, Math.PI * 2);
      g.stroke();
    });
  }
}
// each ring widens and fades, a third of the way behind the one before, slowly; none while `shown` is false
const RINGS = ['ring0', 'ring1', 'ring2'];
function ringsMove(e, shown, phase) {
  for (let k = 0; k < 3; k++) {
    const u = (e.t / 4.5 + k / 3 + phase) % 1;
    const ring = e.layer(RINGS[k]);
    ring.scale = 0.45 + 0.55 * u;
    ring.alpha = shown ? Math.sin(Math.PI * u) * (1 - u) : 0;
  }
}
// the hours (hours.md): the numbers each word of `light` sets
const LIGHT = {
  night: { dusk: 0, dawn: 0 },
  evening: { dusk: 1, dawn: 0 },
  dawn: { dusk: 0, dawn: 1 },
};
// The stone's pieces (the game's contract, game.md «Stage 5 — pieces»; notes.md «Pieces»): played by the world's
// `beats` from the script. `film(scene)` → {name: {from, after, run}}. Each begins at its `from` (unless it follows the
// piece named in `after`), tells its moments (`<piece>:<moment>`), and ends in a living pose.
function film(scene) {
  const P = kit.pieces;
  // both people at their places at once (place's keys, turned to each other while both are here)
  const pose = (fAt, mAt, mHere = true) => {
    const st = { fisherman_at: fAt, mermaid_at: mAt, mermaid_here: mHere, fisherman_here: true };
    return { fisherman_at: fAt, ...place('fisherman', fAt, st), ...(mAt ? { mermaid_at: mAt, ...place('mermaid', mAt, st) } : {}) };
  };
  const BOAT = { boat: true, lantern: 1, net: 'heap', haul: 1, heel: 0, boat_tilt: 0, fish: 0, knot: 0, pass_light: 0, deep_lights: false, far_light: 0 };
  const NOBOAT = { boat: false, lantern: 0, net: 'heap', haul: 1, heel: 0, boat_tilt: 0, fish: 0, knot: 0, pass_light: 0, deep_lights: false, far_light: 0 };
  const DO0 = { fisherman_do: null, mermaid_do: null, fisherman_reach: null, mermaid_reach: null, fisherman_on: null, mermaid_steps: false };
  // his seat on the thwart (in the boat's frame, as the hull is laid: the thwart 0.55 m sternward, 0.3 over the water —
  // 0.2 behind its middle: the cast's `seated` puts the hips that far before the point)
  const THWART = { on: 'boat', at: [0, 0.75, 0.3] };
  // in his net (П.3–П.4): she turned to us, more than to him (her face seen from our side, not her hair); the two
  // framed together as he holds the net and chooses — from the pier's end, the camera's own keys: an operator on someone
  // in the water stands its eye over the bay's floor, at the water's face, under the net
  const IN_NET = { mermaid_turn: 195 };
  const HOLD = { ...P.CAM0, camera_x: -0.9, camera_z: 3.6, camera_yaw: -8, camera_look: 0.1 };
  const film = {
    // ── Prologue «Сеть» ──
    night: {
      from: () => ({ ...LIGHT.night, light: 'night', ...BOAT, ...pose('boat', 'stone', false), ...DO0, ...P.CAM0, camera_x: 0.6, camera_z: -1.2, camera_look: -0.04 }),
      run: async s => {
        await s.wait(1);
        await s.all(s.move('camera_z', 1.2, { over: 6 }), s.move('camera_x', -0.6, { over: 6 }));
        // he casts the net: over the bow, a length out on the water
        s.set('haul', 0);
        s.set('net', 'over');
        await P.tell(s, 'night:cast', 3);
        P.frame(s, P.shot('fisherman', 'medium', [0.45, 0.42]), 2);
        P.loop(s, 'fisherman', 'haul_net');
        s.move('heel', 0.4, { over: 2 });
        await P.tell(s, 'night:rope', 3);
      },
    },
    in_net: {
      after: 'night',
      from: () => ({ ...LIGHT.night, light: 'night', ...BOAT, net: 'over', haul: 1, heel: 0.3, ...pose('boat', 'net'), ...DO0, fisherman_do: 'haul_net',
        ...IN_NET, ...HOLD }),
      run: async s => {
        P.open(s, film.in_net.from());
        const her = s.person('mermaid'), him = s.person('fisherman');
        s.set('net', 'over');
        s.move('haul', 1, { over: 1.5 });
        await s.wait(2.5);
        // she opens her eyes, afraid, and struggles in the net
        her.mood('afraid');
        P.loop(s, 'mermaid', 'struggle');
        await P.tell(s, 'in_net:wake', 3);
        // he holds the net's edge by her hand, and looks at her
        him.do('stand', { loop: true });
        s.move('heel', 0, { over: 1.5 });
        him.reach({ r: 'net_over#knot' });
        him.look('mermaid');
        her.look('fisherman');
        // the two of them: he in the boat on the left, holding the net's edge; she in it, her face to us
        P.frame(s, HOLD, 2);
        await P.tell(s, 'in_net:hold', 4);
      },
    },
    go_word: {
      after: 'in_net',
      from: () => ({ ...LIGHT.night, light: 'night', ...BOAT, net: 'over', ...pose('boat', 'net'), ...DO0, ...IN_NET, fisherman_reach: { r: 'net_over#knot' }, knot: 1,
        ...HOLD }),
      run: async s => {
        P.open(s, film.go_word.from());
        const her = s.person('mermaid');
        her.do('stand', { loop: true });
        s.set('fisherman_reach', null);
        // she does not look back (looks: at him or, with `looks` false, away and down)
        her.look(s.get('looks') === false ? [-1.4, 7.6, -0.6] : [0.4, 8, -0.4]);
        s.set('mermaid_at', 'water');
        await s.wait(1.2);
        await s.move('mermaid_e', 0, { over: 2.5, ease: 'in' });
        s.set('mermaid_here', false);
        await P.tell(s, 'go_word:under', 1.5);
      },
    },
    go_free: {
      after: 'in_net',
      from: () => ({ ...LIGHT.night, light: 'night', ...BOAT, net: 'over', ...pose('boat', 'net'), ...DO0, ...IN_NET, fisherman_reach: { r: 'net_over#knot' }, knot: 1,
        ...HOLD }),
      run: async s => {
        P.open(s, film.go_free.from());
        const her = s.person('mermaid');
        her.do('stand', { loop: true });
        s.set('fisherman_reach', null);
        s.set('mermaid_at', 'water');
        // she lingers by the bow — looking at him (with `looks` false: not at him)
        her.look(s.get('looks') === false ? [1.6, 7.4, -0.3] : 'fisherman');
        await P.tell(s, 'go_free:linger', 4);
        // she goes; turns once
        her.look(null);
        await s.move('mermaid_a', 0.9, { over: 2 });
        her.look('fisherman');
        await her.do('look_back');
        await P.tell(s, 'go_free:turn', 1);
        await s.move('mermaid_e', 0, { over: 2.2, ease: 'in' });
        s.set('mermaid_here', false);
        await P.tell(s, 'go_free:under', 1);
      },
    },
    evenings: {
      from: () => ({ ...LIGHT.evening, light: 'evening', ...BOAT, ...pose('boat', 'stone'), ...DO0, mermaid_do: 'seated', ...P.CAM0 }),
      run: async s => {
        const him = s.person('fisherman'), her = s.person('mermaid');
        if (s.get('net_way') !== 'free') {
          // «за слово»: she sings on the stone looking at the water, he hauls the net full — twice over, evening into night
          her.look([0.2, 7.4, -0.6]);
          P.loop(s, 'mermaid', 'sing');
          P.loop(s, 'fisherman', 'haul_net');
          await P.tell(s, 'evenings:sing', 1);
          for (let k = 0; k < 2; k++) {
            s.set('net', 'over');
            s.set('haul', 0);
            s.set('fish', 0);
            await s.all(s.move('haul', 1, { over: 3.5 }), s.move('fish', 1, { over: 3.5 }), s.move('dusk', k ? 0 : 0.5, { over: 3.5 }));
            s.set('net', 'heap');
            await s.wait(0.8);
          }
          s.set('light', 'night');
        } else {
          // «даром»: the stone empty, he sits on the thwart till the dawn greys; then she, by herself, singing to him; then empty
          s.set('mermaid_here', false);
          s.set('fisherman_on', THWART);
          P.loop(s, 'fisherman', 'seated');
          await P.tell(s, 'evenings:empty', 1);
          await s.move('dusk', 0, { over: 3 });
          await s.move('dawn', 0.7, { over: 3 });
          s.set('mermaid_here', true);
          her.look('fisherman');
          P.loop(s, 'mermaid', 'sing');
          await P.tell(s, 'evenings:sing', 4);
          s.set('mermaid_here', false);
          await s.wait(1.5);
        }
        await P.tell(s, 'evenings:end', 1);
      },
    },
    // ── Chapter I ──
    ask_wife: {
      from: () => ({ ...LIGHT.night, light: 'night', ...NOBOAT, ...pose('shallows', 'stone'), fisherman_a: 3.9, fisherman_d: 4.3, fisherman_placed: 'shallows',
        ...DO0, mermaid_do: 'seated', ...P.CAM0 }),
      run: async s => {
        const him = s.person('fisherman');
        him.look('mermaid');
        // he wades in from the right and stops knee-deep on the sandbar
        await P.go(s, 'fisherman', [PLACES.fisherman.shallows.at], null, 'wade');
        s.set('fisherman_turn', turnOf('fisherman', 'shallows', { mermaid_at: 'stone' }));
        P.frame(s, P.shot('fisherman', 'full', [0.66, 0.44]), 2);
        await P.tell(s, 'ask_wife:there', 2);
      },
    },
    laugh_tail: {
      after: 'ask_wife',
      from: () => ({ ...LIGHT.night, light: 'night', ...NOBOAT, ...pose('shallows', 'stone'), ...DO0, mermaid_do: 'seated', ...P.shot('mermaid', 'close', [0.5, 0.42]) }),
      run: async s => {
        P.frame(s, P.shot('mermaid', 'close', [0.5, 0.42]), 1.2);
        P.loop(s, 'mermaid', 'laugh');
        await s.wait(1.2);
        s.set('splash', (Number(s.get('splash')) || 0) + 1);
        await P.tell(s, 'laugh_tail:splash', 2.5);
      },
    },
    dive: {
      after: 'laugh_tail',
      from: () => ({ ...LIGHT.night, light: 'night', ...NOBOAT, ...pose('shallows', 'stone'), ...DO0, ...P.shot('mermaid', 'medium', [0.5, 0.45]) }),
      run: async s => {
        P.open(s, film.laugh_tail.from());
        P.frame(s, P.shot('mermaid', 'medium', [0.5, 0.45]), 1.2);
        P.loop(s, 'mermaid', 'laugh');
        await s.wait(1.2);
        // she slides off the stone into the water
        s.set('mermaid_do', null);
        s.set('mermaid_at', 'water');
        s.set('splash', (Number(s.get('splash')) || 0) + 1);
        await s.move('mermaid_e', 0, { over: 2, ease: 'in' });
        s.set('mermaid_here', false);
        await P.tell(s, 'dive:under', 1.5);
      },
    },
    // ── Chapter III «Без него»: he does not rise ──
    rise: {
      from: () => ({ ...LIGHT.night, light: 'night', ...NOBOAT, far_light: 0.5, ...pose('water', null), mermaid_here: false, ...DO0, fisherman_look: 'far_lamp', ...P.CAM0 }),
      run: async s => {
        P.open(s, film.dive.from());
        s.set('mermaid_here', false);
        s.set('fisherman_look', 'far_lamp');
        s.move('far_light', 1, { over: 9, ease: 'linear' });
        await P.tell(s, 'rise:watch', 3);
        P.frame(s, P.shot('fisherman', 'close', [0.5, 0.42]), 2);
        await s.wait(3.5);
        P.frame(s, P.CAM0, 2);
        await s.wait(1);
        // pulled under from below
        await s.move('fisherman_e', -0.2, { over: 1.2, ease: 'in' });
        s.set('fisherman_here', false);
        await P.tell(s, 'rise:pulled', 2);
      },
    },
    // ── Chapter IV: the widow's boat at sea ──
    boat_out: {
      from: () => ({ ...LIGHT.night, light: 'night', ...BOAT, ...pose('boat', null), mermaid_here: false, ...DO0, ...P.CAM0, camera_x: -0.4 }),
      run: async s => {
        s.set('mermaid_here', false);
        await s.wait(1.5);
        s.set('haul', 0);
        s.set('net', 'over');
        await P.tell(s, 'boat_out:cast', 2);
        P.frame(s, P.shot('fisherman', 'medium', [0.45, 0.42]), 2);
        P.loop(s, 'fisherman', 'haul_net');
        await s.wait(2.5);
      },
    },
    keel_light: {
      after: 'boat_out',
      from: () => ({ ...LIGHT.night, light: 'night', ...BOAT, net: 'over', haul: 1, ...pose('boat', null), mermaid_here: false, ...DO0, fisherman_do: 'haul_net',
        ...P.shot('fisherman', 'medium', [0.45, 0.42]) }),
      run: async s => {
        P.open(s, film.keel_light.from());
        s.set('fish', Number(s.get('fish')) || 1);
        P.loop(s, 'fisherman', 'haul_net');
        await s.wait(2);
        P.frame(s, P.shot('keel_light', 'wide', [0.5, 0.55]), 2);
        await s.wait(1.5);
        // a pale light passes under the keel
        await s.move('pass_light', 1, { over: 1.8 });
        await P.tell(s, 'keel_light:light', 0.6);
        await s.move('pass_light', 0, { over: 2.2 });
        P.frame(s, P.shot('fisherman', 'medium', [0.45, 0.42]), 2);
        await s.wait(1);
      },
    },
    // ── «Два огня»: the last shot ──
    two_lights: {
      from: () => ({ ...LIGHT.night, light: 'night', ...NOBOAT, deep_lights: true, far_light: 0.5, ...pose('water', null), fisherman_here: false, mermaid_here: false, ...DO0,
        ...P.CAM0, camera_z: -0.6 }),
      run: async s => {
        s.set('fisherman_here', false);
        s.set('mermaid_here', false);
        await s.all(s.move('far_light', 1, { over: 9, ease: 'linear' }), s.move('camera_z', 0.6, { over: 9 }));
        await P.tell(s, 'two_lights:end', 1);
      },
    },
  };
  return film;
}
return { film, LIGHT, PLACES, OTHER, turnOf, place, RIBS, rib, rings, ringsMove };
