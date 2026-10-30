// The map's trees (game.js map) at stage 3: the world has no map's scene yet (it comes with all the scenes, stage 4), so
// the chapters stand as paper leaves in one row over the empty pier at night, laid out by CSS — a row the player scrolls
// sideways, the chapter the play is at brought into view. Each leaf: its number and title (its knot), its rows of
// choices (the forks) — the question, the answers: the one chosen in ink, the others in pencil, those never reached
// blank —, where the play stands (a pointer: “start the game”, “continue the game”, “continue the replay”), a replay's
// plate. A chapter to come — its number only; a chapter not on the road played — its title and why (away).
// What can be done on it is its own drawing: pressed, the game opens the language's mark there, born open (story.js
// hub.ask). Only what is offered takes a touch (≥ 44 px).
//   trees(b, chapters, {grow, author}) → { at(ref) → () => {x, y} | null — that element's page point now (refs:
//     knot:<i>, fork:<i>:<k>, go:<i>, goreplay:<i>, badge:<i>, author); offer(refs, fn) — those take a press, fn(ref)
//     told; remove() }
//   chapters — as game.js sky() gives them: [{number, title, kind: here | played | next | future | end, rows: [{title,
//     weight, options: [{label, came, state: chosen | tried | both | open | unseen}]}], go, replay, badge, away}] (came —
//     what came of the one chosen: written under it, as the scenario's map has it, §11); grow — the
//     chapter whose rows come one after another; author — the author's sign shown
const el = (tag, cls, text) => Object.assign(document.createElement(tag), cls ? { className: cls } : {}, text != null ? { textContent: text } : {});

export function trees(b, chapters, { grow = null, author = false } = {}) {
  const root = el('div', 'map');
  b.underlay.append(root);
  const strip = el('div', 'strip');
  root.append(strip);
  const nodes = new Map(); // ref → the element a mark stands on
  let offered = new Set(), told = null;
  root.addEventListener('click', e => {
    const ref = e.target.closest?.('[data-ref]')?.dataset.ref;
    if (ref && offered.has(ref)) told?.(ref);
  });
  const can = () => {
    for (const n of root.querySelectorAll('[data-ref]')) n.classList.toggle('can', offered.has(n.dataset.ref));
  };
  const hit = (ref, cls, text) => {
    const n = el('button', cls, text);
    n.type = 'button';
    n.dataset.ref = ref;
    nodes.set(ref, n);
    return n;
  };

  chapters.forEach((c, i) => {
    const leaf = el('section', `leaf ${c.kind}${i === grow ? ' grow' : ''}`);
    strip.append(leaf);
    if (c.badge) leaf.append(hit(`badge:${i}`, 'badge', tr('Replay')));
    const head = hit(`knot:${i}`, 'head');
    head.append(el('span', 'num', c.number || (c.kind === 'future' ? c.title : '')), el('span', 'title', c.kind === 'future' ? '' : c.title));
    leaf.append(head);
    if (c.kind === 'future') return;
    if (c.away) leaf.append(el('p', 'away', c.away));
    const rows = el('ol', 'rows');
    leaf.append(rows);
    c.rows.forEach((r, k) => {
      const li = el('li', 'row');
      li.style.setProperty('--k', k);
      const q = hit(`fork:${i}:${k}`, 'q');
      q.append(el('span', 'dot'), el('span', 'name', r.weight ? `${r.weight} ${r.title}` : r.title));
      li.append(q);
      const opts = el('ul', 'opts');
      for (const o of r.options) {
        opts.append(el('li', `opt ${o.state}`, o.state === 'unseen' ? '' : o.label));
        if (o.came) opts.append(el('li', 'came', o.came));
      }
      li.append(opts);
      rows.append(li);
    });
    if (c.go) leaf.append(hit(`go:${i}`, 'go', c.go));
    if (c.replay) leaf.append(hit(`goreplay:${i}`, 'go replay', tr('continue\nthe replay')));
  });
  if (author) strip.append(hit('author', 'author', tr('the author’s map')));
  // (the chapter the play is at, in view)
  requestAnimationFrame(() => root.querySelector('.leaf.here, .leaf.next, .leaf.end')?.scrollIntoView({ inline: 'center', block: 'nearest' }));

  return {
    at: ref => () => {
      const n = nodes.get(ref);
      if (!n) return null;
      const r = n.getBoundingClientRect();
      return r.width ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null;
    },
    offer(refs, fn) { offered = new Set(refs); told = fn; can(); },
    remove() { root.remove(); },
  };
}
