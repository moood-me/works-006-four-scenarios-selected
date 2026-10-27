# Writes scenes/landing/scene.json: the landing rocks — its elements and where they stand, its light by the hour (the
# island's: tools/island.py), its people. Run from the world's root: python tools/landing.py .
import json, sys
sys.path.insert(0, sys.argv[1] + '/tools')
import island

root = sys.argv[1]
folder = root + '/scenes/landing'
old = json.load(open(folder + '/scene.json', encoding='utf-8'))

WIND = [0.6, -1, 0.9]
TOWER = (10, 33)


def el(id, name, a, d, box=None, **k):
    o = {"id": id, "name": name, "across": a, "distance": d}
    o.update(k)
    if box: o["box"] = box
    return o


objects = [
    island.sky(0.64, (-0.35, 0.42), -0.15, 1.95),
    island.sea(-1.3, {"strength": 0.18, "fade": 0, "rough": 0.55, "ripple": 0.4}),
    el("cape", "The Fisherman's cape", -95, 230, [-61, -5, 31, 0.5], elevation=-1.35, onLand=False),
    {"id": "granite", "name": "The island's granite", "plane": True, "drape": True, "across": 2, "distance": 17.5, "width": 64, "depth": 66},
    island.lighthouse(TOWER[0], TOWER[1]),
    el("steps", "Steps to the lighthouse door", TOWER[0], 30.3, [-0.8, -0.55, 0.8, 0.05]),
    el("arrow_stone", "The stone with the arrow", 7.7, 28.5, [-0.45, -0.45, 0.45, 0.05], shadow=True),
    {"id": "pines", "name": "Island pines", "box": [-1.9, -3.75, 1.75, 0.1], "shadow": True,
     "copies": [{"across": 6.5, "distance": 27.5}, {"across": 13.6, "distance": 30, "scale": 0.85, "flip": True},
                {"across": 4.5, "distance": 22.5, "scale": 0.7}, {"across": 14.5, "distance": 35.5, "scale": 1.1},
                {"across": 7.1, "distance": 36.5, "scale": 0.9, "flip": True}, {"across": -12.5, "distance": 19, "scale": 0.75, "flip": True}],
     "across": 6.5, "distance": 27.5},
    el("boat", "The boat Adventure", -3.9, 8.6, [-1.95, -2.85, 2.45, 0.2], facing=195, shadow=True),
    el("stones", "Loose stones", 0, 0, [-0.5, -0.3, 0.5, 0.05], shadow=True),
    el("boulder", "Boulder", -2.65, 4.4, [-1.6, -0.74, 1.6, 0], shadow=True),
    el("bundle", "Bundle of blankets", -1.3, 3.4, [-1.15, -0.56, 1.15, 0], shadow=True),
    el("handbag", "Moominmamma's handbag", -0.55, 3.75, [-0.25, -0.4, 0.25, 0.03], facing=200, shadow=True),
    el("can", "The paraffin can", 1.3, 4.1, [-0.2, -0.55, 0.2, 0.03], facing=165, shadow=True),
    {"id": "papa", "name": "Moominpappa", "person": {"cast": "cast", "who": "papa", "does": "hands_behind"}, "across": 0.45, "distance": 3.4},
    {"id": "mama", "name": "Moominmamma", "person": {"cast": "cast", "who": "mama", "does": "seated"}, "across": -1.3, "distance": 3.35},
    {"id": "troll", "name": "Moomintroll", "person": {"cast": "cast", "who": "troll", "does": "seated"}, "across": -2.65, "distance": 4.4},
]

state = {**island.STATE, "dawn": 1,
         "papa_look": [-3, -2, 1.6], "papa_mood": "smile", "papa_turn": 215,
         "mama_on": [-1.3, 3.4, 0.4], "mama_look": [3, 1, 1.3], "mama_mood": "smile", "mama_turn": 150,
         "troll_on": [-2.65, 4.4, 0.5], "troll_look": [-6, 0, 0.8], "troll_mood": "thinking", "troll_turn": 240}

spec = {
    "engine": 3,
    "title": "The Landing Rocks",
    "caption": "Dawn on the island. The lighthouse is dark, and the door is locked.",
    "horizon": 0.52,
    "camera": {"mode": "picture"},
    "light": island.light(WIND),
    "lights": island.lights(([-140, 42], "#ffe6c8", 1.45), ([-125, 15], "#ffe0c2", 1.35), [100, 4], [-30, 25]),
    "modules": ["cast", "island"],
    "objects": objects,
    "state": state,
    "states": dict(island.STATES),
    "music": old["music"],
}
island.shaders(folder)
json.dump(spec, open(folder + '/scene.json', 'w', encoding='utf-8', newline='\n'), ensure_ascii=False, indent=2)
