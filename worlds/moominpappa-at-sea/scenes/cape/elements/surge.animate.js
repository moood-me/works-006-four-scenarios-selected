// The wave rises out of the rock as `wave` goes 1 and sinks back as it goes 0 — only in a storm.
const w = e.state.storm > 0.3 ? e.state.wave ?? 0 : 0, wash = e.layer("wash");
wash.alpha = Math.min(0.8, w * 1.2);
wash.y = (1 - w) * 1.4;
