// What a chapter's steps play with: context(b, view, hub, state, j, {forward}) → g. Its state is a working copy — kept
// only once the step is done (game.js). A step left behind (the player went to the map: ☰) does nothing more and never
// ends: whatever it still calls returns a promise that never settles.
// Stage 3 of the game (rpg docs/writing-games-v2/game-stages.md): the whole play on the world's three scenes as they
// are — people stand, the scenes only say who is there. What the scenario's film would show is a plate with “Next”
// (g.plate, g.sheet); a mini-game is its stub — a mark to press and a card saying what it will be (minigames/stub.js);
// a place the world has not got yet — the people in one of its scenes and a label saying where it really is.
//   g.state — what the play carries: {scales, shown, marks, choices} (game.js); what follows from it: facts(g.state)
//   g.signal — aborts when the step is left
//   g.scene(folder, {here, moods, keys, where}, {cut}) — that scene of the world, full-screen: of its people only
//     `here` (ids) are there (`<id>_here`, the engine's key), their faces as `moods` say ({id: mood}); `keys` — the
//     scene's own keys (its spec.states: the parlour's `envelope`); `where` — a label in the corner, where this really
//     happens (none: the place is the scene's own). Always opened anew
//   g.here(id, on) — someone of the shown scene comes or goes (in one cut); g.mood(id, mood) — their face;
//     g.set(key, value) — one of the shown scene's own keys
//   g.wait(ms) — time of the game's own (a pause)
//   g.say(who, text, at) — someone of the game's people (people.json) says it over `at` (default: over themselves if
//     they are in the scene, else low in the middle, as the narrator), in their voice; → a breath after it is heard
//   g.plate(text) — a plate over the scene: what happens here that the scene does not show; → once “Next” is pressed
//   g.sheet(title, lines) — the same, a list (what the camera passes in a finale)
//   g.choose(choice, {ref: options}) — the player presses one of the points ('id#point' — on a person
//     one of their own points, 'bill#chest', never over the face; 'id' — an element), then one of its options ([{id, label}]: petals, one too — the language of mini-games, hub.offer); → the option's id, kept in
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

// the world's scenes the game plays, by their folders (the coal gate — also the map's background, game.js)
export const SCENES = { gate: 'coal-gate', kitchen: 'kitchen', parlour: 'parlour' };

// The scales (scenario «Шкалы и метки»), each with two sides: where they start, their bounds, its name in the gauge,
// the side the player reads when they move (up: delta > 0, down: delta < 0), and the one line that says what they
// mean — told when the scale first moves.
export const SCALES = {
  trade: { start: 3, min: 0, max: 5, name: tr('Trade'), up: tr('The Furlong name stands higher'), down: tr('The Furlong name stands lower'),
    rule: tr('Trade — the orders, and the Furlong name with the sisters and in the town.') },
  home: { start: 4, min: 0, max: 5, name: tr('Home'), up: tr('Peace at home'), down: tr('Trouble at home'),
    rule: tr('Home — the peace of Eileen and the girls. Peace at home and the truth at home are not the same thing.') },
};
export const ORDER = ['trade', 'home'];

// What each option of each choice does (scenario: the scales' table, the marks' register): the scales, then the marks
// ([key, value, text | null]). What depends on more than the option (Sheila's solo, what Bill carries) the chapter
// does itself.
const BOUGHT = tr('The Mother Superior thinks she has bought him.');
export const EFFECTS = {
  road: { coins: { marks: [['boy', true, tr('The boy will remember.')]] }, pass: {} },
  chapel: { leave: {}, toffee: { marks: [['name', true, tr('Sara knows his name.')]] },
    aloud: { trade: -1, marks: [['aloud', true, tr('He asked aloud — and the Mother Superior saw him.')]] } },
  shed: { promise: { marks: [['promise', true, tr('Bill promised: “I’ll ask where he is.”')]] }, silent: {} },
  bolt: { out: { trade: -1, marks: [['punished', true, tr('Sara is punished for his words.')]] }, hold: {} },
  plea: { silent: {}, shoes: { marks: [['shoes', true, tr('He asked for her: convent boots for her now, and someone at her back.')]] } },
  envelope: { girls: { trade: 1, marks: [['convent', 'bought', BOUGHT]] },
    boots: { trade: 1, marks: [['convent', 'bought', BOUGHT], ['boots', true, tr('Her money goes on shoes for Sara.')]] },
    table: { trade: -1, marks: [['convent', 'remembers', tr('The Mother Superior will remember.')]] } },
  eileen: { all: { home: -1, marks: [['eileen', 'all', tr('Eileen knows everything.')]] },
    house: { marks: [['eileen', 'house', tr('Eileen agrees: if the sisters give her up themselves, on Christmas Eve.')]] },
    bundle: { marks: [['eileen', 'bundle', tr('Eileen has packed a bundle, and asked nothing.')]] },
    none: { marks: [['eileen', 'none', tr('Eileen: “not our business.”')]] } },
  cafe: { coal: { marks: [['kehoe', 'coal', tr('Mrs Kehoe: “Then bring it.”')]] },
    child: { marks: [['kehoe', 'child', tr('Mrs Kehoe will ask about the boy. “Don’t name me.”')]] },
    public: { trade: -1, marks: [['kehoe', 'public', tr('He said it in front of people.')]] } },
  gate: { chute: {}, deal: {}, open: { trade: -2, home: -1 }, home: {} },
  again: { chute: {}, open: { trade: -2, home: -1 }, home: {} },
  bell: { stay: {}, go: {} },
};
export const ENDINGS = [
  { id: 'town', label: tr('Through the Town') }, { id: 'crown', label: tr('The Paper Crown') },
  { id: 'file', label: tr('The File behind the Grille') }, { id: 'glass', label: tr('The Misted Glass') },
  { id: 'tracks', label: tr('Tracks on the Frost') },
];

// What follows from the play so far — all a step reads of it besides g.state. A choice not made (its step gone to by
// the author's map past it) gives its first option.
export function facts(state) {
  const c = state.choices, m = state.marks, s = state.scales;
  const envelope = c.envelope ?? 'girls', eileen = c.eileen ?? 'all', kehoe = c.cafe ?? 'coal';
  const bought = envelope !== 'table', boots = envelope === 'boots';
  // the bargain at the main gates: refused by a Mother who remembers, or who heard her house talked of in the café
  const refused = !bought || kehoe === 'public';
  const first = c.gate ?? 'chute';
  const gate = first === 'deal' && refused ? c.again ?? 'chute' : first;
  // the shoebox with him on Christmas Eve (under the tree for Kathleen, if Eileen said “not our business”)
  const carried = boots && eileen !== 'none';
  const ending = { open: 'town', chute: 'file', deal: 'crown', home: c.bell === 'go' ? 'tracks' : 'glass' }[gate];
  return {
    road: c.road ?? 'coins', chapel: c.chapel ?? 'leave', envelope, eileen, kehoe, gate, refused,
    boy: !!m.boy, name: !!m.name, aloud: !!m.aloud, promise: !!m.promise, punished: !!m.punished, shoes: !!m.shoes,
    bought, boots, carried, bundle: eileen === 'bundle', paper: kehoe === 'child',
    // the money for the bargain: the envelope's, if it went to the girls; else the week's takings
    takings: envelope !== 'girls',
    // what Sara has on her feet (one rule for all the finales): his shoes, if he brought them to her; else the convent's
    // boots, if he asked for her; else bare
    feet: carried && ['open', 'chute', 'deal'].includes(gate) ? 'his' : m.shoes ? 'convent' : 'bare',
    trade: s.trade, home: s.home,
    ending,
    // “Through the Town”: the door Eileen opens herself (she knows everything), else his hand on a door not yet open
    form: ending === 'town' ? (eileen === 'all' ? 'door' : 'hand') : null,
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
  let own = new Set(); // the shown scene's own keys (spec.states)
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
    async scene(folder, { here = [], moods = {}, keys = {}, where = null } = {}, { cut = false } = {}) {
      if (gone()) return never;
      const spec = await alive(unseen() ? j.real(b.specOf(folder)) : b.specOf(folder));
      people = new Set((spec.objects ?? []).filter(o => o.person).map(o => o.id));
      own = new Set(Object.keys(spec.states ?? {}));
      for (const id of here) if (!people.has(id)) throw new Error(`the scene “${folder}” has no “${id}”`);
      for (const key of Object.keys(keys)) if (!own.has(key)) throw new Error(`the scene “${folder}” has no key “${key}”`);
      present = new Set(here);
      const st = { ...keys };
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
    set(key, value) {
      if (gone()) return;
      if (!own.has(key)) throw new Error(`the scene has no key “${key}”`);
      put(key, value);
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
