// hours — a scene's light by its name (hours.md): the game names the hour as a word (the pier's and the stone's `light`,
// the well's and the bridge's `time`); the light the scene turns by is numbers (its looks, its sky's layers, its mist):
// the word sets them at once. A piece that moves the light slowly moves the numbers itself, and names the word as it
// ends (nothing then changes).
return {
  // scene — the scene's own (its script's); key — the word's key; table — {word: {key: number, …}}
  follow(scene, key, table) {
    const put = v => {
      const t = table[v];
      if (!t) return;
      for (const k in t) if (scene.get(k) !== t[k]) scene.set(k, t[k]);
    };
    scene.on('change', key, put);
    put(scene.get(key));
  },
};
