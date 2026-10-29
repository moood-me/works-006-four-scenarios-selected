// The game's mini-games (scenario §7; the pieces' contract, docs/new-games/rybak-i-dusha/game.md «Stage 5 — pieces»),
// each a file of its own — {title, about (its seconds), skipped (what it leaves in the story when skipped: as played
// cleanly), missed (what a miss leaves: the dry run of check/run.mjs plays it too), points (where its marks stand),
// keys (what of the scene it moves), run(g, b, opts, signal)} — on the language of mini-games; what they share is
// hands.js. The scenario's dictionary of gestures: pull slowly — to draw out, to decide; hold, then let go — to let
// someone go; trace — to cut away; touch nothing — to listen, not to take; hold — not to let go; rhythm — someone else's
// dance; balance — to carry quietly. Each comes back with what a miss leaves in the story (§7), and the chapters read it.
// prologue
export { default as net } from './net.js';
export { default as release } from './release.js';
// chapter I
export { default as dance } from './dance.js';
export { default as knife } from './knife.js';
// chapter II
export { default as song } from './song.js';
// chapter III
export { default as cup } from './cup.js';
// chapter III, without him
export { default as post } from './post.js';
// chapter IV
export { default as knife2 } from './knife2.js';
export { default as net2 } from './net2.js';
export { default as hold } from './hold.js';
export { default as drag } from './drag.js';
