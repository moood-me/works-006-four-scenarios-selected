// The open sea (С2) — what the elements and the script share. Metres. The boat «Adventure» lies at the world's start,
// her bow toward the start's back (her anchor `boat` faces 180: in her own frame across, distance and up are the
// world's), her stern toward the far side; the camera rides her. The sea's floor lies deep everywhere (`land`): no
// shore, the island module's sea paints only its open water (SEA its height).
const SEA = 0, FLOOR = -1.2;
const land = () => FLOOR;
const shore = () => {};
// the boat, in her frame (distance toward the stern): her length from the stem to the transom, her seats — Papa on the
// stern thwart by the tiller; Mama on the middle thwart just before him (he can tuck her blanket), the son at its other
// end looking back over the stern, then pressed against her; on the stern deck with the lantern («Держи»); My up the
// mast on its crosstree
const BOW = -2.2, STERN = 2.2;
const SEATS = {
  papa: [0.32, 1.45, 0.38],
  mama: [-0.24, 0.55, 0.38],
  troll: [0.42, 0.55, 0.38],
  troll_close: [0.06, 0.55, 0.38],
  troll_stern: [-0.05, 1.95, 0.46],
  my: [0, -1.2, 2.24],
};
// her hull: ribs from the bow to the stern — [distance, half-beam, the rail's height, the keel's]
const RIBS = [[-2.2, 0.04, 0.8, 0.3], [-1.6, 0.5, 0.67, -0.2], [-0.8, 0.75, 0.59, -0.29], [0, 0.8, 0.56, -0.32],
  [0.9, 0.76, 0.58, -0.3], [1.6, 0.66, 0.61, -0.24], [2.2, 0.53, 0.65, -0.12]];
// one rib's points from the port rail down round the keel up to the starboard rail ([x, y, z] in the hull's form: x
// across, y up, z toward its front — the bow)
function rib([d, w, rail, keel]) {
  const H = rail - keel, k = [[1, 0], [0.97, 0.25], [0.85, 0.55], [0.55, 0.85], [0, 1]];
  const side = k.map(([x, y]) => [-w * x, rail - H * y, -d]);
  return [...side, ...side.slice(0, -1).reverse().map(([x, y, z]) => [-x, y, z])];
}
// where what follows behind is, by `trail` (0 — far astern, about 50 m … 1 — at the stern; below 0 falling away out
// of sight, −1.5 some 130 m): the near end of the white strip of rime on the water, and the Groke swimming in it
const trailNear = t => STERN + 2 + (1 - t) * 50;
const GROKE_ACROSS = 0.7;
// where the island is, by `island`: far out of sight ahead in the night (none), ahead of the bow at dawn (ahead), astern
// by day as they sail home (behind)
const ISLAND_AT = { none: -6000, ahead: -260, behind: 230 };
// The camera on the boat, in her frame (it faces the start: her across is the viewer's mirrored) — placed by hand: in a
// boat this small the operator, framing a target, comes into people's heads. aft — from before the bow looking aft over
// everyone at what follows behind; fore — from behind the stern looking forward to the bow, the star, the island ahead;
// wide — aft from higher and farther, the boat small on the sea; behind — close behind Papa at the tiller, the son's
// face beside him, the lantern on the bow and the star beyond (the choice); papa — Papa's face from before Mama; papa_sea
// — his face from higher, the strip and the Groke behind him; lantern — the bow lantern close; son — the son's face on
// the middle thwart; son_stern — his face on the stern deck with the lantern; mama — Mama's face
const CAM0 = { camera_target: null, camera_shot: 'full', camera_frame: null, camera_glide: 1.5, camera_pitch: 0 };
const shot = (x, z, h, yaw, look) => ({ ...CAM0, camera_x: x, camera_z: z, camera_h: h, camera_yaw: yaw, camera_look: look });
const VIEWS = {
  aft: shot(1.0, -4.8, 1.1, 8, 0.14),
  fore: shot(1.0, 5.2, 1.1, 188, 0.14),
  wide: shot(2.5, -9, 2.4, 10, 0.12),
  behind: shot(0.9, 2.7, -0.35, 195, 0.05),
  papa: shot(-0.2, -0.7, -0.35, 0, 0.1),
  papa_sea: shot(0.5, -0.8, 0, 0, 0.15),
  lantern: shot(0.6, -0.9, 0.1, 180, 0.3),
  son: shot(-0.5, 2.2, -0.45, 180, 0.04),
  son_stern: shot(0.6, 4.3, -0.3, 190, 0.04),
  mama: shot(-0.5, 0, -0.55, -10, 0.05),
};
// ── the pieces (notes.md «Pieces»; the module beats) ─────────────────
// Each piece: `from` — everyone in their seats, their motions, the lantern, what follows behind, the island, the camera;
// the play's keys (the hour, the moon, `glance`) are the game's and are not touched here. `run` — the piece, telling
// its moments.
const loop = m => ({ motion: m, loop: true });
const seat = (id, at, turn, does, look, more = {}) => ({
  [`${id}_on`]: { on: 'boat', at: SEATS[at] }, [`${id}_turn`]: turn, [`${id}_do`]: loop(does), [`${id}_look`]: look ?? null,
  [`${id}_reach`]: null, [`${id}_with`]: null, ...more,
});
// at the tiller: seated, his right paw on its grip
const PAPA = (more = {}) => seat('papa', 'papa', 180, 'seated', [0, -40, 2], { papa_reach: { r: 'tiller#grip' }, ...more });
const MAMA = (more = {}) => seat('mama', 'mama', 180, 'doze', null, more);
const MY = (more = {}) => seat('my', 'my', 200, 'seated', [-3, -12, 4], more);
const CROSSING = (more = {}) => ({ ...PAPA(), ...MAMA(), ...MY(), ...seat('troll', 'troll', 0, 'seated', 'groke'),
  lantern_at: 'bow', trail: 0.4, frost_boat: 0, island: 'none', heading: 0, ...more });
const ready = (s, values) => s.shot(values);
async function cutTo(s, shot) {
  await s.until(() => shot.ready);
  shot.cut();
}
// the pose for М2 «Румпель»: over Papa's back at the tiller to the bow and the star, the camera still
const TILLER = () => VIEWS.fore;
// the pose for ⚑ boat: over Papa at the tiller to the bow, the lantern burning on its bracket in the middle of the frame,
// nothing before it (lantern#flame), the top of the frame free for the plate
const CHOICE = () => VIEWS.fore;
const FILM = {
  // 1.1: the night crossing — Papa's star; the son sees the strip and the eyes, edges up to Mama, looks back again
  night: {
    from: () => ({ ...CROSSING(), ...VIEWS.aft }),
    run: async s => {
      const papa = ready(s, VIEWS.papa_sea);
      await s.wait(2);
      await cutTo(s, papa);
      s.tell('night:star');
      await s.wait(3);
      const son = ready(s, VIEWS.son);
      await cutTo(s, son);
      s.set('troll_mood', 'afraid');
      s.tell('night:eyes');
      await s.wait(3.5);
      const close = ready(s, { ...VIEWS.papa,
        ...seat('troll', 'troll_close', 180, 'seated', 'papa', { troll_mood: 'afraid' }) });
      await cutTo(s, close);
      s.tell('night:closer');
      await s.wait(2.5);
      s.person('troll').look('groke');
      s.tell('night:back');
      await s.wait(2);
      const pose = ready(s, TILLER());
      await cutTo(s, pose);
      await s.wait(0.5);
    },
  },
  // 1.2: after the tiller — silence, the boat under the stars, the son looking back
  quiet: {
    after: 'night',
    from: () => ({ ...CROSSING(seat('troll', 'troll_close', 0, 'seated', 'groke')), ...TILLER() }),
    run: async s => {
      const wide = ready(s, VIEWS.wide);
      await s.wait(1);
      await cutTo(s, wide);
      await s.wait(4);
      s.tell('quiet:back');
      await s.wait(4);
    },
  },
  // 1.3: Papa glances round at the strip — «the moon's path» — and back ahead; the pose for ⚑ boat
  glance: {
    from: () => ({ ...CROSSING(seat('troll', 'troll_close', 0, 'seated', 'groke')), ...VIEWS.papa }),
    run: async s => {
      await s.wait(1);
      s.person('papa').look('strip');
      await s.wait(1.5);
      s.tell('glance:strip');
      const back = ready(s, VIEWS.papa_sea);
      await s.wait(2);
      await cutTo(s, back);
      await s.wait(1.5);
      s.person('papa').look([0, -40, 2]);
      s.tell('glance:ahead');
      await s.wait(2.5);
      const pose = ready(s, CHOICE());
      await cutTo(s, pose);
      await s.wait(0.5);
    },
  },
  // 1.3 «put it out»: the lantern goes out; the strip falls behind and is gone; Mama wakes in the dark
  douse: {
    after: 'glance',
    from: () => ({ ...CROSSING(seat('troll', 'troll_close', 0, 'seated', 'groke')), ...CHOICE() }),
    run: async s => {
      const bow = ready(s, VIEWS.lantern);
      await cutTo(s, bow);
      await s.move('lantern_bow_on', 0, { over: 1.2 });
      s.set('lantern_at', 'out');
      s.tell('douse:out');
      await s.wait(1);
      const wide = ready(s, VIEWS.wide);
      await cutTo(s, wide);
      // the strip and the Groke in it fall behind, far astern, out of sight in the dark
      await s.move('trail', -1.5, { over: 9 });
      s.tell('douse:gone');
      const mama = ready(s, VIEWS.mama);
      await cutTo(s, mama);
      await s.person('mama').do('wake');
      s.set('mama_do', loop('seated'));
      s.set('mama_mood', 'afraid');
      s.person('mama').look([0, 30, 2]);
      s.tell('douse:wake');
      await s.wait(2);
    },
  },
  // 1.3 «leave it burning»: Papa tucks the blanket round Mama; the strip comes nearer; the son's face
  keep: {
    after: 'glance',
    from: () => ({ ...CROSSING(seat('troll', 'troll_close', 0, 'seated', 'groke')), ...CHOICE() }),
    run: async s => {
      const papa = s.person('papa');
            s.set('papa_reach', null);
      await papa.do('tuck');
      s.set('papa_do', loop('seated'));
      s.set('papa_reach', { r: 'tiller#grip' });
      s.tell('keep:tuck');
      const aft = ready(s, VIEWS.aft);
      await cutTo(s, aft);
      await s.move('trail', 0.8, { over: 6 });
      s.tell('keep:near');
      const face = ready(s, { ...VIEWS.son, troll_mood: 'afraid' });
      await cutTo(s, face);
      s.set('troll_reach', { l: { on: 'boat', at: [0.72, 0.55, 0.58] } });
      papa.look([0, -40, 2]);
      s.tell('keep:face');
      await s.wait(3);
    },
  },
  // 1.3 «here, shine it back»: the lantern to the son (the handle close); he shines it back on the Groke, who comes on
  // into its light; the boat drifts; the rime creeps to his paws (the paws close); dawn — Mama rubs them
  hold: {
    after: 'glance',
    from: () => ({ ...CROSSING(seat('troll', 'troll_close', 0, 'seated', 'groke')), ...CHOICE(), handle_open: 0, handle_give: 0, paws_open: 0, paws_rub: 0 }),
    run: async s => {
      // (a cut: Papa has fetched the lantern from the bow and holds it out to his son)
      const give = ready(s, { ...VIEWS.behind, lantern_at: 'papa', papa_with: ['lantern'], papa_reach: null, papa_do: 'give' });
      await cutTo(s, give);
      await s.wait(1.2);
      // the handle close: Papa's paw opens, the son's closes on it
      await s.move('handle_open', 1, { over: 0.4 });
      await s.move('handle_give', 1, { over: 2.5 });
      s.set('papa_with', null);
      s.set('lantern_at', 'troll');
      s.set('troll_with', ['lantern']);
      s.set('troll_do', loop('seated_hold'));
      s.set('papa_do', loop('seated'));
      s.set('papa_reach', { r: 'tiller#grip' });
      s.tell('hold:give');
      await s.wait(1);
      // the son on the stern deck, shining it back; the Groke comes on into its light; Papa steers without it
      const stern = ready(s, { ...VIEWS.son_stern, handle_open: 0, ...seat('troll', 'troll_stern', 90, 'seated_hold', 'groke', { troll_with: ['lantern'], troll_mood: 'afraid' }) });
      await cutTo(s, stern);
      const aft = ready(s, VIEWS.aft);
      await s.wait(1.5);
      await cutTo(s, aft);
      await s.move('trail', 0.7, { over: 5 });
      s.tell('hold:shine');
      s.person('papa').look([0, -40, 2]);
      s.move('heading', -0.6, { over: 4, ease: 'inOut' });
      await s.wait(2.5);
      s.tell('hold:drift');
      // the rime creeps over the stern to his paws; his paws on the lantern white, close
      await s.move('frost_boat', 0.8, { over: 4 });
      s.set('troll_with', ['lantern', 'rime_paws']);
      s.set('paws_rub', 0);
      await s.move('paws_open', 1, { over: 0.5 });
      s.tell('hold:frost');
      await s.wait(2.5);
      // dawn: Mama wakes, throws off her blanket, and he is beside her: she rubs his paws as the night goes
      const dawn = ready(s, { ...VIEWS.fore, paws_open: 0, island: 'ahead', heading: 0,
        ...seat('troll', 'troll_close', 180, 'seated_hold', 'mama', { troll_with: ['lantern', 'rime_paws'], troll_mood: 'sad' }),
        ...seat('mama', 'mama', 180, 'seated', 'troll', { mama_reach: { r: 'troll#hands', l: 'troll#hands' }, mama_mood: 'sad' }) });
      await s.move('paws_open', 0, { over: 0.4 });
      await cutTo(s, dawn);
      // the night goes and the dawn comes up before the eyes, the island ahead coming out of the dark
      s.move('night', 0, { over: 6 });
      await s.move('dawn', 1, { over: 6 });
      await s.move('paws_open', 1, { over: 0.5 });
      await s.move('paws_rub', 1, { over: 3 });
      s.tell('hold:dawn');
      await s.wait(1.5);
      await s.move('paws_open', 0, { over: 0.5 });
      await s.wait(1);
    },
  },
  // the finale «Лодка в долину»: going home by day, the island astern — the term, Papa's story, My, the son's look
  home: {
    from: () => ({ ...PAPA({ papa_mood: 'smile' }), ...seat('mama', 'mama', 180, 'seated', null), ...MY(), ...seat('troll', 'troll_stern', 90, 'seated', [-25, 236, 6]),
      lantern_at: 'out', trail: 0, frost_boat: 0, island: 'behind', heading: 0, groke_here: false, ...VIEWS.aft }),
    run: async s => {
      await s.wait(1);
      s.person('mama').look([20, 40, 60]);
      s.tell('home:term');
      await s.wait(2.5);
      s.person('mama').look('papa');
      const papa = ready(s, VIEWS.papa);
      await cutTo(s, papa);
      s.set('papa_reach', { r: 'tiller#grip', l: { on: 'boat', at: [0.75, 1.1, 1.25] } });
      s.tell('home:tell');
      await s.wait(3);
      s.set('papa_reach', { r: 'tiller#grip' });
      const my = ready(s, VIEWS.aft);
      await cutTo(s, my);
      s.person('my').look('papa');
      s.set('my_mood', 'disgusted');
      s.tell('home:my');
      await s.wait(2.5);
      const son = ready(s, VIEWS.son_stern);
      await cutTo(s, son);
      const glance = s.get('glance') ?? 'sea';
      if (glance === 'once') {
        await s.wait(1.5);
        s.person('troll').look('papa');
        await s.wait(1.8);
        s.person('troll').look([-25, 236, 6]);
      }
      s.tell('home:look');
      await s.wait(2.5);
    },
  },
  // the finale's last shot: the dark lighthouse falls behind
  last: {
    after: 'home',
    from: () => ({ ...PAPA(), ...seat('mama', 'mama', 180, 'seated', null), ...MY(), ...seat('troll', 'troll_stern', 90, 'seated', [-25, 236, 6]),
      lantern_at: 'out', trail: 0, frost_boat: 0, island: 'behind', heading: 0, groke_here: false, ...VIEWS.aft }),
    run: async s => {
      const wide = ready(s, VIEWS.wide);
      await cutTo(s, wide);
      await s.move('isle_d', 600, { over: 7, ease: 'in' });
      s.tell('last:far');
      await s.wait(1);
    },
  },
};
// the play's keys the showcase gives each piece (in a game the game gives them)
const SHOW = {
  night: { night: 1, dawn: 0, moon: 0.35, calm: 0.8, groke_here: true },
  quiet: {},
  glance: { night: 1, dawn: 0, calm: 0.8, groke_here: true },
  douse: {},
  keep: { night: 1, dawn: 0, calm: 0.8, groke_here: true },
  hold: { night: 1, dawn: 0, calm: 0.8, groke_here: true },
  home: { night: 0, dawn: 0, calm: 0.5, glance: 'once' },
  last: {},
};
const SHOWFILM = Object.fromEntries(Object.entries(FILM).map(([k, b]) => [k, {
  ...b,
  from: () => ({ ...SHOW[k], ...b.from() }),
  run: async s => {
    for (const key in SHOW[k]) s.set(key, SHOW[k][key]);
    await b.run(s);
  },
}]));
return { SEA, FLOOR, land, shore, BOW, STERN, SEATS, RIBS, rib, trailNear, GROKE_ACROSS, ISLAND_AT, VIEWS, FILM, SHOWFILM };
