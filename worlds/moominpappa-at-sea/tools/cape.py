# Writes scenes/cape/scene.json: the Fisherman's cape — its elements and where they stand, its light by the hour (the
# island's: tools/island.py), its people and the keys the game sets. Where the people go by the keys is the scene's lib
# (lib.js PLACES), read here for the starting state. Run from the world's root: python tools/cape.py .
import json, math, sys
sys.path.insert(0, sys.argv[1] + '/tools')
import island

root = sys.argv[1]
folder = root + '/scenes/cape'
L = island.lib(root, 'cape')
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

# the Fisherman on his stone, facing the sea on the left, his net in his hands on his knees and heaped at his feet
SEAT = L["PLACES"]["fisher"]["seat"]
FT = SEAT["turn"]
fwd = (math.sin(FT * D), math.cos(FT * D))
feet = (SEAT["at"][0] + fwd[0] * 0.5, SEAT["at"][1] + fwd[1] * 0.5)
TOWER = (28, 54)
# where each starts (the empty play: the Fisherman on his stone, Papa sitting beside him, Mama far off on the steps)
START = {"fisher": "seat", "papa": "beside", "mama": "steps", "my": "rock", "troll": "near"}


def el(id, name, a, d, box=None, **k):
    o = {"id": id, "name": name, "across": a, "distance": d}
    o.update(k)
    if box: o["box"] = box
    return o


def person(id, name, does):
    p = L["PLACES"][id][START[id]]
    return {"id": id, "name": name, "person": {"cast": "cast", "who": id, "does": does},
            "across": p["at"][0], "distance": p["at"][1], "place": {"across": f"{id}_a", "distance": f"{id}_d"}}


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
    el("seat", "The Fisherman's stone", SEAT["at"][0], SEAT["at"][1], [-1, -0.42, 1, 0], shadow=True),
    el("net", "The net at his feet", r3(feet[0] - 0.35), r3(feet[1] + 0.05), [-0.75, -0.62, 2.7, 0.1], shadow=True),
    el("box", "Papa's box of matches", -0.3, 3.5, [-1.6, -1.2, 1.0, 0.2], elevation=0.36),
    el("pie", "Moominmamma's pie", -0.05, 3.3, [-0.25, -0.15, 0.25, 0.02], shadow=True),
    el("bread", "The bread stone", -2.6, 5.4, [-0.55, -0.4, 0.55, 0.04], shadow=True),
    el("driftwood", "A driftwood trunk", 2.9, 2.3, [-2.5, -0.55, 2.55, 0.08], facing=165, shadow=True),
    {"id": "grass", "name": "Dry sea grass", "box": [-0.32, -0.6, 0.32, 0.05], "across": -2.0, "distance": 2.6,
     "copies": [{"across": -2.0, "distance": 2.6}, {"across": 0.1, "distance": 2.4, "scale": 0.8, "flip": True},
                {"across": -1.8, "distance": 6.0, "scale": 1.2}, {"across": 1.9, "distance": 3.6, "scale": 0.9},
                {"across": -6.2, "distance": 7.4, "scale": 1.3, "flip": True}, {"across": -0.2, "distance": 5.6, "scale": 0.9},
                {"across": 3.9, "distance": 1.4, "scale": 1.1, "flip": True}]},
    el("surge", "The storm's wave over the rocks", -0.9, 2.95, [-2.4, -0.6, 2.4, 0.6]),
    {"id": "spray", "name": "Spray on the cape's rocks", "across": 1.6, "distance": 8.4,
     "particles": {"kind": "splashes", "source": [4, 1.2, 0], "rate": 16, "amount": "storm"}},
    island.RAIN,
    {"id": "knot", "name": "The knot close", "insert": "knot_open"},
    {"id": "matchbox", "name": "The matchbox close", "insert": "matchbox_open"},
    person("fisher", "The Fisherman", "seated"),
    person("papa", "Moominpappa", "sit_look"),
    person("mama", "Moominmamma", "seated"),
    person("my", "Little My", "sit_look"),
    person("troll", "Moomintroll", "sit_look"),
]

PEOPLE = list(START)
state = {**island.STATE,
         "net": "dry", "bread": False, "pie": False, "matchbox": "none", "fisher_mark": "keeper", "cross": 0, "carry": 0, "knot": 0, "knot_open": 0, "knot_paws": 1, "knot_pull": 0, "carry_tilt": 0, "matchbox_open": 0, "matchbox_give": 0, "matchbox_close": 0, "fisher_wear": None, "papa_lantern": 0, "beat": None, "beat_next": None,
         "my_here": False, "troll_here": False,
         **{f"{id}_at": START[id] for id in PEOPLE}, **{f"{id}_placed": "" for id in PEOPLE},
         "fisher_mood": "neutral", "papa_mood": "thinking", "mama_mood": "tired", "my_mood": "smile", "troll_mood": "thinking"}
for id in PEOPLE:
    p = L["PLACES"][id][START[id]]
    state.update({f"{id}_a": p["at"][0], f"{id}_d": p["at"][1], f"{id}_turn": p["turn"]})
    if "on" in p: state[f"{id}_on"] = p["on"]
    if "look" in p: state[f"{id}_look"] = p["look"]


def at_means(id):
    return f"where {id} is (the script puts them there: lib.PLACES.{id})"


states = {
    **island.STATES,
    "net": {"values": ["dry", "knot", "papa", "mended", "folded"], "means": "the Fisherman's net: drying on the poles and heaped at his feet, in his hands; a snarl of a knot in the heap; drawn out of the heap up into his paws as Papa sits by it, the knot before him; a pale mended patch where Papa untangled it; folded into a roll beside him, his hands empty, the poles bare"},
    "cross": {"values": [0, 1, 2, 3], "means": "the rocks minigame: how many holds Papa has reached on his way to the Fisherman (granite#hold1…3)"},
    "carry": {"range": [0, 1], "smooth": True, "means": "the carry minigame: how far Papa has come over the stones with the pie or the bread"},
    "knot": {"range": [0, 1], "smooth": True, "means": "the knot minigame: the thread drawn out of the knot (the close-up knot's pull)"},
    "knot_open": {"range": [0, 1], "smooth": True, "means": "the close-up of the knot open (the people package's closeups shot knot)"},
    "matchbox_open": {"range": [0, 1], "smooth": True, "means": "the matchbox close open (closeups shot matchbox: the matches minigame)"},
    "matchbox_give": {"range": [0, 1], "smooth": True, "means": "the matchbox close: the box from Papa's paw into the Fisherman's palm (the matches minigame)"},
    "matchbox_close": {"range": [0, 1], "smooth": True, "means": "the matchbox close: the Fisherman's fingers closing on it"},
    "knot_pull": {"range": [0, 1], "smooth": True, "means": "the knot close's thread drawn out (the script: the minigame's knot while Papa works it; 0 — the knot itself in the close-ups after)"},
    "carry_tilt": {"range": [-1, 1], "smooth": True, "means": "the carry minigame: how the pie or the bread tips in Papa's paws over the stones (0 level)"},
    "knot_paws": {"range": [0, 1], "means": "the knot close: Papa's paws at the knot (1), or the net alone on the Fisherman's knees (0)"},
    "papa_lantern": {"range": [0, 1], "smooth": True, "means": "the lantern in Papa's paw lit (its light at papa#flame)"},
    "beat": {"type": "string", "means": "the piece playing (the module beats; the game names it)"},
    "beat_next": {"type": "string", "means": "the piece the game goes to next (its cut made ready)"},
    "fisher_mark": {"values": ["keeper", "invited", "sat"], "means": "how the Fisherman met Papa (the play's mark): turned away (keeper), went off — later lifts his hand after Mama (invited), sat with him (sat); the common shots show him so"},
    "bread": {"type": "boolean", "means": "Moominmamma's bread on the flat stone by the path (bread#stone)"},
    "pie": {"type": "boolean", "means": "Moominmamma's pie on the rock beside the Fisherman"},
    "matchbox": {"values": ["none", "stone", "palm"], "means": "Papa's box of matches: not there, on the Fisherman's stone beside him, in the Fisherman's right hand"},
    "fisher_at": {"values": list(L["PLACES"]["fisher"]), "means": at_means("fisher") + ": seat — on his stone, his side to the lighthouse, facing the sea; away — far off on the rocks to the left, going away"},
    "papa_at": {"values": list(L["PLACES"]["papa"]), "means": at_means("papa") + ": beside — sitting beside him looking out to sea; behind — standing at the Fisherman's back; net — sitting at the net, looking at its knot; under — sitting close by him, under the waves; stand — standing near him"},
    "mama_at": {"values": list(L["PLACES"]["mama"]), "means": at_means("mama") + ": steps — far off on the lighthouse steps; beside — sitting at Papa's side; apart — sitting apart, facing the shore"},
    "my_at": {"values": list(L["PLACES"]["my"]), "means": at_means("my") + ": rock — sitting on the rocks by his shelter"},
    "troll_at": {"values": list(L["PLACES"]["troll"]), "means": at_means("troll") + ": near — sitting a little off, looking at the Fisherman"},
    **{f"{id}_placed": {"type": "string", "means": f"the place {id} was last put at (the script's: put again only when {id}_at asks another)"} for id in PEOPLE},
    **{f"{id}_{k}": {"type": "number", "means": f"where {id} stands, {w} (the script's, from {id}_at)"} for id in PEOPLE for k, w in (("a", "across"), ("d", "distance"))},
}

spec = {
    "engine": 3,
    "title": "The Fisherman's Cape",
    "caption": "The Fisherman sits with his net, his side to the lighthouse. Papa sits down beside him and says nothing.",
    "horizon": 0.38,
    "camera": {"mode": "picture"},
    "light": island.light(WIND),
    "lights": island.lights(([-115, 16], "#ffd6a0", 1.5), ([140, 12], "#ffe0c2", 1.35), [-80, 4], [10, 25]) + [island.hand_lantern("papa")],
    "modules": ["cast", "island", "beats", "closeups"],
    "objects": objects,
    "state": state,
    "states": states,
    "music": music,
}
island.shaders(folder)
json.dump(spec, open(folder + '/scene.json', 'w', encoding='utf-8', newline='\n'), ensure_ascii=False, indent=2)
