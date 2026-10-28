// The check of the game's branches: node bespoke/check/run.mjs <a clone of the world>. No browser, no engine, nothing
// drawn. Every step of every chapter is played unseen, the way the author's map plays it (jump.js: a dry run, story.js
// context(…, j)), on a page that knows only the scenes' specs (their scene.json files in the clone): no time passes, a
// plate goes by at once, a minigame gives its `skipped`.
// Walked: every path — the play goes step by step from its beginning, and wherever a step makes a choice it is played
// again for each of the choice's options (the chapter's `choices`), so every combination of the nine choices is played
// to its end (3⁸ × 4 = 26 244 plays), each step on the state the steps before left.
// Read of the world: each scene's scene.json (its people, its keys' values) and the block “Contract for the check” that
// ends its notes.md — {points, offers, party, acts}; each is checked against its scene.json.
// Checked on every path, as it is played: the scenes the steps open are the game's SCENES and the world's, and have the
// people they name (persons of the scene, named in its contract); every key a step opens a scene with (what the play
// has done to the place — story.js carry — and the step's own) is in the contract's party, and every key it sets is in
// its party or acts, with a value the scene's states allow; a choice's points are in the contract's offers, a
// minigame's point in its points or offers — a person's, only while they are there; every line is said by one of
// people.json; a choice offered is one of the chapter's list with the same options; nothing breaks. At each path's end: exactly one finale was played (its title),
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
const { ENDINGS, SCALES, SCENES: FOLDERS, carry, facts, context } = await load('story.js');
const { jump } = await load('jump.js');
const { CHAPTERS, PLAYS, fresh } = await load('game.js');

// --- what does not match: text → the number of paths it was met on
const misses = new Map();
const miss = text => misses.set(text, (misses.get(text) ?? 0) + 1);
for (const ch of CHAPTERS) if (ch.titles.length !== ch.steps.length) miss(`${ch.title}: titles ${ch.titles.length}, steps ${ch.steps.length}`);

// --- the world: each scene's spec, its people, its keys, its contract (the game's scenes: the others are not read)
function contract(notes) {
  const at = notes.search(/^#+\s*Contract for the check\s*$/m);
  if (at < 0) throw new Error('no section “Contract for the check”');
  const block = /```json\s*\n([\s\S]*?)\n\s*```/.exec(notes.slice(at));
  if (!block) throw new Error('the section “Contract for the check” has no ```json block');
  return JSON.parse(block[1]);
}
const SCENES = new Map();
for (const folder of Object.values(FOLDERS)) {
  const file = join(world, 'scenes', folder, 'scene.json'), notes = `scenes/${folder}/notes.md`;
  if (!existsSync(file)) { miss(`SCENES: the world has no scene “${folder}”`); continue; }
  const spec = JSON.parse(readFileSync(file, 'utf8'));
  const objects = new Map((spec.objects ?? []).map(o => [o.id, o]));
  const scene = { spec, objects, states: spec.states ?? {}, people: new Set([...objects.values()].filter(o => o.person).map(o => o.id)), contract: null };
  SCENES.set(folder, scene);
  try {
    if (!existsSync(join(world, notes))) throw new Error('no such file');
    const c = contract(readFileSync(join(world, notes), 'utf8'));
    if (!Array.isArray(c.points) || !Array.isArray(c.offers ?? []) || typeof c.party !== 'object') throw new Error('not {points, offers, party}');
    c.offers ??= [];
    c.acts ??= {};
    scene.contract = c;
  } catch (e) {
    miss(`${notes}: the contract not read: ${e.message}`);
    continue;
  }
  const c = scene.contract;
  // (a point of a copy: id:k, id:k#name)
  for (const ref of [...c.points, ...c.offers]) if (!objects.has(ref.split('#')[0].split(':')[0])) miss(`${notes}: the point “${ref}” — no element “${ref.split('#')[0]}” in its scene.json`);
  // (a person's engine keys, <id>_here and <id>_mood, are no scene's states)
  const own = k => !/^(\w+)_(here|mood)$/.test(k) || !scene.people.has(k.replace(/_(here|mood)$/, ''));
  for (const k of [...Object.keys(c.party), ...Object.keys(c.acts)]) if (own(k) && !(k in scene.states)) miss(`${notes}: the key “${k}” is not in its scene.json's states`);
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
// a point of the scene shown: a choice's — one of its contract's offers; a minigame's — of its points or offers; a
// person's — only while they are there
function point(folder, ref, where, present, offer) {
  const s = SCENES.get(folder), c = s?.contract, id = ref.split('#')[0];
  if (!folder) return miss(`${where}: the point “${ref}” before any scene`);
  if (!c) return;
  if (offer ? !c.offers.includes(ref) : !c.points.includes(ref) && !c.offers.includes(ref)) miss(`${where}: the point “${ref}” is not in the ${offer ? 'offers' : 'points or offers'} of the scene “${folder}”`);
  if (s.people.has(id) && !present.has(id)) miss(`${where}: the point “${ref}” — “${id}” is not there now`);
}
// a value a scene's key may take (its scene.json's states)
function allowed(def, v) {
  if (def.values) return def.values.includes(v);
  if (def.range) return typeof v === 'number' && v >= def.range[0] && v <= def.range[1];
  if (def.type) return typeof v === def.type;
  return true;
}
// a person of a scene: in its scene.json, and named in its contract (as “id” or a point of them, “id#…”)
function person(folder, id, where) {
  const s = SCENES.get(folder);
  if (!s) return;
  if (!s.people.has(id)) miss(`${where}: the scene “${folder}” has no person “${id}”`);
  else if (s.contract && ![...s.contract.points, ...s.contract.offers].some(r => r.split('#')[0] === id)) miss(`${where}: the person “${id}” is not in the contract of the scene “${folder}”`);
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
  // a key the step opens the shown scene with or sets: in its contract's party (set — or its acts), its value allowed
  const key = (k, v, set = false) => {
    const sc = SCENES.get(folder), c = sc?.contract;
    if (!c) return;
    if (!(k in c.party) && !(set && k in c.acts)) miss(`${where}: the key “${k}” is not in the ${set ? 'party or acts' : 'party'} of the scene “${folder}”`);
    else if (!(k in sc.states)) miss(`${where}: the key “${k}” is not in the states of the scene “${folder}”`);
    else if (!allowed(sc.states[k], v)) miss(`${where}: the key “${k}” of the scene “${folder}” cannot be ${JSON.stringify(v)}`);
  };
  g.scene = (f, o = {}, x) => {
    folder = f;
    if (!Object.values(FOLDERS).includes(f)) miss(`${where}: the scene “${f}” is not in the game's SCENES`);
    present = new Set(o.here ?? []);
    for (const id of present) person(f, id, where);
    for (const [k, v] of Object.entries({ ...carry(f, g.state), ...(o.keys ?? {}) })) key(k, v);
    return scene(f, o, x);
  };
  g.here = (id, on) => { person(folder, id, where); if (on) present.add(id); else present.delete(id); return here(id, on); };
  g.set = (k, v) => { key(k, v, true); return set(k, v); };
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
    for (const ref of Object.keys(offers)) point(folder, ref, where, present, true);
    if (choice) made.push(choice);
    return choose(choice, offers);
  };
  g.play = (m, o) => { point(folder, atOf(m), where, present, false); return play(m, o); };
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
