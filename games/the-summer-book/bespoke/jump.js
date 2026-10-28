// A jump (the author's map → a minigame of a step): the step played up to that minigame unseen and without time, then
// on as ever. What it does unseen is kept for the scene it shows: the values it sets, the seconds it waits, what it
// waits to hear from the scene — the scene works all of it out before it is seen (bespoke.show's `then`), and is where
// the step has got to. The player's choices: as the play has them, else the first offered; the minigames before it give their
// `skipped`; nothing said, heard, shown (story.js asks j.on). And a dry run (target Infinity): the step played so
// through — to list the minigames it plays, to know the play as it comes out of the step (game.js), to check every
// branch of the game (check/run.mjs).
//   jump(target) → j
//   j.on — unseen still; j.plays — the minigames played so far
//   j.scene(folder, state) — the scene shown now (what it did in the one before: forgotten); j.shown — {folder, state}
//   j.did(change) — [key, value]; j.values — the shown scene's values as the step set them
//   j.sleep(ms), j.heard(text, ms) — on the step's own clock: the seconds go by as nothing else is left to do now; what
//     the scene tells, heard as soon as nothing else is left to do now (and before any seconds go by)
//   j.then — what to give the scene; j.later(fn) — fn once it is seen (a choice that the play didn't make: offered)
//   j.real(promise) — something the step waits for that takes its own time (a scene's spec on its way): no turn of
//     the clock till it is here
//   j.idle → once nothing is left to do: a dry run done — or a jump stuck (story.js: seen from there on)
//   j.seen() → the heard still waited for [{text, ms, ok}] (the scene tells them from now): j.on false, the seconds
//     still waited for go by in time, j.later's done
export function jump(target) {
  let now = 0, n = 0, queued = false, waiting = 0, done;
  const sleeps = [], heard = [], later = [];
  const idle = new Promise(ok => { done = ok; });
  // (a turn of its own clock: each a task — what the step does on it, done before the next)
  const turn = new MessageChannel();
  const kick = () => { if (!queued && j.on) { queued = true; turn.port2.postMessage(0); } };
  turn.port1.onmessage = () => {
    queued = false;
    if (!j.on) return;
    if (heard.length) {
      const h = heard.shift();
      j.then.push(['heard', h.text, h.ms / 1000]);
      h.ok(true);
    } else if (sleeps.length) {
      sleeps.sort((a, b) => a.at - b.at || a.n - b.n);
      const s = sleeps.shift();
      if (s.at > now) j.then.push(['wait', (s.at - now) / 1000]);
      now = Math.max(now, s.at);
      s.ok();
    } else return waiting ? undefined : done();
    kick();
  };
  const j = {
    on: true, target, plays: [], shown: null, then: [], values: {}, idle,
    scene(folder, state) { j.shown = { folder, state }; j.then = []; j.values = { ...state }; },
    did(change) {
      j.then.push(change);
      j.values[change[0]] = change[1];
    },
    sleep: ms => new Promise(ok => { sleeps.push({ at: now + Math.max(0, ms), n: n++, ok }); kick(); }),
    heard: (text, ms = 180000) => new Promise(ok => { heard.push({ text, ms, ok }); kick(); }),
    later: fn => { later.push(fn); kick(); },
    real(promise) {
      waiting++;
      return promise.finally(() => { waiting--; kick(); });
    },
    seen() {
      j.on = false;
      turn.port1.close();
      for (const s of sleeps) setTimeout(s.ok, s.at - now);
      for (const fn of later) fn();
      return heard.splice(0);
    },
  };
  kick();
  return j;
}
