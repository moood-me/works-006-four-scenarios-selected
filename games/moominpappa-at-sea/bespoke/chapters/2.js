// II. The Lighthouse Is Dark (scenario §5, 2.1–2.7). The lantern room: thick oil, soot, the match — “He doesn't want
// to”; each to their own (the boy's ring of stones, the sea horses); ⚑ Papa's day; dusk; supper — one lantern, “Take
// it, take it”, the boy asks for it “for the whole night”; ⚑ whose lantern tonight (hinge 1), night 1.
// Scenes: the lantern room, the shore and the middle of the island, the cape, the landing at dusk, the round room.
// Reads: choices.tell, boat, fisher; scales.garden, groke. Leaves: choices.day, night1; scales.garden, lamp, paraffin,
// groke; marks.promise, line27.
import { SCENES, isle } from '../story.js';
import { match, lead, armful, knot, steady, thread, lantern, half } from '../minigames/all.js';

export default {
  number: 'II', title: tr('The Lighthouse Is Dark'),
  titles: ['The Lantern Room', 'Each to Their Own', 'Papa’s Day', 'Dusk', 'Supper', 'Whose Lantern'],
  choices: [
    { id: 'day', title: tr('Papa’s day'), options: [{ id: 'pool', label: tr('Measure the pool') }, { id: 'weed', label: tr('Carry seaweed for Mama') }, { id: 'fisher', label: tr('Go to the Fisherman') }] },
    { id: 'night1', weight: '⚑', title: tr('Whose lantern tonight'), options: [{ id: 'lamp', label: tr('Up to the lamp') }, { id: 'mama', label: tr('Mama, with a term') }, { id: 'son', label: tr('The son, no questions') }, { id: 'turns', label: tr('By turns') }] },
  ],
  steps: [
    // 2.1–2.2: the lantern room; the match
    async g => {
      await g.scene(SCENES.top, { here: ['papa', 'my'], moods: { papa: 'thinking', my: 'smile' }, keys: { ...isle(23, 'day'), flame: 'out', lenses: 0 } });
      await g.plate(tr('The same day, afternoon. Cloudy lenses, a barrel of oil: Papa dips a finger in — it is thick as jam and will not run. The wall by the burner is black with soot; under the soot, pencil — by day only grooves under the finger.'));
      g.gauge('lamp');
      await g.play(match);
      g.set('flame', 'smoky');
      await g.plate(tr('The flame catches, smokes and goes out.'));
      g.set('flame', 'out');
      await g.say('papa', 'He doesn’t want to');
      await g.plate(tr('Little My, from below, through the hatch:'));
      await g.say('my', 'It’s you who can’t');
      g.mood('papa', 'angry');
      await g.say('papa', 'A lighthouse takes time!');
    },
    // 2.3: each to their own
    async g => {
      await g.scene(SCENES.shore, { here: ['mama'], moods: { mama: 'neutral' }, keys: { ...isle(23, 'day'), seahorses: 'here' } });
      await g.plate(tr('Mama takes her basket down to the water for seaweed — on bare stone she needs earth — and for driftwood for the stove.'));
      if (g.state.choices.fisher === 'invite') await g.plate(tr('On her way she leaves bread on a stone by the cape.'));
      await g.scene(SCENES.middle, { here: ['troll'], moods: { troll: 'thinking' }, keys: { ...isle(23, 'day'), ring: 'set' } });
      await g.plate(tr('Little My goes off over the rocks. Without Papa, you see Moomintroll find a clearing among the pines and set stones in a ring.'));
      await g.say('troll', 'Mine');
      await g.scene(SCENES.shore, { here: ['troll'], moods: { troll: 'thinking' }, keys: { ...isle(23, 'day'), seahorses: 'here', troll_at: 'near' } });
      await g.plate(tr('By the water, the sea horses. He crouches down:'));
      await g.say('troll', 'How beautiful you are…');
      g.mood('troll', 'sad');
      g.set('seahorses', 'gone');
      await g.plate(tr('The sea horses laugh and swim away. He turns red.'));
    },
    // 2.4: ⚑ Papa's day
    async g => {
      await g.scene(SCENES.middle, { here: ['papa'], moods: { papa: 'thinking' }, keys: { ...isle(23, 'day'), ring: 'set' } });
      const day = await g.choose('day', { 'papa#chest': [
        { id: 'pool', label: tr('Measure the black pool') },
        { id: 'weed', label: tr('Carry seaweed for Mama') },
        { id: 'fisher', label: tr('Go to the Fisherman and ask about the lighthouse') },
      ] });
      if (day === 'pool') {
        g.mood('papa', 'surprised');
        await g.plate(tr('A rope with a weight on it.'));
        await g.play(lead);
        g.set('rope', 1);
        g.set('pines', 0.4);
        await g.plate(tr('There is no bottom. In the log: “Depth: more than the rope.” Papa is happy and puzzled; behind his back the pines have shifted toward the lighthouse.'));
        g.here('mama', true);
        await g.plate(tr('In the evening Mama comes back wet, with an empty basket: the seaweed was washed away.'));
      } else if (day === 'weed') {
        g.here('troll', true);
        g.mood('papa', 'smile');
        g.mood('troll', 'sad');
        await g.play(armful);
        g.set('ring', 'broken');
        await g.plate(tr('He cannot see his feet under the armful: Papa goes straight through the pines and knocks down his son’s ring of stones. The boy stands at the edge of the clearing looking at his back; when Papa has gone he sets the stones back, one by one.'));
        await g.scene(SCENES.landing, { here: ['papa', 'mama'], moods: { papa: 'smile', mama: 'neutral' },
          keys: { ...isle(23, 'day'), papa_at: 'cleft', mama_at: 'cleft' } });
        await g.plate(tr('At the landing Papa and Mama lay the seaweed into a cleft together.'));
        await g.say('mama', 'Nothing will grow here');
        await g.say('papa', 'It will for me');
        g.mood('mama', 'laugh');
        await g.plate(tr('She laughs.'));
      } else {
        const sat = g.state.choices.fisher === 'sit';
        await g.scene(SCENES.cape, { here: ['fisher', 'papa'], moods: { papa: 'thinking', fisher: 'neutral' },
          keys: { ...isle(23, 'day'), net: 'knot', papa_at: 'net' } });
        if (sat) {
          await g.plate(tr('Papa sits down as he did the first time. The Fisherman’s net is in a tangle.'));
          await g.play(knot);
          g.set('net', 'papa');
          await g.plate(tr('Papa untangles it without a word; the Fisherman looks at his paws on his net — and does not take it away.'));
          await g.say('papa', 'Why isn’t he lit?');
          await g.plate(tr('The Fisherman looks at the sea for a long time.'));
          await g.say('fisher', 'He shines outward');
        } else {
          g.set('fisher_at', 'away');
          await g.plate(tr('The Fisherman sees someone coming, gets up and goes off over the rocks; his net, spread out to dry, has caught on a stone and stayed behind. Papa sits down by the net.'));
          await g.play(knot);
          g.set('fisher_at', 'seat');
          await g.plate(tr('The Fisherman comes back quickly, takes the net out of his paws without a word and goes; he does not look at Papa. Papa is left empty-handed on a stranger’s stone.'));
          g.set('fisher_at', 'away');
        }
        await g.plate(tr('Papa notices: the knot on the net is the same as the one under the lines on the wall.'));
        await g.plate(tr('In the evening Mama comes back wet, with an empty basket.'));
      }
      g.apply('day');
    },
    // 2.5: dusk
    async g => {
      await g.scene(SCENES.landing, { here: ['papa'], moods: { papa: 'thinking' }, keys: { ...isle(23, 'dusk'), papa_at: 'edge' } });
      if (g.state.choices.day === 'weed') await g.plate(tr('Papa alone on a rock, facing the sea. He says nothing, only looks.'));
      else await g.say('papa', 'I’ll understand you. You’ll see');
      await g.plate(tr('A wave splashes over his boots.'));
    },
    // 2.6: supper — one lantern
    async g => {
      const { tell, boat, fisher } = g.state.choices, garden = g.state.scales.garden;
      const room = { here: ['papa', 'mama', 'my', 'troll'], moods: { papa: 'thinking', mama: 'smile', my: 'smile', troll: 'thinking' },
        keys: { ...isle(23, 'dusk'), garden: -1, stove: 'cold', firewood: false } };
      await g.scene(SCENES.room, room);
      if (garden === 0) await g.plate(tr('On the windowsill there is still only the one stalk from the first day, and fresh paint on the brush.'));
      else await g.plate(tr.n(garden, 'Mama paints on the windowsill: {n} flower so far.', 'Mama paints on the windowsill: {n} flowers so far.'));
      if (tell === 'asked') await g.plate(tr('In her own paints: the flowers are green.'));
      else await g.plate(tr('In red lead for boats and blue paint for window frames from the storeroom: the flowers come out red and blue, not hers.'));
      if (fisher === 'invite') await g.say('mama', 'The bread was taken');
      await g.plate(tr('By evening the stove is cold, the driftwood all used (in the morning Mama will gather more). The lantern burns on the table. In the can: three measures.'));
      await g.scene(SCENES.shore, { here: ['groke'], keys: { ...isle(23, 'dusk'), groke_at: boat === 'hold' ? 'near' : 'edge', frost: 0.4, track: boat === 'douse' ? 1 : 0 } });
      if (boat === 'douse') await g.plate(tr('At dusk frost whitens by the water: a strip of it from the sea — she came to the light in the window. The Groke sits down on the sand facing the lighthouse.'));
      else if (boat === 'hold') await g.plate(tr('At dusk frost whitens by the water: the Groke sits down on the sand facing the lighthouse — nearer than one would think.'));
      else await g.plate(tr('At dusk frost whitens by the water: the Groke sits down on the sand facing the lighthouse.'));
      await g.scene(SCENES.room, room, { cut: true });
      await g.say('papa', 'A lighthouse is lit at dusk');
      await g.plate(tr('He looks at the hatch.'));
      await g.say('my', 'So light it, then');
      await g.plate(tr('Mama sews, pulled right up to the lantern, squinting at the needle. At once she pushes the lantern over to Papa:'));
      await g.say('mama', 'Take it, take it. I can see well enough');
      await g.plate(tr('She sews on, squinting. Papa moves the lantern back; without raising her eyes she pushes it to him again:'));
      await g.say('mama', 'Take it, take it');
      await g.plate(tr('Moomintroll, looking out of the window:'));
      await g.say('troll', 'Can I have the lantern? For the whole night');
      await g.say('papa', 'What for?');
      await g.say('troll', 'I need it');
      await g.plate(tr('He will not say more. My looks at her brother and smirks. The lantern in the middle of the table; Mama and the boy near it, Papa by the stair. Everyone looks at the lantern, nobody at each other.'));
    },
    // 2.7: ⚑ whose lantern tonight — night 1
    async g => {
      await g.scene(SCENES.room, { here: ['papa', 'mama', 'my', 'troll'], moods: { papa: 'thinking', mama: 'neutral', my: 'smile', troll: 'thinking' },
        keys: { ...isle(23, 'night'), garden: -1 } }, { cut: true });
      await g.plate(tr('Night 1, 23/24 August. Papa fills the lantern — one measure, till morning. There is no other light: the candles stayed in the valley, the stove is lit once a day, the lighthouse is dark, and no sailing for paraffin while the crests are white.'));
      const night1 = await g.choose('night1', { 'lantern#flame': [
        { id: 'lamp', label: tr('Up to the lamp: “Till I light it, I sleep by the lamp.”') },
        { id: 'mama', label: tr('To Mama: “The captain sets a term. Not lit by the full moon — we turn for home.”') },
        { id: 'son', label: tr('To the son: “Take it. I won’t ask.”') },
        { id: 'turns', label: tr('By turns: “Mama till bedtime, then me, toward morning — you.”') },
      ] });
      g.scale('paraffin', -1);
      g.set('paraffin', g.state.scales.paraffin);
      if (night1 === 'lamp') {
        await g.say('papa', 'Till I light it, I sleep by the lamp');
        g.here('papa', false);
        g.set('lantern_at', 'none');
        await g.plate(tr('He carries the lantern away. The room in moonlight; Mama puts down her sewing. The boy at the window.'));
        await g.scene(SCENES.top, { here: ['papa'], moods: { papa: 'thinking' }, keys: { ...isle(23, 'night'), lantern_at: 'floor', lantern_flame: 'full' } });
        await g.play(steady);
        g.set('slant', 1);
        await g.plate(tr('In the slanting light the grooves under the soot come up. Papa reads:'));
        await g.say('papa', '“In wind, warm the burner with paraffin till the flame turns blue. Do not let go before.”');
        g.set('flame', 'blue');
        await g.plate(tr('At once he splashes paraffin from the lantern on the burner and strikes a match: the flame turns blue and goes out — the thick oil will not come.'));
        g.set('flame', 'out');
        await g.say('papa', 'He doesn’t want to');
        g.set('sheets', 1);
        g.set('cot', 'made');
        await g.plate(tr('He pins a sheet up by the lamp — the sheet “Burner” — and sets up a camp bed. On the shore the Groke looks up at the far little light in the lantern room; she does not come, and she howls.'));
      } else if (night1 === 'mama') {
        await g.say('papa', 'The captain sets a term. If it isn’t lit by the full moon — we turn for home');
        await g.plate(tr('Mama looks at him for a long time.'));
        await g.say('mama', 'Three nights till the full moon');
        await g.say('papa', 'Three');
        await g.say('my', 'Home? Where everything’s done?');
        await g.play(thread);
        await g.plate(tr('Without a word Mama moves along the bench, making room. He sits down. The boy at the window; outside, the Groke howls.'));
        await g.say('mama', 'Somebody is crying');
        await g.plate(tr('Lying down, she turns the wick low but does not put it out:'));
        g.set('flame', 'low');
        await g.say('mama', 'Let it burn low');
      } else if (night1 === 'son') {
        await g.say('papa', 'Take it. I won’t ask');
        await g.play(lantern);
        if (g.state.marks.son_given) await g.plate(tr('He takes it without surprise.'));
        else await g.plate(tr('First he looks at his father, not believing it.'));
        g.here('troll', false);
        g.set('lantern_at', 'none');
        await g.plate(tr('He goes out without raising his eyes. Mama looks Papa in the face and says nothing, only puts down her sewing. Papa goes up and sits by the cold lamp, listening.'));
        await g.scene(SCENES.shore, { here: ['troll', 'groke'], moods: { troll: 'afraid' },
          keys: { ...isle(23, 'night'), lantern_stone: 'lit', troll_at: 'near', groke_at: 'near', frost: 0.4 } });
        await g.plate(tr('What Papa does not see: on the shore the boy sets the lantern on a stone —'));
        await g.say('troll', 'There. That’s for you');
        await g.plate(tr('— and backs away three steps as the Groke rises. She sways over the light, clumsy and quiet, as if dancing.'));
        await g.scene(SCENES.room, { here: ['papa', 'troll'], moods: { papa: 'surprised', troll: 'tired' },
          keys: { ...isle(24, 'dawn'), garden: -1, lantern_at: 'bunk', flame: 'low' } });
        await g.plate(tr('At dawn the boy brings the lantern back with its last flicker and sets it on the floor by his bunk. Papa comes down, and in the low slanting light, right by the floor, he sees a line:'));
        await g.plate(tr('“27 August. Wind north. I am forty today. Nobody knows.” Under it, a knot. The flicker goes out.'));
        g.set('flame', 'out');
      } else {
        await g.say('papa', 'Mama till bedtime, then me, and toward morning — you');
        g.set('flame', 'low');
        await g.plate(tr('Papa turns the wick down, so there will be enough for everyone. Mama sews by the low flame and pricks her finger; when Papa gets up by the stair, she lays her sewing down in the middle of a seam:'));
        await g.say('mama', 'All right');
        await g.plate(tr('When he has gone up she moves to the window and finishes the seam by moonlight.'));
        await g.scene(SCENES.top, { here: ['papa'], moods: { papa: 'thinking' }, keys: { ...isle(23, 'night'), lantern_at: 'floor', lantern_flame: 'low' } });
        await g.play(half);
        await g.plate(tr('Toward morning Papa sets the lantern on the middle step of the stair. The boy has waited below without sleeping; he runs to the shore.'));
        await g.scene(SCENES.shore, { here: ['troll', 'groke'], moods: { troll: 'afraid' }, keys: { ...isle(23, 'night'), groke_at: 'water', troll_at: 'far', frost: 0.2 } });
        await g.plate(tr('The Groke is already up to her waist in the water; she turns to the dim light, comes out and sits down at the water’s edge, far off, till dawn.'));
        g.set('groke_at', 'edge');
        await g.scene(SCENES.room, { here: ['papa'], moods: { papa: 'surprised' }, keys: { ...isle(24, 'morning'), garden: -1, lantern_at: 'stair', flame: 'frost' } });
        await g.plate(tr('In the morning the lantern stands on the middle step again, in frost. Papa shakes it — empty, as after a full flame.'));
      }
      g.apply('night1');
    },
  ],
};
