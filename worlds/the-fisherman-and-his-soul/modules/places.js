// places — people at a scene's named places (places.md): `<id>_at` names one of the scene's PLACES; set, they are put
// there at once (their place's keys `<id>_a`, `<id>_d` — and `<id>_e`, how high over the land, where the place says
// one: in the water —, their turn, a seat if it has one) — as a cut puts them; a walk
// there is a piece's. On opening, one not yet put where `<id>_at` says (`<id>_placed`) is put.
return {
  // scene — the script's; PLACES — {id: {name: {at: [across, distance, elevation?], turn, on?: [across, distance, elevation]}}}
  follow(scene, PLACES) {
    const put = id => {
      const name = scene.get(`${id}_at`), p = PLACES[id]?.[name];
      if (!p) return;
      scene.set(`${id}_a`, p.at[0]);
      scene.set(`${id}_d`, p.at[1]);
      if (p.at.length > 2) scene.set(`${id}_e`, p.at[2]);
      if (p.turn != null) scene.set(`${id}_turn`, p.turn);
      scene.set(`${id}_on`, p.on ?? null);
      scene.set(`${id}_placed`, name);
    };
    for (const id of Object.keys(PLACES)) {
      scene.on('change', `${id}_at`, () => put(id));
      if (scene.get(`${id}_placed`) !== scene.get(`${id}_at`)) put(id);
    }
  },
};
