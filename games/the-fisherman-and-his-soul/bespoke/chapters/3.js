// III. The Town (scenario §5, 3.1–3.8) on the road that went with the Soul; “Without Him” (3С.1–3С.4, 3Л) on the road
// that stayed. One chapter of both: each step is of one road, and on the other it does nothing.
//   The Town: the bridge at evening, the Soul's voice within; the square, the potter, his hand reaching by itself; the
// choice “wait” — the night (the cup taken in his sleep), the morning and the choice of the cup, the bridge at dawn
// (“there is no dancer”) — or “back, now”: the bridge at night, the beggar's bowl.
//   Without Him: the deep, his lantern going over the bridge — the sign “Rise”; the town — the Soul with his face takes
// the cup (the rumour, always); the fourth year — the Soul with the cup, ⚑ the last call; “I'll go”: the house by the
// bridge, the choice of how he gives the cup back.
// Pieces: the bridge's under_bridge, over_bridge, square, hand_itself, shrug_back, bridge_dawn, beggar, soul_town,
// rumour, door_potter, door_shut; the potter's room's room_in, sleepwalk, cup_gone, confess / bend_daughter, found_cup,
// soul_theft; the deep's deep_dusk, palm_eyes; the stone's rise; the pier's fourth_year, late_go / turn_away, sink.
// Reads: choices.day; scales.soul, song. Leaves: choices.wait, cup, rise, last, giveback; marks.thief; scales.soul, song.
// М5 rang — no bread, the potter not sure (`rang`); М9 held long — he goes under not looking back (`looked`).
import { facts, on, piece } from '../story.js';
import { cup, post } from '../minigames/all.js';

const went = g => g.state.choices.day !== 'stay';

export default {
  number: 'III', title: tr('The Town'),
  titleOf: r => (r.choices?.day === 'stay' ? tr('Without Him') : tr('The Town')),
  titles: ['Town: The Bridge', 'Town: The Square', 'Town: The Night', 'Town: The Cup', 'Town: The Bridge at Dawn',
    'Town: The Bridge at Night', 'Without Him: The Deep', 'Without Him: The Town', 'Without Him: The Last Call',
    'Without Him: The House by the Bridge'],
  choices: [
    { id: 'wait', title: tr('Wait for the dancer'), options: [{ id: 'wait', label: tr('“I’ll wait till tomorrow.”'), came: tr('In the night your hands took the cup.') }, { id: 'back', label: tr('“No. Back, now.”'), came: tr('You never learned whether there was a dancer.') }] },
    { id: 'cup', title: tr('The cup'), options: [{ id: 'confess', label: tr('“It was I who took it.”'), came: tr('The little girl hid behind her father.') }, { id: 'quiet', label: tr('Put it back quietly'), came: tr('Nobody knows. Only the little girl.') }] },
    { id: 'rise', title: tr('His lantern over the bridge'), options: [{ id: 'rose', label: tr('Rose to look'), came: tr('That evening she sang no more.') }, { id: 'stayed', label: tr('Did not lift his head'), came: tr('She laid her palm over your eyes and sang on.') }] },
    { id: 'last', title: tr('The last call'), weight: '⚑', options: [{ id: 'go', label: tr('“I’ll go. I’ll give the cup back.”'), came: tr('She saw, and went under.') }, { id: 'no', label: tr('“No.”'), came: tr('The Soul will not come again.') }] },
    { id: 'giveback', title: tr('The cup, at the potter’s door'), options: [{ id: 'confess', label: tr('“It was I who took it.”'), came: tr('“A thief — and came.” He was slow to shut the door.') }, { id: 'found', label: tr('“I found it by the bridge.”'), came: tr('“Found it, then.” The door shut at once.') }] },
  ],
  steps: [
    // 3.1: the bridge at evening
    async g => {
      if (!went(g)) return;
      await piece(g, 'under_bridge', { sat: () => g.say('soul', 'She dances at night') },
        () => g.scene('bridge', { beat: 'under_bridge', here: ['fisherman'], moods: { fisherman: 'thinking' } }, { beds: { sea: 0.3, town: 0.1 } }));
      // (the town nearer as he comes to the bridge's head: its voices, its music)
      on(g, 'over_bridge:head', () => g.beds({ sea: 0.15, town: 0.4 }));
      await piece(g, 'over_bridge', { head: () => g.say('soul', 'Do you hear? Music') });
      await g.say('narrator', 'He felt chilly, though it was warm');
    },
    // 3.2–3.3: the square; the potter; the hand; the choice “wait”
    async g => {
      if (!went(g)) return;
      await piece(g, 'square', {
        met: async () => {
          await g.say('potter', 'The fisherman from the bay? Three years nobody saw you');
          await g.say('fisherman', 'A girl dances here…');
          await g.say('potter', 'A dancer? Never seen one. Who knows who dances of an evening');
        },
      }, () => g.scene('bridge', { beat: 'square', here: ['fisherman', 'potter', 'musician_a', 'musician_b'], moods: { fisherman: 'neutral', potter: 'smile' } },
        { beds: { town: 0.4, sea: 0.1 } }));
      on(g, 'hand_itself:reach', () => g.sound.coins());
      await g.beat('hand_itself');
      await g.say('soul', 'She will be here tomorrow. I swear by the moon');
      await g.say('potter', 'Sleep at my place, if you are waiting. It is cold');
      const w = await g.choose('wait', { fisherman: [
        { id: 'wait', label: tr('“I’ll wait till tomorrow.”') },
        { id: 'back', label: tr('“No. Back, now.”') },
      ] });
      if (w === 'wait') {
        await g.say('fisherman', 'I’ll wait till tomorrow');
        await piece(g, 'room_in', { cup: () => g.say('potter', 'My wife’s. We drank from it at our wedding') },
          () => g.scene('room', { beat: 'room_in', here: ['fisherman', 'potter', 'daughter'], moods: { fisherman: 'neutral', potter: 'neutral', daughter: 'eyes_closed' } },
            { beds: { fire: 0.45 } }));
      } else {
        await g.say('fisherman', 'No. Back, now');
        await g.beat('shrug_back');
        await g.say('narrator', 'And from within — not a laugh: silence');
      }
      g.apply('wait');
    },
    // 3.4: the night
    async g => {
      if (!went(g) || g.state.choices.wait === 'back') return;
      await piece(g, 'sleepwalk', {
        girl: async () => {
          g.mood('daughter', 'afraid');
          await g.say('narrator', 'The little girl saw the guest walk with his eyes shut, and shut her own. The Fisherman did not know');
        },
      }, () => g.scene('room', { beat: 'sleepwalk', here: ['fisherman', 'potter', 'daughter'], moods: { fisherman: 'eyes_closed', potter: 'eyes_closed', daughter: 'eyes_closed' } },
        { beds: { fire: 0.22 } }));
    },
    // 3.5–3.6: the morning; the choice of the cup
    async g => {
      if (!went(g) || g.state.choices.wait === 'back') return;
      await piece(g, 'cup_gone', {
        search: () => g.say('potter', 'The cup… My wife’s. Have you seen it?'),
        bag: async () => {
          g.mood('fisherman', 'afraid');
          await g.say('soul', 'Hush');
        },
      }, () => g.scene('room', { beat: 'cup_gone', here: ['fisherman', 'potter', 'daughter'], moods: { fisherman: 'neutral', potter: 'sad', daughter: 'neutral' } },
        { beds: { fire: 0.3 } }));
      const c = await g.choose('cup', { fisherman: [
        { id: 'confess', label: tr('“It was I who took it.”') },
        { id: 'quiet', label: tr('Put it back quietly') },
      ] });
      if (c === 'confess') {
        await piece(g, 'confess', {
          out: () => g.say('fisherman', 'I don’t remember how. But the hands are mine'),
          look: () => g.say('potter', 'I gave you bread. Go'),
          hide: async () => {
            g.mood('daughter', 'afraid');
            await g.say('soul', 'You said: I');
          },
        });
      } else {
        await g.beat('bend_daughter');
        g.set('fisherman_with', ['cup']);
        g.set('cup_at', 'hand');
        const { rang } = await g.play(cup);
        g.set('fisherman_with', []);
        g.set('rang', rang);
        if (rang) await piece(g, 'found_cup', { look: () => g.say('soul', 'Not sure. And not being sure — he keeps quiet') });
        else {
          await piece(g, 'found_cup', {
            find: async () => {
              g.mood('potter', 'laugh');
              await g.say('potter', 'There it is! Rolled behind the bread');
            },
          });
          await g.say('soul', 'You see — nobody knows. Like me');
        }
      }
      g.apply('cup');
    },
    // 3.7: the bridge at dawn (waited)
    async g => {
      if (!went(g) || g.state.choices.wait === 'back') return;
      await piece(g, 'bridge_dawn', {
        stop: async () => {
          await g.say('soul', 'You won’t wait for the evening? Quite right. There is no dancer. There never was');
          await g.say('fisherman', 'You are cruel');
          await g.say('soul', 'You sent me away without a heart. I learned from the world');
        },
      }, () => g.scene('bridge', { beat: 'bridge_dawn', here: ['fisherman'], moods: { fisherman: 'sad' } }, { beds: { sea: 0.3, market: 0.08 } }));
    },
    // 3.7б: the bridge at night (back at once)
    async g => {
      if (!went(g) || g.state.choices.wait !== 'back') return;
      await g.scene('bridge', { beat: 'beggar', here: ['fisherman', 'beggar'], moods: { fisherman: 'afraid', beggar: 'eyes_closed' } }, { beds: { sea: 0.3, town: 0.12 } });
      on(g, 'beggar:copper', () => g.sound.copper());
      await g.beat('beggar');
      await g.say('soul', 'You did not give me my day. And she does dance, you know. You never looked');
      await g.say('fisherman', 'You are cruel');
      await g.say('soul', 'You sent me away without a heart. I learned from the world');
    },
    // 3С.1: the deep; the sign “Rise”
    async g => {
      if (went(g)) return;
      const f = facts(g.state);
      let r = null;
      await piece(g, 'deep_dusk', {
        begin: () => g.say('narrator', 'And the Soul went over the earth alone'),
        light: async () => {
          r = await g.interrupt('rise', { fisherman: [{ id: 'rose', label: tr('Rise') }] }, { id: 'stayed' }, 5000,
            tr('A warm light far above, going away.'));
        },
      }, () => g.scene('deep', { beat: 'deep_dusk', here: ['fisherman', 'mermaid'], moods: { fisherman: 'neutral', mermaid: f.sounds ? 'smile' : 'neutral' },
        keys: { sing: f.sounds } }, { beds: f.sounds ? { deep: 0.55, song: 0.75 } : { deep: 0.6 } }));
      if (r === 'rose') {
        on(g, 'rise:pulled', () => g.sound.dive());
        await g.scene('stone', { beat: 'rise', here: ['fisherman'], moods: { fisherman: 'sad' } }, { beds: { sea: 0.4, town: 0.05 } });
        await g.beat('rise');
        await g.say('narrator', 'From below she pulled him by the hand, without a word; and that evening she sang no more');
      } else await g.beat('palm_eyes');
      g.apply('rise');
    },
    // 3С.2: the town — the Soul with his face takes the cup
    async g => {
      if (went(g)) return;
      const f = facts(g.state);
      await piece(g, 'soul_town', { met: () => g.say('potter', 'The fisherman from the bay? Three years nobody saw you. Sleep at my place; it is cold') },
        () => g.scene('bridge', { beat: 'soul_town', here: ['soul', 'potter', 'daughter'], moods: { soul: 'neutral', potter: 'smile', daughter: 'neutral' },
          where: tr('The one with his face and his lantern is the Soul: people see the Fisherman.') }, { beds: { sea: 0.2, town: 0.25 } }));
      await piece(g, 'soul_theft', {
        wake: async () => {
          g.mood('potter', 'afraid');
          await g.say('potter', 'Fisherman!..');
        },
      }, () => g.scene('room', { beat: 'soul_theft', here: ['soul', 'potter', 'daughter'], moods: { soul: f.hard ? 'angry' : 'sad', potter: 'eyes_closed', daughter: 'eyes_closed' },
        keys: { hard: f.hard } }, { beds: { fire: 0.2 } }));
      await piece(g, 'rumour', { say: () => g.say('women', 'The fisherman from the bay is a thief', 'woman_a') },
        () => g.scene('bridge', { beat: 'rumour', here: ['potter', 'woman_a', 'woman_b'], moods: { potter: 'sad' } }, { beds: { market: 0.35, sea: 0.1 } }));
      g.mark('thief', true, tr('By morning the whole market knows: the fisherman from the bay is a thief.'));
    },
    // 3С.3–3С.4: the fourth year; ⚑ the last call
    async g => {
      if (went(g)) return;
      const f = facts(g.state);
      await piece(g, 'fourth_year', {
        up: async () => {
          await g.say('soul', 'Your hands did it. I have no others');
          await g.say('fisherman', 'Take it back');
          await g.say('soul', 'Give it back? I don’t know how. Give it back with your own hands — or not at all');
          await g.wait(1500);
          await g.say('soul', 'I call for the last time. Next year I shall forget the way');
        },
      }, () => g.scene('pier', { beat: 'fourth_year', here: ['fisherman', 'soul'], moods: { fisherman: 'neutral', soul: f.hard ? 'smile' : 'sad' },
        keys: { song: f.sounds }, where: tr('The fourth year.') }));
      // (then the stone — Song 2–3: her song from below, calling him down; 0–1: silence —, and back to him)
      if (f.sounds) on(g, 'fourth_stone:stone', () => g.beds({ sea: 0.4, song_under: 0.8 }));
      await g.beat('fourth_stone');
      const l = await g.choose('last', { fisherman: [
        { id: 'go', label: tr('“I’ll go. I’ll give the cup back.”') },
        { id: 'no', label: tr('“No.”') },
      ] });
      if (l === 'go') {
        await g.say('fisherman', 'I’ll go. I’ll give the cup back');
        on(g, 'late_go:her', () => { g.sound.hush('song_under', 0.2); g.beds({ sea: 0.4 }); g.sound.dive(); });
        await piece(g, 'late_go', {
          her: async () => g.mood('mermaid', 'sad'),
          water: () => g.say('fisherman', 'I’ll give it back — and come back'),
        });
      } else {
        await g.say('fisherman', 'No');
        await g.beat('turn_away');
        const { long } = await g.play(post);
        g.set('looked', !long);
        on(g, 'sink:under', () => g.sound.dive());
        await g.beat('sink');
      }
      g.apply('last');
    },
    // 3Л: the house by the bridge — the cup given back
    async g => {
      if (went(g) || g.state.choices.last !== 'go') return;
      await piece(g, 'door_potter', { open: () => g.say('potter', 'You!..') }, () => {
        on(g, 'door_potter:open', () => g.sound.door({ open: true }));
        return g.scene('bridge', { beat: 'door_potter', here: ['fisherman', 'potter', 'daughter'], moods: { fisherman: 'neutral', potter: 'angry', daughter: 'afraid' },
          where: tr('A day’s walk from the bay; the Soul is in him.') }, { beds: { market: 0.2, sea: 0.12 } });
      });
      const b = await g.choose('giveback', { fisherman: [
        { id: 'confess', label: tr('“It was I who took it.”') },
        { id: 'found', label: tr('“I found it by the bridge.”') },
      ] });
      g.set('slow', b === 'confess');
      on(g, 'door_shut:shut', () => g.sound.door({ open: false }));
      if (b === 'confess') {
        await g.say('fisherman', 'It was I who took it');
        await piece(g, 'door_shut', { take: () => g.say('potter', 'Came himself… A thief — and came') });
      } else {
        await g.say('fisherman', 'I found it by the bridge');
        await piece(g, 'door_shut', {
          take: async () => {
            await g.say('narrator', 'He had seen the face that night');
            await g.say('potter', 'Found it, then');
          },
        });
      }
      g.apply('giveback');
      await g.say('soul', 'There. Now back to your fish');
    },
  ],
};
