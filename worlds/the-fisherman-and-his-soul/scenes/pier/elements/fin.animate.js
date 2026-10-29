// the fluke rocks slowly on its root; none while she is not in the water (on the sand, gone)
const inWater = e.state.mermaid_here !== false && e.state.mermaid_at !== 'sand';
e.layer('fluke').alpha = inWater ? 1 : 0;
e.layer('fluke').rotate = 0.07 * e.anim.drift(e.t * 0.3, 7);
