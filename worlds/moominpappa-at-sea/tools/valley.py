"""Writes scenes/valley/scene.json: the numbers that come from the land and the house (lib.js has the same land and
profile — change them in both and run this). The trees on the hills are laid out here, seeded, so they stay put.
    python tools/valley.py
"""
import json
import math
import os
import random
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import lantern  # noqa: E402

HERE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'scenes', 'valley')

# --- the land, as lib.js has it
WATER, BEACH, STREAM_A = -0.45, -0.32, -4.6
SHORE = [7, 8.4, 13, 15]


def sm(x, a, b):
    t = max(0.0, min(1.0, (x - a) / (b - a)))
    return t * t * (3 - 2 * t)


def bump(a, d, ca, cd, ra, rd):
    x, z = (a - ca) / ra, (d - cd) / rd
    return math.exp(-(x * x + z * z))


def coast(a, d):
    return -(a + 0.9 * math.sin(d * 0.13) + 0.5 * math.sin(d * 0.05 + 1))


def land(a, d):
    h = (0.25 * bump(a, d, 7.5, 18, 7, 6) + 6.5 * sm(d, 38, 100) * sm(a, -6, 20)
         + 3.8 * sm(d, 75, 140) * (1 - sm(a, -6, 20)) + 1.4 * bump(a, d, -4, 40, 9, 7))
    x = (a - STREAM_A) / 0.95
    k = math.exp(-x * x) * (1 - sm(d, 29, 33))
    h = h * (1 - k) - 0.85 * k
    s = coast(a, d)
    b = sm(s, SHORE[0], SHORE[1])
    beach = BEACH - 1.3 * sm(s, SHORE[2], SHORE[3])
    return h * (1 - b) + beach * b


# --- the house's profile (lib.js HOUSE)
PROFILE = [[0, 10.3], [0.1, 10.2], [0.1, 9.6], [0.35, 9.5], [3.35, 6.75], [3.02, 6.66], [2.9, 6.6], [2.9, 0.22], [3.06, 0.16], [3.06, 0]]
LEN = sum(math.hypot(PROFILE[i][0] - PROFILE[i - 1][0], PROFILE[i][1] - PROFILE[i - 1][1]) for i in range(1, len(PROFILE)))
ROUND = 2 * math.pi * 2.9
HOUSE = [8.2, 19.5]
FLOOR = 0.72
FOOT = FLOOR - 0.58  # the veranda's skirt and steps reach down to here (their paintings are 0.58 m to the floor)
GROKE = [-10.6, 36]
FROST = [-11.3, 36]

r3 = lambda v: round(v, 3)


def on_land(a, d, absolute):
    """an element on the land whose foot must be at an absolute height: its elevation over the land there"""
    return r3(absolute - land(a, d))


def box(*b):
    return [r3(v) for v in b]


def card(id, name, a, d, b, **kw):
    o = {'id': id, 'name': name, 'across': a, 'distance': d}
    o.update(kw)
    o['box'] = box(*b)
    return o


rnd = random.Random(20261027)


def scatter(n, a0, a1, d0, d1, keep, smin, smax):
    out = []
    while len(out) < n:
        a, d = a0 + (a1 - a0) * rnd.random(), d0 + (d1 - d0) * rnd.random() ** 0.8
        if not keep(a, d):
            continue
        c = {'across': r3(a), 'distance': r3(d), 'scale': r3(smin + (smax - smin) * rnd.random())}
        if rnd.random() < 0.5:
            c['flip'] = True
        out.append(c)
    return out


def hills(a, d):
    # on the land (not the beach or the sea), not before the house, not in the line from the eye to the Groke
    if coast(a, d) > SHORE[0] - 0.5:
        return False
    if abs(a / d - GROKE[0] / GROKE[1]) < 0.06 and d < 60:
        return False
    return True


spruces = scatter(48, -8, 90, 40, 170, hills, 0.75, 1.3) + scatter(10, -9, -5, 85, 160, hills, 0.8, 1.2) \
    + [{'across': -6.2, 'distance': 41, 'scale': 0.8}, {'across': -2.2, 'distance': 43.5, 'scale': 0.9, 'flip': True},
       {'across': -8.4, 'distance': 45, 'scale': 0.75}]
oaks = scatter(22, -4, 70, 34, 120, hills, 0.7, 1.2) + [{'across': -3.8, 'distance': 38.5, 'scale': 0.7}]
birches = [{'across': -6.3, 'distance': 13.5, 'scale': 1.0}, {'across': -6.9, 'distance': 20, 'scale': 1.1},
           {'across': -6.0, 'distance': 27.5, 'scale': 0.9, 'flip': True}, {'across': -1.2, 'distance': 34, 'scale': 1.0},
           {'across': 13.8, 'distance': 26, 'scale': 1.1, 'flip': True}] + scatter(10, 0, 60, 40, 110, hills, 0.8, 1.2)

STATES = {
    'dawn': {'range': [0, 1], 'smooth': True, 'means': 'the morning light (a look): 0 none … 1 early morning, rose from the right'},
    'dusk': {'range': [0, 1], 'smooth': True, 'means': 'the evening light (a look): 0 none … 1 golden evening, the low sun from the left'},
    'night': {'range': [0, 1], 'smooth': True, 'means': 'the night (a look): 0 none … 1 a clear moonlit night, light enough to read faces; day is dawn, dusk and night all 0'},
    'moon': {'range': [0, 1], 'means': 'the moon\'s phase: 0 a thin new crescent … 1 full (seen at night)'},
    'lamps': {'range': [0, 1], 'smooth': True, 'means': 'the lamps lit: the paraffin lamp on the veranda table and the house\'s front window'},
    'moss': {'values': ['green', 'smoulder', 'burnt'], 'means': 'the moss under the apple tree: green; a little fire smouldering in it (grey smoke, an ember); put out — a small black spot'},
    'smoke': {'range': [0, 1], 'smooth': True, 'means': 'while the moss smoulders: how far the ladle has turned its grey smoke to white steam (М1)'},
    'smoke_grey': {'range': [0, 1], 'smooth': True, 'means': 'the scene\'s own (script.js, from moss and smoke): the grey smoke\'s share — not set from outside'},
    'smoke_white': {'range': [0, 1], 'smooth': True, 'means': 'the scene\'s own (script.js, from moss and smoke): the white steam\'s share — not set from outside'},
    'frost': {'range': [0, 1], 'smooth': True, 'means': 'the Groke\'s frost on the beach: 0 none … 0.4 the rime round her at its widest … 1 her white track down to the water'},
    'candles': {'values': ['shelf', 'basket'], 'means': 'where the candles are: on the shelf by the door, or packed in the basket (the insert)'},
    'paints': {'type': 'boolean', 'means': 'Mama\'s box of paints on top in the basket (the insert)'},
    'chart': {'range': [0, 1], 'smooth': True, 'means': 'the insert: Papa\'s chart on the table under the lamp, close (0 closed … 1 open); its point chart#island'},
    'basket': {'range': [0, 1], 'smooth': True, 'means': 'the insert: Mama\'s basket packed, from above (0 closed … 1 open)'},
    'lantern_bow': {'range': [0, 1], 'smooth': True, 'means': 'the lantern on the boat\'s bow lit'},
    'jam': {'range': [0, 1], 'smooth': True, 'means': 'the pieces\': the jam cooking on the veranda stove — its fire, its steam'},
    'luggage': {'range': [0, 1], 'smooth': True, 'means': 'the pieces\': the basket, the bundle and the can waiting on the jetty'},
    'packed': {'range': [0, 5], 'means': 'the pieces\' (basket): how much is in the basket — 1 the hat, 2 the notebook, 3 the sweater, 4 the jar under it, 5 the paints on top (only with the play\'s paints)'},
    'beat': {'type': 'string', 'means': 'the piece playing (modules/beats): the game names it'},
    'beat_next': {'type': 'string', 'means': 'the piece the game will name next (modules/beats: its cut made ready)'},
    'boat_a': {'type': 'number', 'means': 'the pieces\' (push_off): where the boat is, across (moored: −15.4)'},
    'boat_d': {'type': 'number', 'means': 'the pieces\' (push_off): where the boat is, distance (moored: 22.85)'},
}

objects = [
    {'id': 'sky', 'name': 'The valley sky', 'sky': True, 'uniforms': {'dusk': 0, 'night': 0, 'dawn': 0}},
    {'id': 'moon', 'name': 'The moon', 'sky': True, 'box': [0.45, 0.1, 0.59, 0.24]},
    {'id': 'sea', 'name': 'The sea', 'plane': True, 'across': -754.5, 'distance': 1500, 'elevation': WATER, 'width': 1491, 'depth': 3000,
     'reflect': {'strength': 0.25, 'fade': 0, 'rough': 0.5, 'ripple': 0.35}},
    {'id': 'meadow', 'name': 'The valley\'s land', 'plane': True, 'drape': True, 'across': 149, 'distance': 130, 'width': 330, 'depth': 260},
    {'id': 'stream', 'name': 'The stream', 'plane': True, 'across': STREAM_A, 'distance': 16, 'elevation': WATER, 'width': 2.4, 'depth': 32,
     'reflect': {'strength': 0.3, 'fade': 4, 'rough': 0.25, 'ripple': 0.3}},
    {'id': 'moss', 'name': 'The moss under the apple tree', 'plane': True, 'across': 0.05, 'distance': 9.05,
     'elevation': r3(land(0.05, 9.05) + 0.02), 'width': 1.4, 'depth': 1.0},
    {'id': 'frost', 'name': 'The Groke\'s frost', 'plane': True, 'across': FROST[0], 'distance': FROST[1], 'elevation': r3(BEACH + 0.05),
     'width': 3.8, 'depth': 2.6, 'uniforms': {'ring': 0, 'track': 0, 'gx': r3(GROKE[0] - FROST[0]), 'gy': r3(FROST[1] - GROKE[1])}},
    card('rime', 'Rime on the dune grass', GROKE[0], r3(GROKE[1] - 0.45), [-1.2, -0.5, 1.2, 0.03], onLand=False, elevation=BEACH,
         facing=180, uniforms={'ring': 0}),
    card('house', 'The Moomins\' house', HOUSE[0], HOUSE[1], [-ROUND / 2, -LEN, ROUND / 2, 0], facing=180, shadow=True),
    card('window_lit', 'The lit window', HOUSE[0], r3(HOUSE[1] - 2.9 - 0.03), [-0.36, -1.05, 0.36, 0.05],
         elevation=on_land(HOUSE[0], HOUSE[1] - 2.93, land(*HOUSE) + 3.15), facing=180, glows=True),
    {'id': 'veranda', 'name': 'The veranda\'s floor', 'plane': True, 'across': 7.4, 'distance': 15.3, 'elevation': FLOOR,
     'width': 4.6, 'depth': 2.6, 'walk': True},
    card('rail', 'The veranda\'s front', 7.4, 14.0, [-2.4, -1.3, 2.4, 0.05], elevation=on_land(7.4, 14.0, FOOT), facing=180, shadow=True),
    {'id': 'rail_side', 'name': 'The veranda\'s ends', 'box': [-1.4, -1.3, 1.4, 0.05], 'shadow': True, 'across': 5.1, 'distance': 15.3,
     'copies': [{'across': 5.1, 'distance': 15.3, 'facing': 270, 'elevation': on_land(5.1, 15.3, FOOT)},
                {'across': 9.7, 'distance': 15.3, 'facing': 90, 'elevation': on_land(9.7, 15.3, FOOT)}]},
    card('steps', 'The veranda\'s steps', 7.0, 13.85, [-0.5, -0.65, 0.5, 0.05], elevation=on_land(7.0, 13.85, FOOT), facing=180),
    card('table', 'The veranda table', 7.2, 15.2, [-0.7, -0.56, 0.7, 0.03], onLand=False, elevation=FLOOR, facing=180, shadow=True),
    card('lamp', 'The paraffin lamp', 7.15, 15.25, [-0.12, -0.48, 0.12, 0.02], onLand=False, elevation=r3(FLOOR + 0.5), facing=180),
    card('jars', 'Jars of jam', 6.82, 15.15, [-0.2, -0.2, 0.2, 0.02], onLand=False, elevation=r3(FLOOR + 0.5), facing=180),
    card('stove', 'The little stove and the jam pan', 5.5, 14.45, [-0.32, -0.66, 0.5, 0.03], onLand=False, elevation=FLOOR, facing=180,
         shadow=True),
    {'id': 'chairs', 'name': 'The veranda chairs', 'box': [-0.28, -0.82, 0.28, 0.03], 'onLand': False, 'shadow': True,
     'across': 7.2, 'distance': 16.02, 'elevation': FLOOR,
     'copies': [{'across': 7.2, 'distance': 16.02, 'facing': 180, 'elevation': FLOOR},
                {'across': 6.12, 'distance': 15.2, 'facing': 135, 'elevation': FLOOR},
                {'across': 8.28, 'distance': 15.2, 'facing': 225, 'elevation': FLOOR}]},
    card('stool', 'Little My\'s stool', 6.65, 14.48, [-0.22, -0.56, 0.22, 0.03], onLand=False, elevation=FLOOR, facing=180, shadow=True),
    card('shelf', 'The shelf by the door', 9.3, 16.75, [-0.5, -0.45, 0.5, 0.2], elevation=on_land(9.3, 16.75, FLOOR + 0.9), facing=158),
    card('apple', 'The old apple tree', -0.6, 9.2, [-2.5, -4.7, 2.5, 0.1], shadow=True),
    {'id': 'orchard', 'name': 'Young apple trees', 'box': [-1.4, -3.4, 1.4, 0.1], 'shadow': True, 'across': -2.8, 'distance': 19.5,
     'copies': [{'across': -2.8, 'distance': 19.5, 'scale': 0.9}, {'across': 11.6, 'distance': 11.2, 'flip': True},
                {'across': 3.6, 'distance': 23.0, 'scale': 0.85}, {'across': 13.5, 'distance': 18.0, 'scale': 0.95}]},
    {'id': 'lilacs', 'name': 'Lilac bushes', 'box': [-1.5, -2.2, 1.5, 0.1], 'shadow': True, 'across': 4.6, 'distance': 18.4,
     'copies': [{'across': 4.6, 'distance': 18.4}, {'across': 11.3, 'distance': 17.0, 'flip': True}, {'across': 5.2, 'distance': 21.2, 'scale': 0.9}]},
    {'id': 'birches', 'name': 'Birches', 'box': [-1.6, -7.4, 1.6, 0.1], 'shadow': True, 'across': -6.3, 'distance': 13.5, 'copies': birches},
    {'id': 'oaks', 'name': 'Leafy trees on the hills', 'box': [-4.2, -8.8, 4.2, 0.1], 'across': 20, 'distance': 60, 'copies': oaks},
    {'id': 'spruces', 'name': 'Spruces on the hills', 'box': [-2.3, -10.2, 2.3, 0.1], 'across': 30, 'distance': 80, 'copies': spruces},
    card('bridge', 'The footbridge', STREAM_A, 8.0, [-1.7, -1.1, 1.7, 0.3], onLand=False, elevation=0, facing=180, shadow=True),
    {'id': 'jetty', 'name': 'The jetty', 'plane': True, 'across': -14.0, 'distance': 24.0, 'elevation': -0.15, 'width': 4.6, 'depth': 1.1, 'walk': True},
    {'id': 'posts', 'name': 'The jetty\'s posts', 'box': [-0.1, -1.25, 0.1, 0.02], 'onLand': False, 'across': -11.9, 'distance': 23.5,
     'elevation': -0.95,
     'copies': [{'across': a, 'distance': d, 'elevation': -0.95} for a, d in [(-11.9, 23.5), (-14.0, 23.5), (-16.15, 23.5), (-16.15, 24.5), (-14.0, 24.5)]]},
    card('boat', 'The boat Adventure', -15.4, 22.85, [-2.1, -2.75, 2.0, 0.45], onLand=False, elevation=WATER, facing=180, shadow=True,
         place={'across': 'boat_a', 'distance': 'boat_d'}),
    lantern.element('boat_lantern', 'The lantern on the bow', 1.705, -0.02, 1.08, bracket=True, on='boat', facing=180),
    card('luggage', 'The luggage on the jetty', -13.75, 23.7, [-0.6, -0.6, 0.6, 0.03], onLand=False, elevation=-0.15, facing=180, shadow=True),
    {'id': 'tufts', 'name': 'Tall grass near', 'box': [-0.45, -0.9, 0.45, 0.05], 'across': -2.0, 'distance': 4.6,
     'copies': [{'across': a, 'distance': d, 'scale': s} for a, d, s in
                [(-2.0, 4.6, 1.0), (-1.1, 5.4, 0.9), (2.2, 4.9, 1.1), (3.1, 5.8, 0.9), (-2.9, 6.2, 1.0),
                 (4.4, 5.2, 1.0), (-0.3, 4.4, 0.9), (5.4, 6.8, 0.9), (-2.4, 7.4, 0.85)]]},
    {'id': 'smoke_grey', 'particles': {'kind': 'smoke', 'at': 'moss#fire', 'amount': 'smoke_grey', 'rate': 12, 'size': [0.12, 0.9],
                                       'speed': [0.25, 0.45], 'life': [3, 5], 'color': '#7d7770', 'opacity': 0.8}},
    {'id': 'steam', 'particles': {'kind': 'smoke', 'at': 'moss#fire', 'amount': 'smoke_white', 'rate': 12, 'size': [0.12, 0.9],
                                  'speed': [0.3, 0.5], 'life': [2, 4], 'color': '#f6f5f0', 'opacity': 0.8}},
    {'id': 'jam_steam', 'particles': {'kind': 'smoke', 'at': 'stove#pan', 'amount': 'jam', 'rate': 3, 'size': [0.05, 0.35],
                                      'speed': [0.15, 0.3], 'life': [2, 3], 'color': '#f2f0ea', 'opacity': 0.3}},
    {'id': 'chart', 'name': 'Papa\'s chart on the table, close', 'insert': 'chart'},
    {'id': 'basket', 'name': 'Mama\'s basket, packed', 'insert': 'basket', 'iris': [0.889, 0.5, 0.62, 0.44]},
]
# where they stand as the scene opens (as in the piece `garden`; each piece puts them where it begins)
for who, does, a, d in [('papa', 'hands_behind', 1.5, 8.6), ('mama', 'hands_behind', 6.2, 14.55), ('troll', 'sit_look', -3.45, 10.2),
                        ('my', 'sit_look', -3.35, 11.5), ('groke', 'hands_behind', GROKE[0], GROKE[1])]:
    objects.append({'id': who, 'across': a, 'distance': d, 'name': {'papa': 'Moominpappa', 'mama': 'Moominmamma', 'troll': 'Moomintroll', 'my': 'Little My', 'groke': 'The Groke'}[who],
                    'person': {'cast': 'cast', 'who': who, 'does': does}, 'place': {'across': f'{who}_a', 'distance': f'{who}_d'},
                    'shadow': True})

for who in ['papa', 'mama', 'troll', 'my', 'groke']:
    STATES[f'{who}_a'] = {'type': 'number', 'means': f"the pieces': where {who} stands, across (lib.js PLACES)"}
    STATES[f'{who}_d'] = {'type': 'number', 'means': f"the pieces': where {who} stands, distance (lib.js PLACES)"}

spec = {
    'engine': 3,
    'title': 'Moominvalley',
    'caption': 'The end of August in the valley. Everything is already done.',
    'horizon': 0.56,
    'camera': {'mode': 'picture'},
    'light': {'ambient': 0.78, 'ambientColor': '#f1eee6', 'bounce': 0.55, 'haze': 0.08, 'hazeColor': '#dbe3e6', 'hazeGlow': 0,
              'shafts': 0, 'tint': '#f6e6cc', 'tintStrength': 0.04, 'vignette': 0.2, 'grain': 0.07, 'wind': [0.5, -1, 0.5],
              'saturation': 1.05,
              'looks': {
                  'dawn': {'ambient': 0.72, 'ambientColor': '#eadfee', 'tint': '#f4c8c0', 'tintStrength': 0.07, 'haze': 0.09,
                           'hazeColor': '#ecd8d8', 'lights': {'sun': 0.2}},
                  'dusk': {'ambient': 0.82, 'ambientColor': '#ffe4c8', 'tint': '#ffb98a', 'tintStrength': 0.07, 'haze': 0.07,
                           'hazeColor': '#f4d4b4', 'saturation': 1.1, 'brightness': 1.06, 'lights': {'sun': 0}},
                  'night': {'ambient': 0.42, 'ambientColor': '#8797cc', 'tint': '#5a6aaa', 'tintStrength': 0.08, 'saturation': 0.8,
                            'haze': 0.07, 'hazeColor': '#3c4a74', 'hazeGlow': 0.6, 'lights': {'sun': 0, 'evening': 0, 'morning': 0}},
              }},
    'lights': [
        {'id': 'sun', 'from': [-140, 38], 'color': '#fff1dc', 'strength': 1.25},
        {'id': 'evening', 'from': [-100, 9], 'color': '#ffc88e', 'strength': 1.8, 'on': 'dusk'},
        {'id': 'morning', 'from': [95, 10], 'color': '#ffd9cc', 'strength': 1.25, 'on': 'dawn'},
        {'id': 'moon', 'from': 'moon#disc', 'color': '#cdd8f2', 'strength': 1.0, 'on': 'night'},
        {'id': 'lamp', 'of': 'lamp#flame', 'color': '#ffcf88', 'strength': 1.4, 'reach': 5, 'on': 'lamps', 'glow': 0.25, 'flicker': 0.05},
        {'id': 'window', 'of': 'window_lit#glow', 'color': '#ffcf88', 'strength': 0.7, 'reach': 5, 'on': 'lamps'},
        {'id': 'stove_fire', 'of': 'stove#fire', 'color': '#ff9c4a', 'strength': 0.5, 'reach': 1.2, 'on': 'jam', 'flicker': 0.3},
        {'id': 'ember', 'of': 'moss#ember', 'color': '#ff8a3a', 'strength': 0.7, 'reach': 1.2, 'on': 'smoke_grey', 'flicker': 0.4},
        {'id': 'bow_lantern', 'of': 'boat_lantern#flame', 'color': '#ffcf88', 'strength': 1.0, 'reach': 4, 'on': 'lantern_bow', 'glow': 0.3,
         'flicker': 0.05},
    ],
    'modules': ['cast', 'chart', 'beats', 'lantern'],
    'objects': objects,
    'state': {'dawn': 0, 'dusk': 0, 'night': 0, 'moon': 0.2, 'lamps': 0, 'moss': 'green', 'smoke': 0, 'smoke_grey': 0,
              'smoke_white': 0, 'frost': 0, 'candles': 'shelf', 'paints': False, 'chart': 0, 'basket': 0, 'lantern_bow': 0, 'jam': 1,
              'luggage': 0, 'packed': 5, 'boat_a': -15.4, 'boat_d': 22.85},
    'states': STATES,
    'music': {
        'prompts': [
            {'text': 'Solo nylon-string guitar picking a slow, plain northern folk tune, a warm late-summer evening in a garden', 'weight': 1.0},
            {'text': 'Soft accordion holding long quiet chords, a little out of breath, a Finnish summer evening by the shore', 'weight': 0.9},
            {'text': 'A celesta and a flute, a garden at the end of August, bees and apples, warm and a little sad', 'weight': 0.8},
            {'text': 'Children\'s choir humming wordlessly, very far off, a memory of a valley', 'weight': 0.5},
            {'text': 'A small clarinet melody, wistful and a little comic, like a story told to a child, over a bowed double bass', 'weight': 0.5},
            {'text': 'Sparse felt piano, three notes and a long pause, evening light on a veranda, gentle melancholy', 'weight': 0.4},
            {'text': 'Music box playing a lullaby slightly out of tune, far away, nostalgic', 'weight': 0},
            {'text': 'Solo cello, long low phrases, a father restless in a garden where everything is done', 'weight': 0},
            {'text': 'Kantele plucked softly, open fifths, Nordic folk, bright and bare', 'weight': 0},
            {'text': 'Brushed snare and upright bass, a slow cheerful waltz, a family on a boat trip', 'weight': 0},
            {'text': 'Whistled melody over a ukulele, light-hearted, a proud father setting out on an adventure', 'weight': 0},
            {'text': 'Strings swelling slowly into a wide open chord, the sea and the sky, hopeful and sad at once', 'weight': 0},
            {'text': 'Crickets and a ticking clock under a single sustained harmonium note, night on a veranda, a map under a lamp', 'weight': 0},
            {'text': 'Low drone of a foghorn-like brass note under thin high violins, something cold far off on the shore', 'weight': 0},
            {'text': 'Glassy harmonium drones with the hiss of waves on sand, slow and wide, almost still', 'weight': 0},
            {'text': 'Tin whistle and frame drum, packing for a journey, eager and a little hurried', 'weight': 0},
        ],
        'bpm': 72, 'density': 0.3, 'brightness': 0.55, 'scale': 'D_MAJOR_B_MINOR'},
}

lantern.shader(HERE, 'boat_lantern')
with open(os.path.join(HERE, 'scene.json'), 'w', encoding='utf-8') as f:
    f.write(json.dumps(spec, indent=2, ensure_ascii=False) + '\n')
print('house', r3(LEN), r3(ROUND), 'trees', len(spruces), len(oaks), len(birches))
