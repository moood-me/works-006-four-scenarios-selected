// A breath on the frost: a small puff every three seconds or so, each person on a rhythm of their own (a steady random
// phase and gap from the element's id); after a jump back in time it starts afresh.
const m = e.mem;
if (m.seed === undefined) {
  m.seed = 0;
  for (let i = 0; i < e.id.length; i++) m.seed += e.id.charCodeAt(i) * (i + 1);
  m.k = 0;
}
if (m.next === undefined || m.next - e.t > 8) m.next = e.t + 0.3 + 2.6 * e.anim.hash(m.seed, 3);
if (e.t >= m.next) {
  e.burst(6);
  m.k += 1;
  m.next = e.t + 2.8 + 1.0 * e.anim.hash(m.k, m.seed);
}
