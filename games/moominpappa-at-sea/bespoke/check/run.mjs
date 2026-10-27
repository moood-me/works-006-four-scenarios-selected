// The check of the game's branches: node bespoke/check/run.mjs <a clone of the world>. No browser, no engine, nothing
// drawn. Every step of every chapter is played unseen, the way the author's map plays it (jump.js: a dry run, story.js
// context(…, j)), on a page that knows only the scenes' specs (their scene.json files in the clone): no time passes, a
// plate goes by at once, a minigame gives its `skipped`.
// Walked: every path — the play goes step by step from its beginning, and wherever a step makes a choice it is played
// again for each of the choice's options (the chapter's `choices`), so every combination of the nine choices is played
// to its end (23 328 plays), each step on the state the steps before left.
// Read of the world: each scene's scene.json (its people, its keys' values) and the block “Contract for the check” that
// ends its notes.md — {points, offers, party} (the chart's: {points, keys}); each is checked against its scene.json.
// Checked on every path, as it is played: the scenes the steps open are the game's SCENES and the world's, and have the
// people they name (persons of the scene, named in its contract); every key a step opens a scene with (what the play
// carries there — story.js carry — and the step's own) and every key it sets is in the contract's party (a key it sets,
// or among its acts) with a value the scene's keys allow; a choice's points are in the contract's offers, a minigame's
// point in its points or offers; every line is said by one of people.json; a choice offered is one of the chapter's
// list with the same options; nothing breaks. The map (game.js): the chart's keys and a point for each chapter and the
// finale, and the author's. At each path's end: exactly one finale was played (its title), and it is the one facts gives — by the
// rule of the scenario (§3: the third hinge decides, full or late by the first two); the play's PLAYS (game.js) end
// as their labels say.
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
const { ENDINGS, SCENES: FOLDERS, carry, facts, context } = await load('story.js');
const { jump } = await load('jump.js');
const { unheard } = await load('sound.js');
const { CHAPTERS, PLAYS, fresh } = await load('game.js');

// --- what does not match: text → the number of paths it was met on
const misses = new Map();
const miss = text => misses.set(text, (misses.get(text) ?? 0) + 1);
for (const ch of CHAPTERS) if (ch.titles.length !== ch.steps.length) miss(`${ch.title}: titles ${ch.titles.length}, steps ${ch.steps.length}`);

// --- the world: each scene's spec, its elements, its people, its keys, its contract
function contract(notes) {
  const at = notes.search(/^#+\s*Contract for the check\s*$/m);
  if (at < 0) throw new Error('no section “Contract for the check”');
  const block = /```json\s*\n([\s\S]*?)\n\s*```/.exec(notes.slice(at));
  if (!block) throw new Error('the section “Contract for the check” has no ```json block');
  return JSON.parse(block[1]);
}
const SCENES = new Map();
for (const folder of readdirSync(join(world, 'scenes'))) {
  const file = join(world, 'scenes', folder, 'scene.json'), notes = `scenes/${folder}/notes.md`;
  if (!existsSync(file)) continue;
  const spec = JSON.parse(readFileSync(file, 'utf8'));
  const objects = new Map((spec.objects ?? []).map(o => [o.id, o]));
  const scene = { spec, objects, states: spec.states ?? {}, people: new Set([...objects.values()].filter(o => o.person).map(o => o.id)), contract: null };
  SCENES.set(folder, scene);
  if (!Object.values(FOLDERS).includes(folder)) { miss(`scenes/${folder}: not in the game's SCENES (the game does not play it)`); continue; }
  try {
    if (!existsSync(join(world, notes))) throw new Error('no such file');
    const c = contract(readFileSync(join(world, notes), 'utf8'));
    if (!Array.isArray(c.points) || !Array.isArray(c.offers ?? []) || typeof (c.party ?? c.keys) !== 'object') throw new Error('not {points, offers, party}');
    c.offers ??= [];
    c.party ??= {};
    c.acts ??= {};
    c.beats ??= {};
    for (const a of Object.values(c.acts)) a.tells ??= [];
    for (const [name, beat] of Object.entries(c.beats)) {
      beat.after ??= [];
      beat.tells ??= [];
      for (const a of beat.after) if (!(a in c.beats)) miss(`${notes}: the piece “${name}” comes after “${a}”, which is not there`);
      for (const t of beat.tells) if (t.split(':')[0] !== name) miss(`${notes}: the piece “${name}”: its moment “${t}” is not named “${name}:<moment>”`);
    }
    scene.order = Object.keys(c.beats);
    scene.contract = c;
  } catch (e) {
    miss(`${notes}: the contract not read: ${e.message}`);
    continue;
  }
  const c = scene.contract;
  for (const ref of [...c.points, ...c.offers]) if (!objects.has(ref.split('#')[0])) miss(`${notes}: the point “${ref}” — no element “${ref.split('#')[0]}” in its scene.json`);
  // (a person's engine keys, <id>_here and <id>_mood, are no scene's states)
  const own = k => !/^(\w+)_(here|mood)$/.test(k) || !scene.people.has(k.replace(/_(here|mood)$/, ''));
  for (const key of [...Object.keys(c.party), ...Object.keys(c.keys ?? {}), ...Object.keys(c.acts)]) if (own(key) && !(key in scene.states)) miss(`${notes}: the key “${key}” is not in its scene.json's states`);
}
for (const folder of Object.values(FOLDERS)) if (!SCENES.has(folder)) miss(`SCENES: the world has no scene “${folder}”`);
// a value a scene's key may take (its scene.json's states)
function allowed(def, v) {
  if (def.values) return def.values.includes(v);
  if (def.range) return typeof v === 'number' && v >= def.range[0] && v <= def.range[1];
  if (def.type) return typeof v === def.type;
  return true;
}
// a key a step opens or sets the scene with: one of the contract's (party; set — or one of its acts), its value allowed
function key(folder, k, v, where, set = false) {
  const s = SCENES.get(folder), c = s?.contract;
  if (!c) return;
  if (!(k in c.party) && !(set && k in c.acts)) miss(`${where}: the key “${k}” is not in the ${set ? 'party or acts' : 'party'} of the scene “${folder}”`);
  else if (!(k in s.states)) miss(`${where}: the key “${k}” is not in the states of the scene “${folder}”`);
  else if (!allowed(s.states[k], v)) miss(`${where}: the key “${k}” of the scene “${folder}” cannot be ${JSON.stringify(v)}`);
}
// a person of a scene: in its scene.json, and named in its contract (as “id” or a point of them, “id#…”)
function person(folder, id, where) {
  const s = SCENES.get(folder);
  if (!s) return;
  if (!s.people.has(id)) miss(`${where}: the scene “${folder}” has no person “${id}”`);
  else if (s.contract && ![...s.contract.points, ...s.contract.offers].some(r => r.split('#')[0] === id)) miss(`${where}: the person “${id}” is not in the contract of the scene “${folder}”`);
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
// a point of the scene shown: a choice's — one of its contract's offers; a minigame's — of its points or offers
function point(folder, ref, where, offer) {
  const c = SCENES.get(folder)?.contract;
  if (!folder) return miss(`${where}: the point “${ref}” before any scene`);
  if (!c) return;
  if (offer ? !c.offers.includes(ref) : !c.points.includes(ref) && !c.offers.includes(ref)) miss(`${where}: the point “${ref}” is not in the ${offer ? 'offers' : 'points or offers'} of the scene “${folder}”`);
}

const lines = new Map(); // `${who}\n${text}` → {who, text}
// a step played unseen on `state` (its choices made as they say, the first offered where they say nothing) → {state,
// made: the choice it made, titles: the titles it showed}
async function step(c, s, state, where) {
  const j = jump(Infinity, unheard());
  const g = context(b, view, hub, structuredClone(state), j);
  let folder = null;
  const made = [], titles = [];
  const { scene, set, say, choose, play, title, beat, told } = g;
  // the piece shown: {last: the piece begun last, opening: the one the scene was opened on, not taken up yet, next:
  // beat_next set}; the moments waited for whose piece has not begun yet
  let cur = null, pending = [];
  const contractOf = f => SCENES.get(f)?.contract;
  const begins = (name, opening) => {
    const s = SCENES.get(folder), c = s?.contract;
    if (!c) return;
    const piece = c.beats[name];
    if (!piece) miss(`${where}: no piece “${name}” in the scene “${folder}”`);
    else if (piece.show === true) miss(`${where}: the piece “${name}” of the scene “${folder}” is the showcase's only (show: true)`);
    // a piece not opening the scene: after one of its `after`, or a cut — the next in the scene's table after the one
    // before it, or the one beat_next named
    if (piece && !opening && cur.last && !piece.after.includes(cur.last)) {
      const next = s.order[s.order.indexOf(cur.last) + 1];
      if (name !== next && cur.next !== name) miss(`${where}: “${folder}”: ${cur.last} → ${name}, a cut not by the table and without beat_next`);
    }
    cur.next = null;
    cur.last = name;
    for (const text of pending.filter(t => t.split(':')[0] === name)) {
      if (piece && !piece.tells.includes(text)) miss(`${where}: the piece “${name}” of the scene “${folder}” has no moment “${text}”`);
    }
    pending = pending.filter(t => t.split(':')[0] !== name);
  };
  g.scene = (f, o = {}, x) => {
    folder = f;
    if (!Object.values(FOLDERS).includes(f)) miss(`${where}: g.scene “${f}” — not one of SCENES`);
    for (const id of o.here ?? []) person(f, id, where);
    for (const id of Object.keys(o.moods ?? {})) person(f, id, where);
    for (const [k, v] of Object.entries({ ...carry(f, g.state), ...o.keys })) key(f, k, v, where);
    cur = { last: null, opening: o.beat ?? null, next: null };
    if (o.beat) begins(o.beat, true);
    else miss(`${where}: the scene “${f}” opened on no piece`);
    return scene(f, o, x);
  };
  g.beat = (name, how) => {
    if (!cur) miss(`${where}: the piece “${name}” before any scene`);
    else if (cur.opening !== name) begins(name, false);
    if (cur) cur.opening = null;
    return beat(name, how);
  };
  g.told = (text, ms) => {
    if (!text.startsWith('beat:')) {
      const head = text.split(':')[0], acts = Object.values(contractOf(folder)?.acts ?? {});
      if (!acts.some(a => a.tells.includes(text)) || !(head in (contractOf(folder)?.acts ?? {}))) pending.push(text);
    }
    return told(text, ms);
  };
  g.set = (k, v) => {
    if (k === 'beat_next') { if (cur) cur.next = v; }
    else key(folder, k, v, where, true);
    return set(k, v);
  };
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
    for (const ref of Object.keys(offers)) point(folder, ref, where, true);
    if (choice) made.push(choice);
    return choose(choice, offers);
  };
  g.play = (m, o) => { point(folder, atOf(m), where, false); return play(m, o); };
  g.title = text => { titles.push(text); return title(text); };
  let broke = null;
  await Promise.race([CHAPTERS[c].steps[s](g).catch(e => { broke = e; }), j.idle]);
  if (broke) miss(`${where}: the step broke: ${broke.message}`);
  for (const text of pending) miss(`${where}: the moment “${text}” waited for — its piece never played`);
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

// --- the map's background (game.js map): the chart's keys, a point for each chapter and the finale, the author's
{
  const c = SCENES.get(FOLDERS.chart)?.contract;
  if (c) {
    for (const k of ['shown', 'route']) if (!(k in (c.keys ?? {}))) miss(`game.js map: the chart's contract has no key “${k}”`);
    for (const ref of [...CHAPTERS.map((_, i) => `c${i}`), `c${CHAPTERS.length}`, 'author']) {
      if (!c.points.includes(ref)) miss(`game.js map: the point “${ref}” is not in the chart's contract`);
    }
  }
}

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
  // the rule (scenario §3) said once more, apart from facts
  const line = { lamp: 'beam', mama: 'boat', son: 'pie', walk: 'beam', call: 'boat', wait: 'pie' };
  const third = { light: 'beam', door: 'boat', cape: 'pie', both: 'stair' }[state.choices.storm];
  const form = third === 'stair' || line[state.choices.night1] === third || line[state.choices.wall] === third ? 'full' : 'late';
  if (f.ending !== third || f.form !== form) miss(`facts give ${f.ending} ${f.form}, the rule ${third} ${form}: ${JSON.stringify(state.choices)}`);
  for (const [name, v] of Object.entries(state.scales)) if (!Number.isInteger(v)) miss(`the scale “${name}” is ${v}`);
  if (state.scales.paraffin !== 0) miss(`paraffin at the end: ${state.scales.paraffin} (three nights, three measures)`);
  const key = `${f.ending} ${f.form}`;
  ends.set(key, (ends.get(key) ?? 0) + 1);
}
await walk(0, fresh(), { titles: [] });

// the author's plays end as their labels say
const NAMED = { 'The Beam': 'beam', 'The Boat': 'boat', 'The Pie': 'pie', 'Halfway up the Stair': 'stair' };
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
