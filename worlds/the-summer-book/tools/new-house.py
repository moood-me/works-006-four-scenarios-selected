# Writes scenes/new-house/scene.json (and the island's sky and sea beside it): the new house on the island's far side
# (С5) — white and new on the granite over the water, its steep black roof, the glazed veranda toward the forest with
# its window that is not locked, the big room behind it with the wide bed, the chest of drawers and the table under
# the four big windows over the sea; round it the bare rock, the dead grey trees, the water behind. Its elements and
# where they stand, its light by the hour (the island's: tools/isle.py), its lights, its people, its keys. The house's
# numbers and the land are lib.js's — keep them the same. Run from anywhere: python -B tools/new-house.py <world>
import sys, os, math
sys.path.insert(0, os.path.join(sys.argv[1], "tools"))
import isle

root = sys.argv[1]
folder = os.path.join(root, "scenes", "new-house")
A = isle.A
WATER = -2.4
WIND = [0.6, 1, 0.3]
FLOOR = 0.45


# the land (lib.js ground): the camera's height over it is the views' own
def sm(u):
    v = min(1, max(0, u))
    return v * v * (3 - 2 * v)


def coast(x):
    return 19.4 - 0.006 * x * x + 1.8 * math.sin(0.13 * x)


def raw(x, z):
    s = z - coast(x)
    out = max(abs(x) - 3.6, 8.4 - z, z - 17.2, 0)
    h = -2.8 * sm((s + 2.2) / 2.4) - 5 * sm((s - 0.2) / 12)
    h += 0.8 * sm((-z - 4) / 30)
    h += 0.18 * math.sin(0.5 * x + 0.3 * z) * math.sin(0.37 * z - 0.42 * x) * sm(out / 2)
    return h


def ground(x, z):
    return raw(x, z) - raw(0, 0)


# where the view `out` (the scene's first) puts the camera: lib.js VIEW.out
OUT = {"camera_x": -7.5, "camera_z": 2.5, "camera_h": round(1.7 - 1.7 - ground(-7.5, 2.5), 4), "camera_yaw": 32, "camera_look": -0.04}

MUSIC_PROMPTS = [
    ("Sparse solo piano at night, slow, a few notes and long silences, moonlight on still water", 1.1),
    ("Clarinet in its low register, dry and humorous, a little crooked tune, a secret adventure", 0.9),
    ("Celesta and music box notes, childlike and a little sad", 0.5),
    ("Glass harmonica shimmer, cold clear air, high and fragile", 0.3),
    ("Kantele plucked softly, Finnish archipelago, open fifths, airy", 0),
    ("Low cello long tones, tender and grave, an old woman remembering", 0),
    ("Nordic folk melody on a single wooden flute, distant and breathy, over a soft drone", 0),
    ("Warm ambient pads with slow swells, pearl-grey and calm, barely moving", 0),
    ("Felt piano with tape hiss, close and soft, lullaby feel", 0),
    ("Pizzicato strings tiptoeing, mischievous and hushed, children sneaking at night", 0),
    ("Solo accordion, slow waltz, faded and wistful, far away across the water", 0),
    ("Soft string quartet, chamber music, restrained and bittersweet", 0),
    ("Minimalist marimba patterns, gentle and repeating, like small waves", 0),
    ("Harmonium chords breathing slowly, a quiet chapel by the sea", 0),
    ("Harp arpeggios, slow, luminous, a moonlit night", 0),
    ("Distant foghorn and soft water textures, sparse, early morning", 0),
]
music = {"prompts": [{"text": t, "weight": w} for t, w in MUSIC_PROMPTS], "bpm": 64, "density": 0.25, "brightness": 0.45,
         "scale": "G_MAJOR_E_MINOR"}

# the sky (stage heights, looking ahead — the sea is ahead, beyond the house): the day's sun high on the left, August's
# lower; the dawn's low far on the right (east), lighting the sea gable from its right; the afterglow far left; the
# full moon low over the sea a little left of ahead (bearing −14°, 4.5° up) — seen from the room in its big windows;
# the lightning out to sea on the left
SUN, LATE, DAWN, BOLT = [A * 0.15, -0.12], [A * 0.1, 0.1], [A * 0.5 + 1.31, 0.33], [A * 0.3, 0.02]
MOON = [round(A * 0.5 - math.radians(14), 4), round(0.42 - math.tan(math.radians(4.5)), 4)]

# the house (lib.js HOUSE): the outer walls x −3…3, z 9…16.6; the inner faces x ±2.88, z 9.12…16.48; the dividing
# wall at z 11; the floor 0.45 m over the rock; the eaves 3.05 m, the ridge 6.05 m; the roof 45°, out 0.35 m all round
SEA_WINDOWS = [(-2.55, -1.5), (-1.2, -0.15), (0.15, 1.2), (1.5, 2.55)]
SILL, HEAD = FLOOR + 0.35, FLOOR + 2.25
FEET = [0.6, 0.33, 0.06]


def inside(**f):
    return {"inside": True, **f}


def tree_copies(rows):
    return [dict(zip(("across", "distance", "scale", "flip"), r)) for r in rows]


objects = [
    isle.sky(folder, 0.42, SUN, LATE, DAWN, A * 0.04, MOON[0], BOLT, moon=MOON),
    isle.sea(folder, WATER, {"strength": 0.45, "fade": 0, "rough": 0.25, "ripple": 0.12}, centre=(0, 1960)),
    {"id": "islet", "name": "Wooded islets", "across": -260, "distance": 650, "onLand": False, "elevation": WATER, "height": 14,
     "box": [-46, -15, 46, 0.7], "copies": [{"across": -260, "distance": 650}, {"across": -120, "distance": 900, "scale": 1.3, "flip": True},
                                            {"across": 320, "distance": 760, "scale": 1.1}]},
    {"id": "skerry", "name": "Skerries", "across": -90, "distance": 210, "onLand": False, "elevation": WATER, "height": 5,
     "box": [-20.5, -5.4, 20.5, 0.7], "copies": [{"across": -90, "distance": 210}, {"across": 140, "distance": 260, "scale": 1.3, "flip": True},
                                                {"across": 40, "distance": 380, "scale": 0.7}, {"across": -200, "distance": 420, "scale": 0.9}]},
    {"id": "mist", "name": "Mist on the water", "across": 40, "distance": 300, "onLand": False, "elevation": WATER, "height": 18,
     "box": [-800, -16, 800, 2]},
    {"id": "fog_wall", "name": "The fog's wall on the horizon", "across": 100, "distance": 1300, "onLand": False, "elevation": WATER,
     "height": 56, "box": [-900, -58, 900, 2]},
    {"id": "mist_near", "name": "The morning fog low on the water behind the house", "across": 0, "distance": 27, "onLand": False,
     "elevation": WATER, "height": 7, "box": [-120, -7, 120, 1.5]},
    {"id": "island_back", "name": "The island beyond the house, seen from the sea", "across": 0, "distance": -70, "height": 12,
     "box": [-90, -12, 90, 1.2]},
    {"id": "land", "name": "The rock round the house", "plane": True, "drape": True, "across": 0, "distance": -5, "width": 120, "depth": 80},
    {"id": "deadtree", "name": "Dead trees", "across": -9, "distance": 15.5, "height": 5.5, "box": [-2.2, -6.0, 3.6, 0.3], "shadow": True,
     "copies": tree_copies([(-9, 15.5, 1.1, False), (-13, 11, 1.0, True), (-10.5, 6.5, 0.9, False), (9.5, 13.5, 1.0, True),
                            (12, 8.5, 1.2, False), (8.5, 4.5, 0.9, False), (6.5, -2, 1.1, True), (-6.5, -3.5, 1.0, False),
                            (-3, -9, 1.2, True), (3.5, -11, 1.0, False)])},
    {"id": "pine", "name": "Living pines a little way off", "across": -17, "distance": 4, "height": 9, "box": [-2.2, -9.3, 3.6, 0.3],
     "shadow": True, "copies": tree_copies([(-17, 4, 1.0, False), (16, -2, 0.9, True), (-14, -14, 1.1, False)])},
    {"id": "juniper", "name": "Junipers", "across": -6.4, "distance": 11.6, "height": 0.9, "box": [-1, -1, 1, 0.1], "shadow": True,
     "copies": tree_copies([(-6.4, 11.6, 0.8, False), (4.8, 16.4, 0.9, True), (5.6, 6.0, 1.1, False)])},
    {"id": "tuft", "name": "Grass in the rock", "across": -1.6, "distance": 3.0, "height": 0.4, "box": [-0.25, -0.5, 0.25, 0.05],
     "copies": tree_copies([(-1.6, 3.0, 0.9, False), (1.7, 6.6, 0.8, True), (-4.3, 9.4, 1.0, False), (3.9, 8.3, 1.1, True), (-3.6, 4.4, 0.9, False)])},

    # the house's outside
    {"id": "front", "name": "The land gable, the veranda's glazing", "across": 0, "distance": 9.0, "facing": 180, "height": 6.3,
     "box": [-3.45, -6.32, 3.45, 0.05], "shadow": True},
    {"id": "back", "name": "The sea gable, the big windows", "across": 0, "distance": 16.6, "facing": 0, "height": 6.3,
     "box": [-3.45, -6.32, 3.45, 0.05], "shadow": True},
    {"id": "side_l", "name": "The left side", "across": -3.0, "distance": 12.8, "facing": 270, "height": 3.1, "box": [-3.85, -3.1, 3.85, 0.05],
     "shadow": True},
    {"id": "side_r", "name": "The right side", "across": 3.0, "distance": 12.8, "facing": 90, "height": 3.1, "box": [-3.85, -3.1, 3.85, 0.05],
     "shadow": True},
    {"id": "roof", "name": "The roof's two slopes", "plane": True, "across": 1.675, "distance": 12.8, "elevation": 4.375, "width": 7.7,
     "depth": 4.74, "rotation": 90, "tilt": 45, "shadow": True,
     "copies": [{"across": 1.675, "distance": 12.8, "elevation": 4.375, "tilt": 45}, {"across": -1.675, "distance": 12.8, "elevation": 4.375, "tilt": -45}]},
    {"id": "glazing", "name": "The veranda's windows", "across": 0, "distance": 8.985, "elevation": FLOOR + 0.5, "facing": 0, "height": 1.5,
     "box": [-2.75, -1.55, 2.75, 0.05]},
    {"id": "sash", "name": "The veranda's window that is not locked", "across": -2.7, "distance": 8.975, "elevation": FLOOR + 0.5, "facing": 180,
     "height": 1.5, "box": [-0.02, -1.52, 1.07, 0.02], "place": {"facing": "sash_f"}},
    {"id": "win_left", "name": "The left side's windows", "across": -3.0, "distance": 12.8, "elevation": FLOOR + 0.7, "facing": 90, "height": 1.4,
     "box": [-3.35, -1.45, 0.15, 0.05]},
    {"id": "win_right", "name": "The right side's windows", "across": 3.0, "distance": 12.8, "elevation": FLOOR + 0.7, "facing": 270, "height": 1.4,
     "box": [-0.25, -1.45, 3.35, 0.05]},
    {"id": "win_sea", "name": "The four big windows over the sea", "across": 0, "distance": 16.555, "elevation": SILL, "facing": 180, "height": 1.9,
     "box": [-2.6, -1.95, 2.6, 0.05]},
    inside(id="glass_sea", name="The big windows' glass", across=0, distance=16.53, elevation=SILL, facing=180, height=1.9,
           box=[-2.6, -1.9, 2.6, 0], glass={"strength": 0.3}),

    # the house's inside
    inside(id="floor", name="The floor", plane=True, walk=True, across=0, distance=12.8, elevation=FLOOR, width=5.76, depth=7.36),
    inside(id="ceiling", name="The ceiling", across=0, distance=9.12, elevation=FLOOR + 2.6, facing=0, tilt=-90, height=7.36,
           box=[-2.9, -7.4, 2.9, 0.05]),
    inside(id="in_left", name="The left wall, inside", across=-2.88, distance=12.8, elevation=FLOOR, facing=90, height=2.6,
           box=[-3.7, -2.62, 3.7, 0.02]),
    inside(id="in_right", name="The right wall, inside", across=2.88, distance=12.8, elevation=FLOOR, facing=270, height=2.6,
           box=[-3.7, -2.62, 3.7, 0.02]),
    inside(id="in_back", name="The sea gable, inside", across=0, distance=16.48, elevation=FLOOR, facing=180, height=2.6,
           box=[-2.9, -2.62, 2.9, 0.02]),
    inside(id="in_near", name="The dividing wall, the room's side", across=0, distance=11.12, elevation=FLOOR, facing=0, height=2.6,
           box=[-2.9, -2.62, 2.9, 0.02]),
    inside(id="ver_wall", name="The dividing wall, the veranda's side", across=0, distance=10.88, elevation=FLOOR, facing=180, height=2.6,
           box=[-2.9, -2.62, 2.9, 0.02]),
    inside(id="bed", name="The wide bed", plane=True, across=-1.89, distance=14.15, elevation=FLOOR + 0.48, width=1.98, depth=1.7, shadow=True),
    inside(id="bed_side", name="The bed's near side", across=-1.89, distance=13.3, elevation=FLOOR, facing=180, height=0.5,
           box=[-1.0, -0.5, 1.0, 0.02], shadow=True),
    inside(id="bed_foot", name="The bed's foot", across=-0.9, distance=14.15, elevation=FLOOR, facing=90, height=0.5,
           box=[-0.87, -0.5, 0.87, 0.02], shadow=True),
    inside(id="bed_head", name="The bed's head board", across=-2.86, distance=14.15, elevation=FLOOR, facing=90, height=0.95,
           box=[-0.9, -0.97, 0.9, 0.02]),
    inside(id="chest", name="The chest of drawers", across=2.43, distance=15.2, elevation=FLOOR, facing=270, height=0.9,
           box=[-0.62, -0.92, 0.62, 0.02], shadow=True),
    inside(id="chest_side", name="The chest of drawers' side", across=2.655, distance=14.6, elevation=FLOOR, facing=180, height=0.9,
           box=[-0.23, -0.92, 0.23, 0.02]),
    inside(id="chest_top", name="The chest of drawers' top", plane=True, across=2.655, distance=15.2, elevation=FLOOR + 0.9, width=0.45, depth=1.2),
]
# the three drawers: each an anchor moved out by its key, carrying its front, its near side and its inside
for k, foot in enumerate(FEET, 1):
    d = f"drawer{k}"
    objects += [
        {"id": d, "name": f"Drawer {k}", "unseen": True, "across": 2.43, "distance": 15.2, "elevation": FLOOR + foot, "facing": 180,
         "place": {"across": f"{d}_x"}},
        inside(id=f"{d}_front", name=f"Drawer {k}, its front", on=d, across=-0.005, facing=270, height=0.25, box=[-0.57, -0.26, 0.57, 0.01]),
        inside(id=f"{d}_side", name=f"Drawer {k}, its side", on=d, distance=-0.55, facing=180, height=0.22, box=[-0.01, -0.22, 0.43, 0.01]),
        inside(id=f"{d}_in", name=f"Drawer {k}, inside", on=d, plane=True, across=0.21, elevation=0.015, width=0.42, depth=1.1),
    ]
objects += [
    inside(id="table", name="The table under the windows", plane=True, across=0.6, distance=15.95, elevation=FLOOR + 0.74, width=1.4, depth=0.7),
    inside(id="table_legs", name="The table's legs", across=0.6, distance=15.62, elevation=FLOOR, facing=180, height=0.74,
           box=[-0.7, -0.76, 0.7, 0.02]),
    inside(id="chairs", name="A new chair", across=1.0, distance=15.38, elevation=FLOOR, facing=180, height=0.86, box=[-0.25, -0.88, 0.25, 0.02],
           shadow=True),
    inside(id="seal", name="The wooden seal", across=0.55, distance=16.05, elevation=FLOOR + 0.74, height=0.17, box=[-0.2, -0.17, 0.2, 0.01]),
    inside(id="lantern", name="Grandmother's lantern, set down", across=1.15, distance=15.9, elevation=FLOOR + 0.74, height=0.36,
           box=[-0.12, -0.4, 0.12, 0.01], place={"across": "lantern_x", "distance": "lantern_z", "elevation": "lantern_e"}),
    inside(id="smoke", name="The cigarette's smoke", particles={"kind": "smoke", "at": "grandma#hand_r", "amount": "cigarette", "rate": 2.5,
           "size": [0.02, 0.25], "speed": [0.04, 0.12], "life": [2.5, 4.5], "opacity": 0.3}),
    isle.RAIN,
]

# the people (the world's cast), at their places (lib.js PLACES; the script puts them); not marked inside: they are
# inside while they stand on the house's floor (it is), outside on the rock
PATH = {"grandma": ([-2.0, 6.2], 215), "sophia": ([-2.9, 5.5], 25)}
for who in ("grandma", "sophia"):
    (a, d), turn = PATH[who]
    objects.append(dict(id=who, name={"grandma": "Grandmother", "sophia": "Sophia"}[who], person={"cast": "cast", "who": who, "turn": turn},
                          across=a, distance=d, place={"across": f"{who}_a", "distance": f"{who}_d"}))

# the light: the island's (the day as approved; the looks by the hour and the weather), the room's share of the light
# outside — low, an empty shut house: its big windows read dark from outside; at night more of it, the room by the
# moon in its windows and the lantern
light = isle.light(WIND, inside=0.3)
light["looks"]["night"]["inside"] = 0.7

lights = isle.lights(("sky#sun", "#ffefd8", 1.3), ("sky#sun_late", "#ffe2b8", 1.25), ("sky#sun_dawn", "#ffeedd", 1.0),
                     ([-80, 5], "#f3d6c6", 0.5), ("sky#moon", "#c4d2f2", 0.9), [-30, 30])
# the moon comes into the room only through the big windows (each pane's opening)
PANES = [[[a, 16.55, SILL], [b, 16.55, SILL], [b, 16.55, HEAD], [a, 16.55, HEAD]] for a, b in SEA_WINDOWS]
for l in lights:
    if l["id"] == "moon":
        l["through"] = PANES
lights += [
    # the day (or the night) at the windows: the outside's light all round, coming in
    {"id": "sea_in", "of": "win_sea", "daylight": True, "strength": 1},
    {"id": "ver_in", "of": "glazing", "daylight": True, "strength": 0.8},
    {"id": "left_in", "of": "win_left", "daylight": True, "strength": 0.5},
    {"id": "right_in", "of": "win_right", "daylight": True, "strength": 0.5},
    # Grandmother's lantern: set down (its flame), or in her left hand; her cigarette's ember in her right
    {"id": "lantern", "of": "lantern#flame", "color": "#ffcf8e", "strength": 1.4, "reach": 6, "on": "lantern_set", "flicker": 0.08},
    {"id": "lantern_hand", "at": "grandma#hand_l", "color": "#ffcf8e", "strength": 1.4, "reach": 6, "on": "lantern_held", "flicker": 0.08,
     "glow": 0.12},
    {"id": "cigarette", "at": "grandma#hand_r", "color": "#ff9050", "strength": 0.6, "reach": 1, "on": "cigarette", "flicker": 0.35, "glow": 0.03},
]


def placed(id, who, places):
    return {f"{id}_at": {"values": places, "means": f"where {who} is (the scene's places, lib.PLACES: {', '.join(places)}); set, put there at once"},
            f"{id}_a": {"range": [-12, 12], "means": f"the scene's own: where {who} stands (across, metres), set from {id}_at; a piece walks them"},
            f"{id}_d": {"range": [0, 20], "means": f"the scene's own: where {who} stands (distance, metres), set from {id}_at; a piece walks them"},
            f"{id}_placed": {"type": "string", "means": f"the scene's own: the place {who} was last put at"}}


states = {**isle.STATES,
          "view": {"values": ["out", "room", "sea", "seal"], "means": "where the camera looks from (a cut): outside on the rock from the front's left (the veranda's glazing and its window, the long side's big black windows) · the room from inside its door (the bed, the table under the big windows, the moon in them, the drawers) · from the water behind the house (the sea gable, its big windows) · nearer from the water under the windows (the table through the glass, the seal on it)"},
          **placed("grandma", "Grandmother", ["path", "sash", "veranda", "door", "bed"]),
          **placed("sophia", "Sophia", ["path", "sash", "veranda", "door", "bed", "drawers", "table"]),
          "sash": {"range": [0, 1], "smooth": True, "means": "the veranda's window that is not locked: 0 shut … 1 swung open out over the rock"},
          "sash_f": {"type": "number", "means": "the script's own: the window leaf's turn, degrees (from sash)"},
          "drawers": {"range": [0, 1], "smooth": True, "means": "the chest of drawers' drawers pulled out one after another, the top first: 0 all shut … 1 all three out (empty, clean)"},
          **{f"drawer{k}_x": {"type": "number", "means": f"the script's own: where drawer {k}'s front is (across, from drawers)"} for k in (1, 2, 3)},
          "seal": {"type": "boolean", "means": "the wooden seal Sophia left lying on the table (seen through the big windows from the sea too)"},
          "cigarette": {"range": [0, 1], "smooth": True, "means": "Grandmother's cigarette alight in her right hand: its ember and its thin smoke"},
          "lantern": {"values": ["none", "hand", "table", "floor"], "means": "Grandmother's storm lantern: not here · alight in her left hand · set on the table · set on the floor before her at the bed's foot"},
          "lantern_held": {"range": [0, 1], "means": "the script's own: the lantern's light in her hand (from lantern)"},
          "lantern_set": {"range": [0, 1], "means": "the script's own: the lantern set down, alight (from lantern)"},
          "lantern_x": {"type": "number", "means": "the script's own: where the lantern is set (from lantern)"},
          "lantern_z": {"type": "number", "means": "the script's own: where the lantern is set"},
          "lantern_e": {"type": "number", "means": "the script's own: the height it is set at"},
          "beat": {"type": "string", "means": "the piece playing (the module beats; the game names it)"},
          "beat_next": {"type": "string", "means": "the piece the game goes to next (its cut made ready)"}}

# the empty play: a June day on the rock before the new house, Grandmother and Sophia come out of the forest, the
# window shut, nothing touched — and nobody there by day (the game brings them, at night)
state = {**isle.STATE, "view": "out", "grandma_at": "path", "sophia_at": "path", "grandma_here": False, "sophia_here": False,
         "grandma_a": PATH["grandma"][0][0], "grandma_d": PATH["grandma"][0][1], "sophia_a": PATH["sophia"][0][0], "sophia_d": PATH["sophia"][0][1],
         "sash": 0, "sash_f": 180, "drawers": 0, **{f"drawer{k}_x": 2.43 for k in (1, 2, 3)}, "seal": False, "cigarette": 0,
         "lantern": "none", "lantern_held": 0, "lantern_set": 0, "lantern_x": 1.15, "lantern_z": 15.9, "lantern_e": FLOOR + 0.74,
         "beat": None, "beat_next": None, **OUT}

spec = {
    "engine": 3,
    "title": "The New House",
    "caption": "On the far side of the island, a new house nobody comes to: big black windows over the sea.",
    "horizon": 0.42,
    "camera": {"mode": "picture"},
    "light": light,
    "lights": lights,
    "modules": ["cast", "isle", "beats"],
    "state": state,
    "states": states,
    "objects": objects,
    "music": music,
}
isle.write_json(os.path.join(folder, "scene.json"), spec)
print("moon", MOON, "out", OUT)
