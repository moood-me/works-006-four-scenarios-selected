// Prologue. “A Quiet August” (scenario §5, П.1–П.6). The valley, where everything is done; a little fire in the moss;
// nobody gasps; Papa alone at the map — and how he tells them (⚑ tell); packing, and the boat pushes off.
// Stand-ins: the valley — the landing; the house at night — the round room.
// Reads: nothing. Leaves: choices.tell, marks.mama.
import { SCENES } from '../story.js';
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
      await g.scene(SCENES.landing, { here: ['papa', 'mama', 'troll'], moods: { papa: 'thinking', mama: 'smile' },
        where: tr('In truth: the garden in Moominvalley, an evening at the end of August.') });
      g.title(tr('Moominpappa at Sea'));
      await g.wait(3000);
      await g.say('narrator', 'At the end of August everything in the valley was already done. Papa walked about the garden looking for something to do');
      await g.plate(tr('20 August, evening. Mama is making jam on the veranda; Moomintroll and Little My are floating bark boats on the stream. Papa walks about the garden with his hands behind his back.'));
      await g.plate(tr('Under the apple tree a thread of smoke rises out of the moss. Papa’s eyes light up.'));
      await g.play(ladle);
      g.mood('papa', 'smile');
      await g.say('papa', 'Fire! I’ve put out a fire!');
      await g.plate(tr('Mama comes out and looks at the little black spot.'));
      await g.say('mama', 'How good that you noticed');
      await g.plate(tr('And she goes back to her jam.'));
      await g.say('my', 'Ti-iny, isn’t it');
      await g.say('papa', 'I put out a fire');
      await g.plate(tr('Papa alone by the spot, with the ladle. Far off on the shore the Groke looks at the lights of the house, and the grass around her turns white. Only you can see her.'));
    },
    // П.4–П.5: the map at night; ⚑ how to tell them
    async g => {
      await g.scene(SCENES.room, { here: ['papa'], moods: { papa: 'thinking' },
        where: tr('In truth: the house in the valley, at night. Papa alone at the map.') });
      await g.plate(tr('Night. A clock, crickets. Far out on the map, in the sea, a dot: an island, a lighthouse.'));
      await g.say('papa', 'A lighthouse. And not lit');
      await g.wait(1500);
      await g.say('papa', 'But somebody must have lived there');
      const tell = await g.choose('tell', { papa: [
        { id: 'all', label: tr('At supper, to everyone at once: “We’re moving to the lighthouse!”') },
        { id: 'asked', label: tr('Tell Mama in the evening, when the children are asleep') },
      ] });
      if (tell === 'all') {
        await g.scene(SCENES.room, { here: ['papa', 'mama', 'my', 'troll'], moods: { papa: 'smile', my: 'laugh', troll: 'surprised', mama: 'neutral' },
          where: tr('In truth: the house in the valley, supper.') }, { cut: true });
        await g.say('papa', 'We’re moving to the lighthouse!');
        await g.say('my', 'Hooray!');
        await g.plate(tr('Moomintroll puts down his spoon and, for the first time this evening, looks at his father.'));
        await g.say('troll', 'To the lighthouse? For good?');
        await g.plate(tr('Papa beams: they gasped. Mama is silent for a while.'));
        await g.say('mama', 'I’ll pack our things');
      } else {
        await g.scene(SCENES.room, { here: ['papa', 'mama'], moods: { papa: 'smile', mama: 'thinking' },
          where: tr('In truth: the house in the valley, late evening; the children are asleep.') }, { cut: true });
        await g.plate(tr('Mama looks at the dot for a long time.'));
        await g.say('mama', 'Is there any earth there?');
        await g.say('papa', 'There’s a lighthouse there!');
        await g.say('mama', 'All right. I’ll take my paints');
        await g.plate(tr('In the morning the children are told, as a thing decided.'));
        await g.say('my', 'You’ve already decided everything. Boring');
        await g.plate(tr('Papa packs the boat alone. There is no one to gasp.'));
      }
      g.apply('tell');
    },
    // П.6: packing; the evening of the 22nd, the boat pushes off
    async g => {
      const { tell } = g.state.choices;
      await g.scene(SCENES.landing, { here: ['papa', 'mama', 'troll'], moods: { papa: 'smile', mama: 'neutral', troll: 'thinking' },
        where: tr('In truth: the valley, the shore; the boat Adventure ready to go.') });
      await g.plate(tr('Mama packs: Papa’s hat and his notebook, a sweater for Moomintroll, nothing for herself. She puts in candles —'));
      await g.say('papa', 'Leave the candles. There’s a lighthouse!');
      await g.say('mama', 'All right');
      await g.plate(tr('The candles go back on the shelf — and at the bottom of the basket, under the sweater, goes a jar of jam nobody asked about.'));
      if (tell === 'asked') await g.plate(tr('The box of paints she puts in last, on top.'));
      else {
        await g.say('my', 'And your paints?');
        await g.say('mama', 'Something will turn up there');
      }
      await g.plate(tr('The evening of 22 August. The boat pushes off, the lantern on her bow. On the shore the Groke walks down to the water, toward the light; where she steps, frost.'));
    },
  ],
};
