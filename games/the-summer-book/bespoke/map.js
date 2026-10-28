// The map's trees (game.js map), over “The map” — the island as Papa drew it, ink and watercolour on a long sheet (the
// world's scene `map`). The scene is only the background and a point for each chapter (c<i>: unseen, where its leaf
// hangs — the prologue over the house and the pier, I over the magic forest, II over the calm bay, III over the new
// house and the storm, IV over the cape, the epilogue over the big boat; the finale is the epilogue's leaf's last row)
// and for the author's sign (author). Each tree is the game's own: a paper leaf, HTML laid out by CSS in normal flow, in
// bespoke.underlay (under the language's marks, which stand on its knots, forks and pointers) — its number and title
// (its knot), its rows of choices (the forks) — the question, the answers: the one chosen in ink, the others in pencil,
// those never reached blank —, where the play stands (a pointer: “start the game”, “continue the game”, “continue the
// replay”), a replay's plate. A chapter to come — its number only. A leaf hangs by the middle of its top from its
// chapter's point and goes with it each frame the scene says (bespoke.onFrame): the view dragged, brought to a chapter;
// it is as large as the frame is high (its sizes are for a frame 900 px high) and as the point's depth makes it. A
// chapter just played grows row by row.
// What can be done on it is its own drawing: pressed, the game opens the language's mark there, born open (story.js
// hub.ask). Only what is offered takes a touch (≥ 44 px); the rest of it is the scene's (the view dragged).
//   trees(b, chapters, {grow, author}) → { at(ref) → () => {x, y} | null — that element's page point now (refs:
//     knot:<i>, fork:<i>:<k>, go:<i>, goreplay:<i>, badge:<i>, author); offer(refs, fn) — those take a press, fn(ref)
//     told; remove() }
//   chapters — as game.js sky() gives them: [{number, title, kind: here | played | next | future, rows: [{title,
//     weight, options: [{label, state: chosen | tried | both | open | unseen}]}], go, replay, badge}] — the i-th at the
//     point c<i>; grow — the chapter whose rows come one after another; author — the author's sign shown
const DIST = 12; // m: the points' distance from the eye — a leaf drawn at its size there
const FRAME = 900; // px: the frame's height a leaf's sizes are for
const el = (tag, cls, text) => Object.assign(document.createElement(tag), cls ? { className: cls } : {}, text != null ? { textContent: text } : {});

export function trees(b, chapters, { grow = null, author = false } = {}) {
  const root = el('div', 'map');
  b.underlay.append(root);
  // [{ref: the scene's point, box: the stand at it, leaf, nodes: Map ref → an element a mark stands on, offsets: Map ref
  // → [x, y] from the point at scale 1, now: its transform}]
  const stands = [];
  const where = new Map(); // a mark's ref → its stand
  let offered = new Set(), told = null;
  root.addEventListener('click', e => {
    const ref = e.target.closest?.('[data-ref]')?.dataset.ref;
    if (ref && offered.has(ref)) told?.(ref);
  });
  const can = () => {
    for (const n of root.querySelectorAll('[data-ref]')) n.classList.toggle('can', offered.has(n.dataset.ref));
  };
  const hit = (nodes, ref, cls, text) => {
    const n = el('button', cls, text);
    n.type = 'button';
    n.dataset.ref = ref;
    nodes.set(ref, n);
    return n;
  };
  function stand(ref, leaf, nodes) {
    const box = el('div', 'stand');
    box.append(leaf);
    root.append(box);
    stands.push({ ref, box, leaf, nodes, offsets: new Map(), now: '' });
  }

  chapters.forEach((c, i) => {
    const nodes = new Map(), leaf = el('section', `leaf ${c.kind}${i === grow ? ' grow' : ''}`);
    if (c.badge) leaf.append(hit(nodes, `badge:${i}`, 'badge', tr('Replay')));
    const head = hit(nodes, `knot:${i}`, 'head');
    head.append(el('span', 'num', c.number || (c.kind === 'future' ? c.title : '')), el('span', 'title', c.kind === 'future' ? '' : c.title));
    leaf.append(head);
    if (c.kind !== 'future') {
      const rows = el('ol', 'rows');
      leaf.append(rows);
      c.rows.forEach((r, k) => {
        const li = el('li', 'row');
        li.style.setProperty('--k', k);
        const q = hit(nodes, `fork:${i}:${k}`, 'q');
        q.append(el('span', 'dot'), el('span', 'name', r.weight ? `${r.weight} ${r.title}` : r.title));
        li.append(q);
        const opts = el('ul', 'opts');
        for (const o of r.options) opts.append(el('li', `opt ${o.state}`, o.state === 'unseen' ? '' : o.label));
        li.append(opts);
        rows.append(li);
      });
      if (c.go) leaf.append(hit(nodes, `go:${i}`, 'go', c.go));
      if (c.replay) leaf.append(hit(nodes, `goreplay:${i}`, 'go replay', tr('continue\nthe replay')));
    }
    stand(`c${i}`, leaf, nodes);
  });
  if (author) {
    const nodes = new Map(), sign = el('div', 'leaf sign');
    sign.append(hit(nodes, 'author', 'author', tr('the author’s map')));
    stand('author', sign, nodes);
  }

  // (laid out: each leaf hung by the middle of its top; where each mark's element is — as laid out, no transform counts)
  function measure() {
    root.style.setProperty('--h', `${b.frame().h}px`);
    for (const s of stands) {
      const w = s.leaf.offsetWidth;
      s.leaf.style.left = `${-w / 2}px`;
      for (const [ref, n] of s.nodes) {
        let x = 0, y = 0;
        for (let e = n; e && e !== s.box; e = e.offsetParent) { x += e.offsetLeft; y += e.offsetTop; }
        s.offsets.set(ref, [x + n.offsetWidth / 2, y + n.offsetHeight / 2]);
        where.set(ref, s);
      }
    }
    place(true);
  }
  const scale = p => (b.frame().h / FRAME) * (DIST / Math.max(0.5, p.depth));
  // each frame the scene says: every leaf at its point
  function place(again = false) {
    for (const s of stands) {
      const p = b.where(s.ref);
      const now = p ? `translate(${Math.round(p.x)}px, ${Math.round(p.y)}px) scale(${scale(p).toFixed(4)})` : 'hidden';
      if (now === s.now && !again) continue;
      s.now = now;
      s.box.hidden = !p;
      if (p) s.box.style.transform = now;
    }
  }
  const off = b.onFrame(() => place());
  addEventListener('resize', measure);
  can();
  measure();

  return {
    at: ref => () => {
      const s = where.get(ref), o = s?.offsets.get(ref), p = s && b.where(s.ref);
      if (!p) return null;
      const k = scale(p);
      return { x: p.x + o[0] * k, y: p.y + o[1] * k };
    },
    offer(refs, fn) { offered = new Set(refs); told = fn; can(); },
    remove() { off(); removeEventListener('resize', measure); root.remove(); },
  };
}
