// Prologue. “A Quiet August” (scenario §5, П.1–П.6). The valley, where everything is done; a little fire in the moss;
// nobody gasps; Papa alone at the map — and how he tells them (⚑ tell); packing, and the boat pushes off.
// Scenes: the valley (its set-ups: the garden, the map, the supper, the jetty; the basket's insert).
// Reads: nothing. Leaves: choices.tell, marks.mama.
import { SCENES, sky } from '../story.js';
import { ladle } from '../minigames/all.js';

export default {
  number: '', title: tr('A Quiet August'),
  titles: ['The Garden', 'The Map', 'Setting Off'],
  choices: [
    { id: 'tell', title: tr('How to tell them'), options: [{ id: 'all', label: tr('To everyone at supper') }, { id: 'asked', label: tr('To Mama, in the evening') }] },
  ],
  steps: [
    // П.1–П.3: the garden, the fire in the moss, nobody gasps
    async g => {
      await g.scene(SCENES.valley, { here: ['papa', 'mama', 'troll', 'my', 'groke'], moods: { papa: 'thinking', mama: 'smile' },
        keys: { ...sky(20, 'dusk'), where: 'garden' } });
      g.title(tr('Moominpappa at Sea'));
      await g.wait(3000);
      await g.say('narrator', 'At the end of August everything in the valley was already done. Papa walked about the garden looking for something to do');
      await g.plate(tr('20 August, evening. Mama is making jam on the veranda; Moomintroll and Little My are floating bark boats on the stream. Papa walks about the garden with his hands behind his back.'));
      g.set('moss', 'smoulder');
      await g.plate(tr('Under the apple tree a thread of smoke rises out of the moss. Papa’s eyes light up.'));
      await g.play(ladle);
      g.set('moss', 'burnt');
      g.mood('papa', 'smile');
      await g.say('papa', 'Fire! I’ve put out a fire!');
      await g.plate(tr('Mama comes out and looks at the little black spot.'));
      await g.say('mama', 'How good that you noticed');
      await g.plate(tr('And she goes back to her jam.'));
      await g.say('my', 'Ti-iny, isn’t it');
      await g.say('papa', 'I put out a fire');
      g.set('frost', 0.3);
      await g.plate(tr('Papa alone by the spot, with the ladle. Far off on the shore the Groke looks at the lights of the house, and the grass around her turns white. Only you can see her.'));
    },
    // П.4–П.5: the map at night; ⚑ how to tell them
    async g => {
      await g.scene(SCENES.valley, { here: ['papa'], moods: { papa: 'thinking' }, keys: { ...sky(20, 'night'), where: 'map', lamps: 1 } });
      g.set('chart', 1);
      await g.plate(tr('Night. A clock, crickets. Far out on the map, in the sea, a dot: an island, a lighthouse.'));
      await g.say('papa', 'A lighthouse. And not lit');
      await g.wait(1500);
      await g.say('papa', 'But somebody must have lived there');
      const tell = await g.choose('tell', { 'chart#island': [
        { id: 'all', label: tr('At supper, to everyone at once: “We’re moving to the lighthouse!”') },
        { id: 'asked', label: tr('Tell Mama in the evening, when the children are asleep') },
      ] });
      if (tell === 'all') {
        await g.scene(SCENES.valley, { here: ['papa', 'mama', 'my', 'troll'], moods: { papa: 'smile', my: 'laugh', troll: 'surprised', mama: 'neutral' },
          keys: { ...sky(21, { dusk: 0.6, night: 0.5 }), where: 'supper', lamps: 1 } });
        await g.say('papa', 'We’re moving to the lighthouse!');
        await g.say('my', 'Hooray!');
        await g.plate(tr('Moomintroll puts down his spoon and, for the first time this evening, looks at his father.'));
        await g.say('troll', 'To the lighthouse? For good?');
        await g.plate(tr('Papa beams: they gasped. Mama is silent for a while.'));
        await g.say('mama', 'I’ll pack our things');
      } else {
        await g.scene(SCENES.valley, { here: ['papa', 'mama'], moods: { papa: 'smile', mama: 'thinking' },
          keys: { ...sky(21, 'night'), where: 'supper', lamps: 1 } });
        await g.plate(tr('Mama looks at the dot for a long time.'));
        await g.say('mama', 'Is there any earth there?');
        await g.say('papa', 'There’s a lighthouse there!');
        await g.say('mama', 'All right. I’ll take my paints');
        await g.scene(SCENES.valley, { here: ['papa', 'my'], moods: { papa: 'thinking', my: 'disgusted' }, keys: { ...sky(22, { dawn: 0.7 }), where: 'jetty' } });
        await g.plate(tr('In the morning the children are told, as a thing decided.'));
        await g.say('my', 'You’ve already decided everything. Boring');
        await g.plate(tr('Papa packs the boat alone. There is no one to gasp.'));
      }
      g.apply('tell');
    },
    // П.6: packing; the evening of the 22nd, the boat pushes off
    async g => {
      const { tell } = g.state.choices;
      await g.scene(SCENES.valley, { here: ['papa', 'mama', 'troll', 'my'], moods: { papa: 'smile', mama: 'neutral', troll: 'thinking' },
        keys: { ...sky(22, 'day'), where: 'jetty', basket: 1, candles: 'basket' } });
      await g.plate(tr('Mama packs: Papa’s hat and his notebook, a sweater for Moomintroll, nothing for herself. She puts in candles —'));
      await g.say('papa', 'Leave the candles. There’s a lighthouse!');
      await g.say('mama', 'All right');
      g.set('candles', 'shelf');
      await g.plate(tr('The candles go back on the shelf — and at the bottom of the basket, under the sweater, goes a jar of jam nobody asked about.'));
      if (tell === 'asked') {
        g.set('paints', true);
        await g.plate(tr('The box of paints she puts in last, on top.'));
      } else {
        await g.say('my', 'And your paints?');
        await g.say('mama', 'Something will turn up there');
      }
      await g.scene(SCENES.valley, { here: ['papa', 'mama', 'troll', 'my', 'groke'], moods: { troll: 'afraid' },
        keys: { ...sky(22, 'dusk'), where: 'jetty', lantern_bow: 1, frost: 1 } });
      await g.plate(tr('The evening of 22 August. The boat pushes off, the lantern on her bow. On the shore the Groke walks down to the water, toward the light; where she steps, frost.'));
    },
  ],
};
