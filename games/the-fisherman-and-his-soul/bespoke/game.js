// The Fisherman and his Soul — after Oscar Wilde. A bespoke game (moood/engines/bespoke) on the world “The Fisherman
// and His Soul” (engine 3): a young fisherman nets a little mermaid and loves her; to go down to her he cuts away his
// soul, and the soul goes into the world without a heart, with his face. A prologue, four chapters, an epilogue (rpg
// docs/new-games/rybak-i-dusha/scenario.md), each a row of steps on the world's scenes; the choices, the scales (the
// Soul, her Song) and what is remembered carry from chapter to chapter; the hinges decide the road and the ending
// (story.js facts) — the play always goes through to the epilogue. Chapter 3 is the Town on the road that went with the
// Soul and “Without Him” on the road that stayed (its steps of the other road do nothing); chapter 4 is not on the
// road that stayed both times (`skip`): after chapter 3 the epilogue comes.
// Stage 5 under way (moood-me/moood docs/writing/game-stages.md): the places on their scenes (story.js PLACES), the
// mini-games real (minigames/); the scenes' pieces in place of the plates as they come (docs/new-games/rybak-i-dusha/
// game.md «Stage 5 — pieces»); people a scene has not got yet — heard, not seen.
//   The map of the play (moood/docs/agents/games.md §2), at stage 3 a row of leaves over the empty pier (map.js) — the
// world has no map's scene yet. What can be done on it is its own drawing — pressed, the language's mark opens there,
// born open (story.js hub.ask): the main run's pointer — “Start”, “Continue” (from the beginning of the step it stopped
// in); a chapter played — “Replay the chapter”; each fork the main run reached in it — “Replay from here”. The play
// begins on the map, comes to it after each chapter, by ☰ (the step going on is left — played again from its
// beginning), and whenever it is opened again. Its author has one more sign: his map of the chapters and their steps
// (ui.js author) — straight to any step, or a minigame of one, as one of PLAYS has it by then: a replay from there.
//
// The play is one — its main run. A replay (begun on the map) goes on its own and is never kept: closed, it is gone.
// On the map: the plate “Replay” on its leaf (“Continue the replay”, “Drop the replay”), its pointer “Continue the
// replay” or “Back to the main run”; whatever would leave it asks first — “Drop the replay”. Played to its chapter's
// end, the player keeps it — “Keep”: the main run from the next chapter on its road — or not, “Undo”.
//
// What is kept of the play (bespoke.keep), after every step: the main run — { chapter, step, scales, shown, marks,
// choices } —, steps: {chapter: [the main run as each of its steps began, and as it ended]}, seen: {chapter: how many
// of its steps the player has ever played through} — never lessened. The page's ⏭ (bespoke.forward, story.js) is the
// player's only where they have been. Where the play is and how it ended — bespoke.at, bespoke.ended.
import { ENDINGS, PLACES, SCALES, context, facts, listen } from './story.js';
import { ui } from './ui.js';
import { trees } from './map.js';
import { jump as unseen } from './jump.js';
import { background } from './sound.js';
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
// “play as…” — whole plays the author goes from (scenario §12): every road and every ending
const P = { net: 'word', stop: 'danced', witch: 'demand', heart: 'ask', sit: 'sit' };
export const PLAYS = [
  { label: 'White Flowers — went, waited, confessed', choices: { ...P, day: 'go', wait: 'wait', cup: 'confess', widow: 'stayed', wave: 'stay' } },
  { label: 'White Flowers — went, back at once', choices: { ...P, net: 'free', stop: 'passed', witch: 'dance', heart: 'come', sit: 'song', day: 'go', wait: 'back', widow: 'out', wave: 'stay' } },
  { label: 'White Flowers — late', choices: { ...P, heart: 'cut', day: 'stay', rise: 'stayed', last: 'go', giveback: 'found', widow: 'stayed', wave: 'stay' } },
  { label: 'A Lantern on the Pier — went, waited, put back quietly', choices: { ...P, net: 'free', witch: 'dance', heart: 'cut', sit: 'song', day: 'go', wait: 'wait', cup: 'quiet', widow: 'out', wave: 'pull' } },
  { label: 'A Lantern on the Pier — went, back at once', choices: { ...P, stop: 'passed', day: 'go', wait: 'back', widow: 'stayed', wave: 'pull' } },
  { label: 'A Lantern on the Pier — late', choices: { ...P, net: 'free', heart: 'come', day: 'stay', rise: 'rose', last: 'go', giveback: 'confess', widow: 'out', wave: 'pull' } },
  { label: 'Two Lights — the deep, the Soul longing', choices: { ...P, net: 'free', heart: 'come', sit: 'sit', day: 'stay', rise: 'stayed', last: 'no' } },
  { label: 'Two Lights — the deep, the Soul hardened', choices: { ...P, witch: 'dance', heart: 'cut', sit: 'song', day: 'stay', rise: 'rose', last: 'no' } },
];
export const fresh = () => ({
  chapter: 0, step: 0, scales: Object.fromEntries(Object.entries(SCALES).map(([k, s]) => [k, s.start])),
  shown: {}, marks: {}, choices: {},
});

export default async function (b) {
  await b.css('ui.css');
  b.minigame.style({
    font: 'Georgia, "Times New Roman", serif',
    colors: { mark: '#eef3f6', fill: '#eef3f6', good: '#f2c66d', danger: '#c8553d', fork: '#b9cbe0', ghost: '#eef3f6' },
    // (the world's key, its scenes' music's: the language's tonal sounds on its tonic)
    key: 'D_FLAT_MAJOR_B_FLAT_MINOR',
  });
  // (the game's background — its beds of sound — as the page sounds it: at a scene's cut with its music, or at once)
  b.onBackground(background);
  const hub = listen(b);
  const view = ui(b.layer);
  // PLAYS[as] played unseen: its n-th step of all (STEPS) from where the steps before leave it → {state: the play
  // after it, games: the minigames it played}
  const dry = new Map();
  const ran = (as, n) => {
    const k = `${as}:${n}`;
    if (!dry.has(k)) dry.set(k, (async () => {
      const came = n ? (await ran(as, n - 1)).state : fresh();
      const j = unseen(Infinity);
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
  let closed = false; // (the play just played through: the map comes out of the black)

  for (let after = {}; ;) {
    const to = await map(after);
    after = {};
    if (to === 'drop') { replay = null; continue; }
    if (to === 'keep') { await keepReplay(); if (kept.chapter === END) ended(); continue; }
    if (to === 'main' || to === 'back') replay = null;
    else if (to !== 'replay') replay = replayFrom(to);
    if ((await play()) === 'away') continue;
    if (replay) {
      replay.done = true;
      if (replay.run.chapter === EPILOGUE) await closing(replay.run);
      after = { reveal: replay.run.chapter };
      continue;
    }
    const done = kept.chapter;
    await onward();
    if (kept.chapter === END) {
      ended();
      await closing(kept);
    }
    after = { reveal: done };
  }

  // the play played through (the main run, or a replay of the epilogue: its run): the last shot goes to black, the
  // ending's name over it; the map comes out of the black (as «Canterville»: 2026-10-30 — the map came straight after
  // the last shot, and nothing said the play was over)
  async function closing(r) {
    b.menu(null);
    await b.fade(1, 2);
    await view.title(ENDINGS.find(e => e.id === facts(r).ending).label);
    closed = true;
  }

  // the run being played (the replay, else the main run), step by step to its chapter's end → 'done'; or till ☰ →
  // 'away'
  async function play() {
    for (;;) {
      const r = replay ? replay.run : kept, ch = CHAPTERS[r.chapter];
      if (r.step >= ch.steps.length) return 'done';
      view.gauge(r.chapter === EPILOGUE ? null : r);
      const mine = r.chapter === EPILOGUE ? { ...view, gauge() {} } : view;
      const g = context(b, mine, hub, structuredClone(run(r)), r.play != null ? unseen(r.play) : null,
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
    const on = { ...run(kept), chapter: after(kept.chapter, kept), step: 0 };
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
    const i = replay.run.chapter, on = { ...run(replay.run), chapter: after(i, replay.run), step: 0 }, steps = replay.steps;
    replay = null;
    return keep({ ...on, steps: { ...pick(kept.steps, j => j < i), [i]: steps, [on.chapter]: [on] }, seen: kept.seen });
  }

  // the map, over the empty pier at night. What brought the play here: a chapter played through (reveal: its rows come one
  // by one). → what was picked: an option's id, or {jump} — the author's map
  async function map({ reveal = null }) {
    b.menu(null);
    b.hush();
    view.quiet();
    // (the scales as the run stands, on the map too: scenario §8)
    view.gauge(replay?.run ?? kept);
    await b.show(PLACES.pier.folder, { state: { fisherman_here: false, soul_here: false, mermaid_here: false }, captions: false, background: { sea: 0.3 } });
    if (closed) { closed = false; b.fade(0, 1.5); }
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
      if (i < kept.chapter && !tried && c.skip?.(kept)) return { number: c.number, title: named(c, kept), kind: 'played', rows: [], go: null, replay: false, badge: false, away: tr('not on this road') };
      return { number: c.number, title: named(c, re ?? kept), kind, rows: all.filter((r, k) => r.options.some(o => o.state !== 'unseen') || (i < kept.chapter && !tried && (c.choices[k].road?.(kept) ?? true))),
        note: i === END - 1 && kept.chapter === END ? ENDINGS.find(e => e.id === facts(kept).ending)?.label : null,
        go: i === kept.chapter ? (kept.step || kept.chapter ? tr('continue\nthe game') : tr('start\nthe game')) : null, replay: tried && !replay.done, badge: tried };
    }).concat(finale());
  }
  // after the epilogue: how the play ended — its endings, the one it came to chosen
  function finale() {
    const title = tr('Finale');
    if (kept.chapter < END) return { number: title, title, kind: 'future', rows: [], go: null };
    const f = facts(kept);
    return { number: '', title, kind: 'end', rows: [{ title: f.road === 'went' ? tr('went for one day') : f.road === 'late' ? tr('went late') : tr('stayed in the deep'), weight: '⚑',
      options: ENDINGS.map(e => ({ label: e.label, state: e.id === f.ending ? 'chosen' : 'open' })) }], go: null };
  }
}

// the play as it was kept: the main run as it is (a chapter it played through — the next one begun), the states known
// at its steps' beginnings, how far each chapter has been seen
function load(saved) {
  let main = run({ ...fresh(), ...saved });
  const steps = saved.steps ?? {};
  const seen = saved.seen ?? {};
  if (main.chapter < END && main.step >= CHAPTERS[main.chapter].steps.length) {
    main = { ...main, chapter: after(main.chapter, main), step: 0 };
    steps[main.chapter] = [run(main)];
  }
  (steps[main.chapter] ??= [])[main.step] ??= run(main);
  (steps[0] ??= [])[0] ??= run(fresh());
  return { ...main, steps, seen };
}
// the chapter that comes after chapter i on the run's road: a chapter not on it (`skip`) is passed
function after(i, r) {
  let c = i + 1;
  while (c < END && CHAPTERS[c].skip?.(r)) c++;
  return c;
}
// a chapter's title on the run's road
const named = (ch, r) => ch.titleOf?.(r) ?? ch.title;
// a run's own fields, apart from what the play keeps of its chapters (a minigame gone to by the author's map: `play`)
const run = p => structuredClone({ chapter: p.chapter, step: p.step, scales: p.scales, shown: p.shown, marks: p.marks, choices: p.choices });
const pick = (o, keep) => Object.fromEntries(Object.entries(o).filter(([j]) => keep(Number(j))));
// a chapter's choices as rows: the main run's chosen, a replay's tried (both — the same), could have been, never reached;
// under the one chosen (or tried), what came of it (scenario §11)
function rows(ch, mainChoices, triedChoices) {
  return ch.choices.map(c => {
    const m = mainChoices[c.id], t = triedChoices[c.id];
    return { title: c.title, weight: c.weight, options: c.options.map(o => ({ label: o.label, came: m === o.id || t === o.id ? o.came ?? null : null,
      state: m === o.id && t === o.id ? 'both' : m === o.id ? 'chosen' : t === o.id ? 'tried' : m || t ? 'open' : 'unseen' })) };
  });
}
