# Writes scenes/cape/scene.json: the Fisherman's cape — its elements and where they stand, its light, its people.
# Run from the world's root: python tools/cape.py .
import json, math, sys
sys.path.insert(0, sys.argv[1] + '/tools')
import island

root = sys.argv[1]
folder = root + '/scenes/cape'
WIND = [-1, 0.4, 1.1]
D = math.pi / 180
r3 = lambda v: round(v, 3)
land = json.load(open(root + '/scenes/landing/scene.json', encoding='utf-8'))
w = {"Solo nylon-string guitar picking a slow, plain northern folk tune, close and intimate, sea wind behind it": 1.0,
     "Glassy harmonium drones with the hiss of waves on granite, slow and wide, almost still": 0.8,
     "Solo cello, long low phrases, lonely lighthouse at dawn, restrained and warm": 0.6,
     "Soft accordion holding long quiet chords, a little out of breath, a Finnish summer evening by the shore": 0.5,
     "Sparse felt piano, three notes and a long pause, cold clear morning air, gentle melancholy": 0.3}
music = {**land['music'], "prompts": [{"text": p["text"], "weight": w.get(p["text"], 0)} for p in land['music']["prompts"]],
         "bpm": 64, "density": 0.25, "brightness": 0.5}

# the Fisherman on his stone, facing the sea on the left, his net in his hands on his knees
SEAT = (-0.9, 3.6)
FT = 250
fwd = (math.sin(FT * D), math.cos(FT * D))
feet = (SEAT[0] + fwd[0] * 0.5, SEAT[1] + fwd[1] * 0.5)
TOWER = (28, 54)

def el(id, name, a, d, box=None, **k):
    o = {"id": id, "name": name, "across": a, "distance": d}
    o.update(k)
    if box: o["box"] = box
    return o

objects = [
    island.sky(0.56, (-0.35, 0.42), 1.98, -0.3),
    island.sea(-1.6, {"strength": 0.22, "fade": 0, "rough": 0.6, "ripple": 0.45}),
    {"id": "granite", "name": "The cape's granite", "plane": True, "drape": True, "across": 10, "distance": 35, "width": 100, "depth": 92},
    island.lighthouse(TOWER[0], TOWER[1]),
    el("steps", "Steps to the lighthouse door", TOWER[0], TOWER[1] - 2.6, [-0.8, -0.55, 0.8, 0.05]),
    {"id": "pines", "name": "Island pines", "box": [-1.9, -3.75, 1.75, 0.1], "shadow": True, "across": 23, "distance": 49,
     "copies": [{"across": 23, "distance": 49}, {"across": 32.5, "distance": 51, "scale": 0.85, "flip": True},
                {"across": 21.5, "distance": 55, "scale": 1.1}, {"across": 35, "distance": 57, "scale": 0.9, "flip": True}]},
    el("shelter", "The Fisherman's rock", -3.5, 7.0, [-4, -1.7, 4, 0], shadow=True),
    el("rack", "The net drying on its poles", -5.0, 4.9, [-1.75, -2.05, 1.75, 0.06], facing=150, translucent=0.45, shadow=True),
    el("seat", "The Fisherman's stone", SEAT[0], SEAT[1], [-1, -0.42, 1, 0], shadow=True),
    el("heap", "The net at his feet", r3(feet[0] - 0.35), r3(feet[1] + 0.05), [-0.7, -0.3, 0.7, 0.06], shadow=True),
    el("driftwood", "A driftwood trunk", 2.9, 2.3, [-2.5, -0.55, 2.55, 0.08], facing=165, shadow=True),
    {"id": "grass", "name": "Dry sea grass", "box": [-0.32, -0.6, 0.32, 0.05], "across": -2.0, "distance": 2.6,
     "copies": [{"across": -2.0, "distance": 2.6}, {"across": 0.1, "distance": 2.4, "scale": 0.8, "flip": True},
                {"across": -1.8, "distance": 6.0, "scale": 1.2}, {"across": 1.9, "distance": 3.6, "scale": 0.9},
                {"across": -6.2, "distance": 7.4, "scale": 1.3, "flip": True}, {"across": -0.2, "distance": 5.6, "scale": 0.9},
                {"across": 3.9, "distance": 1.4, "scale": 1.1, "flip": True}]},
    {"id": "fisher", "name": "The Fisherman", "person": {"cast": "cast", "who": "fisher", "does": "seated"}, "across": SEAT[0], "distance": SEAT[1]},
    {"id": "papa", "name": "Moominpappa", "person": {"cast": "cast", "who": "papa", "does": "sit_look"}, "across": 0.75, "distance": 4.15},
    {"id": "mama", "name": "Moominmamma", "person": {"cast": "cast", "who": "mama", "does": "seated"}, "across": TOWER[0] - 0.8, "distance": TOWER[1] - 2.9},
]
spec = {
    "engine": 3,
    "title": "The Fisherman's Cape",
    "caption": "The Fisherman sits with his net, his side to the lighthouse. Papa sits down beside him and says nothing.",
    "horizon": 0.38,
    "camera": {"mode": "picture"},
    "light": island.light(WIND),
    "lights": island.lights(([-115, 16], "#ffd6a0", 1.5), ([140, 12], "#ffe0c2", 1.35), [-80, 4], [10, 25]),
    "modules": ["cast", "island"],
    "objects": objects,
    "state": {
        **island.STATE,
        "fisher_on": [SEAT[0], SEAT[1], 0.3], "fisher_turn": FT,
        "fisher_look": [-40, 8, 1.2], "fisher_mood": "neutral",
        "papa_turn": 215, "papa_look": [-40, 24, 1], "papa_mood": "thinking",
        "mama_on": [TOWER[0] - 0.8, TOWER[1] - 2.9, 0.35], "mama_turn": 200, "mama_look": [0, 5, 1], "mama_mood": "tired",
    },
    "states": dict(island.STATES),
    "music": music,
}
island.shaders(folder)
json.dump(spec, open(folder + '/scene.json', 'w', encoding='utf-8', newline='\n'), ensure_ascii=False, indent=2)
