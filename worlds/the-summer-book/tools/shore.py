# Writes scenes/shore/scene.json (and the island's sky and sea beside it): the shore by the house (С1) — its elements
# and where they stand, its light by the hour (the island's: tools/isle.py), its people, its keys. Run from anywhere:
# python tools/shore.py <the world's root>
import sys, os
sys.path.insert(0, os.path.join(sys.argv[1], "tools"))
import isle

root = sys.argv[1]
folder = os.path.join(root, "scenes", "shore")
A = isle.A
WATER = -0.55
WIND = [1, 0.3, 0.4]

MUSIC_PROMPTS = [
    ("Sparse solo piano, slow and unhurried, with long silences, like light on still water", 1.2),
    ("Nordic folk melody on a single wooden flute, distant and breathy, over a soft drone", 0.8),
    ("Gentle nylon-string guitar picking, quiet and intimate, a summer morning by the sea", 0.6),
    ("Warm ambient pads with slow swells, pearl-grey and calm, barely moving", 0.5),
    ("Celesta and music box notes, childlike and a little sad", 0),
    ("Low cello long tones, tender and grave, an old woman remembering", 0),
    ("Kantele plucked softly, Finnish archipelago, open fifths, airy", 0),
    ("Solo accordion, slow waltz, faded and wistful, far away across the water", 0),
    ("Soft string quartet, chamber music, restrained and bittersweet", 0),
    ("Glass harmonica shimmer, cold clear air, high and fragile", 0),
    ("Minimalist marimba patterns, gentle and repeating, like small waves", 0),
    ("Harmonium chords breathing slowly, a quiet chapel by the sea", 0),
    ("Clarinet in its low register, dry and humorous, a little crooked tune", 0),
    ("Felt piano with tape hiss, close and soft, lullaby feel", 0),
    ("Distant church bell and sea wind textures, sparse, mostly silence", 0),
    ("Harp arpeggios, slow, luminous, early summer dawn", 0),
]
music = {"prompts": [{"text": t, "weight": w} for t, w in MUSIC_PROMPTS], "bpm": 66, "density": 0.25, "brightness": 0.45,
         "scale": "G_MAJOR_E_MINOR"}


def copies(rows):
    return [dict(zip(("across", "distance", "scale", "flip"), r)) for r in rows]


# the sky: the day's sun high on the right, August's lower, the June dawn's just up on the right (as approved); the
# afterglow far on the left; the full moon ahead over the sea, its path coming to the rock; the lightning out to sea
SUN, LATE, DAWN, MOON, BOLT = [A * 0.66, 0.02], [A * 0.86, 0.2], [A * 0.78, 0.3], [A * 0.58, 0.2], [A * 0.32, 0.02]

objects = [
    isle.sky(folder, 0.42, SUN, LATE, DAWN, A * 0.12, A * 0.58, BOLT, moon=MOON),
    isle.sea(folder, WATER, {"strength": 0.5, "fade": 0, "rough": 0.1, "ripple": 0.1}),
    {"id": "islet", "name": "Wooded islet", "across": 320, "distance": 700, "onLand": False, "elevation": WATER, "height": 14,
     "box": [-46, -15, 46, 0.7], "copies": [{"across": 320, "distance": 700}, {"across": -260, "distance": 950, "scale": 1.3, "flip": True}]},
    {"id": "skerry", "name": "Skerry", "across": -40, "distance": 260, "onLand": False, "elevation": WATER, "height": 5,
     "box": [-20.5, -5.4, 20.5, 0.7], "copies": [{"across": -40, "distance": 260}, {"across": 95, "distance": 430, "scale": 1.4, "flip": True},
                                                {"across": 210, "distance": 320, "scale": 0.7}, {"across": 30, "distance": 150, "scale": 0.5, "flip": True}]},
    {"id": "mist", "name": "Mist on the horizon", "across": 120, "distance": 650, "onLand": False, "elevation": WATER, "height": 18,
     "box": [-800, -16, 800, 2]},
    {"id": "rock", "name": "The island rock", "plane": True, "drape": True, "across": -24, "distance": 32, "width": 66, "depth": 76},
    {"id": "pine", "name": "Pines", "across": -12, "distance": 24, "height": 9, "box": [-2.2, -9.3, 3.6, 0.3], "shadow": True,
     "copies": [{"across": -12, "distance": 24, "scale": 1.1}, {"across": -9.5, "distance": 26.5, "scale": 0.9, "flip": True},
                {"across": -15, "distance": 21, "scale": 1.2}, {"across": -6.5, "distance": 31, "scale": 0.8}, {"across": -18, "distance": 28},
                {"across": -11, "distance": 33, "scale": 1.1, "flip": True}]},
    {"id": "house", "name": "House", "unseen": True, "across": -7.5, "distance": 15.5, "facing": 200},
    {"id": "house_front", "name": "House, the gable end", "on": "house", "facing": 180, "height": 4.8, "box": [-2.95, -5, 2.95, 0.4], "shadow": True},
    {"id": "house_side", "name": "House, the side", "on": "house", "across": 2.5, "facing": 90, "height": 3, "box": [-0.1, -3.1, 6.45, 0.4], "shadow": True},
    {"id": "roof_r", "name": "Roof, the near slope", "plane": True, "on": "house", "across": 1.375, "distance": 3, "elevation": 3.81, "width": 6.5,
     "depth": 3.39, "rotation": 90, "tilt": 35.8, "shadow": True},
    {"id": "roof_l", "name": "Roof, the far slope", "plane": True, "on": "house", "across": -1.375, "distance": 3, "elevation": 3.81, "width": 6.5,
     "depth": 3.39, "rotation": 90, "tilt": -35.8},
    {"id": "chimney", "name": "Chimney", "on": "house", "across": -0.8, "distance": 2.5, "height": 5.8, "box": [-0.4, -5.9, 0.4, 0.05]},
    {"id": "porch", "name": "Porch", "on": "house", "across": 1.6, "distance": -0.7, "facing": 180, "height": 1.5, "box": [-0.75, -1.5, 0.75, 0.05]},
    {"id": "cat", "name": "Mappe, the cat", "on": "house", "across": 1.85, "distance": -0.95, "elevation": 0.55, "height": 0.45, "box": [-0.3, -0.48, 0.3, 0.03]},
    {"id": "peony", "name": "Peonies", "across": -9.56, "distance": 15.4, "height": 0.85, "box": [-0.75, -1, 0.75, 0.05],
     "copies": [{"across": -9.56, "distance": 15.4}, {"across": -7.21, "distance": 14.54, "scale": 0.9, "flip": True}, {"across": -5.58, "distance": 13.9, "scale": 1.05}]},
    {"id": "pier", "name": "Pier", "plane": True, "walk": True, "across": 3.6, "distance": 16, "elevation": -0.15, "width": 10, "depth": 1.3, "shadow": True},
    {"id": "pier_side", "name": "Pier, the near edge", "across": 3.6, "distance": 15.35, "onLand": False, "elevation": -0.15, "height": 0.2, "box": [-5, -0.02, 5, 0.22]},
    {"id": "post", "name": "Pier posts", "across": -0.2, "distance": 15.4, "onLand": False, "elevation": -0.15, "height": 1.4, "box": [-0.1, -0.02, 0.1, 1.42],
     "copies": [{"across": a, "distance": d} for a in (-0.2, 2.3, 4.8, 7.3, 8.5) for d in (15.4, 16.6)]},
    {"id": "boat", "name": "Rowing boat", "across": 7.2, "distance": 17.2, "onLand": False, "elevation": WATER, "height": 0.8, "box": [-2.4, -0.95, 2, 0.2]},
    {"id": "juniper", "name": "Junipers", "across": -2.9, "distance": 3.4, "height": 0.9, "box": [-1, -1, 1, 0.1], "shadow": True,
     "copies": [{"across": -2.9, "distance": 3.4, "scale": 1.2}, {"across": -2.2, "distance": 11.5, "flip": True}, {"across": -10.5, "distance": 12, "scale": 1.3},
                {"across": -5, "distance": 9.5, "scale": 0.8}]},
    {"id": "tuft", "name": "Grass in the cracks", "across": -1.8, "distance": 3.3, "height": 0.4, "box": [-0.25, -0.5, 0.25, 0.05],
     "copies": copies([(-1.8, 3.3, 0.8, False), (0.4, 3.2, 0.9, True), (-2.6, 5.2, 1, False), (0.3, 6.3, 1.1, True), (-1.3, 7, 0.8, False),
                       (-0.6, 9.5, 0.9, True), (-2, 10.8, 1, False), (0, 12.6, 1.1, True), (-1.6, 13.4, 0.8, False), (-0.9, 2.8, 0.9, True),
                       (-3, 6.6, 1, False), (-2.4, 8.3, 1.1, True)])},
    {"id": "grandma", "name": "Grandmother", "person": {"cast": "cast", "who": "grandma", "turn": 150}, "across": 0.2, "distance": 4},
    {"id": "sophia", "name": "Sophia", "person": {"cast": "cast", "who": "sophia", "turn": 150}, "across": 0.68, "distance": 4.27},
    {"id": "papa", "name": "Papa", "person": {"cast": "cast", "who": "papa", "turn": 150}, "across": -3, "distance": 8},
    isle.RAIN,
]

lights = isle.lights(("sky#sun", "#ffefd8", 1.3), ("sky#sun_late", "#ffe2b8", 1.25), ("sky#sun_dawn", "#ffeedd", 1.0),
                     ([300, 5], "#f3d6c6", 0.5), ("sky#moon", "#c4d2f2", 0.8), [-30, 30])

state = {**isle.STATE,
         "grandma_look": [8, 5, 0.2], "sophia_look": "grandma", "sophia_reach": {"r": "grandma#hand_l"}, "papa_look": "grandma",
         "papa_with": ["mug"], "papa_reach": {"r": [-2.893, 7.715, 1.15], "l": [-2.807, 7.765, 1.15]}, "grandma_reach": {"l": "sophia#hand_r"}}

spec = {
    "engine": 3,
    "title": "The Shore by the House",
    "caption": "June on the island. The sea lies still as glass.",
    "horizon": 0.42,
    "camera": {"mode": "picture"},
    "light": isle.light(WIND),
    "lights": lights,
    "modules": ["cast", "isle"],
    "state": state,
    "states": dict(isle.STATES),
    "objects": objects,
    "music": music,
}
isle.write_json(os.path.join(folder, "scene.json"), spec)
