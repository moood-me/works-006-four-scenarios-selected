// The check of the game's branches: node bespoke/check/run.mjs [a clone of the world — by default the world game.json
// names]. No browser, no engine, nothing drawn. Every step of every chapter is played unseen, the way the author's map
// plays it (jump.js: a dry run, story.js context(…, j)), on a page that knows only the scenes' specs (their scene.json
// files in the clone) and the contracts of their pieces (each scene's notes.md, «Contract for the check»): no time
// passes, a plate goes by at once, a minigame gives its `skipped`.
// Walked: every path — the play goes step by step from its beginning, and wherever a step makes a choice (or lets a
// sign pass: g.interrupt) it is played again for each of the choice's options (the chapter's `choices`), so every
// combination of the choices a road meets is played to its end (1 440 plays), each step on the state the steps before
// left. A chapter not on the road (`skip`) is walked all the same: its steps must do nothing there.
// Checked on every path, as it is played: the places the steps open are the game's (story.js PLACES), on scenes of the
// world; the people a step names are the game's (people.json, story.js SILENT); the keys a step gives a scene
// (g.scene keys, g.set) are in its scene.json's states, with a value they allow, or a person's of that scene; a
// choice's points are of the scene shown then — an element (a named point: named in that element's code) or a person
// there now; every line is said by one of people.json; a choice offered is one of the chapter's list with the same
// options; a piece and its moments are in the scene's contract; nothing breaks; a chapter skipped on the road shows no
// scene. At each path's end: exactly one finale was played (its title), and it is the one facts gives — by the rule of
// the scenario (§12: stayed on both calls — Two Lights; else the wave — stayed with her: White Flowers, drew her away:
// A Lantern on the Pier); the choices made are those of its road; the scales are whole numbers within their bounds; the
// rumour of a thief where it is made; the game's PLAYS end as their labels say — played once more with every mini-game
// missed (its `missed`: the trace a miss leaves, scenario §7). The sound: a background a step declares (g.scene's beds,
// its place's, g.beds) names beds sound.js has, at levels 0…1, never timed; every g.sound.<name> of the chapters and the
// mini-games is one of sound.js.
// Said apart, as waited for, not as wrong: what the pieces' contract (docs/new-games/rybak-i-dusha/game.md «Stage 5 —
// pieces») asks of the scenes that they have not got yet — a mini-game's points and keys, a scene's contract of pieces.
// Printed: what does not match (with how many paths it was met on); what is waited for; how many paths end in each
// finale and road; every line said, once (who | text) — the voices are made from it.
// Exit code: 0 — nothing to fix, 1 — something does not match.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const game = fileURLToPath(new URL('..', import.meta.url));
const world = process.argv[2] ?? join(game, '..', JSON.parse(readFileSync(join(game, '..', 'game.json'), 'utf8')).world);
if (!existsSync(join(world, 'scenes'))) {
  console.error('node bespoke/check/run.mjs [a clone of the world]');
  process.exit(2);
}
const load = file => import(pathToFileURL(join(game, file)).href);
// the game's texts as written (the source language): tr as the page gives it, without the translations
const fill = (t, p = {}) => t.replace(/\{(\w+)\}/g, (_, k) => String(p[k]));
globalThis.tr = Object.assign(fill, { n: (n, one, other, p) => fill(n === 1 ? one : other, { n, ...p }), c: (c, t, p) => fill(t, p) });
const PEOPLE = JSON.parse(readFileSync(join(game, 'people.json'), 'utf8'));
const { ENDINGS, SCALES, PLACES, SILENT, facts, context } = await load('story.js');
const { jump } = await load('jump.js');
const { CHAPTERS, PLAYS, fresh } = await load('game.js');
const { BED_NAMES, ONCE } = await load('sound.js');
const named = id => (PEOPLE[id] && id !== 'narrator') || SILENT.includes(id);

// --- what does not match: text → the number of paths it was met on; what is waited for, the same
const misses = new Map();
const miss = text => misses.set(text, (misses.get(text) ?? 0) + 1);
const waits = new Map();
const pending = text => waits.set(text, (waits.get(text) ?? 0) + 1);
for (const ch of CHAPTERS) if (ch.titles.length !== ch.steps.length) miss(`${ch.title}: titles ${ch.titles.length}, steps ${ch.steps.length}`);

// --- the world: each scene's spec, its elements, its states, the points its elements' code names, its pieces
const SCENES = new Map();
for (const folder of readdirSync(join(world, 'scenes'))) {
  const file = join(world, 'scenes', folder, 'scene.json');
  if (!existsSync(file)) continue;
  const spec = JSON.parse(readFileSync(file, 'utf8'));
  const code = id => { const f = join(world, 'scenes', folder, 'elements', `${id}.js`); return existsSync(f) ? readFileSync(f, 'utf8') : ''; };
  // its pieces, as its notes.md's «Contract for the check» says them (none yet: what the game asks of them waits)
  const notes = join(world, 'scenes', folder, 'notes.md');
  const block = existsSync(notes) && /## Contract for the check\s*```json\s*([^]*?)```/.exec(readFileSync(notes, 'utf8'))?.[1];
  const contract = block ? JSON.parse(block) : null;
  SCENES.set(folder, { spec, objects: new Map((spec.objects ?? []).map(o => [o.id, o])), states: spec.states ?? {}, code, beats: contract?.beats ?? null });
}
for (const [place, at] of Object.entries(PLACES)) if (!SCENES.has(at.folder)) miss(`the place “${place}” — the world has no scene “${at.folder}”`);
const b = {
  specOf: async folder => {
    if (!SCENES.has(folder)) throw new Error(`the world has no scene “${folder}”`);
    return SCENES.get(folder).spec;
  },
};
const nothing = () => {};
const view = new Proxy({}, { get: () => nothing });
const hub = { offer: () => new Promise(nothing), ask: async () => null, withdraw: nothing, told: () => new Promise(nothing) };
// a person's points: the engine's (people/player.js POINTS) and the cast's parts' (`flame`, `cup`, `tambourine`)
const BODY = new Set(['head', 'hand_r', 'hand_l', 'hands', 'chest', 'hips', 'foot_r', 'foot_l', 'feet', 'flame', 'cup', 'tambourine']);
// a point ('id', 'id#name') of a scene: a person there now, or an element and its name in the element's code; what the
// scene lacks yet that the pieces' contract asks of it — `wait`: said apart, as waited for
function point(folder, ref, where, present, wait = null) {
  const s = SCENES.get(folder), [id, name] = ref.split('#');
  if (!s) return;
  const no = wait ?? miss;
  if (s.objects.get(id)?.person) {
    if (!present.has(id)) no(`${where}: the point “${ref}” — “${id}” is not there now (scene “${folder}”)`);
    else if (name && !BODY.has(name)) miss(`${where}: the point “${ref}” — a person has no point “${name}”`);
  } else if (!s.objects.has(id)) no(`${where}: the point “${ref}” — no element “${id}” in the scene “${folder}”`);
  else if (name && !new RegExp(`['"\`]${name}['"\`]`).test(s.code(id))) no(`${where}: the point “${ref}” — the element's code names no “${name}”`);
}
// a key of the shown scene's own: in its states, its value allowed — or a person's of the scene (`<id>_with`…)
const PERSON = /^(.+)_(do|turn|look|reach|with|wear|gait|steps|on|here|still|mood|a|d)$/;
function key(folder, k, v, where, wait = null) {
  const s = SCENES.get(folder);
  if (!s) return;
  const def = s.states[k], person = PERSON.exec(k)?.[1];
  if (!def && person && s.objects.get(person)?.person) return;
  if (!def) (wait ?? miss)(`${where}: the key “${k}” is not in the states of the scene “${folder}”`);
  else if (v !== undefined && (def.values ? !def.values.includes(v) : def.range ? typeof v !== 'number' || v < def.range[0] || v > def.range[1] : def.type ? typeof v !== def.type : false))
    miss(`${where}: the key “${k}” of the scene “${folder}” cannot be ${JSON.stringify(v)}`);
}

const lines = new Map(); // `${who}\n${text}` → {who, text}
// a step played unseen on `state` (its choices made as they say, the first offered where they say nothing; its
// mini-games giving `result(m)`, else their `skipped`) → {state, made: the choice it made, titles: the titles it showed}
async function step(c, s, state, where, result = null) {
  const j = jump(Infinity);
  j.result = result;
  const g = context(b, view, hub, structuredClone(state), j);
  let folder = null, present = new Set();
  const made = [], titles = [], scenes = [];
  const { scene, say: speak, choose, interrupt, play, title, here, set, beat, told, beds } = g;
  // a background declared: beds sound.js has, at levels 0…1 (the page times it: no seconds)
  const background = (levels, at) => {
    for (const [name, v] of Object.entries(levels ?? {})) {
      if (!BED_NAMES.includes(name)) miss(`${where}: ${at}: no bed “${name}” in sound.js`);
      else if (!(v >= 0 && v <= 1)) miss(`${where}: ${at}: the bed “${name}” at ${v}`);
    }
  };
  g.beds = (levels, ...more) => { background(levels, 'g.beds'); if (more.length) miss(`${where}: g.beds: seconds — the page times the background`); return beds(levels); };
  // a piece of the shown scene, and a moment of it: in its contract — or waited for while the scene has none
  const piece = name => {
    const beats = SCENES.get(folder)?.beats;
    if (!beats) pending(`the piece “${name}” — the scene “${folder}” has no contract of its pieces yet`);
    else if (!beats[name]) miss(`${where}: the piece “${name}” — not in the contract of the scene “${folder}”`);
  };
  const know = text => {
    const [name, moment] = text.split(':');
    if (name === 'beat') piece(moment);
    else {
      piece(name);
      const beats = SCENES.get(folder)?.beats;
      if (beats?.[name] && !beats[name].tells?.includes(text)) miss(`${where}: “${text}” — the piece does not tell it`);
    }
  };
  g.beat = (name, o) => { piece(name); return beat(name, o); };
  // (a piece's moments are listened for before its scene is opened: checked once it is)
  g.told = (text, ms) => { queueMicrotask(() => know(text)); return told(text, ms); };
  g.scene = (place, o = {}, x) => {
    if (o.beat) queueMicrotask(() => piece(o.beat));
    const at = PLACES[place];
    if (!at) miss(`${where}: no place “${place}”`);
    folder = at?.folder;
    scenes.push(folder);
    const people = SCENES.get(folder)?.objects ?? new Map();
    for (const id of [...(o.here ?? []), ...Object.keys(o.moods ?? {})]) if (!named(id)) miss(`${where}: “${id}” is not one of the game's people`);
    for (const id of Object.keys(o.moods ?? {})) if (!(o.here ?? []).includes(id)) miss(`${where}: a face for “${id}”, who is not here`);
    present = new Set((o.here ?? []).filter(id => people.get(id)?.person));
    for (const [k, v] of Object.entries({ ...(at?.keys ?? {}), ...(o.keys ?? {}) })) key(folder, k, v, where);
    background(x?.beds ?? at?.beds, `the scene “${place}”`);
    return scene(place, o, x);
  };
  g.here = (id, on) => {
    if (!named(id)) miss(`${where}: “${id}” is not one of the game's people`);
    if (SCENES.get(folder)?.objects.get(id)?.person) { if (on) present.add(id); else present.delete(id); }
    return here(id, on);
  };
  g.set = (k, v, sec) => { key(folder, k, v, where); return set(k, v, sec); };
  g.say = (who, text, at) => {
    if (!PEOPLE[who]) miss(`${where}: “${text}” — said by “${who}”, no one of people.json`);
    if (at !== undefined && !named(at.split('#')[0])) miss(`${where}: “${text}” — said over “${at}”, not one of the game's people`);
    lines.set(`${who}\n${text}`, { who, text });
    return speak(who, text, at);
  };
  g.choose = (choice, offers) => {
    const def = CHAPTERS[c].choices.find(x => x.id === choice);
    const offered = Object.values(offers).flat().map(o => o.id);
    if (choice && !def) miss(`${where}: the choice “${choice}” is not in the chapter's choices`);
    else if (def && offered.join() !== def.options.map(o => o.id).join()) miss(`${where}: the choice “${choice}” offers ${offered.join(', ')}, the chapter lists ${def.options.map(o => o.id).join(', ')}`);
    for (const ref of Object.keys(offers)) point(folder, ref, where, present);
    if (choice) made.push(choice);
    return choose(choice, offers);
  };
  g.interrupt = (choice, offers, otherwise, ms, phrase) => {
    const def = CHAPTERS[c].choices.find(x => x.id === choice);
    const offered = [...Object.values(offers).flat(), otherwise].map(o => o.id);
    if (!def) miss(`${where}: the sign “${choice}” is not in the chapter's choices`);
    else if (offered.join() !== def.options.map(o => o.id).join()) miss(`${where}: the sign “${choice}” offers ${offered.join(', ')}, the chapter lists ${def.options.map(o => o.id).join(', ')}`);
    if (Object.keys(offers).length !== 1 || Object.values(offers)[0].length !== 1) miss(`${where}: the sign “${choice}” is not one touch on one point`);
    for (const ref of Object.keys(offers)) point(folder, ref, where, present);
    if (!(ms > 0)) miss(`${where}: the sign “${choice}” stands no time`);
    if (!phrase) miss(`${where}: the sign “${choice}” has no line of its plate`);
    made.push(choice);
    return interrupt(choice, offers, otherwise, ms, phrase);
  };
  g.play = (m, o) => {
    for (const ref of m.points ?? []) point(folder, ref, `${m.title} (${folder})`, present, pending);
    for (const k of m.keys ?? []) key(folder, k, undefined, `${m.title} (${folder})`, pending);
    return play(m, o);
  };
  g.title = text => { titles.push(text); return title(text); };
  let broke = null;
  await Promise.race([CHAPTERS[c].steps[s](g).catch(e => { broke = e; }), j.idle]);
  if (broke) miss(`${where}: the step broke: ${broke.message}`);
  if (scenes.length && CHAPTERS[c].skip?.(state)) miss(`${where}: the chapter is not on this road, and the step shows a scene`);
  return { state: g.state, made, titles };
}

// --- every path: depth first, a step played again for each option of the choice it makes
const STEPS = CHAPTERS.flatMap((ch, c) => ch.steps.map((_, s) => [c, s]));
const ends = new Map(); // `${ending} (${road})` → paths
let paths = 0;
async function walk(n, state, picked) {
  if (n === STEPS.length) return finish(state, picked);
  const [c, s] = STEPS[n], where = `${CHAPTERS[c].title} · ${CHAPTERS[c].titles[s]}`;
  const first = await step(c, s, state, where);
  if (!first.made.length) return walk(n + 1, { ...first.state }, { ...picked, titles: [...picked.titles, ...first.titles] });
  if (first.made.length > 1) miss(`${where}: makes more than one choice (${first.made.join(', ')})`);
  const id = first.made[0], def = CHAPTERS[c].choices.find(x => x.id === id);
  for (const o of def?.options ?? []) {
    const r = await step(c, s, { ...state, choices: { ...state.choices, [id]: o.id } }, where);
    await walk(n + 1, r.state, { ...picked, titles: [...picked.titles, ...r.titles] });
  }
}
function finish(state, picked) {
  paths++;
  const f = facts(state);
  const finales = picked.titles.filter(t => ENDINGS.some(e => e.label === t));
  if (finales.length !== 1) miss(`a path with ${finales.length} finales played: ${JSON.stringify(state.choices)}`);
  else if (finales[0] !== ENDINGS.find(e => e.id === f.ending).label) miss(`a path played “${finales[0]}”, facts give “${f.ending}”: ${JSON.stringify(state.choices)}`);
  // the rule (scenario §12) said once more, apart from facts
  const c = state.choices;
  const road = c.day === 'go' ? 'went' : c.last === 'go' ? 'late' : 'deep';
  const ending = road === 'deep' ? 'lights' : c.wave === 'stay' ? 'flowers' : 'lantern';
  if (f.ending !== ending || f.road !== road) miss(`facts give ${f.ending} (${f.road}), the rule ${ending} (${road}): ${JSON.stringify(c)}`);
  // the choices a road meets, and only they
  const met = ['net', 'stop', 'witch', 'heart', 'sit', 'day',
    ...(road === 'went' ? ['wait', ...(c.wait === 'wait' ? ['cup'] : [])] : ['rise', 'last', ...(road === 'late' ? ['giveback'] : [])]),
    ...(road === 'deep' ? [] : ['widow', 'wave'])];
  if (Object.keys(c).sort().join() !== met.sort().join()) miss(`the road ${road} made the choices ${Object.keys(c).join(', ')}`);
  for (const [name, v] of Object.entries(state.scales)) {
    const S = SCALES[name];
    if (!Number.isInteger(v) || v < S.min || v > S.max) miss(`the scale “${name}” is ${v}`);
  }
  if (c.cup === 'confess' || road !== 'went') { if (!state.marks.thief) miss(`no rumour of a thief: ${JSON.stringify(c)}`); }
  else if (state.marks.thief) miss(`a rumour of a thief, none made: ${JSON.stringify(c)}`);
  const key = `${f.ending} (${road})`;
  ends.set(key, (ends.get(key) ?? 0) + 1);
}
await walk(0, fresh(), { titles: [] });

// the author's plays end as their labels say — and once more with every mini-game missed
const NAMED = { 'White Flowers': 'flowers', 'A Lantern on the Pier': 'lantern', 'Two Lights': 'lights' };
for (const p of PLAYS) {
  let state = fresh();
  for (const [c, s] of STEPS) state = (await step(c, s, { ...state, choices: { ...p.choices, ...state.choices } }, p.label)).state;
  const f = facts(state), label = Object.entries(NAMED).find(([head]) => p.label.startsWith(head))?.[1];
  if (label !== f.ending) miss(`PLAYS “${p.label}” ends in “${f.ending}” (${f.road})`);
  if (/\blate\b/.test(p.label) !== (f.road === 'late')) miss(`PLAYS “${p.label}”: the road is ${f.road}`);
  let missed = fresh();
  for (const [c, s] of STEPS) missed = (await step(c, s, { ...missed, choices: { ...p.choices, ...missed.choices } }, `${p.label} (missed)`, m => m.missed)).state;
  if (facts(missed).ending !== f.ending) miss(`PLAYS “${p.label}”: with the mini-games missed it ends in “${facts(missed).ending}”`);
}
// the sounds the steps and the mini-games play are sound.js's (each a function there)
const SOUND = await load('sound.js');
for (const f of CHAPTERS.flatMap(ch => ch.steps.map(String)).concat(Object.values(await load('minigames/all.js')).map(m => String(m.run)))) {
  for (const [, name] of f.matchAll(/g\.sound\.(\w+)/g)) if (typeof SOUND[name] !== 'function' || !(BED_NAMES.includes(name) || ONCE.includes(name))) miss(`g.sound.${name} — not one of sound.js`);
}
// every mini-game has the trace of a miss, and says where its marks stand and what it moves
for (const [name, m] of Object.entries(await load('minigames/all.js'))) {
  if (!m.missed) miss(`minigames: “${name}” has no “missed”`);
  if (!Array.isArray(m.points) || !Array.isArray(m.keys)) miss(`minigames: “${name}” has no “points” or “keys”`);
}

const out = [];
out.push(`paths: ${paths}`);
for (const [k, n] of [...ends].sort()) out.push(`  ${k}: ${n}`);
out.push('', misses.size ? 'DOES NOT MATCH:' : 'nothing to fix');
for (const [text, n] of misses) out.push(`  ${text} (paths: ${n})`);
out.push('', waits.size ? 'WAITED FOR (the pieces’ contract, game.md):' : 'nothing waited for');
for (const [text, n] of waits) out.push(`  ${text} (paths: ${n})`);
out.push('', `lines said (${lines.size}):`);
for (const { who, text } of lines.values()) out.push(`  ${who} | ${text}`);
console.log(out.join('\n'));
process.exit(misses.size ? 1 : 0);
