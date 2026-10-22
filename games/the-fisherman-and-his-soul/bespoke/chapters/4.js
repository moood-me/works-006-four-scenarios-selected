// IV. The Shore (scenario §5, 4.1–4.9). Not on the road that stayed both times (skip: the epilogue comes after
// chapter 3). He calls her — the light under the water does not rise; the knife does not cut twice; winter in the hut,
// the Witch; spring, the widow; the choice “a night at sea”; the heart that is all hers; the sea brings her; ⚑ the
// second hinge “The Wave”.
// Stand-ins: the whole chapter — the pier (the hut by the water, the widow's boat, the shore); the widow and her
// children are heard, not seen.
// Reads: choices.day, wait, last; marks.net, witch, thief; scales.soul, song. Leaves: choices.widow, wave; marks.widow.
import { SCENES, facts } from '../story.js';
import { knife2, net2, hold, drag } from '../minigames/all.js';

const off = g => facts(g.state).road === 'deep';

export default {
  number: 'IV', title: tr('The Shore'),
  skip: r => facts(r).road === 'deep',
  titles: ['The Call', 'The Knife', 'Winter', 'Spring', 'A Night at Sea', 'The Heart', 'Brought Ashore', 'The Wave'],
  choices: [
    { id: 'widow', title: tr('A night at sea'), options: [{ id: 'out', label: tr('Went out for the night') }, { id: 'stayed', label: tr('Stayed by the water') }] },
    { id: 'wave', title: tr('The wave'), weight: '⚑', options: [{ id: 'stay', label: tr('Stayed with her') }, { id: 'pull', label: tr('Drew her away from the water') }] },
  ],
  steps: [
    // 4.1: the call
    async g => {
      if (off(g)) return;
      const f = facts(g.state);
      const when = f.road === 'late' ? tr('In truth: the pier, evening; back from the town.')
        : f.wait === 'back' ? tr('In truth: the pier, night; back from the town.') : tr('In truth: the pier, a misty morning; back from the town.');
      await g.scene(SCENES.pier, { here: ['fisherman'], moods: { fisherman: 'neutral' }, where: when });
      await g.plate(tr('He hangs the lantern on the post and calls.'));
      if (f.net === 'word') {
        await g.say('fisherman', 'You swore by the sea to come whenever I call. I am calling!');
        await g.plate(tr('And the oath answers: from the deep, the four notes of her song — they break off on the third.'));
      } else {
        await g.say('fisherman', 'You always came by yourself… Come');
        if (f.sounds) await g.plate(tr('He has nothing to call her by. From the deep — the same four notes.'));
        else await g.plate(tr('He has nothing to call her by. Only the water.'));
      }
      await g.plate(tr('Only you can see it: far off by the stone, under the water, a pale light. It stays there. It does not rise.'));
    },
    // 4.2: the knife
    async g => {
      if (off(g)) return;
      const f = facts(g.state);
      await g.scene(SCENES.pier, { here: ['fisherman'], moods: { fisherman: 'angry' } }, { cut: true });
      if (f.road === 'went') {
        await g.say('fisherman', 'Come out. You promised to come out on the shore');
        await g.say('soul', 'I promised. I lied');
      }
      await g.plate(tr('He pulls the knife out of the post — it is rusty.'));
      await g.say('fisherman', 'I’ll cut you off again');
      await g.play(knife2);
      await g.plate(tr('The same gesture as at moonrise — and the knife goes through the shadow as through water.'));
      await g.say('soul', 'A knife cuts once. You cut me off yourself');
      g.mood('fisherman', 'sad');
      await g.plate(tr('He drives the knife back into the post.'));
    },
    // 4.3: winter; the Witch
    async g => {
      if (off(g)) return;
      const f = facts(g.state);
      await g.scene(SCENES.pier, { here: ['fisherman'], moods: { fisherman: 'tired' },
        where: tr('In truth: the shore by the pier — a hut of willow rods; autumn, then snow on the boards.') });
      await g.plate(tr('He weaves a hut of rods by the water. Autumn; snow on the pier; every evening he calls.'));
      await g.plate(tr('Along the frozen shore comes the Witch.'));
      if (f.witch === 'demand') {
        await g.plate(tr('She stops.'));
        await g.say('witch', 'I told you: you will see for yourself');
        await g.plate(tr('She laughs and goes.'));
      } else {
        await g.plate(tr('She puts bread and her shawl down by the hut.'));
        await g.say('witch', 'The night is long. It is warm by the well');
        await g.plate(tr('She goes, looking back.'));
      }
      await g.say('soul', 'Go to her. She is warm. She has feet');
      if (f.witch === 'demand') await g.plate(tr('The Fisherman does not get up.'));
      else await g.plate(tr('The Fisherman does not get up. The shawl lies there by the door of the hut.'));
    },
    // 4.4: spring; the widow
    async g => {
      if (off(g)) return;
      const f = facts(g.state);
      await g.scene(SCENES.pier, { here: ['fisherman'], moods: { fisherman: 'neutral' },
        where: tr('In truth: the shore in spring; a widow with two children by her husband’s boat, drawn up on the sand. She is heard, not seen yet.') });
      await g.plate(tr('A widow with two children, by the boat of her husband who did not come back in the storm. She asks for nothing.'));
      await g.say('widow', 'There are no fish. When the ice goes, we’ll leave. Somewhere');
      if (f.thief) await g.plate(tr('Before she says more, she looks at him a long time, and puts the children behind her.'));
      await g.say('widow', 'The boat is rotting. Take it, if you need it');
      await g.plate(tr('The children look at the net on the rail. From within:'));
      await g.say('soul', 'You are the best fisherman in the bay. Go out for one night — for them. What harm is there?');
    },
    // 4.5: the choice “a night at sea”
    async g => {
      if (off(g)) return;
      await g.scene(SCENES.pier, { here: ['fisherman'], moods: { fisherman: 'thinking' } }, { cut: true });
      const w = await g.choose('widow', { fisherman: [
        { id: 'out', label: tr('Go out for the night') },
        { id: 'stayed', label: tr('Stay') },
      ] });
      if (w === 'out') {
        await g.plate(tr('The widow’s boat, his lantern on the bow, his net.'));
        await g.play(net2);
        await g.plate(tr('The net is full.'));
      } else {
        await g.plate(tr('The widow nods. In the morning she takes the children over the bridge with their bundles, who knows where; the younger looks back at the net on the rail. At night he is alone on the pier.'));
      }
      g.apply('widow');
    },
    // 4.6: the heart (went out: a night in the boat)
    async g => {
      if (off(g)) return;
      const f = facts(g.state);
      await g.scene(SCENES.pier, { here: ['fisherman'], moods: { fisherman: 'tired' },
        where: f.widow === 'out' ? tr('In truth: the widow’s boat at sea, night.') : tr('In truth: the pier, night.') });
      if (f.widow === 'out') await g.plate(tr('Under the keel passes a pale light, and for a moment — four notes. He thinks he is dreaming, and draws in the net.'));
      await g.say('soul', 'I tempted you with evil and with good. Let me at least into your heart — to be one, as before');
      await g.say('fisherman', 'Come in');
      await g.say('soul', 'I cannot. It is all taken up with her');
    },
    // 4.7: the sea brings her
    async g => {
      if (off(g)) return;
      const f = facts(g.state);
      await g.scene(SCENES.pier, { here: ['fisherman'], moods: { fisherman: 'neutral' },
        where: f.widow === 'out' ? tr('In truth: the shore by the pier, dawn.') : tr('In truth: the shore by the pier, night.') });
      if (f.widow === 'out') {
        await g.plate(tr('Dawn. He comes in with a full net and hangs the lantern on the post. The widow sees the fish.'));
        await g.say('widow', 'If the boat goes out — we’ll stay');
        await g.plate(tr('On the sand the widow’s children stand over something, and step apart. It is the Mermaid. Dead.'));
      } else await g.plate(tr('Night. A black wave lays the Mermaid at his feet. Dead.'));
      g.mood('fisherman', 'sad');
      await g.plate(tr('He is on his knees; he kisses the cold lips.'));
      await g.say('fisherman', 'I loved you more than wisdom. More than riches. You called — and I did not hear');
      await g.plate(tr('The sea grows dark and comes toward the shore.'));
      if (f.widow === 'out') {
        await g.plate(tr('Without turning round, to the children:'));
        await g.say('fisherman', 'Home! Run!');
        await g.plate(tr('They run up the shore.'));
      }
      await g.say('soul', 'Run! The sea is coming!');
      await g.say('fisherman', 'The sea cast you out…');
    },
    // 4.8: ⚑ the second hinge “The Wave”
    async g => {
      if (off(g)) return;
      const f = facts(g.state);
      await g.scene(SCENES.pier, { here: ['fisherman', 'mermaid'], moods: { fisherman: 'sad', mermaid: 'neutral' },
        where: tr('In truth: the shore; she lies on the sand at his knees, the wave coming.') }, { cut: true });
      const w = await g.choose('wave', { fisherman: [
        { id: 'stay', label: tr('Stay with her') },
        { id: 'pull', label: tr('Draw her away from the water') },
      ] });
      if (w === 'stay') {
        await g.play(hold);
        await g.plate(tr('Her hand in his while the wave comes. His heart breaks — and the Soul goes into his heart.'));
      } else {
        await g.plate(tr('He wraps her in his net and draws her up the shore, backing away.'));
        await g.play(drag);
        await g.plate(tr('The wave strikes the hut and carries it off. Up at the edge of the field where the linen is bleached he falls beside her. His heart breaks — and the Soul goes into his heart.'));
      }
      if (f.hard) await g.plate(tr('The Soul goes in without a word, and he shudders with cold.'));
      else await g.say('soul', 'I am home');
      if (w === 'stay') {
        g.here('fisherman', false);
        g.here('mermaid', false);
        await g.plate(tr('The wave covers them.'));
      }
      g.apply('wave');
    },
  ],
};
