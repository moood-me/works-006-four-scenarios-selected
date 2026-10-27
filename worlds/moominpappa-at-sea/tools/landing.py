# Writes scenes/landing/scene.json: the landing rocks — its elements and where they stand, its light by the hour (the
# island's: tools/island.py), its people and the keys the game sets. Where things go by the keys (the people's places,
# the creeping pines, the boat, the door) is the scene's lib (lib.js), read here for the starting state.
# Run from the world's root: python tools/landing.py .
import json, sys
sys.path.insert(0, sys.argv[1] + '/tools')
import island

root = sys.argv[1]
folder = root + '/scenes/landing'
old = json.load(open(folder + '/scene.json', encoding='utf-8'))
L = island.lib(root, 'landing')

WIND = [0.6, -1, 0.9]
TOWER = (10, 33)
PINE_BOX = [-1.9, -3.75, 1.75, 0.1]


def el(id, name, a, d, box=None, **k):
    o = {"id": id, "name": name, "across": a, "distance": d}
    o.update(k)
    if box: o["box"] = box
    return o


def person(id, name, does):
    p = L["PLACES"][id][START[id]]
    return {"id": id, "name": name, "person": {"cast": "cast", "who": id, "does": does},
            "across": p["at"][0], "distance": p["at"][1], "place": {"across": f"{id}_a", "distance": f"{id}_d"}}


# where each starts (the empty play: the first morning — the family on the slab, Little My by the arrow stone)
START = {"papa": "slab", "mama": "slab", "troll": "boulder", "my": "stone", "fisher": "away"}

objects = [
    island.sky(0.64, (-0.35, 0.42), -0.15, 1.95),
    island.sea(-1.3, {"strength": 0.18, "fade": 0, "rough": 0.55, "ripple": 0.4}),
    el("cape", "The Fisherman's cape", -95, 230, [-61, -5, 31, 0.5], elevation=-1.35, onLand=False),
    {"id": "granite", "name": "The island's granite", "plane": True, "drape": True, "across": 2, "distance": 17.5, "width": 64, "depth": 66},
    island.lighthouse(TOWER[0], TOWER[1]),
    {"id": "door", "name": "The lighthouse door", "on": "lighthouse", "across": 0.5, "distance": -1.94, "elevation": 0.42,
     "facing": 180, "place": {"facing": "door_turn"}, "box": [-1.05, -1.9, 0.05, 0.03], "shadow": True},
    el("steps", "Steps to the lighthouse door", TOWER[0], 30.3, [-0.8, -0.55, 0.8, 0.05]),
    el("bundles_steps", "The bundles on the steps", 10.9, 30.0, [-1.1, -0.5, 1.4, 0.1], elevation=0.17, shadow=True),
    el("arrow_stone", "The stone with the arrow", 7.7, 28.5, [-0.45, -0.45, 0.45, 0.05], shadow=True),
    {"id": "pines", "name": "Island pines", "box": PINE_BOX, "shadow": True,
     "copies": [{"across": 6.5, "distance": 27.5}, {"across": 13.6, "distance": 30, "scale": 0.85, "flip": True},
                {"across": 4.5, "distance": 22.5, "scale": 0.7}, {"across": 14.5, "distance": 35.5, "scale": 1.1},
                {"across": 7.1, "distance": 36.5, "scale": 0.9, "flip": True}, {"across": -12.5, "distance": 19, "scale": 0.75, "flip": True}],
     "across": 6.5, "distance": 27.5},
] + [
    {"id": f"pine{i + 1}", "name": "A pine that creeps to the door", "across": p[0], "distance": p[1], "box": PINE_BOX, "shadow": True,
     "place": {"across": f"pine{i + 1}_a", "distance": f"pine{i + 1}_d"}}
    for i, p in enumerate(L["PINES"])
] + [
    {"id": "boat", "name": "The boat Adventure", "across": L["BOAT"]["moored"][0], "distance": L["BOAT"]["moored"][1],
     "facing": L["BOAT"]["moored"][2], "place": {"across": "boat_a", "distance": "boat_d", "facing": "boat_turn"},
     "box": [-1.95, -2.85, 2.45, 0.2], "shadow": True},
    el("sprout", "A shoot out of the cleft", L["CLEFT"][0] + 0.1, L["CLEFT"][1], [-0.15, -0.6, 0.15, 0.05]),
    el("rock", "Wet rocks at the cove's edge", -3.55, 12.6, [-1, -0.45, 1, 0.05], shadow=True),
    el("driftwood", "Driftwood along the cove", -3.6, 8.9, [-1.5, -0.7, 1.5, 0.1], shadow=True),
    el("stones", "Loose stones", 0, 0, [-0.5, -0.3, 0.5, 0.05], shadow=True),
    el("boulder", "Boulder", -2.65, 4.4, [-1.6, -0.74, 1.6, 0], shadow=True),
    el("bundle", "Bundle of blankets", -1.3, 3.4, [-0.5, -0.5, 0.5, 0.05], shadow=True),
    el("handbag", "Moominmamma's handbag", -0.55, 3.75, [-0.25, -0.4, 0.25, 0.03], facing=200, shadow=True),
    el("can", "The paraffin can", 1.3, 4.1, [-0.2, -0.55, 0.2, 0.03], facing=165, shadow=True),
    {"id": "spray", "name": "Spray on the cove's rocks", "across": -4.0, "distance": 9.5,
     "particles": {"kind": "splashes", "source": [1.2, 5, 0], "rate": 14, "amount": "storm"}},
    island.RAIN,
    {"id": "mooring", "name": "The mooring close", "insert": "mooring_open"},
    {"id": "edge_splash", "name": "A wave on the rocks at the edge", "particles": {"kind": "splashes", "at": "rock#edge", "burst": {"on": "edge_splash", "count": 70}}},
    person("papa", "Moominpappa", "hands_behind"),
    person("mama", "Moominmamma", "seated"),
    person("troll", "Moomintroll", "seated"),
    person("my", "Little My", "sit_look"),
    person("fisher", "The Fisherman", "stand"),
]

PEOPLE = list(START)
state = {**island.STATE, "dawn": 1,
         "pines": 0, "door": 0, "frost_step": False, "frost_patch": False, "boat": "moored", "boat_up": 0,
         "cleft": "empty", "driftwood": False, "bundles": "slab", "papa_shore": "silent",
         "fisher_here": False, "fisher_hand": False, "mooring": 0, "mooring_open": 0, "boat_off": 0, "edge_splash": 0, "papa_lantern": 0, "beat": None, "beat_next": None,
         **{f"{id}_at": START[id] for id in PEOPLE}, **{f"{id}_placed": "" for id in PEOPLE},
         "papa_mood": "smile", "mama_mood": "smile", "troll_mood": "thinking", "my_mood": "smile", "fisher_mood": "neutral"}
for id in PEOPLE:
    p = L["PLACES"][id][START[id]]
    state.update({f"{id}_a": p["at"][0], f"{id}_d": p["at"][1], f"{id}_turn": p["turn"]})
    if "on" in p: state[f"{id}_on"] = p["on"]
    if "look" in p: state[f"{id}_look"] = p["look"]
for i, p in enumerate(L["PINES"]):
    state.update({f"pine{i + 1}_a": p[0], f"pine{i + 1}_d": p[1]})
state.update({"door_turn": 180, "boat_a": L["BOAT"]["moored"][0], "boat_d": L["BOAT"]["moored"][1], "boat_turn": L["BOAT"]["moored"][2]})


def at_means(id):
    return f"where {id} is (the script puts them there: lib.PLACES.{id})"


states = {
    **island.STATES,
    "pines": {"range": [0, 1], "means": "how far the three pines have crept up to the lighthouse door overnight (1 — at the threshold); between steps"},
    "door": {"range": [0, 1], "smooth": True, "means": "the lighthouse door, hung on its right jamb: 0 shut … 1 open outward, toward the landing (the door minigame moves it)"},
    "frost_step": {"type": "boolean", "means": "the frost's trail from the water to the door and back, thickest on the threshold"},
    "frost_patch": {"type": "boolean", "means": "a white patch of rime on the stones by the landing"},
    "boat": {"values": ["moored", "up", "cracked", "tarred", "away"], "means": "the boat: moored in the cove (bow on the rocks, stern afloat, rocking), pulled up the rocks, pulled up with a split in her side, the split tarred, gone"},
    "boat_up": {"range": [0, 1], "smooth": True, "means": "while moored: how far she is pulled up the rocks (the boat minigame moves it; 1 — where 'up' has her)"},
    "cleft": {"values": ["empty", "weed", "sprout"], "means": "the cleft by the landing: bare, packed with seaweed, a green shoot out of the weed"},
    "driftwood": {"type": "boolean", "means": "driftwood thrown up along the cove after the storm"},
    "papa_shore": {"values": ["look", "silent", "crouch", "glance", "none"], "means": "4.5, by the storm's choice: Papa at the water says «You see» (look), says nothing (silent), crouches and strokes the water (crouch), looks at the sea over his shoulder and goes to the boat (glance), does not come out (none)"},
    "bundles": {"values": ["slab", "steps", "none"], "means": "the luggage: on the slab as landed (the bundle Mama sits on, her bag, the paraffin can), the bundles on the lighthouse steps (one wet), all carried in"},
    "papa_at": {"values": list(L["PLACES"]["papa"]), "means": at_means("papa") + ": slab — on the slab, hands behind; edge — on the wet rocks at the cove's edge, facing the sea; door — at the door, a hand on it; boat — by the boat; cleft — at the cleft; water — at the water in the cove; stone — by the arrow stone"},
    "mama_at": {"values": list(L["PLACES"]["mama"]), "means": at_means("mama") + ": slab — sitting on the bundle; steps — sitting on the lighthouse steps; cleft — at the cleft; stand — standing on the slab"},
    "troll_at": {"values": list(L["PLACES"]["troll"]), "means": at_means("troll") + ": boulder — sitting on the boulder; boat — by the boat's stern; boat_far — on the far side of the hull (the play's, «son closed»)"},
    "my_at": {"values": list(L["PLACES"]["my"]), "means": at_means("my") + ": stone — sitting by the arrow stone; rock — sitting on the slab, near"},
    "fisher_at": {"values": list(L["PLACES"]["fisher"]), "means": at_means("fisher") + ": away — far on the rocks, going away from the lighthouse; door — at the door, his palm on it; threshold — sitting on the threshold, facing the sea"},
    **{f"{id}_placed": {"type": "string", "means": f"the place {id} was last put at (the script's: put again only when {id}_at asks another)"} for id in PEOPLE},
    **{f"{id}_{k}": {"type": "number", "means": f"where {id} stands, {w} (the script's, from {id}_at)"} for id in PEOPLE for k, w in (("a", "across"), ("d", "distance"))},
    **{f"pine{i + 1}_{k}": {"type": "number", "means": f"where the creeping pine {i + 1} stands, {w} (the script's, from pines)"} for i in range(3) for k, w in (("a", "across"), ("d", "distance"))},
    "fisher_hand": {"type": "boolean", "means": "«Boat» (the play's: «invited»): the Fisherman at the door lifts his hand after Mama as the boat goes (fisher_door)"},
    "mooring": {"range": [0, 1], "smooth": True, "means": "the mooring minigame: the rope let go off the ring (the mooring close; cast_off follows)"},
    "mooring_open": {"range": [0, 1], "smooth": True, "means": "the mooring close open (closeups shot mooring)"},
    "boat_off": {"range": [0, 1], "smooth": True, "means": "the boat going off out of the cove with the family in her (cast_off)"},
    "edge_splash": {"type": "number", "means": "each step up — a wave splashes on the rocks at the edge (rock#edge)"},
    "papa_lantern": {"range": [0, 1], "smooth": True, "means": "the lantern in Papa's paw lit (its light at papa#flame)"},
    "beat": {"type": "string", "means": "the piece playing (the module beats; the game names it)"},
    "beat_next": {"type": "string", "means": "the piece the game goes to next (its cut made ready)"},
    "door_turn": {"type": "number", "means": "the door's facing (the script's, from door: 180 − 70 · door)"},
    "boat_a": {"type": "number", "means": "where the boat lies, across (the script's, from boat and boat_up)"},
    "boat_d": {"type": "number", "means": "where the boat lies, distance (the script's, from boat and boat_up)"},
    "boat_turn": {"type": "number", "means": "the boat's facing (the script's, from boat and boat_up)"},
}

spec = {
    "engine": 3,
    "title": "The Landing Rocks",
    "caption": "Dawn on the island. The lighthouse is dark, and the door is locked.",
    "horizon": 0.52,
    "camera": {"mode": "picture"},
    "light": island.light(WIND),
    "lights": island.lights(([-140, 42], "#ffe6c8", 1.45), ([-125, 15], "#ffe0c2", 1.35), [100, 4], [-30, 25]) + [island.hand_lantern("papa")],
    "modules": ["cast", "island", "beats", "closeups"],
    "objects": objects,
    "state": state,
    "states": states,
    "music": old["music"],
}
island.shaders(folder)
json.dump(spec, open(folder + '/scene.json', 'w', encoding='utf-8', newline='\n'), ensure_ascii=False, indent=2)
