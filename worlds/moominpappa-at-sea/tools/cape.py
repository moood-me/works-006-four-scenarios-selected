# Writes scenes/cape/scene.json: the Fisherman's cape — its elements and where they stand, its light, its people.
# Run from the world's root: python tools/cape.py .
import json, math, sys
root = sys.argv[1]
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

# the Fisherman on his stone, facing the sea on the left, his net in his lap
SEAT = (-1.0, 5.0)
FT = 250
fwd = (math.sin(FT * D), math.cos(FT * D))
right = (math.cos(FT * D), -math.sin(FT * D))
lap = (SEAT[0] + fwd[0] * 0.3, SEAT[1] + fwd[1] * 0.3)
hand = lambda s: [r3(lap[0] + right[0] * 0.1 * s), r3(lap[1] + right[1] * 0.1 * s), 0.5]
feet = (SEAT[0] + fwd[0] * 0.5, SEAT[1] + fwd[1] * 0.5)
TOWER = (33.5, 64.5)

def el(id, name, a, d, box=None, **k):
    o = {"id": id, "name": name, "across": a, "distance": d}
    o.update(k)
    if box: o["box"] = box
    return o

objects = [
    {"id": "sky", "name": "Afternoon sky", "sky": True},
    {"id": "sea", "name": "The sea", "plane": True, "across": 0, "distance": 1450, "elevation": -1.6, "width": 2400, "depth": 3000,
     "reflect": {"strength": 0.22, "fade": 0, "rough": 0.6, "ripple": 0.45}},
    {"id": "granite", "name": "The cape's granite", "plane": True, "drape": True, "across": 10, "distance": 35, "width": 100, "depth": 92},
    el("lighthouse", "The lighthouse", TOWER[0], TOWER[1], [-5.03, -15.8, 5.03, 0], elevation=-0.45, shadow=True),
    el("steps", "Steps to the lighthouse door", TOWER[0], TOWER[1] - 2.6, [-0.8, -0.55, 0.8, 0.05]),
    {"id": "pines", "name": "Island pines", "box": [-1.9, -3.75, 1.75, 0.1], "shadow": True, "across": 28.5, "distance": 59,
     "copies": [{"across": 28.5, "distance": 59}, {"across": 38.5, "distance": 61, "scale": 0.85, "flip": True},
                {"across": 26.5, "distance": 65, "scale": 1.1}, {"across": 41, "distance": 67, "scale": 0.9, "flip": True},
                {"across": -8.5, "distance": 14, "scale": 0.75, "flip": True}]},
    el("shelter", "The Fisherman's rock", -3.9, 8.9, [-3.6, -2.1, 3.6, 0], shadow=True),
    el("rack", "The net drying on its poles", -5.3, 6.3, [-1.75, -2.05, 1.75, 0.06], facing=150, translucent=0.45, shadow=True),
    el("seat", "The Fisherman's stone", SEAT[0], SEAT[1], [-1, -0.42, 1, 0], shadow=True),
    el("heap", "The net at his feet", r3(feet[0] - 0.05), r3(feet[1] - 0.15), [-0.7, -0.3, 0.7, 0.06], shadow=True),
    el("box", "The fish box", -2.4, 5.5, [-0.4, -0.36, 0.4, 0.04], facing=200, shadow=True),
    el("driftwood", "A driftwood trunk", 2.3, 2.7, [-2.5, -0.55, 2.55, 0.08], facing=165, shadow=True),
    {"id": "grass", "name": "Dry sea grass", "box": [-0.32, -0.6, 0.32, 0.05], "across": -2.2, "distance": 3.6,
     "copies": [{"across": -2.2, "distance": 3.6}, {"across": 0.2, "distance": 3.2, "scale": 0.8, "flip": True},
                {"across": -1.9, "distance": 7.4, "scale": 1.2}, {"across": 1.7, "distance": 4.6, "scale": 0.9},
                {"across": -6.4, "distance": 9.2, "scale": 1.3, "flip": True}, {"across": -0.4, "distance": 7.2, "scale": 0.9},
                {"across": 3.6, "distance": 1.6, "scale": 1.1, "flip": True}]},
    {"id": "fisher", "name": "The Fisherman", "person": {"cast": "cast", "who": "fisher", "does": "seated"}, "across": SEAT[0], "distance": SEAT[1]},
    {"id": "papa", "name": "Moominpappa", "person": {"cast": "cast", "who": "papa", "does": "sit_look"}, "across": 0.75, "distance": 5.75},
    {"id": "mama", "name": "Moominmamma", "person": {"cast": "cast", "who": "mama", "does": "seated"}, "across": TOWER[0] - 0.8, "distance": TOWER[1] - 2.9},
]
spec = {
    "engine": 3,
    "title": "The Fisherman's Cape",
    "caption": "The Fisherman mends his net with his back to the lighthouse. Papa sits beside him and says nothing.",
    "horizon": 0.5,
    "camera": {"mode": "picture"},
    "light": {"ambient": 0.62, "ambientColor": "#c9d2e4", "bounce": 0.55, "haze": 0.04, "hazeColor": "#eadcc6", "hazeGlow": 0,
              "shafts": 0.3, "tint": "#ffd9a6", "tintStrength": 0.07, "vignette": 0.24, "grain": 0.08, "wind": [-1, 0.4, 1.1],
              "saturation": 1.08},
    "lights": [{"id": "sun", "from": "sky#sun", "color": "#ffd6a0", "strength": 1.5}],
    "modules": ["cast"],
    "objects": objects,
    "state": {
        "fisher_on": [SEAT[0], SEAT[1], 0.38], "fisher_turn": FT, "fisher_reach": {"r": hand(1), "l": hand(-1)},
        "fisher_look": [r3(lap[0]), r3(lap[1]), 0.35], "fisher_mood": "neutral",
        "papa_turn": 245, "papa_look": [-40, 24, 1], "papa_mood": "thinking",
        "mama_on": [TOWER[0] - 0.8, TOWER[1] - 2.9, 0.35], "mama_turn": 200, "mama_look": [0, 5, 1], "mama_mood": "tired",
    },
    "music": music,
}
json.dump(spec, open(root + '/scenes/cape/scene.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
