// What a chapter's steps play with: context(b, view, hub, state, j, {forward}) → g. Its state is a working copy — kept
// only once the step is done (game.js). A step left behind (the player went to the map: ☰) does nothing more and never
// ends: whatever it still calls returns a promise that never settles.
// Stage 5 (rpg docs/writing-games-v2/game-stages.md): each step is a row of the scenes' pieces (the world's module
// `beats`: the key `beat`, the scene tells `beat:<name>` as a piece ends and `<piece>:<moment>` at its moments); the
// game says its lines at the moments, makes its choices and mini-games (minigames/) in the poses the pieces end in, cuts
// from scene to scene, titles the months. The truth of each scene's pieces, keys and points is its notes.md, “Contract
// for the check”.
//   g.state — what the play carries: {scales, shown, marks, choices} (game.js); what follows from it: facts(g.state)
//   g.signal — aborts when the step is left: stop what it started on it
//   g.sound — the game's sounds (sound.js); g.beds(levels, seconds) — the beds named to their levels, every other one
//     to nothing
//   g.scene(folder, {beat, here, moods, keys}, {cut}) — that scene of the world, full-screen, opened on the piece
//     `beat` (playing from its first frame; g.beat(beat) then takes it up — waits for its end): of its people only
//     `here` (ids) are there (`<id>_here`, the engine's key), their faces as `moods` say; its keys — what the play has
//     made of the place and what the pieces read of the play (carry), and over them the step's own `keys` (the hour,
//     what the step decided). Always opened anew. cut: the scene before stays till this one is drawn, then gives way
//     to it in one frame; else the page fades through black (time has passed)
//   g.beat(name, {wait}) — a piece of the shown scene; → once it has ended (the scene tells 'beat:<name>'), or at once
//     with wait: false. To wait for a moment of a piece, make the g.told before g.beat. A piece cut to that is not the
//     next one of the scene's film: g.set('beat_next', name) while the one before plays (its first frame made ready)
//   piece(g, name, {moment: fn}, open) — the piece, each of its moments' fn (the lines said there) run as it is told,
//     in order; open — the scene opened on it (g.scene), its moments listened for first; → once the piece has ended
//   g.told(text, ms) — until the scene tells `text` (→ true), or ms pass (→ false); g.each(text, fn) — fn each time
//     the shown scene tells it (its lightning), till the next scene
//   g.set(key, value, seconds) / g.get(key) — the shown scene's state; g.here(id, on), g.mood(id, mood) — someone of
//     it comes or goes, their face
//   g.wait(ms) — time of the game's own (a pause); never to wait for something the scene does
//   g.say(who, text, at) — someone of the game's people (people.json) says it over `at` ('id' | 'id#point' |
//     'narrator'; default: over themselves if they are in the scene, else as the narrator), in their voice; → a breath
//     after it has been heard
//   g.choose(choice, {ref: options}) — the player presses one of the points ('id#point' | 'id'), then one of its
//     options ([{id, label}]: petals, one too — the language of mini-games, hub.offer); → the option's id, kept in
//     state.choices[choice] (choice null: not a choice of the chapter's map)
//   g.play(minigame, opts) — a mini-game (a module of minigames/: {title, about, skipped, run(g, b, opts, signal)});
//     the signal aborts when it is skipped (the page's ⏭, where it may be skipped) or the step is left; → its result
//   g.minigame({phrase}) — inside a minigame's run: the language's mini-game begun; g.failed() — a mistake made in it:
//     from then on the page's ⏭ may skip it (a mini-game the player has not seen may be skipped once they failed it,
//     or after SKIPPABLE s)
//   g.apply(choice) — what the option chosen does, by EFFECTS: the scales, then each mark
//   g.scale(name, delta) — a scale moves; the player sees which way (the gauge, the words)
//   g.gauge(name) — the scale is shown from now on; its one line of what it means said once
//   g.mark(key, value, text) — remembered (state.marks[key]); text — what the player is told; null — told nothing
//   g.note(text) — the player told what follows from the play (a promise kept or broken), with nothing remembered
//   on(g, moment, fn) — fn as the scene tells the moment (a sound of the game's on it; not waited for)
//   g.title(text) — words over the scene, as a film's title (the months); → once they have gone
//   g.done() → once the step's code is through: the page's ⏭ taken back; g.leave() — the step left behind (game.js)
// The page's ⏭ (bespoke.forward) is the step's while it is played ({forward}: whether the player has seen the step —
// game.js): where the step is seen, pressed, the step goes on at once to its next interaction — the next line said,
// choice, minigame, scene, piece it begins or title —, what is between done at once: its waits over, the line heard and
// those still to be said dropped, the scene in its instant mode (bespoke.instant: all it does ends at once, as it would —
// its pieces run to their ends and tell what they tell on the way), shown in one cut as the interaction is reached. In
// a minigame the ⏭ skips it; while a choice is offered there is none.
// A step may be played up to a minigame unseen, without time (the author's map: a jump — jump.js j), or all through
// (a dry run: game.js, check/run.mjs): then nothing of it is said, shown or heard, and a minigame gives what j.result
// says, else its `skipped`.
import * as sounds from './sound.js';

// the world's scenes the game plays, by their folders; `map` — the background of the play's map (game.js)
export const SCENES = { shore: 'shore', house: 'house', forest: 'forest', newHouse: 'new-house', cape: 'cape', sea: 'sea', map: 'map' };

// The hour of a step, as the island's common keys have it (each of its looks a number, 0 — the day): June and July —
// the day, the dawn, the dusk, the moonlit night; the end of July — the same; August — the same and `late`.
const LOOKS = { day: {}, dawn: { dawn: 1 }, dusk: { dusk: 1 }, night: { night: 1 } };
export const hour = (look, { late = false, ...more } = {}) => ({ dawn: 0, dusk: 0, night: 0, ...LOOKS[look], late: late ? 1 : 0, ...more });

// What the play has made of a place so far and what the pieces read of it (each scene's contract, `party`), as its
// scene's keys (a step's own keys go over them). Only the choices made (a play the author's map goes by has the rest
// beneath them — game.js: not made yet, nothing of them is seen).
export function carry(folder, state) {
  const c = { ...state.choices }, m = state.marks, s = state.scales, f = facts(state);
  const knew = c.head === 'papa';
  switch (folder) {
    case SCENES.shore: return {
      shell: m.smoke === 'told', graves: c.bird === 'bury' ? 5 : 0, chair: knew && m.drops ? 'set' : 'none',
      skirt: c.bottom !== 'go', knew, ask_back: s.sophia <= 1, heard: !!m.heard, knock_broken: f.knockBroken,
      hat: c.mama === 'moon' ? 'nail' : 'none',
      sign_smoke: c.smoke === 'secret' ? 'pouch' : c.smoke === 'tell' ? 'shell' : c.head === 'moss' ? 'packet' : 'pocket',
      sign_hat: c.mama === 'gone' ? 'on' : c.mama === 'sky' ? 'bag' : 'nail',
      sign_bird: c.bird === 'bury' ? 'graves' : c.bird === 'out' ? 'basket' : 'none',
    };
    case SCENES.house: return {
      hat: c.mama === 'gone' ? 'bed' : 'nail', teabox: c.bird === 'gift', drops: m.drops ? 'full' : 'none', cot: m.heard ? 'room' : 'veranda',
      papa_watch: c.bottom === 'down', secret: c.smoke === 'secret', cat: c.bird === 'gift', take_lantern: c.fog !== 'behind',
      sophia_hand: s.sophia <= 1, kick: c.night === 'knock', hold_hand: c.nets === 'net' && !knew, knew, sophia_knows: c.head === 'sophia',
    };
    case SCENES.forest: return {
      animals: m.seal ? 5 : 4, flipper: !!m.flipper, pack: c.smoke !== 'quit' ? 'none' : m.someday === 'kept' ? 'taken' : 'in',
      brave: s.sophia >= 3, sophia_back: c.mama === 'sky',
    };
    case SCENES.cape: return {
      lean: m.lean ?? 0, knocks: c.night === 'knock', lamp_hand: c.fog !== 'behind', weak: s.strength <= 1,
      sophia_night: c.night === 'scared' ? 'huddle' : s.sophia <= 1 ? 'cry' : 'whisper',
    };
    case SCENES.sea: return {
      sophia_at: s.sophia >= 3 ? 'bow' : s.sophia === 2 ? 'beside' : 'hand', grandma_at: s.sophia <= 1 ? 'hand' : 'seat',
      basket: c.bird === 'gift' ? 'cat' : 'shut', counted: c.head === 'sophia', storm_mark: c.storm ?? 'notyou',
      song: c.storm === 'blanket', sign_hat: c.mama === 'gone' ? 'on' : c.mama === 'sky' ? 'bag' : 'nail', mama: c.mama ?? 'gone',
      learned: f.learned, nets: c.nets ?? 'say', ask_mama: f.ending === 'oars' && f.form === 'full' && c.mama === 'gone',
      late_form: f.form === 'late', called: f.called, knock: f.knockBroken && !f.called,
    };
    default: return {};
  }
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


export const on = (g, moment, fn) => { g.told(moment).then(ok => { if (ok) fn(); }); };
// a piece and the lines of its moments (see the head)
export async function piece(g, name, at = {}, open = null) {
  const moments = Object.entries(at).map(([m, fn]) => [g.told(`${name}:${m}`), fn]);
  if (open) await open();
  const ended = g.beat(name);
  for (const [heard, fn] of moments) if (await heard) await fn();
  await ended;
}

const BEAT = 180000; // a piece longer than this has not ended: the scene lacks it
const EACH = 600000; // ms g.each waits for a tell before it asks again
const SKIPPABLE = 20000; // ms in a minigame of a step not seen yet before the ⏭ may skip it

export function context(b, view, hub, state, j = null, { forward = null } = {}) {
  const left = new AbortController(); // the step is left behind (game.js)
  const gone = () => left.signal.aborted;
  const never = new Promise(() => {});
  const alive = p => p.then(v => (gone() ? never : v));
  const unseen = () => j?.on;
  // the ⏭ pressed (fast: the step going on at once to its next interaction — land() there); the game's own waits going
  let fast = false, choosing = false, showing = false;
  const waits = new Set();
  const sleep = ms => (gone() ? never : unseen() ? j.sleep(ms) : fast ? Promise.resolve() : new Promise(ok => {
    const w = { ok: () => gone() || ok() };
    w.timer = setTimeout(() => { waits.delete(w); w.ok(); }, ms);
    waits.add(w);
  }));
  const put = (key, value, seconds) => (unseen() ? j.did([key, value]) : b.set(key, value, seconds));
  let people = new Set(), present = new Set(); // the shown scene's people; those of them there now
  let opening = null; // the piece the scene was opened with, till g.beat takes it up: {name, ended}
  let shown = 0; // the scenes the step has opened (g.each listens to the one shown)
  let playing = null; // the minigame played now: {signal, end, skippable}
  // the page's ⏭ as the step stands now: none while a choice is offered or the step is still unseen; in a minigame —
  // its skip, where it may be skipped; else, where the step is seen, on to the next interaction
  const ahead = () => {
    if (forward == null || gone()) return;
    b.forward(choosing || unseen() ? null : playing ? (playing.skippable ? skip : null) : forward ? hurry : null);
  };
  const skip = () => { if (playing && !b.minigame.skip()) playing.end(); };
  function hurry() {
    if (gone() || fast || showing || playing || choosing || unseen()) return;
    fast = true;
    b.hush();
    b.instant(true);
    for (const w of waits) { clearTimeout(w.timer); w.ok(); }
    waits.clear();
  }
  // the next interaction reached: the scene as all it did meanwhile has left it, shown in one cut
  async function land() {
    if (!fast) return;
    fast = false;
    await b.instant(false);
  }
  // a jump at its minigame (or stuck before it: a choice the play didn't make): the scene where the step has got to —
  // and the step on from there, seen
  let seeing = null;
  const seen = () => (seeing ??= (async () => {
    const { shown, then } = j;
    for (const h of j.seen()) hub.told(h.text, h.ms).then(h.ok);
    view.gauge(state);
    if (shown) await alive(b.show(shown.folder, { state: shown.state, captions: false, then }));
    ahead();
  })());
  if (j && j.target < Infinity) j.idle.then(seen);
  // the time a line asks, once said: heard — a breath after; shown without a voice — as long as it takes to read it
  const after = ({ heard, text }) => sleep(heard ? 500 : 300 + text.length * 60);
  const g = {
    state,
    signal: left.signal,
    get sound() { return unseen() ? j.sounds : sounds; },
    beds(levels, seconds = 2) {
      if (!gone()) g.sound.beds(levels, seconds);
    },
    async scene(folder, { beat = null, here = [], moods = {}, keys = {} } = {}, { cut = false } = {}) {
      if (gone()) return never;
      const spec = await alive(unseen() ? j.real(b.specOf(folder)) : b.specOf(folder));
      people = new Set((spec.objects ?? []).filter(o => o.person).map(o => o.id));
      for (const id of here) if (!people.has(id)) throw new Error(`the scene “${folder}” has no “${id}”`);
      present = new Set(here);
      const st = { ...carry(folder, state), ...keys };
      for (const id of people) st[`${id}_here`] = present.has(id);
      for (const [id, mood] of Object.entries(moods)) st[`${id}_mood`] = mood;
      if (beat) st.beat = beat;
      shown++;
      if (unseen()) {
        opening = beat ? { name: beat, ended: g.told(`beat:${beat}`, BEAT) } : null;
        j.scene(folder, st);
        return;
      }
      showing = true;
      try {
        if (fast) await alive(land());
        opening = beat ? { name: beat, ended: g.told(`beat:${beat}`, BEAT) } : null;
        hub.withdraw();
        await alive(b.show(folder, { state: st, captions: false, fade: !cut }));
      } finally { showing = false; }
    },
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
    each(text, fn) {
      if (gone() || unseen()) return;
      const mine = shown;
      const again = () => hub.told(text, EACH).then(ok => { if (!gone() && mine === shown) { if (ok) fn(); again(); } });
      again();
    },
    set: (key, value, seconds) => (gone() ? undefined : put(key, value, seconds)),
    get: key => (unseen() ? j.values[key] : b.get(key)),
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
    async choose(choice, offers) {
      if (gone()) return never;
      const offer = async () => {
        if (fast) await alive(land());
        choosing = true;
        ahead();
        try { return await alive(hub.offer(offers)); } finally { choosing = false; ahead(); }
      };
      // unseen: as the play chose it — else the first offered; one it chose that isn't here: offered once seen
      let action;
      if (unseen()) {
        const all = Object.values(offers).flat(), was = choice && state.choices[choice];
        action = !was ? all[0] : all.find(o => o.id === was) ?? (await new Promise(ok => j.later(() => offer().then(ok))));
      } else action = await offer();
      if (choice) state.choices[choice] = action.id;
      return action.id;
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
    // a mistake made in the mini-game (beside its mg.error): from the first one on it may be skipped (scenario §7:
    // “Skip” after the first failure — the page's ⏭)
    failed() {
      if (!playing || playing.skippable) return;
      playing.skippable = true;
      ahead();
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
    note(text) {
      if (!gone() && !unseen()) view.toast(text, 'mark');
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
    },
  };
  ahead();
  return g;
}

// The player's choices and what the scenes tell, listened to once for the whole play (bespoke.on keeps a listener for
// good) — game.js owns it: whatever is being chosen now gets the action; whoever waits for a tell hears it.
//   hub.offer({ref: options}) → the action once the player has chosen it: a plain choice of the language of
//     mini-games — a mark on each point; a touch opens its options as petals, one too; one who touches no mark for
//     SHOW s is shown how: the ghost finger on each in turn
//   hub.ask(at, options) → the action chosen, or null: a mark born open where the game's own drawing was pressed (at:
//     fn → {x, y} page px — map.js), its options out as petals at once; a touch off them folds it — null
//   hub.withdraw() — nothing offered; hub.told(text, ms) → true once the scene tells it, false if ms pass
const SHOW = 8; // s: nothing pressed so long — the ghost shows how

export function listen(b) {
  let offered = null; // the plain choice going on: the language's mini-game
  const waiting = new Set(); // what the scene is waited to tell: {text, ok, timer}
  const told = (text, ms) => new Promise(ok => {
    const w = { text, ok };
    w.timer = setTimeout(() => { if (waiting.delete(w)) ok(false); }, ms);
    waiting.add(w);
  });
  b.on('tell', text => {
    for (const w of waiting) if (w.text === text) { waiting.delete(w); clearTimeout(w.timer); w.ok(true); }
  });
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
    told,
  };
}
