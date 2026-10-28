// What a chapter's steps play with: context(b, view, hub, state, j, {forward}) → g. Its state is a working copy — kept
// only once the step is done (game.js). A step left behind (the player went to the map: ☰) does nothing more and never
// ends: whatever it still calls returns a promise that never settles.
// Stage 4 of the game (rpg docs/writing-games-v2/game-stages.md): the whole play on the world's own scenes — people
// stand and breathe; each step opens its scene with the keys of the play (the hour and the weather of the island, where
// each one is, what the play has done to the place: carry). What the scenario's film would show is still a plate with
// “Next” (g.plate, g.sheet); a mini-game is its stub — a mark to press and a card saying what it will be
// (minigames/stub.js); a place the world has not got yet — the people in one of its scenes and a label saying where it
// really is. The truth of each scene's keys and points is its notes.md, “Contract for the check”.
//   g.state — what the play carries: {scales, shown, marks, choices} (game.js); what follows from it: facts(g.state)
//   g.signal — aborts when the step is left
//   g.scene(folder, {here, moods, where, keys}, {cut}) — that scene of the world, full-screen: of its people only `here`
//     (ids) are there (`<id>_here`, the engine's key), their faces as `moods` say ({id: mood}); then what the play has
//     done to the place (carry), then `keys` — the step's (the hour, the weather, where each one is: its contract's
//     party); `where` — a label in the corner, where this really happens (none: the place is the scene's own). Always
//     opened anew
//   g.here(id, on) — someone of the shown scene comes or goes (in one cut); g.mood(id, mood) — their face
//   g.set(key, value) — one of the shown scene's own keys (in one cut)
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

// the world's scenes the game plays, by their folders (the shore — also the map's background, game.js)
export const SCENES = { shore: 'shore', house: 'house', forest: 'forest', cape: 'cape', sea: 'sea' };

// What the play has done to a place (scenario §9, the marks), as the keys of its scene's party: the shell ashtray on the
// rail and the row of little graves on the shore; the hat, the tea box, the drops and Papa's camp bed in the house; the
// seal among the animals and the packet in the crevice in the forest.
export function carry(folder, state) {
  const m = state.marks;
  if (folder === SCENES.shore) return { shell: m.smoke === 'told', graves: m.cat === 'bury' ? 5 : 0 };
  if (folder === SCENES.house) return { hat: m.mama === 'gone' ? 'bed' : 'nail', teabox: m.cat === 'gift', drops: m.drops ? 'full' : 'none', cot: m.heard ? 'room' : 'veranda' };
  if (folder === SCENES.forest) return { animals: m.seal ? 5 : 4, pack: m.smoke !== 'quit' ? 'none' : m.someday === 'kept' ? 'taken' : 'in' };
  return {};
}

// The scales (scenario §8), each with two sides: where they start, their bounds, its name in the gauge, its two ends
// (`sides`: the left one, the right one; `spent` — its pips counted from the right end: the bar grows as the value
// falls), the side the player reads when it moves (up: delta > 0, down: delta < 0), and the one line that says what it
// means. Neither has a right side.
export const SCALES = {
  strength: { start: 3, min: 0, max: 4, spent: true, name: tr('Grandmother’s strength'), sides: [tr('kept herself'), tr('spent on the summer')],
    up: tr('Grandmother kept her strength'), down: tr('Grandmother spent her strength on the summer'),
    rule: tr('Grandmother’s strength: how much of her body is left for this summer. Kept herself — or spent it on the summer: the more she spends, the further the bar goes.') },
  sophia: { start: 1, min: 0, max: 4, name: tr('Sophia'), sides: [tr('hand in hand'), tr('on her own')],
    up: tr('Sophia goes on her own'), down: tr('Sophia holds on to Grandmother'),
    rule: tr('Sophia: hand in hand — on her own. Whether the girl holds on to Grandmother or goes by herself.') },
};
export const ORDER = ['strength', 'sophia'];

// What each option of each choice does (scenario §8, §9): the scales, then the marks ([key, value, text | null]). What
// depends on more than the option (the night in the new house, the promises kept or broken, Sophia calling in the fog)
// the chapter does itself. The promises are marks too: someday, notsoon, say, nottell, hear, knock — given, then kept or
// broken.
export const EFFECTS = {
  bottom: {
    hold: { sophia: -1, marks: [['water', 'held', tr('Sophia will remember: Grandmother held her by the wrist.')]] },
    go: { sophia: 1, marks: [['water', 'let', tr('Sophia will remember: Grandmother let her go.')]] },
    down: { strength: -1, marks: [['water', 'together', tr('Papa saw his mother climb out of the water.')]] },
  },
  smoke: {
    secret: { marks: [['smoke', 'secret', tr('A secret for two: Grandmother smokes.')]] },
    tell: { sophia: 1, marks: [['smoke', 'told', tr('No secret any more: a shell on the veranda rail.')]] },
    quit: { marks: [['smoke', 'quit', tr('The packet is deep in the crevice: Grandmother has given up.')]] },
  },
  nets: {
    say: { marks: [['nets', 'say', null], ['say', 'given', tr('Grandmother promised Papa: “I’ll tell you.”')]] },
    nothing: { marks: [['nets', 'nothing', tr('Papa will remember: “Nothing to tell.”')]] },
    net: { marks: [['nets', 'net', tr('Papa will remember: the net untangled together, and his question left unanswered.')]] },
  },
  bird: {
    gift: { sophia: 1, marks: [['cat', 'gift', tr('Sophia stroked the cat for the first time.')]] },
    bury: { marks: [['cat', 'bury', tr('From now on Sophia buries everything dead she finds.')]] },
    out: { sophia: -1, marks: [['cat', 'out', tr('The cat is put out for the night now.')]] },
  },
  mama: {
    gone: { sophia: 1, marks: [['mama', 'gone', tr('Sophia was told the truth: Mama is not here any more.')]] },
    sky: { sophia: -1, marks: [['mama', 'sky', null], ['notsoon', 'given', tr('Grandmother promised Sophia: “Not soon.”')]] },
    moon: { strength: -1, marks: [['mama', 'moon', tr('Sophia’s question was left unanswered.')]] },
  },
  head: {
    papa: { strength: 1, sophia: -1, marks: [['knows', 'papa', tr('Papa knows about her head. Now he decides.')]] },
    sophia: { sophia: 1, marks: [['knows', 'sophia', null], ['nottell', 'given', tr('Sophia knows about her head — and promised not to tell Papa.')]] },
    moss: { marks: [['knows', 'none', tr('Nobody knows about her head.')]] },
  },
  storm: {
    porch: { strength: -1, marks: [['storm', 'porch', tr('Sophia will remember: they looked at the storm together.')]] },
    blanket: { sophia: -1, marks: [['storm', 'blanket', tr('Sophia will remember: the song under the blanket.')]] },
    notyou: { sophia: 1, marks: [['storm', 'notyou', tr('Sophia will remember: it was not her doing.')]] },
  },
  night: {
    call: { sophia: -1, marks: [['night', 'call', null], ['hear', 'given', tr('Grandmother promised: “I’ll hear you.”')]] },
    scared: { sophia: 1, marks: [['night', 'scared', tr('Sophia will remember: being afraid is allowed.')]] },
    knock: { marks: [['night', 'knock', null], ['knock', 'given', tr('Grandmother promised: “At midnight I’ll knock. Three times.”')]] },
  },
  fog: { go: { strength: -1 }, papa: {}, lamp: { strength: -1 }, behind: { strength: -2 } },
};
export const ENDINGS = [
  { id: 'window', label: tr('The Window') }, { id: 'tent', label: tr('The Tent') },
  { id: 'oars', label: tr('The Oars') }, { id: 'shawl', label: tr('The Shawl on the Stone') },
];

// the line each hinge's option belongs to (scenario §3): Keep — the window, Together — the tent, Let go — the oars;
// behind the tent — the shawl (holding the incompatible)
const MAMA = { gone: 'oars', sky: 'window', moon: 'tent' };
const HEAD = { papa: 'window', sophia: 'oars', moss: 'tent' };
const FOG = { go: 'tent', papa: 'window', lamp: 'oars', behind: 'shawl' };

// What follows from the play so far — all a step reads of it besides g.state. A choice not made (its step gone to by
// the author's map past it) gives its first option.
export function facts(state) {
  const c = state.choices, m = state.marks, s = state.scales;
  const f = {
    bottom: c.bottom ?? 'hold', smoke: c.smoke ?? 'secret', nets: c.nets ?? 'say', bird: c.bird ?? 'gift',
    mama: c.mama ?? 'gone', head: c.head ?? 'papa', storm: c.storm ?? 'porch', night: c.night ?? 'call', fog: c.fog ?? 'go',
    strength: s.strength, sophia: s.sophia,
  };
  f.ending = FOG[f.fog];
  // the rule (§3): behind the tent — the shawl; else the fog's line, full if the moon's or the head's is the same
  f.form = f.ending === 'shawl' || MAMA[f.mama] === f.ending || HEAD[f.head] === f.ending ? 'full' : 'late';
  f.knew = f.head === 'papa'; // Papa knows since the forest
  f.learned = f.knew || f.fog !== 'lamp'; // … or learnt in the fog (not by the lamp)
  f.late = !f.knew && f.fog !== 'lamp'; // “When Papa learns” played in the fog
  f.called = !!m.called; // Sophia called out once in the fog (4.4)
  f.heard = f.fog === 'lamp' && f.called; // “I heard” — said to Papa in the morning
  f.house = f.head === 'moss'; // the night in the new house: “At night. Some day” kept
  // the promises at the end: “I’ll tell you” — kept only by telling him in the forest; “I’ll hear you” — broken if she
  // called and nobody came; “I’ll knock” — kept only by going (a shout instead of the knock when her strength failed)
  f.sayBroken = f.nets === 'say' && !f.knew;
  f.hearBroken = f.night === 'call' && f.called && (f.fog === 'lamp' || f.fog === 'behind');
  f.knockBroken = f.night === 'knock' && f.fog !== 'go';
  f.shouted = m.knock === 'shout';
  return f;
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
    async scene(folder, { here = [], moods = {}, where = null, keys = {} } = {}, { cut = false } = {}) {
      if (gone()) return never;
      const spec = await alive(unseen() ? j.real(b.specOf(folder)) : b.specOf(folder));
      people = new Set((spec.objects ?? []).filter(o => o.person).map(o => o.id));
      for (const id of here) if (!people.has(id)) throw new Error(`the scene “${folder}” has no “${id}”`);
      present = new Set(here);
      const st = {};
      for (const id of people) st[`${id}_here`] = present.has(id);
      for (const [id, mood] of Object.entries(moods)) st[`${id}_mood`] = mood;
      Object.assign(st, carry(folder, state), keys);
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
    set(key, value) {
      if (gone()) return;
      put(key, value);
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
