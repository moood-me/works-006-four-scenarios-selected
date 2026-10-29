// III. The Town (scenario §5, 3.1–3.8) on the road that went with the Soul; “Without Him” (3С.1–3С.4, 3Л) on the road
// that stayed. One chapter of both: each step is of one road, and on the other it does nothing.
//   The Town: the bridge at evening, the Soul's voice within; the square, the potter, his hand reaching by itself; the
// choice “wait” — the night (the cup taken in his sleep), the morning, the choice of the cup, the bridge at dawn
// (“there is no dancer”) — or “back, now”: the bridge at night, the beggar's bowl.
//   Without Him: the deep, his lantern going over the bridge — the sign “Rise”; the town — the Soul with his face takes
// the cup (the rumour, always); the fourth year — the Soul with the cup; ⚑ the last call; “I'll go”: the house by the
// bridge, the choice of how he gives the cup back.
// Places: the bridge, the potter's room (standing in the bridge till its scene comes), the deep (standing in the pier
// till its scene is merged), the stone («Подняться»), the pier.
// Reads: choices.day; scales.soul, song. Leaves: choices.wait, cup, rise, last, giveback; marks.thief; scales.soul, song.
// М5 rang — no bread, the potter not sure; М9 held long — he goes under not looking back.
import { STONE, facts } from '../story.js';
import { cup, post } from '../minigames/all.js';

const went = g => g.state.choices.day !== 'stay';

export default {
  number: 'III', title: tr('The Town'),
  titleOf: r => (r.choices?.day === 'stay' ? tr('Without Him') : tr('The Town')),
  titles: ['Town: The Bridge', 'Town: The Square', 'Town: Wait', 'Town: The Night', 'Town: The Morning', 'Town: The Cup',
    'Town: The Bridge at Dawn', 'Town: The Bridge at Night',
    'Without Him: The Deep', 'Without Him: The Town', 'Without Him: The Fourth Year', 'Without Him: The Last Call',
    'Without Him: The House by the Bridge'],
  choices: [
    { id: 'wait', title: tr('Wait for the dancer'), options: [{ id: 'wait', label: tr('“I’ll wait till tomorrow.”') }, { id: 'back', label: tr('“No. Back, now.”') }] },
    { id: 'cup', title: tr('The cup'), options: [{ id: 'confess', label: tr('“It was I who took it.”') }, { id: 'quiet', label: tr('Put it back quietly') }] },
    { id: 'rise', title: tr('His lantern over the bridge'), options: [{ id: 'rose', label: tr('Rose to look') }, { id: 'stayed', label: tr('Did not lift his head') }] },
    { id: 'last', title: tr('The last call'), weight: '⚑', options: [{ id: 'go', label: tr('“I’ll go. I’ll give the cup back.”') }, { id: 'no', label: tr('“No.”') }] },
    { id: 'giveback', title: tr('The cup, at the potter’s door'), options: [{ id: 'confess', label: tr('“It was I who took it.”') }, { id: 'found', label: tr('“I found it by the bridge.”') }] },
  ],
  steps: [
    // 3.1: the bridge at evening
    async g => {
      if (!went(g)) return;
      await g.scene('bridge', { here: ['fisherman'], moods: { fisherman: 'thinking' }, where: tr('Evening.') });
      await g.plate(tr('All day he has sat under the bridge by the water. From within:'));
      await g.say('soul', 'She dances at night');
      await g.plate(tr('Evening. He walks over the bridge with the lantern; beyond it, the lights — he has never seen this town at night.'));
      await g.say('soul', 'Do you hear? Music');
      await g.plate(tr('He feels chilly, though it is warm.'));
    },
    // 3.2: the square; the potter; the hand
    async g => {
      if (!went(g)) return;
      await g.scene('bridge', { here: ['fisherman', 'potter', 'musician_a', 'musician_b'], moods: { fisherman: 'neutral', potter: 'smile' },
        where: tr('The square beyond the bridge — lanterns, musicians, an empty circle on the stones.') });
      await g.say('potter', 'The fisherman from the bay? Three years nobody saw you');
      await g.say('fisherman', 'A girl dances here…');
      await g.say('potter', 'A dancer? Never seen one. Who knows who dances of an evening');
      await g.plate(tr('While the potter talks, the Fisherman’s hand reaches by itself for the coppers on the stall. He looks at it as at a stranger’s, catches it with his other hand and puts it behind his back.'));
      await g.plate(tr('From within, a chuckle; then:'));
      await g.say('soul', 'She will be here tomorrow. I swear by the moon');
      await g.say('potter', 'Sleep at my place, if you are waiting. It is cold');
    },
    // 3.3: the choice “wait”
    async g => {
      if (!went(g)) return;
      await g.scene('bridge', { here: ['fisherman', 'potter', 'musician_a', 'musician_b'], moods: { fisherman: 'thinking', potter: 'neutral' } }, { cut: true });
      const w = await g.choose('wait', { fisherman: [
        { id: 'wait', label: tr('“I’ll wait till tomorrow.”') },
        { id: 'back', label: tr('“No. Back, now.”') },
      ] });
      if (w === 'wait') {
        await g.say('fisherman', 'I’ll wait till tomorrow');
        g.here('daughter', true);
        await g.plate(tr('The house by the bridge: by the fire the little daughter sleeps; on the shelf, a silver cup.'));
        await g.say('potter', 'My wife’s. We drank from it at our wedding');
        await g.plate(tr('Bread, the fire. He sits down on the bench and keeps his hands under him.'));
      } else {
        await g.say('fisherman', 'No. Back, now');
        await g.plate(tr('The potter shrugs. He turns onto the bridge. From within — not a laugh: silence.'));
      }
      g.apply('wait');
    },
    // 3.4: the night
    async g => {
      if (!went(g) || g.state.choices.wait === 'back') return;
      await g.scene('room', { here: ['fisherman', 'potter', 'daughter'], moods: { fisherman: 'eyes_closed', potter: 'eyes_closed', daughter: 'eyes_closed' },
        where: tr('In truth: inside the potter’s house, night, the fire low.') });
      await g.plate(tr('The Fisherman sleeps on the bench by the fire. He gets up — with his eyes shut, one shadow at his feet — goes to the shelf, takes the cup, puts it in his bag and lies down again.'));
      g.mood('daughter', 'afraid');
      await g.plate(tr('The girl half opens her eyes: the guest is walking with his eyes shut. She squeezes them shut. The Fisherman does not know.'));
    },
    // 3.5: the morning
    async g => {
      if (!went(g) || g.state.choices.wait === 'back') return;
      await g.scene('room', { here: ['fisherman', 'potter', 'daughter'], moods: { fisherman: 'neutral', potter: 'sad', daughter: 'neutral' },
        where: tr('In truth: inside the potter’s house, morning.') });
      await g.say('potter', 'The cup… My wife’s. Have you seen it?');
      g.mood('fisherman', 'afraid');
      await g.plate(tr('The Fisherman reaches for his bag — it is heavy. From within:'));
      await g.say('soul', 'Hush');
    },
    // 3.6: the choice of the cup
    async g => {
      if (!went(g) || g.state.choices.wait === 'back') return;
      await g.scene('room', { here: ['fisherman', 'potter', 'daughter'], moods: { fisherman: 'thinking', potter: 'sad', daughter: 'neutral' },
        where: tr('In truth: inside the potter’s house, morning.') }, { cut: true });
      const c = await g.choose('cup', { fisherman: [
        { id: 'confess', label: tr('“It was I who took it.”') },
        { id: 'quiet', label: tr('Put it back quietly') },
      ] });
      if (c === 'confess') {
        await g.plate(tr('He takes out the cup.'));
        await g.say('fisherman', 'I don’t remember how. But the hands are mine');
        await g.plate(tr('The potter takes it and looks at it a long time.'));
        await g.say('potter', 'I gave you bread. Go');
        g.mood('daughter', 'afraid');
        await g.plate(tr('The girl hides behind her father. From within, quietly:'));
        await g.say('soul', 'You said: I');
      } else {
        await g.plate(tr('While the potter bends over his daughter, the Fisherman sets the cup on the shelf behind the bread.'));
        const { rang } = await g.play(cup);
        if (rang) {
          await g.plate(tr('The cup rings against the shelf. The potter turns, sees it there, and looks at his guest a long time. He gives no bread. From within:'));
          await g.say('soul', 'Not sure. And not being sure — he keeps quiet');
        } else {
          g.mood('potter', 'laugh');
          await g.say('potter', 'There it is! Rolled behind the bread');
          await g.plate(tr('He laughs and gives bread for the road. The girl looks at the guest and says nothing. From within:'));
          await g.say('soul', 'You see — nobody knows. Like me');
        }
      }
      g.apply('cup');
    },
    // 3.7: the bridge at dawn (waited)
    async g => {
      if (!went(g) || g.state.choices.wait === 'back') return;
      await g.scene('bridge', { here: ['fisherman'], moods: { fisherman: 'sad' }, where: tr('Morning; he walks back toward the sea.') });
      await g.say('soul', 'You won’t wait for the evening? Quite right. There is no dancer. There never was');
      await g.say('fisherman', 'You are cruel');
      await g.say('soul', 'You sent me away without a heart. I learned from the world');
      await g.plate(tr('He walks to the sea.'));
    },
    // 3.7б: the bridge at night (back at once)
    async g => {
      if (!went(g) || g.state.choices.wait !== 'back') return;
      await g.scene('bridge', { here: ['fisherman', 'beggar'], moods: { fisherman: 'afraid' },
        where: tr('The middle of the bridge, night; an old beggar asleep there, a bowl of coppers at his feet.') });
      await g.plate(tr('The Fisherman’s hand reaches by itself for the bowl; he catches it with the other and stands so, holding himself, till the trembling passes. The bowl rocks, a copper falls into the river; the old man does not wake.'));
      await g.say('soul', 'You did not give me my day. And she does dance, you know. You never looked');
      await g.say('fisherman', 'You are cruel');
      await g.say('soul', 'You sent me away without a heart. I learned from the world');
    },
    // 3С.1: the deep; the sign “Rise”
    async g => {
      if (went(g)) return;
      const f = facts(g.state);
      await g.scene('deep', { here: ['fisherman', 'mermaid'], moods: { fisherman: 'neutral', mermaid: f.sounds ? 'smile' : 'neutral' } });
      if (f.sounds) await g.plate(tr('She sings; he listens.'));
      else await g.plate(tr('They sit in silence, her hand in his.'));
      await g.say('narrator', 'And the Soul went over the earth alone');
      await g.plate(tr('From above, through the water, comes a warm light — his lantern, far off, going over the bridge to the town.'));
      const r = await g.interrupt('rise', { fisherman: [{ id: 'rose', label: tr('Rise') }] }, { id: 'stayed' }, 3000,
        tr('A warm light far above, going away.'));
      if (r === 'rose') {
        await g.scene('stone', { here: ['fisherman'], moods: { fisherman: 'sad' }, keys: STONE.rise });
        g.set('far_light', 1, 8);
        await g.plate(tr('He comes up to his shoulders by the stone and watches the little light go away beyond the bridge. From below the Mermaid pulls him by the hand — silently — and that evening she sings no more.'));
        g.here('fisherman', false);
      } else {
        await g.plate(tr('The light goes away. He does not lift his head; she lays her palm over his eyes and sings on.'));
      }
      g.apply('rise');
    },
    // 3С.2: the town — the Soul with his face takes the cup
    async g => {
      if (went(g)) return;
      const f = facts(g.state);
      await g.scene('bridge', { here: ['soul', 'potter', 'daughter'], moods: { soul: 'neutral', potter: 'smile', daughter: 'neutral' },
        where: tr('Evening. The one with his face and his lantern is the Soul: people see the Fisherman.') });
      await g.say('potter', 'The fisherman from the bay? Three years nobody saw you. Sleep at my place; it is cold');
      await g.scene('room', { here: ['soul', 'potter', 'daughter'], moods: { soul: f.hard ? 'angry' : 'sad', potter: 'eyes_closed', daughter: 'eyes_closed' },
        where: tr('In truth: inside the potter’s house, night.') });
      if (f.hard) await g.plate(tr('Night. The Soul goes straight to the shelf, takes the cup, and leaves the door wide open.'));
      else await g.plate(tr('Night. The Soul stands over the sleeping girl — a long time — then takes the cup.'));
      g.mood('potter', 'afraid');
      await g.plate(tr('The potter wakes; in the lantern’s light he sees the face.'));
      await g.say('potter', 'Fisherman!..');
      g.here('soul', false);
      await g.plate(tr('The Soul goes off into the dark. Morning, the market: “The fisherman from the bay is a thief.”'));
      g.mark('thief', true, tr('By morning the whole market knows: the fisherman from the bay is a thief.'));
    },
    // 3С.3: the fourth year
    async g => {
      if (went(g)) return;
      const f = facts(g.state);
      await g.scene('pier', { here: ['fisherman', 'soul'], moods: { fisherman: 'neutral', soul: f.hard ? 'smile' : 'sad' },
        where: tr('The fourth year; he in the shallows. In the Soul’s hands — the potter’s cup.') });
      await g.say('soul', 'Your hands did it. I have no others');
      await g.plate(tr('He comes up onto the shallows.'));
      await g.say('fisherman', 'Take it back');
      await g.say('soul', 'Give it back? I don’t know how. Give it back with your own hands — or not at all');
      await g.wait(1500);
      await g.say('soul', 'I call for the last time. Next year I shall forget the way');
      if (f.sounds) await g.plate(tr('From below, her song calls.'));
      else await g.plate(tr('Silence.'));
    },
    // 3С.4: ⚑ the last call
    async g => {
      if (went(g)) return;
      await g.scene('pier', { here: ['fisherman', 'soul', 'mermaid'], moods: { fisherman: 'thinking', soul: 'neutral', mermaid: 'neutral' } }, { cut: true });
      const l = await g.choose('last', { fisherman: [
        { id: 'go', label: tr('“I’ll go. I’ll give the cup back.”') },
        { id: 'no', label: tr('“No.”') },
      ] });
      if (l === 'go') {
        await g.say('fisherman', 'I’ll go. I’ll give the cup back');
        await g.plate(tr('He looks a long time at the knife in the post. The Soul gives him the lantern and the cup and goes into his shadow.'));
        g.here('soul', false);
        g.mood('mermaid', 'sad');
        await g.plate(tr('By the stone the Mermaid sees it, and goes under.'));
        g.here('mermaid', false);
        await g.plate(tr('He speaks to the water:'));
        await g.say('fisherman', 'I’ll give it back — and come back');
      } else {
        await g.say('fisherman', 'No');
        await g.plate(tr('He turns away from the pier.'));
        const { long } = await g.play(post);
        g.here('fisherman', false);
        await g.plate(long ? tr('His fingers slip from the post by themselves; he goes under without looking back at the pier.')
          : tr('He lets go of the post, looks once at the pier — and goes under the water.'));
      }
      g.apply('last');
    },
    // 3Л: the house by the bridge — the cup given back
    async g => {
      if (went(g) || g.state.choices.last !== 'go') return;
      await g.scene('bridge', { here: ['fisherman', 'potter', 'daughter'], moods: { fisherman: 'neutral', potter: 'angry', daughter: 'afraid' },
        where: tr('Morning, the potter’s door, a day’s walk from the bay; the Soul is in him.') });
      await g.plate(tr('The potter opens the door.'));
      await g.say('potter', 'You!..');
      await g.plate(tr('His daughter behind him. The Fisherman holds out the cup.'));
      const b = await g.choose('giveback', { fisherman: [
        { id: 'confess', label: tr('“It was I who took it.”') },
        { id: 'found', label: tr('“I found it by the bridge.”') },
      ] });
      if (b === 'confess') {
        await g.say('fisherman', 'It was I who took it');
        await g.plate(tr('The potter takes it.'));
        await g.say('potter', 'Came himself… A thief — and came');
        await g.plate(tr('He does not shut the door at once.'));
      } else {
        await g.say('fisherman', 'I found it by the bridge');
        await g.plate(tr('The potter takes it. He saw the face that night.'));
        await g.say('potter', 'Found it, then');
        await g.plate(tr('The door shuts.'));
      }
      g.apply('giveback');
      await g.say('soul', 'There. Now back to your fish');
    },
  ],
};
