// how thick the fog over the water is: `fog`
const f = e.state.fog;
e.layer('far').alpha = Math.min(1, 0.3 + f);
e.layer('near').alpha = f;
