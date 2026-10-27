// which stones show where (ring, ring_n): in their places the first ring_n of a set or broken ring (all of a whole
// one, but the third when one is missing); kicked apart the rest of a broken ring; none of a ring not yet begun
const ring = e.state.ring, n = ring === "set" || ring === "broken" ? e.state.ring_n : ring === "one_missing" ? 9 : 0;
for (let i = 0; i < 9; i++) {
  e.layer(`set${i}`).alpha = i < n && !(ring === "one_missing" && i === 2) ? 1 : 0;
  e.layer(`off${i}`).alpha = ring === "broken" && i >= n ? 1 : 0;
}
