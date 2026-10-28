// The check of the game's branches: node bespoke/check/run.mjs <a clone of the world>. No browser, no engine, nothing
// drawn. Every step of every chapter is played unseen, the way the author's map plays it (jump.js: a dry run, story.js
// context(…, j)), on a page that knows only the scenes' specs (their scene.json files in the clone): no time passes, a
// plate goes by at once, a minigame gives its `skipped`.
// Walked: every path — the play goes step by step from its beginning, and wherever a step makes a choice it is played
// again for each option it offers there (some are offered only on some paths: the bargain at the main gates), and some
// choices are made only on some paths (the shoes, the choice again after the bargain refused, the bell) — so every
// combination of the choices is played to its end, each step on the state the steps before left.
// Checked on every path, as it is played: the scenes the steps open are the world's and have the people they name; a
// choice's points and a minigame's point are elements of the scene shown then (a named point — named in that element's
// code); every line is said by one of people.json; a choice offered is one of the chapter's list, its options among
// the list's; nothing breaks. At each path's end: one finale was played (its title) — or “The Misted Glass” and then
// “Tracks on the Frost” (the bell) —, the last one is the one facts gives, and that is the scenario's rule said once
// more apart from facts (the choice at the coal gate decides; the bargain refused — the choice made after it; home —
// the bell); the scales are whole numbers within their bounds; the play's PLAYS (game.js) end as they say, with the
// scales they say.
// Printed: what does not match (with how many paths it was met on); how many paths end in each finale (and form);
// every line said, once (who | text) — the voices are made from it.
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
// a person's own points (moood/docs/agents/people.md): a mark on someone stands on one of them, never on the face
const BODY = ['head', 'hand_r', 'hand_l', 'hands', 'chest', 'hips', 'shoulder_r', 'shoulder_l', 'back', 'nape', 'foot_r', 'foot_l', 'feet'];
// a point ('id', 'id#name') of a scene: its element, and its name — a person's own point, else named in the element's
// code
function point(folder, ref, where) {
  const s = SCENES.get(folder), [id, name] = ref.split('#');
  if (!s) return;
  const o = s.objects.get(id);
  if (!o) miss(`${where}: the point “${ref}” — no element “${id}” in the scene “${folder}”`);
  else if (o.person) { if (!BODY.includes(name)) miss(`${where}: the point “${ref}” — a mark on a person stands on one of their points (${BODY.join(', ')})`); }
  else if (name && !new RegExp(`['"\`]${name}['"\`]`).test(s.code(id))) miss(`${where}: the point “${ref}” — the element's code names no “${name}”`);
}

const lines = new Map(); // `${who}\n${text}` → {who, text}
// a step played unseen on `state` (its choices made as they say, the first offered where they say nothing) → {state,
// made: the choices it made, offered: the options each offered, titles: the titles it showed}
async function step(c, s, state, where) {
  const j = jump(Infinity);
  const g = context(b, view, hub, structuredClone(state), j);
  let folder = null;
  const made = [], offered = [], titles = [];
  const { scene, say, choose, play, title } = g;
  g.scene = (f, o, x) => { folder = f; return scene(f, o, x); };
  g.say = (who, text, at) => {
    if (!PEOPLE[who]) miss(`${where}: “${text}” — said by “${who}”, no one of people.json`);
    lines.set(`${who}\n${text}`, { who, text });
    return say(who, text, at);
  };
  g.choose = (choice, offers) => {
    const def = CHAPTERS[c].choices.find(x => x.id === choice);
    const ids = Object.values(offers).flat().map(o => o.id);
    if (choice && !def) miss(`${where}: the choice “${choice}” is not in the chapter's choices`);
    else if (def && ids.some(id => !def.options.some(o => o.id === id))) miss(`${where}: the choice “${choice}” offers ${ids.join(', ')}, the chapter lists ${def.options.map(o => o.id).join(', ')}`);
    for (const ref of Object.keys(offers)) point(folder, ref, where);
    if (choice) { made.push(choice); offered.push(ids); }
    return choose(choice, offers);
  };
  g.play = (m, o) => { point(folder, atOf(m), where); return play(m, o); };
  g.title = text => { titles.push(text); return title(text); };
  let broke = null;
  await Promise.race([CHAPTERS[c].steps[s](g).catch(e => { broke = e; }), j.idle]);
  if (broke) miss(`${where}: the step broke: ${broke.message}`);
  return { state: g.state, made, offered, titles };
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

// --- every path: depth first, a step played again for each option the choice it makes offers
const STEPS = CHAPTERS.flatMap((ch, c) => ch.steps.map((_, s) => [c, s]));
const ends = new Map(); // `${ending} ${form}` → paths
let paths = 0;
async function walk(n, state, picked) {
  if (n === STEPS.length) return finish(state, picked);
  const [c, s] = STEPS[n], where = `${CHAPTERS[c].title} · ${CHAPTERS[c].titles[s]}`;
  const first = await step(c, s, state, where);
  if (!first.made.length) return walk(n + 1, { ...first.state }, { ...picked, titles: [...picked.titles, ...first.titles] });
  if (first.made.length > 1) miss(`${where}: makes more than one choice (${first.made.join(', ')})`);
  const id = first.made[0];
  for (const o of first.offered[0]) {
    const r = await step(c, s, { ...state, choices: { ...state.choices, [id]: o } }, where);
    await walk(n + 1, r.state, { ...picked, titles: [...picked.titles, ...r.titles] });
  }
}
const label = id => ENDINGS.find(e => e.id === id).label;
function finish(state, picked) {
  paths++;
  const f = facts(state), c = state.choices;
  const finales = picked.titles.filter(t => ENDINGS.some(e => e.label === t));
  const glassThenTracks = finales.length === 2 && finales[0] === label('glass') && finales[1] === label('tracks');
  if (finales.length !== 1 && !glassThenTracks) miss(`a path with the finales ${JSON.stringify(finales)}: ${JSON.stringify(c)}`);
  else if (finales.at(-1) !== label(f.ending)) miss(`a path played “${finales.at(-1)}”, facts give “${f.ending}”: ${JSON.stringify(c)}`);
  // the rule (the scenario's «Финалы»), said once more, apart from facts
  const refused = c.envelope === 'table' || c.cafe === 'public';
  if (c.gate === 'deal' && c.eileen !== 'house') miss(`the bargain offered without Eileen’s yes: ${JSON.stringify(c)}`);
  if (('again' in c) !== (c.gate === 'deal' && refused)) miss(`the choice again ${'again' in c ? 'made' : 'not made'}: ${JSON.stringify(c)}`);
  if (('plea' in c) !== (c.bolt === 'hold')) miss(`the shoes ${'plea' in c ? 'asked' : 'not asked'}: ${JSON.stringify(c)}`);
  const gate = c.gate === 'deal' && refused ? c.again : c.gate;
  if (('bell' in c) !== (gate === 'home')) miss(`the bell ${'bell' in c ? 'heard' : 'not heard'}: ${JSON.stringify(c)}`);
  const ending = { open: 'town', chute: 'file', deal: 'crown', home: c.bell === 'go' ? 'tracks' : 'glass' }[gate];
  if (f.ending !== ending) miss(`facts give ${f.ending}, the rule ${ending}: ${JSON.stringify(c)}`);
  if (ending === 'crown' && state.scales.home !== 5) miss(`“The Paper Crown” with Home ${state.scales.home}: ${JSON.stringify(c)}`);
  if (f.form === 'door' && state.scales.home > 3) miss(`“The open door” with Home ${state.scales.home}: ${JSON.stringify(c)}`);
  for (const [name, v] of Object.entries(state.scales)) {
    if (!Number.isInteger(v) || v < SCALES[name].min || v > SCALES[name].max) miss(`the scale “${name}” is ${v}`);
  }
  const key = f.form ? `${f.ending} (${f.form})` : f.ending;
  ends.set(key, (ends.get(key) ?? 0) + 1);
}
await walk(0, fresh(), { titles: [] });

// the author's plays end as they say, with the scales they say
for (const p of PLAYS) {
  let state = fresh();
  for (const [c, s] of STEPS) state = (await step(c, s, { ...state, choices: { ...p.choices, ...state.choices } }, p.label)).state;
  const f = facts(state);
  if (f.ending !== p.ending || state.scales.trade !== p.trade || state.scales.home !== p.home) {
    miss(`PLAYS “${p.label}” ends in “${f.ending}”, Trade ${state.scales.trade}, Home ${state.scales.home}`);
  }
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
