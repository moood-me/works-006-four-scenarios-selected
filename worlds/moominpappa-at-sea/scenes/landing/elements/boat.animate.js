// Moored, her stern afloat, she rocks a little on the swell; pulled up (boat_up, or any state but moored) she lies still.
const s = e.state;
if (s.boat === "away") return;
const afloat = s.boat === "moored" ? 1 - (s.boat_up ?? 0) : 0;
e.layer("hull").rotate = afloat * (0.018 * Math.sin(e.t * 0.9) + 0.008 * e.anim.noise(e.t * 0.4, 3));
