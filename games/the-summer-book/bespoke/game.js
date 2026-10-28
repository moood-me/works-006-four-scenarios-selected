// The Summer Book — after Tove Jansson. A bespoke game (moood/engines/bespoke) on the world “The Summer Book” (engine
// 3): one summer on an island in a pale northern sea; Grandmother, who is getting old, and Sophia, six, who lost her
// mother this spring; Papa silent at his table. The player is Grandmother: what will she have time to give the girl —
// the truth, protection, or the summer itself? A prologue, four chapters, an epilogue (rpg
// docs/new-games/letnyaya-kniga/scenario.md), each a row of steps on the world's scenes; the choices, the scales
// (Grandmother's strength, Sophia: hand in hand — on her own) and what is remembered carry from chapter to chapter; the
// three hinges decide the ending (story.js facts) — the play always goes through to the epilogue.
// Stage 5 (rpg docs/writing-games-v2/game-stages.md): the play whole on the world's own scenes, in their pieces (the
// world's module `beats`), with its sounds (sound.js) and its mini-games (minigames/).
//   The map of the play (moood/docs/agents/games.md §2): a leaf for each chapter hung at its point over “The map”,
// the island as Papa drew it (map.js); the finale — the epilogue's leaf's last row. What can be done on it is its own
// drawing — pressed, the language's mark opens there,
// born open (story.js hub.ask): the main run's pointer — “Start”, “Continue” (from the beginning of the step it stopped
// in); a chapter played — “Replay the chapter”; each fork the main run reached in it — “Replay from here”. The play
// begins on the map, comes to it after each chapter, by ☰ (the step going on is left — played again from its
// beginning), and whenever it is opened again. Its author has one more sign: his map of the chapters and their steps
// (ui.js author) — straight to any step, or a minigame of one, as one of PLAYS has it by then: a replay from there.
//
// The play is one — its main run. A replay (begun on the map) goes on its own and is never kept: closed, it is gone.
// On the map: the plate “Replay” on its leaf (“Continue the replay”, “Drop the replay”), its pointer “Continue the
// replay” or “Back to the main run”; whatever would leave it asks first — “Drop the replay”. Played to its chapter's
// end, the player keeps it — “Keep”: the main run from the next chapter on — or not, “Undo”.
//
// What is kept of the play (bespoke.keep), after every step: the main run — { chapter, step, scales, shown, marks,
// choices } —, steps: {chapter: [the main run as each of its steps began, and as it ended]}, seen: {chapter: how many
// of its steps the player has ever played through} — never lessened. The page's ⏭ (bespoke.forward, story.js) is the
// player's only where they have been. Where the play is and how it ended — bespoke.at, bespoke.ended.
import { ENDINGS, SCALES, SCENES, context, facts, listen } from './story.js';
import { ui } from './ui.js';
import { trees } from './map.js';
import { jump as unseen } from './jump.js';
import { beds, wake, unheard, pause } from './sound.js';
import prologue from './chapters/prologue.js';
import one from './chapters/1.js';
import two from './chapters/2.js';
import three from './chapters/3.js';
import four from './chapters/4.js';
import epilogue from './chapters/epilogue.js';

export const CHAPTERS = [prologue, one, two, three, four, epilogue];
const EPILOGUE = CHAPTERS.length - 1;
const END = CHAPTERS.length; // the play played through: no chapter of the main run
// a replay's end asks on its knot once the map has stood a moment
const SETTLE = 600;
// every step of the play in order, and where each chapter's first one is among them
const STEPS = CHAPTERS.flatMap(ch => ch.steps);
const FIRST = CHAPTERS.map((_, c) => CHAPTERS.slice(0, c).reduce((n, ch) => n + ch.steps.length, 0));
// “play as…” — whole plays the author goes from (scenario §12): every ending, full and late
export const PLAYS = [
  { label: 'The Oars — let go, full (“Did Mama row like that?”)', choices: { bottom: 'go', smoke: 'tell', nets: 'nothing', bird: 'gift', mama: 'gone', head: 'sophia', storm: 'notyou', night: 'scared', fog: 'lamp' } },
  { label: 'The Oars — new knowledge: the truth', choices: { bottom: 'hold', smoke: 'secret', nets: 'say', bird: 'bury', mama: 'sky', head: 'sophia', storm: 'blanket', night: 'call', fog: 'lamp' } },
  { label: 'The Oars — flight (late, the knock not kept)', choices: { bottom: 'hold', smoke: 'quit', nets: 'net', bird: 'out', mama: 'sky', head: 'moss', storm: 'porch', night: 'knock', fog: 'lamp' } },
  { label: 'The Oars — decided late (Papa knows)', choices: { bottom: 'down', smoke: 'secret', nets: 'say', bird: 'gift', mama: 'moon', head: 'papa', storm: 'porch', night: 'call', fog: 'lamp' } },
  { label: 'The Window — keep, full', choices: { bottom: 'hold', smoke: 'tell', nets: 'say', bird: 'out', mama: 'sky', head: 'papa', storm: 'blanket', night: 'call', fog: 'papa' } },
  { label: 'The Window — new knowledge (the moon, then Papa)', choices: { bottom: 'down', smoke: 'secret', nets: 'net', bird: 'bury', mama: 'moon', head: 'papa', storm: 'porch', night: 'knock', fog: 'papa' } },
  { label: 'The Window — decided late (“Don’t catch me”)', choices: { bottom: 'go', smoke: 'quit', nets: 'nothing', bird: 'gift', mama: 'gone', head: 'moss', storm: 'notyou', night: 'knock', fog: 'papa' } },
  { label: 'The Tent — together, full', choices: { bottom: 'down', smoke: 'quit', nets: 'net', bird: 'gift', mama: 'moon', head: 'moss', storm: 'porch', night: 'knock', fog: 'go' } },
  { label: 'The Tent — decided late (“Why only once?”)', choices: { bottom: 'hold', smoke: 'secret', nets: 'say', bird: 'bury', mama: 'sky', head: 'sophia', storm: 'blanket', night: 'call', fog: 'go' } },
  { label: 'The Shawl on the Stone — she called, the knock promised', choices: { bottom: 'hold', smoke: 'secret', nets: 'say', bird: 'gift', mama: 'sky', head: 'sophia', storm: 'blanket', night: 'knock', fog: 'behind' } },
  { label: 'The Shawl on the Stone — alone all night', choices: { bottom: 'go', smoke: 'tell', nets: 'nothing', bird: 'bury', mama: 'gone', head: 'moss', storm: 'notyou', night: 'scared', fog: 'behind' } },
];
// the promises (scenario §9, §11): the chapter they are given in, the mark that follows them, what was said, what came
// of it by the mark's value
const PROMISES = [
  { chapter: 1, key: 'say', said: tr('“I’ll tell you”'), came: { given: tr('Papa is waiting'), kept: tr('You told him'), broken: tr('He learnt it himself') } },
  { chapter: 2, key: 'someday', said: tr('“At night. Some day”'), came: { given: tr('Not yet'), kept: tr('You climbed into the new house at night') } },
  { chapter: 2, key: 'notsoon', said: tr('“Not soon”'), came: { given: tr('She remembered it') } },
  { chapter: 3, key: 'nottell', said: tr('Sophia: “I won’t tell Papa”'), came: { given: tr('She kept it') } },
  { chapter: 4, key: 'hear', said: tr('“I’ll hear you”'), came: { given: tr('She did not call'), kept: tr('She called, and you came'), papa: tr('She called, and Papa came'), broken: tr('She called. Nobody came') } },
  { chapter: 4, key: 'knock', said: tr('“At midnight I’ll knock”'), came: { given: tr('Not yet'), kept: tr('You knocked'), shout: tr('You shouted instead'), broken: tr('You did not knock. She waited') } },
];
export const fresh = () => ({
  chapter: 0, step: 0, scales: Object.fromEntries(Object.entries(SCALES).map(([k, s]) => [k, s.start])),
  shown: {}, marks: {}, choices: {},
});

export default async function (b) {
  await b.css('ui.css');
  b.onPause(pause);
  b.minigame.style({
    font: 'Georgia, "Times New Roman", serif',
    colors: { mark: '#f4ead2', fill: '#f4ead2', good: '#ffe08a', danger: '#c8553d', fork: '#c9d2e4', ghost: '#f4ead2' },
  });
  const hub = listen(b);
  const view = ui(b.layer);
  // PLAYS[as] played unseen: its n-th step of all (STEPS) from where the steps before leave it → {state: the play
  // after it, games: the minigames it played}
  const dry = new Map();
  const ran = (as, n) => {
    const k = `${as}:${n}`;
    if (!dry.has(k)) dry.set(k, (async () => {
      const came = n ? (await ran(as, n - 1)).state : fresh();
      const j = unseen(Infinity, unheard());
      const g = context(b, view, hub, { ...structuredClone(came), choices: Object.assign(Object.create(PLAYS[as].choices), came.choices) }, j);
      await Promise.race([STEPS[n](g).catch(() => {}), j.idle]);
      return { state: { ...g.state, choices: { ...g.state.choices } }, games: j.plays.map(m => m.title) };
    })());
    return dry.get(k);
  };
  const coming = async (as, chapter, step) => {
    const n = FIRST[chapter] + step;
    return { ...(n ? (await ran(as, n - 1)).state : fresh()), chapter, step };
  };
  let kept = load(b.saved);
  // the replay going on, never kept: {run, steps: its chapter's states as its steps began, done: played to its end}
  let replay = null;
  const keep = next => { kept = next; return b.keep(kept); };
  let jumped = () => {};
  const author = b.game.mine ? view.author({
    chapters: CHAPTERS, plays: PLAYS.map(p => p.label), at: () => replay?.run ?? kept,
    games: (as, chapter, step) => ran(as, FIRST[chapter] + step).then(r => r.games),
    go: async (as, chapter, step, game) => {
      const state = await coming(as, chapter, step);
      jumped({ jump: game == null ? state : { ...state, play: game, choices: (await ran(as, FIRST[chapter] + step)).state.choices } });
    },
  }) : null;
  const away = () => new Promise(ok => b.menu(() => ok('away')));
  const ended = () => b.ended({ ending: facts(kept).ending });

  for (let after = {}; ;) {
    const to = after.on ? 'main' : await map(after);
    after = {};
    wake(); // (a touch: the page may be heard from now on)
    if (to === 'drop') { replay = null; continue; }
    if (to === 'keep') { await keepReplay(); if (kept.chapter === END) ended(); continue; }
    if (to === 'main' || to === 'back') replay = null;
    else if (to !== 'replay') replay = replayFrom(to);
    if ((await play()) === 'away') continue;
    if (replay) {
      replay.done = true;
      after = { reveal: replay.run.chapter };
      continue;
    }
    const done = kept.chapter;
    await onward();
    if (kept.chapter === END) ended();
    // (no map between the prologue and chapter I, nor between IV and the epilogue: on at once)
    after = done === 0 || done === EPILOGUE - 1 ? { on: true } : { reveal: done };
  }

  // the run being played (the replay, else the main run), step by step to its chapter's end → 'done'; or till ☰ →
  // 'away'
  async function play() {
    for (;;) {
      const r = replay ? replay.run : kept, ch = CHAPTERS[r.chapter];
      if (r.step >= ch.steps.length) return 'done';
      view.gauge(r.chapter === EPILOGUE ? null : r);
      const mine = r.chapter === EPILOGUE ? { ...view, gauge() {} } : view;
      const g = context(b, mine, hub, structuredClone(run(r)), r.play != null ? unseen(r.play, unheard()) : null,
        { forward: r.step < (kept.seen[r.chapter] ?? 0) });
      b.at({ chapter: r.chapter, step: r.step, replay: !!replay });
      const how = await Promise.race([
        ch.steps[r.step](g).then(() => 'done', e => { b.trouble(`the step broke: ${e.message || e}`); return 'broke'; }),
        away(),
      ]);
      if (how === 'done') await g.done();
      else g.leave();
      if (how === 'away') return 'away';
      // (a step that broke: passed with nothing of it kept)
      const next = { ...run(how === 'broke' ? r : g.state), step: r.step + 1 };
      const seen = { ...kept.seen, [r.chapter]: Math.max(kept.seen[r.chapter] ?? 0, next.step) };
      if (replay) {
        replay.run = next;
        replay.steps[next.step] = next;
        keep({ ...kept, seen });
      } else keep({ ...kept, ...next, seen, steps: { ...kept.steps, [r.chapter]: Object.assign([...(kept.steps[r.chapter] ?? [])], { [next.step]: next }) } });
    }
  }
  function onward() {
    const on = { ...run(kept), chapter: kept.chapter + 1, step: 0 };
    return keep({ ...kept, ...on, steps: { ...kept.steps, [on.chapter]: [on] } });
  }
  // a replay begun on the map: a chapter from its beginning (`chapter:i`) or from a fork's step (`fork:i:s`) — as the
  // main run was then —, or where the author's map went ({jump})
  function replayFrom(to) {
    if (to.jump) {
      const { chapter, step, play } = to.jump, at = kept.steps[chapter];
      if (at?.[step]) {
        return { run: { ...structuredClone(at[step]), ...(play != null ? { play } : {}) }, steps: structuredClone(at.slice(0, step + 1)), done: false };
      }
      return { run: structuredClone(to.jump), steps: Object.assign([], { [step]: run(to.jump) }), done: false };
    }
    const [, i, s = 0] = to.split(':').map(Number), at = kept.steps[i];
    return { run: structuredClone(at[s]), steps: structuredClone(at.slice(0, s + 1)), done: false };
  }
  function keepReplay() {
    const i = replay.run.chapter, on = { ...run(replay.run), chapter: i + 1, step: 0 }, steps = replay.steps;
    replay = null;
    return keep({ ...on, steps: { ...pick(kept.steps, j => j < i), [i]: steps, [i + 1]: [on] }, seen: kept.seen });
  }

  // the map, over Papa's drawing of the island: the view at the chapter the play is at (the epilogue once it is played
  // through). What brought the play here: a chapter played through (reveal: its rows come one by one). → what was
  // picked: an option's id, or {jump} — the author's map
  async function map({ reveal = null }) {
    b.menu(null);
    b.hush();
    view.quiet();
    view.gauge(replay ? replay.run : kept); // (how things stand, in the corner)
    beds({ sea_in: 0.2 }, 2); // (the drawing on Papa's table, the sea beyond the veranda's glass)
    await b.show(SCENES.map, { state: { shown: Math.min(reveal ?? (replay ? replay.run.chapter : kept.chapter), EPILOGUE) }, captions: false });
    const drawn = trees(b, sky(), { grow: reveal, author: !!author });
    const notice = replay?.done && anew() ? view.hint(tr('If you keep it, the chapters after this one will have to be played again.')) : () => {};
    let asked = null; // (an option that would leave the replay: asked again)
    let pressed = () => {};
    const offer = () => drawn.offer(Object.keys(marks(asked)), ref => pressed(ref));
    try {
      // (a replay played to its end: its knot's mark opens by itself — keep it or not)
      const asking = replay?.done ? await new Promise(ok => setTimeout(() => ok(`knot:${replay.run.chapter}`), SETTLE)) : null;
      for (let again = asking; ;) {
        offer();
        const ref = again ?? await new Promise(ok => { pressed = ok; jumped = ok; });
        pressed = () => {};
        jumped = () => {};
        again = null;
        if (ref.jump) return ref;
        const options = marks(asked)[ref];
        const picked = options ? await hub.ask(drawn.at(ref), options) : null;
        if (!picked) { asked = null; continue; }
        if (picked.id === 'author') { author(); continue; }
        if (replay && !['replay', 'keep', 'drop', 'main'].includes(picked.id) && asked !== picked.id) { asked = picked.id; again = ref; continue; }
        return picked.id;
      }
    } finally {
      jumped = () => {};
      hub.withdraw();
      notice();
      drawn.remove();
    }
  }
  // what can be done on the map: {ref: options} — `asked`: the option that would leave the replay, now “Drop the
  // replay”
  function marks(asked) {
    const offers = {};
    const add = (ref, id, label) => { (offers[ref] ??= []).push({ id, label: id === asked ? tr('Drop the replay') : label }); };
    if (replay) {
      const c = replay.run.chapter;
      if (replay.done) for (const at of [`knot:${c}`, `badge:${c}`]) { add(at, 'keep', tr('Keep')); add(at, 'drop', tr('Undo')); }
      else {
        add(`goreplay:${c}`, 'replay', tr('Continue the replay')); add(`goreplay:${c}`, 'back', tr('Back to the main run'));
        add(`badge:${c}`, 'replay', tr('Continue the replay')); add(`badge:${c}`, 'drop', tr('Drop the replay'));
        add(`knot:${c}`, 'drop', tr('Drop the replay'));
      }
    }
    if (kept.chapter < END) add(`go:${kept.chapter}`, 'main', replay ? tr('Drop the replay') : kept.step || kept.chapter ? tr('Continue') : tr('Start'));
    for (let i = 0; i < Math.min(kept.chapter, END); i++) {
      if (kept.steps[i]?.[0]) add(`knot:${i}`, `chapter:${i}`, tr('Replay the chapter'));
      CHAPTERS[i].choices.forEach((c, k) => {
        const s = fork(i, c.id);
        if (s != null) add(`fork:${i}:${k}`, `fork:${i}:${s}`, tr('Replay from here'));
      });
    }
    if (author) add('author', 'author', tr('The author’s map'));
    return offers;
  }
  // the step of chapter i in which the main run made the choice `id`
  function fork(i, id) {
    const at = kept.steps[i] ?? [];
    for (let s = 0; s + 1 < at.length; s++) if (at[s] && at[s + 1] && !(id in at[s].choices) && id in at[s + 1].choices) return s;
    return null;
  }
  function anew() {
    return kept.chapter > replay.run.chapter + 1 || (kept.chapter === replay.run.chapter + 1 && kept.step > 0);
  }
  // the chapters as the map draws them (map.js)
  function sky() {
    const re = replay?.run;
    return CHAPTERS.map((c, i) => {
      const reached = i <= kept.chapter;
      const tried = re?.chapter === i;
      const kind = i === (re ? re.chapter : kept.chapter) ? 'here' : i < kept.chapter ? 'played' : i === kept.chapter ? 'next' : 'future';
      const all = rows(c, reached ? kept.choices : {}, tried ? re.choices : {});
      const shown = i < kept.chapter && !tried ? all : all.filter(r => r.options.some(o => o.state !== 'unseen'));
      return { number: c.number, title: c.title, kind,
        rows: i === EPILOGUE ? shown.concat(finale()) : i <= kept.chapter ? shown.concat(promised(i)) : shown,
        go: i === kept.chapter ? (kept.step || kept.chapter ? tr('continue\nthe game') : tr('start\nthe game')) : null, replay: tried && !replay.done, badge: tried };
    });
  }
  // the promises given in chapter i, each a row: what was promised, what came of it (as the main run has it)
  function promised(i) {
    return PROMISES.filter(p => p.chapter === i && kept.marks[p.key])
      .map(p => ({ title: p.said, weight: '', options: [{ label: p.came[kept.marks[p.key]] ?? p.came.given, state: 'chosen' }] }));
  }
  // the epilogue's last row, once the play is played through: how it ended — its endings, the one it came to chosen
  function finale() {
    if (kept.chapter < END) return [];
    const f = facts(kept);
    return [{ title: f.form === 'late' ? tr('Finale: decided late') : tr('Finale: in full'), weight: '⚑',
      options: ENDINGS.map(e => ({ label: e.label, state: e.id === f.ending ? 'chosen' : 'open' })) }];
  }
}

// the play as it was kept: the main run as it is (a chapter it played through — the next one begun), the states known
// at its steps' beginnings, how far each chapter has been seen
function load(saved) {
  let main = run({ ...fresh(), ...saved });
  const steps = saved.steps ?? {};
  const seen = saved.seen ?? {};
  if (main.chapter < END && main.step >= CHAPTERS[main.chapter].steps.length) {
    main = { ...main, chapter: main.chapter + 1, step: 0 };
    steps[main.chapter] = [run(main)];
  }
  (steps[main.chapter] ??= [])[main.step] ??= run(main);
  (steps[0] ??= [])[0] ??= run(fresh());
  return { ...main, steps, seen };
}
// a run's own fields, apart from what the play keeps of its chapters (a minigame gone to by the author's map: `play`)
const run = p => structuredClone({ chapter: p.chapter, step: p.step, scales: p.scales, shown: p.shown, marks: p.marks, choices: p.choices });
const pick = (o, keep) => Object.fromEntries(Object.entries(o).filter(([j]) => keep(Number(j))));
// a chapter's choices as rows: the main run's chosen, a replay's tried (both — the same), could have been, never reached
function rows(ch, mainChoices, triedChoices) {
  return ch.choices.map(c => {
    const m = mainChoices[c.id], t = triedChoices[c.id];
    return { title: c.title, weight: c.weight, options: c.options.map(o => ({ label: o.label,
      state: m === o.id && t === o.id ? 'both' : m === o.id ? 'chosen' : t === o.id ? 'tried' : m || t ? 'open' : 'unseen' })) };
  });
}
