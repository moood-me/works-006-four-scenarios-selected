// The check of the game's branches: node bespoke/check/run.mjs <a clone of the world>. No browser, no engine, nothing
// drawn. Every step of every chapter is played unseen, the way the author's map plays it (jump.js: a dry run, story.js
// context(…, j)), on a page that knows only the scenes' specs (their scene.json files in the clone): no time passes, a
// plate goes by at once, a minigame gives its `skipped`.
// Walked: every path — the play goes step by step from its beginning, and wherever a step makes a choice (or lets a
// sign pass: g.interrupt) it is played again for each of the choice's options (the chapter's `choices`), so every
// combination of the choices a road meets is played to its end (1 440 plays), each step on the state the steps before
// left. A chapter not on the road (`skip`) is walked all the same: its steps must do nothing there.
// Checked on every path, as it is played: the scenes the steps open are the world's and have the people they name; a
// choice's points and a minigame's point are elements of the scene shown then (a named point — named in that element's
// code); every line is said by one of people.json; a choice offered is one of the chapter's list with the same options;
// nothing breaks; a chapter skipped on the road shows no scene. At each path's end: exactly one finale was played (its
// title), and it is the one facts gives — by the rule of the scenario (§12: stayed on both calls — Two Lights; else the
// wave — stayed with her: White Flowers, drew her away: A Lantern on the Pier); the play's PLAYS (game.js) end as their
// labels say.
// Printed: what does not match (with how many paths it was met on); how many paths end in each finale and form; every
// line said, once (who | text) — the voices are made from it.
// Exit code: 0 — nothing to fix, 1 — something does not match.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const world = process.argv[2];
if (!world || !existsSync(join(world, 'scenes'))) {
  console.error('node bespoke/check/run.mjs <a clone of the world>');
  process.exit(2);
}
const game = fileURLToPath(new URL('..', import.meta.url));
const load = file => import(pathToFileURL(join(game, file)).href);
// the game's texts as written (the source language): tr as the page gives it, without the translations
const fill = (t, p = {}) => t.replace(/\{(\w+)\}/g, (_, k) => String(p[k]));
globalThis.tr = Object.assign(fill, { n: (n, one, other, p) => fill(n === 1 ? one : other, { n, ...p }), c: (c, t, p) => fill(t, p) });
const PEOPLE = JSON.parse(readFileSync(join(game, 'people.json'), 'utf8'));
const { ENDINGS, SCALES, facts, context } = await load('story.js');
const { jump } = await load('jump.js');
const { CHAPTERS, PLAYS, fresh } = await load('game.js');

// --- what does not match: text → the number of paths it was met on
const misses = new Map();
const miss = text => misses.set(text, (misses.get(text) ?? 0) + 1);
for (const ch of CHAPTERS) if (ch.titles.length !== ch.steps.length) miss(`${ch.title}: titles ${ch.titles.length}, steps ${ch.steps.length}`);

// --- the world: each scene's spec, its elements, the points its elements' code names
const SCENES = new Map();
for (const folder of readdirSync(join(world, 'scenes'))) {
  const file = join(world, 'scenes', folder, 'scene.json');
  if (!existsSync(file)) continue;
  const spec = JSON.parse(readFileSync(file, 'utf8'));
  const code = id => { const f = join(world, 'scenes', folder, 'elements', `${id}.js`); return existsSync(f) ? readFileSync(f, 'utf8') : ''; };
  SCENES.set(folder, { spec, objects: new Map((spec.objects ?? []).map(o => [o.id, o])), code });
}
const b = {
  specOf: async folder => {
    if (!SCENES.has(folder)) throw new Error(`the world has no scene “${folder}”`);
    return SCENES.get(folder).spec;
  },
};
const nothing = () => {};
const view = new Proxy({}, { get: () => nothing });
const hub = { offer: () => new Promise(nothing), ask: async () => null, withdraw: nothing };
// a point ('id', 'id#name') of a scene: its element, and its name in the element's code
function point(folder, ref, where) {
  const s = SCENES.get(folder), [id, name] = ref.split('#');
  if (!s) return;
  if (!s.objects.has(id)) miss(`${where}: the point “${ref}” — no element “${id}” in the scene “${folder}”`);
  else if (name && !new RegExp(`['"\`]${name}['"\`]`).test(s.code(id))) miss(`${where}: the point “${ref}” — the element's code names no “${name}”`);
}

const lines = new Map(); // `${who}\n${text}` → {who, text}
// a step played unseen on `state` (its choices made as they say, the first offered where they say nothing) → {state,
// made: the choice it made, titles: the titles it showed}
async function step(c, s, state, where) {
  const j = jump(Infinity);
  const g = context(b, view, hub, structuredClone(state), j);
  let folder = null;
  const made = [], titles = [], scenes = [];
  const { scene, say: speak, choose, interrupt, play, title } = g;
  g.scene = (f, o, x) => { folder = f; scenes.push(f); return scene(f, o, x); };
  g.say = (who, text, at) => {
    if (!PEOPLE[who]) miss(`${where}: “${text}” — said by “${who}”, no one of people.json`);
    lines.set(`${who}\n${text}`, { who, text });
    return speak(who, text, at);
  };
  g.choose = (choice, offers) => {
    const def = CHAPTERS[c].choices.find(x => x.id === choice);
    const offered = Object.values(offers).flat().map(o => o.id);
    if (choice && !def) miss(`${where}: the choice “${choice}” is not in the chapter's choices`);
    else if (def && offered.join() !== def.options.map(o => o.id).join()) miss(`${where}: the choice “${choice}” offers ${offered.join(', ')}, the chapter lists ${def.options.map(o => o.id).join(', ')}`);
    for (const ref of Object.keys(offers)) point(folder, ref, where);
    if (choice) made.push(choice);
    return choose(choice, offers);
  };
  g.interrupt = (choice, offers, otherwise, ms) => {
    const def = CHAPTERS[c].choices.find(x => x.id === choice);
    const offered = [...Object.values(offers).flat(), otherwise].map(o => o.id);
    if (!def) miss(`${where}: the sign “${choice}” is not in the chapter's choices`);
    else if (offered.join() !== def.options.map(o => o.id).join()) miss(`${where}: the sign “${choice}” offers ${offered.join(', ')}, the chapter lists ${def.options.map(o => o.id).join(', ')}`);
    for (const ref of Object.keys(offers)) point(folder, ref, where);
    if (!(ms > 0)) miss(`${where}: the sign “${choice}” stands no time`);
    made.push(choice);
    return interrupt(choice, offers, otherwise, ms);
  };
  g.play = (m, o) => { point(folder, atOf(m), where); return play(m, o); };
  g.title = text => { titles.push(text); return title(text); };
  let broke = null;
  await Promise.race([CHAPTERS[c].steps[s](g).catch(e => { broke = e; }), j.idle]);
  if (broke) miss(`${where}: the step broke: ${broke.message}`);
  if (scenes.length && CHAPTERS[c].skip?.(state)) miss(`${where}: the chapter is not on this road, and the step shows a scene`);
  return { state: g.state, made, titles };
}
// (a stub's point: as stub.js was given it)
const POINTS = new Map();
const stubs = await load('minigames/all.js');
for (const [name, m] of Object.entries(stubs)) {
  const src = readFileSync(join(game, 'minigames/all.js'), 'utf8');
  const at = new RegExp(`export const ${name} = stub\\(\\{[^]*?at: '([^']+)'`).exec(src)?.[1];
  if (!at) miss(`minigames/all.js: “${name}” has no point`);
  POINTS.set(m, at ?? '');
}
const atOf = m => POINTS.get(m) ?? '';

// --- every path: depth first, a step played again for each option of the choice it makes
const STEPS = CHAPTERS.flatMap((ch, c) => ch.steps.map((_, s) => [c, s]));
const ends = new Map(); // `${ending} ${form}` → paths
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
  if (road === 'deep' ? c.wave : !c.wave) miss(`the road ${road}: the wave ${c.wave ?? 'not met'}`);
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

// the author's plays end as their labels say
const NAMED = { 'White Flowers': 'flowers', 'A Lantern on the Pier': 'lantern', 'Two Lights': 'lights' };
for (const p of PLAYS) {
  let state = fresh();
  for (const [c, s] of STEPS) state = (await step(c, s, { ...state, choices: { ...p.choices, ...state.choices } }, p.label)).state;
  const f = facts(state), named = Object.entries(NAMED).find(([head]) => p.label.startsWith(head))?.[1];
  if (named !== f.ending) miss(`PLAYS “${p.label}” ends in “${f.ending}” (${f.road})`);
  if (/\blate\b/.test(p.label) !== (f.road === 'late')) miss(`PLAYS “${p.label}”: the road is ${f.road}`);
}

const out = [];
out.push(`paths: ${paths}`);
for (const [k, n] of [...ends].sort()) out.push(`  ${k}: ${n}`);
out.push('', misses.size ? 'DOES NOT MATCH:' : 'nothing to fix');
for (const [text, n] of misses) out.push(`  ${text} (paths: ${n})`);
out.push('', `lines said (${lines.size}):`);
for (const { who, text } of lines.values()) out.push(`  ${who} | ${text}`);
console.log(out.join('\n'));
process.exit(misses.size ? 1 : 0);
