// The check of the game's branches: node bespoke/check/run.mjs <a clone of the world>. No browser, no engine, nothing
// drawn. Every step of every chapter is played unseen, the way the author's map plays it (jump.js: a dry run, story.js
// context(…, j)), on a page that knows only the scenes' specs (their scene.json files in the clone): no time passes, a
// plate goes by at once, a minigame gives its `skipped`.
// Walked: every path — the play goes step by step from its beginning, and wherever a step makes a choice it is played
// again for each of the choice's options (the chapter's `choices`), so every combination of the nine choices is played
// to its end (3⁸ × 4 = 26 244 plays), each step on the state the steps before left.
// Checked on every path, as it is played: the scenes the steps open are the world's and have the people they name; the
// keys a step gives a scene (g.scene keys, g.set) are in its scene.json's states, with a value they allow; a choice's
// points and a minigame's point are of the scene shown then — an element (a named point: named in that element's code)
// or a person there now ('id', 'id#chest'); every line is said by one of people.json; a choice offered is one of the
// chapter's list with the same options; nothing breaks. At each path's end: exactly one finale was played (its title),
// and it is the one facts gives — by the rule of the scenario (§3: the third hinge decides, full or late by the first
// two; behind the tent — the shawl); the scales are whole numbers within their bounds; the play's PLAYS (game.js) end as
// their labels say.
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
  SCENES.set(folder, { spec, objects: new Map((spec.objects ?? []).map(o => [o.id, o])), states: spec.states ?? {}, code });
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
// a point ('id', 'id#name') of a scene: a person there now ('id', 'id#chest'), or its element and its name in the
// element's code
function point(folder, ref, where, present) {
  const s = SCENES.get(folder), [id, name] = ref.split('#');
  if (!s) return;
  if (s.objects.get(id)?.person) {
    if (!present.has(id)) miss(`${where}: the point “${ref}” — “${id}” is not there now`);
    else if (name && name !== 'chest') miss(`${where}: the point “${ref}” — a person's point is their head or “#chest”`);
  } else if (!s.objects.has(id)) miss(`${where}: the point “${ref}” — no element “${id}” in the scene “${folder}”`);
  else if (name && !new RegExp(`['"\`]${name}['"\`]`).test(s.code(id))) miss(`${where}: the point “${ref}” — the element's code names no “${name}”`);
}

const lines = new Map(); // `${who}\n${text}` → {who, text}
// a step played unseen on `state` (its choices made as they say, the first offered where they say nothing) → {state,
// made: the choice it made, titles: the titles it showed}
async function step(c, s, state, where) {
  const j = jump(Infinity);
  const g = context(b, view, hub, structuredClone(state), j);
  let folder = null, present = new Set();
  const made = [], titles = [];
  const { scene, say, choose, play, title, here, set } = g;
  // a key of the shown scene's own: in its states, its value allowed
  const key = (k, v) => {
    const def = SCENES.get(folder)?.states[k];
    if (!SCENES.has(folder)) return;
    if (!def) miss(`${where}: the key “${k}” is not in the states of the scene “${folder}”`);
    else if (def.values ? !def.values.includes(v) : def.range ? typeof v !== 'number' || v < def.range[0] || v > def.range[1] : def.type ? typeof v !== def.type : false)
      miss(`${where}: the key “${k}” of the scene “${folder}” cannot be ${JSON.stringify(v)}`);
  };
  g.scene = (f, o = {}, x) => {
    folder = f;
    present = new Set(o.here ?? []);
    for (const [k, v] of Object.entries(o.keys ?? {})) key(k, v);
    return scene(f, o, x);
  };
  g.here = (id, on) => { if (on) present.add(id); else present.delete(id); return here(id, on); };
  g.set = (k, v) => { key(k, v); return set(k, v); };
  g.say = (who, text, at) => {
    if (!PEOPLE[who]) miss(`${where}: “${text}” — said by “${who}”, no one of people.json`);
    lines.set(`${who}\n${text}`, { who, text });
    return say(who, text, at);
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
  g.play = (m, o) => { point(folder, atOf(m), where, present); return play(m, o); };
  g.title = text => { titles.push(text); return title(text); };
  let broke = null;
  await Promise.race([CHAPTERS[c].steps[s](g).catch(e => { broke = e; }), j.idle]);
  if (broke) miss(`${where}: the step broke: ${broke.message}`);
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
  // the rule (scenario §3) said once more, apart from facts: the line of each hinge's option
  const line = { gone: 'oars', sky: 'window', moon: 'tent', papa: 'window', sophia: 'oars', moss: 'tent' };
  const third = { go: 'tent', papa: 'window', lamp: 'oars', behind: 'shawl' }[state.choices.fog];
  const form = third === 'shawl' || line[state.choices.mama] === third || line[state.choices.head] === third ? 'full' : 'late';
  if (f.ending !== third || f.form !== form) miss(`facts give ${f.ending} ${f.form}, the rule ${third} ${form}: ${JSON.stringify(state.choices)}`);
  for (const [name, v] of Object.entries(state.scales)) if (!Number.isInteger(v) || v < SCALES[name].min || v > SCALES[name].max) miss(`the scale “${name}” is ${v}`);
  const key = `${f.ending} ${f.form}`;
  ends.set(key, (ends.get(key) ?? 0) + 1);
}
await walk(0, fresh(), { titles: [] });

// the author's plays end as their labels say
const NAMED = { 'The Window': 'window', 'The Tent': 'tent', 'The Oars': 'oars', 'The Shawl on the Stone': 'shawl' };
for (const p of PLAYS) {
  let state = fresh();
  for (const [c, s] of STEPS) state = (await step(c, s, { ...state, choices: { ...p.choices, ...state.choices } }, p.label)).state;
  const f = facts(state), named = Object.entries(NAMED).find(([head]) => p.label.startsWith(head))?.[1];
  if (named !== f.ending) miss(`PLAYS “${p.label}” ends in “${f.ending}” (${f.form})`);
  if (/\blate\b/.test(p.label) !== (f.form === 'late')) miss(`PLAYS “${p.label}”: the form is ${f.form}`);
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
