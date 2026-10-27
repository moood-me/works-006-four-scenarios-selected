# Writes scenes/middle/scene.json: the middle of the island (С7) — its elements and where they stand, its light by the
# hour (the island's: tools/island.py), its people, its keys. Run from the world's root: python tools/middle.py .
# The lib's numbers (the pool's water level, the creeping pines) are read from scenes/middle/lib.js itself (node).
import json, subprocess, sys
sys.path.insert(0, sys.argv[1] + '/tools')
import island

root = sys.argv[1]
folder = root + '/scenes/middle'
land = json.load(open(root + '/scenes/landing/scene.json', encoding='utf-8'))
WIND = [0.6, -1, 0.7]
LIB = json.loads(subprocess.check_output(['node', '-e', """
const fs = require('fs');
const bump = (a, d, ca, cd, ra, rd) => { const x = (a - ca) / ra, z = (d - cd) / rd; return Math.exp(-(x * x + z * z)); };
const L = new Function('kit', fs.readFileSync(process.argv[1] + '/lib.js', 'utf8'))({ island: { bump, shoreOf: () => null } });
const ground = (a, d) => L.land(a, d);
console.log(JSON.stringify({ SEA: L.SEA, POOL: L.POOL, RING: L.RING, ROCK: L.ROCK, TOWER: L.LIGHTHOUSE, PINES: L.PINES,
  rope: L.POOL.level - ground(4.75, 8.95) }));
""", folder]))
POOL, RING, ROCK, TOWER = LIB['POOL'], LIB['RING'], LIB['ROCK'], LIB['TOWER']
r3 = lambda v: round(v, 3)
w = {"Solo nylon-string guitar picking a slow, plain northern folk tune, close and intimate, sea wind behind it": 0.8,
     "Kantele plucked softly, open fifths, Nordic folk, bright and bare": 1.0,
     "Low drone of a foghorn-like brass note under thin high violins, a dark lighthouse, waiting": 0.5,
     "Sparse felt piano, three notes and a long pause, cold clear morning air, gentle melancholy": 0.4}
music = {**land['music'], "prompts": [{"text": p["text"], "weight": w.get(p["text"], 0)} for p in land['music']["prompts"]],
         "bpm": 66, "density": 0.25, "brightness": 0.5}


def el(id, name, a, d, box=None, **k):
    o = {"id": id, "name": name, "across": a, "distance": d}
    o.update(k)
    if box: o["box"] = box
    return o


def person(id, name, who, a, d, **k):
    return {"id": id, "name": name, "person": {"cast": "cast", "who": who}, "across": a, "distance": d, **k}


PINE = [-1.9, -3.75, 1.75, 0.1]
objects = [
    island.sky(0.62, (1.2, 0.35), -0.2, 1.95),
    island.sea(LIB['SEA'], {"strength": 0.2, "fade": 0, "rough": 0.55, "ripple": 0.4}),
    {"id": "ground", "name": "The island's middle", "plane": True, "drape": True, "across": 3, "distance": 30, "width": 100, "depth": 100},
    {"id": "pool", "name": "The black pool", "plane": True, "across": POOL['a'], "distance": POOL['d'], "elevation": r3(POOL['level']),
     "width": 4.8, "depth": 4.8, "reflect": {"strength": 0.3, "fade": 0, "rough": 0.08, "ripple": 0.15}},
    el("rock", "The rock at the pool's lip", ROCK['a'], ROCK['d'], [-1.9, -0.8, 1.9, 0], shadow=True),
    el("coil", "The rope coiled on the rock", ROCK['a'], ROCK['d'], [-0.25, -0.2, 0.25, 0.05], elevation=0.6),
    el("rope", "The rope let down into the pool", 4.75, 8.95, [-0.4, -0.85, 0.7, 0.1], elevation=r3(LIB['rope'])),
    el("ring", "The son's ring of stones", RING['a'], RING['d'], [-1.1, -0.3, 1.1, 0.05], shadow=True),
    island.lighthouse(TOWER['a'], TOWER['d']),
    el("steps", "Steps to the lighthouse door", TOWER['a'], TOWER['d'] - 2.6, [-0.8, -0.55, 0.8, 0.05]),
    {"id": "pines", "name": "Island pines", "box": PINE, "shadow": True, "across": -2, "distance": 38,
     "copies": [{"across": a, "distance": d, "scale": s, "flip": f} for a, d, s, f in
                [(-2, 38, 1, False), (9, 40, 0.9, True), (11.5, 34, 1.1, False), (-6.5, 30, 0.85, True), (14, 27, 1, False),
                 (-12, 24, 1.15, False), (17, 20, 0.9, True), (-15, 16, 1, True), (7.5, 50, 0.8, False), (0.5, 47, 0.9, True)]]},
] + [
    {"id": f"pine{k + 1}", "name": f"A creeping pine ({k + 1})", "code": "e.kit.island.pine(g, e);", "box": PINE, "shadow": True,
     "across": a, "distance": d, "place": {"across": f"pine{k + 1}_a", "distance": f"pine{k + 1}_d"}}
    for k, (a, d) in enumerate(LIB['PINES'])
] + [
    person("troll", "Moomintroll", "troll", -1.3, 7.6),
    person("papa", "Moominpappa", "papa", 5.1, 10),
    person("mama", "Moominmamma", "mama", 1.2, 12.5),
    person("my", "Little My", "my", -5.5, 8.5),
    island.RAIN,
]

lights = island.lights(([150, 45], "#fff0dc", 1.35), ([-90, 12], "#ffe0c2", 1.3), [100, 5], [-30, 25])

# the empty play: the day, the clearing without its ring, no rope, the pines where they stood; only the son here (the
# game says who is)
state = {**island.STATE, "pines": 0, "ring": "none", "rope": 0, "coil": False,
         **{f"pine{k + 1}_{x}": r3(v) for k, p in enumerate(LIB['PINES']) for x, v in zip("ad", p)},
         "papa_here": False, "mama_here": False, "my_here": False,
         "troll_turn": 166, "troll_look": "ring#stones", "troll_mood": "thinking",
         "papa_turn": 198, "papa_look": "pool#water", "mama_turn": 200, "my_turn": 140}

states = {**island.STATES,
          "pines": {"range": [0, 1], "smooth": True, "means": "the pines about the clearing creep toward the lighthouse: 0 where they stood when the family came, 1 three and a half metres nearer it (from chapter to chapter; may move before the eyes)"},
          "ring": {"values": ["none", "set", "broken", "one_missing"], "means": "the son's ring of stones on the moss of his clearing: none; set — a whole ring; broken — kicked apart, scattered; one_missing — whole but for one stone"},
          "rope": {"range": [0, 1], "smooth": True, "means": "the rope with its weight let down into the pool from the rock: 0 none of it … 1 all of it (its coil on the rock smaller); while it moves it trembles and rings spread on the water"},
          "coil": {"type": "boolean", "means": "the rope pulled up and coiled on the rock at the pool's lip (after the sounding)"},
          **{f"pine{k + 1}_{x}": {"range": [-20, 60], "means": "the scene's own: where a creeping pine stands (metres) — set from pines"} for k in range(len(LIB['PINES'])) for x in "ad"}}

spec = {
    "engine": 3,
    "title": "The Middle of the Island",
    "caption": "Among the pines, a clearing, and a pool so black it seems to have no bottom.",
    "horizon": 0.55,
    "camera": {"mode": "picture"},
    "light": island.light(WIND),
    "lights": lights,
    "modules": ["cast", "island"],
    "objects": objects,
    "state": state,
    "states": states,
    "music": music,
}
island.shaders(folder)
json.dump(spec, open(folder + '/scene.json', 'w', encoding='utf-8', newline='\n'), ensure_ascii=False, indent=2)
