// Epilogue. “August” (scenario §5, §10). 31 August, the last morning, a thin fog; the island shut up till summer. The
// signs of the play on the shore, then the way to the boat by Grandmother's strength, Sophia's place by her scale, the
// hands in the mini-game of the ending; then the motor, the island from the water by the play's marks, the lines of the
// promises in the boat, the island going into the white. The ending the three hinges decide (story.js facts): “The
// Window” (Keep), “The Tent” (Together), “The Oars” (Let go) — each full or late —, “The Shawl on the Stone” (holding
// the incompatible).
// Scenes: the cape (peg, weigh — the Tent's beginning; tent_shot, shawl_shot), the shore (last_morning, signs; walk_*,
// elbow | catch, tent_walk, shawl_walk, dinghy_board, oars_after; from_water), the house (hat_leave), the sea (aboard,
// come_over | hand_in_hand, eyes_closed, swell; motor, look_house, cat_gift, sky, the talks, promise, window_last,
// oars_last), the new house (from_sea). Eriksson is not here.
// Reads: everything (facts, marks). Leaves: nothing.
import { SCENES, facts, hour, piece, on } from '../story.js';
import { gangway, hold, oars, upright } from '../minigames/all.js';

const MORNING = hour('dawn', { late: true, fog: 0.6 });
const SHORE = { ...MORNING, big_boat: true, luggage: true }, ALL = ['grandma', 'sophia', 'papa'];

export default {
  number: '', title: tr('August'),
  titles: ['The Last Morning', 'From the Water'],
  choices: [],
  steps: [
    // the signs, the way to the boat, the hands
    async g => {
      const f = facts(g.state);
      const label = { window: tr('The Window'), tent: tr('The Tent'), oars: tr('The Oars'), shawl: tr('The Shawl on the Stone') }[f.ending];
      if (f.ending === 'tent') {
        await piece(g, 'peg', {
          peg: async () => {
            g.title(label);
            await g.say('papa', 'The winter will carry it off', 'papa');
          },
          mine: () => g.say('sophia', 'It won’t. It’s mine'),
        }, () => g.scene(SCENES.cape, { beat: 'peg', here: ['grandma', 'sophia'], moods: { grandma: 'smile', sophia: 'neutral' }, keys: MORNING }, { beds: { sea: 0.4 } }));
        await piece(g, 'weigh', {
          winter: () => (f.knew ? g.say('papa', 'You’ll winter with us. The doctor will come every week', 'papa')
            : g.say('papa', 'You’ll winter with us. The doctor will come', 'papa')),
        });
      }
      // the signs of the play (§9), in every ending: the pouch, the shell or the pocket; the hat; the graves or the basket
      await piece(g, 'last_morning', { boat: async () => (f.ending === 'tent' ? undefined : g.title(label)) },
        () => g.scene(SCENES.shore, { beat: 'last_morning', here: ALL, moods: { grandma: 'neutral', sophia: 'neutral', papa: 'neutral' }, keys: SHORE }, { cut: f.ending === 'tent', beds: { sea: 0.4 } }));
      if (f.bird === 'out') on(g, 'signs:bird', () => g.sound.hiss()); // (the cat in the basket)
      await g.beat('signs');
      if (f.mama === 'moon') {
        await piece(g, 'hat_leave', {
          touch: () => g.say('sophia', 'Till summer'),
        }, () => g.scene(SCENES.house, { beat: 'hat_leave', here: ALL, moods: { sophia: 'sad' }, keys: MORNING }, { cut: true, beds: { sea_in: 0.3 } }));
      }
      // the way to the boat: its piece opened anew (its own places and camera), a cut from the signs or the house
      const open = name => () => g.scene(SCENES.shore, { beat: name, here: ALL, keys: SHORE }, { cut: true, beds: { sea: 0.4 } });
      const way = f.strength >= 3 ? 'walk_self' : f.strength >= 1 ? 'walk_arm' : 'walk_slow';
      if (f.ending === 'window') {
        await open(way)();
        await g.beat(way);
        if (f.form === 'full') await g.beat('elbow');
        else {
          await piece(g, 'catch', {
            behind: () => g.say('grandma', 'Don’t catch me. I won’t fall'),
            stop: () => (f.strength === 0 ? g.say('grandma', 'Well, hold me, since you’re catching') : undefined),
          });
        }
        await g.play(gangway);
        await g.scene(SCENES.sea, { beat: 'aboard', here: ALL, keys: MORNING }, { cut: true, beds: { sea: 0.35, motor: 0.2 } });
        await g.beat('aboard');
      } else if (f.ending === 'tent') {
        await open('tent_walk')();
        await g.beat('tent_walk');
        await g.scene(SCENES.sea, { beat: f.sophia >= 3 ? 'come_over' : 'hand_in_hand', here: ALL, moods: { grandma: 'smile', papa: 'sad' }, keys: MORNING }, { cut: true, beds: { sea: 0.35, motor: 0.2 } });
        await g.beat(f.sophia >= 3 ? 'come_over' : 'hand_in_hand');
        await g.play(hold);
        await g.beat('eyes_closed');
      } else if (f.ending === 'oars') {
        await piece(g, 'dinghy_board', {
          ...(f.knew && !f.heard ? { hand: () => g.say('grandma', 'The winter is yours. The hundred steps are ours') } : {}),
          ...(!f.heard ? { push: () => g.say('papa', 'Along the shore. So that I can see') } : {}),
          sophia: async () => {
            if (f.form === 'late') {
              if (f.called || f.night === 'knock') {
                await g.say('sophia', 'You didn’t come');
                await g.say('grandma', 'You got there by yourself');
              } else await g.say('sophia', 'I saw your lamp');
            } else if (f.hearBroken) await g.say('sophia', 'You didn’t come then');
          },
          shake: () => (f.knockBroken ? g.say('sophia', 'Myself!') : undefined),
        }, open('dinghy_board'));
        await g.play(oars);
        await g.beat('oars_after');
      } else {
        await piece(g, 'shawl_walk', {
          jacket: async () => {
            await g.say('sophia', 'Where’s your shawl?');
            await g.say('grandma', 'I lost it');
          },
          doctor: () => g.say('papa', 'In town — a doctor'),
        }, open('shawl_walk'));
        await g.scene(SCENES.sea, { beat: 'aboard', here: ALL, keys: MORNING }, { cut: true, beds: { sea: 0.35, motor: 0.2 } });
        g.set('beat_next', 'swell');
        await g.beat('aboard');
        await g.beat('swell');
        await g.play(upright);
      }
    },
    // the motor; the island from the water; the lines in the boat; into the white
    async g => {
      const f = facts(g.state);
      // (the Oars: the same crossing — the dinghy is still at the big boat's side)
      await g.scene(SCENES.sea, { beat: 'motor', here: ALL, keys: { ...MORNING, dinghy: f.ending !== 'oars' } }, { cut: true, beds: { sea: 0.35, motor: 0.3 } });
      await g.beat('motor');
      // the island from the water (§10), by the marks (the shell taken off the rail in the signs); the new house
      await g.scene(SCENES.shore, { beat: 'from_water', here: [], keys: { ...SHORE, shell: false } }, { cut: true });
      await g.beat('from_water');
      await g.scene(SCENES.newHouse, { beat: 'from_sea', here: [], keys: { ...MORNING, seal: f.house } }, { cut: true });
      await g.beat('from_sea');
      // in the boat: the black windows looked at, the cat's last present, the sky — by the marks — then the ending's talk
      const rest = [...(f.house ? [] : ['look_house']), ...(f.bird === 'gift' ? ['cat_gift'] : []), 'sky'];
      await g.scene(SCENES.sea, { beat: rest[0], here: ALL, keys: { ...MORNING, dinghy: f.ending !== 'oars' } }, { cut: true });
      for (const name of rest) await g.beat(name);
      if (f.ending === 'window') {
        await piece(g, 'window_talk', {
          said: () => g.say('grandma', 'She wouldn’t have let herself be led either'),
          papa: () => g.say('papa', 'She wouldn’t'),
          ...(f.storm === 'blanket' ? { song: () => g.say('grandma_song', 'Row, little boat… mm-mm… the light on the skerry… is burning for you', 'grandma') } : {}),
        });
      } else if (f.ending === 'tent') {
        await piece(g, 'tent_talk', {
          mama: () => g.say('sophia', '…and Mama would have got into the tent too!'),
          again: async () => {
            await g.say('sophia', 'Next summer again!');
            await g.say('grandma', 'Again');
            await g.say('papa', 'We’ll see');
          },
          ...(f.form === 'late' ? { once: () => g.say('sophia', 'Why only once?') } : {}),
        });
      } else if (f.ending === 'oars') {
        // the dinghy's side: up into the big boat, the dinghy tied astern
        await piece(g, 'oars_boat', {
          ...(!f.learned ? {
            hand: async () => {
              if (f.nets === 'say') {
                await g.say('papa', 'Mamma?');
                await g.say('grandma', 'I’ll tell you later');
              } else if (f.nets === 'nothing') await g.say('grandma', 'Nothing to tell');
            },
          } : {}),
          ...(f.form === 'full' && f.mama === 'gone' ? {
            ask: () => g.say('sophia', 'Did Mama row like that?'),
            better: () => g.say('papa', 'Better'),
          } : {}),
        });
      } else {
        await piece(g, 'shawl_talk', {
          tell: () => (!f.called ? undefined : f.night === 'knock' ? g.say('sophia', 'I called. Nobody came, nobody knocked. It was frightening. Then morning')
            : g.say('sophia', 'I called. Nobody came. It was frightening. Then morning')),
          ...(f.knockBroken && !f.called ? { knock: () => g.say('sophia', 'You didn’t knock') } : {}),
          patch: async () => {
            await g.say('sophia', 'What’s that?');
            await g.say('grandma', 'A stone');
          },
        });
      }
      if (f.mama === 'sky') {
        await piece(g, 'promise', {
          said: async () => {
            await g.say('sophia', 'You promised: not soon');
            await g.say('grandma', 'I did');
            await g.say('sophia', 'Promise again');
          },
          silent: () => g.say('sophia', 'Greedy'),
        });
      } else if (f.mama === 'moon') {
        await piece(g, 'promise', {
          whisper: () => g.say('sophia', 'You never did tell me where Mama is'),
          point: async () => {
            await g.say('grandma', 'Look');
            await g.say('sophia', '“Look” again!');
          },
        });
      }
      if (f.ending === 'window') {
        await piece(g, 'window_last', {
          narrator: () => g.say('narrator', 'That winter Grandmother lived with them in town, in a room with a window onto the yard. It was a good window'),
        });
      } else if (f.ending === 'oars') await g.beat('oars_last');
      else {
        await g.scene(SCENES.cape, { beat: f.ending === 'tent' ? 'tent_shot' : 'shawl_shot', here: [], keys: { ...MORNING, ...(f.ending === 'tent' ? { stones: true } : { shawl: 'ledge' }) } }, { cut: true, beds: { sea: 0.3, motor: 0.15 } });
        await g.beat(f.ending === 'tent' ? 'tent_shot' : 'shawl_shot');
      }
    },
  ],
};
