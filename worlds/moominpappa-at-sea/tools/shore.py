# Writes scenes/shore/scene.json: the beach (С8) — its elements and where they stand, its light by the hour (the
# island's: tools/island.py), its people, its keys. Run from the world's root: python tools/shore.py .
import json, sys
sys.path.insert(0, sys.argv[1] + '/tools')
import island

root = sys.argv[1]
folder = root + '/scenes/shore'
land = json.load(open(root + '/scenes/landing/scene.json', encoding='utf-8'))
WIND = [-1, 0.5, 0.7]
# (the numbers the lib has too: the sea's level and the strand's, the stone, the lighthouse — scenes/shore/lib.js)
SEA, FLAT = -0.1, 0.0
STONE = (-0.5, 4.9)
TOWER = (34, 5)
w = {"Glassy harmonium drones with the hiss of waves on granite, slow and wide, almost still": 1.0,
     "Wind chimes and low synth pad, the bare island at night, the moon on the water": 0.9,
     "Sparse felt piano, three notes and a long pause, cold clear morning air, gentle melancholy": 0.7,
     "Solo cello, long low phrases, lonely lighthouse at dawn, restrained and warm": 0.4}
music = {**land['music'], "prompts": [{"text": p["text"], "weight": w.get(p["text"], 0)} for p in land['music']["prompts"]],
         "bpm": 60, "density": 0.2, "brightness": 0.4}


def el(id, name, a, d, box=None, **k):
    o = {"id": id, "name": name, "across": a, "distance": d}
    o.update(k)
    if box: o["box"] = box
    return o


def person(id, name, who, a, d, **k):
    return {"id": id, "name": name, "person": {"cast": "cast", "who": who}, "across": a, "distance": d, **k}


objects = [
    island.sky(0.55, (0.3, 0.34), 1.7, 0.15),
    island.sea(SEA, {"strength": 0.22, "fade": 0, "rough": 0.4, "ripple": 0.45}),
    {"id": "granite", "name": "The island's granite", "plane": True, "drape": True, "across": 30, "distance": 14, "width": 56, "depth": 80},
    {"id": "sand", "name": "The beach", "plane": True, "drape": True, "across": 2, "distance": 14, "width": 32, "depth": 40, "inFront": ["granite"]},
    island.lighthouse(TOWER[0], TOWER[1]),
    {"id": "pines", "name": "Island pines", "box": [-1.9, -3.75, 1.75, 0.1], "shadow": True, "across": 12.5, "distance": 14,
     "copies": [{"across": 12.5, "distance": 14}, {"across": 16, "distance": 19, "scale": 0.85, "flip": True},
                {"across": 10.5, "distance": 19, "scale": 1.1}, {"across": 20, "distance": 9, "scale": 0.8, "flip": True},
                {"across": 27, "distance": 2, "scale": 0.9}, {"across": 8.5, "distance": 12, "scale": 0.7}]},
    {"id": "grass", "name": "Lyme grass on the dune", "box": [-0.4, -0.95, 0.75, 0.08], "across": 3.4, "distance": 3.2,
     "copies": [{"across": a, "distance": d, "scale": s, "flip": f} for a, d, s, f in
                [(3.4, 3.2, 1, False), (6.4, 5.4, 0.9, False), (7.4, 9.6, 1.3, False), (3.6, 9.9, 1.1, True),
                 (5.8, 12.2, 1, False), (2.9, 7.6, 0.8, True), (8.4, 7.1, 1.1, True), (4.4, 14.4, 1.2, False), (1.8, 12.4, 0.9, False)]]},
    {"id": "dune", "name": "The dune's top", "plane": True, "drape": True, "across": 5.2, "distance": 7.5, "width": 2, "depth": 2},
    {"id": "rime", "name": "The Groke's frost", "plane": True, "across": -2.5, "distance": 6.5, "elevation": FLAT + 0.012, "width": 10, "depth": 9,
     "uniforms": {"sx": 0, "sy": 0, "tl": 1, "wx": -1.5, "frost": 0, "warm": 0, "track": 0}},
    {"id": "blanket", "name": "The blanket", "plane": True, "across": 0, "distance": 6, "elevation": FLAT + 0.02, "width": 1.3, "depth": 0.8,
     "place": {"across": "blanket_a", "distance": "blanket_d"}},
    el("stone", "The flat stone", STONE[0], STONE[1], [-1.7, -0.55, 1.7, 0], shadow=True),
    el("stone_lantern", "The lantern on the stone", STONE[0], STONE[1], [-0.16, -0.48, 0.16, 0.03], elevation=0.3),
    el("seahorses", "The sea-horses", -4.6, 7, [-8.2, -0.9, 1.8, 0.3], elevation=SEA, onLand=False),
    person("groke", "The Groke", "groke", -2.9, 6.8, place={"across": "groke_a", "distance": "groke_d"}),
    person("troll", "Moomintroll", "troll", 0.7, 4.1, place={"across": "troll_a", "distance": "troll_d"}),
    person("papa", "Moominpappa", "papa", 4.7, 7.6),
    person("mama", "Moominmamma", "mama", -3.2, 11),
    island.RAIN,
]

lights = island.lights(([-160, 42], "#fff0dc", 1.35), ([80, 10], "#ffe0c2", 1.3), [-70, 4], [-40, 28]) + [
    {"id": "stone_lamp", "of": "stone_lantern#flame", "color": "#ffc874", "strength": 1.5, "reach": 7, "flicker": 0.12}]

# the empty play: the day, the sea-horses in the shallows, the son three steps from the stone; the Groke, Papa and Mama
# not here (the game says who is)
state = {**island.STATE,
         "seahorses": "here", "seahorses_away": 0, "groke_at": "edge", "frost": 0, "warm": 0, "track": 0, "lantern_stone": "none",
         "blanket": False, "troll_at": "near", "dune_dent": False,
         "groke_a": -2.9, "groke_d": 6.8, "troll_a": 0.7, "troll_d": 4.1, "blanket_a": 0, "blanket_d": 6,
         "groke_here": False, "papa_here": False, "mama_here": False,
         "papa_turn": 265, "papa_look": "groke", "mama_turn": 250, "groke_mood": "sad"}

states = {**island.STATES,
          "seahorses": {"values": ["here", "gone"], "means": "the sea-horses in the shallows off the stone, glowing (by day); gone — they swim off to the left and are gone"},
          "seahorses_away": {"range": [0, 1], "smooth": True, "means": "the scene's own: how far the sea-horses have swum off (moved by the scene when seahorses becomes gone)"},
          "groke_at": {"values": ["edge", "near", "closest", "water"], "means": "where the Groke is: far off at the water's edge; nearer the lighthouse up the strand; nearer still; waist-deep in the sea. She faces the lantern on the stone while it is there, else the lighthouse"},
          "frost": {"range": [0, 1], "smooth": True, "means": "the rime round the Groke: 0 none … 1 widest (over three metres); grows and melts before the eyes"},
          "warm": {"range": [0, 1], "smooth": True, "means": "the sand under the Groke dark and damp: she has got warm"},
          "track": {"range": [0, 1], "smooth": True, "means": "her white trail from where she sat down to the water: how far it has run (1 — to the water)"},
          "lantern_stone": {"values": ["none", "lit", "out"], "means": "the family's lantern on the flat stone: not there; burning (it lights the sand, the son, the Groke); out, cold glass"},
          "blanket": {"type": "boolean", "means": "the blanket on the sand behind the son (wherever he is)"},
          "troll_at": {"values": ["far", "near", "beside"], "means": "where the son is: near the viewer, far from her; three steps back from the stone; beside the Groke at her left, facing as she does. Changed while the scene plays, he walks there"},
          "dune_dent": {"type": "boolean", "means": "the hollow in the sand on the dune's top where Moominpappa sat all night"},
          "groke_a": {"range": [-8, 2], "means": "the scene's own: where the Groke stands (across, metres) — set from groke_at"},
          "groke_d": {"range": [4, 10], "means": "the scene's own: where the Groke stands (distance, metres) — set from groke_at"},
          "troll_a": {"range": [-8, 4], "means": "the scene's own: where the son stands (across, metres) — set from troll_at"},
          "troll_d": {"range": [2, 10], "means": "the scene's own: where the son stands (distance, metres) — set from troll_at"},
          "blanket_a": {"range": [-8, 4], "means": "the scene's own: where the blanket lies (across, metres) — behind the son"},
          "blanket_d": {"range": [2, 10], "means": "the scene's own: where the blanket lies (distance, metres) — behind the son"}}

spec = {
    "engine": 3,
    "title": "The Beach",
    "caption": "The sand by the water. At night the Groke comes here and sits facing the lights.",
    "horizon": 0.42,
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
