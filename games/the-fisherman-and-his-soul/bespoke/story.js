// What a chapter's steps play with: context(b, view, hub, state, j, {forward}) → g. Its state is a working copy — kept
// only once the step is done (game.js). A step left behind (the player went to the map: ☰) does nothing more and never
// ends: whatever it still calls returns a promise that never settles.
// Stage 5 of the game (moood-me/moood docs/writing/game-stages.md), under way: the places on their own scenes (PLACES;
// the potter's room and the shore still stand in others till their scenes come), the people where the scenes
// have them, the mini-games real (minigames/); what the scenes' pieces will show is a plate with “Next” (g.plate,
// g.sheet) till the pieces come (the contract: docs/new-games/rybak-i-dusha/game.md «Stage 5 — pieces»).
//   g.state — what the play carries: {scales, shown, marks, choices} (game.js); what follows from it: facts(g.state)
//   g.signal — aborts when the step is left
//   g.scene(place, {beat, here, moods, keys, where}, {cut}) — that place of the game (PLACES: the world's scene it is
//     played on, and where it really is when that scene stands in for it), full-screen: of the game's people only `here`
//     are there — those of them the scene has (`<id>_here`, the engine's key; whom it has not are not seen: voices
//     only) —, their faces as `moods` say ({id: mood}); `keys` — values of the scene's own keys (its scene.json's
//     states) or a person's (`<id>_with`…); `where` — a label of the step's own, what the scene cannot show yet (the
//     hour, the year) — over the place's. Always opened anew; `cut` — in one cut, else through black
//   g.beat(name, {wait}) — a piece of the shown scene (its key `beat`; world module `beats`); → once it has ended (the
//     scene tells `beat:<name>`), or at once with wait: false; g.scene(place, {beat}) opens the scene on it.
//     g.told(text, ms) — till the scene tells `text` (→ true) or ms pass (→ false). piece(g, name, {moment: fn}) — the
//     piece with the lines said at its moments
//   g.here(id, on) — someone of the shown scene comes or goes (in one cut); g.mood(id, mood) — their face (both: only
//     the game's people the scene has; others are let be)
//   g.set(key, value, seconds) — one of the shown scene's own keys (or a person's): at once, or moved over seconds;
//     g.get(key) — what it is now
//   g.wait(ms) — time of the game's own (a pause)
//   g.say(who, text, at) — someone of the game's people (people.json) says it over `at` (a person of the scene: default
//     themselves) if they are here, else low in the middle, as the narrator, in their voice; → a breath after it is
//     heard
//   g.plate(text) — a plate over the scene: what happens here that the scene does not show; → once “Next” is pressed
//   g.sheet(title, lines) — the same, a list
//   g.choose(choice, {ref: options}) — the player presses one of the points ('id#point' | 'id'), then one of its
//     options ([{id, label}]: petals, one too — the language of mini-games, hub.offer); → the option's id, kept in
//     state.choices[choice] (choice null: not a choice of the chapter's map)
//   g.interrupt(choice, {ref: [option]}, otherwise, ms, phrase) — a sign (the scenario's interruptions): one touch on
//     the one point within ms, its arc of time running down (a press with no petals; phrase — the plate's line) — or
//     it passes, and the play goes on as `otherwise` ({id}); → the id, kept in state.choices[choice] like a choice's
//   g.play(minigame, opts) — a mini-game (a module of minigames/: {title, about, skipped, missed, points, keys,
//     run(g, b, opts, signal)}); the signal aborts when it is skipped (the page's ⏭, where it may be skipped) or the
//     step is left; → its result
//   g.minigame({phrase}) — inside a minigame's run: the language's mini-game begun; g.failed() — a mistake in it (from
//     then on the page's ⏭ may skip it)
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
// minigame gives its `skipped` (or what the dry run asks: j.result — check/run.mjs plays the misses too).

// The game's places (scenario §4) and the world's scene each is played on — the one map of them: a place whose own
// scene is not made yet stands in one of the ready ones, its people there, and `where` says (a label high on the left)
// where it really is. When the place's own scene comes, its line here becomes `{ folder: '<its folder>' }` (the shore:
// `{ folder: 'pier', keys: { view: 'shore' } }`) — nothing else changes: the steps name places, never folders. (The
// pier is also the map's background, game.js.)
export const PLACES = {
  pier: { folder: 'pier' }, // С1 the pier
  // С1 seen toward the land (the pieces' contract: the pier's key `view`); till then the pier, said by the label
  shore: { folder: 'pier', where: tr('In truth: the shore by the pier — the sand, the rail with his net; up the bank, the field where the linen is bleached.') },
  stone: { folder: 'stone' }, // С2 the stone (and the boat by it, at sea)
  priest: { folder: 'priest-house' }, // С3 the Priest's house
  well: { folder: 'well' }, // С4 the well
  bridge: { folder: 'bridge' }, // С5 the bridge and the town
  // С5 inside: the scene `potter-room` (asked of the world); till then the bridge, the potter's house seen from outside
  room: { folder: 'bridge', where: tr('In truth: inside the potter’s house — the hearth, the bench, the shelf with the silver cup.') },
  deep: { folder: 'deep' }, // С6 the deep
};
// The people the steps name who never speak (people.json has the ones heard): the scenes' elements, seen as the scenes
// get them (the pieces' contract, game.md)
export const SILENT = ['velvet', 'daughter', 'woman_a', 'woman_b', 'widow_girl', 'widow_boy', 'beggar', 'musician_a', 'musician_b'];
// The stone's moments (its notes.md, «The moments»): the keys that put it there. Its people are put by its script from
// `<id>_at`; `here` says who is there.
export const STONE = {
  night: { boat: true, lantern: 1, net: 'heap', fisherman_at: 'boat' }, // П.1–П.2: the boat by the stone, the net in it
  net: { boat: true, lantern: 1, net: 'over', fisherman_at: 'boat', mermaid_at: 'net' }, // П.3–П.4: she in his net
  evenings: { boat: true, lantern: 1, net: 'heap', fisherman_at: 'boat', mermaid_at: 'stone' }, // П.5: she on the stone
  ask: { boat: false, lantern: 0, fisherman_at: 'shallows', mermaid_at: 'stone' }, // 1.1: he knee-deep by the stone
  rise: { boat: false, lantern: 0, fisherman_at: 'water', far_light: 0.5 }, // 3С.1 «Подняться»: his lantern far away
  sea: { boat: true, lantern: 1, net: 'heap', fisherman_at: 'boat' }, // 4.5–4.6: the widow's boat at sea, at night
  lights: { boat: false, lantern: 0, deep_lights: true, far_light: 0.5 }, // «Два огня»: the last shot
};
// The deep's moments (its notes.md, «The moments»): where he is (its script puts both and turns them), the evening
// up there, the years
export const DEEP = {
  sand: { fisherman_at: 'sand' }, // 2.1: the two sitting side by side on the low stone in the sand
  standing: { fisherman_at: 'standing' }, // 2.5: he on his feet on the sand before her
  dusk: { fisherman_at: 'sand', dusk: 1, far_light: 0.01 }, // 3С.1: evening up there, his lantern far above
  years: { fisherman_at: 'sand', years: true, hands: false }, // «Два огня»: years on, his hair white
};
// The Priest's house's moments (its notes.md): the morning; the Fisherman on the bench (its default) or not here
export const PRIEST = {
  morning: { morning: 1 }, // 1.2
  // «Белые цветы», the feast: the flowers on the altar, the Priest at it turned to the room, the women before him
  feast: { morning: 1, flowers: 'altar', priest_turn: 150, woman_a_a: -0.9, woman_a_d: 2.6, woman_b_a: 0.2, woman_b_d: 2.9,
    woman_a_look: 'priest', woman_b_look: 'priest' },
  // «Фонарь на мостках», the third spring: the flowers on the threshold, then on the altar
  threshold: { morning: 1, flowers: 'threshold', fisherman_on: null, fisherman_a: 0.45, fisherman_d: 5.75 },
  altar: { morning: 1, flowers: 'altar' },
  // «Два огня», years on: the Priest on the threshold speaking to the room; the women and the Witch before him
  sermon: { morning: 1, priest_a: 0.45, priest_d: 5.6, priest_turn: 180, witch_mood: 'laugh' },
};

// The scales (scenario §8), each with two sides: where they start, their bounds, its name in the gauge, the side the
// player reads when they move (up: delta > 0, down: delta < 0), and the one line that says what they mean. Both start
// at 0 and are set by their first choice (the Song in П.4, the Soul in 1.9) — moved by as much as that choice sets.
// They are read by one threshold everywhere: the Soul 0–2 longs, 3–4 has hardened; the Song 2–3 sounds, 0–1 is silent.
export const SCALES = {
  soul: { start: 0, min: 0, max: 4, name: tr('The Soul'), up: tr('The Soul grows harder'), down: tr('The Soul longs'),
    rule: tr('The Soul — how much the world without a heart has taught her. 0–2: she longs for him; 3–4: she has grown hard.') },
  song: { start: 0, min: 0, max: 3, name: tr('Her song'), up: tr('Her song sounds'), down: tr('Her song grows quiet'),
    rule: tr('Her song — the song she sings to him. 2–3: it sounds; 0–1: it has fallen silent.') },
};
export const ORDER = ['soul', 'song'];

// What each option of each choice does (scenario §8, §9): the scales, then the marks ([key, value, text | null]). What
// depends on more than the option (the rumour in 3С.2, the gauge shown at 0) the chapter does itself.
export const EFFECTS = {
  net: { word: { song: 1, marks: [['net', 'word', tr('She swore by the sea to come whenever you call.')]] },
    free: { song: 2, marks: [['net', 'free', tr('You let her go for nothing: she will come when she wants.')]] } },
  stop: { danced: { marks: [['danced', true, tr('You danced on the pier.')]] }, passed: {} },
  witch: { demand: { marks: [['witch', 'demanded', tr('The Witch will remember: you held her to her word.')]] },
    dance: { marks: [['witch', 'danced', tr('The Witch will remember: you danced with her till dawn.')]] } },
  heart: { ask: { soul: 1 }, cut: { soul: 2 },
    come: { song: -1, marks: [['come', true, tr('You promised the Soul: once a year you will come out to her.')]] } },
  sit: { sit: { soul: -1, song: -1 }, song: { soul: 1, song: 1 } },
  day: { go: {}, stay: { soul: 1 } },
  wait: { wait: {}, back: { soul: 1 } },
  cup: { confess: { soul: -1, marks: [['thief', true, tr('By evening the whole market knows: the fisherman from the bay is a thief.')]] },
    quiet: { soul: 1 } },
  rise: { rose: { song: -1 }, stayed: {} },
  last: { go: {}, no: { soul: 1 } },
  giveback: { confess: { soul: -1 }, found: { soul: 1 } },
  widow: { out: { marks: [['widow', 'out', tr('You went out for the widow’s children.')]] },
    stayed: { marks: [['widow', 'stayed', tr('You stayed by the water. The widow’s children went away.')]] } },
  wave: { stay: {}, pull: {} },
};
export const ENDINGS = [
  { id: 'flowers', label: tr('White Flowers') }, { id: 'lantern', label: tr('A Lantern on the Pier') },
  { id: 'lights', label: tr('Two Lights') },
];

// What follows from the play so far — all a step reads of it besides g.state. A choice not made (its step gone to by
// the author's map past it) gives its first option. The road (scenario §12): `went` — went on the first hinge; `late`
// — stayed, then went on the last call; `deep` — stayed both times (no chapter 4). The ending: `deep` — Two Lights;
// else the wave decides — stay: White Flowers, pull her from the water: A Lantern on the Pier.
export function facts(state) {
  const c = state.choices, m = state.marks, s = state.scales;
  const day = c.day ?? 'go', last = c.last ?? 'go', wave = c.wave ?? 'stay';
  const road = day === 'go' ? 'went' : last === 'go' ? 'late' : 'deep';
  return {
    net: c.net ?? 'word', danced: !!m.danced, witch: c.witch ?? 'demand', heart: c.heart ?? 'ask', come: !!m.come,
    sit: c.sit ?? 'sit', day, wait: c.wait ?? 'wait', cup: c.cup ?? 'confess', rise: c.rise ?? 'rose', last,
    giveback: c.giveback ?? 'confess', widow: c.widow ?? 'out', wave,
    road, thief: !!m.thief,
    // the Soul longs (0–2) or has grown hard (3–4); her song sounds (2–3) or is silent (0–1)
    hard: s.soul >= 3, sounds: s.song >= 2,
    ending: road === 'deep' ? 'lights' : wave === 'stay' ? 'flowers' : 'lantern',
  };
}

// piece(g, name, {moment: fn}) — the piece `name` of the shown scene (its key `beat`; the scene tells `<name>:<moment>`
// at its moments and `beat:<name>` as it ends), each moment's fn (the lines said there) run as it is told, in order;
// → once the piece has ended and its moments' lines are said. A scene opened on the piece (g.scene with `beat`): its
// moments are listened for from before it opens — `open` opens it.
export async function piece(g, name, at = {}, open = null) {
  const moments = Object.entries(at).map(([m, fn]) => [g.told(`${name}:${m}`, BEAT), fn]);
  if (open) await open();
  const ended = g.beat(name);
  for (const [heard, fn] of moments) if (await heard) await fn();
  await ended;
}

const BEAT = 180000; // a piece longer than this has not ended: the scene lacks it
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
  const put = (key, value, seconds) => (unseen() ? j.did([key, value]) : b.set(key, value, seconds));
  let people = new Set(), present = new Set(); // the shown scene's people; those of them there now
  let opening = null; // the piece the scene was opened with, till g.beat takes it up: {name, ended}
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
    for (const h of j.seen()) hub.told(h.text, h.ms).then(h.ok);
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
    async scene(place, { beat = null, here = [], moods = {}, keys = {}, where = null } = {}, { cut = false } = {}) {
      if (gone()) return never;
      const at = PLACES[place];
      if (!at) throw new Error(`no place “${place}”`);
      const { folder } = at, label = where ?? at.where ?? null;
      const spec = await alive(unseen() ? j.real(b.specOf(folder)) : b.specOf(folder));
      people = new Set((spec.objects ?? []).filter(o => o.person).map(o => o.id));
      // (of the game's people the scene has: those here; the others are voices only)
      present = new Set(here.filter(id => people.has(id)));
      const st = {};
      for (const id of people) st[`${id}_here`] = present.has(id);
      for (const [id, mood] of Object.entries(moods)) if (people.has(id)) st[`${id}_mood`] = mood;
      Object.assign(st, at.keys ?? {}, keys);
      if (beat) st.beat = beat;
      if (unseen()) {
        opening = beat ? { name: beat, ended: g.told(`beat:${beat}`, BEAT) } : null;
        j.scene(folder, st, label);
        return;
      }
      showing = true;
      try {
        if (fast) await alive(land());
        opening = beat ? { name: beat, ended: g.told(`beat:${beat}`, BEAT) } : null;
        hub.withdraw();
        view.where(null);
        await alive(b.show(folder, { state: st, captions: false, fade: !cut }));
        view.where(label);
      } finally { showing = false; }
    },
    here(id, on) {
      if (gone() || !people.has(id)) return;
      if (on) present.add(id); else present.delete(id);
      put(`${id}_here`, on);
    },
    mood(id, mood) {
      if (gone() || !people.has(id)) return;
      put(`${id}_mood`, mood);
    },
    set(key, value, seconds) {
      if (gone()) return;
      put(key, value, seconds);
    },
    get: key => (unseen() ? j.values[key] : b.get(key)),
    async beat(name, { wait = true } = {}) {
      if (gone()) return never;
      // (the piece the scene was opened with: playing already)
      const opened = opening?.name === name ? opening : null;
      opening = null;
      if (!opened && fast) await alive(land());
      const ended = opened ? opened.ended : wait ? g.told(`beat:${name}`, BEAT) : null;
      if (!opened) {
        put('beat', null); // (the same piece again is a change too)
        put('beat', name);
      }
      if (wait && !(await ended)) b.trouble(`the piece “${name}” did not end`);
    },
    told(text, ms = 60000) {
      return gone() ? never : unseen() ? j.heard(text, ms) : alive(hub.told(text, ms));
    },
    // a mistake made in the mini-game (beside its mg.error): from the first one on the page's ⏭ may skip it
    failed() {
      if (!playing || playing.skippable) return;
      playing.skippable = true;
      ahead();
    },
    wait: sleep,
    async say(who, text, at = who) {
      if (gone()) return never;
      // (over someone who is here; else low in the middle, as the narrator)
      if (!present.has(at.split('#')[0])) at = 'narrator';
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
    async interrupt(choice, offers, otherwise, ms, phrase = '') {
      if (gone()) return never;
      // unseen: as the play chose it — else the one offered (its id: a choice the player did not let pass)
      let id;
      if (unseen()) {
        const was = state.choices[choice], all = [...Object.values(offers).flat(), otherwise];
        id = (all.find(o => o.id === was) ?? all[0]).id;
      } else id = (await wait(() => hub.offer(offers, ms, otherwise.id, phrase))).id;
      state.choices[choice] = id;
      return id;
    },
    async play(minigame, opts = {}) {
      if (gone()) return never;
      if (unseen()) {
        j.plays.push(minigame);
        if (j.plays.length <= j.target) return j.result?.(minigame) ?? minigame.skipped;
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
//     SHOW s is shown how: the ghost finger on each in turn. hub.offer({ref: [action]}, within, otherwise, phrase) —
//     a sign: one touch on the one mark within `within` ms, its arc of time running down, no petals; not touched —
//     {id: otherwise}
//   hub.told(text, ms) → true once the scene tells `text` (bespoke.on('tell')), false if ms pass first
//   hub.ask(at, options) → the action chosen, or null: a mark born open where the game's own drawing was pressed (at:
//     fn → {x, y} page px — map.js), its options out as petals at once; a touch off them folds it — null
//   hub.withdraw() — nothing offered
const SHOW = 8; // s: nothing pressed so long — the ghost shows how

export function listen(b) {
  const waiting = new Set(); // what the scene is waited to tell: {text, ok, timer}
  const told = (text, ms) => new Promise(ok => {
    const w = { text, ok };
    w.timer = setTimeout(() => { if (waiting.delete(w)) ok(false); }, ms);
    waiting.add(w);
  });
  b.on('tell', text => {
    for (const w of waiting) if (w.text === text) { waiting.delete(w); clearTimeout(w.timer); w.ok(true); }
  });
  let offered = null; // the plain choice going on: the language's mini-game
  // a sign: one mark, a touch is the action (a mini-game's press, no petals), its arc of time running down; not
  // touched in time — `otherwise`
  function chance(offers, within, otherwise, phrase) {
    const mg = offered = b.minigame.start({ phrase }), [ref] = Object.keys(offers), [action] = offers[ref];
    return new Promise(ok => {
      const mark = mg.mark({ at: ref.includes('#') ? ref : `${ref}@`, time: 1 });
      const press = mg.press({ on: mark });
      const t0 = mg.t;
      let over = false;
      const end = (as, what) => { if (over) return; over = true; offs.forEach(f => f()); mg.end({ as }).then(() => { if (offered === mg) offered = null; }); ok(what); };
      const offs = [
        press.on('press', () => { mg.snap({ at: mark }); end('clean', action); }),
        mg.on('frame', ({ t }) => { const left = 1 - (t - t0) / (within / 1000); mark.set({ time: Math.max(0, left) }); if (left <= 0) end('neutral', { id: otherwise }); }),
      ];
    });
  }
  return {
    offer(offers, within = null, otherwise = null, phrase = null) {
      offered?.leave();
      if (phrase != null) return chance(offers, within, otherwise, phrase);
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
    told,
  };
}
