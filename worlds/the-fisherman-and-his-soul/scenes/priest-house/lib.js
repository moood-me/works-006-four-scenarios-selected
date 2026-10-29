// What the room's walls share: limewashed plaster, white and a little uneven, and the blue-grey band painted along its
// foot. `wall(g, seed, left, right, top)` — in metres, its foot at y 0, `top` negative (the ceiling's height); the
// whitewash a few soft patches of a shade darker or lighter, never a pattern
const LIME = '#ebe6da';
const BAND = '#8b98a6';
function wall(g, seed, left, right, top) {
  g.save();
  g.beginPath();
  g.rect(left, top, right - left, -top + 0.02);
  g.clip();
  g.fillStyle = LIME;
  g.fillRect(left, top, right - left, -top + 0.02);
  for (let i = 0; i < 26; i++) {
    const x = left + (right - left) * anim.hash(i, seed);
    const y = top + -top * anim.hash(i, seed + 1);
    const w = 0.3 + 0.9 * anim.hash(i, seed + 2);
    g.fillStyle = anim.hash(i, seed + 3) > 0.5 ? 'rgba(214, 206, 190, 0.35)' : 'rgba(250, 248, 242, 0.4)';
    g.beginPath();
    g.ellipse(x, y, w, w * 0.6, 0, 0, Math.PI * 2);
    g.fill();
  }
  g.fillStyle = BAND;
  g.fillRect(left, -0.34, right - left, 0.36);
  g.fillStyle = 'rgba(60, 70, 84, 0.35)';
  g.fillRect(left, -0.35, right - left, 0.02);
  g.restore();
}
// The Priest's house's pieces (the game's contract, game.md «Stage 5 — pieces»; notes.md «Pieces»): played by the
// world's `beats` from the script. `film(scene)` → {name: {from, after, run}}.
function film(scene) {
  const P = kit.pieces;
  const DO0 = { priest_do: null, fisherman_do: null, woman_a_do: null, woman_b_do: null, witch_do: null, priest_reach: null, fisherman_reach: null };
  // 1.2: the Priest by the altar, the Fisherman on the bench
  const ROW = { morning: 1, flowers: 'none', bench_tilt: 0, priest_a: -1.5, priest_d: 4.4, priest_turn: 110, priest_look: 'fisherman',
    fisherman_a: 1.57, fisherman_d: 4.37, fisherman_on: [1.57, 4.37, 0.45], fisherman_do: 'seated', fisherman_turn: 250, fisherman_look: 'priest' };
  // the feast three years on: the Priest at the altar turned to the room, the two women before him
  const FEAST = { morning: 1, bench_tilt: 0, priest_a: -1.5, priest_d: 4.4, priest_turn: 150, priest_look: [-0.4, 2.4, 1.5],
    woman_a_a: -0.9, woman_a_d: 2.6, woman_a_turn: 320, woman_a_look: 'priest', woman_b_a: 0.2, woman_b_d: 2.9, woman_b_turn: 300, woman_b_look: 'priest' };
  // «Два огня»: the Priest on the threshold speaking to the room, the women and the Witch before him
  const SERMON = { morning: 1, flowers: 'altar', bench_tilt: 0, priest_a: 0.45, priest_d: 5.6, priest_turn: 180, priest_look: [0.4, 2.6, 1.5],
    woman_a_a: -1.25, woman_a_d: 2.7, woman_a_turn: 30, woman_a_look: 'priest', woman_b_a: -0.3, woman_b_d: 2.4, woman_b_turn: 10, woman_b_look: 'priest',
    witch_a: 1.7, witch_d: 2.9, witch_turn: 300, witch_look: 'priest' };
  const THRESHOLD = [0.45, 5.75];
  const film = {
    priest_sign: {
      from: () => ({ ...ROW, ...DO0, fisherman_do: 'seated', ...P.shot('priest', 'medium', [0.4, 0.42]) }),
      run: async s => {
        await s.wait(0.6);
        await s.person('priest').do('sign');
        await P.tell(s, 'priest_sign:sign', 1);
      },
    },
    bench_falls: {
      after: 'priest_sign',
      from: () => ({ ...ROW, ...DO0, fisherman_do: 'seated', ...P.CAM0 }),
      run: async s => {
        P.open(s, film.bench_falls.from());
        // he gets up so sharply that the bench falls over backwards
        s.set('fisherman_on', null);
        s.move('bench_tilt', 90, { over: 0.7, ease: 'in' });
        await s.person('fisherman').do('rise_sharp');
        await P.tell(s, 'bench_falls:fall', 0.5);
      },
    },
    begone: {
      after: 'bench_falls',
      from: () => ({ ...ROW, bench_tilt: 90, fisherman_on: null, ...DO0, fisherman_a: 1.3, fisherman_d: 4.0, ...P.shot('priest', 'medium', [0.4, 0.42]) }),
      run: async s => {
        P.open(s, { ...P.shot('priest', 'medium', [0.4, 0.42]) });
        const priest = s.person('priest'), him = s.person('fisherman');
        s.tell('begone:point');
        await priest.do('point_away');
        // he walks to the threshold, turns to the room, and makes the sign — and drops his hand halfway
        him.look(null);
        await P.go(s, 'fisherman', [THRESHOLD], 180);
        await P.cut(s, P.shot('fisherman', 'close', [0.5, 0.4]));
        him.look('priest');
        const sign = him.do('sign');
        await s.wait(1.3);
        sign.cancel();
        him.do('stand', { loop: true });
        await P.tell(s, 'begone:sign', 2);
      },
    },
    feast_flowers: {
      from: () => ({ ...FEAST, flowers: 'altar', ...DO0, ...P.CAM0 }),
      run: async s => {
        P.loop(s, 'priest', 'preach');
        await s.wait(3);
        P.frame(s, P.shot('flowers_altar', 'close', [0.5, 0.5]), 2);
        await P.tell(s, 'feast_flowers:ask', 4);
        P.frame(s, P.shot('priest', 'close', [0.45, 0.4]), 2);
        await s.wait(3);
      },
    },
    threshold_flowers: {
      from: () => ({ ...ROW, flowers: 'none', priest_look: null, priest_turn: 110, ...DO0, fisherman_on: null, fisherman_a: 0.45, fisherman_d: 6.3,
        fisherman_turn: 0, fisherman_look: [0.45, 6.2, 0], ...P.CAM0 }),
      run: async s => {
        const him = s.person('fisherman');
        // he lays the flowers on the threshold and goes
        s.set('fisherman_with', ['flowers']);
        await s.wait(1);
        await him.do('lay_down');
        s.set('fisherman_with', null);
        s.set('flowers', 'threshold');
        await P.tell(s, 'threshold_flowers:laid', 1);
        s.set('fisherman_here', false);
        // the Priest finds them, and sets them on the altar
        P.frame(s, P.shot('flowers_threshold', 'close', [0.5, 0.55]), 2);
        await P.go(s, 'priest', [[0.45, 5.6]], 0);
        s.person('priest').look('flowers_threshold');
        await P.tell(s, 'threshold_flowers:found', 1.5);
        await s.person('priest').do('lay_down');
        s.set('flowers', 'none');
        s.set('priest_with', ['flowers']);
        P.frame(s, P.shot('priest', 'medium', [0.45, 0.42]), 2);
        await P.go(s, 'priest', [[-1.5, 4.2]], 250);
        s.set('priest_with', null);
        s.set('flowers', 'altar');
        await P.tell(s, 'threshold_flowers:altar', 0.5);
        await s.person('priest').turn(150);
        P.loop(s, 'priest', 'preach');
        await s.wait(2);
      },
    },
    sermon: {
      from: () => ({ ...SERMON, ...DO0, ...P.CAM0 }),
      run: async s => {
        P.loop(s, 'priest', 'preach');
        await P.tell(s, 'sermon:preach', 4);
        s.person('woman_a').do('sign');
        await s.wait(0.4);
        s.person('woman_b').do('sign');
        await P.tell(s, 'sermon:sign', 3);
        P.frame(s, P.shot('witch', 'medium', [0.5, 0.42]), 2);
        s.person('witch').mood('laugh');
        P.loop(s, 'witch', 'laugh');
        await P.tell(s, 'sermon:laugh', 3);
      },
    },
  };
  return film;
}
return { film, wall, LIME, BAND };
