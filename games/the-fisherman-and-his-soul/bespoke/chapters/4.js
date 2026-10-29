// IV. The Shore (scenario §5, 4.1–4.9). Not on the road that stayed both times (skip: the epilogue comes after
// chapter 3). He calls her — the light under the water does not rise; the knife does not cut twice; winter in the hut,
// the Witch; spring, the widow; the choice “a night at sea”; the heart that is all hers; the sea brings her; ⚑ the
// second hinge “The Wave”.
// Places: the pier; the shore (the pier seen toward the land: the hut, the widow's boat, the sand, the field); the
// widow's boat at sea — the stone's boat.
// Reads: choices.day, wait, last; marks.net, witch, thief, torn; scales.soul, song. Leaves: choices.widow, wave;
// marks.widow; the traces of М6 (he threw the knife down), М7 (half a net), М8 (marks.apart: her hand slipped), М8б
// (the net torn wider).
import { STONE, facts } from '../story.js';
import { knife2, net2, hold, drag } from '../minigames/all.js';

const off = g => facts(g.state).road === 'deep';
// the shore in chapter 4: his hut built by the water, the widow's husband's boat drawn up, the Witch's shawl by the hut
// if she left it, the rusty knife in the post, the lantern on its hook
const SHORE = (f, more = {}) => ({ hut: 'built', widow_boat: true, shawl: f.witch === 'dance', knife: 'post', rust: true, lantern_at: 'post',
  fisherman_at: 'hut', ...more });

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
      const light = f.road === 'late' ? 'evening' : f.wait === 'back' ? 'night' : 'morning';
      await g.scene('pier', { here: ['fisherman'], moods: { fisherman: 'neutral' },
        keys: { light, mist: light === 'morning' ? 1 : 0, fisherman_at: 'end', fisherman_with: ['lantern'], lantern_at: 'none', knife: 'post', rust: true } });
      g.set('fisherman_with', []);
      g.set('lantern_at', 'post');
      await g.plate(tr('He hangs the lantern on the post and calls.'));
      if (f.net === 'word') {
        await g.say('fisherman', 'You swore by the sea to come whenever I call. I am calling!');
        await g.plate(tr('And the oath answers: from the deep, the four notes of her song — they break off on the third.'));
      } else {
        await g.say('fisherman', 'You always came by yourself… Come');
        if (f.sounds) await g.plate(tr('He has nothing to call her by. From the deep — the same four notes.'));
        else await g.plate(tr('He has nothing to call her by. Only the water.'));
      }
      g.set('under_light', 1, 3);
      await g.plate(tr('Only you can see it: far off by the stone, under the water, a pale light. It stays there. It does not rise.'));
    },
    // 4.2: the knife
    async g => {
      if (off(g)) return;
      const f = facts(g.state);
      const light = f.road === 'late' ? 'evening' : f.wait === 'back' ? 'night' : 'morning';
      await g.scene('pier', { here: ['fisherman'], moods: { fisherman: 'angry' },
        keys: { light, mist: light === 'morning' ? 1 : 0, fisherman_at: 'end', lantern_at: 'post', knife: 'post', rust: true } }, { cut: true });
      if (f.road === 'went') {
        await g.say('fisherman', 'Come out. You promised to come out on the shore');
        await g.say('soul', 'I promised. I lied');
      }
      g.set('knife', 'none');
      g.set('fisherman_with', ['knife_rusty']);
      await g.plate(tr('He pulls the knife out of the post — it is rusty.'));
      await g.say('fisherman', 'I’ll cut you off again');
      const { thrown } = await g.play(knife2);
      await g.plate(tr('The same gesture as at moonrise — and the knife goes through the shadow as through water.'));
      await g.say('soul', 'A knife cuts once. You cut me off yourself');
      g.mood('fisherman', 'sad');
      g.set('fisherman_with', []);
      if (thrown) {
        g.set('knife', 'boards');
        await g.plate(tr('He throws the knife down on the boards. Then he picks it up and drives it back into the post.'));
      } else await g.plate(tr('He drives the knife back into the post.'));
      g.set('knife', 'post');
    },
    // 4.3: winter; the Witch
    async g => {
      if (off(g)) return;
      const f = facts(g.state);
      await g.scene('shore', { here: ['fisherman'], moods: { fisherman: 'tired' },
        keys: SHORE(f, { light: 'evening', hut: 'half', shawl: false, fisherman_at: 'hut' }) });
      await g.plate(tr('He weaves a hut of rods by the water. Autumn; snow on the pier; every evening he calls.'));
      g.set('hut', 'built');
      g.set('snow', true);
      g.set('witch_at', 'shore');
      g.here('witch', true);
      await g.plate(tr('Along the frozen shore comes the Witch.'));
      if (f.witch === 'demand') {
        await g.plate(tr('She stops.'));
        await g.say('witch', 'I told you: you will see for yourself');
        await g.plate(tr('She laughs and goes.'));
      } else {
        g.set('shawl', true);
        await g.plate(tr('She puts bread and her shawl down by the hut.'));
        await g.say('witch', 'The night is long. It is warm by the well');
        await g.plate(tr('She goes, looking back.'));
      }
      g.here('witch', false);
      await g.say('soul', 'Go to her. She is warm. She has feet');
      if (f.witch === 'demand') await g.plate(tr('The Fisherman does not get up.'));
      else await g.plate(tr('The Fisherman does not get up. The shawl lies there by the door of the hut.'));
    },
    // 4.4: spring; the widow
    async g => {
      if (off(g)) return;
      const f = facts(g.state);
      await g.scene('shore', { here: ['fisherman', 'widow', 'widow_girl', 'widow_boy'], moods: { fisherman: 'neutral', widow: 'sad' },
        keys: SHORE(f, { light: 'noon', widow_at: 'sand', widow_girl_at: 'boat', widow_boy_at: 'boat' }), where: tr('Spring.') });
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
      const f = facts(g.state);
      await g.scene('shore', { here: ['fisherman', 'widow', 'widow_girl', 'widow_boy'], moods: { fisherman: 'thinking', widow: 'sad' },
        keys: SHORE(f, { light: 'noon', widow_at: 'sand', widow_girl_at: 'boat', widow_boy_at: 'boat' }) }, { cut: true });
      const w = await g.choose('widow', { fisherman: [
        { id: 'out', label: tr('Go out for the night') },
        { id: 'stayed', label: tr('Stay') },
      ] });
      if (w === 'out') {
        await g.scene('stone', { here: ['fisherman'], moods: { fisherman: 'neutral' }, keys: STONE.sea,
          where: tr('The widow’s boat at sea, at night.') });
        await g.plate(tr('The widow’s boat, his lantern on the bow, his net.'));
        g.set('net', 'over');
        const { half } = await g.play(net2);
        if (half) g.mark('half', true, null);
        await g.plate(half ? tr('Half a net. The children will have fish all the same.') : tr('The net is full.'));
      } else {
        g.set('widow_at', 'away');
        g.here('widow', false);
        g.here('widow_girl', false);
        g.here('widow_boy', false);
        await g.plate(tr('The widow nods. In the morning she takes the children over the bridge with their bundles, who knows where; the younger looks back at the net on the rail. At night he is alone on the pier.'));
      }
      g.apply('widow');
    },
    // 4.6: the heart (went out: a night in the boat)
    async g => {
      if (off(g)) return;
      const f = facts(g.state);
      if (f.widow === 'out') {
        await g.scene('stone', { here: ['fisherman'], moods: { fisherman: 'tired' }, keys: { ...STONE.sea, net: 'over', haul: 1, fish: g.state.marks.half ? 0.5 : 1 },
          where: tr('The widow’s boat at sea, at night.') });
        g.set('pass_light', 1, 2);
      } else await g.scene('pier', { here: ['fisherman'], moods: { fisherman: 'tired' }, keys: { light: 'night', fisherman_at: 'end', knife: 'post', rust: true } });
      if (f.widow === 'out') await g.plate(tr('Under the keel passes a pale light, and for a moment — four notes. He thinks he is dreaming, and draws in the net.'));
      await g.say('soul', 'I tempted you with evil and with good. Let me at least into your heart — to be one, as before');
      await g.say('fisherman', 'Come in');
      await g.say('soul', 'I cannot. It is all taken up with her');
    },
    // 4.7: the sea brings her
    async g => {
      if (off(g)) return;
      const f = facts(g.state);
      await g.scene('shore', { here: f.widow === 'out' ? ['fisherman', 'widow', 'widow_girl', 'widow_boy'] : ['fisherman'], moods: { fisherman: 'neutral' },
        keys: SHORE(f, { light: f.widow === 'out' ? 'dawn' : 'night', fisherman_at: 'sand', widow_at: 'boat', widow_girl_at: 'boat', widow_boy_at: 'boat' }) });
      if (f.widow === 'out') {
        await g.plate(tr('Dawn. He comes in with a full net and hangs the lantern on the post. The widow sees the fish.'));
        await g.say('widow', 'If the boat goes out — we’ll stay');
        g.set('mermaid_at', 'sand');
        g.here('mermaid', true);
        g.mood('mermaid', 'eyes_closed');
        await g.plate(tr('On the sand the widow’s children stand over something, and step apart. It is the Mermaid. Dead.'));
      } else {
        g.set('wave', 0.4);
        g.set('wave', 0, 3);
        g.set('mermaid_at', 'sand');
        g.here('mermaid', true);
        g.mood('mermaid', 'eyes_closed');
        await g.plate(tr('Night. A black wave lays the Mermaid at his feet. Dead.'));
      }
      g.mood('fisherman', 'sad');
      await g.plate(tr('He is on his knees; he kisses the cold lips.'));
      await g.say('fisherman', 'I loved you more than wisdom. More than riches. You called — and I did not hear');
      g.set('wave', 0.3, 4);
      await g.plate(tr('The sea grows dark and comes toward the shore.'));
      if (f.widow === 'out') {
        await g.plate(tr('Without turning round, to the children:'));
        await g.say('fisherman', 'Home! Run!');
        g.set('widow_girl_at', 'field');
        g.set('widow_boy_at', 'field');
        g.here('widow', false);
        await g.plate(tr('They run up the shore.'));
      }
      await g.say('soul', 'Run! The sea is coming!');
      await g.say('fisherman', 'The sea cast you out…');
    },
    // 4.8: ⚑ the second hinge “The Wave”
    async g => {
      if (off(g)) return;
      const f = facts(g.state);
      await g.scene('shore', { here: ['fisherman', 'mermaid'], moods: { fisherman: 'sad', mermaid: 'eyes_closed' },
        keys: SHORE(f, { light: f.widow === 'out' ? 'dawn' : 'night', wave: 0.3, fisherman_at: 'sand', mermaid_at: 'sand' }) }, { cut: true });
      const w = await g.choose('wave', { fisherman: [
        { id: 'stay', label: tr('Stay with her') },
        { id: 'pull', label: tr('Draw her away from the water') },
      ] });
      if (w === 'stay') {
        const { slips } = await g.play(hold);
        if (slips) g.mark('apart', true, null);
        await g.plate(slips ? tr('Her hand slips out of his; he stays beside her, their fingers almost touching. His heart breaks — and the Soul goes into his heart.')
          : tr('Her hand in his while the wave comes. His heart breaks — and the Soul goes into his heart.'));
      } else {
        await g.plate(g.state.marks.torn ? tr('He wraps her in his net — the one torn at the edge on the night he caught her — and draws her up the shore, backing away.')
          : tr('He wraps her in his net and draws her up the shore, backing away.'));
        g.here('mermaid', false);
        g.set('bundle', true);
        const { torn } = await g.play(drag);
        if (torn) g.mark('torn', 2, null);
        if (torn) await g.plate(tr('The wave reaches his knees; the net tears wider. He draws her out all the same.'));
        g.set('hut', 'gone');
        g.set('fisherman_at', 'field');
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
