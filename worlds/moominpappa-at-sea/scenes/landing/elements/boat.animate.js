// Afloat at the landing (moored, or tarred and back in the water) she rocks a little on the swell; pulled up she lies still.
const s = e.state;
if (s.boat === "away") return;
const afloat = s.boat === "moored" ? 1 - (s.boat_up ?? 0) : s.boat === "tarred" ? 1 : 0;
e.layer("hull").rotate = afloat * (0.018 * Math.sin(e.t * 0.9) + 0.008 * e.anim.noise(e.t * 0.4, 3));
