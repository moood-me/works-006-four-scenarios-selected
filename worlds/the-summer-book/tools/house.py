# Writes scenes/house/scene.json (and the island's sky and sea beside it): the house (С2) — the glazed veranda and,
# through its glass door, the room with the two beds and the window onto the cape, the second door to the entry; round
# the house the island's rock, the sea, and from the room's window the long back of granite down to the cape with
# Sophia's tent. Its elements and where they stand, its light by the hour (the island's: tools/isle.py), its lights,
# its people, its keys. The house's frame (x along the back wall, z away behind it) is lib.js's — keep the numbers the
# same. Run from anywhere: python -B tools/house.py <the world's root>
import sys, os, math
sys.path.insert(0, os.path.join(sys.argv[1], "tools"))
import isle

root = sys.argv[1]
folder = os.path.join(root, "scenes", "house")
A = isle.A
WATER = -4.4
WIND = [1, 0.3, 0.3]

# the house's frame (lib.js): the veranda's far corner, facing 225
CX, CZ, K = -0.6, 7.0, math.sqrt(0.5)
def wa(x, z): return CX + K * (x + z)
def wd(x, z): return CZ + K * (z - x)
# the cape: where the tent stands (lib.js T), and the way from it to the house
T = (22.4, 71.3)
W = (wa(0.3, 3.8), wd(0.3, 3.8))
RA, RD = T[0] - W[0], T[1] - W[1]
RL = math.hypot(RA, RD)
TENT_F = math.degrees(math.atan2(-RA, -RD)) % 360          # the tent's front faces the house
NX, ND = math.sin(math.radians(TENT_F)), math.cos(math.radians(TENT_F))

MUSIC_PROMPTS = [
    ("Sparse solo piano, slow and unhurried, with long silences, like light on still water", 1.2),
    ("Gentle nylon-string guitar picking, quiet and intimate, a summer morning by the sea", 0.8),
    ("Clarinet in its low register, dry and humorous, a little crooked tune", 0.5),
    ("Celesta and music box notes, childlike and a little sad", 0.4),
    ("Nordic folk melody on a single wooden flute, distant and breathy, over a soft drone", 0),
    ("Warm ambient pads with slow swells, pearl-grey and calm, barely moving", 0),
    ("Low cello long tones, tender and grave, an old woman remembering", 0),
    ("Kantele plucked softly, Finnish archipelago, open fifths, airy", 0),
    ("Solo accordion, slow waltz, faded and wistful, far away across the water", 0),
    ("Soft string quartet, chamber music, restrained and bittersweet", 0),
    ("Glass harmonica shimmer, cold clear air, high and fragile", 0),
    ("Minimalist marimba patterns, gentle and repeating, like small waves", 0),
    ("Harmonium chords breathing slowly, a quiet chapel by the sea", 0),
    ("Felt piano with tape hiss, close and soft, lullaby feel", 0),
    ("Ticking clock and pencil on paper textures, a quiet working room, sparse", 0),
    ("Harp arpeggios, slow, luminous, early summer morning", 0),
]
music = {"prompts": [{"text": t, "weight": w} for t, w in MUSIC_PROMPTS], "bpm": 66, "density": 0.25, "brightness": 0.5,
         "scale": "G_MAJOR_E_MINOR"}

# the sky (stage heights, looking ahead): the day's sun high on the left, over the veranda's glazing (as approved);
# August's lower there; the dawn's out over the cape, low on the right; the afterglow far left; the full moon low over
# the sea beyond the cape, seen in the room's window (bearing 22°); the lightning out to sea on the left
SUN, LATE, DAWN, MOON, BOLT = [A * 0.2, -0.1], [A * 0.16, 0.12], [A * 0.5 + 1.0, 0.33], [A * 0.5 + 0.384, 0.29], [A * 0.3, 0.02]

def on(x, z, y=0, **f):
    """an element of the house, on its frame"""
    return {"inside": True, "on": "veranda", "across": x, "distance": z, **({"elevation": y} if y else {}), **f}

# junipers along the cape's back, a few metres off its middle
def along(u, v):
    a = W[0] + RA * u + RD / RL * v
    d = W[1] + RD * u - RA / RL * v
    return round(a, 2), round(d, 2)
JUNIPERS = [(0.15, -4.5, 1.1), (0.22, 5, 0.9), (0.38, -6, 1.3), (0.47, 4.5, 1.0), (0.63, -5, 1.2), (0.71, 6.5, 0.9),
            (0.84, -3.5, 1.0), (0.9, 4, 1.2)]

# the window onto the cape: its opening in the world (the moon and the dawn come in only through it), the floor 0.3 m
# over the land
WIN = [[wa(x, 3.8), wd(x, 3.8), y + 0.3] for x, y in ((-0.25, 0.82), (0.85, 0.82), (0.85, 2.0), (-0.25, 2.0))]
WIN = [[round(v, 3) for v in p] for p in WIN]

objects = [
    isle.sky(folder, 0.42, SUN, LATE, DAWN, -0.16, MOON[0], BOLT, moon=MOON),
    isle.sea(folder, WATER, {"strength": 0.5, "fade": 0, "rough": 0.1, "ripple": 0.1}),
    {"id": "islet", "name": "Wooded islets", "across": -320, "distance": 700, "onLand": False, "elevation": WATER, "height": 14,
     "box": [-46, -15, 46, 0.7], "copies": [{"across": -320, "distance": 700}, {"across": -150, "distance": 950, "scale": 1.3, "flip": True},
                                            {"across": 380, "distance": 820, "scale": 1.1}]},
    {"id": "skerry", "name": "Skerries", "across": -180, "distance": 300, "onLand": False, "elevation": WATER, "height": 5,
     "box": [-20.5, -5.4, 20.5, 0.7], "copies": [{"across": -180, "distance": 300}, {"across": -420, "distance": 520, "scale": 1.3, "flip": True},
                                                {"across": -90, "distance": 240, "scale": 0.6}, {"across": -30, "distance": 420, "scale": 0.8},
                                                {"across": 150, "distance": 380, "scale": 0.9, "flip": True}]},
    {"id": "mist", "name": "Mist on the water", "across": 120, "distance": 320, "onLand": False, "elevation": WATER, "height": 18,
     "box": [-800, -16, 800, 2]},
    {"id": "fog_wall", "name": "The fog's wall on the horizon", "across": 200, "distance": 1300, "onLand": False, "elevation": WATER,
     "height": 56, "box": [-900, -58, 900, 2]},
    {"id": "outside", "name": "The rock round the house and down to the cape", "plane": True, "drape": True, "across": 0, "distance": 38,
     "width": 80, "depth": 84},
    {"id": "juniper", "name": "Junipers on the cape's back", "height": 0.9, "box": [-1, -1, 1, 0.1], "shadow": True,
     **dict(zip(("across", "distance"), along(*JUNIPERS[0][:2]))),
     "copies": [{**dict(zip(("across", "distance"), along(u, v))), "scale": s, **({"flip": True} if i % 2 else {})} for i, (u, v, s) in enumerate(JUNIPERS)]},
    {"id": "tent", "name": "Sophia's tent on the cape", "across": T[0], "distance": T[1], "facing": round(TENT_F, 1), "height": 1.25,
     "box": [-0.95, -1.3, 0.95, 0.05], "translucent": 0.6, "shadow": True, "flicker": 0.15},
    {"id": "far_lantern", "name": "Papa's lantern out in the night", "across": W[0], "distance": W[1], "elevation": 1.0, "height": 0.3,
     "box": [-0.1, -0.32, 0.1, 0.02], "place": {"across": "far_a", "distance": "far_d"}},

    # the veranda (stage 2's)
    {"id": "veranda", "name": "The veranda", "unseen": True, "across": CX, "distance": CZ, "facing": 225, "elevation": 0.3},
    on(3.2, -3.2, id="floor", name="The veranda's floor", plane=True, walk=True, width=6.4, depth=6.4),
    on(3.2, 0, 2.6, id="ceiling", name="The veranda's ceiling", facing=180, tilt=-90, height=6.4, box=[-3.2, -6.4, 3.2, 0.05]),
    on(0, 0, id="side_wall", name="The glazed wall, under and over its windows", facing=90, height=2.6, box=[-6.4, -2.62, 0, 0.02]),
    on(0, 0, 0.8, id="glazing", name="The veranda's windows", facing=90, height=1.45, box=[-6.4, -1.45, 0, 0]),
    on(0, 0, id="back_wall", name="The house's wall, the doorway to the room", facing=180, height=2.6, box=[0, -2.62, 6.4, 0.02]),
    on(1.3, -0.02, id="door", name="The glass door to the room", shadow=True, facing=250, height=2.05, box=[0, -2.05, 0.85, 0.02]),
    on(2.45, -0.03, 1.38, id="hat", name="The straw hat", facing=180, height=0.4, box=[-0.25, -0.42, 0.25, 0.06],
       place={"across": "hat_x", "distance": "hat_z", "elevation": "hat_e", "tilt": "hat_t"}),
    on(0.45, -1.7, 0.74, id="table", name="Papa's table", plane=True, shadow=True, width=0.75, depth=1.5),
    on(0.82, -1.7, id="table_legs", name="The table's legs", facing=90, height=0.74, box=[-0.76, -0.76, 0.76, 0.02]),
    on(0.45, -1.25, 0.74, id="table_things", name="The coffee pot, the pencils", shadow=True, facing=135, height=0.3, box=[-0.32, -0.3, 0.3, 0.01]),
    on(1.2, -2.5, id="chair", name="Papa's chair", shadow=True, facing=135, height=0.95, box=[-0.28, -0.97, 0.3, 0.02]),
    on(4.6, -0.45, id="cot", name="Papa's camp bed", shadow=True, facing=180, height=0.5, box=[-1.0, -0.5, 1.0, 0.02],
       place={"across": "cot_x", "distance": "cot_z", "facing": "cot_f"}),
    {**on(0, -0.02, id="house_out", name="The house's front beyond the glazing", facing=180, height=2.8, box=[-2.85, -2.8, 0, 0.35]), "inside": False},

    # the room
    on(0, 3.8, id="room", name="The room's far wall, the window onto the cape", facing=180, height=2.6, box=[-2.75, -2.62, 2.35, 0.02]),
    on(0, 0.1, id="room_near", name="The room's near wall, the doorway", facing=0, height=2.6, box=[-2.35, -2.62, 2.75, 0.02]),
    on(1.3, 0, id="jamb", name="The doorway's jambs", facing=90, height=2.07, box=[0, -2.07, 0.1, 0.0],
       copies=[{"across": 1.3, "distance": 0, "facing": 90}, {"across": 2.15, "distance": 0, "facing": 270, "flip": True}]),
    on(1.725, 0, 2.07, id="lintel", name="The doorway's head", facing=0, tilt=-90, height=0.1, box=[-0.425, -0.1, 0.425, 0]),
    on(-2.7, 0, id="room_left", name="The room's left wall", facing=90, height=2.6, box=[0.05, -2.62, 3.85, 0.02]),
    on(2.3, 0, id="room_right", name="The room's right wall, the second door", facing=270, height=2.6, box=[-3.85, -2.62, -0.05, 0.02]),
    on(-0.2, 0.1, 2.6, id="room_ceiling", name="The room's ceiling", facing=0, tilt=-90, height=3.8, box=[-2.6, -3.85, 2.6, 0.05]),
    on(-0.2, 1.95, id="room_floor", name="The room's floor", plane=True, walk=True, width=5.1, depth=3.85),
    on(2.3, 2.4, id="door2", name="The second door, the creaking one", shadow=True, facing=270, height=2.0, box=[0, -2.0, 0.85, 0.0],
       place={"facing": "door2_f"}),
    on(3.15, 2.0, id="entry_floor", name="The entry's floor", plane=True, walk=True, width=1.7, depth=2.8),
    on(3.95, 0, id="entry_wall", name="The entry's far wall, the door to the porch", facing=270, height=2.4, box=[-3.4, -2.4, -0.6, 0.02]),
    on(3.15, 0.6, id="entry_side", name="The entry's side walls", facing=0, height=2.4, box=[-0.85, -2.4, 0.85, 0.02],
       copies=[{"across": 3.15, "distance": 0.6, "facing": 0}, {"across": 3.15, "distance": 3.4, "facing": 180}]),
    on(-1.725, 2.79, 0.5, id="beds", name="Grandmother's and Sophia's beds", plane=True, shadow=True, width=1.85, depth=1.98),
    on(-1.175, 3.5, 0.54, id="pillow", name="Sophia's pillow", plane=True, width=0.6, depth=0.42),
    on(-2.2, 1.8, id="bed_foot", name="The beds' feet", shadow=True, facing=180, height=0.85, box=[-0.5, -0.92, 0.5, 0.02]),
    on(-0.8, 2.1, id="bed_side", name="The beds' sides", facing=90, height=0.85, box=[-0.02, -0.9, 1.7, 0.02]),
    on(-1.7, 3.76, id="bed_head", name="The beds' heads", facing=180, height=1.0, box=[-0.97, -1.08, 0.92, 0.02]),
    on(-0.52, 3.42, id="stand", name="The night table", shadow=True, facing=180, height=0.62, box=[-0.21, -0.64, 0.21, 0.02]),
    on(-0.52, 3.6, 0.62, id="stand_top", name="The night table's top", plane=True, width=0.4, depth=0.36),
    on(-0.52, 3.6, 0.62, id="lamp", name="Grandmother's lamp", shadow=True, facing=180, height=0.42, box=[-0.07, -0.44, 0.07, 0.01],
       flicker=0.06, place={"across": "lamp_x", "distance": "lamp_z", "elevation": "lamp_e"}),
    on(0.3, 3.71, 0.82, id="sill", name="The window's sill", plane=True, width=1.3, depth=0.2),
    on(0.3, 3.8, 0.82, id="room_window", name="The window onto the cape", facing=180, height=1.24, box=[-0.62, -1.26, 0.62, 0.02]),
    on(0.025, 3.83, 0.82, id="room_glass", name="The window's left pane", facing=180, height=1.18, box=[-0.275, -1.18, 0.275, 0],
       glass={"strength": 0.55}),
    on(0.85, 3.8, 0.82, id="casement", name="The window's right leaf, which opens", facing=180, height=1.18, box=[-0.56, -1.19, 0.01, 0.01],
       place={"facing": "casement_f"}),
    on(0.62, 3.72, 0.82, id="drops", name="The doctor's drops", facing=180, height=0.12, box=[-0.03, -0.13, 0.03, 0.005]),
    on(-0.62, 2.35, id="teabox", name="The tea box", facing=140, height=0.13, box=[-0.1, -0.14, 0.1, 0.01]),
    on(1.35, 3.2, id="armchair", name="The armchair by the window", shadow=True, facing=195, height=1.05, box=[-0.5, -1.08, 0.46, 0.02]),

    # the air
    {"id": "dust", "name": "Dust in the sunlight", "inside": True, "particles": {"kind": "dust", "at": [-1.52, 4.38, 1.7], "source": [2.5, 2.5, 1.2]}},
    {"id": "rain_w", "name": "Rain beyond the glazing", "particles": {"kind": "rain", "amount": "storm", "count": 5000, "wind": 1.2, "area": [-80, -5.3, -40, 120]}},
    {"id": "rain_n", "name": "Rain beyond the room", "particles": {"kind": "rain", "amount": "storm", "count": 5000, "wind": 1.2, "area": [-5.3, 80, 12, 120]}},
    {"id": "rain_e", "name": "Rain beside the house", "particles": {"kind": "rain", "amount": "storm", "count": 3000, "wind": 1.2, "area": [7, 80, -40, 12]}},
    {"id": "glazing_drops", "name": "Rain running down the glazing", "on": "glazing", "across": -3.2, "elevation": 0.72, "distance": -0.02,
     "particles": {"kind": "drops", "source": [6.2, 0, 1.3], "flat": True, "rate": 6, "amount": "storm"}},
    {"id": "window_drops", "name": "Rain running down the window", "on": "room_window", "elevation": 0.6, "distance": -0.03,
     "particles": {"kind": "drops", "source": [1.0, 0, 1.1], "flat": True, "rate": 2, "amount": "storm"}},

    # the people (the world's cast): where `<id>_at` puts them (lib.js SPOT)
    {"id": "papa", "name": "Papa", "inside": True, "person": {"cast": "cast", "who": "papa", "turn": 150}, "across": -0.954, "distance": 4.95,
     "place": {"across": "papa_a", "distance": "papa_d"}},
    {"id": "grandma", "name": "Grandmother", "inside": True, "person": {"cast": "cast", "who": "grandma", "turn": 175}, "across": 0.036,
     "distance": 4.384, "place": {"across": "grandma_a", "distance": "grandma_d"}},
    {"id": "sophia", "name": "Sophia", "inside": True, "person": {"cast": "cast", "who": "sophia", "turn": 190}, "across": 0.39,
     "distance": 3.606, "place": {"across": "sophia_a", "distance": "sophia_d"}},
]

# the light: the island's (the day as approved; the looks by the hour and the weather), the room's share of the light
# outside; at night a little more of it inside, so that faces read by the moon and the windows
light = isle.light(WIND, inside=0.6)
light["looks"]["night"]["inside"] = 0.85
# the thick fog's air is one for the whole scene, the room too: its glow round the lamp held down a little (isle.md)
light["looks"]["fog_air"]["hazeGlow"] = 0.8

lights = isle.lights(("sky#sun", "#ffefd8", 1.3), ("sky#sun_late", "#ffe2b8", 1.25), ("sky#sun_dawn", "#ffeedd", 1.0),
                     ([-60, 5], "#f3d6c6", 0.5), ("sky#moon", "#c4d2f2", 0.9), [-33, 30])
THROUGH = {"sun": ["glazing"], "sun_late": ["glazing"], "sun_dusk": ["glazing"], "sun_dawn": [WIN], "moon": [WIN]}
for l in lights:
    if l["id"] in THROUGH:
        l["through"] = THROUGH[l["id"]]
lights += [
    # the day (or the night) at the veranda's glazing and at the room's window
    {"id": "sky_in", "of": "glazing", "daylight": True, "strength": 1},
    {"id": "win_in", "of": "room_window", "daylight": True, "strength": 0.7},
    # Grandmother's lamp; Sophia's candle in her hand; Papa's lantern out in the night (the tent's candle is its glow)
    {"id": "lamp", "of": "lamp#flame", "color": "#ffcf8e", "strength": 1.2, "reach": 3.5, "flicker": 0.06},
    {"id": "candle", "at": "sophia#hand_r", "color": "#ffc98a", "strength": 1.1, "reach": 3, "on": "candle", "flicker": 0.15},
    {"id": "far_lantern", "of": "far_lantern#flame", "color": "#ffd08e", "strength": 1.6, "reach": 6},
]

# the keys: the island's and the house's own; where they start is the empty play (a June morning on the veranda)
SPOTS = {"grandma": ["door", "table", "bed", "window", "chair", "door2"], "sophia": ["door", "bed", "window", "door2"],
         "papa": ["table", "cot", "doorway", "room", "door2"]}
states = dict(isle.STATES)
states.update({
    "view": {"values": ["veranda", "room", "window", "face", "door"], "means": "where the camera looks from: the veranda into its far corner (stage 2's) · the room from its doorway (the beds, the window, the armchair) · at the window from behind the one standing there (her face in the glass, the cape beyond) · close on the face of the one at the window (Sophia's if she is there) · from the beds' side to the second door and the doorway"},
    "grandma_at": {"values": SPOTS["grandma"], "means": "where Grandmother stands: on the veranda before the door · at Papa's table · at the beds' foot · at the window onto the cape · by the armchair · at the second door"},
    "sophia_at": {"values": SPOTS["sophia"], "means": "where Sophia stands: on the veranda by Grandmother (hand in hand when both are there) · at her bed's foot · at the window · at the second door"},
    "papa_at": {"values": SPOTS["papa"], "means": "where Papa stands: at his table (his mug) · by his camp bed on the veranda · in the doorway, looking in · in the room · in the entry beyond the second door"},
    "hat": {"values": ["nail", "bed", "none"], "means": "the straw hat: on its nail by the glass door · on Sophia's bed · gone"},
    "bird": {"type": "boolean", "means": "a dead bird on Sophia's pillow"},
    "teabox": {"type": "boolean", "means": "the tea box on the floor by Sophia's bed (the cat's birds in it)"},
    "lamp": {"values": ["none", "table", "window", "burnt"], "means": "Grandmother's lamp: not in the room · on the night table · in the window · burnt out in the window (the chimney sooted)"},
    "lamp_lit": {"range": [0, 1], "smooth": True, "means": "the lamp alight (on its table or in the window)"},
    "drops": {"values": ["none", "full", "empty"], "means": "the doctor's drops on the sill: none yet · a full bottle · an empty one"},
    "cot": {"values": ["veranda", "room"], "means": "Papa's camp bed: along the veranda's back wall · in the room before the window onto the cape"},
    "supper": {"type": "boolean", "means": "supper laid on Papa's table"},
    "candle": {"range": [0, 1], "smooth": True, "means": "a candle alight in Sophia's right hand (its light)"},
    "casement": {"range": [0, 1], "smooth": True, "means": "the window's right leaf: 0 shut … 1 open (out over the rock)"},
    "creak": {"range": [0, 1], "smooth": True, "means": "the second door: 0 shut … 1 open (into the entry)"},
    "tent_light": {"range": [0, 1], "smooth": True, "means": "the candle in Sophia's tent on the cape: the canvas glowing"},
    "far_light": {"range": [0, 1], "smooth": True, "means": "Papa's big lantern out in the night (seen from the window): 0 none … 1 alight"},
    "far_light_at": {"range": [0, 1], "smooth": True, "means": "where Papa's lantern is: 0 by the house's corner … 1 at the tent"},
})
for who, spots in SPOTS.items():
    states[f"{who}_a"] = {"type": "number", "means": f"the script's own: where {who} stands across (from {who}_at)"}
    states[f"{who}_d"] = {"type": "number", "means": f"the script's own: where {who} stands ahead (from {who}_at)"}
for k, m in [("hat_x", "the hat's place (from hat)"), ("hat_z", "the hat's place"), ("hat_e", "the hat's height"), ("hat_t", "the hat's tilt"),
             ("lamp_x", "the lamp's place (from lamp)"), ("lamp_z", "the lamp's place"), ("lamp_e", "the lamp's height"),
             ("cot_x", "the camp bed's place (from cot)"), ("cot_z", "the camp bed's place"), ("cot_f", "the camp bed's turn"),
             ("casement_f", "the window leaf's turn, degrees (from casement)"), ("door2_f", "the second door's turn, degrees (from creak)"),
             ("far_a", "Papa's lantern's place (from far_light_at)"), ("far_d", "Papa's lantern's place")]:
    states[k] = {"type": "number", "means": f"the script's own: {m}"}

state = {**isle.STATE, "view": "veranda", "grandma_at": "door", "sophia_at": "door", "papa_at": "table", "hat": "nail", "bird": False,
         "teabox": False, "lamp": "table", "lamp_lit": 0, "drops": "none", "cot": "veranda", "supper": False, "candle": 0,
         "casement": 0, "creak": 0, "tent_light": 0, "far_light": 0, "far_light_at": 0,
         "grandma_a": 0.036, "grandma_d": 4.384, "sophia_a": 0.39, "sophia_d": 3.606, "papa_a": -0.954, "papa_d": 4.95,
         "hat_x": 2.45, "hat_z": -0.03, "hat_e": 1.38, "hat_t": 0, "lamp_x": -0.52, "lamp_z": 3.6, "lamp_e": 0.62,
         "cot_x": 4.6, "cot_z": -0.45, "cot_f": 180, "casement_f": 180, "door2_f": 270, "far_a": round(W[0], 3), "far_d": round(W[1], 3),
         # stage 2's: Papa with his mug, looking at Grandmother; she at Sophia; Sophia under the hat, her hand in hers
         "papa_look": "grandma", "papa_with": ["mug"], "papa_reach": {"r": [-0.795, 4.691, 1.45], "l": [-0.727, 4.749, 1.45]},
         "grandma_look": "sophia", "sophia_look": [0.25, 2.9, 0.3], "sophia_reach": {"r": "grandma#hand_l"}}

spec = {
    "engine": 3,
    "title": "The House",
    "caption": "Morning on the glazed veranda; the sea in every pane.",
    "horizon": 0.42,
    "camera": {"mode": "picture"},
    "light": light,
    "lights": lights,
    "modules": ["cast", "isle"],
    "state": state,
    "states": states,
    "objects": objects,
    "music": music,
}
isle.write_json(os.path.join(folder, "scene.json"), spec)
print("tent facing", round(TENT_F, 1), "window", WIN)
