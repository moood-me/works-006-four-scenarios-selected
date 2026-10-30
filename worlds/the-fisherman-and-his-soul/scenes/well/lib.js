// What the well's elements share: a fir painted flat, in the world's plain style — a short trunk and tiers of
// branches, each tier a wide low triangle with a ragged hem, a darker underside; in metres, its foot at the origin,
// `h` tall. `seed` makes each kind its own (how many tiers, how ragged, how it leans)
function fir(g, h, seed, colors) {
  const hash = (n, s) => anim.hash(n, seed * 31 + s);
  const tiers = 8 + Math.floor(4 * hash(0, 1));
  g.fillStyle = colors.trunk;
  g.fillRect(-0.016 * h, -0.2 * h, 0.032 * h, 0.2 * h);
  for (let i = 0; i < tiers; i++) {
    const u = i / tiers;
    const top = -h * (0.16 + 0.84 * (i + 1) / tiers) - 0.06 * h;
    const foot = -h * (0.1 + 0.84 * u);
    const half = h * (0.22 * (1 - u) + 0.03) * (0.85 + 0.3 * hash(i, 2));
    const lean = h * 0.03 * (hash(i, 3) - 0.5);
    g.fillStyle = colors.under;
    g.beginPath();
    g.moveTo(lean, top);
    g.lineTo(half + lean, foot);
    g.lineTo(-half + lean, foot);
    g.closePath();
    g.fill();
    // the tier's lit top and its ragged hem: teeth along the foot
    g.fillStyle = colors.body;
    g.beginPath();
    g.moveTo(lean, top);
    g.lineTo(half + lean, foot - 0.02 * h);
    const teeth = 5 + Math.floor(4 * hash(i, 4));
    for (let k = teeth; k >= 0; k--) {
      const x = -half + (2 * half * k) / teeth + lean;
      g.lineTo(x, foot - 0.02 * h - (k % 2 ? 0.045 * h * (0.5 + hash(i * 9 + k, 5)) : 0));
    }
    g.lineTo(-half + lean, foot - 0.02 * h);
    g.closePath();
    g.fill();
  }
}
// the hours (hours.md): the numbers each word of `time` sets
const TIME = {
  midnight: { dusk: 0, dawn: 0 },
  evening: { dusk: 1, dawn: 0 },
  dawn: { dusk: 0, dawn: 1 },
};
// the dance's circle round the well (its centre, metres; its radius), a lap's seconds, the steps a lap is moved in
const ROUND = { at: [0.9, 7.5], r: 1.3, lap: 16, steps: 8 };
// The well's pieces (the game's contract, game.md «Stage 5 — pieces»; notes.md «Pieces»): played by the world's
// `beats` from the script. `film(scene)` → {name: {from, after, run}}.
function film(scene) {
  const P = kit.pieces;
  const RIM = [0.34, 7.29, 0.8];
  const DO0 = { fisherman_do: null, witch_do: null, velvet_do: null, fisherman_reach: null, witch_reach: null, witch_with: null };
  // the night of the dance and the talk: the Witch on the rim, the Fisherman before her with his lantern, the man in
  // black by his fir; their looks
  const SITE = { round: false, stumble: 0, knife_ground: false, witch_on: RIM, witch_do: 'seated', witch_turn: 250, witch_a: 0.34, witch_d: 7.29,
    fisherman_a: -0.98, fisherman_d: 6.81, fisherman_turn: 110, fisherman_with: ['lantern'], fisherman_look: 'witch', witch_look: 'fisherman',
    velvet_a: -2.4, velvet_d: 5.6, velvet_turn: 150, velvet_look: 'fisherman', velvet_do: 'hands_behind' };
  // the man in black: out from behind the last firs on the glade's near left edge (where the camera's side sees his
  // face, and the Fisherman's as he turns to him), and back into the wood there
  const VELVET = [-2.4, 5.6], FROM_WOOD = [-3.6, 4.4], INTO_WOOD = [[-3.6, 4.4], [-5.6, 3.4]];
  // where the Witch pulls him to, before the man: he turned to him (his face, his hand at his brow seen), she beside him
  const PULLED = { fisherman_a: -0.9, fisherman_d: 6.6, fisherman_turn: 236, witch_a: -0.25, witch_d: 7.0, witch_turn: 240 };
  const HIS = [-0.98, 6.81];
  // where the Witch goes back to after the dance falls apart: by the rim, on her feet; where he stands then, before her
  // on her left, turned to her (the two of them in one shot: the choice is his — his face must be in the frame)
  const BY_RIM = [0.05, 6.75];
  const BEFORE = { fisherman_a: -0.85, fisherman_d: 6.55, fisherman_turn: 100, witch_turn: 260 };
  // the dance seen near: the operator on the well, the circle and the two of them filling the frame (the well under a
  // quarter of the frame's height), the moon's glade round them
  const ROUND_SHOT = P.shot('well', 0.23, [0.5, 0.6]);
  // the two after the dance: the Witch a little right of the middle, he on her left, both whole
  const TWO = P.shot('witch', 'full', [0.64, 0.45]);
  // the sign before the man in black: on him, waist up — his face and his hand
  const SIGN = P.shot('fisherman', 'medium', [0.55, 0.42]);
  const film = {
    well_evening: {
      from: () => ({ ...TIME.evening, time: 'evening', ...SITE, ...DO0, witch_do: 'swing_feet', witch_on: RIM, fisherman_with: ['lantern'],
        fisherman_a: 0.2, fisherman_d: 1.2, fisherman_turn: 0, fisherman_look: null, ...P.CAM0 }),
      run: async s => {
        // he comes up the slabs with his lantern and stops before her
        await P.go(s, 'fisherman', [[0.0, 4.0], HIS], 110);
        s.person('fisherman').look('witch');
        P.frame(s, P.shot('fisherman', 'full', [0.4, 0.44]), 2);
        await P.tell(s, 'well_evening:there', 2);
      },
    },
    long_look: {
      after: 'well_evening',
      from: () => ({ ...TIME.evening, time: 'evening', ...SITE, ...DO0, witch_do: 'swing_feet', ...P.shot('witch', 'close', [0.5, 0.42]) }),
      run: async s => {
        P.open(s, P.shot('witch', 'close', [0.5, 0.42]));
        s.person('witch').mood('smile');
        await s.wait(3.5);
        await P.tell(s, 'long_look:end', 0.5);
      },
    },
    dance: {
      from: () => ({ ...TIME.midnight, time: 'midnight', ...SITE, ...DO0, velvet_here: false, witch_on: null, witch_with: ['tambourine_hand'],
        fisherman_with: null, round_angle: 0, ...ROUND_SHOT }),
      run: async s => {
        s.set('velvet_here', false);
        P.loop(s, 'witch', 'dance_tambourine');
        P.loop(s, 'fisherman', 'dance_round');
        s.set('round', true);
        await P.tell(s, 'dance:begin', 8);
      },
    },
    velvet: {
      after: 'dance',
      from: () => ({ ...TIME.midnight, time: 'midnight', ...SITE, ...DO0, witch_on: null, witch_with: ['tambourine_hand'], fisherman_with: null,
        witch_do: 'dance_tambourine', fisherman_do: 'dance_round', round: true, ...ROUND_SHOT }),
      run: async s => {
        P.open(s, { round: true, ...ROUND_SHOT });
        // the man in black steps out by the last fir — the camera on him, pale, watching
        s.set('velvet_here', true);
        s.set('velvet_a', FROM_WOOD[0]);
        s.set('velvet_d', FROM_WOOD[1]);
        P.frame(s, P.shot('velvet', 'full', [0.4, 0.5]), 1.5);
        await P.go(s, 'velvet', [VELVET], 150);
        await s.wait(1);
        // the dance stops; she pulls him before the man
        s.set('round', false);
        await P.cut(s, { ...PULLED, ...P.shot('witch', 'medium', [0.4, 0.42]) });
        s.person('witch').look('velvet');
        s.person('fisherman').look('velvet');
        if (s.get('stumbled')) s.person('witch').mood('laugh');
        await s.person('witch').do('pull_hands');
        await P.tell(s, 'velvet:bow', 0.5);
        // his pale face, still, toward us and the glade
        s.person('velvet').look(null);
        P.frame(s, P.shot('velvet', 'close', [0.5, 0.4]), 2);
        await s.wait(2);
      },
    },
    sign_velvet: {
      after: 'velvet',
      from: () => ({ ...TIME.midnight, time: 'midnight', ...SITE, ...DO0, witch_on: null, witch_with: ['tambourine_hand'], fisherman_with: null,
        velvet_here: true, ...PULLED, ...SIGN }),
      run: async s => {
        P.open(s, { ...PULLED, ...SIGN });
        // he makes the sign (his face and his hand, turned to the man); the man in black turns and walks into the wood
        s.person('fisherman').look('velvet');
        await s.person('fisherman').do('sign');
        await P.tell(s, 'sign_velvet:sign', 0.5);
        // the man turns away into the wood, on the left, as the two of them are seen whole (the Witch's cry is theirs;
        // following him, the firs filled the frame)
        P.frame(s, P.shot('fisherman', 'full', [0.6, 0.5]), 1.2);
        await P.go(s, 'velvet', INTO_WOOD);
        s.set('velvet_here', false);
        await P.tell(s, 'sign_velvet:gone', 0.3);
        // she cries out; the dance is broken; she goes back to the rim, breathing hard
        s.person('witch').mood('afraid');
        await P.tell(s, 'sign_velvet:cry', 1);
        s.set('witch_with', null);
        await P.go(s, 'witch', [BY_RIM], 250);
        P.loop(s, 'witch', 'pant');
      },
    },
    broken: {
      after: 'sign_velvet',
      from: () => ({ ...TIME.midnight, time: 'midnight', ...SITE, ...DO0, witch_on: null, witch_a: BY_RIM[0], witch_d: BY_RIM[1], witch_do: 'pant',
        fisherman_with: null, velvet_here: false, round: false, ...BEFORE, fisherman_do: 'stand', ...TWO }),
      run: async s => {
        // (he is put before her at once, wherever the dance left him: a cut — the shot is the two of them)
        P.open(s, { round: false, ...BEFORE, ...TWO });
        s.person('fisherman').do('stand', { loop: true });
        s.person('fisherman').look('witch');
        s.person('witch').mood('angry');
        P.loop(s, 'witch', 'pant');
        await s.wait(2.5);
        s.person('witch').do('stand', { loop: true });
        s.person('witch').look('fisherman');
        await P.tell(s, 'broken:end', 1);
      },
    },
    demand: {
      after: 'broken',
      from: () => ({ ...TIME.midnight, time: 'midnight', ...SITE, ...DO0, witch_on: null, witch_a: BY_RIM[0], witch_d: BY_RIM[1], fisherman_with: null,
        velvet_here: false, ...BEFORE, ...P.shot('witch', 'close', [0.5, 0.42]) }),
      run: async s => {
        P.open(s, P.shot('witch', 'close', [0.5, 0.42]));
        const her = s.person('witch');
        her.look('fisherman');
        await P.tell(s, 'demand:promise', 3);
        // she leans to him and whispers
        await P.go(s, 'witch', [[-0.4, 6.75]], 255);
        P.frame(s, P.shot('fisherman', 'medium', [0.6, 0.42]), 1.5);
        await her.do('whisper');
        await P.tell(s, 'demand:whisper', 0.5);
        // throws the knife down at his feet
        s.set('witch_with', ['knife']);
        await her.do('throw_down');
        s.set('witch_with', null);
        s.set('knife_ground', true);
        await P.tell(s, 'demand:knife', 1.5);
        // and turns away to the well
        await P.go(s, 'witch', [[0.3, 6.6]], 60);
        await P.tell(s, 'demand:away', 1);
      },
    },
    dance_dawn: {
      after: 'broken',
      from: () => ({ ...TIME.midnight, time: 'midnight', ...SITE, ...DO0, witch_on: null, witch_a: BY_RIM[0], witch_d: BY_RIM[1], fisherman_with: null,
        velvet_here: false, ...BEFORE, ...ROUND_SHOT }),
      run: async s => {
        P.open(s, ROUND_SHOT);
        const her = s.person('witch');
        her.do('stand', { loop: true });
        await s.wait(1.5);
        her.mood('laugh');
        await her.do('laugh');
        await P.tell(s, 'dance_dawn:laugh', 0.5);
        // the two dance slowly round the well till the moon pales
        s.set('witch_with', []);
        P.loop(s, 'witch', 'dance_round');
        P.loop(s, 'fisherman', 'dance_round');
        s.set('round', true);
        await s.move('dawn', 1, { over: 8 });
        s.set('round', false);
        s.set('time', 'dawn');
        await P.tell(s, 'dance_dawn:dawn', 0.5);
        // at dawn she holds out the knife; he takes it; her hand stays on his
        her.do('stand', { loop: true });
        s.person('fisherman').do('stand', { loop: true });
        s.set('witch_with', ['knife']);
        await her.do('hold_out');
        s.set('witch_with', null);
        s.set('fisherman_with', ['knife']);
        s.set('witch_reach', { r: 'fisherman#hand_r' });
        P.frame(s, P.shot('fisherman#hand_r', 'close', [0.5, 0.5]), 2);
        await P.tell(s, 'dance_dawn:hand', 2.5);
      },
    },
  };
  return film;
}
return { film, fir, TIME, ROUND };
