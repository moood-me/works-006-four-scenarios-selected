// as many animals seen as `animals` says
const n = e.state.animals ?? 0;
for (let k = 0; k < 5; k++) e.layer(`a${k}`).alpha = k < n ? 1 : 0;
