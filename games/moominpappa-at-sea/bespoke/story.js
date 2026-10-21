// What a chapter's steps play with: context(b, view, hub, state, j, {forward}) → g. Its state is a working copy — kept
// only once the step is done (game.js). A step left behind (the player went to the map: ☰) does nothing more and never
// ends: whatever it still calls returns a promise that never settles.
// Stage 3 of the game (rpg docs/writing-games-v2/game-stages.md): the whole play on the world's three scenes as they
// are — people stand, the scenes only say who is there. What the scenario's film would show is a plate with “Next”
// (g.plate, g.sheet); a mini-game is its stub — a mark to press and a card saying what it will be (minigames/stub.js);
// a place the world has not got yet — the people in one of its scenes and a label saying where it really is.
//   g.state — what the play carries: {scales, shown, marks, choices} (game.js); what follows from it: facts(g.state)
//   g.signal — aborts when the step is left
//   g.scene(folder, {here, moods, where}, {cut}) — that scene of the world, full-screen: of its people only `here`
//     (ids) are there (`<id>_here`, the engine's key), their faces as `moods` say ({id: mood}); `where` — a label in
//     the corner, where this really happens (none: the place is the scene's own). Always opened anew
//   g.here(id, on) — someone of the shown scene comes or goes (in one cut); g.mood(id, mood) — their face
//   g.wait(ms) — time of the game's own (a pause)
//   g.say(who, text, at) — someone of the game's people (people.json) says it over `at` (default: over themselves if
//     they are in the scene, else low in the middle, as the narrator), in their voice; → a breath after it is heard
//   g.plate(text) — a plate over the scene: what happens here that the scene does not show; → once “Next” is pressed
//   g.sheet(title, lines) — the same, a list (what the camera passes in a finale)
//   g.choose(choice, {ref: options}) — the player presses one of the points ('id#point' | 'id'), then one of its
//     options ([{id, label}]: petals, one too — the language of mini-games, hub.offer); → the option's id, kept in
//     state.choices[choice] (choice null: not a choice of the chapter's map)
//   g.play(minigame, opts) — a mini-game (a module of minigames/: {title, about, skipped, run(g, b, opts, signal)});
//     the signal aborts when it is skipped (the page's ⏭, where it may be skipped) or the step is left; → its result
//   g.minigame({phrase}) — inside a minigame's run: the language's mini-game begun; g.card(title, gesture, text) — the
//     stub's card beside it, gone with the minigame (→ a function that takes it away sooner)
//   g.apply(choice) — what the option chosen does, by EFFECTS: the scales, then each mark
//   g.scale(name, delta) — a scale moves; the player sees which way (the gauge, the words)
//   g.gauge(name) — the scale is shown from now on; its one line of what it means said once
//   g.mark(key, value, text) — remembered (state.marks[key]); text — what the player is told; null — told nothing
//   g.title(text) — words over the scene, as a film's title; → once they have gone
//   g.done() → once the step's code is through: the page's ⏭ taken back; g.leave() — the step left behind (game.js)
// The page's ⏭ (bespoke.forward) is the step's while it is played ({forward}: whether the player has seen the step —
// game.js): where the step is seen, pressed, the step goes on at once to its next interaction — the next line said,
// plate, choice, minigame, scene or title —, the waits between over at once, the line heard dropped. In a minigame the ⏭
// skips it; while a choice or a plate waits there is none.
// A step may be played up to a minigame unseen, without time (the author's map: a jump — jump.js j), or all through
// (a dry run: game.js, check/run.mjs): then nothing of it is said, shown or heard, a plate goes by at once, and a
// minigame gives its `skipped`.

// the world's scenes the game plays, by their folders (the landing — also the map's background, game.js)
export const SCENES = { landing: 'landing', room: 'round-room', cape: 'cape' };

// The scales (scenario §8), each with two sides: where they start, their bounds, its name in the gauge, the side the
// player reads when they move (up: delta > 0, down: delta < 0), and the one line that says what they mean. Paraffin
// and the Groke's nights are counters, not scales of the player's — shown all the same: they are the play's clock and
// what the scenes read.
export const SCALES = {
  garden: { start: 1, min: 0, max: 4, name: tr('Mama’s garden'), up: tr('Mama in her garden'), down: tr('Mama with us'),
    rule: tr('Mama’s garden — how much she has painted. It grows when she has time alone, it shrinks when Papa is beside her.') },
  lamp: { start: 0, min: 0, max: 2, name: tr('The lamp'), up: tr('Papa at the lamp'), down: tr('Papa with his own'),
    rule: tr('The lamp — the sheets by the burner: each one an evening given to the lamp, not to his own.') },
  paraffin: { start: 3, min: 0, max: 3, name: tr('Paraffin'), up: tr('Paraffin'), down: tr('A measure of paraffin burnt'),
    rule: tr('Paraffin — three measures in the can, one full lantern a night. No sailing for more while the crests are white.') },
  groke: { start: 0, min: 0, max: 2, name: tr('The Groke’s nights'), up: tr('A night of light for the Groke'), down: tr('The Groke’s nights'),
    rule: tr('The Groke’s nights — nights she was given light. The more, the nearer she sits.') },
};
export const ORDER = ['garden', 'lamp', 'paraffin', 'groke'];

// What each option of each choice does (scenario §8, §9): the scales, then the marks ([key, value, text | null]). What
// depends on more than the option (a sheet read at the lamp, the Fisherman speaking) the chapter does itself.
export const EFFECTS = {
  tell: { all: { marks: [['mama', 'all', tr('Mama will remember: you decided for everyone.')]] },
    asked: { marks: [['mama', 'asked', tr('Mama will remember: you asked her.')]] } },
  boat: { douse: {}, keep: {}, hold: { marks: [['son_given', true, tr('Moomintroll will remember: his father gave him the lantern.')]] } },
  fisher: { keeper: { marks: [['fisher', 'keeper', tr('The Fisherman will remember: the new keepers.')]] },
    invite: { marks: [['fisher', 'invited', tr('The Fisherman will remember: he was called.')]] },
    sit: { garden: 1, marks: [['fisher', 'sat', tr('The Fisherman will remember: someone sat beside him.')]] } },
  day: { pool: { garden: 1 }, weed: { garden: -1 }, fisher: { garden: 1 } },
  night1: { lamp: { garden: 1, lamp: 1, marks: [['promise', 'lamp', tr('Papa promised: “Till I light it, I sleep by the lamp.”')]] },
    mama: { garden: -1, marks: [['promise', 'term', tr('Papa promised: “Not lit by the full moon — we turn for home.”')]] },
    son: { garden: 1, groke: 1, marks: [['promise', 'ask', tr('Papa promised: “I won’t ask.”')], ['line27', true, tr('Papa knows the line of 27 August.')]] },
    turns: { garden: 1, groke: 1 } },
  wall: { walk: { garden: 2, marks: [['mama_wall', 'turned', tr('Mama will remember: he turned away.')]] },
    call: { garden: -1, marks: [['mama_wall', 'called', tr('Mama will remember: he called her.')]] },
    wait: { garden: 1, marks: [['mama_wall', 'waited', tr('Mama will remember: he waited.')], ['line27', true, tr('Papa knows the line of 27 August.')],
      ['son_later', true, tr('Moomintroll will remember: “Later.”')]] } },
  night2: { sleep: { groke: 1 }, put: { marks: [['son_closed', true, tr('Moomintroll has shut himself away.')]] },
    follow: { groke: 1, marks: [['son_knows', true, tr('Moomintroll knows that his father knows.')]] } },
  storm: { light: {}, door: {}, cape: {}, both: {} },
  night3: { go: {}, right: {}, dune: {} },
};
export const ENDINGS = [
  { id: 'beam', label: tr('The Beam') }, { id: 'boat', label: tr('A Boat to the Valley') },
  { id: 'pie', label: tr('A Pie on the Cape') }, { id: 'stair', label: tr('Halfway up the Stair') },
];

// the line each hinge's option belongs to (scenario §3): the Lighthouse — the beam, Home — the boat, the Shore — the pie
const NIGHT1 = { lamp: 'beam', mama: 'boat', son: 'pie', turns: null };
const WALL = { walk: 'beam', call: 'boat', wait: 'pie' };
const STORM = { light: 'beam', door: 'boat', cape: 'pie', both: 'stair' };

// What follows from the play so far — all a step reads of it besides g.state. A choice not made (its step gone to by
// the author's map past it) gives its first option.
export function facts(state) {
  const c = state.choices, m = state.marks, s = state.scales;
  const night1 = c.night1 ?? 'lamp', wall = c.wall ?? 'walk', night2 = c.night2 ?? 'sleep', storm = c.storm ?? 'light';
  const ending = STORM[storm];
  // the promises (scenario §9): kept or broken by what came after
  const lampKept = night1 === 'lamp' && wall === 'walk' && night2 !== 'follow' && storm === 'light';
  const termKept = night1 === 'mama' && storm === 'door';
  const askBroken = night1 === 'son' && night2 === 'put';
  // the son's look in the finales (the glance rule): never at Papa; once; at the sea
  const glance = m.son_closed || m.son_later || askBroken ? 'never'
    : m.son_given || m.son_knows || night1 === 'son' ? 'once' : 'sea';
  return {
    tell: c.tell ?? 'all', boat: c.boat ?? 'douse', fisher: c.fisher ?? 'keeper', day: c.day ?? 'pool',
    night1, wall, night2, storm, night3: c.night3 ?? 'go',
    garden: s.garden, sheets: s.lamp, groke: s.groke,
    lit: storm === 'light' && s.lamp === 2,           // the lighthouse caught in the storm: two sheets, the pan, the last measure
    line27: !!m.line27, spoke: !!m.fisher_spoke, heard: !!m.mama_heard,
    lampKept, termKept, askBroken, glance,
    // the basket by the door: the term given and not kept
    basket: night1 === 'mama' && !termKept,
    ending,
    form: ending === 'stair' || NIGHT1[night1] === ending || WALL[wall] === ending ? 'full' : 'late',
  };
}

const SKIPPABLE = 20000; // ms in a minigame of a step not seen yet before the ⏭ may skip it

export function context(b, view, hub, state, j = null, { forward = null } = {}) {
  const left = new AbortController(); // the step is left behind (game.js)
  const gone = () => left.signal.aborted;
  const never = new Promise(() => {});
  const alive = p => p.then(v => (gone() ? never : v));
  const unseen = () => j?.on;
  // the ⏭ pressed (fast: the step going on at once to its next interaction — land() there); the game's own waits going
  let fast = false, waiting = false, showing = false;
  const waits = new Set();
  const sleep = ms => (gone() ? never : unseen() ? j.sleep(ms) : fast ? Promise.resolve() : new Promise(ok => {
    const w = { ok: () => gone() || ok() };
    w.timer = setTimeout(() => { waits.delete(w); w.ok(); }, ms);
    waits.add(w);
  }));
  const put = (key, value) => (unseen() ? j.did([key, value]) : b.set(key, value));
  let people = new Set(), present = new Set(); // the shown scene's people; those of them there now
  let playing = null; // the minigame played now: {signal, end, skippable}
  // the page's ⏭ as the step stands now: none while a choice or a plate waits or the step is still unseen; in a
  // minigame — its skip, where it may be skipped; else, where the step is seen, on to the next interaction
  const ahead = () => {
    if (forward == null || gone()) return;
    b.forward(waiting || unseen() ? null : playing ? (playing.skippable ? skip : null) : forward ? hurry : null);
  };
  const skip = () => { if (playing && !b.minigame.skip()) playing.end(); };
  function hurry() {
    if (gone() || fast || showing || playing || waiting || unseen()) return;
    fast = true;
    b.hush();
    b.instant(true);
    for (const w of waits) { clearTimeout(w.timer); w.ok(); }
    waits.clear();
  }
  // the next interaction reached: the scene as it is then, in one cut
  async function land() {
    if (!fast) return;
    fast = false;
    await b.instant(false);
  }
  // a jump at its minigame: the scene where the step has got to — and the step on from there, seen
  let seeing = null;
  const seen = () => (seeing ??= (async () => {
    const { shown, then } = j;
    j.seen();
    view.gauge(state);
    if (shown) {
      await alive(b.show(shown.folder, { state: shown.state, captions: false, then }));
      view.where(shown.where);
    }
    ahead();
  })());
  // (waiting for the player: a choice, a plate — no ⏭ meanwhile)
  async function wait(p) {
    if (fast) await alive(land());
    waiting = true;
    ahead();
    try { return await alive(p()); } finally { waiting = false; ahead(); }
  }
  const after = ({ heard, text }) => sleep(heard ? 500 : 300 + text.length * 60);
  const g = {
    state,
    signal: left.signal,
    async scene(folder, { here = [], moods = {}, where = null } = {}, { cut = false } = {}) {
      if (gone()) return never;
      const spec = await alive(unseen() ? j.real(b.specOf(folder)) : b.specOf(folder));
      people = new Set((spec.objects ?? []).filter(o => o.person).map(o => o.id));
      for (const id of here) if (!people.has(id)) throw new Error(`the scene “${folder}” has no “${id}”`);
      present = new Set(here);
      const st = {};
      for (const id of people) st[`${id}_here`] = present.has(id);
      for (const [id, mood] of Object.entries(moods)) st[`${id}_mood`] = mood;
      if (unseen()) { j.scene(folder, st, where); return; }
      showing = true;
      try {
        if (fast) await alive(land());
        hub.withdraw();
        view.where(null);
        await alive(b.show(folder, { state: st, captions: false, fade: !cut }));
        view.where(where);
      } finally { showing = false; }
    },
    here(id, on) {
      if (gone()) return;
      if (!people.has(id)) throw new Error(`the scene has no “${id}”`);
      if (on) present.add(id); else present.delete(id);
      put(`${id}_here`, on);
    },
    mood(id, mood) {
      if (gone()) return;
      if (!people.has(id)) throw new Error(`the scene has no “${id}”`);
      put(`${id}_mood`, mood);
    },
    wait: sleep,
    async say(who, text, at = present.has(who) ? who : 'narrator') {
      if (gone()) return never;
      if (unseen()) return sleep(300 + text.length * 60);
      if (fast) await alive(land());
      return alive(b.say(who, text, { at })).then(after);
    },
    async plate(text) {
      if (gone()) return never;
      if (unseen()) return;
      return wait(() => view.plate(text, { signal: left.signal }));
    },
    async sheet(title, lines) {
      if (gone()) return never;
      if (unseen()) return;
      return wait(() => view.sheet(title, lines, { signal: left.signal }));
    },
    async choose(choice, offers) {
      if (gone()) return never;
      // unseen: as the play chose it — else the first offered; one it chose that isn't here: offered once seen
      let action;
      if (unseen()) {
        const all = Object.values(offers).flat(), was = choice && state.choices[choice];
        action = !was ? all[0] : all.find(o => o.id === was) ?? (await new Promise(ok => j.later(() => wait(() => hub.offer(offers)).then(ok))));
      } else action = await wait(() => hub.offer(offers));
      if (choice) state.choices[choice] = action.id;
      return action.id;
    },
    async play(minigame, opts = {}) {
      if (gone()) return never;
      if (unseen()) {
        j.plays.push(minigame);
        if (j.plays.length <= j.target) return minigame.skipped;
        await seen();
      } else if (fast) await alive(land());
      const stop = new AbortController();
      const end = () => stop.abort();
      left.signal.addEventListener('abort', end);
      const p = playing = { signal: stop.signal, end, skippable: !!forward };
      const may = forward ? 0 : setTimeout(() => { p.skippable = true; if (playing === p) ahead(); }, SKIPPABLE);
      ahead();
      const skipped = new Promise(ok => stop.signal.addEventListener('abort', () => ok(minigame.skipped)));
      try {
        return await alive(Promise.race([minigame.run(g, b, opts, stop.signal), skipped]));
      } finally {
        left.signal.removeEventListener('abort', end);
        clearTimeout(may);
        stop.abort();
        playing = null;
        ahead();
      }
    },
    minigame(o = {}) {
      if (!playing) throw new Error('g.minigame: only inside a minigame (g.play)');
      const mg = b.minigame.start({ ...o, signal: playing.signal });
      mg.on('skip', playing.end);
      return mg;
    },
    card(title, gesture, text) {
      if (!playing) throw new Error('g.card: only inside a minigame (g.play)');
      const off = view.card(title, gesture, text);
      playing.signal.addEventListener('abort', off);
      return off;
    },
    apply(choice) {
      if (gone()) return;
      const fx = EFFECTS[choice]?.[state.choices[choice]];
      if (!fx) return;
      for (const name of ORDER) g.scale(name, fx[name] ?? 0);
      for (const [key, value, text] of fx.marks ?? []) g.mark(key, value, text);
    },
    scale(name, delta) {
      if (gone() || !delta) return;
      const S = SCALES[name], was = state.scales[name];
      state.scales[name] = Math.min(S.max, Math.max(S.min, was + delta));
      const moved = state.scales[name] - was;
      g.gauge(name);
      if (unseen() || !moved) return;
      view.toast(moved > 0 ? S.up : S.down, 'scale', (moved > 0 ? '↑' : '↓').repeat(Math.abs(moved)));
      view.gauge(state);
    },
    gauge(name) {
      if (gone()) return;
      if (state.shown[name] !== true) {
        state.shown[name] = true;
        if (!unseen()) view.toast(SCALES[name].rule, 'rule');
      }
      if (!unseen()) view.gauge(state);
    },
    mark(key, value, text) {
      if (gone()) return;
      state.marks[key] = value;
      if (text && !unseen()) view.toast(text, 'mark');
    },
    async title(text) {
      if (gone()) return never;
      if (fast) await alive(land());
      return unseen() ? sleep(9000) : alive(view.title(text, { signal: left.signal }));
    },
    async done() {
      await land();
      if (forward != null) b.forward(null);
    },
    // the step is left behind (game.js): nothing it offered or still had to say stays
    leave() {
      if (forward != null) b.forward(null);
      if (fast) { fast = false; b.instant(false); }
      left.abort();
      hub.withdraw();
      b.hush();
      view.where(null);
    },
  };
  if (j && j.target < Infinity) j.idle.then(seen);
  ahead();
  return g;
}

// The player's choices, listened to once for the whole play — game.js owns it: whatever is being chosen now gets the
// action.
//   hub.offer({ref: options}) → the action once the player has chosen it: a plain choice of the language of
//     mini-games — a mark on each point; a touch opens its options as petals, one too; one who touches no mark for
//     SHOW s is shown how: the ghost finger on each in turn
//   hub.ask(at, options) → the action chosen, or null: a mark born open where the game's own drawing was pressed (at:
//     fn → {x, y} page px — map.js), its options out as petals at once; a touch off them folds it — null
//   hub.withdraw() — nothing offered
const SHOW = 8; // s: nothing pressed so long — the ghost shows how

export function listen(b) {
  let offered = null; // the plain choice going on: the language's mini-game
  return {
    offer(offers) {
      offered?.leave();
      const mg = offered = b.minigame.start({ plate: false }), refs = Object.keys(offers), presses = [];
      if (refs.length === 1) mg.glow(refs[0].split('#')[0]);
      const ghost = setTimeout(() => mg.show({ gestures: presses }), SHOW * 1000);
      mg.on('end', () => clearTimeout(ghost));
      return new Promise(ok => {
        const chosen = (mark, action) => { mg.snap({ at: mark }); mg.leave(); offered = null; ok(action); };
        for (const ref of refs) {
          const options = offers[ref], mark = mg.mark({ at: ref.includes('#') ? ref : `${ref}@` });
          const press = mg.press({ on: mark, petals: options });
          press.on('down', () => clearTimeout(ghost));
          press.on('choose', ({ id }) => chosen(mark, options.find(o => o.id === id)));
          presses.push(press);
        }
      });
    },
    ask(at, options) {
      offered?.leave();
      const mg = offered = b.minigame.start({ plate: false });
      return new Promise(ok => {
        const over = action => { ok(action); mg.leave(); if (offered === mg) offered = null; };
        const mark = mg.mark({ at });
        if (!mark.pos) { over(null); return; }
        const press = mg.press({ on: mark, petals: options, open: true });
        press.on('choose', ({ id }) => { mg.snap({ at: mark }); over(options.find(o => o.id === id)); });
        press.on('fold', () => over(null));
      });
    },
    withdraw() { offered?.leave(); offered = null; },
  };
}
