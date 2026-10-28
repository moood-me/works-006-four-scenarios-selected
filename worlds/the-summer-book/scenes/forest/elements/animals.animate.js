// as many animals seen as `animals` says
const n = e.state.animals ?? 0;
for (let k = 0; k < 5; k++) e.layer(`a${k}`).alpha = k < n ? 1 : 0;
// the seal's far flipper: there unless the knife jerked (the play's `flipper`, or the minigame's `knife_flaw` this step)
const one = e.state.flipper === true || (e.state.knife_flaw ?? 0) >= 0.5;
e.layer('a4f').alpha = n >= 5 && !one ? 1 : 0;
