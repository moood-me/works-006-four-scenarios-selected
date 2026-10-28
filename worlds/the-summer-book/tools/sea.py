# Writes scenes/sea/scene.json (and the island's sky and sea beside it): the sea (С6) — the last morning of August,
# the big motor boat taking them off the island, the island going away into the fog. The camera rides the boat, from
# just over its bow looking aft: the people in it, the dinghy in tow, the island behind going into the white. Run from
# anywhere: python -B tools/sea.py <the world's root>
import sys, os
sys.path.insert(0, os.path.join(sys.argv[1], "tools"))
import isle

root = sys.argv[1]
folder = os.path.join(root, "scenes", "sea")
os.makedirs(os.path.join(folder, "elements"), exist_ok=True)
A = isle.A
WATER = 0
DECK = 0.35          # the deck over the water
WIND = [-1, 0.4, 0.5]
BOAT_D = 6.6         # where the deck's middle is at the start (island 0): just off the island's far rock
AWAY = 360           # how far out it is at island 1

# the music: the shore's, quieter (the world's one key)
MUSIC_PROMPTS = [
    ("Sparse solo piano, slow and unhurried, with long silences, like light on still water", 0.8),
    ("Distant church bell and sea wind textures, sparse, mostly silence", 1.0),
    ("Low cello long tones, tender and grave, an old woman remembering", 0.7),
    ("Warm ambient pads with slow swells, pearl-grey and calm, barely moving", 0.6),
    ("Nordic folk melody on a single wooden flute, distant and breathy, over a soft drone", 0.3),
    ("Kantele plucked softly, Finnish archipelago, open fifths, airy", 0),
    ("Solo accordion, slow waltz, faded and wistful, far away across the water", 0),
    ("Soft string quartet, chamber music, restrained and bittersweet", 0),
    ("Glass harmonica shimmer, cold clear air, high and fragile", 0),
    ("Harmonium chords breathing slowly, a quiet chapel by the sea", 0),
    ("Felt piano with tape hiss, close and soft, lullaby feel", 0),
    ("Low diesel engine hum far off, steady, under soft sustained strings", 0.4),
    ("Celesta and music box notes, childlike and a little sad", 0),
    ("Harp arpeggios, slow, luminous, early summer dawn", 0),
    ("Clarinet in its low register, dry and humorous, a little crooked tune", 0),
]
music = {"prompts": [{"text": t, "weight": w} for t, w in MUSIC_PROMPTS], "bpm": 60, "density": 0.2, "brightness": 0.4,
         "scale": "G_MAJOR_E_MINOR"}


def on_boat(id, name, a, d, box, height, **k):
    return {"id": id, "name": name, "on": "hull", "across": a, "distance": d, "height": height, "box": box, **k}


def person(id, name, who, a, d):
    return {"id": id, "name": name, "on": "boat", "person": {"cast": "cast", "who": who, "turn": 180}, "across": a, "distance": d,
            "place": {"across": f"{id}_a", "distance": f"{id}_d"}}


# the sky (looking back at the island, south-west): the day's sun high on the left, the dawn's low on the left in the
# veil, the lightning far out
SUN, LATE, DAWN, BOLT = [A * 0.22, 0.02], [A * 0.15, 0.18], [A * 0.2, 0.3], [A * 0.7, 0.02]

objects = [
    isle.sky(folder, 0.42, SUN, LATE, DAWN, A * 0.85, A * 0.4, BOLT),
    isle.sea(folder, WATER, {"strength": 0.45, "fade": 0, "rough": 0.25, "ripple": 0.2}, centre=(0, 1500), size=(6000, 5000)),
    {"id": "skerry", "name": "Skerries", "across": 120, "distance": 300, "onLand": False, "elevation": WATER, "height": 5,
     "box": [-20.5, -5.4, 20.5, 0.7], "copies": [{"across": 120, "distance": 300}, {"across": -170, "distance": 420, "scale": 1.3, "flip": True},
                                                {"across": 40, "distance": 520, "scale": 0.8}]},
    {"id": "fog_wall", "name": "The fog's wall", "across": 0, "distance": 1200, "onLand": False, "elevation": WATER, "height": 56,
     "box": [-900, -58, 900, 2]},
    {"id": "new_house", "name": "The new house on the island's far side", "across": -92, "distance": 112, "onLand": False, "elevation": WATER,
     "height": 9, "box": [-12, -9.3, 12, 0.6]},
    {"id": "island", "name": "The island", "across": -12, "distance": 82, "onLand": False, "elevation": WATER, "height": 22,
     "box": [-100, -23, 100, 1]},
    {"id": "fog_far", "name": "Fog over the water", "across": -10, "distance": 70, "onLand": False, "elevation": WATER, "height": 10,
     "box": [-200, -10, 200, 1]},
    {"id": "fog_near", "name": "Fog close round the boat", "across": 0, "distance": 30, "onLand": False, "elevation": WATER, "height": 9,
     "box": [-80, -9, 80, 1], "copies": [{"across": 0, "distance": 30}, {"across": -20, "distance": 8, "scale": 0.7, "flip": True}]},
    # the boat: its unseen anchor amidships at the deck, moved out by `island`, pitching by `boat_pitch`; its deck the
    # plane everything of it stands on; the eye in the bow over the stem, a seated person's height
    {"id": "hull", "name": "The big boat", "unseen": True, "across": 0, "distance": BOAT_D, "elevation": WATER + DECK,
     "onLand": False, "place": {"distance": "boat_d", "tilt": "boat_pitch"}},
    {"id": "boat", "name": "The big boat's deck", "plane": True, "walk": True, "on": "hull", "width": 2.5, "depth": 8.8},
    {"id": "eye", "name": "In the bow", "unseen": True, "on": "hull", "distance": -3.2, "elevation": -0.35, "facing": 180},
    on_boat("side_l", "The boat's side, port", -1.25, -2.4, [-0.05, -0.8, 6.85, 0.15], 0.8, facing=90),
    on_boat("side_r", "The boat's side, starboard", 1.25, 4.4, [-0.05, -0.8, 6.85, 0.15], 0.8, facing=270),
    on_boat("bow_l", "The bow, port", -1.25, -2.4, [-0.05, -0.85, 2.4, 0.15], 0.85, facing=238),
    on_boat("bow_r", "The bow, starboard", 0, -4.4, [-0.05, -0.85, 2.4, 0.15], 0.85, facing=122),
    on_boat("transom", "The stern", 0, 4.4, [-1.3, -1.05, 1.3, 0.15], 0.8, facing=180),
    on_boat("engine", "The engine's housing", 0, 3.0, [-0.55, -1.0, 0.6, 0.05], 0.75, facing=180, shadow=True),
    {"id": "thwart", "name": "The thwarts", "plane": True, "on": "hull", "across": 0, "distance": -0.2, "elevation": 0.42, "width": 2.4,
     "depth": 0.32, "copies": [{"across": 0, "distance": -0.2}, {"across": 0, "distance": 1.9}], "shadow": True},
    {"id": "thwart_face", "name": "The thwarts' fronts", "on": "hull", "across": 0, "distance": -0.36, "facing": 180, "height": 0.42,
     "box": [-1.25, -0.45, 1.25, 0.03], "copies": [{"across": 0, "distance": -0.36}, {"across": 0, "distance": 1.74}]},
    on_boat("basket", "The basket", 0.95, -0.9, [-0.4, -0.95, 0.4, 0.03], 0.6, facing=180),
    on_boat("bundles", "The things", -0.7, 3.2, [-0.55, -0.75, 0.6, 0.03], 0.7, facing=180),
    on_boat("dinghy", "The dinghy in tow", -2.8, 13, [-0.85, -1.0, 0.85, 0.2], 0.6, facing=180, elevation=-DECK),
    person("grandma", "Grandmother", "grandma", 0.45, 0.2),
    person("sophia", "Sophia", "sophia", -0.4, 0.25),
    person("papa", "Papa", "papa", -0.75, 3.9),
    isle.RAIN,
]

lights = isle.lights(("sky#sun", "#ffefd8", 1.3), ("sky#sun_late", "#ffe2b8", 1.25), ("sky#sun_dawn", "#ffeedd", 1.0),
                     ([60, 5], "#f3d6c6", 0.5), ([200, 38], "#c4d2f2", 0.8), [30, 30])


def placed(id, who, places):
    return {f"{id}_at": {"values": places, "means": f"where {who} is in the boat (lib.PLACES: {', '.join(places)}); set, put there at once"},
            f"{id}_a": {"range": [-1.3, 1.3], "means": f"the scene's own: where {who} stands across the boat, set from {id}_at"},
            f"{id}_d": {"range": [-4.4, 4.4], "means": f"the scene's own: where {who} stands along the boat, set from {id}_at"},
            f"{id}_placed": {"type": "string", "means": f"the scene's own: the place {who} was last put at"}}


state = {**isle.STATE,
         "island": 0, "sway": 0, "basket": "shut", "dinghy": True, "boat_d": BOAT_D, "boat_pitch": 0,
         "grandma_at": "seat", "sophia_at": "beside", "papa_at": "stern",
         "grandma_a": 0.45, "grandma_d": 0.2, "sophia_a": -0.4, "sophia_d": 0.25, "papa_a": 0.55, "papa_d": 3.8}
states = {**isle.STATES,
          **placed("grandma", "Grandmother", ["seat", "hand"]),
          **placed("sophia", "Sophia", ["bow", "beside", "hand"]),
          **placed("papa", "Papa", ["stern"]),
          "island": {"range": [0, 1], "smooth": True, "means": "how far the boat has gone from the island: 0 just off its far rock, 1 out at sea, the island gone into the white"},
          "sway": {"range": [0, 1], "smooth": True, "means": "how hard the boat pitches on the swell (0 hardly, 1 hard: «Платок», sitting upright)"},
          "basket": {"values": ["cat", "shut"], "means": "the basket in the bow: the cat Mappe sitting on its lid, or shut with him in it"},
          "dinghy": {"type": "boolean", "means": "the dinghy in tow behind the stern"},
          "boat_d": {"range": [-360, 10], "means": "the scene's own: where the boat is (distance), set from island"},
          "boat_pitch": {"range": [-8, 8], "means": "the scene's own: the boat's pitch now (degrees), moved by sway"}}

spec = {
    "engine": 3,
    "title": "At Sea",
    "caption": "The last morning of August. The island goes into the fog.",
    "horizon": 0.42,
    "camera": {"mode": "picture", "on": "eye"},
    "light": isle.light(WIND),
    "lights": lights,
    "modules": ["cast", "isle"],
    "state": state,
    "states": states,
    "objects": objects,
    "music": music,
}
isle.write_json(os.path.join(folder, "scene.json"), spec)
