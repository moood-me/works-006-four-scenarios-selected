// IV. “The Fog” (scenario §5, 4.1–4.5). August: the tent comes with the post (the chair by the gate, “You mustn’t”, or
// a foot on the thwart and off again); the tent on the cape, the law of the fog; ⚑ what to say for the night (colours);
// the night — the candle goes out in the fog, maybe one call; ⚑ the third hinge; the fog's night as it decides, and —
// where he did not know — when Papa learns.
// Scenes: the shore (post, post_after, gate | foot | porch_stay; porch_dawn, jacket, learns, run_to, count | hem |
// alone; called_porch), the house (sniff; doctor_list; night_window, night_face; go_out; wake … elbow, papa_came;
// lamp_window, lamp_higher, chair_dawn, breakfast | cot_moved; evening_wall), the cape (pitch … no_wave; fog_way and
// the night's branches; flap_moon, cat_fog, out_of_white; behind_sit … before_dawn).
// Reads: everything before (facts), scales. Leaves: choices.night, choices.fog, marks.drops, marks.stayed,
// marks.called, marks.hear, marks.knock, marks.say, marks.heard, scales.
import { SCENES, facts, hour, piece, on } from '../story.js';
import { parcel, pole, fog, dark, lamp, wait, knock } from '../minigames/all.js';

const DAY = hour('day', { late: true }), DUSK = hour('dusk', { late: true }), NIGHT = hour('night', { late: true });
const DAWN = hour('dawn', { late: true }), HOME = ['grandma', 'sophia', 'papa'];
// the house on the fog's night: Sophia is on the cape (she comes in with Papa in the “papa”)
const NIGHT_HOME = ['grandma', 'papa'];

export default {
  number: 'IV', title: tr('The Fog'),
  titles: ['The Post', 'The Tent', 'For the Night', 'The Night', 'The Fog'],
  choices: [
    { id: 'night', title: tr('What to say for the night'), options: [{ id: 'call', label: tr('“Call — I’ll hear”') }, { id: 'scared', label: tr('“Then you’re frightened”') }, { id: 'knock', label: tr('“At midnight I’ll knock”') }] },
    { id: 'fog', title: tr('The candle has gone out'), weight: '⚑', options: [{ id: 'go', label: tr('Take the lantern and go') }, { id: 'papa', label: tr('Wake her son') }, { id: 'lamp', label: tr('A lamp in the window, and wait') }, { id: 'behind', label: tr('Sit behind the tent') }] },
  ],
  steps: [
    // 4.1: the post; the parcel; the chair by the gate — or the boat
    async g => {
      const f = facts(g.state);
      g.beds({ sea: 0.45 });
      await piece(g, 'post', {
        grab: () => g.say('sophia', 'Is it mine?'),
      }, async () => {
        await g.scene(SCENES.shore, { beat: 'post', here: ['grandma', 'sophia', 'papa', 'eriksson'], moods: { grandma: 'neutral', sophia: 'laugh', papa: 'thinking' }, keys: DAY });
        g.title(tr('August'));
      });
      g.set('parcel_long', (await g.play(parcel)).long); // (held long: the string snaps, Sophia sits down on the pier)
      await piece(g, 'post_after', {
        ask: async () => {
          await g.say('eriksson', 'Will you put it up yourself?');
          await g.say('sophia', 'Myself!');
        },
      });
      if (f.knew) {
        g.mark('drops', true, null);
        g.beds({ sea_in: 0.3 });
        await piece(g, 'sniff', {
          sniff: async () => {
            await g.say('sophia', 'Is that what tired smells like?');
            await g.say('grandma', 'It is');
          },
        }, () => g.scene(SCENES.house, { beat: 'sniff', here: HOME, moods: { sophia: 'disgusted', grandma: 'neutral' }, keys: DAY }, { cut: true }));
        g.beds({ sea: 0.45 });
        await piece(g, 'gate', {
          call: () => g.say('eriksson', 'To the nets?'),
          papa: () => g.say('papa', 'Mamma. You mustn’t'),
          shove: async () => g.mood('grandma', 'angry'),
          chair: async () => {
            await g.say('eriksson', 'They’ve tied you up');
            await g.say('grandma', 'I tied myself');
          },
        }, () => g.scene(SCENES.shore, { beat: 'gate', here: ['grandma', 'papa', 'eriksson'], moods: { grandma: 'neutral', papa: 'thinking' }, keys: DAY }, { cut: true }));
      } else if (f.strength >= 2) {
        await piece(g, 'foot', {
          call: () => g.say('eriksson', 'Will you come out to the nets?'),
          off: async () => {
            await g.say('grandma', 'Some other time');
            await g.say('eriksson', 'There aren’t many other times left for us');
          },
        });
      } else {
        g.mark('stayed', true, null);
        await piece(g, 'porch_stay', {
          call: () => g.say('eriksson', 'Will you come out to the nets?'),
          look: async () => {
            g.mood('grandma', 'tired');
            await g.say('grandma', 'Off you go');
          },
        }, () => g.scene(SCENES.shore, { beat: 'porch_stay', here: ['grandma', 'sophia', 'papa', 'eriksson'], moods: { grandma: 'tired', papa: 'thinking' }, keys: DAY }, { cut: true }));
      }
    },
    // 4.2: the tent on the cape; the law of the fog
    async g => {
      const f = facts(g.state);
      g.beds({ sea: 0.35, wind: 0.15 });
      await g.scene(SCENES.cape, { beat: 'pitch', here: ['grandma', 'sophia'], moods: { grandma: 'neutral', sophia: 'smile' }, keys: DUSK });
      await g.beat('pitch');
      g.mark('lean', (await g.play(pole)).lean, null); // (the tent as crooked as the pole trembled: the cape's `lean` from now on)
      await piece(g, 'law', {
        law: async () => {
          await g.say('papa', 'Candle for two hours. If the fog comes — don’t move from the spot. Not toward a light, not toward a voice. That’s the law', 'papa');
          await g.say('sophia', 'I know');
        },
        yours: async () => {
          await g.say('papa', 'The window is yours', 'papa');
          await g.say('grandma', 'Mine');
        },
      });
      if (f.bird === 'gift') {
        on(g, 'cat_comes:sit', () => g.sound.purr(4));
        await g.beat('cat_comes');
      }
      if (g.state.marks.stayed) {
        await piece(g, 'doctor', {
          say: async () => {
            await g.say('papa', 'Mamma, I’ll write to the doctor', 'papa');
            await g.say('grandma', 'In autumn. In town');
          },
        });
        g.beds({ sea_in: 0.25 });
        await g.scene(SCENES.house, { beat: 'doctor_list', here: ['papa'], moods: { papa: 'thinking' }, keys: DUSK });
        await g.beat('doctor_list');
      } else await g.beat('up_path');
    },
    // 4.3: ⚑ what to say for the night
    async g => {
      g.beds({ sea: 0.35, wind: 0.15 });
      await g.scene(SCENES.cape, { beat: 'goodnight', here: ['grandma', 'sophia'], moods: { grandma: 'neutral', sophia: 'neutral' }, keys: DUSK }, { cut: !g.state.marks.stayed });
      await g.beat('goodnight');
      const night = await g.choose('night', { 'sophia#chest': [
        { id: 'call', label: tr('“If you get frightened — call. I’ll hear”') },
        { id: 'scared', label: tr('“If you get frightened — then you’re frightened. It’ll pass by morning”') },
        { id: 'knock', label: tr('“At midnight I’ll knock. Three times”') },
      ] });
      if (night === 'call') {
        await g.say('grandma', 'If you get frightened — call. I’ll hear');
        await g.say('sophia', 'I won’t get frightened');
        await piece(g, 'sleeve', {
          catch: async () => {
            await g.say('sophia', 'And you’ll really hear?');
            await g.say('grandma', 'Really');
          },
        });
        await g.beat('leave');
      } else if (night === 'scared') {
        await g.say('grandma', 'If you get frightened — then you’re frightened. It’ll pass by morning');
        g.mood('sophia', 'thinking');
        await g.beat('no_wave');
      } else {
        await g.say('grandma', 'At midnight I’ll knock. Three times');
        g.mood('sophia', 'laugh');
        await g.say('sophia', 'Three! Don’t forget!');
        await g.beat('leave');
      }
      g.apply('night');
    },
    // 4.4: the night; the candle goes out in the fog; ⚑ the third hinge
    async g => {
      const f = facts(g.state);
      g.beds({ sea_in: 0.2, drips: 0.2, bell: 0.15 });
      await piece(g, 'night_window', {
        out: async () => {
          if (f.sophia > 1) return;
          await g.say('sophia', 'Grandmother!', 'room#window');
          g.mark('called', true, tr('Sophia called, once. Only at this window could it be heard.'));
        },
      }, () => g.scene(SCENES.house, { beat: 'night_window', here: NIGHT_HOME, moods: { grandma: 'thinking' }, keys: { ...NIGHT, fog: 0.3 } }));
      await piece(g, 'night_face', { face: async () => g.mood('grandma', 'sad') });
      await g.choose('fog', { 'grandma#chest': [
        { id: 'go', label: tr('Take the lantern and go to her') },
        { id: 'papa', label: tr('Wake her son') },
        { id: 'lamp', label: tr('Put the lamp in the window and wait') },
        { id: 'behind', label: tr('Go and sit behind the tent, unseen') },
      ] });
    },
    // 4.5: the fog's night as the hinge decides; when Papa learns
    async g => {
      const f = facts(g.state);
      const strength = f.strength; // (before the night takes its toll)
      const FOG = { ...NIGHT, fog: 0.8 };
      if (f.fog === 'go' || f.fog === 'behind') {
        g.beds({ sea_in: 0.2, drips: 0.25, bell: 0.15 });
        on(g, 'go_out:door', () => g.sound.creak({ slow: true }));
        await g.scene(SCENES.house, { beat: 'go_out', here: NIGHT_HOME, moods: { grandma: 'neutral' }, keys: FOG }, { cut: true });
        await g.beat('go_out');
        g.beds({ sea: 0.25, drips: 0.4, bell: 0.2 });
        await g.scene(SCENES.cape, { beat: 'fog_way', here: ['grandma', 'sophia'], moods: { grandma: f.fog === 'go' ? 'afraid' : 'tired', sophia: 'sad' }, keys: FOG }, { cut: true });
        await g.beat('fog_way');
      }
      if (f.fog === 'go') {
        await g.play(fog);
        if (strength >= 2) {
          on(g, 'knock_in:knock', () => { if (f.night === 'knock') g.sound.knock(); });
          await piece(g, 'knock_in', {
            knock: async () => {
              if (f.night === 'knock') g.mark('knock', 'kept', tr('“I’ll knock” — kept.'));
              else await g.say('grandma', 'It’s me');
            },
            open: async () => {
              g.mood('sophia', 'laugh');
              await g.say('sophia', 'I knew!');
            },
          });
          await piece(g, 'in_tent', { hand: () => g.say('grandma', 'Don’t hang on me') });
          await piece(g, 'fetch', { papa: () => (f.knew ? g.say('papa', 'Mamma', 'papa') : undefined) });
        } else {
          await piece(g, 'sit_half', {
            spin: async () => g.mood('grandma', 'tired'),
            shout: () => g.say('grandma', 'Stay there! I’m here!'),
          });
          await piece(g, 'found', {
            out: async () => g.mood('sophia', 'afraid'),
            found: async () => {
              if (f.night !== 'knock') return;
              await g.say('sophia', 'You didn’t knock, you shouted!');
              g.mark('knock', 'shout', tr('“I’ll knock” — a shout instead of the knock.'));
            },
          });
          if (f.head === 'sophia') {
            await piece(g, 'turn_home', {
              turn: () => g.say('sophia', 'You said — run for Papa!'),
              caught: () => g.say('grandma', 'Not today. Sit with me'),
            });
          }
          await g.beat('till_dawn');
          await piece(g, 'papa_finds', { found: () => (f.knew ? g.say('papa', 'Mamma', 'papa') : undefined) });
        }
        if (f.called && f.night === 'call') g.mark('hear', 'kept', tr('“I’ll hear you” — kept.'));
        if (!f.knew) {
          await porch(g, f);
          await learns(g, f, { sophia: true });
        }
      } else if (f.fog === 'papa') {
        g.beds({ sea_in: 0.2, drips: 0.2, bell: 0.15 });
        await piece(g, 'wake', {
          sit: () => g.say('papa', 'Sit. Shine'),
        }, () => g.scene(SCENES.house, { beat: 'wake', here: NIGHT_HOME, moods: { grandma: 'afraid', papa: 'neutral' }, keys: FOG }, { cut: true }));
        await g.beat('shine');
        await g.play(lamp);
        g.here('sophia', true);
        await piece(g, 'light_back', {
          near: async () => {
            g.mood('sophia', f.sophia > 1 ? 'angry' : 'tired');
            if (f.sophia > 1) await g.say('sophia', 'I wasn’t frightened! I was asleep!');
          },
        });
        await piece(g, 'back_in', {
          threshold: async () => {
            if (f.night !== 'knock') return;
            g.mood('sophia', 'angry');
            await g.say('sophia', 'And you?');
            await g.wait(2500); // (Grandmother says nothing; Sophia kicks the threshold)
            await g.say('sophia', 'You always lie!');
            g.mark('knock', 'broken', tr('“I’ll knock” — broken.'));
          },
        });
        await piece(g, 'elbow', {
          caught: async () => {
            if (f.knew) await g.say('papa', 'Sit down');
            else {
              await g.say('papa', 'How long?');
              await g.say('grandma', 'A long time');
            }
          },
          sat: () => (f.knew ? undefined : said(g, f, { woke: true })),
          sophia: () => (!f.knew && f.head === 'sophia' ? g.say('sophia', 'I didn’t tell. She told me not to') : undefined),
        });
        if (f.called && f.night === 'call') {
          await piece(g, 'papa_came', {
            said: () => g.say('sophia', 'I called you. And Papa came'),
          }, () => g.scene(SCENES.house, { beat: 'papa_came', here: HOME, moods: { grandma: 'tired', sophia: 'neutral' }, keys: DAWN }));
          g.mark('hear', 'papa', tr('“I’ll hear you” — Papa came.'));
        }
      } else if (f.fog === 'lamp') {
        g.beds({ sea_in: 0.2, drips: 0.2, bell: 0.15 });
        await g.scene(SCENES.house, { beat: 'lamp_window', here: NIGHT_HOME, moods: { grandma: 'thinking' }, keys: FOG }, { cut: true });
        await g.beat('lamp_window');
        await g.play(wait);
        if (f.called) await g.beat('lamp_higher');
        g.beds({ sea: 0.2, drips: 0.4, bell: 0.2 });
        await piece(g, 'flap_moon', {
          night: () => (f.night === 'scared' || f.sophia <= 1 ? undefined
            : f.mama === 'sky' ? g.say('sophia', 'Mama, can you see?')
              : f.mama === 'gone' ? g.say('sophia', 'Grandmother isn’t asleep. There’s the lamp') : undefined),
        }, () => g.scene(SCENES.cape, { beat: 'flap_moon', here: ['sophia'], moods: { sophia: f.night === 'scared' ? 'afraid' : f.sophia <= 1 ? 'sad' : 'thinking' }, keys: { ...NIGHT, fog: 0.5 } }, { cut: true }));
        if (f.bird === 'gift') await g.beat('cat_fog');
        g.beds({ sea_in: 0.2, drips: 0.15 });
        await piece(g, 'chair_dawn', {
          lamp: async () => {
            if (!f.knew) return;
            await g.say('papa', 'You didn’t sleep');
            await g.say('grandma', 'I slept');
          },
        }, () => g.scene(SCENES.house, { beat: 'chair_dawn', here: NIGHT_HOME, moods: { grandma: 'tired', papa: 'thinking' }, keys: { ...DAWN, fog: 0.8 } }));
        g.beds({ sea: 0.3, drips: 0.2 });
        await g.scene(SCENES.cape, { beat: 'out_of_white', here: ['sophia', 'papa'], moods: { sophia: 'sad', papa: 'thinking' }, keys: { ...DAWN, fog: 0.6 } }, { cut: true });
        await g.beat('out_of_white');
        if (f.called) {
          g.beds({ sea: 0.35 });
          await piece(g, 'called_porch', {
            said: async () => {
              g.mood('sophia', 'angry');
              await g.say('sophia', 'I called!');
              if (f.night === 'knock') await g.say('sophia', 'And you didn’t knock!');
            },
            eyes: () => g.say('grandma', 'I heard'),
            hate: () => g.say('sophia', 'I hate you!'),
            woken: async () => {
              await g.say('papa', 'You could have woken me');
              await g.say('grandma', 'You’d have gone');
            },
          }, () => g.scene(SCENES.shore, { beat: 'called_porch', here: ['grandma', 'sophia', 'papa'], moods: { grandma: 'tired', papa: 'sad' }, keys: { ...DAWN, fog: 0.4 } }, { cut: true }));
          if (f.night === 'call') g.mark('hear', 'broken', tr('“I’ll hear you” — broken: she heard, and did not come.'));
          g.beds({ sea_in: 0.25 });
          await g.scene(SCENES.house, { beat: 'cot_moved', here: HOME, moods: { grandma: 'tired', papa: 'sad' }, keys: DUSK });
          await g.beat('cot_moved');
          g.mark('heard', true, null);
        } else {
          g.beds({ sea_in: 0.25 });
          await piece(g, 'breakfast', {
            lamp: () => g.say('sophia', 'I saw your lamp'),
            knock: async () => {
              if (f.night !== 'knock') return;
              await g.say('sophia', 'You didn’t knock');
              await g.say('grandma', 'I didn’t');
            },
          }, () => g.scene(SCENES.house, { beat: 'breakfast', here: HOME, moods: { grandma: 'tired', sophia: 'neutral', papa: 'thinking' }, keys: hour('day', { late: true }) }));
        }
        if (f.night === 'knock') g.mark('knock', 'broken', tr('“I’ll knock” — broken.'));
      } else {
        await g.play(dark);
        await piece(g, 'behind_sit', { sat: async () => g.mood('grandma', 'sad') });
        if (f.bird === 'gift') await g.beat('cat_fog');
        await piece(g, 'alone_talk', {
          mama: () => (f.mama === 'moon' ? undefined : g.say('sophia', 'Mama, I’m alone. Hardly frightened at all', 'tent_front#door')),
          three: () => (f.night === 'knock' ? g.say('sophia', 'Well… three times…', 'tent_front#door') : undefined),
        });
        await g.play(knock);
        await g.beat('before_dawn');
        await porch(g, f, { jacket: true });
        if (!f.knew) await learns(g, f, { sophia: false });
        g.here('sophia', true);
        await g.beat('run_to');
        if (f.head === 'sophia') {
          await piece(g, 'count', {
            sleeve: async () => {
              g.mood('sophia', 'afraid');
              await g.say('sophia', 'She isn’t getting up! She said — then to you!');
              await g.say('papa', 'I know');
              await g.say('sophia', 'I didn’t tell. She told me not to');
            },
            count: () => g.say('sophia', 'One, two, three, four, five…'),
          });
          if (f.called || f.night === 'knock') {
            g.beds({ sea_in: 0.25 });
            await piece(g, 'evening_wall', {
              said: async () => {
                if (f.called) {
                  await g.say('sophia', 'I called and you didn’t come!');
                  if (f.night === 'knock') await g.say('sophia', 'And you didn’t knock!');
                } else await g.say('sophia', 'You didn’t knock');
              },
            }, () => g.scene(SCENES.house, { beat: 'evening_wall', here: HOME, moods: { grandma: 'tired', sophia: 'angry' }, keys: { ...DUSK, wall: f.called } }));
          }
        } else if (f.called) {
          await piece(g, 'hem', {
            said: async () => {
              g.mood('sophia', 'angry');
              await g.say('sophia', 'I called and you didn’t come!');
              if (f.night === 'knock') await g.say('sophia', 'And you didn’t knock!');
            },
          });
        } else {
          await piece(g, 'alone', {
            said: async () => {
              g.mood('sophia', 'smile');
              await g.say('sophia', 'I was alone! All night! By myself!');
            },
            stop: async () => g.mood('sophia', 'afraid'),
            later: () => (f.night === 'knock' ? g.say('sophia', 'You didn’t knock!') : undefined),
          });
        }
        if (f.called && f.night === 'call') g.mark('hear', 'broken', tr('“I’ll hear you” — broken: nobody came.'));
        if (f.night === 'knock') g.mark('knock', 'broken', tr('“I’ll knock” — broken, though she was behind the canvas.'));
      }
      g.apply('fog');
    },
  ],
};

// home at dawn: Grandmother on the porch's step, she can no longer get up (the go without Papa knowing, behind the
// tent); behind the tent — Papa's jacket and his words
async function porch(g, f, { jacket = false } = {}) {
  g.beds({ sea: 0.3, drips: 0.15 });
  await g.scene(SCENES.shore, { beat: 'porch_dawn', here: jacket ? ['grandma', 'papa'] : ['grandma', 'sophia', 'papa'], moods: { grandma: 'tired', papa: 'neutral', sophia: 'neutral' }, keys: { ...DAWN, fog: 0.4 } });
  await g.beat('porch_dawn');
  if (jacket) {
    await piece(g, 'jacket', {
      hem: async () => {
        await g.say('papa', 'You were there');
        await g.say('grandma', 'Don’t tell her');
      },
    });
  }
}
// When Papa learns (scenario §5, after 4.5): the fog's night, if he did not know since the forest — his first words by
// what she answered at the nets (1.5); on the shore's porch (`learns`); sophia — Sophia by them (not behind the tent)
async function learns(g, f, { sophia }) {
  await piece(g, 'learns', {
    said: () => said(g, f),
    ...(sophia && f.head === 'sophia' ? { sophia: () => g.say('sophia', 'I didn’t tell. She told me not to') } : {}),
  });
}
// his words and hers by the nets (1.5); woke — she woke him herself (“her son”)
async function said(g, f, { woke = false } = {}) {
  if (f.nets === 'say') {
    await g.say('papa', 'You promised to tell me');
    if (woke) await g.say('grandma', 'I’m telling you now');
    else {
      await g.say('grandma', 'You wouldn’t have let me');
      await g.say('papa', 'I wouldn’t');
    }
    g.mark('say', 'broken', tr('“I’ll tell you” — broken.'));
  } else if (f.nets === 'nothing') await g.say('papa', 'Nothing to tell, then');
  else await g.say('papa', 'I did ask');
}
