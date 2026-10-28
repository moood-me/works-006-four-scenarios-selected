// What the game shows over the scene (bespoke.layer), in the island's grey and pearl: paper slips, grey-blue ink, the
// lamp's warm yellow for what is the player's to press.
//   view.gauge({scales, shown} | null) — the scales low on the left (story.js SCALES, ORDER): each one the player has
//     met — its name, its two ends and the pips between them; null — none (the map, the epilogue)
//   view.toast(text, kind, arrows) — a slip in the corner: 'scale' (a scale moved: its side and arrows), 'rule' (what
//     a scale means, the first time), 'mark' (remembered); three at most
//   view.card(title, gesture, text) — the card of a stub mini-game, high on the right: what it will be; → takes it away
//   view.hint(text) — one line low in the middle; → a function that takes it away
//   view.title(text, {signal}) — words in the middle of the frame; → once they have gone (9 s)
//   view.quiet() — what a chapter left showing (its slips, its hint) taken away: the map comes
//   view.author({chapters, plays: [labels], at() → {chapter, step}, games(as, chapter, step) → promise of [titles of
//     its minigames], go(as, chapter, step, game)}) — the author's map, opened by his sign on the map (→ toggle)
// (⏸, ⏭ and ☰ are the page's: the game draws none of them.)
import { SCALES, ORDER } from './story.js';

const el = (tag, cls, parent) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  parent?.append(e);
  return e;
};
const button = (text, title, onclick, cls) =>
  Object.assign(el('button', cls), { type: 'button', textContent: text, title, onclick, onmousedown: e => e.preventDefault() });

export function ui(layer) {
  const gauge = el('div', 'gauge', layer);
  const toasts = el('div', 'toasts', layer);
  let hinted = () => {};
  return {
    gauge(state) {
      gauge.replaceChildren();
      if (!state) return;
      for (const name of ORDER) {
        if (!state.shown[name]) continue;
        const S = SCALES[name], v = state.scales[name];
        const row = el('div', 'row', gauge);
        el('span', 'name', row).textContent = S.name;
        el('span', 'side', row).textContent = S.sides[0];
        const pips = el('span', 'pips', row);
        const on = S.spent ? S.max - v : v - S.min; // (spent: the bar from the left end grows as the value falls)
        for (let i = 1; i <= S.max - S.min; i++) el('i', i <= on ? 'on' : '', pips);
        el('span', 'side', row).textContent = S.sides[1];
      }
    },
    toast(text, kind, arrows = '') {
      while (toasts.childElementCount > 2) toasts.firstElementChild.remove();
      const slip = el('p', `slip ${kind}`, toasts);
      el('span', 'words', slip).textContent = text;
      if (arrows) el('span', 'arrows', slip).textContent = ` ${arrows}`;
      const stay = kind === 'rule' ? 8000 : 5000;
      setTimeout(() => slip.classList.add('gone'), stay);
      setTimeout(() => slip.remove(), stay + 1200);
    },
    card(title, gesture, text) {
      const c = el('div', 'card', layer);
      const head = el('p', 'head', c);
      el('b', '', head).textContent = title;
      el('span', 'gesture', head).textContent = gesture;
      el('p', 'text', c).textContent = text;
      el('p', 'stub', c).textContent = tr('A mini-game to be: for now, press the mark.');
      return () => c.remove();
    },
    hint(text) {
      hinted();
      const h = el('p', 'hint', layer);
      h.textContent = text;
      const off = () => h.remove();
      hinted = off;
      return off;
    },
    title(text, { signal } = {}) {
      const t = el('div', 'title', layer);
      el('span', 'words', t).textContent = text;
      return new Promise(ok => {
        const timers = [setTimeout(() => t.classList.add('on'), 60), setTimeout(() => t.classList.remove('on'), 6600),
          setTimeout(() => { t.remove(); ok(); }, 9000)];
        signal?.addEventListener('abort', () => { timers.forEach(clearTimeout); t.remove(); ok(); });
      });
    },
    quiet() {
      toasts.replaceChildren();
      hinted();
    },
    author({ chapters, plays, at, games, go }) {
      // the map (his sign on the map opens it): “play as…”, then every chapter a column of its steps (and their
      // minigames); a click outside, ✕ or Esc closes it
      const map = el('div', 'author-map', layer);
      map.hidden = true;
      let as = 0;
      const close = () => { map.hidden = true; };
      map.onclick = e => { if (e.target === map) close(); };
      addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
      const open = () => {
        const here = at(), panel = el('div', 'author-panel');
        const pick = el('label', 'as');
        pick.append('play as… ');
        const list = el('select', '', pick);
        list.append(...plays.map((name, i) => Object.assign(el('option'), { value: i, textContent: name, selected: i === as })));
        list.onchange = () => { as = Number(list.value); open(); };
        panel.append(button('✕', 'close (Esc)', close, 'close'), pick, ...chapters.map((c, ci) => {
          const col = el('section');
          el('h3', '', col).textContent = c.number ? `${c.number}. ${c.title}` : c.title;
          for (const [si] of c.steps.entries()) {
            const step = button(c.titles[si], '', () => { close(); go(as, ci, si); }, ci === here.chapter && si === here.step ? 'here' : '');
            const under = el('div', 'minigames');
            games(as, ci, si).then(names => under.append(...names.map((name, k) =>
              button(`◆ ${name}`, 'straight to the minigame', () => { close(); go(as, ci, si, k); }, 'minigame'))));
            col.append(step, under);
          }
          return col;
        }));
        map.replaceChildren(panel);
        map.hidden = false;
      };
      return () => (map.hidden ? open() : close());
    },
  };
}
