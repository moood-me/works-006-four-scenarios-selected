// What the potter's room shares: its walls' plaster (warm limewash gone a little smoky, a band of ochre along the foot),
// the people's named places (places.md) and the Fisherman's way from the bench to the shelf (М5, `carry`).
//   wall(g, seed, left, right, top) — in metres, its foot at y 0, `top` negative (the ceiling's height)
const PLASTER = '#d9cbb2';
const BAND = '#9a7a52';
function wall(g, seed, left, right, top) {
  g.save();
  g.beginPath();
  g.rect(left, top, right - left, -top + 0.02);
  g.clip();
  g.fillStyle = PLASTER;
  g.fillRect(left, top, right - left, -top + 0.02);
  // the plaster's grain: small worn flecks, a few centimetres, faint (big soft blots read as haze in the air, not as
  // a wall — the faces before it went dull)
  for (let i = 0; i < 90; i++) {
    const x = left + (right - left) * anim.hash(i, seed);
    const y = top + -top * anim.hash(i, seed + 1);
    const w = 0.02 + 0.06 * anim.hash(i, seed + 2);
    g.fillStyle = anim.hash(i, seed + 3) > 0.5 ? 'rgba(160, 140, 112, 0.22)' : 'rgba(240, 232, 214, 0.25)';
    g.fillRect(x, y, w, w * 0.5);
  }
  // smoke-darkened under the ceiling
  const smoke = g.createLinearGradient(0, top, 0, top + 0.6);
  smoke.addColorStop(0, 'rgba(90, 70, 50, 0.35)');
  smoke.addColorStop(1, 'rgba(90, 70, 50, 0)');
  g.fillStyle = smoke;
  g.fillRect(left, top, right - left, 0.6);
  g.fillStyle = BAND;
  g.fillRect(left, -0.3, right - left, 0.32);
  g.restore();
}
// the places: on the bench by the hearth (sat), before it (stand), lying on it asleep (lie: the seat), at the shelf, at
// the door, by the hearth, by the bed, kneeling by the daughter's pallet; the daughter on her pallet, behind her father
// (the seat point 0.2 m behind the seat's middle: the cast's `seated` puts the hips that far before it)
const SEAT = [-0.5, 4.37, 0.45];
// where he stands, asleep, to take the cup (3.4): by the shelf's near end, turned half to it and half to us
const AT_CUP = [0.15, 4.45];
const PLACES = {
  fisherman: {
    bench: { at: [-0.5, 4.17], turn: 180, on: SEAT },
    stand: { at: [-0.5, 3.45], turn: 160 },
    shelf: { at: [0.6, 4.45], turn: 0 },
    door: { at: [2.15, 1.65], turn: 90 },
  },
  potter: {
    shelf: { at: [1.05, 4.35], turn: 230 },
    hearth: { at: [-1.4, 4.3], turn: 200 },
    bed: { at: [2.1, 3.0], turn: 200 },
    door: { at: [2.05, 1.65], turn: 270 },
    by_daughter: { at: [-1.5, 3.4], turn: 270 },
  },
  daughter: {
    pallet: { at: [-2.1, 3.6], turn: 180 },
    behind: { at: [1.35, 4.65], turn: 210 },
    door: { at: [2.1, 2.3], turn: 250 },
  },
  soul: {
    door: { at: [2.15, 1.65], turn: 270 },
    shelf: { at: [0.6, 4.45], turn: 0 },
    over_girl: { at: [-1.5, 3.0], turn: 250 },
  },
};
// the way the cup is carried (М5): from before the bench to the shelf (to its right, behind it), `carry` 0 → 1
const CARRY = [[-0.5, 3.45], [0.6, 4.45]];
// The potter's room's pieces (the game's contract, game.md «Stage 5 — pieces»; notes.md «Pieces»): played by the
// world's `beats` from the script. `film(scene)` → {name: {from, after, run}}.
function film(scene) {
  const P = kit.pieces;
  const at = (id, name) => P.at(PLACES, id, name);
  const DO0 = { fisherman_do: null, potter_do: null, daughter_do: null, soul_do: null, fisherman_reach: null, potter_reach: null, carry: 0, cup_tilt: 0,
    fisherman_with: null, potter_with: null, door: 0, door_turn: 270 };
  // asleep: the Fisherman on the bench, the potter on his bed, the daughter on her pallet by the fire
  const BED = [2.15, 3.6, 0.45];
  const ASLEEP = { ...at('fisherman', 'bench'), fisherman_on: SEAT, fisherman_do: 'lie_bench', fisherman_mood: 'eyes_closed',
    potter_at: 'bed', potter_placed: 'bed', potter_a: BED[0], potter_d: BED[1], potter_on: BED, potter_turn: 180, potter_do: 'lie_bench', potter_mood: 'eyes_closed',
    ...at('daughter', 'pallet'), daughter_do: 'sleep_floor', daughter_mood: 'eyes_closed' };
  const film = {
    room_in: {
      from: () => ({ fire: 1, morning: 0, cup_at: 'shelf', ...DO0, ...at('fisherman', 'stand'), fisherman_with: ['lantern'], ...at('potter', 'shelf'),
        ...at('daughter', 'pallet'), daughter_do: 'sleep_floor', daughter_mood: 'eyes_closed', ...P.CAM0 }),
      run: async s => {
        P.loop(s, 'daughter', 'sleep_floor');
        // the potter shows the shelf, the cup on it
        s.person('potter').look('shelf#cup');
        s.person('fisherman').look('shelf#cup');
        await s.person('potter').do('hold_out');
        P.frame(s, P.shot('shelf#cup', 'close', [0.5, 0.5]), 2);
        await P.tell(s, 'room_in:cup', 3);
        // the Fisherman sits down on the bench, his hands under him
        P.frame(s, P.shot('fisherman', 'medium', [0.5, 0.45]), 2);
        for (const [k, v] of Object.entries(at('fisherman', 'bench'))) s.set(k, v);
        s.set('fisherman_with', null);
        P.loop(s, 'fisherman', 'hands_under');
        s.person('fisherman').look('potter');
        await P.tell(s, 'room_in:sat', 2);
      },
    },
    sleepwalk: {
      from: () => ({ fire: 0.25, morning: 0, cup_at: 'shelf', ...DO0, ...ASLEEP, fisherman_with: ['bag'], ...P.CAM0 }),
      run: async s => {
        const him = s.person('fisherman');
        await s.wait(2);
        // he gets up with his eyes shut, walks to the shelf, takes the cup, puts it in his bag
        s.set('fisherman_on', null);
        him.do('stand', { loop: true });
        await P.tell(s, 'sleepwalk:up', 1);
        // (the room whole: he goes to the shelf's near end, half turned to us, and his hand takes the cup — seen)
        await P.go(s, 'fisherman', [AT_CUP], 35);
        P.frame(s, P.shot('fisherman', 'medium', [0.42, 0.45]), 1.5);
        him.reach({ r: 'shelf#cup' });
        await s.wait(1.2);
        s.set('cup_at', 'hand');
        s.set('fisherman_with', ['bag', 'cup']);
        him.reach(null);
        await P.tell(s, 'sleepwalk:cup', 1.5);
        s.set('cup_at', 'bag');
        s.set('fisherman_with', ['bag']);
        await s.wait(0.6);
        // and lies down again (the room whole)
        P.frame(s, P.CAM0, 1.5);
        await P.go(s, 'fisherman', [PLACES.fisherman.stand.at], 180);
        for (const [k, v] of Object.entries(at('fisherman', 'bench'))) s.set(k, v);
        s.set('fisherman_on', SEAT);
        P.loop(s, 'fisherman', 'lie_bench');
        await P.tell(s, 'sleepwalk:down', 1);
        // the daughter half opens her eyes, and shuts them
        // (the room whole — the guest back on his bench, the girl on her pallet by the fire: curled up, an arm over her
        // face, she was unreadable near, and at her level the lens lay along the pallet's edge)
        P.frame(s, P.CAM0, 0);
        s.person('daughter').mood('tired');
        await P.tell(s, 'sleepwalk:girl', 2);
        s.person('daughter').mood('eyes_closed');
        await s.wait(1.5);
      },
    },
    cup_gone: {
      from: () => ({ fire: 0.4, morning: 1, cup_at: 'bag', ...DO0, ...at('fisherman', 'bench'), fisherman_do: 'lie_bench', fisherman_with: ['bag'],
        ...at('potter', 'shelf'), potter_turn: 0, ...at('daughter', 'pallet'), daughter_do: 'sleep_floor', ...P.shot('potter', 'medium', [0.5, 0.42]) }),
      run: async s => {
        P.loop(s, 'potter', 'search');
        await P.tell(s, 'cup_gone:search', 3);
        // he sits up on the bench and reaches for his bag — heavy
        P.loop(s, 'fisherman', 'seated');
        s.person('fisherman').reach({ r: 'fisherman#hips' });
        P.frame(s, P.shot('fisherman', 'medium', [0.5, 0.45]), 2);
        s.person('fisherman').look('fisherman#hips');
        await P.tell(s, 'cup_gone:bag', 3);
      },
    },
    confess: {
      after: 'cup_gone',
      from: () => ({ fire: 0.4, morning: 1, cup_at: 'bag', ...DO0, ...at('fisherman', 'stand'), fisherman_with: ['bag'], ...at('potter', 'shelf'),
        ...at('daughter', 'pallet'), ...P.shot('fisherman', 'medium', [0.4, 0.45]) }),
      run: async s => {
        P.open(s, { ...at('fisherman', 'stand'), fisherman_on: null, fisherman_reach: null, ...P.shot('fisherman', 'medium', [0.4, 0.45]) });
        const him = s.person('fisherman'), potter = s.person('potter');
        potter.do('stand', { loop: true });
        him.do('stand', { loop: true });
        // he takes out the cup and holds it out
        s.set('cup_at', 'hand');
        s.set('fisherman_with', ['bag', 'cup']);
        him.look('potter');
        await him.do('hold_out');
        await P.tell(s, 'confess:out', 1.5);
        // the potter takes it, looks at it long
        s.set('fisherman_with', ['bag']);
        s.set('potter_with', ['cup']);
        potter.look('potter#cup');
        P.frame(s, P.shot('potter', 'close', [0.5, 0.42]), 2);
        await P.tell(s, 'confess:look', 3);
        // the daughter goes behind her father
        await P.go(s, 'daughter', [PLACES.daughter.behind.at], 210);
        await P.tell(s, 'confess:hide', 1);
      },
    },
    bend_daughter: {
      after: 'cup_gone',
      from: () => ({ fire: 0.4, morning: 1, cup_at: 'bag', ...DO0, ...at('fisherman', 'stand'), fisherman_with: ['bag'], ...at('potter', 'shelf'),
        ...at('daughter', 'pallet'), daughter_do: 'sleep_floor', ...P.CAM0 }),
      run: async s => {
        P.open(s, { ...at('fisherman', 'stand'), fisherman_on: null, fisherman_reach: null, ...P.CAM0 });
        s.person('fisherman').do('stand', { loop: true });
        // the potter kneels by his daughter, his back to the shelf
        await P.go(s, 'potter', [PLACES.potter.by_daughter.at], 270);
        s.person('potter').look('daughter');
        await s.person('potter').do('kneel');
        P.loop(s, 'potter', 'kneel');
        await P.tell(s, 'bend_daughter:bent', 1);
      },
    },
    found_cup: {
      from: () => ({ fire: 0.4, morning: 1, cup_at: 'shelf', ...DO0, ...at('fisherman', 'shelf'), fisherman_with: ['bag'], ...at('potter', 'by_daughter'),
        potter_do: 'kneel', ...at('daughter', 'pallet'), ...P.CAM0 }),
      run: async s => {
        const potter = s.person('potter');
        potter.do('stand', { loop: true });
        // he gets up, goes to the shelf
        await P.go(s, 'potter', [[0.9, 4.25]], 330);
        potter.look('shelf#cup');
        if (!s.get('rang')) {
          // finds the cup behind the bread, laughs, gives bread for the road
          P.frame(s, P.shot('potter', 'medium', [0.5, 0.42]), 1.5);
          potter.mood('laugh');
          await P.tell(s, 'found_cup:find', 2);
          s.set('potter_with', ['bread']);
          await potter.turn(230);
          potter.look('fisherman');
          await potter.do('hold_out');
          s.set('potter_with', null);
          s.set('fisherman_with', ['bag', 'bread']);
          await P.tell(s, 'found_cup:bread', 1);
        } else {
          // he turned at the ring: he sees the cup on the shelf, and looks at his guest a long while
          await potter.turn(230);
          potter.look('fisherman');
          P.frame(s, P.shot('potter', 'close', [0.5, 0.42]), 2);
          await P.tell(s, 'found_cup:look', 4);
        }
      },
    },
    soul_theft: {
      from: () => ({ fire: 0.2, morning: 0, cup_at: 'shelf', ...DO0, ...ASLEEP, fisherman_here: false, ...at('soul', 'door'), soul_with: ['lantern'],
        door: 1, door_turn: 355, ...P.CAM0 }),
      run: async s => {
        const soul = s.person('soul');
        s.set('fisherman_here', false);
        if (!s.get('hard')) {
          // it stands over the sleeping girl a long while
          await P.go(s, 'soul', [PLACES.soul.over_girl.at], 250);
          soul.look('daughter');
          P.frame(s, P.shot('soul', 'medium', [0.45, 0.42]), 2);
          await P.tell(s, 'soul_theft:girl', 4);
        } else s.tell('soul_theft:girl');
        // takes the cup from the shelf
        await P.go(s, 'soul', [PLACES.soul.shelf.at], 0);
        soul.reach({ r: 'shelf#cup' });
        await s.wait(1);
        s.set('cup_at', 'hand');
        s.set('soul_with', ['lantern', 'cup']);
        soul.reach(null);
        await P.tell(s, 'soul_theft:cup', 1);
        // the potter wakes in the lantern's light, sits up, sees the face
        P.frame(s, P.shot('potter', 'close', [0.5, 0.42]), 1.5);
        s.set('potter_on', [1.95, 3.6, 0.45]);
        s.set('potter_turn', 270);
        P.loop(s, 'potter', 'seated');
        s.person('potter').mood('afraid');
        s.person('potter').look('soul');
        await P.tell(s, 'soul_theft:wake', 2);
        // it goes out into the dark (the door left wide open)
        P.frame(s, P.CAM0, 2);
        await P.go(s, 'soul', [PLACES.soul.door.at, [3.4, 1.65]]);
        s.set('soul_here', false);
        s.set('cup_at', 'gone');
        await P.tell(s, 'soul_theft:gone', 1);
      },
    },
  };
  return film;
}
return { film, wall, PLASTER, BAND, PLACES, CARRY, SEAT };
