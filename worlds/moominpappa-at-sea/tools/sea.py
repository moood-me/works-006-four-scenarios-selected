# Writes scenes/sea/scene.json: the open sea (С2) — the boat «Adventure» and what is in her (lib.js has the same seats
# and ribs), what follows behind, the island far off; its light, sky and sea by the hour are the island's
# (tools/island.py). Run from the world's root: python tools/sea.py .
import json, math, sys
sys.path.insert(0, sys.argv[1] + '/tools')
import island

root = sys.argv[1]
folder = root + '/scenes/sea'
r3 = lambda v: round(v, 3)

WIND = [0.5, -1, 0.7]
SEATS = {'papa': [0.32, 1.45, 0.38], 'mama': [-0.24, -0.3, 0.38], 'troll': [-0.3, 1.95, 0.46], 'my': [0, -1.2, 2.24]}
RIBS = [[-2.2, 0.04, 0.8, 0.3], [-1.6, 0.5, 0.67, -0.2], [-0.8, 0.75, 0.59, -0.29], [0, 0.8, 0.56, -0.32],
        [0.9, 0.76, 0.58, -0.3], [1.6, 0.66, 0.61, -0.24], [2.2, 0.53, 0.65, -0.12]]


def rib_length(d, w, rail, keel):
    H = rail - keel
    pts = [(-w * x, rail - H * y) for x, y in [(1, 0), (0.97, 0.25), (0.85, 0.55), (0.55, 0.85), (0, 1)]]
    return 2 * sum(math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]) for i in range(1, len(pts)))


RIB = max(rib_length(*r) for r in RIBS)  # the painting's width: the longest rib
WAY = RIBS[-1][0] - RIBS[0][0]
ISLE = -25  # the island's across (its distance is the script's, by `island`)


def on_boat(id, name, a, d, el, box=None, **k):
    o = {'id': id, 'name': name, 'on': 'boat', 'across': a, 'distance': d, 'elevation': el}
    o.update(k)
    if box:
        o['box'] = box
    return o


lighthouse = island.lighthouse(6, 3)
lighthouse.update({'on': 'isle', 'elevation': 6.1})

objects = [
    island.sky(0.6, (-0.35, 0.42), 1.95, -0.15),
    island.sea(0, {'strength': 0.2, 'fade': 0, 'rough': 0.55, 'ripple': 0.4}),
    {'id': 'boat', 'name': 'The boat Adventure', 'unseen': True, 'across': 0, 'distance': 0, 'elevation': 0, 'onLand': False,
     'facing': 180, 'height': 0.1, 'box': [-0.05, -0.1, 0.05, 0], 'place': {'facing': 'boat_facing', 'tilt': 'boat_pitch'}},
    on_boat('hull', 'Her hull', 0, 0, 0, [r3(-RIB / 2), r3(-WAY), r3(RIB / 2), 0], shadow=True),
    on_boat('transom', 'Her transom', 0, 2.2, -0.12, [-0.6, -0.85, 0.6, 0.02], facing=180),
    {'id': 'boards', 'name': 'Her floorboards', 'plane': True, 'on': 'boat', 'across': 0, 'distance': 0.3, 'elevation': -0.12,
     'width': 0.7, 'depth': 2.6},
    {'id': 'thwarts', 'name': 'Her thwarts', 'plane': True, 'on': 'boat', 'across': 0, 'distance': 0.6, 'elevation': 0.36,
     'width': 1.5, 'depth': 2.1},
    {'id': 'stern_deck', 'name': 'Her stern deck', 'plane': True, 'on': 'boat', 'across': 0, 'distance': 1.95, 'elevation': 0.46,
     'width': 1.24, 'depth': 0.56, 'uniforms': {'frost': 0}},
    on_boat('mast', 'Her mast', 0, -1.2, -0.15, [-0.7, -3.25, 0.7, 0.02], facing=180, shadow=True),
    {'id': 'tiller', 'name': 'The tiller', 'plane': True, 'on': 'boat', 'across': 0.1, 'distance': 1.95, 'elevation': 0.62,
     'width': 0.08, 'depth': 0.85},
    on_boat('lantern', 'The lantern on the bow', 0, -2.05, 0.72, [-0.12, -0.52, 0.12, 0.16], facing=180),
    on_boat('blanket', 'Mama\'s blanket', -0.24, -0.52, -0.05, [-0.5, -0.78, 0.5, 0.02], facing=180, shadow=True),
    {'id': 'strip', 'name': 'The strip of rime on the water', 'plane': True, 'across': 0.5, 'distance': 47.5,
     'elevation': 0.04, 'width': 7, 'depth': 90, 'uniforms': {'near': 30}, 'inFront': ['sea']},
    {'id': 'isle', 'name': 'The lighthouse\'s island', 'across': ISLE, 'distance': -6000, 'onLand': False,
     'elevation': 0, 'facing': 180, 'box': [-46, -11, 46, 0.7], 'place': {'distance': 'isle_d'}},
    lighthouse,
]
NAMES = {'papa': 'Moominpappa', 'mama': 'Moominmamma', 'troll': 'Moomintroll', 'my': 'Little My', 'groke': 'The Groke', 'fisher': 'The Fisherman'}
for who in ['papa', 'mama', 'troll', 'my']:
    a, d, _ = SEATS[who]
    objects.append({'id': who, 'name': NAMES[who], 'person': {'cast': 'cast', 'who': who, 'does': 'seated'}, 'across': a, 'distance': d,
                    'shadow': True})
objects.append({'id': 'groke', 'name': NAMES['groke'], 'person': {'cast': 'cast', 'who': 'groke', 'does': 'hands_behind'},
                'across': 0.7, 'distance': 34, 'place': {'across': 'groke_a', 'distance': 'groke_d'}})
objects.append({'id': 'fisher', 'name': NAMES['fisher'], 'person': {'cast': 'cast', 'who': 'fisher', 'does': 'hands_behind'},
                'across': ISLE + 6, 'distance': -6000})

STATES = dict(island.STATES)
STATES.update({
    'lantern_at': {'values': ['bow', 'troll', 'out'], 'means': 'the lantern: burning on its bracket at the bow; in the son\'s paws, shining back (its light from his hand); on the bracket, put out'},
    'trail': {'range': [0, 1], 'smooth': True, 'means': 'what follows behind: 0 the strip of rime and the Groke in it far astern (about 50 m) … 1 just behind the stern'},
    'frost_boat': {'range': [0, 1], 'smooth': True, 'means': 'the rime creeping over the stern deck from the transom to the son\'s paws (1 — all of it)'},
    'island': {'values': ['none', 'ahead', 'behind'], 'means': 'where the island is: out of sight (the night crossing); ahead of the bow (dawn — not in this view, which looks aft); astern, seen over the stern (by day, going home)'},
    'heading': {'range': [-1, 1], 'smooth': True, 'means': 'the boat\'s nose off the star (М2): −1 … 1, about 9° either way'},
    'wave': {'range': [0, 1], 'means': 'the swell\'s height (М2): how much her bow lifts and drops'},
    'isle_d': {'type': 'number', 'means': 'the scene\'s own (script.js, from island): the island\'s distance — not set from outside'},
    'groke_a': {'type': 'number', 'means': 'the scene\'s own (script.js, from trail) — not set from outside'},
    'groke_d': {'type': 'number', 'means': 'the scene\'s own (script.js, from trail) — not set from outside'},
    'lantern_bow_on': {'range': [0, 1], 'means': 'the scene\'s own (script.js, from lantern_at) — not set from outside'},
    'lantern_troll_on': {'range': [0, 1], 'means': 'the scene\'s own (script.js, from lantern_at) — not set from outside'},
    'boat_facing': {'type': 'number', 'means': 'the scene\'s own (script.js, from heading) — not set from outside'},
    'boat_pitch': {'type': 'number', 'means': 'the scene\'s own (script.js: the swell) — not set from outside'},
})

state = {**island.STATE, 'lantern_at': 'bow', 'trail': 0.4, 'frost_boat': 0, 'island': 'none', 'heading': 0, 'wave': 0,
         'isle_d': -6000, 'groke_a': 0.7, 'groke_d': 34, 'lantern_bow_on': 1, 'lantern_troll_on': 0, 'boat_facing': 180, 'boat_pitch': 0,
         'camera_x': 1.0, 'camera_z': -4.8, 'camera_h': 1.1, 'camera_yaw': 8, 'camera_look': 0.14, 'fisher_here': False, 'fisher_on': 'isle#step', 'fisher_turn': 180,
         'groke_turn': 180, 'groke_look': 'troll'}
for who, turn, look in [('papa', 180, [0, -40, 2]), ('mama', 165, None), ('troll', 20, 'groke'), ('my', 200, [-3, -12, 4])]:
    state[f'{who}_on'] = {'on': 'boat', 'at': SEATS[who]}
    state[f'{who}_turn'] = turn
    state[f'{who}_look'] = look
state.update({'papa_mood': 'smile', 'mama_mood': 'tired', 'troll_mood': 'afraid', 'my_mood': 'smile'})

lights = island.lights(([-150, 40], '#ffe6c8', 1.4), ([100, 8], '#ffe0c2', 1.35), [-100, 5], [-40, 25])
lights += [
    {'id': 'bow_lantern', 'of': 'lantern#flame', 'on': 'lantern_bow_on', 'color': '#ffcf88', 'strength': 1.3, 'reach': 5, 'glow': 0.25, 'flicker': 0.05},
    {'id': 'troll_lantern', 'at': 'troll#hand_r', 'on': 'lantern_troll_on', 'color': '#ffcf88', 'strength': 1.3, 'reach': 5, 'glow': 0.25, 'flicker': 0.05},
]

old = {}
try:
    old = json.load(open(folder + '/scene.json', encoding='utf-8'))
except FileNotFoundError:
    pass
spec = {
    'engine': 3,
    'title': 'The Open Sea',
    'caption': 'The boat goes on through the night. Behind the stern, a white strip on the water.',
    'horizon': 0.48,
    'camera': {'mode': 'picture', 'on': 'boat'},
    'light': island.light(WIND),
    'lights': lights,
    'modules': ['cast', 'island'],
    'objects': objects,
    'state': state,
    'states': STATES,
    'music': old.get('music') or {
        'prompts': [
            {'text': 'Wind chimes and low synth pad, a small boat on the open sea at night, the moon on the water', 'weight': 1.0},
            {'text': 'Solo cello, long low phrases, something following far behind a boat in the dark, restrained', 'weight': 0.8},
            {'text': 'Glassy harmonium drones with the hiss of water along a hull, slow and wide, almost still', 'weight': 0.8},
            {'text': 'Sparse felt piano, three notes and a long pause, cold clear night air, gentle unease', 'weight': 0.5},
            {'text': 'Low drone of a foghorn-like brass note under thin high violins, a cold presence on the water', 'weight': 0.4},
            {'text': 'Solo nylon-string guitar picking a slow, plain northern folk tune, close and intimate, sea wind behind it', 'weight': 0},
            {'text': 'Soft accordion holding long quiet chords, a little out of breath, dawn over a calm sea', 'weight': 0},
            {'text': 'Music box playing a lullaby slightly out of tune, a mother asleep in a boat', 'weight': 0},
            {'text': 'Kantele plucked softly, open fifths, Nordic folk, bright and bare', 'weight': 0},
            {'text': 'Brushed snare and upright bass, a slow cheerful waltz, a family on a boat trip', 'weight': 0},
            {'text': 'Whistled melody over a ukulele, light-hearted, a proud father steering by a star', 'weight': 0},
            {'text': 'Strings swelling slowly into a wide open chord, the sea and the sky, hopeful and sad at once', 'weight': 0},
            {'text': 'Children\'s choir humming wordlessly, very far off, a memory of a valley', 'weight': 0},
            {'text': 'A celesta and a flute, morning on the sea, a lighthouse falling behind the stern', 'weight': 0},
            {'text': 'Tin whistle and frame drum, a swell getting up, restless', 'weight': 0},
        ],
        'bpm': 66, 'density': 0.25, 'brightness': 0.4, 'scale': 'D_MAJOR_B_MINOR'},
}
island.shaders(folder)
json.dump(spec, open(folder + '/scene.json', 'w', encoding='utf-8', newline='\n'), ensure_ascii=False, indent=2)
print('rib', r3(RIB), 'way', WAY)
