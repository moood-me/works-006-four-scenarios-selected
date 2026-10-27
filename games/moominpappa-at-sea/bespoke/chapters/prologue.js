// Prologue. “A Quiet August” (scenario §5, П.1–П.6). The valley, where everything is done; a little fire in the moss;
// nobody gasps; Papa alone at the map — and how he tells them (⚑ tell); packing, and the boat pushes off.
// Scenes: the valley — its pieces garden, smoke, spot, groke_far; map; supper or late and morning; basket, push_off.
// Reads: nothing. Leaves: choices.tell, marks.mama.
import { SCENES, moon } from '../story.js';
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
      g.beds({ stream: 0.35, wind: 0.08 });
      const walk = g.told('garden:walk');
      await g.scene(SCENES.valley, { beat: 'garden', here: ['papa', 'mama', 'troll', 'my', 'groke'], moods: { papa: 'thinking', mama: 'smile' },
        keys: moon(20) });
      g.title(tr('Moominpappa at Sea')).then(() => g.title(tr('20 August')));
      const garden = g.beat('garden');
      await walk;
      await g.say('narrator', 'At the end of August everything in the valley was already done. Papa walked about the garden looking for something to do');
      await garden;
      await g.beat('smoke');
      await g.play(ladle);
      g.set('smoke', 1);
      const shout = g.told('spot:shout'), mama = g.told('spot:mama'), my = g.told('spot:my'), alone = g.told('spot:alone');
      const spot = g.beat('spot');
      await shout;
      g.mood('papa', 'smile');
      await g.say('papa', 'Fire! I’ve put out a fire!');
      await mama;
      await g.say('mama', 'How good that you noticed');
      await my;
      await g.say('my', 'Ti-iny, isn’t it');
      await alone;
      g.mood('papa', 'thinking');
      await g.say('papa', 'I put out a fire');
      await spot;
      await g.beat('groke_far');
    },
    // П.4–П.5: the map at night; ⚑ how to tell them
    async g => {
      g.beds({ crickets: 0.4, clock: 0.35 });
      const chart = g.told('map:chart');
      await g.scene(SCENES.valley, { beat: 'map', here: ['papa'], moods: { papa: 'thinking' }, keys: moon(20) });
      const map = g.beat('map');
      await chart;
      await g.say('papa', 'A lighthouse. And not lit');
      await g.wait(1500);
      await g.say('papa', 'But somebody must have lived there');
      await map;
      const tell = await g.choose('tell', { 'chart#island': [
        { id: 'all', label: tr('At supper, to everyone at once: “We’re moving to the lighthouse!”') },
        { id: 'asked', label: tr('Tell Mama in the evening, when the children are asleep') },
      ] });
      if (tell === 'all') {
        g.beds({ crickets: 0.25, clock: 0.2 });
        const said = g.told('supper:said'), spoon = g.told('supper:spoon'), mama = g.told('supper:mama');
        await g.scene(SCENES.valley, { beat: 'supper', here: ['papa', 'mama', 'my', 'troll'], moods: { papa: 'smile', my: 'laugh', troll: 'surprised', mama: 'neutral' },
          keys: moon(21) });
        const supper = g.beat('supper');
        await said;
        await g.say('papa', 'We’re moving to the lighthouse!');
        await g.say('my', 'Hooray!');
        await spoon;
        await g.say('troll', 'To the lighthouse? For good?');
        await mama;
        await g.wait(1200);
        await g.say('mama', 'I’ll pack our things');
        await supper;
      } else {
        g.beds({ crickets: 0.35, clock: 0.3 });
        const look = g.told('late:look'), yes = g.told('late:yes');
        await g.scene(SCENES.valley, { beat: 'late', here: ['papa', 'mama'], moods: { papa: 'smile', mama: 'thinking' }, keys: moon(21) });
        const late = g.beat('late');
        await look;
        await g.say('mama', 'Is there any earth there?');
        await g.say('papa', 'There’s a lighthouse there!');
        await yes;
        await g.say('mama', 'All right. I’ll take my paints');
        await late;
        g.beds({ stream: 0.3, wind: 0.1 });
        const my = g.told('morning:my');
        await g.scene(SCENES.valley, { beat: 'morning', here: ['papa', 'my'], moods: { papa: 'thinking', my: 'disgusted' }, keys: moon(22) });
        const morning = g.beat('morning');
        await my;
        await g.say('my', 'You’ve already decided everything. Boring');
        await morning;
      }
      g.apply('tell');
    },
    // П.6: packing; the evening of the 22nd, the boat pushes off
    async g => {
      const { tell } = g.state.choices;
      g.beds({ stream: 0.25, wind: 0.08 });
      const candles = g.told('basket:candles'), paints = g.told('basket:paints');
      await g.scene(SCENES.valley, { beat: 'basket', here: ['papa', 'mama', 'troll', 'my'], moods: { papa: 'smile', mama: 'neutral', troll: 'thinking' },
        keys: { ...moon(22), paints: tell === 'asked' } });
      const basket = g.beat('basket');
      await candles;
      await g.say('papa', 'Leave the candles. There’s a lighthouse!');
      await g.say('mama', 'All right');
      await paints;
      if (tell !== 'asked') {
        await g.say('my', 'And your paints?');
        await g.say('mama', 'Something will turn up there');
      }
      await basket;
      g.beds({ stream: 0.2, sea: 0.3, wind: 0.12 });
      await g.scene(SCENES.valley, { beat: 'push_off', here: ['papa', 'mama', 'troll', 'my', 'groke'], moods: { troll: 'afraid' }, keys: moon(22) });
      g.title(tr('22 August'));
      await g.beat('push_off');
    },
  ],
};
