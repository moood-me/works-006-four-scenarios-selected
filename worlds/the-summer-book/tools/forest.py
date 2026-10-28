# Writes scenes/forest/scene.json (and the island's sky and sea beside it): the magic forest (С3) — the clearing of moss
# and granite on the island's crown among dead trees, its stump, the wooden animals, the crevice, the path to the other
# side; its light by the hour (the island's: tools/isle.py), its people, its keys. Run from anywhere:
# python -B tools/forest.py <the world's root>
import sys, os
sys.path.insert(0, os.path.join(sys.argv[1], "tools"))
import isle

root = sys.argv[1]
folder = os.path.join(root, "scenes", "forest")
A = isle.A
WATER = -4
WIND = [0.8, 0.5, 0.45]

MUSIC_PROMPTS = [
    ("Celesta and music box notes, childlike and a little sad", 1.1),
    ("Kantele plucked softly, Finnish archipelago, open fifths, airy", 0.9),
    ("Wooden creaks and dry wind textures among dead trees, sparse, mostly silence", 0.6),
    ("Low cello long tones, tender and grave, an old woman remembering", 0.4),
    ("Sparse solo piano, slow and unhurried, with long silences, like light on still water", 0),
    ("Nordic folk melody on a single wooden flute, distant and breathy, over a soft drone", 0),
    ("Gentle nylon-string guitar picking, quiet and intimate, a summer afternoon", 0),
    ("Warm ambient pads with slow swells, heavy and close before a storm", 0),
    ("Glass harmonica shimmer, cold clear air, high and fragile", 0),
    ("Solo accordion, slow waltz, faded and wistful, far away across the water", 0),
    ("Soft string quartet, chamber music, restrained and bittersweet", 0),
    ("Minimalist marimba patterns, gentle and repeating, like small waves", 0),
    ("Harmonium chords breathing slowly, a quiet chapel by the sea", 0),
    ("Clarinet in its low register, dry and humorous, a little crooked tune", 0),
    ("Felt piano with tape hiss, close and soft, lullaby feel", 0),
    ("Harp arpeggios, slow, luminous, a moonlit night", 0),
]
music = {"prompts": [{"text": t, "weight": w} for t, w in MUSIC_PROMPTS], "bpm": 62, "density": 0.25, "brightness": 0.4,
         "scale": "G_MAJOR_E_MINOR"}

# the sky: the day's sun high ahead on the right, August's lower, the dawn's low on the right; the dusk's afterglow on
# the left; the moon behind the viewer (its light from there); the lightning out to sea
SUN, LATE, DAWN, BOLT = [A * 0.78, -0.1], [A * 0.88, 0.14], [A * 0.95, 0.3], [A * 0.35, 0.02]
STUMP, TRUNK = (0.7, 3.8), (-1.5, 4.8)
FIRST = {"grandma": ([-0.9, 3.5], 160), "sophia": ([0.3, 2.9], 200), "papa": ([-5.4, 3.0], 90)}


def copies(rows):
    return [dict(zip(("across", "distance", "scale", "flip"), r)) for r in rows]


objects = [
    isle.sky(folder, 0.42, SUN, LATE, DAWN, A * 0.12, A * 0.6, BOLT),
    isle.sea(folder, WATER, {"strength": 0.4, "fade": 0, "rough": 0.3, "ripple": 0.15}),
    {"id": "band", "name": "The grey band on the horizon", "across": 0, "distance": 1500, "onLand": False, "elevation": WATER, "height": 80,
     "box": [-4000, -84, 4000, 2]},
    {"id": "fog_wall", "name": "The fog's wall on the horizon", "across": 200, "distance": 1400, "onLand": False, "elevation": WATER, "height": 56,
     "box": [-900, -58, 900, 2]},
    {"id": "skerry", "name": "Skerries", "across": -60, "distance": 420, "onLand": False, "elevation": WATER, "height": 5, "box": [-20.5, -5.4, 20.5, 0.7],
     "copies": [{"across": -60, "distance": 420}, {"across": 140, "distance": 560, "scale": 1.3, "flip": True}, {"across": 40, "distance": 300, "scale": 0.6}]},
    {"id": "far_boat", "name": "The family's boat out at the nets", "across": 3, "distance": 230, "onLand": False, "elevation": WATER, "height": 1.8,
     "box": [-2, -1.9, 2, 0.2]},
    {"id": "moss", "name": "The clearing's moss and granite", "plane": True, "drape": True, "across": 0, "distance": 30, "width": 80, "depth": 90},
    {"id": "path", "name": "The path to the other side", "plane": True, "drape": True, "across": -1.9, "distance": 10, "width": 4.4, "depth": 10},
    {"id": "pine", "name": "Living pines far off", "across": -16, "distance": 34, "height": 9, "box": [-2.2, -9.3, 3.6, 0.3],
     "copies": copies([(-16, 34, 1.0, False), (13, 31, 0.9, True), (19, 38, 1.1, False)])},
    {"id": "deadtree", "name": "Dead trees", "across": -4.5, "distance": 7, "height": 6, "box": [-2.4, -6.6, 3.6, 0.3], "shadow": True,
     "copies": copies([(-4.5, 7, 1.1, False), (3.8, 8.5, 0.9, True), (6.2, 12, 1.2, False), (-7, 12.5, 1.0, True), (1.6, 14.5, 0.8, False),
                       (-2.8, 17, 1.1, True), (9, 16, 1.0, False), (-11, 9, 1.2, False)])},
    {"id": "snag", "name": "Broken dead trees", "across": -6.2, "distance": 5.2, "height": 3.6, "box": [-2.2, -4.1, 1.8, 0.3], "shadow": True,
     "copies": copies([(-6.2, 5.2, 1.0, False), (8, 9, 1.1, True), (4.6, 15.5, 0.9, False), (-9, 15, 1.0, True)])},
    {"id": "trunk", "name": "The big dead trunk", "across": TRUNK[0], "distance": TRUNK[1], "height": 7, "box": [-2.6, -7.6, 3.8, 0.3], "shadow": True},
    {"id": "juniper", "name": "Junipers", "across": 3.4, "distance": 4.4, "height": 0.9, "box": [-1.0, -1.0, 1.0, 0.1], "shadow": True,
     "copies": copies([(3.4, 4.4, 0.8, False), (-3.6, 9.6, 1.1, True), (5.2, 10.5, 1.0, False)])},
    {"id": "tuft", "name": "Grass in the moss", "across": -1.6, "distance": 2.8, "height": 0.4, "box": [-0.25, -0.5, 0.25, 0.05],
     "copies": copies([(-1.6, 2.8, 0.9, False), (1.9, 2.6, 0.8, True), (-2.6, 4.2, 1.0, False), (2.4, 6.8, 1.1, True), (-0.6, 6.6, 0.9, False)])},
    {"id": "stump", "name": "The stump", "across": STUMP[0], "distance": STUMP[1], "box": [-0.9, -0.44, 0.9, 0], "shadow": True},
    {"id": "animals", "name": "The wooden animals in the moss", "across": -0.1, "distance": 3.25, "height": 0.2, "box": [-0.62, -0.22, 0.65, 0.03]},
    {"id": "crevice", "name": "The boulder with the crack", "across": 2.6, "distance": 5.9, "box": [-1.5, -0.7, 1.5, 0], "shadow": True},
    {"id": "fog_near", "name": "The forest in the fog", "across": 0, "distance": 22, "height": 9, "box": [-80, -9, 80, 1],
     "copies": [{"across": 0, "distance": 22}, {"across": -3, "distance": 12, "scale": 0.6, "flip": True}]},
    {"id": "grandma", "name": "Grandmother", "person": {"cast": "cast", "who": "grandma", "turn": FIRST["grandma"][1]},
     "across": FIRST["grandma"][0][0], "distance": FIRST["grandma"][0][1], "place": {"across": "grandma_a", "distance": "grandma_d"}},
    {"id": "sophia", "name": "Sophia", "person": {"cast": "cast", "who": "sophia", "turn": FIRST["sophia"][1]},
     "across": FIRST["sophia"][0][0], "distance": FIRST["sophia"][0][1], "place": {"across": "sophia_a", "distance": "sophia_d"}},
    {"id": "papa", "name": "Papa", "person": {"cast": "cast", "who": "papa", "turn": FIRST["papa"][1]},
     "across": FIRST["papa"][0][0], "distance": FIRST["papa"][0][1], "place": {"across": "papa_a", "distance": "papa_d"}},
    # the thin smoke of Grandmother's cigarette (the cast's part: from its ember), while she has it
    {"id": "smoke", "name": "The cigarette's smoke", "particles": {"kind": "smoke", "at": "grandma#ember", "amount": "smoking", "rate": 2.5,
     "size": [0.02, 0.25], "speed": [0.04, 0.12], "life": [2.5, 4.5], "opacity": 0.3}},
    isle.RAIN,
    # the knife minigame's close-up (the world's closeups, modules/closeups.md): opened by `knife_open`
    {"id": "knife", "name": "Her hands carving, close", "insert": "knife_open"},
]

lights = isle.lights(("sky#sun", "#ffefd8", 1.3), ("sky#sun_late", "#ffe2b8", 1.25), ("sky#sun_dawn", "#ffeedd", 1.0),
                     ([300, 5], "#f3d6c6", 0.5), ([200, 40], "#c4d2f2", 0.8), [20, 30]) + [
    {"id": "far_lamp", "of": "far_boat#lamp", "color": "#ffcf86", "strength": 1.4, "reach": 14, "on": "boat_out"},
    # the cast's parts in Grandmother's hands: the lantern's flame, the struck match's
    {"id": "hand_lamp", "at": "grandma#flame", "color": "#ffc98a", "strength": 1.1, "reach": 3.5, "on": "lamp_lit", "flicker": 0.12},
    {"id": "match", "at": "grandma#flame", "color": "#ffc070", "strength": 0.7, "reach": 1.2, "on": "match_lit", "flicker": 0.3}]

# the empty play: a June day in the clearing, Grandmother and Sophia in it, four animals in the moss (the seal not
# carved yet), the crack empty, no band
state = {**isle.STATE, "animals": 4, "pack": "none", "band": 0, "spin": 0, "boat_out": False,
         "grandma_at": "clearing", "sophia_at": "clearing", "papa_at": "edge", "papa_here": False,
         "grandma_a": FIRST["grandma"][0][0], "grandma_d": FIRST["grandma"][0][1], "sophia_a": FIRST["sophia"][0][0], "sophia_d": FIRST["sophia"][0][1],
         "papa_a": FIRST["papa"][0][0], "papa_d": FIRST["papa"][0][1],
         "brave": False, "sophia_back": False, "step": 0, "lantern_sway": 0, "grab": False, "lamp_lit": 0,
         "flipper": False, "slips": False, "knife_open": 0, "carve": 0, "knife_flaw": 0, "match_lit": 0, "smoking": 0}


def placed(id, who, places):
    return {f"{id}_at": {"values": places, "means": f"where {who} is (the scene's places, lib.PLACES: {', '.join(places)}); set, put there at once"},
            f"{id}_a": {"range": [-12, 12], "means": f"the scene's own: where {who} stands (across, metres), set from {id}_at; a piece walks them"},
            f"{id}_d": {"range": [0, 30], "means": f"the scene's own: where {who} stands (distance, metres), set from {id}_at; a piece walks them"},
            f"{id}_placed": {"type": "string", "means": f"the scene's own: the place {who} was last put at"}}


states = {**isle.STATES,
          **placed("grandma", "Grandmother", ["clearing", "edge", "stump", "up", "trunk", "crevice", "moss", "path1", "path2", "path3", "far"]),
          **placed("sophia", "Sophia", ["clearing", "edge", "moss", "animals", "stump", "behind", "near", "beside", "nose", "aside", "trees", "crevice",
                                       "path1", "path2", "path3", "far"]),
          **placed("papa", "Papa", ["edge", "lift"]),
          "brave": {"type": "boolean", "means": "the play's: Sophia at 3 or more — by her fallen grandmother she does not cry out: she comes quickly, squats and looks into her face"},
          "sophia_back": {"type": "boolean", "means": "the play's: «Mamma: sky» — Sophia first steps back, fists clenched («You said — not soon!»)"},
          "step": {"range": [0, 3], "means": "the stones minigame: the stone of the path the two walk to (1…3), at their pace; step:stone<n> told on Grandmother's arrival"},
          "lantern_sway": {"range": [0, 1], "smooth": True, "means": "the stones minigame's flaw: the lantern swinging in her hand, its light wavering"},
          "grab": {"type": "boolean", "means": "the stones minigame's flaw: Sophia catches Grandmother by the skirt"},
          "lamp_lit": {"range": [0, 1], "smooth": True, "means": "the scene's own: Grandmother's lantern alight in her hand (from grandma_with and lantern_sway)"},
          "match_lit": {"range": [0, 1], "smooth": True, "means": "the scene's own: a struck match in Grandmother's hand (from grandma_with)"},
          "smoking": {"range": [0, 1], "smooth": True, "means": "the scene's own: Grandmother's cigarette alight, its thin smoke (from grandma_with)"},
          "slips": {"type": "boolean", "means": "the play's: the moss minigame (М6) flawed — in fall she sits bowed longer before Sophia comes, and Sophia comes closer (her hand on Grandmother's shoulder)"},
          "flipper": {"type": "boolean", "means": "the play's: the knife jerked in 1.2 — the carved seal has one flipper (the seal in the moss so; knife_flaw shows it too while the step goes on)"},
          "knife_open": {"range": [0, 1], "smooth": True, "means": "М3 «knife»: the close-up of her hands carving open (0 closed … 1 open)"},
          "carve": {"range": [0, 1], "smooth": True, "means": "the knife close-up: the driftwood becoming a seal (0 a rough log … 1 the seal)"},
          "knife_flaw": {"range": [0, 1], "means": "the knife close-up: 1 — a jerk, one flipper split off (the seal has one flipper); 0 — whole"},
          "beat": {"type": "string", "means": "the piece playing (the module beats; the game names it, notes.md «Pieces»)"},
          "beat_next": {"type": "string", "means": "the piece the game goes to next (its cut made ready)"},
          "animals": {"range": [0, 5], "means": "how many wooden animals lie in the moss by the stump: a horse, a bird, a dog, a cow, and the fifth — the seal carved this June"},
          "pack": {"values": ["none", "in", "taken"], "means": "the packet of cigarettes in the boulder's crack: not there; pushed in, its corner showing; taken out again (the moss scuffed)"},
          "band": {"range": [0, 1], "smooth": True, "means": "the close end of July: a heavy grey band along the horizon (0 none, 1 full)"},
          "spin": {"range": [0, 1], "smooth": True, "means": "the forest spinning before a dizzy eye: the trees wheel about their feet (0 still, 1 the most)"},
          "boat_out": {"type": "boolean", "means": "by night: the family's boat out at the nets far on the water, Papa's lantern its one warm light between the trees"}}

spec = {
    "engine": 3,
    "title": "The Magic Forest",
    "caption": "The island's crown: moss, grey stone and dead trees twisted by the wind.",
    "horizon": 0.42,
    "camera": {"mode": "picture"},
    "light": isle.light(WIND),
    "lights": lights,
    "modules": ["cast", "isle", "beats", "closeups"],
    "state": state,
    "states": states,
    "objects": objects,
    "music": music,
}
isle.write_json(os.path.join(folder, "scene.json"), spec)
