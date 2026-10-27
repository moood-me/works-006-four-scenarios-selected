// IV. The Storm (scenario §5, 4.1–4.7). Morning: the boat pulled up, “with one paw”, and My says at table what Papa does
// not know; the oil warmed (with two sheets); the storm comes; ⚑ where Papa is in the storm (hinge 3); dawn, the sea
// smooth; night 3 — no light anywhere, the boy at the door: ⚑ the paw on his shoulder.
// Scenes: the landing (grey morning, quiet dawn), the round room (breakfast, the storm, night 3), the lantern room and
// the cape in the storm, the shore at night.
// Reads: choices.wall, night1, night2, fisher, tell; scales.garden, lamp, groke; marks.promise, son_closed, son_knows,
// son_later. Leaves: choices.storm, night3; scales.paraffin; marks.mama_heard, fisher_spoke.
import { SCENES, facts, isle } from '../story.js';
import { boat, burner, hold, rocks, both, shoulder, keep, beside } from '../minigames/all.js';

// the round room in the storm (4.3–4.4): the stove flooded, steam, the floor wet, the door not staying shut
const STORM = { stove: 'flooded', steam: 1, wet: true, door: 0.15, lantern_at: 'table', flame: 'full' };
// the lantern room in the storm: the gallery's glass struck; the pan of warm oil there with two sheets
const top = g => ({ ...isle(25, 'night', 1), gallery_glass: 'cracked', pot: g.state.scales.lamp === 2 });

// Papa leaves the room in the storm: what Mama says after him (4.4) — nothing, if he did not notice her in the wall (and
// later, to the wall, “Well, there”), else “Be careful”
async function farewell(g, wall) {
  g.here('papa', false);
  if (wall === 'walk') {
    await g.plate(tr('Papa goes. Mama says nothing after him; later, to the wall:'));
    await g.say('mama', 'Well, there');
  } else {
    await g.plate(tr('Papa goes. Mama, after him:'));
    await g.say('mama', 'Be careful out there');
  }
}

export default {
  number: 'IV', title: tr('The Storm'),
  titles: ['Morning', 'The Oil', 'The Storm Comes', 'Where Papa Is', 'Dawn', 'Night 3'],
  choices: [
    { id: 'storm', weight: '⚑', title: tr('Where Papa is in the storm'), options: [{ id: 'light', label: tr('Light the lighthouse') }, { id: 'door', label: tr('Hold the door with everyone') }, { id: 'cape', label: tr('To the Fisherman on the cape') }, { id: 'both', label: tr('The burner — and run down') }] },
    { id: 'night3', title: tr('Night 3: the paw on his shoulder'), options: [{ id: 'go', label: tr('“Let him go”') }, { id: 'right', label: tr('“Mama is right”') }, { id: 'dune', label: tr('“As far as the dune”') }] },
  ],
  steps: [
    // 4.1: the boat pulled up; breakfast, and what My says
    async g => {
      const { night1, night2, wall } = g.state.choices, m = g.state.marks;
      await g.scene(SCENES.landing, { here: ['papa', 'troll'], moods: { papa: 'thinking', troll: 'neutral' },
        keys: { ...isle(25, 'morning', 0.35), pines: 1, papa_at: 'boat', troll_at: 'boat' } });
      await g.plate(tr('25 August, grey, the wind getting up; tonight is the full moon.'));
      await g.say('papa', 'There’s going to be a storm');
      if (m.son_closed) await g.plate(tr('Papa and his son pull the boat higher up the rocks. The boy pulls from the other side of the hull, without a word.'));
      else await g.plate(tr('Papa and his son pull the boat higher up the rocks. The boy pulls beside him, without a word.'));
      await g.play(boat);
      g.set('boat', 'up');
      await g.scene(SCENES.room, { here: ['papa', 'mama', 'my', 'troll'], moods: { papa: 'smile', mama: 'neutral', my: 'smile', troll: 'neutral' },
        keys: { ...isle(25, 'morning', 0.35), lantern_at: 'table', flame: 'out', cups: 2, tea: 1 } });
      await g.plate(tr('Breakfast. Papa tells how he pulled up the boat.'));
      await g.say('papa', 'With one paw, you might say. Against the wind');
      await g.say('my', 'He pulled too');
      // what My says in front of everyone (4.1): where the boy goes, if Papa doesn't know; else where Mama was
      const first = night1 === 'son' || night1 === 'turns', second = night2 === 'sleep';
      if (night2 !== 'follow') {
        if (first && second) await g.say('my', 'Your son takes the lantern to the Groke. Every night');
        else if (first) await g.say('my', 'Your son took the lantern to the Groke. The one you left him');
        else if (second) await g.say('my', 'Your son took the lantern to the Groke last night. And you snored. Pretending');
        else await g.say('my', 'Your son goes to the Groke at night. Without a lantern. He sits there and freezes');
        g.here('troll', false);
        await g.plate(tr('The boy gets up and leaves the table. Mama heard it.'));
        g.mark('mama_heard', true, tr('Mama knows where the boy goes at night.'));
      } else if (wall === 'walk') {
        await g.say('my', 'Mama was in the wall all day yesterday. She came out when you weren’t there');
        await g.say('mama', 'My');
        await g.plate(tr('And nothing more.'));
      } else await g.plate(tr('My says nothing and smirks.'));
    },
    // 4.2: the oil warmed — only with two sheets
    async g => {
      if (g.state.scales.lamp < 2) return;
      await g.scene(SCENES.room, { here: ['papa', 'mama', 'my'], moods: { papa: 'thinking', mama: 'neutral', my: 'disgusted' },
        keys: { ...isle(25, 'dusk', 0.45), stove: 'fire', firewood: false, lantern_at: 'table' } });
      await g.plate(tr('Toward evening, the wind already howling, Papa lights the stove — the only time today — with the whole bundle of driftwood, but not for supper: he warms a pan of oil, wraps it in his coat and carries it up to the lamp.'));
      await g.say('mama', 'All right');
      await g.plate(tr('Supper is cold bread.'));
      await g.say('my', 'Bread again');
    },
    // 4.3: the storm comes
    async g => {
      const garden = g.state.scales.garden, { tell } = g.state.choices;
      await g.scene(SCENES.room, { here: ['papa', 'mama', 'my', 'troll'], moods: { papa: 'thinking', mama: 'afraid', my: 'laugh', troll: 'afraid' },
        keys: { ...isle(25, 'night', 1), ...STORM, firewood: false } });
      await g.plate(tr('By evening, the storm. The wind; a wave washes over the landing and reaches the boat even up on the rocks. A wave comes down the chimney and floods the stove — hissing, steam.'));
      await g.say('mama', 'The stove’s flooded');
      await g.plate(tr('The door will not stay shut by itself. Up top the glass of the gallery rings: up there, by the lamp, there is no room for everyone. Through the window — the cape: the Fisherman sits, a wave runs in under him, and he does not get up. The last measure in the can. The full moon in a rift of cloud.'));
      g.set('shutters', true);
      if (garden <= 1) await g.plate(tr('Mama ties the shutters, then stands silent beside Papa, holding on to his sleeve.'));
      else if (garden === 2) await g.plate(tr('Mama ties the shutters without a word.'));
      else await g.plate(tr('Mama ties the shutters and for a moment lays her palm on the painted gate.'));
      if (tell === 'asked') await g.plate(tr('The first thing she saves from the water is her box of paints; she holds it under her apron.'));
      if (g.state.marks.promise === 'term') {
        await g.plate(tr('She looks out at the moon:'));
        await g.say('mama', 'Full moon');
      }
    },
    // 4.4: ⚑ where Papa is in the storm
    async g => {
      const { wall, fisher } = g.state.choices;
      await g.scene(SCENES.room, { here: ['papa', 'mama', 'my', 'troll'], moods: { papa: 'thinking', mama: 'afraid', my: 'laugh', troll: 'afraid' },
        keys: { ...isle(25, 'night', 1), ...STORM, firewood: false, shutters: true } }, { cut: true });
      const storm = await g.choose('storm', { 'papa#chest': [
        { id: 'light', label: tr('Light the lighthouse with the last of the paraffin') },
        { id: 'door', label: tr('Hold the door with everyone: “When it drops, we sail home.”') },
        { id: 'cape', label: tr('Go out to the cape, to the Fisherman') },
        { id: 'both', label: tr('Light the burner — and run down to the door') },
      ] });
      g.scale('paraffin', -1);
      g.set('paraffin', g.state.scales.paraffin);
      await g.plate(tr('The last measure goes. The can is empty.'));
      if (storm === 'light') {
        const sheets = g.state.scales.lamp;
        await farewell(g, wall);
        await g.scene(SCENES.top, { here: ['papa'], moods: { papa: 'angry' }, keys: top(g) });
        await g.plate(tr('Papa on the gallery shouts into the storm, as at an enemy:'));
        await g.say('papa', 'You won’t take it! Do you hear? You won’t take it!');
        await g.plate(tr('The sea answers with a wave against the glass.'));
        if (sheets === 2) {
          await g.plate(tr('By the lamp: two sheets, and the pan of warm oil.'));
          await g.say('papa', 'The oil is warm. Till it turns blue');
        } else if (sheets === 1) {
          await g.plate(tr('By the lamp: one sheet, “Burner”. No pan.'));
          await g.say('papa', 'Till it turns blue');
        } else {
          await g.plate(tr('By the lamp: no sheets, no pan.'));
          await g.say('papa', 'Well. Come on');
        }
        await g.play(burner);
        if (facts(g.state).lit) {
          g.mood('papa', 'laugh');
          g.set('flame', 'lit');
          await g.plate(tr('The warm oil runs up the wick, the flame rises, the lenses turn, the beam goes out over the storm and over the cape. Under the wave the Fisherman lifts his face to the light. Papa on the gallery, soaked, laughing.'));
        } else {
          g.mood('papa', 'sad');
          g.set('flame', 'blue');
          await g.plate(tr('The paraffin burns blue, the thick oil will not come; the flame rises and goes out. Lightning — Papa’s face, close. He listens to the wind by the cold lamp.'));
          g.set('flame', 'out');
        }
        await g.plate(tr('Below, Mama alone with the children holds the door.'));
      } else if (storm === 'door') {
        await g.plate(tr('The last of the paraffin goes into the lantern on the table. Papa says it loudly, like an order on board, his back to the hatch:'));
        await g.say('papa', 'When it drops, we sail home');
        if (g.state.marks.promise === 'term') await g.say('papa', 'The captain remembers');
        await g.play(hold);
        await g.plate(tr('The four of them sit with their backs against the door. Papa tells about the storm at the Lonely Mountains.'));
        await g.say('my', 'You’ve told that one');
        await g.plate(tr('They laugh.'));
        if (wall === 'walk') {
          await g.plate(tr('Mama says it to the painted apple tree, under her breath, under the blow of a wave; Papa at the door does not hear, you do:'));
          await g.say('mama', 'I want to go home');
        } else {
          await g.plate(tr('Mama, to Papa — not asking, owning up:'));
          await g.say('mama', 'I want to go home');
          await g.say('mama', 'Pass me the blanket');
        }
        await g.plate(tr('In a flash of lightning through the window: the lighthouse without a light, and someone on the cape under the wave.'));
      } else if (storm === 'cape') {
        await g.say('papa', 'Man overboard. The captain is going');
        await g.say('my', 'Have you gone mad?');
        await g.say('mama', 'Where are you going, in such water?');
        await g.plate(tr('The last of the paraffin goes into the lantern.'));
        await farewell(g, wall);
        await g.scene(SCENES.cape, { here: ['fisher', 'papa'], moods: { papa: 'angry', fisher: 'neutral' },
          keys: { ...isle(25, 'night', 1), net: 'knot', papa_at: 'stand' } });
        await g.play(rocks);
        await g.plate(tr('Halfway there the lantern blows out. Papa shouts at the sea:'));
        await g.say('papa', 'You won’t get me!');
        g.mood('papa', 'thinking');
        g.set('papa_at', 'under');
        await g.plate(tr('The moon in a rift of cloud, foam. Papa takes the Fisherman by the sleeve and pulls him toward the rock; the Fisherman does not move, does not even look. Papa lets go of the sleeve and sits down beside him, under the same wave. He shouts at the sea no more: the wave covers them both and goes back, and Papa listens to it breathe.'));
        await g.plate(tr('Lightning: both faces, close. On the Fisherman’s knees the net — and the knot, close: the same as under the lines on the wall.'));
        if (fisher === 'sit') {
          await g.plate(tr('The Fisherman looks at the dark lighthouse:'));
          await g.say('fisher', 'On a night like this he ought to burn');
          await g.plate(tr('His palm comes down on his knee and presses, the way one holds a burner — and lets go. Papa looks at his hand.'));
          g.mark('fisher_spoke', true, tr('The Fisherman spoke to Papa.'));
        } else await g.plate(tr('The Fisherman is silent till dawn, and Papa understands only that he will not leave.'));
        await g.plate(tr('Below, Mama, My and the boy hold the door, the three of them, without warm light.'));
      } else {
        await farewell(g, wall);
        await g.scene(SCENES.top, { here: ['papa'], moods: { papa: 'afraid' }, keys: top(g) });
        await g.play(both);
        g.set('flame', 'blue');
        await g.plate(tr('The flame goes out behind his back.'));
        await g.scene(SCENES.room, { here: ['papa', 'mama', 'my', 'troll'], moods: { papa: 'afraid', mama: 'afraid', my: 'surprised', troll: 'afraid' },
          keys: { ...isle(25, 'night', 1), ...STORM, firewood: false, shutters: true } });
        await g.plate(tr('Below, the wave has already come in: the floor is wet, Mama and the children are at the door. He stands with them, but the door is already held.'));
      }
      g.apply('storm');
    },
    // 4.5: dawn — the sea smooth
    async g => {
      const f = facts(g.state);
      await g.scene(SCENES.landing, { here: ['papa'], moods: { papa: 'tired' },
        keys: { ...isle(26, 'dawn'), pines: 1, driftwood: true, boat: 'cracked', papa_at: f.storm === 'both' ? 'slab' : 'water' } });
      await g.plate(tr('26 August. The storm has dropped; for the first time, no wind. In the room it drips from the ceiling; the can is empty; the stove is flooded.'));
      if (f.lit) await g.plate(tr('The lamp burnt out at dawn: the warm oil ran out.'));
      if (g.state.marks.promise === 'term') await g.plate(tr('Mama packs her basket without a word and sets it by the door.'));
      if (f.storm === 'both') await g.plate(tr('Papa does not go down to the water.'));
      else {
        await g.plate(tr('Papa goes down to the water: the sea is smooth and splashes over his boots, as it did that dusk, and the whole shore at his feet is driftwood it threw up in the night.'));
        if (f.storm === 'light' && f.lit) await g.say('papa', 'There, you see');
        else if (f.storm === 'light') await g.plate(tr('He says nothing.'));
        else if (f.storm === 'cape') {
          await g.plate(tr('He crouches down and runs his paw over the water:'));
          await g.say('papa', 'There, there. It’s all right');
        } else await g.plate(tr('He looks at the sea over his shoulder and goes to the boat.'));
      }
      g.set('papa_at', 'boat');
      await g.plate(tr('The boat has a crack in her side. All day Papa caulks her; the tar will be dry by morning — no sailing to the neighbours for paraffin, and no sailing home.'));
    },
    // 4.6–4.7: night 3 — no light; ⚑ the paw on his shoulder
    async g => {
      const m = g.state.marks;
      // (the room after the storm: the stove dried out, the can and the lantern empty; Mama's basket by the door, if she
      // was given a term — 4.5)
      const room = { ...isle(26, 'night'), lantern_at: 'table', flame: 'out', drip: 0.3, basket: m.promise === 'term' };
      await g.scene(SCENES.room, { here: ['papa', 'mama', 'troll'], moods: { papa: 'thinking', mama: 'sad', troll: 'neutral' }, keys: { ...room, stone: false } });
      if (g.state.scales.groke > 0) await g.plate(tr('Night 3, 26/27 August, quiet. No paraffin, the lantern empty, the lamp cold, nothing to warm it with. On the shore the Groke, the frost around her wide; she sits nearer the lighthouse than ever. She howls.'));
      else await g.plate(tr('Night 3, 26/27 August, quiet. No paraffin, the lantern empty, the lamp cold, nothing to warm it with. On the shore the Groke, the frost around her wide. She howls.'));
      if (m.son_closed) await g.plate(tr('The boy at the door, without a lantern. He does not look at Papa.'));
      else if (m.son_knows) await g.plate(tr('The boy at the door, without a lantern. First he looks at Papa, then at the door.'));
      else await g.plate(tr('The boy at the door, without a lantern.'));
      if (m.son_later) {
        await g.plate(tr('The stone from the threshold is in his paws. Papa opens his mouth —'));
        await g.say('troll', 'Later');
        await g.plate(tr('— the boy says without looking, and grips the stone.'));
      }
      if (m.mama_heard) {
        await g.say('mama', 'Without a lantern? She’ll freeze you');
        await g.say('troll', 'Let her');
      } else {
        await g.say('mama', 'Where are you going? To freeze again?');
        await g.say('troll', 'I need to');
      }
      await g.say('mama', 'Tell him');
      await g.plate(tr('Papa’s paw is on his son’s shoulder.'));
      const night3 = await g.choose('night3', { 'troll#chest': [
        { id: 'go', label: tr('“Let him go.”') },
        { id: 'right', label: tr('“Mama is right.”') },
        { id: 'dune', label: tr('“Come on. I’ll go with you as far as the dune.”') },
      ] });
      if (night3 === 'go') {
        await g.say('papa', 'Let him go');
        await g.play(shoulder);
        await g.scene(SCENES.shore, { here: ['troll', 'groke'], moods: { troll: 'tired' },
          keys: { ...isle(26, 'night'), troll_at: 'beside', groke_at: g.state.scales.groke > 0 ? 'closest' : 'near', frost: 1 } });
        await g.plate(tr('The boy sits down beside the Groke. The frost creeps toward him; he sits a long time, white to the elbows. Mama takes a blanket without a word, goes to the dune, lays it on the sand behind the boy’s back and comes back; till morning she stands at the window, Papa behind her.'));
        g.set('blanket', true);
        g.set('warm', 1);
        await g.plate(tr('By the middle of the night the frost stops; the sand under the Groke darkens; she hums softly.'));
        await g.scene(SCENES.room, { here: ['papa', 'mama', 'troll'], moods: { papa: 'thinking', mama: 'neutral', troll: 'tired' },
          keys: { ...room, ...isle(27, 'dawn'), cups: 2, tea: 1 } });
        await g.plate(tr('At dawn the boy, in the blanket, looking at no one, says in the doorway:'));
        await g.say('troll', 'She isn’t frightening. She’s just cold');
        await g.plate(tr('Mama rubs his paws and sits down beside him; Papa she gives tea, and does not sit down by him.'));
      } else if (night3 === 'right') {
        await g.say('papa', 'Mama is right');
        await g.play(keep);
        if (m.son_closed) await g.plate(tr('He trembles in the doorway and obeys, but after that he does not look at Papa.'));
        await g.plate(tr('The boy at the window till dawn. The Groke howls, and toward morning she goes off into the sea; on the sand, a white track into the water. Mama covers the boy with a blanket.'));
      } else {
        await g.say('papa', 'Come on. I’ll go with you as far as the dune');
        await g.scene(SCENES.shore, { here: ['papa', 'troll', 'groke'], moods: { papa: 'thinking', troll: 'neutral' },
          keys: { ...isle(26, 'night'), troll_at: 'far', groke_at: 'edge', frost: 1 } });
        await g.play(beside);
        await g.say('troll', 'I’ll go on by myself from here');
        g.set('troll_at', 'near');
        await g.plate(tr('Papa sits on the dune all night. The Groke sees a second figure and for a long time does not come; the frost reaches the boy. Only toward dawn does she sit down beside him, and the sand darkens.'));
        g.set('warm', 1);
        await g.scene(SCENES.room, { here: ['mama'], moods: { mama: 'sad' }, keys: { ...room, ...isle(27, 'dawn'), cups: 2, tea: 0.3 } });
        await g.plate(tr('In the room Mama puts two cups on the table; one goes cold. At dawn the boy walks past Papa and does not stop.'));
      }
    },
  ],
};
