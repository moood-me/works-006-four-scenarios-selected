// A mini-game at stage 3 (rpg docs/writing-games-v2/game-stages.md): not the game of the hands yet — a mark on the
// scene's point to press, the language's plate with the line the mini-game will have, and a card saying what it will be
// (its gesture, what the hands do, the mood: scenario §7). Pressed — done, its plain outcome (as a mini-game skipped:
// the same trace in the story). The ghost shows the press at its first meeting in the play and whenever the player
// stands still (the language's tricks.teach). At stage 5 each is a mini-game of its own in its place.
//   stub({title, gesture, about, phrase, at}) → a minigame for g.play: {title, about: its seconds, skipped, run}
//     title — its name, gesture — the word of the scenario's dictionary of gestures, about — what the hands will do
//     and what is felt, phrase — the plate's line, at — the point its mark stands on ('id#point' — a person's own
//     point, never the face: 'bill#hands', 'sara#chest' —, an element's named point; an element's id)
export function stub({ title, gesture, about, phrase, at }) {
  return {
    title, about: 10, skipped: {},
    async run(g, b) {
      const mg = g.minigame({ phrase });
      g.card(title, gesture, about);
      const mark = mg.mark({ at: at.includes('#') ? at : `${at}@` });
      const press = mg.press({ on: mark });
      const taught = b.minigame.tricks.teach(mg, [press], { id: 'press:stub' });
      await new Promise(ok => press.on('press', ok));
      taught.remove();
      mg.snap({ at: mark });
      await mg.end({ as: 'clean' });
      return {};
    },
  };
}
